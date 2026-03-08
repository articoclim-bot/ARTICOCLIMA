/* ===================================================================
   ARTICOCLIMA — Simulador de Instalação v2.0
   Accordion por divisão · Marca global · Total em tempo real
   =================================================================== */
'use strict';

// ============================================================
// 1. CONSTANTES — BTU e kW
// ============================================================
const BTU_TIERS = [7000, 9000, 12000, 15000, 18000, 24000, 28000];

const BTU_TO_KW = {
  7000: 2.0, 9000: 2.5, 12000: 3.5,
  15000: 4.2, 18000: 5.0, 24000: 7.0, 28000: 8.2
};

// ============================================================
// 2. DADOS DOS PRODUTOS
// ============================================================

// --- DAIKIN — Monosplit (conjunto interior + exterior, c/ IVA) ---
const DAIKIN_MONO = {
  Sensira: {
    label: 'Sensira', tier: 'entrada', badge: '💰 Melhor Preço',
    energyCool: 'A++', energyHeat: 'A+',
    desc: 'Gama de entrada — conforto essencial, Inverter R-32',
    prices:  { 7000:972,  9000:1033, 12000:1169, 15000:1396, 18000:1863, 24000:2319, 28000:2774 },
    models:  { 7000:'FTXF20', 9000:'FTXF25', 12000:'FTXF35', 15000:'FTXF42', 18000:'FTXF50', 24000:'FTXF60', 28000:'FTXF71' },
    features: ['Inverter', 'R-32', 'Filtro básico', 'Auto-restart'],
    image: 'assets/products/daikin-sensira-1.webp',
    images: ['assets/products/daikin-sensira-1.webp','assets/products/daikin-sensira-2.webp','assets/products/daikin-sensira-3.webp'],
  },
  Confora: {
    label: 'Confora', tier: 'intermedio', badge: '⚡ Alta Eficiência',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'Gama intermédia — A+++ com WiFi opcional e filtro PM2.5',
    prices:  { 7000:1224, 9000:1316, 12000:1482, 18000:2343, 24000:2927, 28000:3383 },
    models:  { 7000:'FTXP20', 9000:'FTXP25', 12000:'FTXP35', 18000:'FTXP50', 24000:'FTXP60', 28000:'FTXP71' },
    features: ['Inverter', 'R-32', 'Modo I-Feel', 'Filtro PM2.5', 'WiFi opcional'],
    image: 'assets/products/daikin-confora-1.webp',
    images: ['assets/products/daikin-confora-1.webp','assets/products/daikin-confora-2.webp','assets/products/daikin-confora-3.webp'],
  },
  Perfera: {
    label: 'Perfera', tier: 'premium', badge: '🏆 Topo de Gama',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'Gama premium — WiFi integrado, purificador de ar e controlo por app',
    prices:  { 7000:1451, 9000:1538, 12000:1771, 15000:2251, 18000:2897, 24000:3506, 28000:4041 },
    models:  { 7000:'FTXM20', 9000:'FTXM25', 12000:'FTXM35', 15000:'FTXM42', 18000:'FTXM50', 24000:'FTXM60', 28000:'FTXM71' },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Purificador de ar', 'App Daikin Online'],
    image: 'assets/products/daikin-perfera-1.webp',
    images: ['assets/products/daikin-perfera-1.webp','assets/products/daikin-perfera-2.webp','assets/products/daikin-perfera-3.webp'],
  },
  Stylish: {
    label: 'Stylish', tier: 'design', badge: '🎨 Design Premium',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'Design premiado — Branco, Prateado e Preto (máx. 18k BTU)',
    prices:  { 7000:1728, 9000:1851, 12000:2146, 15000:2712, 18000:3229 },
    models:  { 7000:'FTXA20', 9000:'FTXA25', 12000:'FTXA35', 15000:'FTXA42', 18000:'FTXA50' },
    colorPrices: {
      white:  { 7000:1728, 9000:1851, 12000:2146, 15000:2712, 18000:3229 },
      silver: { 7000:1790, 9000:1931, 12000:2239, 15000:2811, 18000:3339 },
      black:  { 7000:1790, 9000:1931, 12000:2239, 15000:2811, 18000:3339 },
    },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Design icónico', '3 cores disponíveis'],
    maxBTU: 18000,
    image: 'assets/products/daikin-stylish-branco-1.webp',
    images: {
      white:  ['assets/products/daikin-stylish-branco-1.webp','assets/products/daikin-stylish-branco-2.webp','assets/products/daikin-stylish-branco-3.webp'],
      silver: ['assets/products/daikin-stylish-silver-1.webp','assets/products/daikin-stylish-silver-2.webp','assets/products/daikin-stylish-silver-3.webp'],
      black:  ['assets/products/daikin-stylish-black-1.webp','assets/products/daikin-stylish-black-2.webp','assets/products/daikin-stylish-black-3.webp'],
    },
  },
  Emura: {
    label: 'Emura', tier: 'design', badge: '✨ Ícone de Design',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'Design icónico europeu — purificador de ar e app (máx. 18k BTU)',
    prices:  { 7000:1919, 9000:2005, 12000:2300, 15000:2946, 18000:3419 },
    models:  { 7000:'FTXJ20', 9000:'FTXJ25', 12000:'FTXJ35', 15000:'FTXJ42', 18000:'FTXJ50' },
    colorPrices: {
      white:  { 7000:1919, 9000:2005, 12000:2300, 15000:2946, 18000:3419 },
      silver: { 7000:2085, 9000:2183, 12000:2491, 15000:3063, 18000:3579 },
      black:  { 7000:2085, 9000:2183, 12000:2491, 15000:3063, 18000:3579 },
    },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Purificador de ar', '3 cores disponíveis'],
    maxBTU: 18000,
    image: 'assets/products/daikin-emura-branco-1.webp',
    images: {
      white:  ['assets/products/daikin-emura-branco-1.webp','assets/products/daikin-emura-branco-2.webp','assets/products/daikin-emura-branco-3.webp'],
      silver: ['assets/products/daikin-emura-silver-1.webp','assets/products/daikin-emura-silver-2.webp','assets/products/daikin-emura-silver-3.webp'],
      black:  ['assets/products/daikin-emura-black-1.webp','assets/products/daikin-emura-black-2.webp','assets/products/daikin-emura-black-3.webp'],
    },
  },
};

// --- DAIKIN — Multisplit Interior (FTXM-A, c/ IVA) ---
const DAIKIN_MULTI_INDOOR = [
  { btu:7000,  kw:2.0, model:'FTXM20A', pvp: Math.round(435 * 1.23) },
  { btu:9000,  kw:2.5, model:'FTXM25A', pvp: Math.round(475 * 1.23) },
  { btu:12000, kw:3.5, model:'FTXM35A', pvp: Math.round(615 * 1.23) },
  { btu:15000, kw:4.2, model:'FTXM42A', pvp: Math.round(705 * 1.23) },
  { btu:18000, kw:5.0, model:'FTXM50A', pvp: Math.round(760 * 1.23) },
  { btu:24000, kw:7.0, model:'FTXM60R', pvp: Math.round(825 * 1.23) },
  { btu:28000, kw:8.2, model:'FTXM71R', pvp: Math.round(1045 * 1.23) },
];

// --- DAIKIN — Multisplit Exterior (MXM-A9, c/ IVA) ---
const DAIKIN_MULTI_OUTDOOR = [
  { model:'2MXM40A9', zones:2, kw:4.0, pvp:Math.round(1315*1.23), maxZoneKW:3.5 },
  { model:'2MXM50A9', zones:2, kw:5.0, pvp:Math.round(1425*1.23), maxZoneKW:5.0 },
  { model:'2MXM68A9', zones:2, kw:6.8, pvp:Math.round(1845*1.23), maxZoneKW:5.0 },
  { model:'3MXM40A9', zones:3, kw:4.0, pvp:Math.round(1475*1.23), maxZoneKW:3.5 },
  { model:'3MXM52A9', zones:3, kw:5.2, pvp:Math.round(1635*1.23), maxZoneKW:5.0 },
  { model:'3MXM68A9', zones:3, kw:6.8, pvp:Math.round(2065*1.23), maxZoneKW:7.0 },
  { model:'4MXM68A9', zones:4, kw:6.8, pvp:Math.round(2440*1.23), maxZoneKW:7.0 },
  { model:'4MXM80A9', zones:4, kw:8.0, pvp:Math.round(2980*1.23), maxZoneKW:8.2 },
  { model:'5MXM90A9', zones:5, kw:9.0, pvp:Math.round(3100*1.23), maxZoneKW:8.2 },
];

// --- DAIKIN — Sensira Multisplit Interior (CTXF, c/ IVA) ---
// Unidade de parede económica para exterior MXF · apenas 7k–12k BTU
const DAIKIN_SENSIRA_MULTI_INDOOR = [
  { btu: 7000,  kw: 2.0, model: 'CTXF20', pvp: Math.round(245 * 1.23) },
  { btu: 9000,  kw: 2.5, model: 'CTXF25', pvp: Math.round(270 * 1.23) },
  { btu: 12000, kw: 3.5, model: 'CTXF35', pvp: Math.round(315 * 1.23) },
];

// --- DAIKIN — Exterior MXF (compatível com Sensira CTXF, c/ IVA) ---
const DAIKIN_MXF_OUTDOOR = [
  { model: '2MXF40', zones: 2, kw: 4.0, pvp: Math.round(1145 * 1.23) },
  { model: '2MXF50', zones: 2, kw: 5.0, pvp: Math.round(1235 * 1.23) },
  { model: '3MXF52', zones: 3, kw: 5.2, pvp: Math.round(1420 * 1.23) },
  { model: '3MXF68', zones: 3, kw: 6.8, pvp: Math.round(1795 * 1.23) },
];

