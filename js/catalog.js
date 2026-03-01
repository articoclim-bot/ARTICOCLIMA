/* =============================================
   ARTICOCLIMA — Catálogo de Produtos
   =============================================
   Para atualizar produtos, edite o array PRODUCTS abaixo.
   Para adicionar imagens, coloque os ficheiros em:
     assets/products/NOME-DO-FICHEIRO.jpg
   e atualize o campo "image" de cada produto.
   ============================================= */

const PRODUCTS = [

  /* ===================================================
     DAIKIN
     =================================================== */
  {
    id: 'daikin-sensira-ftxf25c',
    brand: 'daikin', series: 'Sensira', model: 'FTXF25C',
    btu: 9000, kw: 2.5,
    energyCool: 'A++', energyHeat: 'A+',
    noiseIn: 19, noiseOut: 46,
    tech: ['Inverter', 'R-32'],
    features: ['Modo seco', 'Timer', 'Auto-restart', 'Filtro básico'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 599,
    image: 'assets/products/daikin-sensira-ftxf25c.jpg',
  },
  {
    id: 'daikin-sensira-ftxf35c',
    brand: 'daikin', series: 'Sensira', model: 'FTXF35C',
    btu: 12000, kw: 3.5,
    energyCool: 'A++', energyHeat: 'A+',
    noiseIn: 21, noiseOut: 49,
    tech: ['Inverter', 'R-32'],
    features: ['Modo seco', 'Timer', 'Auto-restart', 'Filtro básico'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 699,
    image: 'assets/products/daikin-sensira-ftxf35c.jpg',
  },
  {
    id: 'daikin-sensira-ftxf50c',
    brand: 'daikin', series: 'Sensira', model: 'FTXF50C',
    btu: 18000, kw: 5.0,
    energyCool: 'A+', energyHeat: 'A',
    noiseIn: 26, noiseOut: 52,
    tech: ['Inverter', 'R-32'],
    features: ['Modo seco', 'Timer', 'Auto-restart', 'Filtro básico'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 849,
    image: 'assets/products/daikin-sensira-ftxf50c.jpg',
  },
  {
    id: 'daikin-comfora-ftxp25m',
    brand: 'daikin', series: 'Comfora', model: 'FTXP25M',
    btu: 9000, kw: 2.5,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 19, noiseOut: 46,
    tech: ['Inverter', 'R-32', 'WiFi opcional'],
    features: ['Modo I-Feel', 'Coanda', 'Filtro PM2.5', 'Timer semanal'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 849,
    image: 'assets/products/daikin-comfora-ftxp25m.jpg',
  },
  {
    id: 'daikin-comfora-ftxp35m',
    brand: 'daikin', series: 'Comfora', model: 'FTXP35M',
    btu: 12000, kw: 3.5,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 22, noiseOut: 49,
    tech: ['Inverter', 'R-32', 'WiFi opcional'],
    features: ['Modo I-Feel', 'Coanda', 'Filtro PM2.5', 'Timer semanal'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 949,
    image: 'assets/products/daikin-comfora-ftxp35m.jpg',
  },
  {
    id: 'daikin-comfora-ftxp50m',
    brand: 'daikin', series: 'Comfora', model: 'FTXP50M',
    btu: 18000, kw: 5.0,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 26, noiseOut: 52,
    tech: ['Inverter', 'R-32', 'WiFi opcional'],
    features: ['Modo I-Feel', 'Coanda', 'Filtro PM2.5', 'Timer semanal'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 1149,
    image: 'assets/products/daikin-comfora-ftxp50m.jpg',
  },
  {
    id: 'daikin-emura-ftxj25a',
    brand: 'daikin', series: 'Emura 3', model: 'FTXJ25A',
    btu: 9000, kw: 2.5,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 19, noiseOut: 46,
    tech: ['Inverter', 'R-32', 'WiFi integrado'],
    features: ['Design premium', 'I-Feel', 'Coanda', 'Filtro PM2.5', 'Purificador de ar', 'Controlo por app'],
    colors: [
      { name: 'Branco', hex: '#F0F0F0' },
      { name: 'Prateado', hex: '#B8B8C0' },
      { name: 'Preto',    hex: '#2C2C2E' },
    ],
    pvp: 1299,
    image: 'assets/products/daikin-emura-ftxj25a-branco.jpg',
    colorImages: {
      'Branco':   'assets/products/daikin-emura-ftxj25a-branco.jpg',
      'Prateado': 'assets/products/daikin-emura-ftxj25a-prateado.jpg',
      'Preto':    'assets/products/daikin-emura-ftxj25a-preto.jpg',
    },
  },
  {
    id: 'daikin-emura-ftxj35a',
    brand: 'daikin', series: 'Emura 3', model: 'FTXJ35A',
    btu: 12000, kw: 3.5,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 22, noiseOut: 49,
    tech: ['Inverter', 'R-32', 'WiFi integrado'],
    features: ['Design premium', 'I-Feel', 'Coanda', 'Filtro PM2.5', 'Purificador de ar', 'Controlo por app'],
    colors: [
      { name: 'Branco',   hex: '#F0F0F0' },
      { name: 'Prateado', hex: '#B8B8C0' },
      { name: 'Preto',    hex: '#2C2C2E' },
    ],
    pvp: 1499,
    image: 'assets/products/daikin-emura-ftxj35a-branco.jpg',
    colorImages: {
      'Branco':   'assets/products/daikin-emura-ftxj35a-branco.jpg',
      'Prateado': 'assets/products/daikin-emura-ftxj35a-prateado.jpg',
      'Preto':    'assets/products/daikin-emura-ftxj35a-preto.jpg',
    },
  },
  {
    id: 'daikin-emura-ftxj50a',
    brand: 'daikin', series: 'Emura 3', model: 'FTXJ50A',
    btu: 18000, kw: 5.0,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 25, noiseOut: 52,
    tech: ['Inverter', 'R-32', 'WiFi integrado'],
    features: ['Design premium', 'I-Feel', 'Coanda', 'Filtro PM2.5', 'Purificador de ar', 'Controlo por app'],
    colors: [
      { name: 'Branco',   hex: '#F0F0F0' },
      { name: 'Prateado', hex: '#B8B8C0' },
      { name: 'Preto',    hex: '#2C2C2E' },
    ],
    pvp: 1749,
    image: 'assets/products/daikin-emura-ftxj50a-branco.jpg',
    colorImages: {
      'Branco':   'assets/products/daikin-emura-ftxj50a-branco.jpg',
      'Prateado': 'assets/products/daikin-emura-ftxj50a-prateado.jpg',
      'Preto':    'assets/products/daikin-emura-ftxj50a-preto.jpg',
    },
  },

  /* ===================================================
     BOSCH
     =================================================== */
  {
    id: 'bosch-2000i-rac26',
    brand: 'bosch', series: 'Climate 2000i', model: 'RAC 2,6-1',
    btu: 9000, kw: 2.6,
    energyCool: 'A++', energyHeat: 'A+',
    noiseIn: 24, noiseOut: 51,
    tech: ['Inverter', 'R-32'],
    features: ['Modo auto', 'Timer 24h', 'Auto-restart', 'Modo de aquecimento rápido'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 549,
    image: 'assets/products/bosch-climate2000i-rac26.jpg',
  },
  {
    id: 'bosch-2000i-rac35',
    brand: 'bosch', series: 'Climate 2000i', model: 'RAC 3,5-1',
    btu: 12000, kw: 3.5,
    energyCool: 'A++', energyHeat: 'A+',
    noiseIn: 25, noiseOut: 53,
    tech: ['Inverter', 'R-32'],
    features: ['Modo auto', 'Timer 24h', 'Auto-restart', 'Modo de aquecimento rápido'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 649,
    image: 'assets/products/bosch-climate2000i-rac35.jpg',
  },
  {
    id: 'bosch-2000i-rac53',
    brand: 'bosch', series: 'Climate 2000i', model: 'RAC 5,3-1',
    btu: 18000, kw: 5.3,
    energyCool: 'A++', energyHeat: 'A+',
    noiseIn: 38, noiseOut: 56,
    tech: ['Inverter', 'R-32'],
    features: ['Modo auto', 'Timer 24h', 'Auto-restart', 'Modo de aquecimento rápido'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 799,
    image: 'assets/products/bosch-climate2000i-rac53.jpg',
  },
  {
    id: 'bosch-5000i-rac26',
    brand: 'bosch', series: 'Climate 5000i', model: 'RAC 2,6-1',
    btu: 9000, kw: 2.6,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 20, noiseOut: 48,
    tech: ['Inverter', 'R-32', 'WiFi integrado'],
    features: ['App Home Connect', 'Filtragem avançada', 'Timer semanal', 'Modo eco', 'Controlo por voz'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 999,
    image: 'assets/products/bosch-climate5000i-rac26.jpg',
  },
  {
    id: 'bosch-5000i-rac35',
    brand: 'bosch', series: 'Climate 5000i', model: 'RAC 3,5-1',
    btu: 12000, kw: 3.5,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 22, noiseOut: 50,
    tech: ['Inverter', 'R-32', 'WiFi integrado'],
    features: ['App Home Connect', 'Filtragem avançada', 'Timer semanal', 'Modo eco', 'Controlo por voz'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 1099,
    image: 'assets/products/bosch-climate5000i-rac35.jpg',
  },
  {
    id: 'bosch-5000i-rac53',
    brand: 'bosch', series: 'Climate 5000i', model: 'RAC 5,3-1',
    btu: 18000, kw: 5.3,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 35, noiseOut: 54,
    tech: ['Inverter', 'R-32', 'WiFi integrado'],
    features: ['App Home Connect', 'Filtragem avançada', 'Timer semanal', 'Modo eco', 'Controlo por voz'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 1349,
    image: 'assets/products/bosch-climate5000i-rac53.jpg',
  },
  {
    id: 'bosch-5000i-rac70',
    brand: 'bosch', series: 'Climate 5000i', model: 'RAC 7,0-1',
    btu: 24000, kw: 7.0,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 37, noiseOut: 58,
    tech: ['Inverter', 'R-32', 'WiFi integrado'],
    features: ['App Home Connect', 'Filtragem avançada', 'Timer semanal', 'Modo eco', 'Controlo por voz'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 1599,
    image: 'assets/products/bosch-climate5000i-rac70.jpg',
  },

  /* ===================================================
     DAITSU — Série ARTIC
     =================================================== */
  {
    id: 'daitsu-artic-9',
    brand: 'daitsu', series: 'ARTIC', model: 'ADS 9UI-ARTIC',
    btu: 9000, kw: 2.5,
    energyCool: 'A++', energyHeat: 'A+',
    noiseIn: 25, noiseOut: 52,
    tech: ['Inverter', 'R-32'],
    features: ['Modo auto', 'Timer 24h', 'Auto-restart', 'Controlo remoto'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 449,
    image: 'assets/products/daitsu-artic-9.jpg',
  },
  {
    id: 'daitsu-artic-12',
    brand: 'daitsu', series: 'ARTIC', model: 'ADS 12UI-ARTIC',
    btu: 12000, kw: 3.5,
    energyCool: 'A++', energyHeat: 'A+',
    noiseIn: 28, noiseOut: 54,
    tech: ['Inverter', 'R-32'],
    features: ['Modo auto', 'Timer 24h', 'Auto-restart', 'Controlo remoto'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 549,
    image: 'assets/products/daitsu-artic-12.jpg',
  },
  {
    id: 'daitsu-artic-18',
    brand: 'daitsu', series: 'ARTIC', model: 'ADS 18UI-ARTIC',
    btu: 18000, kw: 5.0,
    energyCool: 'A++', energyHeat: 'A+',
    noiseIn: 35, noiseOut: 57,
    tech: ['Inverter', 'R-32'],
    features: ['Modo auto', 'Timer 24h', 'Auto-restart', 'Controlo remoto'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 699,
    image: 'assets/products/daitsu-artic-18.jpg',
  },
  {
    id: 'daitsu-artic-24',
    brand: 'daitsu', series: 'ARTIC', model: 'ADS 24UI-ARTIC',
    btu: 24000, kw: 7.0,
    energyCool: 'A++', energyHeat: 'A+',
    noiseIn: 40, noiseOut: 59,
    tech: ['Inverter', 'R-32'],
    features: ['Modo auto', 'Timer 24h', 'Auto-restart', 'Controlo remoto'],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 849,
    image: 'assets/products/daitsu-artic-24.jpg',
  },
];

/* =============================================
   HELPERS
   ============================================= */

const ENERGY_META = {
  'A+++': { cls: 'energy--appp', label: 'A+++' },
  'A++':  { cls: 'energy--app',  label: 'A++' },
  'A+':   { cls: 'energy--ap',   label: 'A+' },
  'A':    { cls: 'energy--a',    label: 'A' },
};

const BRAND_LABEL = { daikin: 'Daikin', bosch: 'Bosch', daitsu: 'Daitsu' };

const AC_ICON = `<svg viewBox="0 0 96 44" width="96" height="44" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="6" width="92" height="28" rx="5"/>
  <line x1="10" y1="15" x2="62" y2="15"/>
  <line x1="10" y1="20" x2="62" y2="20"/>
  <line x1="10" y1="25" x2="62" y2="25"/>
  <circle cx="76" cy="20" r="6"/>
  <line x1="2"  y1="34" x2="94" y2="34"/>
  <line x1="20" y1="34" x2="20" y2="40"/>
  <line x1="76" y1="34" x2="76" y2="40"/>
</svg>`;

function energyBadge(cls) {
  const m = ENERGY_META[cls] || { cls: 'energy--a', label: cls };
  return `<span class="energy-badge ${m.cls}">${m.label}</span>`;
}

function formatBtu(btu) {
  return btu.toLocaleString('pt-PT') + ' BTU';
}

function kwStr(kw) {
  return kw.toFixed(1).replace('.', ',') + ' kW';
}

/* =============================================
   CARD TEMPLATE
   ============================================= */
function cardHTML(p) {
  const colorDots = p.colors.map(c =>
    `<span class="color-dot" style="background:${c.hex}" title="${c.name}"></span>`
  ).join('');

  const techTags = p.tech.map(t =>
    `<span class="tech-tag">${t}</span>`
  ).join('');

  return `
    <article class="product-card" data-id="${p.id}" tabindex="0" role="button" aria-label="Ver detalhes ${p.series} ${p.model}">
      <div class="product-card__img brand-bg--${p.brand}">
        <img src="${p.image}" alt="${BRAND_LABEL[p.brand]} ${p.series} ${p.model}" class="product-card__photo" onerror="this.style.display='none'">
        <div class="product-card__fallback">${AC_ICON}</div>
        <div class="product-card__img-top">
          <span class="product-card__series-tag">${p.series}</span>
          ${energyBadge(p.energyCool)}
        </div>
      </div>
      <div class="product-card__body">
        <p class="product-card__brand">${BRAND_LABEL[p.brand]}</p>
        <h3 class="product-card__model">${p.model}</h3>
        <div class="product-card__specs-row">
          <span class="pspec">🌡 ${formatBtu(p.btu)}</span>
          <span class="pspec">🔊 ${p.noiseIn} dB(A)</span>
        </div>
        <div class="product-card__tech">${techTags}</div>
        <div class="product-card__colors">${colorDots}</div>
        <div class="product-card__footer">
          <div class="product-card__price">
            <span class="price-from">PVP a partir de</span>
            <span class="price-val">${p.pvp.toLocaleString('pt-PT')}€</span>
          </div>
          <button class="btn btn--primary btn--sm catalog-detail-btn" data-id="${p.id}">Ver modelo →</button>
        </div>
      </div>
    </article>`;
}

/* =============================================
   MODAL TEMPLATE
   ============================================= */
function modalHTML(p) {
  const colorSwatches = p.colors.map((c, i) => `
    <button class="cswatch ${i === 0 ? 'active' : ''}"
      style="background:${c.hex}"
      title="${c.name}"
      data-color="${c.name}"
      data-img="${p.colorImages ? (p.colorImages[c.name] || p.image) : p.image}">
    </button>`).join('');

  const featureList = p.features.map(f => `<li>${f}</li>`).join('');
  const techTags = p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

  const waMsg = encodeURIComponent(
    `Olá ARTICOCLIMA! 👋\n` +
    `Tenho interesse no modelo ${BRAND_LABEL[p.brand]} ${p.series} ${p.model} (${formatBtu(p.btu)}).\n` +
    `Podiam dar-me mais informações e disponibilidade?`
  );

  return `
    <div class="modal__layout">
      <div class="modal__img-col">
        <div class="modal__img-wrap brand-bg--${p.brand}" id="modalImgWrap">
          <img src="${p.image}" alt="${BRAND_LABEL[p.brand]} ${p.series} ${p.model}" id="modalImg" onerror="this.style.display='none'">
          <div class="product-card__fallback modal__fallback">${AC_ICON}</div>
        </div>
        ${p.colors.length > 1 ? `
        <div class="modal__color-section">
          <p class="modal__color-label">Cores disponíveis</p>
          <div class="modal__color-swatches">${colorSwatches}</div>
        </div>` : ''}
      </div>
      <div class="modal__info-col">
        <p class="modal__brand-name">${BRAND_LABEL[p.brand]}</p>
        <p class="modal__series-name">${p.series}</p>
        <h2 class="modal__model-name">${p.model}</h2>

        <div class="modal__energy-row">
          <div class="modal__energy-item">
            ${energyBadge(p.energyCool)}
            <span>Arrefecimento</span>
          </div>
          <div class="modal__energy-item">
            ${energyBadge(p.energyHeat)}
            <span>Aquecimento</span>
          </div>
        </div>

        <div class="modal__specs">
          <div class="spec-row">
            <span class="spec-row__label">Potência</span>
            <span class="spec-row__val">${kwStr(p.kw)} · ${formatBtu(p.btu)}</span>
          </div>
          <div class="spec-row">
            <span class="spec-row__label">Ruído interior</span>
            <span class="spec-row__val">${p.noiseIn} dB(A)</span>
          </div>
          <div class="spec-row">
            <span class="spec-row__label">Ruído exterior</span>
            <span class="spec-row__val">${p.noiseOut} dB(A)</span>
          </div>
          <div class="spec-row">
            <span class="spec-row__label">Tecnologia</span>
            <span class="spec-row__val tech-row">${techTags}</span>
          </div>
        </div>

        <div class="modal__features">
          <p class="modal__features-label">Características</p>
          <ul>${featureList}</ul>
        </div>

        <div class="modal__cta">
          <div class="modal__price-block">
            <span class="modal__price-label">PVP a partir de</span>
            <span class="modal__price-val">${p.pvp.toLocaleString('pt-PT')}€</span>
            <span class="modal__price-note">* Preço de equipamento. Instalação não incluída.</span>
          </div>
          <div class="modal__btn-row">
            <a href="${location.pathname.includes('catalogo') ? 'index.html#orcamento' : '#orcamento'}" class="btn btn--primary modal-close-trigger">Pedir Orçamento →</a>
            <a href="https://wa.me/351964501776?text=${waMsg}" target="_blank" rel="noopener" class="btn btn--whatsapp">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>`;
}

/* =============================================
   CATALOG INIT
   ============================================= */
(function initCatalog() {
  const grid      = document.getElementById('catalogGrid');
  const modal     = document.getElementById('catalogModal');
  const modalBox  = document.getElementById('modalBox');
  const modalBody = document.getElementById('modalBody');
  const closeBtn  = document.getElementById('modalClose');
  const brandTabs = document.querySelectorAll('.ctab');
  const btuSel    = document.getElementById('btuFilter');

  if (!grid) return;

  let activeBrand = 'all';
  let activeBtu   = 'all';

  /* ---- Render ---- */
  function render() {
    const filtered = PRODUCTS.filter(p => {
      const brandOk = activeBrand === 'all' || p.brand === activeBrand;
      const btuOk   = activeBtu  === 'all' || p.btu === parseInt(activeBtu, 10);
      return brandOk && btuOk;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<p class="catalog__empty">Nenhum modelo encontrado com os filtros selecionados.</p>`;
      return;
    }
    grid.innerHTML = filtered.map(cardHTML).join('');

    /* Attach card click */
    grid.querySelectorAll('.catalog-detail-btn, .product-card').forEach(el => {
      el.addEventListener('click', e => {
        const id = el.dataset.id || el.closest('.product-card').dataset.id;
        openModal(id);
      });
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = el.dataset.id;
          if (id) openModal(id);
        }
      });
    });
  }

  /* ---- Filters ---- */
  brandTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      brandTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeBrand = tab.dataset.brand;
      render();
    });
  });

  btuSel.addEventListener('change', () => {
    activeBtu = btuSel.value;
    render();
  });

  /* ---- Modal ---- */
  function openModal(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;

    modalBody.innerHTML = modalHTML(p);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    /* Color swatches */
    modalBody.querySelectorAll('.cswatch').forEach(sw => {
      sw.addEventListener('click', () => {
        modalBody.querySelectorAll('.cswatch').forEach(s => s.classList.remove('active'));
        sw.classList.add('active');
        const img = document.getElementById('modalImg');
        if (img && sw.dataset.img) {
          img.src = sw.dataset.img;
          img.style.display = '';
        }
      });
    });

    /* Close on overlay click */
    modal.querySelector('.modal__overlay').addEventListener('click', closeModal);

    /* Close on "Pedir Orçamento" */
    modalBody.querySelectorAll('.modal-close-trigger').forEach(el => {
      el.addEventListener('click', closeModal);
    });
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---- Init ---- */
  render();
})();
