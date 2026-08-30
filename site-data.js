const CKYENT_STORAGE_KEY = "ckyent-clinic-site-data";

const CKYENT_DEFAULT_DATA = {
  siteTitle: "楊啟坤耳鼻喉診所",
  clinicName: "楊啟坤耳鼻喉診所",
  homeEyebrow: "更美一點，也更好擴充",
  homeHeadline: "把診所網站做成一個安靜、清楚、可信任的入口",
  homeLead:
    "這版會先把品牌感、分頁感與後台感拉開。前台看起來像正式官網，後台則保留給門診營運、個案管理、預約與未來模組。",
  todayHours: "08:30 - 21:30",
  waitingCount: "12 人",
  appointmentCount: "26 筆",
  moduleTitle: "前台首頁",
  moduleCopy:
    "第一個頁面可以先做成正式官網感，讓病人看得懂診所、看得到資訊，也能很快找到門診與聯絡方式。",
  doctorHeadline: "以清楚說明、溫和溝通、精準判斷為核心",
  doctorLead:
    "這一頁可以用來建立病人的信任感，讓大家在看診前先知道醫師的專長、看診節奏與診所風格。",
  doctorName: "楊啟坤醫師",
  doctorSummary:
    "主要負責耳鼻喉門診、慢性症狀追蹤與一般評估。畫面設計會盡量讓病人感覺平穩、專業，不會太硬，也不會太像廣告。",
  doctorSpecialty: "過敏性鼻炎、耳鳴、喉部不適、反覆感冒",
  doctorStyle: "簡單、清楚、好理解",
  doctorFocus: "症狀說明清楚、流程簡化、追蹤一致",
  doctorFeature1: "門診特色：以清楚判斷與穩定追蹤為主，適合做成每週門診說明與看診提醒。",
  doctorFeature2: "病人會看到：醫師照片、專長、門診時段、可看診項目、如何預約與聯絡。",
  doctorFeature3: "後台可接：醫師排班、診次公告、看診說明、衛教文章與最新訊息。",
  weekdayMorning: "14:00 - 17:30",
  weekdayEvening: "18:30 - 21:30",
  saturdayHours: "上午診與部分時段預約制",
  sundayHours: "休診或公告門診",
  infoHeadline: "把時間、地址、交通與聯絡方式整理清楚",
  infoLead:
    "這一頁的目標很單純：讓病人不用找半天，就能知道幾點來、怎麼來、要帶什麼，以及怎麼先問問題。",
  phone: "請填診所專線",
  address: "請填完整院所地址",
  transport: "大眾運輸、停車資訊、步行路線",
  checkInNote: "請提早 10 分鐘報到",
  beforeVisit: ["提早報到", "帶健保卡與相關資料", "慢性病可預先整理症狀"],
  services: ["鼻過敏與鼻塞", "耳鳴與耳悶", "咽喉不適與感冒追蹤"],
};

function CKYENT_cloneDefaultData() {
  return JSON.parse(JSON.stringify(CKYENT_DEFAULT_DATA));
}

function CKYENT_normalizeLines(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function CKYENT_mergeData(source) {
  const merged = CKYENT_cloneDefaultData();
  if (!source || typeof source !== "object") {
    return merged;
  }

  const textKeys = [
    "siteTitle",
    "clinicName",
    "homeEyebrow",
    "homeHeadline",
    "homeLead",
    "todayHours",
    "waitingCount",
    "appointmentCount",
    "moduleTitle",
    "moduleCopy",
    "doctorHeadline",
    "doctorLead",
    "doctorName",
    "doctorSummary",
    "doctorSpecialty",
    "doctorStyle",
    "doctorFocus",
    "doctorFeature1",
    "doctorFeature2",
    "doctorFeature3",
    "weekdayMorning",
    "weekdayEvening",
    "saturdayHours",
    "sundayHours",
    "infoHeadline",
    "infoLead",
    "phone",
    "address",
    "transport",
    "checkInNote",
  ];

  textKeys.forEach((key) => {
    if (typeof source[key] === "string" && source[key].trim()) {
      merged[key] = source[key].trim();
    }
  });

  if (source.beforeVisit) {
    merged.beforeVisit = CKYENT_normalizeLines(source.beforeVisit);
  }

  if (source.services) {
    merged.services = CKYENT_normalizeLines(source.services);
  }

  return merged;
}

function CKYENT_loadData() {
  try {
    const raw = localStorage.getItem(CKYENT_STORAGE_KEY);
    if (!raw) {
      return CKYENT_cloneDefaultData();
    }

    return CKYENT_mergeData(JSON.parse(raw));
  } catch {
    return CKYENT_cloneDefaultData();
  }
}

function CKYENT_saveData(nextData) {
  const payload = CKYENT_mergeData(nextData);
  localStorage.setItem(CKYENT_STORAGE_KEY, JSON.stringify(payload));
  return payload;
}

function CKYENT_resetData() {
  localStorage.removeItem(CKYENT_STORAGE_KEY);
  return CKYENT_cloneDefaultData();
}

window.CKYENT_SITE_DATA = {
  defaults: CKYENT_cloneDefaultData(),
  load: CKYENT_loadData,
  save: CKYENT_saveData,
  reset: CKYENT_resetData,
  normalizeLines: CKYENT_normalizeLines,
};