// --- BOSCH — Monosplit (conjuntos, c/ IVA) ---
const BOSCH_MONO = {
  '3000i': {
    label: 'Climate 3000i', tier: 'entrada', badge: '💰 Melhor Preço',
    energyCool: 'A++', energyHeat: 'A+',
    desc: 'Gama entrada — WiFi Matter · Auto-limpeza iClean · Alexa/Google/Siri',
    prices: { 9000:898, 12000:978, 18000:1439, 24000:1747 },
    models: { 9000:'CL3000i-Set 26WE', 12000:'CL3000i-Set 35WE', 18000:'CL3000i-Set 53WE', 24000:'CL3000i-Set 70WE' },
    features: ['Inverter', 'R-32', 'WiFi Matter', 'Auto-limpeza iClean', 'Alexa/Google/Siri'],
    image: 'assets/products/bosch-3000i-1.webp',
    images: ['assets/products/bosch-3000i-1.webp','assets/products/bosch-3000i-2.webp'],
  },
  '6000i': {
    label: 'Climate 6000i', tier: 'premium', badge: '⚡ Alta Eficiência',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'Gama premium — Ionizador · Sensor presença · A+++ · WiFi integrado',
    prices: { 9000:1082, 12000:1193, 18000:1784, 24000:2177 },
    models: { 9000:'CL6000i-Set 26WE', 12000:'CL6000i-Set 35WE', 18000:'CL6000i-Set 53WE', 24000:'CL6000i-Set 70WE' },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Ionizador', 'Sensor de presença'],
    image: 'assets/products/bosch-6000i-1.webp',
    images: ['assets/products/bosch-6000i-1.webp','assets/products/bosch-6000i-2.webp','assets/products/bosch-6000i-3.webp','assets/products/bosch-6000i-4.webp'],
  },
};

// --- BOSCH — Multisplit Interior (Climate 3000i Mural, c/ IVA) ---
const BOSCH_MULTI_INDOOR = [
  { btu: 9000,  kw: 2.6, model: 'CL3000i 26E', pvp: 258 },
  { btu: 12000, kw: 3.5, model: 'CL3000i 35E', pvp: 295 },
  { btu: 18000, kw: 5.3, model: 'CL3000i 53E', pvp: 369 },
  { btu: 24000, kw: 7.0, model: 'CL3000i 70E', pvp: 504 },
];

// --- BOSCH — Multisplit Exterior (Climate 5000 M, c/ IVA) ---
const BOSCH_MULTI_OUTDOOR = [
  { model: 'Climate 5000 M 41/2',  zones: 2, kw: 4.1,  pvp: 1132 },
  { model: 'Climate 5000 M 53/2',  zones: 2, kw: 5.3,  pvp: 1285 },
  { model: 'Climate 5000 M 62/3',  zones: 3, kw: 6.2,  pvp: 1642 },
  { model: 'Climate 5000 M 79/3',  zones: 3, kw: 7.9,  pvp: 1907 },
  { model: 'Climate 5000 M 82/4',  zones: 4, kw: 8.2,  pvp: 2073 },
  { model: 'Climate 5000 M 105/4', zones: 4, kw: 10.5, pvp: 2546 },
  { model: 'Climate 5000 M 125/5', zones: 5, kw: 12.5, pvp: 2829 },
];

// --- DAITSU — Monosplit (conjuntos, c/ IVA) ---
const DAITSU_MONO = {
  'ARTIC Plus': {
    label: 'ARTIC Plus', tier: 'premium', badge: '🏆 Alta Eficiência',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'A+++ · WiFi incluído · I Feel · Gentle Air · 5 filtros de qualidade do ar',
    prices: { 9000:700, 12000:760, 18000:1090, 24000:1290 },
    models: { 9000:'DS-9KTP-6', 12000:'DS-12KTP-6', 18000:'DS-18KTP-6', 24000:'DS-24KTP-6' },
    features: ['Inverter', 'R-32', 'WiFi incluído', 'A+++', 'I Feel', 'Gentle Air', '5 filtros'],
    maxBTU: 24000,
    image: 'assets/products/daitsu-artic-plus-1.webp',
    images: ['assets/products/daitsu-artic-plus-1.webp','assets/products/daitsu-artic-plus-2.webp','assets/products/daitsu-artic-plus-3.webp'],
  },
};

// --- DAITSU — Multisplit Interior (ARTIC Plus, c/ IVA) ---
const DAITSU_MULTI_INDOOR = [
  { btu: 9000,  kw: 2.5, model: 'DS-9KTP-6',  pvp: 260 },
  { btu: 12000, kw: 3.5, model: 'DS-12KTP-6', pvp: 265 },
  { btu: 18000, kw: 5.0, model: 'DS-18KTP-6', pvp: 430 },
];

// --- DAITSU — Multisplit Exterior (FREE-MAX, c/ IVA) ---
const DAITSU_MULTI_OUTDOOR = [
  { model: 'DOSM-14KDT',   zones: 2, kw: 4.1,  pvp: 930  },
  { model: 'DOSM-18KDT-3', zones: 2, kw: 5.1,  pvp: 1145 },
  { model: 'DOSM-21KDT',   zones: 3, kw: 6.2,  pvp: 1320 },
  { model: 'DOSM-27KDT-3', zones: 3, kw: 7.9,  pvp: 1475 },
  { model: 'DOSM-32KDT',   zones: 4, kw: 9.4,  pvp: 2230 },
  { model: 'DOSM-42KDT',   zones: 5, kw: 12.2, pvp: 2490 },
];

// ============================================================
// 3. ESTADO
// ============================================================
const state = {
  brand: 'daikin',
  rooms: [],
  nextRoomId: 1,
  modelPickerRoomId: null,
  pickerColors: {}, // roomId → color (for Stylish/Emura in picker before confirm)
};

function newRoom(id) {
  return {
    id,
    name: `Divisão ${id}`,
    type: 'quarto',
    areaM2: '',
    heightM: 2.7,
    windows: 0,
    orientation: 'sul',
    openToKitchen: false,
    useMulti: true,        // true = multisplit (default for 2+ rooms)
    multiType: 'standard', // 'standard' (FTXM+MXM) | 'sensira' (CTXF+MXF, daikin only, ≤12k)
    multiTypeExplicit: false, // true = user chose via picker; false = auto-computed
    series: null,          // null = auto (cheapest). key from catalog e.g. 'Sensira', '3000i'
    color: 'white',
    forceIndividual: false, // true only when user explicitly chose individual in multi-room context
    expanded: true,
  };
}

// ============================================================
// 4. CÁLCULO BTU
// ============================================================
function calcBTU(room) {
  const area   = parseFloat(room.areaM2) || 0;
  const height = parseFloat(room.heightM) || 2.7;
  if (area <= 0) return 0;

  let btu = area * height * 160;

  if (room.type === 'sala' && room.openToKitchen) btu += 3000;
  if (room.type === 'cozinha') btu += 4000;

  const numWindows = parseInt(room.windows) || 0;
  if (numWindows > 0) {
    const winArea = numWindows * 1.5;
    const gainMap = { sul: 450, este: 250, oeste: 250, norte: 100 };
    btu += winArea * (gainMap[room.orientation] || 300);
  }

  return Math.round(btu);
}

function btuToTier(calculatedBTU) {
  return BTU_TIERS.find(t => t >= calculatedBTU) || 28000;
}

function btuLabel(btu) {
  const map = { 7000:'7.000', 9000:'9.000', 12000:'12.000', 15000:'15.000', 18000:'18.000', 24000:'24.000', 28000:'28.000' };
  return (map[btu] || btu.toLocaleString('pt-PT')) + ' BTU';
}

function kwLabel(btu) {
  return (BTU_TO_KW[btu] || '?') + ' kW';
}

function fmtPrice(n) {
  if (!n && n !== 0) return '—';
  return n.toLocaleString('pt-PT') + ' €';
}

// ============================================================
// 5. CATÁLOGO HELPERS
// ============================================================
function getBrandCatalog(brand) {
  if (brand === 'daikin') return DAIKIN_MONO;
  if (brand === 'bosch')  return BOSCH_MONO;
  if (brand === 'daitsu') return DAITSU_MONO;
  return {};
}

function getMultiIndoorList(brand) {
  if (brand === 'daikin') return DAIKIN_MULTI_INDOOR;
  if (brand === 'bosch')  return BOSCH_MULTI_INDOOR;
  if (brand === 'daitsu') return DAITSU_MULTI_INDOOR;
  return [];
}

function getMultiOutdoorList(brand) {
  if (brand === 'daikin') return DAIKIN_MULTI_OUTDOOR;
  if (brand === 'bosch')  return BOSCH_MULTI_OUTDOOR;
  if (brand === 'daitsu') return DAITSU_MULTI_OUTDOOR;
  return [];
}

function getMultiIndoorUnit(brand, tier) {
  const list = getMultiIndoorList(brand);
  return list.find(u => u.btu >= tier) || list[list.length - 1] || null;
}

function getCheapestMonoSeries(brand, tier) {
  const catalog = getBrandCatalog(brand);
  let cheapestKey = null;
  let cheapestPrice = Infinity;
  for (const [key, series] of Object.entries(catalog)) {
    if (series.maxBTU && tier > series.maxBTU) continue;
    const price = series.prices[tier];
    if (price !== undefined && price < cheapestPrice) {
      cheapestPrice = price;
      cheapestKey = key;
    }
  }
  return cheapestKey;
}

