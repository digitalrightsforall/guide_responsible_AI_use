// Validation script for site/data/incidents.json
// Ensures referential integrity, schema conformity, and data-hygiene.
const fs = require("fs");
const path = require("path");

const incidentsPath = path.join(__dirname, "../site/data/incidents.json");
const itemsPath = path.join(__dirname, "../site/data/items.json");

const incidents = JSON.parse(fs.readFileSync(incidentsPath, "utf8"));
const items = JSON.parse(fs.readFileSync(itemsPath, "utf8"));
const validSkillIds = new Set(items.map(it => it.id));

const validStances = new Set(["user_rights_infringed", "irresponsible_user_sanctioned"]);
const validRegions = new Set(["Domestic", "International"]);
const validCategories = new Set([
  "confidential_data_leakage",
  "hallucination_false_citation",
  "copyright_ip_infringement",
  "commercial_fraud_deception"
]);
const validLifecycle = new Set(["input_risk", "output_risk", "execution_risk"]);
const validSourceStatus = new Set(["primary_source", "secondary_media"]);
const validFactStatus = new Set([
  "officially_adjudicated",
  "formal_retraction",
  "official_notice_confirmed",
  "administrative_penalty",
  "vendor_confirmed",
  "party_allegations"
]);
const validProceduralStatus = new Set([
  "final_judgment",
  "judicial_admonition",
  "publisher_retraction",
  "official_notice",
  "administrative_penalty",
  "vendor_incident",
  "litigation_ongoing",
  "police_notice",
  "settled"
]);

let errors = [];
let warnings = [];

incidents.forEach((inc, idx) => {
  const pfx = `[Incident #${idx + 1} - ${inc.id || "NO_ID"}]`;

  if (!inc.id) errors.push(`${pfx} missing id`);
  if (!inc.title_zh || !inc.title_en) errors.push(`${pfx} missing title_zh/title_en`);
  if (!validStances.has(inc.user_stance)) errors.push(`${pfx} invalid user_stance: ${inc.user_stance}`);
  if (!validRegions.has(inc.region)) errors.push(`${pfx} invalid region: ${inc.region}`);
  if (!validCategories.has(inc.risk_category)) errors.push(`${pfx} invalid risk_category: ${inc.risk_category}`);
  if (!validSourceStatus.has(inc.source_status)) errors.push(`${pfx} invalid or missing source_status: ${inc.source_status}`);
  if (!validFactStatus.has(inc.fact_status)) errors.push(`${pfx} invalid or missing fact_status: ${inc.fact_status}`);
  if (!validProceduralStatus.has(inc.procedural_status)) errors.push(`${pfx} invalid or missing procedural_status: ${inc.procedural_status}`);

  (inc.lifecycle_risk_type || []).forEach(lr => {
    if (!validLifecycle.has(lr)) errors.push(`${pfx} invalid lifecycle_risk_type: ${lr}`);
  });

  // Skills reference integrity
  (inc.links?.countermeasure_skills || []).forEach(sId => {
    if (!validSkillIds.has(sId)) {
      errors.push(`${pfx} referenced countermeasure skill '${sId}' does not exist in items.json`);
    }
  });

  // Source quality checks
  if (!inc.sources || inc.sources.length === 0) {
    warnings.push(`${pfx} has no sources listed`);
  } else {
    inc.sources.forEach((s, sIdx) => {
      if (!s.title) errors.push(`${pfx} source #${sIdx + 1} missing title`);
      if (s.url) {
        try {
          const u = new URL(s.url);
          if (u.pathname === "/" || u.pathname === "") {
            warnings.push(`${pfx} source URL is a portal/homepage only: ${s.url}`);
          }
        } catch (e) {
          errors.push(`${pfx} malformed source URL: ${s.url}`);
        }
      } else {
        warnings.push(`${pfx} source #${sIdx + 1} has no url`);
      }
    });
  }
});

console.log("=== Incident Validation Report ===");
console.log(`Total incidents checked: ${incidents.length}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

if (errors.length > 0) {
  console.error("\n[ERRORS]");
  errors.forEach(e => console.error(" - " + e));
}
if (warnings.length > 0) {
  console.warn("\n[WARNINGS]");
  warnings.forEach(w => console.warn(" - " + w));
}

if (errors.length > 0) {
  process.exit(1);
} else {
  console.log("\nAll schema and integrity checks passed!");
}
