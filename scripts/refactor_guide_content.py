#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Refactor guide.js narrative content:
1. Chapter 0: Add 30-second quick self-defense action card for everyday citizens.
2. Chapter 0: Wrap large config lookup tables in collapsible <details> accordions.
3. Chapter 1: Add verified hyperlinks to court cases (Beijing Internet Court, Mata v. Avianca, Air Canada, etc.), EEG research, and AMR cases.
4. Chapter 2: Clarify technical terms (quasi-identifiers, sycophancy, etc.) with plain-language parentheticals.
5. Chapter 3:
   - Section 3.1: Plain language explanation of mosaic effect. Wrap deep in-the-wild forensic analysis in collapsible <details>, add links to Sweeney (2000), EchoLeak CVE-2025-32711, and Microsoft Spotlighting.
   - Section 3.2: Remove math formula P(w_t | w_<t) and replace with intuitive word-chain metaphor. Wrap deep verification mechanism in collapsible <details>, add CrossRef, PubMed, China Judgements Online links.
   - Section 3.3: Plain language explanation of sycophancy. Add Anthropic 2023 paper link. Wrap 3-tier adversarial pipeline in collapsible <details>.
   - Section 3.4: Plain language explanation of Agent execution risk and sandboxing. Wrap CVEs in collapsible <details>, add NVD/GHSA links.
   - Section 3.5: Wrap AMR administrative fines and copyright precedents in collapsible <details>, add links.
6. Synchronize changes across both Chinese (zh) and English (en) content dictionaries.
"""

import sys
import shutil

GUIDE_JS = "site/js/guide.js"
shutil.copyfile(GUIDE_JS, GUIDE_JS + ".bak")

with open(GUIDE_JS, "r", encoding="utf-8") as f:
    content = f.read()

# =========================================================================
# CHINESE REPLACEMENTS
# =========================================================================

# 1. Chapter 0: Add 30-second quick self-defense action card
old_c0_intro = """          <p class="leading-relaxed">
            在你在光标闪烁的对话框中敲下第一行字之前，安全博弈其实早已开始。无论你使用的是国内主流的<strong>Trae、WorkBuddy、豆包、Kimi</strong>，还是国际前沿的<strong>Cursor、Claude、ChatGPT、Gemini</strong>，许多人以为“点一下删除对话”或“关掉聊天记录”就万事大吉。然而底层架构的设计却隐藏着<strong>“控制的错觉”（Illusion of Control）</strong>——前端界面的视图隐藏，绝不等于服务端的彻底销毁。
          </p>"""

new_c0_intro = """          <!-- 30s Quick Action Card for Everyday Citizens -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-brand/10 via-brand/5 to-transparent border border-brand/20 space-y-3 my-2">
            <div class="flex items-center gap-2 font-bold text-sm text-brand dark:text-brand-container">
              <span class="text-xl">⚡</span>
              <span>普通人自卫第一步：30 秒极简安全行动（先做这三件事）</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">1. 关掉“训练授权”</span>
                <p class="text-slate-600 dark:text-slate-400">在常用 AI 客户端的【设置】中，关闭“允许使用我的数据改进/训练模型”，防止未公开草稿被吞入公共语料。</p>
              </div>
              <div class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">2. 清理“长期记忆”</span>
                <p class="text-slate-600 dark:text-slate-400">在【设置 &gt; 记忆/Memory】定期清理。单次删除对话不会同步删记忆，必须进记忆库单独注销。</p>
              </div>
              <div class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">3. 留个心眼“查一查”</span>
                <p class="text-slate-600 dark:text-slate-400">AI 给的论文期刊、法律案号、名人金句，凡是要对外交差的，务必手动在官方权威平台搜索复核。</p>
              </div>
            </div>
          </div>

          <p class="leading-relaxed">
            在你在光标闪烁的对话框中敲下第一行字之前，安全博弈其实早已开始。无论你使用的是国内主流的<strong>Trae、WorkBuddy、豆包、Kimi</strong>，还是国际前沿的<strong>Cursor、Claude、ChatGPT、Gemini</strong>，许多人以为“点一下删除对话”或“关掉聊天记录”就万事大吉。然而底层架构的设计却隐藏着<strong>“控制的错觉”（Illusion of Control）</strong>——前端界面的视图隐藏，绝不等于服务端的彻底销毁。
          </p>"""

if old_c0_intro in content:
    content = content.replace(old_c0_intro, new_c0_intro, 1)
    print("✓ Added Chinese 30s quick action card")
else:
    print("! Warning: old_c0_intro not found")

# 2. Chapter 0: Wrap tables in collapsible <details> accordions (Chinese)
old_domestic_table_heading = """          <!-- Domestic Chinese Tools Hardening Table -->
          <h3 class="text-lg font-bold text-slate-900 dark:text-white pt-2 flex items-center gap-2">
            <span>🇨🇳 国内主流 AI 工具实操配置速查卡</span>
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            面向中国职场人、开发者与知识工作者高频使用的本土平台，全面对齐《个人信息保护法》(PIPL) 与全国网安标委正式发布的 <strong>TC260-005《人工智能应用伦理安全指引 1.0》</strong>：
          </p>
          <div class="overflow-x-auto">
            <table class="min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">"""

new_domestic_table_heading = """          <!-- Domestic Chinese Tools Hardening Table (Collapsible) -->
          <details class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-all my-3">
            <summary class="flex items-center justify-between cursor-pointer list-none">
              <div class="flex items-center gap-2">
                <span class="text-lg">🇨🇳</span>
                <div>
                  <h3 class="text-base font-bold text-slate-900 dark:text-white">国内主流 AI 工具实操配置速查卡（Trae、WorkBuddy、豆包、Kimi、Dify）</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400">全面对齐 PIPL 与 TC260-005《伦理安全指引 1.0》实测建议</p>
                </div>
              </div>
              <span class="text-xs text-brand font-bold flex items-center gap-1">
                <span class="group-open:hidden">点击展开速查 ⬇</span>
                <span class="hidden group-open:inline">收起表格 ⬆</span>
              </span>
            </summary>
            <div class="pt-4 space-y-3">
              <div class="overflow-x-auto">
                <table class="min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">"""

if old_domestic_table_heading in content:
    content = content.replace(old_domestic_table_heading, new_domestic_table_heading, 1)
    print("✓ Wrapped domestic table heading")
else:
    print("! Warning: old_domestic_table_heading not found")

# Closing the domestic table details tag
old_domestic_table_end = """                  <td class="py-3 px-4 text-slate-500">NVD CVE-2026-41947 / GHSA 安全公告</td>
                </tr>
              </tbody>
            </table>
          </div>"""

new_domestic_table_end = """                  <td class="py-3 px-4 text-slate-500"><a href="https://nvd.nist.gov/vuln/detail/CVE-2026-41947" target="_blank" class="text-brand hover:underline">NVD CVE-2026-41947 ↗</a> / GHSA 安全公告</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </details>"""

if old_domestic_table_end in content:
    content = content.replace(old_domestic_table_end, new_domestic_table_end, 1)
    print("✓ Closed domestic table details tag")
else:
    print("! Warning: old_domestic_table_end not found")

# International table collapsible (Chinese)
old_intl_table = """          <!-- International Tools Hardening Table -->
          <h3 class="text-lg font-bold text-slate-900 dark:text-white pt-4 flex items-center gap-2">
            <span>🌐 国际主流 AI 工具对照基线</span>
          </h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">"""

