const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const dataPath = path.join(__dirname, '..', 'site', 'data', 'items.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const items = JSON.parse(rawData);

console.log(`🌐 Verifying remote HTTP status for all ${items.length} items...\n`);

function checkUrl(url, timeoutMs = 12000, maxRedirects = 5) {
  return new Promise((resolve) => {
    function tryRequest(currUrl, redirectCount) {
      if (redirectCount > maxRedirects) {
        return resolve({ ok: false, status: 0, error: 'Too many redirects' });
      }

      try {
        const parsed = new URL(currUrl);
        const protocol = parsed.protocol === 'https:' ? https : http;
        const options = {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          },
          timeout: timeoutMs
        };

        const req = protocol.request(currUrl, options, (res) => {
          const status = res.statusCode || 0;
          if (status >= 300 && status < 400 && res.headers.location) {
            const nextUrl = new URL(res.headers.location, currUrl).toString();
            res.destroy();
            return tryRequest(nextUrl, redirectCount + 1);
          }

          // Abort further download once headers are received
          res.destroy();
          if (status >= 200 && status < 400) {
            resolve({ ok: true, status });
          } else {
            resolve({ ok: false, status, error: `HTTP ${status}` });
          }
        });

        req.on('timeout', () => {
          req.destroy();
          resolve({ ok: false, status: 0, error: 'Request Timeout' });
        });

        req.on('error', (err) => {
          resolve({ ok: false, status: 0, error: err.message });
        });

        req.end();
      } catch (err) {
        resolve({ ok: false, status: 0, error: err.message });
      }
    }

    tryRequest(url, 0);
  });
}

async function verifyAll() {
  let passed = 0;
  let failed = 0;
  const failures = [];

  // Run in batches of 4 to respect network and rate limits
  const concurrency = 4;
  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency);
    const results = await Promise.all(
      chunk.map(async (item) => {
        const res = await checkUrl(item.url);
        return { item, res };
      })
    );

    for (const { item, res } of results) {
      if (res.ok) {
        passed++;
        console.log(`  ✅ [${res.status}] ${item.id} -> ${item.url}`);
      } else {
        failed++;
        failures.push({ id: item.id, url: item.url, error: res.error });
        console.error(`  ❌ [FAIL] ${item.id} -> ${item.url} (${res.error})`);
      }
    }

    // Small delay between chunks
    await new Promise((r) => setTimeout(r, 100));
  }

  console.log(`\n────────────────────────────────────────────`);
  console.log(`Verification Complete: ${passed} passed, ${failed} failed (Total: ${items.length})`);

  if (failed > 0) {
    console.error(`\nFailed items:`);
    failures.forEach((f) => console.error(`  - ${f.id}: ${f.url} (${f.error})`));
    process.exit(1);
  } else {
    console.log(`🎉 All 40 remote URLs are reachable and healthy!\n`);
    process.exit(0);
  }
}

verifyAll();
