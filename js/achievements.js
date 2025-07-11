/* ========= achievements.js ========= */

/** ① 漂流瓶数据 */
const ACHIEVEMENTS = [
  { icon: "💨", name: "水蒸气",  rarity: "普通",  desc: "曾是水，如今是云。蒸发掉的回忆，或许也能聚成雨。" },
  { icon: "🧊", name: "冰",      rarity: "普通",  desc: "冻结的水，冷静但不冷淡。也许能用来冷却系统或存储。" },
  { icon: "💧", name: "蒸馏水",  rarity: "普通",  desc: "超纯净水，没有任何味道。科学家的最爱。" },
  { icon: "🥛", name: "牛奶",    rarity: "普通",  desc: "……这不是水。谁把厨房连过来了？" },
  { icon: "🪨", name: "泥水",    rarity: "普通",  desc: "看上去像水，但你不想靠近。可能有用，也可能有虫子。" },
  { icon: "🧴", name: "酒精",    rarity: "普通",  desc: "不是水，但能消毒。要小心火源。" },
  { icon: "🫧", name: "“干”的水", rarity: "稀有",  desc: "传说中不弄湿东西的水。真有这种东西？" },
  { icon: "🫗", name: "稀释的水", rarity: "稀有",  desc: "加了一点什么？好像什么都没变，又好像什么都变了。" },
  { icon: "🧪", name: "浓缩水",  rarity: "稀有",  desc: "浓得发苦的水。危险：请勿饮用。" },
  { icon: "⚛️", name: "重水",    rarity: "稀有",  desc: "用于核反应的特种水。也许未来能制造水能反应堆。" },
  { icon: "✝️", name: "圣水",    rarity: "传奇",  desc: "拥有净化一切的力量，或许能触发奇迹事件。" },
  { icon: "♾️", name: "无限之水", rarity: "传奇",  desc: "永久缓慢产水的神话资源。" },
];

/** ② 存档初始化：aw = 每种瓶子的收集次数 */
if (!Array.isArray(gameSave.aw) || gameSave.aw.length !== ACHIEVEMENTS.length) {
  // 兼容旧布尔数组 → 数字
  gameSave.aw = (gameSave.aw || []).map(v => v ? 1 : 0);
  while (gameSave.aw.length < ACHIEVEMENTS.length) gameSave.aw.push(0);
}

/** ③ 渲染面板 */
function renderAchPanel() {
  const list = document.getElementById("ach-list");
  const summary = document.getElementById("ach-summary");
  list.innerHTML = "";

  let ownedKinds = 0;
  ACHIEVEMENTS.forEach((a, idx) => {
    const count = gameSave.aw[idx];
    if (count > 0) ownedKinds++;

    const card = document.createElement("div");
    card.className = "ach-card" + (count > 0 ? " owned" : " locked");
    card.innerHTML = `
      <div class="ach-header">
        <span class="ach-icon">${a.icon}</span>
        <span>${a.name}</span>
        <span class="ach-rarity">${a.rarity}</span>
      </div>
      <div class="ach-desc">${a.desc}</div>
      ${count > 0 ? `<div class="ach-count">已收集：${count} 次</div>` : ""}
    `;
    list.appendChild(card);
  });

  summary.textContent = `已收集种类：${ownedKinds}/${ACHIEVEMENTS.length}`;
}

/** ④ 抽瓶逻辑 */
function setupAchLogic() {
  const btn = document.getElementById("ach-open-btn");
  btn.onclick = () => {
    if (gameSave.w < 1_000) {
      showToast("最低需要 1 吨水！");
      return;
    }
    const cost = Math.max(gameSave.w * 0.10, 1_000); // 10 %
    gameSave.w -= cost;

    // 抽奖：普通70 / 稀有25 / 传奇5
    const r = Math.random();
    let pool;
    if (r < 0.05)      pool = ACHIEVEMENTS.filter(a => a.rarity === "传奇");
    else if (r < 0.30) pool = ACHIEVEMENTS.filter(a => a.rarity === "稀有");
    else               pool = ACHIEVEMENTS.filter(a => a.rarity === "普通");

    const prize = pool[Math.floor(Math.random() * pool.length)];
    const idx = ACHIEVEMENTS.indexOf(prize);
    gameSave.aw[idx] += 1;

    showToast(`你获得了一瓶「${prize.name}」！`);
    renderAchPanel();
    updateUI();
    saveGame();
  };
}

/** ⑤ 注册标签页 */
window.customTabs = window.customTabs || {};
window.customTabs.achievements = () => {
  const tpl = document.getElementById("tpl-achievements");
  modalBody.innerHTML = tpl.innerHTML;
  modal.classList.remove("hidden");
  renderAchPanel();
  setupAchLogic();
};
