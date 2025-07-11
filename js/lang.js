/* 语言包示例（可扩展） */
const LANG_DATA = {
  zh: {

    // Tab 标签
    label_water: "水资源：",
    tab_active_click: "主动点击",
    tab_auto_click: "自动点击",
    tab_active_event: "主动事件",
    tab_auto_event: "自动事件",
    tab_achievements: "成就收集",
    click_gain_preview_prefix: "每次点击获得：",
    auto_click_rate_prefix: "每秒产水量：",
    active_event_trigger_prefix: "还差",
    active_event_trigger_suffix: "次点击触发",
    auto_event_info: "每分钟触发降雨",
    achievements_info: "点击抽取漂流瓶",

    // tpl-click
    click_title: "👆 主动点击",
    click_desc: "在这个世界里，点一下，就能带来一滴希望的水。<br>● 每次点击产出水资源<br>● 可消耗水升级，提升每次点击的产量",
    click_level: "当前等级：",
    click_gain: "（产量：",
    click_cost_btn: "升级（花费：",

    // tpl-autoClick
    auto_click_title: "🖱️ 自动点击",
    auto_click_desc: "你不再需要亲自点击。建造各种取水系统，让水源自动流淌！<br>● 每秒自动产水，完全离线收益<br>● 可批量购买、原价回收",

    // tpl-activeEvent
    active_event_title: "💯 主动事件",
    active_event_desc: "当点击次数达到一定门槛，就能引发“水储爆发”，一次性释放巨量水资源！<br>● 每点击 100 次自动触发一次储水爆发<br>● 解锁更高级储水等级，提升爆发产量",
    active_event_level: "当前等级：",
    active_event_gain: "单次爆发获得：",
    active_event_triggered: "已触发：",
    active_event_clicked: "已点击：",
    active_event_table_header: ["等级", "名称", "产量/消耗", "解锁条件"],
    active_event_btn_prefix: "升级（消耗：",

    // tpl-autoEvent
    auto_event_title: "🌧️ 自动事件",
    auto_event_desc: "天空的馈赠，不容忽视。解锁降雨系统后，每过一分钟，天空将随机落下甘霖！<br>● 每分钟自动触发一场降雨<br>● 每场雨流量不同，随机选中已解锁类型",

    // tpl-achievements
    ach_title: "💎 成就系统：漂流瓶",
    ach_desc: "每次打开漂流瓶会消耗当前水量的 <strong>10 %</strong>（最低 1 吨）。<br>● 此系统将在首次重生后解锁<br>● 你获得了一瓶……",
    ach_open_btn: "🍾 打开漂流瓶",

    // tpl-settings
    settings_title: "⚙️ 设置",
    settings_desc: "你可以切换语言、导出/导入存档。",
    btn_toggle_lang: "🌐 切换语言",
    btn_export_save: "📋 复制存档",
    btn_import_save: "📥 导入存档",
  },

  en: {
    label_water: "Water: ",
    tab_active_click: "Active Click",
    tab_auto_click: "Auto Click",
    tab_active_event: "Active Event",
    tab_auto_event: "Auto Event",
    tab_achievements: "Achievements",
    click_gain_preview_prefix: "Gain per click:",
    auto_click_rate_prefix: "Water/sec:",
    active_event_trigger_prefix: "Need",
    active_event_trigger_suffix: "clicks to trigger",
    auto_event_info: "Rain every minute",
    achievements_info: "Open a drift bottle",

    click_title: "👆 Active Click",
    click_desc: "In this world, every tap brings a drop of hope.<br>● Earn water with every click<br>● Spend water to upgrade and boost your output",
    click_level: "Current Level: ",
    click_gain: "(Gain: ",
    click_cost_btn: "Upgrade (Cost: ",

    auto_click_title: "🖱️ Auto Click",
    auto_click_desc: "No more manual tapping. Build water systems and let water flow on its own!<br>● Auto water generation per second<br>● Bulk purchase, refund at original price",

    active_event_title: "💯 Active Event",
    active_event_desc: "Clicking enough times triggers a water burst that grants a large amount of water!<br>● Every 100 clicks triggers a burst<br>● Unlock higher tiers for greater gain",
    active_event_level: "Current Level: ",
    active_event_gain: "Burst Gain: ",
    active_event_triggered: "Triggered: ",
    active_event_clicked: "Total Clicks: ",
    active_event_table_header: ["Level", "Name", "Gain/Cost", "Unlock"],
    active_event_btn_prefix: "Upgrade (Cost: ",

    auto_event_title: "🌧️ Auto Event",
    auto_event_desc: "A gift from the sky. Once unlocked, it rains every minute to bring you water!<br>● One rain per minute<br>● Rain type randomly picked from unlocked ones",

    ach_title: "💎 Achievements: Drift Bottles",
    ach_desc: "Each bottle costs <strong>10%</strong> of your current water (min 1 ton).<br>● Unlocked after your first rebirth<br>● You got a bottle of...",
    ach_open_btn: "🍾 Open Bottle",

    settings_title: "⚙️ Settings",
    settings_desc: "Switch language or export/import save data.",
    btn_toggle_lang: "🌐 Toggle Language",
    btn_export_save: "📋 Copy Save",
    btn_import_save: "📥 Import Save",
  }
};


/* 默认语言（可改） */
let currentLang = "zh";

/* i18n 渲染 */
function renderI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = LANG_DATA[currentLang][key] || key;
  });
}

/* 切换语言 */
function toggleLang() {
  currentLang = currentLang === "zh" ? "en" : "zh";
  renderI18n();
  saveGame(); // 保证语言也写入存档
}

window.addEventListener("DOMContentLoaded", renderI18n);
