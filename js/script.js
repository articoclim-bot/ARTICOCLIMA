/* =============================================
   ARTICOCLIMA - JavaScript
   ============================================= */

/* =============================================
   TABELA DE PREÇOS — EDITAR ESTES VALORES
   =============================================
   Todos os preços são em euros (€) e incluem
   equipamento + mão de obra.
   ============================================= */

const PRICING = {

  /* ---- ACRÉSCIMO por cenário de instalação ----
     Valor extra a somar ao PVP do equipamento */
  scenario: {
    preinstall:  { label: 'Com pré-instalação',       extra: 0   },
    replacement: { label: 'Substituição de aparelho', extra: 80  },
    new:         { label: 'Instalação de raiz',       extra: 180 },
  },

  /* ---- ACRÉSCIMO por distância de tubagens ---- */
  distance: {
    short:  { label: 'Até 3 metros',      extra: 0   },
    medium: { label: '3 a 6 metros',      extra: 50  },
    long:   { label: '6 a 10 metros',     extra: 100 },
    vlong:  { label: 'Mais de 10 metros', extra: 180 },
  },

};

/* Número WhatsApp (sem espaços, com código país) */
const WHATSAPP_NUMBER = '351964501776';

/* =============================================
   STATE
   ============================================= */
const state = {
  step:     1,
  scenario: null,
  brand:    null,
  series:   null,
  btu:      null,
  distance: null,
};

const BRAND_LABELS = { daikin: 'Daikin', bosch: 'Bosch', daitsu: 'Daitsu' };
const BTU_AREAS   = { 7000:'~15m²', 9000:'~20m²', 12000:'~30m²', 15000:'~40m²', 18000:'~50m²', 24000:'~70m²', 28000:'~90m²' };

/* =============================================
   HELPERS
   ============================================= */
function $(id) { return document.getElementById(id); }
function $q(sel) { return document.querySelector(sel); }

/* =============================================
   NAV — Scroll + Mobile toggle
   ============================================= */
