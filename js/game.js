// ✅ game.js（最终清洁版）

// -------- 全局元素 --------
const waterValueEl = document.getElementById("water-value");
const clickArea = document.getElementById("click-area");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");

// -------- 路由注册表 --------
window.customTabs = window.customTabs || {};

if (!gameSave) gameSave = {};
if (!("ac" in gameSave)) gameSave.ac = 1;
if (!("w" in gameSave)) gameSave.w = 0;
if (!("lc" in gameSave)) gameSave.lc = 0;



// -------- 模板加载 openTab 函数 --------
function openTab(tab) {
  const tpl = document.getElementById(`tpl-${tab}`);
  if (!tpl) {
    modalBody.innerHTML = `<h2>${tab}</h2><p>内容待添加。</p>`;
    modal.classList.remove("hidden");
    return;
  }

  modalBody.innerHTML = tpl.innerHTML;
  modal.classList.remove("hidden");

  // ✅ 关键：根据标签加载数据填充
  switch (tab) {
    case 'click':
      renderActiveClickPanel();
      setupActiveClickLogic();
      break;
    case 'autoClick':
      renderAutoClickPanel();
      break;
    case 'activeEvent':
      renderActiveEventPanel();
      setupActiveEventLogic();
      break;
    case 'autoEvent':
      renderAutoEventPanel();
      setupAutoEventLogic();
      break;
    case 'settings':
      // 渲染模板（不要再 fetch！）
      const settingsTpl = document.getElementById("tpl-settings");
      if (settingsTpl) {
        modalBody.innerHTML = settingsTpl.innerHTML;
        modal.classList.remove("hidden");

        // 重新绑定按钮事件
        document.getElementById("btn-toggle-lang").onclick = toggleLang;
        document.getElementById("btn-export-save").onclick = exportSave;
        document.getElementById("btn-import-save").onclick = importSave;
      }
      break;
    case 'achievements':
      if (typeof window.customTabs.achievements === 'function') {
        window.customTabs.achievements();
      }
      break;



  }
}

// -------- 点击水源逻辑 --------
document.body.addEventListener("click", (e) => {
  if (e.target.closest("button,input,textarea")) return;

  const level = gameSave.ac - 1;
  const gain = (ACTIVE_CLICK_TABLE[level]?.gain) || 0;
  gameSave.w += gain;
  gameSave.lc += 1;

  // ✅ 播放水滴音效
  const clickAudio = document.getElementById("click-sound");
  if (clickAudio) {
    clickAudio.currentTime = 0; // 重置到开头
    clickAudio.play().catch(() => {}); // 防止因用户未交互导致的错误
  }

  spawnFloating("+" + formatUnit(gain));
  spawnDroplet(e.clientX, e.clientY);

  updateUI();
  saveGame();
});




function spawnFloating(text, type = "manual") {
  const el = document.createElement("div");
  el.className = "floating";
  el.textContent = text;

  el.style.position = "absolute";

  // 默认位置和颜色
  let offsetX = (Math.random() - 0.5) * 60;
  let offsetY = Math.random() * 20 + 20;

  if (type === "manual") {
    el.style.left = "43%";
    el.style.top = "30%";
    el.style.color = "#00d5ff"; // 浅蓝
  } else if (type === "auto") {
    el.style.left = "43%";
    el.style.top = "25%";
    el.style.color = "#00ff7f"; // 亮绿
  } else if (type === "event") {
    el.style.left = "47%";
    el.style.top = "22%";
    el.style.color = "#ffd700"; // 金色
  }

  el.style.transform = `translate(-50%, -50%) translate(${offsetX}px, -${offsetY}px)`;
  el.style.opacity = "1";

  document.getElementById("water-counter").appendChild(el);

  const duration = type === "event" ? 3500 : 2000;  // ⏱️ 金色漂浮停留更久

  const start = performance.now();

  function animate(now) {
    const elapsed = now - start;
    const progress = elapsed / duration;
    if (progress >= 1) {
      el.remove();
      return;
    }
    const ease = 1 - Math.pow(1 - progress, 3);
    el.style.transform = `translate(-50%, -50%) translate(${offsetX}px, -${offsetY + ease * 60}px)`;
    el.style.opacity = `${1 - ease}`;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}




// -------- 单位格式化 --------
function formatUnit(num) {
  if (num < 1_000) return `${num}g`;
  if (num < 1_000_000) return `${(num / 1_000).toFixed(1)}kg`;
  if (num < 1_000_000_000) return `${(num / 1_000_000).toFixed(1)}t`;
  if (num < 1_000_000_000_000) return `${(num / 1e9).toFixed(1)}K-t`;
  if (num < 1_000_000_000_000_000) return `${(num / 1e12).toFixed(1)}M-t`;
  return `${(num / 1e12).toExponential(2)}t`; // 超过 M-t 使用科学计数法（以吨为基础）
}


// -------- UI 更新 --------
function updateUI() {
  waterValueEl.textContent = formatUnit(gameSave.w);

  const previewEl = document.getElementById("click-gain-preview");
  const level = gameSave.ac - 1;
  if (previewEl && ACTIVE_CLICK_TABLE[level]) {
    previewEl.textContent = formatUnit(ACTIVE_CLICK_TABLE[level].gain);
  }

  if (typeof updateAutoClickRate === "function") {
    updateAutoClickRate();

  }

  const aeInfo = document.getElementById("active-event-info");
  if (aeInfo) {
    const remaining = 100 - (gameSave.lc % 100);
    aeInfo.textContent =
      (currentLang === "zh"
        ? `还差 ${remaining} 次点击触发`
        : `${remaining} clicks to trigger`);
  }

}

// -------- 设置按钮 --------
document.getElementById("settings-btn").addEventListener("click", () => {
  openTab("settings");
});

document.getElementById("modal-close").addEventListener("click", () => {
  modal.classList.add("hidden");
});

// -------- 初始化 --------
window.addEventListener("DOMContentLoaded", () => {
  updateUI();
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => openTab(btn.dataset.tab));
  });

  showDifficultyPopup(); // ✅ 仅首次执行一次
  console.log("弹窗已触发！");

});


