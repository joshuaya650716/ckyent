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

const dataStore = window.CKYENT_SITE_DATA;

function setText(id, value) {
  const element = document.getElementById(id);
  if (element && value) element.textContent = value;
}

function setList(id, items) {
  const list = document.getElementById(id);
  if (!list || !Array.isArray(items)) return;
  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function applyClinicData(data) {
  if (!data) return;
  document.title = `${data.clinicName}｜網站`;

  setText("clinic-name", data.clinicName);
  setText("home-eyebrow-2", data.homeEyebrow);
  setText("home-headline", data.homeHeadline);
  setText("home-lead", data.homeLead);
  setText("today-hours", data.todayHours);
  setText("waiting-count", data.waitingCount);
  setText("appointment-count", data.appointmentCount);
  setText("module-name", data.moduleTitle);
  setText("module-copy", data.moduleCopy);

  setText("doctor-headline", data.doctorHeadline);
  setText("doctor-lead", data.doctorLead);
  setText("doctor-name", data.doctorName);
  setText("doctor-name-card", data.doctorName);
  setText("doctor-summary", data.doctorSummary);
  setText("doctor-specialty", data.doctorSpecialty);
  setText("doctor-specialty-card", data.doctorSpecialty);
  setText("doctor-style", data.doctorStyle);
  setText("doctor-focus", data.doctorFocus);
  setText("doctor-feature-1", data.doctorFeature1);
  setText("doctor-feature-2", data.doctorFeature2);
  setText("doctor-feature-3", data.doctorFeature3);

  setText("info-headline", data.infoHeadline);
  setText("info-lead", data.infoLead);
  setText("weekday-morning", data.weekdayMorning);
  setText("weekday-evening", data.weekdayEvening);
  setText("saturday-hours", data.saturdayHours);
  setText("sunday-hours", data.sundayHours);
  setText("phone", data.phone);
  setText("address", data.address);
  setText("transport", data.transport);
  setText("check-in-note", data.checkInNote);
  setList("before-visit-list", data.beforeVisit);
  setList("services-list", data.services);
}

function initModuleCards(data) {
  const tiles = document.querySelectorAll(".module-tile");
  const moduleName = document.getElementById("module-name");
  const moduleCopy = document.getElementById("module-copy");

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const next = moduleDetails[tile.dataset.module];
      if (!next || !moduleName || !moduleCopy) return;

      tiles.forEach((item) => item.classList.toggle("is-active", item === tile));
      moduleName.textContent = tile.dataset.module === "front" ? data.moduleTitle : next.name;
      moduleCopy.textContent = tile.dataset.module === "front" ? data.moduleCopy : next.copy;
    });
  });
}

function fieldValue(id) {
  const field = document.getElementById(id);
  return field ? field.value.trim() : "";
}

function fillField(id, value) {
  const field = document.getElementById(id);
  if (!field) return;
  field.value = Array.isArray(value) ? value.join("\n") : value;
}

function readEditorForm() {
  return {
    clinicName: fieldValue("edit-clinic-name"),
    homeEyebrow: fieldValue("edit-home-eyebrow"),
    homeHeadline: fieldValue("edit-home-headline"),
    homeLead: fieldValue("edit-home-lead"),
    todayHours: fieldValue("edit-today-hours"),
    waitingCount: fieldValue("edit-waiting-count"),
    appointmentCount: fieldValue("edit-appointment-count"),
    doctorHeadline: fieldValue("edit-doctor-headline"),
    doctorLead: fieldValue("edit-doctor-lead"),
    doctorName: fieldValue("edit-doctor-name"),
    doctorSummary: fieldValue("edit-doctor-summary"),
    doctorSpecialty: fieldValue("edit-doctor-specialty"),
    doctorStyle: fieldValue("edit-doctor-style"),
    doctorFocus: fieldValue("edit-doctor-focus"),
    infoHeadline: fieldValue("edit-info-headline"),
    infoLead: fieldValue("edit-info-lead"),
    weekdayMorning: fieldValue("edit-weekday-morning"),
    weekdayEvening: fieldValue("edit-weekday-evening"),
    saturdayHours: fieldValue("edit-saturday-hours"),
    sundayHours: fieldValue("edit-sunday-hours"),
    phone: fieldValue("edit-phone"),
    address: fieldValue("edit-address"),
    transport: fieldValue("edit-transport"),
    checkInNote: fieldValue("edit-check-in-note"),
    beforeVisit: dataStore.normalizeLines(fieldValue("edit-before-visit")),
    services: dataStore.normalizeLines(fieldValue("edit-services")),
  };
}

