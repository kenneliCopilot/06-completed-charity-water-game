// ========= autoEvent.js =========
let nextRainTime = 0;
let autoRainActive = false;


const AUTO_EVENT_DATA = [
  { name: "毛毛雨", duration: 5, perSecond: 20, total: 100, cost: 10 },
  { name: "小雨", duration: 5, perSecond: 1_000, total: 1_000, cost: 100_000 },
  { name: "中雨", duration: 5, perSecond: 10_000, total: 50_000, cost: 1_000_000 },
  { name: "大雨", duration: 5, perSecond: 100_000, total: 500_000, cost: 10_000_000 },
  { name: "雷阵雨", duration: 3, perSecond: 500_000, total: 1_500_000, cost: 30_000_000 },
  { name: "暴雨", duration: 5, perSecond: 2_000_000, total: 10_000_000, cost: 120_000_000 },
  { name: "持续降雨", duration: 10, perSecond: 3_000_000, total: 30_000_000, cost: 360_000_000 },
  { name: "季风", duration: 50, perSecond: 5_000_000, total: 300_000_000, cost: 3_000_000_000 },
];


if (!gameSave.ae || typeof gameSave.ae !== "number") {
  gameSave.ae = 1; // ✅ 正确：使用数字记录等级
}



function renderAutoEventPanel() {
  const info = document.getElementById("aeve-info");
  const btn = document.getElementById("aeve-upgrade-btn");
  const list = document.getElementById("aeve-list");

  const level = gameSave.ae || 1;
  const data = AUTO_EVENT_DATA[level - 1];
  const next = AUTO_EVENT_DATA[level];

  // ✅ 渲染说明文字
  if (info) {
    info.innerHTML = `
      <strong>当前等级：</strong>${data.name}<br/>
      <strong>持续时间：</strong>${data.duration}s<br/>
      <strong>每秒产量：</strong>${formatUnit(data.perSecond)}<br/>
      <strong>总产量：</strong>${formatUnit(data.total)}
    `;
  }

  // ✅ 升级按钮
  if (btn) {
    if (!next) {
      btn.disabled = true;
      btn.textContent = "已达上限";
    } else {
      btn.disabled = gameSave.w < next.cost;
      btn.textContent = `升级到【${next.name}】（消耗 ${formatUnit(next.cost)}）`;
    }
  }

  // ✅ 渲染所有等级信息
  if (list) {
    list.innerHTML = "";
    AUTO_EVENT_DATA.forEach((item, idx) => {
      const isActive = idx === level - 1;
      const card = document.createElement("div");
      card.className = "aeve-card" + (isActive ? " active" : "");
      card.innerHTML = `
      <div class="aeve-title">${idx + 1} 级 ｜ ${item.name}</div>
      <div class="aeve-desc">持续 ${item.duration}s，每秒 ${formatUnit(item.perSecond)}，总计 ${formatUnit(item.total)}</div>
      <div class="aeve-cost">解锁（${formatUnit(item.cost)}）</div>
    `;
      list.appendChild(card);
    });
  }

}



function startAutoEvent(level) {
  const data = AUTO_EVENT_DATA[level - 1];
  if (!data) return;

  const rainInterval = 60 * 1000;         // 每 60 秒循环
  const duration     = data.duration * 1000;

  function triggerRain() {
    autoRainActive = true;

    /* ① 开始雨滴与水波特效 */
    triggerWaterWaveEffect();
    createRain();
    setTimeout(stopRain, duration);       // 持续时间后停止降雨

    /* ② 每秒发放产水 */
    let ticks = 0;
    const rainTimer = setInterval(() => {
      if (ticks >= data.duration) {
        clearInterval(rainTimer);
        autoRainActive = false;
        return;
      }
      gameSave.w += data.perSecond;
      spawnFloating("+" + formatUnit(data.perSecond), "event");
      updateUI();
      ticks++;
    }, 1000);

    /* ③ 预定下一次降雨 */
    nextRainTime = Date.now() + rainInterval;
  }

  /* 初始化下一场降雨时间并启动周期定时器 */
  nextRainTime = Date.now() + rainInterval;
  setInterval(triggerRain, rainInterval);
}

setInterval(() => {
  const el = document.getElementById("auto-event-info");
  if (!el) return;

  const remain = Math.max(0, Math.ceil((nextRainTime - Date.now()) / 1000));

  el.textContent = currentLang === "zh"
    ? (autoRainActive ? `降雨中…` : `下次降雨：${remain} 秒`)
    : (autoRainActive ? `Raining...` : `Next rain: ${remain}s`);
}, 1000);






if (!window.customTabs) window.customTabs = {};

window.customTabs.autoEvent = () => {
  const tpl = document.getElementById("tpl-autoEvent");
  modalBody.innerHTML = tpl.innerHTML;
  modal.classList.remove("hidden");

  renderAutoEventPanel();
  setupAutoEventLogic();
};

function setupAutoEventLogic() {
  const btn = document.getElementById("aeve-upgrade-btn");
  if (!btn) return;

  btn.onclick = () => {
    const level = gameSave.ae || 1;
    const next = AUTO_EVENT_DATA[level];

    if (!next) return;
    if (gameSave.w < next.cost) return;

    gameSave.w -= next.cost;
    gameSave.ae = level + 1;

    updateUI();
    renderAutoEventPanel();
    saveGame();

    startAutoEvent(level + 1); // 👈 关键：升级后立即启动新的事件
  };

}

document.addEventListener("DOMContentLoaded", () => {
  const lvl = gameSave.ae || 1;
  startAutoEvent(lvl);
});




// 创建雨滴
function createRain() {
  const box = document.querySelector(".rain");
  if (!box) return;

  box.innerHTML = "";
  const nbDrop = 300;

  for (let i = 0; i < nbDrop; i++) {
    const d = document.createElement("div");
    d.className = "raindrop"; // ✅ 修改这里
    d.style.left = Math.random() * window.innerWidth + "px";
    d.style.top  = Math.random() * -1000 + "px";
    box.appendChild(d);
  }
}


// 停止下雨
function stopRain() {
  const rainContainer = document.querySelector('.rain');
  if (rainContainer) {
    rainContainer.innerHTML = '';
  }
}