function getMonoPrice(brand, seriesKey, tier, color) {
  const catalog = getBrandCatalog(brand);
  const series = catalog[seriesKey];
  if (!series) return 0;
  if (series.colorPrices) {
    const col = color || 'white';
    return (series.colorPrices[col] && series.colorPrices[col][tier]) || series.prices[tier] || 0;
  }
  return series.prices[tier] || 0;
}

function getSeriesImage(brand, seriesKey, color) {
  const catalog = getBrandCatalog(brand);
  const series = catalog[seriesKey];
  if (!series) return '';
  if (series.images && typeof series.images === 'object' && !Array.isArray(series.images)) {
    return series.images[color || 'white']?.[0] || series.image || '';
  }
  return series.image || '';
}

// Calcular multisplit outdoor: mesmo algoritmo das versões anteriores
function calcBrandMulti(brand, multiRoomsWithTier) {
  const n = multiRoomsWithTier.length;
  if (n < 2 || n > 5) return null;

  const indoorList = getMultiIndoorList(brand);
  const outdoorList = getMultiOutdoorList(brand);

  const indoorUnits = multiRoomsWithTier.map(r => {
    const unit = indoorList.find(u => u.btu >= r.tier) || indoorList[indoorList.length - 1];
    return { room: r, unit };
  });

  const totalKW  = indoorUnits.reduce((s, { unit }) => s + unit.kw, 0);
  const maxZoneKW = Math.max(...indoorUnits.map(({ unit }) => unit.kw));

  let candidates;
  if (brand === 'daikin') {
    candidates = outdoorList.filter(ou => {
      if (ou.zones < n) return false;
      if (maxZoneKW > ou.maxZoneKW) return false;
      if (totalKW > ou.kw * 1.30) return false;
      return true;
    });
  } else {
    candidates = outdoorList.filter(ou => {
      if (ou.zones < n) return false;
      if (totalKW > ou.kw * 1.30) return false;
      return true;
    });
  }

  if (!candidates.length) return null;

  const outdoor     = candidates.sort((a, b) => a.pvp - b.pvp)[0];
  const indoorTotal = indoorUnits.reduce((s, { unit }) => s + unit.pvp, 0);

  return { outdoor, indoorUnits, indoorTotal, total: outdoor.pvp + indoorTotal };
}

// Determina o tipo de multisplit óptimo para um quarto, tendo em conta todos os quartos multi
// Se explicitamente definido pelo utilizador via picker → respeitar
// Se auto: Sensira CTXF só quando Daikin + todos os quartos multi têm MESMO tier ≤ 12k (2-3 zonas)
function getEffectiveMultiType(room, allRooms) {
  if (!room.useMulti) return 'standard';
  if (room.multiTypeExplicit) return room.multiType;

  if (state.brand !== 'daikin') return 'standard';

  const multiRooms = allRooms.filter(r => r.useMulti && parseFloat(r.areaM2) > 0);
  if (multiRooms.length < 2 || multiRooms.length > 3) return 'standard';

  const tiers = multiRooms.map(r => btuToTier(calcBTU(r)));
  const allSameTier = tiers.every(t => t === tiers[0]);
  const allLE12k    = tiers.every(t => t <= 12000);

  return (allSameTier && allLE12k) ? 'sensira' : 'standard';
}

// Calcula multisplit Sensira (CTXF interior + MXF exterior) — Daikin exclusivo ≤12k BTU
function calcSensiraMulti(multiRoomsWithTier) {
  const n = multiRoomsWithTier.length;
  if (n < 2 || n > 3) return null; // MXF suporta 2-3 zonas

  // REGRA: Sensira só funciona com o MESMO modelo em todas as zonas (mesmo BTU)
  const tiers = multiRoomsWithTier.map(r => r.tier);
  if (!tiers.every(t => t === tiers[0])) return null;
  if (tiers[0] > 12000) return null; // só até 12k BTU

  const indoorUnits = multiRoomsWithTier.map(r => {
    const unit = DAIKIN_SENSIRA_MULTI_INDOOR.find(u => u.btu >= r.tier) || null;
    return { room: r, unit };
  });
  if (indoorUnits.some(iu => !iu.unit)) return null;

  const totalKW = indoorUnits.reduce((s, { unit }) => s + unit.kw, 0);
  const candidates = DAIKIN_MXF_OUTDOOR.filter(ou =>
    ou.zones >= n && totalKW <= ou.kw * 1.30
  );
  if (!candidates.length) return null;

  const outdoor = candidates.sort((a, b) => a.pvp - b.pvp)[0];
  const indoorTotal = indoorUnits.reduce((s, { unit }) => s + unit.pvp, 0);
  return { outdoor, indoorUnits, indoorTotal, total: outdoor.pvp + indoorTotal, multiSystemType: 'sensira' };
}

// Calcula o melhor multisplit possível (forçando todas as divisões em multi)
// Usado para sugestão permanente nos resultados
function calcBestForcedMulti(brand, rooms) {
  const validRooms = rooms.filter(r => parseFloat(r.areaM2) > 0);
  if (validRooms.length < 2) return null;

  const roomsWT = validRooms.map(r => ({ ...r, tier: btuToTier(calcBTU(r)), useMulti: true, multiType: 'standard' }));

  // Daikin: tentar Sensira Multi primeiro se tudo ≤ 12k e 2-3 divisões
  if (brand === 'daikin' && roomsWT.length <= 3 && roomsWT.every(r => r.tier <= 12000)) {
    const sensiraResult = calcSensiraMulti(roomsWT);
    if (sensiraResult) return { ...sensiraResult, multiSystemType: 'sensira' };
  }

  // Standard multi
  return calcBrandMulti(brand, roomsWT);
}

// ============================================================
// 6. CÁLCULO DO SISTEMA TOTAL
// ============================================================
function calcSystemConfig(brand, rooms) {
  const validRooms = rooms.filter(r => parseFloat(r.areaM2) > 0);
  if (!validRooms.length) return null;

  const roomsWithTier = validRooms.map(r => ({
    ...r, tier: btuToTier(calcBTU(r))
  }));

  const result = {
    total: 0,
    monoRooms: [],  // { room, seriesKey, tier, price, model }
    multiRooms: [], // { room, unit } — just indoor
    outdoor: null,
  };

  if (rooms.length === 1) {
    // Single room → always monosplit
    const room = roomsWithTier[0];
    const seriesKey = room.series || getCheapestMonoSeries(brand, room.tier);
    const price = getMonoPrice(brand, seriesKey, room.tier, room.color);
    const catalog = getBrandCatalog(brand);
    const model = seriesKey && catalog[seriesKey] ? (catalog[seriesKey].models[room.tier] || '') : '';
    result.monoRooms.push({ room, seriesKey, tier: room.tier, price, model });
    result.total = price;
    return result;
  }

  // Multiple rooms
  const multiRoomsWT = roomsWithTier.filter(r => r.useMulti);
  const monoRoomsWT  = roomsWithTier.filter(r => !r.useMulti);

  // Process mono rooms
  monoRoomsWT.forEach(room => {
    const seriesKey = room.series || getCheapestMonoSeries(brand, room.tier);
    const price = getMonoPrice(brand, seriesKey, room.tier, room.color);
    const catalog = getBrandCatalog(brand);
    const model = seriesKey && catalog[seriesKey] ? (catalog[seriesKey].models[room.tier] || '') : '';
    result.monoRooms.push({ room, seriesKey, tier: room.tier, price, model });
    result.total += price || 0;
  });

  // Process multi rooms
  if (multiRoomsWT.length >= 2) {
    // Usar tipo efectivo (respeita escolha explícita ou auto-calcula)
    const allSensira = brand === 'daikin' &&
      multiRoomsWT.every(r => getEffectiveMultiType(r, rooms) === 'sensira');

    let multiResult = null;
    if (allSensira) {
      multiResult = calcSensiraMulti(multiRoomsWT);
    }
    if (!multiResult) {
      multiResult = calcBrandMulti(brand, multiRoomsWT);
    }
    if (multiResult) {
      result.multiRooms = multiResult.indoorUnits;
      result.outdoor = multiResult.outdoor;
      result.total += multiResult.total;
      result.multiSystemType = multiResult.multiSystemType || 'standard';
    }
  } else if (multiRoomsWT.length === 1) {
    // Only 1 multi room → treat as mono
    const room = multiRoomsWT[0];
    const seriesKey = getCheapestMonoSeries(brand, room.tier);
    const price = getMonoPrice(brand, seriesKey, room.tier, 'white');
    const catalog = getBrandCatalog(brand);
    const model = seriesKey && catalog[seriesKey] ? (catalog[seriesKey].models[room.tier] || '') : '';
    result.monoRooms.push({ room, seriesKey, tier: room.tier, price, model, wasMulti: true });
    result.total += price || 0;
  }

  return result;
}

