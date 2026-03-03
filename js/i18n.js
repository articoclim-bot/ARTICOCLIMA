/* =====================================================
   ARTICOCLIMA — Tradutor PT ↔ EN
   Estratégia: substituição de text-nodes via dicionário
   ===================================================== */
'use strict';

const TRANSLATIONS_EN = {
  // ── NAV ──
  'Início': 'Home',
  'Serviços': 'Services',
  'Marcas': 'Brands',
  'Catálogos': 'Catalogues',
  'Catálogo AC': 'AC Catalogue',
  'Solar AQS': 'Solar AQS',
  'Simulador': 'Simulator',
  'Sobre Nós': 'About Us',
  'Contacto': 'Contact',
  'Contactar': 'Contact Us',
  '← Voltar ao Site': '← Back to Site',
  '← Voltar ao início': '← Back to Home',

  // ── HERO ──
  '✦ Venda · Instalação · Assistência Técnica': '✦ Sales · Installation · Technical Support',
  'Climatização que': 'Air Conditioning that',
  'Faz a Diferença': 'Makes the Difference',
  '🔍 Simular Instalação →': '🔍 Simulate Installation →',
  '📞 Ligar Agora': '📞 Call Now',
  'Clientes': 'Clients',
  'Anos de Experiência': 'Years of Experience',
  'Satisfação': 'Satisfaction',

  // ── SERVICES ──
  'O que fazemos': 'What We Do',
  'Os Nossos Serviços': 'Our Services',
  'Soluções completas de climatização e energia solar para habitações e empresas.': 'Complete air conditioning and solar energy solutions for homes and businesses.',
  'Instalação de Ar Condicionado': 'Air Conditioning Installation',
  'Instalação profissional de raiz ou em substituição de equipamento existente. Trabalhamos com Daikin, Bosch e Daitsu, aproveitando a infraestrutura sempre que possível.': 'Professional installation from scratch or replacing existing equipment. We work with Daikin, Bosch and Daitsu, making use of existing infrastructure whenever possible.',
  'Substituição de Equipamento': 'Equipment Replacement',
  'Removemos o equipamento antigo e instalamos um novo modelo mais eficiente. Assessoria personalizada para escolher a melhor solução para o seu espaço.': 'We remove the old equipment and install a new, more efficient model. Personalised advice to choose the best solution for your space.',
  'Assistência Técnica': 'Technical Support',
  'Manutenção preventiva e corretiva para garantir a máxima eficiência e longevidade do seu equipamento de ar condicionado ou sistema solar.': 'Preventive and corrective maintenance to ensure maximum efficiency and longevity of your air conditioning or solar system.',
  'Painéis Solares AQS': 'Solar Water Heating',
  'Instalação e manutenção de painéis solares para Águas Quentes Sanitárias. Representamos Bosch para soluções de energia solar eficientes e duradouras.': 'Installation and maintenance of solar panels for domestic hot water. We represent Bosch for efficient and long-lasting solar energy solutions.',
  'Pedir orçamento →': 'Request quote →',
  'Agendar →': 'Schedule →',
  'Saber mais →': 'Learn more →',

  // ── BRANDS ──
  'Parceiros Oficiais': 'Official Partners',
  'Marcas que Representamos': 'Brands We Represent',
  'Revendedores autorizados das melhores marcas do mercado em climatização e energia solar.': 'Authorised dealers of the best brands in air conditioning and solar energy.',
  'Ar Condicionado': 'Air Conditioning',
  'Painéis Solares AQS': 'Solar Water Heating',

  // ── CATALOGUES CTA ──
  'Os Nossos Produtos': 'Our Products',
  'Consulte os nossos catálogos de equipamentos e encontre a solução ideal para a sua casa ou empresa.': 'Browse our equipment catalogues and find the ideal solution for your home or business.',
  'Ar condicionado Daikin, Bosch e Daitsu — 49 modelos disponíveis com especificações e preços.': 'Daikin, Bosch and Daitsu air conditioning — 49 models available with specifications and prices.',
  'Ver Catálogo →': 'View Catalogue →',
  'Catálogo Solar AQS': 'Solar AQS Catalogue',
  'Painéis solares e bombas de calor Bosch para águas quentes sanitárias.': 'Bosch solar panels and heat pumps for domestic hot water.',
  'Simulador de Instalação': 'Installation Simulator',
  'Descubra a potência certa para cada divisão e compare soluções mono e multisplit com preços indicativos.': 'Find the right capacity for each room and compare mono and multi-split solutions with indicative prices.',
  'Iniciar Simulação →': 'Start Simulation →',

  // ── WHY US ──
  'Porquê nós': 'Why Us',
  'A Nossa Diferença': 'Our Difference',
  'Resposta Rápida': 'Fast Response',
  'Orçamento e agendamento no próprio dia. Sem esperas desnecessárias.': 'Quote and scheduling on the same day. No unnecessary waiting.',
  'Marcas de Referência': 'Leading Brands',
  'Revendedores autorizados Daikin, Bosch e Daitsu em climatização, e Bosch em painéis solares AQS.': 'Authorised dealers of Daikin, Bosch and Daitsu in air conditioning, and Bosch for solar water heating.',
  'Instalação Garantida': 'Guaranteed Installation',
  'Garantia na instalação com técnicos especializados e materiais de qualidade.': 'Installation warranty with specialised technicians and quality materials.',
  'Empresa Certificada': 'Certified Company',
  'Empresa registada e técnicos certificados para total segurança e conformidade.': 'Registered company and certified technicians for full safety and compliance.',

  // ── ABOUT ──
  'Onde o Conforto': 'Where Comfort',
  'Ganha Vida': 'Comes Alive',
  'Certificação EIC': 'EIC Certification',
  'Certif. nº GF-0879': 'Certif. No. GF-0879',
  'O que nos torna especiais': 'What makes us special',
  'Soluções personalizadas para cada cliente': 'Personalised solutions for each client',
  'Equipamentos de última geração e eficiência energética': 'State-of-the-art equipment and energy efficiency',
  'Atendimento rápido, transparente e profissional': 'Fast, transparent and professional service',
  'Técnicos certificados e apaixonados pelo que fazem': 'Certified technicians who love what they do',
  'Garantia de conforto em todas as estações do ano': 'Comfort guarantee in all seasons',
  'Fale Connosco →': 'Talk to Us →',

  // ── CONTACT ──
  'Fale Connosco': 'Contact Us',
  'Estamos disponíveis para responder a todas as suas dúvidas.': 'We are available to answer all your questions.',
  'Telefone': 'Phone',
  'Envie-nos uma mensagem diretamente': 'Send us a message directly',
  'Iniciar Conversa': 'Start Chat',
  'Email': 'Email',
  'Horário': 'Hours',
  'Segunda a Sexta:': 'Monday to Friday:',

  // ── FOOTER ──
  'Todos os direitos reservados': 'All rights reserved',
  'Política de Privacidade': 'Privacy Policy',
  'Política de Cookies': 'Cookie Policy',
  'Legislação F-Gas': 'F-Gas Legislation',
  'Livro de Reclamações': 'Complaints Book',
  'Certif. EIC nº GF-0879': 'EIC Certif. No. GF-0879',

  // ── SIMULATOR ──
  'Ferramenta Online': 'Online Tool',
  'Simulador de Instalação': 'Installation Simulator',
  'Diga-nos como são as suas divisões e calculamos a potência certa. Compare soluções mono e multisplit das marcas que representamos.': 'Tell us about your rooms and we\'ll calculate the right capacity. Compare mono and multi-split solutions from the brands we represent.',
  'Divisões': 'Rooms',
  'Detalhes': 'Details',
  'Sugestão': 'Suggestion',
  'Quantas divisões pretende climatizar?': 'How many rooms do you want to cool/heat?',
  'Selecione o número de divisões da sua habitação onde quer instalar ar condicionado.': 'Select the number of rooms in your home where you want to install air conditioning.',
  'Clique no número para avançar automaticamente.': 'Click the number to advance automatically.',
  'Marca preferida': 'Preferred brand',
  '(pode mudar na sugestão final)': '(can change in the final suggestion)',
  'Detalhe cada divisão': 'Detail each room',
  'Preencha as dimensões e as condições de cada divisão para calcularmos a potência necessária.': 'Fill in the dimensions and conditions of each room so we can calculate the required capacity.',
  '← Voltar': '← Back',
  'Ver Sugestão →': 'See Suggestion →',
  '← Rever detalhes': '← Review details',
  '📄 Guardar PDF': '📄 Save PDF',
};

