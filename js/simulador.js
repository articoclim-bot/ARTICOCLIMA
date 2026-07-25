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
    energyCool: 'A++', energyHeat: 'A+', noise: '22 dB(A)', wifiStatus: 'builtin',
    desc: 'Gama de entrada — conforto essencial, WiFi integrado, Inverter R-32',
    prices:  { 7000:972,  9000:1033, 12000:1169, 15000:1396, 18000:1863, 24000:2319, 28000:2774 },
    models:  { 7000:'FTXF20F', 9000:'FTXF25F', 12000:'FTXF35F', 15000:'FTXF42F', 18000:'FTXF50F', 24000:'FTXF60F', 28000:'FTXF71F' },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Filtro básico', 'Auto-restart'],
    // REGRA 3: FTXF é EXCLUSIVAMENTE monosplit (c/ exterior RXF). Nunca multisplit.
    monoOnly: true,
    image: 'assets/products/daikin-sensira-1.webp',
    images: ['assets/products/daikin-sensira-1.webp','assets/products/daikin-sensira-2.webp','assets/products/daikin-sensira-3.webp'],
  },
  Confora: {
    label: 'Comfora', tier: 'intermedio', badge: '⚡ Alta Eficiência',
    energyCool: 'A++', energyHeat: 'A++', noise: '19 dB(A)', wifiStatus: 'builtin',
    desc: 'Gama intermédia — A++ com WiFi integrado e filtro PM2.5',
    prices:  { 7000:1248, 9000:1341, 12000:1513, 18000:2392, 24000:2983, 28000:3450 },
    models:  { 7000:'FTXP20N9', 9000:'FTXP25N9', 12000:'FTXP35N9', 18000:'FTXP50N9', 24000:'FTXP60N', 28000:'FTXP71N' },
    features: ['Inverter', 'R-32', 'Modo I-Feel', 'Filtro PM2.5', 'WiFi integrado'],
    // REGRA 1+2: FTXP20/25/35 (≤12k) compatíveis multisplit MXM. FTXP50/60/71 (≥18k) monosplit c/ RXP.
    multisplitMaxBTU: 12000,
    image: 'assets/products/daikin-confora-1.webp',
    images: ['assets/products/daikin-confora-1.webp','assets/products/daikin-confora-2.webp','assets/products/daikin-confora-3.webp'],
  },
  Perfera: {
    label: 'Perfera', tier: 'premium', badge: '🏆 Topo de Gama',
    energyCool: 'A+++', energyHeat: 'A++', noise: '19 dB(A)', wifiStatus: 'builtin',
    desc: 'Gama premium — WiFi integrado, purificador de ar e controlo por app',
    prices:  { 7000:1482, 9000:1568, 12000:1802, 15000:2300, 18000:2952, 24000:3346, 28000:4121 },
    models:  { 7000:'FTXM20A', 9000:'FTXM25A', 12000:'FTXM35A', 15000:'FTXM42A', 18000:'FTXM50A', 24000:'FTXM60A', 28000:'FTXM71A' },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Purificador de ar', 'App Daikin Online'],
    // REGRA 1: FTXM compatível multisplit MXM em todos os BTUs disponíveis
    image: 'assets/products/daikin-perfera-1.webp',
    images: ['assets/products/daikin-perfera-1.webp','assets/products/daikin-perfera-2.webp','assets/products/daikin-perfera-3.webp'],
  },
  Stylish: {
    label: 'Stylish', tier: 'design', badge: '🎨 Design Premium',
    energyCool: 'A+++', energyHeat: 'A++', noise: '19 dB(A)', wifiStatus: 'builtin',
    desc: 'Design premiado — Branco, Prateado e Preto (máx. 18k BTU)',
    prices:  { 7000:1759, 9000:1888, 12000:2189, 15000:2768, 18000:3290 },
    models:  { 7000:'FTXA20CW', 9000:'FTXA25CW', 12000:'FTXA35CW', 15000:'FTXA42CW', 18000:'FTXA50CW' },
    // REGRA 1: FTXA compatível multisplit MXM até 18k BTU
    // 5 novas cores (catálogo Daikin): dc=Tecido Azul, dg=Tecido Cinzento, dl=Pele Castanha, dp=Madeira Clara, dy=Madeira Escura
    colorKeys: ['white','silver','black','dc','dg','dl','dp','dy'],
    colorPrices: {
      white: { 7000:1759, 9000:1888, 12000:2189, 15000:2768, 18000:3290 },
      silver:{ 7000:1827, 9000:1968, 12000:2282, 15000:2872, 18000:3407 },
      black: { 7000:1827, 9000:1968, 12000:2282, 15000:2872, 18000:3407 },
      dc:    { 7000:2103, 9000:2202, 12000:2515, 15000:3100, 18000:3622 },
      dg:    { 7000:2103, 9000:2202, 12000:2515, 15000:3100, 18000:3622 },
      dl:    { 7000:2103, 9000:2202, 12000:2515, 15000:3100, 18000:3622 },
      dp:    { 7000:2103, 9000:2202, 12000:2515, 15000:3100, 18000:3622 },
      dy:    { 7000:2103, 9000:2202, 12000:2515, 15000:3100, 18000:3622 },
    },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Design icónico', '8 cores disponíveis'],
    maxBTU: 18000,
    image: 'assets/products/daikin-stylish-branco-1.webp',
    images: {
      white:  ['assets/products/daikin-stylish-branco-1.webp','assets/products/daikin-stylish-branco-2.webp','assets/products/daikin-stylish-branco-3.webp'],
      silver: ['assets/products/daikin-stylish-silver-1.webp','assets/products/daikin-stylish-silver-2.webp','assets/products/daikin-stylish-silver-3.webp'],
      black:  ['assets/products/daikin-stylish-black-1.webp','assets/products/daikin-stylish-black-2.webp','assets/products/daikin-stylish-black-3.webp'],
      dc: ['assets/products/daikin-stylish-dc.jpg'],
      dg: ['assets/products/daikin-stylish-dg.jpg'],
      dl: ['assets/products/daikin-stylish-dl.jpg'],
      dp: ['assets/products/daikin-stylish-dp.jpg'],
      dy: ['assets/products/daikin-stylish-dy.jpg'],
    },
  },
  Emura: {
    label: 'Emura', tier: 'design', badge: '✨ Ícone de Design',
    energyCool: 'A+++', energyHeat: 'A++', noise: '19 dB(A)', wifiStatus: 'builtin',
    desc: 'Design icónico europeu — purificador de ar e app (máx. 18k BTU)',
    prices:  { 7000:1962, 9000:2048, 12000:2343, 15000:3007, 18000:3487 },
    models:  { 7000:'FTXJ20AW', 9000:'FTXJ25AW', 12000:'FTXJ35AW', 15000:'FTXJ42AW', 18000:'FTXJ50AW' },
    // REGRA 1: FTXJ compatível multisplit MXM em todos os BTUs disponíveis
    colorPrices: {
      white:  { 7000:1962, 9000:2048, 12000:2343, 15000:3007, 18000:3487 },
      silver: { 7000:2128, 9000:2226, 12000:2540, 15000:3124, 18000:3653 },
      black:  { 7000:2128, 9000:2226, 12000:2540, 15000:3124, 18000:3653 },
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
  { btu:7000,  kw:2.0, model:'FTXM20A', pvp: Math.round(445 * 1.23) },
  { btu:9000,  kw:2.5, model:'FTXM25A', pvp: Math.round(485 * 1.23) },
  { btu:12000, kw:3.5, model:'FTXM35A', pvp: Math.round(625 * 1.23) },
  { btu:15000, kw:4.2, model:'FTXM42A', pvp: Math.round(720 * 1.23) },
  { btu:18000, kw:5.0, model:'FTXM50A', pvp: Math.round(775 * 1.23) },
  { btu:24000, kw:7.0, model:'FTXM60A', pvp: Math.round(840 * 1.23) },
  { btu:28000, kw:8.2, model:'FTXM71A', pvp: Math.round(1065 * 1.23) },
];

// --- DAIKIN — Multisplit Exterior (MXM-A9, c/ IVA) ---
const DAIKIN_MULTI_OUTDOOR = [
  { model:'2MXM40A9', zones:2, kw:4.0, pvp:Math.round(1365*1.23), maxZoneKW:3.5 },
  { model:'2MXM50A8', zones:2, kw:5.0, pvp:Math.round(1480*1.23), maxZoneKW:5.0 },
  { model:'2MXM68A8', zones:2, kw:6.8, pvp:Math.round(1915*1.23), maxZoneKW:5.0 },
  { model:'3MXM40A8', zones:3, kw:4.0, pvp:Math.round(1530*1.23), maxZoneKW:3.5 },
  { model:'3MXM52A8', zones:3, kw:5.2, pvp:Math.round(1700*1.23), maxZoneKW:5.0 },
  { model:'3MXM68A8', zones:3, kw:6.8, pvp:Math.round(2145*1.23), maxZoneKW:7.0 },
  { model:'4MXM68A8', zones:4, kw:6.8, pvp:Math.round(2535*1.23), maxZoneKW:7.0 },
  { model:'4MXM80A8', zones:4, kw:8.0, pvp:Math.round(3095*1.23), maxZoneKW:8.2 },
  { model:'5MXM90A8', zones:5, kw:9.0, pvp:Math.round(3220*1.23), maxZoneKW:8.2 },
];

// --- DAIKIN — Sensira Multisplit Interior (CTXF, c/ IVA) ---
// Unidade de parede económica para exterior MXF · apenas 7k–12k BTU
const DAIKIN_SENSIRA_MULTI_INDOOR = [
  { btu: 7000,  kw: 2.0, model: 'CTXF20', pvp: Math.round(245 * 1.23) },
  { btu: 9000,  kw: 2.5, model: 'CTXF25', pvp: Math.round(270 * 1.23) },
  { btu: 12000, kw: 3.5, model: 'CTXF35', pvp: Math.round(315 * 1.23) },
];

// --- DAIKIN — Confora Multisplit Interior (FTXP, c/ IVA) — apenas ≤12k BTU ---
const DAIKIN_CONFORA_MULTI_INDOOR = [
  { btu: 7000,  kw: 2.0, model: 'FTXP20N9', pvp: Math.round(315 * 1.23) },
  { btu: 9000,  kw: 2.5, model: 'FTXP25N9', pvp: Math.round(355 * 1.23) },
  { btu: 12000, kw: 3.5, model: 'FTXP35N9', pvp: Math.round(430 * 1.23) },
];

// --- DAIKIN — Stylish Multisplit Interior (FTXA, c/ IVA) --- até 18k BTU ---
const DAIKIN_STYLISH_MULTI_INDOOR = [
  { btu: 7000,  kw: 2.0, model: 'FTXA20CW', pvp: { white: Math.round(615*1.23), silver: Math.round(670*1.23), black: Math.round(670*1.23), dc: Math.round(895*1.23), dg: Math.round(895*1.23), dl: Math.round(895*1.23), dp: Math.round(895*1.23), dy: Math.round(895*1.23) } },
  { btu: 9000,  kw: 2.5, model: 'FTXA25CW', pvp: { white: Math.round(670*1.23), silver: Math.round(735*1.23), black: Math.round(735*1.23), dc: Math.round(925*1.23), dg: Math.round(925*1.23), dl: Math.round(925*1.23), dp: Math.round(925*1.23), dy: Math.round(925*1.23) } },
  { btu: 12000, kw: 3.5, model: 'FTXA35CW', pvp: { white: Math.round(730*1.23), silver: Math.round(805*1.23), black: Math.round(805*1.23), dc: Math.round(995*1.23), dg: Math.round(995*1.23), dl: Math.round(995*1.23), dp: Math.round(995*1.23), dy: Math.round(995*1.23) } },
  { btu: 15000, kw: 4.2, model: 'FTXA42CW', pvp: { white: Math.round(830*1.23), silver: Math.round(915*1.23), black: Math.round(915*1.23), dc: Math.round(1100*1.23), dg: Math.round(1100*1.23), dl: Math.round(1100*1.23), dp: Math.round(1100*1.23), dy: Math.round(1100*1.23) } },
  { btu: 18000, kw: 5.0, model: 'FTXA50CW', pvp: { white: Math.round(885*1.23), silver: Math.round(980*1.23), black: Math.round(980*1.23), dc: Math.round(1155*1.23), dg: Math.round(1155*1.23), dl: Math.round(1155*1.23), dp: Math.round(1155*1.23), dy: Math.round(1155*1.23) } },
];

// --- DAIKIN — Emura Multisplit Interior (FTXJ, c/ IVA) --- até 18k BTU ---
const DAIKIN_EMURA_MULTI_INDOOR = [
  { btu: 7000,  kw: 2.0, model: 'FTXJ20AW9', pvp: { white: Math.round(685*1.23), silver: Math.round(820*1.23), black: Math.round(820*1.23) } },
  { btu: 9000,  kw: 2.5, model: 'FTXJ25AW9', pvp: { white: Math.round(715*1.23), silver: Math.round(860*1.23), black: Math.round(860*1.23) } },
  { btu: 12000, kw: 3.5, model: 'FTXJ35AW9', pvp: { white: Math.round(875*1.23), silver: Math.round(1035*1.23), black: Math.round(1035*1.23) } },
  { btu: 15000, kw: 4.2, model: 'FTXJ42AW9', pvp: { white: Math.round(955*1.23), silver: Math.round(1050*1.23), black: Math.round(1050*1.23) } },
  { btu: 18000, kw: 5.0, model: 'FTXJ50AW9', pvp: { white: Math.round(1075*1.23), silver: Math.round(1210*1.23), black: Math.round(1210*1.23) } },
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
  '3200i': {
    label: 'Climate 3200i', tier: 'entrada', badge: '🆕 Novo Modelo',
    energyCool: 'A++', energyHeat: 'A+', noise: '26 dB(A)', wifiStatus: 'optional',
    desc: 'Novo design — iClean · Super Ionizador · Golden Fin · WiFi via acessório',
    prices: { 9000:916, 12000:996, 18000:1470, 24000:1784 },
    models: { 9000:'CL3200i-Set 26WE', 12000:'CL3200i-Set 35WE', 18000:'CL3200i-Set 53WE', 24000:'CL3200i-Set 70WE' },
    features: ['Inverter', 'R-32', 'Auto-limpeza iClean', 'Super Ionizador', 'Golden Fin anticorrosivo'],
    image: 'assets/products/bosch-3200i-1.jpg',
    images: ['assets/products/bosch-3200i-1.jpg','assets/products/bosch-3200i-2.jpg'],
  },
  '6000i': {
    label: 'Climate 6000i', tier: 'premium', badge: '⚡ Alta Eficiência',
    energyCool: 'A+++', energyHeat: 'A++', noise: '24 dB(A)', wifiStatus: 'optional',
    desc: 'Gama premium — A+++ · Ionizador · Sensor de movimento · Golden Fin · Swing 3D · WiFi via acessório',
    prices: { 9000:1107, 12000:1218, 18000:1790, 24000:2220 },
    models: { 9000:'CL6000i-Set 26WE', 12000:'CL6000i-Set 35WE', 18000:'CL6000i-Set 53WE', 24000:'CL6000i-Set 70WE' },
    features: ['Inverter', 'R-32', 'A+++', 'Ionizador', 'Sensor de movimento', 'Golden Fin anticorrosivo'],
    image: 'assets/products/bosch-6000i-1.webp',
    images: ['assets/products/bosch-6000i-1.webp','assets/products/bosch-6000i-2.webp','assets/products/bosch-6000i-3.webp','assets/products/bosch-6000i-4.webp'],
  },
  '7000i': {
    label: 'Climate 7000i', tier: 'premium', badge: '🏆 Topo de Gama',
    energyCool: 'A+++', energyHeat: 'A+++', noise: '20 dB(A)', wifiStatus: 'optional',
    desc: 'Topo de gama — A+++ · Sensor presença · Ionizador · iF Design 2025 · WiFi via acessório',
    prices: { 9000:1550, 12000:1667, 18000:2731 },
    models: { 9000:'CL7000i-Set 26WE', 12000:'CL7000i-Set 35WE', 18000:'CL7000i-Set 53WE' },
    features: ['Inverter', 'R-32', 'A+++', 'Sensor de presença', 'Ionizador avançado'],
    image: 'assets/products/bosch-7000i-branco-1.webp',
    images: ['assets/products/bosch-7000i-branco-1.webp','assets/products/bosch-7000i-branco-2.webp','assets/products/bosch-7000i-branco-3.webp'],
  },
};

// --- BOSCH — Multisplit Interior (Climate 3200i Mural, c/ IVA) ---
const BOSCH_MULTI_INDOOR = [
  { btu: 7000,  kw: 2.1, model: 'CL3200i 20E', pvp: 258 },
  { btu: 9000,  kw: 2.6, model: 'CL3200i 26E', pvp: 271 },
  { btu: 12000, kw: 3.5, model: 'CL3200i 35E', pvp: 308 },
  { btu: 18000, kw: 5.3, model: 'CL3200i 53E', pvp: 381 },
  { btu: 24000, kw: 7.0, model: 'CL3200i 70E', pvp: 517 },
];

// --- BOSCH — Multisplit Interior (Climate 6000i Mural, c/ IVA) ---
const BOSCH_6000I_MULTI_INDOOR = [
  { btu: 9000,  kw: 2.6, model: 'CL6001i 26E', pvp: 314 },
  { btu: 12000, kw: 3.5, model: 'CL6001i 35E', pvp: 363 },
  { btu: 18000, kw: 5.3, model: 'CL6001i 53E', pvp: 455 },
  { btu: 24000, kw: 7.0, model: 'CL6001i 70E', pvp: 615 },
];

// --- BOSCH — Multisplit Exterior (Climate 5000 M, c/ IVA) ---
const BOSCH_MULTI_OUTDOOR = [
  { model: 'Climate 5000 M 41/2',  zones: 2, kw: 4.1,  pvp: 1156 },
  { model: 'Climate 5000 M 53/2',  zones: 2, kw: 5.3,  pvp: 1310 },
  { model: 'Climate 5000 M 62/3',  zones: 3, kw: 6.2,  pvp: 1673 },
  { model: 'Climate 5000 M 79/3',  zones: 3, kw: 7.9,  pvp: 1943 },
  { model: 'Climate 5000 M 82/4',  zones: 4, kw: 8.2,  pvp: 2116 },
  { model: 'Climate 5000 M 105/4', zones: 4, kw: 10.6, pvp: 2595 },
  { model: 'Climate 5000 M 125/5', zones: 5, kw: 12.3, pvp: 2884 },
];

// --- DAITSU — Monosplit (conjuntos, c/ IVA) ---
const DAITSU_MONO = {
  'ARTIC': {
    label: 'ARTIC', tier: 'premium', badge: '🏆 Alta Eficiência',
    energyCool: 'A++', energyHeat: 'A+++', noise: '25 dB(A)', wifiStatus: 'builtin',
    desc: 'A+++ aquec. · WiFi incluído · I Feel · IA+ · Controlo por Voz · 5 filtros de qualidade do ar',
    prices: { 9000:700, 12000:760, 18000:1090, 24000:1290 },
    models: { 9000:'DS-9KZ', 12000:'DS-12KZ', 18000:'DS-18KZ', 24000:'DS-24KZ' },
    features: ['Inverter', 'R-32', 'WiFi incluído', 'A+++', 'I Feel', 'IA+', '5 filtros'],
    maxBTU: 24000,
    image: 'assets/products/daitsu-artic-kz-1.jpg',
    images: ['assets/products/daitsu-artic-kz-1.jpg','assets/products/daitsu-artic-kz-2.jpg','assets/products/daitsu-artic-kz-3.jpg','assets/products/daitsu-artic-kz-4.jpg','assets/products/daitsu-artic-kz-5.jpg','assets/products/daitsu-artic-kz-6.jpg','assets/products/daitsu-artic-kz-7.jpg','assets/products/daitsu-artic-kz-8.jpg','assets/products/daitsu-artic-kz-9.jpg'],
  },
};

// --- DAITSU — Multisplit Interior (ARTIC, c/ IVA) ---
const DAITSU_MULTI_INDOOR = [
  { btu: 9000,  kw: 2.64, model: 'DS-9KZ',  pvp: 260 },
  { btu: 12000, kw: 3.52, model: 'DS-12KZ', pvp: 265 },
  { btu: 18000, kw: 5.14, model: 'DS-18KZ', pvp: 430 },
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

// --- SAMSUNG — Monosplit (conjuntos, c/ IVA) ---
const SAMSUNG_MONO = {
  'Cebu S2': {
    label: 'Cebu S2', tier: 'entrada', badge: '💰 Melhor Preço',
    energyCool: 'A++', energyHeat: 'A+', noise: '37 dB(A)', wifiStatus: 'builtin',
    desc: 'Gama entrada — Wi-Fi SmartThings integrado · WindFree™ · Controlo Remoto Solar Cell',
    prices: { 7000: 800, 9000: 880, 12000: 990, 18000: 1400, 24000: 1750 },
    models: { 7000:'AR50F07C1AH', 9000:'AR50F09C1AH', 12000:'AR50F12C1AH', 18000:'AR50F18C1AH', 24000:'AR50F24C1AH' },
    features: ['Wi-Fi SmartThings integrado', 'WindFree™ — sem corrente de ar frio direto', 'Controlo Remoto Solar Cell', 'Compatível Multi-Split FJM'],
    image: 'assets/products/samsung-cebu-s2-1.png',
    images: ['assets/products/samsung-cebu-s2-1.png','assets/products/samsung-cebu-s2-2.png','assets/products/samsung-cebu-s2-3.png','assets/products/samsung-cebu-s2-4.png','assets/products/samsung-cebu-s2-5.png','assets/products/samsung-cebu-s2-6.png','assets/products/samsung-cebu-s2-7.png','assets/products/samsung-cebu-s2-8.png','assets/products/samsung-cebu-s2-9.png','assets/products/samsung-cebu-s2-10.png'],
  },
  'AR35': {
    label: 'AR35 Wi-Fi', tier: 'entrada', badge: '🆕 Novo Modelo',
    energyCool: 'A++', energyHeat: 'A+', noise: '36 dB(A)', wifiStatus: 'builtin',
    desc: 'Gama entrada — Wi-Fi SmartThings integrado · Visor Digital · Aquecimento até -15°C',
    prices: { 9000: 850, 12000: 980, 18000: 1350, 24000: 1700 },
    models: { 9000:'AR40H09C1AM', 12000:'AR40H12C1AM', 18000:'AR40H18C1AM', 24000:'AR40H24C1AM' },
    features: ['Wi-Fi SmartThings integrado', 'Visor Digital', 'Aquecimento até -15°C exterior'],
    monoOnly: true,
    image: 'assets/products/samsung-ar35-wifi-1.png',
    images: ['assets/products/samsung-ar35-wifi-1.png','assets/products/samsung-ar35-wifi-2.png','assets/products/samsung-ar35-wifi-3.png','assets/products/samsung-ar35-wifi-4.png','assets/products/samsung-ar35-wifi-5.png','assets/products/samsung-ar35-wifi-6.png'],
  },
  'Comfort S2': {
    label: 'WindFree® Comfort S2', tier: 'intermedio', badge: '⚡ Conforto Total',
    energyCool: 'A++', energyHeat: 'A++', noise: '38 dB(A)', wifiStatus: 'builtin',
    desc: 'Gama intermédia — WindFree™ · Filtro Easy Plus + Freeze Wash · SmartThings',
    prices: { 9000: 1050, 12000: 1200, 18000: 1650, 24000: 2100 },
    models: { 9000:'AR60F09C1AW', 12000:'AR60F12C1AW', 18000:'AR60F18C1AW', 24000:'AR60F24C1AW' },
    features: ['WindFree™ — sem corrente de ar frio direto', 'Filtro Easy Plus + Freeze Wash', 'Wi-Fi SmartThings integrado', 'Compatível Multi-Split FJM'],
    image: 'assets/products/samsung-windfree-comfort-s2-1.png',
    images: ['assets/products/samsung-windfree-comfort-s2-1.png','assets/products/samsung-windfree-comfort-s2-2.png','assets/products/samsung-windfree-comfort-s2-3.png','assets/products/samsung-windfree-comfort-s2-4.png','assets/products/samsung-windfree-comfort-s2-5.png','assets/products/samsung-windfree-comfort-s2-6.png','assets/products/samsung-windfree-comfort-s2-7.png','assets/products/samsung-windfree-comfort-s2-8.png','assets/products/samsung-windfree-comfort-s2-9.png','assets/products/samsung-windfree-comfort-s2-10.png'],
  },
  'Avant S2': {
    label: 'WindFree® Avant S2', tier: 'intermedio', badge: '🌬️ WindFree™ A+++',
    energyCool: 'A+++', energyHeat: 'A++', noise: '38 dB(A)', wifiStatus: 'builtin',
    desc: 'Gama premium-intermédia — A+++ arref. · WindFree™ · Filtro Tripla Ação + Freeze Wash',
    prices: { 7000: 1100, 9000: 1200, 12000: 1380, 18000: 1900, 24000: 2400 },
    models: { 7000:'AR70F07C1AW', 9000:'AR70F09C1AW', 12000:'AR70F12C1AW', 18000:'AR70F18C1AW', 24000:'AR70F24C1AW' },
    features: ['WindFree™ — sem corrente de ar frio direto', 'A+++ arrefecimento', 'Filtro Tripla Ação + Freeze Wash', 'Compatível Multi-Split FJM'],
    image: 'assets/products/samsung-windfree-avant-s2-1.png',
    images: ['assets/products/samsung-windfree-avant-s2-1.png','assets/products/samsung-windfree-avant-s2-2.png','assets/products/samsung-windfree-avant-s2-3.png','assets/products/samsung-windfree-avant-s2-4.png','assets/products/samsung-windfree-avant-s2-5.png','assets/products/samsung-windfree-avant-s2-6.png','assets/products/samsung-windfree-avant-s2-7.png','assets/products/samsung-windfree-avant-s2-8.png','assets/products/samsung-windfree-avant-s2-9.png','assets/products/samsung-windfree-avant-s2-10.png'],
  },
  'Première': {
    label: 'WindFree® Première', tier: 'premium', badge: '🏆 Alta Eficiência',
    energyCool: 'A+++', energyHeat: 'A++', noise: '37 dB(A)', wifiStatus: 'builtin',
    desc: 'Gama premium — A+++ · WindFree™ · AI Motion Wind · Controlo Remoto Solar Cell',
    prices: { 7000: 1350, 9000: 1450, 12000: 1650, 18000: 2200, 24000: 2850 },
    models: { 7000:'AR70H07C1AW', 9000:'AR70H09C1AW', 12000:'AR70H12C1AW', 18000:'AR70H18C1AW', 24000:'AR70H24C1AW' },
    features: ['WindFree™ + AI Motion Wind', 'A+++ arrefecimento', 'Filtro PM2.5 + Freeze Wash', 'Compatível Multi-Split FJM'],
    image: 'assets/products/samsung-windfree-premiere-1.png',
    images: ['assets/products/samsung-windfree-premiere-1.png','assets/products/samsung-windfree-premiere-2.png','assets/products/samsung-windfree-premiere-3.png','assets/products/samsung-windfree-premiere-4.png','assets/products/samsung-windfree-premiere-5.png','assets/products/samsung-windfree-premiere-6.png','assets/products/samsung-windfree-premiere-7.png','assets/products/samsung-windfree-premiere-8.png','assets/products/samsung-windfree-premiere-9.png'],
  },
  'Première+': {
    label: 'WindFree® Première+', tier: 'premium', badge: '✨ Topo de Gama',
    energyCool: 'A+++', energyHeat: 'A+++', noise: '38 dB(A)', wifiStatus: 'builtin',
    desc: 'Topo de gama — A+++ · Sensor Radar · Compressor Duplo Rotativo · Controlo Solar Cell',
    prices: { 9000: 1700, 12000: 1900 },
    models: { 9000:'AR70H09CAAW', 12000:'AR70H12CAAW' },
    features: ['WindFree™ + Sensor de Movimento Radar', 'A+++ arref. e aquec.', 'Compressor Duplo Rotativo', 'Compatível Multi-Split FJM'],
    maxBTU: 12000,
    image: 'assets/products/samsung-windfree-premiere-plus-1.png',
    images: ['assets/products/samsung-windfree-premiere-plus-1.png','assets/products/samsung-windfree-premiere-plus-2.png','assets/products/samsung-windfree-premiere-plus-3.png','assets/products/samsung-windfree-premiere-plus-4.png','assets/products/samsung-windfree-premiere-plus-5.png','assets/products/samsung-windfree-premiere-plus-6.png','assets/products/samsung-windfree-premiere-plus-7.png','assets/products/samsung-windfree-premiere-plus-8.png','assets/products/samsung-windfree-premiere-plus-9.png'],
  },
};

// --- SAMSUNG — Multisplit Interior FJM (Avant S2, c/ IVA) ---
// Todas as séries WindFree® (exceto AR35) são compatíveis com QUALQUER exterior FJM
const SAMSUNG_MULTI_INDOOR = [
  { btu: 7000,  kw: 2.0, model: 'AR70F07C1AW', pvp: 370 },
  { btu: 9000,  kw: 2.5, model: 'AR70F09C1AW', pvp: 420 },
  { btu: 12000, kw: 3.5, model: 'AR70F12C1AW', pvp: 480 },
  { btu: 18000, kw: 5.0, model: 'AR70F18C1AW', pvp: 680 },
  { btu: 24000, kw: 6.5, model: 'AR70F24C1AW', pvp: 890 },
];

// --- SAMSUNG — Multisplit Exterior FJM (c/ IVA) ---
const SAMSUNG_MULTI_OUTDOOR = [
  { model: 'AJ025TXJ2KH/EU', zones: 2, kw: 2.5, pvp: 1100 },
  { model: 'AJ040TXJ2KH/EU', zones: 2, kw: 4.0, pvp: 1250 },
  { model: 'AJ052TXJ3KH/EU', zones: 3, kw: 5.2, pvp: 1580 },
  { model: 'AJ068TXJ3KH/EU', zones: 3, kw: 6.8, pvp: 1850 },
  { model: 'AJ080TXJ4KH/EU', zones: 4, kw: 8.0, pvp: 2200 },
  { model: 'AJ100TXJ5KH/EU', zones: 5, kw: 10.0, pvp: 2650 },
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
  quoteGoal: null, // 'novo' | 'substituicao' | 'sem_pre' — objetivo da instalação (pedido de orçamento)
  wifiChoice: null, // 'sim' | 'nao' — só relevante quando a config tem WiFi opcional (acessório)
};

// Objetivo da instalação — opções do formulário de pedido de orçamento
const INSTALL_GOALS = {
  novo: 'Instalação de equipamento novo com pré-instalação',
  substituicao: 'Substituição do equipamento antigo',
  sem_pre: 'Instalação do equipamento sem pré-instalação',
};

function setQuoteGoal(goal, btnEl) {
  state.quoteGoal = goal;
  document.querySelectorAll('#qm-goal-options .qm-goal-btn').forEach(b => b.classList.toggle('active', b === btnEl));
  const errEl = document.getElementById('qm-error');
  if (errEl) errEl.textContent = '';
}

function setQuoteWifi(choice, btnEl) {
  state.wifiChoice = choice;
  document.querySelectorAll('#qm-wifi-options .qm-goal-btn').forEach(b => b.classList.toggle('active', b === btnEl));
  const errEl = document.getElementById('qm-error');
  if (errEl) errEl.textContent = '';
}

// Verifica se alguma divisão da configuração actual usa um modelo cujo WiFi é opcional
// (acessório à parte) — só nesse caso faz sentido perguntar no pedido de orçamento.
function configHasOptionalWifi() {
  const validRooms = state.rooms.filter(r => parseFloat(r.areaM2) > 0);
  return validRooms.some(room => {
    const tier = btuToTier(calcBTU(room));
    const isMulti = state.rooms.length > 1 && room.useMulti;
    let key;
    if (isMulti) {
      const unit = getMultiIndoorForRoom(room, tier);
      key = unit ? getSeriesCatalogKey(state.brand, unit.model) : null;
    } else {
      key = room.series || getCheapestMonoSeries(state.brand, tier);
    }
    const desc = getSeriesDescriptors(state.brand, key);
    return desc && desc.wifiStatus === 'optional';
  });
}

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
    const gainMap = { sul: 300, este: 200, oeste: 200, norte: 100 };
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
  if (brand === 'daikin')   return DAIKIN_MONO;
  if (brand === 'bosch')    return BOSCH_MONO;
  if (brand === 'daitsu')   return DAITSU_MONO;
  if (brand === 'samsung')  return SAMSUNG_MONO;
  return {};
}

function getMultiIndoorList(brand) {
  if (brand === 'daikin')   return DAIKIN_MULTI_INDOOR;
  if (brand === 'bosch')    return BOSCH_MULTI_INDOOR;
  if (brand === 'daitsu')   return DAITSU_MULTI_INDOOR;
  if (brand === 'samsung')  return SAMSUNG_MULTI_INDOOR;
  return [];
}

function getMultiOutdoorList(brand) {
  if (brand === 'daikin')   return DAIKIN_MULTI_OUTDOOR;
  if (brand === 'bosch')    return BOSCH_MULTI_OUTDOOR;
  if (brand === 'daitsu')   return DAITSU_MULTI_OUTDOOR;
  if (brand === 'samsung')  return SAMSUNG_MULTI_OUTDOOR;
  return [];
}

function brandLogoSrc(brand) {
  return brand === 'samsung' ? 'assets/logo-samsung.svg' : `assets/logo-${brand}.png`;
}

function getMultiIndoorUnit(brand, tier) {
  const list = getMultiIndoorList(brand);
  return list.find(u => u.btu >= tier) || list[list.length - 1] || null;
}

// Devolve a unidade interior correcta para um room multi, respeitando o multiType e cor.
// Se a escolha não é explícita, usa getEffectiveMultiType para determinar o tipo óptimo.
// pvp já inclui ajuste de cor (para Stylish/Emura).
function getMultiIndoorForRoom(room, tier, brand = state.brand) {
  if (brand === 'bosch' && room.multiType === '6000i' && room.multiTypeExplicit) {
    return BOSCH_6000I_MULTI_INDOOR.find(u => u.btu >= tier) || BOSCH_6000I_MULTI_INDOOR[BOSCH_6000I_MULTI_INDOOR.length - 1] || null;
  }
  if (brand !== 'daikin') return getMultiIndoorUnit(brand, tier);
  const mt = room.multiTypeExplicit
    ? (room.multiType || 'standard')
    : getEffectiveMultiType(room, state.rooms);
  const color = state.pickerColors[room.id] || room.color || 'white';
  if (mt === 'sensira') return DAIKIN_SENSIRA_MULTI_INDOOR.find(u => u.btu >= tier) || null;
  if (mt === 'confora') return DAIKIN_CONFORA_MULTI_INDOOR.find(u => u.btu >= tier) || null;
  if (mt === 'stylish') {
    const u = DAIKIN_STYLISH_MULTI_INDOOR.find(u => u.btu >= tier);
    return u ? { ...u, pvp: u.pvp[color] || u.pvp.white } : null;
  }
  if (mt === 'emura') {
    const u = DAIKIN_EMURA_MULTI_INDOOR.find(u => u.btu >= tier);
    return u ? { ...u, pvp: u.pvp[color] || u.pvp.white } : null;
  }
  return DAIKIN_MULTI_INDOOR.find(u => u.btu >= tier) || null; // standard FTXM
}

// Devolve o tier efectivo a usar para uma série: o tier exacto se existir,
// ou o tamanho imediatamente acima (ex: 7k Bosch → 9k, o mais pequeno disponível).
function getEffectiveTier(series, tier) {
  if (series.prices[tier] !== undefined) return tier;
  const available = Object.keys(series.prices).map(Number).sort((a, b) => a - b);
  return available.find(t => t >= tier) || null;
}

function getCheapestMonoSeries(brand, tier) {
  const catalog = getBrandCatalog(brand);
  let cheapestKey = null;
  let cheapestPrice = Infinity;
  for (const [key, series] of Object.entries(catalog)) {
    if (series.maxBTU && tier > series.maxBTU) continue;
    const eTier = getEffectiveTier(series, tier);
    if (eTier === null) continue;
    const price = series.prices[eTier];
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
  const eTier = getEffectiveTier(series, tier) || tier;
  if (series.colorPrices) {
    const col = color || 'white';
    return (series.colorPrices[col] && series.colorPrices[col][eTier]) || series.prices[eTier] || 0;
  }
  return series.prices[eTier] || 0;
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

  const outdoorList = getMultiOutdoorList(brand);

  const indoorUnits = multiRoomsWithTier.map(r => {
    let unit;
    if (brand === 'daikin' || brand === 'bosch') {
      unit = getMultiIndoorForRoom(r, r.tier, brand);
    } else {
      const indoorList = getMultiIndoorList(brand);
      unit = indoorList.find(u => u.btu >= r.tier) || indoorList[indoorList.length - 1];
    }
    return unit ? { room: r, unit } : null;
  });
  if (indoorUnits.some(iu => !iu)) return null;
  // Rede de segurança: uma unidade Sensira (CTXF) nunca pode ir para o exterior
  // MXM partilhado aqui — precisa do exterior MXF dedicado (ver calcSensiraMulti).
  if (brand === 'daikin' && indoorUnits.some(iu => iu.unit.model && iu.unit.model.startsWith('CTXF'))) return null;

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

  if (!candidates.length) {
    // Fallback: sem exterior que caiba dentro do rácio 130% →
    // usar o exterior mais potente com zonas suficientes (melhor mostrar algo num simulador).
    const fallbackList = brand === 'daikin'
      ? outdoorList.filter(ou => ou.zones >= n && maxZoneKW <= ou.maxZoneKW)
      : outdoorList.filter(ou => ou.zones >= n);
    if (!fallbackList.length) return null;
    const outdoor     = fallbackList.sort((a, b) => b.kw - a.kw)[0]; // mais potente disponível
    const indoorTotal = indoorUnits.reduce((s, { unit }) => s + unit.pvp, 0);
    return { outdoor, indoorUnits, indoorTotal, total: outdoor.pvp + indoorTotal };
  }

  const outdoor     = candidates.sort((a, b) => a.pvp - b.pvp)[0];
  const indoorTotal = indoorUnits.reduce((s, { unit }) => s + unit.pvp, 0);

  return { outdoor, indoorUnits, indoorTotal, total: outdoor.pvp + indoorTotal };
}

// Verifica se o sistema Sensira (CTXF+MXF) é viável para estas divisões.
// Condições: 2-3 zonas, todas ≤12k BTU, nenhuma já fixada explicitamente noutra
// série (a Sensira usa exterior MXF exclusivo, incompatível com o MXM das outras),
// E existe exterior MXF para o kW total.
function isSensiraPossible(multiRooms) {
  const n = multiRooms.length;
  if (n < 2 || n > 3) return false;
  if (multiRooms.some(r => r.multiTypeExplicit && r.multiType !== 'sensira')) return false;
  const tiers = multiRooms.map(r => btuToTier(calcBTU(r)));
  if (!tiers.every(t => t <= 12000)) return false;
  const totalKW = tiers.reduce((s, t) => s + (BTU_TO_KW[t] || 0), 0);
  return DAIKIN_MXF_OUTDOOR.some(ou => ou.zones >= n && totalKW <= ou.kw * 1.30);
}

// Determina o tipo de multisplit óptimo para um quarto, tendo em conta todos os quartos multi.
// Se explicitamente definido pelo utilizador via picker → respeitar.
// Auto (por ordem de preferência económica):
//   1. Sensira (CTXF+MXF)  — todos ≤12k BTU, ≤3 zonas E exterior MXF existe para o kW total
//   2. Confora (FTXP+MXM)  — esta divisão ≤12k BTU (mais barata que Perfera)
//   3. Standard/Perfera (FTXM+MXM) — >12k BTU ou sem alternativa
function getEffectiveMultiType(room, allRooms) {
  if (!room.useMulti) return 'standard';
  if (room.multiTypeExplicit) return room.multiType;
  if (state.brand !== 'daikin') return 'standard';

  const multiRooms = allRooms.filter(r => r.useMulti && parseFloat(r.areaM2) > 0);
  if (multiRooms.length < 2) return 'standard';

  const tier    = btuToTier(calcBTU(room));
  const tiers   = multiRooms.map(r => btuToTier(calcBTU(r)));
  const allLE12k = tiers.every(t => t <= 12000);

  // Sensira: todas ≤12k, ≤3 zonas E exterior MXF tem capacidade para o total de kW
  if (allLE12k && multiRooms.length <= 3 && isSensiraPossible(multiRooms)) return 'sensira';

  // Confora: esta divisão ≤12k (mais barata que Perfera para interiores MXM)
  if (tier <= 12000 && DAIKIN_CONFORA_MULTI_INDOOR.some(u => u.btu >= tier)) return 'confora';

  // Perfera: divisões >12k ou sem exterior MXF disponível
  return 'standard';
}

// Calcula multisplit Sensira (CTXF interior + MXF exterior) — Daikin exclusivo ≤12k BTU
// Os CTXF podem ser misturados: ex. CTXF25 + CTXF35 com 2MXF50
// Única regra: todas as potências ≤12k BTU e 2-3 zonas
function calcSensiraMulti(multiRoomsWithTier) {
  const n = multiRoomsWithTier.length;
  if (n < 2 || n > 3) return null; // MXF suporta 2-3 zonas

  const tiers = multiRoomsWithTier.map(r => r.tier);
  if (!tiers.every(t => t <= 12000)) return null; // só até 12k BTU por zona

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
    const seriesLabel = brand === 'daikin' ? 'FTXM-A' : (brand === 'bosch' ? 'CL3200i Mural' : (brand === 'samsung' ? 'WindFree® Avant S2' : 'ARTIC Plus'));
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
  const room = newRoom(state.nextRoomId++);
  state.rooms.push(room);
  // Com 2+ divisões, TODAS passam para multisplit.
  // O user escolhe qual unidade interior — nunca kits individuais.
  state.rooms.forEach(r => {
    r.useMulti          = true;
    r.forceIndividual   = false;
    r.multiTypeExplicit = false;
    r.series            = null;
  });
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
  const multiCount = state.rooms.filter(r => r.useMulti).length;
  const isMulti = multiCount >= 2 && room.useMulti;

  // Build meta text
  let metaText = t('Preencha os dados da divisão');
  let hasMeta = false;
  if (hasData && tier > 0) {
    const seriesKey = isMulti ? null : (room.series || getCheapestMonoSeries(state.brand, tier));
    let modelName = '';
    if (isMulti) {
      const unit = getMultiIndoorForRoom(room, tier);
      modelName = unit ? getMultiSeriesLabel(state.brand, unit.model) : '';
    } else if (seriesKey) {
      const catalog = getBrandCatalog(state.brand);
      modelName = catalog[seriesKey] ? catalog[seriesKey].label : seriesKey;
    }
    let price = 0;
    if (isMulti) {
      const unit = getMultiIndoorForRoom(room, tier);
      price = unit ? unit.pvp : 0;
    } else if (seriesKey) {
      price = getMonoPrice(state.brand, seriesKey, tier, room.color);
    }
    metaText = `${room.areaM2}m² · ${btuLabel(tier)}${modelName ? ' · ' + modelName : ''}`;
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
      ${canDelete ? `<button class="sim-room__del" onclick="removeRoom(${room.id}, event)" title="${t('Remover')}" aria-label="${t('Remover divisão')}">
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
  const typeLabels = { quarto: t('Quarto'), sala: t('Sala'), cozinha: t('Cozinha'), outro: t('Outro') };
  const orientLabels = { sul: t('Sul'), norte: t('Norte'), este: t('Este'), oeste: t('Oeste') };
  const showOrient = parseInt(room.windows) > 0;
  const showOpenSpace = room.type === 'sala';

  return `
<div class="sim-rf">
  <div class="sim-rf-row" style="margin-top:16px">
    <label>${t('Nome da divisão')}</label>
    <input type="text" value="${escHtml(room.name)}"
      oninput="updateRoomField(${room.id},'name',this.value);document.getElementById('rname-${room.id}').textContent=this.value">
  </div>
  <div class="sim-rf-row">
    <label>${t('Tipo de divisão')}</label>
    <div class="sim-rf-types">
      ${types.map(tp => `<button class="sim-rf-type${room.type === tp ? ' active' : ''}" onclick="setRoomType(${room.id},'${tp}',this)">${typeLabels[tp]}</button>`).join('')}
    </div>
  </div>
  ${showOpenSpace ? `<div class="sim-rf-openspace" id="openspace-${room.id}">
    <input type="checkbox" ${room.openToKitchen ? 'checked' : ''} onchange="updateRoomField(${room.id},'openToKitchen',this.checked)">
    ${t('Sala aberta para cozinha (+3.000 BTU)')}
  </div>` : `<div id="openspace-${room.id}" style="display:none"></div>`}
  <div class="sim-rf-grid">
    <div class="sim-rf-row">
      <label>${t('Área (m²)')}</label>
      <input type="number" min="1" max="300" step="0.5" placeholder="ex: 15"
        value="${room.areaM2 || ''}"
        oninput="updateRoomField(${room.id},'areaM2',this.value)">
    </div>
    <div class="sim-rf-row">
      <label>${t('Altura (m)')}</label>
      <input type="number" min="2" max="6" step="0.1" value="${room.heightM}"
        oninput="updateRoomField(${room.id},'heightM',this.value)">
    </div>
    <div class="sim-rf-row">
      <label>${t('Janelas')}</label>
      <select onchange="updateRoomField(${room.id},'windows',this.value)">
        ${[0,1,2,3].map(n => `<option value="${n}" ${parseInt(room.windows)===n?'selected':''}>${n===3?'3+':n}</option>`).join('')}
      </select>
    </div>
    <div class="sim-rf-row" id="orient-row-${room.id}" style="${showOrient ? '' : 'display:none'}">
      <label>${t('Exposição solar')}</label>
      <select onchange="updateRoomField(${room.id},'orientation',this.value)">
        ${['sul','norte','este','oeste'].map(o => `<option value="${o}" ${room.orientation===o?'selected':''}>${orientLabels[o]}</option>`).join('')}
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
      <div class="sim-rm__label">${t('Modelo sugerido')}</div>
      <div class="sim-rm__empty">${t('Preencha a área para ver o modelo sugerido')}</div>
    </div>`;
  }

  let imgSrc = '', seriesName = '', modelNum = '', price = 0, badgeClass = 'multisplit', badgeText = 'Multisplit';

  if (isMulti) {
    // Usar tipo efectivo (auto ou explícito via picker)
    const effectiveType = getEffectiveMultiType(room, state.rooms);
    const unit = getMultiIndoorForRoom(room, tier);
    if (unit) {
      price = unit.pvp;
      modelNum = unit.model;
      seriesName = getMultiSeriesLabel(state.brand, unit.model);
      badgeText = effectiveType === 'sensira' ? t('Multisplit Budget') : t('Multisplit');
      badgeClass = 'multisplit';
      // Imagem adequada à série escolhida
      if (state.brand === 'daikin') {
        const color = room.color || 'white';
        if (effectiveType === 'emura') {
          imgSrc = `assets/products/daikin-emura-${color === 'white' ? 'branco' : color}-1.webp`;
        } else if (effectiveType === 'stylish') {
          imgSrc = `assets/products/daikin-stylish-${color === 'white' ? 'branco' : color}-1.webp`;
        } else if (effectiveType === 'confora') {
          imgSrc = 'assets/products/daikin-confora-1.webp';
        } else if (effectiveType === 'sensira') {
          imgSrc = 'assets/products/daikin-sensira-1.webp';
        } else {
          imgSrc = 'assets/products/daikin-perfera-1.webp';
        }
      } else if (state.brand === 'bosch') {
        imgSrc = 'assets/products/bosch-3200i-1.jpg';
      } else if (state.brand === 'samsung') {
        imgSrc = 'assets/products/samsung-windfree-avant-s2-1.png';
      } else {
        imgSrc = 'assets/products/daitsu-artic-plus-1.webp';
      }
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
      badgeText = t('Sistema Individual');
      badgeClass = 'individual';
    }
  }

  const hasColors = !isMulti && room.series && (() => {
    const catalog = getBrandCatalog(state.brand);
    return catalog[room.series] && !!catalog[room.series].colorPrices;
  })();

  return `<div class="sim-rm" id="rm-${room.id}">
    <div class="sim-rm__label">${t('Modelo sugerido')} · ${btuLabel(tier)}</div>
    <div class="sim-rm__content">
      <img src="${imgSrc}" alt="${escHtml(seriesName)}" class="sim-rm__img" onerror="this.style.visibility='hidden'">
      <div class="sim-rm__info">
        <div class="sim-rm__series">${escHtml(seriesName)}</div>
        <div class="sim-rm__btu">${modelNum ? modelNum + ' · ' : ''}${kwLabel(tier)}</div>
        <span class="sim-rm__type-badge ${badgeClass === 'individual' ? 'individual' : ''}">${badgeText}</span>
      </div>
    </div>
    ${hasColors ? `<div class="sim-rm__colors" id="rm-colors-${room.id}">
      <span class="sim-rm__colors-label">${t('Cor:')}</span>
      ${(getBrandCatalog(state.brand)[room.series].colorKeys || ['white','silver','black']).map(c => `<button class="sim-color-btn${room.color===c?' active':''}" data-color="${c}" onclick="setRoomColor(${room.id},'${c}')" title="${t(COLOR_LABELS[c] || c)}"></button>`).join('')}
    </div>` : ''}
    <div class="sim-rm__change">
      <button class="sim-rm__change-btn" onclick="openModelPicker(${room.id})">${t('Mudar modelo →')}</button>
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
    metaEl.textContent = t('Preencha os dados da divisão');
    metaEl.classList.remove('has-data');
    return;
  }

  const multiCountH = state.rooms.filter(r => r.useMulti).length;
  const isMultiH = multiCountH >= 2 && room.useMulti;

  let modelName = '';
  let price = 0;
  if (isMultiH) {
    const unit = getMultiIndoorForRoom(room, tier);
    if (unit) { modelName = getMultiSeriesLabel(state.brand, unit.model); price = unit.pvp; }
  } else {
    const seriesKey = room.series || getCheapestMonoSeries(state.brand, tier);
    const catalog = getBrandCatalog(state.brand);
    if (seriesKey && catalog[seriesKey]) {
      modelName = catalog[seriesKey].label;
      price = getMonoPrice(state.brand, seriesKey, tier, room.color);
    }
  }

  metaEl.textContent = `${room.areaM2}m² · ${btuLabel(tier)}${modelName ? ' · ' + modelName : ''}`;
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
  if (titleEl) titleEl.textContent = t('Escolha o modelo para ') + room.name;
  if (subEl) subEl.textContent = `${t('Potência necessária: ')}${btuLabel(tier)} (${kwLabel(tier)})${t(' · Marca: ')}${capFirst(state.brand)}`;
  if (gridEl) gridEl.innerHTML = buildPickerCards(room, tier);

  el.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Calcula o custo TOTAL do sistema se esta divisão usar esta opção.
// Multi options: todas as divisões em multi (indoor + outdoor partilhado).
// Mono option: kit desta divisão + sistema restante das outras divisões.
function calcOptionSystemTotal(room, tier, optionType, seriesKey) {
  const brand = state.brand;
  const validRooms = state.rooms.filter(r => parseFloat(r.areaM2) > 0);
  const otherRooms = validRooms.filter(r => r.id !== room.id);

  if (optionType === 'sensira_multi' || optionType === 'multi') {
    // Todas as divisões em multisplit com FTXM (standard) ou CTXF (sensira)
    const allWT = validRooms.map(r => ({ ...r, tier: btuToTier(calcBTU(r)), useMulti: true, multiType: 'standard', multiTypeExplicit: true }));
    let result = null;
    if (optionType === 'sensira_multi') result = calcSensiraMulti(allWT);
    if (!result) result = calcBrandMulti(brand, allWT);
    return result ? result.total : Infinity;
  }

  // Confora/Stylish/Emura multi: mesmo exterior que FTXM (mesmo kW por BTU tier)
  // → delta = standard system + (nova série indoor) - (FTXM indoor)
  if (optionType === 'bosch6000i_multi') {
    const baseTotal = calcOptionSystemTotal(room, tier, 'multi', '__multi__');
    if (baseTotal === Infinity) return Infinity;
    const stdUnit = getMultiIndoorUnit(brand, tier);
    const stdPvp  = stdUnit ? stdUnit.pvp : 0;
    const u6 = BOSCH_6000I_MULTI_INDOOR.find(u => u.btu >= tier);
    const newPvp = u6 ? u6.pvp : Infinity;
    return (!newPvp || newPvp === Infinity) ? Infinity : baseTotal - stdPvp + newPvp;
  }

  if (['confora_multi', 'stylish_multi', 'emura_multi'].includes(optionType)) {
    const baseTotal = calcOptionSystemTotal(room, tier, 'multi', '__multi__');
    if (baseTotal === Infinity) return Infinity;
    const stdUnit = getMultiIndoorUnit(brand, tier);
    const stdPvp  = stdUnit ? stdUnit.pvp : 0;
    const color   = state.pickerColors[room.id] || 'white';
    let newPvp;
    if (optionType === 'confora_multi') {
      const u = DAIKIN_CONFORA_MULTI_INDOOR.find(u => u.btu >= tier);
      newPvp = u ? u.pvp : Infinity;
    } else if (optionType === 'stylish_multi') {
      const u = DAIKIN_STYLISH_MULTI_INDOOR.find(u => u.btu >= tier);
      newPvp = u ? (u.pvp[color] || u.pvp.white) : Infinity;
    } else if (optionType === 'emura_multi') {
      const u = DAIKIN_EMURA_MULTI_INDOOR.find(u => u.btu >= tier);
      newPvp = u ? (u.pvp[color] || u.pvp.white) : Infinity;
    }
    return (!newPvp || newPvp === Infinity) ? Infinity : baseTotal - stdPvp + newPvp;
  }

  // Mono: kit desta divisão + custo das restantes com as suas selecções actuais
  const color = state.pickerColors[room.id] || 'white';
  const monoPrice = getMonoPrice(brand, seriesKey, tier, color);

  // Outras divisões: separar as que estão em mono das que estão em multi
  const otherMono = otherRooms.filter(r => !r.useMulti);
  const otherMulti = otherRooms.filter(r => r.useMulti).map(r => ({ ...r, tier: btuToTier(calcBTU(r)) }));

  let otherCost = 0;
  otherMono.forEach(r => {
    const t = btuToTier(calcBTU(r));
    const sk = r.series || getCheapestMonoSeries(brand, t);
    otherCost += getMonoPrice(brand, sk, t, state.pickerColors[r.id] || 'white');
  });
  if (otherMulti.length >= 2) {
    const mr = calcBrandMulti(brand, otherMulti);
    otherCost += mr ? mr.total : otherMulti.reduce((s, r) => s + getMonoPrice(brand, getCheapestMonoSeries(brand, r.tier), r.tier, 'white'), 0);
  } else if (otherMulti.length === 1) {
    const r = otherMulti[0];
    const sk = r.series || getCheapestMonoSeries(brand, r.tier);
    otherCost += getMonoPrice(brand, sk, r.tier, state.pickerColors[r.id] || 'white');
  }

  return monoPrice + otherCost;
}

function buildPickerCards(room, tier) {
  const isMultiContext = state.rooms.length > 1;
  const catalog = getBrandCatalog(state.brand);
  let html = '';

  if (isMultiContext) {
    // -------------------------------------------------------
    // Contexto multi: APENAS opções de interior multisplit.
    // O utilizador escolhe qual unidade interior quer para
    // este sistema multisplit — nunca um kit individual.
    // -------------------------------------------------------
    const allOptions = [];

    // A Sensira multisplit (CTXF) usa um exterior MXF dedicado, incompatível com o
    // MXM que todas as outras séries Daikin (Confora/Perfera/Stylish/Emura) partilham.
    // Por isso um grupo multi tem de ser TODO Sensira ou TODO não-Sensira — nunca os dois.
    const otherMultiRooms = state.rooms.filter(r => r.id !== room.id && parseFloat(r.areaM2) > 0);
    const siblingLockedToSensira    = otherMultiRooms.some(r => r.multiTypeExplicit && r.multiType === 'sensira');
    const siblingLockedToNonSensira = otherMultiRooms.some(r => r.multiTypeExplicit && r.multiType !== 'sensira');

    // Opção Sensira Budget (Daikin only, todas as zonas ≤12k BTU, 2-3 zonas,
    // e nenhuma outra divisão já fixada noutra série — exterior MXF exclusivo)
    if (state.brand === 'daikin' && tier <= 12000 && !siblingLockedToNonSensira) {
      const otherTiers = otherMultiRooms.map(r => btuToTier(calcBTU(r)));
      const sensiraOk = otherTiers.length > 0 &&
        otherTiers.every(t => t <= 12000) &&
        (1 + otherTiers.length) <= 3;
      if (sensiraOk) {
        const su = DAIKIN_SENSIRA_MULTI_INDOOR.find(u => u.btu >= tier);
        if (su) allOptions.push({ type: 'sensira_multi', key: '__sensira_multi__', unit: su });
      }
    }

    // Opção Confora (FTXP, Daikin only, ≤12k BTU) — só se nenhuma outra divisão
    // já estiver fixada em Sensira (exterior MXM incompatível com o MXF da Sensira)
    if (state.brand === 'daikin' && tier <= 12000 && !siblingLockedToSensira) {
      const cu = DAIKIN_CONFORA_MULTI_INDOOR.find(u => u.btu >= tier);
      if (cu) allOptions.push({ type: 'confora_multi', key: '__confora_multi__', unit: cu });
    }

    // Opção Padrão — Perfera (FTXM / Climate 3200i / ARTIC Plus)
    if (!siblingLockedToSensira) {
      const stdu = getMultiIndoorUnit(state.brand, tier);
      if (stdu) allOptions.push({ type: 'multi', key: '__multi__', unit: stdu });
    }

    // Opção 6000i Premium (Bosch only)
    if (state.brand === 'bosch') {
      const u6 = BOSCH_6000I_MULTI_INDOOR.find(u => u.btu >= tier);
      if (u6) allOptions.push({ type: 'bosch6000i_multi', key: '__bosch6000i__', unit: u6 });
    }

    // Opção Stylish (FTXA, Daikin only, ≤18k BTU)
    if (state.brand === 'daikin' && tier <= 18000 && !siblingLockedToSensira) {
      const su = DAIKIN_STYLISH_MULTI_INDOOR.find(u => u.btu >= tier);
      if (su) allOptions.push({ type: 'stylish_multi', key: '__stylish_multi__', unit: su });
    }

    // Opção Emura (FTXJ, Daikin only, ≤18k BTU)
    if (state.brand === 'daikin' && tier <= 18000 && !siblingLockedToSensira) {
      const eu = DAIKIN_EMURA_MULTI_INDOOR.find(u => u.btu >= tier);
      if (eu) allOptions.push({ type: 'emura_multi', key: '__emura_multi__', unit: eu });
    }

    // Calcular custo total do sistema para cada opção (para diffs correctos)
    const systemTotals = new Map();
    allOptions.forEach(opt =>
      systemTotals.set(opt.key, calcOptionSystemTotal(room, tier, opt.type, opt.key))
    );
    const anchorTotal = systemTotals.size ? Math.min(...systemTotals.values()) : 0;

    allOptions.forEach(opt => {
      const sysTotal = systemTotals.get(opt.key);
      const diff = sysTotal - anchorTotal;

      if (opt.type === 'sensira_multi') {
        const su = opt.unit;
        const isSelected = room.useMulti && getEffectiveMultiType(room, state.rooms) === 'sensira';
        html += pickerCard({
          id: room.id, type: 'sensira_multi', seriesKey: '__sensira_multi__',
          badge: 'BUDGET', badgeClass: 'multi sensira',
          img: 'assets/products/daikin-sensira-1.webp',
          series: 'Sensira (CTXF)',
          specs: `${btuLabel(su.btu)} · ${su.kw} kW · ${su.model}`,
          price: su.pvp,
          priceNote: `${t('Unidade interior · sistema total: ')}${fmtPrice(sysTotal)}`,
          diff, isSelected,
          specInfo: getSeriesDescriptors('daikin', 'Sensira'),
        });
      } else if (opt.type === 'confora_multi') {
        const cu = opt.unit;
        const isSelected = room.useMulti && getEffectiveMultiType(room, state.rooms) === 'confora';
        html += pickerCard({
          id: room.id, type: 'confora_multi', seriesKey: '__confora_multi__',
          badge: 'MULTISPLIT', badgeClass: 'multi',
          img: 'assets/products/daikin-confora-1.webp',
          series: 'Comfora',
          specs: `${btuLabel(cu.btu)} · ${cu.kw} kW · ${cu.model}`,
          price: cu.pvp,
          priceNote: `${t('Unidade interior · sistema total: ')}${fmtPrice(sysTotal)}`,
          diff, isSelected,
          specInfo: getSeriesDescriptors('daikin', 'Confora'),
        });
      } else if (opt.type === 'multi') {
        const stdu = opt.unit;
        const mt = getEffectiveMultiType(room, state.rooms);
        const isSelected = room.useMulti && (mt === 'standard' || mt === 'sensira' ? false : false) &&
          mt !== 'sensira' && mt !== 'confora' && mt !== 'stylish' && mt !== 'emura';
        const isStdSelected = room.useMulti && (mt === 'standard' || (!room.multiTypeExplicit));
        const img = state.brand === 'daikin' ? 'assets/products/daikin-perfera-1.webp' :
                    state.brand === 'bosch'  ? 'assets/products/bosch-3000i-1.webp' :
                    state.brand === 'samsung' ? 'assets/products/samsung-windfree-avant-s2-1.png' :
                                               'assets/products/daitsu-artic-plus-1.webp';
        html += pickerCard({
          id: room.id, type: 'multi', seriesKey: '__multi__',
          badge: 'MULTISPLIT', badgeClass: 'multi',
          img, series: getMultiSeriesLabel(state.brand, stdu.model),
          specs: `${btuLabel(stdu.btu)} · ${stdu.kw} kW · ${stdu.model}`,
          price: stdu.pvp,
          priceNote: `${t('Unidade interior · sistema total: ')}${fmtPrice(sysTotal)}`,
          diff, isSelected: isStdSelected,
          specInfo: getSeriesDescriptors(state.brand, getSeriesCatalogKey(state.brand, stdu.model)),
        });
      } else if (opt.type === 'stylish_multi') {
        const su = opt.unit;
        const pickerColor = state.pickerColors[room.id] || 'white';
        const coloredPvp  = su.pvp[pickerColor] || su.pvp.white;
        const isSelected  = room.useMulti && getEffectiveMultiType(room, state.rooms) === 'stylish';
        const colorPicker = buildColorPickerInCard(room.id, '__stylish_multi__', pickerColor, ['white','silver','black','dc','dg','dl','dp','dy']);
        html += pickerCard({
          id: room.id, type: 'stylish_multi', seriesKey: '__stylish_multi__',
          badge: 'MULTISPLIT', badgeClass: 'multi',
          img: 'assets/products/daikin-stylish-branco-1.webp',
          series: 'Stylish',
          specs: `${btuLabel(su.btu)} · ${su.kw} kW · ${su.model}`,
          price: coloredPvp,
          priceNote: `${t('Unidade interior · sistema total: ')}${fmtPrice(sysTotal)}`,
          diff, isSelected, colorPicker,
          specInfo: getSeriesDescriptors('daikin', 'Stylish'),
        });
      } else if (opt.type === 'emura_multi') {
        const eu = opt.unit;
        const pickerColor = state.pickerColors[room.id] || 'white';
        const coloredPvp  = eu.pvp[pickerColor] || eu.pvp.white;
        const isSelected  = room.useMulti && getEffectiveMultiType(room, state.rooms) === 'emura';
        const colorPicker = buildColorPickerInCard(room.id, '__emura_multi__', pickerColor);
        html += pickerCard({
          id: room.id, type: 'emura_multi', seriesKey: '__emura_multi__',
          badge: 'MULTISPLIT', badgeClass: 'multi',
          img: 'assets/products/daikin-emura-branco-1.webp',
          series: 'Emura',
          specs: `${btuLabel(eu.btu)} · ${eu.kw} kW · ${eu.model}`,
          price: coloredPvp,
          priceNote: `${t('Unidade interior · sistema total: ')}${fmtPrice(sysTotal)}`,
          diff, isSelected, colorPicker,
          specInfo: getSeriesDescriptors('daikin', 'Emura'),
        });
      } else if (opt.type === 'bosch6000i_multi') {
        const u6 = opt.unit;
        const isSelected = room.useMulti && room.multiType === '6000i' && room.multiTypeExplicit;
        html += pickerCard({
          id: room.id, type: 'bosch6000i_multi', seriesKey: '__bosch6000i__',
          badge: 'MULTISPLIT', badgeClass: 'multi',
          img: 'assets/products/bosch-6000i-1.webp',
          series: 'Climate 6000i',
          specs: `${btuLabel(u6.btu)} · ${u6.kw} kW · ${u6.model}`,
          price: u6.pvp,
          priceNote: `${t('Unidade interior · sistema total: ')}${fmtPrice(sysTotal)}`,
          diff, isSelected,
          specInfo: getSeriesDescriptors('bosch', '6000i'),
        });
      }
    });

  } else {
    // -------------------------------------------------------
    // Contexto individual (1 divisão): mostra todos os kits
    // monosplit disponíveis para esta potência.
    // -------------------------------------------------------
    const monoOpts = [];
    for (const [key, series] of Object.entries(catalog)) {
      if (series.maxBTU && tier > series.maxBTU) continue;
      const eTier = getEffectiveTier(series, tier);
      if (eTier === null) continue;
      monoOpts.push({ key, series, eTier });
    }
    monoOpts.sort((a, b) => (a.series.prices[a.eTier] || 0) - (b.series.prices[b.eTier] || 0));

    const prices = monoOpts.map(({ series, eTier }) => {
      const c = state.pickerColors[room.id] || 'white';
      return series.colorPrices ? (series.colorPrices[c]?.[eTier] || series.prices[eTier]) : series.prices[eTier];
    });
    const anchorTotal = prices.length ? Math.min(...prices) : 0;

    monoOpts.forEach(({ key, series, eTier }) => {
      const isSelected = room.series === key;
      const pickerColor = state.pickerColors[room.id] || 'white';
      let price = series.prices[eTier];
      let img = series.image || '';
      if (series.colorPrices) {
        price = series.colorPrices[pickerColor]?.[eTier] || price;
        if (series.images && !Array.isArray(series.images))
          img = series.images[pickerColor]?.[0] || series.image || '';
      }
      const diff = price - anchorTotal;
      const colorPicker = series.colorPrices ? buildColorPickerInCard(room.id, key, pickerColor, series.colorKeys || Object.keys(series.colorPrices)) : '';
      html += pickerCard({
        id: room.id, type: 'mono', seriesKey: key,
        badge: null,
        img, series: series.label,
        specs: `${btuLabel(eTier)} · ${BTU_TO_KW[eTier]} kW`,
        price, priceNote: 'Kit completo (inclui exterior)',
        diff, isSelected, color: pickerColor,
        colorPicker,
        specInfo: getSeriesDescriptors(state.brand, key),
      });
    });
  }

  return html;
}

function pickerCard({ id, type, seriesKey, badge, badgeClass, img, series, specs, price, priceNote, diff, isSelected, colorPicker = '', specInfo }) {
  const diffText = diff === 0
    ? `<div class="smp-card__diff base"><span class="smp-diff-tag base">${t('★ Mais económico')}</span></div>`
    : '';

  const badgeHtml = badge ? `<div class="smp-card__badge ${badgeClass || ''}">${badge}</div>` : '';
  const checkHtml = isSelected ? `<div class="smp-card__check">✓</div>` : '';
  const featHtml  = buildSpecInfoHTML(specInfo);

  // onclick — color is read from state.pickerColors inside selectModel
  let onClick;
  if      (type === 'sensira_multi') onClick = `selectModel(${id},'sensira_multi','')`;
  else if (type === 'confora_multi') onClick = `selectModel(${id},'confora_multi','')`;
  else if (type === 'stylish_multi') onClick = `selectModel(${id},'stylish_multi','')`;
  else if (type === 'emura_multi')       onClick = `selectModel(${id},'emura_multi','')`;
  else if (type === 'bosch6000i_multi')  onClick = `selectModel(${id},'bosch6000i_multi','')`;
  else if (type === 'multi')             onClick = `selectModel(${id},'multi','')`;
  else                                   onClick = `selectModel(${id},'mono','${seriesKey}')`;

  return `
<div class="smp-card${isSelected ? ' selected' : ''}" data-key="${seriesKey}" onclick="${onClick}">
  ${badgeHtml}${checkHtml}
  <img src="${img}" alt="${series}" class="smp-card__img" onerror="this.style.visibility='hidden'">
  <div class="smp-card__body">
    <div class="smp-card__series">${series}</div>
    <div class="smp-card__specs">${specs}</div>
    ${featHtml}
    ${diffText}
  </div>
  ${colorPicker}
</div>`;
}

function buildColorPickerInCard(roomId, seriesKey, activeColor, colors = ['white', 'silver', 'black']) {
  return `<div class="smp-card__colors">
    <span class="smp-card__color-label">${t('Cor:')}</span>
    ${colors.map(c => `<button class="sim-color-btn${c === activeColor ? ' active smp-card__color-active' : ''}" data-color="${c}"
      onclick="event.stopPropagation();setPickerColor(${roomId},'${seriesKey}','${c}',this)" title="${t(COLOR_LABELS[c] || c)}"></button>`).join('')}
  </div>`;
}

function setPickerColor(roomId, seriesKey, color, btnEl) {
  state.pickerColors[roomId] = color;
  // Em contexto multi, re-renderizar o picker inteiro (preços e diffs mudam com a cor)
  if (state.rooms.length > 1) {
    const room = state.rooms.find(r => r.id === roomId);
    if (room) {
      const tier = btuToTier(calcBTU(room));
      const gridEl = document.getElementById('smp-grid');
      if (gridEl) gridEl.innerHTML = buildPickerCards(room, tier);
    }
    return;
  }
  // Update color buttons in the card (contexto mono)
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
    // Update image
    const imgEl = card.querySelector('.smp-card__img');
    if (imgEl && series.images && !Array.isArray(series.images)) {
      imgEl.src = series.images[color]?.[0] || series.image || '';
    }
  }
  // Atualizar painel de resultados (preço e cor mudam na alternativa monosplit)
  if (!room.useMulti) {
    updateRoomHeader(roomId);
    updateLiveTotal();
    renderResults();
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
    room.multiTypeExplicit   = true;
    room.series              = null;
    room.color               = 'white';
    room.forceIndividual     = false;
  } else if (type === 'confora_multi') {
    room.useMulti            = true;
    room.multiType           = 'confora';
    room.multiTypeExplicit   = true;
    room.series              = null;
    room.color               = 'white';
    room.forceIndividual     = false;
  } else if (type === 'stylish_multi') {
    room.useMulti            = true;
    room.multiType           = 'stylish';
    room.multiTypeExplicit   = true;
    room.series              = null;
    room.color               = pickerColor;
    room.forceIndividual     = false;
  } else if (type === 'emura_multi') {
    room.useMulti            = true;
    room.multiType           = 'emura';
    room.multiTypeExplicit   = true;
    room.series              = null;
    room.color               = pickerColor;
    room.forceIndividual     = false;
  } else if (type === 'bosch6000i_multi') {
    room.useMulti            = true;
    room.multiType           = '6000i';
    room.multiTypeExplicit   = true;
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
  // Atualizar headers de TODAS as divisões — o status multi/mono de uma divisão
  // afeta o que as outras mostram (1 divisão sozinha em multi → passa a mono)
  state.rooms.forEach(r => updateRoomHeader(r.id));
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
    el.textContent = t('Configure as suas divisões');
    return;
  }

  const config = calcSystemConfig(state.brand, state.rooms);
  if (!config || !config.total) {
    el.textContent = t('Configure as suas divisões');
    return;
  }
  el.textContent = t('Sistema configurado ✓');
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
  const validRooms = state.rooms.filter(r => parseFloat(r.areaM2) > 0);
  const contentEl = document.getElementById('sim-results-content');
  const compareEl = document.getElementById('sim-brand-compare');
  if (!contentEl) return;

  if (!validRooms.length) {
    contentEl.innerHTML = '';
    if (compareEl) compareEl.innerHTML = '';
    return;
  }

  if (validRooms.length === 1) {
    // 1 divisão → sempre monosplit como primário, sem alternativa
    const config = calcSystemConfig(state.brand, state.rooms);
    if (!config || !config.total) { contentEl.innerHTML = ''; if (compareEl) compareEl.innerHTML = ''; return; }
    contentEl.innerHTML = buildResultsHTML(config, null);
    if (compareEl) compareEl.innerHTML = buildBrandCompareHTML(config);
    return;
  }

  // 2+ divisões → usar a configuração actual do utilizador (respeita as escolhas do picker)
  const config = calcSystemConfig(state.brand, state.rooms);
  if (!config || !config.total) { contentEl.innerHTML = ''; if (compareEl) compareEl.innerHTML = ''; return; }

  // Alternativa monosplit (respeita a série escolhida pelo user)
  const monoAlt = calcCheapestMonoAlt(state.brand, validRooms);

  // Alternativa multisplit mais económica (só relevante se a config actual usa séries premium)
  const cheapMultiAlt = calcCheapestMultiAlt(state.brand, validRooms);

  contentEl.innerHTML = buildResultsHTML(config, monoAlt, cheapMultiAlt);
  if (compareEl) compareEl.innerHTML = buildBrandCompareHTML(config);
}

// Calcula a alternativa monosplit — respeita a série escolhida pelo utilizador no picker
// (mesmo estando em modo multi, usa a série equivalente em kit individual)
function calcCheapestMonoAlt(brand, rooms) {
  const catalog = getBrandCatalog(brand);
  // Mapeamento multiType → série mono equivalente (Daikin)
  const MULTI_TO_MONO = { emura: 'Emura', stylish: 'Stylish', confora: 'Confora', standard: 'Perfera', sensira: 'Sensira' };
  const roomResults = [];
  let total = 0;
  rooms.forEach(r => {
    const tier = btuToTier(calcBTU(r));
    let seriesKey = null;
    // P1: user escolheu individual explicitamente
    if (!r.useMulti && r.series && catalog[r.series]) {
      seriesKey = r.series;
    }
    // P2: user escolheu série no picker multi → usar kit mono equivalente
    if (!seriesKey && brand === 'daikin' && r.useMulti && r.multiTypeExplicit) {
      const mapped = MULTI_TO_MONO[r.multiType];
      if (mapped && catalog[mapped]) {
        const s = catalog[mapped];
        if (s.prices[tier] !== undefined && (!s.maxBTU || tier <= s.maxBTU)) seriesKey = mapped;
      }
    }
    // P3: fallback mais barata disponível
    if (!seriesKey) seriesKey = getCheapestMonoSeries(brand, tier);
    const color = r.color || state.pickerColors[r.id] || 'white';
    const price = getMonoPrice(brand, seriesKey, tier, color);
    const series = seriesKey ? catalog[seriesKey] : null;
    const label = series ? series.label : '';
    roomResults.push({ room: r, seriesKey, tier, price, label, color });
    total += price || 0;
  });
  return { rooms: roomResults, total };
}

// Calcula o multisplit mais económico possível (Sensira se elegível, senão FTXM standard)
// Usado para mostrar poupança vs. a escolha atual do utilizador
function calcCheapestMultiAlt(brand, rooms) {
  const validRooms = rooms.filter(r => parseFloat(r.areaM2) > 0);
  if (validRooms.length < 2) return null;
  const roomsWT = validRooms.map(r => ({
    ...r, tier: btuToTier(calcBTU(r)), useMulti: true, multiType: 'standard', multiTypeExplicit: true,
  }));
  // Tentar Sensira primeiro (mais barato, Daikin 2-3 zonas todas ≤12k)
  if (brand === 'daikin' && roomsWT.length >= 2 && roomsWT.length <= 3) {
    if (roomsWT.every(r => r.tier <= 12000)) {
      const sr = calcSensiraMulti(roomsWT);
      if (sr) return { ...sr, multiSystemType: 'sensira' };
    }
  }
  // Standard FTXM + MXM
  const std = calcBrandMulti(brand, roomsWT);
  return std ? { ...std, multiSystemType: 'standard' } : null;
}

const COLOR_LABELS = {
  white: 'Branco', silver: 'Prateado', black: 'Preto',
  dc: 'Tecido Azul', dg: 'Tecido Cinzento', dl: 'Pele Castanha', dp: 'Madeira Clara', dy: 'Madeira Escura',
}; // PT fixo — usado apenas para nome de cor no display PT

// Caixa de alternativa monosplit (estilo "azul" — igual ao standard suggestion anterior)
function buildMonoAltBox(monoAlt) {
  const catalog = getBrandCatalog(state.brand);
  let rows = '';
  monoAlt.rooms.forEach(({ room, label, price, color, seriesKey }) => {
    const series = seriesKey ? catalog[seriesKey] : null;
    const colorLabel = (series && series.colorPrices && color && color !== 'white')
      ? (t(COLOR_LABELS[color]) || '') : '';
    const displayName = colorLabel ? `${label} ${colorLabel}` : label;
    rows += `<div class="sim-ms-row"><span>${escHtml(room.name)} — ${escHtml(displayName)}</span></div>`;
  });
  return `
<div class="sim-multi-suggest standard">
  <div class="sim-multi-suggest__header">
    <span class="sim-multi-suggest__icon">💡</span>
    <div>
      <div class="sim-multi-suggest__title">${t('Alternativa Monosplit')} <span class="sim-ms-tag">🔧 Individual</span></div>
      <div class="sim-multi-suggest__sub">${t('Uma unidade exterior por cada interior — total independência por divisão')}</div>
    </div>
  </div>
  <div class="sim-multi-suggest__rows">${rows}</div>
  <div class="sim-multi-suggest__note">${t('Inclua esta alternativa no seu pedido de orçamento')}</div>
</div>`;
}

// Caixa verde "Multisplit mais económico" — só aparece quando há poupança vs. configuração atual
function buildCheapMultiAltBox(cheapMulti, savings) {
  const isSensira = cheapMulti.multiSystemType === 'sensira';
  const seriesLabel = isSensira ? 'Sensira (CTXF + MXF)' : 'Perfera (FTXM + MXM)';
  let rows = '';
  (cheapMulti.indoorUnits || []).forEach(({ room, unit }) => {
    const label = getMultiSeriesLabel(state.brand, unit.model);
    rows += `<div class="sim-ms-row"><span>${escHtml(room.name)} — ${label} · ${unit.model}</span></div>`;
  });
  if (cheapMulti.outdoor) {
    const ou = cheapMulti.outdoor;
    rows += `<div class="sim-ms-row"><span>${t('Exterior partilhado — ')}${ou.model} (${ou.zones} ${t('zonas')} · ${ou.kw} kW)</span></div>`;
  }
  return `
<div class="sim-multi-suggest">
  <div class="sim-multi-suggest__header">
    <span class="sim-multi-suggest__icon">💸</span>
    <div>
      <div class="sim-multi-suggest__title">${t('Alternativa mais económica')} <span class="sim-ms-tag">💰 Budget</span></div>
      <div class="sim-multi-suggest__sub">${t('Mesma unidade exterior partilhada — interiores mais económicos · ')}${seriesLabel}</div>
    </div>
  </div>
  <div class="sim-multi-suggest__rows">${rows}</div>
  <div class="sim-multi-suggest__note">${t('Inclua esta alternativa no seu pedido de orçamento para comparação')}</div>
</div>`;
}

function buildMultiSuggestBox(ms) {
  const isSensira = ms.multiSystemType === 'sensira';
  const msLabel = isSensira
    ? t('Sensira Budget · CTXF interior + MXF exterior')
    : t('Padrão · FTXM interior + MXM exterior');
  const msTag = isSensira ? '💸 Budget' : '⭐ Padrão';
  let msRows = '';
  (ms.indoorUnits || []).forEach(({ room, unit }) => {
    msRows += `<div class="sim-ms-row"><span>${escHtml(room.name)} — ${unit.model}</span></div>`;
  });
  if (ms.outdoor) {
    const ou = ms.outdoor;
    msRows += `<div class="sim-ms-row"><span>${t('Exterior partilhado — ')}${ou.model} (${ou.zones} ${t('zonas')} · ${ou.kw} kW)</span></div>`;
  }
  return `
<div class="sim-multi-suggest${isSensira ? '' : ' standard'}">
  <div class="sim-multi-suggest__header">
    <span class="sim-multi-suggest__icon">💡</span>
    <div>
      <div class="sim-multi-suggest__title">${t('Alternativa Multisplit')} <span class="sim-ms-tag">${msTag}</span></div>
      <div class="sim-multi-suggest__sub">${t('Mesmo com modelos diferentes, pode instalar uma unidade exterior partilhada · ')}${msLabel}</div>
    </div>
  </div>
  <div class="sim-multi-suggest__rows">${msRows}</div>
  <div class="sim-multi-suggest__note">${t('Inclua esta alternativa no seu pedido de orçamento para confirmar compatibilidade')}</div>
</div>`;
}

// Derivar nome da série a partir do modelo de interior multisplit
function getMultiSeriesLabel(brand, model) {
  if (brand === 'daikin') {
    if (model.startsWith('CTXF')) return 'Sensira';
    if (model.startsWith('FTXJ')) return 'Emura';
    if (model.startsWith('FTXA')) return 'Stylish';
    if (model.startsWith('FTXP')) return 'Comfora';
    return 'Perfera'; // FTXM default
  }
  if (brand === 'bosch') {
    if (model.startsWith('CL7000i') || model.startsWith('CL7001i')) return 'Climate 7000i';
    if (model.startsWith('CL6000i') || model.startsWith('CL6001i')) return 'Climate 6000i';
    return 'Climate 3200i';
  }
  if (brand === 'daitsu') return 'ARTIC Plus';
  if (brand === 'samsung') {
    if (model.startsWith('AR70H')) return 'WindFree® Première';
    if (model.startsWith('AR70F')) return 'WindFree® Avant S2';
    if (model.startsWith('AR60F')) return 'WindFree® Comfort S2';
    if (model.startsWith('AR50F')) return 'Cebu S2';
    return 'WindFree®';
  }
  return model;
}

// Resolve a chave do catálogo mono (DAIKIN_MONO/BOSCH_MONO/DAITSU_MONO) a partir do
// modelo de uma unidade interior multi — permite reaproveitar classe energética,
// ruído e destaques do mono equivalente em qualquer contexto (mono ou multi).
function getSeriesCatalogKey(brand, model) {
  if (brand === 'daikin') {
    if (model.startsWith('CTXF')) return 'Sensira';
    if (model.startsWith('FTXJ')) return 'Emura';
    if (model.startsWith('FTXA')) return 'Stylish';
    if (model.startsWith('FTXP')) return 'Confora';
    return 'Perfera';
  }
  if (brand === 'bosch') {
    if (model.startsWith('CL7000i') || model.startsWith('CL7001i')) return '7000i';
    if (model.startsWith('CL6000i') || model.startsWith('CL6001i')) return '6000i';
    return '3200i';
  }
  if (brand === 'daitsu') return 'ARTIC';
  if (brand === 'samsung') {
    if (model.startsWith('AR70H')) return 'Première';
    if (model.startsWith('AR70F')) return 'Avant S2';
    if (model.startsWith('AR60F')) return 'Comfort S2';
    if (model.startsWith('AR50F')) return 'Cebu S2';
    if (model.startsWith('AR40H')) return 'AR35';
    return 'Cebu S2';
  }
  return null;
}

// Devolve classe energética, ruído e destaques (máx. 3) do catálogo mono equivalente —
// usado para mostrar a mesma informação de decisão em qualquer contexto (mono/multi,
// picker, cartão de resultado, grelha de comparação de marcas).
// Termos base presentes em quase todos os equipamentos (Inverter, R-32) — não ajudam
// a diferenciar modelos, por isso ficam de fora dos destaques mostrados ao cliente.
const GENERIC_FEATURES = new Set(['Inverter', 'R-32', 'R32']);

function getSeriesDescriptors(brand, key) {
  const catalog = getBrandCatalog(brand);
  const series = key && catalog[key];
  if (!series) return null;
  const distinctFeatures = (series.features || []).filter(f => !GENERIC_FEATURES.has(f));
  return {
    energyCool: series.energyCool || '',
    energyHeat: series.energyHeat || '',
    noise: series.noise || '',
    wifiStatus: series.wifiStatus || '',
    features: distinctFeatures.slice(0, 3),
  };
}

// Constrói o bloco HTML de selos (classe energética + ruído + WiFi) e destaques —
// usado de forma consistente no picker, no cartão de resultado e na grelha de marcas.
function buildSpecInfoHTML(desc) {
  if (!desc) return '';
  const badges = [];
  if (desc.energyCool) badges.push(`<span class="sim-spec-badge">❄️ ${desc.energyCool}</span>`);
  if (desc.energyHeat) badges.push(`<span class="sim-spec-badge">🔥 ${desc.energyHeat}</span>`);
  if (desc.noise) badges.push(`<span class="sim-spec-badge">🔈 ${desc.noise}</span>`);
  if (desc.wifiStatus === 'builtin') badges.push(`<span class="sim-spec-badge">📶 ${t('WiFi incluído')}</span>`);
  else if (desc.wifiStatus === 'optional') badges.push(`<span class="sim-spec-badge wifi-optional">📶 ${t('WiFi opcional (acessório)')}</span>`);
  const badgesHtml = badges.length ? `<div class="sim-spec-badges">${badges.join('')}</div>` : '';
  const featsHtml = desc.features.length ? `<div class="sim-spec-feats">${desc.features.map(f => escHtml(t(f))).join(' · ')}</div>` : '';
  return badgesHtml + featsHtml;
}

function buildResultsHTML(config, monoAlt, cheapMultiAlt) {
  const brandName = capFirst(state.brand);
  const brandImg = brandLogoSrc(state.brand);
  const isSensiraConfig = config.multiSystemType === 'sensira';

  let rowsHtml = '';

  // Mono rooms
  config.monoRooms.forEach(({ room, seriesKey, tier, price, model }) => {
    const catalog = getBrandCatalog(state.brand);
    const series = seriesKey && catalog[seriesKey];
    const img = series ? getSeriesImage(state.brand, seriesKey, room.color) : '';
    const label = series ? series.label : '';
    const modelNum = model || (series && series.models[tier]) || '';
    const badgeClass = room.wasMulti ? '' : 'individual';
    const badgeText = room.wasMulti ? t('Sistema individual') : t('Sistema individual');
    const specInfoHtml = buildSpecInfoHTML(getSeriesDescriptors(state.brand, seriesKey));

    rowsHtml += `
<div class="sim-res-row">
  <img src="${img}" alt="${escHtml(label)}" class="sim-res-row__img" onerror="this.style.visibility='hidden'">
  <div class="sim-res-row__info">
    <div class="sim-res-row__label">${escHtml(room.name)}</div>
    <div class="sim-res-row__model">${escHtml(label)}</div>
    <div class="sim-res-row__specs">${btuLabel(tier)} · ${kwLabel(tier)}${modelNum ? ' · ' + modelNum : ''}</div>
    ${specInfoHtml}
    <span class="sim-res-row__badge ${badgeClass}">${badgeText}</span>
  </div>
</div>`;
  });

  // Multi indoor rooms
  config.multiRooms.forEach(({ room, unit }) => {
    const seriesLabel = getMultiSeriesLabel(state.brand, unit.model);
    // Imagem por série e cor (para Stylish/Emura)
    let img = '';
    if (state.brand === 'daikin') {
      const color = room.color || 'white';
      const colorSlug = color === 'white' ? 'branco' : color;
      if (unit.model.startsWith('FTXJ'))      img = `assets/products/daikin-emura-${colorSlug}-1.webp`;
      else if (unit.model.startsWith('FTXA')) img = `assets/products/daikin-stylish-${colorSlug}-1.webp`;
      else if (unit.model.startsWith('FTXP')) img = 'assets/products/daikin-confora-1.webp';
      else if (unit.model.startsWith('CTXF')) img = 'assets/products/daikin-sensira-1.webp';
      else                                    img = 'assets/products/daikin-perfera-1.webp';
    } else if (state.brand === 'bosch') {
      img = 'assets/products/bosch-3200i-1.jpg';
    } else if (state.brand === 'samsung') {
      img = 'assets/products/samsung-windfree-avant-s2-1.png';
    } else {
      img = 'assets/products/daitsu-artic-plus-1.webp';
    }
    const multiBadge = unit.model.startsWith('CTXF') ? t('Multisplit Budget') : t('Multisplit');
    const specInfoHtml = buildSpecInfoHTML(getSeriesDescriptors(state.brand, getSeriesCatalogKey(state.brand, unit.model)));
    rowsHtml += `
<div class="sim-res-row">
  <img src="${img}" alt="${seriesLabel}" class="sim-res-row__img" onerror="this.style.visibility='hidden'">
  <div class="sim-res-row__info">
    <div class="sim-res-row__label">${escHtml(room.name)}</div>
    <div class="sim-res-row__model">${seriesLabel}</div>
    <div class="sim-res-row__specs">${btuLabel(unit.btu)} · ${unit.kw} kW · ${unit.model}</div>
    ${specInfoHtml}
    <span class="sim-res-row__badge">${multiBadge}</span>
  </div>
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
    <div class="sim-res-row__label">${t('Unidade exterior partilhada')}</div>
    <div class="sim-res-row__model">${ou.model}</div>
    <div class="sim-res-row__specs">${ou.zones} ${t('zonas')} · ${ou.kw} kW${multiNames ? ` · ${t('para: ')}` + multiNames : ''}</div>
  </div>
</div>`;
  }

  const numRooms = config.monoRooms.length + config.multiRooms.length;
  const systemDesc = config.outdoor
    ? (isSensiraConfig
        ? `${numRooms} ${t('divisões')} · ${t('Multisplit Budget Sensira')}`
        : `${numRooms} ${t('divisões')} · ${t('Sistema multisplit')}`)
    : `${numRooms} ${numRooms > 1 ? t('divisões') : t('divisão')} · ${t('Monosplit')}`;

  // Caixa verde só aparece se o multi mais barato for diferente da config actual E poupar dinheiro
  let cheapMultiAltHtml = '';
  if (cheapMultiAlt && config.outdoor && cheapMultiAlt.total < config.total) {
    const savings = config.total - cheapMultiAlt.total;
    cheapMultiAltHtml = buildCheapMultiAltBox(cheapMultiAlt, savings);
  }
  const monoAltHtml = monoAlt ? buildMonoAltBox(monoAlt) : '';

  return `
<div class="sim-res-card">
  <div class="sim-res-card__header">
    <img src="${brandImg}" alt="${brandName}" class="sim-res-card__brand-img" onerror="this.style.display='none'">
    <div>
      <div class="sim-res-card__title">${t('A sua configuração ')}${brandName}</div>
      <div class="sim-res-card__subtitle">${systemDesc}</div>
    </div>
  </div>
  ${rowsHtml}
  <div class="sim-res-cta">
    <p class="sim-res-cta__text">${t('Sistema recomendado para o seu espaço. Solicite um orçamento sem compromisso e respondemos brevemente.')}</p>
    <button class="btn btn--primary btn--lg sim-res-cta__btn" onclick="openQuoteModal()">${t('Solicitar Orçamento Personalizado →')}</button>
  </div>
</div>
<p class="sim-res-disclaimer">${t('Recomendação baseada na área e orientação das suas divisões · Orçamento final após visita técnica')}</p>
${cheapMultiAltHtml}${monoAltHtml}`;
}

// Grelha de comparação das 4 marcas — mostra sempre Daikin, Bosch, Daitsu e Samsung
// lado a lado (a marca activa usa a configuração escolhida pelo cliente; as outras
// mostram a opção mais económica dessa marca). Apenas um selo na mais barata.
function buildBrandCompareHTML(config) {
  const allBrands = ['daikin', 'bosch', 'daitsu', 'samsung'];

  const brandData = allBrands.map(brand => {
    if (brand === state.brand) {
      const rows = [];
      config.monoRooms.forEach(({ room, seriesKey }) => {
        const catalog = getBrandCatalog(brand);
        const label = seriesKey && catalog[seriesKey] ? catalog[seriesKey].label : '';
        rows.push({ name: room.name, label, specInfo: getSeriesDescriptors(brand, seriesKey) });
      });
      config.multiRooms.forEach(({ room, unit }) => {
        rows.push({ name: room.name, label: getMultiSeriesLabel(brand, unit.model), specInfo: getSeriesDescriptors(brand, getSeriesCatalogKey(brand, unit.model)) });
      });
      if (config.outdoor) rows.push({ name: t('Exterior'), label: config.outdoor.model });
      const systemLabel = config.outdoor ? t('Sistema multisplit') : t('Sistema individual');
      return { brand, total: config.total, systemLabel, rows };
    }
    const cfg = calcAltBrandConfig(brand, state.rooms);
    if (!cfg || !cfg.total) return { brand, total: null, systemLabel: '', rows: [] };
    const rows = [];
    if (cfg.system === 'multi' && cfg.indoorUnits) {
      cfg.indoorUnits.forEach(({ room, unit }) => rows.push({ name: room.name, label: unit.model, specInfo: getSeriesDescriptors(brand, getSeriesCatalogKey(brand, unit.model)) }));
      if (cfg.outdoor) rows.push({ name: t('Exterior'), label: cfg.outdoor.model });
    } else if (cfg.rooms) {
      cfg.rooms.forEach(({ room, seriesKey }) => {
        const catalog = getBrandCatalog(brand);
        const label = catalog[seriesKey] ? catalog[seriesKey].label : seriesKey;
        rows.push({ name: room.name, label, specInfo: getSeriesDescriptors(brand, seriesKey) });
      });
    }
    const systemLabel = cfg.system === 'multi'
      ? `${t('Sistema multisplit')} · ${cfg.seriesLabel}`
      : `${t('Sistema individual')} · ${cfg.seriesLabel}`;
    return { brand, total: cfg.total, systemLabel, rows };
  });

  const totals = brandData.map(b => b.total).filter(v => v != null && v > 0);
  const cheapestTotal = totals.length ? Math.min(...totals) : null;

  const cardsHtml = brandData.map(({ brand, total, systemLabel, rows }) => {
    if (total == null) return '';
    const isActive = brand === state.brand;
    const isCheapest = cheapestTotal != null && total === cheapestTotal;
    const brandName = capFirst(brand);
    const brandImg = brandLogoSrc(brand);
    const rowsHtml = rows.map(r => {
      const specInfoHtml = buildSpecInfoHTML(r.specInfo);
      return `<div class="sbc-card__row"><div class="sbc-card__row-title">${escHtml(r.name)} — ${escHtml(r.label)}</div>${specInfoHtml}</div>`;
    }).join('');
    const badgeHtml = isCheapest ? `<div class="sbc-card__badge">💰 ${t('Melhor Preço')}</div>` : '';
    const actionHtml = isActive
      ? `<div class="sbc-card__selected">✓ ${t('Selecionada')}</div>`
      : `<button class="sbc-card__btn" onclick="changeBrand('${brand}')">${t('Ver esta opção →')}</button>`;
    return `
<div class="sbc-card${isActive ? ' active' : ''}${isCheapest ? ' cheapest' : ''}">
  ${badgeHtml}
  <img src="${brandImg}" alt="${brandName}" class="sbc-card__logo" onerror="this.style.display='none'">
  <div class="sbc-card__system">${systemLabel}</div>
  <div class="sbc-card__rows">${rowsHtml}</div>
  ${actionHtml}
</div>`;
  }).join('');

  return `
<div class="sim-brand-compare">
  <div class="sim-brand-compare__title">${t('Compare as 4 marcas para esta configuração')}</div>
  <div class="sim-brand-compare__grid">${cardsHtml}</div>
</div>`;
}

// ============================================================
// 13. QUOTE MODAL
// ============================================================
function openQuoteModal() {
  const valid = state.rooms.some(r => parseFloat(r.areaM2) > 0);
  if (!valid) {
    alert(t('Preencha os dados de pelo menos uma divisão antes de solicitar orçamento.'));
    return;
  }
  const el = document.getElementById('qm-overlay');
  if (el) {
    el.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const errEl = document.getElementById('qm-error');
    if (errEl) errEl.textContent = '';
    const wifiField = document.getElementById('qm-wifi-field');
    if (wifiField) wifiField.style.display = configHasOptionalWifi() ? '' : 'none';
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
  const zona    = (document.getElementById('qm-zona')?.value || '').trim();
  const errEl   = document.getElementById('qm-error');
  if (!name && !contact) {
    if (errEl) errEl.textContent = t('Por favor indique o seu nome e contacto.');
    return null;
  }
  if (!state.quoteGoal) {
    if (errEl) errEl.textContent = t('Por favor indique o objetivo da instalação.');
    return null;
  }
  const wifiField = document.getElementById('qm-wifi-field');
  const wifiRequired = wifiField && wifiField.style.display !== 'none';
  if (wifiRequired && !state.wifiChoice) {
    if (errEl) errEl.textContent = t('Por favor indique se quer o módulo WiFi.');
    return null;
  }
  if (errEl) errEl.textContent = '';
  return {
    name: name || 'Não indicado', contact: contact || 'Não indicado', zona: zona || 'Não indicada', goal: state.quoteGoal,
    wifi: wifiRequired ? state.wifiChoice : null,
  };
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
      // Usar o config.multiRooms (cálculo real) para obter o modelo correto,
      // evitando mostrar FTXM quando o sistema é Sensira (CTXF)
      const configUnit = config && config.multiRooms && config.multiRooms.find(iu => iu.room.id === room.id);
      const unit = configUnit ? configUnit.unit : getMultiIndoorUnit(state.brand, tier);
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
  lines.push(`🎯 ${t('Objetivo: ')}${t(INSTALL_GOALS[data.goal] || '')}`);
  if (data.wifi) {
    lines.push(`📶 ${t('Módulo WiFi (acessório): ')}${data.wifi === 'sim' ? t('Sim') : t('Não')}`);
  }
  lines.push('');
  lines.push('_(Orçamento detalhado enviado em breve)_');
  lines.push('');
  lines.push(`👤 Nome: ${data.name}`);
  lines.push(`📞 Contacto: ${data.contact}`);
  lines.push(`📍 Zona: ${data.zona}`);

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
    alert(t('Preencha os dados de pelo menos uma divisão antes de gerar o PDF.'));
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
    y += 9;
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
    y += 8;
  }

  checkPage(20);
  addLine();
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 28, 30);
  doc.text('Configuração recomendada para orçamento', margin, y);
  y += 7;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(130, 130, 130);
  doc.text('Orçamento final após visita técnica · Exclui instalação, suportes e materiais', margin, y);
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

// Re-renderizar conteúdo dinâmico quando a língua muda
document.addEventListener('langchange', () => {
  renderRooms();
  renderResults();
  updateLiveTotal();
  // Actualizar picker se estiver aberto
  const pickerOverlay = document.getElementById('smp-overlay');
  if (pickerOverlay && pickerOverlay.style.display === 'flex' && state.modelPickerRoomId) {
    openModelPicker(state.modelPickerRoomId);
  }
});
