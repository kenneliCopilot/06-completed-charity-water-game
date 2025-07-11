// ========= activeEvent.js =========
const activeEventData = [
  { name: "一滴", gain: 1, cost: 1, unlock: 0 },
  { name: "一杯", gain: 500, cost: 500, unlock: 400 },
  { name: "一瓶", gain: 2_000, cost: 2_000, unlock: 800 },
  { name: "一桶", gain: 20_000, cost: 20_000, unlock: 1_200 },
  { name: "一油桶", gain: 200_000, cost: 200_000, unlock: 1_600 },
  { name: "水箱", gain: 1e6, cost: 1e6, unlock: 2_000 },
  { name: "水塔", gain: 50e6, cost: 50e6, unlock: 2_400 },
  { name: "水库", gain: 1e9, cost: 1e9, unlock: 2_800 },
  { name: "湖泊", gain: 50e9, cost: 50e9, unlock: 3_200 },
  { name: "海", gain: 1e12, cost: 1e12, unlock: 3_600 },
  { name: "洋", gain: 1e15, cost: 1e15, unlock: 4_000 },
];
if (!gameSave.pe) gameSave.pe = 1;

let lastTriggeredClick = gameSave.lc || 0;

setInterval(() => {
  // 只在点击数是 100 的倍数，而且这次数字比上次触发的要大时，才触发
  if (gameSave.lc > lastTriggeredClick && gameSave.lc % 100 === 0) {
    const times = (gameSave.lc - lastTriggeredClick) / 100; // 理论上 =1
    lastTriggeredClick = gameSave.lc;

    const lvl = gameSave.pe - 1;
    const gain = activeEventData[lvl].gain * times;

    gameSave.w += gain;

    spawnFloating("+" + formatUnit(gain), "event");  // ✅ 改这里，加上 "event"
    triggerWaterWaveEffect();                        // ✅ 波纹动画
    updateUI();
    saveGame();
  }
}, 500);





function renderActiveEventPanel() {
  const stats = document.getElementById("ae-stats");
  const lvl = gameSave.pe - 1;
  const cur = activeEventData[lvl];
  const next = activeEventData[lvl + 1];

  stats.innerHTML = `
    <strong>当前等级：</strong>${cur.name}<br/>
    <strong>单次获得：</strong>${formatUnit(cur.gain)}<br/>
    <strong>已点击：</strong>${gameSave.lc} 次
  `;

  // 渲染表格数据
  // 渲染表格数据
  const rows = document.getElementById("ae-rows");
  rows.innerHTML = "";
  activeEventData.forEach((item, i) => {
    const isActive = i === lvl;
    const row = document.createElement("div");
    row.className = "ae-row" + (isActive ? " active" : "");
    row.innerHTML = `
  <span>${i + 1}</span>
  <span>${item.name}</span>
  <span>${formatUnit(item.gain)}</span>
  <span>${item.unlock} 次</span>
`;

    rows.appendChild(row);
  });


  const btn = document.getElementById("ae-upgrade-btn");
  if (!next) {
    btn.disabled = true;
    btn.textContent = "已达上限";
  } else if (gameSave.lc < next.unlock) {
    btn.disabled = true;
    btn.textContent = `需点击 ${next.unlock}`;
  } else {
    btn.disabled = gameSave.w < next.cost;
    btn.textContent = `升级到【${next.name}】 (消耗 ${formatUnit(next.cost)})`;
  }

  // 设置升级消耗用于 <span id="ae-cost"> 更新（如你保留）
  const costSpan = document.getElementById("ae-cost");
  if (costSpan) {
    costSpan.textContent = formatUnit(next?.cost || 0);
  }
}


function setupActiveEventLogic() {
  const btn = document.getElementById("ae-upgrade-btn");
  if (!btn) return;
  btn.onclick = () => {
    const next = activeEventData[gameSave.pe];
    if (!next || gameSave.lc < next.unlock || gameSave.w < next.cost) return;
    gameSave.w -= next.cost;
    gameSave.pe += 1;
    updateUI();
    renderActiveEventPanel();
    saveGame();
  };
}

if (!window.customTabs) window.customTabs = {};

window.customTabs.activeEvent = () => {
  const tpl = document.getElementById("tpl-activeEvent");
  modalBody.innerHTML = tpl.innerHTML;
  modal.classList.remove("hidden");
  renderActiveEventPanel();
  setupActiveEventLogic();
};


function triggerWaterWaveEffect() {
  const wave = document.getElementById("background-wave");
  if (!wave) return;

  wave.style.opacity = "1";

  setTimeout(() => {
    wave.style.opacity = "0";
  }, 3000); // 显示3秒，期间水波在内部循环播放
}

