<section id="chapter-5" class="space-y-8 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 5 · 角色剧本</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            角色剧本：普通人的一日安全工作流
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            如何把这 44 个开源安全技能组装成符合你日常工作节奏的自卫链条？以下是五类典型使用者（高校学者、软件工程师、文案营销、政企行政人员以及普通个人与家庭日常）的真实一日战术攻防演练。
          </p>
        </div>

        <!-- Chapter Objectives Box (Flat Two-Column Layout) -->
        <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-xs">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span>本章阅读目标</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-1">
            <div class="space-y-1">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>解决什么
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                如何避免安全规则流于形式？如何将零散的防线组装成符合自己专业身份与时间线的连续自卫习惯？
              </p>
            </div>
            <div class="space-y-1 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-4">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>获得什么
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                5 类角色的 24 小时真实工作流攻防剧本，带走“零门槛最低标准”与“专业交付进阶标准”。
              </p>
            </div>
          </div>
        </div>

        <!-- Everyday Citizen Quick Access Callout -->
        <div class="p-3.5 sm:p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div class="flex items-center gap-2 text-amber-900 dark:text-amber-200">
            <span class="text-base shrink-0">💡</span>
            <span><strong>普通家庭与非技术读者快速通道</strong>：如果你不是程序员或科研人员，日常主要用 AI 查资料、问健康、辅导功课或防电诈，可直接跳转阅读：</span>
          </div>
          <a href="#sec-5-5" class="shrink-0 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors">
            直达 5.5 生活剧本 ↓
          </a>
        </div>

        <!-- Section 5.1 -->
        <div id="sec-5-1" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'zh',
            titleZh: '剧本一：高校研究生与学术研究者的一天',
            roleZh: '学术科研 · Graduate Researchers & Scholars',
            introZh: '面对论文开题报告、万字文献综述以及基金课题申报书，学者在巨大时间压力下的典型自卫链条。',
            painZh: '面对开题报告、万字前沿综述 DDL 以及国家自然科学基金/重点课题申报书起草，学者必须在数日内研读数百篇英文文献并梳理创新脉络。面对巨大时间压力，极具诱惑力的是将未发表的独创实验设想、独创推演假说或原始实验数据，直接全选贴入商业联网大模型以寻求一键生成综述框架或整段润色。',
            nearMissZh: '国家保密行政管理部门通报的科研人员小李案：小李将核心实验数据与未发表成果上传至商业 AI 写作应用，导致该领域核心敏感数据被云端留存并在互联网流传，造成国家利益损失并受到严肃处理；同时若未加核查直接采信编造的虚假 DOI， blind-review 中将被直接定性为学术不端与虚假引文。',
            cases: [
              makeIncidentPill('case-state-security-li-leakage-2025', '国安部科研人员小李泄密受处分案'),
              makeIncidentPill('case-frontiers-ai-image-retraction-2024', 'Frontiers期刊AI生成图表撤稿案'),
              makeIncidentPill('case-court-fake-citation-tongzhou-2025', '通州法院AI编造虚假判例批评案')
            ],
            steps: [
              {
                time: '09:30',
                titleZh: '课题设想沙盒隔离与防训练采集',
                descZh: '在利用 AI 协助构思文献综述脉络时，严禁将原创实验参数或实验代码直传公网。调用 ' + makePill('scholar-safety', 'scholar-safety · 学术检索隐私隔离') + '，在本地对独创假说与未发表设想实施差分抽象脱敏，构建单向检索沙盒，避免未公开的研究思路被商业模型抓取作为训练语料。'
              },
              {
                time: '14:00',
                titleZh: '综述引文 CrossRef 自动化验真与裁判官质证',
                descZh: '模型生成文献综述与论据后，需进行逐条真实性核验。调用 ' + makePill('bibref-verify', 'bibref-verify · 参考文献精准核验') + ' 自动请求 CrossRef REST API 与 PubMed 数据库，逐条校验 DOI、卷期与出版元数据真实性；同时调用 ' + makePill('the-judge', 'the-judge · 裁判官逻辑交叉质证') + ' 模拟同行评审专家对核心论点与引证逻辑展开双向交叉质询，挤出概率拼凑的水分。'
              },
              {
                time: '17:30',
                titleZh: '期刊透明度附录与 Nature CRediT 贡献者陈述',
                descZh: '在向顶刊、毕业答辩委员会或导师交付论文定稿前，杜绝“隐瞒使用”或“敷衍声明”。调用 ' + makePill('ai-disclosure-convention', 'ai-disclosure-convention · 学术出版 AI 披露规范') + '，严格遵照 Nature 与 ICMJE 作者贡献分类标准（CRediT Taxonomy），生成详尽的《AI 辅助工作流透明度附录》（明晰披露 AI 仅用于文献语法润色，所有学术推演与结论由人类作者独立签署），保障学术诚信与成果的可追溯性。'
              }
            ],
            minZeroZh: '引文清单中的每一条文献，必须亲手在 doi.org 或知网/PubMed 检索并点开确认过，确保篇名、作者、刊期真实存在；文末明确附上一句话 AI 使用声明（如仅用于语法润色）。',
            minProZh: '附带经 CrossRef 官方 API 逐条核验的《文献引文真实性报告》与标准规范的《Nature CRediT AI 使用透明度陈述附录》，使学术推演经得起第三方盲审复核。'
          })}
        </div>


        <!-- Section 5.2 -->
        <div id="sec-5-2" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'zh',
            titleZh: '剧本二：软件工程师与开源维护者的一天',
            roleZh: '研发运维 · Software Engineers & Maintainers',
            introZh: '面对冲刺发版、排查线上崩溃堆栈以及重构微服务，工程师如何在追求极速的同时防范密钥外泄与许可证传染。',
            painZh: '面对冲刺发版排期、线上突发严重 Crash 堆栈排查、高并发微服务重构以及开源仓库数十个待审 Issue，工程师渴望借助编程 Agent（如 Cursor Agent、Trae、Claude Code 等）直接读取本地代码仓库、自动编写高覆盖率单元测试并执行自动化修复。',
            nearMissZh: '国企工程师曾因使用商业 AI 时未脱敏代码环境，导致核心架构与实时数据库凭证外流境外；新华社通报小王案中，个人电脑部署开源大模型因默认公网端口裸露且未设密码，被境外 IP 批量渗透窃密；智能体在 YOLO 模式下解析含间接注入的不可信 Issue 险些在宿主机误删配置文件；离职带走系统调优 Prompt 模板已被杭州市市场监管局正式定性为侵犯商业秘密行政违法行为并处以 35 万元行政处罚。',
            cases: [
              makeIncidentPill('case-trade-secret-prompt-hangzhou-2026', '杭州市监局：Prompt 模板侵犯商业秘密行政处罚案 35 万元')
            ],
            steps: [
              {
                time: '10:00',
                titleZh: '生产配置本地抹除与微虚拟机沙盒执行',
                descZh: '在将报错堆栈或代码段提交模型调试前，本地调用 ' + makePill('pii-safe-documents', 'pii-safe-documents · 文档敏感脱敏') + ' 自动用正则与高熵检测抹去私钥、JWT Token、内网 IP 与数据库密码；对 Agent 自动执行的重构测试与 Shell 脚本，强制调用 ' + makePill('agent-sandbox-skill', 'agent-sandbox-skill · 微虚拟机沙盒执行隔离') + ' 在抛弃式 E2B 微虚拟机中隔绝运行，杜绝宿主机裸机执行风险。'
              },
              {
                time: '15:30',
                titleZh: '架构方案反向质询与压力测试',
                descZh: '面对大模型对分布式架构的赞不绝口（“您的方案完美兼顾了弹性与高可用”），工程师警惕 RLHF 机制的谄媚本能。调用 ' + makePill('sycophancy-challenger', 'sycophancy-challenger · 谄媚质疑挑战者') + ' 剥除迎合修饰，同时唤起 ' + makePill('red-team-review', 'red-team-review · 红队对抗漏洞挖掘') + ' 扮演外部黑客视角，对网络脑裂、幂等性缺陷与反序列化漏洞展开极限压力测试。'
              },
              {
                time: '19:00',
                titleZh: 'Git Pre-commit 凭证拦截、SPDX 开源合规与全体验证',
                descZh: '在发起 Pull Request 前，本地自动触发 ' + makePill('repo-security-review', 'repo-security-review · 凭证泄露审查门禁') + ' 基于 Gitleaks 拦截隐藏在 commit 历史中的私钥；调用 ' + makePill('license-compliance-audit', 'license-compliance-audit · SPDX 协议合规审计') + ' 扫描代码的 SPDX 开源协议兼容性，防范开源许可证兼容性与传染风险；最后严格执行 ' + makePill('verification-before-completion', 'verification-before-completion · 完成前检验门禁') + '，只有本地全套单元测试与集成测试亮绿灯后才允许合并上线。'
              }
            ],
            minZeroZh: '提交前本地运行 git diff 逐行复核，确保没有硬编码任何 API Key、密码或内网 IP；手动跑通全部核心单元测试，严禁直接推送未经人工过目的 AI 代码。',
            minProZh: 'PR 附带 Gitleaks 密钥扫描通过证明、沙盒执行日志与 SPDX SBOM 依赖许可证合规报告，使交付对安全架构组与开源社区完全透明可查。'
          })}
        </div>


        <!-- Section 5.3 -->
        <div id="sec-5-3" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'zh',
            titleZh: '剧本三：文案策划与数字营销专员的一天',
            roleZh: '创意营销 · Writers & Marketing Specialists',
            introZh: '面对电商大促和自媒体批量推文，文案专员如何在保证高效产出的同时防范广告法重罚与版权侵权。',
            painZh: '面对电商大促倒计时、多渠道自媒体矩阵批量推文以及活动推广落地页的高频上线需求，文案专员每天需要创作数十套爆款标题、产品详情页与宣发文案。为迅速夺取用户注意力，容易直接采纳大模型生成的包含夸大修辞的草稿。',
            nearMissZh: 'AI 极易脱口而出“全网第一”、“国家级工艺”、“彻底根治”等词汇，直接触犯中国《广告法》第9条（绝对化用语禁令）、第17条（普通商品宣称医疗功效）及《反不正当竞争法》第8条。真实执法案例：厦门集美查处苗古金贴利用 AI 捏造虚假身份宣传重罚 120 万元人民币；北京海淀查处利用 AI 仿冒央视主持人虚假推销鱼油罚款 20 万元；北京通州首例刑案图生图侵权判刑 1 年半。',
            cases: [
              makeIncidentPill('case-ad-fake-host-haidian-2025', '北京海淀市监局：AI仿冒主持人推销食品罚款20万'),
              makeIncidentPill('case-criminal-copyright-puzzle-tongzhou-2025', '通州首例刑案：Stable Diffusion生图电商拼图判刑1年半'),
              makeIncidentPill('case-ai-voice-bj-2023', '北京互联网法院：全国首例声音侵权判赔25万')
            ],
            steps: [
              {
                time: '10:30',
                titleZh: '机械套路清洗与人性化去八股润色',
                descZh: '利用 AI 展开批量创意思路发散后，调用 ' + makePill('humanizer', 'humanizer · 人性化文本去套路润色') + ' 深度过滤 AI 高频公文与八股模板词（如“画卷铺展开来”、“不可否认的是”、“在这充满挑战的时刻”等），重构真实生动、具有人类情感温度和现场感的好文案。'
              },
              {
                time: '15:30',
                titleZh: '中国《广告法》与 FTC 标准逐句实质合规审核',
                descZh: '在文案交付视觉设计排版前，调用 ' + makePill('marketing-claims-review', 'marketing-claims-review · 广告法与 FTC 审查门禁') + ' 按照中国《广告法》与美国 FTC Substantiation 法则逐句进行合规筛查，强制要求文案中每一个功能参数与功效声称（如“续航长达48小时”、“效率提升30%”）均必须附带经权威机构检测报告支撑的客观证据锚点，排查并剔除“最、首选、顶级”等违反广告法的极限词。'
              },
              {
                time: '18:00',
                titleZh: '营销落地页 W3C WCAG 2.1 AA 读屏与对比度门禁',
                descZh: '对前端营销落地页与海报交互代码，执行 ' + makePill('web-accessibility', 'web-accessibility · 法定 WCAG 无障碍门禁') + '，系统化校验文字对比度是否达标（≥ 4.5:1）、是否全键盘可访问、是否具备完整 ARIA 屏幕阅读器标签，确保每一位残障和老年读者都能平等无碍浏览。'
              }
            ],
            minZeroZh: '文案交付前亲手通读筛查，删去所有“最、第一、根治、绝对”等绝对化词汇；所有宣称的功效与数字必须有内部真实凭据；对外发布时明确标明“AI 辅助生成”。',
            minProZh: '出具完整的《广告法合规声明对照表》（逐项绑定检测报告编号）与落地页 WCAG 2.1 AA 无障碍合规检测，消除行政处罚与诉讼隐患。'
          })}
        </div>


        <!-- Section 5.4 -->
        <div id="sec-5-4" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'zh',
            titleZh: '剧本四：政企行政与企业知识工作者的一天',
            roleZh: '政企行政与法务合规 · Enterprise, Legal & Administrative Staff',
            introZh: '面对会议纪要整理、采购招投标与重大合同初审，员工如何坚守“涉密不上网”底线与全流程审计留痕。',
            painZh: '在党政机关、央国企及大型民营企业的办公室综合科、法务合规部、采购招投标部与人力资源科室，员工每天面对长达数小时的高频内部例会录音整理、敏感公文起草、几十万字采购招标文件条款比对、重大商业合同风险初审以及涉及薪酬的员工绩效材料。面对繁重机械的工作量与急迫的发文时限，员工极度渴望利用市面上流行的商业大模型“一键转写语音”、“一键总结红头文件”、“一键审查合同条款”。',
            nearMissZh: '国家保密局与国家安全部通报李某私自将涉密方案输入手机 AI 写作应用受到严肃处理；涉密人员冯某妄图以“字母代码替换涉密敏感词”规避审查输入 AI 写作依然受到严肃处分；安保方案经云端 OCR 小程序转写造成泄密，导致单位副职领导行政警告、两名第三方人员直接被解除劳动合同。新修订《保守国家秘密法》确立“涉密不上网，上网不涉密”原则。',
            cases: [
              makeIncidentPill('case-state-security-li-leakage-2025', '国安部通报：科研人员小李核心数据喂AI泄密案'),
              makeIncidentPill('case-state-secrecy-feng-leakage-2026', '保密观通报：冯某重大会议材料输入AI写作案'),
              makeIncidentPill('case-bytedance-ai-export-leak-2026', '字节跳动3号通报：员工利用AI整理业务被实名辞退')
            ],
            steps: [
              {
                time: '09:30',
                titleZh: '涉密公文与会议纪要本地离线脱敏（严禁云端听会）',
                descZh: '禁用带有自动云端同步或上传功能的第三方录音转写插件；针对包含内部管理与非核心业务内容的纪要，在本地电脑离线环境中调用 ' + makePill('presidio-anonymize-text', 'presidio-anonymize-text · 微软标准文本匿名化') + ' 与 ' + makePill('pii-safe-documents', 'pii-safe-documents · 文档敏感脱敏') + '，利用 NLP 实体识别技术将领导真实姓名、内部项目敏感代号、未公开财务指标替换为标准类型化稳态占位符（如 [DEPT_HEAD_A]、[PROJECT_ALPHA]、[METRIC_VALUE_X]）；本地生成加密映射表并保存在本地保管库中。若会议涉及国家秘密或核心商密，严禁上传至公有云大模型。'
              },
              {
                time: '14:30',
                titleZh: '采购招标文件与商业合同对抗性风险扫描',
                descZh: '审核大型工程招投标文件或采购合同时，严格遵循“数据最小化”原则，剔除双方真实公司名、商业底价与特定财务流水；仅提取争议条款与违约赔偿机制文本，调用 ' + makePill('godfly-opposing-counsel', 'godfly-opposing-counsel · 模拟对方辩友质证') + ' 模拟严苛的对立审计稽查官与对手方首席法务顾问，站在“刁难挑刺、寻找责任转嫁漏洞”的极端对抗视角，全面扫描我方合同中的无限连带赔偿责任陷阱与不可抗力免责缺陷。'
              },
              {
                time: '17:30',
                titleZh: 'AI 使用透明度台账与合规证据留痕',
                descZh: '对照《政务领域人工智能大模型部署应用指引》与企业 Responsible AI 内部政策，调用 ' + makePill('ai-provenance', 'ai-provenance · AI 来源与提示词追溯') + ' 导出结构化审计台账；台账中精确记录：AI 模型版本号、会话脱敏时间戳、提示词哈希校验值、人类复核责任人签字记录；一旦遭遇企业内控审计或保密检查，凭借完备的证据链一键实现“全链路自证合规”。'
              }
            ],
            minZeroZh: '任何呈送云端 AI 辅助处理的公文或纪要，严禁包含真实企事业单位全称、领导姓名与涉密信息；严格执行“涉密不上网”原则。',
            minProZh: '出具本地离线脱敏对照单、Godfly 模拟对抗审计的合同风控意见书及附带人类签署人盖章的《企业 AI 办公合规留痕单 (Provenance Ledger)》。'
          })}
        </div>


        <!-- Section 5.5 -->
        <div id="sec-5-5" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'zh',
            titleZh: '剧本五：普通个人与家庭日常：看病求医、辅导作业与防范诈骗',
            roleZh: '家庭生活 · Everyday Citizens & Families',
            introZh: '普通家庭最常使用 AI 的生活场景：身体不适随手问诊、辅导孩子作业以及防范深度伪造音视频电诈。',
            painZh: '日常生活中，普通家庭最常使用 AI 的场景并不是编写代码或起草公文，而是：身体不舒服时把症状或体检化验单随手发给 AI“看病”，让 AI 替孩子直接写作文和解答理化难题，或者在社交软件中收到疑似亲友借钱的语音和视频。面对图省事、图安心的心理，人们很容易把 AI 当成全知全能的家庭医生或全科家庭教师，甚至对高度逼真的 AI 拟真音视频丧失警惕。',
            nearMissZh: '把长辈的体检异常指标输入大模型，AI 顺应用户焦虑给出耸人听闻的严重疾病推测或自行建议药名与剂量，延误病情；孩子把整道题拍照发给 AI 抄答案，丧失拆解问题能力；诈骗团伙截取社交平台公开发布的语音与视频换脸冒充亲友致电借钱，导致巨额财产损失。',
            cases: [
              makeIncidentPill('case-chatgpt-medical-advice-delay-winters-2026', 'Winters 诉 OpenAI：ChatGPT 迎合误诊延误肺栓塞抢救案'),
              makeIncidentPill('case-deepfake-videocall-baotou-2024', '包头特大 AI 换脸拟声冒充好友视频诈骗案（10分钟被骗 430 万）'),
              makeIncidentPill('case-faceswap-auth-bypass-changsha-2026', '长沙破获利用 AI 换脸破解人脸识别盗刷案')
            ],
            steps: [
              {
                time: '习惯一',
                titleZh: '问健康：把 AI 当就诊“准备清单”，不作为诊断依据',
                descZh: '就医咨询前可让 AI“整理去医院时该向医生交代的 5 个关键问题”，但输入体检报告前务必遮盖名字、身份证号与就诊医院；特别提示：凡涉及“吃什么药、吃几粒、停不停药”，只听正规医院当面诊断处方，不采信大模型给出的自行用药建议。'
              },
              {
                time: '习惯二',
                titleZh: '伴学习：用追问做“思维脚手架”，严禁直接要现成答案',
                descZh: '与孩子约定辅导原则：给 AI 的提示词必须是“不要直接告诉我答案，请问我 3 个启发性问题，引导我自己把这道题想出来”。利用 ' + makePill('discernment-nudge', 'discernment-nudge · 批判性辨识微提醒') + ' 引导孩子找出 AI 讲解里不合逻辑的漏洞，把 AI 当成练辩论的陪练。'
              },
              {
                time: '习惯三',
                titleZh: '防电诈：家庭设立“线下安全暗号”，转账必须多源核验',
                descZh: '与父母、配偶约定只有家庭内部知道的口令（如“外公最爱吃的菜”或一串数字暗号）。一旦接到声称亲友急用钱、要求转账到陌生账户的微信语音或视频，无论声音画面多么逼真，先问暗号，并立即挂断通过原手机号二次回拨核实。'
              },
              {
                time: '习惯四',
                titleZh: '护隐私：帮父母手机检查 APP 权限与长期记忆',
                descZh: '定期花 3 分钟检查父母常用聊天软件中的 AI 助手，撤销麦克风与相册的常驻后台权限；在设置中关闭“允许使用我的数据训练”，并清空历史累积的个人记忆列表。'
              }
            ],
            minZeroZh: '问健康不盲信药名，就医当面遵医嘱；辅导作业只问思路步骤，不抄整句整篇；转账汇款必对家庭暗号，回拨本人核实；手机 AI 助手权限只给必要，定期清空个人记忆。',
            minProZh: '家庭设备定期执行隐私配置检查，建立亲友防电诈线下核验流程，并引导家庭成员具备基本的大模型幻觉认知与真伪辨识习惯。'
          })}
        </div>

        <!-- Chapter 5 to Chapter 6 Transition Card -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand/5 via-slate-50 to-brand/5 dark:from-brand/10 dark:via-slate-900 dark:to-brand/10 border border-brand/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-6">
          <div class="space-y-1">
            <span class="text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-1.5">
              <span>👉 离开前带走 · 5 件关键小事</span>
            </span>
            <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              掌握了日常剧本后，离开本页前今天就能立刻落实哪几件零门槛小事？
            </p>
          </div>
          <a href="#chapter-6" class="btn-primary text-xs font-bold px-4 py-2 shrink-0 flex items-center gap-1.5">
            <span>查看一页行动清单 (第 6 章) →</span>
          </a>
        </div>
      </section>

      <!-- Chapter 6 -->