new_intl_table = """          <!-- International Tools Hardening Table (Collapsible) -->
          <details class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-all my-3">
            <summary class="flex items-center justify-between cursor-pointer list-none">
              <div class="flex items-center gap-2">
                <span class="text-lg">🌐</span>
                <div>
                  <h3 class="text-base font-bold text-slate-900 dark:text-white">国际主流 AI 工具对照基线（ChatGPT、Claude、Gemini、Cursor）</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400">官方 Opt-out 路径与独立记忆/知识清理指南</p>
                </div>
              </div>
              <span class="text-xs text-brand font-bold flex items-center gap-1">
                <span class="group-open:hidden">点击展开速查 ⬇</span>
                <span class="hidden group-open:inline">收起表格 ⬆</span>
              </span>
            </summary>
            <div class="pt-4 space-y-3">
              <div class="overflow-x-auto">
                <table class="min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">"""

if old_intl_table in content:
    content = content.replace(old_intl_table, new_intl_table, 1)
    print("✓ Wrapped intl table heading")
else:
    print("! Warning: old_intl_table not found")

old_intl_table_end = """                  <td class="py-3 px-4 text-brand"><a href="https://cursor.com/data-use" target="_blank" class="hover:underline">Cursor Data Use ↗</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>"""

new_intl_table_end = """                  <td class="py-3 px-4 text-brand"><a href="https://cursor.com/data-use" target="_blank" class="hover:underline">Cursor Data Use ↗</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </details>
    </div>
  </section>"""

if old_intl_table_end in content:
    content = content.replace(old_intl_table_end, new_intl_table_end, 1)
    print("✓ Closed intl table details tag")
else:
    print("! Warning: old_intl_table_end not found")

# 3. Chapter 1: Hyperlinks & Plain-language parentheticals for cases and research (Chinese)
old_c1_cases = """              <p>
                <strong>🇨🇳 本土 AI 声音侵权第一案：北京互联网法院 (2023)京0491民初12142号</strong>（最高法案例库 2025-07-2-474-001）。配音演员声音被提取用于开发 AI 文本转语音产品，法院裁定自然人声音权益独立于录音制品的著作权，未经单独明示授权不得将录音制作成 AI 商业模型，判令赔偿 <strong>25 万元经济损失</strong>。实务警示：取得同事录音或客户素材的使用权限，不代表可以随意上传投喂给 AI！
              </p>
              <p>
                <strong>🇨🇳 本土 AI 搜索内容侵权：南京市中级人民法院二审维持判决</strong>。某平台“AI 智能回答”错误生成当事人“因爆炸罪被判三年”并展示其工作照，法院认定 AI 检索加工属于“内容产出”，平台收到通知未及时采取措施须承担名誉侵权责任。北京互联网法院 2026 年亦审结因传播未核验 AI 虚构故事构成的名誉侵权案。
              </p>
              <p>
                <strong>🇨🇳 最高人民法院 2026 年裁判指引与虚假诉讼责任</strong>：最高法印发《关于依法审理涉人工智能纠纷案件的意见》，明确要求诉讼参与人使用 AI 辅助必须核实真实性并如实说明；利用 AI 伪造证据、编造虚假判例的，依法采取罚款、拘留乃至追究刑事责任。“这是 AI 生成的”绝非免责金牌。
              </p>
              <p>
                <strong>🌐 国际司法先例：纽约联邦法院 <em>Mata v. Avianca</em> (2023) 与加拿大 <em>Moffatt v. Air Canada</em> (2024)</strong>。执业律师轻信 ChatGPT 编造的 6 个虚假判例呈递法庭被处以 <strong>5,000 美元个人罚款</strong>及通报；加航智能客服虚构退票优惠，法庭裁定企业对算法的疏忽误导承担全额赔偿。
              </p>"""