(function initNav() {
  const header     = $('header');
  const navToggle  = $('navToggle');
  const navMenu    = $('navMenu');
  const navLinks   = document.querySelectorAll('.nav__link');

  /* Sticky shadow */
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* Mobile toggle */
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  /* Close menu on link click */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* =============================================
   QUOTE CALCULATOR
   ============================================= */
(function initQuiz() {

  /* -- Progress update (6 steps) -- */
  function updateProgress(step) {
    for (let i = 1; i <= 6; i++) {
      const dot  = $('prog-' + i);
      const line = $('line-' + i);
      if (!dot) continue;
      dot.classList.remove('active', 'done');
      if (i < step)        dot.classList.add('done');
      else if (i === step) dot.classList.add('active');
      if (line) line.classList.toggle('done', i < step);
    }
  }

  /* -- Show step -- */
  function showStep(n) {
    document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));
    const next = $('quiz-step-' + n);
    if (next) next.classList.add('active');
    updateProgress(n);
    state.step = n;
    $('orcamento').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* -- Static option cards (steps 1 e 5) -- */
  document.querySelectorAll('.option-card[data-step]').forEach(card => {
    card.addEventListener('click', () => {
      const step  = parseInt(card.dataset.step, 10);
      const value = card.dataset.value;

      card.closest('.option-grid').querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      if (step === 1) {
        state.scenario = value;
        setTimeout(() => showStep(2), 220);
      } else if (step === 2) {
        state.brand = value;
        buildSeriesGrid(value);
        setTimeout(() => showStep(3), 220);
      } else if (step === 5) {
        state.distance = value;
        setTimeout(() => showResult(), 220);
      }
    });
  });

  /* -- Back buttons (delegação) -- */
  document.querySelector('.quiz-wrapper').addEventListener('click', e => {
    const btn = e.target.closest('.quiz-back');
    if (!btn) return;
    showStep(parseInt(btn.dataset.target, 10));
  });

  /* -- Restart -- */
  $('restartBtn').addEventListener('click', () => {
    state.scenario = null;
    state.brand    = null;
    state.series   = null;
    state.btu      = null;
    state.distance = null;
    document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    showStep(1);
  });

  /* -- Build series grid (step 3) -- */
  function buildSeriesGrid(brand) {
    const seriesNames = [...new Set(
      PRODUCTS.filter(p => p.brand === brand).map(p => p.series)
    )];
    const grid = $('seriesGrid');
    grid.innerHTML = '';
    const cols = seriesNames.length <= 3 ? seriesNames.length : 3;
    grid.className = 'option-grid option-grid--' + cols;

    seriesNames.forEach(seriesName => {
      const models   = PRODUCTS.filter(p => p.brand === brand && p.series === seriesName);
      const minPrice = Math.min(...models.map(p => p.pvp));
      const energyCl = models[0].energyCool;

      const btn = document.createElement('button');
      btn.className = 'option-card option-card--series';
      btn.innerHTML = `
        <div class="series-badge">${energyCl}</div>
        <h4>${seriesName}</h4>
        <p>A partir de<br><strong>${minPrice.toLocaleString('pt-PT')} €</strong></p>
      `;
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        btn.classList.add('selected');
        state.series = seriesName;
        buildPowerGrid(brand, seriesName);
        setTimeout(() => showStep(4), 220);
      });
      grid.appendChild(btn);
    });
  }

  /* -- Build power/BTU grid (step 4) -- */
  function buildPowerGrid(brand, series) {
    const products = PRODUCTS
      .filter(p => p.brand === brand && p.series === series)
      .sort((a, b) => a.btu - b.btu);
    const grid = $('powerGrid');
    grid.innerHTML = '';
    const cols = Math.min(products.length, 4);
    grid.className = 'option-grid option-grid--' + cols;

    products.forEach(product => {
      const kbtu = Math.round(product.btu / 1000);
      const area = BTU_AREAS[product.btu] || '';
      const btn  = document.createElement('button');
      btn.className = 'option-card';
      btn.innerHTML = `
        <div class="option-card__emoji">🌡️</div>
        <h4>${kbtu}.000 BTU</h4>
        <p>Área ${area}<br><strong>${product.pvp.toLocaleString('pt-PT')} €</strong></p>
      `;
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        btn.classList.add('selected');
        state.btu = product.btu;
        setTimeout(() => showStep(5), 220);
      });
      grid.appendChild(btn);
    });
  }

  /* -- Calculate & Show Result -- */
  function showResult() {
    const product = PRODUCTS.find(p =>
      p.brand  === state.brand  &&
      p.series === state.series &&
      p.btu    === state.btu
    );
    const sc = PRICING.scenario[state.scenario];
    const di = PRICING.distance[state.distance];
    if (!product || !sc || !di) { console.warn('Estado incompleto'); return; }

    const equipPrice  = product.pvp;
    const installCost = sc.extra + di.extra;
    const total       = equipPrice + installCost;
    const kbtu        = Math.round(state.btu / 1000);
    const brandLabel  = BRAND_LABELS[state.brand];

    /* Summary tags */
    $('resultSummary').innerHTML = [
      { icon: '🏠', text: sc.label },
      { icon: '🏷️', text: `${brandLabel} ${state.series}` },
      { icon: '🌡️', text: `${kbtu}.000 BTU` },
      { icon: '📏', text: di.label },
    ].map(t => `<span class="summary-tag">${t.icon} ${t.text}</span>`).join('');

    /* Breakdown */
    $('resultBreakdown').innerHTML = `
      <div class="result-breakdown__row">
        <span>Equipamento — ${brandLabel} ${state.series} ${kbtu}k BTU</span>
        <strong>${equipPrice.toLocaleString('pt-PT')} €</strong>
      </div>
      <div class="result-breakdown__row">
        <span>Instalação — ${sc.label}${installCost > 0 ? ', ' + di.label : ''}</span>
        <strong>+ ${installCost.toLocaleString('pt-PT')} €</strong>
      </div>
    `;

    /* Total */
    $('resultPrice').textContent = total.toLocaleString('pt-PT') + ' €';

    /* WhatsApp */
    const msg = encodeURIComponent(
      `Olá ARTICOCLIMA! 👋\n\n` +
      `Fiz o orçamento no site:\n` +
      `📌 Situação: ${sc.label}\n` +
      `🏷️ Equipamento: ${brandLabel} ${state.series} — ${kbtu}.000 BTU\n` +
      `📏 Distância: ${di.label}\n` +
      `🔧 Equipamento: ${equipPrice.toLocaleString('pt-PT')} €\n` +
      `🔩 Instalação: +${installCost.toLocaleString('pt-PT')} €\n` +
      `💰 Total estimado: ${total.toLocaleString('pt-PT')} €\n\n` +
      `Gostaria de agendar uma visita técnica gratuita. Podem confirmar disponibilidade?`
    );
    $('whatsappResultBtn').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;

    showStep(6);
  }

  /* Init */
  showStep(1);

})();

/* =============================================
   SMOOTH SCROLL para links âncora
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 84; // altura do header
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* =============================================
   ANIMAÇÃO de entrada (scroll reveal simples)
   ============================================= */
(function initReveal() {
  const items = document.querySelectorAll(
    '.service-card, .why-card, .contact-card, .stat'
  );
  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => obs.observe(el));
})();
