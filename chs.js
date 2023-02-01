/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Achievement Gotten!": "成就达成！",
    "(1) Notebook": "(1) 笔记本",
    "Advanced Calculus": "高级微积分",
    "AI Calculation Focus": "人工智能计算重点",
    "AI Code Focus": "人工智能代码焦点",
    "AI Companion": "人工智能伴侣",
    "AI Node": "人工智能节点",
    "Algebra": "代数",
    "Algebra 2": "代数 2",
    "Algorithms": "Algorithms",
    "Arithmetic": "算术",
    "Art": "艺术",
    "Assembly": "Assembly",
    "autosaving...": "自动保存...",
    "bonus": "奖金",
    "Bot Net": "僵尸网络",
    "Calculate": "计算",
    "Calculations": "运算",
    "Calculator": "计算器",
    "Calculus": "微积分",
    "CAS Calculator": "CAS计算器",
    "Chalkboard": "黑板",
    "Code": "代码",
    "Code Analyzer": "代码分析器",
    "Complex Analysis": "复变分析",
    "Computer": "电脑",
    "Create Game": "创建游戏",
    "Create Website": "创建网站",
    "CS Skill": "CS技能",
    "Decimals": "小数",
    "Design AI Companion": "设计人工智能伴侣",
    "Design AI Node": "设计AI节点",
    "Design Code Analyzer": "设计代码分析器",
    "Design Language": "设计语言",
    "Design Self Correcting Code": "设计自校正代码",
    "Design Self Editing Program": "设计自编辑程序",
    "Dev Tools": "开发工具",
    "Developer": "开发商",
    "Donate": "捐",
    "Effort": "努力",
    "Enter Computer Matrix": "输入计算机矩阵",
    "Geometry": "几何学",
    "Grade Up": "升级",
    "Graduate": "毕业",
    "Haskell": "Haskell",
    "Help support this game's developer (Wilkowski)": "帮助支持该游戏的开发者 (Wilkowski)",
    "HTML": "HTML",
    "Javascript": "Javascript",
    "Linear Algebra": "线性代数",
    "Logic": "逻辑",
    "Logo": "商标",
    "main": "主页",
    "Make Math Solver": "制作数学求解器",
    "Make Neural Net": "制作神经网络",
    "math": "数学",
    "Math Contest": "数学竞赛",
    "Math Skill": "数学技能",
    "Memory": "内存",
    "Money": "钱",
    "Motivational Book": "励志书",
    "None": "无",
    "Notebook": "笔记本",
    "Number Theory": "数论",
    "Numbers": "数字",
    "Pre-Algebra": "预代数",
    "Python": "Python",
    "Reading": "读",
    "Representation Theory": "表示论",
    "Reset": "重置",
    "Save game text goes here.  ": "保存游戏文本在这里。",
    "Self Correcting Code": "自校正码",
    "Self Editing Program": "自我编辑程序",
    "Server": "服务器",
    "Solve Problem": "解决问题",
    "special": "特殊",
    "Start College": "开始上大学",
    "Start CS Super Project": "启动 CS 超级项目",
    "Start Grad School": "开始研究生院",
    "Start High School": "开始高中",
    "Start Math Super Project": "启动数学超级项目",
    "Start Middle School": "开始中学",
    "Start Research Project": "启动研究项目",
    "Start School": "开始上学",
    "Super Computer": "超级计算机",
    "Test Answers": "测试答案",
    "TFLOPS": "浮点数",
    "Topology": "拓扑结构",
    "Trigonometry": "三角函数",
    "Tutoring": "家教",
    "Vacation": "假期",
    "Wilkowski made the game, so he probably deserves your donations more": "Wilkowski 创造了游戏，所以他可能更值得您的捐赠",
    "Write Code": "写代码",
    "- Bit Effort": "- 一点点努力",
    "- Little Effort": "- 一点努力",
    "- Some Effort": "- 一些努力",
    "+ Effort/s": "+ 努力/秒",
    "+Grade": "+年级",
    "+Skill": "+技能",
    "Born": "出生",
    "Moving up in the world": "在世界上进步",
    "Tons/Tons": "吨/吨",
    "Some/Tons": "若干/吨",
    "Started School": "开始上学了",
    "None/None": "无/无",
    "None/Tons": "无/吨",
    "Learn to read": "学会阅读",
    "Learned to read": "学会了阅读",
    "These are words": "这些是文字",
    "+ Skill": "+ 技能",
    "2 4 6 8 Lets enumerate!": "2 4 6 8 让我们列举一下！",
    "Bit/Tons": "一点点/吨",
    "Created by Wilkowski, rehosted and updated by rebane2001": "由 Wilkowski 创建，由 rebane2001 重新托管和更新",
    "Little/Tons": "小/吨",
    "Little": "小",
    "So you can stop playing": "所以你可以停止玩",
    "RESET EVERYTHING.  Yes, even that.": "重置一切。 是的，即便如此。",
    "Hello World!": "你好，世界！",
    "Insert exported save here": "在此处插入导出的存档",
    "Copy this somewhere safe": "将此文档复制到安全的地方",
    "Bit": "一点点",
    "Learned to count": "学会了计算",
    "Lots/Tons": "很多/吨",
    "Not enough Effort": "没有足够的努力",
    "Some": "一些",
    "4 musters = 1 Effort": "4 集合 = 1 努力",
    "Work is hard work": "工作是艰苦的工作",
    "Is it recess yet?": "现在休会了吗？",
    "Game Saved": "游戏已保存",
    "Autosave enabled": "自动保存已启用",
    "Started Middle School": "开始上中学",
    "You found a purple crayon!": "你找到了紫色蜡笔！",
    "Math stuff": "数学方面的东西",
    "Not enough Calculations": "没有足够的计算",
    "Learned about colors": "学会了颜色",
    "-Ethics": "- 伦理",
    "+Math Skill": "+数学技能",
    "Math Skill not high enough": "数学技能不够高",
    "Wanna buy some answers?": "想买一些答案吗？",
    "+Effort": "+努力",
    "Easier than mental math": "比心算更容易",
    "Not enough Money": "没有足够的钱",
    "\"You can do it!\" - Famous Person": "“你能行！”——名人",
    "A normal calculator for ten times the price": "价格是普通计算器的十倍",
    "Got to put the math somewhere": "必须把数学放在某个地方",
    "if logic then cs": "if 逻辑则 cs",
    "Started High School": "开始读高中了",
    "Can't live without it": "没有它就活不下去",
    "Turtle goes forward 10": "乌龟前进 10",
    "Everybody needs a computer": "每个人都需要一台电脑",
    "Calculus in stunning 3D!": "令人惊叹的3D微积分！",
    "Not enough Code": "没有足够的代码",
    "TODO: write some flavor text": "待办：写一些趣味文字",
    "At least 8 pixels": "至少 8 个像素",
    "Click me!": "点我！",
    "Active": "已激活",
    "Fully debugged for now": "目前已完全调试",
    "With dragons!": "带着龙！",
    "Titanic attacks!": "泰坦尼克号袭击！",
    "ThingClicker": "阳光点击器",
    "In spaaaaace!": "太空大战",
    "4 musters = 2 Effort": "4 集合 = 2 努力",
    "+CS skill": "+CS 技能",
    "Grades, Sleep, Friends: Choose 2": "成绩、睡眠、朋友：选择 2",
    "Insight will be rewarded": "有见识就会有回报",
    "Started College": "开始上大学",
    "Survive another year": "再活一年",
    "Computational Number Theory": "计算数论",
    "Show everyone you're awesome web page": "向所有人展示你是很棒的网页",
    "Vector Curves": "矢量曲线",
    "With social networking!": "使用社交网络！",
    "Quantum Information Theory": "量子信息论",
    "Pure Numeric Information Theory": "纯数值信息论",
    "Numeric Topology": "数值拓扑",
    "Numeric Information Theory": "数值信息论",
    "Numeric Combinatorics": "数值组合学",
    "Moogle It": "默哀吧",
    "Start math super project": "开始数学超级项目",
    "Unravel the secrets of the universe": "揭开宇宙的秘密",
    "Linear Knot Theory": "线性结理论",
    "Homological Group Theory": "同源群论",
    "Grouping abstract mathematical fields": "分组抽象数学领域",
    "Godisgirl": "糖果女孩",
    "Freeeeedom!!!!": "自由由由由由由由！",
    "Elliptical Information Theory": "椭圆信息论",
    "Dynamical Information Theory": "动态信息论",
    "Dynamical Combinatorics": "动态组合学",
    "Computational Curves": "运算曲线",
    "Complex Elliptical Information Theory": "复数椭圆信息论",
    "Coffee mugs and doughnuts": "咖啡杯和甜甜圈",
    "Almost there!": "差不多好了！",
    "Algebraic Statistics": "代数统计",
    "Abstract Dynamical Information Theory": "抽象动力信息论",
    "With on the fly garbage optimization": "即时垃圾优化",
    "Will write code for large amounts of money": "会为了大笔的钱写代码",
    "Wahoo! Its a website!": "哇哦！ 它是一个网站！",
    "Trigonometric Knot Theory": "三角结理论",
    "Regularly expressive": "有规律地表达",
    "May contain cookies": "可能包含cookie",
    "Math Super Project not available in this version": "数学超级项目在此版本中不可用",
    "Linear Statistics": "线性统计",
    "Lambdas, Lambdas everywhere": "Lambdas，Lambdas 无处不在",
    "It keeps getting bigger and smaller": "它不断变大变小",
    "Hyperbolic Calculus": "双曲微积分",
    "Homological Statistics": "同源统计",
    "Game of thrown errors": "抛出错误的游戏",
    "Fractal Statistics": "分形统计",
    "Excels at calculations": "精于运算",
    "Capable of beating a goldfish at checkers": "能够在跳棋中击败金鱼",
    "As seen on reddit!": "正如在 reddit 上看到的！",
    "Applied Trigonometric Calculus": "应用三角微积分",
    "Applied Quantum Calculus": "应用量子微积分",
    "Always utilizes 100% of your CPU": "始终使用 100% 的 CPU",
    "Adds up multiple numbers at once": "一次将多个数字加起来",
    "An abstract calculator": "一个抽象的计算器",
    "Computers, ASSEMBLE!": "电脑，组装！",
    "Enough of these could change the world": "这些足以改变世界",
    "Great for job interviews": "非常适合求职面试",
    "Make(display [Hello World!])#": "实现（显示[Hello World！]）#",
    "Only 4 colors needed": "只需要4种颜色",
    "Like Minecraft but worse!": "像 Minecraft 但更糟！",
    "The speed of Python with the syntax of Fortran!": "Python 的速度与 Fortran 的语法！",
    "Highly recommended": "强烈推荐",
    "Quantum Calculus": "量子微积分",
    "Geometric Manifolds": "几何流形",
    "Differential Combinatorics": "微分组合学",
    "Trigonometric Algebra": "三角代数",
    "Linear Game Theory": "线性博弈论",
    "Hyperbolic Game Theory": "双曲博弈论",
    "Hyperbolic Geometry": "双曲几何",
    "Probabilistic Curves": "概率曲线",
    "Computational Topology": "运算拓扑",
    "Collect them all!": "全部收集起来！",
    "Abstract Geometric Statistics": "抽象几何统计",
    "Algebraic Geometry": "代数几何",
    "Algebraic Group Theory": "代数群论",
    "Be the best nerd!": "成为最好的书呆子！",
    "Algebraic Combinatorics": "代数组合",
    "Applied Elliptical Group Theory": "应用椭圆群论",
    "Complex Calculations": "复杂运算",
    "Elliptical Group Theory": "椭圆群论",
    "Geometric Curves": "几何曲线",
    "Geometric Information Theory": "几何信息论",
    "Hyperbolic Number Theory": "双曲数论",
    "HollowKnight": "空洞骑士",
    "Hyperbolic Number Theory": "双曲数论",
    "TheLegendofZelda": "塞尔达传说",
    "Differential Group Theory": "微分群论",
    "Abstract Geometric Tensor Theory": "抽象几何张量理论",
    "Got 1st place and won $100": "获得第一名并赢得 $100",
    "Trigonometric Manifolds": "三角流形",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    // 图标代码，不能汉化
    "Jacorb's Games": "Jacorb's Games",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "By Jacorb90": "By Jacorb90",
    "content_copy": "content_copy",
    "library_books": "library_books",
    "discord": "discord",
    "drag_handle": "drag_handle",
    "edit": "edit",
    "forum": "forum",
    "content_paste": "content_paste",
    "delete": "delete",
    "info": "info",
    "settings": "settings",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    'x': 'x',
    'QQ群号:': 'QQ群号:',
    '* 启用后台游戏': '* 启用后台游戏',
    '更多同类游戏:': '更多同类游戏:',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "\n": "\n",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Shift-Click to Toggle Tooltips: ": "Shift-单击以切换工具提示：",
    "Started Grade ": "开始年级",
    "Muster ": "集合 ",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "  ",
    " ": " ",
    "\n": "\n",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    " Effort/s": " 努力/秒",
    " bugs appeared": " 错误出现了",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)\-([\d\.]+)\-([\d\.]+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^\- \$([\d\.]+)$/,
    /^\- \$([\d\.]+)K$/,
    /^\(([\d\.]+)\)$/,
    /^([\d\.]+)\%$/,
    /^([\d\.]+)\/([\d\.]+)$/,
    /^([\d\.]+)K\/([\d\.]+)K$/,
    /^([\d\.]+) \(([\d\.]+)\/s\)$/,
    /^([\d\.]+)K \(([\d\.]+)\/s\)$/,
    /^([\d\.]+)\/([\d\.]+) \(([\d\.]+)\/s\)$/,
    /^([\d\.]+)\/([\d\.]+)K \(([\d\.]+)\/s\)$/,
    /^([\d\.]+)K\/([\d\.]+)K \(([\d\.]+)\/s\)$/,
    /^([\d\.]+)M\/([\d\.]+)M \(([\d\.]+)\/s\)$/,
    /^([\d\.]+)B\/([\d\.]+)B \(([\d\.]+)\/s\)$/,
    /^\(([\d\.]+)\/([\d\.]+)\)$/,
    /^成本(.+)$/,
    /^\(([\d\.]+)\%\)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)K$/,
    /^([\d\.]+)M$/,
    /^([\d\.]+)B$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^\+([\d\.,]+)$/,
    /^\-([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.,]+) \/ ([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^e([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^\+ \$(.+), \+ (.+) Effort\/s, \+ (.+) Max Effort$/, '\+\$ $1，\+$2 努力\/秒，\+$3 最大努力'],
    [/^\+ ([\d\.]+) Math Skill$/, '\+ $1 数学技能'],
    [/^\+ ([\d\.]+) Max Calculations$/, '\+ $1 最大运算'],
    [/^\+([\d\.]+) muster reward$/, '\+ $1 集合奖励'],
    [/^\+ ([\d\.]+)\% Code\/s when active$/, '\+ $1\% 代码\/秒 当激活时'],
    [/^\+ ([\d\.]+)\% Money\/s when active$/, '\+ $1\% 钱\/秒 当激活时'],
    [/^\+ ([\d\.]+)\% Calculations\/s when active$/, '\+ $1\% 运算\/秒 当激活时'],
    [/^\+ ([\d\.]+)\% Calculations\/s when complete$/, '\+ $1\% 运算\/秒 当完成时'],
    [/^\+ ([\d\.]+)\% Money\/s when complete$/, '\+ $1\% 钱\/秒 当完成时'],
    [/^\+ ([\d\.]+)\% Code\/s when complete$/, '\+ $1\% 代码\/秒 当完成时'],
    [/^\+ ([\d\.]+)\% fewer bugs and less frequent bugs when active$/, '降低 $1\% Bug出现频率 以及 减少激活时出现的bug'],
    [/^\+ ([\d\.]+)\% Fewer bugs and less frequent bugs when complete$/, '降低 $1\% Bug出现频率 以及 减少完成时出现的bug'],
    [/^\+ \$([\d\.]+)\/s when active$/, '\+ \$ $1\/秒 当激活时'],
    [/^\+ \$([\d\.]+)\/s when complete$/, '\+ \$ $1\/秒 当完成时'],
    [/^\+ ([\d\.]+) Code$/, '\+ $1 代码'],
    [/^\+ ([\d\.]+) Max Code$/, '\+ $1 最大代码'],
    [/^\+ ([\d\.]+) CS Skill$/, '\+ $1 CS技能'],
    [/^\+ ([\d\.]+)K Math Skill$/, '\+ $1K 数学技能'],
    [/^\+ ([\d\.]+)K Max Code$/, '\+ $1K 最大代码'],
    [/^\+ ([\d\.]+) Calculation$/, '\+ $1 运算'],
    [/^\+([\d\.]+)\% Calculations\/s$/, '\+$1\% 运算\/秒'],
    [/^\+([\d\.]+)\% Money\/s$/, '\+$1\% 钱\/秒'],
    [/^\+([\d\.]+)\% Code\/s$/, '\+$1\% 代码\/秒'],
    [/^\+ ([\d\.]+) Code\/s$/, '\+ $1 代码\/秒'],
    [/^\+ ([\d\.]+) Calculations\/s$/, '\+ $1 运算\/秒'],
    [/^\+ ([\d\.]+) Calculations\/s, \+ ([\d\.]+) Code\/s$/, '\+ $1 运算\/秒, \+ $2 代码\/秒'],
    [/^\+ ([\d\.]+) Effort\/s, \+ (.+) Max Effort$/, '\+ $1 努力\/秒, \+ $2 最大努力'],
    [/^\- (.+) Effort$/, '\- $1 努力'],
    [/^\- (.+) Effort, \$([\d\.]+)K$/, '\- $1 努力, \$ $2K'],
    [/^\- (.+) Effort, (.+) Calculations$/, '\- $1 努力，$2 运算'],
    [/^\- ([\d\.]+) Effort, ([\d\.]+) Calculations, ([\d\.]+) Code$/, '\- $1 努力，$2 运算，$3 代码'],
    [/^\- ([\d\.]+) Effort, ([\d\.]+) Code$/, '\- $1 努力，$2 代码'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
	[/^([\d\.]+)\% completed$/, '$1\% 已完成'],
	[/^([\d\.]+)\% complete$/, '$1\% 已完成'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^\- ([\d\.]+) Effort$/, '\- $1 努力'],
    [/^([\d\.]+) Math Contest$/, '$1 数学竞赛'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+)d ([\d\.]+)h ([\d\.]+)m$/, '$1天 $2小时 $3分'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^([\d\.,]+) elves$/, '$1 精灵'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) elves$/, '要求：$1 精灵'],
    [/^Req: (.+) \/ (.+) elves$/, '要求：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);