#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Deep iteration humanizer script:
Polishes remaining inflated phrasing, metaphors, and intense adverbs in site/js/guide.js,
site/data/items.json, and site/data/incidents.json.
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 1. Update site/js/guide.js
guide_path = os.path.join(ROOT, 'site/js/guide.js')
with open(guide_path, 'r', encoding='utf-8') as f:
    guide_text = f.read()

replacements = [
    ('<strong>警示：取得同事录音或客户素材的使用权限，绝不代表可以随意上传投喂给 AI！</strong>',
     '<strong>提示：取得同事录音或客户素材的使用权限，并不包含将其用于 AI 模型训练或云端处理的许可。</strong>'),
    
    ('“相关网络运行与安全日志”</strong>，而非用户输入的完整提示词与私有正文。绝不能拿合规为服务商的无节制留存找借口。',
     '“相关网络运行与安全日志”</strong>，而非用户输入的完整提示词与私有正文；合规日志要求并不包含完整保存用户输入正文的许可。'),
     
    ('在与模型交互时，始终保持对抗性质疑，绝不把独立判断与最终决策权出让给算法。',
     '与模型交互时应保持独立审视，由人做出最终判断与决策。'),
     
    ('当一份由 AI 辅助生成的代码、一篇营销稿件、一份产品页面准备推向生产环境或公开发表时，绝不能凭直觉直接放行。在法律层面上，<strong>AI 从来不是法律责任的主体，任何生成后果都由提交与发布它的真实个人或组织承担全部责任。</strong>',
     '当 AI 辅助生成的代码、文案或产品页面准备对外发布时，需要经过实质性核对。在法律上，<strong>AI 并非责任主体，发布内容的法律责任由提交者或发布者自行承担。</strong>'),
     
    ('AI 代码补全绝不是许可证清洗机，CI/CD 必须强制引入 SCA 与 SBOM 比对；',
     'AI 生成的代码同样受上游开源许可证约束，在持续集成中应引入依赖检查与 SBOM 审计；'),
     
    ('绝不随提示词发送给大模型；严守红线：若会议涉及国家秘密、工作秘密或核心商业秘密，坚决落实传统物理隔离保密流程，绝对不得靠“假名化脱敏”试图洗白上网。',
     '不随提示词发送给大模型；若会议涉及国家秘密、工作秘密或核心商业秘密，严禁上传至公有云大模型，单纯的假名化替换无法消除泄密风险。'),
     
    ('就诊“准备清单”，绝不当“主治医生”',
     '就诊“准备清单”，不作为诊断依据'),
     
    ('大模型生成文献综述与论据支撑后，坚决执行“默认虚构”零信任查验。',
     '模型生成文献综述与论据后，需进行逐条真实性核验。'),
     
    ('坚决剔除“最、首选、顶级”等违法极端用语。',
     '排查并剔除“最、首选、顶级”等违反广告法的极限词。'),
     
    ('坚决断开并禁用任何带“云端同步”、“AI 听会”或自动上传的第三方商业录音转写工具；',
     '禁用带有自动云端同步或上传功能的第三方录音转写插件；'),
     
    ('坚决不信大模型的自行配药建议。',
     '不采信大模型给出的自行用药建议。'),
     
    ('正以不可逆转的速度渗透进每一个人的工作与生活。',
     '正在被广泛应用于日常办公与专业研究中。'),
     
    ('必须落实“默认权限”与不可逆操作强人工审批。',
     '必须落实最小权限原则，关键系统操作需经过人工确认。'),
     
    ('提示词不可逆哈希校验值',
     '提示词哈希校验值'),
     
    ('极易贻误病情造成不可逆健康损害。',
     '可能延误病情、损害健康。'),
     
    ('形成不可逆的认知依附。',
     '容易产生认知依赖。'),
     
    ('临时微虚拟机沙盒物理隔离。',
     '临时微虚拟机沙盒隔离。'),
     
    ('微虚拟机物理隔离执行',
     '微虚拟机沙盒执行'),
     
    ('严守 NIST AI 600-1 与 OWASP LLM02 敏感数据防泄漏底线。',
     '参考 NIST AI 600-1 与 OWASP LLM02 规范防范敏感数据泄露。'),
     
    ('可能触碰《最高法(2021)最高法知民终2063号》判例所确立的底线',
     '可能违反《最高法(2021)最高法知民终2063号》判例中的合规要求'),
     
    ('坚持<strong>“完全开源、不造黑话、实证可查、服务大众”</strong>的底线。',
     '坚持<strong>“完全开源、表述平实、证据可查、服务大众”</strong>的原则。'),
     
    ('一个负责任的协作闭环包括两个动作',
     '一个规范的协作流程包括两个环节'),
     
    ('构成完整闭环交付双保险。',
     '作为发布前的验证与文字润色环节。'),
     
    ('关好这几个基础开关后，如何在日常对话与交互中真正筑牢防线？',
     '完成基础配置后，在日常对话与交互中还需要注意哪些事项？'),
     
    ('筑牢学术声誉防线。',
     '保障学术诚信与成果的可追溯性。'),
     
    ('人类沦为敲章机器（极其危险）。',
     '人类审核流于形式，增加决策风险。'),
     
    ('极其容易顺从大模型生成的极具煽动性、但充斥着夸大修辞的草稿直接发布。',
     '容易直接采纳大模型生成的包含夸大修辞的草稿。'),
     
    ('请毫不犹豫地向我们指正！',
     '欢迎向我们指正或提交修改建议。')
]

count = 0
for old, new in replacements:
    if old in guide_text:
        guide_text = guide_text.replace(old, new)
        count += 1
    else:
        print(f"Notice: not found in guide.js: {old[:35]}")

with open(guide_path, 'w', encoding='utf-8') as f:
    f.write(guide_text)
print(f"guide.js: Successfully replaced {count} items.")

# 2. Update site/data/items.json
items_path = os.path.join(ROOT, 'site/data/items.json')
with open(items_path, 'r', encoding='utf-8') as f:
    items = json.load(f)

for it in items:
    if it['id'] == 'publish-prep-review':
        it['summary_cn'] = it['summary_cn'].replace('进行闭环校验', '进行完整校验')

with open(items_path, 'w', encoding='utf-8') as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
    f.write('\n')
print("items.json: Cleaned.")

# 3. Update site/data/incidents.json
inc_path = os.path.join(ROOT, 'site/data/incidents.json')
with open(inc_path, 'r', encoding='utf-8') as f:
    incidents = json.load(f)

for inc in incidents:
    if inc['id'] == 'case-court-fake-citation-tongzhou-2025':
        inc['consequence_zh'] = inc['consequence_zh'].replace(
            '法院对虚假参考案例坚决不予采纳，并在判决书中对代理律师正式批评，责令严格核验并警示规范使用新技术。',
            '法院对该虚假参考案例不予采纳，并在判决书中对代理律师提出正式批评，责令严格核验并规范使用新技术。'
        )

with open(inc_path, 'w', encoding='utf-8') as f:
    json.dump(incidents, f, ensure_ascii=False, indent=2)
    f.write('\n')
print("incidents.json: Cleaned.")