function calcAltBrandConfig(brand, rooms) {
  // Use cheapest possible for this brand (always multi if 2+ rooms)
  const validRooms = rooms.filter(r => parseFloat(r.areaM2) > 0);
  if (!validRooms.length) return null;

  const roomsWT = validRooms.map(r => ({ ...r, tier: btuToTier(calcBTU(r)), useMulti: true }));

  if (roomsWT.length === 1) {
    const room = roomsWT[0];
    const seriesKey = getCheapestMonoSeries(brand, room.tier);
    if (!seriesKey) return null;
    const price = getMonoPrice(brand, seriesKey, room.tier, 'white');
    const catalog = getBrandCatalog(brand);
    const seriesLabel = catalog[seriesKey] ? catalog[seriesKey].label : seriesKey;
    return { total: price, system: 'mono', seriesLabel, rooms: [{ room, seriesKey, tier: room.tier, price }] };
  }

  const multiResult = calcBrandMulti(brand, roomsWT);
  if (multiResult) {
    const seriesLabel = brand === 'daikin' ? 'FTXM-A' : (brand === 'bosch' ? 'CL3000i Mural' : 'ARTIC Plus');
    return {
      total: multiResult.total,
      system: 'multi',
      seriesLabel,
      indoorUnits: multiResult.indoorUnits,
      outdoor: multiResult.outdoor,
      indoorTotal: multiResult.indoorTotal,
    };
  }

  // Fallback: mono each room
  let total = 0;
  const rows = [];
  for (const room of roomsWT) {
    const seriesKey = getCheapestMonoSeries(brand, room.tier);
    if (!seriesKey) return null;
    const price = getMonoPrice(brand, seriesKey, room.tier, 'white');
    total += price;
    rows.push({ room, seriesKey, tier: room.tier, price });
  }
  const seriesLabel = getCheapestMonoSeries(brand, roomsWT[0].tier) ?
    getBrandCatalog(brand)[getCheapestMonoSeries(brand, roomsWT[0].tier)]?.label : '';
  return { total, system: 'mono-each', seriesLabel, rooms: rows };
}