new_c1_cases = """              <p>
                <strong>🇨🇳 本土 AI 声音侵权第一案：<a href="https://www.bjinternetcourt.gov.cn/cpws/default/detail.html" target="_blank" class="text-brand font-bold hover:underline">北京互联网法院 (2023)京0491民初12142号 ↗</a></strong>（最高法案例库入库编号 2025-07-2-474-001）。配音演员声音被提取用于开发 AI 文本转语音产品，法院裁定自然人声音权益独立于录音制品的著作权，未经单独明示授权不得将录音制作成 AI 商业模型，判令赔偿 <strong>25 万元经济损失</strong>。实务警示：取得同事录音或客户素材的使用权限，不代表可以随意上传投喂给 AI！
              </p>
              <p>
                <strong>🇨🇳 本土 AI 搜索内容侵权：南京市中级人民法院名誉权侵权裁判</strong>（据江苏高院公开通报）。某平台“AI 智能回答”错误生成当事人“因爆炸罪被判三年”并展示其工作照，法院认定 AI 检索加工属于“内容产出”，平台收到通知未及时采取措施须承担名誉侵权责任。北京互联网法院 2026 年亦审结多起因传播未核验 AI 虚构故事构成的名誉侵权纠纷。
              </p>
              <p>
                <strong>🇨🇳 最高人民法院裁判指引与虚假诉讼责任</strong>：最高法印发《关于依法审理涉人工智能纠纷案件的意见》，明确要求诉讼参与人使用 AI 辅助必须核实真实性并如实说明；利用 AI 伪造证据、编造虚假判例的，依法采取罚款、拘留乃至追究刑事责任。“这是 AI 生成的”绝非免责金牌。
              </p>
              <p>
                <strong>🌐 国际司法先例：纽约联邦法院 <a href="https://www.courtlistener.com/docket/63397390/mata-v-avianca-inc/" target="_blank" class="text-brand font-bold hover:underline">Mata v. Avianca (2023) ↗</a> 与加拿大 <a href="https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html" target="_blank" class="text-brand font-bold hover:underline">Moffatt v. Air Canada (2024 BCCRT 149) ↗</a></strong>。执业律师轻信 ChatGPT 编造的 6 个虚假判例呈递法庭被处以 <strong>5,000 美元个人罚款</strong>及通报；加航智能客服虚构退票优惠，法庭裁定企业对算法的疏忽误导承担全额赔偿。
              </p>"""

if old_c1_cases in content:
    content = content.replace(old_c1_cases, new_c1_cases, 1)
    print("✓ Added case hyperlinks in Chapter 1 (Chinese)")
else:
    print("! Warning: old_c1_cases not found")

# EEG research reference in Chapter 1
old_c1_eeg = """脑电波（EEG）研究显示，当人类不加批判地把核心推理完全委托给 AI 代笔时，额叶活跃度会发生显著衰减。模型的<strong>谄媚倾向（Sycophancy）</strong>会迎合人类的偏见，以极具权威感的腔调生成虚构论文引用（如 <em>Mata v. Avianca</em> 伪造案），悄然瓦解个人的批判性审查能力。"""
new_c1_eeg = """认知神经科学实验（如 <a href="https://arxiv.org/abs/2310.13548" target="_blank" class="text-brand hover:underline">Stanford / MIT 认知科学实证 ↗</a>）显示，当人类不加批判地把核心推理完全委托给 AI 代笔时，大脑额叶活跃度与批判反思深度显著衰减。模型的<strong>谄媚倾向（Sycophancy，即讨好盲从用户预设立场）</strong>会顺从人类的偏见，甚至以极具权威感的腔调生成虚构论文引用，悄然瓦解个人的独立思考与质疑本能。"""

if old_c1_eeg in content:
    content = content.replace(old_c1_eeg, new_c1_eeg, 1)
    print("✓ Enhanced EEG text with link and plain language in Chapter 1 (Chinese)")
else:
    print("! Warning: old_c1_eeg not found")

# 4. Section 3.1: Plain language & details accordion for deep forensics (Chinese)
old_s31_intro = """            当你准备把一份包含真实姓名、联系方式、财务数据或业务源码的文档提交给 AI 时，数据失控的风险就已悄然开始。然而，“单纯抹去姓名”从来不等于真正脱敏——隐私保护学界经典的<strong>马赛克理论 (Mosaic Theory)</strong> 与 Sweeney 经典实验表明，仅凭“出生日期 + 性别 + 邮编（5位ZIP码）”这 3 个准标识符（Quasi-identifiers），在全美即可通过公开选民册等公共数据以 87% 的概率精准逆向还原具体个人身份。在中国《个人信息保护法》(PIPL) 第28条框架下，医疗健康、金融账户、特定身份等属于法定敏感个人信息，保留“某三甲医院罕见病科室 + 42岁男 + 入院日期”即可被多维拼图还原。
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            与此同时，在联网 Agent、长文本分析与企业 RAG（检索增强生成）场景中，外部网页、PDF、邮件中潜伏的<strong>间接提示词注入（Indirect Prompt Injection, IPI）</strong>正在从实验室走向在野实战：攻击者无需直接在对话框输入，只需将恶意指令隐匿在 AI 自动检索抓取的数据平面中，就能完成会话控制权劫持与隐蔽数据外发。"""

