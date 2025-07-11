// ========= activeClick.js =========
// 主动点击系统
const ACTIVE_CLICK_TABLE = [
  { gain: 1, cost: 100 },
  { gain: 10, cost: 800 },
  { gain: 100, cost: 8e3 },
  { gain: 1_000, cost: 1.2e5 },
  { gain: 10_000, cost: 2e6 },
  { gain: 100_000, cost: 4e7 },
  { gain: 1e6, cost: 1e9 },
  { gain: 1e7, cost: 3e10 },
  { gain: 1e8, cost: 1e12 },
  { gain: 1e9, cost: null }, // 重生
];

function renderActiveClickPanel() {
  const lvl = gameSave.ac - 1;
  const cur = ACTIVE_CLICK_TABLE[lvl];
  const next = ACTIVE_CLICK_TABLE[lvl + 1];
  document.getElementById("ac-level").textContent = gameSave.ac;
  document.getElementById("ac-gain").textContent = formatUnit(cur.gain);
  document.getElementById("ac-cost").textContent = next ? formatUnit(next.cost) : "需重生";
  document.getElementById("ac-upgrade-btn").disabled = !next || gameSave.w < next.cost;
}

function setupActiveClickLogic() {
  const btn = document.getElementById("ac-upgrade-btn");
  if (!btn) return;
  btn.onclick = () => {
    const next = ACTIVE_CLICK_TABLE[gameSave.ac];
    if (!next || gameSave.w < next.cost) return;
    gameSave.w -= next.cost;
    gameSave.ac += 1;
    updateUI();
    renderActiveClickPanel();
    saveGame();
  };
}

if (!window.customTabs) window.customTabs = {};

window.customTabs.click = () => {
  const tpl = document.getElementById("tpl-click");
  modalBody.innerHTML = tpl.innerHTML;
  modal.classList.remove("hidden");
  renderActiveClickPanel();
  setupActiveClickLogic();
};