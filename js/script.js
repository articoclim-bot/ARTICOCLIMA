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

  /* Mobile: toggle submenu on parent click */
  document.querySelectorAll('.nav__link--parent').forEach(parent => {
    parent.addEventListener('click', e => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        parent.closest('.nav__item--has-sub').classList.toggle('open');
      }
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

/* Calculadora de orçamento removida — substituída pelo Simulador de Instalação (simulador.html) */

/* =============================================
   SMOOTH SCROLL para links âncora
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 100; // altura do header
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
