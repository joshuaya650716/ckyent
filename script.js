const moduleDetails = {
  front: {
    name: "前台首頁",
    copy:
      "第一個頁面可以先做成正式官網感，讓病人看得懂診所、看得到資訊，也能很快找到門診與聯絡方式。",
  },
  service: {
    name: "門診系統",
    copy:
      "門診入口可以集中掛號、叫號、看診進度與狀態更新，畫面要清楚、快速、方便櫃台使用。",
  },
  admin: {
    name: "管理系統",
    copy:
      "內部後台適合放排班、庫存、報表、權限與日常營運資訊，讓診所工作可以集中處理。",
  },
  case: {
    name: "個案管理",
    copy:
      "個案追蹤頁可放回診提醒、衛教內容、關懷紀錄與長期追蹤，方便後續維護病人關係。",
  },
};

const tiles = document.querySelectorAll(".module-tile");
const moduleName = document.getElementById("module-name");
const moduleCopy = document.getElementById("module-copy");

tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    const next = moduleDetails[tile.dataset.module];
    if (!next) return;

    tiles.forEach((item) => item.classList.toggle("is-active", item === tile));
    moduleName.textContent = next.name;
    moduleCopy.textContent = next.copy;
  });
});