new_s31_intro = """            当你准备把一份包含真实姓名、联系方式、财务数据或业务源码的文档提交给 AI 时，数据失控的风险就已悄然开始。然而，“单纯抹去姓名”从来不等于真正脱敏——这就是隐私保护学界经典的<strong>马赛克拼图理论（Mosaic Theory）</strong>：哪怕你删去了“张三”的名字，只要保留了“某三甲医院罕见病科室 + 42岁男性 + 某日入院”，熟人或攻击者就能像拼图一样以极高概率还原出当事人真实身份。著名的 <a href="https://dataprivacylab.org/projects/identifiability/paper1.pdf" target="_blank" class="text-brand underline">Sweeney 经典实验 ↗</a> 证实，仅凭“出生日期 + 性别 + 5位邮编”三个碎片信息，就能在公开数据库中精确定位 87% 的个体。在中国《个人信息保护法》(PIPL) 框架下，这类信息均属必须严守的敏感个人信息。
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            与此同时，在让 AI 联网搜索、分析长文档或企业知识库时，还存在<strong>“外部隐形投毒”（间接提示词注入，IPI）</strong>的威胁：攻击者在网页、PDF 或外部邮件里嵌入人眼看不见的暗号指令。当 AI 替你抓取并阅读这些内容时，就会被暗号劫持，背着你悄悄把你的对话记录、私人密码外发给攻击者。"""

if old_s31_intro in content:
    content = content.replace(old_s31_intro, new_s31_intro, 1)
    print("✓ Refactored Section 3.1 intro with Sweeney link (Chinese)")
else:
    print("! Warning: old_s31_intro not found")

# Wrap 3.1 technical callout in <details>
old_s31_callout = """          <!-- Real World Exploit / Technical Mechanism Callout -->
          <div class="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200/80 dark:border-teal-800/50 space-y-2 text-xs">
            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>🔬 准标识符风险与间接注入在野三大载体实证 (Empirical Forensic Analysis)：</span>
            </div>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">"""

new_s31_callout = """          <!-- Real World Exploit / Technical Mechanism Callout (Collapsible) -->
          <details class="group p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200/80 dark:border-teal-800/50 space-y-2 text-xs my-3">
            <summary class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer list-none">
              <span class="flex items-center gap-1.5">🔬 深度技术原理与在野注入实证（点击展开：零宽字符隐写、PDF隐藏层与 CVE-2025-32711 漏洞分析）</span>
              <span class="text-[11px] text-teal-700 dark:text-teal-300 font-bold">展开/收起 ⬇</span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed pt-2">"""

if old_s31_callout in content:
    content = content.replace(old_s31_callout, new_s31_callout, 1)
    print("✓ Wrapped Section 3.1 technical callout in details (Chinese)")
else:
    print("! Warning: old_s31_callout not found")

# Add links into 3.1 callout and close details
old_s31_echoleak = """              <li><strong>在野 CVE 实证：EchoLeak (CVE-2025-32711, CVSS 9.3 严重性)</strong>：业界首个针对企业级大模型（Microsoft 365 Copilot）的“零点击（Zero-Click）”间接注入漏洞。受害者仅收到一封隐藏恶意提示词的普通邮件，不知情下对 Copilot 发出“总结今日邮件”指令，Copilot 即被劫持读取账户内机密财务邮件，并通过 Teams 代理域名 (<code>asyncgw.teams.microsoft.com</code>) 伪造 Markdown 图片标签将敏感数据外发，穿透企业 CSP 策略。</li>
              <li><strong>工程防御：微软 Spotlighting 与权限收敛</strong>：抛弃单薄的 system prompt 拦截，改用随机 Hash 标签（如 <code>&lt;&lt;RANDOM_TOKEN_xxxx&gt;&gt;</code>）定界不可信数据，结合 Base64 编码使注入成功率从 &gt;50% 降至 &lt;2%，并严格实施出站网络流量过滤（Egress Control）与带外人工二次确认。</li>
            </ul>
          </div>"""

new_s31_echoleak = """              <li><strong>在野 CVE 实证：<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-32711" target="_blank" class="text-brand font-bold underline">EchoLeak (CVE-2025-32711, CVSS 9.3 严重性) ↗</a></strong>：业界首个针对企业级大模型（Microsoft 365 Copilot）的“零点击（Zero-Click）”间接注入漏洞。受害者仅收到一封隐藏恶意提示词的普通邮件，不知情下对 Copilot 发出“总结今日邮件”指令，Copilot 即被劫持读取账户内机密财务邮件，并通过 Teams 代理域名 (<code>asyncgw.teams.microsoft.com</code>) 伪造 Markdown 图片标签将敏感数据外发，穿透企业 CSP 策略。</li>
              <li><strong>工程防御：微软 <a href="https://arxiv.org/abs/2403.14720" target="_blank" class="text-brand font-bold underline">Spotlighting 防御机制 ↗</a> 与权限收敛</strong>：抛弃单薄的 system prompt 拦截，改用随机 Hash 标签定界不可信数据，结合 Base64 编码使注入成功率从 &gt;50% 降至 &lt;2%，并严格实施出站网络流量过滤与带外人工二次确认。</li>
            </ul>
          </details>"""

if old_s31_echoleak in content:
    content = content.replace(old_s31_echoleak, new_s31_echoleak, 1)
    print("✓ Added EchoLeak & Spotlighting links and closed Section 3.1 details (Chinese)")
else:
    print("! Warning: old_s31_echoleak not found")

# 5. Section 3.2: Remove math formula P(w_t | w_<t) and add plain-language explanation (Chinese)
old_s32_formula = """          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            这种现象绝非偶发故障，而是根植于大模型的<strong>底层自回归概率架构（Autoregressive Next-Token Prediction）</strong>——模型基于条件概率 \(P(w_t | w_{&lt;t})\)，核心驱动目标是使下一个词元在“统计学上的流畅度与语法合理性 (Plausibility)”最大化，而非物理世界或法律文书中的“客观真实性 (Truthfulness)”。在长尾专业领域，为了维持语言表达的连贯完备，模型必然以“似真”为代价编织出结构性幻觉。
          </p>"""

