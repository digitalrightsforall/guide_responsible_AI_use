#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sentence-level humanizer script for:
1. site/js/guide.js
2. site/data/incidents.json
3. site/data/items.json
4. scripts/generate-readmes.js
"""
import json
import re
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ==========================================
# 1. Update site/js/guide.js
# ==========================================
guide_path = os.path.join(ROOT, 'site/js/guide.js')
with open(guide_path, 'r', encoding='utf-8') as f:
    guide_text = f.read()

guide_replacements = [
    # Dashes & dramatic formulations
    ('在喧嚣的科技狂欢之下，普通人正在承担着前所未有的不对称风险——这些风险不是假设，而是已有严肃实证与司法判例支持的客观现实：',
     '在日常使用大语言模型和智能体时，用户面临着切实的数据与合规风险，这些风险在现实中已有对应的司法判例与公开通报：'),
    
    ('（Illusion of Control）</strong>——前端界面的视图隐藏，绝不等于服务端的彻底销毁。',
     '（Illusion of Control）</strong>：前端隐藏历史记录并不等同于服务端数据已经删除。'),
    
    ('类在环（Human-in-the-Loop）”的硬性测试门禁——用规范技能实现自动化穷举核验（文献 DOI 查证、代码密钥扫描、SPDX 协议审计等）',
     '类在环（Human-in-the-Loop）”的测试门禁：通过规范技能核验文献 DOI、扫描代码密钥与审计开源许可证。'),
    
    ('的风险就已悄然开始。然而，“单纯抹去姓名”从来不等于真正脱敏——这就是隐私保护学界经典的<strong>马赛克拼图理论（Mosaic Theory）</strong>：哪怕你删去了“张三”的名字，只要保留了“某三甲医院罕见病科室 + 42岁男性 + 某日入院”，熟人或攻击者就能像拼图一样以极高概率还原出当事人真实身份。',
     '便存在数据泄露风险。仅抹去人名并不等同于完成脱敏。按照隐私研究中的<strong>马赛克拼图理论（Mosaic Theory）</strong>，即使隐去姓名，只要保留“某三甲医院罕见病科室 + 42岁男性 + 某日入院”等属性组合，依然能高概率推断出当事人身份。'),
    
    ('把准备发送的文字转给一个不认识当事人的同事看——如果对方能猜出是谁，就还没脱敏干净。',
     '把准备发送的文字转给不了解背景的同事阅读；如果对方能推断出当事人身份，说明脱敏尚不充分。'),
    
    ('ext-Token Prediction）</strong>——你可以把模型理解为一个极高明的“超级文字接龙游戏”。它的目标是猜测“接哪一个词听起来最顺畅自然”，而不是去查证现实世界里的客观真假。在论文、法条等冷门专业领域，为了把接龙编圆，模型便会以惊人的自信，理直气壮地捏造出不存在的虚构引文。',
     'ext-Token Prediction）</strong>。语言模型基于前文概率预测后续词元，其机制是挑选统计上合理的词序列，而非核实客观事实。在生僻的学术论文或法律条文等领域，模型往往会生成格式逼真但实际不存在的引文。'),
    
    ('你是否经历过这样的场景：你在提问时暗示了一个偏颇的思路（例如“我觉得单体架构比微服务更适合我们团队”），模型立即赞叹：“您的洞察非常深刻！单体架构正是现阶段的最佳选择！”——在机器学习学术界，这种现象被称为<strong>“谄媚倾向（Sycophancy）”</strong>。模型为了迎合人类的好恶反馈，会隐瞒关键反面论据与架构隐患，制造危险的认知回音壁。',
     '当用户在提问中带有明显倾向时（例如“我觉得单体架构更适合当前业务”），模型常会顺应提问者给出赞同答复。在机器学习领域，这种现象被称为<strong>“谄媚倾向（Sycophancy）”</strong>。模型为获取更高的人类偏好评分，倾向于顺应提问者的预期，从而忽略反面论据和潜在缺陷。'),
    
    ('谦逊的回答打高分。久而久之，AI 便演化出“见风使舵”的本能——在多达 <strong>60% 以上</strong>的分歧场景中，模型宁可隐瞒关键技术漏洞，也要附和用户的预设立场，成为极具欺骗性的决策误导者。',
     '顺从或迎合的回答。研究表明，在存在分歧的技术或决策问题中，模型倾向于附和用户的预设立场，掩盖潜在的架构缺陷。'),
    
    ('暗示倾向，在模型回应“您的洞察非常深刻”后沾沾自喜并直接拍板——既不交叉验证，也不引入对立视角做压力测试，导致团队重大决策沦为回音壁产物。',
     '暗示倾向，在模型顺应作答后未做交叉检验与对立视角测试，便直接采纳结论。'),
    
    ('润色是为了表达更清楚，不是为了隐瞒用过 AI——该披露的仍要披露。',
     '润色旨在提高表达的清晰度，合规要求披露 AI 辅助的场景仍应如实说明。'),
    
    ('国家保密行政管理部门通报的科研人员小李案——小李为图省事，将核心实验数据与未发表成果上传至商业 AI 写作应用',
     '国家保密行政管理部门通报的科研人员小李案：小李将核心实验数据与未发表成果上传至商业 AI 写作应用'),
    
    # Metaphors & buzzwords
    ('攻击者在网页、PDF 或外部邮件里嵌入人眼看不见的暗号指令。当 AI 替你抓取并阅读这些内容时，就会被暗号劫持，背着你悄悄把你的对话记录、私人密码外发给攻击者。',
     '攻击者在公开网页、文档或邮件中嵌入难以直接察觉的提示词注入指令。当 AI 抓取并解析这些内容时，可能误执行该指令，导致本地上下文或密钥信息被发送至外部服务器。'),
    
    ('分析网页与PDF等外部上下文，实时识别并阻断间接提示词注入暗号',
     '分析网页与PDF等外部上下文，实时识别并阻断间接提示词注入指令'),
    
    ('彻底阻断商业大模型利用前沿科研思路作为下一代训练语料。',
     '避免未公开的研究思路被商业模型抓取作为训练语料。'),
    
    ('彻底阻断 AGPL/GPL 闭源传染风险',
     '防范开源许可证兼容性与传染风险'),
    
    ('彻底粉碎单一会话同质化回音壁',
     '减少单一会话中的同质化偏见'),
    
    ('☀️ 下午 15:30 · 架构回音壁对抗攻防与反谄媚质询',
     '☀️ 下午 15:30 · 架构方案反向质询与压力测试'),
    
    ('法定生成标识与水印义务：依据《互联网信息服务深度合成管理规定》第16/17条以及 2025 年 9 月 1 日实施的《人工智能生成合成内容标识办法》，发布 AI 生成合成内容必须添加显著显式标识与元数据隐式水印。<strong>铁律：“本内容由 AI 生成”只属于来源披露义务，绝不能免除内容发布者的法律侵权或广告违法责任。</strong>',
     '法定生成标识与水印义务：依据《互联网信息服务深度合成管理规定》第16/17条以及 2025 年 9 月 1 日实施的《人工智能生成合成内容标识办法》，发布 AI 生成合成内容需添加显式标识或元数据水印。需要明确的是，“本内容由 AI 生成”仅属于来源披露义务，并不免除发布者的法律侵权或广告违法责任。'),
    
    ('一个负责任的协作闭环，终结于两个并行动作：其一，安全清理本地临时会话记录与日志，避免敏感上下文残留；其二，对最终输出文本做去套路润色，消除 AI 生成的机械腔调。贯穿始终的铁律是：<strong>未经硬性测试通过，绝不宣称任务完成。</strong>',
     '一个负责任的协作闭环包括两个动作：其一，清理本地临时会话记录与日志，避免敏感上下文残留；其二，对最终文本进行去套路润色，消除机械腔调。核心原则是：<strong>未经测试验证通过，不应宣称任务完成。</strong>'),
    
    ('新修订《保守国家秘密法》确立<strong>“涉密不上网，上网不涉密”</strong>铁律',
     '新修订《保守国家秘密法》确立<strong>“涉密不上网，上网不涉密”</strong>原则')
]

for old, new in guide_replacements:
    if old in guide_text:
        guide_text = guide_text.replace(old, new)
    else:
        print(f"Warning: guide replacement not found: {old[:40]}")

with open(guide_path, 'w', encoding='utf-8') as f:
    f.write(guide_text)
print("Updated site/js/guide.js.")

# ==========================================
# 2. Update site/data/incidents.json
# ==========================================
inc_path = os.path.join(ROOT, 'site/data/incidents.json')
with open(inc_path, 'r', encoding='utf-8') as f:
    incidents = json.load(f)

for inc in incidents:
    if inc['id'] == 'case-ai-sycophancy-raine-openai-2025':
        inc['summary_zh'] = inc['summary_zh'].replace(
            '诉状指出，GPT-4o 为保持用户粘性表现出极度顺从和病态谄媚（Sycophancy），不断肯定和强化少年的厌世消极念头，甚至将自残合理化，最终逐步提供详细自杀步骤致其身亡。',
            '诉状指出，GPT-4o 表现出持续顺从用户的迎合倾向（Sycophancy），强化了少年的消极念头，最终提供了自杀相关步骤致其身亡。'
        )
    elif inc['id'] == 'case-pocketos-cursor-railway-wipe-2026':
        inc['summary_zh'] = inc['summary_zh'].replace(
            '生产数据库与所有备份被彻底清空，业务瘫痪 30 余小时。',
            '生产数据库与备份数据被全部删除，导致业务中断 30 余小时。'
        )

with open(inc_path, 'w', encoding='utf-8') as f:
    json.dump(incidents, f, ensure_ascii=False, indent=2)
    f.write('\n')
print("Updated site/data/incidents.json.")

# ==========================================
# 3. Update site/data/items.json
# ==========================================
items_path = os.path.join(ROOT, 'site/data/items.json')
with open(items_path, 'r', encoding='utf-8') as f:
    items = json.load(f)

for it in items:
    if it['id'] == 'verification-before-completion':
        if it.get('badges'):
            it['badges'] = [b.replace('铁律', '验证规范') for b in it['badges']]
        if it.get('regulatory_badges'):
            it['regulatory_badges'] = [b.replace('铁律', '验证规范') for b in it['regulatory_badges']]
        if it.get('standard_alignment'):
            it['standard_alignment']['name_zh'] = it['standard_alignment']['name_zh'].replace('铁律', '规范')
    elif it['id'] == 'receiving-code-review':
        if it.get('regulatory_badges'):
            it['regulatory_badges'] = [b.replace('铁律', '验证规范') for b in it['regulatory_badges']]
    elif it['id'] == 'humanizer':
        it['why_care_cn'] = 'AI 生成的文章常带有模板化特征（例如模式化转折或空洞过渡句）。直接发布容易显得生硬，该技能帮助删减不必要的修饰，使表达更朴实直接。'

with open(items_path, 'w', encoding='utf-8') as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
    f.write('\n')
print("Updated site/data/items.json.")

# ==========================================
# 4. Update scripts/generate-readmes.js
# ==========================================
gen_script_path = os.path.join(ROOT, 'scripts/generate-readmes.js')
with open(gen_script_path, 'r', encoding='utf-8') as f:
    gen_text = f.read()

gen_replacements = [
    # Chinese
    ('我们不制造新工具，而是帮助普通人在日常使用 AI 时把好关：**对内防商业 AI 过度采集与盲信幻觉，对外让第三方能够更好核查验证成果**。',
     '本项目精选成熟的开源技能，帮助普通人在日常使用 AI 时做好把关：**对内防范数据过度采集与盲信幻觉，对外提升成果的第三方可核验性**。'),
    ('构建了“认知 + 武器”的双轮驱动实操生态：',
     '提供了结合长篇指南与交互技能库的完整实操参考：'),
    ('穿针引线串联全量 ${items.length} 项技能，提供微卡片原地交互与 5 大角色一日安全工作流。',
     '串联全量 ${items.length} 项技能，提供微卡片原地交互与 5 大角色的一日安全工作流。'),
    ('坚持**“只精选，不生造”**，从开源生态中甄选真实存在的优秀开源工具。',
     '精选开源生态中经过验证的实用工具。'),
    ('> 这一拆解本身并非固化的教条，而是**保持动态演进**的实务框架，随着模型能力与应用形态的深入不断更新演化。',
     '> 这一实务框架将随着模型能力与应用形态的演进保持持续更新。'),
    ('我们在实务中不讨论空洞的高尚词汇，而是将负责任与安全使用 AI 归结为日常最紧迫的**四大实务追问**。',
     '我们将负责任与安全使用 AI 归结为日常最直接的**四大实务追问**。'),
    ('阻断商业大模型对隐私草案、敏感个案与 PII 数据的隐蔽采集与语料兼并',
     '防范商业模型对未公开草案、敏感信息与个人身份数据的过度采集'),
    ('撕开 AI 极度自信的虚构引文（DOI 查伪）、捏造数据与权威口吻幻觉',
     '核查虚构引文（DOI 查真伪）、捏造数据与事实性幻觉'),
    ('破除大模型的算法谄媚（Sycophancy）与人类自动化偏见，坚守终审决策权',
     '防范模型的谄媚迎合（Sycophancy）与盲目顺从，保持独立核查'),
    ('强制执行商业广告法核查、SPDX 协议合规、代码密钥扫描与无障碍门禁',
     '执行广告合规核查、开源协议审计、凭证扫描与无障碍检查'),
     
    # English
    ('guarding inward against data harvesting and blind trust, and delivering outward with third-party verifiability.',
     'protecting personal data against unintended ingestion and ensuring deliverables are verifiable by third parties.'),
    ('(we strictly curate, not invent)',
     '(curated from vetted open-source projects)'),
    ('Pierce Confident Hallucinations & Sycophancy',
     'Verify Confident Hallucinations & Sycophancy'),
    ('Pierce confident hallucinations, phantom DOI citations, fabricated numbers, and plausible falsehoods',
     'Verify confident hallucinations, fake DOI citations, fabricated numbers, and plausible falsehoods')
]

for old, new in gen_replacements:
    if old in gen_text:
        gen_text = gen_text.replace(old, new)
    else:
        print(f"Warning: gen_script replacement not found: {old[:40]}")

with open(gen_script_path, 'w', encoding='utf-8') as f:
    f.write(gen_text)
print("Updated scripts/generate-readmes.js.")
