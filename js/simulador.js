/* ===================================================================
   ARTICOCLIMA — Simulador de Instalação v1.0
   Cálculo de BTU + Sugestão Mono/Multisplit
   Daikin (completo), Bosch e Daitsu (monosplit)
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

const KW_LABELS = {
  7000: '2,0 kW', 9000: '2,5 kW', 12000: '3,5 kW',
  15000: '4,2 kW', 18000: '5,0 kW', 24000: '7,0 kW', 28000: '8,2 kW'
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
    // Sem modelo 15k — usa 18k
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
    desc: 'Design premiado — disponível em Branco, Prateado e Preto (máx. 18k BTU)',
    prices:  { 7000:1728, 9000:1851, 12000:2146, 15000:2712, 18000:3229 }, // Branco
    // max 18k
    models:  { 7000:'FTXA20', 9000:'FTXA25', 12000:'FTXA35', 15000:'FTXA42', 18000:'FTXA50' },
    colorPrices: {
      white:  { 7000:1728, 9000:1851, 12000:2146, 15000:2712, 18000:3229 },  // FTXA-AW
      silver: { 7000:1790, 9000:1931, 12000:2239, 15000:2811, 18000:3339 },  // FTXA-CS
      black:  { 7000:1790, 9000:1931, 12000:2239, 15000:2811, 18000:3339 },  // FTXA-CB
    },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Design icónico', '3 cores disponíveis'],
    maxBTU: 18000,
    image: 'assets/products/daikin-stylish-branco-1.webp',
    images: [
      'assets/products/daikin-stylish-branco-1.webp','assets/products/daikin-stylish-branco-2.webp','assets/products/daikin-stylish-branco-3.webp',
      'assets/products/daikin-stylish-silver-1.webp','assets/products/daikin-stylish-silver-2.webp','assets/products/daikin-stylish-silver-3.webp',
      'assets/products/daikin-stylish-black-1.webp','assets/products/daikin-stylish-black-2.webp','assets/products/daikin-stylish-black-3.webp',
    ],
  },
  Emura: {
    label: 'Emura', tier: 'design', badge: '✨ Ícone de Design',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'Design ícónico europeu — purificador de ar e controlo por app (máx. 18k BTU)',
    prices:  { 7000:1919, 9000:2005, 12000:2300, 15000:2946, 18000:3419 }, // Branco
    // max 18k
    models:  { 7000:'FTXJ20', 9000:'FTXJ25', 12000:'FTXJ35', 15000:'FTXJ42', 18000:'FTXJ50' },
    colorPrices: {
      white:  { 7000:1919, 9000:2005, 12000:2300, 15000:2946, 18000:3419 },  // FTXJ-AW
      silver: { 7000:2085, 9000:2183, 12000:2491, 15000:3063, 18000:3579 },  // FTXJ-S
      black:  { 7000:2085, 9000:2183, 12000:2491, 15000:3063, 18000:3579 },  // FTXJ-AB
    },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Purificador de ar', '3 cores disponíveis'],
    maxBTU: 18000,
    image: 'assets/products/daikin-emura-branco-1.webp',
    images: [
      'assets/products/daikin-emura-branco-1.webp','assets/products/daikin-emura-branco-2.webp','assets/products/daikin-emura-branco-3.webp',
      'assets/products/daikin-emura-silver-1.webp','assets/products/daikin-emura-silver-2.webp','assets/products/daikin-emura-silver-3.webp',
      'assets/products/daikin-emura-black-1.webp','assets/products/daikin-emura-black-2.webp','assets/products/daikin-emura-black-3.webp',
    ],
  },
};

// --- DAIKIN — Multisplit Interior (FTXM-A, c/ IVA) ---
// Preços da Tabela Daikin 2025 (s/IVA × 1,23)
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
// Tabela Daikin 2025: preços s/IVA × 1,23
// maxZoneKW: potência máxima de uma unidade interior compatível
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

// --- BOSCH — Multisplit Interior (Climate 3000i Mural, c/ IVA — Tabela Junho 2024) ---
const BOSCH_MULTI_INDOOR = [
  { btu: 9000,  kw: 2.6, model: 'CL3000i 26E', pvp: 258 },
  { btu: 12000, kw: 3.5, model: 'CL3000i 35E', pvp: 295 },
  { btu: 18000, kw: 5.3, model: 'CL3000i 53E', pvp: 369 },
  { btu: 24000, kw: 7.0, model: 'CL3000i 70E', pvp: 504 },
];

// --- BOSCH — Multisplit Exterior (Climate 5000 M, c/ IVA — Tabela Junho 2024) ---
const BOSCH_MULTI_OUTDOOR = [
  { model: 'Climate 5000 M 41/2',  zones: 2, kw: 4.1,  pvp: 1132 },
  { model: 'Climate 5000 M 53/2',  zones: 2, kw: 5.3,  pvp: 1285 },
  { model: 'Climate 5000 M 62/3',  zones: 3, kw: 6.2,  pvp: 1642 },
  { model: 'Climate 5000 M 79/3',  zones: 3, kw: 7.9,  pvp: 1907 },
  { model: 'Climate 5000 M 82/4',  zones: 4, kw: 8.2,  pvp: 2073 },
  { model: 'Climate 5000 M 105/4', zones: 4, kw: 10.5, pvp: 2546 },
  { model: 'Climate 5000 M 125/5', zones: 5, kw: 12.5, pvp: 2829 },
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

// --- DAITSU — Monosplit (conjuntos, c/ IVA — Tabela 2025) ---
const DAITSU_MONO = {
  'ARTIC Plus': {
    label: 'ARTIC Plus', tier: 'premium', badge: '🏆 Alta Eficiência',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'Gama premium — A+++ · WiFi incluído · I Feel · Gentle Air · 5 filtros de qualidade do ar',
    prices: { 9000:700, 12000:760, 18000:1090, 24000:1290 },
    models: { 9000:'DS-9KTP-6', 12000:'DS-12KTP-6', 18000:'DS-18KTP-6', 24000:'DS-24KTP-6' },
    features: [
      'Inverter', 'R-32', 'WiFi incluído', 'Classe A+++',
      'Desumidificação', 'I Feel (sensor de temperatura)', 'Controlo por voz',
      'Limpeza automática do filtro', 'Self-diagnosis', 'Programação horária 24h',
      'Turbo', 'Gentle Air (micro-orifícios)', '5 filtros de qualidade do ar',
    ],
    maxBTU: 24000,
    image: 'assets/products/daitsu-artic-plus-1.webp',
    images: ['assets/products/daitsu-artic-plus-1.webp','assets/products/daitsu-artic-plus-2.webp','assets/products/daitsu-artic-plus-3.webp'],
  },
};

// --- DAITSU — Multisplit Interior (ARTIC Plus, c/ IVA — Tabela 2025) ---
const DAITSU_MULTI_INDOOR = [
  { btu: 9000,  kw: 2.5, model: 'DS-9KTP-6',  pvp: 260 },
  { btu: 12000, kw: 3.5, model: 'DS-12KTP-6', pvp: 265 },
  { btu: 18000, kw: 5.0, model: 'DS-18KTP-6', pvp: 430 },
];

// --- DAITSU — Multisplit Exterior (FREE-MAX, c/ IVA — Tabela 2025) ---
const DAITSU_MULTI_OUTDOOR = [
  { model: 'DOSM-14KDT',   zones: 2, kw: 4.1,  pvp: 930  },
  { model: 'DOSM-18KDT-3', zones: 2, kw: 5.1,  pvp: 1145 },
  { model: 'DOSM-21KDT',   zones: 3, kw: 6.2,  pvp: 1320 },
  { model: 'DOSM-27KDT-3', zones: 3, kw: 7.9,  pvp: 1475 },
  { model: 'DOSM-32KDT',   zones: 4, kw: 9.4,  pvp: 2230 },
  { model: 'DOSM-42KDT',   zones: 5, kw: 12.2, pvp: 2490 },
];

// ============================================================
// 3. ESTADO DA APLICAÇÃO
// ============================================================
const state = {
  step: 1,
  numRooms: 0,
  selectedBrand: 'daikin',
  rooms: [],       // array de objetos room
  results: null,   // resultados calculados
  compareMap: new Map(), // key="brand:series" → item data com brandLabel (comparação cross-brand)
};

// Template de uma divisão
function newRoom(index) {
  return {
    id: index,
    name: '',
    type: 'quarto',       // quarto | sala | escritorio | outro
    openToKitchen: false,
    areaM2: '',
    heightM: 2.5,
    hasWindows: false,
    windowAreaM2: '',
    windowOrientation: 'sul',
  };
}

// ============================================================
// 4. CÁLCULO BTU
// ============================================================
function calcBTU(room) {
  const area = parseFloat(room.areaM2) || 0;
  const height = parseFloat(room.heightM) || 2.5;

  if (area <= 0) return 0;

  // Base: volume × 160 BTU/h/m³ (padrão HVAC para clima mediterrânico)
  let btu = area * height * 160;

  // Ajuste por tipo de divisão
  if (room.type === 'sala' && room.openToKitchen) btu += 3000;
  if (room.type === 'cozinha') btu += 4000;

  // Ganho solar por janelas expostas
  if (room.hasWindows && parseFloat(room.windowAreaM2) > 0) {
    const winArea = parseFloat(room.windowAreaM2);
    const gainMap = { sul: 450, este: 250, oeste: 250, norte: 100 };
    btu += winArea * (gainMap[room.windowOrientation] || 300);
  }

  return Math.round(btu);
}

function btuToTier(calculatedBTU) {
  // Arredonda para o escalão standard acima
  return BTU_TIERS.find(t => t >= calculatedBTU) || 28000;
}

function btuLabel(btu) {
  const map = {
    7000:'7.000', 9000:'9.000', 12000:'12.000',
    15000:'15.000', 18000:'18.000', 24000:'24.000', 28000:'28.000'
  };
  return map[btu] || btu.toLocaleString('pt-PT');
}

function fmtPrice(n) {
  return n.toLocaleString('pt-PT') + ' €';
}

// ============================================================
// 5. SELEÇÃO DE PRODUTO — Monosplit
// ============================================================
function getBestMono(seriesData, neededBTU) {
  const maxBTU = seriesData.maxBTU || 28000;
  if (neededBTU > maxBTU) return null; // série não suporta esta potência

  const available = Object.keys(seriesData.prices)
    .map(Number).sort((a, b) => a - b);

  // Encontra o modelo com BTU >= necessário
  const tier = available.find(t => t >= neededBTU) || available[available.length - 1];

  return {
    model: seriesData.models[tier],
    series: seriesData.label,
    btu: tier,
    pvp: seriesData.prices[tier],
    tier: seriesData.tier,
    badge: seriesData.badge,
    desc: seriesData.desc,
    features: seriesData.features,
    energyCool: seriesData.energyCool,
    energyHeat: seriesData.energyHeat,
  };
}

function calcMonoTotal(brand, roomsWithBTU) {
  // Para cada divisão, selecionar o monosplit mais adequado por série
  let brandData;
  if (brand === 'daikin') brandData = DAIKIN_MONO;
  else if (brand === 'bosch') brandData = BOSCH_MONO;
  else if (brand === 'daitsu') brandData = DAITSU_MONO;
  else return null;

  const seriesList = Object.values(brandData);
  const results = [];

  for (const series of seriesList) {
    let viable = true;
    const rooms = [];
    let total = 0;

    for (const r of roomsWithBTU) {
      const product = getBestMono(series, r.btu);
      if (!product) { viable = false; break; }
      rooms.push({ room: r, product });
      total += product.pvp;
    }

    if (viable) {
      results.push({ series: series.label, badge: series.badge, desc: series.desc,
        tier: series.tier, rooms, total, features: series.features,
        energyCool: series.energyCool, energyHeat: series.energyHeat,
        image: series.image || '',
        images: series.images || [],
        colorPrices: series.colorPrices || null });
    }
  }

  return results.length ? results : null;
}

// ============================================================
// 6. SELEÇÃO DE PRODUTO — Multisplit Daikin
// ============================================================
function calcDaikinMulti(roomsWithBTU) {
  const n = roomsWithBTU.length;
  if (n < 2 || n > 5) return null;

  // Selecionar unidade interior para cada divisão
  const indoorUnits = roomsWithBTU.map(r => {
    const unit = DAIKIN_MULTI_INDOOR.find(u => u.btu >= r.btu)
              || DAIKIN_MULTI_INDOOR[DAIKIN_MULTI_INDOOR.length - 1];
    return { room: r, unit };
  });

  const totalKW = indoorUnits.reduce((s, { unit }) => s + unit.kw, 0);
  const maxZoneKW = Math.max(...indoorUnits.map(({ unit }) => unit.kw));

  // Filtrar unidades exteriores compatíveis
  const candidates = DAIKIN_MULTI_OUTDOOR.filter(ou => {
    if (ou.zones < n) return false;
    if (maxZoneKW > ou.maxZoneKW) return false;
    // Regra Daikin: carga total 50%–130% da capacidade nominal exterior
    if (totalKW > ou.kw * 1.30) return false;
    return true;
  });

  if (!candidates.length) return null;

  // Escolher a mais barata (menor exterior)
  const outdoor = candidates.sort((a, b) => a.pvp - b.pvp)[0];
  const indoorTotal = indoorUnits.reduce((s, { unit }) => s + unit.pvp, 0);
  const total = outdoor.pvp + indoorTotal;

  return { outdoor, indoorUnits, indoorTotal, total, totalKW };
}

// ============================================================
// 6b. SELEÇÃO DE PRODUTO — Multisplit Bosch
// ============================================================
function calcBoschMulti(roomsWithBTU) {
  const n = roomsWithBTU.length;
  if (n < 2 || n > 5) return null;

  const indoorUnits = roomsWithBTU.map(r => {
    const unit = BOSCH_MULTI_INDOOR.find(u => u.btu >= r.btu)
              || BOSCH_MULTI_INDOOR[BOSCH_MULTI_INDOOR.length - 1];
    return { room: r, unit };
  });

  const totalKW   = indoorUnits.reduce((s, { unit }) => s + unit.kw, 0);

  const candidates = BOSCH_MULTI_OUTDOOR.filter(ou => {
    if (ou.zones < n) return false;
    if (totalKW > ou.kw * 1.30) return false;
    return true;
  });

  if (!candidates.length) return null;

  const outdoor     = candidates.sort((a, b) => a.pvp - b.pvp)[0];
  const indoorTotal = indoorUnits.reduce((s, { unit }) => s + unit.pvp, 0);
  return { outdoor, indoorUnits, indoorTotal, total: outdoor.pvp + indoorTotal, totalKW };
}

// ============================================================
// 6c. SELEÇÃO DE PRODUTO — Multisplit Daitsu
// ============================================================
function calcDaitsuMulti(roomsWithBTU) {
  const n = roomsWithBTU.length;
  if (n < 2 || n > 5) return null;

  const indoorUnits = roomsWithBTU.map(r => {
    const unit = DAITSU_MULTI_INDOOR.find(u => u.btu >= r.btu)
              || DAITSU_MULTI_INDOOR[DAITSU_MULTI_INDOOR.length - 1];
    return { room: r, unit };
  });

  const totalKW   = indoorUnits.reduce((s, { unit }) => s + unit.kw, 0);

  const candidates = DAITSU_MULTI_OUTDOOR.filter(ou => {
    if (ou.zones < n) return false;
    if (totalKW > ou.kw * 1.30) return false;
    return true;
  });

  if (!candidates.length) return null;

  const outdoor     = candidates.sort((a, b) => a.pvp - b.pvp)[0];
  const indoorTotal = indoorUnits.reduce((s, { unit }) => s + unit.pvp, 0);
  return { outdoor, indoorUnits, indoorTotal, total: outdoor.pvp + indoorTotal, totalKW };
}

// ============================================================
// 6d. SOLUÇÃO HÍBRIDA (monosplit grande + multisplit restantes)
// ============================================================
// Potência máxima que cada marca suporta em unidade interior multisplit
const MAX_INDOOR_BTU = { daikin: 28000, bosch: 24000, daitsu: 18000 };

function calcHybrid(brand, roomsWithBTU) {
  const n = roomsWithBTU.length;
  if (n < 3) return null; // precisa de ≥1 isolada + ≥2 para multisplit

  const maxBTU = MAX_INDOOR_BTU[brand];

  // Divisões que EXCEDEM o máximo indoor da marca → forçadas a monosplit
  let bigRooms    = roomsWithBTU.filter(r => r.btu > maxBTU);
  let normalRooms = roomsWithBTU.filter(r => r.btu <= maxBTU);

  // Se não há divisão forçada, aplicar heurística:
  // isolar a maior divisão se for ≥18k BTU E ≥50% maior que a mediana das restantes
  if (!bigRooms.length) {
    const sorted = [...roomsWithBTU].sort((a, b) => b.btu - a.btu);
    const largest = sorted[0];
    if (largest.btu >= 18000) {
      const others = sorted.slice(1);
      const medBTU = others[Math.floor(others.length / 2)].btu;
      if (largest.btu >= medBTU * 1.5) {
        bigRooms    = [largest];
        normalRooms = others;
      }
    }
  }

  if (!bigRooms.length || normalRooms.length < 2) return null;

  // Monosplit para divisões grandes (série mais barata)
  const monoOptions = calcMonoTotal(brand, bigRooms);
  if (!monoOptions || !monoOptions.length) return null;
  const monoOption = monoOptions[0]; // mais barata

  // Multisplit para divisões normais
  const calcMulti = brand === 'daikin' ? calcDaikinMulti
    : brand === 'bosch' ? calcBoschMulti : calcDaitsuMulti;
  const multiResult = calcMulti(normalRooms);
  if (!multiResult) return null;

  const total = monoOption.total + multiResult.total;
  return { bigRooms, monoOption, normalRooms, multiResult, total };
}

// ============================================================
// 6e. DUPLO MULTISPLIT (2 grupos independentes)
// ============================================================
function combinations(arr, k) {
  if (k === 0) return [[]];
  if (!arr.length) return [];
  const [head, ...tail] = arr;
  return [
    ...combinations(tail, k - 1).map(c => [head, ...c]),
    ...combinations(tail, k),
  ];
}

function calcDoubleMulti(brand, roomsWithBTU) {
  const n = roomsWithBTU.length;
  if (n < 4) return null; // mínimo 2+2

  const calcMulti = brand === 'daikin' ? calcDaikinMulti
    : brand === 'bosch' ? calcBoschMulti : calcDaitsuMulti;

  let best = null;

  // Tentar todas as partições em 2 grupos (cada um com 2-5 divisões)
  for (let k = 2; k <= n - 2; k++) {
    for (const group1 of combinations(roomsWithBTU, k)) {
      const ids1 = new Set(group1.map(r => r.id));
      const group2 = roomsWithBTU.filter(r => !ids1.has(r.id));
      if (group2.length < 2) continue;

      const m1 = calcMulti(group1);
      const m2 = calcMulti(group2);
      if (!m1 || !m2) continue;

      const total = m1.total + m2.total;
      if (!best || total < best.total) {
        best = { group1, multi1: m1, group2, multi2: m2, total };
      }
    }
  }
  return best;
}

// ============================================================
// 7. CALCULAR RESULTADOS
// ============================================================
function calcResults(clearCompare = true) {
  if (clearCompare) state.compareMap.clear(); // reset comparação ao recalcular

  // Calcular BTU para cada divisão
  const roomsWithBTU = state.rooms.map(room => {
    const raw = calcBTU(room);
    const btu = btuToTier(raw);
    return { ...room, rawBTU: raw, btu };
  });

  const brand = state.selectedBrand;

  const mono = calcMonoTotal(brand, roomsWithBTU);
  const multi = roomsWithBTU.length >= 2
    ? (brand === 'daikin'  ? calcDaikinMulti(roomsWithBTU)
     : brand === 'bosch'  ? calcBoschMulti(roomsWithBTU)
     : brand === 'daitsu' ? calcDaitsuMulti(roomsWithBTU)
     : null)
    : null;

  const hybrid      = roomsWithBTU.length >= 3 ? calcHybrid(brand, roomsWithBTU) : null;
  const doubleMulti = roomsWithBTU.length >= 4 ? calcDoubleMulti(brand, roomsWithBTU) : null;

  state.results = { roomsWithBTU, mono, multi, hybrid, doubleMulti, brand };
}

// ============================================================
// 8. RENDER — Step 1
// ============================================================
function renderStep1() {
  document.getElementById('step1').style.display = 'block';
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step3').style.display = 'none';
  setStepActive(1);
}

// ============================================================
// 9. RENDER — Step 2
// ============================================================
function renderStep2() {
  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
  document.getElementById('step3').style.display = 'none';
  setStepActive(2);

  // Garantir que temos as divisões iniciadas
  while (state.rooms.length < state.numRooms) {
    state.rooms.push(newRoom(state.rooms.length));
  }
  state.rooms = state.rooms.slice(0, state.numRooms);

  renderBrandBtns();
  renderRooms();
}

function renderBrandBtns() {
  document.querySelectorAll('.sim-brand-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.brand === state.selectedBrand);
  });
}

function renderRooms() {
  const container = document.getElementById('simRoomsContainer');
  container.innerHTML = state.rooms.map((room, i) => roomFormHTML(room, i)).join('');

  // Bind events para cada divisão
  state.rooms.forEach((_, i) => bindRoomEvents(i));
}

function roomTypeLabel(type) {
  return { quarto: 'Quarto', sala: 'Sala', escritorio: 'Escritório', outro: 'Outro' }[type] || type;
}

function roomFormHTML(room, i) {
  const typeOptions = ['quarto', 'sala', 'escritorio', 'outro'];
  const heightOptions = [
    { val: 2.2, label: '2,2 m' }, { val: 2.5, label: '2,5 m (standard)' },
    { val: 2.7, label: '2,7 m' }, { val: 3.0, label: '3,0 m' },
    { val: 3.3, label: '> 3,0 m' },
  ];
  const orientationOptions = [
    { val: 'sul', label: '☀️ Sul (mais calor)' },
    { val: 'este', label: '🌅 Este' },
    { val: 'oeste', label: '🌇 Oeste' },
    { val: 'norte', label: '🌫️ Norte (menos calor)' },
  ];

  const defaultName = ['Quarto Principal', 'Sala', 'Quarto 2', 'Escritório', 'Quarto 3'][i] || `Divisão ${i+1}`;

  return `
  <div class="sim-room-card" id="roomCard${i}">
    <div class="sim-room-header">
      <span class="sim-room-num">${i + 1}</span>
      <h3 class="sim-room-title">${room.name || defaultName}</h3>
    </div>
    <div class="sim-room-body">

      <!-- Nome -->
      <div class="sim-field">
        <label class="sim-label">Nome da divisão</label>
        <input type="text" class="sim-input" data-field="name" data-room="${i}"
          placeholder="${defaultName}" value="${room.name}" />
      </div>

      <!-- Tipo -->
      <div class="sim-field">
        <label class="sim-label">Tipo de divisão</label>
        <div class="sim-type-btns">
          ${typeOptions.map(t => `
            <button class="sim-type-btn${room.type === t ? ' active' : ''}"
              data-type="${t}" data-room="${i}">${roomTypeLabel(t)}</button>
          `).join('')}
        </div>
      </div>

      <!-- Open-space (só para sala) -->
      ${room.type === 'sala' ? `
      <div class="sim-field sim-field--highlight" id="openKitchen${i}">
        <label class="sim-label sim-label--info">
          🍳 Sala comunicante com cozinha (open-space)?
          <span class="sim-tooltip" title="Se a cozinha e a sala partilham o mesmo espaço, é necessária mais potência para compensar o calor gerado pelos eletrodomésticos.">ⓘ</span>
        </label>
        <div class="sim-toggle-row">
          <label class="sim-toggle">
            <input type="checkbox" data-field="openToKitchen" data-room="${i}"
              ${room.openToKitchen ? 'checked' : ''}>
            <span class="sim-toggle-slider"></span>
          </label>
          <span class="sim-toggle-label">${room.openToKitchen ? 'Sim — adicionamos potência extra' : 'Não'}</span>
        </div>
      </div>
      ` : ''}

      <!-- Dimensões -->
      <div class="sim-field-row">
        <div class="sim-field">
          <label class="sim-label">Área da divisão (m²)</label>
          <div class="sim-input-unit">
            <input type="number" class="sim-input" data-field="areaM2" data-room="${i}"
              placeholder="Ex: 20" value="${room.areaM2}" min="4" max="200" step="0.5" />
            <span class="sim-unit">m²</span>
          </div>
        </div>
        <div class="sim-field">
          <label class="sim-label">Altura do tecto</label>
          <select class="sim-select" data-field="heightM" data-room="${i}">
            ${heightOptions.map(h => `
              <option value="${h.val}" ${parseFloat(room.heightM) === h.val ? 'selected' : ''}>${h.label}</option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- Janelas -->
      <div class="sim-field">
        <label class="sim-label">
          🪟 Tem janelas com exposição solar significativa?
          <span class="sim-tooltip" title="Janelas a sul, este ou oeste que recebem sol direto aumentam a carga térmica da divisão.">ⓘ</span>
        </label>
        <div class="sim-toggle-row">
          <label class="sim-toggle">
            <input type="checkbox" data-field="hasWindows" data-room="${i}"
              ${room.hasWindows ? 'checked' : ''}>
            <span class="sim-toggle-slider"></span>
          </label>
          <span class="sim-toggle-label">${room.hasWindows ? 'Sim' : 'Não'}</span>
        </div>
      </div>

      ${room.hasWindows ? `
      <div class="sim-field-row" id="windowDetails${i}">
        <div class="sim-field">
          <label class="sim-label">Área total das janelas (m²)</label>
          <div class="sim-input-unit">
            <input type="number" class="sim-input" data-field="windowAreaM2" data-room="${i}"
              placeholder="Ex: 4" value="${room.windowAreaM2}" min="0.5" max="50" step="0.5" />
            <span class="sim-unit">m²</span>
          </div>
        </div>
        <div class="sim-field">
          <label class="sim-label">Orientação predominante</label>
          <select class="sim-select" data-field="windowOrientation" data-room="${i}">
            ${orientationOptions.map(o => `
              <option value="${o.val}" ${room.windowOrientation === o.val ? 'selected' : ''}>${o.label}</option>
            `).join('')}
          </select>
        </div>
      </div>
      ` : ''}

    </div><!-- /sim-room-body -->
  </div>`;
}

function bindRoomEvents(i) {
  // Inputs de texto e número
  document.querySelectorAll(`[data-room="${i}"][data-field]`).forEach(el => {
    const field = el.dataset.field;
    const eventType = el.type === 'checkbox' ? 'change' : 'input';

    el.addEventListener(eventType, () => {
      if (el.type === 'checkbox') {
        state.rooms[i][field] = el.checked;
      } else if (el.type === 'number' || el.tagName === 'SELECT') {
        state.rooms[i][field] = el.value;
      } else {
        state.rooms[i][field] = el.value;
        // Actualizar título do card ao vivo
        const title = document.querySelector(`#roomCard${i} .sim-room-title`);
        if (title) title.textContent = el.value || el.placeholder;
      }

      // Re-render o card apenas se mudou tipo ou hasWindows/openToKitchen
      if (field === 'type' || field === 'hasWindows' || field === 'openToKitchen') {
        renderRooms();
      }
    });
  });

  // Botões de tipo
  document.querySelectorAll(`.sim-type-btn[data-room="${i}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      state.rooms[i].type = btn.dataset.type;
      if (btn.dataset.type !== 'sala') state.rooms[i].openToKitchen = false;
      renderRooms();
    });
  });
}

// ============================================================
// 10. RENDER — Step 3 (Resultados)
// ============================================================
function renderStep3() {
  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step3').style.display = 'block';
  setStepActive(3);

  // Limpar seleções anteriores
  _selectedQuote.clear();
  updateQuoteBar();

  const el = document.getElementById('simResults');
  el.innerHTML = buildResultsHTML();
}

function buildResultsHTML() {
  const { roomsWithBTU, mono, multi, hybrid, doubleMulti, brand } = state.results;
  const brandLabel = { daikin: 'Daikin', bosch: 'Bosch', daitsu: 'Daitsu' }[brand];

  let html = '';

  // ─── Análise das divisões ───
  html += `
  <div class="res-section">
    <h2 class="res-main-title">Análise das suas divisões <span class="res-brand-tag">${brandLabel}</span></h2>
    <div class="res-rooms-grid">
      ${roomsWithBTU.map(r => `
        <div class="res-room-card">
          <div class="res-room-card__top">
            <span class="res-room-icon">${roomIcon(r.type)}</span>
            <h4 class="res-room-name">${r.name || ['Quarto Principal','Sala','Quarto 2','Escritório','Quarto 3'][r.id] || 'Divisão'}</h4>
            <div class="res-room-btu">
              <span class="res-btu-tier">${btuLabel(r.btu)} BTU</span>
              <span class="res-btu-kw">${KW_LABELS[r.btu]}</span>
            </div>
          </div>
          <div class="res-room-card__details">
            <span class="res-btu-raw">~${Math.round(r.rawBTU/100)*100} BTU calculados</span>
            <p>${r.areaM2} m² · ${String(r.heightM).replace('.',',')} m altura</p>
            ${r.openToKitchen ? '<p class="res-note">🍳 Open-space com cozinha</p>' : ''}
            ${r.hasWindows ? `<p class="res-note">🪟 Janelas ${orientLabel(r.windowOrientation)} (${r.windowAreaM2} m²)</p>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;

  // ─── Painel de comparação cross-brand (standalone, se ≥ 2 selecionados) ───
  const cmpAllItems = Array.from(state.compareMap.values());
  if (cmpAllItems.length >= 2) {
    html += buildCompareHTML(cmpAllItems);
  }

  // ─── Sugestão A — Monosplit ───
  html += `<div class="res-section">
    <div class="res-section-header">
      <h2 class="res-option-title">💡 Opção A — Monosplit</h2>
      <p class="res-option-desc">Uma unidade exterior por divisão — instalação mais simples, menor custo de equipamento para 1–2 divisões.</p>
    </div>`;

  if (mono && mono.length) {
    html += `<div class="res-tiers">`;
    for (const option of mono) {
      const inCompare = state.compareMap.has(brand + ':' + option.series);
      const imgHtml = option.image
        ? `<div class="res-tier-img-wrap"><img class="res-tier-img" src="${option.image}" alt="${option.series}" onerror="this.parentElement.style.display='none'"></div>`
        : '';
      html += `
      <div class="res-tier-card" data-series="${option.series}">
        <div class="res-tier-header">
          <div class="res-tier-hdr-text">
            <span class="res-tier-badge">${option.badge}</span>
            <h3 class="res-tier-name">${brandLabel} ${option.series}</h3>
            <p class="res-tier-desc">${option.desc}</p>
          </div>
          ${imgHtml}
        </div>
        <div class="res-tier-rooms">
          ${option.rooms.map(({ room, product }) => `
            <div class="res-tier-row">
              <span class="res-tier-room-name">${room.name || roomDefaultName(room.id)}</span>
              <span class="res-tier-model">${product.model}</span>
              <span class="res-tier-btu">${btuLabel(product.btu)} BTU</span>
              <span class="res-tier-price">${fmtPrice(product.pvp)}</span>
            </div>
          `).join('')}
        </div>
        <div class="res-tier-total">
          <div>
            <div class="res-desde-label">💰 Desde</div>
            <div class="res-install-note">equipamento c/ IVA</div>
          </div>
          <span class="res-total-price">${fmtPrice(option.total)}</span>
        </div>
        <div class="res-tier-note">
          ${option.rooms.length} unid. exterior(es) &nbsp;·&nbsp; Classe ${option.energyCool}
          &nbsp;·&nbsp; Instalação orçamentada após visita técnica
        </div>
        <div class="res-tier-actions">
          <button class="res-detail-btn" data-series="${option.series}">🔍 Ver detalhes</button>
          <button class="res-compare-btn${inCompare ? ' active' : ''}" data-brand="${brand}" data-series="${option.series}">
            ${inCompare ? '✓ A comparar' : '⊕ Comparar'}
          </button>
        </div>
        <button class="res-select-btn" data-key="mono:${brand}:${option.series}" data-label="${brandLabel} ${option.series}" data-price="${option.total}">
          ☐ Selecionar para orçamento
        </button>
      </div>`;
    }
    html += `</div>`;
  } else {
    html += `<p class="res-warn">⚠️ Não foi possível encontrar uma solução monosplit ${brandLabel} para esta configuração. Contacte-nos para um orçamento personalizado.</p>`;
  }

  html += `</div>`; // /res-section monosplit

  // ─── Sugestão B — Multisplit ───
  if (roomsWithBTU.length >= 2) {
    html += `<div class="res-section">
      <div class="res-section-header">
        <h2 class="res-option-title">💡 Opção B — Multisplit</h2>
        <p class="res-option-desc">Uma única unidade exterior para todas as divisões — menos impacto visual no exterior.</p>
      </div>`;

    if (brand === 'daikin' && multi) {
      html += `
      <div class="res-multi-card">
        <div class="res-multi-header">
          <span class="res-multi-badge">🏅 Daikin Perfera Multi</span>
          <p class="res-multi-desc">Unidade exterior partilhada · Unidades interiores FTXM-A (série Perfera)</p>
        </div>

        <div class="res-multi-outdoor">
          <div class="res-multi-label">🔲 Unidade Exterior</div>
          <div class="res-multi-row">
            <span class="res-multi-model">Daikin ${multi.outdoor.model}</span>
            <span class="res-multi-spec">${multi.outdoor.zones} zonas · ${multi.outdoor.kw} kW</span>
            <span class="res-multi-price">${fmtPrice(multi.outdoor.pvp)}</span>
          </div>
        </div>

        <div class="res-multi-indoor">
          <div class="res-multi-label">❄️ Unidades Interiores</div>
          ${multi.indoorUnits.map(({ room, unit }) => `
            <div class="res-multi-row">
              <span class="res-multi-model">${room.name || roomDefaultName(room.id)}</span>
              <span class="res-multi-spec">Daikin ${unit.model} · ${btuLabel(unit.btu)} BTU</span>
              <span class="res-multi-price">${fmtPrice(unit.pvp)}</span>
            </div>
          `).join('')}
        </div>

        <div class="res-tier-total">
          <div>
            <div class="res-desde-label">💰 Desde</div>
            <div class="res-install-note">equipamento c/ IVA</div>
          </div>
          <span class="res-total-price">${fmtPrice(multi.total)}</span>
        </div>

        <div class="res-multi-notes">
          <div class="res-multi-note res-multi-note--pro">✅ Apenas 1 unidade exterior — menor impacto visual</div>
          <div class="res-multi-note res-multi-note--pro">✅ Controlo individual por divisão</div>
          <div class="res-multi-note res-multi-note--info">ℹ️ Custo de equipamento geralmente superior ao monosplit</div>
          <div class="res-multi-note res-multi-note--info">ℹ️ Instalação e materiais orçamentados após visita técnica</div>
        </div>
        <button class="res-select-btn" data-key="multi:daikin:perfera" data-label="Daikin Perfera Multisplit" data-price="${multi.total}">
          ☐ Selecionar para orçamento
        </button>
      </div>`;

    } else if (brand === 'daikin' && !multi) {
      html += `
      <div class="res-warn-box">
        <p>⚠️ A combinação de divisões introduzida excede a capacidade máxima dos sistemas multisplit Daikin disponíveis.</p>
        <p>Recomendamos a opção monosplit ou contacte-nos para uma análise personalizada.</p>
      </div>`;
    } else if ((brand === 'bosch' || brand === 'daitsu') && multi) {
      html += buildBrandMultiHTML(brand, brandLabel, multi);
    } else if ((brand === 'bosch' || brand === 'daitsu') && !multi) {
      html += `
      <div class="res-warn-box">
        <p>⚠️ A combinação de divisões introduzida excede a capacidade máxima dos sistemas multisplit ${brandLabel} disponíveis.</p>
        <p>Recomendamos a opção monosplit ou contacte-nos para uma análise personalizada.</p>
      </div>`;
    }

    html += `</div>`; // /res-section multisplit
  }

  // ─── Opção C — Solução Mista (Híbrido) ───
  if (hybrid) {
    const { bigRooms, monoOption, normalRooms, multiResult } = hybrid;
    const indoorSeriesLabel = brand === 'bosch' ? 'Climate 3000i' : brand === 'daitsu' ? 'ARTIC Plus' : 'FTXM-A';
    const outdoorSeriesLabel = brand === 'bosch' ? 'Climate 5000 M' : brand === 'daitsu' ? 'FREE-MAX' : multiResult.outdoor.model;

    html += `<div class="res-section">
      <div class="res-section-header">
        <h2 class="res-option-title">💡 Opção C — Solução Mista</h2>
        <p class="res-option-desc">Divisão mais potente com unidade exterior própria (monosplit) + restantes em multisplit partilhado. Menos máquinas no exterior, respeitando as potências necessárias.</p>
      </div>
      <div class="res-multi-card">

        <div class="res-hybrid-block">
          <div class="res-hybrid-label">🏠 Divisão isolada — Monosplit ${brandLabel} ${monoOption.series}</div>
          ${monoOption.rooms.map(({ room, product }) => `
            <div class="res-multi-row">
              <span class="res-multi-model">${room.name || roomDefaultName(room.id)}</span>
              <span class="res-multi-spec">${brandLabel} ${product.model} · ${btuLabel(product.btu)} BTU</span>
              <span class="res-multi-price">${fmtPrice(product.pvp)}</span>
            </div>
          `).join('')}
        </div>

        <div class="res-hybrid-divider"></div>

        <div class="res-hybrid-block">
          <div class="res-hybrid-label">🔗 Restantes — Multisplit (${outdoorSeriesLabel} + ${indoorSeriesLabel})</div>
          <div class="res-multi-row">
            <span class="res-multi-model">Unidade Exterior</span>
            <span class="res-multi-spec">${brand === 'daikin' ? 'Daikin ' : ''}${multiResult.outdoor.model} · ${multiResult.outdoor.zones} zonas · ${multiResult.outdoor.kw} kW</span>
            <span class="res-multi-price">${fmtPrice(multiResult.outdoor.pvp)}</span>
          </div>
          ${multiResult.indoorUnits.map(({ room, unit }) => `
            <div class="res-multi-row">
              <span class="res-multi-model">${room.name || roomDefaultName(room.id)}</span>
              <span class="res-multi-spec">${brandLabel} ${unit.model} · ${btuLabel(unit.btu)} BTU</span>
              <span class="res-multi-price">${fmtPrice(unit.pvp)}</span>
            </div>
          `).join('')}
        </div>

        <div class="res-tier-total">
          <div>
            <div class="res-desde-label">💰 Desde</div>
            <div class="res-install-note">equipamento c/ IVA</div>
          </div>
          <span class="res-total-price">${fmtPrice(hybrid.total)}</span>
        </div>
        <div class="res-multi-notes">
          <div class="res-multi-note res-multi-note--pro">✅ Respeita as potências máximas dos interiores multisplit</div>
          <div class="res-multi-note res-multi-note--pro">✅ Mínimo de máquinas no exterior</div>
          <div class="res-multi-note res-multi-note--info">ℹ️ Instalação e materiais orçamentados após visita técnica</div>
        </div>
        <button class="res-select-btn" data-key="hybrid:${brand}:${monoOption.series}" data-label="${brandLabel} Solução Mista (${monoOption.series} + Multisplit)" data-price="${hybrid.total}">
          ☐ Selecionar para orçamento
        </button>
      </div>
    </div>`;
  }

  // ─── Opção D — Duplo Multisplit ───
  if (doubleMulti) {
    const { group1, multi1, group2, multi2 } = doubleMulti;
    const indoorLabel = brand === 'bosch' ? 'Climate 3000i' : brand === 'daitsu' ? 'ARTIC Plus' : 'FTXM-A';

    const renderMultiGroup = (label, rooms, m) => `
      <div class="res-hybrid-block">
        <div class="res-hybrid-label">${label} — ${brand === 'daikin' ? 'Daikin ' : ''}${m.outdoor.model} (${m.outdoor.zones} zonas · ${m.outdoor.kw} kW)</div>
        <div class="res-multi-row">
          <span class="res-multi-model">Unidade Exterior</span>
          <span class="res-multi-spec">${brand === 'daikin' ? 'Daikin ' : ''}${m.outdoor.model}</span>
          <span class="res-multi-price">${fmtPrice(m.outdoor.pvp)}</span>
        </div>
        ${m.indoorUnits.map(({ room, unit }) => `
          <div class="res-multi-row">
            <span class="res-multi-model">${room.name || roomDefaultName(room.id)}</span>
            <span class="res-multi-spec">${brandLabel} ${unit.model} · ${btuLabel(unit.btu)} BTU</span>
            <span class="res-multi-price">${fmtPrice(unit.pvp)}</span>
          </div>
        `).join('')}
      </div>`;

    html += `<div class="res-section">
      <div class="res-section-header">
        <h2 class="res-option-title">💡 Opção D — Duplo Multisplit</h2>
        <p class="res-option-desc">Dois sistemas multisplit independentes — ideal quando as divisões estão em zonas distintas da casa ou quando a carga total beneficia de duas unidades exteriores.</p>
      </div>
      <div class="res-multi-card">
        ${renderMultiGroup('🔵 Sistema 1', group1, multi1)}
        <div class="res-hybrid-divider"></div>
        ${renderMultiGroup('🟠 Sistema 2', group2, multi2)}

        <div class="res-tier-total">
          <div>
            <div class="res-desde-label">💰 Desde</div>
            <div class="res-install-note">equipamento c/ IVA</div>
          </div>
          <span class="res-total-price">${fmtPrice(doubleMulti.total)}</span>
        </div>
        <div class="res-multi-notes">
          <div class="res-multi-note res-multi-note--pro">✅ Apenas 2 unidades exteriores para ${roomsWithBTU.length} divisões</div>
          <div class="res-multi-note res-multi-note--pro">✅ Cada sistema otimizado para a sua zona</div>
          <div class="res-multi-note res-multi-note--info">ℹ️ Instalação e materiais orçamentados após visita técnica</div>
        </div>
        <button class="res-select-btn" data-key="double-multi:${brand}" data-label="${brandLabel} Duplo Multisplit" data-price="${doubleMulti.total}">
          ☐ Selecionar para orçamento
        </button>
      </div>
    </div>`;
  }

  // ─── Aviso geral ───
  html += `
  <div class="res-disclaimer">
    <p>📌 <strong>Nota:</strong> Estes valores são estimativas de equipamento <strong>com IVA</strong>, sem custo de instalação.
    A potência foi calculada com base nas dimensões indicadas e nas condições climáticas do Algarve/Portugal.
    Para um orçamento final completo (equipamento + mão-de-obra + acessórios), contacte-nos.</p>
  </div>`;

  // ─── Botões de ação ───
  html += `
  <div class="res-actions">
    <div class="res-switch-brand">
      <p>Ver sugestão com outra marca:</p>
      <div class="res-brand-btns">
        ${['daikin','bosch','daitsu'].filter(b => b !== brand).map(b => `
          <button class="btn btn--outline sim-switch-brand" data-brand="${b}">
            ${b.charAt(0).toUpperCase() + b.slice(1)}
          </button>
        `).join('')}
      </div>
    </div>
    <a href="index.html#contacto" class="btn btn--primary btn--lg">
      📞 Pedir Orçamento Completo
    </a>
  </div>`;

  return html;
}

// ============================================================
// 10a. MULTISPLIT GENÉRICO (Bosch / Daitsu)
// ============================================================
function buildBrandMultiHTML(brand, brandLabel, multi) {
  const indoorSeries = brand === 'bosch'
    ? 'Climate 3000i Mural'
    : 'ARTIC Plus';
  const outdoorSeries = brand === 'bosch'
    ? 'Climate 5000 M'
    : 'FREE-MAX';

  return `
  <div class="res-multi-card">
    <div class="res-multi-header">
      <span class="res-multi-badge">🏅 ${brandLabel} Multisplit</span>
      <p class="res-multi-desc">Unidade exterior ${outdoorSeries} · Unidades interiores ${indoorSeries}</p>
    </div>

    <div class="res-multi-outdoor">
      <div class="res-multi-label">🔲 Unidade Exterior</div>
      <div class="res-multi-row">
        <span class="res-multi-model">${multi.outdoor.model}</span>
        <span class="res-multi-spec">${multi.outdoor.zones} zonas · ${multi.outdoor.kw} kW</span>
        <span class="res-multi-price">${fmtPrice(multi.outdoor.pvp)}</span>
      </div>
    </div>

    <div class="res-multi-indoor">
      <div class="res-multi-label">❄️ Unidades Interiores</div>
      ${multi.indoorUnits.map(({ room, unit }) => `
        <div class="res-multi-row">
          <span class="res-multi-model">${room.name || roomDefaultName(room.id)}</span>
          <span class="res-multi-spec">${brandLabel} ${unit.model} · ${btuLabel(unit.btu)} BTU</span>
          <span class="res-multi-price">${fmtPrice(unit.pvp)}</span>
        </div>
      `).join('')}
    </div>

    <div class="res-tier-total">
      <div>
        <div class="res-desde-label">💰 Desde</div>
        <div class="res-install-note">equipamento c/ IVA</div>
      </div>
      <span class="res-total-price">${fmtPrice(multi.total)}</span>
    </div>

    <div class="res-multi-notes">
      <div class="res-multi-note res-multi-note--pro">✅ Apenas 1 unidade exterior — menor impacto visual</div>
      <div class="res-multi-note res-multi-note--pro">✅ Controlo individual por divisão</div>
      <div class="res-multi-note res-multi-note--info">ℹ️ Custo de equipamento geralmente superior ao monosplit</div>
      <div class="res-multi-note res-multi-note--info">ℹ️ Instalação e materiais orçamentados após visita técnica</div>
    </div>
    <button class="res-select-btn" data-key="multi:${brand}:split" data-label="${brandLabel} Multisplit" data-price="${multi.total}">
      ☐ Selecionar para orçamento
    </button>
  </div>`;
}

// ============================================================
// 10b. PAINEL DE COMPARAÇÃO
// ============================================================
function buildCompareHTML(items) {
  let html = `
  <div class="res-compare-section">
    <div class="res-compare-header">
      <h3>📊 Comparação de Modelos</h3>
      <button class="res-compare-clear" id="clearCompare">Limpar seleção</button>
    </div>
    <div class="res-compare-grid">`;

  for (const item of items) {
    const imgHtml = item.image
      ? `<img class="res-cmp-img" src="${item.image}" alt="${item.series}" onerror="this.style.display='none'">`
      : '';
    html += `
      <div class="res-cmp-card">
        ${imgHtml}
        <div class="res-cmp-name">${item.brandLabel} ${item.series}</div>
        <div class="res-cmp-badge">${item.badge}</div>
        <div class="res-cmp-price">${fmtPrice(item.total)}</div>
        <div class="res-cmp-since">💰 Desde · equipamento c/ IVA</div>
        <ul class="res-cmp-features">
          ${item.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <div class="res-cmp-energy">
          ❄️ Arref: <strong>${item.energyCool}</strong> &nbsp;·&nbsp; 🔥 Aquec: <strong>${item.energyHeat}</strong>
        </div>
      </div>`;
  }

  html += `</div></div>`;
  return html;
}

// ============================================================
// 10c. MODAL DE DETALHE — com Carousel + Zoom
// ============================================================

// Calcula total por cor para Stylish / Emura
function calcColorTotal(option, colorKey) {
  if (!option.colorPrices) return option.total;
  const colorP = option.colorPrices[colorKey];
  if (!colorP) return option.total;
  return option.rooms.reduce((sum, { product }) => sum + (colorP[product.btu] ?? product.pvp), 0);
}

let _carouselTimer = null;
let _carouselIdx   = 0;
let _selectedQuote = new Map(); // key → { label, price }

function simShowDetail(seriesName) {
  const { mono, brand } = state.results;
  const brandLabel = { daikin: 'Daikin', bosch: 'Bosch', daitsu: 'Daitsu' }[brand];
  const option = mono.find(o => o.series === seriesName);
  if (!option) return;

  const modal = document.getElementById('simDetailModal');
  const imgs = (option.images && option.images.length) ? option.images
             : (option.image ? [option.image] : []);
  _carouselIdx = 0;

  const carouselHTML = imgs.length ? `
  <div class="sdm-carousel" id="sdmCarousel">
    <div class="sdm-carousel-track">
      ${imgs.map((src, i) => `
        <img class="sdm-carousel-img${i === 0 ? ' active' : ''}"
             src="${src}" alt="${option.series} — imagem ${i+1}"
             title="Clique para ampliar" data-idx="${i}"
             onerror="this.style.display='none'" />
      `).join('')}
    </div>
    ${imgs.length > 1 ? `
    <button class="sdm-car-btn sdm-car-prev" id="sdmPrev" aria-label="Anterior">&#8249;</button>
    <button class="sdm-car-btn sdm-car-next" id="sdmNext" aria-label="Próxima">&#8250;</button>
    <div class="sdm-car-dots" id="sdmDots">
      ${imgs.map((_, i) => `<span class="sdm-dot${i===0?' active':''}" data-idx="${i}"></span>`).join('')}
    </div>` : ''}
  </div>` : '';

  modal.innerHTML = `
  <div class="sdm-box">
    <div class="sdm-top sdm-top--no-img">
      <div class="sdm-header-text">
        <span class="sdm-badge">${option.badge}</span>
        <div class="sdm-name">${brandLabel} ${option.series}</div>
        <div class="sdm-desc">${option.desc}</div>
      </div>
      <button class="sdm-close" id="sdmClose" aria-label="Fechar">✕</button>
    </div>
    ${carouselHTML}
    <div class="sdm-body">
      <div class="sdm-price-row">
        <span class="sdm-desde">Desde</span>
        <span class="sdm-price">${fmtPrice(option.total)}</span>
        <span class="sdm-iva">c/ IVA</span>
      </div>
      <div class="sdm-install-note">💡 Instalação e materiais orçamentados após visita técnica</div>

      ${option.colorPrices ? `
      <div class="sdm-section-title">Cor do equipamento</div>
      <div class="sdm-color-picker" id="sdmColorPicker">
        <button class="sdm-color-btn active" data-color="white">⬜ Branco</button>
        <button class="sdm-color-btn" data-color="silver">🩶 Prateado</button>
        <button class="sdm-color-btn" data-color="black">🖤 Preto</button>
      </div>` : ''}

      <div class="sdm-section-title">Modelos por divisão</div>
      <table class="sdm-rooms-table">
        <thead><tr>
          <th>Divisão</th><th>Modelo</th><th>BTU</th><th>Preço</th>
        </tr></thead>
        <tbody>
          ${option.rooms.map(({ room, product }) => `
            <tr>
              <td>${room.name || roomDefaultName(room.id)}</td>
              <td>${product.model}</td>
              <td>${btuLabel(product.btu)}</td>
              <td class="sdm-td-price">${fmtPrice(product.pvp)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="sdm-section-title">Classe energética</div>
      <div class="sdm-energy-row">
        <div class="sdm-energy-badge">
          <span class="sdm-energy-label">❄️ Arrefecimento</span>
          <span class="sdm-energy-val">${option.energyCool}</span>
        </div>
        <div class="sdm-energy-badge">
          <span class="sdm-energy-label">🔥 Aquecimento</span>
          <span class="sdm-energy-val">${option.energyHeat}</span>
        </div>
      </div>

      <div class="sdm-section-title">Características</div>
      <div class="sdm-features">
        ${option.features.map(f => `<span class="sdm-feature-tag">✓ ${f}</span>`).join('')}
      </div>

      <a href="index.html#contacto" class="sdm-cta">📞 Pedir Orçamento Completo</a>
    </div>
  </div>`;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  document.getElementById('sdmClose').addEventListener('click', closeDetailModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeDetailModal(); });

  // ── Color picker (Stylish / Emura) ──
  if (option.colorPrices) {
    document.querySelectorAll('.sdm-color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sdm-color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const newTotal = calcColorTotal(option, btn.dataset.color);
        const priceEl  = modal.querySelector('.sdm-price');
        if (priceEl) priceEl.textContent = fmtPrice(newTotal);
      });
    });
  }

  // ── Carousel logic ──
  if (imgs.length > 1) {
    const gotoSlide = (idx) => {
      const n = imgs.length;
      _carouselIdx = ((idx % n) + n) % n;
      document.querySelectorAll('.sdm-carousel-img')
        .forEach((img, i) => img.classList.toggle('active', i === _carouselIdx));
      document.querySelectorAll('.sdm-dot')
        .forEach((dot, i) => dot.classList.toggle('active', i === _carouselIdx));
    };
    const restartTimer = () => {
      if (_carouselTimer) clearInterval(_carouselTimer);
      _carouselTimer = setInterval(() => gotoSlide(_carouselIdx + 1), 5000);
    };
    document.getElementById('sdmPrev').addEventListener('click', () => { gotoSlide(_carouselIdx - 1); restartTimer(); });
    document.getElementById('sdmNext').addEventListener('click', () => { gotoSlide(_carouselIdx + 1); restartTimer(); });
    document.querySelectorAll('.sdm-dot').forEach(dot => {
      dot.addEventListener('click', () => { gotoSlide(parseInt(dot.dataset.idx)); restartTimer(); });
    });
    restartTimer();
  }

  // ── Zoom on click ──
  document.querySelectorAll('.sdm-carousel-img').forEach(img => {
    img.addEventListener('click', () => sdmZoomOpen(img.src));
  });
}

function closeDetailModal() {
  const modal = document.getElementById('simDetailModal');
  if (modal) { modal.style.display = 'none'; }
  document.body.style.overflow = '';
  if (_carouselTimer) { clearInterval(_carouselTimer); _carouselTimer = null; }
  sdmZoomClose();
}

function sdmZoomOpen(src) {
  sdmZoomClose();
  const overlay = document.createElement('div');
  overlay.id = 'sdmZoomOverlay';
  overlay.className = 'sdm-zoom-overlay';
  overlay.innerHTML = `
    <button class="sdm-zoom-close" id="sdmZoomClose" aria-label="Fechar zoom">✕</button>
    <img class="sdm-zoom-img" src="${src}" alt="Zoom" />`;
  document.body.appendChild(overlay);
  document.getElementById('sdmZoomClose').addEventListener('click', sdmZoomClose);
  overlay.addEventListener('click', e => { if (e.target === overlay) sdmZoomClose(); });
}

function sdmZoomClose() {
  const el = document.getElementById('sdmZoomOverlay');
  if (el) el.remove();
}

function roomIcon(type) {
  return { quarto:'🛏️', sala:'🛋️', escritorio:'💼', cozinha:'🍳', outro:'🏠' }[type] || '🏠';
}

function orientLabel(o) {
  return { sul:'a Sul', norte:'a Norte', este:'a Este', oeste:'a Oeste' }[o] || o;
}

function roomDefaultName(id) {
  return ['Quarto Principal','Sala','Quarto 2','Escritório','Quarto 3'][id] || `Divisão ${id+1}`;
}

// ============================================================
// 11. STEP INDICATOR
// ============================================================
function setStepActive(n) {
  document.querySelectorAll('.sim-step').forEach(el => {
    const s = parseInt(el.dataset.step);
    el.classList.toggle('active', s === n);
    el.classList.toggle('done', s < n);
  });
}

// ============================================================
// 12. VALIDAÇÃO
// ============================================================
function validateStep2() {
  const errors = [];
  state.rooms.forEach((room, i) => {
    const area = parseFloat(room.areaM2);
    const label = room.name || roomDefaultName(i);
    if (!area || area < 4) errors.push(`"${label}": introduza a área (mín. 4 m²).`);
    if (room.hasWindows) {
      const wArea = parseFloat(room.windowAreaM2);
      if (!wArea || wArea <= 0) errors.push(`"${label}": introduza a área das janelas.`);
    }
  });
  return errors;
}

// ============================================================
// 13. INIT E EVENTOS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // Step 1 — escolher nº de divisões
  document.querySelectorAll('.sim-count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.numRooms = parseInt(btn.dataset.rooms);
      document.querySelectorAll('.sim-count-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Avançar automaticamente após 350ms
      setTimeout(() => renderStep2(), 350);
    });
  });

  // Step 2 — marca
  document.querySelectorAll('.sim-brand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedBrand = btn.dataset.brand;
      renderBrandBtns();
    });
  });

  // Step 2 — voltar
  document.getElementById('backToStep1').addEventListener('click', () => {
    renderStep1();
  });

  // Step 2 — calcular
  document.getElementById('calcResults').addEventListener('click', () => {
    const errors = validateStep2();
    if (errors.length) {
      showError(errors.join('\n'));
      return;
    }
    calcResults();
    renderStep3();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Step 3 — voltar
  document.getElementById('backToStep2').addEventListener('click', () => {
    renderStep2();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Step 3 — todas as acções delegadas em #simResults
  document.getElementById('simResults').addEventListener('click', e => {

    // Trocar marca
    const switchBtn = e.target.closest('.sim-switch-brand');
    if (switchBtn) {
      state.selectedBrand = switchBtn.dataset.brand;
      calcResults(false); // preserva comparação cross-brand ao trocar de marca
      renderStep3();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Ver detalhes — abre modal
    const detailBtn = e.target.closest('.res-detail-btn');
    if (detailBtn) {
      simShowDetail(detailBtn.dataset.series);
      return;
    }

    // Comparar — toggle (suporta cross-brand)
    const cmpBtn = e.target.closest('.res-compare-btn');
    if (cmpBtn) {
      const series = cmpBtn.dataset.series;
      const cBrand = cmpBtn.dataset.brand;
      const key = cBrand + ':' + series;
      if (state.compareMap.has(key)) {
        state.compareMap.delete(key);
      } else {
        // Guardar item completo com brandLabel para comparação cross-brand
        const { mono } = state.results;
        const item = mono && mono.find(o => o.series === series);
        if (item) {
          const brandLabel = { daikin: 'Daikin', bosch: 'Bosch', daitsu: 'Daitsu' }[cBrand] || cBrand;
          state.compareMap.set(key, { ...item, brandLabel });
        }
      }
      // Re-render mantendo posição de scroll
      const scrollY = window.scrollY;
      document.getElementById('simResults').innerHTML = buildResultsHTML();
      window.scrollTo({ top: scrollY });
      return;
    }

    // Limpar comparação
    const clearBtn = e.target.closest('#clearCompare');
    if (clearBtn) {
      state.compareMap.clear();
      const scrollY = window.scrollY;
      document.getElementById('simResults').innerHTML = buildResultsHTML();
      window.scrollTo({ top: scrollY });
      return;
    }

    // Selecionar para orçamento
    const selectBtn = e.target.closest('.res-select-btn');
    if (selectBtn) {
      const key   = selectBtn.dataset.key;
      const label = selectBtn.dataset.label;
      const price = parseFloat(selectBtn.dataset.price);
      if (_selectedQuote.has(key)) {
        _selectedQuote.delete(key);
        selectBtn.classList.remove('selected');
        selectBtn.textContent = '☐ Selecionar para orçamento';
      } else {
        _selectedQuote.set(key, { label, price });
        selectBtn.classList.add('selected');
        selectBtn.textContent = '✔ Selecionado — incluído no pedido';
      }
      updateQuoteBar();
      return;
    }
  });

  // Fechar modal / zoom / quote modal com tecla ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const qm = document.getElementById('simQuoteModal');
      if (qm && qm.style.display !== 'none') { closeQuoteModal(); return; }
      if (document.getElementById('sdmZoomOverlay')) sdmZoomClose();
      else closeDetailModal();
    }
  });

  // Progresso clicável (só passos já completados)
  document.querySelectorAll('.sim-step').forEach(el => {
    el.addEventListener('click', () => {
      const n = parseInt(el.dataset.step);
      if (n === 1) renderStep1();
      else if (n === 2 && state.numRooms > 0) renderStep2();
    });
  });

  // Quote bar → abrir modal
  document.getElementById('simQuoteBarBtn')?.addEventListener('click', openQuoteModal);

  // Quote modal — fechar ao clicar no X ou no overlay
  document.getElementById('simQMClose')?.addEventListener('click', closeQuoteModal);
  document.getElementById('simQuoteModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('simQuoteModal')) closeQuoteModal();
  });

  // Quote modal — enviar
  document.getElementById('simQMWA')?.addEventListener('click', sendViaWhatsApp);
  document.getElementById('simQMEmail')?.addEventListener('click', sendViaEmail);

  // Iniciar no step 1
  renderStep1();
});

function showError(msg) {
  const existing = document.getElementById('simError');
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.id = 'simError';
  div.className = 'sim-error';
  div.innerHTML = `<strong>⚠️ Por favor corrija:</strong><br>${msg.replace(/\n/g, '<br>')}`;
  document.getElementById('step2').querySelector('.container').prepend(div);
  div.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => div.remove(), 6000);
}

// ============================================================
// QUOTE BAR + CONTACT MODAL
// ============================================================
function updateQuoteBar() {
  const bar = document.getElementById('simQuoteBar');
  if (!bar) return;
  const n = _selectedQuote.size;
  bar.style.display = n > 0 ? 'flex' : 'none';
  const countEl = document.getElementById('simQuoteCount');
  if (countEl) countEl.textContent = n === 1 ? '1 opção selecionada' : `${n} opções selecionadas`;
}

function openQuoteModal() {
  const modal = document.getElementById('simQuoteModal');
  if (!modal) return;
  // Preencher itens selecionados
  const sel = document.getElementById('simQMSelected');
  if (sel) {
    let h = '';
    _selectedQuote.forEach(item => {
      h += `<div class="sim-qm-item">
        <span class="sim-qm-check">✓</span>
        <div class="sim-qm-item-info">
          <strong>${item.label}</strong>
          <span>Equipamento a partir de ${fmtPrice(item.price)}</span>
        </div>
      </div>`;
    });
    sel.innerHTML = h;
  }
  document.getElementById('simQMName').value = '';
  document.getElementById('simQMContact').value = '';
  document.getElementById('simQMError').textContent = '';
  modal.style.display = 'flex';
  setTimeout(() => document.getElementById('simQMName').focus(), 80);
}

function closeQuoteModal() {
  const modal = document.getElementById('simQuoteModal');
  if (modal) modal.style.display = 'none';
}

function buildQuoteMessage(name, contact) {
  let msg = 'Olá Ártico Climatização! 👋\n\n';
  msg += 'Fiz a simulação no vosso website e tenho interesse nas seguintes soluções:\n\n';
  _selectedQuote.forEach(item => {
    msg += `• ${item.label} — equipamento a partir de ${fmtPrice(item.price)}\n`;
  });
  msg += `\nNome: ${name}`;
  msg += `\nContacto: ${contact}`;
  msg += '\n\nPodem contactar-me para orçamento completo (equipamento + instalação)?\nObrigado!';
  return msg;
}

function validateQuoteForm() {
  const name    = (document.getElementById('simQMName')?.value    || '').trim();
  const contact = (document.getElementById('simQMContact')?.value || '').trim();
  const errEl   = document.getElementById('simQMError');
  if (!name) {
    if (errEl) errEl.textContent = 'Por favor indique o seu nome.';
    document.getElementById('simQMName').focus();
    return null;
  }
  if (!contact) {
    if (errEl) errEl.textContent = 'Por favor indique o seu telemóvel ou email.';
    document.getElementById('simQMContact').focus();
    return null;
  }
  if (errEl) errEl.textContent = '';
  return { name, contact };
}

function sendViaWhatsApp() {
  const data = validateQuoteForm();
  if (!data) return;
  const msg = buildQuoteMessage(data.name, data.contact);
  window.open('https://wa.me/351964501776?text=' + encodeURIComponent(msg), '_blank');
  closeQuoteModal();
}

function sendViaEmail() {
  const data = validateQuoteForm();
  if (!data) return;
  const msg     = buildQuoteMessage(data.name, data.contact);
  const subject = encodeURIComponent('Pedido de Orçamento — Simulador Ártico Climatização');
  window.location.href = `mailto:artico.clim@gmail.com?subject=${subject}&body=${encodeURIComponent(msg)}`;
}