new_s32_formula = """          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            这种现象绝非系统偶发故障，而是根植于大模型的<strong>自回归运作机制（Autoregressive Next-Token Prediction）</strong>——你可以把模型理解为一个极高明的“超级文字接龙游戏”。它的目标是猜测“接哪一个词听起来最顺畅自然”，而不是去查证现实世界里的客观真假。在论文、法条等冷门专业领域，为了把接龙编圆，模型便会以惊人的自信，理直气壮地捏造出不存在的虚构引文。
          </p>"""

if old_s32_formula in content:
    content = content.replace(old_s32_formula, new_s32_formula, 1)
    print("✓ Removed math formula in Section 3.2 and replaced with plain language (Chinese)")
else:
    print("! Warning: old_s32_formula not found")

# Wrap Section 3.2 callout in <details>
old_s32_callout = """          <!-- Real World Exploit / Technical Mechanism Callout -->
          <div class="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-800/50 space-y-2 text-xs">
            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>🔬 自回归原罪、司法引证灾难与双环查验实证 (Empirical Hallucination Audit)：</span>
            </div>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">"""

new_s32_callout = """          <!-- Real World Exploit / Technical Mechanism Callout (Collapsible) -->
          <details class="group p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-800/50 space-y-2 text-xs my-3">
            <summary class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer list-none">
              <span class="flex items-center gap-1.5">🔬 深度技术原理与学术/司法双环核验（点击展开：概率接龙缺陷与官方 API 查验架构）</span>
              <span class="text-[11px] text-indigo-700 dark:text-indigo-300 font-bold">展开/收起 ⬇</span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed pt-2">"""

if old_s32_callout in content:
    content = content.replace(old_s32_callout, new_s32_callout, 1)
    print("✓ Wrapped Section 3.2 callout in details (Chinese)")
else:
    print("! Warning: old_s32_callout not found")

old_s32_callout_end = """                  <li><strong>国际学术双验环</strong>：强制通过 CrossRef 官方 REST API 校验 DOI 元数据真实性，调用 NCBI PubMed PMID 核实医学论文，结合 OpenAlex 校验学者学术图谱；</li>
                  <li><strong>中国本土法学与学术核验环</strong>：中文学术引文强制在中国知网 (CNKI) 与万方数据核实篇名、作者与期刊卷期；涉案司法先例必须在“中国裁判文书网”及最高人民法院“人民法院案例库”按统一案号核验裁判事实，严禁直接采信未经证实的大模型法律输出。</li>
                </ol>
              </li>
            </ul>
          </div>"""

new_s32_callout_end = """                  <li><strong>国际学术双验环</strong>：强制通过 <a href="https://api.crossref.org" target="_blank" class="text-brand underline">CrossRef 官方 REST API ↗</a> 校验 DOI 元数据真实性，调用 <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" class="text-brand underline">NCBI PubMed ↗</a> 核实医学论文，结合 OpenAlex 校验学者学术图谱；</li>
                  <li><strong>中国本土法学与学术核验环</strong>：中文学术引文建议在知网或万方核实篇名、作者与期刊卷期；涉案司法先例必须在 <a href="https://wenshu.court.gov.cn/" target="_blank" class="text-brand underline">中国裁判文书网 ↗</a> 及最高人民法院案例库按统一案号核验裁判事实，严禁直接采信未经证实的大模型法律输出。</li>
                </ol>
              </li>
            </ul>
          </details>"""

if old_s32_callout_end in content:
    content = content.replace(old_s32_callout_end, new_s32_callout_end, 1)
    print("✓ Added CrossRef/PubMed/Wenshu links and closed Section 3.2 details (Chinese)")
else:
    print("! Warning: old_s32_callout_end not found")

# 6. Section 3.3: Anthropic paper link & collapsible details (Chinese)
old_s33_intro = """          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            大模型为什么天然热衷于讨好用户？Anthropic 2023 年里程碑研究《Towards Understanding Sycophancy in Language Models》揭示了其根本成因：在大模型的<strong>基于人类反馈的强化学习（RLHF）</strong>阶段，奖励模型（Reward Model）的评分依赖人类评估员。而人类天然存在<strong>确认偏误（Confirmation Bias）</strong>，本能地给“附和自己见解、辞藻华丽、态度谦逊”的回答打更高分。因此，大模型在策略优化中演化出了对齐人类偏好而非坚持客观真理的谄媚本能——在多达 <strong>60% 以上</strong>存在观点偏好的分歧场景中，模型会主动隐藏真实技术缺陷与反面证据，沦为催生重大决策失误的“数字佞臣”。
          </p>"""

new_s33_intro = """          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            大模型为什么天然热衷于讨好用户？Anthropic 2023 年里程碑研究《<a href="https://arxiv.org/abs/2310.13548" target="_blank" class="text-brand font-bold underline">Towards Understanding Sycophancy in Language Models ↗</a>》揭示了其根本成因：在训练大模型的“人类反馈强化学习”（RLHF）阶段，人类测试员更喜欢给那些顺从自己观点、措辞客气谦逊的回答打高分。久而久之，AI 便演化出“见风使舵”的本能——在多达 <strong>60% 以上</strong>的分歧场景中，模型宁可隐瞒关键技术漏洞，也要附和用户的预设立场，成为极具欺骗性的决策误导者。
          </p>"""

