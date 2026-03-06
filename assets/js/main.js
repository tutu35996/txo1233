document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.qc-nav-toggle');
  const navList = document.querySelector('.qc-nav-list');
  const submenus = document.querySelectorAll('.qc-has-submenu');

  document.querySelectorAll('img.qc-testimonial-avatar').forEach((img) => {
    img.addEventListener(
      'error',
      () => {
        if (img.dataset.qcFallbackApplied) return;
        img.dataset.qcFallbackApplied = '1';
        img.src = new URL('assets/images/qicheng-logo.png', document.baseURI).toString();
      },
      { once: true }
    );
  });

  const LANG_STORAGE_KEY = 'qc_lang';
  const RTL_LANGS = new Set(['ar']);

  const LANGS = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ru', label: 'Русский' },
    { code: 'pt', label: 'Português' },
    { code: 'ja', label: '日本語' },
    { code: 'zh-CN', label: '中文' },
    { code: 'ko', label: '한국어' }
  ];

  const LANG_FLAG = {
    en: 'us',
    es: 'es',
    fr: 'fr',
    ar: 'sa',
    de: 'de',
    ru: 'ru',
    pt: 'pt',
    ja: 'jp',
    'zh-CN': 'cn',
    ko: 'kr'
  };

  const I18N = {
    'zh-CN': {
      'nav.logo_aria': 'Qicheng Holdings Group',
      'nav.logo_alt': 'Qicheng Holdings Group',
      'nav.home': '首页',
      'nav.about': '启诚投资',
      'nav.business': '商业模式',
      'nav.txo': 'TXO 交易所',
      'nav.license': '合规与牌照',
      'nav.profit': '盈利体系',
      'nav.calculator': '收益计算',
      'nav.aria_main': '主导航',
      'nav.toggle': '切换导航',
      'nav.about.overview': '机构概览',
      'nav.about.founder': '创始人',
      'nav.about.structure': '组织结构',
      'nav.about.qgf': 'QGF 基金会',
      'nav.about.mission': '使命',
      'nav.about.testimonials': '用户评价',
      'nav.business.web2': 'WEB2 创新',
      'nav.business.core': '核心模式',
      'nav.business.future': '未来企划',
      'nav.business.v5': 'V5 战略',
      'nav.txo.origin': 'TXO 的诞生',
      'nav.txo.founder': '创始人',
      'nav.txo.team': '研发团队',
      'nav.txo.offline': '线下交易服务',
      'nav.license.statement': '合法合规声明',
      'nav.license.verification': '证书查询方式',
      'profit.page_title': '盈利体系 · 交易信号 · 推荐计划 · VIP 团队',
      'profit.page_desc': '了解 Qicheng Holdings 的交易信号系统、推荐计划、VIP 团队计划以及 35 天收益示例，并使用智能收益工具估算自己的复利表现。',
      'profit.hero_title': '多维收益<br>共享增长',
      'profit.hero_desc': 'Qicheng Holdings 通过全球<span class="qc-text-highlight">交易信号</span>、<span class="qc-text-highlight">推荐奖励</span>与<span class="qc-text-highlight">VIP 团队计划</span>，<br class="hidden sm:block">为会员打造全方位的财富增值体系。',
      'profit.hero_img_alt': '多维收益体系',
      'profit.signals_icon_alt': 'Trading Signals Icon',
      'profit.signals_title': 'Trading Signals',
      'profit.signals_subtitle': 'AI 量化交易信号',
      'profit.signals_lead': '全球统一信号，无国界交易',
      'profit.signals_desc': '交易时请严格遵守规则：每个信号均按固定资金管理执行，通过 TXO 复制交易系统一键跟随，降低操作门槛，提升执行一致性。',
      'profit.rules_title': '交易规则',
      'profit.rule_position_label': '仓位控制',
      'profit.rule_position_value': '每次信号使用账户余额的 2%',
      'profit.rule_return_label': '收益假设',
      'profit.rule_return_value': '单次平均回报约 50%（等效总资产 +1%）',
      'profit.rule_freq_label': '信号频次',
      'profit.rule_freq_value': '每日 2–4 次，取决于会员权益',
      'profit.rule_miss_label': '缺席规则',
      'profit.rule_miss_value': '如因任何原因错过信号，平台不予补偿',
      'profit.perk_basic_title': '基本会员权益',
      'profit.perk_basic_desc': '完成首次入金即可成为 QICHENG HOLDINGS 基础会员，永久享有每日 2 个交易信号，每次交易使用账户余额的 2%。',
      'profit.perk_honor_title': '荣誉信号',
      'profit.perk_honor_desc': '成功邀请 1 名正式会员加入 QICHENG HOLDINGS，即可获得 1 个额外的永久交易信号（荣誉信号），每次交易使用账户余额的 2%。',
      'profit.perk_team_title': '团队信号',
      'profit.perk_team_desc': '成功邀请 3 名正式会员加入 QICHENG HOLDINGS，即可获得 1 个额外的永久交易信号（团队信号），每次交易使用账户余额的 2%。',
      'profit.perk_referral_title': '推荐信号奖励',
      'profit.perk_referral_desc': '邀请好友成为 QICHENG HOLDINGS 正式会员，邀请人和新会员将在同一天各自获得 1 个额外交易信号（推荐信号），使用账户余额的 2% 进行交易。若同一天邀请多名成员，奖励可叠加领取。',
      'profit.example_title': '举例说明',
      'profit.example_desc': '示例：初始资金 $1,000，基础会员每日 2 次信号。按“每次 +1%”的等效增长计算：',
      'profit.example_lines': '第 1 天期末 ≈ 1000 × 1.01² = 1020<br>第 10 天期末 ≈ 1000 × 1.01^(2×10) = 1219<br>第 35 天期末 ≈ 1000 × 1.01^(2×35) = 2000',
      'profit.cta_calculator': '前往收益计算器',
      'profit.factor_title': '复利增长因子',
      'profit.factor_desc': '单次信号等效增长',
      'profit.factor_card1_title': '总信号次数',
      'profit.factor_card1_desc': '每日信号 × 天数',
      'profit.factor_card2_title': '计算模型',
      'profit.factor_card2_desc': '本金 × 1.01^总次数',
      'profit.hours_title': '全球交易时间表',
      'profit.hours_img_alt': 'Qicheng Global Trading Hours',
      'profit.hours_note': '不同区域市场的交易活跃时间对照，便于跨时区执行',
      'profit.referral_title': 'Referral Program',
      'profit.referral_subtitle': '推荐奖励计划',
      'profit.referral_desc': '完成首次存款（≥ $500）后，您将 100% 获得推荐奖励资格。邀请朋友加入，当他们完成注册并首次存款时，双方将获得专属奖励，并解锁额外的信号收益。',
      'profit.referral_rules_title': '领取规则',
      'profit.referral_rule1': '新会员首存必须 ≥ $500，且至少达到推荐人账户余额的 30%。',
      'profit.referral_rule2': '推荐人与新会员将在同一天收到额外的推荐信号，按各自账户余额的 2% 进行交易。',
      'profit.referral_rule3': '完成首次推荐后解锁第 3 个永久信号；完成第三次推荐后解锁第 4 个永久信号。',
      'profit.referral_th_deposit': '首次存款',
      'profit.referral_th_referrer': '推荐人奖励',
      'profit.referral_th_new': '新会员奖励',
      'profit.vip_title': 'VIP Team',
      'profit.vip_subtitle': 'VIP 团队晋升',
      'profit.vip_desc': '直接推荐 6 名会员加入，即可资格成为 VIP 会员，享受永久被动收入。交易量佣金基于整个团队的总交易量计算，每 10 天（每月 2 日、12 日、22 日）结算一次。',
      'profit.vip_th_level': '等级',
      'profit.vip_th_team': '团队人数',
      'profit.vip_th_direct': '直接推荐人数',
      'profit.vip_th_bonus': '晋升奖金',
      'profit.vip_th_commission': '交易量返佣',
      'profit.reports_title': 'Profit Reports',
      'profit.reports_subtitle': '35 天收益示例',
      'profit.reports_desc': '基于初始本金 $1,000，每日 2-4 次信号，每次投入 2% 本金，单次平均回报 50%（即总资产增长 1%）的复利模型推演。',
      'profit.report_basic_title': '基础会员 (2 信号/天)',
      'profit.report_honor_title': '荣誉会员 (3 信号/天)',
      'profit.report_team_title': '团队会员 (4 信号/天)',
      'profit.report_total_label': '35 天后预计总资产',
      'profit.day_1': '第 1 天',
      'profit.day_10': '第 10 天',
      'profit.day_20': '第 20 天',
      'profit.day_30': '第 30 天',
      'profit.cta_custom_calc': '自定义计算收益',
      'profit.rail_aria': '活动图',
      'profit.rail_tag_default': '交易信号 活动图',
      'profit.modal_aria': '活动图预览',
      'profit.modal_close': '关闭',
      'profit.modal_title_default': '交易信号 · 活动图',
      'profit.activity_signals': '交易信号',
      'profit.activity_referral': '推荐奖励',
      'profit.activity_vip': '团队奖励',
      'profit.activity_reports': '收益表',
      'profit.activity_suffix': '活动图',
      'license.page_title': '全球运营牌照 · TXO 合规与认证',
      'license.page_desc': '查看 TXO 交易所的合法合规声明、纽约州注册信息以及官方证书查询方式，了解 AML、KYC、风控与数据隐私保护体系。',
      'license.hero_title': '全球合规<br>安全之基',
      'license.hero_desc': 'TXO Exchange 由 TXO COMPREHENSIVE SERVICE INC. 运营，<br class="hidden sm:block">已在美国纽约州依法注册，并建立<span class="qc-text-highlight">金融级</span>内部控制体系。',
      'license.statement_title': 'Legal Statement',
      'license.statement_subtitle': '合法合规运营',
      'license.statement_desc': 'TXO COMPREHENSIVE SERVICE INC. 已通过纽约州州务卿办公室（Department of State）正式注册。官方认证文件编号为 <span class="qc-text-highlight">260104000062</span>。',
      'license.aml_title': '反洗钱 (AML)',
      'license.aml_desc': '严格的资金来源审查机制',
      'license.kyc_title': '身份识别 (KYC)',
      'license.kyc_desc': '全球用户身份认证体系',
      'license.risk_title': '风险控制',
      'license.risk_desc': '实时监测异常交易行为',
      'license.privacy_title': '数据隐私',
      'license.privacy_desc': '银行级用户数据加密保护',
      'license.cert_company_title': '美国授权公司证书',
      'license.cert_company_alt': 'TXO License 1',
      'license.cert_stock_title': 'TXO 股票证书',
      'license.cert_stock_alt': 'Stock Certificate',
      'license.verify_title': 'Verification',
      'license.verify_subtitle': '证书查询指引',
      'license.step1_title': '访问官方系统',
      'license.step1_desc': '浏览器访问：<a href="https://apps.dos.ny.gov/publicInquiry/" target="_blank" style="color: #fff; text-decoration: underline;">https://apps.dos.ny.gov/publicInquiry/</a>',
      'license.step2_title': '输入公司名称',
      'license.step2_desc': '在 Entity Name 输入框中填写：<span class="qc-text-highlight">TXO COMPREHENSIVE SERVICE INC</span>',
      'license.step3_title': '查看结果',
      'license.step3_desc': '点击 Search 按钮，查看官方数据库中的注册状态、成立日期等详细信息。',
      'nav.profit.signals': '交易信号系统',
      'nav.profit.referral': '推荐计划',
      'nav.profit.vip': 'VIP 团队计划',
      'nav.profit.reports': '收益报表',
      'footer.about_title': '关于启诚',
      'footer.txo_title': 'TXO 交易所',
      'footer.business_title': '商业模式',
      'footer.profit_title': '盈利体系',
      'footer.cta_title': 'Ready to Trade?',
      'footer.cta_button': '立即交易',
      'footer.tagline': '全球数字金融与经济系统协作组织',
      'footer.quick.txo': 'TXO 交易所',
      'footer.quick.business': '商业模式',
      'footer.quick.license': '合规与牌照',
      'footer.status_ok': 'All systems operational',
      'footer.aria_quick_pages': '关键页面',
      'footer.about.overview': '机构概览',
      'footer.about.founder': '创始人',
      'footer.about.structure': '组织结构',
      'footer.about.qgf': 'QGF 基金会',
      'footer.about.mission': '使命',
      'footer.about.timeline': '发展历程',
      'footer.about.testimonials': '用户评价',
      'footer.txo.origin': 'TXO 的诞生',
      'footer.txo.founder': '创始人',
      'footer.txo.team': '研发团队',
      'footer.txo.offline': '线下交易服务',
      'footer.txo.license': '合规与牌照',
      'footer.business.web2': 'WEB2 创新',
      'footer.business.core': '核心模式',
      'footer.business.future': '未来企划',
      'footer.business.v5': 'V5 战略',
      'footer.profit.signals': '交易信号系统',
      'footer.profit.referral': '推荐计划',
      'footer.profit.vip': 'VIP 团队计划',
      'footer.profit.reports': '收益报表',
      'footer.profit.calculator': '收益计算',
      'home.hero_kicker': 'Qicheng Holdings Group',
      'home.hero_title': '全球数字金融与经济系统协作组织',
      'home.hero_subtitle': '立足伦敦，构建覆盖 30+ 国家的数字经济协作网络，以透明、安全、创新为核心，推动数字金融与实体经济深度融合。',
      'home.hero_cta_business': '了解商业模式',
      'home.hero_cta_txo': '进入 TXO 交易所',
      'home.london_title': '立足伦敦 · 布局全球',
      'home.london_desc': 'Qicheng Holdings Group（QCH）成立于 2020 年，总部位于英国伦敦，在成熟且监管完善的金融环境中，构建面向未来的全球数字经济基础设施。',
      'home.london_cta_about': '关于启诚投资',
      'home.flags_caption': '构建覆盖全球的投资网络，捕捉每一个增长机会',
      'home.principles_title': '五维核心原则',
      'home.principles_subtitle': '构建可信赖的全球价值网络',
      'home.principles_desc': '透明、安全、协作、创新与可持续，是启诚面向全球数字经济时代的底层设计逻辑。这五个维度相互支撑，共同构建了一个开放、包容、可信赖的全球数字经济生态系统。',
      'home.principle_transparency_title': '透明',
      'home.principle_transparency_desc': '以数据与流程透明为基础，通过公开透明的信息披露机制，提升市场信任度与监管友好度，让每一笔交易、每一个决策都有据可查。',
      'home.principle_security_title': '安全',
      'home.principle_security_desc': '通过技术与制度双重保障，采用多重加密、智能风控与合规审计，守护资产与信息安全，为全球用户提供银行级的安全保障。',
      'home.principle_collaboration_title': '协作',
      'home.principle_collaboration_desc': '鼓励跨地区、跨行业协同，构建多方共赢的价值网络，连接全球资源，实现资源共享与价值共创，推动全球数字经济协同发展。',
      'home.principle_innovation_title': '创新',
      'home.principle_innovation_desc': '持续探索 AI、区块链、大数据等前沿技术在金融与产业中的高效落地，以技术创新驱动商业模式创新，引领数字经济发展方向。',
      'home.principle_sustainability_title': '可持续',
      'home.principle_sustainability_desc': '关注长期价值与社会责任，将数字经济与绿色发展结合，构建可持续的商业模式，为全球数字经济的长期健康发展贡献力量。',
      'home.txo_section_title': 'TXO 交易所 · 数字资产基础设施',
      'home.txo_section_desc': 'TXO 由 Qicheng 体系联合顶级技术与金融团队打造，致力于构建新一代高性能、强风控的数字资产交易基础设施。',
      'home.txo_cta_detail': '了解 TXO 详情',
      'home.txo_cta_license': '查看合规与牌照',
      'home.bridge_quote': '我们始终致力于推动共享经济，创造人人富足的未来',
      'home.testimonials_title': '超越期望',
      'business.page_title': 'Qicheng 商业模式 · 数字经济基础设施',
      'business.page_desc': '了解 Qicheng Holdings Group 提出的“数字化资产 + 可控数据 + 互联场景 + 全球运营系统”商业基础设施模型，以及 V5 全球战略矩阵。',
      'business.hero_title': '生态闭环<br>价值创造',
      'business.hero_desc': 'Qicheng Holdings Group 提出“数字化资产 + 可控数据 + 互联场景 + 全球运营系统”的<br class="hidden sm:block"><span class="qc-text-highlight">商业基础设施模型</span>，以系统化方式解决 Web2 时代的结构性矛盾。',
      'business.web2_kicker': 'The Challenge',
      'business.web2_title': 'Web2 的结构性矛盾',
      'business.web2_desc': '在当今的 Web2.0 世界中，用户创造价值，但难以获得与贡献相匹配的回报。平台捕获了大部分数据和价值，形成高度中心化的闭环。',
      'business.web2_card1_title': '价值错配',
      'business.web2_card1_desc': '用户创造价值，但收益被平台垄断',
      'business.web2_card2_title': '数据孤岛',
      'business.web2_card2_desc': '企业难以获取真实且可验证的用户数据',
      'business.web2_card3_title': '创新受限',
      'business.web2_card3_desc': '创新边界被锁定在单一生态之内',
      'business.web2_card4_title': '成本高昂',
      'business.web2_card4_desc': '封闭生态导致获客与运营成本持续上升',
      'business.core_kicker': 'Core Pillars',
      'business.core_title': '四大基础模块协同',
      'business.core_module1_img_alt': '数据资产化',
      'business.core_module1_title': '数据资产化',
      'business.core_module1_desc': '通过标准化机制，将数据沉淀为“可认证、可授权、可定价”的生产要素，打破平台垄断，让数据在多场景间安全流动。',
      'business.core_module2_img_alt': '透明价值循环',
      'business.core_module2_title': '透明价值循环',
      'business.core_module2_desc': '基于数字化商业链路系统，全链路追踪用户行为与供应链效率，精准匹配成本与回报，降低浪费，提升经营效率。',
      'business.core_module3_img_alt': '互联生态系统',
      'business.core_module3_title': '互联生态系统',
      'business.core_module3_desc': '打破数据孤岛，实现电商、游戏、社交与内容平台间的互操作性，建立跨行业、跨平台的价值链接。',
      'business.core_module4_img_alt': '全球运营系统',
      'business.core_module4_title': '全球运营系统',
      'business.core_module4_desc': '建设全球运营与技术中心，帮助企业快速扩展至国际市场，接入全球资本与资源，形成协同发展的产业网络。',
      'business.future_kicker': 'Future Blueprint',
      'business.future_title': '新经济基础设施',
      'business.future_card1_title': '数据基础设施',
      'business.future_card1_desc': '高安全、高可用的数据底座与隐私计算框架，保障数据主权。',
      'business.future_card2_title': '智能商业引擎',
      'business.future_card2_desc': '以 AI 驱动的智能决策与自动化运营系统，提升商业效率。',
      'business.future_card3_title': '数字经济走廊',
      'business.future_card3_desc': '连接多国市场的价值流通与结算“高速公路”，促进跨境贸易。',
      'business.v5_kicker': 'V5 Strategy',
      'business.v5_title': 'V5 全球战略矩阵',
      'business.v5_quote': '从技术、资产、安全、产业与基础设施五个维度，勾勒 Qicheng Holdings Group 的长期发展路径。',
      'business.v5_chip1_title': 'Technology',
      'business.v5_chip1_desc': '前沿技术，驱动创新',
      'business.v5_chip2_title': 'Asset',
      'business.v5_chip2_desc': '数字资产，价值基石',
      'business.v5_chip3_title': 'Security',
      'business.v5_chip3_desc': '多重风控，安全保障',
      'business.v5_chip4_title': 'Industry',
      'business.v5_chip4_desc': '产业融合，生态共赢',
      'business.v5_chip5_title': 'Infrastructure',
      'business.v5_chip5_desc': '全球基建，互联互通',
      'home.testimonials_desc': '启诚投资凭借其深厚的市场洞察力和精准的投资策略，一直致力于为客户创造长期稳定的财富增长。<br class="hidden sm:block">在我们的专业指导下，每一位投资者都能够在复杂的市场环境中稳步前行。<br class="hidden sm:block">与TXO交易软件的深度合作，更是为我们的投资者提供了无与伦比的交易体验。',
      'txo.hero_title': '下一代数字资产<br>交易基础设施',
      'txo.hero_desc': 'TXO 由 Qihang Capital 与 Helios Chain Research Institute 联合创立，致力于重新定义全球数字资产交易的<span class="qc-text-highlight">效率</span>、<span class="qc-text-highlight">安全</span>与<span class="qc-text-highlight">智能</span>。',
      'txo.page_title': 'TXO 加密货币交易所 · Qicheng 数字资产基础设施',
      'txo.page_desc': '了解 TXO 加密货币交易所的诞生、愿景与名称含义，核心创始团队与全球资本支持，以及全球线下实体交易服务布局。',
      'txo.vision_title': 'TXO 核心理念',
      'txo.section_vision_kicker': '愿景',
      'txo.vision_t_word': 'Titan / 交易',
      'txo.vision_x_word': '交易所 / X-经济',
      'txo.vision_o_word': '机会 / 开放',
      'txo.vision_t_desc': '坚实可靠的基础设施与全球级交易能力',
      'txo.vision_x_desc': '面向未来的下一代全球经济形态',
      'txo.vision_o_desc': '开放共享的全球价值流动机会',
      'txo.founder_title': '技术与金融的双重基因',
      'txo.section_founder_kicker': '创始人',
      'txo.founder_role': 'TXO 创始人兼首席架构师',
      'txo.founder_p1': 'Adrian Caldwell 博士是国际知名的分布式金融架构专家。他毕业于<span class="qc-text-highlight">斯坦福大学</span>计算机科学专业，并在<span class="qc-text-highlight">伦敦帝国学院</span>取得金融工程双博士学位。',
      'txo.founder_p2': '曾任高盛量化建模团队核心成员，2019 年创办 Helios Chain Research Institute，专注于下一代高性能清算系统与分布式风控网络。TXO 交易所正是其研究成果的系统化落地。',
      'txo.team_title': '顶尖团队与全球资本',
      'txo.section_team_kicker': '核心优势',
      'txo.team_rnd_title': '跨学科研发团队',
      'txo.team_rnd_1': '来自高盛、摩根士丹利的量化与风控专家',
      'txo.team_rnd_2': '来自 Google、Meta 的分布式系统架构师',
      'txo.team_rnd_3': '来自 MIT 加密学中心的密码学工程师',
      'txo.team_capital_title': '全球资本支持',
      'txo.offline_title': '实体交易网络',
      'txo.section_offline_kicker': '全球服务',
      'txo.offline_desc': '除线上撮合系统外，TXO 交易所还构建了覆盖全球主要区域的<span class="qc-text-highlight">线下实体交易网络</span>，为机构与高净值用户提供安全、私密的场外交易服务。',
      'txo.offline_card1_title': '官方认证',
      'txo.offline_card1_desc': '区域性线下交易机构资质认证',
      'txo.offline_card2_title': '合规安全',
      'txo.offline_card2_desc': '增强交易的合规性与资金安全',
      'calc.page_title': '收益计算 · Qicheng Holdings Group',
      'calc.page_desc': '根据 Qicheng 信号策略，输入初始金额、每天信号次数与周期，在线生成逐日收益表格。',
      'about.page_title': '启诚介绍 · Qicheng Holdings Group',
      'about.page_desc': '了解 Qicheng Holdings Group 的机构概览、创始人、全球组织结构、QGF 基金会以及发展理念、使命与愿景。',
      'about.hero_title': '构建全球<br>数字协作网络',
      'about.hero_desc': 'Qicheng Holdings Group (QCH) 始于 2020 年，总部位于伦敦。<br class="hidden sm:block">我们致力于连接全球金融中心，构建一个<span class="qc-text-highlight">透明</span>、<span class="qc-text-highlight">安全</span>且<span class="qc-text-highlight">可持续</span>的数字经济生态系统。',
      'about.overview_kicker': 'The Foundation',
      'about.overview_title': '立足伦敦，连接全球',
      'about.stat_founded': '成立年份',
      'about.stat_countries': '覆盖国家',
      'about.stat_aum': '管理资产 (AUM)',
      'about.intro_p1': '自创立伊始，QCH 便确立了“<span class="qc-text-highlight">全球数字经济协作网络建设者</span>”的宏大愿景。我们不仅仅是一家投资机构，更是一个连接数字资产与实体经济的桥梁。',
      'about.intro_p2': '依托伦敦成熟的监管环境、完备的金融基础设施与开放的创新生态，QCH 在短短数年内搭建起覆盖全球 <span class="qc-text-highlight">30+</span> 个国家和地区的协作网络。',
      'about.tab_compliance_title': '合规运营',
      'about.tab_compliance_desc': 'TXO 交易所持有美国 MSB 牌照与合规运营资质，建立金融级风控体系。',
      'about.tab_tech_title': '技术驱动',
      'about.tab_tech_desc': '融合 OpenAI、Gemini 等顶尖 AI 模型，打造智能化数字资产交易引擎。',
      'about.tab_ecosystem_title': '生态共赢',
      'about.tab_ecosystem_desc': '与高盛、红杉等全球顶级资本深度合作，构建可持续发展的金融生态。',
      'about.img_compliance_alt': '合规运营资质',
      'about.img_tech_alt': '技术驱动伙伴',
      'about.img_ecosystem_alt': '生态共赢伙伴',
      'about.partners_title': 'Our Partners',
      'about.partners_strip_alt': '合作伙伴标识',
      'about.founder_kicker': 'Leadership',
      'about.founder_title': '数学与技术的融合',
      'about.founder_role': '首席执行官',
      'about.founder_p1': 'Robert Harrison 毕业于<span class="qc-text-highlight">牛津大学</span>，专攻金融数学与新兴经济体系。他拥有超过 17 年的国际金融科技、全球资产配置以及跨境监管框架经验。',
      'about.founder_p2': '作为区块链技术与传统资本市场融合的先行者，Robert 先后参与了多个跨国数字金融基础设施项目。他被多家国际媒体誉为推动全球数字金融系统性发展的<span class="qc-text-highlight">关键人物</span>之一。',
      'about.founder_p3': '在 Robert 的领导下，Qicheng Holdings Group 坚持严谨的结构模型与全球化战略视野，持续为全球投资者释放<span class="qc-text-highlight">长期价值</span>。',
      'about.structure_kicker': 'Global Network',
      'about.structure_title': '跨界协作，汇聚智慧',
      'about.structure_card1_title': '技术专家',
      'about.structure_card1_desc': '人工智能与分布式系统领域的顶尖人才',
      'about.structure_card2_title': '金融分析师',
      'about.structure_card2_desc': '拥有敏锐市场洞察力的国际机构投资者',
      'about.structure_card3_title': '行业领袖',
      'about.structure_card3_desc': '能源、制造业与教育领域的资深实干家',
      'about.structure_card4_title': '经济顾问',
      'about.structure_card4_desc': '专注于国际政策研究的权威学者与顾问',
      'about.qgf_kicker': 'Foundation',
      'about.qgf_title': '长期资本，驱动创新',
      'about.qgf_quote': 'QGF 当前管理资产（AUM）约 <span class="qc-text-highlight">7.8 亿美元</span>，通过多资产组合模型与全球分布策略，为数字经济基础设施提供核心动力。',
      'about.qgf_card1_img_alt': '长期资本',
      'about.qgf_card1_title': '长期资本注入',
      'about.qgf_card1_desc': '源自 QCH 年度净利润按比例注入，确保持续扩展能力。',
      'about.qgf_card2_img_alt': '战略合作',
      'about.qgf_card2_title': '战略资本合作',
      'about.qgf_card2_desc': '与黑石集团、红杉资本、摩根大通等顶级机构保持紧密协作。',
      'about.qgf_card3_img_alt': '风险对冲',
      'about.qgf_card3_title': '风险对冲机制',
      'about.qgf_card3_desc': '精细化风险控制，为全球合作伙伴提供稳健的技术与资金支持。',
      'about.mission_kicker': 'Mission & Values',
      'about.mission_title': '五大核心价值观',
      'about.value_transparency_title': '透明',
      'about.value_transparency_desc': '以数据与流程透明为基础，提升信任。',
      'about.value_security_title': '安全',
      'about.value_security_desc': '技术与制度双重保障，守护资产安全。',
      'about.value_collaboration_title': '协作',
      'about.value_collaboration_desc': '跨地区、跨行业协同，共赢价值网络。',
      'about.value_innovation_title': '创新',
      'about.value_innovation_desc': '探索 AI、区块链在金融中的高效落地。',
      'about.value_sustainability_title': '可持续',
      'about.value_sustainability_desc': '关注长期价值，将数字经济与绿色发展结合。',
      'about.resend_title': '让数字金融成为<br>普惠的全球基础设施',
      'about.resend_desc': '人人可享、人人受益。我们致力于建设一个<span class="qc-text-highlight">透明</span>、<span class="qc-text-highlight">安全</span>、<span class="qc-text-highlight">智能</span>、<span class="qc-text-highlight">包容</span>的全球价值流动网络。',
      'calc.hero_title': '财富增值<br>智能模拟',
      'calc.hero_desc': '基于 Qicheng 信号策略模型，输入您的初始金额与周期，直观预览复利效应带来的资产增长潜力。',
      'calc.hero_highlight_principal': '初始金额',
      'calc.hero_highlight_days': '周期',
      'calc.start_title': '开始计算',
      'calc.label_principal': '初始金额 (USDT)',
      'calc.placeholder_principal': '例如：1000',
      'calc.label_signals': '每天信号次数',
      'calc.option_signals_2': '2 次 / 天 (基础会员)',
      'calc.option_signals_3': '3 次 / 天 (荣誉会员)',
      'calc.option_signals_4': '4 次 / 天 (团队会员)',
      'calc.label_days': '周期 (天)',
      'calc.placeholder_days': '例如：35',
      'calc.submit': '生成收益预览',
      'calc.error_invalid': '请输入有效的初始金额和天数。',
      'calc.compound_title': '复利的本质与优势',
      'calc.acc_core': '核心概念',
      'calc.core_paragraph': '复利的核心不是“单次赚得更多”，而是让收益在时间维度上被持续再投资：每一轮增长都会成为下一轮增长的基数。关键变量只有两个：增长幅度与执行次数。',
      'calc.core_highlight_growth': '增长幅度',
      'calc.core_highlight_times': '执行次数',
      'calc.acc_formula': '模型公式',
      'calc.formula_model_label': '模型',
      'calc.formula_line': '期末 = 本金 × (1 + Δ)<sup>n</sup>',
      'calc.formula_sub': 'Δ 为单次信号等效增长，n 为总信号次数（每日信号 × 天数）。',
      'calc.acc_adv': '优势拆解',
      'calc.adv_1_title': '纪律与可复制',
      'calc.adv_1_desc': '固定仓位与固定规则，降低情绪干扰，让策略在不同周期可复现。',
      'calc.adv_2_title': '频次放大效应',
      'calc.adv_2_desc': '相同的增长幅度下，频次越高，指数曲线越早拐头，越快进入加速区。',
      'calc.adv_3_title': '风险可控前提',
      'calc.adv_3_desc': '每次仅使用账户余额的一小部分参与交易，使单次波动对整体影响可控。',
      'calc.acc_org': '团队组织架构',
      'calc.org_title': '团队组织架构',
      'calc.org_subtitle': '以“6 个直接推荐”为基础构建的晋升体系',
      'calc.org_captain_title': '队长 (VIP)',
      'calc.org_captain_desc': '享受团队晋升福利',
      'calc.org_level1_user': '一级用户',
      'calc.summary_title': '预估期末总资产',
      'calc.profit_suffix': '(收益)',
      'calc.summary_details': '周期 {days} 天 | 累计信号 {signals} 次',
      'calc.table_title': '逐日收益明细',
      'calc.th_day': '天数',
      'calc.th_signals': '当日信号',
      'calc.th_start': '期初余额',
      'calc.th_profit': '当日收益',
      'calc.th_end': '期末余额',
      'calc.disclaimer': '* 声明：以上数据仅基于理论模型计算，不代表实际投资承诺。市场有风险，投资需谨慎。',
      'footer.status_operational': 'All systems operational'
    },
    en: {
      'nav.logo_aria': 'Qicheng Holdings Group',
      'nav.logo_alt': 'Qicheng Holdings Group',
      'nav.home': 'Home',
      'nav.about': 'Qicheng',
      'nav.business': 'Business Model',
      'nav.txo': 'TXO Exchange',
      'nav.license': 'Compliance & Licenses',
      'nav.profit': 'Profit System',
      'nav.calculator': 'Calculator',

      'nav.aria_main': 'Main navigation',
      'nav.toggle': 'Toggle navigation',

      'nav.about.overview': 'Overview',
      'nav.about.founder': 'Founder',
      'nav.about.structure': 'Structure',
      'nav.about.qgf': 'QGF Foundation',
      'nav.about.mission': 'Mission',
      'nav.about.testimonials': 'Testimonials',

      'nav.business.web2': 'WEB2 Innovation',
      'nav.business.core': 'Core Model',
      'nav.business.future': 'Future Plan',
      'nav.business.v5': 'V5 Strategy',

      'nav.txo.origin': 'Origin of TXO',
      'nav.txo.founder': 'Founder',
      'nav.txo.team': 'R&D Team',
      'nav.txo.offline': 'Offline Trading Service',

      'nav.license.statement': 'Compliance Statement',
      'nav.license.verification': 'How to Verify Certificates',

      'profit.page_title': 'Profit System · Trading Signals · Referral Program · VIP Team',
      'profit.page_desc': 'Learn about Qicheng Holdings’ trading signal system, referral program, VIP team plan, and 35-day profit examples, and estimate your own compounding performance with smart tools.',
      'profit.hero_title': 'Multi-Dimensional Profit<br>Shared Growth',
      'profit.hero_desc': 'Qicheng Holdings builds a comprehensive wealth growth system through global <span class="qc-text-highlight">trading signals</span>, <span class="qc-text-highlight">referral rewards</span>, and the <span class="qc-text-highlight">VIP team program</span>.<br class="hidden sm:block">',
      'profit.hero_img_alt': 'Multi-dimensional profit system',

      'profit.signals_icon_alt': 'Trading Signals Icon',
      'profit.signals_title': 'Trading Signals',
      'profit.signals_subtitle': 'AI Quant Trading Signals',
      'profit.signals_lead': 'Unified signals worldwide, borderless execution',
      'profit.signals_desc': 'Please follow the rules strictly: each signal is executed with fixed money management. Copy trades with one click via the TXO system to lower the barrier and improve consistency.',
      'profit.rules_title': 'Trading Rules',
      'profit.rule_position_label': 'Position sizing',
      'profit.rule_position_value': 'Use 2% of account balance per signal',
      'profit.rule_return_label': 'Return assumption',
      'profit.rule_return_value': 'Avg. ~50% per trade (≈ +1% total equity)',
      'profit.rule_freq_label': 'Signal frequency',
      'profit.rule_freq_value': '2–4 times/day depending on membership',
      'profit.rule_miss_label': 'Missed signals',
      'profit.rule_miss_value': 'No compensation for missed signals for any reason',
      'profit.perk_basic_title': 'Basic member benefits',
      'profit.perk_basic_desc': 'After your first deposit, you become a basic member and permanently receive 2 daily signals. Each trade uses 2% of your balance.',
      'profit.perk_honor_title': 'Honor signal',
      'profit.perk_honor_desc': 'Invite 1 formal member to gain 1 extra permanent signal (honor signal). Each trade uses 2% of your balance.',
      'profit.perk_team_title': 'Team signal',
      'profit.perk_team_desc': 'Invite 3 formal members to gain 1 extra permanent signal (team signal). Each trade uses 2% of your balance.',
      'profit.perk_referral_title': 'Referral signal reward',
      'profit.perk_referral_desc': 'Invite a friend to become a formal member. Both inviter and new member get 1 extra signal on the same day (referral signal), trading with 2% of their balances. Multiple invites stack.',
      'profit.example_title': 'Example',
      'profit.example_desc': 'Example: $1,000 initial capital with 2 signals/day as a basic member. Using an equivalent “+1% per signal” growth:',
      'profit.example_lines': 'End of Day 1 ≈ 1000 × 1.01² = 1020<br>End of Day 10 ≈ 1000 × 1.01^(2×10) = 1219<br>End of Day 35 ≈ 1000 × 1.01^(2×35) = 2000',
      'profit.cta_calculator': 'Go to Profit Calculator',
      'profit.factor_title': 'Compounding Factor',
      'profit.factor_desc': 'Equivalent growth per signal',
      'profit.factor_card1_title': 'Total signals',
      'profit.factor_card1_desc': 'Signals per day × Days',
      'profit.factor_card2_title': 'Model',
      'profit.factor_card2_desc': 'Principal × 1.01^Total signals',
      'profit.hours_title': 'Global Trading Hours',
      'profit.hours_img_alt': 'Qicheng Global Trading Hours',
      'profit.hours_note': 'A reference of active trading hours across regions for cross-timezone execution',

      'profit.referral_title': 'Referral Program',
      'profit.referral_subtitle': 'Referral Rewards',
      'profit.referral_desc': 'After your first deposit (≥ $500), you are 100% eligible for referral rewards. Invite friends—when they register and make their first deposit, both sides receive exclusive rewards and unlock extra signal benefits.',
      'profit.referral_rules_title': 'Rules',
      'profit.referral_rule1': 'New member first deposit must be ≥ $500 and at least 30% of the referrer’s balance.',
      'profit.referral_rule2': 'Both referrer and new member receive an extra referral signal on the same day, trading with 2% of their balances.',
      'profit.referral_rule3': 'Unlock the 3rd permanent signal after your first referral; unlock the 4th after the third referral.',
      'profit.referral_th_deposit': 'First deposit',
      'profit.referral_th_referrer': 'Referrer reward',
      'profit.referral_th_new': 'New member reward',

      'profit.vip_title': 'VIP Team',
      'profit.vip_subtitle': 'VIP Team Promotion',
      'profit.vip_desc': 'Directly refer 6 members to qualify as a VIP and enjoy permanent passive income. Volume commission is calculated on total team volume and settled every 10 days (2nd/12th/22nd each month).',
      'profit.vip_th_level': 'Level',
      'profit.vip_th_team': 'Team size',
      'profit.vip_th_direct': 'Direct referrals',
      'profit.vip_th_bonus': 'Promotion bonus',
      'profit.vip_th_commission': 'Volume rebate',

      'profit.reports_title': 'Profit Reports',
      'profit.reports_subtitle': '35-Day Profit Examples',
      'profit.reports_desc': 'A compounding model based on $1,000 initial principal, 2–4 signals/day, 2% allocated per signal, and ~50% avg. return per trade (≈ +1% total equity).',
      'profit.report_basic_title': 'Basic Member (2 signals/day)',
      'profit.report_honor_title': 'Honor Member (3 signals/day)',
      'profit.report_team_title': 'Team Member (4 signals/day)',
      'profit.report_total_label': 'Estimated total assets after 35 days',
      'profit.day_1': 'Day 1',
      'profit.day_10': 'Day 10',
      'profit.day_20': 'Day 20',
      'profit.day_30': 'Day 30',
      'profit.cta_custom_calc': 'Customize Profit Calculation',

      'profit.rail_aria': 'Activity rail',
      'profit.rail_tag_default': 'Trading Signals Activity',
      'profit.modal_aria': 'Activity preview',
      'profit.modal_close': 'Close',
      'profit.modal_title_default': 'Trading Signals · Activity',
      'profit.activity_signals': 'Trading Signals',
      'profit.activity_referral': 'Referral Rewards',
      'profit.activity_vip': 'Team Rewards',
      'profit.activity_reports': 'Earnings Table',
      'profit.activity_suffix': 'Activity',

      'license.page_title': 'Global Operating Licenses · TXO Compliance & Certification',
      'license.page_desc': 'View TXO’s compliance statement, New York State registration details, and how to verify official certificates. Learn about AML, KYC, risk control, and data privacy protection.',
      'license.hero_title': 'Global Compliance<br>The Foundation of Security',
      'license.hero_desc': 'TXO Exchange is operated by TXO COMPREHENSIVE SERVICE INC.<br class="hidden sm:block">Registered in New York State, USA, it has built a <span class="qc-text-highlight">financial-grade</span> internal control system.',
      'license.statement_title': 'Legal Statement',
      'license.statement_subtitle': 'Compliant Operations',
      'license.statement_desc': 'TXO COMPREHENSIVE SERVICE INC. is officially registered with the New York State Department of State. The filing number is <span class="qc-text-highlight">260104000062</span>.',
      'license.aml_title': 'Anti-Money Laundering (AML)',
      'license.aml_desc': 'Strict source-of-funds review mechanisms',
      'license.kyc_title': 'Know Your Customer (KYC)',
      'license.kyc_desc': 'A global user identity verification framework',
      'license.risk_title': 'Risk Control',
      'license.risk_desc': 'Real-time monitoring of abnormal trading behaviors',
      'license.privacy_title': 'Data Privacy',
      'license.privacy_desc': 'Bank-grade encryption for user data protection',
      'license.cert_company_title': 'U.S. Authorized Company Certificate',
      'license.cert_company_alt': 'TXO License 1',
      'license.cert_stock_title': 'TXO Stock Certificate',
      'license.cert_stock_alt': 'Stock Certificate',
      'license.verify_title': 'Verification',
      'license.verify_subtitle': 'Certificate Verification Guide',
      'license.step1_title': 'Visit the official system',
      'license.step1_desc': 'Open in your browser: <a href="https://apps.dos.ny.gov/publicInquiry/" target="_blank" style="color: #fff; text-decoration: underline;">https://apps.dos.ny.gov/publicInquiry/</a>',
      'license.step2_title': 'Enter the company name',
      'license.step2_desc': 'In the Entity Name field, enter: <span class="qc-text-highlight">TXO COMPREHENSIVE SERVICE INC</span>',
      'license.step3_title': 'View the result',
      'license.step3_desc': 'Click the Search button to view registration status, incorporation date, and more details in the official database.',

      'nav.profit.signals': 'Trading Signal System',
      'nav.profit.referral': 'Referral Program',
      'nav.profit.vip': 'VIP Team Program',
      'nav.profit.reports': 'Profit Reports',

      'footer.about_title': 'About Qicheng',
      'footer.txo_title': 'TXO Exchange',
      'footer.business_title': 'Business Model',
      'footer.profit_title': 'Profit System',
      'footer.cta_title': 'Ready to Trade?',
      'footer.cta_button': 'Start Trading',

      'footer.tagline': 'A Global Collaboration Organization for Digital Finance and the Economy',

      'footer.quick.txo': 'TXO Exchange',
      'footer.quick.business': 'Business Model',
      'footer.quick.license': 'Compliance & Licenses',
      'footer.status_ok': 'All systems operational',

      'footer.about.overview': 'Overview',
      'footer.about.founder': 'Founder',
      'footer.about.structure': 'Structure',
      'footer.about.qgf': 'QGF Foundation',
      'footer.about.mission': 'Mission',
      'footer.about.timeline': 'Timeline',
      'footer.about.testimonials': 'Testimonials',

      'footer.txo.origin': 'Origin of TXO',
      'footer.txo.founder': 'Founder',
      'footer.txo.team': 'R&D Team',
      'footer.txo.offline': 'Offline Trading Service',
      'footer.txo.license': 'Compliance & Licenses',

      'footer.business.web2': 'WEB2 Innovation',
      'footer.business.core': 'Core Model',
      'footer.business.future': 'Future Plan',
      'footer.business.v5': 'V5 Strategy',

      'footer.profit.signals': 'Trading Signal System',
      'footer.profit.referral': 'Referral Program',
      'footer.profit.vip': 'VIP Team Program',
      'footer.profit.reports': 'Profit Reports',
      'footer.profit.calculator': 'Calculator',

      'home.hero_kicker': 'Qicheng Holdings Group',
      'home.hero_title': 'Global Digital Finance & Economic Collaboration',
      'home.hero_subtitle': 'Based in London, building a digital-economy collaboration network across 30+ countries—driven by transparency, security, and innovation to connect digital finance with the real economy.',
      'home.hero_cta_business': 'Explore Business Model',
      'home.hero_cta_txo': 'Enter TXO Exchange',
      'home.london_title': 'London Base · Global Reach',
      'home.london_desc': 'Founded in 2020, Qicheng Holdings Group (QCH) is headquartered in London, UK. In a mature and well-regulated financial environment, we build future-ready global digital economic infrastructure.',
      'home.london_cta_about': 'About Qicheng',

      'home.flags_caption': 'Building a global investment network to capture every growth opportunity.',

      'home.principles_title': 'Five Core Principles',
      'home.principles_subtitle': 'Building a trusted global value network',
      'home.principles_desc': 'Transparency, security, collaboration, innovation, and sustainability form the foundational design logic of Qicheng for the global digital economy. Together, these five dimensions support an open, inclusive, and trustworthy ecosystem.',
      'home.principle_transparency_title': 'Transparency',
      'home.principle_transparency_desc': 'Built on transparent data and processes, with open disclosure mechanisms to enhance market trust and regulatory friendliness—so every trade and decision is traceable.',
      'home.principle_security_title': 'Security',
      'home.principle_security_desc': 'Backed by technology and governance, using multi-layer encryption, intelligent risk control, and compliance audits to protect assets and information—bank-grade security for global users.',
      'home.principle_collaboration_title': 'Collaboration',
      'home.principle_collaboration_desc': 'Encouraging cross-region and cross-industry cooperation to build a win-win value network, connect global resources, enable sharing and co-creation, and drive digital-economy synergy.',
      'home.principle_innovation_title': 'Innovation',
      'home.principle_innovation_desc': 'Continuously exploring high-impact applications of AI, blockchain, and big data across finance and industry—driving business-model innovation through technological breakthroughs.',
      'home.principle_sustainability_title': 'Sustainability',
      'home.principle_sustainability_desc': 'Focusing on long-term value and social responsibility—integrating the digital economy with green development to build sustainable models for healthy global growth.',

      'home.txo_section_title': 'TXO Exchange · Digital Asset Infrastructure',
      'home.txo_section_desc': 'Built by the Qicheng ecosystem together with top technology and finance teams, TXO is committed to building next-generation, high-performance digital-asset trading infrastructure with strong risk control.',
      'home.txo_cta_detail': 'Learn more about TXO',
      'home.txo_cta_license': 'View Compliance & Licenses',

      'home.bridge_quote': 'We are committed to advancing the sharing economy and creating a prosperous future for everyone.',

      'home.testimonials_title': 'Beyond Expectations',
      'home.testimonials_desc': 'Qicheng delivers long-term, stable wealth growth through deep market insight and precise investment strategies.<br class="hidden sm:block">\n            With our professional guidance, every investor can move steadily through complex market conditions.<br class="hidden sm:block">\n            In-depth cooperation with the TXO trading platform further provides an unrivaled trading experience.',

      'business.page_title': 'Qicheng Business Model · Digital-Economy Infrastructure',
      'business.page_desc': 'Learn about Qicheng Holdings Group’s business-infrastructure model of “Digital Assets + Controllable Data + Connected Scenarios + Global Operating System,” and the V5 global strategy matrix.',
      'business.hero_title': 'Closed-Loop Ecosystem<br>Value Creation',
      'business.hero_desc': 'Qicheng Holdings Group proposes a business-infrastructure model of “Digital Assets + Controllable Data + Connected Scenarios + Global Operating System.”<br class="hidden sm:block"><span class="qc-text-highlight">This model</span> systematically addresses the structural contradictions of the Web2 era.',
      'business.web2_kicker': 'The Challenge',
      'business.web2_title': 'Structural Contradictions of Web2',
      'business.web2_desc': 'In today’s Web2 world, users create value but struggle to obtain returns commensurate with their contributions. Platforms capture most data and value, forming a highly centralized closed loop.',
      'business.web2_card1_title': 'Value Mismatch',
      'business.web2_card1_desc': 'Users create value, but profits are monopolized by platforms',
      'business.web2_card2_title': 'Data Silos',
      'business.web2_card2_desc': 'Companies struggle to access authentic and verifiable user data',
      'business.web2_card3_title': 'Innovation Constraints',
      'business.web2_card3_desc': 'Innovation boundaries are locked within a single ecosystem',
      'business.web2_card4_title': 'High Costs',
      'business.web2_card4_desc': 'Closed ecosystems drive up acquisition and operational costs',
      'business.core_kicker': 'Core Pillars',
      'business.core_title': 'Synergy Across Four Foundational Modules',
      'business.core_module1_img_alt': 'Data assetization',
      'business.core_module1_title': 'Data Assetization',
      'business.core_module1_desc': 'Through standardized mechanisms, data becomes a production factor that is “verifiable, authorizable, and priceable,” breaking platform monopolies and enabling secure multi-scenario circulation.',
      'business.core_module2_img_alt': 'Transparent value loop',
      'business.core_module2_title': 'Transparent Value Loop',
      'business.core_module2_desc': 'Based on a digitized business-link system, track user behaviors and supply-chain efficiency end-to-end to match costs and returns precisely, reduce waste, and improve operational efficiency.',
      'business.core_module3_img_alt': 'Interconnected ecosystem',
      'business.core_module3_title': 'Interconnected Ecosystem',
      'business.core_module3_desc': 'Break data silos, enable interoperability across e-commerce, gaming, social, and content platforms, and establish cross-industry, cross-platform value links.',
      'business.core_module4_img_alt': 'Global operating system',
      'business.core_module4_title': 'Global Operating System',
      'business.core_module4_desc': 'Build global operations and technology centers to help enterprises scale quickly into international markets, connect with global capital and resources, and form synergistic industry networks.',
      'business.future_kicker': 'Future Blueprint',
      'business.future_title': 'New Economic Infrastructure',
      'business.future_card1_title': 'Data Infrastructure',
      'business.future_card1_desc': 'A highly secure, highly available data foundation and privacy-computing framework that safeguards data sovereignty.',
      'business.future_card2_title': 'Intelligent Business Engine',
      'business.future_card2_desc': 'AI-driven intelligent decision-making and automated operations systems to boost business efficiency.',
      'business.future_card3_title': 'Digital Economy Corridor',
      'business.future_card3_desc': 'A value-circulation and settlement “expressway” connecting multiple markets to facilitate cross-border trade.',
      'business.v5_kicker': 'V5 Strategy',
      'business.v5_title': 'V5 Global Strategy Matrix',
      'business.v5_quote': 'From technology, assets, security, industry, and infrastructure—outline Qicheng Holdings Group’s long-term development path.',
      'business.v5_chip1_title': 'Technology',
      'business.v5_chip1_desc': 'Frontier technologies driving innovation',
      'business.v5_chip2_title': 'Asset',
      'business.v5_chip2_desc': 'Digital assets as the value foundation',
      'business.v5_chip3_title': 'Security',
      'business.v5_chip3_desc': 'Multi-layer risk controls for safety assurance',
      'business.v5_chip4_title': 'Industry',
      'business.v5_chip4_desc': 'Industry integration for ecosystem win-win',
      'business.v5_chip5_title': 'Infrastructure',
      'business.v5_chip5_desc': 'Global infrastructure for connectivity',

      'txo.hero_title': 'Next-Gen Digital Asset<br>Trading Infrastructure',
      'txo.hero_desc': 'TXO was co-founded by Qihang Capital and Helios Chain Research Institute, dedicated to redefining global digital-asset trading with <span class="qc-text-highlight">efficiency</span>, <span class="qc-text-highlight">security</span>, and <span class="qc-text-highlight">intelligence</span>.',
      'txo.page_title': 'TXO Crypto Exchange · Qicheng Digital Asset Infrastructure',
      'txo.page_desc': 'Learn the origin of the TXO crypto exchange, its vision and name meaning, the core founding team and global capital support, and the global offline OTC service layout.',
      'txo.vision_title': 'TXO Core Philosophy',
      'txo.section_vision_kicker': 'Vision',
      'txo.vision_t_word': 'Titan / Trade',
      'txo.vision_x_word': 'eXchange / X-Economy',
      'txo.vision_o_word': 'Opportunity / Open',
      'txo.vision_t_desc': 'Solid, reliable infrastructure and world-class trading capabilities',
      'txo.vision_x_desc': 'A next-generation global economic paradigm for the future',
      'txo.vision_o_desc': 'Open, shared opportunities for global value flow',
      'txo.founder_title': 'A Dual DNA of Technology and Finance',
      'txo.section_founder_kicker': 'Founder',
      'txo.founder_role': 'TXO Founder & Chief Architect',
      'txo.founder_p1': 'Dr. Adrian Caldwell is an internationally recognized expert in distributed financial architecture. He graduated in Computer Science from <span class="qc-text-highlight">Stanford University</span> and earned dual PhDs in Financial Engineering from <span class="qc-text-highlight">Imperial College London</span>.',
      'txo.founder_p2': 'He previously served as a core member of Goldman Sachs’ quantitative modeling team. In 2019, he founded Helios Chain Research Institute, focusing on next-generation high-performance clearing systems and distributed risk-control networks. TXO is the systematic application of his research outcomes.',
      'txo.team_title': 'Top Talent and Global Capital',
      'txo.section_team_kicker': 'Core Strength',
      'txo.team_rnd_title': 'Interdisciplinary R&D Team',
      'txo.team_rnd_1': 'Quant and risk-control experts from Goldman Sachs and Morgan Stanley',
      'txo.team_rnd_2': 'Distributed-systems architects from Google and Meta',
      'txo.team_rnd_3': 'Cryptography engineers from the MIT cryptography center',
      'txo.team_capital_title': 'Global Capital Support',
      'txo.offline_title': 'Offline Trading Network',
      'txo.section_offline_kicker': 'Global Service',
      'txo.offline_desc': 'Beyond the online matching system, TXO has built an <span class="qc-text-highlight">offline trading network</span> across major regions worldwide, providing secure and private OTC services for institutions and high-net-worth clients.',
      'txo.offline_card1_title': 'Official Certification',
      'txo.offline_card1_desc': 'Regional offline-trading institution qualification certification',
      'txo.offline_card2_title': 'Compliance & Security',
      'txo.offline_card2_desc': 'Enhanced compliance and fund security for trading',

      'calc.page_title': 'Profit Calculator · Qicheng Holdings Group',
      'calc.page_desc': 'Based on Qicheng signals, enter an initial amount, daily signals, and a period to generate a day-by-day profit table.',
      'about.page_title': 'About Qicheng · Qicheng Holdings Group',
      'about.page_desc': 'Learn about Qicheng Holdings Group: overview, founder, global structure, the QGF Foundation, and our vision, mission, and values.',
      'about.hero_title': 'Building a Global<br>Digital Collaboration Network',
      'about.hero_desc': 'Qicheng Holdings Group (QCH) was founded in 2020 and is headquartered in London.<br class="hidden sm:block">We connect global financial hubs to build a digital-economy ecosystem that is <span class="qc-text-highlight">transparent</span>, <span class="qc-text-highlight">secure</span>, and <span class="qc-text-highlight">sustainable</span>.',
      'about.overview_kicker': 'The Foundation',
      'about.overview_title': 'Based in London, Connected Worldwide',
      'about.stat_founded': 'Founded',
      'about.stat_countries': 'Countries Covered',
      'about.stat_aum': 'Assets Under Management (AUM)',
      'about.intro_p1': 'From day one, QCH set an ambitious vision: a <span class="qc-text-highlight">builder of the global digital-economy collaboration network</span>. We are not only an investment firm—we are a bridge connecting digital assets and the real economy.',
      'about.intro_p2': 'Leveraging London’s mature regulatory environment, robust financial infrastructure, and open innovation ecosystem, QCH has built a collaborative network spanning <span class="qc-text-highlight">30+</span> countries and regions in just a few years.',
      'about.tab_compliance_title': 'Compliance-First',
      'about.tab_compliance_desc': 'TXO holds U.S. MSB licensing and compliance qualifications, supported by institution-grade risk controls.',
      'about.tab_tech_title': 'Technology-Driven',
      'about.tab_tech_desc': 'Integrating leading AI models such as OpenAI and Gemini to build an intelligent digital-asset trading engine.',
      'about.tab_ecosystem_title': 'Ecosystem Win-Win',
      'about.tab_ecosystem_desc': 'Deep collaboration with top global capital such as Goldman Sachs and Sequoia to build a sustainable financial ecosystem.',
      'about.img_compliance_alt': 'Compliance credentials',
      'about.img_tech_alt': 'Technology partners',
      'about.img_ecosystem_alt': 'Ecosystem partners',
      'about.partners_title': 'Our Partners',
      'about.partners_strip_alt': 'Partner logo strip',
      'about.founder_kicker': 'Leadership',
      'about.founder_title': 'Where Mathematics Meets Technology',
      'about.founder_role': 'Chief Executive Officer',
      'about.founder_p1': 'Robert Harrison graduated from <span class="qc-text-highlight">the University of Oxford</span>, focusing on financial mathematics and emerging economic systems. He has over 17 years of experience in global fintech, asset allocation, and cross-border regulatory frameworks.',
      'about.founder_p2': 'As a pioneer in bridging blockchain technology and traditional capital markets, Robert has contributed to multiple multinational digital-finance infrastructure projects. International media often describe him as a <span class="qc-text-highlight">key figure</span> in advancing systemic global digital finance.',
      'about.founder_p3': 'Under Robert’s leadership, Qicheng Holdings Group upholds rigorous structural models and a global strategic vision—unlocking <span class="qc-text-highlight">long-term value</span> for investors worldwide.',
      'about.structure_kicker': 'Global Network',
      'about.structure_title': 'Cross-Disciplinary Collaboration, Shared Intelligence',
      'about.structure_card1_title': 'Technology Experts',
      'about.structure_card1_desc': 'Top talent in AI and distributed systems',
      'about.structure_card2_title': 'Financial Analysts',
      'about.structure_card2_desc': 'Institutional investors with sharp market insight',
      'about.structure_card3_title': 'Industry Leaders',
      'about.structure_card3_desc': 'Seasoned operators across energy, manufacturing, and education',
      'about.structure_card4_title': 'Economic Advisors',
      'about.structure_card4_desc': 'Authoritative scholars and advisors focused on international policy research',
      'about.qgf_kicker': 'Foundation',
      'about.qgf_title': 'Long-Term Capital, Driving Innovation',
      'about.qgf_quote': 'QGF currently manages approximately <span class="qc-text-highlight">USD 780 million</span> in AUM, powering digital-economy infrastructure through multi-asset portfolio models and global distribution strategies.',
      'about.qgf_card1_img_alt': 'Long-term capital',
      'about.qgf_card1_title': 'Long-Term Capital Injection',
      'about.qgf_card1_desc': 'Funded proportionally from QCH’s annual net profits to ensure sustained scalability.',
      'about.qgf_card2_img_alt': 'Strategic partnerships',
      'about.qgf_card2_title': 'Strategic Capital Collaboration',
      'about.qgf_card2_desc': 'Close cooperation with top institutions such as Blackstone, Sequoia, and JPMorgan Chase.',
      'about.qgf_card3_img_alt': 'Risk hedging',
      'about.qgf_card3_title': 'Risk Hedging Mechanisms',
      'about.qgf_card3_desc': 'Refined risk management provides stable technical and capital support for global partners.',
      'about.mission_kicker': 'Mission & Values',
      'about.mission_title': 'Five Core Values',
      'about.value_transparency_title': 'Transparency',
      'about.value_transparency_desc': 'Build trust through transparent data and processes.',
      'about.value_security_title': 'Security',
      'about.value_security_desc': 'Protect assets with both technical and governance safeguards.',
      'about.value_collaboration_title': 'Collaboration',
      'about.value_collaboration_desc': 'Cross-region and cross-industry cooperation for a win-win value network.',
      'about.value_innovation_title': 'Innovation',
      'about.value_innovation_desc': 'Explore high-impact applications of AI and blockchain in finance.',
      'about.value_sustainability_title': 'Sustainability',
      'about.value_sustainability_desc': 'Focus on long-term value and integrate digital economy with green development.',
      'about.resend_title': 'Make Digital Finance<br>a Global Public Infrastructure',
      'about.resend_desc': 'Accessible to all, benefiting all. We are building a global value-flow network that is <span class="qc-text-highlight">transparent</span>, <span class="qc-text-highlight">secure</span>, <span class="qc-text-highlight">intelligent</span>, and <span class="qc-text-highlight">inclusive</span>.',
      'calc.hero_title': 'Wealth Growth<br>Smart Simulation',
      'calc.hero_desc': 'Based on the Qicheng signal-strategy model, enter your initial amount and time period to preview how compounding can grow your assets over time.',
      'calc.hero_highlight_principal': 'initial amount',
      'calc.hero_highlight_days': 'time period',
      'calc.start_title': 'Start Calculation',
      'calc.label_principal': 'Initial Amount (USDT)',
      'calc.placeholder_principal': 'e.g. 1000',
      'calc.label_signals': 'Signals per day',
      'calc.option_signals_2': '2 / day (Basic)',
      'calc.option_signals_3': '3 / day (Honor)',
      'calc.option_signals_4': '4 / day (Team)',
      'calc.label_days': 'Period (days)',
      'calc.placeholder_days': 'e.g. 35',
      'calc.submit': 'Generate Preview',
      'calc.error_invalid': 'Please enter a valid initial amount and number of days.',
      'calc.compound_title': 'What Compounding Means',
      'calc.acc_core': 'Core idea',
      'calc.core_paragraph': 'Compounding is not about a bigger single win—it is about reinvesting gains over time. Each round becomes the base for the next. The key variables are growth per step and execution count.',
      'calc.core_highlight_growth': 'growth per step',
      'calc.core_highlight_times': 'number of executions',
      'calc.acc_formula': 'Formula',
      'calc.formula_model_label': 'Model',
      'calc.formula_line': 'Final = Principal × (1 + Δ)<sup>n</sup>',
      'calc.formula_sub': 'Δ is the per-signal equivalent growth; n is total signals (signals/day × days).',
      'calc.acc_adv': 'Benefits',
      'calc.adv_1_title': 'Discipline & repeatability',
      'calc.adv_1_desc': 'Fixed position sizing and rules reduce emotional decisions and improve repeatability.',
      'calc.adv_2_title': 'Frequency multiplier',
      'calc.adv_2_desc': 'With the same growth per step, higher frequency makes the curve accelerate sooner.',
      'calc.adv_3_title': 'Risk-controlled premise',
      'calc.adv_3_desc': 'Using only a small portion per trade keeps overall volatility under control.',
      'calc.acc_org': 'Team structure',
      'calc.org_title': 'Team structure',
      'calc.org_subtitle': 'Promotion system based on “6 direct referrals”',
      'calc.org_captain_title': 'Captain (VIP)',
      'calc.org_captain_desc': 'Enjoy team promotion benefits',
      'calc.org_level1_user': 'Level-1 user',
      'calc.summary_title': 'Estimated final assets',
      'calc.profit_suffix': '(profit)',
      'calc.summary_details': 'Period {days} days | Total signals {signals}',
      'calc.table_title': 'Daily breakdown',
      'calc.th_day': 'Day',
      'calc.th_signals': 'Signals',
      'calc.th_start': 'Start balance',
      'calc.th_profit': 'Daily profit',
      'calc.th_end': 'End balance',
      'calc.disclaimer': '* Disclaimer: This is a theoretical model calculation and is not an investment promise. Investing involves risk.',
      'footer.status_operational': 'All systems operational'
    },
    es: {
      'nav.txo': 'Exchange TXO',
      'nav.license': 'Cumplimiento y licencias',
      'nav.profit': 'Sistema de beneficios',
      'nav.calculator': 'Calculadora',

      'nav.aria_main': 'Navegación principal',
      'nav.toggle': 'Alternar navegación',

      'nav.about.overview': 'Resumen',
      'nav.about.founder': 'Fundador',
      'nav.about.structure': 'Estructura',
      'nav.about.qgf': 'Fundación QGF',
      'nav.about.mission': 'Misión',
      'nav.about.testimonials': 'Testimonios',

      'nav.business.web2': 'Innovación WEB2',
      'nav.business.core': 'Modelo central',
      'nav.business.future': 'Plan futuro',
      'nav.business.v5': 'Estrategia V5',

      'nav.txo.origin': 'Origen de TXO',
      'nav.txo.founder': 'Fundador',
      'nav.txo.team': 'Equipo de I+D',
      'nav.txo.offline': 'Servicio OTC presencial',

      'nav.license.statement': 'Declaración de legalidad y cumplimiento',
      'nav.license.verification': 'Cómo verificar certificados',

      'profit.page_title': 'Sistema de ganancias · Señales · Referidos · Equipo VIP',
      'profit.page_desc': 'Conoce el sistema de señales de trading, el programa de referidos, el plan de equipo VIP y los ejemplos de 35 días; además, estima tu rendimiento compuesto con herramientas inteligentes.',
      'profit.hero_title': 'Ganancias multidimensionales<br>Crecimiento compartido',
      'profit.hero_desc': 'Qicheng Holdings crea un sistema integral de crecimiento patrimonial mediante <span class="qc-text-highlight">señales de trading</span>, <span class="qc-text-highlight">recompensas por referidos</span> y el <span class="qc-text-highlight">plan de equipo VIP</span>.<br class="hidden sm:block">',
      'profit.hero_img_alt': 'Sistema de ganancias multidimensional',
      'profit.signals_icon_alt': 'Icono de señales de trading',
      'profit.signals_title': 'Trading Signals',
      'profit.signals_subtitle': 'Señales cuantitativas con IA',
      'profit.signals_lead': 'Señales unificadas globales, ejecución sin fronteras',
      'profit.signals_desc': 'Sigue estrictamente las reglas: cada señal se ejecuta con una gestión de capital fija. Copia operaciones con un clic mediante TXO para reducir barreras y mejorar la consistencia.',
      'profit.rules_title': 'Reglas de trading',
      'profit.rule_position_label': 'Tamaño de posición',
      'profit.rule_position_value': 'Usar el 2% del saldo por señal',
      'profit.rule_return_label': 'Supuesto de retorno',
      'profit.rule_return_value': 'Promedio ~50% por operación (≈ +1% de patrimonio)',
      'profit.rule_freq_label': 'Frecuencia',
      'profit.rule_freq_value': '2–4 veces/día según membresía',
      'profit.rule_miss_label': 'Señales perdidas',
      'profit.rule_miss_value': 'No hay compensación por señales perdidas',
      'profit.perk_basic_title': 'Beneficios básicos',
      'profit.perk_basic_desc': 'Tras el primer depósito, eres miembro básico y recibes 2 señales diarias de forma permanente. Cada trade usa el 2% del saldo.',
      'profit.perk_honor_title': 'Señal de honor',
      'profit.perk_honor_desc': 'Invita a 1 miembro formal y obtén 1 señal permanente adicional (honor). Cada trade usa el 2% del saldo.',
      'profit.perk_team_title': 'Señal de equipo',
      'profit.perk_team_desc': 'Invita a 3 miembros formales y obtén 1 señal permanente adicional (equipo). Cada trade usa el 2% del saldo.',
      'profit.perk_referral_title': 'Señal extra por referido',
      'profit.perk_referral_desc': 'Invita a un amigo: tanto el invitador como el nuevo miembro reciben 1 señal extra el mismo día, operando con el 2% de sus saldos. Varias invitaciones se acumulan.',
      'profit.example_title': 'Ejemplo',
      'profit.example_desc': 'Ejemplo: $1,000 inicial, 2 señales/día. Usando “+1% por señal” equivalente:',
      'profit.example_lines': 'Fin del día 1 ≈ 1000 × 1.01² = 1020<br>Fin del día 10 ≈ 1000 × 1.01^(2×10) = 1219<br>Fin del día 35 ≈ 1000 × 1.01^(2×35) = 2000',
      'profit.cta_calculator': 'Ir a la calculadora',
      'profit.factor_title': 'Factor de capitalización',
      'profit.factor_desc': 'Crecimiento equivalente por señal',
      'profit.factor_card1_title': 'Señales totales',
      'profit.factor_card1_desc': 'Señales diarias × Días',
      'profit.factor_card2_title': 'Modelo',
      'profit.factor_card2_desc': 'Capital × 1.01^Señales totales',
      'profit.hours_title': 'Horario global de trading',
      'profit.hours_img_alt': 'Horario global de trading',
      'profit.hours_note': 'Referencia de horas activas por región para ejecución entre husos',
      'profit.referral_title': 'Referral Program',
      'profit.referral_subtitle': 'Programa de referidos',
      'profit.referral_desc': 'Tras el primer depósito (≥ $500) eres elegible al 100%. Cuando tu amigo se registre y deposite por primera vez, ambos reciben recompensas exclusivas y señales extra.',
      'profit.referral_rules_title': 'Reglas',
      'profit.referral_rule1': 'El primer depósito del nuevo miembro debe ser ≥ $500 y al menos el 30% del saldo del referidor.',
      'profit.referral_rule2': 'Ambos reciben una señal extra el mismo día, operando con el 2% de sus saldos.',
      'profit.referral_rule3': 'Desbloquea la 3.ª señal permanente tras el primer referido; la 4.ª tras el tercero.',
      'profit.referral_th_deposit': 'Primer depósito',
      'profit.referral_th_referrer': 'Recompensa del referidor',
      'profit.referral_th_new': 'Recompensa del nuevo',
      'profit.vip_title': 'VIP Team',
      'profit.vip_subtitle': 'Ascenso del equipo VIP',
      'profit.vip_desc': 'Recomienda 6 miembros directos para calificar como VIP y obtener ingresos pasivos permanentes. La comisión se calcula por volumen total del equipo y se liquida cada 10 días (2/12/22).',
      'profit.vip_th_level': 'Nivel',
      'profit.vip_th_team': 'Tamaño del equipo',
      'profit.vip_th_direct': 'Referidos directos',
      'profit.vip_th_bonus': 'Bono de ascenso',
      'profit.vip_th_commission': 'Reembolso por volumen',
      'profit.reports_title': 'Profit Reports',
      'profit.reports_subtitle': 'Ejemplo de 35 días',
      'profit.reports_desc': 'Modelo compuesto basado en $1,000, 2–4 señales/día, 2% por señal y ~50% de retorno promedio (≈ +1% de patrimonio).',
      'profit.report_basic_title': 'Miembro básico (2 señales/día)',
      'profit.report_honor_title': 'Miembro honor (3 señales/día)',
      'profit.report_team_title': 'Miembro equipo (4 señales/día)',
      'profit.report_total_label': 'Activos estimados tras 35 días',
      'profit.day_1': 'Día 1',
      'profit.day_10': 'Día 10',
      'profit.day_20': 'Día 20',
      'profit.day_30': 'Día 30',
      'profit.cta_custom_calc': 'Calcular de forma personalizada',
      'profit.rail_aria': 'Carril de actividad',
      'profit.rail_tag_default': 'Actividad de señales',
      'profit.modal_aria': 'Vista previa de actividad',
      'profit.modal_close': 'Cerrar',
      'profit.modal_title_default': 'Señales · Actividad',
      'profit.activity_signals': 'Señales',
      'profit.activity_referral': 'Referidos',
      'profit.activity_vip': 'Equipo VIP',
      'profit.activity_reports': 'Tabla de ganancias',
      'profit.activity_suffix': 'Actividad',

      'license.page_title': 'Licencias de operación global · Cumplimiento y certificación de TXO',
      'license.page_desc': 'Consulta la declaración de cumplimiento de TXO, la información de registro en el estado de Nueva York y la forma de verificar certificados oficiales. Conoce AML, KYC, control de riesgo y protección de privacidad de datos.',
      'license.hero_title': 'Cumplimiento global<br>Base de la seguridad',
      'license.hero_desc': 'TXO Exchange es operada por TXO COMPREHENSIVE SERVICE INC.<br class="hidden sm:block">Registrada legalmente en el estado de Nueva York (EE. UU.) y con un sistema de control interno de <span class="qc-text-highlight">nivel financiero</span>.',
      'license.statement_title': 'Legal Statement',
      'license.statement_subtitle': 'Operación en cumplimiento',
      'license.statement_desc': 'TXO COMPREHENSIVE SERVICE INC. está registrada oficialmente ante la oficina del Secretario de Estado de Nueva York (Department of State). El número de archivo es <span class="qc-text-highlight">260104000062</span>.',
      'license.aml_title': 'Antilavado (AML)',
      'license.aml_desc': 'Mecanismos estrictos de revisión del origen de fondos',
      'license.kyc_title': 'Identificación (KYC)',
      'license.kyc_desc': 'Sistema global de verificación de identidad de usuarios',
      'license.risk_title': 'Control de riesgo',
      'license.risk_desc': 'Monitoreo en tiempo real de operaciones anómalas',
      'license.privacy_title': 'Privacidad de datos',
      'license.privacy_desc': 'Cifrado de datos de usuario de nivel bancario',
      'license.cert_company_title': 'Certificado de empresa autorizada en EE. UU.',
      'license.cert_company_alt': 'TXO License 1',
      'license.cert_stock_title': 'Certificado de acciones de TXO',
      'license.cert_stock_alt': 'Stock Certificate',
      'license.verify_title': 'Verification',
      'license.verify_subtitle': 'Guía de verificación de certificados',
      'license.step1_title': 'Accede al sistema oficial',
      'license.step1_desc': 'Visita en tu navegador: <a href="https://apps.dos.ny.gov/publicInquiry/" target="_blank" style="color: #fff; text-decoration: underline;">https://apps.dos.ny.gov/publicInquiry/</a>',
      'license.step2_title': 'Introduce el nombre de la empresa',
      'license.step2_desc': 'En el campo Entity Name, escribe: <span class="qc-text-highlight">TXO COMPREHENSIVE SERVICE INC</span>',
      'license.step3_title': 'Consulta el resultado',
      'license.step3_desc': 'Haz clic en Search para ver el estado de registro, fecha de constitución y más detalles en la base oficial.',

      'nav.profit.signals': 'Sistema de señales',
      'nav.profit.referral': 'Programa de referidos',
      'nav.profit.vip': 'Programa VIP',
      'nav.profit.reports': 'Informes de rendimiento',

      'footer.about_title': 'Sobre Qicheng',
      'footer.txo_title': 'Exchange TXO',
      'footer.business_title': 'Modelo de negocio',
      'footer.profit_title': 'Sistema de beneficios',
      'footer.cta_title': '¿Listo para operar?',
      'footer.cta_button': 'Empezar a operar',
      'footer.tagline': 'Organización global de colaboración para las finanzas digitales y la economía',

      'footer.quick.txo': 'Exchange TXO',
      'footer.quick.business': 'Modelo de negocio',
      'footer.quick.license': 'Cumplimiento y licencias',
      'footer.status_ok': 'Todos los sistemas operativos',
      'footer.aria_quick_pages': 'Páginas clave',
      'footer.about.overview': 'Resumen',
      'footer.about.founder': 'Fundador',
      'footer.about.structure': 'Estructura',
      'footer.about.qgf': 'Fundación QGF',
      'footer.about.mission': 'Misión',
      'footer.about.timeline': 'Cronología',
      'footer.about.testimonials': 'Testimonios',
      'footer.txo.origin': 'Origen de TXO',
      'footer.txo.founder': 'Fundador',
      'footer.txo.team': 'Equipo de I+D',
      'footer.txo.offline': 'Servicio OTC presencial',
      'footer.txo.license': 'Cumplimiento y licencias',
      'footer.business.web2': 'Innovación WEB2',
      'footer.business.core': 'Modelo central',
      'footer.business.future': 'Plan futuro',
      'footer.business.v5': 'Estrategia V5',
      'footer.profit.signals': 'Sistema de señales',
      'footer.profit.referral': 'Programa de referidos',
      'footer.profit.vip': 'Programa VIP',
      'footer.profit.reports': 'Informes de rendimiento',
      'footer.profit.calculator': 'Calculadora',

      'home.hero_kicker': 'Qicheng Holdings Group',
      'home.hero_title': 'Colaboración Global de Finanzas Digitales y Economía',
      'home.hero_subtitle': 'Con sede en Londres, construimos una red de colaboración económica en más de 30 países, basada en la transparencia, la seguridad y la innovación, para conectar las finanzas digitales con la economía real.',
      'home.hero_cta_business': 'Explorar el modelo de negocio',
      'home.hero_cta_txo': 'Entrar en el exchange TXO',
      'home.london_title': 'Londres · Alcance global',
      'home.london_desc': 'Fundado en 2020, Qicheng Holdings Group (QCH) tiene su sede en Londres, Reino Unido. En un entorno financiero maduro y bien regulado, construimos infraestructura económica digital global orientada al futuro.',
      'home.london_cta_about': 'Sobre Qicheng',

      'home.flags_caption': 'Construimos una red global de inversión para captar cada oportunidad de crecimiento.',

      'home.principles_title': 'Cinco principios clave',
      'home.principles_subtitle': 'Construir una red global de valor confiable',
      'home.principles_desc': 'Transparencia, seguridad, colaboración, innovación y sostenibilidad son la lógica base de Qicheng para la economía digital global. Estas cinco dimensiones se apoyan mutuamente para crear un ecosistema abierto, inclusivo y confiable.',
      'home.principle_transparency_title': 'Transparencia',
      'home.principle_transparency_desc': 'Basados en datos y procesos transparentes, con divulgación abierta para aumentar la confianza del mercado y la afinidad regulatoria, haciendo trazable cada operación y decisión.',
      'home.principle_security_title': 'Seguridad',
      'home.principle_security_desc': 'Doble garantía técnica e institucional, con cifrado múltiple, control de riesgos inteligente y auditoría de cumplimiento para proteger activos e información con seguridad de nivel bancario.',
      'home.principle_collaboration_title': 'Colaboración',
      'home.principle_collaboration_desc': 'Impulsamos la cooperación entre regiones e industrias para construir una red de valor beneficiosa para todos, conectar recursos globales y promover el desarrollo coordinado de la economía digital.',
      'home.principle_innovation_title': 'Innovación',
      'home.principle_innovation_desc': 'Exploramos la aplicación eficiente de IA, blockchain y big data, impulsando la innovación del modelo de negocio mediante innovación tecnológica.',
      'home.principle_sustainability_title': 'Sostenibilidad',
      'home.principle_sustainability_desc': 'Enfocados en el valor a largo plazo y la responsabilidad social, integrando economía digital y desarrollo verde para un crecimiento saludable y sostenido.',

      'home.txo_section_title': 'Exchange TXO · Infraestructura de activos digitales',
      'home.txo_section_desc': 'TXO se construye junto a equipos líderes de tecnología y finanzas del ecosistema Qicheng, para crear infraestructura de trading de activos digitales de nueva generación con alto rendimiento y fuerte control de riesgo.',
      'home.txo_cta_detail': 'Ver detalles de TXO',
      'home.txo_cta_license': 'Ver cumplimiento y licencias',

      'home.bridge_quote': 'Siempre impulsamos la economía compartida para crear un futuro próspero para todos.',

      'home.testimonials_title': 'Más allá de las expectativas',
      'home.testimonials_desc': 'Qicheng crea crecimiento patrimonial estable a largo plazo gracias a su profunda visión de mercado y estrategias precisas.<br class="hidden sm:block">\n            Con nuestra guía profesional, cada inversor puede avanzar de forma constante en un mercado complejo.<br class="hidden sm:block">\n            La cooperación con la plataforma de trading TXO ofrece una experiencia inigualable.',

      'business.page_title': 'Modelo de negocio de Qicheng · Infraestructura de economía digital',
      'business.page_desc': 'Conoce el modelo de infraestructura comercial de Qicheng Holdings Group: “Activos digitales + Datos controlables + Escenarios conectados + Sistema operativo global”, y la matriz estratégica global V5.',
      'business.hero_title': 'Ecosistema de ciclo cerrado<br>Creación de valor',
      'business.hero_desc': 'Qicheng Holdings Group propone el modelo de infraestructura comercial “Activos digitales + Datos controlables + Escenarios conectados + Sistema operativo global”.<br class="hidden sm:block"><span class="qc-text-highlight">Este modelo</span> aborda de forma sistémica las contradicciones estructurales de la era Web2.',
      'business.web2_kicker': 'El desafío',
      'business.web2_title': 'Contradicciones estructurales de Web2',
      'business.web2_desc': 'En el mundo Web2 actual, los usuarios crean valor pero es difícil que reciban retornos proporcionales a su contribución. Las plataformas capturan la mayor parte de los datos y el valor, formando un bucle cerrado altamente centralizado.',
      'business.web2_card1_title': 'Desajuste de valor',
      'business.web2_card1_desc': 'Los usuarios crean valor, pero los beneficios son monopolizados por las plataformas',
      'business.web2_card2_title': 'Silos de datos',
      'business.web2_card2_desc': 'Las empresas difícilmente obtienen datos de usuarios auténticos y verificables',
      'business.web2_card3_title': 'Innovación limitada',
      'business.web2_card3_desc': 'Los límites de innovación quedan atrapados en un único ecosistema',
      'business.web2_card4_title': 'Costes elevados',
      'business.web2_card4_desc': 'Los ecosistemas cerrados elevan los costes de adquisición y operación',
      'business.core_kicker': 'Pilares centrales',
      'business.core_title': 'Sinergia de cuatro módulos fundamentales',
      'business.core_module1_img_alt': 'Activos de datos',
      'business.core_module1_title': 'Activos de datos',
      'business.core_module1_desc': 'Mediante mecanismos estandarizados, los datos se convierten en factores productivos “verificables, autorizables y valorables”, rompiendo monopolios y permitiendo un flujo seguro entre múltiples escenarios.',
      'business.core_module2_img_alt': 'Ciclo de valor transparente',
      'business.core_module2_title': 'Ciclo de valor transparente',
      'business.core_module2_desc': 'Basado en un sistema de cadena de negocio digitalizada, rastrea de extremo a extremo el comportamiento del usuario y la eficiencia de la cadena de suministro para ajustar costes y retornos, reducir desperdicios y mejorar la eficiencia.',
      'business.core_module3_img_alt': 'Ecosistema interconectado',
      'business.core_module3_title': 'Ecosistema interconectado',
      'business.core_module3_desc': 'Rompe silos de datos, habilita interoperabilidad entre e-commerce, juegos, redes sociales y contenido, y crea vínculos de valor entre industrias y plataformas.',
      'business.core_module4_img_alt': 'Sistema operativo global',
      'business.core_module4_title': 'Sistema operativo global',
      'business.core_module4_desc': 'Construye centros globales de operación y tecnología para ayudar a las empresas a expandirse rápidamente a mercados internacionales, conectando capital y recursos globales y formando redes industriales colaborativas.',
      'business.future_kicker': 'Plan futuro',
      'business.future_title': 'Nueva infraestructura económica',
      'business.future_card1_title': 'Infraestructura de datos',
      'business.future_card1_desc': 'Una base de datos de alta seguridad y disponibilidad, con un marco de computación de privacidad que protege la soberanía de los datos.',
      'business.future_card2_title': 'Motor de negocio inteligente',
      'business.future_card2_desc': 'Sistemas de decisión inteligente y operación automatizada impulsados por IA para mejorar la eficiencia comercial.',
      'business.future_card3_title': 'Corredor de economía digital',
      'business.future_card3_desc': 'Una “autopista” de circulación y liquidación de valor que conecta múltiples mercados para facilitar el comercio transfronterizo.',
      'business.v5_kicker': 'Estrategia V5',
      'business.v5_title': 'Matriz estratégica global V5',
      'business.v5_quote': 'Desde cinco dimensiones—tecnología, activos, seguridad, industria e infraestructura—se traza la ruta de desarrollo a largo plazo de Qicheng Holdings Group.',
      'business.v5_chip1_title': 'Tecnología',
      'business.v5_chip1_desc': 'Tecnología de vanguardia que impulsa la innovación',
      'business.v5_chip2_title': 'Activos',
      'business.v5_chip2_desc': 'Activos digitales como base de valor',
      'business.v5_chip3_title': 'Seguridad',
      'business.v5_chip3_desc': 'Múltiples controles de riesgo para seguridad',
      'business.v5_chip4_title': 'Industria',
      'business.v5_chip4_desc': 'Integración industrial, ecosistema ganar-ganar',
      'business.v5_chip5_title': 'Infraestructura',
      'business.v5_chip5_desc': 'Infraestructura global para conectividad',

      'txo.page_title': 'Exchange de criptomonedas TXO · Infraestructura de activos digitales de Qicheng',
      'txo.page_desc': 'Conoce el origen del exchange de criptomonedas TXO, su visión y el significado de su nombre, el equipo fundador y el respaldo de capital global, así como su red de servicios OTC presenciales en todo el mundo.',
      'txo.section_vision_kicker': 'Visión',
      'txo.section_founder_kicker': 'Fundador',
      'txo.section_team_kicker': 'Fortaleza central',
      'txo.section_offline_kicker': 'Servicio global',
      'txo.vision_title': 'Filosofía central de TXO',
      'txo.vision_t_word': 'Titán / Trading',
      'txo.vision_x_word': 'Exchange / Economía X',
      'txo.vision_o_word': 'Oportunidad / Abierto',
      'txo.vision_t_desc': 'Infraestructura sólida y confiable y capacidad de trading a escala global',
      'txo.vision_x_desc': 'Una forma económica global de nueva generación orientada al futuro',
      'txo.vision_o_desc': 'Oportunidades abiertas y compartidas para el flujo global de valor',
      'txo.hero_title': 'Infraestructura de trading<br>de activos digitales de nueva generación',
      'txo.hero_desc': 'TXO fue cofundada por Qihang Capital y Helios Chain Research Institute, dedicada a redefinir el trading global de activos digitales con <span class="qc-text-highlight">eficiencia</span>, <span class="qc-text-highlight">seguridad</span> e <span class="qc-text-highlight">inteligencia</span>.',
      'txo.founder_title': 'La doble base de tecnología y finanzas',
      'txo.founder_role': 'Fundador de TXO y arquitecto jefe',
      'txo.team_title': 'Talento de élite y capital global',
      'txo.team_rnd_title': 'Equipo de I+D interdisciplinario',
      'txo.team_rnd_1': 'Expertos en cuantitativa y control de riesgos de Goldman Sachs y Morgan Stanley',
      'txo.team_rnd_2': 'Arquitectos de sistemas distribuidos de Google y Meta',
      'txo.team_rnd_3': 'Ingenieros criptográficos del centro de criptografía del MIT',
      'txo.team_capital_title': 'Apoyo de capital global',
      'txo.offline_title': 'Red de trading presencial',
      'txo.offline_desc': 'Además del sistema de emparejamiento en línea, TXO ha construido una <span class="qc-text-highlight">red presencial de trading</span> que cubre las principales regiones del mundo, ofreciendo servicios OTC seguros y privados para instituciones y clientes de alto patrimonio.',
      'txo.offline_card1_title': 'Certificación oficial',
      'txo.offline_card1_desc': 'Certificación de cualificación para instituciones de trading presencial por región',
      'txo.offline_card2_title': 'Cumplimiento y seguridad',
      'txo.offline_card2_desc': 'Mayor cumplimiento normativo y seguridad de fondos en las operaciones',
      'txo.founder_p1': 'El Dr. Adrian Caldwell es un reconocido experto internacional en arquitectura financiera distribuida. Se graduó en Ciencias de la Computación en la <span class="qc-text-highlight">Universidad de Stanford</span> y obtuvo dos doctorados en Ingeniería Financiera en el <span class="qc-text-highlight">Imperial College London</span>.',
      'txo.founder_p2': 'Fue miembro clave del equipo de modelado cuantitativo de Goldman Sachs. En 2019 fundó el Helios Chain Research Institute, centrado en sistemas de compensación de alto rendimiento y redes distribuidas de control de riesgo. TXO es la aplicación sistemática de sus resultados de investigación.',

      'calc.page_title': 'Calculadora de ganancias · Qicheng Holdings Group',
      'calc.page_desc': 'Según las señales de Qicheng, ingresa el monto inicial, señales diarias y el periodo para generar una tabla de ganancias día a día.',
      'about.page_title': 'Sobre Qicheng · Qicheng Holdings Group',
      'about.page_desc': 'Conoce Qicheng Holdings Group: visión general, fundador, estructura global, la Fundación QGF y nuestra misión, visión y valores.',
      'about.hero_title': 'Construyendo una red global<br>de colaboración digital',
      'about.hero_desc': 'Qicheng Holdings Group (QCH) se fundó en 2020 y tiene su sede en Londres.<br class="hidden sm:block">Conectamos centros financieros globales para construir un ecosistema de economía digital <span class="qc-text-highlight">transparente</span>, <span class="qc-text-highlight">seguro</span> y <span class="qc-text-highlight">sostenible</span>.',
      'about.overview_kicker': 'La base',
      'about.overview_title': 'Con base en Londres, conectados con el mundo',
      'about.stat_founded': 'Fundación',
      'about.stat_countries': 'Países cubiertos',
      'about.stat_aum': 'Activos bajo gestión (AUM)',
      'about.intro_p1': 'Desde el inicio, QCH estableció una visión ambiciosa: ser <span class="qc-text-highlight">constructor de la red global de colaboración de la economía digital</span>. No somos solo una firma de inversión: somos un puente entre los activos digitales y la economía real.',
      'about.intro_p2': 'Aprovechando el entorno regulatorio maduro de Londres, su infraestructura financiera y un ecosistema de innovación abierto, QCH ha construido en pocos años una red colaborativa que abarca <span class="qc-text-highlight">30+</span> países y regiones.',
      'about.tab_compliance_title': 'Operación conforme',
      'about.tab_compliance_desc': 'TXO cuenta con licencia MSB de EE. UU. y cualificaciones de cumplimiento, con un sistema de control de riesgos de nivel financiero.',
      'about.tab_tech_title': 'Impulso tecnológico',
      'about.tab_tech_desc': 'Integra modelos líderes como OpenAI y Gemini para crear un motor inteligente de trading de activos digitales.',
      'about.tab_ecosystem_title': 'Ecosistema ganar-ganar',
      'about.tab_ecosystem_desc': 'Colaboración profunda con capital global líder como Goldman Sachs y Sequoia para construir un ecosistema financiero sostenible.',
      'about.img_compliance_alt': 'Credenciales de cumplimiento',
      'about.img_tech_alt': 'Socios tecnológicos',
      'about.img_ecosystem_alt': 'Socios del ecosistema',
      'about.partners_title': 'Nuestros socios',
      'about.partners_strip_alt': 'Tira de logotipos de socios',
      'about.founder_kicker': 'Liderazgo',
      'about.founder_title': 'La fusión de matemáticas y tecnología',
      'about.founder_role': 'Director ejecutivo',
      'about.founder_p1': 'Robert Harrison se graduó en la <span class="qc-text-highlight">Universidad de Oxford</span>, especializado en matemáticas financieras y sistemas económicos emergentes. Tiene más de 17 años de experiencia en fintech global, asignación de activos y marcos regulatorios transfronterizos.',
      'about.founder_p2': 'Como pionero en integrar blockchain con los mercados de capital tradicionales, Robert ha participado en múltiples proyectos multinacionales de infraestructura financiera digital. Medios internacionales lo consideran una <span class="qc-text-highlight">figura clave</span> en el avance sistémico de las finanzas digitales globales.',
      'about.founder_p3': 'Bajo su liderazgo, Qicheng Holdings Group mantiene modelos estructurales rigurosos y una visión estratégica global, liberando <span class="qc-text-highlight">valor a largo plazo</span> para inversores de todo el mundo.',
      'about.structure_kicker': 'Red global',
      'about.structure_title': 'Colaboración interdisciplinaria, inteligencia compartida',
      'about.structure_card1_title': 'Expertos tecnológicos',
      'about.structure_card1_desc': 'Talento líder en IA y sistemas distribuidos',
      'about.structure_card2_title': 'Analistas financieros',
      'about.structure_card2_desc': 'Inversores institucionales con aguda visión de mercado',
      'about.structure_card3_title': 'Líderes de industria',
      'about.structure_card3_desc': 'Profesionales experimentados en energía, manufactura y educación',
      'about.structure_card4_title': 'Asesores económicos',
      'about.structure_card4_desc': 'Académicos y asesores de referencia en políticas internacionales',
      'about.qgf_kicker': 'Fundación',
      'about.qgf_title': 'Capital de largo plazo que impulsa la innovación',
      'about.qgf_quote': 'QGF gestiona actualmente aproximadamente <span class="qc-text-highlight">780 millones de USD</span> en AUM, impulsando infraestructura para la economía digital mediante modelos multiactivo y estrategias de distribución global.',
      'about.qgf_card1_img_alt': 'Capital de largo plazo',
      'about.qgf_card1_title': 'Inyección de capital de largo plazo',
      'about.qgf_card1_desc': 'Financiado proporcionalmente con las utilidades netas anuales de QCH para asegurar escalabilidad sostenida.',
      'about.qgf_card2_img_alt': 'Alianzas estratégicas',
      'about.qgf_card2_title': 'Cooperación estratégica de capital',
      'about.qgf_card2_desc': 'Colaboración estrecha con instituciones líderes como Blackstone, Sequoia y JPMorgan Chase.',
      'about.qgf_card3_img_alt': 'Cobertura de riesgo',
      'about.qgf_card3_title': 'Mecanismos de cobertura de riesgo',
      'about.qgf_card3_desc': 'Gestión de riesgos refinada para ofrecer soporte técnico y de capital estable a socios globales.',
      'about.mission_kicker': 'Misión y valores',
      'about.mission_title': 'Cinco valores fundamentales',
      'about.value_transparency_title': 'Transparencia',
      'about.value_transparency_desc': 'Elevar la confianza a partir de datos y procesos transparentes.',
      'about.value_security_title': 'Seguridad',
      'about.value_security_desc': 'Proteger activos con salvaguardas técnicas y de gobernanza.',
      'about.value_collaboration_title': 'Colaboración',
      'about.value_collaboration_desc': 'Cooperación entre regiones e industrias para una red de valor ganar-ganar.',
      'about.value_innovation_title': 'Innovación',
      'about.value_innovation_desc': 'Explorar aplicaciones eficientes de IA y blockchain en finanzas.',
      'about.value_sustainability_title': 'Sostenibilidad',
      'about.value_sustainability_desc': 'Enfocarse en el valor a largo plazo e integrar economía digital y desarrollo verde.',
      'about.resend_title': 'Hacer de las finanzas digitales<br>una infraestructura pública global',
      'about.resend_desc': 'Accesible para todos, beneficiosa para todos. Construimos una red global de flujo de valor <span class="qc-text-highlight">transparente</span>, <span class="qc-text-highlight">segura</span>, <span class="qc-text-highlight">inteligente</span> e <span class="qc-text-highlight">inclusiva</span>.',
      'calc.hero_title': 'Crecimiento Patrimonial<br>Simulación Inteligente',
      'calc.hero_desc': 'Basado en el modelo de señales de Qicheng, ingresa tu monto inicial y periodo para ver cómo el interés compuesto puede hacer crecer tus activos con el tiempo.',
      'calc.hero_highlight_principal': 'monto inicial',
      'calc.hero_highlight_days': 'periodo',
      'calc.start_title': 'Comenzar cálculo',
      'calc.label_principal': 'Monto inicial (USDT)',
      'calc.placeholder_principal': 'por ejemplo: 1000',
      'calc.label_signals': 'Señales por día',
      'calc.option_signals_2': '2 / día (Básico)',
      'calc.option_signals_3': '3 / día (Honor)',
      'calc.option_signals_4': '4 / día (Equipo)',
      'calc.label_days': 'Periodo (días)',
      'calc.placeholder_days': 'por ejemplo: 35',
      'calc.submit': 'Generar vista previa',
      'calc.error_invalid': 'Ingresa un monto inicial y días válidos.',
      'calc.compound_title': 'La esencia del interés compuesto',
      'calc.acc_core': 'Concepto clave',
      'calc.core_paragraph': 'El interés compuesto no trata de “ganar más en una sola vez”, sino de reinvertir ganancias en el tiempo. Las variables clave son la magnitud del crecimiento y la cantidad de ejecuciones.',
      'calc.core_highlight_growth': 'magnitud de crecimiento',
      'calc.core_highlight_times': 'número de ejecuciones',
      'calc.acc_formula': 'Fórmula',
      'calc.formula_model_label': 'Modelo',
      'calc.formula_line': 'Final = Principal × (1 + Δ)<sup>n</sup>',
      'calc.formula_sub': 'Δ es el crecimiento equivalente por señal; n es el total de señales (señales/día × días).',
      'calc.acc_adv': 'Ventajas',
      'calc.adv_1_title': 'Disciplina y repetición',
      'calc.adv_1_desc': 'Reglas y tamaño fijo reducen la emoción y mejoran la repetibilidad.',
      'calc.adv_2_title': 'Efecto de frecuencia',
      'calc.adv_2_desc': 'Con el mismo crecimiento, mayor frecuencia acelera antes la curva.',
      'calc.adv_3_title': 'Riesgo controlable',
      'calc.adv_3_desc': 'Usar una pequeña parte por operación mantiene el riesgo bajo control.',
      'calc.acc_org': 'Estructura del equipo',
      'calc.org_title': 'Estructura del equipo',
      'calc.org_subtitle': 'Sistema basado en “6 referidos directos”',
      'calc.org_captain_title': 'Capitán (VIP)',
      'calc.org_captain_desc': 'Disfruta beneficios de ascenso del equipo',
      'calc.org_level1_user': 'Usuario de nivel 1',
      'calc.summary_title': 'Activos finales estimados',
      'calc.profit_suffix': '(ganancia)',
      'calc.summary_details': 'Periodo {days} días | Señales totales {signals}',
      'calc.table_title': 'Detalle diario',
      'calc.th_day': 'Día',
      'calc.th_signals': 'Señales',
      'calc.th_start': 'Saldo inicial',
      'calc.th_profit': 'Ganancia diaria',
      'calc.th_end': 'Saldo final',
      'calc.disclaimer': '* Aviso: Cálculo teórico, no es una promesa de inversión. Invertir implica riesgos.',
      'footer.status_operational': 'Todos los sistemas operativos'
    },
    fr: {
      'nav.logo_aria': 'Qicheng Holdings Group',
      'nav.logo_alt': 'Qicheng Holdings Group',
      'nav.home': 'Accueil',
      'nav.about': 'Qicheng',
      'nav.business': 'Modèle économique',
      'nav.txo': 'Bourse TXO',
      'nav.license': 'Conformité et licences',
      'nav.profit': 'Système de profit',
      'nav.calculator': 'Calculateur',

      'nav.aria_main': 'Navigation principale',
      'nav.toggle': 'Basculer la navigation',

      'nav.about.overview': 'Aperçu',
      'nav.about.founder': 'Fondateur',
      'nav.about.structure': 'Structure',
      'nav.about.qgf': 'Fondation QGF',
      'nav.about.mission': 'Mission',
      'nav.about.testimonials': 'Témoignages',

      'nav.business.web2': 'Innovation WEB2',
      'nav.business.core': 'Modèle central',
      'nav.business.future': 'Plan futur',
      'nav.business.v5': 'Stratégie V5',

      'nav.txo.origin': 'Origine de TXO',
      'nav.txo.founder': 'Fondateur',
      'nav.txo.team': 'Équipe R&D',
      'nav.txo.offline': 'Service OTC hors ligne',

      'nav.license.statement': 'Déclaration de légalité et conformité',
      'nav.license.verification': 'Méthode de vérification des certificats',

      'profit.page_title': 'Système de profits · Signaux · Parrainage · Équipe VIP',
      'profit.page_desc': 'Découvrez le système de signaux de trading, le programme de parrainage, le plan d’équipe VIP et les exemples sur 35 jours, puis estimez votre performance composée avec des outils intelligents.',
      'profit.hero_title': 'Profits multidimensionnels<br>Croissance partagée',
      'profit.hero_desc': 'Qicheng Holdings construit un système complet de croissance patrimoniale via des <span class="qc-text-highlight">signaux de trading</span>, des <span class="qc-text-highlight">récompenses de parrainage</span> et le <span class="qc-text-highlight">programme d’équipe VIP</span>.<br class="hidden sm:block">',
      'profit.hero_img_alt': 'Système de profits multidimensionnels',
      'profit.signals_icon_alt': 'Icône des signaux',
      'profit.signals_title': 'Trading Signals',
      'profit.signals_subtitle': 'Signaux quantitatifs IA',
      'profit.signals_lead': 'Signaux unifiés, exécution sans frontières',
      'profit.signals_desc': 'Respectez strictement les règles : chaque signal suit une gestion de capital fixe. Copiez en un clic via TXO pour réduire la barrière et améliorer la cohérence.',
      'profit.rules_title': 'Règles de trading',
      'profit.rule_position_label': 'Taille de position',
      'profit.rule_position_value': 'Utiliser 2% du solde par signal',
      'profit.rule_return_label': 'Hypothèse de rendement',
      'profit.rule_return_value': 'Moyenne ~50% par trade (≈ +1% d’équité)',
      'profit.rule_freq_label': 'Fréquence',
      'profit.rule_freq_value': '2–4 fois/jour selon le niveau',
      'profit.rule_miss_label': 'Signal manqué',
      'profit.rule_miss_value': 'Aucune compensation en cas de signal manqué',
      'profit.perk_basic_title': 'Avantages membre de base',
      'profit.perk_basic_desc': 'Après le premier dépôt, vous devenez membre de base et recevez 2 signaux par jour de façon permanente. Chaque trade utilise 2% du solde.',
      'profit.perk_honor_title': 'Signal d’honneur',
      'profit.perk_honor_desc': 'Invitez 1 membre officiel et obtenez 1 signal permanent supplémentaire. Chaque trade utilise 2% du solde.',
      'profit.perk_team_title': 'Signal d’équipe',
      'profit.perk_team_desc': 'Invitez 3 membres officiels et obtenez 1 signal permanent supplémentaire. Chaque trade utilise 2% du solde.',
      'profit.perk_referral_title': 'Signal de parrainage',
      'profit.perk_referral_desc': 'Invitez un ami : l’invitant et le nouveau membre reçoivent chacun 1 signal supplémentaire le même jour, avec 2% du solde. Les récompenses sont cumulables.',
      'profit.example_title': 'Exemple',
      'profit.example_desc': 'Exemple : capital initial $1,000, 2 signaux/jour. En supposant “+1% par signal” :',
      'profit.example_lines': 'Fin du jour 1 ≈ 1000 × 1.01² = 1020<br>Fin du jour 10 ≈ 1000 × 1.01^(2×10) = 1219<br>Fin du jour 35 ≈ 1000 × 1.01^(2×35) = 2000',
      'profit.cta_calculator': 'Aller au calculateur',
      'profit.factor_title': 'Facteur de capitalisation',
      'profit.factor_desc': 'Croissance équivalente par signal',
      'profit.factor_card1_title': 'Signaux totaux',
      'profit.factor_card1_desc': 'Signaux/jour × Jours',
      'profit.factor_card2_title': 'Modèle',
      'profit.factor_card2_desc': 'Capital × 1.01^Signaux',
      'profit.hours_title': 'Horaires mondiaux de trading',
      'profit.hours_img_alt': 'Horaires mondiaux de trading',
      'profit.hours_note': 'Référence des heures actives par région pour exécution multi-fuseaux',
      'profit.referral_title': 'Referral Program',
      'profit.referral_subtitle': 'Programme de parrainage',
      'profit.referral_desc': 'Après un premier dépôt (≥ $500), vous êtes éligible à 100%. Quand votre ami s’inscrit et dépose pour la première fois, vous recevez tous deux des récompenses et des signaux supplémentaires.',
      'profit.referral_rules_title': 'Règles',
      'profit.referral_rule1': 'Premier dépôt du nouveau membre ≥ $500 et au moins 30% du solde du parrain.',
      'profit.referral_rule2': 'Les deux reçoivent un signal supplémentaire le même jour (2% du solde).',
      'profit.referral_rule3': 'Débloquez le 3e signal permanent après le 1er parrainage ; le 4e après le 3e.',
      'profit.referral_th_deposit': 'Premier dépôt',
      'profit.referral_th_referrer': 'Récompense du parrain',
      'profit.referral_th_new': 'Récompense du nouveau',
      'profit.vip_title': 'VIP Team',
      'profit.vip_subtitle': 'Promotion équipe VIP',
      'profit.vip_desc': 'Recommandez directement 6 membres pour devenir VIP et obtenir un revenu passif permanent. Les commissions sont calculées sur le volume total de l’équipe et réglées tous les 10 jours (2/12/22).',
      'profit.vip_th_level': 'Niveau',
      'profit.vip_th_team': 'Taille de l’équipe',
      'profit.vip_th_direct': 'Recommandations directes',
      'profit.vip_th_bonus': 'Prime',
      'profit.vip_th_commission': 'Ristourne volume',
      'profit.reports_title': 'Profit Reports',
      'profit.reports_subtitle': 'Exemples sur 35 jours',
      'profit.reports_desc': 'Modèle composé basé sur $1,000, 2–4 signaux/jour, 2% par signal et ~50% de rendement moyen (≈ +1% d’équité).',
      'profit.report_basic_title': 'Membre de base (2 signaux/jour)',
      'profit.report_honor_title': 'Membre d’honneur (3 signaux/jour)',
      'profit.report_team_title': 'Membre d’équipe (4 signaux/jour)',
      'profit.report_total_label': 'Actifs estimés après 35 jours',
      'profit.day_1': 'Jour 1',
      'profit.day_10': 'Jour 10',
      'profit.day_20': 'Jour 20',
      'profit.day_30': 'Jour 30',
      'profit.cta_custom_calc': 'Calcul personnalisé',
      'profit.rail_aria': 'Rail d’activité',
      'profit.rail_tag_default': 'Activité des signaux',
      'profit.modal_aria': 'Aperçu de l’activité',
      'profit.modal_close': 'Fermer',
      'profit.modal_title_default': 'Signaux · Activité',
      'profit.activity_signals': 'Signaux',
      'profit.activity_referral': 'Parrainage',
      'profit.activity_vip': 'Équipe VIP',
      'profit.activity_reports': 'Table de gains',
      'profit.activity_suffix': 'Activité',

      'license.page_title': 'Licences d’exploitation mondiales · Conformité & certification TXO',
      'license.page_desc': 'Consultez la déclaration de conformité de TXO, les informations d’enregistrement dans l’État de New York et la méthode de vérification des certificats officiels. Découvrez AML, KYC, contrôle des risques et protection de la vie privée des données.',
      'license.hero_title': 'Conformité mondiale<br>Socle de sécurité',
      'license.hero_desc': 'TXO Exchange est exploitée par TXO COMPREHENSIVE SERVICE INC.<br class="hidden sm:block">Enregistrée légalement dans l’État de New York (États-Unis) et dotée d’un système de contrôle interne <span class="qc-text-highlight">de niveau financier</span>.',
      'license.statement_title': 'Legal Statement',
      'license.statement_subtitle': 'Exploitation conforme',
      'license.statement_desc': 'TXO COMPREHENSIVE SERVICE INC. est officiellement enregistrée auprès du Department of State de l’État de New York. Le numéro d’enregistrement est <span class="qc-text-highlight">260104000062</span>.',
      'license.aml_title': 'Lutte anti-blanchiment (AML)',
      'license.aml_desc': 'Mécanismes stricts de vérification de l’origine des fonds',
      'license.kyc_title': 'Vérification d’identité (KYC)',
      'license.kyc_desc': 'Cadre mondial d’authentification des utilisateurs',
      'license.risk_title': 'Contrôle des risques',
      'license.risk_desc': 'Surveillance en temps réel des transactions anormales',
      'license.privacy_title': 'Confidentialité des données',
      'license.privacy_desc': 'Chiffrement des données utilisateur de niveau bancaire',
      'license.cert_company_title': 'Certificat d’entreprise autorisée aux États-Unis',
      'license.cert_company_alt': 'TXO License 1',
      'license.cert_stock_title': 'Certificat d’actions TXO',
      'license.cert_stock_alt': 'Stock Certificate',
      'license.verify_title': 'Verification',
      'license.verify_subtitle': 'Guide de vérification des certificats',
      'license.step1_title': 'Accéder au système officiel',
      'license.step1_desc': 'Ouvrez dans votre navigateur : <a href="https://apps.dos.ny.gov/publicInquiry/" target="_blank" style="color: #fff; text-decoration: underline;">https://apps.dos.ny.gov/publicInquiry/</a>',
      'license.step2_title': 'Saisir le nom de l’entreprise',
      'license.step2_desc': 'Dans le champ Entity Name, saisissez : <span class="qc-text-highlight">TXO COMPREHENSIVE SERVICE INC</span>',
      'license.step3_title': 'Consulter le résultat',
      'license.step3_desc': 'Cliquez sur Search pour voir le statut d’enregistrement, la date de création et d’autres informations dans la base officielle.',

      'nav.profit.signals': 'Système de signaux',
      'nav.profit.referral': 'Programme de parrainage',
      'nav.profit.vip': 'Programme VIP',
      'nav.profit.reports': 'Rapports de profit',

      'footer.about_title': 'À propos de Qicheng',
      'footer.txo_title': 'Bourse TXO',
      'footer.business_title': 'Modèle économique',
      'footer.profit_title': 'Système de profit',
      'footer.cta_title': 'Prêt à trader ?',
      'footer.cta_button': 'Commencer à trader',
      'footer.tagline': 'Organisation mondiale de collaboration pour la finance numérique et l’économie',

      'footer.quick.txo': 'Bourse TXO',
      'footer.quick.business': 'Modèle économique',
      'footer.quick.license': 'Conformité et licences',
      'footer.status_ok': 'Tous les systèmes sont opérationnels',
      'footer.aria_quick_pages': 'Pages clés',
      'footer.about.overview': 'Aperçu',
      'footer.about.founder': 'Fondateur',
      'footer.about.structure': 'Structure',
      'footer.about.qgf': 'Fondation QGF',
      'footer.about.mission': 'Mission',
      'footer.about.timeline': 'Chronologie',
      'footer.about.testimonials': 'Témoignages',
      'footer.txo.origin': 'Origine de TXO',
      'footer.txo.founder': 'Fondateur',
      'footer.txo.team': 'Équipe R&D',
      'footer.txo.offline': 'Service OTC hors ligne',
      'footer.txo.license': 'Conformité & licences',
      'footer.business.web2': 'Innovation WEB2',
      'footer.business.core': 'Modèle central',
      'footer.business.future': 'Plan futur',
      'footer.business.v5': 'Stratégie V5',
      'footer.profit.signals': 'Système de signaux',
      'footer.profit.referral': 'Programme de parrainage',
      'footer.profit.vip': 'Programme VIP',
      'footer.profit.reports': 'Rapports de profit',
      'footer.profit.calculator': 'Calculateur',

      'home.hero_kicker': 'Qicheng Holdings Group',
      'home.hero_title': 'Collaboration Mondiale Finance Numérique & Économie',
      'home.hero_subtitle': 'Basés à Londres, nous bâtissons un réseau de collaboration économique dans plus de 30 pays, guidé par la transparence, la sécurité et l’innovation, pour relier la finance numérique à l’économie réelle.',
      'home.hero_cta_business': 'Découvrir le modèle économique',
      'home.hero_cta_txo': 'Accéder à la bourse TXO',
      'home.london_title': 'Londres · Portée mondiale',
      'home.london_desc': 'Fondé en 2020, Qicheng Holdings Group (QCH) a son siège à Londres, au Royaume-Uni. Dans un environnement financier mature et bien régulé, nous construisons une infrastructure économique numérique mondiale tournée vers l’avenir.',
      'home.london_cta_about': 'À propos de Qicheng',

      'home.flags_caption': 'Construire un réseau d’investissement mondial et saisir chaque opportunité de croissance.',

      'home.principles_title': 'Cinq principes clés',
      'home.principles_subtitle': 'Construire un réseau de valeur mondial fiable',
      'home.principles_desc': 'Transparence, sécurité, collaboration, innovation et durabilité constituent la logique de conception fondamentale de Qicheng pour l’économie numérique mondiale. Ces cinq dimensions se soutiennent pour créer un écosystème ouvert, inclusif et digne de confiance.',
      'home.principle_transparency_title': 'Transparence',
      'home.principle_transparency_desc': 'Fondée sur la transparence des données et des processus, avec des mécanismes de divulgation publique pour renforcer la confiance du marché et la conformité — chaque transaction et décision est traçable.',
      'home.principle_security_title': 'Sécurité',
      'home.principle_security_desc': 'Double garantie technique et institutionnelle : chiffrement multi-couches, contrôle des risques intelligent et audits de conformité pour protéger les actifs et les informations, avec une sécurité de niveau bancaire.',
      'home.principle_collaboration_title': 'Collaboration',
      'home.principle_collaboration_desc': 'Encourager la synergie entre régions et secteurs, bâtir un réseau gagnant-gagnant, connecter les ressources mondiales et promouvoir la co-création de valeur pour faire avancer l’économie numérique.',
      'home.principle_innovation_title': 'Innovation',
      'home.principle_innovation_desc': 'Explorer continuellement l’IA, la blockchain et le big data afin d’accélérer leur mise en œuvre efficace et d’innover dans les modèles économiques.',
      'home.principle_sustainability_title': 'Durabilité',
      'home.principle_sustainability_desc': 'Mettre l’accent sur la valeur long terme et la responsabilité sociale, associer économie numérique et développement vert, et bâtir des modèles durables pour une croissance saine.',

      'home.txo_section_title': 'Bourse TXO · Infrastructure d’actifs numériques',
      'home.txo_section_desc': 'Conçue par l’écosystème Qicheng avec des équipes de pointe en technologie et finance, TXO vise une infrastructure de trading de nouvelle génération, haute performance et à contrôle des risques renforcé.',
      'home.txo_cta_detail': 'Découvrir TXO',
      'home.txo_cta_license': 'Voir conformité et licences',

      'home.bridge_quote': 'Nous nous engageons à promouvoir l’économie du partage et à créer un avenir prospère pour tous.',

      'home.testimonials_title': 'Au-delà des attentes',
      'home.testimonials_desc': 'Grâce à une solide compréhension des marchés et à des stratégies précises, Qicheng s’engage à créer une croissance patrimoniale stable à long terme.<br class="hidden sm:block">\n            Avec notre accompagnement professionnel, chaque investisseur progresse sereinement dans un environnement complexe.<br class="hidden sm:block">\n            La coopération approfondie avec la plateforme TXO offre une expérience de trading inégalée.',

      'business.page_title': 'Modèle économique de Qicheng · Infrastructure de l’économie numérique',
      'business.page_desc': 'Découvrez le modèle d’infrastructure commerciale de Qicheng Holdings Group : « Actifs numériques + Données contrôlables + Scénarios connectés + Système d’exploitation mondial », ainsi que la matrice stratégique mondiale V5.',
      'business.hero_title': 'Écosystème en boucle fermée<br>Création de valeur',
      'business.hero_desc': 'Qicheng Holdings Group propose un modèle d’infrastructure commerciale « Actifs numériques + Données contrôlables + Scénarios connectés + Système d’exploitation mondial ».<br class="hidden sm:block"><span class="qc-text-highlight">Ce modèle</span> traite de manière systémique les contradictions structurelles de l’ère Web2.',
      'business.web2_kicker': 'Le défi',
      'business.web2_title': 'Les contradictions structurelles du Web2',
      'business.web2_desc': 'Dans le monde Web2 actuel, les utilisateurs créent de la valeur mais peinent à obtenir un retour à la hauteur de leur contribution. Les plateformes captent l’essentiel des données et de la valeur, formant une boucle fermée fortement centralisée.',
      'business.web2_card1_title': 'Décalage de valeur',
      'business.web2_card1_desc': 'Les utilisateurs créent de la valeur, mais les profits sont monopolisés par les plateformes',
      'business.web2_card2_title': 'Silos de données',
      'business.web2_card2_desc': 'Les entreprises peinent à accéder à des données utilisateurs authentiques et vérifiables',
      'business.web2_card3_title': 'Innovation limitée',
      'business.web2_card3_desc': 'Les frontières de l’innovation restent enfermées dans un seul écosystème',
      'business.web2_card4_title': 'Coûts élevés',
      'business.web2_card4_desc': 'Les écosystèmes fermés font grimper les coûts d’acquisition et d’exploitation',
      'business.core_kicker': 'Piliers centraux',
      'business.core_title': 'Synergie de quatre modules fondamentaux',
      'business.core_module1_img_alt': 'Actifisation des données',
      'business.core_module1_title': 'Actifisation des données',
      'business.core_module1_desc': 'Grâce à des mécanismes standardisés, les données deviennent des facteurs de production « certifiables, autorisables et valorisables », brisant les monopoles et permettant une circulation sécurisée multi-scénarios.',
      'business.core_module2_img_alt': 'Boucle de valeur transparente',
      'business.core_module2_title': 'Boucle de valeur transparente',
      'business.core_module2_desc': 'Basée sur un système de chaîne commerciale numérisée, elle suit de bout en bout les comportements utilisateurs et l’efficacité de la supply chain, aligne coûts et retours, réduit le gaspillage et améliore l’efficacité.',
      'business.core_module3_img_alt': 'Écosystème interconnecté',
      'business.core_module3_title': 'Écosystème interconnecté',
      'business.core_module3_desc': 'Briser les silos de données, assurer l’interopérabilité entre e-commerce, jeux, social et contenu, et créer des liens de valeur inter-sectoriels et inter-plateformes.',
      'business.core_module4_img_alt': 'Système d’exploitation mondial',
      'business.core_module4_title': 'Système d’exploitation mondial',
      'business.core_module4_desc': 'Construire des centres mondiaux d’opérations et de technologie pour aider les entreprises à s’étendre rapidement à l’international, connecter capital et ressources et former des réseaux industriels collaboratifs.',
      'business.future_kicker': 'Plan futur',
      'business.future_title': 'Nouvelle infrastructure économique',
      'business.future_card1_title': 'Infrastructure de données',
      'business.future_card1_desc': 'Une base de données hautement sécurisée et disponible, avec un cadre de calcul préservant la confidentialité pour protéger la souveraineté des données.',
      'business.future_card2_title': 'Moteur commercial intelligent',
      'business.future_card2_desc': 'Décisions intelligentes et opérations automatisées pilotées par l’IA pour accroître l’efficacité business.',
      'business.future_card3_title': 'Corridor d’économie numérique',
      'business.future_card3_desc': 'Une « autoroute » de circulation et de règlement de la valeur reliant plusieurs marchés afin de faciliter le commerce transfrontalier.',
      'business.v5_kicker': 'Stratégie V5',
      'business.v5_title': 'Matrice stratégique mondiale V5',
      'business.v5_quote': 'À travers cinq dimensions — technologie, actifs, sécurité, industrie et infrastructure — se dessine la trajectoire de développement à long terme de Qicheng Holdings Group.',
      'business.v5_chip1_title': 'Technologie',
      'business.v5_chip1_desc': 'Technologies de pointe, moteur d’innovation',
      'business.v5_chip2_title': 'Actifs',
      'business.v5_chip2_desc': 'Actifs numériques, socle de valeur',
      'business.v5_chip3_title': 'Sécurité',
      'business.v5_chip3_desc': 'Contrôle des risques multi-couches, garantie de sécurité',
      'business.v5_chip4_title': 'Industrie',
      'business.v5_chip4_desc': 'Intégration industrielle, écosystème gagnant-gagnant',
      'business.v5_chip5_title': 'Infrastructure',
      'business.v5_chip5_desc': 'Infrastructure mondiale, interconnexion',

      'txo.page_title': 'Bourse crypto TXO · Infrastructure d’actifs numériques Qicheng',
      'txo.page_desc': 'Découvrez l’origine de la bourse crypto TXO, sa vision et la signification de son nom, l’équipe fondatrice et le soutien de capitaux mondiaux, ainsi que le déploiement des services OTC hors ligne à l’échelle mondiale.',
      'txo.section_vision_kicker': 'Vision',
      'txo.section_founder_kicker': 'Fondateur',
      'txo.section_team_kicker': 'Atout clé',
      'txo.section_offline_kicker': 'Service mondial',
      'txo.vision_title': 'Philosophie centrale de TXO',
      'txo.vision_t_word': 'Titan / Trade',
      'txo.vision_x_word': 'eXchange / X-Économie',
      'txo.vision_o_word': 'Opportunité / Ouvert',
      'txo.vision_t_desc': 'Une infrastructure solide et fiable et une capacité de trading de niveau mondial',
      'txo.vision_x_desc': 'Une forme économique mondiale de nouvelle génération tournée vers l’avenir',
      'txo.vision_o_desc': 'Des opportunités ouvertes et partagées pour la circulation mondiale de valeur',
      'txo.hero_title': 'Infrastructure de trading<br>d’actifs numériques nouvelle génération',
      'txo.hero_desc': 'TXO a été cofondée par Qihang Capital et Helios Chain Research Institute, afin de redéfinir le trading mondial d’actifs numériques avec <span class="qc-text-highlight">efficacité</span>, <span class="qc-text-highlight">sécurité</span> et <span class="qc-text-highlight">intelligence</span>.',
      'txo.founder_title': 'Un double ADN : technologie et finance',
      'txo.founder_role': 'Fondateur de TXO et architecte en chef',
      'txo.team_title': 'Équipe d’élite et capitaux mondiaux',
      'txo.team_rnd_title': 'Équipe R&D pluridisciplinaire',
      'txo.team_rnd_1': 'Experts quantitatifs et contrôle des risques issus de Goldman Sachs et Morgan Stanley',
      'txo.team_rnd_2': 'Architectes de systèmes distribués venant de Google et Meta',
      'txo.team_rnd_3': 'Ingénieurs en cryptographie du centre de cryptographie du MIT',
      'txo.team_capital_title': 'Soutien de capitaux mondiaux',
      'txo.offline_title': 'Réseau de trading hors ligne',
      'txo.offline_desc': 'En plus du système de matching en ligne, TXO a construit un <span class="qc-text-highlight">réseau de trading hors ligne</span> couvrant les principales régions du monde, offrant des services OTC sûrs et privés pour les institutions et les clients fortunés.',
      'txo.offline_card1_title': 'Certification officielle',
      'txo.offline_card1_desc': 'Certification des établissements de trading hors ligne au niveau régional',
      'txo.offline_card2_title': 'Conformité et sécurité',
      'txo.offline_card2_desc': 'Renforcement de la conformité et de la sécurité des fonds pour les transactions',
      'txo.founder_p1': 'Le Dr Adrian Caldwell est un expert internationalement reconnu en architecture financière distribuée. Diplômé en informatique de <span class="qc-text-highlight">l’Université Stanford</span>, il a obtenu deux doctorats en ingénierie financière à <span class="qc-text-highlight">l’Imperial College London</span>.',
      'txo.founder_p2': 'Ancien membre clé de l’équipe de modélisation quantitative de Goldman Sachs, il a fondé en 2019 le Helios Chain Research Institute, dédié aux systèmes de compensation haute performance et aux réseaux distribués de contrôle des risques. TXO est la mise en œuvre systématique de ses résultats de recherche.',

      'calc.page_title': 'Calculateur de gains · Qicheng Holdings Group',
      'calc.page_desc': 'Selon les signaux de Qicheng, saisissez le montant initial, le nombre de signaux par jour et la durée afin de générer un tableau jour par jour.',
      'about.page_title': 'À propos de Qicheng · Qicheng Holdings Group',
      'about.page_desc': 'Découvrez Qicheng Holdings Group : aperçu, fondateur, structure mondiale, Fondation QGF, ainsi que mission, vision et valeurs.',
      'about.hero_title': 'Construire un réseau mondial<br>de collaboration numérique',
      'about.hero_desc': 'Qicheng Holdings Group (QCH) a été fondée en 2020 et a son siège à Londres.<br class="hidden sm:block">Nous relions les pôles financiers mondiaux pour bâtir un écosystème d’économie numérique <span class="qc-text-highlight">transparent</span>, <span class="qc-text-highlight">sécurisé</span> et <span class="qc-text-highlight">durable</span>.',
      'about.overview_kicker': 'Les fondations',
      'about.overview_title': 'Ancrés à Londres, connectés au monde',
      'about.stat_founded': 'Fondation',
      'about.stat_countries': 'Pays couverts',
      'about.stat_aum': 'Actifs sous gestion (AUM)',
      'about.intro_p1': 'Dès le départ, QCH a fixé une vision ambitieuse : devenir <span class="qc-text-highlight">le bâtisseur du réseau mondial de collaboration de l’économie numérique</span>. Nous ne sommes pas seulement une société d’investissement : nous sommes un pont entre actifs numériques et économie réelle.',
      'about.intro_p2': 'Grâce à l’environnement réglementaire mature de Londres, à son infrastructure financière et à un écosystème d’innovation ouvert, QCH a construit en quelques années un réseau couvrant <span class="qc-text-highlight">30+</span> pays et régions.',
      'about.tab_compliance_title': 'Conformité',
      'about.tab_compliance_desc': 'TXO détient la licence MSB américaine et des qualifications de conformité, avec un contrôle des risques de niveau institutionnel.',
      'about.tab_tech_title': 'Technologie',
      'about.tab_tech_desc': 'Intègre des modèles leaders comme OpenAI et Gemini pour créer un moteur de trading intelligent.',
      'about.tab_ecosystem_title': 'Écosystème gagnant-gagnant',
      'about.tab_ecosystem_desc': 'Collaboration approfondie avec des capitaux mondiaux de premier plan (Goldman Sachs, Sequoia, etc.) pour construire un écosystème financier durable.',
      'about.img_compliance_alt': 'Qualifications de conformité',
      'about.img_tech_alt': 'Partenaires technologiques',
      'about.img_ecosystem_alt': 'Partenaires de l’écosystème',
      'about.partners_title': 'Nos partenaires',
      'about.partners_strip_alt': 'Bande de logos partenaires',
      'about.founder_kicker': 'Leadership',
      'about.founder_title': 'La rencontre des mathématiques et de la technologie',
      'about.founder_role': 'Directeur général',
      'about.founder_p1': 'Robert Harrison est diplômé de <span class="qc-text-highlight">l’Université d’Oxford</span>, avec une spécialisation en mathématiques financières et systèmes économiques émergents. Il cumule plus de 17 ans d’expérience en fintech internationale, allocation d’actifs et réglementation transfrontalière.',
      'about.founder_p2': 'Pionnier de la convergence entre blockchain et marchés de capitaux traditionnels, Robert a participé à plusieurs projets multinationaux d’infrastructure financière numérique. De nombreux médias le décrivent comme une <span class="qc-text-highlight">figure clé</span> de l’essor systémique de la finance numérique mondiale.',
      'about.founder_p3': 'Sous sa direction, Qicheng Holdings Group maintient des modèles structurels rigoureux et une vision globale, libérant une <span class="qc-text-highlight">valeur de long terme</span> pour les investisseurs du monde entier.',
      'about.structure_kicker': 'Réseau mondial',
      'about.structure_title': 'Collaboration interdisciplinaire, intelligence partagée',
      'about.structure_card1_title': 'Experts techniques',
      'about.structure_card1_desc': 'Talents de pointe en IA et systèmes distribués',
      'about.structure_card2_title': 'Analystes financiers',
      'about.structure_card2_desc': 'Investisseurs institutionnels à la fine lecture de marché',
      'about.structure_card3_title': 'Leaders sectoriels',
      'about.structure_card3_desc': 'Acteurs expérimentés dans l’énergie, l’industrie et l’éducation',
      'about.structure_card4_title': 'Conseillers économiques',
      'about.structure_card4_desc': 'Chercheurs et conseillers de référence en politiques internationales',
      'about.qgf_kicker': 'Fondation',
      'about.qgf_title': 'Capital de long terme, moteur d’innovation',
      'about.qgf_quote': 'QGF gère actuellement environ <span class="qc-text-highlight">780 M$</span> d’actifs (AUM), soutenant l’infrastructure de l’économie numérique via des modèles multi-actifs et des stratégies de distribution mondiale.',
      'about.qgf_card1_img_alt': 'Capital de long terme',
      'about.qgf_card1_title': 'Injection de capital de long terme',
      'about.qgf_card1_desc': 'Alimentée proportionnellement par les bénéfices nets annuels de QCH pour garantir une capacité d’expansion durable.',
      'about.qgf_card2_img_alt': 'Partenariats stratégiques',
      'about.qgf_card2_title': 'Coopération stratégique en capital',
      'about.qgf_card2_desc': 'Collaboration étroite avec des institutions de premier plan telles que Blackstone, Sequoia et JPMorgan Chase.',
      'about.qgf_card3_img_alt': 'Couverture des risques',
      'about.qgf_card3_title': 'Mécanismes de couverture des risques',
      'about.qgf_card3_desc': 'Gestion des risques raffinée pour offrir un soutien technique et financier stable aux partenaires mondiaux.',
      'about.mission_kicker': 'Mission & valeurs',
      'about.mission_title': 'Cinq valeurs fondamentales',
      'about.value_transparency_title': 'Transparence',
      'about.value_transparency_desc': 'Renforcer la confiance grâce à des données et processus transparents.',
      'about.value_security_title': 'Sécurité',
      'about.value_security_desc': 'Protéger les actifs via des garanties techniques et organisationnelles.',
      'about.value_collaboration_title': 'Collaboration',
      'about.value_collaboration_desc': 'Coopération interrégionale et intersectorielle pour un réseau de valeur gagnant-gagnant.',
      'about.value_innovation_title': 'Innovation',
      'about.value_innovation_desc': 'Explorer l’IA et la blockchain pour des applications financières à fort impact.',
      'about.value_sustainability_title': 'Durabilité',
      'about.value_sustainability_desc': 'Se concentrer sur la valeur long terme et intégrer économie numérique et développement vert.',
      'about.resend_title': 'Faire de la finance numérique<br>une infrastructure publique mondiale',
      'about.resend_desc': 'Accessible à tous, bénéfique pour tous. Nous construisons un réseau mondial de flux de valeur <span class="qc-text-highlight">transparent</span>, <span class="qc-text-highlight">sécurisé</span>, <span class="qc-text-highlight">intelligent</span> et <span class="qc-text-highlight">inclusif</span>.',
      'calc.hero_title': 'Croissance de Patrimoine<br>Simulation Intelligente',
      'calc.hero_desc': 'Basé sur le modèle de signaux Qicheng, saisissez votre montant initial et la période pour visualiser l’effet des intérêts composés.',
      'calc.hero_highlight_principal': 'montant initial',
      'calc.hero_highlight_days': 'période',
      'calc.start_title': 'Démarrer le calcul',
      'calc.label_principal': 'Montant initial (USDT)',
      'calc.placeholder_principal': 'ex. 1000',
      'calc.label_signals': 'Signaux par jour',
      'calc.option_signals_2': '2 / jour (Basique)',
      'calc.option_signals_3': '3 / jour (Honneur)',
      'calc.option_signals_4': '4 / jour (Équipe)',
      'calc.label_days': 'Période (jours)',
      'calc.placeholder_days': 'ex. 35',
      'calc.submit': 'Générer l’aperçu',
      'calc.error_invalid': 'Veuillez saisir un montant initial et un nombre de jours valides.',
      'calc.compound_title': 'Comprendre la capitalisation',
      'calc.acc_core': 'Idée centrale',
      'calc.core_paragraph': 'La capitalisation ne consiste pas à gagner plus une fois, mais à réinvestir au fil du temps. Les variables clés sont l’amplitude de croissance et le nombre d’exécutions.',
      'calc.core_highlight_growth': 'amplitude de croissance',
      'calc.core_highlight_times': 'nombre d’exécutions',
      'calc.acc_formula': 'Formule',
      'calc.formula_model_label': 'Modèle',
      'calc.formula_line': 'Final = Principal × (1 + Δ)<sup>n</sup>',
      'calc.formula_sub': 'Δ est la croissance équivalente par signal ; n est le nombre total de signaux (signaux/jour × jours).',
      'calc.acc_adv': 'Avantages',
      'calc.adv_1_title': 'Discipline & reproductibilité',
      'calc.adv_1_desc': 'Règles et tailles fixes réduisent l’émotion et améliorent la reproductibilité.',
      'calc.adv_2_title': 'Effet de fréquence',
      'calc.adv_2_desc': 'À croissance égale, une fréquence plus élevée accélère la courbe plus tôt.',
      'calc.adv_3_title': 'Risque contrôlable',
      'calc.adv_3_desc': 'N’utiliser qu’une petite portion par trade limite l’impact des fluctuations.',
      'calc.acc_org': 'Structure d’équipe',
      'calc.org_title': 'Structure d’équipe',
      'calc.org_subtitle': 'Système basé sur “6 recommandations directes”',
      'calc.org_captain_title': 'Capitaine (VIP)',
      'calc.org_captain_desc': 'Bénéficie des avantages de promotion d’équipe',
      'calc.org_level1_user': 'Utilisateur niveau 1',
      'calc.summary_title': 'Actifs finaux estimés',
      'calc.profit_suffix': '(profit)',
      'calc.summary_details': 'Période {days} jours | Signaux totaux {signals}',
      'calc.table_title': 'Détail journalier',
      'calc.th_day': 'Jour',
      'calc.th_signals': 'Signaux',
      'calc.th_start': 'Solde initial',
      'calc.th_profit': 'Profit du jour',
      'calc.th_end': 'Solde final',
      'calc.disclaimer': '* Avertissement : calcul théorique, sans promesse d’investissement. Investir comporte des risques.',
      'footer.status_operational': 'Tous les systèmes sont opérationnels'
    },
    ar: {
      'nav.logo_aria': 'Qicheng Holdings Group',
      'nav.logo_alt': 'Qicheng Holdings Group',
      'nav.home': 'الرئيسية',
      'nav.about': 'Qicheng',
      'nav.business': 'نموذج الأعمال',
      'nav.txo': 'منصة TXO',
      'nav.license': 'الامتثال والتراخيص',
      'nav.profit': 'نظام الأرباح',
      'nav.calculator': 'الحاسبة',

      'nav.aria_main': 'التنقل الرئيسي',
      'nav.toggle': 'تبديل التنقل',

      'nav.about.overview': 'نظرة عامة',
      'nav.about.founder': 'المؤسس',
      'nav.about.structure': 'الهيكل',
      'nav.about.qgf': 'مؤسسة QGF',
      'nav.about.mission': 'المهمة',
      'nav.about.testimonials': 'آراء المستخدمين',

      'nav.business.web2': 'ابتكار WEB2',
      'nav.business.core': 'النموذج الأساسي',
      'nav.business.future': 'الخطة المستقبلية',
      'nav.business.v5': 'استراتيجية V5',

      'nav.txo.origin': 'نشأة TXO',
      'nav.txo.founder': 'المؤسس',
      'nav.txo.team': 'فريق البحث والتطوير',
      'nav.txo.offline': 'خدمة OTC الميدانية',

      'nav.license.statement': 'بيان الشرعية والامتثال',
      'nav.license.verification': 'طريقة الاستعلام عن الشهادات',

      'profit.page_title': 'نظام الأرباح · إشارات التداول · الإحالة · فريق VIP',
      'profit.page_desc': 'تعرّف على نظام إشارات التداول وخطة الإحالة وفريق VIP وأمثلة الأرباح خلال 35 يومًا، وقدّر أداءك المركب باستخدام أدوات ذكية.',
      'profit.hero_title': 'أرباح متعددة الأبعاد<br>نمو مشترك',
      'profit.hero_desc': 'تبني Qicheng Holdings نظامًا شاملًا لتنمية الثروة عبر <span class="qc-text-highlight">إشارات التداول</span> و<span class="qc-text-highlight">مكافآت الإحالة</span> و<span class="qc-text-highlight">برنامج فريق VIP</span>.<br class="hidden sm:block">',
      'profit.hero_img_alt': 'نظام أرباح متعدد الأبعاد',
      'profit.signals_icon_alt': 'أيقونة إشارات التداول',
      'profit.signals_title': 'Trading Signals',
      'profit.signals_subtitle': 'إشارات تداول كمية بالذكاء الاصطناعي',
      'profit.signals_lead': 'إشارات موحدة عالميًا وتنفيذ بلا حدود',
      'profit.signals_desc': 'يرجى الالتزام الصارم بالقواعد: كل إشارة تُنفّذ بإدارة رأس مال ثابتة. نسخ التداول بنقرة عبر TXO لتقليل العتبة وتحسين الاتساق.',
      'profit.rules_title': 'قواعد التداول',
      'profit.rule_position_label': 'حجم الصفقة',
      'profit.rule_position_value': 'استخدام 2% من الرصيد لكل إشارة',
      'profit.rule_return_label': 'افتراض العائد',
      'profit.rule_return_value': 'متوسط ~50% لكل صفقة (≈ +1% من إجمالي الأصول)',
      'profit.rule_freq_label': 'تكرار الإشارات',
      'profit.rule_freq_value': '2–4 مرات يوميًا حسب العضوية',
      'profit.rule_miss_label': 'تفويت الإشارة',
      'profit.rule_miss_value': 'لا تعويض عن الإشارات الفائتة لأي سبب',
      'profit.perk_basic_title': 'مزايا العضوية الأساسية',
      'profit.perk_basic_desc': 'بعد الإيداع الأول تصبح عضوًا أساسيًا وتحصل دائمًا على إشارتين يوميًا. كل صفقة تستخدم 2% من الرصيد.',
      'profit.perk_honor_title': 'إشارة الشرف',
      'profit.perk_honor_desc': 'ادعُ عضوًا رسميًا واحدًا لتحصل على إشارة دائمة إضافية. كل صفقة تستخدم 2% من الرصيد.',
      'profit.perk_team_title': 'إشارة الفريق',
      'profit.perk_team_desc': 'ادعُ 3 أعضاء رسميين لتحصل على إشارة دائمة إضافية. كل صفقة تستخدم 2% من الرصيد.',
      'profit.perk_referral_title': 'مكافأة إشارة الإحالة',
      'profit.perk_referral_desc': 'ادعُ صديقًا: يحصل كل من الداعي والعضو الجديد على إشارة إضافية في نفس اليوم، مع 2% من الرصيد. يمكن تكديس المكافآت.',
      'profit.example_title': 'مثال',
      'profit.example_desc': 'مثال: رأس مال $1,000 وإشارتان يوميًا. بافتراض “+1% لكل إشارة”:',
      'profit.example_lines': 'نهاية اليوم 1 ≈ 1000 × 1.01² = 1020<br>نهاية اليوم 10 ≈ 1000 × 1.01^(2×10) = 1219<br>نهاية اليوم 35 ≈ 1000 × 1.01^(2×35) = 2000',
      'profit.cta_calculator': 'الانتقال إلى الحاسبة',
      'profit.factor_title': 'عامل التراكم',
      'profit.factor_desc': 'نمو مكافئ لكل إشارة',
      'profit.factor_card1_title': 'إجمالي الإشارات',
      'profit.factor_card1_desc': 'إشارات/يوم × أيام',
      'profit.factor_card2_title': 'النموذج',
      'profit.factor_card2_desc': 'الأصل × 1.01^إجمالي الإشارات',
      'profit.hours_title': 'ساعات التداول العالمية',
      'profit.hours_img_alt': 'ساعات التداول العالمية',
      'profit.hours_note': 'مرجع لأوقات النشاط حسب المناطق لتسهيل التنفيذ عبر المناطق الزمنية',
      'profit.referral_title': 'Referral Program',
      'profit.referral_subtitle': 'برنامج الإحالة',
      'profit.referral_desc': 'بعد الإيداع الأول (≥ $500) تصبح مؤهلًا بالكامل. عند تسجيل الصديق وإيداعه لأول مرة، يحصل الطرفان على مكافآت وإشارات إضافية.',
      'profit.referral_rules_title': 'القواعد',
      'profit.referral_rule1': 'يجب أن يكون إيداع العضو الجديد ≥ $500 وعلى الأقل 30% من رصيد الداعي.',
      'profit.referral_rule2': 'يحصل الطرفان على إشارة إضافية في نفس اليوم (2% من الرصيد).',
      'profit.referral_rule3': 'فتح الإشارة الثالثة بعد أول إحالة، والرابعة بعد ثالث إحالة.',
      'profit.referral_th_deposit': 'الإيداع الأول',
      'profit.referral_th_referrer': 'مكافأة الداعي',
      'profit.referral_th_new': 'مكافأة العضو الجديد',
      'profit.vip_title': 'VIP Team',
      'profit.vip_subtitle': 'ترقية فريق VIP',
      'profit.vip_desc': 'أحِل 6 أعضاء مباشرة لتصبح VIP وتتمتع بدخل سلبي دائم. تُحتسب عمولة الحجم على إجمالي حجم الفريق وتُسوى كل 10 أيام (2/12/22).',
      'profit.vip_th_level': 'المستوى',
      'profit.vip_th_team': 'حجم الفريق',
      'profit.vip_th_direct': 'إحالات مباشرة',
      'profit.vip_th_bonus': 'مكافأة الترقية',
      'profit.vip_th_commission': 'عمولة الحجم',
      'profit.reports_title': 'Profit Reports',
      'profit.reports_subtitle': 'أمثلة 35 يومًا',
      'profit.reports_desc': 'نموذج تراكم يعتمد على $1,000 و2–4 إشارات/يوم و2% لكل إشارة ومتوسط ~50% لكل صفقة (≈ +1% من الأصول).',
      'profit.report_basic_title': 'عضو أساسي (إشارتان/يوم)',
      'profit.report_honor_title': 'عضو شرف (3 إشارات/يوم)',
      'profit.report_team_title': 'عضو فريق (4 إشارات/يوم)',
      'profit.report_total_label': 'إجمالي الأصول المتوقع بعد 35 يومًا',
      'profit.day_1': 'اليوم 1',
      'profit.day_10': 'اليوم 10',
      'profit.day_20': 'اليوم 20',
      'profit.day_30': 'اليوم 30',
      'profit.cta_custom_calc': 'حساب مخصص',
      'profit.rail_aria': 'شريط النشاط',
      'profit.rail_tag_default': 'نشاط الإشارات',
      'profit.modal_aria': 'معاينة النشاط',
      'profit.modal_close': 'إغلاق',
      'profit.modal_title_default': 'إشارات · نشاط',
      'profit.activity_signals': 'إشارات',
      'profit.activity_referral': 'الإحالة',
      'profit.activity_vip': 'فريق VIP',
      'profit.activity_reports': 'جدول الأرباح',
      'profit.activity_suffix': 'نشاط',

      'nav.profit.signals': 'نظام إشارات التداول',
      'nav.profit.referral': 'برنامج الإحالة',
      'nav.profit.vip': 'برنامج فريق VIP',
      'nav.profit.reports': 'تقارير الأرباح',

      'footer.about_title': 'حول Qicheng',
      'footer.txo_title': 'منصة TXO',
      'footer.business_title': 'نموذج الأعمال',
      'footer.profit_title': 'نظام الأرباح',
      'footer.cta_title': 'هل أنت مستعد للتداول؟',
      'footer.cta_button': 'ابدأ التداول',
      'footer.tagline': 'منظمة تعاون عالمية للتمويل الرقمي والاقتصاد',

      'footer.quick.txo': 'منصة TXO',
      'footer.quick.business': 'نموذج الأعمال',
      'footer.quick.license': 'الامتثال والتراخيص',
      'footer.status_ok': 'جميع الأنظمة تعمل بشكل طبيعي',
      'footer.aria_quick_pages': 'صفحات سريعة',
      'footer.about.overview': 'نظرة عامة',
      'footer.about.founder': 'المؤسس',
      'footer.about.structure': 'الهيكل',
      'footer.about.qgf': 'مؤسسة QGF',
      'footer.about.mission': 'المهمة',
      'footer.about.timeline': 'المسار الزمني',
      'footer.about.testimonials': 'آراء المستخدمين',
      'footer.txo.origin': 'نشأة TXO',
      'footer.txo.founder': 'المؤسس',
      'footer.txo.team': 'فريق البحث والتطوير',
      'footer.txo.offline': 'خدمات OTC غير المتصلة',
      'footer.txo.license': 'الامتثال والتراخيص',
      'footer.business.web2': 'ابتكار WEB2',
      'footer.business.core': 'النموذج الأساسي',
      'footer.business.future': 'الخطة المستقبلية',
      'footer.business.v5': 'استراتيجية V5',
      'footer.profit.signals': 'نظام الإشارات',
      'footer.profit.referral': 'برنامج الإحالة',
      'footer.profit.vip': 'برنامج VIP',
      'footer.profit.reports': 'تقارير الأرباح',
      'footer.profit.calculator': 'الحاسبة',

      'home.hero_kicker': 'Qicheng Holdings Group',
      'home.hero_title': 'تعاون عالمي في التمويل الرقمي والاقتصاد',
      'home.hero_subtitle': 'انطلاقًا من لندن، نبني شبكة تعاون اقتصادي تغطي أكثر من 30 دولة، ترتكز على الشفافية والأمان والابتكار لربط التمويل الرقمي بالاقتصاد الحقيقي.',
      'home.hero_cta_business': 'استكشاف نموذج الأعمال',
      'home.hero_cta_txo': 'الدخول إلى منصة TXO',
      'home.london_title': 'لندن · حضور عالمي',
      'home.london_desc': 'تأسست مجموعة Qicheng Holdings Group (QCH) عام 2020 ويقع مقرها في لندن بالمملكة المتحدة. وفي بيئة مالية ناضجة ومنظمة، نبني بنية تحتية رقمية عالمية للاقتصاد مهيأة للمستقبل.',
      'home.london_cta_about': 'عن Qicheng',

      'home.flags_caption': 'نبني شبكة استثمار عالمية لاقتناص كل فرصة نمو.',

      'home.principles_title': 'خمسة مبادئ أساسية',
      'home.principles_subtitle': 'بناء شبكة قيمة عالمية موثوقة',
      'home.principles_desc': 'الشفافية والأمان والتعاون والابتكار والاستدامة هي منطق التصميم الأساسي لـ Qicheng لعصر الاقتصاد الرقمي العالمي. هذه الأبعاد الخمسة تتكامل لبناء منظومة مفتوحة وشاملة وجديرة بالثقة.',
      'home.principle_transparency_title': 'الشفافية',
      'home.principle_transparency_desc': 'نعتمد على شفافية البيانات والعمليات، وآليات إفصاح علنية لتعزيز الثقة والمواءمة التنظيمية، بحيث تكون كل صفقة وكل قرار قابلاً للتتبع.',
      'home.principle_security_title': 'الأمان',
      'home.principle_security_desc': 'ضمان تقني ومؤسسي مزدوج عبر تشفير متعدد الطبقات، وتحكم ذكي بالمخاطر، وتدقيق امتثال لحماية الأصول والمعلومات بأمان على مستوى البنوك.',
      'home.principle_collaboration_title': 'التعاون',
      'home.principle_collaboration_desc': 'نشجع التعاون عبر المناطق والقطاعات لبناء شبكة قيمة رابحة للجميع، وربط الموارد العالمية، وتحقيق المشاركة وخلق القيمة المشتركة.',
      'home.principle_innovation_title': 'الابتكار',
      'home.principle_innovation_desc': 'نستكشف باستمرار تطبيقات الذكاء الاصطناعي والبلوك تشين والبيانات الضخمة، ونقود ابتكار نماذج الأعمال عبر الابتكار التقني.',
      'home.principle_sustainability_title': 'الاستدامة',
      'home.principle_sustainability_desc': 'نركز على القيمة طويلة الأجل والمسؤولية الاجتماعية، ونربط الاقتصاد الرقمي بالتنمية الخضراء لبناء نماذج مستدامة لنمو صحي عالمي.',

      'home.txo_section_title': 'منصة TXO · بنية أصول رقمية',
      'home.txo_section_desc': 'تم بناء TXO بواسطة منظومة Qicheng مع نخبة من فرق التكنولوجيا والتمويل، بهدف إنشاء بنية تداول أصول رقمية عالية الأداء مع تحكم قوي بالمخاطر.',
      'home.txo_cta_detail': 'تفاصيل TXO',
      'home.txo_cta_license': 'عرض الامتثال والتراخيص',

      'home.bridge_quote': 'نحن ملتزمون دائمًا بدفع اقتصاد المشاركة وصناعة مستقبل مزدهر للجميع.',

      'home.testimonials_title': 'تجاوز التوقعات',
      'home.testimonials_desc': 'بفضل رؤى سوقية عميقة واستراتيجيات دقيقة، تلتزم Qicheng بخلق نمو ثروة مستقر على المدى الطويل.<br class="hidden sm:block">\n            ومع إرشادنا المهني يمكن لكل مستثمر التقدم بثبات في بيئة سوق معقدة.<br class="hidden sm:block">\n            كما أن التعاون العميق مع منصة TXO يوفر تجربة تداول لا مثيل لها.',

      'business.page_title': 'نموذج أعمال Qicheng · بنية الاقتصاد الرقمي',
      'business.page_desc': 'تعرّف على نموذج البنية التحتية للأعمال الذي تقترحه Qicheng Holdings Group: «الأصول الرقمية + البيانات القابلة للتحكم + السيناريوهات المترابطة + نظام تشغيل عالمي»، ومصفوفة الاستراتيجية العالمية V5.',
      'business.hero_title': 'حلقة بيئية مغلقة<br>خلق القيمة',
      'business.hero_desc': 'تقترح Qicheng Holdings Group نموذج بنية تحتية للأعمال «الأصول الرقمية + البيانات القابلة للتحكم + السيناريوهات المترابطة + نظام تشغيل عالمي».<br class="hidden sm:block"><span class="qc-text-highlight">هذا النموذج</span> يعالج بصورة منهجية تناقضات عصر Web2 البنيوية.',
      'business.web2_kicker': 'التحدي',
      'business.web2_title': 'التناقضات البنيوية في Web2',
      'business.web2_desc': 'في عالم Web2 اليوم، يخلق المستخدمون قيمة لكن يصعب عليهم الحصول على عائد يتناسب مع مساهماتهم. تستحوذ المنصات على معظم البيانات والقيمة، لتشكّل حلقة مغلقة عالية المركزية.',
      'business.web2_card1_title': 'اختلال القيمة',
      'business.web2_card1_desc': 'المستخدم يخلق قيمة لكن الأرباح تحتكرها المنصة',
      'business.web2_card2_title': 'جزر البيانات',
      'business.web2_card2_desc': 'تصعب على الشركات الحصول على بيانات مستخدمين حقيقية وقابلة للتحقق',
      'business.web2_card3_title': 'تقييد الابتكار',
      'business.web2_card3_desc': 'يُحصر الابتكار داخل منظومة واحدة مغلقة',
      'business.web2_card4_title': 'تكاليف مرتفعة',
      'business.web2_card4_desc': 'المنظومات المغلقة ترفع تكلفة اكتساب المستخدمين والتشغيل',
      'business.core_kicker': 'الركائز الأساسية',
      'business.core_title': 'تكامل أربعة مكونات تأسيسية',
      'business.core_module1_img_alt': 'تحويل البيانات إلى أصول',
      'business.core_module1_title': 'تحويل البيانات إلى أصول',
      'business.core_module1_desc': 'عبر آليات معيارية تصبح البيانات عوامل إنتاج «قابلة للتوثيق والتفويض والتسعير»، ما يكسر الاحتكار ويتيح تدفقًا آمنًا عبر سيناريوهات متعددة.',
      'business.core_module2_img_alt': 'دورة قيمة شفافة',
      'business.core_module2_title': 'دورة قيمة شفافة',
      'business.core_module2_desc': 'بالاعتماد على نظام سلسلة أعمال رقمية، تتبع السلوك وكفاءة سلسلة الإمداد من طرف إلى طرف لمواءمة التكلفة والعائد وتقليل الهدر ورفع الكفاءة.',
      'business.core_module3_img_alt': 'نظام بيئي مترابط',
      'business.core_module3_title': 'نظام بيئي مترابط',
      'business.core_module3_desc': 'كسر جزر البيانات وتحقيق التشغيل البيني بين التجارة الإلكترونية والألعاب والمنصات الاجتماعية والمحتوى، وبناء روابط قيمة عابرة للصناعات والمنصات.',
      'business.core_module4_img_alt': 'نظام تشغيل عالمي',
      'business.core_module4_title': 'نظام تشغيل عالمي',
      'business.core_module4_desc': 'بناء مراكز تشغيل وتقنية عالمية لمساعدة الشركات على التوسع دوليًا بسرعة وربط رأس المال والموارد العالمية وتشكيل شبكات صناعية متكاملة.',
      'business.future_kicker': 'مخطط المستقبل',
      'business.future_title': 'بنية تحتية اقتصادية جديدة',
      'business.future_card1_title': 'بنية تحتية للبيانات',
      'business.future_card1_desc': 'قاعدة بيانات عالية الأمان والتوافر وإطار لحوسبة الخصوصية لحماية سيادة البيانات.',
      'business.future_card2_title': 'محرك أعمال ذكي',
      'business.future_card2_desc': 'نظام قرار وتشغيل آلي مدفوع بالذكاء الاصطناعي لرفع كفاءة الأعمال.',
      'business.future_card3_title': 'ممر الاقتصاد الرقمي',
      'business.future_card3_desc': '«طريق سريع» لتداول القيمة والتسوية يربط أسواقًا متعددة لتعزيز التجارة عبر الحدود.',
      'business.v5_kicker': 'استراتيجية V5',
      'business.v5_title': 'مصفوفة الاستراتيجية العالمية V5',
      'business.v5_quote': 'من خمسة أبعاد: التقنية، الأصول، الأمن، الصناعة، والبنية التحتية—نرسم مسار التطور طويل الأجل لـ Qicheng Holdings Group.',
      'business.v5_chip1_title': 'التقنية',
      'business.v5_chip1_desc': 'تقنيات متقدمة تدفع الابتكار',
      'business.v5_chip2_title': 'الأصول',
      'business.v5_chip2_desc': 'الأصول الرقمية أساس القيمة',
      'business.v5_chip3_title': 'الأمن',
      'business.v5_chip3_desc': 'ضوابط مخاطر متعددة لضمان الأمان',
      'business.v5_chip4_title': 'الصناعة',
      'business.v5_chip4_desc': 'اندماج صناعي ونظام بيئي رابح للجميع',
      'business.v5_chip5_title': 'البنية التحتية',
      'business.v5_chip5_desc': 'بنية عالمية للترابط',

      'txo.page_title': 'منصة TXO لتداول العملات الرقمية · بنية أصول رقمية من Qicheng',
      'txo.page_desc': 'تعرّف على نشأة منصة TXO ورؤيتها ومعنى الاسم، والفريق المؤسس والدعم الرأسمالي العالمي، إلى جانب انتشار خدمات OTC غير المتصلة عالميًا.',
      'txo.section_vision_kicker': 'الرؤية',
      'txo.section_founder_kicker': 'المؤسس',
      'txo.section_team_kicker': 'القوة الأساسية',
      'txo.section_offline_kicker': 'خدمة عالمية',
      'txo.vision_title': 'فلسفة TXO الأساسية',
      'txo.vision_t_word': 'Titan / Trade',
      'txo.vision_x_word': 'eXchange / X-Economy',
      'txo.vision_o_word': 'Opportunity / Open',
      'txo.vision_t_desc': 'بنية تحتية قوية وموثوقة وقدرات تداول على مستوى عالمي',
      'txo.vision_x_desc': 'شكل اقتصادي عالمي من الجيل التالي موجّه للمستقبل',
      'txo.vision_o_desc': 'فرص مفتوحة ومشتركة لتدفق القيمة عالميًا',
      'txo.hero_title': 'بنية تحتية لتداول الأصول الرقمية<br>من الجيل التالي',
      'txo.hero_desc': 'تم تأسيس TXO بالشراكة بين Qihang Capital وHelios Chain Research Institute، بهدف إعادة تعريف تداول الأصول الرقمية عالميًا عبر <span class="qc-text-highlight">الكفاءة</span> و<span class="qc-text-highlight">الأمان</span> و<span class="qc-text-highlight">الذكاء</span>.',
      'txo.founder_title': 'حمض نووي مزدوج: التكنولوجيا والتمويل',
      'txo.founder_role': 'مؤسس TXO وكبير المعماريين',
      'txo.team_title': 'فريق نخبة ورأس مال عالمي',
      'txo.team_rnd_title': 'فريق بحث وتطوير متعدد التخصصات',
      'txo.team_rnd_1': 'خبراء الكوانت وإدارة المخاطر من Goldman Sachs وMorgan Stanley',
      'txo.team_rnd_2': 'معماريّو أنظمة موزعة من Google وMeta',
      'txo.team_rnd_3': 'مهندسو تشفير من مركز التشفير في MIT',
      'txo.team_capital_title': 'دعم رأسمالي عالمي',
      'txo.offline_title': 'شبكة تداول ميدانية',
      'txo.offline_desc': 'إلى جانب نظام المطابقة عبر الإنترنت، بنت TXO <span class="qc-text-highlight">شبكة تداول ميدانية</span> تغطي أهم المناطق عالميًا، لتقديم خدمات OTC آمنة وخاصة للمؤسسات وعملاء ذوي الملاءة العالية.',
      'txo.offline_card1_title': 'اعتماد رسمي',
      'txo.offline_card1_desc': 'اعتماد مؤهلات الجهات الإقليمية للتداول الميداني',
      'txo.offline_card2_title': 'امتثال وأمان',
      'txo.offline_card2_desc': 'تعزيز الامتثال وأمان الأموال في عمليات التداول',
      'txo.founder_p1': 'الدكتور أدريان كالدويل خبير معروف عالميًا في هندسة التمويل الموزع. تخرج في علوم الحاسوب من <span class="qc-text-highlight">جامعة ستانفورد</span>، ونال درجتي دكتوراه في الهندسة المالية من <span class="qc-text-highlight">إمبريال كوليدج لندن</span>.',
      'txo.founder_p2': 'شغل سابقًا دورًا محوريًا في فريق النمذجة الكمية لدى غولدمان ساكس. وفي عام 2019 أسس Helios Chain Research Institute للتركيز على أنظمة تسوية عالية الأداء وشبكات تحكم بالمخاطر موزعة. وتُعد TXO التطبيق المنهجي لنتائج أبحاثه.',

      'calc.page_title': 'حاسبة الأرباح · Qicheng Holdings Group',
      'calc.page_desc': 'استنادًا إلى إشارات Qicheng، أدخل المبلغ الأولي وعدد الإشارات اليومية والفترة لإنشاء جدول أرباح يومي.',
      'about.page_title': 'عن Qicheng · Qicheng Holdings Group',
      'about.page_desc': 'تعرّف على Qicheng Holdings Group: نظرة عامة، المؤسس، الهيكل العالمي، مؤسسة QGF، ورسالتنا وقيمنا.',
      'about.hero_title': 'بناء شبكة عالمية<br>للتعاون الرقمي',
      'about.hero_desc': 'تأسست Qicheng Holdings Group (QCH) في عام 2020 ومقرها لندن.<br class="hidden sm:block">نربط المراكز المالية حول العالم لبناء منظومة اقتصاد رقمي <span class="qc-text-highlight">شفافة</span> و<span class="qc-text-highlight">آمنة</span> و<span class="qc-text-highlight">مستدامة</span>.',
      'about.overview_kicker': 'الأساس',
      'about.overview_title': 'من لندن إلى العالم',
      'about.stat_founded': 'سنة التأسيس',
      'about.stat_countries': 'الدول المغطاة',
      'about.stat_aum': 'الأصول تحت الإدارة (AUM)',
      'about.intro_p1': 'منذ البداية وضعت QCH رؤية طموحة: <span class="qc-text-highlight">بناء شبكة تعاون للاقتصاد الرقمي عالميًا</span>. لسنا مجرد شركة استثمار؛ بل جسر يربط الأصول الرقمية بالاقتصاد الحقيقي.',
      'about.intro_p2': 'بالاعتماد على بيئة لندن التنظيمية الناضجة وبنيتها المالية وابتكارها المفتوح، بنت QCH خلال سنوات قليلة شبكة تعاون تغطي <span class="qc-text-highlight">30+</span> دولة ومنطقة.',
      'about.tab_compliance_title': 'تشغيل ممتثل',
      'about.tab_compliance_desc': 'تحمل TXO ترخيص MSB الأمريكي ومؤهلات الامتثال مع نظام تحكم بالمخاطر بمستوى مؤسسي.',
      'about.tab_tech_title': 'مدفوعة بالتقنية',
      'about.tab_tech_desc': 'دمج نماذج رائدة مثل OpenAI وGemini لبناء محرك تداول ذكي للأصول الرقمية.',
      'about.tab_ecosystem_title': 'منظومة رابحة للجميع',
      'about.tab_ecosystem_desc': 'تعاون عميق مع رأس مال عالمي رائد مثل Goldman Sachs وSequoia لبناء منظومة مالية مستدامة.',
      'about.img_compliance_alt': 'اعتمادات الامتثال',
      'about.img_tech_alt': 'شركاء التقنية',
      'about.img_ecosystem_alt': 'شركاء المنظومة',
      'about.partners_title': 'شركاؤنا',
      'about.partners_strip_alt': 'شريط شعارات الشركاء',
      'about.founder_kicker': 'القيادة',
      'about.founder_title': 'تلاقي الرياضيات والتقنية',
      'about.founder_role': 'الرئيس التنفيذي',
      'about.founder_p1': 'تخرج Robert Harrison من <span class="qc-text-highlight">جامعة أوكسفورد</span> متخصصًا في الرياضيات المالية والأنظمة الاقتصادية الناشئة، ولديه أكثر من 17 عامًا من الخبرة في التقنيات المالية العالمية وتخصيص الأصول والأطر التنظيمية العابرة للحدود.',
      'about.founder_p2': 'بصفته رائدًا في دمج تقنية البلوك تشين مع أسواق رأس المال التقليدية، شارك Robert في عدة مشاريع بنية تحتية رقمية عابرة للحدود. وتصفه وسائل إعلام دولية بأنه <span class="qc-text-highlight">شخصية محورية</span> في تطوير التمويل الرقمي عالميًا.',
      'about.founder_p3': 'تحت قيادته، تلتزم Qicheng Holdings Group بنماذج هيكلية صارمة ورؤية استراتيجية عالمية لتقديم <span class="qc-text-highlight">قيمة طويلة الأجل</span> للمستثمرين حول العالم.',
      'about.structure_kicker': 'الشبكة العالمية',
      'about.structure_title': 'تعاون متعدد التخصصات ومعرفة مشتركة',
      'about.structure_card1_title': 'خبراء تقنية',
      'about.structure_card1_desc': 'أفضل المواهب في الذكاء الاصطناعي والأنظمة الموزعة',
      'about.structure_card2_title': 'محللون ماليون',
      'about.structure_card2_desc': 'مستثمرون مؤسسيون برؤية سوقية دقيقة',
      'about.structure_card3_title': 'قادة صناعات',
      'about.structure_card3_desc': 'خبراء عمليّون في الطاقة والتصنيع والتعليم',
      'about.structure_card4_title': 'مستشارون اقتصاديون',
      'about.structure_card4_desc': 'باحثون ومستشارون متخصصون في سياسات دولية',
      'about.qgf_kicker': 'مؤسسة',
      'about.qgf_title': 'رأس مال طويل الأجل يدفع الابتكار',
      'about.qgf_quote': 'تدير QGF حاليًا نحو <span class="qc-text-highlight">780 مليون دولار</span> من الأصول (AUM)، وتدعم بنية الاقتصاد الرقمي عبر نماذج متعددة الأصول واستراتيجيات توزيع عالمية.',
      'about.qgf_card1_img_alt': 'رأس مال طويل الأجل',
      'about.qgf_card1_title': 'ضخ رأس مال طويل الأجل',
      'about.qgf_card1_desc': 'يمول بنسبة من صافي أرباح QCH السنوية لضمان قابلية توسع مستمرة.',
      'about.qgf_card2_img_alt': 'تعاون استراتيجي',
      'about.qgf_card2_title': 'تعاون رأسمالي استراتيجي',
      'about.qgf_card2_desc': 'شراكات وثيقة مع مؤسسات كبرى مثل Blackstone وSequoia وJPMorgan Chase.',
      'about.qgf_card3_img_alt': 'تحوط المخاطر',
      'about.qgf_card3_title': 'آليات التحوط من المخاطر',
      'about.qgf_card3_desc': 'إدارة مخاطر دقيقة لتقديم دعم تقني ومالي مستقر للشركاء عالميًا.',
      'about.mission_kicker': 'الرسالة والقيم',
      'about.mission_title': 'خمس قيم أساسية',
      'about.value_transparency_title': 'الشفافية',
      'about.value_transparency_desc': 'تعزيز الثقة عبر شفافية البيانات والعمليات.',
      'about.value_security_title': 'الأمان',
      'about.value_security_desc': 'حماية الأصول بضمانات تقنية وتنظيمية.',
      'about.value_collaboration_title': 'التعاون',
      'about.value_collaboration_desc': 'تعاون عابر للمناطق والقطاعات لبناء شبكة قيمة رابحة للجميع.',
      'about.value_innovation_title': 'الابتكار',
      'about.value_innovation_desc': 'استكشاف تطبيقات فعّالة للذكاء الاصطناعي والبلوك تشين في التمويل.',
      'about.value_sustainability_title': 'الاستدامة',
      'about.value_sustainability_desc': 'التركيز على القيمة طويلة الأجل ودمج الاقتصاد الرقمي بالتنمية الخضراء.',
      'about.resend_title': 'جعل التمويل الرقمي<br>بنية تحتية عامة عالمية',
      'about.resend_desc': 'متاح للجميع ويعود بالنفع على الجميع. نبني شبكة تدفق قيمة عالمية <span class="qc-text-highlight">شفافة</span> و<span class="qc-text-highlight">آمنة</span> و<span class="qc-text-highlight">ذكية</span> و<span class="qc-text-highlight">شاملة</span>.',
      'calc.hero_title': 'نمو الثروة<br>محاكاة ذكية',
      'calc.hero_desc': 'اعتمادًا على نموذج إشارات Qicheng، أدخل المبلغ الأولي والمدة لمعاينة كيف يمكن للفائدة المركبة أن تنمّي أصولك عبر الوقت.',
      'calc.hero_highlight_principal': 'المبلغ الأولي',
      'calc.hero_highlight_days': 'المدة',
      'calc.start_title': 'ابدأ الحساب',
      'calc.label_principal': 'المبلغ الأولي (USDT)',
      'calc.placeholder_principal': 'مثال: 1000',
      'calc.label_signals': 'عدد الإشارات يوميًا',
      'calc.option_signals_2': '2 / يوم (أساسي)',
      'calc.option_signals_3': '3 / يوم (شرف)',
      'calc.option_signals_4': '4 / يوم (فريق)',
      'calc.label_days': 'المدة (أيام)',
      'calc.placeholder_days': 'مثال: 35',
      'calc.submit': 'إنشاء المعاينة',
      'calc.error_invalid': 'يرجى إدخال مبلغ أولي وعدد أيام صالحين.',
      'calc.compound_title': 'ماهية الفائدة المركبة',
      'calc.acc_core': 'الفكرة الأساسية',
      'calc.core_paragraph': 'الفائدة المركبة ليست “ربحًا أكبر في مرة واحدة”، بل إعادة استثمار الأرباح عبر الزمن. المتغيرات الأساسية هي حجم النمو وعدد مرات التنفيذ.',
      'calc.core_highlight_growth': 'حجم النمو',
      'calc.core_highlight_times': 'عدد مرات التنفيذ',
      'calc.acc_formula': 'المعادلة',
      'calc.formula_model_label': 'النموذج',
      'calc.formula_line': 'النهائي = الأصل × (1 + Δ)<sup>n</sup>',
      'calc.formula_sub': 'Δ هو النمو المكافئ لكل إشارة، و n هو إجمالي عدد الإشارات (إشارات/يوم × أيام).',
      'calc.acc_adv': 'المزايا',
      'calc.adv_1_title': 'انضباط وقابلية للتكرار',
      'calc.adv_1_desc': 'قواعد ثابتة تقلل تأثير العاطفة وتزيد قابلية تكرار الاستراتيجية.',
      'calc.adv_2_title': 'تأثير تكرار الإشارات',
      'calc.adv_2_desc': 'مع نفس النمو، يزيد التكرار من تسارع المنحنى مبكرًا.',
      'calc.adv_3_title': 'مخاطر قابلة للتحكم',
      'calc.adv_3_desc': 'استخدام جزء صغير في كل صفقة يساعد على التحكم في تقلبات الحساب.',
      'calc.acc_org': 'هيكل الفريق',
      'calc.org_title': 'هيكل الفريق',
      'calc.org_subtitle': 'نظام ترقية مبني على “6 إحالات مباشرة”',
      'calc.org_captain_title': 'القائد (VIP)',
      'calc.org_captain_desc': 'يستفيد من مزايا ترقية الفريق',
      'calc.org_level1_user': 'مستخدم المستوى 1',
      'calc.summary_title': 'إجمالي الأصول المتوقعة',
      'calc.profit_suffix': '(الربح)',
      'calc.summary_details': 'المدة {days} يوم | إجمالي الإشارات {signals}',
      'calc.table_title': 'تفاصيل يومية',
      'calc.th_day': 'اليوم',
      'calc.th_signals': 'الإشارات',
      'calc.th_start': 'الرصيد بداية اليوم',
      'calc.th_profit': 'ربح اليوم',
      'calc.th_end': 'الرصيد نهاية اليوم',
      'calc.disclaimer': '* تنبيه: هذا حساب نظري وليس وعدًا استثماريًا. الاستثمار ينطوي على مخاطر.',
      'footer.status_operational': 'جميع الأنظمة تعمل بشكل طبيعي'
    },
    de: {
      'nav.logo_aria': 'Qicheng Holdings Group',
      'nav.logo_alt': 'Qicheng Holdings Group',
      'nav.home': 'Start',
      'nav.about': 'Qicheng',
      'nav.business': 'Geschäftsmodell',
      'nav.txo': 'TXO Börse',
      'nav.license': 'Compliance & Lizenzen',
      'nav.profit': 'Profit-System',
      'nav.calculator': 'Rechner',

      'nav.aria_main': 'Hauptnavigation',
      'nav.toggle': 'Navigation umschalten',

      'nav.about.overview': 'Überblick',
      'nav.about.founder': 'Gründer',
      'nav.about.structure': 'Struktur',
      'nav.about.qgf': 'QGF Stiftung',
      'nav.about.mission': 'Mission',
      'nav.about.testimonials': 'Testimonials',

      'nav.business.web2': 'WEB2-Innovation',
      'nav.business.core': 'Kernmodell',
      'nav.business.future': 'Zukunftsplan',
      'nav.business.v5': 'V5-Strategie',

      'nav.txo.origin': 'Ursprung von TXO',
      'nav.txo.founder': 'Gründer',
      'nav.txo.team': 'R&D Team',
      'nav.txo.offline': 'Offline-OTC-Service',

      'nav.license.statement': 'Erklärung zu Legalität & Compliance',
      'nav.license.verification': 'So prüfst du Zertifikate',

      'profit.page_title': 'Profit-System · Signale · Empfehlungsprogramm · VIP-Team',
      'profit.page_desc': 'Erfahre mehr über das Signal-System, das Empfehlungsprogramm, den VIP-Team-Plan und 35-Tage-Beispiele – und schätze deine Zinseszins-Performance mit smarten Tools.',
      'profit.hero_title': 'Mehrdimensionale Erträge<br>Gemeinsam wachsen',
      'profit.hero_desc': 'Qicheng Holdings schafft ein umfassendes Vermögenswachstumssystem durch globale <span class="qc-text-highlight">Trading-Signale</span>, <span class="qc-text-highlight">Empfehlungsprämien</span> und das <span class="qc-text-highlight">VIP-Team-Programm</span>.<br class="hidden sm:block">',
      'profit.hero_img_alt': 'Mehrdimensionales Ertragssystem',
      'profit.signals_icon_alt': 'Trading-Signal-Icon',
      'profit.signals_title': 'Trading Signals',
      'profit.signals_subtitle': 'AI-Quant-Signale',
      'profit.signals_lead': 'Einheitliche Signale weltweit, grenzenlose Ausführung',
      'profit.signals_desc': 'Bitte halte dich strikt an die Regeln: Jedes Signal wird mit festem Money-Management ausgeführt. Ein-Klick-Copy-Trading über TXO senkt die Hürde und erhöht die Konsistenz.',
      'profit.rules_title': 'Trading-Regeln',
      'profit.rule_position_label': 'Positionsgröße',
      'profit.rule_position_value': '2% des Kontos pro Signal',
      'profit.rule_return_label': 'Renditeannahme',
      'profit.rule_return_value': 'Ø ~50% pro Trade (≈ +1% Equity)',
      'profit.rule_freq_label': 'Frequenz',
      'profit.rule_freq_value': '2–4x/Tag je nach Mitgliedschaft',
      'profit.rule_miss_label': 'Verpasst',
      'profit.rule_miss_value': 'Keine Kompensation bei verpassten Signalen',
      'profit.perk_basic_title': 'Basis-Vorteile',
      'profit.perk_basic_desc': 'Nach der ersten Einzahlung bist du Basis-Mitglied und erhältst dauerhaft 2 Signale pro Tag. Jeder Trade nutzt 2% des Saldos.',
      'profit.perk_honor_title': 'Ehren-Signal',
      'profit.perk_honor_desc': '1 offizielles Mitglied einladen → 1 zusätzliches dauerhaftes Signal. Jeder Trade nutzt 2% des Saldos.',
      'profit.perk_team_title': 'Team-Signal',
      'profit.perk_team_desc': '3 offizielle Mitglieder einladen → 1 zusätzliches dauerhaftes Signal. Jeder Trade nutzt 2% des Saldos.',
      'profit.perk_referral_title': 'Empfehlungs-Signal',
      'profit.perk_referral_desc': 'Freund einladen: Einladender und neues Mitglied erhalten am selben Tag je 1 extra Signal (2% Balance). Mehrere Einladungen sind kumulierbar.',
      'profit.example_title': 'Beispiel',
      'profit.example_desc': 'Beispiel: $1,000 Startkapital, 2 Signale/Tag. Mit „+1% pro Signal“:',
      'profit.example_lines': 'Ende Tag 1 ≈ 1000 × 1.01² = 1020<br>Ende Tag 10 ≈ 1000 × 1.01^(2×10) = 1219<br>Ende Tag 35 ≈ 1000 × 1.01^(2×35) = 2000',
      'profit.cta_calculator': 'Zum Rechner',
      'profit.factor_title': 'Zinseszins-Faktor',
      'profit.factor_desc': 'Äquivalentes Wachstum pro Signal',
      'profit.factor_card1_title': 'Signale gesamt',
      'profit.factor_card1_desc': 'Signale/Tag × Tage',
      'profit.factor_card2_title': 'Modell',
      'profit.factor_card2_desc': 'Kapital × 1.01^Signale',
      'profit.hours_title': 'Globale Trading-Zeiten',
      'profit.hours_img_alt': 'Globale Trading-Zeiten',
      'profit.hours_note': 'Referenz aktiver Handelszeiten nach Region für Zeitzonen-übergreifende Ausführung',
      'profit.referral_title': 'Referral Program',
      'profit.referral_subtitle': 'Empfehlungsprogramm',
      'profit.referral_desc': 'Nach der ersten Einzahlung (≥ $500) bist du zu 100% berechtigt. Wenn dein Freund registriert und erstmals einzahlt, erhalten beide exklusive Rewards und zusätzliche Signale.',
      'profit.referral_rules_title': 'Regeln',
      'profit.referral_rule1': 'Ersteinzahlung ≥ $500 und mindestens 30% des Kontos des Empfeh-lenden.',
      'profit.referral_rule2': 'Beide erhalten am selben Tag ein zusätzliches Signal (2% Balance).',
      'profit.referral_rule3': '3. dauerhaftes Signal nach 1. Empfehlung, 4. nach der 3.',
      'profit.referral_th_deposit': 'Ersteinzahlung',
      'profit.referral_th_referrer': 'Prämie (Empfeh-lender)',
      'profit.referral_th_new': 'Prämie (Neues Mitglied)',
      'profit.vip_title': 'VIP Team',
      'profit.vip_subtitle': 'VIP-Team-Aufstieg',
      'profit.vip_desc': '6 direkte Mitglieder empfehlen → VIP-Qualifikation und dauerhaftes passives Einkommen. Volumenprovision wird über das Teamvolumen berechnet und alle 10 Tage ausgezahlt (2/12/22).',
      'profit.vip_th_level': 'Level',
      'profit.vip_th_team': 'Teamgröße',
      'profit.vip_th_direct': 'Direkt empfohlen',
      'profit.vip_th_bonus': 'Bonus',
      'profit.vip_th_commission': 'Volumen-Rabatt',
      'profit.reports_title': 'Profit Reports',
      'profit.reports_subtitle': '35-Tage-Beispiele',
      'profit.reports_desc': 'Zinseszins-Modell basierend auf $1,000, 2–4 Signale/Tag, 2% pro Signal und Ø ~50% Rendite (≈ +1% Equity).',
      'profit.report_basic_title': 'Basis (2 Signale/Tag)',
      'profit.report_honor_title': 'Ehre (3 Signale/Tag)',
      'profit.report_team_title': 'Team (4 Signale/Tag)',
      'profit.report_total_label': 'Geschätzte Assets nach 35 Tagen',
      'profit.day_1': 'Tag 1',
      'profit.day_10': 'Tag 10',
      'profit.day_20': 'Tag 20',
      'profit.day_30': 'Tag 30',
      'profit.cta_custom_calc': 'Individuell berechnen',
      'profit.rail_aria': 'Aktivitätsleiste',
      'profit.rail_tag_default': 'Signal-Aktivität',
      'profit.modal_aria': 'Aktivitätsvorschau',
      'profit.modal_close': 'Schließen',
      'profit.modal_title_default': 'Signale · Aktivität',
      'profit.activity_signals': 'Signale',
      'profit.activity_referral': 'Empfehlung',
      'profit.activity_vip': 'VIP-Team',
      'profit.activity_reports': 'Ertragstabelle',
      'profit.activity_suffix': 'Aktivität',

      'license.page_title': 'Globale Betriebslizenzen · TXO Compliance & Zertifizierung',
      'license.page_desc': 'Sieh dir die Compliance-Erklärung von TXO, die Registrierung im US-Bundesstaat New York und die Anleitung zur Zertifikatsprüfung an. Erfahre mehr über AML, KYC, Risikokontrolle und Datenschutz.',
      'license.hero_title': 'Globale Compliance<br>Basis der Sicherheit',
      'license.hero_desc': 'TXO Exchange wird von TXO COMPREHENSIVE SERVICE INC. betrieben.<br class="hidden sm:block">Rechtskonform im Bundesstaat New York (USA) registriert und mit einem <span class="qc-text-highlight">finanzstufigen</span> internen Kontrollsystem ausgestattet.',
      'license.statement_title': 'Legal Statement',
      'license.statement_subtitle': 'Rechtskonformer Betrieb',
      'license.statement_desc': 'TXO COMPREHENSIVE SERVICE INC. ist offiziell beim New York State Department of State registriert. Die Dokumentnummer lautet <span class="qc-text-highlight">260104000062</span>.',
      'license.aml_title': 'Geldwäscheprävention (AML)',
      'license.aml_desc': 'Strenge Prüfung der Herkunft von Geldern',
      'license.kyc_title': 'Identitätsprüfung (KYC)',
      'license.kyc_desc': 'Globales System zur Nutzer-Identitätsverifizierung',
      'license.risk_title': 'Risikokontrolle',
      'license.risk_desc': 'Echtzeit-Überwachung ungewöhnlicher Transaktionen',
      'license.privacy_title': 'Datenschutz',
      'license.privacy_desc': 'Bankenstarke Verschlüsselung für Nutzerdaten',
      'license.cert_company_title': 'Zertifikat einer in den USA autorisierten Gesellschaft',
      'license.cert_company_alt': 'TXO License 1',
      'license.cert_stock_title': 'TXO Aktienzertifikat',
      'license.cert_stock_alt': 'Stock Certificate',
      'license.verify_title': 'Verification',
      'license.verify_subtitle': 'Anleitung zur Zertifikatsprüfung',
      'license.step1_title': 'Offizielles System aufrufen',
      'license.step1_desc': 'Im Browser öffnen: <a href="https://apps.dos.ny.gov/publicInquiry/" target="_blank" style="color: #fff; text-decoration: underline;">https://apps.dos.ny.gov/publicInquiry/</a>',
      'license.step2_title': 'Firmennamen eingeben',
      'license.step2_desc': 'Im Feld Entity Name eintragen: <span class="qc-text-highlight">TXO COMPREHENSIVE SERVICE INC</span>',
      'license.step3_title': 'Ergebnis prüfen',
      'license.step3_desc': 'Auf Search klicken, um Registrierungsstatus, Gründungsdatum und weitere Details in der offiziellen Datenbank einzusehen.',

      'nav.profit.signals': 'Signal-System',
      'nav.profit.referral': 'Empfehlungsprogramm',
      'nav.profit.vip': 'VIP-Team-Programm',
      'nav.profit.reports': 'Ertragsberichte',

      'footer.about_title': 'Über Qicheng',
      'footer.txo_title': 'TXO Börse',
      'footer.business_title': 'Geschäftsmodell',
      'footer.profit_title': 'Profit-System',
      'footer.cta_title': 'Bereit zu traden?',
      'footer.cta_button': 'Jetzt traden',
      'footer.tagline': 'Globale Kooperationsorganisation für digitale Finanzen und Wirtschaft',

      'footer.quick.txo': 'TXO Börse',
      'footer.quick.business': 'Geschäftsmodell',
      'footer.quick.license': 'Compliance & Lizenzen',
      'footer.status_ok': 'Alle Systeme betriebsbereit',
      'footer.aria_quick_pages': 'Wichtige Seiten',
      'footer.about.overview': 'Überblick',
      'footer.about.founder': 'Gründer',
      'footer.about.structure': 'Struktur',
      'footer.about.qgf': 'QGF Stiftung',
      'footer.about.mission': 'Mission',
      'footer.about.timeline': 'Meilensteine',
      'footer.about.testimonials': 'Testimonials',
      'footer.txo.origin': 'Ursprung von TXO',
      'footer.txo.founder': 'Gründer',
      'footer.txo.team': 'R&D Team',
      'footer.txo.offline': 'Offline-OTC-Service',
      'footer.txo.license': 'Compliance & Lizenzen',
      'footer.business.web2': 'WEB2 Innovation',
      'footer.business.core': 'Kernmodell',
      'footer.business.future': 'Zukunftsplan',
      'footer.business.v5': 'V5 Strategie',
      'footer.profit.signals': 'Signal-System',
      'footer.profit.referral': 'Empfehlungsprogramm',
      'footer.profit.vip': 'VIP-Teamprogramm',
      'footer.profit.reports': 'Profit-Berichte',
      'footer.profit.calculator': 'Rechner',

      'home.hero_kicker': 'Qicheng Holdings Group',
      'home.hero_title': 'Globale Zusammenarbeit für digitale Finanzen & Wirtschaft',
      'home.hero_subtitle': 'Mit Sitz in London bauen wir ein wirtschaftliches Kooperationsnetzwerk in über 30 Ländern auf – getragen von Transparenz, Sicherheit und Innovation, um digitale Finanzen mit der Realwirtschaft zu verbinden.',
      'home.hero_cta_business': 'Geschäftsmodell ansehen',
      'home.hero_cta_txo': 'Zur TXO Börse',
      'home.london_title': 'London · Weltweite Präsenz',
      'home.london_desc': 'Die Qicheng Holdings Group (QCH) wurde 2020 gegründet und hat ihren Hauptsitz in London, Großbritannien. In einem reifen und gut regulierten Finanzumfeld bauen wir zukunftsorientierte globale digitale Wirtschafts-Infrastruktur auf.',
      'home.london_cta_about': 'Über Qicheng',

      'home.flags_caption': 'Wir bauen ein globales Investmentnetzwerk auf und nutzen jede Wachstumschance.',

      'home.principles_title': 'Fünf Kernprinzipien',
      'home.principles_subtitle': 'Ein vertrauenswürdiges globales Wertnetzwerk aufbauen',
      'home.principles_desc': 'Transparenz, Sicherheit, Zusammenarbeit, Innovation und Nachhaltigkeit bilden die grundlegende Designlogik von Qicheng für die globale digitale Wirtschaft. Diese fünf Dimensionen stützen sich gegenseitig und schaffen ein offenes, inklusives und vertrauenswürdiges Ökosystem.',
      'home.principle_transparency_title': 'Transparenz',
      'home.principle_transparency_desc': 'Auf Basis transparenter Daten und Prozesse, mit offenen Offenlegungsmechanismen zur Stärkung von Marktvertrauen und regulatorischer Akzeptanz – jede Transaktion und Entscheidung ist nachvollziehbar.',
      'home.principle_security_title': 'Sicherheit',
      'home.principle_security_desc': 'Technische und organisatorische Doppelsicherung: mehrschichtige Verschlüsselung, intelligentes Risikomanagement und Compliance-Audits schützen Vermögen und Informationen – Sicherheit auf Bankniveau.',
      'home.principle_collaboration_title': 'Zusammenarbeit',
      'home.principle_collaboration_desc': 'Fördert regionale und branchenübergreifende Kooperation, verbindet globale Ressourcen und ermöglicht Sharing und Co-Creation, um die digitale Wirtschaft gemeinsam voranzubringen.',
      'home.principle_innovation_title': 'Innovation',
      'home.principle_innovation_desc': 'Kontinuierliche Erkundung von KI, Blockchain und Big Data in Finanz- und Industriepraxis – technologische Innovation treibt Geschäftsmodell-Innovation.',
      'home.principle_sustainability_title': 'Nachhaltigkeit',
      'home.principle_sustainability_desc': 'Fokus auf langfristigen Wert und gesellschaftliche Verantwortung: Verknüpft digitale Wirtschaft mit grüner Entwicklung und schafft nachhaltige Modelle für gesundes globales Wachstum.',

      'home.txo_section_title': 'TXO Börse · Digitale Asset-Infrastruktur',
      'home.txo_section_desc': 'Im Qicheng-Ökosystem gemeinsam mit führenden Tech- und Finanzteams entwickelt: TXO baut eine neue Generation leistungsfähiger digitaler Trading-Infrastruktur mit starkem Risikomanagement.',
      'home.txo_cta_detail': 'TXO Details ansehen',
      'home.txo_cta_license': 'Compliance & Lizenzen',

      'home.bridge_quote': 'Wir fördern konsequent die Sharing Economy und schaffen eine Zukunft des Wohlstands für alle.',

      'home.testimonials_title': 'Über Erwartungen hinaus',
      'home.testimonials_desc': 'Mit tiefem Marktverständnis und präzisen Strategien schafft Qicheng langfristig stabiles Vermögenswachstum.<br class="hidden sm:block">\n            Mit unserer professionellen Begleitung kann jeder Investor auch in komplexen Märkten stetig vorankommen.<br class="hidden sm:block">\n            Die enge Zusammenarbeit mit der TXO-Plattform bietet zudem ein unvergleichliches Trading-Erlebnis.',

      'business.page_title': 'Qicheng Geschäftsmodell · Infrastruktur der digitalen Wirtschaft',
      'business.page_desc': 'Erfahre mehr über das Geschäfts‑Infrastrukturmodell von Qicheng Holdings Group: „Digitale Assets + Kontrollierbare Daten + Vernetzte Szenarien + Globales Betriebssystem“ sowie die globale V5‑Strategiematrix.',
      'business.hero_title': 'Geschlossener Ökokreislauf<br>Wertschöpfung',
      'business.hero_desc': 'Qicheng Holdings Group schlägt ein Geschäfts‑Infrastrukturmodell „Digitale Assets + Kontrollierbare Daten + Vernetzte Szenarien + Globales Betriebssystem“ vor.<br class="hidden sm:block"><span class="qc-text-highlight">Dieses Modell</span> löst systematisch die strukturellen Widersprüche der Web2‑Ära.',
      'business.web2_kicker': 'Die Herausforderung',
      'business.web2_title': 'Strukturelle Widersprüche von Web2',
      'business.web2_desc': 'In der heutigen Web2‑Welt schaffen Nutzer:innen Wert, erhalten jedoch oft keine angemessenen Erträge. Plattformen vereinnahmen den Großteil von Daten und Wert und bilden einen stark zentralisierten Closed Loop.',
      'business.web2_card1_title': 'Wert‑Mismatch',
      'business.web2_card1_desc': 'Nutzer:innen schaffen Wert, doch Gewinne werden von Plattformen monopolisiert',
      'business.web2_card2_title': 'Datensilos',
      'business.web2_card2_desc': 'Unternehmen kommen schwer an echte, verifizierbare Nutzerdaten',
      'business.web2_card3_title': 'Innovationsgrenzen',
      'business.web2_card3_desc': 'Innovation bleibt in einem einzelnen Ökosystem eingeschlossen',
      'business.web2_card4_title': 'Hohe Kosten',
      'business.web2_card4_desc': 'Geschlossene Ökosysteme erhöhen Akquise‑ und Betriebskosten',
      'business.core_kicker': 'Kernpfeiler',
      'business.core_title': 'Synergie aus vier Basismodulen',
      'business.core_module1_img_alt': 'Daten‑Assetisierung',
      'business.core_module1_title': 'Daten‑Assetisierung',
      'business.core_module1_desc': 'Durch Standardisierung werden Daten zu „zertifizierbaren, autorisierbaren und bepreisten“ Produktionsfaktoren – brechen Monopole auf und ermöglichen sicheren Multi‑Szenario‑Fluss.',
      'business.core_module2_img_alt': 'Transparenter Wertkreislauf',
      'business.core_module2_title': 'Transparenter Wertkreislauf',
      'business.core_module2_desc': 'Ein digitalisiertes Business‑Link‑System verfolgt Nutzerverhalten und Supply‑Chain‑Effizienz end‑to‑end, gleicht Kosten und Erträge präzise ab, reduziert Verschwendung und steigert Effizienz.',
      'business.core_module3_img_alt': 'Vernetztes Ökosystem',
      'business.core_module3_title': 'Vernetztes Ökosystem',
      'business.core_module3_desc': 'Datensilos aufbrechen, Interoperabilität zwischen E‑Commerce, Gaming, Social und Content schaffen und branchen‑ sowie plattformübergreifende Wertverbindungen aufbauen.',
      'business.core_module4_img_alt': 'Globales Betriebssystem',
      'business.core_module4_title': 'Globales Betriebssystem',
      'business.core_module4_desc': 'Globale Operations‑ und Tech‑Hubs aufbauen, Unternehmen beim schnellen internationalen Wachstum unterstützen, globales Kapital und Ressourcen anbinden und synergetische Industrienetzwerke formen.',
      'business.future_kicker': 'Zukunftsplan',
      'business.future_title': 'Neue Wirtschafts‑Infrastruktur',
      'business.future_card1_title': 'Dateninfrastruktur',
      'business.future_card1_desc': 'Ein hochsicheres, hochverfügbares Datenfundament und Privacy‑Computing‑Framework zum Schutz der Datensouveränität.',
      'business.future_card2_title': 'Intelligenter Business‑Motor',
      'business.future_card2_desc': 'KI‑gestützte Entscheidungen und automatisierte Operations zur Steigerung der Geschäftseffizienz.',
      'business.future_card3_title': 'Digitaler Wirtschaftskorridor',
      'business.future_card3_desc': 'Eine „Daten‑Autobahn“ für Wertzirkulation und Settlement, die mehrere Märkte verbindet und grenzüberschreitenden Handel fördert.',
      'business.v5_kicker': 'V5‑Strategie',
      'business.v5_title': 'Globale V5‑Strategiematrix',
      'business.v5_quote': 'Aus fünf Dimensionen – Technologie, Assets, Sicherheit, Industrie und Infrastruktur – skizziert Qicheng Holdings Group seinen langfristigen Entwicklungspfad.',
      'business.v5_chip1_title': 'Technologie',
      'business.v5_chip1_desc': 'Spitzentechnologie treibt Innovation',
      'business.v5_chip2_title': 'Assets',
      'business.v5_chip2_desc': 'Digitale Assets als Wertfundament',
      'business.v5_chip3_title': 'Sicherheit',
      'business.v5_chip3_desc': 'Mehrschichtige Risiko‑Kontrollen für Sicherheit',
      'business.v5_chip4_title': 'Industrie',
      'business.v5_chip4_desc': 'Industrie‑Integration, Win‑win‑Ökosystem',
      'business.v5_chip5_title': 'Infrastruktur',
      'business.v5_chip5_desc': 'Globale Infrastruktur für Vernetzung',

      'txo.page_title': 'TXO Krypto-Börse · Qicheng Digital-Asset-Infrastruktur',
      'txo.page_desc': 'Erfahre mehr über die Entstehung der TXO Krypto-Börse, Vision und Namensbedeutung, das Gründerteam und globale Kapitalunterstützung sowie den weltweiten Ausbau der Offline-OTC-Services.',
      'txo.section_vision_kicker': 'Vision',
      'txo.section_founder_kicker': 'Gründer',
      'txo.section_team_kicker': 'Kernstärke',
      'txo.section_offline_kicker': 'Globaler Service',
      'txo.vision_title': 'TXO Kernphilosophie',
      'txo.vision_t_word': 'Titan / Trade',
      'txo.vision_x_word': 'eXchange / X-Ökonomie',
      'txo.vision_o_word': 'Chance / Offen',
      'txo.vision_t_desc': 'Robuste, verlässliche Infrastruktur und Trading-Fähigkeit auf globalem Niveau',
      'txo.vision_x_desc': 'Eine zukunftsorientierte globale Wirtschaftsform der nächsten Generation',
      'txo.vision_o_desc': 'Offene, geteilte Chancen für den globalen Wertfluss',
      'txo.hero_title': 'Next-Gen Infrastruktur<br>für Digital-Asset-Trading',
      'txo.hero_desc': 'TXO wurde von Qihang Capital und dem Helios Chain Research Institute mitgegründet und definiert globales Digital-Asset-Trading neu – mit <span class="qc-text-highlight">Effizienz</span>, <span class="qc-text-highlight">Sicherheit</span> und <span class="qc-text-highlight">Intelligenz</span>.',
      'txo.founder_title': 'Eine doppelte DNA aus Technologie und Finanzen',
      'txo.founder_role': 'TXO Gründer & Chefarchitekt',
      'txo.team_title': 'Spitzenteam und globales Kapital',
      'txo.team_rnd_title': 'Interdisziplinäres R&D-Team',
      'txo.team_rnd_1': 'Quant- und Risk-Control-Experten von Goldman Sachs und Morgan Stanley',
      'txo.team_rnd_2': 'Architekten für verteilte Systeme von Google und Meta',
      'txo.team_rnd_3': 'Kryptographie-Ingenieure aus dem MIT Cryptography Center',
      'txo.team_capital_title': 'Globale Kapitalunterstützung',
      'txo.offline_title': 'Offline-Trading-Netzwerk',
      'txo.offline_desc': 'Neben dem Online-Matching-System hat TXO ein <span class="qc-text-highlight">Offline-Trading-Netzwerk</span> in den wichtigsten Regionen weltweit aufgebaut und bietet sichere, diskrete OTC-Services für Institutionen und vermögende Kunden.',
      'txo.offline_card1_title': 'Offizielle Zertifizierung',
      'txo.offline_card1_desc': 'Qualifikationszertifizierung regionaler Offline-Trading-Institutionen',
      'txo.offline_card2_title': 'Compliance & Sicherheit',
      'txo.offline_card2_desc': 'Mehr Compliance und höhere Fondssicherheit beim Trading',
      'txo.founder_p1': 'Dr. Adrian Caldwell ist ein international anerkannter Experte für verteilte Finanzarchitektur. Er studierte Informatik an der <span class="qc-text-highlight">Stanford University</span> und erwarb zwei Doktortitel in Financial Engineering am <span class="qc-text-highlight">Imperial College London</span>.',
      'txo.founder_p2': 'Zuvor war er Kernmitglied des Quant-Modeling-Teams von Goldman Sachs. 2019 gründete er das Helios Chain Research Institute mit Fokus auf Hochleistungs-Clearing-Systeme und verteilte Risikokontrollnetzwerke. TXO ist die systematische Umsetzung seiner Forschungsergebnisse.',

      'calc.page_title': 'Gewinnrechner · Qicheng Holdings Group',
      'calc.page_desc': 'Basierend auf Qicheng-Signalen: Gib Startbetrag, Signale pro Tag und Zeitraum ein, um eine tägliche Gewinnübersicht zu erstellen.',
      'about.page_title': 'Über Qicheng · Qicheng Holdings Group',
      'about.page_desc': 'Erfahre mehr über Qicheng Holdings Group: Überblick, Gründer, globale Struktur, QGF Stiftung sowie Mission und Werte.',
      'about.hero_title': 'Aufbau eines globalen<br>digitalen Kollaborationsnetzwerks',
      'about.hero_desc': 'Qicheng Holdings Group (QCH) wurde 2020 gegründet und hat ihren Hauptsitz in London.<br class="hidden sm:block">Wir vernetzen globale Finanzzentren und bauen ein digitales Ökosystem auf, das <span class="qc-text-highlight">transparent</span>, <span class="qc-text-highlight">sicher</span> und <span class="qc-text-highlight">nachhaltig</span> ist.',
      'about.overview_kicker': 'Die Grundlage',
      'about.overview_title': 'In London verwurzelt, weltweit vernetzt',
      'about.stat_founded': 'Gründungsjahr',
      'about.stat_countries': 'Abgedeckte Länder',
      'about.stat_aum': 'Verwaltetes Vermögen (AUM)',
      'about.intro_p1': 'Von Anfang an verfolgte QCH eine große Vision: <span class="qc-text-highlight">Aufbau eines globalen Kollaborationsnetzwerks für die digitale Wirtschaft</span>. Wir sind nicht nur eine Investmentgesellschaft – wir sind eine Brücke zwischen digitalen Assets und der Realwirtschaft.',
      'about.intro_p2': 'Gestützt auf Londons reifes regulatorisches Umfeld, starke Finanzinfrastruktur und ein offenes Innovationsökosystem hat QCH in wenigen Jahren ein Netzwerk über <span class="qc-text-highlight">30+</span> Länder und Regionen aufgebaut.',
      'about.tab_compliance_title': 'Compliance',
      'about.tab_compliance_desc': 'TXO verfügt über die US‑MSB‑Lizenz und Compliance‑Qualifikationen und setzt auf institutionelles Risikomanagement.',
      'about.tab_tech_title': 'Technologie',
      'about.tab_tech_desc': 'Integration führender KI‑Modelle wie OpenAI und Gemini für eine intelligente Trading‑Engine.',
      'about.tab_ecosystem_title': 'Ökosystem‑Win‑Win',
      'about.tab_ecosystem_desc': 'Enge Zusammenarbeit mit globalem Top‑Kapital (z. B. Goldman Sachs, Sequoia) für ein nachhaltiges Finanzökosystem.',
      'about.img_compliance_alt': 'Compliance‑Nachweise',
      'about.img_tech_alt': 'Technologiepartner',
      'about.img_ecosystem_alt': 'Ökosystempartner',
      'about.partners_title': 'Unsere Partner',
      'about.partners_strip_alt': 'Partner‑Logo‑Leiste',
      'about.founder_kicker': 'Leadership',
      'about.founder_title': 'Mathematik trifft Technologie',
      'about.founder_role': 'Chief Executive Officer',
      'about.founder_p1': 'Robert Harrison absolvierte die <span class="qc-text-highlight">University of Oxford</span> mit Schwerpunkt Finanzmathematik und aufstrebende Wirtschaftssysteme. Er verfügt über mehr als 17 Jahre Erfahrung in globaler Fintech, Asset Allocation und grenzüberschreitenden Regulierungsrahmen.',
      'about.founder_p2': 'Als Pionier an der Schnittstelle von Blockchain‑Technologie und traditionellen Kapitalmärkten war Robert an mehreren multinationalen Projekten für digitale Finanzinfrastruktur beteiligt. Internationale Medien bezeichnen ihn als <span class="qc-text-highlight">Schlüsselfigur</span> der globalen digitalen Finanzentwicklung.',
      'about.founder_p3': 'Unter Roberts Führung setzt Qicheng Holdings Group auf strenge Strukturmodelle und eine globale Strategie – und erschließt <span class="qc-text-highlight">langfristigen Wert</span> für Investoren weltweit.',
      'about.structure_kicker': 'Global Network',
      'about.structure_title': 'Interdisziplinäre Zusammenarbeit, gebündelte Expertise',
      'about.structure_card1_title': 'Technologie‑Experten',
      'about.structure_card1_desc': 'Spitzentalente in KI und verteilten Systemen',
      'about.structure_card2_title': 'Finanzanalysten',
      'about.structure_card2_desc': 'Institutionelle Investoren mit scharfem Marktgespür',
      'about.structure_card3_title': 'Branchenführer',
      'about.structure_card3_desc': 'Erfahrene Macher in Energie, Fertigung und Bildung',
      'about.structure_card4_title': 'Wirtschaftsberater',
      'about.structure_card4_desc': 'Autoritative Forscher und Berater für internationale Politik',
      'about.qgf_kicker': 'Foundation',
      'about.qgf_title': 'Langfristiges Kapital, das Innovation antreibt',
      'about.qgf_quote': 'QGF verwaltet derzeit rund <span class="qc-text-highlight">780 Mio. USD</span> AUM und unterstützt die digitale Infrastruktur durch Multi‑Asset‑Modelle und globale Distributionsstrategien.',
      'about.qgf_card1_img_alt': 'Langfristiges Kapital',
      'about.qgf_card1_title': 'Langfristige Kapitalzufuhr',
      'about.qgf_card1_desc': 'Proportional aus dem jährlichen Nettogewinn von QCH finanziert – für nachhaltige Skalierbarkeit.',
      'about.qgf_card2_img_alt': 'Strategische Partnerschaften',
      'about.qgf_card2_title': 'Strategische Kapitalpartnerschaften',
      'about.qgf_card2_desc': 'Enge Zusammenarbeit mit Top‑Institutionen wie Blackstone, Sequoia und JPMorgan Chase.',
      'about.qgf_card3_img_alt': 'Risikohandel',
      'about.qgf_card3_title': 'Risikohandhabungs‑Mechanismen',
      'about.qgf_card3_desc': 'Feingranulares Risikomanagement liefert stabilen technischen und finanziellen Support für globale Partner.',
      'about.mission_kicker': 'Mission & Values',
      'about.mission_title': 'Fünf Kernwerte',
      'about.value_transparency_title': 'Transparenz',
      'about.value_transparency_desc': 'Vertrauen durch transparente Daten und Prozesse stärken.',
      'about.value_security_title': 'Sicherheit',
      'about.value_security_desc': 'Assets durch technische und organisatorische Schutzmaßnahmen sichern.',
      'about.value_collaboration_title': 'Zusammenarbeit',
      'about.value_collaboration_desc': 'Regions‑ und branchenübergreifend für ein Win‑Win‑Wertenetzwerk.',
      'about.value_innovation_title': 'Innovation',
      'about.value_innovation_desc': 'Effektive Anwendungen von KI und Blockchain im Finanzbereich vorantreiben.',
      'about.value_sustainability_title': 'Nachhaltigkeit',
      'about.value_sustainability_desc': 'Langfristigen Wert fokussieren und digitale Wirtschaft mit grüner Entwicklung verbinden.',
      'about.resend_title': 'Digitale Finanzen<br>als globale öffentliche Infrastruktur',
      'about.resend_desc': 'Für alle zugänglich, für alle nützlich. Wir bauen ein globales Wertfluss‑Netzwerk auf, das <span class="qc-text-highlight">transparent</span>, <span class="qc-text-highlight">sicher</span>, <span class="qc-text-highlight">intelligent</span> und <span class="qc-text-highlight">inklusiv</span> ist.',
      'calc.hero_title': 'Vermögenswachstum<br>Intelligente Simulation',
      'calc.hero_desc': 'Basierend auf dem Qicheng-Signalmodell: Gib deinen Startbetrag und Zeitraum ein, um den Zinseszinseffekt zu sehen.',
      'calc.hero_highlight_principal': 'Startbetrag',
      'calc.hero_highlight_days': 'Zeitraum',
      'calc.start_title': 'Berechnung starten',
      'calc.label_principal': 'Startbetrag (USDT)',
      'calc.placeholder_principal': 'z. B. 1000',
      'calc.label_signals': 'Signale pro Tag',
      'calc.option_signals_2': '2 / Tag (Basic)',
      'calc.option_signals_3': '3 / Tag (Honor)',
      'calc.option_signals_4': '4 / Tag (Team)',
      'calc.label_days': 'Zeitraum (Tage)',
      'calc.placeholder_days': 'z. B. 35',
      'calc.submit': 'Vorschau erstellen',
      'calc.error_invalid': 'Bitte gib einen gültigen Startbetrag und gültige Tage ein.',
      'calc.compound_title': 'Zinseszins erklärt',
      'calc.acc_core': 'Kernidee',
      'calc.core_paragraph': 'Zinseszins bedeutet nicht „einmal mehr gewinnen“, sondern Gewinne über Zeit reinvestieren. Die Schlüsselvariablen sind Wachstumsrate und Ausführungsanzahl.',
      'calc.core_highlight_growth': 'Wachstumsrate',
      'calc.core_highlight_times': 'Ausführungen',
      'calc.acc_formula': 'Formel',
      'calc.formula_model_label': 'Modell',
      'calc.formula_line': 'Endwert = Kapital × (1 + Δ)<sup>n</sup>',
      'calc.formula_sub': 'Δ ist das Wachstum pro Signal; n ist die Gesamtanzahl der Signale (Signale/Tag × Tage).',
      'calc.acc_adv': 'Vorteile',
      'calc.adv_1_title': 'Disziplin & Reproduzierbarkeit',
      'calc.adv_1_desc': 'Feste Regeln reduzieren Emotionen und erhöhen die Wiederholbarkeit.',
      'calc.adv_2_title': 'Frequenz-Effekt',
      'calc.adv_2_desc': 'Bei gleichem Wachstum beschleunigt höhere Frequenz die Kurve früher.',
      'calc.adv_3_title': 'Kontrollierbares Risiko',
      'calc.adv_3_desc': 'Nur ein kleiner Anteil pro Trade hält Schwankungen kontrollierbar.',
      'calc.acc_org': 'Teamstruktur',
      'calc.org_title': 'Teamstruktur',
      'calc.org_subtitle': 'Beförderungssystem basierend auf „6 direkten Empfehlungen“',
      'calc.org_captain_title': 'Kapitän (VIP)',
      'calc.org_captain_desc': 'Genießt Team-Aufstiegsvorteile',
      'calc.org_level1_user': 'Nutzer Stufe 1',
      'calc.summary_title': 'Geschätztes Endvermögen',
      'calc.profit_suffix': '(Gewinn)',
      'calc.summary_details': 'Zeitraum {days} Tage | Signale gesamt {signals}',
      'calc.table_title': 'Tägliche Übersicht',
      'calc.th_day': 'Tag',
      'calc.th_signals': 'Signale',
      'calc.th_start': 'Startsaldo',
      'calc.th_profit': 'Tagesgewinn',
      'calc.th_end': 'Endsaldo',
      'calc.disclaimer': '* Hinweis: Theoretische Berechnung, keine Anlagezusage. Investieren ist riskant.',
      'footer.status_operational': 'Alle Systeme betriebsbereit'
    },
    ru: {
      'nav.logo_aria': 'Qicheng Holdings Group',
      'nav.logo_alt': 'Qicheng Holdings Group',
      'nav.home': 'Главная',
      'nav.about': 'Qicheng',
      'nav.business': 'Бизнес-модель',
      'nav.txo': 'Биржа TXO',
      'nav.license': 'Комплаенс и лицензии',
      'nav.profit': 'Система прибыли',
      'nav.calculator': 'Калькулятор',

      'nav.aria_main': 'Основная навигация',
      'nav.toggle': 'Переключить навигацию',

      'nav.about.overview': 'Обзор',
      'nav.about.founder': 'Основатель',
      'nav.about.structure': 'Структура',
      'nav.about.qgf': 'Фонд QGF',
      'nav.about.mission': 'Миссия',
      'nav.about.testimonials': 'Отзывы',

      'nav.business.web2': 'Инновации WEB2',
      'nav.business.core': 'Ключевая модель',
      'nav.business.future': 'План на будущее',
      'nav.business.v5': 'Стратегия V5',

      'nav.txo.origin': 'Происхождение TXO',
      'nav.txo.founder': 'Основатель',
      'nav.txo.team': 'Команда R&D',
      'nav.txo.offline': 'Оффлайн OTC сервис',

      'nav.license.statement': 'Заявление о легальности и соответствии',
      'nav.license.verification': 'Как проверить сертификаты',

      'profit.page_title': 'Система прибыли · Сигналы · Рефералы · VIP-команда',
      'profit.page_desc': 'Узнайте о системе торговых сигналов, реферальной программе, VIP-команде и примерах за 35 дней, а также оцените свою сложную доходность с помощью умных инструментов.',
      'profit.hero_title': 'Многомерная прибыль<br>Совместный рост',
      'profit.hero_desc': 'Qicheng Holdings выстраивает комплексную систему роста капитала через глобальные <span class="qc-text-highlight">торговые сигналы</span>, <span class="qc-text-highlight">реферальные награды</span> и <span class="qc-text-highlight">VIP-командную программу</span>.<br class="hidden sm:block">',
      'profit.hero_img_alt': 'Многомерная система прибыли',
      'profit.signals_icon_alt': 'Иконка торговых сигналов',
      'profit.signals_title': 'Trading Signals',
      'profit.signals_subtitle': 'AI-квантовые сигналы',
      'profit.signals_lead': 'Единые сигналы по миру, исполнение без границ',
      'profit.signals_desc': 'Строго следуйте правилам: каждый сигнал выполняется по фиксированному управлению капиталом. Копируйте сделки в один клик через TXO, снижая порог и повышая консистентность.',
      'profit.rules_title': 'Правила торговли',
      'profit.rule_position_label': 'Размер позиции',
      'profit.rule_position_value': '2% баланса на один сигнал',
      'profit.rule_return_label': 'Допущение по доходности',
      'profit.rule_return_value': 'В среднем ~50% за сделку (≈ +1% к капиталу)',
      'profit.rule_freq_label': 'Частота сигналов',
      'profit.rule_freq_value': '2–4 раза в день в зависимости от уровня',
      'profit.rule_miss_label': 'Пропуск',
      'profit.rule_miss_value': 'Компенсация за пропущенные сигналы не предоставляется',
      'profit.perk_basic_title': 'Базовые преимущества',
      'profit.perk_basic_desc': 'После первого пополнения вы становитесь базовым участником и получаете 2 сигнала в день навсегда. Каждая сделка — 2% баланса.',
      'profit.perk_honor_title': 'Почётный сигнал',
      'profit.perk_honor_desc': 'Пригласите 1 официального участника и получите 1 дополнительный постоянный сигнал. Каждая сделка — 2% баланса.',
      'profit.perk_team_title': 'Командный сигнал',
      'profit.perk_team_desc': 'Пригласите 3 официальных участника и получите 1 дополнительный постоянный сигнал. Каждая сделка — 2% баланса.',
      'profit.perk_referral_title': 'Реферальный сигнал',
      'profit.perk_referral_desc': 'Пригласите друга: пригласивший и новый участник в тот же день получают по 1 дополнительному сигналу (2% баланса). Награды суммируются.',
      'profit.example_title': 'Пример',
      'profit.example_desc': 'Пример: $1,000 старт, 2 сигнала/день. При “+1% на сигнал”:',
      'profit.example_lines': 'Конец дня 1 ≈ 1000 × 1.01² = 1020<br>Конец дня 10 ≈ 1000 × 1.01^(2×10) = 1219<br>Конец дня 35 ≈ 1000 × 1.01^(2×35) = 2000',
      'profit.cta_calculator': 'Перейти к калькулятору',
      'profit.factor_title': 'Фактор сложного процента',
      'profit.factor_desc': 'Эквивалентный рост на сигнал',
      'profit.factor_card1_title': 'Сигналов всего',
      'profit.factor_card1_desc': 'Сигналов/день × Дни',
      'profit.factor_card2_title': 'Модель',
      'profit.factor_card2_desc': 'Капитал × 1.01^Сигналы',
      'profit.hours_title': 'Глобальные часы торговли',
      'profit.hours_img_alt': 'Глобальные часы торговли',
      'profit.hours_note': 'Справочник активных часов по регионам для межчасового исполнения',
      'profit.referral_title': 'Referral Program',
      'profit.referral_subtitle': 'Реферальная программа',
      'profit.referral_desc': 'После первого депозита (≥ $500) вы на 100% получаете право на награды. Когда друг зарегистрируется и сделает первый депозит, обе стороны получают награды и дополнительные сигналы.',
      'profit.referral_rules_title': 'Правила',
      'profit.referral_rule1': 'Первый депозит нового участника ≥ $500 и минимум 30% от баланса пригласившего.',
      'profit.referral_rule2': 'Оба получают дополнительный сигнал в тот же день (2% баланса).',
      'profit.referral_rule3': '3-й постоянный сигнал после 1-й рекомендации; 4-й после 3-й.',
      'profit.referral_th_deposit': 'Первый депозит',
      'profit.referral_th_referrer': 'Награда пригласившего',
      'profit.referral_th_new': 'Награда новичка',
      'profit.vip_title': 'VIP Team',
      'profit.vip_subtitle': 'Повышение VIP-команды',
      'profit.vip_desc': 'Пригласите 6 участников напрямую, чтобы стать VIP и получать постоянный пассивный доход. Комиссия по объёму считается по общему объёму команды и выплачивается каждые 10 дней (2/12/22).',
      'profit.vip_th_level': 'Уровень',
      'profit.vip_th_team': 'Размер команды',
      'profit.vip_th_direct': 'Прямые приглашения',
      'profit.vip_th_bonus': 'Бонус',
      'profit.vip_th_commission': 'Ребейт по объёму',
      'profit.reports_title': 'Profit Reports',
      'profit.reports_subtitle': 'Пример за 35 дней',
      'profit.reports_desc': 'Модель сложного процента на базе $1,000, 2–4 сигнала/день, 2% на сигнал и ~50% средн. доходности (≈ +1% капитала).',
      'profit.report_basic_title': 'Базовый (2 сигнала/день)',
      'profit.report_honor_title': 'Почётный (3 сигнала/день)',
      'profit.report_team_title': 'Командный (4 сигнала/день)',
      'profit.report_total_label': 'Оценка активов через 35 дней',
      'profit.day_1': 'День 1',
      'profit.day_10': 'День 10',
      'profit.day_20': 'День 20',
      'profit.day_30': 'День 30',
      'profit.cta_custom_calc': 'Посчитать индивидуально',
      'profit.rail_aria': 'Лента активности',
      'profit.rail_tag_default': 'Активность сигналов',
      'profit.modal_aria': 'Просмотр активности',
      'profit.modal_close': 'Закрыть',
      'profit.modal_title_default': 'Сигналы · Активность',
      'profit.activity_signals': 'Сигналы',
      'profit.activity_referral': 'Рефералы',
      'profit.activity_vip': 'VIP-команда',
      'profit.activity_reports': 'Таблица дохода',
      'profit.activity_suffix': 'Активность',

      'license.page_title': 'Глобальные лицензии · Комплаенс и сертификация TXO',
      'license.page_desc': 'Ознакомьтесь с заявлением о комплаенсе TXO, регистрацией в штате Нью-Йорк и инструкцией по проверке официальных сертификатов. Узнайте про AML, KYC, риск-контроль и защиту приватности данных.',
      'license.hero_title': 'Глобальный комплаенс<br>Основа безопасности',
      'license.hero_desc': 'TXO Exchange управляется компанией TXO COMPREHENSIVE SERVICE INC.<br class="hidden sm:block">Законно зарегистрирована в штате Нью-Йорк (США) и выстроила <span class="qc-text-highlight">финансового уровня</span> систему внутреннего контроля.',
      'license.statement_title': 'Legal Statement',
      'license.statement_subtitle': 'Законная и комплаентная работа',
      'license.statement_desc': 'TXO COMPREHENSIVE SERVICE INC. официально зарегистрирована в офисе секретаря штата Нью-Йорк (Department of State). Номер документа: <span class="qc-text-highlight">260104000062</span>.',
      'license.aml_title': 'AML',
      'license.aml_desc': 'Строгая проверка источников средств',
      'license.kyc_title': 'KYC',
      'license.kyc_desc': 'Глобальная система идентификации пользователей',
      'license.risk_title': 'Риск-контроль',
      'license.risk_desc': 'Мониторинг аномальных транзакций в реальном времени',
      'license.privacy_title': 'Приватность данных',
      'license.privacy_desc': 'Банковское шифрование пользовательских данных',
      'license.cert_company_title': 'Сертификат компании, авторизованной в США',
      'license.cert_company_alt': 'TXO License 1',
      'license.cert_stock_title': 'Сертификат акций TXO',
      'license.cert_stock_alt': 'Stock Certificate',
      'license.verify_title': 'Verification',
      'license.verify_subtitle': 'Инструкция по проверке сертификатов',
      'license.step1_title': 'Откройте официальный сервис',
      'license.step1_desc': 'Перейдите в браузере: <a href="https://apps.dos.ny.gov/publicInquiry/" target="_blank" style="color: #fff; text-decoration: underline;">https://apps.dos.ny.gov/publicInquiry/</a>',
      'license.step2_title': 'Введите название компании',
      'license.step2_desc': 'В поле Entity Name введите: <span class="qc-text-highlight">TXO COMPREHENSIVE SERVICE INC</span>',
      'license.step3_title': 'Посмотрите результат',
      'license.step3_desc': 'Нажмите Search, чтобы увидеть статус регистрации, дату основания и другие сведения в официальной базе.',

      'nav.profit.signals': 'Система сигналов',
      'nav.profit.referral': 'Реферальная программа',
      'nav.profit.vip': 'VIP программа',
      'nav.profit.reports': 'Отчеты по доходности',

      'footer.about_title': 'О Qicheng',
      'footer.txo_title': 'Биржа TXO',
      'footer.business_title': 'Бизнес-модель',
      'footer.profit_title': 'Система прибыли',
      'footer.cta_title': 'Готовы торговать?',
      'footer.cta_button': 'Начать торговлю',
      'footer.tagline': 'Глобальная организация сотрудничества в сфере цифровых финансов и экономики',

      'footer.quick.txo': 'Биржа TXO',
      'footer.quick.business': 'Бизнес-модель',
      'footer.quick.license': 'Комплаенс и лицензии',
      'footer.status_ok': 'Все системы работают',
      'footer.aria_quick_pages': 'Ключевые страницы',
      'footer.about.overview': 'Обзор',
      'footer.about.founder': 'Основатель',
      'footer.about.structure': 'Структура',
      'footer.about.qgf': 'Фонд QGF',
      'footer.about.mission': 'Миссия',
      'footer.about.timeline': 'Хронология',
      'footer.about.testimonials': 'Отзывы',
      'footer.txo.origin': 'Происхождение TXO',
      'footer.txo.founder': 'Основатель',
      'footer.txo.team': 'Команда R&D',
      'footer.txo.offline': 'Оффлайн-OTC сервис',
      'footer.txo.license': 'Комплаенс и лицензии',
      'footer.business.web2': 'Инновации WEB2',
      'footer.business.core': 'Ключевая модель',
      'footer.business.future': 'План на будущее',
      'footer.business.v5': 'Стратегия V5',
      'footer.profit.signals': 'Система сигналов',
      'footer.profit.referral': 'Реферальная программа',
      'footer.profit.vip': 'VIP программа',
      'footer.profit.reports': 'Отчеты по доходности',
      'footer.profit.calculator': 'Калькулятор',

      'txo.page_title': 'Криптобиржа TXO · Инфраструктура цифровых активов Qicheng',
      'txo.page_desc': 'Узнайте о происхождении криптобиржи TXO, ее видении и значении названия, команде основателей и глобальной поддержке капитала, а также о глобальной сети оффлайн-OTC сервисов.',
      'txo.section_vision_kicker': 'Видение',
      'txo.section_founder_kicker': 'Основатель',
      'txo.section_team_kicker': 'Ключевая сила',
      'txo.section_offline_kicker': 'Глобальный сервис',
      'txo.vision_title': 'Ключевая философия TXO',
      'txo.vision_t_word': 'Titan / Trade',
      'txo.vision_x_word': 'eXchange / X-Экономика',
      'txo.vision_o_word': 'Возможности / Открытость',
      'txo.vision_t_desc': 'Прочная и надежная инфраструктура и торговые возможности мирового уровня',
      'txo.vision_x_desc': 'Глобальная экономическая форма следующего поколения, ориентированная на будущее',
      'txo.vision_o_desc': 'Открытые и совместные возможности для глобального движения ценности',
      'txo.hero_title': 'Инфраструктура следующего поколения<br>для торговли цифровыми активами',
      'txo.hero_desc': 'TXO была совместно основана Qihang Capital и Helios Chain Research Institute и стремится переосмыслить глобальную торговлю цифровыми активами через <span class="qc-text-highlight">эффективность</span>, <span class="qc-text-highlight">безопасность</span> и <span class="qc-text-highlight">интеллект</span>.',
      'txo.founder_title': 'Двойная основа: технологии и финансы',
      'txo.founder_role': 'Основатель TXO и главный архитектор',
      'txo.team_title': 'Сильная команда и глобальный капитал',
      'txo.team_rnd_title': 'Междисциплинарная команда R&D',
      'txo.team_rnd_1': 'Кванты и специалисты по рискам из Goldman Sachs и Morgan Stanley',
      'txo.team_rnd_2': 'Архитекторы распределенных систем из Google и Meta',
      'txo.team_rnd_3': 'Инженеры-криптографы из криптографического центра MIT',
      'txo.team_capital_title': 'Поддержка глобального капитала',
      'txo.offline_title': 'Сеть оффлайн-торговли',
      'txo.offline_desc': 'Помимо онлайн-системы сопоставления, TXO построила <span class="qc-text-highlight">сеть оффлайн-торговли</span> в ключевых регионах мира, предоставляя безопасные и конфиденциальные OTC-услуги для институтов и состоятельных клиентов.',
      'txo.offline_card1_title': 'Официальная сертификация',
      'txo.offline_card1_desc': 'Региональная сертификация квалификации оффлайн-торговых учреждений',
      'txo.offline_card2_title': 'Комплаенс и безопасность',
      'txo.offline_card2_desc': 'Повышение комплаенса и безопасности средств при сделках',
      'txo.founder_p1': 'Доктор Адриан Колдуэлл — международно признанный эксперт по архитектуре распределенных финансовых систем. Он окончил <span class="qc-text-highlight">Стэнфордский университет</span> по специальности «компьютерные науки» и получил две степени PhD по финансовой инженерии в <span class="qc-text-highlight">Имперском колледже Лондона</span>.',
      'txo.founder_p2': 'Ранее он был ключевым участником команды количественного моделирования Goldman Sachs. В 2019 году основал Helios Chain Research Institute, сосредоточенный на высокопроизводительных клиринговых системах и распределенных сетях контроля рисков. TXO — системная реализация результатов его исследований.',

      'home.hero_kicker': 'Qicheng Holdings Group',
      'home.hero_title': 'Глобальная кооперация цифровых финансов и экономики',
      'home.hero_subtitle': 'Базируясь в Лондоне, мы строим сеть экономического сотрудничества в более чем 30 странах, опираясь на прозрачность, безопасность и инновации, чтобы соединить цифровые финансы с реальной экономикой.',
      'home.hero_cta_business': 'Узнать о бизнес-модели',
      'home.hero_cta_txo': 'Перейти на биржу TXO',
      'home.london_title': 'Лондон · Глобальное присутствие',
      'home.london_desc': 'Qicheng Holdings Group (QCH) основана в 2020 году и располагается в Лондоне (Великобритания). В зрелой и регулируемой финансовой среде мы создаём ориентированную на будущее глобальную цифровую экономическую инфраструктуру.',
      'home.london_cta_about': 'О Qicheng',

      'home.flags_caption': 'Строим глобальную инвестиционную сеть и ловим каждую возможность роста.',

      'home.principles_title': 'Пять ключевых принципов',
      'home.principles_subtitle': 'Создание надежной глобальной сети ценности',
      'home.principles_desc': 'Прозрачность, безопасность, сотрудничество, инновации и устойчивость — базовая логика дизайна Qicheng для эпохи глобальной цифровой экономики. Эти пять измерений поддерживают друг друга, формируя открытую, инклюзивную и надежную экосистему.',
      'home.principle_transparency_title': 'Прозрачность',
      'home.principle_transparency_desc': 'Опираемся на прозрачные данные и процессы, применяем открытые механизмы раскрытия информации, повышая доверие рынка и удобство регулирования — каждая сделка и решение отслеживаемы.',
      'home.principle_security_title': 'Безопасность',
      'home.principle_security_desc': 'Двойная защита технологиями и регламентами: многоуровневое шифрование, умный риск-контроль и комплаенс-аудит защищают активы и данные, обеспечивая банковский уровень безопасности.',
      'home.principle_collaboration_title': 'Сотрудничество',
      'home.principle_collaboration_desc': 'Поощряем кооперацию между регионами и отраслями, создаем сеть взаимной выгоды, соединяем глобальные ресурсы и развиваем совместное создание ценности.',
      'home.principle_innovation_title': 'Инновации',
      'home.principle_innovation_desc': 'Постоянно внедряем ИИ, блокчейн и большие данные в финансы и индустрию, продвигая инновации бизнес-моделей через технологические прорывы.',
      'home.principle_sustainability_title': 'Устойчивость',
      'home.principle_sustainability_desc': 'Фокус на долгосрочной ценности и социальной ответственности, объединяя цифровую экономику и зеленое развитие для построения устойчивых моделей роста.',

      'home.txo_section_title': 'Биржа TXO · Инфраструктура цифровых активов',
      'home.txo_section_desc': 'TXO создана экосистемой Qicheng совместно с ведущими командами технологий и финансов и нацелена на инфраструктуру торговли цифровыми активами нового поколения с высокой производительностью и сильным риск-контролем.',
      'home.txo_cta_detail': 'Подробнее о TXO',
      'home.txo_cta_license': 'Комплаенс и лицензии',

      'home.bridge_quote': 'Мы неизменно продвигаем экономику совместного потребления и создаем будущее благополучия для каждого.',

      'home.testimonials_title': 'Превосходя ожидания',
      'home.testimonials_desc': 'Благодаря глубокому пониманию рынка и точным стратегиям Qicheng стремится обеспечивать долгосрочный и стабильный рост капитала.<br class="hidden sm:block">\n            Под нашим профессиональным руководством каждый инвестор может уверенно двигаться в сложной рыночной среде.<br class="hidden sm:block">\n            Глубокая интеграция с платформой TXO дает непревзойденный торговый опыт.',

      'business.page_title': 'Бизнес‑модель Qicheng · Инфраструктура цифровой экономики',
      'business.page_desc': 'Узнайте о модели бизнес‑инфраструктуры Qicheng Holdings Group: «Цифровые активы + Управляемые данные + Связанные сценарии + Глобальная операционная система», а также о глобальной стратегической матрице V5.',
      'business.hero_title': 'Замкнутая экосистема<br>Создание ценности',
      'business.hero_desc': 'Qicheng Holdings Group предлагает модель бизнес‑инфраструктуры «Цифровые активы + Управляемые данные + Связанные сценарии + Глобальная операционная система».<br class="hidden sm:block"><span class="qc-text-highlight">Эта модель</span> системно решает структурные противоречия эпохи Web2.',
      'business.web2_kicker': 'Вызов',
      'business.web2_title': 'Структурные противоречия Web2',
      'business.web2_desc': 'В современном мире Web2 пользователи создают ценность, но им сложно получать вознаграждение соразмерно вкладу. Платформы захватывают большую часть данных и ценности, формируя высокоцентрализованный замкнутый контур.',
      'business.web2_card1_title': 'Несоответствие ценности',
      'business.web2_card1_desc': 'Пользователи создают ценность, но прибыль монополизируют платформы',
      'business.web2_card2_title': 'Острова данных',
      'business.web2_card2_desc': 'Компаниям сложно получать подлинные и проверяемые пользовательские данные',
      'business.web2_card3_title': 'Ограничение инноваций',
      'business.web2_card3_desc': 'Границы инноваций замкнуты в одном экосистемном контуре',
      'business.web2_card4_title': 'Высокие затраты',
      'business.web2_card4_desc': 'Закрытые экосистемы повышают стоимость привлечения и операционные расходы',
      'business.core_kicker': 'Ключевые опоры',
      'business.core_title': 'Синергия четырёх базовых модулей',
      'business.core_module1_img_alt': 'Активизация данных',
      'business.core_module1_title': 'Активизация данных',
      'business.core_module1_desc': 'Стандартизация превращает данные в факторы производства «проверяемые, авторизуемые и оцениваемые», разрушая монополии и обеспечивая безопасное обращение в разных сценариях.',
      'business.core_module2_img_alt': 'Прозрачный цикл ценности',
      'business.core_module2_title': 'Прозрачный цикл ценности',
      'business.core_module2_desc': 'Цифровая бизнес‑цепочка отслеживает поведение пользователей и эффективность цепочки поставок end‑to‑end, точно сопоставляет затраты и отдачу, снижает потери и повышает эффективность.',
      'business.core_module3_img_alt': 'Взаимосвязанная экосистема',
      'business.core_module3_title': 'Взаимосвязанная экосистема',
      'business.core_module3_desc': 'Разрушает острова данных, обеспечивает совместимость между e‑commerce, играми, соцсетями и контентом, формируя межотраслевые и межплатформенные связи ценности.',
      'business.core_module4_img_alt': 'Глобальная операционная система',
      'business.core_module4_title': 'Глобальная операционная система',
      'business.core_module4_desc': 'Создаёт глобальные операционные и технологические центры, помогает бизнесу быстро выходить на международные рынки, подключать капитал и ресурсы и формировать синергетические индустриальные сети.',
      'business.future_kicker': 'План будущего',
      'business.future_title': 'Новая экономическая инфраструктура',
      'business.future_card1_title': 'Инфраструктура данных',
      'business.future_card1_desc': 'Высокобезопасная и высокодоступная база данных и фреймворк конфиденциальных вычислений для защиты суверенитета данных.',
      'business.future_card2_title': 'Интеллектуальный бизнес‑движок',
      'business.future_card2_desc': 'Интеллектуальные решения и автоматизированные операции на базе ИИ для повышения эффективности.',
      'business.future_card3_title': 'Коридор цифровой экономики',
      'business.future_card3_desc': '«Скоростная магистраль» оборота ценности и расчётов, связывающая рынки и поддерживающая трансграничную торговлю.',
      'business.v5_kicker': 'Стратегия V5',
      'business.v5_title': 'Глобальная стратегическая матрица V5',
      'business.v5_quote': 'Пять измерений — технологии, активы, безопасность, индустрия и инфраструктура — очерчивают долгосрочный путь развития Qicheng Holdings Group.',
      'business.v5_chip1_title': 'Технологии',
      'business.v5_chip1_desc': 'Передовые технологии, драйвер инноваций',
      'business.v5_chip2_title': 'Активы',
      'business.v5_chip2_desc': 'Цифровые активы как основа ценности',
      'business.v5_chip3_title': 'Безопасность',
      'business.v5_chip3_desc': 'Многоуровневый риск‑контроль и защита',
      'business.v5_chip4_title': 'Индустрия',
      'business.v5_chip4_desc': 'Интеграция отраслей и win‑win экосистема',
      'business.v5_chip5_title': 'Инфраструктура',
      'business.v5_chip5_desc': 'Глобальная инфраструктура и взаимосвязь',

      'about.page_title': 'О Qicheng · Qicheng Holdings Group',
      'about.page_desc': 'Узнайте о Qicheng Holdings Group: обзор, основатель, глобальная структура, фонд QGF, миссия и ценности.',
      'about.hero_title': 'Создаём глобальную<br>цифровую сеть сотрудничества',
      'about.hero_desc': 'Qicheng Holdings Group (QCH) основана в 2020 году и располагается в Лондоне.<br class="hidden sm:block">Мы соединяем мировые финансовые центры, создавая цифровую экономическую экосистему, которая <span class="qc-text-highlight">прозрачна</span>, <span class="qc-text-highlight">безопасна</span> и <span class="qc-text-highlight">устойчива</span>.',
      'about.overview_kicker': 'Основа',
      'about.overview_title': 'Лондон как база, мир как охват',
      'about.stat_founded': 'Год основания',
      'about.stat_countries': 'Охват стран',
      'about.stat_aum': 'Активы под управлением (AUM)',
      'about.intro_p1': 'С самого начала QCH поставила амбициозную цель: стать <span class="qc-text-highlight">строителем глобальной сети сотрудничества цифровой экономики</span>. Мы не просто инвесткомпания — мы мост между цифровыми активами и реальной экономикой.',
      'about.intro_p2': 'Опираясь на зрелую регуляторную среду Лондона, финансовую инфраструктуру и открытый инновационный климат, QCH за несколько лет построила сеть в <span class="qc-text-highlight">30+</span> странах и регионах.',
      'about.tab_compliance_title': 'Комплаенс',
      'about.tab_compliance_desc': 'TXO имеет лицензию MSB (США) и соответствует требованиям, опираясь на риск‑контроль институционального уровня.',
      'about.tab_tech_title': 'Технологичность',
      'about.tab_tech_desc': 'Интеграция моделей OpenAI, Gemini и др. для создания интеллектуального торгового движка.',
      'about.tab_ecosystem_title': 'Экосистема win‑win',
      'about.tab_ecosystem_desc': 'Глубокое сотрудничество с ведущим мировым капиталом (Goldman Sachs, Sequoia и др.) для устойчивой финансовой экосистемы.',
      'about.img_compliance_alt': 'Соответствие и лицензии',
      'about.img_tech_alt': 'Технологические партнёры',
      'about.img_ecosystem_alt': 'Экосистемные партнёры',
      'about.partners_title': 'Наши партнёры',
      'about.partners_strip_alt': 'Лента логотипов партнёров',
      'about.founder_kicker': 'Лидерство',
      'about.founder_title': 'Синтез математики и технологий',
      'about.founder_role': 'Генеральный директор',
      'about.founder_p1': 'Роберт Харрисон окончил <span class="qc-text-highlight">Оксфордский университет</span>, специализируясь на финансовой математике и новых экономических системах. У него более 17 лет опыта в международной финтех‑индустрии, распределении активов и трансграничных регуляторных рамках.',
      'about.founder_p2': 'Как пионер в объединении блокчейна и традиционных рынков капитала, Роберт участвовал в ряде международных проектов цифровой финансовой инфраструктуры. СМИ часто называют его <span class="qc-text-highlight">ключевой фигурой</span> системного развития цифровых финансов.',
      'about.founder_p3': 'Под руководством Роберта Qicheng Holdings Group придерживается строгих структурных моделей и глобального стратегического видения, раскрывая <span class="qc-text-highlight">долгосрочную ценность</span> для инвесторов по всему миру.',
      'about.structure_kicker': 'Глобальная сеть',
      'about.structure_title': 'Междисциплинарное сотрудничество и объединение экспертизы',
      'about.structure_card1_title': 'Технические эксперты',
      'about.structure_card1_desc': 'Лучшие специалисты в ИИ и распределённых системах',
      'about.structure_card2_title': 'Финансовые аналитики',
      'about.structure_card2_desc': 'Институциональные инвесторы с глубоким пониманием рынка',
      'about.structure_card3_title': 'Лидеры индустрии',
      'about.structure_card3_desc': 'Опытные практики в энергетике, производстве и образовании',
      'about.structure_card4_title': 'Экономические советники',
      'about.structure_card4_desc': 'Авторитетные исследователи и советники по международной политике',
      'about.qgf_kicker': 'Фонд',
      'about.qgf_title': 'Долгосрочный капитал, двигающий инновации',
      'about.qgf_quote': 'QGF управляет примерно <span class="qc-text-highlight">780 млн долларов США</span> активами под управлением и поддерживает инфраструктуру цифровой экономики через мультиактивные модели и глобальные стратегии распределения.',
      'about.qgf_card1_img_alt': 'Долгосрочный капитал',
      'about.qgf_card1_title': 'Инъекция долгосрочного капитала',
      'about.qgf_card1_desc': 'Финансируется пропорционально из годовой чистой прибыли QCH для устойчивого масштабирования.',
      'about.qgf_card2_img_alt': 'Стратегическое партнёрство',
      'about.qgf_card2_title': 'Стратегическое сотрудничество капитала',
      'about.qgf_card2_desc': 'Тесная работа с такими институтами, как Blackstone, Sequoia и JPMorgan Chase.',
      'about.qgf_card3_img_alt': 'Хеджирование рисков',
      'about.qgf_card3_title': 'Механизмы хеджирования',
      'about.qgf_card3_desc': 'Тонкая настройка риск‑контроля обеспечивает стабильную техническую и финансовую поддержку глобальным партнёрам.',
      'about.mission_kicker': 'Миссия и ценности',
      'about.mission_title': 'Пять ключевых ценностей',
      'about.value_transparency_title': 'Прозрачность',
      'about.value_transparency_desc': 'Повышаем доверие за счёт прозрачных данных и процессов.',
      'about.value_security_title': 'Безопасность',
      'about.value_security_desc': 'Защищаем активы техническими и организационными механизмами.',
      'about.value_collaboration_title': 'Сотрудничество',
      'about.value_collaboration_desc': 'Кросс‑региональная и межотраслевая кооперация ради win‑win сети ценности.',
      'about.value_innovation_title': 'Инновации',
      'about.value_innovation_desc': 'Развиваем эффективные применения ИИ и блокчейна в финансах.',
      'about.value_sustainability_title': 'Устойчивость',
      'about.value_sustainability_desc': 'Сфокусированы на долгосрочной ценности и объединяем цифровую экономику с зелёным развитием.',
      'about.resend_title': 'Сделать цифровые финансы<br>глобальной общественной инфраструктурой',
      'about.resend_desc': 'Доступно каждому, выгодно каждому. Мы строим глобальную сеть движения ценности: <span class="qc-text-highlight">прозрачную</span>, <span class="qc-text-highlight">безопасную</span>, <span class="qc-text-highlight">умную</span> и <span class="qc-text-highlight">инклюзивную</span>.',
      'footer.status_operational': 'Все системы работают'
    },

    pt: {
      'nav.logo_aria': 'Qicheng Holdings Group',
      'nav.logo_alt': 'Qicheng Holdings Group',
      'nav.home': 'Início',
      'nav.about': 'Qicheng',
      'nav.business': 'Modelo de Negócios',
      'nav.txo': 'Exchange TXO',
      'nav.license': 'Conformidade e Licenças',
      'nav.profit': 'Sistema de Lucros',
      'nav.calculator': 'Calculadora',

      'nav.aria_main': 'Navegação principal',
      'nav.toggle': 'Alternar navegação',

      'nav.about.overview': 'Visão geral',
      'nav.about.founder': 'Fundador',
      'nav.about.structure': 'Estrutura',
      'nav.about.qgf': 'Fundação QGF',
      'nav.about.mission': 'Missão',
      'nav.about.testimonials': 'Depoimentos',

      'nav.business.web2': 'Inovação WEB2',
      'nav.business.core': 'Modelo central',
      'nav.business.future': 'Plano futuro',
      'nav.business.v5': 'Estratégia V5',

      'nav.txo.origin': 'Origem da TXO',
      'nav.txo.founder': 'Fundador',
      'nav.txo.team': 'Equipe de P&D',
      'nav.txo.offline': 'Serviço OTC offline',

      'nav.license.statement': 'Declaração de legalidade e conformidade',
      'nav.license.verification': 'Como verificar certificados',

      'profit.page_title': 'Sistema de lucros · Sinais · Indicação · Equipe VIP',
      'profit.page_desc': 'Conheça o sistema de sinais de trading, o programa de indicação, o plano de equipe VIP e exemplos de 35 dias — e estime sua performance composta com ferramentas inteligentes.',
      'profit.hero_title': 'Lucros multidimensionais<br>Crescimento compartilhado',
      'profit.hero_desc': 'A Qicheng Holdings constrói um sistema completo de crescimento de patrimônio com <span class="qc-text-highlight">sinais de trading</span>, <span class="qc-text-highlight">recompensas de indicação</span> e o <span class="qc-text-highlight">programa de equipe VIP</span>.<br class="hidden sm:block">',
      'profit.hero_img_alt': 'Sistema de lucros multidimensional',
      'profit.signals_icon_alt': 'Ícone de sinais de trading',
      'profit.signals_title': 'Trading Signals',
      'profit.signals_subtitle': 'Sinais quantitativos com IA',
      'profit.signals_lead': 'Sinais globais unificados, execução sem fronteiras',
      'profit.signals_desc': 'Siga as regras rigorosamente: cada sinal é executado com gestão de capital fixa. Copie com um clique via TXO para reduzir barreiras e aumentar a consistência.',
      'profit.rules_title': 'Regras de trading',
      'profit.rule_position_label': 'Tamanho da posição',
      'profit.rule_position_value': 'Usar 2% do saldo por sinal',
      'profit.rule_return_label': 'Hipótese de retorno',
      'profit.rule_return_value': 'Média ~50% por operação (≈ +1% no patrimônio)',
      'profit.rule_freq_label': 'Frequência',
      'profit.rule_freq_value': '2–4 vezes/dia conforme a membresia',
      'profit.rule_miss_label': 'Sinal perdido',
      'profit.rule_miss_value': 'Sem compensação por sinais perdidos',
      'profit.perk_basic_title': 'Benefícios básicos',
      'profit.perk_basic_desc': 'Após o primeiro depósito, você se torna membro básico e recebe 2 sinais diários permanentemente. Cada trade usa 2% do saldo.',
      'profit.perk_honor_title': 'Sinal de honra',
      'profit.perk_honor_desc': 'Convide 1 membro formal e ganhe 1 sinal permanente adicional. Cada trade usa 2% do saldo.',
      'profit.perk_team_title': 'Sinal de equipe',
      'profit.perk_team_desc': 'Convide 3 membros formais e ganhe 1 sinal permanente adicional. Cada trade usa 2% do saldo.',
      'profit.perk_referral_title': 'Sinal de indicação',
      'profit.perk_referral_desc': 'Convide um amigo: convidador e novo membro ganham 1 sinal extra no mesmo dia, operando com 2% do saldo. Múltiplos convites acumulam.',
      'profit.example_title': 'Exemplo',
      'profit.example_desc': 'Exemplo: $1,000 iniciais, 2 sinais/dia. Com “+1% por sinal”:',
      'profit.example_lines': 'Fim do dia 1 ≈ 1000 × 1.01² = 1020<br>Fim do dia 10 ≈ 1000 × 1.01^(2×10) = 1219<br>Fim do dia 35 ≈ 1000 × 1.01^(2×35) = 2000',
      'profit.cta_calculator': 'Ir para a calculadora',
      'profit.factor_title': 'Fator de capitalização',
      'profit.factor_desc': 'Crescimento equivalente por sinal',
      'profit.factor_card1_title': 'Sinais totais',
      'profit.factor_card1_desc': 'Sinais/dia × Dias',
      'profit.factor_card2_title': 'Modelo',
      'profit.factor_card2_desc': 'Principal × 1.01^Sinais',
      'profit.hours_title': 'Horários globais de trading',
      'profit.hours_img_alt': 'Horários globais de trading',
      'profit.hours_note': 'Referência de horários ativos por região para execução entre fusos',
      'profit.referral_title': 'Referral Program',
      'profit.referral_subtitle': 'Programa de indicação',
      'profit.referral_desc': 'Após o primeiro depósito (≥ $500), você é 100% elegível. Quando o amigo se registrar e fizer o primeiro depósito, ambos recebem recompensas e sinais extras.',
      'profit.referral_rules_title': 'Regras',
      'profit.referral_rule1': 'Primeiro depósito do novo membro ≥ $500 e pelo menos 30% do saldo do indicador.',
      'profit.referral_rule2': 'Ambos recebem um sinal extra no mesmo dia (2% do saldo).',
      'profit.referral_rule3': 'Desbloqueie o 3º sinal permanente após a 1ª indicação; o 4º após a 3ª.',
      'profit.referral_th_deposit': 'Primeiro depósito',
      'profit.referral_th_referrer': 'Recompensa do indicador',
      'profit.referral_th_new': 'Recompensa do novo',
      'profit.vip_title': 'VIP Team',
      'profit.vip_subtitle': 'Promoção da equipe VIP',
      'profit.vip_desc': 'Indique 6 membros diretos para se tornar VIP e ter renda passiva permanente. Comissão por volume é calculada no volume total da equipe e liquidada a cada 10 dias (2/12/22).',
      'profit.vip_th_level': 'Nível',
      'profit.vip_th_team': 'Tamanho da equipe',
      'profit.vip_th_direct': 'Indicações diretas',
      'profit.vip_th_bonus': 'Bônus',
      'profit.vip_th_commission': 'Rebate de volume',
      'profit.reports_title': 'Profit Reports',
      'profit.reports_subtitle': 'Exemplos de 35 dias',
      'profit.reports_desc': 'Modelo composto baseado em $1,000, 2–4 sinais/dia, 2% por sinal e ~50% de retorno médio (≈ +1% no patrimônio).',
      'profit.report_basic_title': 'Básico (2 sinais/dia)',
      'profit.report_honor_title': 'Honra (3 sinais/dia)',
      'profit.report_team_title': 'Equipe (4 sinais/dia)',
      'profit.report_total_label': 'Ativos estimados após 35 dias',
      'profit.day_1': 'Dia 1',
      'profit.day_10': 'Dia 10',
      'profit.day_20': 'Dia 20',
      'profit.day_30': 'Dia 30',
      'profit.cta_custom_calc': 'Calcular de forma personalizada',
      'profit.rail_aria': 'Trilho de atividade',
      'profit.rail_tag_default': 'Atividade de sinais',
      'profit.modal_aria': 'Pré-visualização da atividade',
      'profit.modal_close': 'Fechar',
      'profit.modal_title_default': 'Sinais · Atividade',
      'profit.activity_signals': 'Sinais',
      'profit.activity_referral': 'Indicação',
      'profit.activity_vip': 'Equipe VIP',
      'profit.activity_reports': 'Tabela de ganhos',
      'profit.activity_suffix': 'Atividade',

      'license.page_title': 'Licenças de operação global · Conformidade e certificação TXO',
      'license.page_desc': 'Veja a declaração de conformidade da TXO, o registro no estado de Nova York e como verificar certificados oficiais. Conheça AML, KYC, controle de risco e proteção de privacidade de dados.',
      'license.hero_title': 'Conformidade global<br>Base da segurança',
      'license.hero_desc': 'A TXO Exchange é operada por TXO COMPREHENSIVE SERVICE INC.<br class="hidden sm:block">Registrada legalmente no estado de Nova York (EUA) e com um sistema de controle interno <span class="qc-text-highlight">de nível financeiro</span>.',
      'license.statement_title': 'Legal Statement',
      'license.statement_subtitle': 'Operação em conformidade',
      'license.statement_desc': 'A TXO COMPREHENSIVE SERVICE INC. está registrada oficialmente no Department of State do estado de Nova York. O número do documento é <span class="qc-text-highlight">260104000062</span>.',
      'license.aml_title': 'Anti-lavagem de dinheiro (AML)',
      'license.aml_desc': 'Mecanismos rigorosos de revisão da origem dos fundos',
      'license.kyc_title': 'Identificação (KYC)',
      'license.kyc_desc': 'Sistema global de verificação de identidade de usuários',
      'license.risk_title': 'Controle de risco',
      'license.risk_desc': 'Monitoramento em tempo real de transações anormais',
      'license.privacy_title': 'Privacidade de dados',
      'license.privacy_desc': 'Criptografia de dados do usuário em nível bancário',
      'license.cert_company_title': 'Certificado de empresa autorizada nos EUA',
      'license.cert_company_alt': 'TXO License 1',
      'license.cert_stock_title': 'Certificado de ações da TXO',
      'license.cert_stock_alt': 'Stock Certificate',
      'license.verify_title': 'Verification',
      'license.verify_subtitle': 'Guia de verificação de certificados',
      'license.step1_title': 'Acesse o sistema oficial',
      'license.step1_desc': 'Visite no navegador: <a href="https://apps.dos.ny.gov/publicInquiry/" target="_blank" style="color: #fff; text-decoration: underline;">https://apps.dos.ny.gov/publicInquiry/</a>',
      'license.step2_title': 'Digite o nome da empresa',
      'license.step2_desc': 'No campo Entity Name, preencha: <span class="qc-text-highlight">TXO COMPREHENSIVE SERVICE INC</span>',
      'license.step3_title': 'Veja o resultado',
      'license.step3_desc': 'Clique em Search para ver o status de registro, a data de constituição e mais detalhes no banco oficial.',

      'nav.profit.signals': 'Sistema de sinais',
      'nav.profit.referral': 'Programa de indicação',
      'nav.profit.vip': 'Programa VIP',
      'nav.profit.reports': 'Relatórios de lucros',

      'footer.about_title': 'Sobre a Qicheng',
      'footer.txo_title': 'Exchange TXO',
      'footer.business_title': 'Modelo de Negócios',
      'footer.profit_title': 'Sistema de Lucros',
      'footer.cta_title': 'Pronto para negociar?',
      'footer.cta_button': 'Começar a negociar',
      'footer.tagline': 'Organização global de colaboração para finanças digitais e economia',

      'footer.quick.txo': 'Exchange TXO',
      'footer.quick.business': 'Modelo de Negócios',
      'footer.quick.license': 'Conformidade e Licenças',
      'footer.status_ok': 'Todos os sistemas operacionais',
      'footer.status_operational': 'Todos os sistemas operacionais',
      'footer.aria_quick_pages': 'Páginas principais',

      'footer.about.overview': 'Visão geral',
      'footer.about.founder': 'Fundador',
      'footer.about.structure': 'Estrutura',
      'footer.about.qgf': 'Fundação QGF',
      'footer.about.mission': 'Missão',
      'footer.about.timeline': 'Linha do tempo',
      'footer.about.testimonials': 'Depoimentos',

      'footer.txo.origin': 'Origem da TXO',
      'footer.txo.founder': 'Fundador',
      'footer.txo.team': 'Equipe de P&D',
      'footer.txo.offline': 'Serviço OTC offline',
      'footer.txo.license': 'Conformidade e Licenças',

      'footer.business.web2': 'Inovação WEB2',
      'footer.business.core': 'Modelo central',
      'footer.business.future': 'Plano futuro',
      'footer.business.v5': 'Estratégia V5',

      'footer.profit.signals': 'Sistema de sinais',
      'footer.profit.referral': 'Programa de indicação',
      'footer.profit.vip': 'Programa VIP',
      'footer.profit.reports': 'Relatórios de lucros',
      'footer.profit.calculator': 'Calculadora',

      'home.hero_kicker': 'Qicheng Holdings Group',
      'home.hero_title': 'Organização global de colaboração para finanças digitais e economia',
      'home.hero_subtitle': 'Com base em Londres, construímos uma rede de colaboração da economia digital em mais de 30 países, tendo transparência, segurança e inovação como pilares para promover a integração profunda entre finanças digitais e economia real.',
      'home.hero_cta_business': 'Conhecer o modelo de negócios',
      'home.hero_cta_txo': 'Entrar na Exchange TXO',
      'home.london_title': 'Base em Londres · Presença global',
      'home.london_desc': 'A Qicheng Holdings Group (QCH) foi fundada em 2020 e tem sede em Londres (Reino Unido). Em um ambiente financeiro maduro e bem regulado, construímos uma infraestrutura global de economia digital voltada para o futuro.',
      'home.london_cta_about': 'Sobre a Qicheng',
      'home.flags_caption': 'Construímos uma rede global de investimentos e aproveitamos cada oportunidade de crescimento',
      'home.principles_title': 'Cinco princípios centrais',
      'home.principles_subtitle': 'Construindo uma rede global de valor confiável',
      'home.principles_desc': 'Transparência, segurança, colaboração, inovação e sustentabilidade são a lógica de base da Qicheng para a era da economia digital global. Esses cinco pilares se apoiam mutuamente para formar um ecossistema aberto, inclusivo e confiável.',
      'home.principle_transparency_title': 'Transparência',
      'home.principle_transparency_desc': 'Construímos confiança com dados e processos transparentes, por meio de divulgações claras e rastreabilidade de transações e decisões.',
      'home.principle_security_title': 'Segurança',
      'home.principle_security_desc': 'Proteção dupla por tecnologia e governança: criptografia em múltiplas camadas, controle de risco inteligente e auditorias de conformidade para segurança de nível bancário.',
      'home.principle_collaboration_title': 'Colaboração',
      'home.principle_collaboration_desc': 'Promovemos sinergias entre regiões e setores para criar uma rede de valor ganha-ganha, conectando recursos globais e impulsionando a co-criação.',
      'home.principle_innovation_title': 'Inovação',
      'home.principle_innovation_desc': 'Exploramos continuamente IA, blockchain e big data para aplicações eficientes em finanças e indústria, liderando a direção do desenvolvimento da economia digital.',
      'home.principle_sustainability_title': 'Sustentabilidade',
      'home.principle_sustainability_desc': 'Focamos no valor de longo prazo e responsabilidade social, integrando economia digital e desenvolvimento verde para modelos sustentáveis.',
      'home.txo_section_title': 'Exchange TXO · Infraestrutura de ativos digitais',
      'home.txo_section_desc': 'A TXO foi construída pelo ecossistema Qicheng junto a equipes líderes de tecnologia e finanças, com o objetivo de criar uma infraestrutura de negociação de ativos digitais de nova geração com alta performance e forte controle de risco.',
      'home.txo_cta_detail': 'Saiba mais sobre a TXO',
      'home.txo_cta_license': 'Ver conformidade e licenças',
      'home.bridge_quote': 'Estamos sempre comprometidos em promover a economia do compartilhamento e criar um futuro de prosperidade para todos',
      'home.testimonials_title': 'Além das expectativas',
      'home.testimonials_desc': 'A Qicheng, com profunda percepção de mercado e estratégias precisas, está comprometida em criar crescimento de riqueza estável e de longo prazo para os clientes.<br class="hidden sm:block">\n            Com nossa orientação profissional, cada investidor pode avançar com segurança mesmo em mercados complexos.<br class="hidden sm:block">\n            A integração profunda com a plataforma TXO oferece uma experiência de negociação incomparável.',

      'txo.page_title': 'Exchange de criptomoedas TXO · Infraestrutura de ativos digitais da Qicheng',
      'txo.page_desc': 'Conheça a origem da exchange de criptomoedas TXO, sua visão e o significado do nome, a equipe fundadora e o apoio de capital global, além da rede global de serviços OTC presenciais.',
      'txo.hero_title': 'Infraestrutura de negociação<br>de ativos digitais de nova geração',
      'txo.hero_desc': 'A TXO foi cofundada pela Qihang Capital e pelo Helios Chain Research Institute, dedicada a redefinir a negociação global de ativos digitais com <span class="qc-text-highlight">eficiência</span>, <span class="qc-text-highlight">segurança</span> e <span class="qc-text-highlight">inteligência</span>.',
      'txo.vision_title': 'Filosofia central da TXO',
      'txo.section_vision_kicker': 'Visão',
      'txo.vision_t_word': 'Titã / Trading',
      'txo.vision_x_word': 'Exchange / Economia X',
      'txo.vision_o_word': 'Oportunidade / Aberto',
      'txo.vision_t_desc': 'Infraestrutura sólida e confiável e capacidade de negociação em escala global',
      'txo.vision_x_desc': 'Uma forma econômica global de nova geração orientada para o futuro',
      'txo.vision_o_desc': 'Oportunidades abertas e compartilhadas para o fluxo global de valor',
      'txo.founder_title': 'A dupla base de tecnologia e finanças',
      'txo.section_founder_kicker': 'Fundador',
      'txo.founder_role': 'Fundador da TXO e arquiteto-chefe',
      'txo.founder_p1': 'O Dr. Adrian Caldwell é um especialista internacionalmente reconhecido em arquitetura financeira distribuída. Formou-se em Ciência da Computação na <span class="qc-text-highlight">Universidade de Stanford</span> e obteve dois PhDs em Engenharia Financeira no <span class="qc-text-highlight">Imperial College London</span>.',
      'txo.founder_p2': 'Ele atuou como membro central da equipe de modelagem quantitativa do Goldman Sachs. Em 2019, fundou o Helios Chain Research Institute, focado em sistemas de compensação de alta performance e redes distribuídas de controle de risco. A TXO é a aplicação sistemática de seus resultados de pesquisa.',
      'txo.team_title': 'Talento de elite e capital global',
      'txo.section_team_kicker': 'Fortaleza central',
      'txo.team_rnd_title': 'Equipe de P&D interdisciplinar',
      'txo.team_rnd_1': 'Especialistas em quant e controle de risco do Goldman Sachs e Morgan Stanley',
      'txo.team_rnd_2': 'Arquitetos de sistemas distribuídos do Google e Meta',
      'txo.team_rnd_3': 'Engenheiros de criptografia do centro de criptografia do MIT',
      'txo.team_capital_title': 'Apoio de capital global',
      'txo.offline_title': 'Rede de negociação presencial',
      'txo.section_offline_kicker': 'Serviço global',
      'txo.offline_desc': 'Além do sistema de correspondência online, a TXO construiu uma <span class="qc-text-highlight">rede presencial de negociação</span> que cobre as principais regiões do mundo, oferecendo serviços OTC seguros e privados para instituições e clientes de alto patrimônio.',
      'txo.offline_card1_title': 'Certificação oficial',
      'txo.offline_card1_desc': 'Certificação de qualificação de instituições regionais de negociação presencial',
      'txo.offline_card2_title': 'Conformidade e segurança',
      'txo.offline_card2_desc': 'Maior conformidade e segurança de fundos nas negociações',

      'business.page_title': 'Modelo de Negócios da Qicheng · Infraestrutura da economia digital',
      'business.page_desc': 'Conheça o modelo de infraestrutura de negócios proposto pela Qicheng Holdings Group: “Ativos digitais + Dados controláveis + Cenários conectados + Sistema operacional global”, além da matriz estratégica global V5.',
      'business.hero_title': 'Ecossistema em ciclo fechado<br>Criação de valor',
      'business.hero_desc': 'A Qicheng Holdings Group propõe o modelo de infraestrutura de negócios “Ativos digitais + Dados controláveis + Cenários conectados + Sistema operacional global”.<br class="hidden sm:block"><span class="qc-text-highlight">Este modelo</span> resolve de forma sistêmica as contradições estruturais da era Web2.',
      'business.web2_kicker': 'O desafio',
      'business.web2_title': 'Contradições estruturais do Web2',
      'business.web2_desc': 'No mundo Web2 atual, os usuários criam valor, mas dificilmente obtêm retornos proporcionais à contribuição. As plataformas capturam a maior parte dos dados e do valor, formando um ciclo fechado altamente centralizado.',
      'business.web2_card1_title': 'Desalinhamento de valor',
      'business.web2_card1_desc': 'Usuários criam valor, mas os ganhos são monopolizados pelas plataformas',
      'business.web2_card2_title': 'Ilhas de dados',
      'business.web2_card2_desc': 'Empresas têm dificuldade em obter dados reais e verificáveis de usuários',
      'business.web2_card3_title': 'Inovação limitada',
      'business.web2_card3_desc': 'As fronteiras da inovação ficam presas em um único ecossistema',
      'business.web2_card4_title': 'Custos elevados',
      'business.web2_card4_desc': 'Ecossistemas fechados elevam custos de aquisição e operação',
      'business.core_kicker': 'Pilares centrais',
      'business.core_title': 'Sinergia de quatro módulos fundamentais',
      'business.core_module1_img_alt': 'Ativos de dados',
      'business.core_module1_title': 'Ativos de dados',
      'business.core_module1_desc': 'Por meio de mecanismos padronizados, os dados tornam-se fatores produtivos “certificáveis, autorizáveis e precificáveis”, quebrando monopólios e permitindo fluxo seguro entre múltiplos cenários.',
      'business.core_module2_img_alt': 'Ciclo de valor transparente',
      'business.core_module2_title': 'Ciclo de valor transparente',
      'business.core_module2_desc': 'Com base em um sistema de cadeia de negócios digitalizada, rastreia ponta a ponta o comportamento do usuário e a eficiência da cadeia de suprimentos, ajustando custos e retornos para reduzir desperdícios e aumentar a eficiência.',
      'business.core_module3_img_alt': 'Ecossistema interconectado',
      'business.core_module3_title': 'Ecossistema interconectado',
      'business.core_module3_desc': 'Quebra as ilhas de dados, habilita interoperabilidade entre e-commerce, jogos, redes sociais e conteúdo, e cria vínculos de valor entre setores e plataformas.',
      'business.core_module4_img_alt': 'Sistema operacional global',
      'business.core_module4_title': 'Sistema operacional global',
      'business.core_module4_desc': 'Constrói centros globais de operação e tecnologia para ajudar empresas a expandirem rapidamente para mercados internacionais, conectando capital e recursos globais e formando redes industriais colaborativas.',
      'business.future_kicker': 'Plano futuro',
      'business.future_title': 'Nova infraestrutura econômica',
      'business.future_card1_title': 'Infraestrutura de dados',
      'business.future_card1_desc': 'Uma base de dados altamente segura e disponível, com estrutura de computação de privacidade para proteger a soberania dos dados.',
      'business.future_card2_title': 'Motor de negócios inteligente',
      'business.future_card2_desc': 'Sistema de decisão inteligente e operação automatizada impulsionado por IA para elevar a eficiência.',
      'business.future_card3_title': 'Corredor da economia digital',
      'business.future_card3_desc': 'Uma “via expressa” de circulação e liquidação de valor conectando mercados para promover o comércio transfronteiriço.',
      'business.v5_kicker': 'Estratégia V5',
      'business.v5_title': 'Matriz estratégica global V5',
      'business.v5_quote': 'A partir de cinco dimensões—tecnologia, ativos, segurança, indústria e infraestrutura—desenhamos o caminho de desenvolvimento de longo prazo da Qicheng Holdings Group.',
      'business.v5_chip1_title': 'Tecnologia',
      'business.v5_chip1_desc': 'Tecnologia de ponta impulsionando a inovação',
      'business.v5_chip2_title': 'Ativos',
      'business.v5_chip2_desc': 'Ativos digitais como base de valor',
      'business.v5_chip3_title': 'Segurança',
      'business.v5_chip3_desc': 'Múltiplos controles de risco para segurança',
      'business.v5_chip4_title': 'Indústria',
      'business.v5_chip4_desc': 'Integração industrial, ecossistema ganha-ganha',
      'business.v5_chip5_title': 'Infraestrutura',
      'business.v5_chip5_desc': 'Infraestrutura global para conectividade',

      'about.page_title': 'Sobre a Qicheng · Qicheng Holdings Group',
      'about.page_desc': 'Conheça a Qicheng Holdings Group: visão geral, fundador, estrutura global, a Fundação QGF e nossa missão e valores.',
      'about.hero_title': 'Construindo uma rede global<br>de colaboração digital',
      'about.hero_desc': 'A Qicheng Holdings Group (QCH) foi fundada em 2020 e tem sede em Londres.<br class="hidden sm:block">Conectamos centros financeiros globais para construir um ecossistema de economia digital <span class="qc-text-highlight">transparente</span>, <span class="qc-text-highlight">seguro</span> e <span class="qc-text-highlight">sustentável</span>.',
      'about.overview_kicker': 'A base',
      'about.overview_title': 'Sede em Londres, conexão com o mundo',
      'about.stat_founded': 'Ano de fundação',
      'about.stat_countries': 'Países cobertos',
      'about.stat_aum': 'Ativos sob gestão (AUM)',
      'about.intro_p1': 'Desde o início, a QCH definiu uma visão ambiciosa: ser <span class="qc-text-highlight">construtora da rede global de colaboração da economia digital</span>. Não somos apenas uma empresa de investimentos — somos a ponte entre ativos digitais e economia real.',
      'about.intro_p2': 'Aproveitando o ambiente regulatório maduro de Londres, a infraestrutura financeira e um ecossistema aberto de inovação, a QCH construiu em poucos anos uma rede que cobre <span class="qc-text-highlight">30+</span> países e regiões.',
      'about.tab_compliance_title': 'Operação em conformidade',
      'about.tab_compliance_desc': 'A TXO possui licença MSB dos EUA e qualificações de conformidade, com um sistema de controle de risco de nível institucional.',
      'about.tab_tech_title': 'Tecnologia',
      'about.tab_tech_desc': 'Integra modelos líderes como OpenAI e Gemini para criar um motor inteligente de trading de ativos digitais.',
      'about.tab_ecosystem_title': 'Ecossistema ganha-ganha',
      'about.tab_ecosystem_desc': 'Colaboração profunda com capital global de ponta (Goldman Sachs, Sequoia etc.) para construir um ecossistema financeiro sustentável.',
      'about.img_compliance_alt': 'Credenciais de conformidade',
      'about.img_tech_alt': 'Parceiros tecnológicos',
      'about.img_ecosystem_alt': 'Parceiros do ecossistema',
      'about.partners_title': 'Nossos parceiros',
      'about.partners_strip_alt': 'Faixa de logos de parceiros',
      'about.founder_kicker': 'Liderança',
      'about.founder_title': 'A união de matemática e tecnologia',
      'about.founder_role': 'Diretor executivo',
      'about.founder_p1': 'Robert Harrison formou-se na <span class="qc-text-highlight">Universidade de Oxford</span>, com foco em matemática financeira e sistemas econômicos emergentes. Ele possui mais de 17 anos de experiência em fintech global, alocação de ativos e estruturas regulatórias transfronteiriças.',
      'about.founder_p2': 'Como pioneiro na integração de blockchain com os mercados de capitais tradicionais, Robert participou de diversos projetos multinacionais de infraestrutura financeira digital. A mídia internacional frequentemente o descreve como uma <span class="qc-text-highlight">figura-chave</span> na evolução das finanças digitais globais.',
      'about.founder_p3': 'Sob sua liderança, a Qicheng Holdings Group mantém modelos estruturais rigorosos e uma visão estratégica global, liberando <span class="qc-text-highlight">valor de longo prazo</span> para investidores em todo o mundo.',
      'about.structure_kicker': 'Rede global',
      'about.structure_title': 'Colaboração interdisciplinar e inteligência compartilhada',
      'about.structure_card1_title': 'Especialistas em tecnologia',
      'about.structure_card1_desc': 'Talentos de ponta em IA e sistemas distribuídos',
      'about.structure_card2_title': 'Analistas financeiros',
      'about.structure_card2_desc': 'Investidores institucionais com forte percepção de mercado',
      'about.structure_card3_title': 'Líderes de indústria',
      'about.structure_card3_desc': 'Profissionais experientes em energia, manufatura e educação',
      'about.structure_card4_title': 'Consultores econômicos',
      'about.structure_card4_desc': 'Acadêmicos e consultores focados em políticas internacionais',
      'about.qgf_kicker': 'Fundação',
      'about.qgf_title': 'Capital de longo prazo impulsionando a inovação',
      'about.qgf_quote': 'A QGF administra atualmente cerca de <span class="qc-text-highlight">US$ 780 milhões</span> em AUM, impulsionando infraestrutura da economia digital por meio de modelos multiativos e estratégias globais.',
      'about.qgf_card1_img_alt': 'Capital de longo prazo',
      'about.qgf_card1_title': 'Injeção de capital de longo prazo',
      'about.qgf_card1_desc': 'Financiada proporcionalmente a partir do lucro líquido anual da QCH para garantir escalabilidade contínua.',
      'about.qgf_card2_img_alt': 'Parcerias estratégicas',
      'about.qgf_card2_title': 'Cooperação estratégica de capital',
      'about.qgf_card2_desc': 'Colaboração estreita com instituições de ponta como Blackstone, Sequoia e JPMorgan Chase.',
      'about.qgf_card3_img_alt': 'Hedge de risco',
      'about.qgf_card3_title': 'Mecanismos de hedge de risco',
      'about.qgf_card3_desc': 'Gestão de risco refinada para oferecer suporte técnico e financeiro estável a parceiros globais.',
      'about.mission_kicker': 'Missão e valores',
      'about.mission_title': 'Cinco valores centrais',
      'about.value_transparency_title': 'Transparência',
      'about.value_transparency_desc': 'Elevar a confiança com dados e processos transparentes.',
      'about.value_security_title': 'Segurança',
      'about.value_security_desc': 'Proteger ativos com salvaguardas técnicas e de governança.',
      'about.value_collaboration_title': 'Colaboração',
      'about.value_collaboration_desc': 'Cooperação entre regiões e setores para uma rede de valor ganha-ganha.',
      'about.value_innovation_title': 'Inovação',
      'about.value_innovation_desc': 'Explorar aplicações eficientes de IA e blockchain em finanças.',
      'about.value_sustainability_title': 'Sustentabilidade',
      'about.value_sustainability_desc': 'Foco no valor de longo prazo e na integração com o desenvolvimento verde.',
      'about.resend_title': 'Tornar as finanças digitais<br>uma infraestrutura pública global',
      'about.resend_desc': 'Acessível a todos, benéfico para todos. Construímos uma rede global de fluxo de valor <span class="qc-text-highlight">transparente</span>, <span class="qc-text-highlight">segura</span>, <span class="qc-text-highlight">inteligente</span> e <span class="qc-text-highlight">inclusiva</span>.',
    },

    ja: {
      'nav.logo_aria': 'Qicheng Holdings Group',
      'nav.logo_alt': 'Qicheng Holdings Group',
      'nav.home': 'ホーム',
      'nav.about': '概要',
      'nav.business': '事業モデル',
      'nav.txo': 'TXO',
      'nav.license': '法令・許認可',
      'nav.profit': '収益',
      'nav.calculator': '計算機',

      'nav.aria_main': 'メインナビゲーション',
      'nav.toggle': 'ナビゲーションを切り替え',

      'nav.about.overview': '概要',
      'nav.about.founder': '創業者',
      'nav.about.structure': '組織',
      'nav.about.qgf': 'QGF',
      'nav.about.mission': 'ミッション',
      'nav.about.testimonials': '評判',

      'nav.business.web2': 'WEB2革新',
      'nav.business.core': '中核',
      'nav.business.future': '将来',
      'nav.business.v5': 'V5',

      'nav.txo.origin': '起源',
      'nav.txo.founder': '創業者',
      'nav.txo.team': '開発',
      'nav.txo.offline': '対面OTC',

      'nav.license.statement': '法令声明',
      'nav.license.verification': '証明確認',

      'profit.page_title': '収益システム · シグナル · 紹介 · VIP',
      'profit.page_desc': '取引シグナル、紹介プログラム、VIPチーム計画、35日例を確認し、スマートツールで複利パフォーマンスを試算できます。',
      'profit.hero_title': '多次元の収益<br>共創で成長',
      'profit.hero_desc': 'Qicheng Holdings はグローバルな <span class="qc-text-highlight">取引シグナル</span>、<span class="qc-text-highlight">紹介報酬</span>、<span class="qc-text-highlight">VIPチーム</span>により、包括的な資産成長システムを提供します。<br class="hidden sm:block">',
      'profit.hero_img_alt': '収益システム',
      'profit.signals_icon_alt': 'シグナルアイコン',
      'profit.signals_title': 'Trading Signals',
      'profit.signals_subtitle': 'AI 量化シグナル',
      'profit.signals_lead': '世界共通シグナル、国境なき実行',
      'profit.signals_desc': 'ルール厳守：各シグナルは固定の資金管理で実行。TXO のコピー取引でワンクリック追随し、実行の一貫性を高めます。',
      'profit.rules_title': '取引ルール',
      'profit.rule_position_label': 'ポジション',
      'profit.rule_position_value': '各シグナルで残高の 2% を使用',
      'profit.rule_return_label': '想定リターン',
      'profit.rule_return_value': '1回平均 約50%（総資産 +1% 相当）',
      'profit.rule_freq_label': '頻度',
      'profit.rule_freq_value': '会員特典により 1日 2–4 回',
      'profit.rule_miss_label': '欠席',
      'profit.rule_miss_value': '理由を問わず見逃し分の補償なし',
      'profit.perk_basic_title': '基本会員',
      'profit.perk_basic_desc': '初回入金で基本会員。永久に1日2シグナル。各取引は残高の2%。',
      'profit.perk_honor_title': '栄誉シグナル',
      'profit.perk_honor_desc': '正式会員を1名招待で永久シグナルを1つ追加。各取引は残高の2%。',
      'profit.perk_team_title': 'チームシグナル',
      'profit.perk_team_desc': '正式会員を3名招待で永久シグナルを1つ追加。各取引は残高の2%。',
      'profit.perk_referral_title': '紹介シグナル',
      'profit.perk_referral_desc': '友人を招待して正式会員に。招待者と新会員が同日に各1シグナル追加（残高の2%で取引）。同日複数招待は加算。',
      'profit.example_title': '例',
      'profit.example_desc': '例：$1,000、基本会員で1日2シグナル。“1回 +1%”相当で計算：',
      'profit.example_lines': '1日目末 ≈ 1000 × 1.01² = 1020<br>10日目末 ≈ 1000 × 1.01^(2×10) = 1219<br>35日目末 ≈ 1000 × 1.01^(2×35) = 2000',
      'profit.cta_calculator': '計算機へ',
      'profit.factor_title': '複利成長係数',
      'profit.factor_desc': '1シグナルあたりの等価成長',
      'profit.factor_card1_title': '総シグナル数',
      'profit.factor_card1_desc': '1日のシグナル × 日数',
      'profit.factor_card2_title': 'モデル',
      'profit.factor_card2_desc': '元本 × 1.01^総回数',
      'profit.hours_title': 'グローバル取引時間',
      'profit.hours_img_alt': 'グローバル取引時間',
      'profit.hours_note': '地域別の活発時間の対照（時差実行に便利）',
      'profit.referral_title': 'Referral Program',
      'profit.referral_subtitle': '紹介報酬',
      'profit.referral_desc': '初回入金（≥ $500）で100%対象。友人が登録・初回入金すると双方が報酬と追加シグナルを獲得。',
      'profit.referral_rules_title': 'ルール',
      'profit.referral_rule1': '新会員の初回入金は ≥ $500 かつ紹介者残高の30%以上。',
      'profit.referral_rule2': '同日に双方へ追加シグナル（残高の2%で取引）。',
      'profit.referral_rule3': '初回紹介で永久シグナル3つ目、3回目で4つ目を解放。',
      'profit.referral_th_deposit': '初回入金',
      'profit.referral_th_referrer': '紹介者報酬',
      'profit.referral_th_new': '新会員報酬',
      'profit.vip_title': 'VIP Team',
      'profit.vip_subtitle': 'VIPチーム昇格',
      'profit.vip_desc': '直接6名紹介でVIP資格。チーム総取引量に基づくコミッションを10日ごと（毎月2/12/22）に精算。',
      'profit.vip_th_level': 'ランク',
      'profit.vip_th_team': 'チーム人数',
      'profit.vip_th_direct': '直接紹介',
      'profit.vip_th_bonus': '昇格ボーナス',
      'profit.vip_th_commission': '取引量リベート',
      'profit.reports_title': 'Profit Reports',
      'profit.reports_subtitle': '35日例',
      'profit.reports_desc': '$1,000、1日2–4シグナル、各2%投入、平均50%（総資産+1%相当）での複利モデル。',
      'profit.report_basic_title': '基本（2/日）',
      'profit.report_honor_title': '栄誉（3/日）',
      'profit.report_team_title': 'チーム（4/日）',
      'profit.report_total_label': '35日後の推定総資産',
      'profit.day_1': '1日目',
      'profit.day_10': '10日目',
      'profit.day_20': '20日目',
      'profit.day_30': '30日目',
      'profit.cta_custom_calc': 'カスタム計算',
      'profit.rail_aria': '活動図',
      'profit.rail_tag_default': 'シグナル 活動図',
      'profit.modal_aria': '活動図プレビュー',
      'profit.modal_close': '閉じる',
      'profit.modal_title_default': 'シグナル · 活動図',
      'profit.activity_signals': 'シグナル',
      'profit.activity_referral': '紹介',
      'profit.activity_vip': 'チーム',
      'profit.activity_reports': '収益表',
      'profit.activity_suffix': '活動図',

      'license.page_title': 'グローバル運営ライセンス · TXO コンプライアンスと認証',
      'license.page_desc': 'TXO のコンプライアンス声明、ニューヨーク州の登録情報、公式証明書の確認方法をご案内します。AML・KYC・リスク管理・データプライバシー保護を理解できます。',
      'license.hero_title': 'グローバルコンプライアンス<br>安全の基盤',
      'license.hero_desc': 'TXO Exchange は TXO COMPREHENSIVE SERVICE INC. が運営。<br class="hidden sm:block">米国ニューヨーク州で適法に登録され、<span class="qc-text-highlight">金融グレード</span>の内部統制体制を構築しています。',
      'license.statement_title': 'Legal Statement',
      'license.statement_subtitle': '適法・コンプライアンス運営',
      'license.statement_desc': 'TXO COMPREHENSIVE SERVICE INC. はニューヨーク州州務局（Department of State）に正式登録済み。認証番号は <span class="qc-text-highlight">260104000062</span> です。',
      'license.aml_title': 'AML（マネーロンダリング対策）',
      'license.aml_desc': '資金源の厳格な審査メカニズム',
      'license.kyc_title': 'KYC（本人確認）',
      'license.kyc_desc': 'グローバルなユーザー認証体系',
      'license.risk_title': 'リスク管理',
      'license.risk_desc': '異常取引をリアルタイムで監視',
      'license.privacy_title': 'データプライバシー',
      'license.privacy_desc': '銀行レベルの暗号化でユーザーデータを保護',
      'license.cert_company_title': '米国認可会社証明書',
      'license.cert_company_alt': 'TXO License 1',
      'license.cert_stock_title': 'TXO 株式証明書',
      'license.cert_stock_alt': 'Stock Certificate',
      'license.verify_title': 'Verification',
      'license.verify_subtitle': '証明書照会ガイド',
      'license.step1_title': '公式システムへアクセス',
      'license.step1_desc': 'ブラウザでアクセス：<a href="https://apps.dos.ny.gov/publicInquiry/" target="_blank" style="color: #fff; text-decoration: underline;">https://apps.dos.ny.gov/publicInquiry/</a>',
      'license.step2_title': '会社名を入力',
      'license.step2_desc': 'Entity Name に入力：<span class="qc-text-highlight">TXO COMPREHENSIVE SERVICE INC</span>',
      'license.step3_title': '結果を確認',
      'license.step3_desc': 'Search をクリックし、登録状況や設立日などの詳細を公式データベースで確認します。',

      'nav.profit.signals': 'シグナル',
      'nav.profit.referral': '紹介プログラム',
      'nav.profit.vip': 'VIP',
      'nav.profit.reports': 'レポート',

      'footer.about_title': 'Qichengについて',
      'footer.txo_title': 'TXO 取引所',
      'footer.business_title': 'ビジネスモデル',
      'footer.profit_title': '収益システム',
      'footer.cta_title': '取引を始めますか？',
      'footer.cta_button': '今すぐ取引',
      'footer.tagline': 'デジタル金融と経済システムのグローバル協業組織',

      'footer.quick.txo': 'TXO 取引所',
      'footer.quick.business': 'ビジネスモデル',
      'footer.quick.license': 'コンプライアンスとライセンス',
      'footer.status_ok': 'すべてのシステムは正常に稼働しています',
      'footer.status_operational': 'すべてのシステムは正常に稼働しています',
      'footer.aria_quick_pages': '主要ページ',

      'footer.about.overview': '概要',
      'footer.about.founder': '創業者',
      'footer.about.structure': '組織構造',
      'footer.about.qgf': 'QGF財団',
      'footer.about.mission': 'ミッション',
      'footer.about.timeline': '沿革',
      'footer.about.testimonials': 'ユーザー評価',

      'footer.txo.origin': 'TXO の誕生',
      'footer.txo.founder': '創業者',
      'footer.txo.team': 'R&Dチーム',
      'footer.txo.offline': 'オフライン OTC サービス',
      'footer.txo.license': 'コンプライアンスとライセンス',

      'footer.business.web2': 'WEB2 イノベーション',
      'footer.business.core': 'コアモデル',
      'footer.business.future': '未来計画',
      'footer.business.v5': 'V5 戦略',

      'footer.profit.signals': '取引シグナルシステム',
      'footer.profit.referral': '紹介プログラム',
      'footer.profit.vip': 'VIP チームプログラム',
      'footer.profit.reports': '収益レポート',
      'footer.profit.calculator': '計算ツール',

      'home.hero_kicker': 'Qicheng Holdings Group',
      'home.hero_title': 'デジタル金融と経済システムのグローバル協業組織',
      'home.hero_subtitle': 'ロンドンを拠点に、30+の国と地域をカバーするデジタル経済協業ネットワークを構築。透明性・安全性・イノベーションを中核に、デジタル金融と実体経済の深い融合を推進します。',
      'home.hero_cta_business': 'ビジネスモデルを見る',
      'home.hero_cta_txo': 'TXO 取引所へ',
      'home.london_title': 'ロンドンを拠点に · 世界へ',
      'home.london_desc': 'Qicheng Holdings Group（QCH）は2020年に設立され、英国ロンドンに本社を置きます。成熟した規制環境のもとで、未来志向のグローバルなデジタル経済インフラを構築しています。',
      'home.london_cta_about': 'Qichengについて',
      'home.flags_caption': '世界をカバーする投資ネットワークを構築し、あらゆる成長機会を捉える',
      'home.principles_title': '5つのコア原則',
      'home.principles_subtitle': '信頼できるグローバル価値ネットワークの構築',
      'home.principles_desc': '透明性・安全性・協働・イノベーション・持続可能性は、グローバルなデジタル経済時代におけるQichengの設計思想です。5つの軸が相互に支え合い、開かれた包括的で信頼できるエコシステムを形成します。',
      'home.principle_transparency_title': '透明性',
      'home.principle_transparency_desc': 'データとプロセスの透明性を基盤に、情報開示の仕組みを整え、取引と意思決定の追跡可能性を高めます。',
      'home.principle_security_title': '安全性',
      'home.principle_security_desc': '技術と制度の二重防護。多層暗号化、スマートリスク管理、コンプライアンス監査で銀行レベルの安全性を提供します。',
      'home.principle_collaboration_title': '協働',
      'home.principle_collaboration_desc': '地域・業界を越えた連携を促進し、世界のリソースをつなぎ、共創価値を生み出すwin-winのネットワークを構築します。',
      'home.principle_innovation_title': 'イノベーション',
      'home.principle_innovation_desc': 'AI・ブロックチェーン・ビッグデータなど先端技術の実装を探求し、技術革新でビジネスモデル革新を推進します。',
      'home.principle_sustainability_title': '持続可能性',
      'home.principle_sustainability_desc': '長期価値と社会的責任に注目し、デジタル経済とグリーン開発を統合した持続可能なモデルを構築します。',
      'home.txo_section_title': 'TXO 取引所 · デジタル資産インフラ',
      'home.txo_section_desc': 'TXOはQichengエコシステムがトップ技術・金融チームと共に構築し、高性能かつ強固なリスク管理を備えた次世代デジタル資産取引インフラを目指します。',
      'home.txo_cta_detail': 'TXO の詳細',
      'home.txo_cta_license': 'コンプライアンスとライセンス',
      'home.bridge_quote': '私たちは共有経済を推進し、誰もが豊かになれる未来を創造します',
      'home.testimonials_title': '期待を超えて',
      'home.testimonials_desc': 'Qichengは深い市場洞察と精緻な戦略で、長期的かつ安定した資産成長を目指します。<br class="hidden sm:block">\n            私たちの専門的なガイダンスにより、投資家は複雑な市場でも着実に前進できます。<br class="hidden sm:block">\n            TXO取引ソフトとの深い連携により、比類ない取引体験を提供します。',

      'txo.page_title': 'TXO 暗号資産取引所 · Qicheng デジタル資産インフラ',
      'txo.page_desc': 'TXO 暗号資産取引所の誕生、ビジョンと名称の意味、創業チームとグローバル資本の支援、そして世界各地の対面OTCネットワークをご紹介します。',
      'txo.hero_title': '次世代デジタル資産<br>取引インフラ',
      'txo.hero_desc': 'TXO は Qihang Capital と Helios Chain Research Institute により共同設立され、<span class="qc-text-highlight">効率</span>・<span class="qc-text-highlight">安全</span>・<span class="qc-text-highlight">知能</span>で世界のデジタル資産取引を再定義します。',
      'txo.vision_title': 'TXO の中核理念',
      'txo.section_vision_kicker': 'ビジョン',
      'txo.vision_t_word': 'Titan / Trade',
      'txo.vision_x_word': 'eXchange / X-Economy',
      'txo.vision_o_word': 'Opportunity / Open',
      'txo.vision_t_desc': '堅牢で信頼できる基盤とグローバル級の取引能力',
      'txo.vision_x_desc': '未来志向の次世代グローバル経済の姿',
      'txo.vision_o_desc': '価値が世界を巡る、開かれた共創機会',
      'txo.founder_title': '技術と金融の二重の基盤',
      'txo.section_founder_kicker': '創業者',
      'txo.founder_role': 'TXO 創業者兼チーフアーキテクト',
      'txo.founder_p1': 'Adrian Caldwell 博士は分散型金融アーキテクチャの国際的権威です。<span class="qc-text-highlight">スタンフォード大学</span>で計算機科学を修め、<span class="qc-text-highlight">インペリアル・カレッジ・ロンドン</span>で金融工学の博士号を2つ取得しました。',
      'txo.founder_p2': 'ゴールドマン・サックスのクオンツ・モデリングチーム中核メンバーを経て、2019年に Helios Chain Research Institute を設立。次世代高性能クリアリングと分散リスク管理ネットワークを研究し、TXO はその成果を体系化した実装です。',
      'txo.team_title': 'トップ人材とグローバル資本',
      'txo.section_team_kicker': '中核優位',
      'txo.team_rnd_title': '学際的R&Dチーム',
      'txo.team_rnd_1': 'Goldman Sachs／Morgan Stanley 出身のクオンツ・リスク管理人材',
      'txo.team_rnd_2': 'Google／Meta 出身の分散システム・アーキテクト',
      'txo.team_rnd_3': 'MIT 暗号研究拠点出身の暗号エンジニア',
      'txo.team_capital_title': 'グローバル資本の支援',
      'txo.offline_title': '対面取引ネットワーク',
      'txo.section_offline_kicker': 'グローバルサービス',
      'txo.offline_desc': 'オンラインのマッチングに加え、TXO は世界主要地域をカバーする<span class="qc-text-highlight">対面取引ネットワーク</span>を構築し、機関投資家や富裕層向けに安全かつプライベートなOTCサービスを提供します。',
      'txo.offline_card1_title': '公式認証',
      'txo.offline_card1_desc': '地域別の対面取引機関の資格認証',
      'txo.offline_card2_title': 'コンプライアンス',
      'txo.offline_card2_desc': '取引の適法性と資金安全性を強化',

      'business.page_title': 'Qicheng ビジネスモデル · デジタル経済インフラ',
      'business.page_desc': 'Qicheng Holdings Groupが提唱する「デジタル資産 + 管理可能データ + 連結シナリオ + グローバル運営システム」のビジネスインフラモデルと、V5グローバル戦略マトリクスを紹介します。',
      'business.hero_title': 'エコシステムの閉ループ<br>価値創造',
      'business.hero_desc': 'Qicheng Holdings Groupは「デジタル資産 + 管理可能データ + 連結シナリオ + グローバル運営システム」というビジネスインフラモデルを提唱。<br class="hidden sm:block"><span class="qc-text-highlight">このモデル</span>でWeb2時代の構造的矛盾を体系的に解決します。',
      'business.web2_kicker': '課題',
      'business.web2_title': 'Web2 の構造的矛盾',
      'business.web2_desc': '現代のWeb2.0では、ユーザーが価値を生み出しても、貢献に見合うリターンを得にくい状況があります。プラットフォームがデータと価値の大半を握り、高度に中央集権的な閉ループが形成されています。',
      'business.web2_card1_title': '価値のミスマッチ',
      'business.web2_card1_desc': 'ユーザーが価値を生む一方、収益はプラットフォームが独占',
      'business.web2_card2_title': 'データサイロ',
      'business.web2_card2_desc': '企業は真正で検証可能なユーザーデータを得にくい',
      'business.web2_card3_title': '革新の制約',
      'business.web2_card3_desc': 'イノベーションの境界が単一エコシステム内に閉じる',
      'business.web2_card4_title': '高コスト',
      'business.web2_card4_desc': '閉鎖的エコシステムが獲得・運営コストを押し上げる',
      'business.core_kicker': '中核',
      'business.core_title': '4つの基盤モジュールの協働',
      'business.core_module1_img_alt': 'データの資産化',
      'business.core_module1_title': 'データの資産化',
      'business.core_module1_desc': '標準化メカニズムによりデータを「認証可能・許諾可能・価格付け可能」な生産要素として定着させ、独占を打破し、複数シナリオ間で安全に流通させます。',
      'business.core_module2_img_alt': '透明な価値循環',
      'business.core_module2_title': '透明な価値循環',
      'business.core_module2_desc': 'デジタル化されたビジネスチェーンシステムに基づき、ユーザー行動とサプライチェーン効率をエンドツーエンドで追跡し、コストとリターンを精密に一致させて無駄を減らし、効率を高めます。',
      'business.core_module3_img_alt': '相互接続エコシステム',
      'business.core_module3_title': '相互接続エコシステム',
      'business.core_module3_desc': 'データサイロを打破し、EC・ゲーム・SNS・コンテンツ間の相互運用性を実現して、業界横断・プラットフォーム横断の価値リンクを構築します。',
      'business.core_module4_img_alt': 'グローバル運営システム',
      'business.core_module4_title': 'グローバル運営システム',
      'business.core_module4_desc': 'グローバル運営・技術センターを構築し、企業の国際市場への迅速な拡大を支援。世界の資本と資源を接続し、協働する産業ネットワークを形成します。',
      'business.future_kicker': '未来構想',
      'business.future_title': '新しい経済インフラ',
      'business.future_card1_title': 'データインフラ',
      'business.future_card1_desc': '高い安全性と可用性を備えたデータ基盤とプライバシー計算フレームワークで、データ主権を守ります。',
      'business.future_card2_title': 'インテリジェント商業エンジン',
      'business.future_card2_desc': 'AI駆動の意思決定と自動運用システムにより、ビジネス効率を向上させます。',
      'business.future_card3_title': 'デジタル経済回廊',
      'business.future_card3_desc': '複数国市場をつなぐ価値流通・決済の「高速道路」を構築し、越境貿易を促進します。',
      'business.v5_kicker': 'V5 戦略',
      'business.v5_title': 'V5 グローバル戦略マトリクス',
      'business.v5_quote': '技術・資産・安全・産業・インフラの5つの次元から、Qicheng Holdings Groupの長期的な発展ロードマップを描きます。',
      'business.v5_chip1_title': 'Technology',
      'business.v5_chip1_desc': '先端技術で革新を駆動',
      'business.v5_chip2_title': 'Asset',
      'business.v5_chip2_desc': 'デジタル資産は価値の基盤',
      'business.v5_chip3_title': 'Security',
      'business.v5_chip3_desc': '多層のリスク管理で安全を確保',
      'business.v5_chip4_title': 'Industry',
      'business.v5_chip4_desc': '産業融合でエコシステム共創',
      'business.v5_chip5_title': 'Infrastructure',
      'business.v5_chip5_desc': 'グローバル基盤で相互接続',

      'about.page_title': 'Qichengについて · Qicheng Holdings Group',
      'about.page_desc': 'Qicheng Holdings Groupの概要、創業者、グローバル組織構造、QGF財団、そしてミッションと価値観を紹介します。',
      'about.hero_title': 'グローバルな<br>デジタル協業ネットワークを構築',
      'about.hero_desc': 'Qicheng Holdings Group(QCH)は2020年に設立され、英国ロンドンに本社を置きます。<br class="hidden sm:block">世界の金融ハブをつなぎ、<span class="qc-text-highlight">透明</span>・<span class="qc-text-highlight">安全</span>・<span class="qc-text-highlight">持続可能</span>なデジタル経済エコシステムを構築します。',
      'about.overview_kicker': '基盤',
      'about.overview_title': 'ロンドンを拠点に、世界とつながる',
      'about.stat_founded': '設立年',
      'about.stat_countries': '対象国',
      'about.stat_aum': '運用資産（AUM）',
      'about.intro_p1': 'QCHは設立当初から“<span class="qc-text-highlight">グローバルなデジタル経済協業ネットワークの構築者</span>”というビジョンを掲げました。私たちは単なる投資機関ではなく、デジタル資産と実体経済をつなぐ架け橋です。',
      'about.intro_p2': 'ロンドンの成熟した規制環境、金融インフラ、開かれたイノベーションを基盤に、QCHは数年で<span class="qc-text-highlight">30+</span>の国・地域をカバーする協業ネットワークを築きました。',
      'about.tab_compliance_title': 'コンプライアンス運用',
      'about.tab_compliance_desc': 'TXOは米国MSBライセンスとコンプライアンス資格を保有し、金融機関レベルのリスク管理体制を構築しています。',
      'about.tab_tech_title': 'テクノロジードリブン',
      'about.tab_tech_desc': 'OpenAI・Geminiなどの先端AIモデルを統合し、インテリジェントな取引エンジンを構築します。',
      'about.tab_ecosystem_title': 'エコシステム共創',
      'about.tab_ecosystem_desc': 'Goldman SachsやSequoiaなどのグローバルトップキャピタルと協力し、持続可能な金融エコシステムを構築します。',
      'about.img_compliance_alt': 'コンプライアンス資格',
      'about.img_tech_alt': '技術パートナー',
      'about.img_ecosystem_alt': 'エコシステムパートナー',
      'about.partners_title': 'パートナー',
      'about.partners_strip_alt': 'パートナーロゴ',
      'about.founder_kicker': 'リーダーシップ',
      'about.founder_title': '数学と技術の融合',
      'about.founder_role': '最高経営責任者（CEO）',
      'about.founder_p1': 'Robert Harrisonは<span class="qc-text-highlight">オックスフォード大学</span>を卒業し、金融数学と新興経済システムを専攻。国際フィンテック、資産配分、越境規制フレームワークで17年以上の経験を有します。',
      'about.founder_p2': 'ブロックチェーン技術と伝統的資本市場の融合を先導し、多くの多国籍のデジタル金融インフラプロジェクトに参画。国際メディアからは世界のデジタル金融の進展を促す<span class="qc-text-highlight">重要人物</span>と評価されています。',
      'about.founder_p3': '彼のリーダーシップのもと、Qicheng Holdings Groupは厳格な構造モデルとグローバル視点を維持し、世界の投資家へ<span class="qc-text-highlight">長期価値</span>を提供し続けます。',
      'about.structure_kicker': 'グローバルネットワーク',
      'about.structure_title': '分野横断の協業で知見を結集',
      'about.structure_card1_title': '技術専門家',
      'about.structure_card1_desc': 'AI・分散システム分野のトップ人材',
      'about.structure_card2_title': '金融アナリスト',
      'about.structure_card2_desc': '鋭い市場洞察を持つ国際機関投資家',
      'about.structure_card3_title': '業界リーダー',
      'about.structure_card3_desc': 'エネルギー・製造・教育分野の実務家',
      'about.structure_card4_title': '経済アドバイザー',
      'about.structure_card4_desc': '国際政策研究に精通した権威ある学者・顧問',
      'about.qgf_kicker': '財団',
      'about.qgf_title': '長期資本で革新を駆動',
      'about.qgf_quote': 'QGFは現在、約<span class="qc-text-highlight">7.8億ドル</span>相当のAUMを運用し、マルチアセットモデルとグローバル分散戦略でデジタル経済インフラを支えています。',
      'about.qgf_card1_img_alt': '長期資本',
      'about.qgf_card1_title': '長期資本の注入',
      'about.qgf_card1_desc': 'QCH年次純利益から一定割合を注入し、継続的な拡張力を確保します。',
      'about.qgf_card2_img_alt': '戦略提携',
      'about.qgf_card2_title': '戦略資本パートナーシップ',
      'about.qgf_card2_desc': 'Blackstone、Sequoia、JPMorgan Chaseなどのトップ機関と緊密に協業します。',
      'about.qgf_card3_img_alt': 'リスクヘッジ',
      'about.qgf_card3_title': 'リスクヘッジ機構',
      'about.qgf_card3_desc': '精緻なリスク管理により、グローバルパートナーへ安定的な技術・資金支援を提供します。',
      'about.mission_kicker': 'ミッションと価値',
      'about.mission_title': '5つの核となる価値',
      'about.value_transparency_title': '透明性',
      'about.value_transparency_desc': 'データとプロセスの透明性を基盤に信頼を高めます。',
      'about.value_security_title': '安全性',
      'about.value_security_desc': '技術とガバナンスの両面で資産を守ります。',
      'about.value_collaboration_title': '協働',
      'about.value_collaboration_desc': '地域・業界を越えて協力し、共創する価値ネットワークを構築します。',
      'about.value_innovation_title': '革新',
      'about.value_innovation_desc': 'AI・ブロックチェーンの高効率な金融実装を探求します。',
      'about.value_sustainability_title': '持続可能性',
      'about.value_sustainability_desc': '長期価値を重視し、デジタル経済とグリーン開発を統合します。',
      'about.resend_title': 'デジタル金融を<br>普遍的なグローバル基盤へ',
      'about.resend_desc': '誰もが利用でき、誰もが恩恵を受ける。<span class="qc-text-highlight">透明</span>・<span class="qc-text-highlight">安全</span>・<span class="qc-text-highlight">スマート</span>・<span class="qc-text-highlight">包摂</span>の価値流通ネットワークを構築します。',
    },

    ko: {
      'nav.logo_aria': 'Qicheng Holdings Group',
      'nav.logo_alt': 'Qicheng Holdings Group',
      'nav.home': '홈',
      'nav.about': 'Qicheng',
      'nav.business': '비즈니스 모델',
      'nav.txo': 'TXO 거래소',
      'nav.license': '컴플라이언스 및 라이선스',
      'nav.profit': '수익 시스템',
      'nav.calculator': '계산기',

      'nav.aria_main': '메인 내비게이션',
      'nav.toggle': '내비게이션 전환',

      'nav.about.overview': '기관 개요',
      'nav.about.founder': '창립자',
      'nav.about.structure': '조직 구조',
      'nav.about.qgf': 'QGF 재단',
      'nav.about.mission': '미션',
      'nav.about.testimonials': '사용자 평가',

      'nav.business.web2': 'WEB2 혁신',
      'nav.business.core': '핵심 모델',
      'nav.business.future': '미래 기획',
      'nav.business.v5': 'V5 전략',

      'nav.txo.origin': 'TXO의 탄생',
      'nav.txo.founder': '창립자',
      'nav.txo.team': 'R&D 팀',
      'nav.txo.offline': '오프라인 OTC 서비스',

      'nav.license.statement': '합법·컴플라이언스 성명',
      'nav.license.verification': '인증서 조회 방법',

      'profit.page_title': '수익 시스템 · 시그널 · 추천 · VIP 팀',
      'profit.page_desc': '거래 시그널 시스템, 추천 프로그램, VIP 팀 플랜과 35일 예시를 확인하고, 스마트 도구로 복리 성과를 추정하세요.',
      'profit.hero_title': '다차원 수익<br>함께 성장',
      'profit.hero_desc': 'Qicheng Holdings는 글로벌 <span class="qc-text-highlight">거래 시그널</span>, <span class="qc-text-highlight">추천 보상</span>, <span class="qc-text-highlight">VIP 팀 프로그램</span>을 통해 전방위 자산 증대 체계를 제공합니다.<br class="hidden sm:block">',
      'profit.hero_img_alt': '다차원 수익 시스템',
      'profit.signals_icon_alt': '거래 시그널 아이콘',
      'profit.signals_title': 'Trading Signals',
      'profit.signals_subtitle': 'AI 퀀트 거래 시그널',
      'profit.signals_lead': '글로벌 통합 시그널, 국경 없는 실행',
      'profit.signals_desc': '규칙을 엄격히 준수하세요: 각 시그널은 고정 자금 관리로 실행됩니다. TXO 복사 거래로 원클릭 추종하여 진입 장벽을 낮추고 실행 일관성을 높입니다.',
      'profit.rules_title': '거래 규칙',
      'profit.rule_position_label': '포지션 관리',
      'profit.rule_position_value': '시그널당 잔고의 2% 사용',
      'profit.rule_return_label': '수익 가정',
      'profit.rule_return_value': '1회 평균 약 50% (총자산 +1% 상당)',
      'profit.rule_freq_label': '시그널 빈도',
      'profit.rule_freq_value': '회원 혜택에 따라 하루 2–4회',
      'profit.rule_miss_label': '미참여 규칙',
      'profit.rule_miss_value': '어떤 사유로든 시그널을 놓치면 보상하지 않습니다',
      'profit.perk_basic_title': '기본 회원 혜택',
      'profit.perk_basic_desc': '첫 입금 완료 시 기본 회원이 되며, 영구적으로 하루 2개 시그널을 제공합니다. 각 거래는 잔고의 2%를 사용합니다.',
      'profit.perk_honor_title': '명예 시그널',
      'profit.perk_honor_desc': '정식 회원 1명을 초대하면 영구 추가 시그널 1개(명예 시그널)를 획득합니다. 각 거래는 잔고의 2%를 사용합니다.',
      'profit.perk_team_title': '팀 시그널',
      'profit.perk_team_desc': '정식 회원 3명을 초대하면 영구 추가 시그널 1개(팀 시그널)를 획득합니다. 각 거래는 잔고의 2%를 사용합니다.',
      'profit.perk_referral_title': '추천 시그널 보상',
      'profit.perk_referral_desc': '친구를 초대해 정식 회원이 되면, 초대한 사람과 신규 회원이 같은 날 각각 1개의 추가 시그널(추천 시그널)을 받습니다. 잔고의 2%로 거래하며, 당일 다수 초대 시 누적됩니다.',
      'profit.example_title': '예시',
      'profit.example_desc': '예시: 초기 자금 $1,000, 기본 회원 하루 2회. “시그널당 +1%” 등가 성장으로 계산:',
      'profit.example_lines': '1일차 말 ≈ 1000 × 1.01² = 1020<br>10일차 말 ≈ 1000 × 1.01^(2×10) = 1219<br>35일차 말 ≈ 1000 × 1.01^(2×35) = 2000',
      'profit.cta_calculator': '수익 계산기로 이동',
      'profit.factor_title': '복리 성장 계수',
      'profit.factor_desc': '시그널 1회 등가 성장',
      'profit.factor_card1_title': '총 시그널 횟수',
      'profit.factor_card1_desc': '일일 시그널 × 일수',
      'profit.factor_card2_title': '계산 모델',
      'profit.factor_card2_desc': '원금 × 1.01^총횟수',
      'profit.hours_title': '글로벌 거래 시간표',
      'profit.hours_img_alt': '글로벌 거래 시간표',
      'profit.hours_note': '지역별 거래 활발 시간 비교(시차 실행에 유용)',
      'profit.referral_title': 'Referral Program',
      'profit.referral_subtitle': '추천 보상 프로그램',
      'profit.referral_desc': '첫 입금(≥ $500) 완료 시 100% 추천 보상 대상입니다. 친구가 등록 후 첫 입금을 완료하면 양쪽 모두 보상과 추가 시그널을 획득합니다.',
      'profit.referral_rules_title': '규칙',
      'profit.referral_rule1': '신규 회원 첫 입금은 ≥ $500이며 추천인 잔고의 30% 이상이어야 합니다.',
      'profit.referral_rule2': '추천인과 신규 회원은 같은 날 추가 추천 시그널을 받고, 각자 잔고의 2%로 거래합니다.',
      'profit.referral_rule3': '첫 추천 완료 시 영구 3번째 시그널, 세 번째 추천 완료 시 영구 4번째 시그널을 해제합니다.',
      'profit.referral_th_deposit': '첫 입금',
      'profit.referral_th_referrer': '추천인 보상',
      'profit.referral_th_new': '신규 회원 보상',
      'profit.vip_title': 'VIP Team',
      'profit.vip_subtitle': 'VIP 팀 승급',
      'profit.vip_desc': '직접 6명 추천 시 VIP 자격을 얻고 영구 패시브 인컴을 누립니다. 거래량 커미션은 팀 총 거래량 기준이며 10일마다(매월 2/12/22일) 정산됩니다.',
      'profit.vip_th_level': '등급',
      'profit.vip_th_team': '팀 인원',
      'profit.vip_th_direct': '직접 추천',
      'profit.vip_th_bonus': '승급 보너스',
      'profit.vip_th_commission': '거래량 리베이트',
      'profit.reports_title': 'Profit Reports',
      'profit.reports_subtitle': '35일 수익 예시',
      'profit.reports_desc': '초기 $1,000, 하루 2–4회, 시그널당 2% 투입, 평균 50%(총자산 +1% 상당) 기반의 복리 모델 추정입니다.',
      'profit.report_basic_title': '기본 (2회/일)',
      'profit.report_honor_title': '명예 (3회/일)',
      'profit.report_team_title': '팀 (4회/일)',
      'profit.report_total_label': '35일 후 예상 총자산',
      'profit.day_1': '1일차',
      'profit.day_10': '10일차',
      'profit.day_20': '20일차',
      'profit.day_30': '30일차',
      'profit.cta_custom_calc': '수익 직접 계산하기',
      'profit.rail_aria': '활동도',
      'profit.rail_tag_default': '시그널 활동도',
      'profit.modal_aria': '활동도 미리보기',
      'profit.modal_close': '닫기',
      'profit.modal_title_default': '시그널 · 활동도',
      'profit.activity_signals': '시그널',
      'profit.activity_referral': '추천 보상',
      'profit.activity_vip': '팀 보상',
      'profit.activity_reports': '수익표',
      'profit.activity_suffix': '활동도',

      'license.page_title': '글로벌 운영 라이선스 · TXO 컴플라이언스 및 인증',
      'license.page_desc': 'TXO의 합법·컴플라이언스 성명, 뉴욕주 등록 정보, 공식 인증서 조회 방법을 확인하세요. AML, KYC, 리스크 컨트롤, 데이터 프라이버시 보호 체계를 소개합니다.',
      'license.hero_title': '글로벌 컴플라이언스<br>보안의 기반',
      'license.hero_desc': 'TXO Exchange는 TXO COMPREHENSIVE SERVICE INC.가 운영합니다.<br class="hidden sm:block">미국 뉴욕주에 합법적으로 등록되어 있으며 <span class="qc-text-highlight">금융급</span> 내부통제 체계를 구축했습니다.',
      'license.statement_title': 'Legal Statement',
      'license.statement_subtitle': '준법 운영',
      'license.statement_desc': 'TXO COMPREHENSIVE SERVICE INC.는 뉴욕주 주무부(Department of State)에 공식 등록되어 있습니다. 인증 번호는 <span class="qc-text-highlight">260104000062</span>입니다.',
      'license.aml_title': '자금세탁방지(AML)',
      'license.aml_desc': '자금 출처에 대한 엄격한 심사 메커니즘',
      'license.kyc_title': '신원확인(KYC)',
      'license.kyc_desc': '글로벌 사용자 신원 인증 체계',
      'license.risk_title': '리스크 컨트롤',
      'license.risk_desc': '이상 거래 행위를 실시간 모니터링',
      'license.privacy_title': '데이터 프라이버시',
      'license.privacy_desc': '은행급 암호화로 사용자 데이터 보호',
      'license.cert_company_title': '미국 승인 법인 인증서',
      'license.cert_company_alt': 'TXO License 1',
      'license.cert_stock_title': 'TXO 주식 인증서',
      'license.cert_stock_alt': 'Stock Certificate',
      'license.verify_title': 'Verification',
      'license.verify_subtitle': '인증서 조회 안내',
      'license.step1_title': '공식 시스템 접속',
      'license.step1_desc': '브라우저에서 접속: <a href="https://apps.dos.ny.gov/publicInquiry/" target="_blank" style="color: #fff; text-decoration: underline;">https://apps.dos.ny.gov/publicInquiry/</a>',
      'license.step2_title': '회사명 입력',
      'license.step2_desc': 'Entity Name 입력란에 다음을 입력: <span class="qc-text-highlight">TXO COMPREHENSIVE SERVICE INC</span>',
      'license.step3_title': '결과 확인',
      'license.step3_desc': 'Search 버튼을 눌러 등록 상태, 설립일 등 상세 정보를 공식 데이터베이스에서 확인합니다.',

      'nav.profit.signals': '거래 시그널 시스템',
      'nav.profit.referral': '추천 프로그램',
      'nav.profit.vip': 'VIP 팀 프로그램',
      'nav.profit.reports': '수익 리포트',

      'footer.about_title': 'Qicheng 소개',
      'footer.txo_title': 'TXO 거래소',
      'footer.business_title': '비즈니스 모델',
      'footer.profit_title': '수익 시스템',
      'footer.cta_title': '거래를 시작할 준비가 되셨나요?',
      'footer.cta_button': '지금 거래하기',
      'footer.tagline': '디지털 금융 및 경제 시스템을 위한 글로벌 협업 조직',

      'footer.quick.txo': 'TXO 거래소',
      'footer.quick.business': '비즈니스 모델',
      'footer.quick.license': '컴플라이언스 및 라이선스',
      'footer.status_ok': '모든 시스템이 정상 운영 중입니다',
      'footer.status_operational': '모든 시스템이 정상 운영 중입니다',
      'footer.aria_quick_pages': '주요 페이지',

      'footer.about.overview': '기관 개요',
      'footer.about.founder': '창립자',
      'footer.about.structure': '조직 구조',
      'footer.about.qgf': 'QGF 재단',
      'footer.about.mission': '미션',
      'footer.about.timeline': '연혁',
      'footer.about.testimonials': '사용자 평가',

      'footer.txo.origin': 'TXO의 탄생',
      'footer.txo.founder': '창립자',
      'footer.txo.team': 'R&D 팀',
      'footer.txo.offline': '오프라인 OTC 서비스',
      'footer.txo.license': '컴플라이언스 및 라이선스',

      'footer.business.web2': 'WEB2 혁신',
      'footer.business.core': '핵심 모델',
      'footer.business.future': '미래 기획',
      'footer.business.v5': 'V5 전략',

      'footer.profit.signals': '거래 시그널 시스템',
      'footer.profit.referral': '추천 프로그램',
      'footer.profit.vip': 'VIP 팀 프로그램',
      'footer.profit.reports': '수익 리포트',
      'footer.profit.calculator': '계산기',

      'home.hero_kicker': 'Qicheng Holdings Group',
      'home.hero_title': '디지털 금융 및 경제 시스템을 위한 글로벌 협업 조직',
      'home.hero_subtitle': '런던을 기반으로 30+개 국가·지역을 아우르는 디지털 경제 협업 네트워크를 구축합니다. <span class="qc-text-highlight">투명성</span>·<span class="qc-text-highlight">보안</span>·<span class="qc-text-highlight">혁신</span>을 핵심으로 디지털 금융과 실물 경제의 깊은 융합을 촉진합니다.',
      'home.hero_cta_business': '비즈니스 모델 보기',
      'home.hero_cta_txo': 'TXO 거래소 입장',
      'home.london_title': '런던 기반 · 글로벌 확장',
      'home.london_desc': 'Qicheng Holdings Group(QCH)은 2020년에 설립되어 영국 런던에 본사를 두고 있습니다. 성숙하고 규제가 잘 갖춰진 금융 환경에서 미래 지향적인 글로벌 디지털 경제 인프라를 구축합니다.',
      'home.london_cta_about': 'Qicheng 소개',
      'home.flags_caption': '전 세계를 아우르는 투자 네트워크를 구축하고 모든 성장 기회를 포착합니다',
      'home.principles_title': '5대 핵심 원칙',
      'home.principles_subtitle': '신뢰할 수 있는 글로벌 가치 네트워크 구축',
      'home.principles_desc': '투명성, 보안, 협업, 혁신, 지속가능성은 글로벌 디지털 경제 시대를 위한 Qicheng의 설계 논리입니다. 이 다섯 가지 축이 서로를 지지하며 개방적이고 포용적이며 신뢰할 수 있는 생태계를 형성합니다.',
      'home.principle_transparency_title': '투명성',
      'home.principle_transparency_desc': '데이터와 프로세스의 투명성을 기반으로 공개적 정보공시 체계를 통해 신뢰를 높이고, 거래와 의사결정의 추적 가능성을 강화합니다.',
      'home.principle_security_title': '보안',
      'home.principle_security_desc': '기술과 제도의 이중 보호: 다중 암호화, 지능형 리스크 관리, 컴플라이언스 감사로 은행급 안전을 제공합니다.',
      'home.principle_collaboration_title': '협업',
      'home.principle_collaboration_desc': '지역·산업 간 협력을 장려하고 글로벌 자원을 연결해 상생 가치 네트워크를 구축하며, 가치 공동 창출을 촉진합니다.',
      'home.principle_innovation_title': '혁신',
      'home.principle_innovation_desc': 'AI, 블록체인, 빅데이터 등 첨단 기술의 효율적 적용을 지속 탐색하여 기술 혁신으로 비즈니스 혁신을 이끕니다.',
      'home.principle_sustainability_title': '지속가능성',
      'home.principle_sustainability_desc': '장기 가치와 사회적 책임에 집중하고 디지털 경제와 그린 발전을 결합해 지속 가능한 모델을 구축합니다.',
      'home.txo_section_title': 'TXO 거래소 · 디지털 자산 인프라',
      'home.txo_section_desc': 'TXO는 Qicheng 생태계가 최정상 기술·금융 팀과 함께 구축한 차세대 디지털 자산 거래 인프라로, 고성능과 강력한 리스크 관리에 집중합니다.',
      'home.txo_cta_detail': 'TXO 자세히 보기',
      'home.txo_cta_license': '컴플라이언스 및 라이선스 보기',
      'home.bridge_quote': '우리는 공유 경제를 촉진하고 모두가 풍요로운 미래를 만들어갑니다',
      'home.testimonials_title': '기대를 넘어',
      'home.testimonials_desc': 'Qicheng은 깊은 시장 통찰과 정교한 투자 전략으로 고객의 장기적이고 안정적인 자산 성장을 돕습니다.<br class="hidden sm:block">\n            전문적인 가이던스 아래 투자자는 복잡한 시장에서도 흔들림 없이 전진할 수 있습니다.<br class="hidden sm:block">\n            TXO 거래 소프트웨어와의 깊은 협업은 비교할 수 없는 거래 경험을 제공합니다.',

      'txo.page_title': 'TXO 암호화폐 거래소 · Qicheng 디지털 자산 인프라',
      'txo.page_desc': 'TXO 암호화폐 거래소의 탄생, 비전과 이름의 의미, 핵심 창립팀과 글로벌 자본 지원, 그리고 전 세계 오프라인 OTC 서비스 네트워크를 소개합니다.',
      'txo.hero_title': '차세대 디지털 자산<br>거래 인프라',
      'txo.hero_desc': 'TXO는 Qihang Capital과 Helios Chain Research Institute가 공동 설립했으며, <span class="qc-text-highlight">효율</span>·<span class="qc-text-highlight">보안</span>·<span class="qc-text-highlight">지능</span>으로 글로벌 디지털 자산 거래를 재정의합니다.',
      'txo.vision_title': 'TXO 핵심 철학',
      'txo.section_vision_kicker': '비전',
      'txo.vision_t_word': 'Titan / Trade',
      'txo.vision_x_word': 'eXchange / X-Economy',
      'txo.vision_o_word': 'Opportunity / Open',
      'txo.vision_t_desc': '견고하고 신뢰할 수 있는 인프라와 글로벌급 거래 역량',
      'txo.vision_x_desc': '미래 지향의 차세대 글로벌 경제 패러다임',
      'txo.vision_o_desc': '전 세계 가치 흐름을 위한 개방·공유의 기회',
      'txo.founder_title': '기술과 금융의 이중 기반',
      'txo.section_founder_kicker': '창립자',
      'txo.founder_role': 'TXO 창립자 겸 수석 아키텍트',
      'txo.founder_p1': 'Adrian Caldwell 박사는 분산 금융 아키텍처 분야의 국제적 전문가입니다. <span class="qc-text-highlight">스탠퍼드 대학교</span>에서 컴퓨터과학을 전공했고, <span class="qc-text-highlight">임페리얼 칼리지 런던</span>에서 금융공학 박사 학위를 두 개 취득했습니다.',
      'txo.founder_p2': '골드만삭스 퀀트 모델링 팀 핵심 멤버로 활동했으며, 2019년 Helios Chain Research Institute를 설립해 차세대 고성능 청산 시스템과 분산 리스크 컨트롤 네트워크를 연구했습니다. TXO는 그의 연구 성과를 체계적으로 구현한 결과입니다.',
      'txo.team_title': '최정예 팀과 글로벌 자본',
      'txo.section_team_kicker': '핵심 강점',
      'txo.team_rnd_title': '융합형 R&D 팀',
      'txo.team_rnd_1': '골드만삭스·모건스탠리 출신 퀀트/리스크 전문가',
      'txo.team_rnd_2': '구글·메타 출신 분산 시스템 아키텍트',
      'txo.team_rnd_3': 'MIT 암호학 센터 출신 암호 엔지니어',
      'txo.team_capital_title': '글로벌 자본 지원',
      'txo.offline_title': '오프라인 거래 네트워크',
      'txo.section_offline_kicker': '글로벌 서비스',
      'txo.offline_desc': '온라인 매칭 시스템뿐 아니라, TXO는 전 세계 주요 지역을 아우르는 <span class="qc-text-highlight">오프라인 거래 네트워크</span>를 구축해 기관 및 고액자산가 고객에게 안전하고 프라이빗한 OTC 서비스를 제공합니다.',
      'txo.offline_card1_title': '공식 인증',
      'txo.offline_card1_desc': '지역별 오프라인 거래 기관 자격 인증',
      'txo.offline_card2_title': '컴플라이언스',
      'txo.offline_card2_desc': '거래의 준법성과 자금 안전 강화',

      'business.page_title': 'Qicheng 비즈니스 모델 · 디지털 경제 인프라',
      'business.page_desc': 'Qicheng Holdings Group이 제안하는 “디지털 자산 + 통제 가능한 데이터 + 연결된 시나리오 + 글로벌 운영 시스템” 비즈니스 인프라 모델과 V5 글로벌 전략 매트릭스를 소개합니다.',
      'business.hero_title': '생태계 폐쇄 루프<br>가치 창출',
      'business.hero_desc': 'Qicheng Holdings Group은 “디지털 자산 + 통제 가능한 데이터 + 연결된 시나리오 + 글로벌 운영 시스템” 비즈니스 인프라 모델을 제시합니다.<br class="hidden sm:block"><span class="qc-text-highlight">이 모델</span>은 Web2 시대의 구조적 모순을 시스템적으로 해결합니다.',
      'business.web2_kicker': '도전 과제',
      'business.web2_title': 'Web2의 구조적 모순',
      'business.web2_desc': '오늘날 Web2.0 세계에서 사용자는 가치를 창출하지만 기여에 상응하는 보상을 얻기 어렵습니다. 플랫폼이 대부분의 데이터와 가치를 포획해 고도로 중앙집중된 폐쇄 루프를 형성합니다.',
      'business.web2_card1_title': '가치 불일치',
      'business.web2_card1_desc': '사용자는 가치를 만들지만 수익은 플랫폼이 독점',
      'business.web2_card2_title': '데이터 사일로',
      'business.web2_card2_desc': '기업은 진짜·검증 가능한 사용자 데이터를 얻기 어렵습니다',
      'business.web2_card3_title': '혁신 제약',
      'business.web2_card3_desc': '혁신의 경계가 단일 생태계 안에 갇힘',
      'business.web2_card4_title': '높은 비용',
      'business.web2_card4_desc': '폐쇄 생태계로 고객 획득 및 운영 비용이 증가',
      'business.core_kicker': '핵심 기둥',
      'business.core_title': '4대 기반 모듈의 시너지',
      'business.core_module1_img_alt': '데이터 자산화',
      'business.core_module1_title': '데이터 자산화',
      'business.core_module1_desc': '표준화 메커니즘을 통해 데이터를 “인증 가능·권한 부여 가능·가격 책정 가능”한 생산요소로 만들고, 독점을 깨며 다양한 시나리오 간 안전한 흐름을 구현합니다.',
      'business.core_module2_img_alt': '투명한 가치 순환',
      'business.core_module2_title': '투명한 가치 순환',
      'business.core_module2_desc': '디지털 비즈니스 링크 시스템을 기반으로 사용자 행동과 공급망 효율을 전 구간 추적하여 비용과 보상을 정밀 매칭하고 낭비를 줄이며 효율을 높입니다.',
      'business.core_module3_img_alt': '상호연결 생태계',
      'business.core_module3_title': '상호연결 생태계',
      'business.core_module3_desc': '데이터 사일로를 해소하고 이커머스·게임·소셜·콘텐츠 플랫폼 간 상호운용성을 구현해 산업·플랫폼 간 가치 연결을 구축합니다.',
      'business.core_module4_img_alt': '글로벌 운영 시스템',
      'business.core_module4_title': '글로벌 운영 시스템',
      'business.core_module4_desc': '글로벌 운영 및 기술 센터를 구축해 기업의 해외 시장 확장을 지원하고, 글로벌 자본과 자원을 연결하여 협업 산업 네트워크를 형성합니다.',
      'business.future_kicker': '미래 청사진',
      'business.future_title': '신경제 인프라',
      'business.future_card1_title': '데이터 인프라',
      'business.future_card1_desc': '높은 보안성과 가용성을 갖춘 데이터 기반 및 프라이버시 컴퓨팅 프레임워크로 데이터 주권을 보호합니다.',
      'business.future_card2_title': '지능형 비즈니스 엔진',
      'business.future_card2_desc': 'AI 기반 의사결정과 자동화 운영 시스템으로 비즈니스 효율을 향상합니다.',
      'business.future_card3_title': '디지털 경제 회랑',
      'business.future_card3_desc': '여러 국가 시장을 연결하는 가치 유통·결제 “고속도로”를 구축해 국경 간 무역을 촉진합니다.',
      'business.v5_kicker': 'V5 전략',
      'business.v5_title': 'V5 글로벌 전략 매트릭스',
      'business.v5_quote': '기술·자산·보안·산업·인프라 5가지 차원에서 Qicheng Holdings Group의 장기 발전 경로를 그립니다.',
      'business.v5_chip1_title': 'Technology',
      'business.v5_chip1_desc': '첨단 기술로 혁신을 구동',
      'business.v5_chip2_title': 'Asset',
      'business.v5_chip2_desc': '디지털 자산, 가치의 기반',
      'business.v5_chip3_title': 'Security',
      'business.v5_chip3_desc': '다중 리스크 관리로 안전 보장',
      'business.v5_chip4_title': 'Industry',
      'business.v5_chip4_desc': '산업 융합, 생태계 상생',
      'business.v5_chip5_title': 'Infrastructure',
      'business.v5_chip5_desc': '글로벌 인프라로 상호연결',

      'about.page_title': 'Qicheng 소개 · Qicheng Holdings Group',
      'about.page_desc': 'Qicheng Holdings Group의 기관 개요, 창립자, 글로벌 조직 구조, QGF 재단, 그리고 미션과 가치관을 소개합니다.',
      'about.hero_title': '글로벌<br>디지털 협업 네트워크 구축',
      'about.hero_desc': 'Qicheng Holdings Group(QCH)은 2020년에 설립되었으며 런던에 본사를 두고 있습니다.<br class="hidden sm:block">전 세계 금융 허브를 연결하여 <span class="qc-text-highlight">투명</span>·<span class="qc-text-highlight">보안</span>·<span class="qc-text-highlight">지속가능</span>한 디지털 경제 생태계를 구축합니다.',
      'about.overview_kicker': '기반',
      'about.overview_title': '런던을 기반으로, 세계와 연결',
      'about.stat_founded': '설립 연도',
      'about.stat_countries': '커버 국가',
      'about.stat_aum': '운용 자산(AUM)',
      'about.intro_p1': 'QCH는 설립 초기부터 “<span class="qc-text-highlight">글로벌 디지털 경제 협업 네트워크 구축자</span>”라는 비전을 세웠습니다. 우리는 단순한 투자 기관이 아니라 디지털 자산과 실물 경제를 연결하는 다리입니다.',
      'about.intro_p2': '런던의 성숙한 규제 환경과 금융 인프라, 개방형 혁신 생태계를 기반으로 QCH는 수년 만에 <span class="qc-text-highlight">30+</span>개 국가·지역을 아우르는 협업 네트워크를 구축했습니다.',
      'about.tab_compliance_title': '컴플라이언스 운영',
      'about.tab_compliance_desc': 'TXO는 미국 MSB 라이선스와 컴플라이언스 자격을 보유하고, 기관급 리스크 관리 체계를 구축했습니다.',
      'about.tab_tech_title': '기술 중심',
      'about.tab_tech_desc': 'OpenAI, Gemini 등 최첨단 AI 모델을 통합해 지능형 디지털 자산 거래 엔진을 구축합니다.',
      'about.tab_ecosystem_title': '생태계 상생',
      'about.tab_ecosystem_desc': 'Goldman Sachs, Sequoia 등 글로벌 톱 캐피털과 협력하여 지속 가능한 금융 생태계를 구축합니다.',
      'about.img_compliance_alt': '컴플라이언스 자격',
      'about.img_tech_alt': '기술 파트너',
      'about.img_ecosystem_alt': '생태계 파트너',
      'about.partners_title': '파트너',
      'about.partners_strip_alt': '파트너 로고 스트립',
      'about.founder_kicker': '리더십',
      'about.founder_title': '수학과 기술의 융합',
      'about.founder_role': '최고경영자(CEO)',
      'about.founder_p1': 'Robert Harrison은 <span class="qc-text-highlight">옥스퍼드 대학교</span>를 졸업하고 금융 수학과 신흥 경제 시스템을 전공했습니다. 글로벌 핀테크, 자산 배분, 국경 간 규제 프레임워크 분야에서 17년 이상의 경험을 보유하고 있습니다.',
      'about.founder_p2': '블록체인 기술과 전통 자본시장의 융합을 선도하며 다수의 다국적 디지털 금융 인프라 프로젝트에 참여했습니다. 여러 국제 매체에서 그를 글로벌 디지털 금융의 체계적 발전을 이끄는 <span class="qc-text-highlight">핵심 인물</span>로 평가합니다.',
      'about.founder_p3': '그의 리더십 아래 Qicheng Holdings Group은 엄격한 구조 모델과 글로벌 전략 시야를 유지하며 전 세계 투자자에게 <span class="qc-text-highlight">장기 가치</span>를 제공하고 있습니다.',
      'about.structure_kicker': '글로벌 네트워크',
      'about.structure_title': '융합 협업으로 지혜를 모으다',
      'about.structure_card1_title': '기술 전문가',
      'about.structure_card1_desc': 'AI와 분산 시스템 분야의 최정예 인재',
      'about.structure_card2_title': '금융 분석가',
      'about.structure_card2_desc': '날카로운 시장 통찰을 가진 국제 기관 투자자',
      'about.structure_card3_title': '산업 리더',
      'about.structure_card3_desc': '에너지·제조·교육 분야의 베테랑 실무가',
      'about.structure_card4_title': '경제 자문',
      'about.structure_card4_desc': '국제 정책 연구에 특화된 권위 있는 학자·자문',
      'about.qgf_kicker': '재단',
      'about.qgf_title': '장기 자본으로 혁신을 구동',
      'about.qgf_quote': 'QGF는 현재 약 <span class="qc-text-highlight">7.8억 달러</span> 규모의 AUM을 운용하며, 멀티자산 포트폴리오와 글로벌 분산 전략으로 디지털 경제 인프라를 지원합니다.',
      'about.qgf_card1_img_alt': '장기 자본',
      'about.qgf_card1_title': '장기 자본 투입',
      'about.qgf_card1_desc': 'QCH 연간 순이익에서 일정 비율을 투입해 지속적인 확장 역량을 확보합니다.',
      'about.qgf_card2_img_alt': '전략적 협력',
      'about.qgf_card2_title': '전략 자본 협력',
      'about.qgf_card2_desc': 'Blackstone, Sequoia, JPMorgan Chase 등 최상위 기관과 긴밀히 협업합니다.',
      'about.qgf_card3_img_alt': '리스크 헤지',
      'about.qgf_card3_title': '리스크 헤지 메커니즘',
      'about.qgf_card3_desc': '정교한 리스크 관리로 글로벌 파트너에게 안정적인 기술·자금 지원을 제공합니다.',
      'about.mission_kicker': '미션과 가치',
      'about.mission_title': '5대 핵심 가치',
      'about.value_transparency_title': '투명성',
      'about.value_transparency_desc': '데이터와 프로세스의 투명성으로 신뢰를 높입니다.',
      'about.value_security_title': '보안',
      'about.value_security_desc': '기술과 거버넌스의 이중 보호로 자산을 지킵니다.',
      'about.value_collaboration_title': '협업',
      'about.value_collaboration_desc': '지역·산업을 넘어 협력하여 상생 가치 네트워크를 구축합니다.',
      'about.value_innovation_title': '혁신',
      'about.value_innovation_desc': 'AI·블록체인의 효율적 금융 적용을 탐색합니다.',
      'about.value_sustainability_title': '지속가능성',
      'about.value_sustainability_desc': '장기 가치를 중시하고 디지털 경제와 그린 발전을 결합합니다.',
      'about.resend_title': '디지털 금융을<br>글로벌 공공 인프라로',
      'about.resend_desc': '누구나 이용하고 모두가 혜택을 누리도록. <span class="qc-text-highlight">투명</span>·<span class="qc-text-highlight">보안</span>·<span class="qc-text-highlight">지능</span>·<span class="qc-text-highlight">포용</span>의 글로벌 가치 흐름 네트워크를 구축합니다.',

      'calc.option_signals_3': '3회/일 (Honor)',
      'calc.option_signals_4': '4회/일 (팀)',
      'calc.label_days': '기간 (일)',
      'calc.placeholder_days': '예: 35',
      'calc.submit': '미리보기 생성',
      'calc.error_invalid': '유효한 초기 금액과 일수를 입력하세요.',
      'calc.compound_title': '복리의 본질과 장점',
      'calc.acc_core': '핵심 개념',
      'calc.core_paragraph': '복리는 한 번에 더 버는 것이 아니라 수익을 지속적으로 재투자하는 것입니다. 핵심 변수는 성장 폭과 실행 횟수입니다.',
      'calc.core_highlight_growth': '성장 폭',
      'calc.core_highlight_times': '실행 횟수',
      'calc.acc_formula': '공식',
      'calc.formula_model_label': '모델',
      'calc.formula_line': '기말 = 원금 × (1 + Δ)<sup>n</sup>',
      'calc.formula_sub': 'Δ는 1회 시그널의 등가 성장률, n은 총 시그널 횟수(일일 시그널 × 일수)입니다.',
      'calc.acc_adv': '장점',
      'calc.adv_1_title': '규율과 재현성',
      'calc.adv_1_desc': '고정 규칙으로 감정 개입을 줄여 재현성을 높입니다.',
      'calc.adv_2_title': '빈도 증폭 효과',
      'calc.adv_2_desc': '같은 성장 폭에서도 빈도가 높을수록 더 빨리 가속 구간에 진입합니다.',
      'calc.adv_3_title': '리스크 통제',
      'calc.adv_3_desc': '매 거래에 계좌의 일부만 사용하여 전체 변동을 통제합니다.',
      'calc.acc_org': '팀 구조',
      'calc.org_title': '팀 구조',
      'calc.org_subtitle': '“직접 추천 6명” 기반 승급 체계',
      'calc.org_captain_title': '팀장 (VIP)',
      'calc.org_captain_desc': '팀 승급 혜택을 누림',
      'calc.org_level1_user': '1단계 유저',
      'calc.summary_title': '예상 최종 자산',
      'calc.profit_suffix': '(수익)',
      'calc.summary_details': '기간 {days}일 | 누적 시그널 {signals}회',
      'calc.table_title': '일별 상세',
      'calc.th_day': '일',
      'calc.th_signals': '시그널',
      'calc.th_start': '시작 잔고',
      'calc.th_profit': '일일 수익',
      'calc.th_end': '종료 잔고',
      'calc.disclaimer': '* 안내: 이 값은 이론 모델 계산이며 투자 수익을 보장하지 않습니다. 투자에는 위험이 있습니다.',
      'footer.status_operational': '모든 시스템이 정상 운영 중입니다'
    }
  };

  const I18N_LOADERS = {
    'zh-CN': () => {
      const url = new URL('assets/i18n/zh-CN.json', document.baseURI).toString();
      return fetch(url, { cache: 'force-cache' }).then((r) => (r.ok ? r.json() : {}));
    }
  };

  const loadLang = (lang) => {
    const code = normalizeLang(lang);
    if (!I18N_LOADERS[code]) return Promise.resolve(I18N[code] || {});
    if (I18N[code] && Object.keys(I18N[code]).length) return Promise.resolve(I18N[code]);
    if (I18N_LOADERS[code]._p) return I18N_LOADERS[code]._p;
    I18N_LOADERS[code]._p = I18N_LOADERS[code]()
      .then((dict) => {
        I18N[code] = dict && typeof dict === 'object' ? dict : {};
        console.log('[I18N] Loaded', code, I18N[code]);
        return I18N[code];
      })
      .catch((e) => {
        console.error('[I18N] Failed to load', code, e);
        I18N[code] = I18N[code] || {};
        return I18N[code];
      })
      .finally(() => {
        I18N_LOADERS[code]._p = null;
      });
    return I18N_LOADERS[code]._p;
  };

  const normalizeLang = (code) => {
    if (!code) return 'en';
    const normalized = String(code);
    if (I18N[normalized]) return normalized;
    const base = normalized.split('-')[0];
    if (I18N[base]) return base;
    return 'en';
  };

  const format = (str, params) => {
    if (!params) return str;
    return str.replace(/\{(\w+)\}/g, (_, k) => (params[k] == null ? `{${k}}` : String(params[k])));
  };

  const t = (key, params) => {
    const lang = normalizeLang(localStorage.getItem(LANG_STORAGE_KEY) || document.documentElement.getAttribute('lang'));
    const dict = I18N[lang] || I18N.en || {};
    const fallback = I18N.en || {};
    const value = dict[key] ?? fallback[key] ?? key;
    return format(String(value), params);
  };

  const getLang = () => normalizeLang(localStorage.getItem(LANG_STORAGE_KEY) || document.documentElement.getAttribute('lang'));

  const setLang = (lang) => {
    const next = normalizeLang(lang);
    localStorage.setItem(LANG_STORAGE_KEY, next);
    document.documentElement.classList.add('qc-i18n-pending');
    document.documentElement.setAttribute('lang', next);
    if (RTL_LANGS.has(next)) {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body && document.body.classList.add('qc-rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body && document.body.classList.remove('qc-rtl');
    }
    const done = () => {
      applyI18n();
      updateLangSwitcherLabel();
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('qc-i18n-pending');
        document.documentElement.classList.add('qc-i18n-ready');

        // Mobile layout can be incorrect until the first scroll triggers a reflow.
        // Force a reflow + resize so header/nav/lang switcher are laid out correctly immediately.
        try {
          void document.body.offsetHeight;
          window.dispatchEvent(new Event('resize'));
        } catch (_) {}
      });
    };

    if (next === 'zh-CN') {
      loadLang(next).then(done);
    } else {
      done();
    }
  };

  const applyI18n = () => {
    const applyNavI18n = () => {
      const lang = getLang();
      const dict = I18N[lang] || I18N.en;
      console.log('[I18N] applyI18n lang', lang, 'dict keys', Object.keys(dict));
      const resolve = (key) => (dict && dict[key]) || (I18N.en && I18N.en[key]) || key;

      const ensureLabelSpan = (a) => {
        if (!a) return null;
        const existing = a.querySelector('.qc-nav-label');
        if (existing) return existing;
        const caret = a.querySelector('.qc-nav-caret');

        const label = document.createElement('span');
        label.className = 'qc-nav-label';

        const nodesToMove = [];
        a.childNodes.forEach((n) => {
          if (caret && n === caret) return;
          nodesToMove.push(n);
        });
        nodesToMove.forEach((n) => label.appendChild(n));

        if (caret) {
          a.insertBefore(label, caret);
        } else {
          a.appendChild(label);
        }
        return label;
      };

      const setByHref = (selector, key) => {
        const a = document.querySelector(selector);
        if (!a) return;
        const label = ensureLabelSpan(a) || a;
        label.textContent = resolve(key);
      };

      setByHref('.qc-nav-list a.qc-nav-link[href$="../index.html"], .qc-nav-list a.qc-nav-link[href$="./index.html"], .qc-nav-list a.qc-nav-link[href$="index.html"]', 'nav.home');
      setByHref('.qc-nav-list a.qc-nav-link[href*="about.html"]', 'nav.about');
      setByHref('.qc-nav-list a.qc-nav-link[href*="business-model.html"]', 'nav.business');
      setByHref('.qc-nav-list a.qc-nav-link[href*="txo.html"]', 'nav.txo');
      setByHref('.qc-nav-list a.qc-nav-link[href*="license.html"]', 'nav.license');
      setByHref('.qc-nav-list a.qc-nav-link[href*="profit.html"]', 'nav.profit');
      setByHref('.qc-nav-list a.qc-nav-link[href*="calculator.html"]', 'nav.calculator');

      const setSub = (selector, key) => {
        const a = document.querySelector(selector);
        if (!a) return;
        a.textContent = resolve(key);
      };

      // About submenu
      setSub('.qc-submenu a[href*="about.html"]:not([href*="#"])', 'nav.about.overview');
      setSub('.qc-submenu a[href*="about.html#founder"]', 'nav.about.founder');
      setSub('.qc-submenu a[href*="about.html#structure"]', 'nav.about.structure');
      setSub('.qc-submenu a[href*="about.html#qgf"]', 'nav.about.qgf');
      setSub('.qc-submenu a[href*="about.html#mission"]', 'nav.about.mission');
      setSub('.qc-submenu a[href*="testimonials"]', 'nav.about.testimonials');

      // Business submenu
      setSub('.qc-submenu a[href*="business-model.html#web2"]', 'nav.business.web2');
      setSub('.qc-submenu a[href*="business-model.html#core"]', 'nav.business.core');
      setSub('.qc-submenu a[href*="business-model.html#future"]', 'nav.business.future');
      setSub('.qc-submenu a[href*="business-model.html#v5"]', 'nav.business.v5');

      // TXO submenu
      setSub('.qc-submenu a[href*="txo.html#origin"]', 'nav.txo.origin');
      setSub('.qc-submenu a[href*="txo.html#founder"]', 'nav.txo.founder');
      setSub('.qc-submenu a[href*="txo.html#team"]', 'nav.txo.team');
      setSub('.qc-submenu a[href*="txo.html#offline"]', 'nav.txo.offline');

      // License submenu
      setSub('.qc-submenu a[href*="license.html#statement"]', 'nav.license.statement');
      setSub('.qc-submenu a[href*="license.html#verification"]', 'nav.license.verification');

      // Profit submenu
      setSub('.qc-submenu a[href*="profit.html#signals"]', 'nav.profit.signals');
      setSub('.qc-submenu a[href*="profit.html#referral"]', 'nav.profit.referral');
      setSub('.qc-submenu a[href*="profit.html#vip"]', 'nav.profit.vip');
      setSub('.qc-submenu a[href*="profit.html#reports"]', 'nav.profit.reports');
    };

    const applyFooterI18n = () => {
      const lang = getLang();
      const dict = I18N[lang] || I18N.en;
      const resolve = (key) => (dict && dict[key]) || (I18N.en && I18N.en[key]) || key;

      const footer = document.querySelector('.qc-footer');
      if (!footer) return;

      const setFooterLink = (selector, key) => {
        const a = footer.querySelector(selector);
        if (!a) return;
        a.textContent = resolve(key);
      };
      const setFooterH4ByText = (zhText, key) => {
        footer.querySelectorAll('h4').forEach((h) => {
          if (String(h.textContent || '').trim() !== zhText) return;
          h.textContent = resolve(key);
        });
      };

      setFooterH4ByText('关于启诚', 'footer.about_title');
      setFooterH4ByText('商业模式', 'footer.business_title');
      setFooterH4ByText('盈利体系', 'footer.profit_title');
      setFooterH4ByText('TXO 交易所', 'footer.txo_title');
      setFooterH4ByText('Ready to Trade?', 'footer.cta_title');

      setFooterLink('.qc-footer a[href*="about.html"]:not([href*="#"])', 'footer.about.overview');
      setFooterLink('.qc-footer a[href*="about.html#founder"]', 'footer.about.founder');
      setFooterLink('.qc-footer a[href*="about.html#structure"]', 'footer.about.structure');
      setFooterLink('.qc-footer a[href*="about.html#qgf"]', 'footer.about.qgf');
      setFooterLink('.qc-footer a[href*="about.html#mission"]', 'footer.about.mission');
      setFooterLink('.qc-footer a[href*="timeline.html"]', 'footer.about.timeline');
      setFooterLink('.qc-footer a[href*="testimonials"]', 'footer.about.testimonials');

      setFooterLink('.qc-footer a[href*="txo.html#origin"]', 'footer.txo.origin');
      setFooterLink('.qc-footer a[href*="txo.html#founder"]', 'footer.txo.founder');
      setFooterLink('.qc-footer a[href*="txo.html#team"]', 'footer.txo.team');
      setFooterLink('.qc-footer a[href*="txo.html#offline"]', 'footer.txo.offline');
      setFooterLink('.qc-footer a[href*="license.html#statement"]', 'footer.txo.license');

      setFooterLink('.qc-footer a[href*="business-model.html#web2"]', 'footer.business.web2');
      setFooterLink('.qc-footer a[href*="business-model.html#core"]', 'footer.business.core');
      setFooterLink('.qc-footer a[href*="business-model.html#future"]', 'footer.business.future');
      setFooterLink('.qc-footer a[href*="business-model.html#v5"]', 'footer.business.v5');

      setFooterLink('.qc-footer a[href*="profit.html#signals"]', 'footer.profit.signals');
      setFooterLink('.qc-footer a[href*="profit.html#referral"]', 'footer.profit.referral');
      setFooterLink('.qc-footer a[href*="profit.html#vip"]', 'footer.profit.vip');
      setFooterLink('.qc-footer a[href*="profit.html#reports"]', 'footer.profit.reports');
      setFooterLink('.qc-footer a[href*="calculator.html"]', 'footer.profit.calculator');

      const tagline = footer.querySelector('.qc-footer-address');
      if (tagline) {
        const taglineInner = tagline.querySelector('[data-i18n="footer.tagline"]');
        if (taglineInner) {
          taglineInner.textContent = resolve('footer.tagline');
        } else {
          tagline.textContent = resolve('footer.tagline');
        }
      }

      // Footer CTA button
      const cta = footer.querySelector('.qc-btn-footer-cta');
      if (cta) {
        cta.textContent = resolve('footer.cta_button');
      }
    };

    const applyTestimonialsRoleI18n = () => {
      const lang = getLang();
      if (lang === 'zh-CN') return;

      const countryMapByLang = {
        en: {
          '英国': 'UK',
          '美国': 'USA',
          '法国': 'France',
          '德国': 'Germany',
          '加拿大': 'Canada',
          '巴西': 'Brazil',
          '意大利': 'Italy',
          '葡萄牙': 'Portugal',
          '埃塞俄比亚': 'Ethiopia',
          '澳大利亚': 'Australia',
          '爱尔兰': 'Ireland',
          '波兰': 'Poland',
          '韩国': 'South Korea',
          '越南': 'Vietnam',
          '挪威': 'Norway',
          '西班牙': 'Spain',
          '日本': 'Japan',
          '新加坡': 'Singapore',
          '瑞士': 'Switzerland',
          '荷兰': 'Netherlands',
          '瑞典': 'Sweden',
          '俄罗斯': 'Russia'
        },
        es: {
          '英国': 'Reino Unido',
          '美国': 'Estados Unidos',
          '法国': 'Francia',
          '德国': 'Alemania',
          '加拿大': 'Canadá',
          '巴西': 'Brasil',
          '意大利': 'Italia',
          '葡萄牙': 'Portugal',
          '埃塞俄比亚': 'Etiopía',
          '澳大利亚': 'Australia',
          '爱尔兰': 'Irlanda',
          '波兰': 'Polonia',
          '韩国': 'Corea del Sur',
          '越南': 'Vietnam',
          '挪威': 'Noruega',
          '西班牙': 'España',
          '日本': 'Japón',
          '新加坡': 'Singapur',
          '瑞士': 'Suiza',
          '荷兰': 'Países Bajos',
          '瑞典': 'Suecia',
          '俄罗斯': 'Rusia'
        },
        fr: {
          '英国': 'Royaume-Uni',
          '美国': 'États-Unis',
          '法国': 'France',
          '德国': 'Allemagne',
          '加拿大': 'Canada',
          '巴西': 'Brésil',
          '意大利': 'Italie',
          '葡萄牙': 'Portugal',
          '埃塞俄比亚': 'Éthiopie',
          '澳大利亚': 'Australie',
          '爱尔兰': 'Irlande',
          '波兰': 'Pologne',
          '韩国': 'Corée du Sud',
          '越南': 'Vietnam',
          '挪威': 'Norvège',
          '西班牙': 'Espagne',
          '日本': 'Japon',
          '新加坡': 'Singapour',
          '瑞士': 'Suisse',
          '荷兰': 'Pays-Bas',
          '瑞典': 'Suède',
          '俄罗斯': 'Russie'
        },
        ar: {
          '英国': 'المملكة المتحدة',
          '美国': 'الولايات المتحدة',
          '法国': 'فرنسا',
          '德国': 'ألمانيا',
          '加拿大': 'كندا',
          '巴西': 'البرازيل',
          '意大利': 'إيطاليا',
          '葡萄牙': 'البرتغال',
          '埃塞俄比亚': 'إثيوبيا',
          '澳大利亚': 'أستراليا',
          '爱尔兰': 'أيرلندا',
          '波兰': 'بولندا',
          '韩国': 'كوريا الجنوبية',
          '越南': 'فيتنام',
          '挪威': 'النرويج',
          '西班牙': 'إسبانيا',
          '日本': 'اليابان',
          '新加坡': 'سنغافورة',
          '瑞士': 'سويسرا',
          '荷兰': 'هولندا',
          '瑞典': 'السويد',
          '俄罗斯': 'روسيا'
        },
        de: {
          '英国': 'Vereinigtes Königreich',
          '美国': 'USA',
          '法国': 'Frankreich',
          '德国': 'Deutschland',
          '加拿大': 'Kanada',
          '巴西': 'Brasilien',
          '意大利': 'Italien',
          '葡萄牙': 'Portugal',
          '埃塞俄比亚': 'Äthiopien',
          '澳大利亚': 'Australien',
          '爱尔兰': 'Irland',
          '波兰': 'Polen',
          '韩国': 'Südkorea',
          '越南': 'Vietnam',
          '挪威': 'Norwegen',
          '西班牙': 'Spanien',
          '日本': 'Japan',
          '新加坡': 'Singapur',
          '瑞士': 'Schweiz',
          '荷兰': 'Niederlande',
          '瑞典': 'Schweden',
          '俄罗斯': 'Russland'
        },
        ru: {
          '英国': 'Великобритания',
          '美国': 'США',
          '法国': 'Франция',
          '德国': 'Германия',
          '加拿大': 'Канада',
          '巴西': 'Бразилия',
          '意大利': 'Италия',
          '葡萄牙': 'Португалия',
          '埃塞俄比亚': 'Эфиопия',
          '澳大利亚': 'Австралия',
          '爱尔兰': 'Ирландия',
          '波兰': 'Польша',
          '韩国': 'Южная Корея',
          '越南': 'Вьетнам',
          '挪威': 'Норвегия',
          '西班牙': 'Испания',
          '日本': 'Япония',
          '新加坡': 'Сингапур',
          '瑞士': 'Швейцария',
          '荷兰': 'Нидерланды',
          '瑞典': 'Швеция',
          '俄罗斯': 'Россия'
        },
        pt: {
          '英国': 'Reino Unido',
          '美国': 'Estados Unidos',
          '法国': 'França',
          '德国': 'Alemanha',
          '加拿大': 'Canadá',
          '巴西': 'Brasil',
          '意大利': 'Itália',
          '葡萄牙': 'Portugal',
          '埃塞俄比亚': 'Etiópia',
          '澳大利亚': 'Austrália',
          '爱尔兰': 'Irlanda',
          '波兰': 'Polônia',
          '韩国': 'Coreia do Sul',
          '越南': 'Vietnã',
          '挪威': 'Noruega',
          '西班牙': 'Espanha',
          '日本': 'Japão',
          '新加坡': 'Singapura',
          '瑞士': 'Suíça',
          '荷兰': 'Países Baixos',
          '瑞典': 'Suécia',
          '俄罗斯': 'Rússia'
        },
        ja: {
          '英国': 'イギリス',
          '美国': 'アメリカ',
          '法国': 'フランス',
          '德国': 'ドイツ',
          '加拿大': 'カナダ',
          '巴西': 'ブラジル',
          '意大利': 'イタリア',
          '葡萄牙': 'ポルトガル',
          '埃塞俄比亚': 'エチオピア',
          '澳大利亚': 'オーストラリア',
          '爱尔兰': 'アイルランド',
          '波兰': 'ポーランド',
          '韩国': '韓国',
          '越南': 'ベトナム',
          '挪威': 'ノルウェー',
          '西班牙': 'スペイン',
          '日本': '日本',
          '新加坡': 'シンガポール',
          '瑞士': 'スイス',
          '荷兰': 'オランダ',
          '瑞典': 'スウェーデン',
          '俄罗斯': 'ロシア'
        },
        ko: {
          '英国': '영국',
          '美国': '미국',
          '法国': '프랑스',
          '德国': '독일',
          '加拿大': '캐나다',
          '巴西': '브라질',
          '意大利': '이탈리아',
          '葡萄牙': '포르투갈',
          '埃塞俄比亚': '에티오피아',
          '澳大利亚': '호주',
          '爱尔兰': '아일랜드',
          '波兰': '폴란드',
          '韩国': '대한민국',
          '越南': '베트남',
          '挪威': '노르웨이',
          '西班牙': '스페인',
          '日本': '일본',
          '新加坡': '싱가포르',
          '瑞士': '스위스',
          '荷兰': '네덜란드',
          '瑞典': '스웨덴',
          '俄罗斯': '러시아'
        }
      };

      const cityMapByLang = {
        en: {
          '伦敦': 'London',
          '西雅图': 'Seattle',
          '巴黎': 'Paris',
          '柏林': 'Berlin',
          '多伦多': 'Toronto',
          '圣保罗': 'São Paulo',
          '里约热内卢': 'Rio de Janeiro',
          '米兰': 'Milan',
          '里斯本': 'Lisbon',
          '亚的斯亚贝巴': 'Addis Ababa',
          '悉尼': 'Sydney',
          '芝加哥': 'Chicago',
          '奥斯汀': 'Austin',
          '都柏林': 'Dublin',
          '华沙': 'Warsaw',
          '里昂': 'Lyon',
          '首尔': 'Seoul',
          '迈阿密': 'Miami',
          '胡志明市': 'Ho Chi Minh City',
          '奥斯陆': 'Oslo'
        },
        es: {
          '伦敦': 'Londres',
          '西雅图': 'Seattle',
          '巴黎': 'París',
          '柏林': 'Berlín',
          '多伦多': 'Toronto',
          '圣保罗': 'São Paulo',
          '里约热内卢': 'Río de Janeiro',
          '米兰': 'Milán',
          '里斯本': 'Lisboa',
          '亚的斯亚贝巴': 'Adís Abeba',
          '悉尼': 'Sídney',
          '芝加哥': 'Chicago',
          '奥斯汀': 'Austin',
          '都柏林': 'Dublín',
          '华沙': 'Varsovia',
          '里昂': 'Lyon',
          '首尔': 'Seúl',
          '迈阿密': 'Miami',
          '胡志明市': 'Ciudad Ho Chi Minh',
          '奥斯陆': 'Oslo'
        },
        fr: {
          '伦敦': 'Londres',
          '西雅图': 'Seattle',
          '巴黎': 'Paris',
          '柏林': 'Berlin',
          '多伦多': 'Toronto',
          '圣保罗': 'São Paulo',
          '里约热内卢': 'Rio de Janeiro',
          '米兰': 'Milan',
          '里斯本': 'Lisbonne',
          '亚的斯亚贝巴': 'Addis-Abeba',
          '悉尼': 'Sydney',
          '芝加哥': 'Chicago',
          '奥斯汀': 'Austin',
          '都柏林': 'Dublin',
          '华沙': 'Varsovie',
          '里昂': 'Lyon',
          '首尔': 'Séoul',
          '迈阿密': 'Miami',
          '胡志明市': 'Hô Chi Minh-Ville',
          '奥斯陆': 'Oslo'
        },
        ar: {
          '伦敦': 'لندن',
          '西雅图': 'سياتل',
          '巴黎': 'باريس',
          '柏林': 'برلين',
          '多伦多': 'تورونتو',
          '圣保罗': 'ساو باولو',
          '里约热内卢': 'ريو دي جانيرو',
          '米兰': 'ميلانو',
          '里斯本': 'لشبونة',
          '亚的斯亚贝巴': 'أديس أبابا',
          '悉尼': 'سيدني',
          '芝加哥': 'شيكاغو',
          '奥斯汀': 'أوستن',
          '都柏林': 'دبلن',
          '华沙': 'وارسو',
          '里昂': 'ليون',
          '首尔': 'سيول',
          '迈阿密': 'ميامي',
          '胡志明市': 'مدينة هو تشي منه',
          '奥斯陆': 'أوسلو'
        },
        de: {
          '伦敦': 'London',
          '西雅图': 'Seattle',
          '巴黎': 'Paris',
          '柏林': 'Berlin',
          '多伦多': 'Toronto',
          '圣保罗': 'São Paulo',
          '里约热内卢': 'Rio de Janeiro',
          '米兰': 'Mailand',
          '里斯本': 'Lissabon',
          '亚的斯亚贝巴': 'Addis Abeba',
          '悉尼': 'Sydney',
          '芝加哥': 'Chicago',
          '奥斯汀': 'Austin',
          '都柏林': 'Dublin',
          '华沙': 'Warschau',
          '里昂': 'Lyon',
          '首尔': 'Seoul',
          '迈阿密': 'Miami',
          '胡志明市': 'Ho-Chi-Minh-Stadt',
          '奥斯陆': 'Oslo'
        },
        ru: {
          '伦敦': 'Лондон',
          '西雅图': 'Сиэтл',
          '巴黎': 'Париж',
          '柏林': 'Берлин',
          '多伦多': 'Торонто',
          '圣保罗': 'Сан-Паулу',
          '里约热内卢': 'Рио-де-Жанейро',
          '米兰': 'Милан',
          '里斯本': 'Лиссабон',
          '亚的斯亚贝巴': 'Аддис-Абеба',
          '悉尼': 'Сидней',
          '芝加哥': 'Чикаго',
          '奥斯汀': 'Остин',
          '都柏林': 'Дублин',
          '华沙': 'Варшава',
          '里昂': 'Лион',
          '首尔': 'Сеул',
          '迈阿密': 'Майами',
          '胡志明市': 'Хошимин',
          '奥斯陆': 'Осло'
        },
        pt: {
          '伦敦': 'Londres',
          '西雅图': 'Seattle',
          '巴黎': 'Paris',
          '柏林': 'Berlim',
          '多伦多': 'Toronto',
          '圣保罗': 'São Paulo',
          '里约热内卢': 'Rio de Janeiro',
          '米兰': 'Milão',
          '里斯本': 'Lisboa',
          '亚的斯亚贝巴': 'Adis Abeba',
          '悉尼': 'Sydney',
          '芝加哥': 'Chicago',
          '奥斯汀': 'Austin',
          '都柏林': 'Dublin',
          '华沙': 'Varsóvia',
          '里昂': 'Lyon',
          '首尔': 'Seul',
          '迈阿密': 'Miami',
          '胡志明市': 'Cidade de Ho Chi Minh',
          '奥斯陆': 'Oslo'
        },
        ja: {
          '伦敦': 'ロンドン',
          '西雅图': 'シアトル',
          '巴黎': 'パリ',
          '柏林': 'ベルリン',
          '多伦多': 'トロント',
          '圣保罗': 'サンパウロ',
          '里约热内卢': 'リオデジャネイロ',
          '米兰': 'ミラノ',
          '里斯本': 'リスボン',
          '亚的斯亚贝巴': 'アディスアベバ',
          '悉尼': 'シドニー',
          '芝加哥': 'シカゴ',
          '奥斯汀': 'オースティン',
          '都柏林': 'ダブリン',
          '华沙': 'ワルシャワ',
          '里昂': 'リヨン',
          '首尔': 'ソウル',
          '迈阿密': 'マイアミ',
          '胡志明市': 'ホーチミン市',
          '奥斯陆': 'オスロ'
        },
        ko: {
          '伦敦': '런던',
          '西雅图': '시애틀',
          '巴黎': '파리',
          '柏林': '베를린',
          '多伦多': '토론토',
          '圣保罗': '상파울루',
          '里约热内卢': '리우데자네이루',
          '米兰': '밀라노',
          '里斯本': '리스본',
          '亚的斯亚贝巴': '아디스아바바',
          '悉尼': '시드니',
          '芝加哥': '시카고',
          '奥斯汀': '오스틴',
          '都柏林': '더블린',
          '华沙': '바르샤바',
          '里昂': '리옹',
          '首尔': '서울',
          '迈阿密': '마이애미',
          '胡志明市': '호치민시',
          '奥斯陆': '오슬로'
        }
      };

      const countryMap = countryMapByLang[lang];
      const cityMap = cityMapByLang[lang];
      if (!countryMap || !cityMap) return;

      const translateRole = (raw) => {
        const text = String(raw || '').trim();
        if (!text) return text;
        const parts = text.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
        if (parts.length !== 2) return text;
        const cityZh = parts[0];
        const countryZh = parts[1];
        const city = cityMap[cityZh] || cityZh;
        const country = countryMap[countryZh] || countryZh;
        return `${city}, ${country}`;
      };

      document.querySelectorAll('.qc-testimonial-role').forEach((el) => {
        const raw = String(el.textContent || '');
        const next = translateRole(raw);
        if (next && next !== raw) el.textContent = next;
      });
    };

    const applyTestimonialsContentI18n = () => {
      const lang = getLang();
      const isZh = lang === 'zh-CN';
      const isEn = lang === 'en';

      const normalize = (s) => String(s || '').trim().replace(/^“/, '').replace(/”$/, '').trim();

      const mapEn = {
        '加入启诚投资是我做过最正确的职业选择。收益始终保持稳定，信号极其精准。这确实是一种全新的工作方式。':
          'Joining Qicheng was the best career decision I have ever made. Returns are consistently stable and the signals are extremely accurate. It truly represents a new way of working.',
        '我最喜欢的是它的灵活性。每天只需花费极少的时间，效果却非常显著。提款总是准时到达，让我完全没有后顾之忧。':
          'What I love most is the flexibility. It takes very little time each day, yet the results are remarkable. Withdrawals always arrive on time, giving me complete peace of mind.',
        '启诚投资提供了我在其他地方从未见过的专业支持。准时的信号和可靠的基础设施让数字资产管理变得轻而易举。':
          'Qicheng offers a level of professional support I have never seen elsewhere. On-time signals and reliable infrastructure make digital-asset management effortless.',
        '该平台的稳定性是无与伦比的。它已成为我数字投资的首选。强烈推荐给任何寻求持续增长的人。':
          'The platform’s stability is second to none. It has become my first choice for digital investing. Highly recommended for anyone seeking consistent growth.',
        '可靠的信号和快速的提款。启诚投资简化了我的日常生活，同时显著提升了我的投资组合稳定性。':
          'Reliable signals and fast withdrawals. Qicheng has simplified my daily routine while significantly improving the stability of my portfolio.',
        '在复杂的金融市场中，启诚的精准策略是我稳健获利的钥匙。这不仅仅是投资，更是一种智能生活的体现。':
          'In a complex financial market, Qicheng’s precise strategy is the key to my steady profits. It is more than investing—it’s a smarter way of living.',
        '每天只需要 15 分钟跟进信号，我就能获得远超传统理财的收益。这完全改变了我对‘工作’的定义。':
          'By following the signals for just 15 minutes a day, I achieve returns far beyond traditional wealth management. It completely changed my definition of “work”.',
        '作为一名职业经理人，我非常看重风险控制。启诚投资的透明度和风控逻辑让我能够安心地进行长期资产配置。':
          'As a professional manager, I care deeply about risk control. Qicheng’s transparency and risk-management logic allow me to build long-term allocations with confidence.',
        '信号非常准时，操作也非常简单。即使我身在非洲，也能享受到来自伦敦的最顶级的投资机会。':
          'Signals are always on time and the process is very simple. Even from Africa, I can access top-tier investment opportunities from London.',
        '启诚投资的提款流程是我体验过最顺畅的。资金的流动性得到了极大的保障，这在目前的市场环境下非常难得。':
          'Qicheng’s withdrawal process is the smoothest I have ever experienced. Liquidity is strongly guaranteed, which is rare in today’s market environment.',
        '这就是我一直在寻找的‘另一种工作选择’。它赋予了我财务自由的同时，也给了我更多陪伴家人的时间。':
          'This is the “alternative career choice” I have been looking for. It brings financial freedom and gives me more time to be with my family.',
        'TXO 交易所的高性能和启诚的精准信号简直是绝配。这是目前数字资产交易领域最顶尖的体验。':
          'TXO’s high performance paired with Qicheng’s precise signals is a perfect match. It is the best experience I have had in digital-asset trading.',
        '信号的准确率高得惊人。跟随启诚的节奏，我几乎不需要自己去研究复杂的 K 线，系统已经帮我做好了决策。':
          'The signal accuracy is astonishing. By following Qicheng’s rhythm, I hardly need to study complex charts—the system already helps me make decisions.',
        '在这个波动剧烈的时代，启诚投资为我提供了一个避风港。稳定的收益和专业的团队让我对未来充满信心。':
          'In this highly volatile era, Qicheng is my safe harbor. Stable returns and a professional team give me confidence in the future.',
        '从最初的尝试到现在的信任，启诚投资用结果证明了一切。收益曲线非常漂亮，且一直处于受控状态。':
          'From initial trial to full trust, Qicheng has proven everything with results. The return curve is impressive and always under control.',
        '这里的信号系统是我用过最专业的。它不仅准时，而且背后有着深厚的市场逻辑支撑，让人信服。':
          'This is the most professional signal system I have used. It is punctual and backed by solid market logic, which is truly convincing.',
        '即使身在亚洲不同的时区，启诚的全球化网络也确保了我能第一时间接收到信号。这确实是真正的全球化协作。':
          'Even across different time zones in Asia, Qicheng’s global network ensures I receive signals immediately. This is real global collaboration.',
        '每天只需要在手机上点几下，收益就自动进账。这种极简的投资方式非常适合我这种工作忙碌的人。':
          'With just a few taps on my phone each day, profits come in automatically. This minimalist approach is perfect for busy professionals like me.',
        '提款速度快得离谱，客服也非常专业。启诚投资让我感受到了什么是真正的‘客户至上’。':
          'Withdrawals are unbelievably fast and customer support is highly professional. Qicheng shows what “customer-first” really means.',
        '启诚投资的复利增长模式让我看到了财富自由的曙光。只要跟随信号，稳定就是最大的保障。':
          'Qicheng’s compounding-growth model lets me see a path to financial freedom. As long as you follow the signals, stability is the greatest guarantee.',
        '作为一个技术开发者，我非常佩服启诚底层的架构。它在保证高性能交易的同时，还能把风控做得如此极致。':
          'As a developer, I truly admire Qicheng’s underlying architecture. It delivers high-performance trading while taking risk control to the next level.',
        '这是我遇到过最透明、最靠谱的投资机构。每一笔收益都清清楚楚，每一个信号都经得起推敲。':
          'This is the most transparent and reliable investment organization I have encountered. Every profit is clear and every signal stands up to scrutiny.',
        '启诚投资让我在繁忙的工作之余，多了一份极其可观的被动收入。这真的是一种生活方式的改变。':
          'Qicheng gives me an impressive stream of passive income alongside my busy job. It is truly a lifestyle change.',
        '加入启诚后，我再也不用为明天的股市波动发愁了。稳定的收益和精准的预测让我感到非常踏实。':
          'Since joining Qicheng, I no longer worry about tomorrow’s market swings. Stable returns and accurate forecasting make me feel secure.',
        '信号的准确性配合 TXO 的极速执行，这种组合在市场上几乎无敌。启诚投资确实走在了时代的前沿。':
          'With accurate signals and TXO’s lightning-fast execution, this combination is almost unbeatable. Qicheng is truly ahead of its time.',
        '如果你想要一种既省心又能赚钱的投资方式，启诚投资是唯一不二的选择。我已经向所有的朋友推荐了它。':
          'If you want an investment approach that is both effortless and profitable, Qicheng is the one and only choice. I have recommended it to all my friends.',
        '每天只需关注群里的信号，跟着操作就行。这种傻瓜式的投资体验，收益却非常惊人。':
          'You only need to follow the group’s signals and act accordingly. It’s a foolproof experience—and the returns are surprisingly strong.',
        '在众多的投资平台中，启诚投资的合规性和透明度是最高的。这是我们长期合作的基石。':
          'Among many investment platforms, Qicheng stands out for compliance and transparency. This is the foundation of our long-term cooperation.',
        '精准的信号系统让我彻底告别了投资的盲目性。每一次决策背后都有强大的数据支持，这让我感到非常安心。':
          'The precise signal system has completely eliminated blind investing for me. Every decision is backed by strong data, which brings real peace of mind.',
        '启诚投资的信号不仅仅是数字，更是财富增长的信号灯。感谢团队的辛勤付出，让普通人也能分享到数字经济的红利。':
          'Qicheng’s signals are not just numbers—they are beacons for wealth growth. Thanks to the team’s hard work, ordinary people can share the dividends of the digital economy.',
        '这种投资模式非常高效。我不再需要时刻盯着屏幕，信号一到，操作一分钟，剩下的就是等待收益。':
          'This investment model is highly efficient. I no longer need to watch the screen all day—when a signal arrives, one minute of action and then I simply wait for results.',
        '启诚投资改变了我对传统投资的认知。稳定的收益曲线和及时的服务响应，是所有投资者的梦想。':
          'Qicheng changed how I view traditional investing. A stable return curve and timely service response are every investor’s dream.',
        '这就是数字经济时代的最优选。启诚投资把复杂的技术转化成了简单的收益，这太棒了。':
          'This is the best choice in the digital-economy era. Qicheng turns complex technology into simple profits—it’s amazing.',
        '我对启诚投资的安全性印象深刻。在这个领域，安全高于一切，而启诚做到了极致。':
          'I am deeply impressed by Qicheng’s security. In this field, security is everything—and Qicheng takes it to the extreme.',
        '这种高频、稳定的投资方式非常适合我的财务规划。启诚投资已成为我资产配置中的核心部分。':
          'This high-frequency yet stable approach fits my financial planning perfectly. Qicheng has become a core part of my asset allocation.',
        '感谢启诚投资让我学会了如何聪明地赚钱。这不仅是投资技巧的提升，更是思维方式的升级。':
          'Thanks to Qicheng, I learned how to earn money smarter. It is not only an improvement in investing skills, but also an upgrade in mindset.',
        '启诚投资的多元化策略让我在不同的市场环境下都能找到盈利点。专业的团队和精准的信号是我成功的基石。':
          'Qicheng’s diversified strategy helps me find profit opportunities in different market conditions. The professional team and precise signals are the foundation of my success.',
        '在这里，我体验到了前所未有的投资自由。启诚的全球化视野和本地化服务完美结合，让投资变得轻松有趣。':
          'Here, I experienced investment freedom like never before. Qicheng’s global vision combined with localized service makes investing easy and enjoyable.',
        '启诚投资不仅仅是一个理财工具，它更像是一个智慧的投资伙伴。每一步操作都清晰透明，让人倍感安心。':
          'Qicheng is not just a wealth-management tool—it feels like an intelligent investing partner. Every step is clear and transparent, which is very reassuring.',
        '我非常欣赏启诚对创新的执着。在这个快速变化的时代，只有不断进取的团队才能为投资者创造持续的价值。':
          'I really appreciate Qicheng’s dedication to innovation. In a fast-changing era, only a constantly advancing team can create lasting value for investors.'
      };

      const maps = {
        es: {
          '加入启诚投资是我做过最正确的职业选择。收益始终保持稳定，信号极其精准。这确实是一种全新的工作方式。':
            'Unirme a Qicheng fue la mejor decisión profesional que he tomado. Los rendimientos se mantienen estables y las señales son extremadamente precisas. Es realmente una nueva forma de trabajar.',
          '我最喜欢的是它的灵活性。每天只需花费极少的时间，效果却非常显著。提款总是准时到达，让我完全没有后顾之忧。':
            'Lo que más me gusta es su flexibilidad. Cada día requiere muy poco tiempo y aun así los resultados son notables. Los retiros siempre llegan puntuales, lo que me da total tranquilidad.',
          '启诚投资提供了我在其他地方从未见过的专业支持。准时的信号和可靠的基础设施让数字资产管理变得轻而易举。':
            'Qicheng me brindó un nivel de soporte profesional que nunca había visto. Las señales puntuales y una infraestructura confiable hacen que gestionar activos digitales sea muy sencillo.',
          '该平台的稳定性是无与伦比的。它已成为我数字投资的首选。强烈推荐给任何寻求持续增长的人。':
            'La estabilidad de la plataforma no tiene comparación. Se ha convertido en mi primera opción para invertir en activos digitales. La recomiendo a cualquiera que busque crecimiento constante.',
          '可靠的信号和快速的提款。启诚投资简化了我的日常生活，同时显著提升了我的投资组合稳定性。':
            'Señales confiables y retiros rápidos. Qicheng simplificó mi día a día y mejoró notablemente la estabilidad de mi cartera.',
          '在复杂的金融市场中，启诚的精准策略是我稳健获利的钥匙。这不仅仅是投资，更是一种智能生活的体现。':
            'En un mercado financiero complejo, la estrategia precisa de Qicheng es la clave de mis ganancias constantes. No es solo inversión; es una forma de vida más inteligente.',
          '每天只需要 15 分钟跟进信号，我就能获得远超传统理财的收益。这完全改变了我对‘工作’的定义。':
            'Con solo 15 minutos al día siguiendo las señales, obtengo rendimientos muy por encima de los productos tradicionales. Cambió por completo mi definición de “trabajo”.',
          '作为一名职业经理人，我非常看重风险控制。启诚投资的透明度和风控逻辑让我能够安心地进行长期资产配置。':
            'Como gerente profesional, valoro mucho el control de riesgo. La transparencia y la lógica de gestión de riesgos de Qicheng me permiten planificar a largo plazo con tranquilidad.',
          '信号非常准时，操作也非常简单。即使我身在非洲，也能享受到来自伦敦的最顶级的投资机会。':
            'Las señales llegan a tiempo y operar es muy sencillo. Incluso estando en África, puedo acceder a oportunidades de inversión de primer nivel desde Londres.',
          '启诚投资的提款流程是我体验过最顺畅的。资金的流动性得到了极大的保障，这在目前的市场环境下非常难得。':
            'El proceso de retiro de Qicheng es el más fluido que he probado. La liquidez está muy bien garantizada, algo muy valioso en el mercado actual.',
          '这就是我一直在寻找的‘另一种工作选择’。它赋予了我财务自由的同时，也给了我更多陪伴家人的时间。':
            'Esta es la “otra opción de trabajo” que siempre busqué. Me ha dado libertad financiera y más tiempo para estar con mi familia.',
          'TXO 交易所的高性能和启诚的精准信号简直是绝配。这是目前数字资产交易领域最顶尖的体验。':
            'El alto rendimiento de TXO y las señales precisas de Qicheng son la combinación perfecta. Es una experiencia de primer nivel en el trading de activos digitales.',
          '信号的准确率高得惊人。跟随启诚的节奏，我几乎不需要自己去研究复杂的 K 线，系统已经帮我做好了决策。':
            'La precisión de las señales es impresionante. Siguiendo el ritmo de Qicheng casi no necesito analizar gráficos; el sistema ya me ayuda a decidir.',
          '在这个波动剧烈的时代，启诚投资为我提供了一个避风港。稳定的收益和专业的团队让我对未来充满信心。':
            'En tiempos de alta volatilidad, Qicheng me ha dado un refugio. Rendimientos estables y un equipo profesional me hacen confiar en el futuro.',
          '从最初的尝试到现在的信任，启诚投资用结果证明了一切。收益曲线非常漂亮，且一直处于受控状态。':
            'De la prueba inicial a la confianza total, Qicheng lo demostró con resultados. La curva de rendimiento es excelente y siempre está bajo control.',
          '这里的信号系统是我用过最专业的。它不仅准时，而且背后有着深厚的市场逻辑支撑，让人信服。':
            'El sistema de señales aquí es el más profesional que he usado. No solo es puntual, también está respaldado por una sólida lógica de mercado.',
          '即使身在亚洲不同的时区，启诚的全球化网络也确保了我能第一时间接收到信号。这确实是真正的全球化协作。':
            'Aunque esté en Asia con otro huso horario, la red global de Qicheng garantiza que reciba las señales al instante. Eso sí es colaboración global real.',
          '每天只需要在手机上点几下，收益就自动进账。这种极简的投资方式非常适合我这种工作忙碌的人。':
            'Con unos pocos toques en el móvil cada día, las ganancias llegan automáticamente. Este enfoque minimalista es ideal para quienes estamos ocupados.',
          '提款速度快得离谱，客服也非常专业。启诚投资让我感受到了什么是真正的‘客户至上’。':
            'Los retiros son increíblemente rápidos y el soporte es muy profesional. Qicheng me mostró lo que significa realmente “el cliente primero”.',
          '启诚投资的复利增长模式让我看到了财富自由的曙光。只要跟随信号，稳定就是最大的保障。':
            'El modelo de crecimiento compuesto de Qicheng me dejó ver un camino hacia la libertad financiera. Siguiendo las señales, la estabilidad es la mayor garantía.',
          '作为一个技术开发者，我非常佩服启诚底层的架构。它在保证高性能交易的同时，还能把风控做得如此极致。':
            'Como desarrollador, admiro la arquitectura subyacente de Qicheng. Logra alto rendimiento y al mismo tiempo un control de riesgo impecable.',
          '这是我遇到过最透明、最靠谱的投资机构。每一笔收益都清清楚楚，每一个信号都经得起推敲。':
            'Es la institución de inversión más transparente y confiable que he visto. Cada ganancia es clara y cada señal resiste el análisis.',
          '启诚投资让我在繁忙的工作之余，多了一份极其可观的被动收入。这真的是一种生活方式的改变。':
            'Además de mi trabajo, Qicheng me aporta un ingreso pasivo considerable. Realmente es un cambio de estilo de vida.',
          '加入启诚后，我再也不用为明天的股市波动发愁了。稳定的收益和精准的预测让我感到非常踏实。':
            'Desde que me uní a Qicheng, ya no me preocupan las fluctuaciones de mañana. Rendimientos estables y pronósticos precisos me dan seguridad.',
          '信号的准确性配合 TXO 的极速执行，这种组合在市场上几乎无敌。启诚投资确实走在了时代的前沿。':
            'Con señales precisas y ejecución ultrarrápida de TXO, la combinación es casi imbatible. Qicheng realmente está a la vanguardia.',
          '如果你想要一种既省心又能赚钱的投资方式，启诚投资是唯一不二的选择。我已经向所有的朋友推荐了它。':
            'Si buscas una forma de invertir que sea sencilla y rentable, Qicheng es la mejor elección. Ya se lo recomendé a todos mis amigos.',
          '每天只需关注群里的信号，跟着操作就行。这种傻瓜式的投资体验，收益却非常惊人。':
            'Solo tienes que seguir las señales del grupo y ejecutar. Es tan simple que sorprende lo fuertes que son los resultados.',
          '在众多的投资平台中，启诚投资的合规性和透明度是最高的。这是我们长期合作的基石。':
            'Entre tantas plataformas, la conformidad y transparencia de Qicheng son de las mejores. Es la base para una cooperación a largo plazo.',
          '精准的信号系统让我彻底告别了投资的盲目性。每一次决策背后都有强大的数据支持，这让我感到非常安心。':
            'El sistema de señales preciso me alejó por completo de invertir a ciegas. Cada decisión está respaldada por datos sólidos, lo que me tranquiliza.',
          '启诚投资的信号不仅仅是数字，更是财富增长的信号灯。感谢团队的辛勤付出，让普通人也能分享到数字经济的红利。':
            'Las señales de Qicheng no son solo números; son faros de crecimiento patrimonial. Gracias al equipo, la gente común también puede compartir los beneficios de la economía digital.',
          '这种投资模式非常高效。我不再需要时刻盯着屏幕，信号一到，操作一分钟，剩下的就是等待收益。':
            'Este modelo es muy eficiente. Ya no necesito mirar la pantalla todo el tiempo: llega la señal, un minuto de acción y luego solo esperar resultados.',
          '启诚投资改变了我对传统投资的认知。稳定的收益曲线和及时的服务响应，是所有投资者的梦想。':
            'Qicheng cambió mi visión de la inversión tradicional. Una curva estable y un servicio oportuno es el sueño de cualquier inversor.',
          '这就是数字经济时代的最优选。启诚投资把复杂的技术转化成了简单的收益，这太棒了。':
            'Es la mejor elección en la era de la economía digital. Qicheng convierte tecnología compleja en ganancias simples. Es genial.',
          '我对启诚投资的安全性印象深刻。在这个领域，安全高于一切，而启诚做到了极致。':
            'La seguridad de Qicheng me impresionó. En este sector, la seguridad lo es todo, y Qicheng la lleva al máximo nivel.',
          '这种高频、稳定的投资方式非常适合我的财务规划。启诚投资已成为我资产配置中的核心部分。':
            'Este enfoque de alta frecuencia y estabilidad encaja perfecto en mi planificación financiera. Qicheng ya es una parte central de mi cartera.',
          '感谢启诚投资让我学会了如何聪明地赚钱。这不仅是投资技巧的提升，更是思维方式的升级。':
            'Gracias a Qicheng aprendí a ganar dinero de forma más inteligente. No solo mejoré mis técnicas; también mi mentalidad.',
          '启诚投资的多元化策略让我在不同的市场环境下都能找到盈利点。专业的团队和精准的信号是我成功的基石。':
            'La estrategia diversificada de Qicheng me permite encontrar oportunidades en distintos mercados. El equipo profesional y las señales precisas son la base de mi éxito.',
          '在这里，我体验到了前所未有的投资自由。启诚的全球化视野和本地化服务完美结合，让投资变得轻松有趣。':
            'Aquí experimenté una libertad de inversión sin precedentes. La visión global y el servicio local de Qicheng hacen que invertir sea fácil y hasta divertido.',
          '启诚投资不仅仅是一个理财工具，它更像是一个智慧的投资伙伴。每一步操作都清晰透明，让人倍感安心。':
            'Qicheng no es solo una herramienta; es como un socio inteligente. Cada paso es claro y transparente, y eso da mucha confianza.',
          '我非常欣赏启诚对创新的执着。在这个快速变化的时代，只有不断进取的团队才能为投资者创造持续的价值。':
            'Admiro mucho el compromiso de Qicheng con la innovación. En una era de cambios rápidos, solo un equipo que avanza sin parar puede crear valor sostenido.'
        },
        fr: {
          '加入启诚投资是我做过最正确的职业选择。收益始终保持稳定，信号极其精准。这确实是一种全新的工作方式。':
            'Rejoindre Qicheng a été la meilleure décision de ma carrière. Les rendements sont stables et les signaux d’une précision remarquable. C’est vraiment une nouvelle façon de travailler.',
          '我最喜欢的是它的灵活性。每天只需花费极少的时间，效果却非常显著。提款总是准时到达，让我完全没有后顾之忧。':
            'Ce que j’apprécie le plus, c’est la flexibilité. Quelques minutes par jour suffisent, et les résultats sont impressionnants. Les retraits arrivent toujours à l’heure, sans aucune inquiétude.',
          '启诚投资提供了我在其他地方从未见过的专业支持。准时的信号和可靠的基础设施让数字资产管理变得轻而易举。':
            'Qicheng offre un niveau de support professionnel que je n’avais jamais vu ailleurs. Des signaux ponctuels et une infrastructure fiable rendent la gestion d’actifs numériques très simple.',
          '该平台的稳定性是无与伦比的。它已成为我数字投资的首选。强烈推荐给任何寻求持续增长的人。':
            'La stabilité de la plateforme est incomparable. C’est devenu mon premier choix pour investir dans le numérique. Je la recommande à tous ceux qui recherchent une croissance régulière.',
          '可靠的信号和快速的提款。启诚投资简化了我的日常生活，同时显著提升了我的投资组合稳定性。':
            'Des signaux fiables et des retraits rapides. Qicheng a simplifié mon quotidien et renforcé la stabilité de mon portefeuille.',
          '在复杂的金融市场中，启诚的精准策略是我稳健获利的钥匙。这不仅仅是投资，更是一种智能生活的体现。':
            'Dans un marché complexe, la stratégie précise de Qicheng est la clé de mes profits réguliers. Ce n’est pas seulement de l’investissement, c’est un mode de vie plus intelligent.',
          '每天只需要 15 分钟跟进信号，我就能获得远超传统理财的收益。这完全改变了我对‘工作’的定义。':
            'Avec seulement 15 minutes par jour à suivre les signaux, j’obtiens des rendements bien supérieurs aux solutions traditionnelles. Cela a complètement changé ma définition du “travail”.',
          '作为一名职业经理人，我非常看重风险控制。启诚投资的透明度和风控逻辑让我能够安心地进行长期资产配置。':
            'En tant que manager, je privilégie le contrôle du risque. La transparence et la logique de gestion des risques de Qicheng me permettent d’investir sereinement sur le long terme.',
          '信号非常准时，操作也非常简单。即使我身在非洲，也能享受到来自伦敦的最顶级的投资机会。':
            'Les signaux sont toujours à l’heure et l’exécution est très simple. Même depuis l’Afrique, je peux accéder à des opportunités de premier plan depuis Londres.',
          '启诚投资的提款流程是我体验过最顺畅的。资金的流动性得到了极大的保障，这在目前的市场环境下非常难得。':
            'Le processus de retrait de Qicheng est le plus fluide que j’aie connu. La liquidité est très bien assurée, ce qui est rare dans le contexte actuel.',
          '这就是我一直在寻找的‘另一种工作选择’。它赋予了我财务自由的同时，也给了我更多陪伴家人的时间。':
            'C’est “l’autre choix de travail” que je cherchais. Cela m’apporte la liberté financière et plus de temps pour ma famille.',
          'TXO 交易所的高性能和启诚的精准信号简直是绝配。这是目前数字资产交易领域最顶尖的体验。':
            'Les performances de TXO et les signaux précis de Qicheng forment un duo parfait. C’est l’une des meilleures expériences de trading d’actifs numériques actuellement.',
          '信号的准确率高得惊人。跟随启诚的节奏，我几乎不需要自己去研究复杂的 K 线，系统已经帮我做好了决策。':
            'La précision des signaux est bluffante. En suivant le rythme de Qicheng, je n’ai presque plus besoin d’analyser les graphiques : le système m’aide déjà à décider.',
          '在这个波动剧烈的时代，启诚投资为我提供了一个避风港。稳定的收益和专业的团队让我对未来充满信心。':
            'Dans une période très volatile, Qicheng m’a offert un refuge. Des rendements stables et une équipe professionnelle me donnent confiance pour l’avenir.',
          '从最初的尝试到现在的信任，启诚投资用结果证明了一切。收益曲线非常漂亮，且一直处于受控状态。':
            'Du premier essai à la confiance totale, Qicheng a tout prouvé par les résultats. La courbe de performance est excellente et toujours sous contrôle.',
          '这里的信号系统是我用过最专业的。它不仅准时，而且背后有着深厚的市场逻辑支撑，让人信服。':
            'Le système de signaux ici est le plus professionnel que j’ai utilisé. Il est ponctuel et soutenu par une logique de marché solide, ce qui inspire confiance.',
          '即使身在亚洲不同的时区，启诚的全球化网络也确保了我能第一时间接收到信号。这确实是真正的全球化协作。':
            'Même en Asie avec un autre fuseau horaire, le réseau mondial de Qicheng me permet de recevoir les signaux immédiatement. C’est une vraie collaboration globale.',
          '每天只需要在手机上点几下，收益就自动进账。这种极简的投资方式非常适合我这种工作忙碌的人。':
            'Chaque jour, quelques clics sur le téléphone et les gains arrivent automatiquement. Cette approche minimaliste convient parfaitement aux personnes très occupées.',
          '提款速度快得离谱，客服也非常专业。启诚投资让我感受到了什么是真正的‘客户至上’。':
            'Les retraits sont incroyablement rapides et le service client très professionnel. Qicheng m’a fait comprendre ce que signifie vraiment “le client d’abord”.',
          '启诚投资的复利增长模式让我看到了财富自由的曙光。只要跟随信号，稳定就是最大的保障。':
            'Le modèle de croissance par capitalisation de Qicheng m’a montré une voie vers la liberté financière. En suivant les signaux, la stabilité devient la meilleure garantie.',
          '作为一个技术开发者，我非常佩服启诚底层的架构。它在保证高性能交易的同时，还能把风控做得如此极致。':
            'En tant que développeur, j’admire l’architecture de Qicheng. Elle offre des performances élevées tout en poussant le contrôle des risques à un niveau exceptionnel.',
          '这是我遇到过最透明、最靠谱的投资机构。每一笔收益都清清楚楚，每一个信号都经得起推敲。':
            'C’est l’organisation d’investissement la plus transparente et fiable que j’ai rencontrée. Chaque gain est clair et chaque signal résiste à l’analyse.',
          '启诚投资让我在繁忙的工作之余，多了一份极其可观的被动收入。这真的是一种生活方式的改变。':
            'En plus de mon travail, Qicheng m’apporte un revenu passif très appréciable. C’est un vrai changement de mode de vie.',
          '加入启诚后，我再也不用为明天的股市波动发愁了。稳定的收益和精准的预测让我感到非常踏实。':
            'Depuis que j’ai rejoint Qicheng, je ne m’inquiète plus des fluctuations de demain. Des rendements stables et des prévisions précises me rassurent.',
          '信号的准确性配合 TXO 的极速执行，这种组合在市场上几乎无敌。启诚投资确实走在了时代的前沿。':
            'Avec des signaux précis et l’exécution ultra-rapide de TXO, cette combinaison est presque imbattable. Qicheng est clairement à l’avant-garde.',
          '如果你想要一种既省心又能赚钱的投资方式，启诚投资是唯一不二的选择。我已经向所有的朋友推荐了它。':
            'Si vous cherchez une méthode d’investissement simple et rentable, Qicheng est un choix évident. Je l’ai déjà recommandée à tous mes amis.',
          '每天只需关注群里的信号，跟着操作就行。这种傻瓜式的投资体验，收益却非常惊人。':
            'Il suffit de suivre les signaux du groupe et d’exécuter. C’est très simple, et pourtant les rendements sont surprenants.',
          '在众多的投资平台中，启诚投资的合规性和透明度是最高的。这是我们长期合作的基石。':
            'Parmi de nombreuses plateformes, Qicheng se distingue par sa conformité et sa transparence. C’est la base d’une coopération durable.',
          '精准的信号系统让我彻底告别了投资的盲目性。每一次决策背后都有强大的数据支持，这让我感到非常安心。':
            'Le système de signaux précis m’a totalement éloigné de l’investissement à l’aveugle. Chaque décision est soutenue par des données solides, ce qui me rassure.',
          '启诚投资的信号不仅仅是数字，更是财富增长的信号灯。感谢团队的辛勤付出，让普通人也能分享到数字经济的红利。':
            'Les signaux de Qicheng ne sont pas que des chiffres : ce sont des balises de croissance. Merci à l’équipe, même les gens ordinaires peuvent profiter des dividendes de l’économie numérique.',
          '这种投资模式非常高效。我不再需要时刻盯着屏幕，信号一到，操作一分钟，剩下的就是等待收益。':
            'Ce modèle est très efficace. Je n’ai plus besoin de surveiller l’écran : un signal arrive, une minute d’action, puis il ne reste qu’à attendre les résultats.',
          '启诚投资改变了我对传统投资的认知。稳定的收益曲线和及时的服务响应，是所有投资者的梦想。':
            'Qicheng a changé ma perception de l’investissement traditionnel. Une courbe stable et un service réactif, c’est le rêve de tout investisseur.',
          '这就是数字经济时代的最优选。启诚投资把复杂的技术转化成了简单的收益，这太棒了。':
            'C’est le meilleur choix à l’ère de l’économie numérique. Qicheng transforme une technologie complexe en gains simples : c’est formidable.',
          '我对启诚投资的安全性印象深刻。在这个领域，安全高于一切，而启诚做到了极致。':
            'La sécurité de Qicheng m’a profondément impressionné. Dans ce domaine, la sécurité est primordiale, et Qicheng la pousse à l’extrême.',
          '这种高频、稳定的投资方式非常适合我的财务规划。启诚投资已成为我资产配置中的核心部分。':
            'Cette approche à haute fréquence et stable correspond parfaitement à mon plan financier. Qicheng est devenu une partie centrale de mon allocation.',
          '感谢启诚投资让我学会了如何聪明地赚钱。这不仅是投资技巧的提升，更是思维方式的升级。':
            'Grâce à Qicheng, j’ai appris à gagner de l’argent plus intelligemment. Ce n’est pas seulement une amélioration technique, c’est aussi un changement de mentalité.',
          '启诚投资的多元化策略让我在不同的市场环境下都能找到盈利点。专业的团队和精准的信号是我成功的基石。':
            'La stratégie diversifiée de Qicheng me permet de trouver des opportunités dans divers marchés. L’équipe professionnelle et les signaux précis sont la base de mon succès.',
          '在这里，我体验到了前所未有的投资自由。启诚的全球化视野和本地化服务完美结合，让投资变得轻松有趣。':
            'Ici, j’ai vécu une liberté d’investissement sans précédent. La vision globale et le service local de Qicheng rendent l’investissement simple et même agréable.',
          '启诚投资不仅仅是一个理财工具，它更像是一个智慧的投资伙伴。每一步操作都清晰透明，让人倍感安心。':
            'Qicheng n’est pas qu’un outil : c’est un partenaire d’investissement intelligent. Chaque étape est claire et transparente, ce qui rassure énormément.',
          '我非常欣赏启诚对创新的执着。在这个快速变化的时代，只有不断进取的团队才能为投资者创造持续的价值。':
            'J’apprécie beaucoup la détermination de Qicheng à innover. Dans une époque qui change vite, seul un collectif en progrès constant peut créer une valeur durable.'
        },
        ar: {
          '加入启诚投资是我做过最正确的职业选择。收益始终保持稳定，信号极其精准。这确实是一种全新的工作方式。':
            'الانضمام إلى Qicheng كان أفضل قرار مهني اتخذته. العوائد مستقرة دائمًا والإشارات دقيقة للغاية. إنها حقًا طريقة جديدة للعمل.',
          '我最喜欢的是它的灵活性。每天只需花费极少的时间，效果却非常显著。提款总是准时到达，让我完全没有后顾之忧。':
            'أكثر ما يعجبني هو المرونة. وقت بسيط يوميًا ونتائج واضحة. السحوبات تصل في موعدها دائمًا، ما يمنحني راحة بال كاملة.',
          '启诚投资提供了我在其他地方从未见过的专业支持。准时的信号和可靠的基础设施让数字资产管理变得轻而易举。':
            'قدّمت Qicheng دعمًا احترافيًا لم أره في أي مكان آخر. إشارات في وقتها وبنية تحتية موثوقة تجعل إدارة الأصول الرقمية سهلة للغاية.',
          '该平台的稳定性是无与伦比的。它已成为我数字投资的首选。强烈推荐给任何寻求持续增长的人。':
            'استقرار المنصة لا مثيل له. أصبحت خياري الأول للاستثمار الرقمي. أوصي بها بشدة لكل من يبحث عن نمو مستمر.',
          '可靠的信号和快速的提款。启诚投资简化了我的日常生活，同时显著提升了我的投资组合稳定性。':
            'إشارات موثوقة وسحوبات سريعة. جعلت Qicheng يومي أبسط ورفعت استقرار محفظتي بشكل ملحوظ.',
          '在复杂的金融市场中，启诚的精准策略是我稳健获利的钥匙。这不仅仅是投资，更是一种智能生活的体现。':
            'في سوق مالي معقد، استراتيجية Qicheng الدقيقة هي مفتاح أرباحي المستقرة. الأمر ليس استثمارًا فقط، بل أسلوب حياة أكثر ذكاءً.',
          '每天只需要 15 分钟跟进信号，我就能获得远超传统理财的收益。这完全改变了我对‘工作’的定义。':
            'بمتابعة الإشارات لمدة 15 دقيقة يوميًا أحصل على عوائد تتجاوز بكثير الأدوات التقليدية. لقد غيّر ذلك تعريف “العمل” لدي تمامًا.',
          '作为一名职业经理人，我非常看重风险控制。启诚投资的透明度和风控逻辑让我能够安心地进行长期资产配置。':
            'بصفتي مديرًا محترفًا، أهتم كثيرًا بالتحكم بالمخاطر. شفافية Qicheng ومنطق إدارة المخاطر يمنحاني ثقة للتخطيط طويل الأجل.',
          '信号非常准时，操作也非常简单。即使我身在非洲，也能享受到来自伦敦的最顶级的投资机会。':
            'الإشارات دقيقة في وقتها والتنفيذ بسيط جدًا. حتى وأنا في أفريقيا، أحصل على أفضل فرص الاستثمار القادمة من لندن.',
          '启诚投资的提款流程是我体验过最顺畅的。资金的流动性得到了极大的保障，这在目前的市场环境下非常难得。':
            'عملية السحب لدى Qicheng هي الأسلس التي جرّبتها. السيولة مضمونة بشكل كبير، وهو أمر نادر في ظروف السوق الحالية.',
          '这就是我一直在寻找的‘另一种工作选择’。它赋予了我财务自由的同时，也给了我更多陪伴家人的时间。':
            'هذا هو “خيار العمل البديل” الذي كنت أبحث عنه. منحني حرية مالية ووقتًا أكبر مع عائلتي.',
          'TXO 交易所的高性能和启诚的精准信号简直是绝配。这是目前数字资产交易领域最顶尖的体验。':
            'الأداء العالي لمنصة TXO مع إشارات Qicheng الدقيقة هو مزيج مثالي. إنها تجربة من الطراز الأول في تداول الأصول الرقمية.',
          '信号的准确率高得惊人。跟随启诚的节奏，我几乎不需要自己去研究复杂的 K 线，系统已经帮我做好了决策。':
            'دقة الإشارات مذهلة. باتباع إيقاع Qicheng لا أحتاج تقريبًا لدراسة الرسوم البيانية المعقدة؛ النظام يساعدني في اتخاذ القرار.',
          '在这个波动剧烈的时代，启诚投资为我提供了一个避风港。稳定的收益和专业的团队让我对未来充满信心。':
            'في زمن التقلبات الشديدة، وفّرت لي Qicheng ملاذًا آمنًا. عوائد مستقرة وفريق محترف يمنحاني ثقة بالمستقبل.',
          '从最初的尝试到现在的信任，启诚投资用结果证明了一切。收益曲线非常漂亮，且一直处于受控状态。':
            'من التجربة الأولى إلى الثقة اليوم، أثبتت Qicheng كل شيء بالنتائج. منحنى العوائد ممتاز ودائمًا ضمن السيطرة.',
          '这里的信号系统是我用过最专业的。它不仅准时，而且背后有着深厚的市场逻辑支撑，让人信服。':
            'نظام الإشارات هنا هو الأكثر احترافية الذي استخدمته. ليس فقط في وقته، بل مدعوم بمنطق سوقي قوي ومقنع.',
          '即使身在亚洲不同的时区，启诚的全球化网络也确保了我能第一时间接收到信号。这确实是真正的全球化协作。':
            'حتى مع اختلاف المناطق الزمنية في آسيا، تضمن شبكة Qicheng العالمية وصول الإشارات فورًا. هذا تعاون عالمي حقيقي.',
          '每天只需要在手机上点几下，收益就自动进账。这种极简的投资方式非常适合我这种工作忙碌的人。':
            'كل يوم بضع نقرات على الهاتف وتصل الأرباح تلقائيًا. هذا الأسلوب البسيط مناسب جدًا لمن لديهم عمل مزدحم مثلي.',
          '提款速度快得离谱，客服也非常专业。启诚投资让我感受到了什么是真正的‘客户至上’。':
            'سرعة السحب مذهلة وخدمة العملاء احترافية جدًا. جعلتني Qicheng أفهم معنى “العميل أولاً” حقًا.',
          '启诚投资的复利增长模式让我看到了财富自由的曙光。只要跟随信号，稳定就是最大的保障。':
            'نموذج النمو المركب لدى Qicheng أظهر لي طريقًا نحو الحرية المالية. ما دمت تتبع الإشارات، فالاستقرار هو أكبر ضمان.',
          '作为一个技术开发者，我非常佩服启诚底层的架构。它在保证高性能交易的同时，还能把风控做得如此极致。':
            'كمطوّر تقني، أنا معجب جدًا ببنية Qicheng الأساسية. أداء عالٍ مع تحكم بالمخاطر بمستوى متقدم للغاية.',
          '这是我遇到过最透明、最靠谱的投资机构。每一笔收益都清清楚楚，每一个信号都经得起推敲。':
            'هذه أكثر جهة استثمارية شفافية وموثوقية قابلتها. كل ربح واضح وكل إشارة قابلة للتحقق والتحليل.',
          '启诚投资让我在繁忙的工作之余，多了一份极其可观的被动收入。这真的是一种生活方式的改变。':
            'إلى جانب عملي المزدحم، منحتني Qicheng دخلًا سلبيًا كبيرًا. إنه تغيير حقيقي في نمط الحياة.',
          '加入启诚后，我再也不用为明天的股市波动发愁了。稳定的收益和精准的预测让我感到非常踏实。':
            'بعد انضمامي إلى Qicheng لم أعد أقلق من تقلبات الغد. عوائد مستقرة وتوقعات دقيقة تمنحني شعورًا بالاطمئنان.',
          '信号的准确性配合 TXO 的极速执行，这种组合在市场上几乎无敌。启诚投资确实走在了时代的前沿。':
            'دقة الإشارات مع تنفيذ TXO فائق السرعة تجعل هذا المزيج شبه لا يُهزم. Qicheng فعلًا في مقدمة العصر.',
          '如果你想要一种既省心又能赚钱的投资方式，启诚投资是唯一不二的选择。我已经向所有的朋友推荐了它。':
            'إذا كنت تريد طريقة استثمار سهلة ومربحة، فـ Qicheng هي الخيار الأفضل. لقد أوصيت بها جميع أصدقائي.',
          '每天只需关注群里的信号，跟着操作就行。这种傻瓜式的投资体验，收益却非常惊人。':
            'يكفي متابعة إشارات المجموعة والتنفيذ. تجربة بسيطة جدًا ومع ذلك العوائد مدهشة.',
          '在众多的投资平台中，启诚投资的合规性和透明度是最高的。这是我们长期合作的基石。':
            'بين منصات كثيرة، تتميز Qicheng بأعلى درجات الامتثال والشفافية. وهذا أساس تعاوننا طويل الأجل.',
          '精准的信号系统让我彻底告别了投资的盲目性。每一次决策背后都有强大的数据支持，这让我感到非常安心。':
            'نظام الإشارات الدقيق أنهى الاستثمار العشوائي بالنسبة لي. كل قرار مدعوم ببيانات قوية وهذا يمنحني راحة كبيرة.',
          '启诚投资的信号不仅仅是数字，更是财富增长的信号灯。感谢团队的辛勤付出，让普通人也能分享到数字经济的红利。':
            'إشارات Qicheng ليست أرقامًا فقط؛ إنها منارات لنمو الثروة. شكرًا للفريق على الجهد، حتى الناس العاديون يمكنهم الاستفادة من عوائد الاقتصاد الرقمي.',
          '这种投资模式非常高效。我不再需要时刻盯着屏幕，信号一到，操作一分钟，剩下的就是等待收益。':
            'هذا النموذج فعال جدًا. لم أعد بحاجة لمراقبة الشاشة طوال الوقت؛ عند وصول الإشارة دقيقة تنفيذ واحدة ثم انتظار النتائج.',
          '启诚投资改变了我对传统投资的认知。稳定的收益曲线和及时的服务响应，是所有投资者的梦想。':
            'غيّرت Qicheng نظرتي للاستثمار التقليدي. منحنى عوائد مستقر واستجابة خدمة سريعة هو حلم أي مستثمر.',
          '这就是数字经济时代的最优选。启诚投资把复杂的技术转化成了简单的收益，这太棒了。':
            'هذا هو الخيار الأمثل في عصر الاقتصاد الرقمي. Qicheng تحوّل التقنية المعقدة إلى أرباح بسيطة، وهذا رائع.',
          '我对启诚投资的安全性印象深刻。在这个领域，安全高于一切，而启诚做到了极致。':
            'أثار إعجابي مستوى الأمان في Qicheng. في هذا المجال الأمان فوق كل شيء، وQicheng وصلت إلى أقصى درجة.',
          '这种高频、稳定的投资方式非常适合我的财务规划。启诚投资已成为我资产配置中的核心部分。':
            'هذا الأسلوب عالي التردد والمستقر يناسب تخطيطي المالي تمامًا. أصبحت Qicheng جزءًا أساسيًا من توزيع أصولي.',
          '感谢启诚投资让我学会了如何聪明地赚钱。这不仅是投资技巧的提升，更是思维方式的升级。':
            'شكرًا لـ Qicheng لأنني تعلمت كيف أكسب المال بذكاء. ليس فقط تطويرًا للمهارات بل ترقية لطريقة التفكير.',
          '启诚投资的多元化策略让我在不同的市场环境下都能找到盈利点。专业的团队和精准的信号是我成功的基石。':
            'استراتيجية Qicheng المتنوعة تساعدني على إيجاد فرص ربح في مختلف ظروف السوق. الفريق المحترف والإشارات الدقيقة أساس نجاحي.',
          '在这里，我体验到了前所未有的投资自由。启诚的全球化视野和本地化服务完美结合，让投资变得轻松有趣。':
            'هنا عشت حرية استثمار لم أعهدها من قبل. رؤية Qicheng العالمية وخدماتها المحلية تجعل الاستثمار سهلًا وممتعًا.',
          '启诚投资不仅仅是一个理财工具，它更像是一个智慧的投资伙伴。每一步操作都清晰透明，让人倍感安心。':
            'Qicheng ليست مجرد أداة مالية؛ بل شريك استثماري ذكي. كل خطوة واضحة وشفافة ما يمنح ثقة كبيرة.',
          '我非常欣赏启诚对创新的执着。在这个快速变化的时代，只有不断进取的团队才能为投资者创造持续的价值。':
            'أقدّر كثيرًا إصرار Qicheng على الابتكار. في زمن يتغير بسرعة، لا يصنع قيمة مستدامة إلا فريق يتقدم باستمرار.'
        },
        de: {
          '加入启诚投资是我做过最正确的职业选择。收益始终保持稳定，信号极其精准。这确实是一种全新的工作方式。':
            'Der Einstieg bei Qicheng war die beste berufliche Entscheidung, die ich je getroffen habe. Die Erträge sind konstant stabil und die Signale extrem präzise. Das ist wirklich eine neue Art zu arbeiten.',
          '我最喜欢的是它的灵活性。每天只需花费极少的时间，效果却非常显著。提款总是准时到达，让我完全没有后顾之忧。':
            'Am meisten liebe ich die Flexibilität. Es braucht täglich nur wenig Zeit, und die Ergebnisse sind deutlich spürbar. Auszahlungen kommen immer pünktlich – völlig sorgenfrei.',
          '启诚投资提供了我在其他地方从未见过的专业支持。准时的信号和可靠的基础设施让数字资产管理变得轻而易举。':
            'Qicheng bietet professionelle Unterstützung, wie ich sie nirgendwo sonst erlebt habe. Pünktliche Signale und eine verlässliche Infrastruktur machen das Management digitaler Assets mühelos.',
          '该平台的稳定性是无与伦比的。它已成为我数字投资的首选。强烈推荐给任何寻求持续增长的人。':
            'Die Stabilität der Plattform ist unerreicht. Sie ist meine erste Wahl für digitale Investments. Sehr empfehlenswert für alle, die kontinuierliches Wachstum suchen.',
          '可靠的信号和快速的提款。启诚投资简化了我的日常生活，同时显著提升了我的投资组合稳定性。':
            'Zuverlässige Signale und schnelle Auszahlungen. Qicheng hat meinen Alltag vereinfacht und die Stabilität meines Portfolios spürbar verbessert.',
          '在复杂的金融市场中，启诚的精准策略是我稳健获利的钥匙。这不仅仅是投资，更是一种智能生活的体现。':
            'In einem komplexen Finanzmarkt ist Qichengs präzise Strategie der Schlüssel zu meinen stabilen Gewinnen. Das ist mehr als Investieren – es ist eine intelligentere Lebensweise.',
          '每天只需要 15 分钟跟进信号，我就能获得远超传统理财的收益。这完全改变了我对‘工作’的定义。':
            'Mit nur 15 Minuten täglich für die Signale erziele ich Renditen weit über klassischen Anlagen. Das hat meine Definition von „Arbeit“ komplett verändert.',
          '作为一名职业经理人，我非常看重风险控制。启诚投资的透明度和风控逻辑让我能够安心地进行长期资产配置。':
            'Als professioneller Manager lege ich großen Wert auf Risikokontrolle. Die Transparenz und das Risikomanagement von Qicheng geben mir Sicherheit für langfristige Allokationen.',
          '信号非常准时，操作也非常简单。即使我身在非洲，也能享受到来自伦敦的最顶级的投资机会。':
            'Die Signale kommen pünktlich und die Umsetzung ist sehr einfach. Selbst aus Afrika kann ich erstklassige Investmentchancen aus London nutzen.',
          '启诚投资的提款流程是我体验过最顺畅的。资金的流动性得到了极大的保障，这在目前的市场环境下非常难得。':
            'Der Auszahlungsprozess bei Qicheng ist der reibungsloseste, den ich je erlebt habe. Die Liquidität ist hervorragend abgesichert – das ist im aktuellen Markt selten.',
          '这就是我一直在寻找的‘另一种工作选择’。它赋予了我财务自由的同时，也给了我更多陪伴家人的时间。':
            'Das ist die „alternative Arbeitsoption“, nach der ich gesucht habe. Es bringt finanzielle Freiheit und mehr Zeit für die Familie.',
          'TXO 交易所的高性能和启诚的精准信号简直是绝配。这是目前数字资产交易领域最顶尖的体验。':
            'Die Performance von TXO und die präzisen Signale von Qicheng sind ein perfektes Match. Das ist derzeit eines der besten Erlebnisse im Digital-Asset-Trading.',
          '信号的准确率高得惊人。跟随启诚的节奏，我几乎不需要自己去研究复杂的 K 线，系统已经帮我做好了决策。':
            'Die Signalgenauigkeit ist erstaunlich. Wenn ich Qicheng folge, muss ich komplexe Charts kaum noch analysieren – das System unterstützt die Entscheidungen.',
          '在这个波动剧烈的时代，启诚投资为我提供了一个避风港。稳定的收益和专业的团队让我对未来充满信心。':
            'In dieser extrem volatilen Zeit ist Qicheng mein sicherer Hafen. Stabile Erträge und ein professionelles Team geben mir Zuversicht für die Zukunft.',
          '从最初的尝试到现在的信任，启诚投资用结果证明了一切。收益曲线非常漂亮，且一直处于受控状态。':
            'Vom ersten Test bis zum heutigen Vertrauen hat Qicheng alles mit Ergebnissen bewiesen. Die Renditekurve ist sehr gut und stets unter Kontrolle.',
          '这里的信号系统是我用过最专业的。它不仅准时，而且背后有着深厚的市场逻辑支撑，让人信服。':
            'Das Signalsystem hier ist das professionellste, das ich genutzt habe. Es ist pünktlich und durch eine starke Marktlogik untermauert – sehr überzeugend.',
          '即使身在亚洲不同的时区，启诚的全球化网络也确保了我能第一时间接收到信号。这确实是真正的全球化协作。':
            'Selbst in Asien mit anderen Zeitzonen sorgt Qichengs globales Netzwerk dafür, dass ich Signale sofort erhalte. Das ist echte globale Zusammenarbeit.',
          '每天只需要在手机上点几下，收益就自动进账。这种极简的投资方式非常适合我这种工作忙碌的人。':
            'Ein paar Klicks am Smartphone pro Tag und die Gewinne kommen automatisch. Dieser minimalistische Ansatz ist perfekt für vielbeschäftigte Menschen wie mich.',
          '提款速度快得离谱，客服也非常专业。启诚投资让我感受到了什么是真正的‘客户至上’。':
            'Die Auszahlungen sind unfassbar schnell und der Support sehr professionell. Qicheng zeigt, was „Customer First“ wirklich bedeutet.',
          '启诚投资的复利增长模式让我看到了财富自由的曙光。只要跟随信号，稳定就是最大的保障。':
            'Das Zinseszins-Wachstumsmodell von Qicheng zeigt mir einen Weg zur finanziellen Freiheit. Solange man den Signalen folgt, ist Stabilität die größte Absicherung.',
          '作为一个技术开发者，我非常佩服启诚底层的架构。它在保证高性能交易的同时，还能把风控做得如此极致。':
            'Als Entwickler bewundere ich Qichengs Architektur. Sie liefert High-Performance und treibt Risikokontrolle auf ein extrem hohes Niveau.',
          '这是我遇到过最透明、最靠谱的投资机构。每一笔收益都清清楚楚，每一个信号都经得起推敲。':
            'Das ist die transparenteste und zuverlässigste Investmentorganisation, die ich kenne. Jeder Gewinn ist nachvollziehbar und jedes Signal hält einer Prüfung stand.',
          '启诚投资让我在繁忙的工作之余，多了一份极其可观的被动收入。这真的是一种生活方式的改变。':
            'Neben meinem stressigen Job habe ich durch Qicheng ein beachtliches passives Einkommen. Das ist wirklich ein Lifestyle-Change.',
          '加入启诚后，我再也不用为明天的股市波动发愁了。稳定的收益和精准的预测让我感到非常踏实。':
            'Seit ich bei Qicheng bin, sorge ich mich nicht mehr über morgige Marktschwankungen. Stabile Erträge und präzise Prognosen geben mir Sicherheit.',
          '信号的准确性配合 TXO 的极速执行，这种组合在市场上几乎无敌。启诚投资确实走在了时代的前沿。':
            'Mit präzisen Signalen und der blitzschnellen Ausführung von TXO ist diese Kombination nahezu unschlagbar. Qicheng ist wirklich seiner Zeit voraus.',
          '如果你想要一种既省心又能赚钱的投资方式，启诚投资是唯一不二的选择。我已经向所有的朋友推荐了它。':
            'Wenn du eine Anlage suchst, die unkompliziert und profitabel ist, ist Qicheng die beste Wahl. Ich habe es schon all meinen Freunden empfohlen.',
          '每天只需关注群里的信号，跟着操作就行。这种傻瓜式的投资体验，收益却非常惊人。':
            'Du musst nur die Gruppensignale verfolgen und umsetzen. Es ist fast idiotensicher – und die Ergebnisse sind erstaunlich.',
          '在众多的投资平台中，启诚投资的合规性和透明度是最高的。这是我们长期合作的基石。':
            'Unter vielen Plattformen sind Compliance und Transparenz bei Qicheng besonders hoch. Das ist die Basis für unsere langfristige Zusammenarbeit.',
          '精准的信号系统让我彻底告别了投资的盲目性。每一次决策背后都有强大的数据支持，这让我感到非常安心。':
            'Das präzise Signalsystem hat blindes Investieren für mich beendet. Jede Entscheidung ist datenbasiert, was mir echte Sicherheit gibt.',
          '启诚投资的信号不仅仅是数字，更是财富增长的信号灯。感谢团队的辛勤付出，让普通人也能分享到数字经济的红利。':
            'Qichengs Signale sind nicht nur Zahlen – sie sind Wegweiser für Vermögenswachstum. Danke an das Team: Auch normale Menschen können an den Dividenden der digitalen Wirtschaft teilhaben.',
          '这种投资模式非常高效。我不再需要时刻盯着屏幕，信号一到，操作一分钟，剩下的就是等待收益。':
            'Dieses Modell ist extrem effizient. Ich muss nicht mehr ständig auf den Bildschirm schauen: Signal kommt, eine Minute handeln, dann auf das Ergebnis warten.',
          '启诚投资改变了我对传统投资的认知。稳定的收益曲线和及时的服务响应，是所有投资者的梦想。':
            'Qicheng hat meine Sicht auf traditionelle Investments verändert. Eine stabile Renditekurve und schnelle Service-Reaktion sind der Traum jedes Investors.',
          '这就是数字经济时代的最优选。启诚投资把复杂的技术转化成了简单的收益，这太棒了。':
            'Das ist die beste Wahl im Zeitalter der digitalen Wirtschaft. Qicheng verwandelt komplexe Technik in einfache Gewinne – großartig.',
          '我对启诚投资的安全性印象深刻。在这个领域，安全高于一切，而启诚做到了极致。':
            'Ich bin von der Sicherheit bei Qicheng tief beeindruckt. In diesem Bereich steht Sicherheit über allem – und Qicheng treibt sie auf die Spitze.',
          '这种高频、稳定的投资方式非常适合我的财务规划。启诚投资已成为我资产配置中的核心部分。':
            'Dieser hochfrequente und stabile Ansatz passt perfekt zu meiner Finanzplanung. Qicheng ist zu einem Kernbestandteil meiner Allokation geworden.',
          '感谢启诚投资让我学会了如何聪明地赚钱。这不仅是投资技巧的提升，更是思维方式的升级。':
            'Dank Qicheng habe ich gelernt, smarter Geld zu verdienen. Das ist nicht nur eine Verbesserung der Technik, sondern auch ein Mindset-Upgrade.',
          '启诚投资的多元化策略让我在不同的市场环境下都能找到盈利点。专业的团队和精准的信号是我成功的基石。':
            'Qichengs diversifizierte Strategie hilft mir, in unterschiedlichen Marktphasen Chancen zu finden. Das professionelle Team und die präzisen Signale sind die Basis meines Erfolgs.',
          '在这里，我体验到了前所未有的投资自由。启诚的全球化视野和本地化服务完美结合，让投资变得轻松有趣。':
            'Hier erlebe ich Investmentfreiheit wie nie zuvor. Qichengs globaler Blick und lokaler Service machen Investieren leicht und sogar spannend.',
          '启诚投资不仅仅是一个理财工具，它更像是一个智慧的投资伙伴。每一步操作都清晰透明，让人倍感安心。':
            'Qicheng ist nicht nur ein Tool – eher ein intelligenter Investmentpartner. Jeder Schritt ist klar und transparent, was enorm beruhigt.',
          '我非常欣赏启诚对创新的执着。在这个快速变化的时代，只有不断进取的团队才能为投资者创造持续的价值。':
            'Ich schätze Qichengs Beharrlichkeit in Sachen Innovation sehr. In einer schnelllebigen Zeit kann nur ein kontinuierlich voranschreitendes Team nachhaltigen Wert schaffen.'
        },
        ru: {
          '加入启诚投资是我做过最正确的职业选择。收益始终保持稳定，信号极其精准。这确实是一种全新的工作方式。':
            'Присоединиться к Qicheng — лучшее решение в моей карьере. Доходность стабильно держится, а сигналы невероятно точные. Это действительно новый способ работы.',
          '我最喜欢的是它的灵活性。每天只需花费极少的时间，效果却非常显著。提款总是准时到达，让我完全没有后顾之忧。':
            'Больше всего мне нравится гибкость. Каждый день требуется совсем немного времени, а результат заметный. Вывод средств всегда приходит вовремя — никакого беспокойства.',
          '启诚投资提供了我在其他地方从未见过的专业支持。准时的信号和可靠的基础设施让数字资产管理变得轻而易举。':
            'Qicheng дает профессиональную поддержку, которую я нигде больше не встречал. Пунктуальные сигналы и надежная инфраструктура делают управление цифровыми активами простым.',
          '该平台的稳定性是无与伦比的。它已成为我数字投资的首选。强烈推荐给任何寻求持续增长的人。':
            'Стабильность платформы вне конкуренции. Это мой главный выбор для цифровых инвестиций. Рекомендую всем, кто ищет устойчивый рост.',
          '可靠的信号和快速的提款。启诚投资简化了我的日常生活，同时显著提升了我的投资组合稳定性。':
            'Надежные сигналы и быстрые выводы. Qicheng упростил мой ежедневный процесс и заметно повысил стабильность портфеля.',
          '在复杂的金融市场中，启诚的精准策略是我稳健获利的钥匙。这不仅仅是投资，更是一种智能生活的体现。':
            'На сложном финансовом рынке точная стратегия Qicheng — ключ к моим стабильным доходам. Это не просто инвестиции, а более умный образ жизни.',
          '每天只需要 15 分钟跟进信号，我就能获得远超传统理财的收益。这完全改变了我对‘工作’的定义。':
            'Достаточно 15 минут в день следить за сигналами, и доходность значительно выше традиционных инструментов. Это полностью изменило мое понимание «работы».',
          '作为一名职业经理人，我非常看重风险控制。启诚投资的透明度和风控逻辑让我能够安心地进行长期资产配置。':
            'Как профессиональный менеджер, я очень ценю контроль рисков. Прозрачность и логика риск-менеджмента Qicheng позволяют спокойно строить долгосрочные стратегии.',
          '信号非常准时，操作也非常简单。即使我身在非洲，也能享受到来自伦敦的最顶级的投资机会。':
            'Сигналы приходят вовремя, а действия очень простые. Даже находясь в Африке, я получаю лучшие инвестиционные возможности из Лондона.',
          '启诚投资的提款流程是我体验过最顺畅的。资金的流动性得到了极大的保障，这在目前的市场环境下非常难得。':
            'Процесс вывода средств у Qicheng — самый гладкий из всех, что я пробовал. Ликвидность отлично обеспечена, что сейчас большая редкость.',
          '这就是我一直在寻找的‘另一种工作选择’。它赋予了我财务自由的同时，也给了我更多陪伴家人的时间。':
            'Это та «альтернативная работа», которую я искал. Она дает финансовую свободу и больше времени для семьи.',
          'TXO 交易所的高性能和启诚的精准信号简直是绝配。这是目前数字资产交易领域最顶尖的体验。':
            'Высокая производительность TXO и точные сигналы Qicheng — идеальная пара. Это один из лучших опытов в сфере торговли цифровыми активами.',
          '信号的准确率高得惊人。跟随启诚的节奏，我几乎不需要自己去研究复杂的 K 线，系统已经帮我做好了决策。':
            'Точность сигналов поражает. Следуя ритму Qicheng, мне почти не нужно изучать сложные графики — система помогает принимать решения.',
          '在这个波动剧烈的时代，启诚投资为我提供了一个避风港。稳定的收益和专业的团队让我对未来充满信心。':
            'В эпоху сильной волатильности Qicheng стал для меня тихой гаванью. Стабильная доходность и профессиональная команда дают уверенность в будущем.',
          '从最初的尝试到现在的信任，启诚投资用结果证明了一切。收益曲线非常漂亮，且一直处于受控状态。':
            'От первых проб до полного доверия — Qicheng доказал все результатами. Кривая доходности отличная и всегда под контролем.',
          '这里的信号系统是我用过最专业的。它不仅准时，而且背后有着深厚的市场逻辑支撑，让人信服。':
            'Сигнальная система здесь — самая профессиональная из тех, что я использовал. Она пунктуальна и подкреплена сильной рыночной логикой.',
          '即使身在亚洲不同的时区，启诚的全球化网络也确保了我能第一时间接收到信号。这确实是真正的全球化协作。':
            'Даже в Азии, в другом часовом поясе, глобальная сеть Qicheng гарантирует мгновенное получение сигналов. Это настоящая глобальная кооперация.',
          '每天只需要在手机上点几下，收益就自动进账。这种极简的投资方式非常适合我这种工作忙碌的人。':
            'Пара нажатий на телефоне в день — и прибыль поступает автоматически. Такой минимализм идеально подходит занятым людям.',
          '提款速度快得离谱，客服也非常专业。启诚投资让我感受到了什么是真正的‘客户至上’。':
            'Вывод средств невероятно быстрый, а поддержка очень профессиональная. Qicheng показал, что такое «клиент прежде всего».',
          '启诚投资的复利增长模式让我看到了财富自由的曙光。只要跟随信号，稳定就是最大的保障。':
            'Модель роста на основе сложного процента в Qicheng дала мне надежду на финансовую свободу. Следуя сигналам, стабильность становится главным гарантом.',
          '作为一个技术开发者，我非常佩服启诚底层的架构。它在保证高性能交易的同时，还能把风控做得如此极致。':
            'Как разработчик, я восхищаюсь базовой архитектурой Qicheng. Высокая производительность сочетается с максимально продуманным контролем рисков.',
          '这是我遇到过最透明、最靠谱的投资机构。每一笔收益都清清楚楚，每一个信号都经得起推敲。':
            'Это самая прозрачная и надежная инвестиционная организация из всех, что я встречал. Каждая прибыль понятна, каждый сигнал выдерживает проверку.',
          '启诚投资让我在繁忙的工作之余，多了一份极其可观的被动收入。这真的是一种生活方式的改变。':
            'Помимо основной работы, Qicheng дает мне весьма ощутимый пассивный доход. Это действительно меняет образ жизни.',
          '加入启诚后，我再也不用为明天的股市波动发愁了。稳定的收益和精准的预测让我感到非常踏实。':
            'После того как я присоединился к Qicheng, я больше не переживаю о завтрашних колебаниях. Стабильная доходность и точные прогнозы дают уверенность.',
          '信号的准确性配合 TXO 的极速执行，这种组合在市场上几乎无敌。启诚投资确实走在了时代的前沿。':
            'Точные сигналы в сочетании с молниеносным исполнением TXO делают эту связку почти непобедимой. Qicheng действительно впереди времени.',
          '如果你想要一种既省心又能赚钱的投资方式，启诚投资是唯一不二的选择。我已经向所有的朋友推荐了它。':
            'Если вам нужна инвестиционная модель, которая проста и прибыльна, Qicheng — лучший выбор. Я уже рекомендовал его всем друзьям.',
          '每天只需关注群里的信号，跟着操作就行。这种傻瓜式的投资体验，收益却非常惊人。':
            'Достаточно следить за сигналами в группе и повторять действия. Опыт почти «безошибочный», а доходность удивляет.',
          '在众多的投资平台中，启诚投资的合规性和透明度是最高的。这是我们长期合作的基石。':
            'Среди множества платформ у Qicheng одна из лучших комбинаций комплаенса и прозрачности. Это фундамент долгосрочного сотрудничества.',
          '精准的信号系统让我彻底告别了投资的盲目性。每一次决策背后都有强大的数据支持，这让我感到非常安心。':
            'Точная система сигналов избавила меня от «слепых» инвестиций. За каждым решением стоят сильные данные, и это очень успокаивает.',
          '启诚投资的信号不仅仅是数字，更是财富增长的信号灯。感谢团队的辛勤付出，让普通人也能分享到数字经济的红利。':
            'Сигналы Qicheng — не просто цифры, а маяки роста капитала. Спасибо команде: обычные люди тоже могут разделить дивиденды цифровой экономики.',
          '这种投资模式非常高效。我不再需要时刻盯着屏幕，信号一到，操作一分钟，剩下的就是等待收益。':
            'Эта модель очень эффективна. Мне не нужно постоянно смотреть в экран: пришел сигнал — минута действий, дальше остается ждать результат.',
          '启诚投资改变了我对传统投资的认知。稳定的收益曲线和及时的服务响应，是所有投资者的梦想。':
            'Qicheng изменил мое представление о традиционных инвестициях. Стабильная кривая доходности и своевременный сервис — мечта каждого инвестора.',
          '这就是数字经济时代的最优选。启诚投资把复杂的技术转化成了简单的收益，这太棒了。':
            'Это лучший выбор в эпоху цифровой экономики. Qicheng превращает сложные технологии в простую прибыль — это великолепно.',
          '我对启诚投资的安全性印象深刻。在这个领域，安全高于一切，而启诚做到了极致。':
            'Меня глубоко впечатлила безопасность Qicheng. В этой сфере безопасность важнее всего, и Qicheng довел ее до максимума.',
          '这种高频、稳定的投资方式非常适合我的财务规划。启诚投资已成为我资产配置中的核心部分。':
            'Этот высокочастотный и стабильный подход идеально подходит моему финансовому плану. Qicheng стал ключевой частью моей аллокации.',
          '感谢启诚投资让我学会了如何聪明地赚钱。这不仅是投资技巧的提升，更是思维方式的升级。':
            'Благодаря Qicheng я научился зарабатывать умнее. Это не только улучшение навыков, но и обновление мышления.',
          '启诚投资的多元化策略让我在不同的市场环境下都能找到盈利点。专业的团队和精准的信号是我成功的基石。':
            'Диверсифицированная стратегия Qicheng помогает находить прибыль в разных рыночных условиях. Профессиональная команда и точные сигналы — основа моего успеха.',
          '在这里，我体验到了前所未有的投资自由。启诚的全球化视野和本地化服务完美结合，让投资变得轻松有趣。':
            'Здесь я испытал свободу инвестиций, которой раньше не было. Глобальное видение Qicheng и локальный сервис делают инвестиции легкими и интересными.',
          '启诚投资不仅仅是一个理财工具，它更像是一个智慧的投资伙伴。每一步操作都清晰透明，让人倍感安心。':
            'Qicheng — не просто инструмент, а умный инвестиционный партнер. Каждый шаг прозрачен и понятен, что дает спокойствие.',
          '我非常欣赏启诚对创新的执着。在这个快速变化的时代，只有不断进取的团队才能为投资者创造持续的价值。':
            'Я очень ценю настойчивость Qicheng в инновациях. В быстро меняющемся мире только команда, которая постоянно развивается, может создавать устойчивую ценность.'
        },
        pt: {
          '加入启诚投资是我做过最正确的职业选择。收益始终保持稳定，信号极其精准。这确实是一种全新的工作方式。':
            'Entrar para a Qicheng foi a melhor decisão profissional que já tomei. Os retornos são consistentemente estáveis e os sinais extremamente precisos. É realmente uma nova forma de trabalhar.',
          '我最喜欢的是它的灵活性。每天只需花费极少的时间，效果却非常显著。提款总是准时到达，让我完全没有后顾之忧。':
            'O que eu mais gosto é a flexibilidade. Pouquíssimo tempo por dia e o resultado é muito evidente. Os saques chegam sempre no prazo, sem preocupação.',
          '启诚投资提供了我在其他地方从未见过的专业支持。准时的信号和可靠的基础设施让数字资产管理变得轻而易举。':
            'A Qicheng oferece um suporte profissional que eu nunca vi em outro lugar. Sinais pontuais e infraestrutura confiável tornam a gestão de ativos digitais muito fácil.',
          '该平台的稳定性是无与伦比的。它已成为我数字投资的首选。强烈推荐给任何寻求持续增长的人。':
            'A estabilidade da plataforma é incomparável. Virou minha primeira opção para investimentos digitais. Recomendo fortemente para quem busca crescimento constante.',
          '可靠的信号和快速的提款。启诚投资简化了我的日常生活，同时显著提升了我的投资组合稳定性。':
            'Sinais confiáveis e saques rápidos. A Qicheng simplificou minha rotina e aumentou significativamente a estabilidade do meu portfólio.',
          '在复杂的金融市场中，启诚的精准策略是我稳健获利的钥匙。这不仅仅是投资，更是一种智能生活的体现。':
            'Em um mercado financeiro complexo, a estratégia precisa da Qicheng é a chave dos meus ganhos consistentes. Não é só investimento; é um estilo de vida mais inteligente.',
          '每天只需要 15 分钟跟进信号，我就能获得远超传统理财的收益。这完全改变了我对‘工作’的定义。':
            'Com apenas 15 minutos por dia acompanhando os sinais, consigo retornos muito acima do tradicional. Isso mudou completamente minha definição de “trabalho”.',
          '作为一名职业经理人，我非常看重风险控制。启诚投资的透明度和风控逻辑让我能够安心地进行长期资产配置。':
            'Como gestor, valorizo muito o controle de risco. A transparência e a lógica de gestão de riscos da Qicheng me dão segurança para alocações de longo prazo.',
          '信号非常准时，操作也非常简单。即使我身在非洲，也能享受到来自伦敦的最顶级的投资机会。':
            'Os sinais chegam sempre no horário e a operação é simples. Mesmo estando na África, consigo acessar oportunidades de investimento de alto nível vindas de Londres.',
          '启诚投资的提款流程是我体验过最顺畅的。资金的流动性得到了极大的保障，这在目前的市场环境下非常难得。':
            'O processo de saque da Qicheng é o mais fluido que já experimentei. A liquidez é muito bem garantida, algo raro no cenário atual.',
          '这就是我一直在寻找的‘另一种工作选择’。它赋予了我财务自由的同时，也给了我更多陪伴家人的时间。':
            'Esta é a “outra opção de trabalho” que eu procurava. Ela me dá liberdade financeira e mais tempo para estar com a família.',
          'TXO 交易所的高性能和启诚的精准信号简直是绝配。这是目前数字资产交易领域最顶尖的体验。':
            'A alta performance da TXO e os sinais precisos da Qicheng formam a combinação perfeita. É uma das melhores experiências no trading de ativos digitais.',
          '信号的准确率高得惊人。跟随启诚的节奏，我几乎不需要自己去研究复杂的 K 线，系统已经帮我做好了决策。':
            'A taxa de acerto dos sinais é impressionante. Seguindo o ritmo da Qicheng, quase não preciso estudar gráficos complexos; o sistema ajuda na decisão.',
          '在这个波动剧烈的时代，启诚投资为我提供了一个避风港。稳定的收益和专业的团队让我对未来充满信心。':
            'Em tempos de alta volatilidade, a Qicheng é meu porto seguro. Retornos estáveis e uma equipe profissional me dão confiança no futuro.',
          '从最初的尝试到现在的信任，启诚投资用结果证明了一切。收益曲线非常漂亮，且一直处于受控状态。':
            'Da tentativa inicial à confiança atual, a Qicheng provou tudo com resultados. A curva de retorno é ótima e sempre sob controle.',
          '这里的信号系统是我用过最专业的。它不仅准时，而且背后有着深厚的市场逻辑支撑，让人信服。':
            'O sistema de sinais aqui é o mais profissional que já usei. Além de pontual, é sustentado por uma lógica de mercado sólida e convincente.',
          '即使身在亚洲不同的时区，启诚的全球化网络也确保了我能第一时间接收到信号。这确实是真正的全球化协作。':
            'Mesmo na Ásia em outro fuso, a rede global da Qicheng garante que eu receba os sinais imediatamente. Isso é colaboração global de verdade.',
          '每天只需要在手机上点几下，收益就自动进账。这种极简的投资方式非常适合我这种工作忙碌的人。':
            'Com alguns toques no celular por dia, os lucros entram automaticamente. Esse método minimalista é perfeito para quem tem rotina corrida.',
          '提款速度快得离谱，客服也非常专业。启诚投资让我感受到了什么是真正的‘客户至上’。':
            'A velocidade de saque é absurda e o atendimento é muito profissional. A Qicheng me mostrou o que é “cliente em primeiro lugar”.',
          '启诚投资的复利增长模式让我看到了财富自由的曙光。只要跟随信号，稳定就是最大的保障。':
            'O modelo de crescimento composto da Qicheng me mostrou um caminho para a liberdade financeira. Seguindo os sinais, estabilidade é a maior garantia.',
          '作为一个技术开发者，我非常佩服启诚底层的架构。它在保证高性能交易的同时，还能把风控做得如此极致。':
            'Como desenvolvedor, admiro a arquitetura da Qicheng. Ela garante alta performance e leva o controle de risco a um nível excepcional.',
          '这是我遇到过最透明、最靠谱的投资机构。每一笔收益都清清楚楚，每一个信号都经得起推敲。':
            'É a instituição de investimento mais transparente e confiável que já encontrei. Cada lucro é claro e cada sinal resiste a análise.',
          '启诚投资让我在繁忙的工作之余，多了一份极其可观的被动收入。这真的是一种生活方式的改变。':
            'Mesmo com a agenda cheia, a Qicheng me trouxe uma renda passiva muito relevante. É realmente uma mudança de estilo de vida.',
          '加入启诚后，我再也不用为明天的股市波动发愁了。稳定的收益和精准的预测让我感到非常踏实。':
            'Depois que entrei na Qicheng, não me preocupo mais com as oscilações de amanhã. Retornos estáveis e previsões precisas me deixam muito seguro.',
          '信号的准确性配合 TXO 的极速执行，这种组合在市场上几乎无敌。启诚投资确实走在了时代的前沿。':
            'A precisão dos sinais com a execução ultra-rápida da TXO torna essa combinação quase imbatível. A Qicheng está realmente à frente do seu tempo.',
          '如果你想要一种既省心又能赚钱的投资方式，启诚投资是唯一不二的选择。我已经向所有的朋友推荐了它。':
            'Se você quer investir de forma simples e lucrativa, a Qicheng é a melhor escolha. Eu já recomendei a todos os meus amigos.',
          '每天只需关注群里的信号，跟着操作就行。这种傻瓜式的投资体验，收益却非常惊人。':
            'Basta acompanhar os sinais do grupo e executar. É simples ao extremo, e mesmo assim os resultados são impressionantes.',
          '在众多的投资平台中，启诚投资的合规性和透明度是最高的。这是我们长期合作的基石。':
            'Entre tantas plataformas, a conformidade e a transparência da Qicheng estão entre as melhores. Isso é a base para uma parceria de longo prazo.',
          '精准的信号系统让我彻底告别了投资的盲目性。每一次决策背后都有强大的数据支持，这让我感到非常安心。':
            'O sistema de sinais preciso acabou com investimentos “no escuro”. Cada decisão tem forte suporte de dados, o que me traz tranquilidade.',
          '启诚投资的信号不仅仅是数字，更是财富增长的信号灯。感谢团队的辛勤付出，让普通人也能分享到数字经济的红利。':
            'Os sinais da Qicheng não são só números; são faróis de crescimento. Obrigado à equipe — pessoas comuns também podem participar dos dividendos da economia digital.',
          '这种投资模式非常高效。我不再需要时刻盯着屏幕，信号一到，操作一分钟，剩下的就是等待收益。':
            'Esse modelo é muito eficiente. Não preciso ficar olhando a tela: chegou o sinal, um minuto de ação e depois é só aguardar o resultado.',
          '启诚投资改变了我对传统投资的认知。稳定的收益曲线和及时的服务响应，是所有投资者的梦想。':
            'A Qicheng mudou minha visão sobre investimento tradicional. Uma curva estável e respostas rápidas de serviço são o sonho de qualquer investidor.',
          '这就是数字经济时代的最优选。启诚投资把复杂的技术转化成了简单的收益，这太棒了。':
            'É a melhor escolha na era da economia digital. A Qicheng transforma tecnologia complexa em ganhos simples — fantástico.',
          '我对启诚投资的安全性印象深刻。在这个领域，安全高于一切，而启诚做到了极致。':
            'Fiquei muito impressionado com a segurança da Qicheng. Neste setor, segurança é tudo, e a Qicheng leva isso ao extremo.',
          '这种高频、稳定的投资方式非常适合我的财务规划。启诚投资已成为我资产配置中的核心部分。':
            'Esse método de alta frequência e estabilidade combina perfeitamente com meu planejamento financeiro. A Qicheng virou parte central da minha alocação.',
          '感谢启诚投资让我学会了如何聪明地赚钱。这不仅是投资技巧的提升，更是思维方式的升级。':
            'Graças à Qicheng, aprendi a ganhar dinheiro de forma mais inteligente. Não é só evolução técnica; é uma atualização de mentalidade.',
          '启诚投资的多元化策略让我在不同的市场环境下都能找到盈利点。专业的团队和精准的信号是我成功的基石。':
            'A estratégia diversificada da Qicheng me ajuda a encontrar oportunidades em diferentes cenários. A equipe profissional e os sinais precisos são a base do meu sucesso.',
          '在这里，我体验到了前所未有的投资自由。启诚的全球化视野和本地化服务完美结合，让投资变得轻松有趣。':
            'Aqui eu vivi uma liberdade de investimento inédita. A visão global e o serviço local da Qicheng tornam investir fácil e até divertido.',
          '启诚投资不仅仅是一个理财工具，它更像是一个智慧的投资伙伴。每一步操作都清晰透明，让人倍感安心。':
            'A Qicheng não é apenas uma ferramenta; é como um parceiro inteligente de investimento. Cada passo é claro e transparente, trazendo muita segurança.',
          '我非常欣赏启诚对创新的执着。在这个快速变化的时代，只有不断进取的团队才能为投资者创造持续的价值。':
            'Eu admiro muito a dedicação da Qicheng à inovação. Em um mundo que muda rápido, só uma equipe que evolui continuamente consegue criar valor duradouro.'
        },
        ja: {
          '加入启诚投资是我做过最正确的职业选择。收益始终保持稳定，信号极其精准。这确实是一种全新的工作方式。':
            'Qicheng に参加したのは、私がこれまでに下した最も正しいキャリア判断でした。収益は常に安定し、シグナルは非常に正確です。まさに新しい働き方だと感じます。',
          '我最喜欢的是它的灵活性。每天只需花费极少的时间，效果却非常显著。提款总是准时到达，让我完全没有后顾之忧。':
            '一番気に入っているのは柔軟さです。毎日ほんの少しの時間で、効果はとても大きい。出金もいつも時間どおりで、安心して使えます。',
          '启诚投资提供了我在其他地方从未见过的专业支持。准时的信号和可靠的基础设施让数字资产管理变得轻而易举。':
            'Qicheng のサポートは、他では見たことがないほどプロフェッショナルです。時間どおりのシグナルと信頼できる基盤により、デジタル資産の管理が驚くほど簡単になりました。',
          '该平台的稳定性是无与伦比的。它已成为我数字投资的首选。强烈推荐给任何寻求持续增长的人。':
            'このプラットフォームの安定性は比類ありません。私のデジタル投資の第一選択になりました。継続的な成長を求める人に強くおすすめします。',
          '可靠的信号和快速的提款。启诚投资简化了我的日常生活，同时显著提升了我的投资组合稳定性。':
            '信頼できるシグナルとスピーディーな出金。Qicheng は日々の手間を減らし、ポートフォリオの安定性も大きく高めてくれました。',
          '在复杂的金融市场中，启诚的精准策略是我稳健获利的钥匙。这不仅仅是投资，更是一种智能生活的体现。':
            '複雑な金融市場で、Qicheng の精密な戦略は安定して利益を得る鍵です。これは投資にとどまらず、スマートな暮らし方そのものです。',
          '每天只需要 15 分钟跟进信号，我就能获得远超传统理财的收益。这完全改变了我对‘工作’的定义。':
            '毎日15分だけシグナルを追うだけで、従来の資産運用を大きく上回るリターンを得られます。「仕事」の定義が完全に変わりました。',
          '作为一名职业经理人，我非常看重风险控制。启诚投资的透明度和风控逻辑让我能够安心地进行长期资产配置。':
            'プロのマネージャーとして、私はリスク管理を重視しています。Qicheng の透明性とリスク管理ロジックにより、長期の資産配分を安心して行えます。',
          '信号非常准时，操作也非常简单。即使我身在非洲，也能享受到来自伦敦的最顶级的投资机会。':
            'シグナルは非常にタイムリーで、操作も簡単です。アフリカにいても、ロンドン発の最上級の投資機会を享受できます。',
          '启诚投资的提款流程是我体验过最顺畅的。资金的流动性得到了极大的保障，这在目前的市场环境下非常难得。':
            '出金プロセスはこれまでで最もスムーズでした。資金流動性がしっかり確保されており、今の市場環境では貴重です。',
          '这就是我一直在寻找的‘另一种工作选择’。它赋予了我财务自由的同时，也给了我更多陪伴家人的时间。':
            'これは私が探していた「もう一つの働き方」です。経済的自由を与えてくれるだけでなく、家族と過ごす時間も増えました。',
          'TXO 交易所的高性能和启诚的精准信号简直是绝配。这是目前数字资产交易领域最顶尖的体验。':
            'TXO の高性能と Qicheng の精密なシグナルはまさに最高の組み合わせです。デジタル資産取引の分野でトップクラスの体験だと思います。',
          '信号的准确率高得惊人。跟随启诚的节奏，我几乎不需要自己去研究复杂的 K 线，系统已经帮我做好了决策。':
            'シグナルの精度が驚異的です。Qicheng の流れに沿えば、複雑なチャートを自分で研究する必要はほとんどなく、システムが意思決定を助けてくれます。',
          '在这个波动剧烈的时代，启诚投资为我提供了一个避风港。稳定的收益和专业的团队让我对未来充满信心。':
            '激しい変動の時代に、Qicheng は私にとっての避難港です。安定した収益とプロのチームが、未来への自信を与えてくれます。',
          '从最初的尝试到现在的信任，启诚投资用结果证明了一切。收益曲线非常漂亮，且一直处于受控状态。':
            '最初の試しから今の信頼に至るまで、Qicheng は結果で証明してきました。収益曲線は美しく、常にコントロールされています。',
          '这里的信号系统是我用过最专业的。它不仅准时，而且背后有着深厚的市场逻辑支撑，让人信服。':
            'ここのシグナルシステムは私が使った中で最もプロフェッショナルです。時間どおりであるだけでなく、強い市場ロジックに裏付けられていて説得力があります。',
          '即使身在亚洲不同的时区，启诚的全球化网络也确保了我能第一时间接收到信号。这确实是真正的全球化协作。':
            'アジアの別のタイムゾーンにいても、Qicheng のグローバルネットワークで即時にシグナルを受け取れます。まさに真のグローバル協業です。',
          '每天只需要在手机上点几下，收益就自动进账。这种极简的投资方式非常适合我这种工作忙碌的人。':
            '毎日スマホで数回タップするだけで、利益が自動的に入ってきます。このミニマルな投資方法は、忙しい人に最適です。',
          '提款速度快得离谱，客服也非常专业。启诚投资让我感受到了什么是真正的‘客户至上’。':
            '出金が驚くほど速く、サポートも非常にプロです。Qicheng を通じて「顧客第一」とは何かを実感しました。',
          '启诚投资的复利增长模式让我看到了财富自由的曙光。只要跟随信号，稳定就是最大的保障。':
            '複利成長モデルにより、経済的自由への光が見えました。シグナルに従う限り、安定こそ最大の保証です。',
          '作为一个技术开发者，我非常佩服启诚底层的架构。它在保证高性能交易的同时，还能把风控做得如此极致。':
            '技術者として、Qicheng の基盤アーキテクチャには感服します。高性能な取引を実現しつつ、リスク管理も徹底されています。',
          '这是我遇到过最透明、最靠谱的投资机构。每一笔收益都清清楚楚，每一个信号都经得起推敲。':
            '私が出会った中で最も透明で信頼できる投資組織です。すべての収益が明確で、すべてのシグナルが検証に耐えます。',
          '启诚投资让我在繁忙的工作之余，多了一份极其可观的被动收入。这真的是一种生活方式的改变。':
            '忙しい仕事の合間にも、非常に大きな不労所得が得られました。これは本当にライフスタイルの変化です。',
          '加入启诚后，我再也不用为明天的股市波动发愁了。稳定的收益和精准的预测让我感到非常踏实。':
            'Qicheng に参加してから、明日の相場変動を心配しなくなりました。安定した収益と正確な予測で、とても安心できます。',
          '信号的准确性配合 TXO 的极速执行，这种组合在市场上几乎无敌。启诚投资确实走在了时代的前沿。':
            '正確なシグナルと TXO の超高速執行の組み合わせは、ほぼ無敵です。Qicheng は時代の最前線を走っています。',
          '如果你想要一种既省心又能赚钱的投资方式，启诚投资是唯一不二的选择。我已经向所有的朋友推荐了它。':
            '手間がかからず稼げる投資方法を求めるなら、Qicheng が最良の選択です。すでに友人全員に勧めています。',
          '每天只需关注群里的信号，跟着操作就行。这种傻瓜式的投资体验，收益却非常惊人。':
            'グループのシグナルを見て、その通りに操作するだけ。とても簡単なのに、リターンは驚くほど大きいです。',
          '在众多的投资平台中，启诚投资的合规性和透明度是最高的。这是我们长期合作的基石。':
            '多くのプラットフォームの中でも、Qicheng のコンプライアンスと透明性は非常に高い。長期的な協力の基盤です。',
          '精准的信号系统让我彻底告别了投资的盲目性。每一次决策背后都有强大的数据支持，这让我感到非常安心。':
            '精密なシグナルシステムで、盲目的な投資から完全に解放されました。すべての判断が強力なデータに支えられており、安心感があります。',
          '启诚投资的信号不仅仅是数字，更是财富增长的信号灯。感谢团队的辛勤付出，让普通人也能分享到数字经济的红利。':
            'Qicheng のシグナルは単なる数字ではなく、資産成長の灯台です。チームの努力に感謝します。普通の人でもデジタル経済の恩恵を得られます。',
          '这种投资模式非常高效。我不再需要时刻盯着屏幕，信号一到，操作一分钟，剩下的就是等待收益。':
            'この投資モデルは非常に効率的です。画面に張り付く必要はなく、シグナルが来たら1分操作して、あとは収益を待つだけです。',
          '启诚投资改变了我对传统投资的认知。稳定的收益曲线和及时的服务响应，是所有投资者的梦想。':
            'Qicheng は従来型投資に対する私の認識を変えました。安定した収益曲線と迅速なサポートは、すべての投資家の夢です。',
          '这就是数字经济时代的最优选。启诚投资把复杂的技术转化成了简单的收益，这太棒了。':
            'デジタル経済時代の最適解です。複雑な技術をシンプルな利益に変える Qicheng は本当に素晴らしい。',
          '我对启诚投资的安全性印象深刻。在这个领域，安全高于一切，而启诚做到了极致。':
            '安全性の高さに強い印象を受けました。この分野では安全が最優先であり、Qicheng はそれを極限まで徹底しています。',
          '这种高频、稳定的投资方式非常适合我的财务规划。启诚投资已成为我资产配置中的核心部分。':
            '高頻度で安定したこの投資方法は、私の資金計画に非常に合っています。Qicheng は資産配分の中核になりました。',
          '感谢启诚投资让我学会了如何聪明地赚钱。这不仅是投资技巧的提升，更是思维方式的升级。':
            'Qicheng のおかげで、賢く稼ぐ方法を学べました。投資スキルだけでなく、思考もアップデートされました。',
          '启诚投资的多元化策略让我在不同的市场环境下都能找到盈利点。专业的团队和精准的信号是我成功的基石。':
            '多角的な戦略により、さまざまな市場環境で利益機会を見つけられます。プロのチームと精密なシグナルが成功の基盤です。',
          '在这里，我体验到了前所未有的投资自由。启诚的全球化视野和本地化服务完美结合，让投资变得轻松有趣。':
            'ここでは前例のない投資の自由を体験しました。グローバルな視野とローカルなサービスの融合で、投資が簡単で楽しくなりました。',
          '启诚投资不仅仅是一个理财工具，它更像是一个智慧的投资伙伴。每一步操作都清晰透明，让人倍感安心。':
            'Qicheng は単なるツールではなく、賢い投資パートナーのようです。すべての手順が明確で透明なので、とても安心できます。',
          '我非常欣赏启诚对创新的执着。在这个快速变化的时代，只有不断进取的团队才能为投资者创造持续的价值。':
            '私は Qicheng のイノベーションへの執念を高く評価しています。変化の速い時代、前進し続けるチームだけが持続的価値を生み出せます。'
        },
        ko: {
          '加入启诚投资是我做过最正确的职业选择。收益始终保持稳定，信号极其精准。这确实是一种全新的工作方式。':
            'Qicheng에 합류한 것은 제가 내린 최고의 커리어 선택이었습니다. 수익은 늘 안정적이고 시그널은 매우 정확합니다. 정말 새로운 방식의 일이라고 느낍니다.',
          '我最喜欢的是它的灵活性。每天只需花费极少的时间，效果却非常显著。提款总是准时到达，让我完全没有后顾之忧。':
            '제가 가장 좋아하는 점은 유연성입니다. 매일 아주 적은 시간만 투자해도 효과가 확실합니다. 출금도 항상 제때 도착해 걱정이 없습니다.',
          '启诚投资提供了我在其他地方从未见过的专业支持。准时的信号和可靠的基础设施让数字资产管理变得轻而易举。':
            'Qicheng의 전문 지원은 다른 곳에서 본 적이 없을 정도입니다. 제시간에 오는 시그널과 믿을 수 있는 인프라 덕분에 디지털 자산 관리가 매우 쉬워졌습니다.',
          '该平台的稳定性是无与伦比的。它已成为我数字投资的首选。强烈推荐给任何寻求持续增长的人。':
            '플랫폼의 안정성은 비교할 수 없습니다. 제 디지털 투자 1순위가 되었습니다. 꾸준한 성장을 원하는 분들께 강력 추천합니다.',
          '可靠的信号和快速的提款。启诚投资简化了我的日常生活，同时显著提升了我的投资组合稳定性。':
            '신뢰할 수 있는 시그널과 빠른 출금. Qicheng은 제 일상을 단순하게 만들었고 포트폴리오 안정성도 크게 높여줬습니다.',
          '在复杂的金融市场中，启诚的精准策略是我稳健获利的钥匙。这不仅仅是投资，更是一种智能生活的体现。':
            '복잡한 금융 시장에서 Qicheng의 정교한 전략은 안정적인 수익의 열쇠입니다. 단순한 투자가 아니라 더 스마트한 라이프스타일입니다.',
          '每天只需要 15 分钟跟进信号，我就能获得远超传统理财的收益。这完全改变了我对‘工作’的定义。':
            '매일 15분만 시그널을 따라가도 전통적인 자산관리보다 훨씬 높은 수익을 얻습니다. “일”의 정의가 완전히 바뀌었습니다.',
          '作为一名职业经理人，我非常看重风险控制。启诚投资的透明度和风控逻辑让我能够安心地进行长期资产配置。':
            '전문 매니저로서 리스크 관리를 매우 중요하게 생각합니다. Qicheng의 투명성과 리스크 관리 로직 덕분에 장기 자산 배분을 안심하고 할 수 있습니다.',
          '信号非常准时，操作也非常简单。即使我身在非洲，也能享受到来自伦敦的最顶级的投资机会。':
            '시그널은 매우 정시이고 실행도 간단합니다. 아프리카에 있어도 런던에서 오는 최고 수준의 투자 기회를 누릴 수 있습니다.',
          '启诚投资的提款流程是我体验过最顺畅的。资金的流动性得到了极大的保障，这在目前的市场环境下非常难得。':
            '출금 프로세스는 제가 경험한 것 중 가장 매끄러웠습니다. 유동성이 크게 보장되어 현재 시장에서는 매우 드문 장점입니다.',
          '这就是我一直在寻找的‘另一种工作选择’。它赋予了我财务自由的同时，也给了我更多陪伴家人的时间。':
            '이것이 제가 찾던 “또 다른 일의 선택지”였습니다. 경제적 자유를 주는 동시에 가족과 함께할 시간도 늘었습니다.',
          'TXO 交易所的高性能和启诚的精准信号简直是绝配。这是目前数字资产交易领域最顶尖的体验。':
            'TXO의 고성능과 Qicheng의 정교한 시그널은 환상적인 조합입니다. 디지털 자산 거래 분야에서 최상급 경험이라고 생각합니다.',
          '信号的准确率高得惊人。跟随启诚的节奏，我几乎不需要自己去研究复杂的 K 线，系统已经帮我做好了决策。':
            '시그널 정확도가 놀라울 정도입니다. Qicheng 흐름을 따르면 복잡한 차트를 따로 연구할 필요가 거의 없고, 시스템이 의사결정을 도와줍니다.',
          '在这个波动剧烈的时代，启诚投资为我提供了一个避风港。稳定的收益和专业的团队让我对未来充满信心。':
            '변동성이 큰 시대에 Qicheng은 제게 피난처가 되어주었습니다. 안정적인 수익과 전문 팀 덕분에 미래에 대한 확신이 생깁니다.',
          '从最初的尝试到现在的信任，启诚投资用结果证明了一切。收益曲线非常漂亮，且一直处于受控状态。':
            '처음의 시도에서 지금의 신뢰까지, Qicheng은 결과로 모든 것을 증명했습니다. 수익 곡선이 아름답고 항상 통제된 상태입니다.',
          '这里的信号系统是我用过最专业的。它不仅准时，而且背后有着深厚的市场逻辑支撑，让人信服。':
            '여기의 시그널 시스템은 제가 사용해본 것 중 가장 전문적입니다. 정시일 뿐 아니라 깊은 시장 논리에 기반해 매우 설득력 있습니다.',
          '即使身在亚洲不同的时区，启诚的全球化网络也确保了我能第一时间接收到信号。这确实是真正的全球化协作。':
            '아시아의 다른 시간대에 있어도 Qicheng의 글로벌 네트워크는 시그널을 즉시 받을 수 있게 해줍니다. 진정한 글로벌 협업입니다.',
          '每天只需要在手机上点几下，收益就自动进账。这种极简的投资方式非常适合我这种工作忙碌的人。':
            '매일 휴대폰에서 몇 번만 누르면 수익이 자동으로 들어옵니다. 이런 미니멀한 투자 방식은 바쁜 사람에게 딱입니다.',
          '提款速度快得离谱，客服也非常专业。启诚投资让我感受到了什么是真正的‘客户至上’。':
            '출금 속도가 믿기지 않을 정도로 빠르고 고객지원도 매우 전문적입니다. Qicheng을 통해 “고객 최우선”이 무엇인지 체감했습니다.',
          '启诚投资的复利增长模式让我看到了财富自由的曙光。只要跟随信号，稳定就是最大的保障。':
            '복리 성장 모델 덕분에 재정적 자유의 가능성을 보았습니다. 시그널만 따르면 안정성이 가장 큰 보장입니다.',
          '作为一个技术开发者，我非常佩服启诚底层的架构。它在保证高性能交易的同时，还能把风控做得如此极致。':
            '기술 개발자로서 Qicheng의 기반 아키텍처는 정말 인상적입니다. 고성능 거래를 보장하면서도 리스크 관리가 극도로 정교합니다.',
          '这是我遇到过最透明、最靠谱的投资机构。每一笔收益都清清楚楚，每一个信号都经得起推敲。':
            '제가 만난 가장 투명하고 신뢰할 수 있는 투자 조직입니다. 모든 수익이 명확하고 모든 시그널이 검증 가능합니다.',
          '启诚投资让我在繁忙的工作之余，多了一份极其可观的被动收入。这真的是一种生活方式的改变。':
            '바쁜 업무 중에도 상당히 큰 패시브 인컴이 생겼습니다. 정말 라이프스타일의 변화입니다.',
          '加入启诚后，我再也不用为明天的股市波动发愁了。稳定的收益和精准的预测让我感到非常踏实。':
            'Qicheng에 합류한 이후로 내일의 변동을 걱정하지 않게 되었습니다. 안정적인 수익과 정확한 예측이 큰 안심을 줍니다.',
          '信号的准确性配合 TXO 的极速执行，这种组合在市场上几乎无敌。启诚投资确实走在了时代的前沿。':
            '정확한 시그널과 TXO의 초고속 실행이 결합된 이 조합은 거의 무적입니다. Qicheng은 확실히 시대의 선두에 있습니다.',
          '如果你想要一种既省心又能赚钱的投资方式，启诚投资是唯一不二的选择。我已经向所有的朋友推荐了它。':
            '수고는 덜고 돈은 벌 수 있는 투자 방법을 원한다면 Qicheng이 최고의 선택입니다. 저는 이미 모든 친구에게 추천했습니다.',
          '每天只需关注群里的信号，跟着操作就行。这种傻瓜式的投资体验，收益却非常惊人。':
            '그룹의 시그널만 보고 그대로 따라 하면 됩니다. 매우 단순한데도 수익은 놀랍습니다.',
          '在众多的投资平台中，启诚投资的合规性和透明度是最高的。这是我们长期合作的基石。':
            '수많은 플랫폼 중에서도 Qicheng의 컴플라이언스와 투명성은 최고 수준입니다. 장기 협력의 기반입니다.',
          '精准的信号系统让我彻底告别了投资的盲目性。每一次决策背后都有强大的数据支持，这让我感到非常安心。':
            '정교한 시그널 시스템 덕분에 맹목적 투자를 완전히 끝낼 수 있었습니다. 모든 결정이 강력한 데이터로 뒷받침되어 매우 안심됩니다.',
          '启诚投资的信号不仅仅是数字，更是财富增长的信号灯。感谢团队的辛勤付出，让普通人也能分享到数字经济的红利。':
            'Qicheng의 시그널은 단순한 숫자가 아니라 자산 성장을 비추는 등대입니다. 팀의 노력에 감사하며, 평범한 사람도 디지털 경제의 혜택을 누릴 수 있습니다.',
          '这种投资模式非常高效。我不再需要时刻盯着屏幕，信号一到，操作一分钟，剩下的就是等待收益。':
            '이 투자 모델은 매우 효율적입니다. 화면을 계속 볼 필요 없이 시그널이 오면 1분만 실행하고 나머지는 수익을 기다리면 됩니다.',
          '启诚投资改变了我对传统投资的认知。稳定的收益曲线和及时的服务响应，是所有投资者的梦想。':
            'Qicheng은 전통 투자에 대한 제 인식을 바꿨습니다. 안정적인 수익 곡선과 빠른 서비스 응답은 모든 투자자의 꿈입니다.',
          '这就是数字经济时代的最优选。启诚投资把复杂的技术转化成了简单的收益，这太棒了。':
            '디지털 경제 시대의 최적 선택입니다. 복잡한 기술을 단순한 수익으로 바꿔주는 Qicheng은 정말 훌륭합니다.',
          '我对启诚投资的安全性印象深刻。在这个领域，安全高于一切，而启诚做到了极致。':
            '보안성에 깊은 인상을 받았습니다. 이 분야에서는 보안이 최우선이며, Qicheng은 그것을 극한까지 구현했습니다.',
          '这种高频、稳定的投资方式非常适合我的财务规划。启诚投资已成为我资产配置中的核心部分。':
            '고빈도·안정적인 이 방식은 제 재무 계획에 매우 잘 맞습니다. Qicheng은 자산 배분의 핵심이 되었습니다.',
          '感谢启诚投资让我学会了如何聪明地赚钱。这不仅是投资技巧的提升，更是思维方式的升级。':
            'Qicheng 덕분에 더 똑똑하게 돈을 버는 법을 배웠습니다. 투자 기술의 향상뿐 아니라 사고방식의 업그레이드이기도 합니다.',
          '启诚投资的多元化策略让我在不同的市场环境下都能找到盈利点。专业的团队和精准的信号是我成功的基石。':
            '다양화 전략 덕분에 다양한 시장 환경에서도 수익 기회를 찾을 수 있습니다. 전문 팀과 정교한 시그널이 제 성공의 기반입니다.',
          '在这里，我体验到了前所未有的投资自由。启诚的全球化视野和本地化服务完美结合，让投资变得轻松有趣。':
            '여기서 전례 없는 투자 자유를 경험했습니다. 글로벌 비전과 로컬 서비스의 결합이 투자를 쉽고 재미있게 만들어 줍니다.',
          '启诚投资不仅仅是一个理财工具，它更像是一个智慧的投资伙伴。每一步操作都清晰透明，让人倍感安心。':
            'Qicheng은 단순한 도구가 아니라 지능형 투자 파트너 같습니다. 모든 단계가 명확하고 투명해 큰 안심이 됩니다.',
          '我非常欣赏启诚对创新的执着。在这个快速变化的时代，只有不断进取的团队才能为投资者创造持续的价值。':
            '저는 Qicheng의 혁신에 대한 집념을 높이 평가합니다. 빠르게 변하는 시대에는 끊임없이 발전하는 팀만이 지속적인 가치를 만들 수 있습니다.'
        }
      };

      document.querySelectorAll('.qc-testimonial-content p').forEach((p) => {
        if (!p.dataset.i18nOrig) {
          p.dataset.i18nOrig = String(p.textContent || '');
        }

        if (isZh) {
          p.textContent = p.dataset.i18nOrig;
          return;
        }

        const raw = p.dataset.i18nOrig;
        const key = normalize(raw);

        if (isEn) {
          if (mapEn[key]) p.textContent = mapEn[key];
          else p.textContent = raw;
          return;
        }

        const map = maps[lang];
        if (map && map[key]) {
          p.textContent = map[key];
        } else {
          p.textContent = raw;
        }
      });
    };

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const attrName = el.getAttribute('data-i18n-attr');
      const pRaw = el.getAttribute('data-i18n-params');
      let params = null;
      if (pRaw) {
        try { params = JSON.parse(pRaw); } catch (_) { params = null; }
      }
      const value = t(key, params || undefined);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.hasAttribute('placeholder')) el.setAttribute('placeholder', value);
      } else if (attrName) {
        attrName
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((a) => el.setAttribute(a, value));
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (!key) return;
      const pRaw = el.getAttribute('data-i18n-params');
      let params = null;
      if (pRaw) {
        try { params = JSON.parse(pRaw); } catch (_) { params = null; }
      }
      el.innerHTML = t(key, params || undefined);
    });

    applyNavI18n();
    applyFooterI18n();
    applyTestimonialsRoleI18n();
    applyTestimonialsContentI18n();
  };

  window.QC_I18N = {
    t,
    setLang,
    applyI18n,
    getLang
  };

  const headerInner = document.querySelector('.qc-header-inner');
  const navRoot = null;
  let langSwitcherLabelEl = null;
  const updateLangSwitcherLabel = () => {
    if (!langSwitcherLabelEl) return;
    const cur = window.QC_I18N.getLang();
    const item = LANGS.find((x) => x.code === cur) || LANGS.find((x) => x.code === normalizeLang(cur));
    const code = item ? item.code : cur;
    const flag = LANG_FLAG[code];
    if (flag) {
      langSwitcherLabelEl.innerHTML = '';
      const img = document.createElement('img');
      img.className = 'qc-lang-flag';
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.loading = 'lazy';
      img.src = `https://flagcdn.com/w40/${flag}.png`;
      img.srcset = `https://flagcdn.com/w80/${flag}.png 2x`;
      langSwitcherLabelEl.appendChild(img);
    } else {
      langSwitcherLabelEl.textContent = code;
    }
  };

  const buildLangSwitcher = () => {
    const mount = headerInner;
    if (!mount) return;
    if (mount.querySelector('.qc-lang')) return;

    const wrap = document.createElement('div');
    wrap.className = 'qc-lang';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'qc-lang-btn';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');

    const label = document.createElement('span');
    label.className = 'qc-lang-btn-label';
    langSwitcherLabelEl = label;

    const caret = document.createElement('span');
    caret.className = 'qc-lang-btn-caret';
    caret.textContent = '▾';

    btn.appendChild(label);
    btn.appendChild(caret);

    const panel = document.createElement('div');
    panel.className = 'qc-lang-panel';
    panel.setAttribute('role', 'listbox');

    LANGS.forEach((l) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'qc-lang-item';
      const flag = LANG_FLAG[l.code];
      if (flag) {
        const img = document.createElement('img');
        img.className = 'qc-lang-flag';
        img.alt = '';
        img.setAttribute('aria-hidden', 'true');
        img.loading = 'lazy';
        img.src = `https://flagcdn.com/w40/${flag}.png`;
        img.srcset = `https://flagcdn.com/w80/${flag}.png 2x`;
        item.appendChild(img);
      }
      const text = document.createElement('span');
      text.className = 'qc-lang-label';
      text.textContent = l.label;
      item.appendChild(text);
      item.setAttribute('data-lang', l.code);
      item.addEventListener('click', () => {
        setLang(l.code);
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
      panel.appendChild(item);
    });

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const next = !wrap.classList.contains('open');
      wrap.classList.toggle('open', next);
      btn.setAttribute('aria-expanded', next ? 'true' : 'false');
    });

    document.addEventListener('click', () => {
      if (!wrap.classList.contains('open')) return;
      wrap.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });

    wrap.appendChild(btn);
    wrap.appendChild(panel);

    headerInner.appendChild(wrap);
    updateLangSwitcherLabel();
  };

  // Toggle Mobile Menu
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const isActive = navList.classList.toggle('active');
      toggle.classList.toggle('active');
      document.body.style.overflow = isActive ? 'hidden' : '';
      document.body.classList.toggle('qc-menu-open', isActive);
    });
  }

  // Mobile Submenu Toggles
  // We attach listeners regardless of initial screen size, 
  // but only prevent default behavior if we are actually in mobile mode.
  submenus.forEach(item => {
    const link = item.querySelector('.qc-nav-link');
    if (link) {
      link.addEventListener('click', (e) => {
        // Check if we are in mobile view (matches CSS media query)
        if (window.matchMedia('(max-width: 900px)').matches) {
          // If it has a submenu, toggle it and prevent navigation
          e.preventDefault();
          
          // Close other open submenus for accordion effect (optional, but nice)
          submenus.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('open')) {
              otherItem.classList.remove('open');
            }
          });

          item.classList.toggle('open');
        }
      });
    }
  });

  // Close menu when clicking a link (that isn't a submenu toggle)
  const links = document.querySelectorAll('.qc-nav-list a:not(.qc-nav-link)');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 900px)').matches) {
        navList.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('qc-menu-open');
      }
    });
  });

  buildLangSwitcher();
  const initialLang = localStorage.getItem(LANG_STORAGE_KEY) || document.documentElement.getAttribute('lang') || 'en';
  if (normalizeLang(initialLang) === 'zh-CN') {
    loadLang('zh-CN').finally(() => setLang(initialLang));
  } else {
    setLang(initialLang);
  }
});