function fillEditorForm(data) {
  fillField("edit-clinic-name", data.clinicName);
  fillField("edit-home-eyebrow", data.homeEyebrow);
  fillField("edit-home-headline", data.homeHeadline);
  fillField("edit-home-lead", data.homeLead);
  fillField("edit-today-hours", data.todayHours);
  fillField("edit-waiting-count", data.waitingCount);
  fillField("edit-appointment-count", data.appointmentCount);
  fillField("edit-doctor-headline", data.doctorHeadline);
  fillField("edit-doctor-lead", data.doctorLead);
  fillField("edit-doctor-name", data.doctorName);
  fillField("edit-doctor-summary", data.doctorSummary);
  fillField("edit-doctor-specialty", data.doctorSpecialty);
  fillField("edit-doctor-style", data.doctorStyle);
  fillField("edit-doctor-focus", data.doctorFocus);
  fillField("edit-info-headline", data.infoHeadline);
  fillField("edit-info-lead", data.infoLead);
  fillField("edit-weekday-morning", data.weekdayMorning);
  fillField("edit-weekday-evening", data.weekdayEvening);
  fillField("edit-saturday-hours", data.saturdayHours);
  fillField("edit-sunday-hours", data.sundayHours);
  fillField("edit-phone", data.phone);
  fillField("edit-address", data.address);
  fillField("edit-transport", data.transport);
  fillField("edit-check-in-note", data.checkInNote);
  fillField("edit-before-visit", data.beforeVisit);
  fillField("edit-services", data.services);
}

function updateEditorPreview(data) {
  setText("preview-clinic-name", data.clinicName);
  setText("preview-home-headline", data.homeHeadline);
  setText("preview-home-lead", data.homeLead);
  setText("preview-hours", data.todayHours);
  setText("preview-doctor", data.doctorName);
  setText("preview-phone", data.phone);
}

function showEditorStatus(message) {
  const status = document.getElementById("editor-status");
  if (!status) return;
  status.textContent = message;
}

function initEditor(data) {
  const form = document.getElementById("clinic-editor");
  if (!form || !dataStore) return;

  fillEditorForm(data);
  updateEditorPreview(data);

  form.addEventListener("input", () => {
    updateEditorPreview(readEditorForm());
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const saved = dataStore.save(readEditorForm());
    applyClinicData(saved);
    updateEditorPreview(saved);
    showEditorStatus("已儲存。回首頁或重新整理前台，就會看到新內容。");
  });

  const resetButton = document.getElementById("reset-editor");
  resetButton?.addEventListener("click", () => {
    const defaults = dataStore.reset();
    fillEditorForm(defaults);
    applyClinicData(defaults);
    updateEditorPreview(defaults);
    showEditorStatus("已重設為預設內容。");
  });

  const exportButton = document.getElementById("export-editor");
  exportButton?.addEventListener("click", async () => {
    const dataToExport = dataStore.save(readEditorForm());
    const text = JSON.stringify(dataToExport, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      showEditorStatus("已複製成備份文字，可以貼到文件保存。");
    } catch {
      showEditorStatus("瀏覽器沒有允許複製，請改用手動選取備份文字。");
    }
  });
}

const clinicData = dataStore?.load();
applyClinicData(clinicData);
initModuleCards(clinicData || {});
initEditor(clinicData || {});

window.addEventListener("storage", () => {
  const nextData = dataStore?.load();
  applyClinicData(nextData);
});
