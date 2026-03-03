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
  },
  Confora: {
    label: 'Confora', tier: 'intermedio', badge: '⚡ Alta Eficiência',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'Gama intermédia — A+++ com WiFi opcional e filtro PM2.5',
    prices:  { 7000:1224, 9000:1316, 12000:1482, 18000:2343, 24000:2927, 28000:3383 },
    // Sem modelo 15k — usa 18k
    models:  { 7000:'FTXP20', 9000:'FTXP25', 12000:'FTXP35', 18000:'FTXP50', 24000:'FTXP60', 28000:'FTXP71' },
    features: ['Inverter', 'R-32', 'Modo I-Feel', 'Filtro PM2.5', 'WiFi opcional'],
  },
  Perfera: {
    label: 'Perfera', tier: 'premium', badge: '🏆 Topo de Gama',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'Gama premium — WiFi integrado, purificador de ar e controlo por app',
    prices:  { 7000:1451, 9000:1538, 12000:1771, 15000:2251, 18000:2897, 24000:3506, 28000:4041 },
    models:  { 7000:'FTXM20', 9000:'FTXM25', 12000:'FTXM35', 15000:'FTXM42', 18000:'FTXM50', 24000:'FTXM60', 28000:'FTXM71' },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Purificador de ar', 'App Daikin Online'],
  },
  Stylish: {
    label: 'Stylish', tier: 'design', badge: '🎨 Design Premium',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'Design premiado — disponível em Branco, Prateado e Preto (máx. 18k BTU)',
    prices:  { 7000:1728, 9000:1851, 12000:2146, 15000:2712, 18000:3229 },
    // max 18k
    models:  { 7000:'FTXA20', 9000:'FTXA25', 12000:'FTXA35', 15000:'FTXA42', 18000:'FTXA50' },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Design icónico', '3 cores disponíveis'],
    maxBTU: 18000,
  },
  Emura: {
    label: 'Emura', tier: 'design', badge: '✨ Ícone de Design',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'Design ícónico europeu — purificador de ar e controlo por app (máx. 18k BTU)',
    prices:  { 7000:1919, 9000:2005, 12000:2300, 15000:2946, 18000:3419 },
    // max 18k
    models:  { 7000:'FTXJ20', 9000:'FTXJ25', 12000:'FTXJ35', 15000:'FTXJ42', 18000:'FTXJ50' },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Purificador de ar', '3 cores disponíveis'],
    maxBTU: 18000,
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

// --- BOSCH — Monosplit (conjuntos, c/ IVA) ---
const BOSCH_MONO = {
  '3000i': {
    label: 'Climate 3000i', tier: 'entrada', badge: '💰 Melhor Preço',
    energyCool: 'A++', energyHeat: 'A+',
    desc: 'Gama entrada — WiFi Matter · Auto-limpeza iClean · Alexa/Google/Siri',
    prices: { 9000:699, 12000:799, 18000:1099, 24000:1399 },
    models: { 9000:'CL3000i-Set 26WE', 12000:'CL3000i-Set 35WE', 18000:'CL3000i-Set 53WE', 24000:'CL3000i-Set 70WE' },
    features: ['Inverter', 'R-32', 'WiFi Matter', 'Auto-limpeza iClean', 'Alexa/Google/Siri'],
  },
  '6000i': {
    label: 'Climate 6000i', tier: 'premium', badge: '⚡ Alta Eficiência',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'Gama premium — Ionizador · Sensor presença · A+++ · WiFi integrado',
    prices: { 9000:999, 12000:1149, 18000:1449, 24000:1749 },
    models: { 9000:'CL6000i-Set 26WE', 12000:'CL6000i-Set 35WE', 18000:'CL6000i-Set 53WE', 24000:'CL6000i-Set 70WE' },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Ionizador', 'Sensor de presença'],
  },
  '7000i': {
    label: 'Climate 7000i', tier: 'topo', badge: '🏆 Topo de Gama',
    energyCool: 'A+++', energyHeat: 'A+++',
    desc: 'Topo de gama — A+++/A+++ · Modo Silent 19 dB · iF Design Award 2025 (máx. 18k BTU)',
    prices: { 9000:1399, 12000:1599, 18000:1899 },
    models: { 9000:'CL7000i-Set 26E', 12000:'CL7000i-Set 35E', 18000:'CL7000i-Set 53E' },
    features: ['Inverter', 'R-32', 'WiFi integrado', 'Modo Silent 19 dB', 'iF Design Award 2025'],
    maxBTU: 18000,
  },
};

// --- DAITSU — Monosplit (conjuntos, c/ IVA, preços a confirmar) ---
const DAITSU_MONO = {
  'Cool Pro': {
    label: 'Cool Pro', tier: 'entrada', badge: '💰 Melhor Preço',
    energyCool: 'A++', energyHeat: 'A+',
    desc: 'Gama entrada — WiFi ConnectLife incluído · Filtro de pó',
    prices: { 9000:649, 12000:799, 18000:1099, 24000:1349 },
    models: { 9000:'DS09KKD', 12000:'DS12KKD', 18000:'DS18KKD', 24000:'DS24KKD' },
    features: ['Inverter', 'R-32', 'WiFi ConnectLife', 'Filtro de pó', 'Sensor I-Feel'],
  },
  'ARTIC Plus': {
    label: 'ARTIC Plus', tier: 'premium', badge: '🏆 Alta Eficiência',
    energyCool: 'A+++', energyHeat: 'A++',
    desc: 'Gama premium — A+++ · 5 filtros · Auto-limpeza do evaporador',
    prices: { 9000:799, 12000:999, 18000:1299, 24000:1599 },
    models: { 9000:'DS09KTP6', 12000:'DS12KTP6', 18000:'DS18KTP6', 24000:'DS24KTP6' },
    features: ['Inverter', 'R-32', 'WiFi SmartLife', '5 filtros', 'Auto-limpeza do evaporador'],
  },
};

// ============================================================
// 3. ESTADO DA APLICAÇÃO
// ============================================================
const state = {
  step: 1,
  numRooms: 0,
  selectedBrand: 'daikin',
  rooms: [],     // array de objetos room
  results: null, // resultados calculados
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
        energyCool: series.energyCool, energyHeat: series.energyHeat });
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
// 7. CALCULAR RESULTADOS
// ============================================================
function calcResults() {
  // Calcular BTU para cada divisão
  const roomsWithBTU = state.rooms.map(room => {
    const raw = calcBTU(room);
    const btu = btuToTier(raw);
    return { ...room, rawBTU: raw, btu };
  });

  const brand = state.selectedBrand;

  const mono = calcMonoTotal(brand, roomsWithBTU);
  const multi = (brand === 'daikin' && roomsWithBTU.length >= 2)
    ? calcDaikinMulti(roomsWithBTU)
    : null;

  state.results = { roomsWithBTU, mono, multi, brand };
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

  const el = document.getElementById('simResults');
  el.innerHTML = buildResultsHTML();
}

