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

  /* ---- PREÇO BASE por potência ----
     Inclui: equipamento + instalação base
     (ajuste conforme as suas margens e mercado) */
  base: {
    9000:  { label: '9.000 BTU',  price: 650  },   // ← EDITAR
    12000: { label: '12.000 BTU', price: 750  },   // ← EDITAR
    18000: { label: '18.000 BTU', price: 950  },   // ← EDITAR
    24000: { label: '24.000 BTU', price: 1150 },   // ← EDITAR
  },

  /* ---- ACRÉSCIMO por cenário ----
     Valor extra a somar ao preço base */
  scenario: {
    preinstall:  { label: 'Com pré-instalação',    extra: 0   },  // ← EDITAR
    replacement: { label: 'Substituição de aparelho', extra: 80  },  // ← EDITAR (remoção do antigo)
    new:         { label: 'Instalação de raiz',    extra: 180 },  // ← EDITAR (canalização completa)
  },

  /* ---- ACRÉSCIMO por distância ----
     Custo extra de material (tubagens/cablagem) */
  distance: {
    short:  { label: 'Até 3 metros',      extra: 0   },  // ← EDITAR
    medium: { label: '3 a 6 metros',      extra: 50  },  // ← EDITAR
    long:   { label: '6 a 10 metros',     extra: 100 },  // ← EDITAR
    vlong:  { label: 'Mais de 10 metros', extra: 180 },  // ← EDITAR
  },

};

/* Número WhatsApp (sem espaços, com código país) */
const WHATSAPP_NUMBER = '351964501776';

/* =============================================
   STATE
   ============================================= */
const state = {
  step: 1,
  scenario: null,
  power: null,
  distance: null,
};

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

  /* -- Progress update -- */
  function updateProgress(step) {
    for (let i = 1; i <= 4; i++) {
      const dot  = $('prog-' + i);
      const line = $('line-' + i);
      if (!dot) continue;

      dot.classList.remove('active', 'done');
      if (i < step)       dot.classList.add('done');
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
    // scroll quiz into view smoothly
    $('orcamento').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* -- Option card selection -- */
  document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
      const step  = parseInt(card.dataset.step, 10);
      const value = card.dataset.value;

      // Deselect siblings
      card.closest('.option-grid').querySelectorAll('.option-card').forEach(c => {
        c.classList.remove('selected');
      });
      card.classList.add('selected');

      // Store value
      if (step === 1) state.scenario = value;
      if (step === 2) state.power    = value;
      if (step === 3) state.distance = value;

      // Advance after short delay (visual feedback)
      setTimeout(() => {
        if (step < 3) {
          showStep(step + 1);
        } else {
          showResult();
        }
      }, 220);
    });
  });

  /* -- Back buttons -- */
  $('back-2').addEventListener('click', () => showStep(1));
  $('back-3').addEventListener('click', () => showStep(2));

  /* -- Restart -- */
  $('restartBtn').addEventListener('click', () => {
    state.scenario = null;
    state.power    = null;
    state.distance = null;
    document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    showStep(1);
  });

  /* -- Calculate & Show Result -- */
  function showResult() {
    const sc  = PRICING.scenario[state.scenario];
    const pw  = PRICING.base[state.power];
    const di  = PRICING.distance[state.distance];

    if (!sc || !pw || !di) {
      console.warn('Valores em falta no estado do quiz');
      return;
    }

    const total = pw.price + sc.extra + di.extra;

    /* Summary tags */
    const summaryEl = $('resultSummary');
    summaryEl.innerHTML = [
      { icon: '🏠', text: sc.label },
      { icon: '🌡️', text: pw.label },
      { icon: '📏', text: di.label },
    ].map(t => `<span class="summary-tag">${t.icon} ${t.text}</span>`).join('');

    /* Price */
    $('resultPrice').textContent = '€ ' + total.toLocaleString('pt-PT');

    /* WhatsApp message */
    const msg = encodeURIComponent(
      `Olá ARTICOCLIMA! 👋\n\n` +
      `Fiz o orçamento no site e obtive esta estimativa:\n` +
      `📌 Situação: ${sc.label}\n` +
      `🌡️ Potência: ${pw.label}\n` +
      `📏 Distância: ${di.label}\n` +
      `💰 Estimativa: €${total.toLocaleString('pt-PT')}\n\n` +
      `Gostaria de agendar uma visita técnica gratuita. Podem confirmar disponibilidade?`
    );
    $('whatsappResultBtn').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;

    showStep(4);
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