// ─── Armazenar textos originais (PT) para poder voltar atrás ───
const originalTexts = new Map(); // node → original text

function walkAndReplace(node, dict, storeOriginal) {
  if (node.nodeType === Node.TEXT_NODE) {
    const trimmed = node.textContent.trim();
    if (trimmed && dict[trimmed] !== undefined) {
      if (storeOriginal) originalTexts.set(node, node.textContent);
      node.textContent = node.textContent.replace(trimmed, dict[trimmed]);
    }
    return;
  }
  if (!node.childNodes) return;
  // Não traduzir conteúdo de scripts/styles ou elements escondidos
  if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE' ||
      node.tagName === 'CODE' || node.tagName === 'PRE') return;
  for (const child of node.childNodes) {
    walkAndReplace(child, dict, storeOriginal);
  }
}

function restoreOriginal() {
  for (const [node, text] of originalTexts) {
    node.textContent = text;
  }
  originalTexts.clear();
}

// ─── Estado e aplicação ───
let currentLang = localStorage.getItem('artico-lang') || 'pt';

function applyLang(lang, isInitialLoad = false) {
  currentLang = lang;
  localStorage.setItem('artico-lang', lang);

  const btn = document.getElementById('langToggle');

  if (lang === 'en') {
    if (!isInitialLoad) restoreOriginal(); // limpar estado anterior se necessário
    walkAndReplace(document.body, TRANSLATIONS_EN, true);
    if (btn) { btn.textContent = 'PT'; btn.title = 'Switch to Portuguese'; }
    document.documentElement.lang = 'en';
  } else {
    restoreOriginal();
    if (btn) { btn.textContent = 'EN'; btn.title = 'Switch to English'; }
    document.documentElement.lang = 'pt';
  }
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      applyLang(currentLang === 'pt' ? 'en' : 'pt');
    });
  }

  // Aplicar idioma guardado (sem re-guardar)
  if (currentLang === 'en') {
    applyLang('en', true);
  } else if (btn) {
    btn.textContent = 'EN';
    btn.title = 'Switch to English';
  }
});
