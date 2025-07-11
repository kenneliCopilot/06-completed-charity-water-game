window.customTabs.settings = function () {
  const tpl = document.getElementById("tpl-settings");
  if (!tpl) return;

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = tpl.innerHTML;
  modal.classList.remove("hidden");

  // 按钮事件绑定（必须在 innerHTML 设置后执行）
  document.getElementById("btn-toggle-lang").onclick = toggleLang;
  document.getElementById("btn-export-save").onclick = exportSave;
  document.getElementById("btn-import-save").onclick = importSave;
};