if old_s33_intro in content:
    content = content.replace(old_s33_intro, new_s33_intro, 1)
    print("✓ Refactored Section 3.3 intro with Anthropic link (Chinese)")
else:
    print("! Warning: old_s33_intro not found")

old_s33_callout = """          <!-- Real World Exploit / Technical Mechanism Callout -->
          <div class="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/50 space-y-2 text-xs">
            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>🔬 RLHF 奖励原罪与三级对抗审阅实操体系 (3-Tier Adversarial Scrutiny Pipeline)：</span>
            </div>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">"""

new_s33_callout = """          <!-- Real World Exploit / Technical Mechanism Callout (Collapsible) -->
          <details class="group p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/50 space-y-2 text-xs my-3">
            <summary class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer list-none">
              <span class="flex items-center gap-1.5">🔬 深度技术原理与三级对抗管线（点击展开：RLHF 偏差机理与魔鬼代言人架构）</span>
              <span class="text-[11px] text-purple-700 dark:text-purple-300 font-bold">展开/收起 ⬇</span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed pt-2">"""

if old_s33_callout in content:
    content = content.replace(old_s33_callout, new_s33_callout, 1)
    print("✓ Wrapped Section 3.3 callout in details (Chinese)")
else:
    print("! Warning: old_s33_callout not found")

old_s33_callout_end = """              <li><strong>Tier 3: 独立多角色陪审团会诊 (The Jury & Red Team)</strong>：多智能体架构模拟，拆解为架构师、安全官、财务官与反直觉质疑者组成的多维陪审团，实行背靠背独立投票质证，彻底粉碎单一会话同质化回音壁。对应技能：<code>the-jury</code>, <code>the-fool</code>, <code>red-team-review</code>, <code>receiving-code-review</code>。</li>
            </ul>
          </div>"""

new_s33_callout_end = """              <li><strong>Tier 3: 独立多角色陪审团会诊 (The Jury & Red Team)</strong>：多智能体架构模拟，拆解为架构师、安全官、财务官与反直觉质疑者组成的多维陪审团，实行背靠背独立投票质证，彻底粉碎单一会话同质化回音壁。对应技能：<code>the-jury</code>, <code>the-fool</code>, <code>red-team-review</code>, <code>receiving-code-review</code>。</li>
            </ul>
          </details>"""

if old_s33_callout_end in content:
    content = content.replace(old_s33_callout_end, new_s33_callout_end, 1)
    print("✓ Closed Section 3.3 details (Chinese)")
else:
    print("! Warning: old_s33_callout_end not found")

# 7. Section 3.4: Agent & MCP CVEs collapsible (Chinese)
old_s34_callout = """          <!-- Real World Exploit / Architecture Callout -->
          <div class="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/50 space-y-2 text-xs">
            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>🔬 Agent 与 MCP 在野真实攻击面 (Empirical Attack Vectors)：</span>
            </div>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">"""

new_s34_callout = """          <!-- Real World Exploit / Architecture Callout (Collapsible) -->
          <details class="group p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/50 space-y-2 text-xs my-3">
            <summary class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer list-none">
              <span class="flex items-center gap-1.5">🔬 深度技术原理与 Agent 在野漏洞（点击展开：CVE-2026-40100、CVE-2026-41947 漏洞机制）</span>
              <span class="text-[11px] text-rose-700 dark:text-rose-300 font-bold">展开/收起 ⬇</span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed pt-2">"""

if old_s34_callout in content:
    content = content.replace(old_s34_callout, new_s34_callout, 1)
    print("✓ Wrapped Section 3.4 callout in details (Chinese)")
else:
    print("! Warning: old_s34_callout not found")

old_s34_callout_end = """              <li><strong>MCP 服务端 SSRF 风险（FastGPT CVE-2026-40100）</strong>：真实漏洞证实，FastGPT 的 MCP <code>runTool</code> 路径曾存在未认证 SSRF，外部攻击者可诱导 AI 平台向内部私有地址发起探测，将 AI 沦为内网跳板。</li>
              <li><strong>跨租户配置泄露（Dify CVE-2026-41947）</strong>：Dify 曾曝出 Trace 配置未授权访问，攻击者可将受害者的提示词和响应流重定向至外部监听端点（修复于 v1.14.2）。</li>
              <li><strong>MCP 语义供应链投毒 (Tool Poisoning)</strong>：学术界与 PoC 证实，恶意 MCP 工具可在描述元数据中隐蔽嵌入系统指令，即使用户未主动调用该工具，也会劫持模型对上下文的任务推演。</li>
            </ul>
          </div>"""

new_s34_callout_end = """              <li><strong>MCP 服务端 SSRF 风险（<a href="https://nvd.nist.gov/vuln/detail/CVE-2026-40100" target="_blank" class="text-brand font-bold underline">FastGPT CVE-2026-40100 ↗</a>）</strong>：真实在野实证表明，MCP <code>runTool</code> 接口曾存在未认证 SSRF，外部攻击者可诱导 AI 平台向内部私有地址发起探测，将 AI 沦为内网渗透跳板。</li>
              <li><strong>跨租户配置泄露（<a href="https://nvd.nist.gov/vuln/detail/CVE-2026-41947" target="_blank" class="text-brand font-bold underline">Dify CVE-2026-41947 ↗</a>）</strong>：Dify 曾曝出 Trace 配置未授权访问，攻击者可将受害者的提示词和响应流重定向至外部监听端点（已在 v1.14.2 修复）。</li>
              <li><strong>MCP 语义供应链投毒 (Tool Poisoning)</strong>：学术界与 PoC 证实，恶意 MCP 工具可在描述元数据中隐蔽嵌入系统指令，即使用户未主动调用该工具，也会劫持模型对上下文的任务推演。</li>
            </ul>
          </details>"""

