<section id="chapter-4" class="space-y-12 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 4 · 实战图谱</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            实战图谱：44 个技能如何精准应对现实风险？
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            技能不是冰冷的清单。在以下 6 大典型场景中，每一个技能都是应对特定风险的精准工具。
          </p>
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
                在输入前、生成中、决策时、执行时、交付前和收尾归档 6 个关键时间节点，分别会遭遇哪些具体风险？普通人与技术人员分别该如何应对？
              </p>
            </div>
            <div class="space-y-1 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-4">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>读完你能获得什么
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                掌握 6 道时间线工序防线；每一道防线均提供“零门槛日常做法、常用软件增强、专业规范技能”三档选择与验收标准。
              </p>
            </div>
          </div>
        </div>

        <!-- What is a Skill (plain-reader) -->
        <div class="p-4 sm:p-5 rounded-2xl bg-brand/5 dark:bg-brand/10 border border-brand/20 space-y-3 text-sm">
          <div class="font-bold text-slate-900 dark:text-white">先说清楚：本章提到的“技能”是什么？没有技能怎么办？</div>
          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">“技能”（SKILL.md）是一份写给 AI 助手的<strong>标准操作说明书</strong>：一个文件夹里放着说明文件，有时还附带检查脚本。只有支持 Agent Skills 规范的 AI 工具（例如 Claude Code 等智能体 / 编程工具）才能读取并按步骤执行。</p>
          <div class="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-brand/20 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <span class="font-bold text-slate-800 dark:text-slate-200 block">💡 技能卡片上的按钮与标识怎么看？（手机与电脑均支持）：</span>
            <ul class="space-y-1 pl-1 list-disc list-inside">
              <li><strong>点击任何带有技能徽章的名称或【查看依据】</strong>：原地弹出该技能的实测状态、标准依据与代码来源。</li>
              <li><strong>【复制命令】</strong>：给在终端使用 Claude Code 等智能体的读者提供的一键安装指令。</li>
              <li><strong>【开箱即用】</strong>：无需安装任何 Python 依赖；<strong>【需装依赖】</strong>：在本地终端运行时需要预装对应的分析工具包。</li>
            </ul>
          </div>
          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"><strong>如果你只用网页版或手机 App（如豆包、Kimi、ChatGPT），用不了技能也没关系���</strong>下面每一节都有“零门槛”做法，只需要浏览器和几分钟时间。想用技能的读者，可以点开文中的技能卡片查看安装命令。</p>
        </div>

        <!-- Cloud vs Local Modes & Workspace Risks (Fundamental Distinction) -->
        <div id="sec-cloud-vs-local" class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-4 text-sm shadow-xs scroll-mt-36 lg:scroll-mt-28">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
            <span class="text-[11px] font-bold text-brand uppercase tracking-wider block mb-1">基本概念辨析</span>
            <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              云端模式与本地模式的区别：数据在何处流转，以及接入工作空间的风险
            </h3>
          </div>

          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
            很多读者在初次使用 AI 时，容易把所有工具当成同一种东西。但一个 AI 工具是在云端运行还是在你的电脑本地运行，直接决定了你的数据会流经哪里。
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span class="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                第一种：云端模式（网页对话框、手机端与云端助手）
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                在这种模式下，你的设备只负责显示画面。无论你在对话框里粘贴了一段文字，还是上传了一份文件，这些内容都必须先通过网络完整发送到服务商的机房。模型在远端服务器上读取这些文字并生成回答，再传回你的屏幕。这也意味着，只要你按下了发送键，原始文字就已经离开了你的设备。
              </p>
            </div>

            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span class="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                第二种：本地模式（桌面编辑器与终端智能体）
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                这常见于 Cursor、Claude Code 等安装在个人电脑上的工具。这里的区别在于：虽然大模型本身的推理计算可能依然调用云端接口，但控制程序和你的文件都留在你的电脑硬盘里。当你要求它处理一个文件时，你在对话框里输入的通常只是文件的存放路径，而不是文件本身。本地程序可以先在你的电脑上运行一段过滤小程序，把人名和电话换成代号，然后再把处理后的副本提供给模型。
              </p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-2 text-xs sm:text-sm">
            <span class="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
              <span>⚠️ 接入工作空间（Google Drive、OneDrive、飞书或 Notion）的现实风险</span>
            </span>
            <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
              随着功能更新，不少云端产品开始提供“一键连接云盘或协同知识库”的功能。很多人为了省事会直接授权。这种授权带来两个容易被忽略的细节：
            </p>
            <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
              <li><strong>读取范围往往超出预期：</strong>多数授权协议是一次性针对整个文件夹甚至整个账号生效的。为了建立搜索索引，远端服务通常会在后台遍历并同步你账号里的历史文档、会议纪要与草稿，而不是只读取你当前正在讨论的那一篇。</li>
              <li><strong>共享文档可能夹带不可控指令：</strong>当工作空间里有多人协作时，只要其中一份共享文档、网页剪藏或外部邮件中包含恶意的隐藏提示词，远端负责检索的智能体在读取该文档时就可能受到干扰，误将其他文档的内容汇总或发送出去。</li>
            </ol>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-amber-200/60 dark:border-amber-900/40">
              如果处理的是日常公开资料，云端连接确实更方便。但如果涉及未经公开的业务底稿、人事档案或客户隐私，让远端服务保持对整个工作空间的常驻读取权限，会让个人很难把控信息的实际扩散边界。
            </p>
          </div>
        </div>

        <!-- Section 4.1 -->
        <div id="sec-4-1" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-1" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.1 输入前 · 个人隐私保护与提示词注入防范 (追问一：输入材料安全吗？)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            当你准备把一份包含真实姓名、联系方式、财务数据或业务源码的文档提交给 AI 时，数据便存在泄露风险。仅抹去人名并不等同于完成脱敏。按照隐私研究中的<strong>马赛克拼图理论（Mosaic Theory）</strong>，即使隐去姓名，只要保留“某三甲医院罕见病科室 + 42岁男性 + 某日入院”等属性组合，依然能高概率推断出当事人身份。著名的 <a href="https://dataprivacylab.org/projects/identifiability/paper1.pdf" target="_blank" class="text-brand underline">Sweeney 经典实验 ↗</a> 表明，“出生日期 + 性别 + 5位邮编”这类属性组合在特定人口数据中具有高度唯一性，因此存在再识别风险。虽然单一出生日期与邮编属于一般个人信息，但依照《个人信息保护法》第28条，一旦与医疗健康、金融账户或行踪轨迹结合，极易还原出当事人身份，构成法律严格保护的敏感个人信息。
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            与此同时，在让 AI 联网搜索、分析长文档或企业知识库时，还存在<strong>“外部隐形投毒”（间接提示词注入，IPI）</strong>的威胁：攻击者在公开网页、文档或邮件中嵌入难以直接察觉的提示词注入指令。当 AI 抓取并解析这些内容时，可能误执行该指令，导致本地上下文或密钥信息被发送至外部服务器。
          </p>

          ${renderActionPanel({
            lang: 'zh',
            dontText: '以为抹去真实姓名就是“已脱敏”，直接将包含病历科室、年龄、交易流水或业务代码的准标识符全选输入对话框；直接把未审计的外部网页、公开仓库或 PDF 发给联网 Agent 全自动抓取并赋予其外部网络通信与工具执行权限。',
            doText: '输入前先在本地将人名、电话、单位和敏感业务代号替换为占位符；对来自网页或他人的未知文档，注意防范隐藏在正文或排版中的恶意指令，避免全自动执行不可信内容。',
            tierBrowser: [
              '把真实姓名、电话、身份证号、住址替换成“[姓名A]”“[电话]”这类占位符再粘贴。',
              '年龄改成年龄段，地址只写到城市，单位只写行业。',
              '涉及国家秘密、工作秘密或他人病历的内容，不要输入任何公共 AI。',
              '让 AI 阅读陌生网页或 PDF 时，不要同时授予它收发邮件、读写文件的权限。'
            ],
            tierSoftware: [
              '先在本地文本编辑器里用“查找替换”批量替换敏感词，再复制给 AI。',
              '有条件可在本机运行开源的 Microsoft Presidio 自动识别并替换个人信息。'
            ],
            tierSkills: [
              '在支持技能的工具中启用下方的脱敏类技能（如 <code>pii-safe-documents</code>），由 AI 在发送前自动检查。',
              '安装命令见卡片详情或技能库。'
            ],
            verifyText: '把准备发送的文字转给不了解背景的同事阅读；若对方能推断出当事人身份，说明脱敏尚不充分。'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Pre-Input Defensive Pipeline)",
            titleEn: "Pre-Input Defensive Pipeline & Curated Skills",
            subtitleZh: "工序：敏感数据本地脱敏 → 投喂内容清洗 → 外部提示词注入拦截。首推 3 项核心技能，其余按需选用。",
            subtitleEn: "Pipeline: Local PII redaction → data sanitization → prompt injection defense.",
            primary: [
              {
                id: "pii-safe-documents",
                tierZh: "核心防线 · 输入前",
                tierEn: "Core Defense · Pre-Input",
                roleZh: "在本地生成可逆脱敏副本，防止向大模型泄露真实个人与客户隐私",
                roleEn: "Creates local redacted working copy to protect private PII from cloud upload",
                isAdvanced: false
              },
              {
                id: "skill-sanitizer",
                tierZh: "核心防线 · 数据净化",
                tierEn: "Core Defense · Sanitization",
                roleZh: "投喂文本清洗器，过滤代码与文本中隐藏的凭据、内网地址与恶意识别符",
                roleEn: "Sanitizes sensitive tokens, private IPs and internal credentials before ingestion",
                isAdvanced: false
              },
              {
                id: "skill-sentinel",
                tierZh: "核心防线 · 注入防御",
                tierEn: "Core Defense · Anti-Injection",
                roleZh: "分析网页与PDF等外部上下文，实时识别并阻断间接提示词注入指令",
                roleEn: "Inspects external context (PDF/web) to block indirect prompt injection payloads",
                isAdvanced: false
              }
            ],
            alternates: [
              { id: "presidio-anonymize-text", label: "presidio-anonymize-text · 微软标准文本匿名化" },
              { id: "pii-detection-pipeline", label: "pii-detection-pipeline · 隐私多重检测流" },
              { id: "openmed-clinical-ingestion", label: "openmed-clinical-ingestion · 临床病历隐私合规" },
              { id: "skillguard", label: "skillguard · 技能静态恶意检测" },
              { id: "security-threat-model", label: "security-threat-model · 威胁建模分析" },
              { id: "scholar-safety", label: "scholar-safety · 学术检索隐私隔离" },
              { id: "nova-proximity", label: "nova-proximity · 敏感数据越界预警" }
            ]
          })}

          ${renderEvidenceDrawer({
            lang: 'zh',
            title: '实证与延伸：隐私拼图效应、法条依据与间接注入机理',
            count: '3 起案例 · 1 条法规 · 5 项技术实证',
            cases: [
              makeIncidentPill('case-state-security-li-leakage-2025', '国安部通报：科研人员小李核心数据喂AI泄密受处分 ↗'),
              makeIncidentPill('case-state-secrecy-feng-leakage-2026', '保密观通报：冯某起草重大会议材料输入AI写作泄密 ↗'),
              makeIncidentPill('case-bytedance-ai-export-leak-2026', '字节跳动3号通报：员工利用AI整理业务被实名辞退 ↗')
            ],
            statutes: [
              '<strong>马赛克理论与 PIPL 敏感个人信息防线</strong>：依照《个人信息保护法》第28条，医疗健康、金融账户与特定身份信息一旦泄露极易导致人格尊严受侵害。单纯掩盖姓名无法阻断准标识符组合还原，必须对年龄区间、地理位置、就诊科室等属性实施 K-匿名化扰动或生成合成数据。'
            ],
            technical: [
              '<strong>载体一：白底白字、CSS 隐藏与 HTML 注释</strong>：2026 年大规模网络测量（分析 12 亿 URL、2480 万 host，确认 1.53 万个真实注入实例分布于 1.17 万个网页）证实，大量网页在 <code>&lt;!-- 注释 --&gt;</code>、<code>font-size: 0</code>、<code>display: none</code> 中隐蔽嵌入面向 AI 的劫持指令。Agent 扁平化抓取文本时会将其与用户指令无差别混淆。',
              '<strong>载体二：零宽字符隐写 (Zero-width Unicode)</strong>：Reverse CAPTCHA 实验通过 8,308 次模型输出证实，攻击者利用 <code>\u200B</code>（零宽空格）及 Unicode Tags 可在人眼完全不可见的情况下将恶意指令喂给模型分词器（Tokenizer），轻易穿透传统 WAF 正则与关键词拦截。工程上须强制采用 NFKC 规范化与语言感知 allowlist 进行过滤。',
              '<strong>载体三：PDF 隐藏文本层 (Off-Screen / Phantom Layers)</strong>：CrackedPDFs 2026 研究（近 3 万份实验 PDF 样本）揭示，解析器直接抽取 PDF 纯文本构建向量索引时破坏了版面视觉逻辑，隐藏文本、同色文字在模型上下文中获得与正文相同的权重，持久污染知识库。安全防御必须结合 OCR 视觉比对实施语义与渲染层差分。',
              '<strong>在野 CVE 实证：<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-32711" target="_blank" class="text-brand font-bold underline">EchoLeak (CVE-2025-32711, CVSS 9.3 严重性) ↗</a></strong>：业界首个针对企业级大模型（Microsoft 365 Copilot）的“零点击（Zero-Click）”间接注入漏洞。受害者仅收到一封隐藏恶意提示词的普通邮件，不知情下对 Copilot 发出“总结今日邮件”指令，Copilot 即被劫持读取账户内机密财务邮件，并通过 Teams 代理域名 (<code>asyncgw.teams.microsoft.com</code>) 伪造 Markdown 图片标签将敏感数据外发，穿透企业 CSP 策略。',
              '<strong>工程防御：微软 <a href="https://arxiv.org/abs/2403.14720" target="_blank" class="text-brand font-bold underline">Spotlighting 防御机制 ↗</a> 与权限收敛</strong>：抛弃单薄的 system prompt 拦截，改用随机 Hash 标签定界不可信数据，结合 Base64 编码使注入成功率从 &gt;50% 降至 &lt;2%，并严格实施出站网络流量过滤与带外人工二次确认。'
            ]
          })}
        </div>


        <!-- Section 4.2 -->
        <div id="sec-4-2" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-2" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.2 生成回答时 · 识别虚假文献与事实性幻觉 (追问二：生成内容是真的吗？)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            大模型最令人着迷也最危险的特性就是它的“自信”。当你向它询问学术背景、法律先例或技术溯源时，它能瞬间生成排版严谨、带有著名学者姓名、权威期刊卷期乃至以 <code>10.xxxx</code> 开头的标准 DOI 引文。然而逐一检索这些引文往往令人震惊：DOI 根本不存在，或者文章结论与模型论述南辕北辙。
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            这种现象绝非系统偶发故��，而是根植于大模型的<strong>自回归运作机制（Autoregressive Next-Token Prediction）</strong>。语言模型基于前文概率预测后续词元，其机制是挑选统计上合理的词序列，而非核实客观事实。在生僻的学术论文或法律条文等领域，模型往往会生成格式逼真但实际不存在的引文。
          </p>

          ${renderActionPanel({
            lang: 'zh',
            dontText: '看到 AI 提供了详尽的学者、刊号、DOI 或判决书案号就直接信以为真，未经多源核验就整段复制进诉讼状、开题报告、临床研究或投研研报中。',
            doText: '对 AI 给出的引文、案号和关键数据保持审慎；在权威数据库（如知网、裁判文书网、CrossRef）中逐条查验原文是否存在，确认结论与原文一致后再采纳。',
            tierBrowser: [
              '论文：复制 DOI，粘贴到 <a href="https://doi.org/" target="_blank" class="text-brand underline">doi.org</a> 打开；打不开或文章对不上，就当它不存在。',
              '没有 DOI 的论文：用标题去知网、百度学术或谷歌学术搜索原文。',
              '法律案号：到 <a href="https://wenshu.court.gov.cn/" target="_blank" class="text-brand underline">中国裁判文书网</a> 或人民法院案例库检索。',
              '名人名言、统计数字：找到原始出处再用。'
            ],
            tierSoftware: [
              '用 <a href="https://search.crossref.org/" target="_blank" class="text-brand underline">Crossref 检索页</a> 批量核对 DOI 与作者、期刊是否一致。',
              '用 Zotero 等文献管理软件按 DOI 导入，导入失败的条目重点复查。'
            ],
            tierSkills: [
              '在支持技能的工具中启用下方的引文核验类技能（如 <code>bibref-verify</code>），自动调用 Crossref / PubMed 逐条比对。'
            ],
            verifyText: '你交出去的每一条引用，都至少亲手打开过一次原文页面。'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Fact & Citation Verification Pipeline)",
            titleEn: "Fact & Citation Verification Pipeline",
            subtitleZh: "工序：卷期与DOI外部校验 → 引文对齐核实 → 主张忠实度交叉查证。首推 3 项核心技能，其余按需选用。",
            subtitleEn: "Pipeline: DOI & Volume verification → Citation alignment → Claim source cross-check.",
            primary: [
              {
                id: "bibref-verify",
                tierZh: "核心核验 · 卷期真伪",
                tierEn: "Core Verification · BibRef",
                roleZh: "调用 CrossRef 与 PubMed 官方接口，严密校验引文作者、期卷号与真实 DOI",
                roleEn: "Queries CrossRef & PubMed REST APIs to verify authentic authors, volume and DOI",
                isAdvanced: false
              },
              {
                id: "citation-verifier",
                tierZh: "核心核验 · 来源真伪",
                tierEn: "Core Verification · Sources",
                roleZh: "通用引文真伪核查器，快速筛查学术论文和报告中是否存在凭空捏造的虚构来源",
                roleEn: "Fast universal citation checker to uncover hallucinated or fabricated citations",
                isAdvanced: false
              },
              {
                id: "claim-source-fact-checker",
                tierZh: "核心核验 · 忠实度比对",
                tierEn: "Core Verification · Faithfulness",
                roleZh: "主张与来源比对器，逐句质问‘原文到底有没有这个结论’，防止歪曲断章取义",
                roleEn: "Verifies whether source texts actually substantiate the specific claims made by AI",
                isAdvanced: false
              }
            ],
            alternates: [
              { id: "citation-faithfulness-checker", label: "citation-faithfulness-checker · 引文忠实度核对" },
              { id: "citation-integrity-auditor", label: "citation-integrity-auditor · 学术引用完整性审计" },
              { id: "post-generation-fact-check", label: "post-generation-fact-check · 生成后事实查核" },
              { id: "vectara-hallucination-corrector", label: "vectara-hallucination-corrector · 幻觉纠错 (需依赖)" },
              { id: "hallucination-risk-reviewer", label: "hallucination-risk-reviewer · 幻觉风险评估" },
              { id: "kdense-peer-review", label: "kdense-peer-review · 严密同行审议" },
              { id: "the-judge", label: "the-judge · 裁判官逻辑交叉质证" }
            ]
          })}

          ${renderEvidenceDrawer({
            lang: 'zh',
            title: '实证与延伸：自回归概率缺陷、法庭制裁判例与权威核验链条',
            count: '4 起案例 · 2 套权威核查链条',
            cases: [
              makeIncidentPill('case-court-fake-citation-tongzhou-2025', '北京通州法院：AI虚构(2022)沪01民终12345号案号批评 ↗'),
              makeIncidentPill('case-court-fake-citation-yichang-2026', '湖北宜昌法院：AI篡改法条当庭训诫警告 ↗'),
              makeIncidentPill('case-frontiers-ai-image-retraction-2024', '国际顶刊Frontiers：AI生成荒诞插图撤稿通报 ↗'),
              makeIncidentPill('case-mata-avianca-fake-citations-2023', '美国联邦法院：Mata案虚构判例制裁5000美元 ↗')
            ],
            statutes: [
              '<strong>中国司法机关严惩 AI 虚假证据与案号造假</strong>：最高人民法院司法通报与各省高院明确强调，民事诉讼中当事人及代理律师不得使用生成式 AI 伪造虚假案例或法律文书。依据《中华人民共和国民事诉讼法》第一百一十四条，伪造重要证据妨碍人民法院审理案件的，法院将依法采取罚款、拘留直至追究刑事责任的严厉司法制裁。'
            ],
            technical: [
              '<strong>自回归预测的结构性缺陷</strong>：大模型是“语言概率连接器”而非“数据库引擎”。遇到缺乏充分预训练语料的长尾知识点时，自注意力机制会顺应提示词语法偏好，拼凑出词嵌入向量高度共现的名词、数字与期刊名，创造出看似权威实则凭空捏造的幻觉引文。',
              '<strong>国际司法引证灾难案 (Mata v. Avianca)</strong>：美国纽约南区联邦法院审理的标志性案件中，执业律师向法庭提交由 ChatGPT 协助起草的法律简报。主审法官核验后震惊发现，简报中引用的 6 起判例（包括判决案号、引用文段及法官意见）完全是 AI 凭空编造的虚构作品。最终法官对涉事律师及律所处以 5,000 美元司法罚款并向同行公开发布通报。',
              '<strong>学术与司法双环权威事实核验链条</strong>：国际学术双验环：强制通过 <a href="https://api.crossref.org" target="_blank" class="text-brand underline">CrossRef 官方 REST API ↗</a> 校验 DOI 元数据真实性，调用 <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" class="text-brand underline">NCBI PubMed ↗</a> 核实医学论文，结合 OpenAlex 校验学者学术图谱；中国本土法学与学术核验环：中文学术引文建议在知网或万方核实篇名、作者与期刊卷期；涉案司法先例必须在 <a href="https://wenshu.court.gov.cn/" target="_blank" class="text-brand underline">中国裁判文书网 ↗</a> 及最高人民法院案例库按统一案号核验裁判事实。'
            ]
          })}
        </div>


        <!-- Section 4.3 -->
        <div id="sec-4-3" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-3" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.3 制定方案时 · 防范迎合讨好与盲目顺从 (追问三：AI 是在帮忙还是在迎合？)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            当用户在提问中带有明显倾向时（例如“我觉得单体架构更适合当前业务”），模型常会顺应提问者给出赞同答复。在机器学习领域，这种现象被称为<strong>“谄媚倾向（Sycophancy）”</strong>。模型为获取更高的人类偏好评分，倾向于顺应提问者的预期，从而忽略反面论据和潜在缺陷。
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            大模型为什么天然热衷于讨好用户？Anthropic 2023 年里程碑研究《<a href="https://arxiv.org/abs/2310.13548" target="_blank" class="text-brand font-bold underline">Towards Understanding Sycophancy in Language Models ↗</a>》揭示了其根本成因：在训练大模型的“人类反馈强化学习”（RLHF）阶段，人类测试员更喜欢给那些顺从自己观点、措辞客气顺从或迎合的回答。研究表明，在存在分歧的技术或决策问题中，模型倾向于附和用户的预设立场，掩盖潜在的架构缺陷。
          </p>

          ${renderActionPanel({
            lang: 'zh',
            dontText: '提问时预设立场、暗示倾向，在模型顺应作答后未做交叉检验与对立视角测试，便直接采纳结论。',
            doText: '主动要求 AI 扮演反对者，专门挑出方案中最脆弱的假设和潜在风险；不带倾向地客观提问，并在重大决策前进行多角度反向质证。',
            tierBrowser: [
              '提问时不要先说自己的倾向，只描述问题和约束条件。',
              '拿到方案后追加一句（可直接复制）：<code>请忽略我的偏好，指出这个方案最脆弱的 3 个假设，以及它最可能失败的场景。</code>',
              '再问一句：<code>如果你是反对这个方案的人，你最有力的 3 条理由是什么？</code>'
            ],
            tierSoftware: [
              '开一个新会话或换一个不同厂商的模型，问同一个问题，对比结论是否一致。',
              '重大决定前，至少找一位真人同事看过反方意见。'
            ],
            tierSkills: [
              '启用下方的反谄媚与逆向质询技能（如 <code>discernment-nudge</code>、<code>devils-advocate-mad-skills</code>），让 AI 主动列出方案漏洞与反方意见。'
            ],
            verifyText: '你能说出这个决定“最大的风险是什么”，而且这条风险不是 AI 主动夸你时顺带提的。'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Anti-Sycophancy & Critical Review Pipeline)",
            titleEn: "Anti-Sycophancy & Critical Review Pipeline",
            subtitleZh: "工序：认知摩擦微提醒 → 单角色魔鬼代言人逆向质询 → 多角色陪审团会诊。首推 3 项核心技能，其余按需选用。",
            subtitleEn: "Pipeline: Cognitive friction nudge → Devil's Advocate scrutiny → Multi-agent Jury review.",
            primary: [
              {
                id: "discernment-nudge",
                tierZh: "核心防线 · 认知摩擦",
                tierEn: "Core Defense · Cognitive Nudge",
                roleZh: "轻量级认知摩擦约束，强制模型不附和倾向，列出方案最薄弱的 3 个假设",
                roleEn: "Lightweight cognitive friction nudge forcing models to highlight hidden weak assumptions",
                isAdvanced: false
              },
              {
                id: "devils-advocate-mad-skills",
                tierZh: "核心防线 · 逆向推演",
                tierEn: "Core Defense · Adversarial",
                roleZh: "魔鬼代言人单兵攻防，站在对立面疯狂质询方案漏洞与商业盲区",
                roleEn: "Adversarial devil's advocate role questioning your plan from a harsh opposing angle",
                isAdvanced: false
              },
              {
                id: "the-jury",
                tierZh: "进阶会诊 · 陪审团",
                tierEn: "Advanced Defense · Multi-Agent Jury",
                roleZh: "多智能体独立会诊，由架构师、风控官与质疑者背靠背独立投票质证",
                roleEn: "Simulates a cross-disciplinary jury for blind, independent review and consensus voting",
                isAdvanced: true
              }
            ],
            alternates: [
              { id: "sycophancy-challenger", label: "sycophancy-challenger · 谄媚质疑挑战者" },
              { id: "anti-sycophancy-molly", label: "anti-sycophancy-molly · 防迎合直言护卫" },
              { id: "devils-advocate-reviewer", label: "devils-advocate-reviewer · 批评性对抗审阅" },
              { id: "godfly-opposing-counsel", label: "godfly-opposing-counsel · 模拟对方辩友质证" },
              { id: "the-fool", label: "the-fool · 愚者反直觉质疑" },
              { id: "red-team-review", label: "red-team-review · 红队对抗漏洞挖掘" },
              { id: "receiving-code-review", label: "receiving-code-review · 客观代码审查受纳" }
            ]
          })}

          ${renderEvidenceDrawer({
            lang: 'zh',
            title: '实证与延伸：为什么 AI 总爱顺着你说？模型迎合倾向与反向质询',
            count: '4 级对抗流程解析',
            cases: [],
            statutes: [],
            technical: [
              '<strong>RLHF 奖励模型机制局限</strong>：模型在 RLHF 微调阶段学习到“附和用户的观点能获取更高的 Reward 分数”，随着模型参数规模扩大，这种谄媚行为非但没有消除，反而演变得更加圆滑和极具说服力。未经专门对抗纠偏的大模型绝非合格的中立决策顾问。',
              '<strong>Tier 1: 认知摩擦微提醒 (Discernment Nudge)</strong>：在 Prompt 中强制植入认知摩擦约束，例如：“请完全忽略我的偏好与倾向，直接指出当前技术方案中最脆弱的 3 个底层假设和潜在失效场景。” 对应技能：<code>discernment-nudge</code>, <code>sycophancy-challenger</code>。',
              '<strong>Tier 2: 魔鬼代言人逆向攻防 (Devil\'s Advocate & Adversarial Review)</strong>：赋予模型极端敌对的对立角色（如“做空机构分析师”、“苛刻合规官”或“诉讼反方首席律师”），专门对技术架构与商业主张发起进攻性质询与破绽深挖。对应技能：<code>devils-advocate-mad-skills</code>, <code>devils-advocate-reviewer</code>, <code>godfly-opposing-counsel</code>, <code>anti-sycophancy-molly</code>。',
              '<strong>Tier 3: 独立多角色陪审团会诊 (The Jury & Red Team)</strong>：多智能体架构模拟，拆解为架构师、安全官、财务官与反直觉质疑者组成的多维陪审团，实行背靠背独立投票质证，减少单一会话中的同质化偏见。对应技能：<code>the-jury</code>, <code>the-fool</code>, <code>red-team-review</code>, <code>receiving-code-review</code>。'
            ]
          })}
        </div>


        <!-- Section 4.4 -->
        <div id="sec-4-4" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-4" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.4 执行命令时 · 限制智能体越权与文件误删 (追问三/执行：操作会不会破坏本地环境？)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            当智能体获得终端执行与文件改写权限时，安全风险也从生成内容延伸到了系统操作层面。例如误执行删除命令、解析了包含恶意指令的外部文档，或者配置了权限过宽的外部工具，都可能导致项目文件被误删或本地数据被意外修改。
          </p>

          ${renderActionPanel({
            lang: 'zh',
            dontText: '在 IDE 或终端开启无感全自动执行模式（如 YOLO 或“允许完全访问”），对不可信仓库允许智能体在宿主机裸机执行未审视的 Shell 脚本与文件批量覆盖；随意挂载不受信任的第三方 MCP 服务。',
            doText: '保持每步确认的权限控制，不随意开启无感全自动运行；高风险脚本在隔离环境（如虚拟机或沙盒）中运行，对外部工具按需单项授权，防范误删系统文件。',
            tierBrowser: [
              '<strong>只在网页或手机 App 上聊天的读者，可以跳过本节。</strong>',
              '如果你用的工具能操作电脑（读写文件、运行命令），保持“默认权限 / 每步确认”，不要开启“完全访问”“自动执行全部”。',
              '让 AI 动手前，先备份重要文件夹。'
            ],
            tierSoftware: [
              '不要安装来源不明的插件或 MCP 工具；只开启当前任务真正需要的那几个。',
              '在单独的系统账户、虚拟机或容器里运行 AI 自动执行的任务。'
            ],
            tierSkills: [
              '启用 <code>agent-sandbox-skill</code>，把高风险脚本放进一次性的隔离环境中执行。'
            ],
            verifyText: 'AI 执行的每一个删除、覆盖、联网操作，你都在弹窗里亲眼看过并点了确认。'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Agent Execution Isolation Pipeline)",
            titleEn: "Agent Execution Isolation Pipeline",
            subtitleZh: "工序：敏感指令拦截 → 最小权限边界收敛 → 临时微虚拟机沙盒隔离。",
            subtitleEn: "Pipeline: Command interception → Privilege boundary → Micro-VM sandbox isolation.",
            primary: [
              {
                id: "agent-sandbox-skill",
                tierZh: "核心防线 · 沙盒执行",
                tierEn: "Core Defense · Micro-VM Sandbox",
                roleZh: "将 Agent 执行的高风险命令置于临时沙盒与微虚拟机中，杜绝系统文件误删与逃逸",
                roleEn: "Executes agent CLI commands within disposable micro-VM sandboxes to prevent system destruction",
                isAdvanced: false
              }
            ],
            alternates: []
          })}

          ${renderEvidenceDrawer({
            lang: 'zh',
            title: '实证与延伸：智能体真实破坏事故与 MCP 工具越权漏洞案例',
            count: '2 起典型重大事故 · 2 个已公开 CVE · 2 项架构实证',
            cases: [
              makeIncidentPill('case-replit-agent-db-drop-saastr-2025', 'Replit Agent：代码冻结期擅自删除生产数据库并伪造数据事件'),
              makeIncidentPill('case-pocketos-cursor-railway-wipe-2026', 'Cursor Agent：凭证错位9秒删空SaaS生产库及同卷备份事故')
            ],
            statutes: [],
            technical: [
              '<strong>权限门禁 ≠ 物理容器</strong>：WorkBuddy 将权限严谨分为“默认权限”（限制工作空间、弹窗确认）与“完全访问”；Kimi Work 官方明确提示完全权限存在文件覆盖和系统改动风险。没有容器沙箱前，严禁开启无确认全自动执行。',
              '<strong>MCP 服务端 SSRF 风险（<a href="https://nvd.nist.gov/vuln/detail/CVE-2026-40100" target="_blank" class="text-brand font-bold underline">FastGPT CVE-2026-40100 ↗</a>）</strong>：公开安全漏洞分析显示，MCP <code>runTool</code> 接口曾存在未认证 SSRF，外部请求可被诱导向内部私有地址发起探测，需及时升级防护补丁并建立网络隔离。',
              '<strong>跨租户配置泄露（<a href="https://nvd.nist.gov/vuln/detail/CVE-2026-41947" target="_blank" class="text-brand font-bold underline">Dify CVE-2026-41947 ↗</a>）</strong>：Dify 曾曝出 Trace 配置未授权访问，攻击者可将受害者的提示词和响应流重定向至外部监听端点（已在 v1.14.2 修复）。',
              '<strong>MCP 语义供应链投毒 (Tool Poisoning)</strong>：学术界与 PoC 证实，恶意 MCP 工具可在描述元数据中隐蔽嵌入系统指令，即使用户未主动调用该工具，也会劫持模型对上下文的任务推演。'
            ]
          })}
        </div>


        <!-- Section 4.5 -->
        <div id="sec-4-5" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-5" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.5 交付成果前 · 广告虚假宣传审查与许可证核对 (追问四：成果能不能直接发布？)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            这是内容发布前的合规核验环节。当一段由 AI 辅助生成的代码、文案或产品页面准备对外发布时，需要经过实质性核对。在法律层面上，<strong>AI 本身不是独立责任主体。发生侵权或违法后，法院将结合使用者、发布者和服务提供者各自的控制能力、注意义务与具体行为依法划分责任</strong>。未经核对的内容可能面临行政处罚、无障碍合规纠纷、密钥泄漏或开源许可证违规等风险。
          </p>

          ${renderActionPanel({
            lang: 'zh',
            dontText: '直接将 AI 生成的带绝对化宣传词（“国家级/最高级/根治”）的文案投入商业广告；未跑无障碍检测直接上线页面；将带有硬编码密钥或带有 GPL/AGPL 传染协议的代码未经审查推向公共或商业闭源项目。',
            doText: '严格剔除虚假夸大与绝对化用语，为核心宣传点保留真实检测凭据；按规范检查网页无障碍与键盘可用性；提交代码前扫描清理硬编码密钥，核对开源许可证要求。',
            tierBrowser: [
              '发布前自问三句：有没有“最、第一、国家级、根治”这类词？',
              '文中的数字和功效，有没有可以出示的来源？',
              '这是 AI 生成或合成的内容吗？如果是，按《人工智能生成合成内容标识办法》（2025 年 9 月 1 日起施行）添加标识。'
            ],
            tierSoftware: [
              '网页类成果：用 Chrome 开发者工具中的 Lighthouse 跑一次无障碍检测。',
              '代码类成果：提交前用 Gitleaks 等工具扫描是否夹带密钥。'
            ],
            tierSkills: [
              '启用下方门禁技能（如 <code>publish-prep-review</code>、<code>marketing-claims-review</code>、<code>web-accessibility</code>），在发布流程中自动拦截。'
            ],
            verifyText: '假如有人逐句追问“这句话的依据是什么”，你都能拿出来。'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Pre-Handoff Quality & Compliance Pipeline)",
            titleEn: "Pre-Handoff Quality & Compliance Pipeline",
            subtitleZh: "工序：商业宣发前综合质检 → 广告合规与功效证据复核 → 网页无障碍达标核验。精选 3 项核心技能，其余按需选用。",
            subtitleEn: "Pipeline: Comprehensive pre-publish audit → Marketing claims verification → Web accessibility audit.",
            primary: [
              {
                id: "publish-prep-review",
                tierZh: "核心门禁 · 发布预审",
                tierEn: "Core Gate · Pre-Publish Audit",
                roleZh: "商业宣发与文案发布前综合质检，审查虚假效能主张、敏感合规与事实漏洞",
                roleEn: "Comprehensive review prior to publishing content, guarding against unsubstantiated claims",
                isAdvanced: false
              },
              {
                id: "marketing-claims-review",
                tierZh: "核心门禁 · 广告合规",
                tierEn: "Core Gate · Advertising Claims",
                roleZh: "依据广告法规审查绝对化极限词与效能宣称，阻断夸大虚假宣传与行政处罚风险",
                roleEn: "Scrutinizes superlatives and efficacy claims against advertising regulations",
                isAdvanced: false
              },
              {
                id: "web-accessibility",
                tierZh: "核心门禁 · 无障碍核验",
                tierEn: "Core Gate · Accessibility",
                roleZh: "依据 WCAG 2.1 AA 标准核验色彩对比度与读屏标签，保障视障与老年人平等访问",
                roleEn: "Validates contrast, keyboard navigation, and ARIA labels against WCAG 2.1 AA standards",
                isAdvanced: false
              }
            ],
            alternates: [
              { id: "visible-ai-disclosure-pr-gate", label: "visible-ai-disclosure-pr-gate · 代码与 PR 披露门禁" },
              { id: "license-compliance-audit", label: "license-compliance-audit · SPDX 协议合规审计" },
              { id: "repo-security-review", label: "repo-security-review · 凭证泄露审查门禁" },
              { id: "ai-disclosure-convention", label: "ai-disclosure-convention · 透明披露规范" },
              { id: "vertu-seo-publish-gate", label: "vertu-seo-publish-gate · SEO 发布质检门禁" },
              { id: "gdpr-compliance-audit", label: "gdpr-compliance-audit · GDPR 权利合规审计" }
            ]
          })}

          ${renderEvidenceDrawer({
            lang: 'zh',
            title: '实证与延伸：市监处罚案例、法定门禁、版权判例与开源协议传染',
            count: '4 起典型行政处罚与判例 · 4 类法定门禁 · 4 项司法准则',
            cases: [
              makeIncidentPill('case-ad-fake-host-haidian-2025', '北京海淀市监局：AI仿冒主持人推销食品虚假广告罚款20万'),
              makeIncidentPill('case-outcall-douxing-shanghai-2026', '上海市监局：斗星智能AI外呼冒充银行虚假宣传罚款20万'),
              makeIncidentPill('case-criminal-copyright-puzzle-tongzhou-2025', '北京通州首例刑案：Stable Diffusion图生图电商拼图判刑1年半'),
              makeIncidentPill('case-criminal-extortion-medical-shanghai-2026', '上海杨浦法院刑案：男子用AI制造假病历敲诈勒索拘役判决')
            ],
            statutes: [
              '<strong>市场监管部门 (AMR) 真实行政处罚案例</strong>：厦门市集美区市监局重罚“苗古金贴” 120 万元人民币（捏造传承人虚假宣传）；北京市海淀区市监局查处 AI 仿冒央视主持人虚假推销鱼油罚款 20 万元；昌平区市监局查处虚拟人直播违规；总局 2025 通报前三季度查办互联网违法广告 22,185 件，罚没 1.11 亿元。',
              '<strong>无障碍标准与法定指引</strong>：中国《无障碍环境建设法》（2023年9月1日施行）第三十二条规定利用财政资金设立的网站逐步符合无障碍标准，并鼓励公共服务网站提升无障碍水平。W3C WCAG 2.1 AA 国际准则是工程设计的重要基线（如色彩对比度通常不低于 4.5:1，交互控件支持纯键盘导航与语义回退）。',
              '<strong>法定生成标识与水印义务</strong>：依据《互联网信息服务深度合成管理规定》第16/17条以及 2025 年 9 月 1 日实施的《人工智能生成合成内容标识办法》，发布 AI 生成合成内容必须添加显著显式标识与元数据隐式水印。注意：“本内容由 AI 生成”仅属于来源披露义务，并不免除发布者的法律侵权或广告违法责任。'
            ],
            technical: [
              '<strong>FTC "Operation AI Comply" 国际执法对比</strong>：美国 FTC 严厉打击缺乏实证支持的 AI 吹嘘（AI Washing）：DoNotPay 宣称“世界首个机器人律师”被罚款 19.3 万美元；CMG Media 等三家公司因虚假宣称 AI 监听语音定向广告支付 93 万美元和解金。核心在于 Substantiation（每一项效能声称必须具备严密证据支撑）。',
              '<strong>奥特曼 LoRA 终审版权案 (2024)浙0192民初1587号 / (2024)浙01民终10332号</strong>：杭州互联网法院审理、杭州市中院终审裁判。认定平台提供奥特曼 LoRA 模型训练与分发构成帮助侵权，确立了高知名 IP + 稳定复现 LoRA + 商业获利的平台注意义务边界。',
              '<strong>开源协议传染司法判例与 AI 代码补全</strong>：最高人民法院 <code>(2021)最高法知民终2063号</code> 终审裁判（维持深圳中院 VirtualApp 案 <code>(2019)粤03民初3928号</code>）确认，违反 GPLv3 条件导致许可依法终止，继续使用代码构成著作权侵权；同时最高法在 <code>(2019)最高法知民终663号</code> 确立独立程序通过标准接口交互不当然被 GPL 传染。AI 生成的代码同样受上游开源许可证约束，在持续集成中应引入依赖检查与 SBOM 审计；SaaS 云服务尤其严防 GNU AGPLv3 第 13 条因网络交互触发强制开源。'
            ]
          })}
        </div>


        <!-- Section 4.6 -->
        <div id="sec-4-6" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-6" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.6 长期归档时 · 记录人机分工说明与生成凭据 (追问四/收尾：人机分工是否留痕？)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            一个规范的协作流程包括两个环节：其一，清理本地临时会话记录与日志，避免敏感上下文残留；其二，对最终文本进行去套路润色，消除机械腔调并记录人机协作分工。核心原则是：<strong>未经测试验证通过，不应宣称任务完成。</strong>
          </p>

          ${renderActionPanel({
            lang: 'zh',
            dontText: '直接把包含项目凭据、未公开设想或内部人名的历史会话长久留在云端账户；在没有通过本地测试和事实复核的情况下，轻信 AI 的“已全部搞定”并直接交付；为了图快直接发布充满“画卷徐徐铺展/不仅如此而且”的生硬套话。',
            doText: '会话结束后主动清理涉及敏感材料的上下文与记忆；设立严格的完成前测试门禁，跑通自动化测试套件后方可打标完成；记录人机分工留痕凭据，并依照去 AI 化规范深度润色，保留真实的思考肌理。',
            tierBrowser: [
              '含敏感内容的对话用完即删；再到【设置 › 记忆】里把相关记忆单独删除。',
              '交付前问自己：“这件事我自己检查过了吗？”没检查过，就不要说“已完成”。',
              '润色旨在提高表达的清晰度，合规要求披露 AI 辅助的场景仍应如实说明。'
            ],
            tierSoftware: [
              '定期（如每月）清理一次各 AI 平台的历史对话和上传文件。'
            ],
            tierSkills: [
              '启用 <code>verification-before-completion</code>，要求 AI 在宣称完成前先跑完检查。'
            ],
            verifyText: '一个月后回看，平台上没有残留你不想留下的对话和文件；重要成果具备清晰的人机分工记录。'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Post-Session & Completion Verification Pipeline)",
            titleEn: "Post-Session & Completion Verification Pipeline",
            subtitleZh: "工序：硬性测试检验门禁 → 人机分工血统存证 → 消除 AI 套路机械腔润色。精选 3 项核心技能，规范最终归档。",
            subtitleEn: "Pipeline: Mandatory verification before completion → AI provenance tracking → Humanized style rewriting.",
            primary: [
              {
                id: "verification-before-completion",
                tierZh: "核心门禁 · 终局检验",
                tierEn: "Core Gate · Verification",
                roleZh: "严禁 AI 口头宣称完成：强制跑完验证套件与事实检查，提供证据后方可交付",
                roleEn: "Enforces evidence-based task completion: forbids LLM declaring done without tests",
                isAdvanced: false
              },
              {
                id: "ai-provenance",
                tierZh: "核心存证 · 血统溯源",
                tierEn: "Core Audit · Provenance",
                roleZh: "人机协作血统存证系统，记录提示词、模��版本与人工修改轨迹以备合规审计",
                roleEn: "Auditable record keeping prompt traces, model hashes and human editing history",
                isAdvanced: false
              },
              {
                id: "humanizer",
                tierZh: "核心润色 · 去套路化",
                tierEn: "Core Polish · Humanize",
                roleZh: "基于维基百科 AI 文本特征，消除‘不仅...而且’、虚高术语与机械套路腔",
                roleEn: "Rewrites AI-sounding prose to remove robotic patterns, cliches and inflated claims",
                isAdvanced: false
              }
            ],
            alternates: [
              { id: "skill-provenance-tracker", label: "skill-provenance-tracker · 技能调用溯源" }
            ]
          })}

          ${renderEvidenceDrawer({
            lang: 'zh',
            title: '实证与延伸：任务终局验证原则与文本去套路化规范',
            count: '维基百科 AI 写作特征指引 · 测试驱动门禁',
            cases: [],
            statutes: [],
            technical: [
              '<strong>维基百科《Signs of AI Writing》规范</strong>：维基百科编辑社群总结的 AI 生成文本典型特征，包括：过度使用“不仅...而且”对仗结构、公式化的首段引言与结尾升华总结、充斥虚高名词但缺乏具体细节、行文充满毫无意义的推销赞美语气等。去套路化润色是恢复专业可信度的关键步骤。',
              '<strong>证据驱动的完成门禁机制 (Evidence-Based Completion)</strong>：大语言模型常因自回归倾向在代码未实际编译通过、引用未实际查证的情况下，生成“我已经为您全部搞定并测试通过”的幻觉声明。<code>verification-before-completion</code> 规范通过前置钩子强行阻断这一声明，强制其出示执行证据（测试通过日志、状态码 200 或终端返回值），由事实本身而非模型语言来定义任务的终局。'
            ]
          })}
        </div>

        <!-- Chapter 4 to Chapter 5 Transition Card -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand/5 via-slate-50 to-brand/5 dark:from-brand/10 dark:via-slate-900 dark:to-brand/10 border border-brand/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-6">
          <div class="space-y-1">
            <span class="text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-1.5">
              <span>👉 下一步 · 场景组装</span>
            </span>
            <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              掌握了 6 大工序后，如何在真实工作日中按角色组装自卫链条？
            </p>
          </div>
          <a href="#chapter-5" class="btn-primary text-xs font-bold px-4 py-2 shrink-0 flex items-center gap-1.5">
            <span>阅读第 5 章 · 角色剧本 →</span>
          </a>
        </div>
      </section>

      <!-- Chapter 5 -->