<section id="chapter-2" class="space-y-6 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 2 · 上手第一步</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            上手第一步：关掉这几个悄悄收集数据的开关 (Choose & Configure)
          </h2>
        </div>

        <!-- Chapter Objectives Box (Flat Two-Column Layout) -->
        <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-xs">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span>本章阅读导航</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-1">
            <div class="space-y-1">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>本章解决什么问题
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                为什么在客户端“清空聊天记录”不能真正删掉数据？各主流工具（Trae、豆包、Kimi、Cursor、ChatGPT 等）究竟有哪些隐形的数据留存机制？
              </p>
            </div>
            <div class="space-y-1 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-4">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>读完你能获得什么
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                尽可能关闭主力 AI 客户端中的模型训练授权，并检查、清理长期记忆与已上传文件。
              </p>
            </div>
          </div>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <!-- 30s Quick Action Card for Everyday Citizens (Flat Divided Layout) -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-brand/10 via-brand/5 to-transparent border border-brand/20 space-y-3 my-2">
            <div class="flex items-center gap-2 font-bold text-sm text-brand dark:text-brand-container">
              <span class="text-xl">⚡</span>
              <span>普通人自卫第一步：30 秒极简安全行动（先做这三件事）</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand/15 pt-1 text-xs">
              <div class="py-2 sm:py-0 sm:px-3 first:pl-0 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">1. 关掉“训练授权”</span>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">在常用 AI 客户端的【设置】中，关闭“允许使用我的数据改进/训练模型”，防止未公开草稿被吞入公共语料。</p>
              </div>
              <div class="py-2 sm:py-0 sm:px-3 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">2. 清理“长期记忆”</span>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">在【设置 &gt; 记忆/Memory】定期清理。单次删除对话不会同步删记忆，必须进记忆库单独注销。</p>
              </div>
              <div class="py-2 sm:py-0 sm:px-3 last:pr-0 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">3. 留个心眼“查一查”</span>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">AI 给的论文期刊、法律案号、名人金句，凡是要对外交差的，务必手动在权威平台核查（论文查知网/doi.org，案号查裁判文书网）。</p>
              </div>
            </div>
          </div>

          <p class="leading-relaxed">
            在你在光标闪烁的对话框中敲下第一行字之前，安全博弈其实早已开始。无论你使用的是国内主流的<strong>Trae、WorkBuddy、豆包、Kimi</strong>，还是国际前沿的<strong>Cursor、Claude、ChatGPT、Gemini</strong>，许多人以为“点一下删除对话”或“关掉聊天记录”就万事大吉。然而底层架构的设计却隐藏着<strong>“控制的错觉”（Illusion of Control）</strong>：前端隐藏历史记录并不等同于服务端数据已经删除。
          </p>

          <!-- 6 Hardening Traps Alert (Folded) -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 space-y-3 my-4 shadow-xs">
            <summary class="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2">
                <span>⚠️</span>
                <span>为什么删了对话还不够？（展开看 6 个常见隐形留存误区）</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-medium shrink-0">
                <span class="group-open:hidden">展开误区 ⬇</span>
                <span class="hidden group-open:inline">收起误区 ⬆</span>
              </span>
            </summary>
            <ul class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 pl-4 list-disc pt-2 leading-relaxed">
              <li><strong>关闭模型训练 ≠ 数据立即删除</strong>：在各主流应用中，关闭训练仅代表后续交互不用于算法迭代，历史聊天记录仍完整留存服务端；豆包清空对话也不会级联清除已提炼的 Memory（须在【设置 &gt; 记忆】单独手动清除）。</li>
              <li><strong>打开 Privacy Mode ≠ 服务端绝对零留存</strong>：在 Trae 等 IDE 中，开启隐私模式主要承诺对话与输出不用于训练，但为构建工程上下文仍会临时上传代码计算向量嵌入；且<strong>退出登录时隐私模式会自动失效</strong>！</li>
              <li><strong>关闭 Memory ≠ 既有 Memory 已删除</strong>：豆包、WorkBuddy、ChatGPT 均明确既有记忆为独立存储，关闭记忆开关仅阻断新记忆的生成，旧记忆库依然常驻生效。</li>
              <li><strong>删除源对话 ≠ 对应提取的 Memory 被删除</strong>：删除产生某条记忆的原始会话，不会触发对提炼事实的级联清除，必须前往专门的记忆空间单独注销。</li>
              <li><strong>删除 Conversation ≠ 上传文件同步删除</strong>：在知识库与 Agent 类平台中，单次会话与知识库/附件解耦，删除聊天界面并不销毁后台已持久化的文件与嵌入向量。</li>
              <li><strong>《网络安全法》第21条留存 6 个月 ≠ 所有聊天正文必须保存 6 个月</strong>：法律强制留存的法定对象是<strong>“相关网络运行与安全日志”</strong>，而非用户输入的完整提示词与私有正文；合规日志要求并不包含完整保存用户输入正文的许可。</li>
            </ul>
          </details>

          <!-- Guidance for Lookup Tables -->
          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2.5 my-4">
            <span class="text-base shrink-0">👉</span>
            <span><strong>找到你正在使用的 AI 工具</strong>：展开下方对应的配置速查表，按步骤直接在软件【设置】中关闭模型训练、清理长期记忆或限制全自动执行权限。</span>
          </div>

          <!-- Domestic Chinese Tools Hardening Table (Collapsible) -->
          <details class="adaptive-details group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs transition-all my-4">
            <summary class="flex items-center justify-between cursor-pointer list-none select-none">
              <div class="flex items-center gap-2.5">
                <span class="text-xl">🇨🇳</span>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">国内主流 AI 工具实操配置速查卡（Trae、WorkBuddy、豆包、Kimi、Dify）</h3>
                    <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">实测深度基准</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">全面对齐 PIPL 与 TC260-005《伦理安全指引 1.0》实测建议</p>
                </div>
              </div>
              <span class="adaptive-toggle-hint text-xs text-brand font-bold flex items-center gap-1 shrink-0">
                <span class="group-open:hidden">点击展开速查 ⬇</span>
                <span class="hidden group-open:inline">收起表格 ⬆</span>
              </span>
            </summary>
            <div class="pt-4 space-y-3">
              <div class="text-[11px] text-slate-400 dark:text-slate-500 mb-1 sm:hidden flex items-center gap-1">
                <span>👉 横向滑动查看完整表格</span>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-[640px] sm:min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold">
                <tr>
                  <th class="py-3 px-4">工具与形态</th>
                  <th class="py-3 px-4">核心自卫配置操作</th>
                  <th class="py-3 px-4">必须警惕的高危陷阱</th>
                  <th class="py-3 px-4">合规与防护依据</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Trae IDE<br><span class="text-[11px] font-normal text-slate-500">字节跳动 AI 原生 IDE</span></td>
                  <td class="py-3 px-4">登录后在 <strong>Settings &gt; Account 开启“Privacy Mode（隐私模式）”</strong>；在工程根目录配置 <code>.gitignore</code> 与敏感忽略列表，排除 <code>.env</code>、证书与私有密钥文件。</td>
                  <td class="py-3 px-4"><strong>退出登录时隐私模式会自动失效</strong>；为构建代码库理解会临时上传代码计算嵌入向量；终端 shell 执行具有真实宿主机破坏力，严禁对不可信工程开启无确认全自动执行。</td>
                  <td class="py-3 px-4 text-slate-500">Trae 官方隐私政策 / PIPL 合规</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">WorkBuddy AI<br><span class="text-[11px] font-normal text-slate-500">桌面级智能体工作助手</span></td>
                  <td class="py-3 px-4">输入框底部权限保持<strong>“默认权限”</strong>（限定工作空间，高危删除/脚本/敏感网络强弹窗）；安全中心开启<strong>沙箱安全、删除保护与自动备份</strong>；在“工具管控”中可按单个 MCP 工具启停。</td>
                  <td class="py-3 px-4">官方明确警告：开启“允许完全访问”后，<strong>写文件、删文件、执行脚本不再逐步确认</strong>，严禁在生产重要设备上长期开启；外部毒化可能利用已授权 MCP 工具篡改本地文件。</td>
                  <td class="py-3 px-4 text-slate-500">WorkBuddy 本地沙箱与权限分级体系</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">豆包 (Doubao)<br><span class="text-[11px] font-normal text-slate-500">日常对话与知识助手</span></td>
                  <td class="py-3 px-4">进入 <strong>【我的】&gt;【设置】&gt;【记忆】</strong>，定期逐条审查或清空记忆；在手机系统设置中撤销对相机、相册与剪贴板的常驻后台权限。</td>
                  <td class="py-3 px-4"><strong>反馈漏洞 (Thumbs Up/Down)</strong>：提交点赞、点踩或报错反馈，会将对应整段对话推送至模型质量审核管线，绕过常规训练关闭；删除历史聊天不会删除已提炼记忆。</td>
                  <td class="py-3 px-4 text-slate-500">TC260-005《伦理安全指引 1.0》/ PIPL</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Kimi 智能助手<br><span class="text-[11px] font-normal text-slate-500">长文档与学术分析工具</span></td>
                  <td class="py-3 px-4">在【设置 &gt; 记忆指令】中审查指令；<strong>关闭训练需邮件联系 support@moonshot.cn（账号级 Opt-out）</strong>；长文本上传前务必使用本地脱敏技能替换核心业务数据。</td>
                  <td class="py-3 px-4">Kimi Work 官方风险披露明确指出完全权限下存在<strong>文件误删、修改系统配置甚至导致设备不可启动</strong>的风险；长文档与联网抓取内容可能包含隐形间接注入指令。</td>
                  <td class="py-3 px-4 text-slate-500">月之暗面隐私政策 / Kimi Work 权限声明</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">自建 Agent / 框架<br><span class="text-[11px] font-normal text-slate-500">Dify、FastGPT 等</span></td>
                  <td class="py-3 px-4">务必及时升级安全补丁（Dify &ge; v1.14.2，FastGPT &ge; v4.14.10.3）；MCP Server URL 与 API Key 同等防护，严禁硬编码；配置远程 MCP 访问白名单。</td>
                  <td class="py-3 px-4">自建不等于免受攻击！公开披露并修复的典型安全漏洞：<strong>Dify CVE-2026-41947</strong> 曾因跨租户 Trace 导致提示词暴露风险；<strong>FastGPT CVE-2026-40100</strong> 曾因 MCP runTool 导致未认证 SSRF 探测内网。</td>
                  <td class="py-3 px-4 text-slate-500"><a href="https://nvd.nist.gov/vuln/detail/CVE-2026-41947" target="_blank" class="text-brand hover:underline">NVD CVE-2026-41947 ↗</a> / GHSA 安全公告</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </details>

          <!-- International Tools Hardening Table (Collapsible) -->
          <details class="adaptive-details group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs transition-all my-4">
            <summary class="flex items-center justify-between cursor-pointer list-none select-none">
              <div class="flex items-center gap-2.5">
                <span class="text-xl">🌐</span>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">国际主流 AI 工具对照基线（ChatGPT、Claude、Gemini、Cursor）</h3>
                    <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">官方依据对照</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">官方 Opt-out 路径与独立记忆/知识清理指南</p>
                </div>
              </div>
              <span class="adaptive-toggle-hint text-xs text-brand font-bold flex items-center gap-1 shrink-0">
                <span class="group-open:hidden">点击展开速查 ⬇</span>
                <span class="hidden group-open:inline">收起表格 ⬆</span>
              </span>
            </summary>
            <div class="pt-4 space-y-3">
              <div class="text-[11px] text-slate-400 dark:text-slate-500 mb-1 sm:hidden flex items-center gap-1">
                <span>👉 横向滑动查看完整表格</span>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-[640px] sm:min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold">
                <tr>
                  <th class="py-3 px-4">平台/工具</th>
                  <th class="py-3 px-4">必须关闭的核心开关</th>
                  <th class="py-3 px-4">独立清理重点</th>
                  <th class="py-3 px-4">官方依据与核实</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">ChatGPT (OpenAI)</td>
                  <td class="py-3 px-4">设置 &gt; Data Controls 关闭 “Improve the model for everyone”</td>
                  <td class="py-3 px-4">Settings &gt; Personalization &gt; Memory 独立删除记忆；定期在 Library 清理独立文件</td>
                  <td class="py-3 px-4 text-brand"><a href="https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt" target="_blank" class="hover:underline">OpenAI Data Controls ↗</a></td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Claude (Anthropic)</td>
                  <td class="py-3 px-4">Settings 关闭 Model Improvement 授权；切忌盲目点赞上传反馈</td>
                  <td class="py-3 px-4">检查 Settings &gt; Memory；Projects 中上传的 Project Knowledge 须项目内单独清除</td>
                  <td class="py-3 px-4 text-brand"><a href="https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training" target="_blank" class="hover:underline">Claude Privacy Rights ↗</a></td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Gemini (Google)</td>
                  <td class="py-3 px-4">关闭 Gemini Apps Activity（默认开启）；谨慎使用带有敏感材料的 Feedback</td>
                  <td class="py-3 px-4">注意即使关闭 Activity 仍有 72h 日志留存；人工审核过的数据可保留 3 年且无法挽回</td>
                  <td class="py-3 px-4 text-brand"><a href="https://support.google.com/gemini/answer/13594961" target="_blank" class="hover:underline">Gemini Privacy Hub ↗</a></td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Cursor (Anysphere)</td>
                  <td class="py-3 px-4">开启 Privacy Mode（零数据保留 ZDR）；严禁对不可信工程开启 Run Everything (YOLO)</td>
                  <td class="py-3 px-4">工程根目录创建 <code>.cursorignore</code>，屏蔽 <code>.env</code>、<code>*.pem</code>、凭证与私有数据文件</td>
                  <td class="py-3 px-4 text-brand"><a href="https://cursor.com/data-use" target="_blank" class="hover:underline">Cursor Data Use ↗</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </details>

      <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2 mt-4">
        <span>💡 完成基础配置后，在日常对话与交互中还需要注意哪些事项？</span>
        <a href="#chapter-3" class="text-brand font-bold hover:underline flex items-center gap-1">
          <span>进入第 3 章：掌握三大安全支柱与四大日常追问 ➔</span>
        </a>
      </div>
    </div>
  </section>

      <!-- Chapter 3 -->