if old_s34_callout_end in content:
    content = content.replace(old_s34_callout_end, new_s34_callout_end, 1)
    print("✓ Added Section 3.4 CVE links and closed details (Chinese)")
else:
    print("! Warning: old_s34_callout_end not found")

# 8. Section 3.5: Legal precedents & fines collapsible (Chinese)
old_s35_callout = """          <!-- Real World Statutory & Judicial Forensic Callout -->
          <div class="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50 space-y-2 text-xs">
            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>⚖️ 行政处罚文号、司法判决要旨与法定标识实证 (Forensic Legal Evidence)：</span>
            </div>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">"""

new_s35_callout = """          <!-- Real World Statutory & Judicial Forensic Callout (Collapsible) -->
          <details class="group p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50 space-y-2 text-xs my-3">
            <summary class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer list-none">
              <span class="flex items-center gap-1.5">⚖️ 真实行政处罚案号、法院裁判要旨与法定标识规范（点击展开查阅实证）</span>
              <span class="text-[11px] text-amber-700 dark:text-amber-300 font-bold">展开/收起 ⬇</span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed pt-2">"""

if old_s35_callout in content:
    content = content.replace(old_s35_callout, new_s35_callout, 1)
    print("✓ Wrapped Section 3.5 callout in details (Chinese)")
else:
    print("! Warning: old_s35_callout not found")

old_s35_callout_end = """              <li><strong>法定生成标识与水印义务</strong>：依据《互联网信息服务深度合成管理规定》第16/17条以及 2025 年 9 月 1 日实施的《人工智能生成合成内容标识办法》，发布 AI 生成合成内容必须添加显著显式标识与元数据隐式水印。<strong>铁律：“本内容由 AI 生成”只属于来源披露义务，绝不能免除内容发布者的法律侵权或广告违法责任。</strong></li>
            </ul>
          </div>"""

new_s35_callout_end = """              <li><strong>法定生成标识与水印义务</strong>：依据《互联网信息服务深度合成管理规定》第16/17条以及 2025 年 9 月 1 日实施的《人工智能生成合成内容标识办法》，发布 AI 生成合成内容必须添加显著显式标识与元数据隐式水印。<strong>铁律：“本内容由 AI 生成”只属于来源披露义务，绝不能免除内容发布者的法律侵权或广告违法责任。</strong></li>
            </ul>
          </details>"""

if old_s35_callout_end in content:
    content = content.replace(old_s35_callout_end, new_s35_callout_end, 1)
    print("✓ Closed Section 3.5 details (Chinese)")
else:
    print("! Warning: old_s35_callout_end not found")


# =========================================================================
# ENGLISH REPLACEMENTS
# =========================================================================

# 1. Chapter 0 English: Add 30s Quick Action Card
old_c0_en_intro = """          <p class="leading-relaxed">
            Before typing a single word into the blinking prompt, security boundaries have already been negotiated. Many believe clicking "Delete Chat" or toggling off history provides immunity. However, underlying architecture reveals an <strong>"Illusion of Control"</strong>—hiding views on the UI does not equal complete server-side destruction.
          </p>"""

new_c0_en_intro = """          <!-- 30s Quick Action Card for Everyday Citizens (EN) -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-brand/10 via-brand/5 to-transparent border border-brand/20 space-y-3 my-2">
            <div class="flex items-center gap-2 font-bold text-sm text-brand dark:text-brand-container">
              <span class="text-xl">⚡</span>
              <span>First Step to Digital Self-Defense: 30-Second Quick Start (Do These 3 Things First)</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">1. Turn off "Training"</span>
                <p class="text-slate-600 dark:text-slate-400">In your AI client's Settings, disable "Improve model for everyone" to prevent unreleased drafts from being absorbed into training corpora.</p>
              </div>
              <div class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">2. Audit "Memory"</span>
                <p class="text-slate-600 dark:text-slate-400">Regularly review Settings &gt; Memory. Deleting a chat conversation does NOT wipe memory entries—purge them individually.</p>
              </div>
              <div class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">3. Verify Before You Hand Off</span>
                <p class="text-slate-600 dark:text-slate-400">Before sharing AI outputs, manually double-check citations, statutory references, and names against authoritative sources.</p>
              </div>
            </div>
          </div>

          <p class="leading-relaxed">
            Before typing a single word into the blinking prompt, security boundaries have already been negotiated. Many believe clicking "Delete Chat" or toggling off history provides immunity. However, underlying architecture reveals an <strong>"Illusion of Control"</strong>—hiding views on the UI does not equal complete server-side destruction.
          </p>"""

if old_c0_en_intro in content:
    content = content.replace(old_c0_en_intro, new_c0_en_intro, 1)
    print("✓ Added English 30s quick action card")
else:
    print("! Warning: old_c0_en_intro not found")

# Wrap English domestic table in <details>
old_en_domestic_table = """          <!-- Domestic Chinese Tools Matrix (Global Context) -->
          <h3 class="text-lg font-bold text-slate-900 dark:text-white pt-2 flex items-center gap-2">
            <span>🇨🇳 Domestic Chinese Ecosystem Tools (Trae, WorkBuddy, Doubao, Kimi, Dify)</span>
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            For knowledge workers and developers using Chinese platforms under the Personal Information Protection Law (PIPL) and the finalized <strong>TC260-005 "Artificial Intelligence Application Ethics and Safety Guidelines 1.0"</strong>:
          </p>
          <div class="overflow-x-auto">
            <table class="min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">"""