function showToast(msg) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-msg");
  toastMsg.textContent = msg;
  toast.classList.remove("hidden");

  const close = () => {
    toast.classList.add("hidden");
    toast.removeEventListener("click", close);
  };
  toast.addEventListener("click", close);
}


function spawnDroplet(clickX, clickY) {
  // ① 创建元素
  const drop = document.createElement("div");
  drop.className = "drop";
  const wave = document.createElement("div");
  wave.className = "wave";

  // ② 定位到点击点
  drop.style.left = `${clickX - 0}px`;
  wave.style.left = `${clickX + 10}px`;

  drop.style.top = `${clickY - 70}px`;  // 👈 上移 4px
  wave.style.top = `${clickY - 10}px`;  // 不变


  // ③ 插入到 click-area
  const container = document.getElementById("click-area");
  container.appendChild(drop);
  container.appendChild(wave);

  // ④ 1.2 秒后清理
  setTimeout(() => {
    drop.remove();
    wave.remove();
  }, 1200);
}


function showDifficultyPopup() {
  if (localStorage.getItem("hasSelectedDifficulty")) return;

  const difficultyHTML = `
<div class="modal-content" style="z-index:999; position:relative; width: 100%;">
  <h3 style="text-align:center; color: var(--light-yellow);">Select Your Difficulty</h3>
  <div style="display: flex; flex-direction: column; gap: 0.8rem; margin-top: 1rem;">
    <button class="upgrade-btn" data-diff="easy">🌱 Easy Mode (Start with a Bathtub)</button>
    <button class="upgrade-btn" data-diff="normal">💧 Normal Mode (Start with a Faucet)</button>
    <button class="upgrade-btn" data-diff="hard">🔥 Hard Mode (Start with Nothing)</button>
  </div>
</div>

  `;

  // 插入弹窗内容并显示
  modalBody.innerHTML = difficultyHTML;
  modal.classList.remove("hidden");

  // 绑定点击事件
  modalBody.querySelectorAll("button[data-diff]").forEach((btn) => {
    btn.onclick = () => {
      const choice = btn.dataset.diff;
      localStorage.setItem("hasSelectedDifficulty", "1");

      // 初始化 ai 数组（确保长度足够）
      if (!Array.isArray(gameSave.ai)) gameSave.ai = [];
      while (gameSave.ai.length < 7) gameSave.ai.push(0);

      // 发放奖励
      if (choice === "easy") gameSave.ai[1] += 1;       // 浴缸
      else if (choice === "normal") gameSave.ai[0] += 1; // 水龙头

      saveGame();
      updateUI();

      // ✅ 关闭弹窗
      modal.classList.add("hidden");

      // ✅ 提示语
      const nameMap = {
        easy: "简单模式 🌱",
        normal: "普通模式 💧",
        hard: "困难模式 🔥"
      };
      showToast(`你选择了 ${nameMap[choice]}`);
    };
  });
}