// ============================================================
// 7. GESTÃO DE DIVISÕES
// ============================================================
function addRoom() {
  if (state.rooms.length >= 5) return;
  // Collapse all existing rooms
  state.rooms.forEach(r => { r.expanded = false; });
  const wasOne = state.rooms.length === 1;
  const room = newRoom(state.nextRoomId++);
  state.rooms.push(room);
  // Transitioning from 1→2 rooms: reset rooms that weren't explicitly set to individual
  // (a series picked in single-room context is just a preference, not an opt-out of multisplit)
  if (wasOne) {
    state.rooms.forEach(r => {
      if (!r.forceIndividual) {
        r.useMulti          = true;
        r.series            = null;
        r.multiTypeExplicit = false; // re-calcular automaticamente com base nos tiers reais
      }
    });
  }
  renderRooms(); // re-renderiza todos os quartos (inclui re-cálculo do tipo multi)
  updateLiveTotal();
  updateResultsVisibility();
  // Scroll to new room
  setTimeout(() => {
    const el = document.getElementById('room-' + room.id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

function removeRoom(id, event) {
  if (event) event.stopPropagation();
  if (state.rooms.length <= 1) return;
  state.rooms = state.rooms.filter(r => r.id !== id);
  // Back to single room: mono only, clear forceIndividual so next add defaults to multi
  if (state.rooms.length === 1) {
    state.rooms[0].useMulti = false;
    state.rooms[0].forceIndividual = false;
  }
  renderRooms();
  updateLiveTotal();
  renderResults();
}

function toggleRoom(id) {
  const room = state.rooms.find(r => r.id === id);
  if (!room) return;
  room.expanded = !room.expanded;
  const el = document.getElementById('room-' + id);
  if (el) el.classList.toggle('expanded', room.expanded);
  const chevron = el && el.querySelector('.sim-room__chevron');
  if (chevron) chevron.style.transform = room.expanded ? 'rotate(180deg)' : '';
}

function changeBrand(brand) {
  state.brand = brand;
  // Reset series selection for all rooms (they may not be available)
  state.rooms.forEach(r => { r.series = null; r.color = 'white'; });
  // Update brand buttons
  document.querySelectorAll('.sim-brand-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.brand === brand);
  });
  // Re-render model sections
  state.rooms.forEach(r => renderRoomModelSection(r.id));
  updateLiveTotal();
  renderResults();
}

// ============================================================
// 8. FIELD UPDATES (called on input)
// ============================================================
function updateRoomField(id, field, value) {
  const room = state.rooms.find(r => r.id === id);
  if (!room) return;

  // Determinar se o campo afecta o BTU (e portanto o tipo de multisplit de outros quartos)
  const affectsBTU = ['areaM2', 'heightM', 'windows', 'orientation', 'type', 'openToKitchen'].includes(field);

  if (field === 'areaM2' || field === 'heightM') {
    room[field] = parseFloat(value) || 0;
  } else if (field === 'windows') {
    room.windows = parseInt(value) || 0;
    // Show/hide orientation select
    const orientRow = document.getElementById('orient-row-' + id);
    if (orientRow) orientRow.style.display = room.windows > 0 ? '' : 'none';
  } else if (field === 'openToKitchen') {
    room.openToKitchen = !!value;
  } else {
    room[field] = value;
  }

  updateRoomHeader(id);
  // Se afecta BTU, re-renderizar TODOS os quartos multi (getEffectiveMultiType pode mudar)
  if (affectsBTU) {
    state.rooms.forEach(r => {
      if (r.id !== id && r.useMulti) renderRoomModelSection(r.id);
    });
  }
  renderRoomModelSection(id);
  updateLiveTotal();
  renderResults();
}

function setRoomType(id, type, btnEl) {
  const room = state.rooms.find(r => r.id === id);
  if (!room) return;
  room.type = type;
  // Toggle active on buttons
  const body = document.getElementById('room-body-' + id);
  if (body) {
    body.querySelectorAll('.sim-rf-type').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    // Show/hide open-space toggle for sala
    const openSpace = document.getElementById('openspace-' + id);
    if (openSpace) openSpace.style.display = type === 'sala' ? '' : 'none';
  }
  updateRoomHeader(id);
  // Tipo de divisão afecta BTU → re-renderizar outros quartos multi
  state.rooms.forEach(r => { if (r.id !== id && r.useMulti) renderRoomModelSection(r.id); });
  renderRoomModelSection(id);
  updateLiveTotal();
  renderResults();
}

function setRoomColor(id, color) {
  const room = state.rooms.find(r => r.id === id);
  if (!room) return;
  room.color = color;
  // Update color buttons in the room card
  const container = document.getElementById('rm-colors-' + id);
  if (container) {
    container.querySelectorAll('.sim-color-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === color);
    });
  }
  // Update price display in room card
  renderRoomModelSection(id);
  updateLiveTotal();
  renderResults();
}

// ============================================================
// 9. RENDERING — ROOMS
// ============================================================
function renderRooms() {
  const list = document.getElementById('sim-rooms-list');
  if (!list) return;
  list.innerHTML = state.rooms.map(room => renderRoomHTML(room)).join('');
  // Update add button
  const addBtn = document.getElementById('sim-add-btn');
  if (addBtn) addBtn.disabled = state.rooms.length >= 5;
}

function renderRoomHTML(room) {
  const tier = room.areaM2 ? btuToTier(calcBTU(room)) : 0;
  const hasData = parseFloat(room.areaM2) > 0;
  const isMulti = state.rooms.length > 1 && room.useMulti;

  // Build meta text
  let metaText = 'Preencha os dados da divisão';
  let hasMeta = false;
  if (hasData && tier > 0) {
    const seriesKey = isMulti ? null : (room.series || getCheapestMonoSeries(state.brand, tier));
    let modelName = '';
    if (isMulti) {
      const unit = getMultiIndoorUnit(state.brand, tier);
      modelName = unit ? unit.model : '';
    } else if (seriesKey) {
      const catalog = getBrandCatalog(state.brand);
      modelName = catalog[seriesKey] ? catalog[seriesKey].label : seriesKey;
    }
    let price = 0;
    if (isMulti) {
      const unit = getMultiIndoorUnit(state.brand, tier);
      price = unit ? unit.pvp : 0;
    } else if (seriesKey) {
      price = getMonoPrice(state.brand, seriesKey, tier, room.color);
    }
    metaText = `${room.areaM2}m² · ${btuLabel(tier)}${modelName ? ' · ' + modelName : ''}${price ? ' · ' + fmtPrice(price) : ''}`;
    hasMeta = true;
  }

  const expanded = room.expanded ? 'expanded' : '';
  const chevronRotate = room.expanded ? 'style="transform:rotate(180deg)"' : '';
  const canDelete = state.rooms.length > 1;

  return `
<div class="sim-room ${expanded}" id="room-${room.id}">
  <div class="sim-room__header" onclick="toggleRoom(${room.id})">
    <div class="sim-room__num ${hasData && tier > 0 ? 'complete' : ''}">${room.id}</div>
    <div class="sim-room__summary">
      <span class="sim-room__name" id="rname-${room.id}">${escHtml(room.name)}</span>
      <span class="sim-room__meta${hasMeta ? ' has-data' : ''}" id="rmeta-${room.id}">${escHtml(metaText)}</span>
    </div>
    <div class="sim-room__controls">
      ${canDelete ? `<button class="sim-room__del" onclick="removeRoom(${room.id}, event)" title="Remover" aria-label="Remover divisão">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>` : ''}
      <svg class="sim-room__chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" ${chevronRotate}><polyline points="6 9 12 15 18 9"/></svg>
    </div>
  </div>
  <div class="sim-room__body" id="room-body-wrap-${room.id}">
    <div class="sim-room__body-inner" id="room-body-${room.id}">
      ${renderRoomForm(room)}
      ${renderRoomModelCard(room)}
    </div>
  </div>
</div>`;
}

function renderRoomForm(room) {
  const types = ['quarto', 'sala', 'cozinha', 'outro'];
  const typeLabels = { quarto: 'Quarto', sala: 'Sala', cozinha: 'Cozinha', outro: 'Outro' };
  const showOrient = parseInt(room.windows) > 0;
  const showOpenSpace = room.type === 'sala';

  return `
<div class="sim-rf">
  <div class="sim-rf-row" style="margin-top:16px">
    <label>Nome da divisão</label>
    <input type="text" value="${escHtml(room.name)}"
      oninput="updateRoomField(${room.id},'name',this.value);document.getElementById('rname-${room.id}').textContent=this.value">
  </div>
  <div class="sim-rf-row">
    <label>Tipo de divisão</label>
    <div class="sim-rf-types">
      ${types.map(t => `<button class="sim-rf-type${room.type === t ? ' active' : ''}" onclick="setRoomType(${room.id},'${t}',this)">${typeLabels[t]}</button>`).join('')}
    </div>
  </div>
  ${showOpenSpace ? `<div class="sim-rf-openspace" id="openspace-${room.id}">
    <input type="checkbox" ${room.openToKitchen ? 'checked' : ''} onchange="updateRoomField(${room.id},'openToKitchen',this.checked)">
    Sala aberta para cozinha (+3.000 BTU)
  </div>` : `<div id="openspace-${room.id}" style="display:none"></div>`}
  <div class="sim-rf-grid">
    <div class="sim-rf-row">
      <label>Área (m²)</label>
      <input type="number" min="1" max="300" step="0.5" placeholder="ex: 15"
        value="${room.areaM2 || ''}"
        oninput="updateRoomField(${room.id},'areaM2',this.value)">
    </div>
    <div class="sim-rf-row">
      <label>Altura (m)</label>
      <input type="number" min="2" max="6" step="0.1" value="${room.heightM}"
        oninput="updateRoomField(${room.id},'heightM',this.value)">
    </div>
    <div class="sim-rf-row">
      <label>Janelas</label>
      <select onchange="updateRoomField(${room.id},'windows',this.value)">
        ${[0,1,2,3].map(n => `<option value="${n}" ${parseInt(room.windows)===n?'selected':''}>${n===3?'3+':n}</option>`).join('')}
      </select>
    </div>
    <div class="sim-rf-row" id="orient-row-${room.id}" style="${showOrient ? '' : 'display:none'}">
      <label>Exposição solar</label>
      <select onchange="updateRoomField(${room.id},'orientation',this.value)">
        ${['sul','norte','este','oeste'].map(o => `<option value="${o}" ${room.orientation===o?'selected':''}>${o.charAt(0).toUpperCase()+o.slice(1)}</option>`).join('')}
      </select>
    </div>
  </div>
</div>`;
}

function renderRoomModelCard(room) {
  const tier = room.areaM2 ? btuToTier(calcBTU(room)) : 0;
  const hasData = parseFloat(room.areaM2) > 0 && tier > 0;
  const multiCount = state.rooms.filter(r => r.useMulti).length;
  const isMulti = multiCount >= 2 && room.useMulti;

  if (!hasData) {
    return `<div class="sim-rm" id="rm-${room.id}">
      <div class="sim-rm__label">Modelo sugerido</div>
      <div class="sim-rm__empty">Preencha a área para ver o modelo sugerido</div>
    </div>`;
  }

  let imgSrc = '', seriesName = '', modelNum = '', price = 0, badgeClass = 'multisplit', badgeText = 'Multisplit';

  if (isMulti) {
    let unit = null;
    // Usar tipo efectivo (auto ou explícito via picker)
    const effectiveType = getEffectiveMultiType(room, state.rooms);
    if (state.brand === 'daikin' && effectiveType === 'sensira' && tier <= 12000) {
      unit = DAIKIN_SENSIRA_MULTI_INDOOR.find(u => u.btu >= tier) || null;
      if (unit) {
        price = unit.pvp;
        modelNum = unit.model;
        seriesName = 'Sensira ' + unit.model;
        badgeText = 'Multisplit Budget';
        badgeClass = 'multisplit';
      }
    }
    if (!unit) {
      unit = getMultiIndoorUnit(state.brand, tier);
      if (unit) {
        price = unit.pvp;
        modelNum = unit.model;
        seriesName = unit.model;
        badgeText = 'Multisplit Padrão';
        badgeClass = 'multisplit';
      }
    }
    if (unit) {
      imgSrc = state.brand === 'daikin' ? 'assets/products/daikin-sensira-1.webp' :
               state.brand === 'bosch'  ? 'assets/products/bosch-3000i-1.webp' :
                                          'assets/products/daitsu-artic-plus-1.webp';
    }
  } else {
    const seriesKey = room.series || getCheapestMonoSeries(state.brand, tier);
    const catalog = getBrandCatalog(state.brand);
    const series = seriesKey && catalog[seriesKey];
    if (series) {
      price = getMonoPrice(state.brand, seriesKey, tier, room.color);
      modelNum = series.models[tier] || '';
      seriesName = series.label;
      imgSrc = getSeriesImage(state.brand, seriesKey, room.color);
      badgeText = 'Sistema Individual';
      badgeClass = 'individual';
    }
  }

  const hasColors = !isMulti && room.series && (() => {
    const catalog = getBrandCatalog(state.brand);
    return catalog[room.series] && !!catalog[room.series].colorPrices;
  })();

  return `<div class="sim-rm" id="rm-${room.id}">
    <div class="sim-rm__label">Modelo sugerido · ${btuLabel(tier)}</div>
    <div class="sim-rm__content">
      <img src="${imgSrc}" alt="${escHtml(seriesName)}" class="sim-rm__img" onerror="this.style.visibility='hidden'">
      <div class="sim-rm__info">
        <div class="sim-rm__series">${escHtml(seriesName)}</div>
        <div class="sim-rm__btu">${modelNum ? modelNum + ' · ' : ''}${kwLabel(tier)}</div>
        <span class="sim-rm__type-badge ${badgeClass === 'individual' ? 'individual' : ''}">${badgeText}</span>
      </div>
      <div class="sim-rm__price">${fmtPrice(price)}</div>
    </div>
    ${hasColors ? `<div class="sim-rm__colors" id="rm-colors-${room.id}">
      <span class="sim-rm__colors-label">Cor:</span>
      ${['white','silver','black'].map(c => `<button class="sim-color-btn${room.color===c?' active':''}" data-color="${c}" onclick="setRoomColor(${room.id},'${c}')" title="${c==='white'?'Branco':c==='silver'?'Prateado':'Preto'}"></button>`).join('')}
    </div>` : ''}
    <div class="sim-rm__change">
      <button class="sim-rm__change-btn" onclick="openModelPicker(${room.id})">Mudar modelo →</button>
    </div>
  </div>`;
}

function updateRoomHeader(id) {
  const room = state.rooms.find(r => r.id === id);
  if (!room) return;
  const tier = room.areaM2 ? btuToTier(calcBTU(room)) : 0;
  const hasData = parseFloat(room.areaM2) > 0 && tier > 0;
  const isMulti = state.rooms.length > 1 && room.useMulti;

  const numEl = document.querySelector(`#room-${id} .sim-room__num`);
  if (numEl) numEl.classList.toggle('complete', hasData);

  const metaEl = document.getElementById('rmeta-' + id);
  if (!metaEl) return;

  if (!hasData) {
    metaEl.textContent = 'Preencha os dados da divisão';
    metaEl.classList.remove('has-data');
    return;
  }

  const multiCountH = state.rooms.filter(r => r.useMulti).length;
  const isMultiH = multiCountH >= 2 && room.useMulti;

  let modelName = '';
  let price = 0;
  if (isMultiH) {
    const unit = getMultiIndoorUnit(state.brand, tier);
    if (unit) { modelName = unit.model; price = unit.pvp; }
  } else {
    const seriesKey = room.series || getCheapestMonoSeries(state.brand, tier);
    const catalog = getBrandCatalog(state.brand);
    if (seriesKey && catalog[seriesKey]) {
      modelName = catalog[seriesKey].label;
      price = getMonoPrice(state.brand, seriesKey, tier, room.color);
    }
  }

  metaEl.textContent = `${room.areaM2}m² · ${btuLabel(tier)}${modelName ? ' · ' + modelName : ''}${price ? ' · ' + fmtPrice(price) : ''}`;
  metaEl.classList.add('has-data');
}

function renderRoomModelSection(id) {
  const room = state.rooms.find(r => r.id === id);
  if (!room) return;
  const el = document.getElementById('rm-' + id);
  if (!el) return;
  el.outerHTML = renderRoomModelCard(room);
  updateRoomHeader(id);
}

// ============================================================
// 10. MODEL PICKER
// ============================================================
function openModelPicker(roomId) {
  const room = state.rooms.find(r => r.id === roomId);
  if (!room) return;
  state.modelPickerRoomId = roomId;
  state.pickerColors = {};
  state.pickerColors[roomId] = room.color || 'white';

  const tier = btuToTier(calcBTU(room));
  const el = document.getElementById('smp-overlay');
  const titleEl = document.getElementById('smp-title');
  const subEl = document.getElementById('smp-sub');
  const gridEl = document.getElementById('smp-grid');

  if (!el) return;
  if (titleEl) titleEl.textContent = 'Escolha o modelo para ' + room.name;
  if (subEl) subEl.textContent = `Potência necessária: ${btuLabel(tier)} (${kwLabel(tier)}) · Marca: ${capFirst(state.brand)}`;
  if (gridEl) gridEl.innerHTML = buildPickerCards(room, tier);

  el.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function buildPickerCards(room, tier) {
  const isMultiContext = state.rooms.length > 1;
  const catalog = getBrandCatalog(state.brand);

  // Recolher todos os preços para determinar âncora (mínimo global)
  let anchorPrice = Infinity;

  const allOptions = []; // { type, seriesKey, price, ... }

  if (isMultiContext) {
    // Opção Sensira Multi (Daikin, ≤12k BTU, TODOS os quartos multi com MESMO tier)
    if (state.brand === 'daikin' && tier <= 12000) {
      const otherMultiRooms = state.rooms.filter(r => r.id !== room.id && r.useMulti && parseFloat(r.areaM2) > 0);
      const otherTiers = otherMultiRooms.map(r => btuToTier(calcBTU(r)));
      const sensiraOk = otherTiers.length > 0 &&
        otherTiers.every(t => t === tier) &&
        (1 + otherTiers.length) <= 3;
      if (sensiraOk) {
        const su = DAIKIN_SENSIRA_MULTI_INDOOR.find(u => u.btu >= tier);
        if (su) {
          allOptions.push({ type: 'sensira_multi', key: '__sensira_multi__', price: su.pvp, unit: su });
          anchorPrice = Math.min(anchorPrice, su.pvp);
        }
      }
    }
    // Opção Standard Multi (FTXM / CL3000i / ARTIC Plus)
    const stdu = getMultiIndoorUnit(state.brand, tier);

    if (stdu) {
      allOptions.push({ type: 'multi', key: '__multi__', price: stdu.pvp, unit: stdu });
      anchorPrice = Math.min(anchorPrice, stdu.pvp);
    }
  }

  // Opções mono (kit completo)
  const monoOpts = [];
  for (const [key, series] of Object.entries(catalog)) {
    if (series.maxBTU && tier > series.maxBTU) continue;
    const basePrice = series.prices[tier];
    if (basePrice === undefined) continue;
    anchorPrice = Math.min(anchorPrice, basePrice);
    monoOpts.push({ key, series, basePrice });
  }
  monoOpts.sort((a, b) => a.basePrice - b.basePrice);

  let html = '';

  // --- Renderizar multi options ---
  allOptions.forEach(opt => {
    if (opt.type === 'sensira_multi') {
      const su = opt.unit;
      const isSelected = room.useMulti && getEffectiveMultiType(room, state.rooms) === 'sensira';
      const img = 'assets/products/daikin-sensira-1.webp';
      const diff = su.pvp - anchorPrice;
      html += pickerCard({
        id: room.id, type: 'sensira_multi', seriesKey: '__sensira_multi__',
        badge: 'BUDGET', badgeClass: 'multi sensira',
        img, series: 'Sensira Multisplit (CTXF)',
        specs: `${btuLabel(su.btu)} · ${su.kw} kW · ${su.model}`,
        price: su.pvp,
        priceNote: 'Interior CTXF · exterior MXF partilhado',
        diff, isSelected, color: 'white',
        features: ['R-32', 'Inverter', 'Série económica'],
      });
    } else if (opt.type === 'multi') {
      const stdu = opt.unit;
      const isSelected = room.useMulti && getEffectiveMultiType(room, state.rooms) !== 'sensira';
      const img = state.brand === 'daikin' ? 'assets/products/daikin-perfera-1.webp' :
                  state.brand === 'bosch'  ? 'assets/products/bosch-3000i-1.webp' :
                                             'assets/products/daitsu-artic-plus-1.webp';
      const diff = stdu.pvp - anchorPrice;
      html += pickerCard({
        id: room.id, type: 'multi', seriesKey: '__multi__',
        badge: 'PADRÃO', badgeClass: 'multi',
        img, series: stdu.model,
        specs: `${btuLabel(stdu.btu)} · ${stdu.kw} kW`,
        price: stdu.pvp,
        priceNote: 'Interior · exterior partilhado',
        diff, isSelected, color: 'white',
      });
    }
  });

  // --- Renderizar mono options ---
  monoOpts.forEach(({ key, series, basePrice }) => {
    const isSelected = !room.useMulti && room.series === key;
    const pickerColor = state.pickerColors[room.id] || 'white';
    let price = basePrice;
    let img = series.image || '';

    if (series.colorPrices) {
      price = series.colorPrices[pickerColor]?.[tier] || basePrice;
      if (series.images && !Array.isArray(series.images)) {
        img = series.images[pickerColor]?.[0] || series.image || '';
      }
    }

    const diff = price - anchorPrice;
    const colorPicker = series.colorPrices ? buildColorPickerInCard(room.id, key, pickerColor) : '';

    html += pickerCard({
      id: room.id, type: 'mono', seriesKey: key,
      badge: isMultiContext ? 'INDIVIDUAL' : null,
      badgeClass: 'individual',
      img, series: series.label,
      specs: `${btuLabel(tier)} · ${BTU_TO_KW[tier]} kW · ${series.energyCool || 'A++'} arref.`,
      price, priceNote: 'Kit completo (inclui exterior)',
      diff, isSelected, color: pickerColor,
      colorPicker,
      features: series.features ? series.features.slice(0, 3) : [],
    });
  });

  return html;
}

function pickerCard({ id, type, seriesKey, badge, badgeClass, img, series, specs, price, priceNote, diff, isSelected, colorPicker, features }) {
  let diffText;
  if (diff === 0) {
    diffText = `<div class="smp-card__diff base"><span class="smp-diff-tag base">★ Mais económico</span></div>`;
  } else {
    diffText = `<div class="smp-card__diff"><span class="smp-diff-tag plus">+${fmtPrice(diff)}</span> <span class="smp-diff-vs">vs. opção base</span></div>`;
  }

  const badgeHtml = badge ? `<div class="smp-card__badge ${badgeClass || ''}">${badge}</div>` : '';
  const checkHtml = isSelected ? `<div class="smp-card__check">✓</div>` : '';
  const featHtml  = features && features.length ? `<div class="smp-card__specs" style="margin-top:4px">${features.join(' · ')}</div>` : '';

  // onclick — color is read from state.pickerColors inside selectModel
  let onClick;
  if (type === 'sensira_multi') onClick = `selectModel(${id},'sensira_multi','')`;
  else if (type === 'multi')    onClick = `selectModel(${id},'multi','')`;
  else                          onClick = `selectModel(${id},'mono','${seriesKey}')`;

  return `
<div class="smp-card${isSelected ? ' selected' : ''}" data-key="${seriesKey}" onclick="${onClick}">
  ${badgeHtml}${checkHtml}
  <img src="${img}" alt="${series}" class="smp-card__img" onerror="this.style.visibility='hidden'">
  <div class="smp-card__body">
    <div class="smp-card__series">${series}</div>
    <div class="smp-card__specs">${specs}</div>
    ${featHtml}
    <div class="smp-card__price">${fmtPrice(price)}</div>
    <div class="smp-card__price-note">${priceNote}</div>
    ${diffText}
  </div>
  ${colorPicker}
</div>`;
}

function buildColorPickerInCard(roomId, seriesKey, activeColor) {
  const colors = ['white', 'silver', 'black'];
  const labels = { white: 'Branco', silver: 'Prateado', black: 'Preto' };
  return `<div class="smp-card__colors">
    <span class="smp-card__color-label">Cor:</span>
    ${colors.map(c => `<button class="sim-color-btn${c === activeColor ? ' active smp-card__color-active' : ''}" data-color="${c}"
      onclick="event.stopPropagation();setPickerColor(${roomId},'${seriesKey}','${c}',this)" title="${labels[c]}"></button>`).join('')}
  </div>`;
}

function setPickerColor(roomId, seriesKey, color, btnEl) {
  state.pickerColors[roomId] = color;
  // Update color buttons in the card
  const card = btnEl && btnEl.closest('.smp-card');
  if (card) {
    card.querySelectorAll('.sim-color-btn').forEach(b => b.classList.remove('active', 'smp-card__color-active'));
    btnEl.classList.add('active', 'smp-card__color-active');
  }
  // Update price in card
  const room = state.rooms.find(r => r.id === roomId);
  if (!room) return;
  const tier = btuToTier(calcBTU(room));
  const catalog = getBrandCatalog(state.brand);
  const series = catalog[seriesKey];
  if (series && series.colorPrices && card) {
    const price = series.colorPrices[color]?.[tier] || series.prices[tier] || 0;
    const priceEl = card.querySelector('.smp-card__price');
    if (priceEl) priceEl.textContent = fmtPrice(price);
    // Update image
    const imgEl = card.querySelector('.smp-card__img');
    if (imgEl && series.images && !Array.isArray(series.images)) {
      imgEl.src = series.images[color]?.[0] || series.image || '';
    }
  }
}

function selectModel(roomId, type, seriesKey) {
  const room = state.rooms.find(r => r.id === roomId);
  if (!room) return;

  const pickerColor = state.pickerColors[roomId] || 'white';

  if (type === 'sensira_multi') {
    room.useMulti            = true;
    room.multiType           = 'sensira';
    room.multiTypeExplicit   = true;  // utilizador escolheu explicitamente
    room.series              = null;
    room.color               = 'white';
    room.forceIndividual     = false;
  } else if (type === 'multi') {
    room.useMulti            = true;
    room.multiType           = 'standard';
    room.multiTypeExplicit   = true;  // utilizador escolheu explicitamente
    room.series              = null;
    room.color               = 'white';
    room.forceIndividual     = false;
  } else {
    room.useMulti            = false;
    room.multiTypeExplicit   = false; // ao ir para individual, reset ao auto
    room.multiType           = 'standard';
    room.series              = seriesKey || null;
    room.color               = pickerColor;
    room.forceIndividual     = state.rooms.length > 1;
  }

  closeModelPicker();
  renderRoomModelSection(room.id);
  updateRoomHeader(room.id);
  updateLiveTotal();
  renderResults();
}

function closeModelPicker() {
  const el = document.getElementById('smp-overlay');
  if (el) el.style.display = 'none';
  document.body.style.overflow = '';
  state.modelPickerRoomId = null;
}

function closeMPIfOuter(event) {
  if (event.target === event.currentTarget) closeModelPicker();
}

// ============================================================
// 11. LIVE TOTAL (sticky bar)
// ============================================================
function updateLiveTotal() {
  const el = document.getElementById('sim-sticky-total');
  if (!el) return;

  const validRooms = state.rooms.filter(r => parseFloat(r.areaM2) > 0);
  if (!validRooms.length) {
    el.textContent = '€ —';
    return;
  }

  const config = calcSystemConfig(state.brand, state.rooms);
  if (!config || !config.total) {
    el.textContent = '€ —';
    return;
  }
  el.textContent = fmtPrice(config.total);
}

// ============================================================
// 12. RESULTS
// ============================================================
function updateResultsVisibility() {
  const valid = state.rooms.some(r => parseFloat(r.areaM2) > 0);
  const resultsEl = document.getElementById('sim-results');
  const actionsEl = document.getElementById('sim-actions');
  if (resultsEl) resultsEl.style.display = valid ? '' : 'none';
  if (actionsEl) actionsEl.style.display = valid ? '' : 'none';
}

function renderResults() {
  updateResultsVisibility();
  const config = calcSystemConfig(state.brand, state.rooms);
  const contentEl = document.getElementById('sim-results-content');
  const altEl = document.getElementById('sim-alt-brands');
  if (!contentEl) return;

  if (!config || !config.total) {
    contentEl.innerHTML = '';
    if (altEl) altEl.innerHTML = '';
    return;
  }

  // Calcular sugestões multisplit (sempre, para 2+ divisões com alguma individual)
  const validRooms = state.rooms.filter(r => parseFloat(r.areaM2) > 0);
  const hasIndividual = config.monoRooms.length > 0 && validRooms.length >= 2;
  const multiSuggestions = [];

  if (hasIndividual) {
    const roomsWT = validRooms.map(r => ({ ...r, tier: btuToTier(calcBTU(r)), useMulti: true, multiType: 'standard' }));

    // Opção 1: Sensira CTXF + MXF (Daikin, ≤ 12k BTU, 2-3 divisões)
    if (state.brand === 'daikin' && roomsWT.length >= 2 && roomsWT.length <= 3 &&
        roomsWT.every(r => r.tier <= 12000)) {
      const sr = calcSensiraMulti(roomsWT);
      if (sr) multiSuggestions.push({ ...sr, multiSystemType: 'sensira' });
    }

    // Opção 2: Standard FTXM + MXM (ou Bosch / Daitsu padrão)
    const std = calcBrandMulti(state.brand, roomsWT);
    if (std) multiSuggestions.push({ ...std, multiSystemType: 'standard' });
  }

  contentEl.innerHTML = buildResultsHTML(config, multiSuggestions);
  if (altEl) altEl.innerHTML = buildAltBrandsHTML();
}

function buildMultiSuggestBox(ms) {
  const isSensira = ms.multiSystemType === 'sensira';
  const msLabel = isSensira
    ? 'Sensira Budget · CTXF interior + MXF exterior'
    : 'Padrão · FTXM interior + MXM exterior';
  const msTag = isSensira ? '💸 Budget' : '⭐ Padrão';
  let msRows = '';
  (ms.indoorUnits || []).forEach(({ room, unit }) => {
    msRows += `<div class="sim-ms-row"><span>${escHtml(room.name)} — ${unit.model}</span><span>${fmtPrice(unit.pvp)}</span></div>`;
  });
  if (ms.outdoor) {
    const ou = ms.outdoor;
    msRows += `<div class="sim-ms-row"><span>Exterior partilhado — ${ou.model} (${ou.zones} zonas · ${ou.kw} kW)</span><span>${fmtPrice(ou.pvp)}</span></div>`;
  }
  return `
<div class="sim-multi-suggest${isSensira ? '' : ' standard'}">
  <div class="sim-multi-suggest__header">
    <span class="sim-multi-suggest__icon">💡</span>
    <div>
      <div class="sim-multi-suggest__title">Alternativa Multisplit <span class="sim-ms-tag">${msTag}</span></div>
      <div class="sim-multi-suggest__sub">Mesmo com modelos diferentes, pode instalar uma unidade exterior partilhada · ${msLabel}</div>
    </div>
    <div class="sim-multi-suggest__total">${fmtPrice(ms.total)}</div>
  </div>
  <div class="sim-multi-suggest__rows">${msRows}</div>
  <div class="sim-multi-suggest__note">IVA incluído · Excl. instalação · Peça-nos orçamento para confirmar compatibilidade</div>
</div>`;
}

function buildResultsHTML(config, multiSuggestions) {
  const brandName = capFirst(state.brand);
  const brandImg = `assets/logo-${state.brand}.png`;

  let rowsHtml = '';

  // Mono rooms
  config.monoRooms.forEach(({ room, seriesKey, tier, price, model }) => {
    const catalog = getBrandCatalog(state.brand);
    const series = seriesKey && catalog[seriesKey];
    const img = series ? getSeriesImage(state.brand, seriesKey, room.color) : '';
    const label = series ? series.label : '';
    const modelNum = model || (series && series.models[tier]) || '';
    const badgeClass = room.wasMulti ? '' : 'individual';
    const badgeText = room.wasMulti ? 'Sistema individual' : 'Sistema individual';

    rowsHtml += `
<div class="sim-res-row">
  <img src="${img}" alt="${escHtml(label)}" class="sim-res-row__img" onerror="this.style.visibility='hidden'">
  <div class="sim-res-row__info">
    <div class="sim-res-row__label">${escHtml(room.name)}</div>
    <div class="sim-res-row__model">${escHtml(label)}${modelNum ? ' · ' + modelNum : ''}</div>
    <div class="sim-res-row__specs">${btuLabel(tier)} · ${kwLabel(tier)}</div>
    <span class="sim-res-row__badge ${badgeClass}">${badgeText}</span>
  </div>
  <div class="sim-res-row__price">${fmtPrice(price)}</div>
</div>`;
  });

  // Multi indoor rooms
  config.multiRooms.forEach(({ room, unit }) => {
    const img = state.brand === 'daikin' ? 'assets/products/daikin-perfera-1.webp' :
                state.brand === 'bosch'  ? 'assets/products/bosch-3000i-1.webp' :
                                           'assets/products/daitsu-artic-plus-1.webp';
    rowsHtml += `
<div class="sim-res-row">
  <img src="${img}" alt="${unit.model}" class="sim-res-row__img" onerror="this.style.visibility='hidden'">
  <div class="sim-res-row__info">
    <div class="sim-res-row__label">${escHtml(room.name)}</div>
    <div class="sim-res-row__model">${unit.model}</div>
    <div class="sim-res-row__specs">${btuLabel(unit.btu)} · ${unit.kw} kW</div>
    <span class="sim-res-row__badge">Multisplit padrão</span>
  </div>
  <div class="sim-res-row__price">${fmtPrice(unit.pvp)}</div>
</div>`;
  });

  // Outdoor unit
  if (config.outdoor) {
    const ou = config.outdoor;
    const multiNames = config.multiRooms.map(({ room }) => room.name).join(', ');
    rowsHtml += `
<div class="sim-res-row sim-res-row--outdoor">
  <div class="sim-res-row__img" style="display:flex;align-items:center;justify-content:center;font-size:2rem;background:#f3f4f6;border-radius:8px">🏠</div>
  <div class="sim-res-row__info">
    <div class="sim-res-row__label">Unidade exterior partilhada</div>
    <div class="sim-res-row__model">${ou.model}</div>
    <div class="sim-res-row__specs">${ou.zones} zonas · ${ou.kw} kW${multiNames ? ' · para: ' + multiNames : ''}</div>
  </div>
  <div class="sim-res-row__price">${fmtPrice(ou.pvp)}</div>
</div>`;
  }

  const numRooms = config.monoRooms.length + config.multiRooms.length;
  const systemDesc = config.outdoor
    ? `${numRooms} divisões · Sistema multisplit`
    : `${numRooms} divisão${numRooms > 1 ? 's' : ''} · Monosplit`;

  // Blocos de sugestão multisplit (quando há divisões individuais)
  const multiSuggestHtml = (multiSuggestions && multiSuggestions.length)
    ? multiSuggestions.map(buildMultiSuggestBox).join('')
    : '';

  return `
<div class="sim-res-card">
  <div class="sim-res-card__header">
    <img src="${brandImg}" alt="${brandName}" class="sim-res-card__brand-img" onerror="this.style.display='none'">
    <div>
      <div class="sim-res-card__title">A sua configuração ${brandName}</div>
      <div class="sim-res-card__subtitle">${systemDesc}</div>
    </div>
  </div>
  ${rowsHtml}
  <div class="sim-res-total">
    <span class="sim-res-total__label">Total equipamentos</span>
    <span class="sim-res-total__value">${fmtPrice(config.total)}</span>
  </div>
</div>
<p class="sim-res-disclaimer">IVA incluído · Exclui instalação, suportes e materiais</p>
${multiSuggestHtml}`;
}

function buildAltBrandsHTML() {
  const allBrands = ['daikin', 'bosch', 'daitsu'];
  const altBrands = allBrands.filter(b => b !== state.brand);

  return altBrands.map(brand => {
    const cfg = calcAltBrandConfig(brand, state.rooms);
    if (!cfg || !cfg.total) return '';
    const brandName = capFirst(brand);
    const brandImg = `assets/logo-${brand}.png`;
    let systemDesc = '';
    if (cfg.system === 'multi') systemDesc = `Sistema multisplit · ${cfg.seriesLabel}`;
    else systemDesc = `Sistema individual · ${cfg.seriesLabel}`;

    let detailRows = '';
    if (cfg.system === 'multi' && cfg.indoorUnits) {
      cfg.indoorUnits.forEach(({ room, unit }) => {
        detailRows += `<div class="sim-alt-detail-row"><span>${room.name} — ${unit.model}</span><span>${fmtPrice(unit.pvp)}</span></div>`;
      });
      if (cfg.outdoor) {
        detailRows += `<div class="sim-alt-detail-row"><span>Exterior: ${cfg.outdoor.model}</span><span>${fmtPrice(cfg.outdoor.pvp)}</span></div>`;
      }
    } else if (cfg.rooms) {
      cfg.rooms.forEach(({ room, seriesKey, price }) => {
        const catalog = getBrandCatalog(brand);
        const label = catalog[seriesKey] ? catalog[seriesKey].label : seriesKey;
        detailRows += `<div class="sim-alt-detail-row"><span>${room.name} — ${label}</span><span>${fmtPrice(price)}</span></div>`;
      });
    }
    detailRows += `<div class="sim-alt-detail-total"><span>Total</span><span>${fmtPrice(cfg.total)}</span></div>`;

    return `
<div class="sim-alt-card" id="alt-${brand}">
  <div class="sim-alt-card__header" onclick="toggleAltCard('${brand}')">
    <div class="sim-alt-card__icon">💡</div>
    <div class="sim-alt-card__info">
      <div class="sim-alt-card__text">A <strong>${brandName}</strong> também resolve esta necessidade</div>
      <div class="sim-alt-card__price">desde ${fmtPrice(cfg.total)}</div>
    </div>
    <button class="sim-alt-card__toggle">Ver detalhes ▾</button>
  </div>
  <div class="sim-alt-card__detail">
    <div class="sim-alt-card__detail-inner">
      <div class="sim-alt-card__detail-content">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <img src="${brandImg}" alt="${brandName}" style="height:20px;filter:grayscale(1)" onerror="this.style.display='none'">
          <span style="font-size:.78rem;color:#6b7280">${systemDesc} · IVA inc. · Excl. instalação</span>
        </div>
        ${detailRows}
      </div>
    </div>
  </div>
</div>`;
  }).join('');
}

function toggleAltCard(brand) {
  const card = document.getElementById('alt-' + brand);
  if (card) card.classList.toggle('expanded');
}

// ============================================================
// 13. QUOTE MODAL
// ============================================================
function openQuoteModal() {
  const valid = state.rooms.some(r => parseFloat(r.areaM2) > 0);
  if (!valid) {
    alert('Preencha os dados de pelo menos uma divisão antes de solicitar orçamento.');
    return;
  }
  const el = document.getElementById('qm-overlay');
  if (el) {
    el.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const errEl = document.getElementById('qm-error');
    if (errEl) errEl.textContent = '';
  }
}

function closeQuoteModal() {
  const el = document.getElementById('qm-overlay');
  if (el) el.style.display = 'none';
  document.body.style.overflow = '';
}

function closeQMIfOuter(event) {
  if (event.target === event.currentTarget) closeQuoteModal();
}

function validateQuoteForm() {
  const name    = (document.getElementById('qm-name')?.value || '').trim();
  const contact = (document.getElementById('qm-contact')?.value || '').trim();
  const errEl   = document.getElementById('qm-error');
  if (!name && !contact) {
    if (errEl) errEl.textContent = 'Por favor indique o seu nome e contacto.';
    return null;
  }
  if (errEl) errEl.textContent = '';
  return { name: name || 'Não indicado', contact: contact || 'Não indicado' };
}

function buildQuoteText(data) {
  const brand = capFirst(state.brand);
  const config = calcSystemConfig(state.brand, state.rooms);
  let lines = [];
  lines.push(`🌡️ *Simulação ARTICOCLIMA — ${brand}*`);
  lines.push('');
  lines.push(`*Divisões configuradas:*`);

  const validRooms = state.rooms.filter(r => parseFloat(r.areaM2) > 0);
  validRooms.forEach(room => {
    const tier = btuToTier(calcBTU(room));
    const isMulti = state.rooms.length > 1 && room.useMulti;
    let modelDesc = '';
    if (isMulti) {
      const unit = getMultiIndoorUnit(state.brand, tier);
      modelDesc = unit ? `Multisplit — ${unit.model}` : 'Multisplit padrão';
    } else {
      const seriesKey = room.series || getCheapestMonoSeries(state.brand, tier);
      const catalog = getBrandCatalog(state.brand);
      const series = seriesKey && catalog[seriesKey];
      modelDesc = series ? `Individual — ${series.label}${room.color !== 'white' ? ' (' + room.color + ')' : ''}` : 'Monosplit';
    }
    lines.push(`• ${room.name}: ${room.areaM2}m² · ${btuLabel(tier)} · ${modelDesc}`);
  });

  if (config && config.outdoor) {
    lines.push(`• Exterior partilhado: ${config.outdoor.model}`);
  }

  lines.push('');
  if (config) lines.push(`💰 *Total equipamentos: ${fmtPrice(config.total)}*`);
  lines.push('_(IVA incluído · Excl. instalação e materiais)_');
  lines.push('');
  lines.push(`👤 Nome: ${data.name}`);
  lines.push(`📞 Contacto: ${data.contact}`);

  return lines.join('\n');
}

function sendQuoteWhatsApp() {
  const data = validateQuoteForm();
  if (!data) return;
  const msg = buildQuoteText(data);
  window.open('https://wa.me/351964501776?text=' + encodeURIComponent(msg), '_blank');
  closeQuoteModal();
  showConfirmBanner();
}

function sendQuoteEmail() {
  const data = validateQuoteForm();
  if (!data) return;
  const msg = buildQuoteText(data);
  const subject = encodeURIComponent('Pedido de Orçamento — Simulação ARTICOCLIMA');
  const body = encodeURIComponent(msg);
  window.location.href = `mailto:artico.clim@gmail.com?subject=${subject}&body=${body}`;
  closeQuoteModal();
  showConfirmBanner();
}

function showConfirmBanner() {
  const el = document.getElementById('sim-confirm');
  if (el) el.style.display = 'flex';
}

function dismissConfirmBanner() {
  const el = document.getElementById('sim-confirm');
  if (el) el.style.display = 'none';
}

// ============================================================
// 14. PDF (jsPDF)
// ============================================================
function generatePDF() {
  const validRooms = state.rooms.filter(r => parseFloat(r.areaM2) > 0);
  if (!validRooms.length) {
    alert('Preencha os dados de pelo menos uma divisão antes de gerar o PDF.');
    return;
  }

  if (!window.jspdf) {
    // Fallback to browser print
    window.print();
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc  = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  const addLine = () => {
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageW - margin, y);
    y += 6;
  };

  const checkPage = (needed) => {
    if (y + needed > 275) { doc.addPage(); y = 20; }
  };

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(249, 115, 22);
  doc.text('ARTICOCLIMA', margin, y);
  y += 7;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('+351 964 501 776  |  +351 963 712 752  |  artico.clim@gmail.com', margin, y);
  y += 5;
  doc.text('Simulação gerada em ' + new Date().toLocaleDateString('pt-PT'), margin, y);
  y += 8;
  addLine();

  // Title
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 28, 30);
  doc.text(`Configuração ${capFirst(state.brand)}`, margin, y);
  y += 10;

  const config = calcSystemConfig(state.brand, state.rooms);

  // Room rows
  const allRoomEntries = [];
  if (config) {
    config.monoRooms.forEach(({ room, seriesKey, tier, price, model }) => {
      const catalog = getBrandCatalog(state.brand);
      const series = seriesKey && catalog[seriesKey];
      const seriesLabel = series ? series.label : '';
      allRoomEntries.push({ name: room.name, desc: `${seriesLabel}${model ? ' · ' + model : ''}`, btu: tier, price, badge: 'Individual' });
    });
    config.multiRooms.forEach(({ room, unit }) => {
      allRoomEntries.push({ name: room.name, desc: unit.model, btu: unit.btu, price: unit.pvp, badge: 'Multisplit' });
    });
  }

  allRoomEntries.forEach(entry => {
    checkPage(22);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(28, 28, 30);
    doc.text(entry.name, margin, y);
    y += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`${entry.desc}  ·  ${btuLabel(entry.btu)}  ·  ${entry.badge}`, margin + 4, y);
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(249, 115, 22);
    doc.text(fmtPrice(entry.price), pageW - margin, y - 5, { align: 'right' });
    y += 4;
  });

  if (config && config.outdoor) {
    checkPage(18);
    const ou = config.outdoor;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(28, 28, 30);
    doc.text('Unidade exterior (partilhada)', margin, y);
    y += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`${ou.model}  ·  ${ou.zones} zonas  ·  ${ou.kw} kW`, margin + 4, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(249, 115, 22);
    doc.text(fmtPrice(ou.pvp), pageW - margin, y, { align: 'right' });
    y += 8;
  }

  checkPage(20);
  addLine();
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 28, 30);
  doc.text('Total equipamentos:', margin, y);
  if (config) {
    doc.setTextColor(249, 115, 22);
    doc.text(fmtPrice(config.total), pageW - margin, y, { align: 'right' });
  }
  y += 7;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(130, 130, 130);
  doc.text('IVA incluído · Exclui instalação, suportes e materiais', margin, y);
  y += 12;

  checkPage(16);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 28, 30);
  doc.text('Para formalizar este orçamento, contacte-nos:', margin, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(249, 115, 22);
  doc.text('+351 964 501 776  ·  +351 963 712 752  ·  artico.clim@gmail.com', margin, y);

  doc.save(`ARTICOCLIMA-Simulacao-${new Date().toISOString().split('T')[0]}.pdf`);
}

// ============================================================
// 15. UTILS
// ============================================================
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function capFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================================
// 16. INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  addRoom(); // Start with 1 room open
  updateLiveTotal();
});
