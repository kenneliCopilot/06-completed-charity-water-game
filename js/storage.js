const STORAGE_KEY = "water_clicker_save";

/* ===== 默认存档结构 ===== */
function defaultSave() {
  return {
    w: 0,          // 当前水量
    lc: 0,         // 累计点击
    ac: 1,         // 主动点击等级
    ai: [],        // 自动点击数量
    ae: 1,         // 自动事件等级
    pe: 1,         // 主动事件等级
    reb: 0,        // 重生次数
    aw: []         // 成就统计（每项收集数量）
  };
}

/* ===== 载入 ===== */
function loadGame() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultSave(), ...JSON.parse(raw) } : defaultSave();
  } catch (e) {
    console.error("Load failed", e);
    return defaultSave();
  }
}

let gameSave = loadGame();

/* ===== 保存 ===== */
function saveGame() {
  try {
    // 仅保存真正的游戏数据字段
    const pureSave = { ...gameSave };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pureSave));
  } catch (e) {
    console.error("Save failed", e);
  }
}

/* ===== 导出到剪贴板 ===== */
async function exportSave() {
  // 复制一份 gameSave，并将 w 转为整数
  const exportData = { ...gameSave, w: Math.floor(gameSave.w) };

  const str = JSON.stringify(exportData);

  try {
    await navigator.clipboard.writeText(str);
    alert(currentLang === "zh" ? "存档已复制！" : "Save copied!");
  } catch (err) {
    // Fallback 方式
    const textarea = document.createElement("textarea");
    textarea.value = str;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const success = document.execCommand("copy");
      alert(
        success
          ? currentLang === "zh"
            ? "存档已复制！"
            : "Save copied!"
          : currentLang === "zh"
          ? "复制失败，请手动复制"
          : "Copy failed. Please copy manually."
      );
    } catch (e) {
      alert(currentLang === "zh" ? "复制失败" : "Copy failed");
    }

    document.body.removeChild(textarea);
  }
}


/* ===== 导入 ===== */
function importSave() {
  const str = prompt("粘贴存档 JSON：");
  if (!str) return;

  try {
    const obj = JSON.parse(str);
    gameSave = { ...defaultSave(), ...obj };
    updateUI();        // 刷新界面
    saveGame();        // 立即保存
  } catch {
    showToast("无效的存档 JSON");
  }
}

/* ===== Toast 辅助 ===== */
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) { alert(msg); return; }
  toast.textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2200);
}