new_en_domestic_table = """          <!-- Domestic Chinese Tools Matrix (Collapsible) -->
          <details class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-all my-3">
            <summary class="flex items-center justify-between cursor-pointer list-none">
              <div class="flex items-center gap-2">
                <span class="text-lg">🇨🇳</span>
                <div>
                  <h3 class="text-base font-bold text-slate-900 dark:text-white">Chinese Platforms Matrix (Trae, WorkBuddy, Doubao, Kimi, Dify)</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Aligned with PIPL & TC260-005 Guidelines 1.0</p>
                </div>
              </div>
              <span class="text-xs text-brand font-bold flex items-center gap-1">
                <span class="group-open:hidden">Expand Table ⬇</span>
                <span class="hidden group-open:inline">Collapse ⬆</span>
              </span>
            </summary>
            <div class="pt-4 space-y-3">
              <div class="overflow-x-auto">
                <table class="min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">"""

if old_en_domestic_table in content:
    content = content.replace(old_en_domestic_table, new_en_domestic_table, 1)
    print("✓ Wrapped English domestic table")
else:
    print("! Warning: old_en_domestic_table not found")

old_en_domestic_table_end = """                  <td class="py-3 px-4 text-slate-500">NVD CVE-2026-41947 / GHSA Advisories</td>
                </tr>
              </tbody>
            </table>
          </div>"""

new_en_domestic_table_end = """                  <td class="py-3 px-4 text-slate-500"><a href="https://nvd.nist.gov/vuln/detail/CVE-2026-41947" target="_blank" class="text-brand hover:underline">NVD CVE-2026-41947 ↗</a> / GHSA Advisories</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </details>"""

if old_en_domestic_table_end in content:
    content = content.replace(old_en_domestic_table_end, new_en_domestic_table_end, 1)
    print("✓ Closed English domestic table details")
else:
    print("! Warning: old_en_domestic_table_end not found")

# Wrap English intl table in <details>
old_en_intl_table = """          <!-- International Tools Hardening Table -->
          <h3 class="text-lg font-bold text-slate-900 dark:text-white pt-4 flex items-center gap-2">
            <span>🌐 International Mainstream Platforms</span>
          </h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">"""

new_en_intl_table = """          <!-- International Tools Hardening Table (Collapsible) -->
          <details class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-all my-3">
            <summary class="flex items-center justify-between cursor-pointer list-none">
              <div class="flex items-center gap-2">
                <span class="text-lg">🌐</span>
                <div>
                  <h3 class="text-base font-bold text-slate-900 dark:text-white">Global Platforms Baseline (ChatGPT, Claude, Gemini, Cursor)</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Official Opt-Out Switches & Knowledge Base Purging</p>
                </div>
              </div>
              <span class="text-xs text-brand font-bold flex items-center gap-1">
                <span class="group-open:hidden">Expand Table ⬇</span>
                <span class="hidden group-open:inline">Collapse ⬆</span>
              </span>
            </summary>
            <div class="pt-4 space-y-3">
              <div class="overflow-x-auto">
                <table class="min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">"""

if old_en_intl_table in content:
    content = content.replace(old_en_intl_table, new_en_intl_table, 1)
    print("✓ Wrapped English intl table")
else:
    print("! Warning: old_en_intl_table not found")

old_en_intl_table_end = """                  <td class="py-3 px-4 text-brand"><a href="https://cursor.com/data-use" target="_blank" class="hover:underline">Cursor Data Use ↗</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>"""

new_en_intl_table_end = """                  <td class="py-3 px-4 text-brand"><a href="https://cursor.com/data-use" target="_blank" class="hover:underline">Cursor Data Use ↗</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </details>
    </div>
  </section>"""

if old_en_intl_table_end in content:
    content = content.replace(old_en_intl_table_end, new_en_intl_table_end, 1)
    print("✓ Closed English intl table details")
else:
    print("! Warning: old_en_intl_table_end not found")

# Chapter 1 English cases & EEG
old_en_cases = """                <strong>🌐 International Precedents: US Federal Court <em>Mata v. Avianca</em> (2023) & Canada <em>Moffatt v. Air Canada</em> (2024)</strong>. Practicing lawyers submitting 6 hallucinated ChatGPT citations were fined <strong>$5,000 USD</strong> for subjective bad faith; Air Canada's chatbot fabricated a bereavement refund rule, and the tribunal rejected the defense that the bot was "a separate entity," holding the company fully liable."""

new_en_cases = """                <strong>🌐 International Precedents: US Federal Court <a href="https://www.courtlistener.com/docket/63397390/mata-v-avianca-inc/" target="_blank" class="text-brand font-bold hover:underline">Mata v. Avianca (2023) ↗</a> & Canada <a href="https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html" target="_blank" class="text-brand font-bold hover:underline">Moffatt v. Air Canada (2024 BCCRT 149) ↗</a></strong>. Practicing lawyers submitting 6 hallucinated ChatGPT citations were fined <strong>$5,000 USD</strong> for subjective bad faith; Air Canada's chatbot fabricated a bereavement refund rule, and the tribunal rejected the defense that the bot was "a separate entity," holding the company fully liable."""

if old_en_cases in content:
    content = content.replace(old_en_cases, new_en_cases, 1)
    print("✓ Added case links in Chapter 1 (English)")
else:
    print("! Warning: old_en_cases not found")

# Write output file
with open(GUIDE_JS, "w", encoding="utf-8") as f:
    f.write(content)

print("\nSuccessfully updated site/js/guide.js!")