function buildResultsHTML() {
  const { roomsWithBTU, mono, multi, brand } = state.results;
  const brandLabel = { daikin: 'Daikin', bosch: 'Bosch', daitsu: 'Daitsu' }[brand];

  let html = '';

  // ─── Análise das divisões ───
  html += `
  <div class="res-section">
    <h2 class="res-main-title">Análise das suas divisões <span class="res-brand-tag">${brandLabel}</span></h2>
    <div class="res-rooms-grid">
      ${roomsWithBTU.map(r => `
        <div class="res-room-card">
          <div class="res-room-icon">${roomIcon(r.type)}</div>
          <div class="res-room-info">
            <h4>${r.name || ['Quarto Principal','Sala','Quarto 2','Escritório','Quarto 3'][r.id] || 'Divisão'}</h4>
            <p>${r.areaM2} m² · ${String(r.heightM).replace('.',',')} m altura</p>
            ${r.openToKitchen ? '<p class="res-note">🍳 Open-space com cozinha</p>' : ''}
            ${r.hasWindows ? `<p class="res-note">🪟 Janelas ${orientLabel(r.windowOrientation)} (${r.windowAreaM2} m²)</p>` : ''}
          </div>
          <div class="res-room-btu">
            <span class="res-btu-raw">~${Math.round(r.rawBTU/100)*100} BTU calculados</span>
            <span class="res-btu-tier">${btuLabel(r.btu)} BTU</span>
            <span class="res-btu-kw">${KW_LABELS[r.btu]}</span>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;

  // ─── Sugestão A — Monosplit ───
  html += `<div class="res-section">
    <div class="res-section-header">
      <h2 class="res-option-title">💡 Opção A — Monosplit</h2>
      <p class="res-option-desc">Uma unidade exterior por divisão — instalação mais simples, menor custo de equipamento para 1–2 divisões.</p>
    </div>`;

  if (mono && mono.length) {
    html += `<div class="res-tiers">`;
    for (const option of mono) {
      html += `
      <div class="res-tier-card">
        <div class="res-tier-header">
          <span class="res-tier-badge">${option.badge}</span>
          <h3 class="res-tier-name">${brandLabel} ${option.series}</h3>
          <p class="res-tier-desc">${option.desc}</p>
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
          <span>Total equipamento</span>
          <span class="res-total-price">${fmtPrice(option.total)}</span>
        </div>
        <div class="res-tier-note">
          ✓ c/ IVA &nbsp;·&nbsp; ${option.rooms.length} unidade(s) exterior(es)
          &nbsp;·&nbsp; Classe ${option.energyCool} arrefecimento
        </div>
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
          <span>Total equipamento</span>
          <span class="res-total-price">${fmtPrice(multi.total)}</span>
        </div>

        <div class="res-multi-notes">
          <div class="res-multi-note res-multi-note--pro">✅ Apenas 1 unidade exterior — menor impacto visual</div>
          <div class="res-multi-note res-multi-note--pro">✅ Controlo individual por divisão</div>
          <div class="res-multi-note res-multi-note--info">ℹ️ Custo de equipamento geralmente superior ao monosplit</div>
          <div class="res-multi-note res-multi-note--info">ℹ️ c/ IVA · preços de equipamento sem instalação</div>
        </div>
      </div>`;

    } else if (brand === 'daikin' && !multi) {
      html += `
      <div class="res-warn-box">
        <p>⚠️ A combinação de divisões introduzida excede a capacidade máxima dos sistemas multisplit Daikin disponíveis.</p>
        <p>Recomendamos a opção monosplit ou contacte-nos para uma análise personalizada.</p>
      </div>`;
    } else {
      html += `
      <div class="res-coming-box">
        <p>🔧 O sistema multisplit ${brandLabel} está em preparação neste simulador.</p>
        <p>Contacte-nos para um orçamento multisplit com esta marca.</p>
      </div>`;
    }

    html += `</div>`; // /res-section multisplit
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

  // Step 3 — trocar marca (delegado)
  document.getElementById('simResults').addEventListener('click', e => {
    const btn = e.target.closest('.sim-switch-brand');
    if (btn) {
      state.selectedBrand = btn.dataset.brand;
      calcResults();
      renderStep3();
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
