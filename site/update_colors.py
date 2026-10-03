import re

with open('/Users/gaofeng/Documents/project/skill-4-responsible-AI-use/site/js/guide.js', 'r', encoding='utf-8') as f:
    content = f.read()

# For zh
content = content.replace(
    '<div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">\n            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">\n              <span>🔬 准标识符',
    '<div class="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/60 space-y-2 text-xs">\n            <div class="font-bold text-teal-900 dark:text-teal-100 flex items-center gap-1.5">\n              <span>🔬 准标识符'
)
content = content.replace(
    '<div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">\n            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">\n              <span>🔬 自回归原罪',
    '<div class="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/60 space-y-2 text-xs">\n            <div class="font-bold text-indigo-900 dark:text-indigo-100 flex items-center gap-1.5">\n              <span>🔬 自回归原罪'
)
content = content.replace(
    '<div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">\n            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">\n              <span>🔬 RLHF 奖励原罪',
    '<div class="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/60 space-y-2 text-xs">\n            <div class="font-bold text-purple-900 dark:text-purple-100 flex items-center gap-1.5">\n              <span>🔬 RLHF 奖励原罪'
)
content = content.replace(
    '<div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">\n            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">\n              <span>🔬 Agent 与 MCP',
    '<div class="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/60 space-y-2 text-xs">\n            <div class="font-bold text-rose-900 dark:text-rose-100 flex items-center gap-1.5">\n              <span>🔬 Agent 与 MCP'
)
content = content.replace(
    '<div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">\n            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">\n              <span>⚖️ 行政处罚文号',
    '<div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/60 space-y-2 text-xs">\n            <div class="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-1.5">\n              <span>⚖️ 行政处罚文号'
)

# For en
content = content.replace(
    '<div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">\n            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">\n              <span>🔬 Quasi-Identifiers',
    '<div class="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/60 space-y-2 text-xs">\n            <div class="font-bold text-teal-900 dark:text-teal-100 flex items-center gap-1.5">\n              <span>🔬 Quasi-Identifiers'
)
content = content.replace(
    '<div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">\n            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">\n              <span>🔬 Autoregressive Mechanics',
    '<div class="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/60 space-y-2 text-xs">\n            <div class="font-bold text-indigo-900 dark:text-indigo-100 flex items-center gap-1.5">\n              <span>🔬 Autoregressive Mechanics'
)
content = content.replace(
    '<div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">\n            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">\n              <span>🔬 RLHF Flaws',
    '<div class="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/60 space-y-2 text-xs">\n            <div class="font-bold text-purple-900 dark:text-purple-100 flex items-center gap-1.5">\n              <span>🔬 RLHF Flaws'
)
content = content.replace(
    '<div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">\n            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">\n              <span>🔬 Agent & MCP',
    '<div class="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/60 space-y-2 text-xs">\n            <div class="font-bold text-rose-900 dark:text-rose-100 flex items-center gap-1.5">\n              <span>🔬 Agent & MCP'
)
content = content.replace(
    '<div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">\n            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">\n              <span>⚖️ Authentic Administrative Penalties',
    '<div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/60 space-y-2 text-xs">\n            <div class="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-1.5">\n              <span>⚖️ Authentic Administrative Penalties'
)

with open('/Users/gaofeng/Documents/project/skill-4-responsible-AI-use/site/js/guide.js', 'w', encoding='utf-8') as f:
    f.write(content)

