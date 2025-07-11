
// ========= autoClick.js =========
const autoClickData = [
  { name: "水龙头", gain: 150, cost: 4_500 },
  { name: "浴缸", gain: 400, cost: 12_000 },
  { name: "消防栓", gain: 2_000, cost: 60_000 },
  { name: "小溪", gain: 25_000, cost: 3e6 },
  { name: "瀑布", gain: 100_000, cost: 12e6 },
  { name: "河流", gain: 2e6, cost: 480e6 },
  { name: "运河", gain: 20e6, cost: 6e9 },
];
/* 存档初始化 —— 放在 autoClick.js 顶部 */
if (!Array.isArray(gameSave.ai)) gameSave.ai = [];

while (gameSave.ai.length < autoClickData.length) {
  gameSave.ai.push(0);          // 不足长度补 0
}


function updateAutoClickRate() {
  let total = 0;
  autoClickData.forEach((d, i) => (total += d.gain * (gameSave.ai[i] || 0)));
  const el = document.getElementById("auto-click-rate");
  if (el) el.textContent = `${currentLang === "zh" ? "每秒产水量：" : "Per Second: "}${formatUnit(total)}`;
}

function renderAutoClickPanel() {
  const list = document.getElementById("auto-click-list");
  list.innerHTML = "";
  autoClickData.forEach((d, i) => {
    const count = gameSave.ai[i] || 0;
    const canBuy = gameSave.w >= d.cost;
    const card = document.createElement("div");
    card.className = "card auto-click-item";
    card.style.opacity = canBuy ? 1 : 0.6;
    card.innerHTML = `
      <div class="item-header"><strong>💧 ${d.name}</strong><span>产量：${formatUnit(d.gain)}/秒</span></div>
      <div class="item-footer"><span>拥有数量：${count}</span>
      <button class="buy-btn" data-idx="${i}" ${canBuy ? "" : "disabled"}>购买（消耗 ${formatUnit(d.cost)}）</button></div>`;
    list.appendChild(card);
  });
  list.querySelectorAll(".buy-btn").forEach(btn => {
    btn.onclick = () => {
      const idx = +btn.dataset.idx;
      const d = autoClickData[idx];
      if (gameSave.w < d.cost) return;
      gameSave.w -= d.cost;
      gameSave.ai[idx] = (gameSave.ai[idx] || 0) + 1;   // ✅ 关键
      updateUI();
      renderAutoClickPanel();
      saveGame();
    };
  });
  updateAutoClickRate();
}

setInterval(() => {
  let totalGain = 0;
  for (let i = 0; i < autoClickData.length; i++) {
    totalGain += (gameSave.ai[i] || 0) * autoClickData[i].gain;
  }

  gameSave.w += totalGain;
  updateUI();

  if (totalGain > 0) {
    spawnFloating("+" + formatUnit(totalGain), "auto");  // ✅ 新增这行
  }
}, 1000);


if (!window.customTabs) window.customTabs = {};

window.customTabs.autoClick = () => {
  const tpl = document.getElementById("tpl-autoClick");
  modalBody.innerHTML = tpl.innerHTML;
  modal.classList.remove("hidden");
  renderAutoClickPanel();
};
