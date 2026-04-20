/* =====================================================
   ARTICOCLIMA — Tradutor PT ↔ EN / FR / ES / DE
   Estratégia: substituição de text-nodes via dicionário
   ===================================================== */
'use strict';

const TRANSLATIONS = {
  en: {
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
    'Simulador AC': 'AC Simulator',

    // ── HERO ──
    '✦ Venda · Instalação · Assistência Técnica': '✦ Sales · Installation · Technical Support',
    'Climatização que': 'Air Conditioning that',
    'Faz a Diferença': 'Makes the Difference',
    '🔍 Simular Instalação →': '🔍 Simulate Installation →',
    '📞 Ligar Agora': '📞 Call Now',
    'Clientes': 'Clients',
    'Anos de Experiência': 'Years of Experience',
    'Satisfação': 'Satisfaction',
    'O conforto térmico da': 'The thermal comfort of',
    'sua casa': 'your home',
    'em boas mãos.': 'in good hands.',
    'Venda, instalação e assistência especializada': 'Professional sales, installation and support',
    'em climatização em Tavira e em todo o Algarve.': 'in air conditioning in Tavira and throughout the Algarve.',

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
    'Higienização de Ar Condicionado': 'Air Conditioning Hygiene Service',
    'Limpeza profunda da unidade interior ou manutenção completa (interior + exterior). Ar mais limpo, maior eficiência e relatório incluído — válido para dossier HACCP.': 'Deep cleaning of the indoor unit or full maintenance (indoor + outdoor). Cleaner air, greater efficiency and report included — valid for HACCP dossier.',
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
    'Na Ártico Climatização, não vendemos apenas soluções térmicas — entregamos experiências de conforto absoluto. Somos uma empresa recente, mas com uma alma profundamente experiente: a nossa equipa acumula mais de': 'At Ártico Climatização, we don\'t just sell thermal solutions — we deliver absolute comfort experiences. We are a young company, but with a deeply experienced soul: our team has accumulated more than',
    '20 anos de prática': '20 years of hands-on experience',
    'no setor da climatização, com técnicos altamente qualificados e certificados.': 'in the air conditioning sector, with highly qualified and certified technicians.',
    'Começámos com o propósito de fazer melhor — mais próximos, mais honestos e mais eficientes. Cada projeto é tratado com rigor, dedicação e um compromisso inabalável com a excelência.': 'We started with the purpose of doing better — closer, more honest and more efficient. Every project is handled with rigour, dedication and an unwavering commitment to excellence.',
    '"A nossa missão? Ir ao encontro das necessidades de cada cliente com o máximo brio, profissionalismo e atenção ao detalhe."': '"Our mission? To meet the needs of each client with the utmost pride, professionalism and attention to detail."',

    // ── CHOOSE ──
    'Qual é a certa para si?': 'Which one is right for you?',
    'Ajude-me a Escolher': 'Help Me Choose',
    'Cada marca tem o seu perfil. Descubra qual se adapta melhor ao seu projeto e ao seu orçamento.': 'Each brand has its profile. Find out which best suits your project and budget.',
    'Eficiência e Silêncio': 'Efficiency and Silence',
    'A Daikin é líder mundial em climatização, reconhecida pela elevada eficiência energética, funcionamento silencioso e fiabilidade a longo prazo. Para quem quer o melhor, sem compromissos.': 'Daikin is the world leader in air conditioning, recognised for high energy efficiency, quiet operation and long-term reliability. For those who want the best, without compromise.',
    '✓ Eficiência A+++ em arrefecimento e aquecimento': '✓ A+++ efficiency in cooling and heating',
    '✓ WiFi integrado (Perfera, Stylish, Emura)': '✓ Built-in WiFi (Perfera, Stylish, Emura)',
    '✓ Gama mais completa: 7 a 28.000 BTU': '✓ Most complete range: 7 to 28,000 BTU',
    '✓ Design premiado — Stylish e Emura': '✓ Award-winning design — Stylish and Emura',
    'Ideal para: lar familiar, escritórios, quem valoriza qualidade e design a longo prazo': 'Ideal for: family homes, offices, those who value long-term quality and design',
    'Robustez e Tecnologia': 'Robustness and Technology',
    'A Bosch alia a robustez alemã à tecnologia de ponta, com auto-limpeza iClean, tratamento anticorrosivo Golden Fin e integração com Alexa, Google e Siri (via acessório WiFi). Durabilidade comprovada em condições exigentes.': 'Bosch combines German robustness with cutting-edge technology, featuring iClean auto-cleaning, Golden Fin anti-corrosion treatment and Alexa, Google and Siri integration (via WiFi accessory). Proven durability in demanding conditions.',
    '✓ Alexa, Google e Siri (via acessório WiFi)': '✓ Alexa, Google and Siri (via WiFi accessory)',
    '✓ Auto-limpeza iClean + Super Ionizador': '✓ iClean auto-cleaning + Super Ioniser',
    '✓ Golden Fin anticorrosivo (resistente ao sal e humidade)': '✓ Golden Fin anti-corrosion (resistant to salt and humidity)',
    '✓ Ionizador, sensor de movimento e Swing 3D (Climate 6000i)': '✓ Ioniser, motion sensor and 3D Swing (Climate 6000i)',
    '✓ Marca alemã de confiança': '✓ Trusted German brand',
    'Ideal para: habitações modernas, utilizadores de assistentes de voz e domótica': 'Ideal for: modern homes, users of voice assistants and home automation',
    'Relação Qualidade-Preço': 'Quality-Price Ratio',
    'A Daitsu oferece equipamentos de alto desempenho a preços acessíveis, com WiFi incluído de série, I Feel, Gentle Air e filtros de qualidade do ar em 5 camadas. Tecnologia premium sem pagar mais.': 'Daitsu offers high-performance equipment at affordable prices, with built-in WiFi, I Feel, Gentle Air and 5-layer air quality filters. Premium technology without paying more.',
    '✓ WiFi incluído de série': '✓ Built-in WiFi as standard',
    '✓ I Feel — sensor de temperatura no comando': '✓ I Feel — temperature sensor in the remote',
    '✓ Gentle Air — distribuição suave do ar': '✓ Gentle Air — gentle air distribution',
    '✓ 5 filtros de qualidade do ar': '✓ 5 air quality filters',
    'Ideal para: quem quer tecnologia avançada com excelente relação custo-benefício': 'Ideal for: those who want advanced technology with an excellent cost-benefit ratio',
    'Ainda tem dúvidas? O nosso simulador calcula a potência certa e sugere o equipamento ideal para a sua casa.': 'Still have questions? Our simulator calculates the right capacity and suggests the ideal equipment for your home.',
    '🔍 Vamos Simular! →': '🔍 Let\'s Simulate! →',

    // ── REVIEWS ──
    'Clientes reais, palavras reais': 'Real clients, real words',
    'O Que Dizem de Nós': 'What They Say About Us',
    'Avaliações verificadas no Google Business Profile.': 'Verified reviews on Google Business Profile.',
    'Deixar Review →': 'Leave a Review →',
    'Ver Todas as Reviews no Google': 'View All Reviews on Google',

    // ── SOLAR BENEFITS ──
    '☀️ Energia Solar · Algarve': '☀️ Solar Energy · Algarve',
    '+300 dias de sol por ano.': '+300 days of sunshine per year.',
    'Aproveite-os.': 'Make the most of it.',
    'O Algarve é um dos locais mais privilegiados da Europa para energia solar. Cada sistema AQS que instalamos é um passo para uma casa mais autónoma e uma fatura mais leve.': 'The Algarve is one of Europe\'s most privileged locations for solar energy. Every AQS system we install is a step towards a more self-sufficient home and a lighter energy bill.',
    'Até 75% de poupança': 'Up to 75% savings',
    'Na fatura anual de água quente sanitária': 'On your annual domestic hot water bill',
    'Dedução IRS 30%': '30% Tax Deduction',
    'Até 700€ de dedução no IRS por agregado familiar': 'Up to €700 tax deduction per household',
    'Valorização do imóvel': 'Property Value Increase',
    'Sistemas certificados aumentam o valor da habitação em 5–8%': 'Certified systems increase property value by 5–8%',
    '25+ anos de vida útil': '25+ year lifespan',
    'Tecnologia durável com retorno do investimento garantido': 'Durable technology with guaranteed return on investment',
    '☀️ Ver Sistemas Solares →': '☀️ View Solar Systems →',
    '⚡ Ver Retorno Solar →': '⚡ View Solar Return →',

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
    '© 2025 ARTICOCLIMA · Todos os direitos reservados': '© 2025 ARTICOCLIMA · All rights reserved',
    'Perguntas Frequentes': 'Frequently Asked Questions',

    // ── FORM ──
    'Nome': 'Name',
    'Contacto (telemóvel ou e-mail)': 'Contact (mobile or e-mail)',
    'Marca do equipamento': 'Equipment brand',
    'Tipo de sistema': 'System type',
    'Descrição da anomalia / tipo de manutenção': 'Description of fault / maintenance type',
    'Selecione...': 'Select...',
    'Outra': 'Other',
    'Enviar Pedido →': 'Send Request →',
    '✅ Pedido enviado! Entraremos em contacto brevemente.': '✅ Request sent! We will be in touch shortly.',

    // ── SIMULATOR ──
    'Ferramenta Online': 'Online Tool',
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

    // ── SIMULATOR JS (dynamic) ──
    'Preencha os dados da divisão': 'Fill in the room details',
    'Nome da divisão': 'Room name',
    'Tipo de divisão': 'Room type',
    'Quarto': 'Bedroom',
    'Sala': 'Living room',
    'Cozinha': 'Kitchen',
    'Outro': 'Other',
    'Sala aberta para cozinha (+3.000 BTU)': 'Open plan to kitchen (+3,000 BTU)',
    'Área (m²)': 'Area (m²)',
    'Altura (m)': 'Height (m)',
    'Janelas': 'Windows',
    'Exposição solar': 'Sun exposure',
    'Sul': 'South',
    'Norte': 'North',
    'Este': 'East',
    'Oeste': 'West',
    'Remover': 'Remove',
    'Remover divisão': 'Remove room',
    'Modelo sugerido': 'Suggested model',
    'Preencha a área para ver o modelo sugerido': 'Fill in the area to see the suggested model',
    'Sistema Individual': 'Individual System',
    'Multisplit': 'Multisplit',
    'Multisplit Budget': 'Budget Multisplit',
    'Cor:': 'Colour:',
    'Branco': 'White',
    'Prateado': 'Silver',
    'Preto': 'Black',
    'Mudar modelo →': 'Change model →',
    'Escolha o modelo para ': 'Choose model for ',
    'Potência necessária: ': 'Required capacity: ',
    ' · Marca: ': ' · Brand: ',
    'Unidade interior · sistema total: ': 'Indoor unit · system total: ',
    'Série económica': 'Economy range',
    'Filtro PM2.5': 'PM2.5 filter',
    '★ Mais económico': '★ Best price',
    'vs. opção base': 'vs. base option',
    'Sistema individual': 'Individual system',
    'Unidade exterior partilhada': 'Shared outdoor unit',
    'zonas': 'zones',
    'para: ': 'for: ',
    'divisão': 'room',
    'divisões': 'rooms',
    'Monosplit': 'Monosplit',
    'Sistema multisplit': 'Multisplit system',
    'Multisplit Budget Sensira': 'Budget Multisplit Sensira',
    'A sua configuração ': 'Your ',
    ' configuração': ' configuration',
    'Total equipamentos': 'Equipment total',
    'IVA incluído · Exclui instalação, suportes e materiais': 'VAT included · Excl. installation, brackets and materials',
    ' também resolve esta necessidade': ' also covers this need',
    'desde ': 'from ',
    'Ver detalhes ▾': 'View details ▾',
    '· IVA inc. · Excl. instalação': '· VAT inc. · Excl. installation',
    'Exterior: ': 'Outdoor: ',
    'Exterior partilhado — ': 'Shared outdoor — ',
    'Multisplit mais económico': 'Most affordable multisplit',
    'Mesma unidade exterior partilhada — interiores mais económicos · ': 'Same shared outdoor unit — more affordable indoor units · ',
    'IVA incluído · Excl. instalação · Peça orçamento para confirmar compatibilidade': 'VAT included · Excl. installation · Request quote to confirm compatibility',
    'Alternativa Multisplit': 'Multisplit Alternative',
    'Mesmo com modelos diferentes, pode instalar uma unidade exterior partilhada · ': 'Even with different models, you can install a shared outdoor unit · ',
    'IVA incluído · Excl. instalação · Peça-nos orçamento para confirmar compatibilidade': 'VAT included · Excl. installation · Ask us for a quote to confirm compatibility',
    'Sensira Budget · CTXF interior + MXF exterior': 'Sensira Budget · CTXF indoor + MXF outdoor',
    'Padrão · FTXM interior + MXM exterior': 'Standard · FTXM indoor + MXM outdoor',
    'Alternativa Monosplit': 'Monosplit Alternative',
    'Uma unidade exterior por cada interior — total independência por divisão': 'One outdoor unit per indoor — full independence per room',
    'IVA incluído · Excl. instalação · Gama de entrada por divisão': 'VAT included · Excl. installation · Entry-level range per room',
    'Preencha os dados de pelo menos uma divisão antes de solicitar orçamento.': 'Fill in the details for at least one room before requesting a quote.',
    'Por favor indique o seu nome e contacto.': 'Please enter your name and contact details.',
  },

  fr: {
    // ── NAV ──
    'Início': 'Accueil',
    'Serviços': 'Services',
    'Marcas': 'Marques',
    'Catálogos': 'Catalogues',
    'Catálogo AC': 'Catalogue CA',
    'Solar AQS': 'Solaire ECS',
    'Simulador': 'Simulateur',
    'Sobre Nós': 'À Propos',
    'Contacto': 'Contact',
    'Contactar': 'Nous Contacter',
    '← Voltar ao Site': '← Retour au Site',
    '← Voltar ao início': '← Retour à l\'Accueil',
    'Simulador AC': 'Simulateur CA',

    // ── HERO ──
    '✦ Venda · Instalação · Assistência Técnica': '✦ Vente · Installation · Assistance Technique',
    'Climatização que': 'Climatisation qui',
    'Faz a Diferença': 'Fait la Différence',
    '🔍 Simular Instalação →': '🔍 Simuler l\'Installation →',
    '📞 Ligar Agora': '📞 Appeler Maintenant',
    'Clientes': 'Clients',
    'Anos de Experiência': 'Ans d\'Expérience',
    'Satisfação': 'Satisfaction',
    'O conforto térmico da': 'Le confort thermique de',
    'sua casa': 'votre maison',
    'em boas mãos.': 'entre de bonnes mains.',
    'Venda, instalação e assistência especializada': 'Vente, installation et assistance spécialisée',
    'em climatização em Tavira e em todo o Algarve.': 'en climatisation à Tavira et dans tout l\'Algarve.',

    // ── SERVICES ──
    'O que fazemos': 'Ce que nous faisons',
    'Os Nossos Serviços': 'Nos Services',
    'Soluções completas de climatização e energia solar para habitações e empresas.': 'Solutions complètes de climatisation et d\'énergie solaire pour particuliers et entreprises.',
    'Instalação de Ar Condicionado': 'Installation de Climatisation',
    'Instalação profissional de raiz ou em substituição de equipamento existente. Trabalhamos com Daikin, Bosch e Daitsu, aproveitando a infraestrutura sempre que possível.': 'Installation professionnelle de zéro ou en remplacement d\'équipement existant. Nous travaillons avec Daikin, Bosch et Daitsu, en utilisant l\'infrastructure existante autant que possible.',
    'Substituição de Equipamento': 'Remplacement d\'Équipement',
    'Removemos o equipamento antigo e instalamos um novo modelo mais eficiente. Assessoria personalizada para escolher a melhor solução para o seu espaço.': 'Nous retirons l\'ancien équipement et installons un nouveau modèle plus efficace. Conseils personnalisés pour choisir la meilleure solution pour votre espace.',
    'Assistência Técnica': 'Assistance Technique',
    'Manutenção preventiva e corretiva para garantir a máxima eficiência e longevidade do seu equipamento de ar condicionado ou sistema solar.': 'Maintenance préventive et corrective pour garantir l\'efficacité maximale et la longévité de votre climatiseur ou système solaire.',
    'Higienização de Ar Condicionado': 'Hygiène de Climatisation',
    'Limpeza profunda da unidade interior ou manutenção completa (interior + exterior). Ar mais limpo, maior eficiência e relatório incluído — válido para dossier HACCP.': 'Nettoyage en profondeur de l\'unité intérieure ou maintenance complète (intérieur + extérieur). Air plus sain, meilleure efficacité et rapport inclus — valable pour dossier HACCP.',
    'Painéis Solares AQS': 'Panneaux Solaires ECS',
    'Instalação e manutenção de painéis solares para Águas Quentes Sanitárias. Representamos Bosch para soluções de energia solar eficientes e duradouras.': 'Installation et maintenance de panneaux solaires pour l\'eau chaude sanitaire. Nous représentons Bosch pour des solutions d\'énergie solaire efficaces et durables.',
    'Pedir orçamento →': 'Demander un devis →',
    'Agendar →': 'Planifier →',
    'Saber mais →': 'En savoir plus →',

    // ── BRANDS ──
    'Parceiros Oficiais': 'Partenaires Officiels',
    'Marcas que Representamos': 'Marques que nous Représentons',
    'Revendedores autorizados das melhores marcas do mercado em climatização e energia solar.': 'Revendeurs agréés des meilleures marques du marché en climatisation et énergie solaire.',
    'Ar Condicionado': 'Climatisation',

    // ── CATALOGUES CTA ──
    'Os Nossos Produtos': 'Nos Produits',
    'Consulte os nossos catálogos de equipamentos e encontre a solução ideal para a sua casa ou empresa.': 'Consultez nos catalogues d\'équipements et trouvez la solution idéale pour votre maison ou entreprise.',
    'Ar condicionado Daikin, Bosch e Daitsu — 49 modelos disponíveis com especificações e preços.': 'Climatisation Daikin, Bosch et Daitsu — 49 modèles disponibles avec spécifications et prix.',
    'Ver Catálogo →': 'Voir le Catalogue →',
    'Catálogo Solar AQS': 'Catalogue Solaire ECS',
    'Painéis solares e bombas de calor Bosch para águas quentes sanitárias.': 'Panneaux solaires et pompes à chaleur Bosch pour l\'eau chaude sanitaire.',
    'Simulador de Instalação': 'Simulateur d\'Installation',
    'Descubra a potência certa para cada divisão e compare soluções mono e multisplit com preços indicativos.': 'Découvrez la puissance idéale pour chaque pièce et comparez les solutions mono et multi-split avec des prix indicatifs.',
    'Iniciar Simulação →': 'Démarrer la Simulation →',

    // ── WHY US ──
    'Porquê nós': 'Pourquoi Nous',
    'A Nossa Diferença': 'Notre Différence',
    'Resposta Rápida': 'Réponse Rapide',
    'Orçamento e agendamento no próprio dia. Sem esperas desnecessárias.': 'Devis et planification le jour même. Sans attentes inutiles.',
    'Marcas de Referência': 'Marques de Référence',
    'Revendedores autorizados Daikin, Bosch e Daitsu em climatização, e Bosch em painéis solares AQS.': 'Revendeurs agréés Daikin, Bosch et Daitsu en climatisation, et Bosch pour panneaux solaires ECS.',
    'Instalação Garantida': 'Installation Garantie',
    'Garantia na instalação com técnicos especializados e materiais de qualidade.': 'Garantie d\'installation avec des techniciens spécialisés et des matériaux de qualité.',
    'Empresa Certificada': 'Entreprise Certifiée',
    'Empresa registada e técnicos certificados para total segurança e conformidade.': 'Entreprise enregistrée et techniciens certifiés pour une sécurité et une conformité totales.',

    // ── ABOUT ──
    'Onde o Conforto': 'Où le Confort',
    'Ganha Vida': 'Prend Vie',
    'Certificação EIC': 'Certification EIC',
    'Certif. nº GF-0879': 'Certif. N° GF-0879',
    'O que nos torna especiais': 'Ce qui nous rend spéciaux',
    'Soluções personalizadas para cada cliente': 'Solutions personnalisées pour chaque client',
    'Equipamentos de última geração e eficiência energética': 'Équipements de dernière génération et efficacité énergétique',
    'Atendimento rápido, transparente e profissional': 'Service rapide, transparent et professionnel',
    'Técnicos certificados e apaixonados pelo que fazem': 'Techniciens certifiés et passionnés par leur travail',
    'Garantia de conforto em todas as estações do ano': 'Garantie de confort en toutes saisons',
    'Fale Connosco →': 'Nous Contacter →',
    'Na Ártico Climatização, não vendemos apenas soluções térmicas — entregamos experiências de conforto absoluto. Somos uma empresa recente, mas com uma alma profundamente experiente: a nossa equipa acumula mais de': 'À Ártico Climatização, nous ne vendons pas seulement des solutions thermiques — nous offrons des expériences de confort absolu. Nous sommes une entreprise récente, mais avec une âme profondément expérimentée : notre équipe cumule plus de',
    '20 anos de prática': '20 ans d\'expérience pratique',
    'no setor da climatização, com técnicos altamente qualificados e certificados.': 'dans le secteur de la climatisation, avec des techniciens hautement qualifiés et certifiés.',
    'Começámos com o propósito de fazer melhor — mais próximos, mais honestos e mais eficientes. Cada projeto é tratado com rigor, dedicação e um compromisso inabalável com a excelência.': 'Nous avons commencé avec l\'objectif de faire mieux — plus proches, plus honnêtes et plus efficaces. Chaque projet est traité avec rigueur, dévouement et un engagement indéfectible envers l\'excellence.',
    '"A nossa missão? Ir ao encontro das necessidades de cada cliente com o máximo brio, profissionalismo e atenção ao detalhe."': '"Notre mission ? Aller à la rencontre des besoins de chaque client avec le plus grand soin, professionnalisme et attention aux détails."',

    // ── CHOOSE ──
    'Qual é a certa para si?': 'Laquelle vous convient ?',
    'Ajude-me a Escolher': 'Aidez-moi à Choisir',
    'Cada marca tem o seu perfil. Descubra qual se adapta melhor ao seu projeto e ao seu orçamento.': 'Chaque marque a son profil. Découvrez laquelle convient le mieux à votre projet et à votre budget.',
    'Eficiência e Silêncio': 'Efficacité et Silence',
    'A Daikin é líder mundial em climatização, reconhecida pela elevada eficiência energética, funcionamento silencioso e fiabilidade a longo prazo. Para quem quer o melhor, sem compromissos.': 'Daikin est le leader mondial de la climatisation, reconnu pour sa haute efficacité énergétique, son fonctionnement silencieux et sa fiabilité à long terme. Pour ceux qui veulent le meilleur, sans compromis.',
    '✓ Eficiência A+++ em arrefecimento e aquecimento': '✓ Efficacité A+++ en refroidissement et chauffage',
    '✓ WiFi integrado (Perfera, Stylish, Emura)': '✓ WiFi intégré (Perfera, Stylish, Emura)',
    '✓ Gama mais completa: 7 a 28.000 BTU': '✓ Gamme la plus complète : 7 à 28 000 BTU',
    '✓ Design premiado — Stylish e Emura': '✓ Design primé — Stylish et Emura',
    'Ideal para: lar familiar, escritórios, quem valoriza qualidade e design a longo prazo': 'Idéal pour : maisons familiales, bureaux, ceux qui valorisent la qualité et le design à long terme',
    'Robustez e Tecnologia': 'Robustesse et Technologie',
    'A Bosch alia a robustez alemã à tecnologia de ponta, com auto-limpeza iClean, tratamento anticorrosivo Golden Fin e integração com Alexa, Google e Siri (via acessório WiFi). Durabilidade comprovada em condições exigentes.': 'Bosch allie la robustesse allemande à la technologie de pointe, avec l\'auto-nettoyage iClean, le traitement anticorrosion Golden Fin et l\'intégration Alexa, Google et Siri (via accessoire WiFi). Durabilité prouvée dans des conditions exigeantes.',
    '✓ Alexa, Google e Siri (via acessório WiFi)': '✓ Alexa, Google et Siri (via accessoire WiFi)',
    '✓ Auto-limpeza iClean + Super Ionizador': '✓ Auto-nettoyage iClean + Super Ioniseur',
    '✓ Golden Fin anticorrosivo (resistente ao sal e humidade)': '✓ Golden Fin anticorrosion (résistant au sel et à l\'humidité)',
    '✓ Ionizador, sensor de movimento e Swing 3D (Climate 6000i)': '✓ Ioniseur, détecteur de mouvement et Swing 3D (Climate 6000i)',
    '✓ Marca alemã de confiança': '✓ Marque allemande de confiance',
    'Ideal para: habitações modernas, utilizadores de assistentes de voz e domótica': 'Idéal pour : logements modernes, utilisateurs d\'assistants vocaux et domotique',
    'Relação Qualidade-Preço': 'Rapport Qualité-Prix',
    'A Daitsu oferece equipamentos de alto desempenho a preços acessíveis, com WiFi incluído de série, I Feel, Gentle Air e filtros de qualidade do ar em 5 camadas. Tecnologia premium sem pagar mais.': 'Daitsu offre des équipements haute performance à des prix abordables, avec WiFi intégré de série, I Feel, Gentle Air et filtres de qualité d\'air en 5 couches. Technologie premium sans payer plus.',
    '✓ WiFi incluído de série': '✓ WiFi inclus de série',
    '✓ I Feel — sensor de temperatura no comando': '✓ I Feel — capteur de température dans la télécommande',
    '✓ Gentle Air — distribuição suave do ar': '✓ Gentle Air — distribution douce de l\'air',
    '✓ 5 filtros de qualidade do ar': '✓ 5 filtres de qualité d\'air',
    'Ideal para: quem quer tecnologia avançada com excelente relação custo-benefício': 'Idéal pour : ceux qui veulent une technologie avancée avec un excellent rapport coût-bénéfice',
    'Ainda tem dúvidas? O nosso simulador calcula a potência certa e sugere o equipamento ideal para a sua casa.': 'Vous avez encore des doutes ? Notre simulateur calcule la puissance correcte et suggère l\'équipement idéal pour votre maison.',
    '🔍 Vamos Simular! →': '🔍 Simulons ! →',

    // ── REVIEWS ──
    'Clientes reais, palavras reais': 'Vrais clients, vrais mots',
    'O Que Dizem de Nós': 'Ce qu\'ils Disent de Nous',
    'Avaliações verificadas no Google Business Profile.': 'Avis vérifiés sur Google Business Profile.',
    'Deixar Review →': 'Laisser un Avis →',
    'Ver Todas as Reviews no Google': 'Voir Tous les Avis sur Google',

    // ── SOLAR BENEFITS ──
    '☀️ Energia Solar · Algarve': '☀️ Énergie Solaire · Algarve',
    '+300 dias de sol por ano.': '+300 jours de soleil par an.',
    'Aproveite-os.': 'Profitez-en.',
    'O Algarve é um dos locais mais privilegiados da Europa para energia solar. Cada sistema AQS que instalamos é um passo para uma casa mais autónoma e uma fatura mais leve.': 'L\'Algarve est l\'un des endroits les plus privilégiés d\'Europe pour l\'énergie solaire. Chaque système ECS que nous installons est un pas vers une maison plus autonome et une facture allégée.',
    'Até 75% de poupança': 'Jusqu\'à 75 % d\'économies',
    'Na fatura anual de água quente sanitária': 'Sur la facture annuelle d\'eau chaude sanitaire',
    'Dedução IRS 30%': 'Déduction fiscale 30 %',
    'Até 700€ de dedução no IRS por agregado familiar': 'Jusqu\'à 700 € de déduction fiscale par foyer',
    'Valorização do imóvel': 'Valorisation du bien',
    'Sistemas certificados aumentam o valor da habitação em 5–8%': 'Les systèmes certifiés augmentent la valeur du bien de 5 à 8 %',
    '25+ anos de vida útil': 'Durée de vie 25+ ans',
    'Tecnologia durável com retorno do investimento garantido': 'Technologie durable avec retour sur investissement garanti',
    '☀️ Ver Sistemas Solares →': '☀️ Voir les Systèmes Solaires →',
    '⚡ Ver Retorno Solar →': '⚡ Voir le Retour Solaire →',

    // ── CONTACT ──
    'Fale Connosco': 'Nous Contacter',
    'Estamos disponíveis para responder a todas as suas dúvidas.': 'Nous sommes disponibles pour répondre à toutes vos questions.',
    'Telefone': 'Téléphone',
    'Envie-nos uma mensagem diretamente': 'Envoyez-nous un message directement',
    'Iniciar Conversa': 'Démarrer la Conversation',
    'Email': 'E-mail',
    'Horário': 'Horaires',
    'Segunda a Sexta:': 'Lundi au Vendredi :',

    // ── FOOTER ──
    'Todos os direitos reservados': 'Tous droits réservés',
    'Política de Privacidade': 'Politique de Confidentialité',
    'Política de Cookies': 'Politique de Cookies',
    'Legislação F-Gas': 'Législation F-Gaz',
    'Livro de Reclamações': 'Livre de Réclamations',
    'Certif. EIC nº GF-0879': 'Certif. EIC N° GF-0879',
    '© 2025 ARTICOCLIMA · Todos os direitos reservados': '© 2025 ARTICOCLIMA · Tous droits réservés',
    'Perguntas Frequentes': 'Questions Fréquentes',

    // ── FORM ──
    'Nome': 'Nom',
    'Contacto (telemóvel ou e-mail)': 'Contact (portable ou e-mail)',
    'Marca do equipamento': 'Marque de l\'équipement',
    'Tipo de sistema': 'Type de système',
    'Descrição da anomalia / tipo de manutenção': 'Description de l\'anomalie / type de maintenance',
    'Selecione...': 'Sélectionner...',
    'Outra': 'Autre',
    'Enviar Pedido →': 'Envoyer la Demande →',
    '✅ Pedido enviado! Entraremos em contacto brevemente.': '✅ Demande envoyée ! Nous vous contacterons bientôt.',

    // ── SIMULATOR ──
    'Ferramenta Online': 'Outil en Ligne',
    'Diga-nos como são as suas divisões e calculamos a potência certa. Compare soluções mono e multisplit das marcas que representamos.': 'Dites-nous comment sont vos pièces et nous calculerons la puissance adéquate. Comparez les solutions mono et multisplit des marques que nous représentons.',
    'Divisões': 'Pièces',
    'Detalhes': 'Détails',
    'Sugestão': 'Suggestion',
    'Quantas divisões pretende climatizar?': 'Combien de pièces souhaitez-vous climatiser ?',
    'Selecione o número de divisões da sua habitação onde quer instalar ar condicionado.': 'Sélectionnez le nombre de pièces de votre logement où vous souhaitez installer la climatisation.',
    'Clique no número para avançar automaticamente.': 'Cliquez sur le numéro pour avancer automatiquement.',
    'Marca preferida': 'Marque préférée',
    '(pode mudar na sugestão final)': '(peut être changé dans la suggestion finale)',
    'Detalhe cada divisão': 'Détaillez chaque pièce',
    'Preencha as dimensões e as condições de cada divisão para calcularmos a potência necessária.': 'Remplissez les dimensions et les conditions de chaque pièce pour que nous calculions la puissance nécessaire.',
    '← Voltar': '← Retour',
    'Ver Sugestão →': 'Voir la Suggestion →',
    '← Rever detalhes': '← Revoir les détails',
    '📄 Guardar PDF': '📄 Enregistrer PDF',

    // ── SIMULATOR JS (dynamic) ──
    'Preencha os dados da divisão': 'Remplissez les données de la pièce',
    'Nome da divisão': 'Nom de la pièce',
    'Tipo de divisão': 'Type de pièce',
    'Quarto': 'Chambre',
    'Sala': 'Salon',
    'Cozinha': 'Cuisine',
    'Outro': 'Autre',
    'Sala aberta para cozinha (+3.000 BTU)': 'Ouvert sur cuisine (+3 000 BTU)',
    'Área (m²)': 'Surface (m²)',
    'Altura (m)': 'Hauteur (m)',
    'Janelas': 'Fenêtres',
    'Exposição solar': 'Exposition solaire',
    'Sul': 'Sud',
    'Norte': 'Nord',
    'Este': 'Est',
    'Oeste': 'Ouest',
    'Remover': 'Supprimer',
    'Remover divisão': 'Supprimer la pièce',
    'Modelo sugerido': 'Modèle suggéré',
    'Preencha a área para ver o modelo sugerido': 'Remplissez la surface pour voir le modèle suggéré',
    'Sistema Individual': 'Système Individuel',
    'Multisplit': 'Multisplit',
    'Multisplit Budget': 'Multisplit Budget',
    'Cor:': 'Couleur :',
    'Branco': 'Blanc',
    'Prateado': 'Argenté',
    'Preto': 'Noir',
    'Mudar modelo →': 'Changer de modèle →',
    'Escolha o modelo para ': 'Choisissez le modèle pour ',
    'Potência necessária: ': 'Puissance requise : ',
    ' · Marca: ': ' · Marque : ',
    'Unidade interior · sistema total: ': 'Unité intérieure · total système : ',
    'Série económica': 'Gamme économique',
    'Filtro PM2.5': 'Filtre PM2.5',
    '★ Mais económico': '★ Meilleur prix',
    'vs. opção base': 'vs. option de base',
    'Sistema individual': 'Système individuel',
    'Unidade exterior partilhada': 'Unité extérieure partagée',
    'zonas': 'zones',
    'para: ': 'pour : ',
    'divisão': 'pièce',
    'divisões': 'pièces',
    'Monosplit': 'Monosplit',
    'Sistema multisplit': 'Système multisplit',
    'Multisplit Budget Sensira': 'Multisplit Budget Sensira',
    'A sua configuração ': 'Votre configuration ',
    ' configuração': '',
    'Total equipamentos': 'Total équipements',
    'IVA incluído · Exclui instalação, suportes e materiais': 'TVA incluse · Hors installation, supports et matériaux',
    ' também resolve esta necessidade': ' couvre également ce besoin',
    'desde ': 'à partir de ',
    'Ver detalhes ▾': 'Voir les détails ▾',
    '· IVA inc. · Excl. instalação': '· TVA inc. · Hors installation',
    'Exterior: ': 'Unité extérieure : ',
    'Exterior partilhado — ': 'Extérieur partagé — ',
    'Multisplit mais económico': 'Multisplit le plus économique',
    'Mesma unidade exterior partilhada — interiores mais económicos · ': 'Même unité extérieure partagée — unités intérieures plus économiques · ',
    'IVA incluído · Excl. instalação · Peça orçamento para confirmar compatibilidade': 'TVA incluse · Hors installation · Demandez un devis pour confirmer la compatibilité',
    'Alternativa Multisplit': 'Alternative Multisplit',
    'Mesmo com modelos diferentes, pode instalar uma unidade exterior partilhada · ': 'Même avec des modèles différents, vous pouvez installer une unité extérieure partagée · ',
    'IVA incluído · Excl. instalação · Peça-nos orçamento para confirmar compatibilidade': 'TVA incluse · Hors installation · Demandez-nous un devis pour confirmer la compatibilité',
    'Sensira Budget · CTXF interior + MXF exterior': 'Sensira Budget · CTXF intérieur + MXF extérieur',
    'Padrão · FTXM interior + MXM exterior': 'Standard · FTXM intérieur + MXM extérieur',
    'Alternativa Monosplit': 'Alternative Monosplit',
    'Uma unidade exterior por cada interior — total independência por divisão': 'Une unité extérieure par unité intérieure — indépendance totale par pièce',
    'IVA incluído · Excl. instalação · Gama de entrada por divisão': 'TVA incluse · Hors installation · Gamme d\'entrée par pièce',
    'Preencha os dados de pelo menos uma divisão antes de solicitar orçamento.': 'Remplissez les données d\'au moins une pièce avant de demander un devis.',
    'Por favor indique o seu nome e contacto.': 'Veuillez indiquer votre nom et votre contact.',
  },

  es: {
    // ── NAV ──
    'Início': 'Inicio',
    'Serviços': 'Servicios',
    'Marcas': 'Marcas',
    'Catálogos': 'Catálogos',
    'Catálogo AC': 'Catálogo AC',
    'Solar AQS': 'Solar ACS',
    'Simulador': 'Simulador',
    'Sobre Nós': 'Sobre Nosotros',
    'Contacto': 'Contacto',
    'Contactar': 'Contactarnos',
    '← Voltar ao Site': '← Volver al Sitio',
    '← Voltar ao início': '← Volver al Inicio',
    'Simulador AC': 'Simulador AC',

    // ── HERO ──
    '✦ Venda · Instalação · Assistência Técnica': '✦ Venta · Instalación · Asistencia Técnica',
    'Climatização que': 'Climatización que',
    'Faz a Diferença': 'Marca la Diferencia',
    '🔍 Simular Instalação →': '🔍 Simular Instalación →',
    '📞 Ligar Agora': '📞 Llamar Ahora',
    'Clientes': 'Clientes',
    'Anos de Experiência': 'Años de Experiencia',
    'Satisfação': 'Satisfacción',
    'O conforto térmico da': 'El confort térmico de',
    'sua casa': 'su casa',
    'em boas mãos.': 'en buenas manos.',
    'Venda, instalação e assistência especializada': 'Venta, instalación y asistencia especializada',
    'em climatização em Tavira e em todo o Algarve.': 'en climatización en Tavira y en todo el Algarve.',

    // ── SERVICES ──
    'O que fazemos': 'Lo que hacemos',
    'Os Nossos Serviços': 'Nuestros Servicios',
    'Soluções completas de climatização e energia solar para habitações e empresas.': 'Soluciones completas de climatización y energía solar para hogares y empresas.',
    'Instalação de Ar Condicionado': 'Instalación de Aire Acondicionado',
    'Instalação profissional de raiz ou em substituição de equipamento existente. Trabalhamos com Daikin, Bosch e Daitsu, aproveitando a infraestrutura sempre que possível.': 'Instalación profesional desde cero o en sustitución de equipos existentes. Trabajamos con Daikin, Bosch y Daitsu, aprovechando la infraestructura siempre que sea posible.',
    'Substituição de Equipamento': 'Sustitución de Equipos',
    'Removemos o equipamento antigo e instalamos um novo modelo mais eficiente. Assessoria personalizada para escolher a melhor solução para o seu espaço.': 'Retiramos el equipo antiguo e instalamos un nuevo modelo más eficiente. Asesoramiento personalizado para elegir la mejor solución para su espacio.',
    'Assistência Técnica': 'Asistencia Técnica',
    'Manutenção preventiva e corretiva para garantir a máxima eficiência e longevidade do seu equipamento de ar condicionado ou sistema solar.': 'Mantenimiento preventivo y correctivo para garantizar la máxima eficiencia y longevidad de su equipo de aire acondicionado o sistema solar.',
    'Higienização de Ar Condicionado': 'Higienización de Aire Acondicionado',
    'Limpeza profunda da unidade interior ou manutenção completa (interior + exterior). Ar mais limpo, maior eficiência e relatório incluído — válido para dossier HACCP.': 'Limpieza profunda de la unidad interior o mantenimiento completo (interior + exterior). Aire más limpio, mayor eficiencia e informe incluido — válido para expediente HACCP.',
    'Painéis Solares AQS': 'Paneles Solares ACS',
    'Instalação e manutenção de painéis solares para Águas Quentes Sanitárias. Representamos Bosch para soluções de energia solar eficientes e duradouras.': 'Instalación y mantenimiento de paneles solares para Agua Caliente Sanitaria. Representamos a Bosch para soluciones de energía solar eficientes y duraderas.',
    'Pedir orçamento →': 'Solicitar presupuesto →',
    'Agendar →': 'Agendar →',
    'Saber mais →': 'Saber más →',

    // ── BRANDS ──
    'Parceiros Oficiais': 'Socios Oficiales',
    'Marcas que Representamos': 'Marcas que Representamos',
    'Revendedores autorizados das melhores marcas do mercado em climatização e energia solar.': 'Revendedores autorizados de las mejores marcas del mercado en climatización y energía solar.',
    'Ar Condicionado': 'Aire Acondicionado',

    // ── CATALOGUES CTA ──
    'Os Nossos Produtos': 'Nuestros Productos',
    'Consulte os nossos catálogos de equipamentos e encontre a solução ideal para a sua casa ou empresa.': 'Consulte nuestros catálogos de equipos y encuentre la solución ideal para su casa o empresa.',
    'Ar condicionado Daikin, Bosch e Daitsu — 49 modelos disponíveis com especificações e preços.': 'Aire acondicionado Daikin, Bosch y Daitsu — 49 modelos disponibles con especificaciones y precios.',
    'Ver Catálogo →': 'Ver Catálogo →',
    'Catálogo Solar AQS': 'Catálogo Solar ACS',
    'Painéis solares e bombas de calor Bosch para águas quentes sanitárias.': 'Paneles solares y bombas de calor Bosch para agua caliente sanitaria.',
    'Simulador de Instalação': 'Simulador de Instalación',
    'Descubra a potência certa para cada divisão e compare soluções mono e multisplit com preços indicativos.': 'Descubra la potencia adecuada para cada habitación y compare soluciones mono y multisplit con precios indicativos.',
    'Iniciar Simulação →': 'Iniciar Simulación →',

    // ── WHY US ──
    'Porquê nós': 'Por qué Nosotros',
    'A Nossa Diferença': 'Nuestra Diferencia',
    'Resposta Rápida': 'Respuesta Rápida',
    'Orçamento e agendamento no próprio dia. Sem esperas desnecessárias.': 'Presupuesto y programación el mismo día. Sin esperas innecesarias.',
    'Marcas de Referência': 'Marcas de Referencia',
    'Revendedores autorizados Daikin, Bosch e Daitsu em climatização, e Bosch em painéis solares AQS.': 'Revendedores autorizados de Daikin, Bosch y Daitsu en climatización, y Bosch en paneles solares ACS.',
    'Instalação Garantida': 'Instalación Garantizada',
    'Garantia na instalação com técnicos especializados e materiais de qualidade.': 'Garantía en la instalación con técnicos especializados y materiales de calidad.',
    'Empresa Certificada': 'Empresa Certificada',
    'Empresa registada e técnicos certificados para total segurança e conformidade.': 'Empresa registrada y técnicos certificados para total seguridad y cumplimiento.',

    // ── ABOUT ──
    'Onde o Conforto': 'Donde el Confort',
    'Ganha Vida': 'Cobra Vida',
    'Certificação EIC': 'Certificación EIC',
    'Certif. nº GF-0879': 'Certif. N.º GF-0879',
    'O que nos torna especiais': 'Lo que nos hace especiales',
    'Soluções personalizadas para cada cliente': 'Soluciones personalizadas para cada cliente',
    'Equipamentos de última geração e eficiência energética': 'Equipos de última generación y eficiencia energética',
    'Atendimento rápido, transparente e profissional': 'Atención rápida, transparente y profesional',
    'Técnicos certificados e apaixonados pelo que fazem': 'Técnicos certificados y apasionados por lo que hacen',
    'Garantia de conforto em todas as estações do ano': 'Garantía de confort en todas las estaciones del año',
    'Fale Connosco →': 'Hablemos →',
    'Na Ártico Climatização, não vendemos apenas soluções térmicas — entregamos experiências de conforto absoluto. Somos uma empresa recente, mas com uma alma profundamente experiente: a nossa equipa acumula mais de': 'En Ártico Climatização, no solo vendemos soluciones térmicas — entregamos experiencias de confort absoluto. Somos una empresa reciente, pero con un alma profundamente experimentada: nuestro equipo acumula más de',
    '20 anos de prática': '20 años de práctica',
    'no setor da climatização, com técnicos altamente qualificados e certificados.': 'en el sector de la climatización, con técnicos altamente cualificados y certificados.',
    'Começámos com o propósito de fazer melhor — mais próximos, mais honestos e mais eficientes. Cada projeto é tratado com rigor, dedicação e um compromisso inabalável com a excelência.': 'Comenzamos con el propósito de hacer mejor — más cercanos, más honestos y más eficientes. Cada proyecto se trata con rigor, dedicación y un compromiso inquebrantable con la excelencia.',
    '"A nossa missão? Ir ao encontro das necessidades de cada cliente com o máximo brio, profissionalismo e atenção ao detalhe."': '"¿Nuestra misión? Ir al encuentro de las necesidades de cada cliente con el máximo orgullo, profesionalismo y atención al detalle."',

    // ── CHOOSE ──
    'Qual é a certa para si?': '¿Cuál es la adecuada para usted?',
    'Ajude-me a Escolher': 'Ayúdame a Elegir',
    'Cada marca tem o seu perfil. Descubra qual se adapta melhor ao seu projeto e ao seu orçamento.': 'Cada marca tiene su perfil. Descubra cuál se adapta mejor a su proyecto y presupuesto.',
    'Eficiência e Silêncio': 'Eficiencia y Silencio',
    'A Daikin é líder mundial em climatização, reconhecida pela elevada eficiência energética, funcionamento silencioso e fiabilidade a longo prazo. Para quem quer o melhor, sem compromissos.': 'Daikin es el líder mundial en climatización, reconocida por su alta eficiencia energética, funcionamiento silencioso y fiabilidad a largo plazo. Para quienes quieren lo mejor, sin compromisos.',
    '✓ Eficiência A+++ em arrefecimento e aquecimento': '✓ Eficiencia A+++ en refrigeración y calefacción',
    '✓ WiFi integrado (Perfera, Stylish, Emura)': '✓ WiFi integrado (Perfera, Stylish, Emura)',
    '✓ Gama mais completa: 7 a 28.000 BTU': '✓ Gama más completa: 7 a 28.000 BTU',
    '✓ Design premiado — Stylish e Emura': '✓ Diseño premiado — Stylish y Emura',
    'Ideal para: lar familiar, escritórios, quem valoriza qualidade e design a longo prazo': 'Ideal para: hogares familiares, oficinas, quienes valoran la calidad y el diseño a largo plazo',
    'Robustez e Tecnologia': 'Robustez y Tecnología',
    'A Bosch alia a robustez alemã à tecnologia de ponta, com auto-limpeza iClean, tratamento anticorrosivo Golden Fin e integração com Alexa, Google e Siri (via acessório WiFi). Durabilidade comprovada em condições exigentes.': 'Bosch combina la robustez alemana con la tecnología punta, con auto-limpieza iClean, tratamiento anticorrosión Golden Fin e integración con Alexa, Google y Siri (via accesorio WiFi). Durabilidad probada en condiciones exigentes.',
    '✓ Alexa, Google e Siri (via acessório WiFi)': '✓ Alexa, Google y Siri (via accesorio WiFi)',
    '✓ Auto-limpeza iClean + Super Ionizador': '✓ Auto-limpieza iClean + Super Ionizador',
    '✓ Golden Fin anticorrosivo (resistente ao sal e humidade)': '✓ Golden Fin anticorrosión (resistente a la sal y la humedad)',
    '✓ Ionizador, sensor de movimento e Swing 3D (Climate 6000i)': '✓ Ionizador, sensor de movimiento y Swing 3D (Climate 6000i)',
    '✓ Marca alemã de confiança': '✓ Marca alemana de confianza',
    'Ideal para: habitações modernas, utilizadores de assistentes de voz e domótica': 'Ideal para: viviendas modernas, usuarios de asistentes de voz y domótica',
    'Relação Qualidade-Preço': 'Relación Calidad-Precio',
    'A Daitsu oferece equipamentos de alto desempenho a preços acessíveis, com WiFi incluído de série, I Feel, Gentle Air e filtros de qualidade do ar em 5 camadas. Tecnologia premium sem pagar mais.': 'Daitsu ofrece equipos de alto rendimiento a precios asequibles, con WiFi incluido de serie, I Feel, Gentle Air y filtros de calidad del aire en 5 capas. Tecnología premium sin pagar más.',
    '✓ WiFi incluído de série': '✓ WiFi incluido de serie',
    '✓ I Feel — sensor de temperatura no comando': '✓ I Feel — sensor de temperatura en el mando',
    '✓ Gentle Air — distribuição suave do ar': '✓ Gentle Air — distribución suave del aire',
    '✓ 5 filtros de qualidade do ar': '✓ 5 filtros de calidad del aire',
    'Ideal para: quem quer tecnologia avançada com excelente relação custo-benefício': 'Ideal para: quienes quieren tecnología avanzada con excelente relación coste-beneficio',
    'Ainda tem dúvidas? O nosso simulador calcula a potência certa e sugere o equipamento ideal para a sua casa.': '¿Todavía tiene dudas? Nuestro simulador calcula la potencia correcta y sugiere el equipo ideal para su casa.',
    '🔍 Vamos Simular! →': '🔍 ¡Vamos a Simular! →',

    // ── REVIEWS ──
    'Clientes reais, palavras reais': 'Clientes reales, palabras reales',
    'O Que Dizem de Nós': 'Lo que Dicen de Nosotros',
    'Avaliações verificadas no Google Business Profile.': 'Reseñas verificadas en Google Business Profile.',
    'Deixar Review →': 'Dejar Reseña →',
    'Ver Todas as Reviews no Google': 'Ver Todas las Reseñas en Google',
    '☀️ Energia Solar · Algarve': '☀️ Energía Solar · Algarve',
    '+300 dias de sol por ano.': '+300 días de sol al año.',
    'Aproveite-os.': 'Aprovéchelos.',
    'O Algarve é um dos locais mais privilegiados da Europa para energia solar. Cada sistema AQS que instalamos é um passo para uma casa mais autónoma e uma fatura mais leve.': 'El Algarve es uno de los lugares más privilegiados de Europa para la energía solar. Cada sistema ACS que instalamos es un paso hacia una casa más autónoma y una factura más ligera.',
    'Até 75% de poupança': 'Hasta un 75% de ahorro',
    'Na fatura anual de água quente sanitária': 'En la factura anual de agua caliente sanitaria',
    'Dedução IRS 30%': 'Deducción fiscal 30%',
    'Até 700€ de dedução no IRS por agregado familiar': 'Hasta 700€ de deducción fiscal por unidad familiar',
    'Valorização do imóvel': 'Revalorización del inmueble',
    'Sistemas certificados aumentam o valor da habitação em 5–8%': 'Los sistemas certificados aumentan el valor de la vivienda en un 5–8%',
    '25+ anos de vida útil': 'Más de 25 años de vida útil',
    'Tecnologia durável com retorno do investimento garantido': 'Tecnología duradera con retorno de la inversión garantizado',
    '☀️ Ver Sistemas Solares →': '☀️ Ver Sistemas Solares →',
    '⚡ Ver Retorno Solar →': '⚡ Ver Retorno Solar →',

    // ── CONTACT ──
    'Fale Connosco': 'Contáctenos',
    'Estamos disponíveis para responder a todas as suas dúvidas.': 'Estamos disponibles para responder a todas sus dudas.',
    'Telefone': 'Teléfono',
    'Envie-nos uma mensagem diretamente': 'Envíenos un mensaje directamente',
    'Iniciar Conversa': 'Iniciar Conversación',
    'Email': 'Correo electrónico',
    'Horário': 'Horario',
    'Segunda a Sexta:': 'Lunes a Viernes:',

    // ── FOOTER ──
    'Todos os direitos reservados': 'Todos los derechos reservados',
    'Política de Privacidade': 'Política de Privacidad',
    'Política de Cookies': 'Política de Cookies',
    'Legislação F-Gas': 'Legislación F-Gas',
    'Livro de Reclamações': 'Libro de Reclamaciones',
    'Certif. EIC nº GF-0879': 'Certif. EIC N.º GF-0879',
    '© 2025 ARTICOCLIMA · Todos os direitos reservados': '© 2025 ARTICOCLIMA · Todos los derechos reservados',
    'Perguntas Frequentes': 'Preguntas Frecuentes',

    // ── FORM ──
    'Nome': 'Nombre',
    'Contacto (telemóvel ou e-mail)': 'Contacto (móvil o correo electrónico)',
    'Marca do equipamento': 'Marca del equipo',
    'Tipo de sistema': 'Tipo de sistema',
    'Descrição da anomalia / tipo de manutenção': 'Descripción de la anomalía / tipo de mantenimiento',
    'Selecione...': 'Seleccionar...',
    'Outra': 'Otra',
    'Enviar Pedido →': 'Enviar Solicitud →',
    '✅ Pedido enviado! Entraremos em contacto brevemente.': '✅ ¡Solicitud enviada! Nos pondremos en contacto en breve.',

    // ── SIMULATOR ──
    'Ferramenta Online': 'Herramienta Online',
    'Diga-nos como são as suas divisões e calculamos a potência certa. Compare soluções mono e multisplit das marcas que representamos.': 'Díganos cómo son sus habitaciones y calcularemos la potencia correcta. Compare soluciones mono y multisplit de las marcas que representamos.',
    'Divisões': 'Habitaciones',
    'Detalhes': 'Detalles',
    'Sugestão': 'Sugerencia',
    'Quantas divisões pretende climatizar?': '¿Cuántas habitaciones desea climatizar?',
    'Selecione o número de divisões da sua habitação onde quer instalar ar condicionado.': 'Seleccione el número de habitaciones de su vivienda donde quiere instalar el aire acondicionado.',
    'Clique no número para avançar automaticamente.': 'Haga clic en el número para avanzar automáticamente.',
    'Marca preferida': 'Marca preferida',
    '(pode mudar na sugestão final)': '(puede cambiar en la sugerencia final)',
    'Detalhe cada divisão': 'Detalle cada habitación',
    'Preencha as dimensões e as condições de cada divisão para calcularmos a potência necessária.': 'Rellene las dimensiones y condiciones de cada habitación para que calculemos la potencia necesaria.',
    '← Voltar': '← Volver',
    'Ver Sugestão →': 'Ver Sugerencia →',
    '← Rever detalhes': '← Revisar detalles',
    '📄 Guardar PDF': '📄 Guardar PDF',

    // ── SIMULATOR JS (dynamic) ──
    'Preencha os dados da divisão': 'Rellene los datos de la habitación',
    'Nome da divisão': 'Nombre de la habitación',
    'Tipo de divisão': 'Tipo de habitación',
    'Quarto': 'Dormitorio',
    'Sala': 'Salón',
    'Cozinha': 'Cocina',
    'Outro': 'Otro',
    'Sala aberta para cozinha (+3.000 BTU)': 'Abierto a cocina (+3.000 BTU)',
    'Área (m²)': 'Área (m²)',
    'Altura (m)': 'Altura (m)',
    'Janelas': 'Ventanas',
    'Exposição solar': 'Exposición solar',
    'Sul': 'Sur',
    'Norte': 'Norte',
    'Este': 'Este',
    'Oeste': 'Oeste',
    'Remover': 'Eliminar',
    'Remover divisão': 'Eliminar habitación',
    'Modelo sugerido': 'Modelo sugerido',
    'Preencha a área para ver o modelo sugerido': 'Rellene el área para ver el modelo sugerido',
    'Sistema Individual': 'Sistema Individual',
    'Multisplit': 'Multisplit',
    'Multisplit Budget': 'Multisplit Económico',
    'Cor:': 'Color:',
    'Branco': 'Blanco',
    'Prateado': 'Plateado',
    'Preto': 'Negro',
    'Mudar modelo →': 'Cambiar modelo →',
    'Escolha o modelo para ': 'Elija el modelo para ',
    'Potência necessária: ': 'Potencia necesaria: ',
    ' · Marca: ': ' · Marca: ',
    'Unidade interior · sistema total: ': 'Unidad interior · total sistema: ',
    'Série económica': 'Gama económica',
    'Filtro PM2.5': 'Filtro PM2.5',
    '★ Mais económico': '★ Más económico',
    'vs. opção base': 'vs. opción base',
    'Sistema individual': 'Sistema individual',
    'Unidade exterior partilhada': 'Unidad exterior compartida',
    'zonas': 'zonas',
    'para: ': 'para: ',
    'divisão': 'habitación',
    'divisões': 'habitaciones',
    'Monosplit': 'Monosplit',
    'Sistema multisplit': 'Sistema multisplit',
    'Multisplit Budget Sensira': 'Multisplit Económico Sensira',
    'A sua configuração ': 'Su configuración ',
    ' configuração': '',
    'Total equipamentos': 'Total equipos',
    'IVA incluído · Exclui instalação, suportes e materiais': 'IVA incluido · Excl. instalación, soportes y materiales',
    ' também resolve esta necessidade': ' también cubre esta necesidad',
    'desde ': 'desde ',
    'Ver detalhes ▾': 'Ver detalles ▾',
    '· IVA inc. · Excl. instalação': '· IVA inc. · Excl. instalación',
    'Exterior: ': 'Exterior: ',
    'Exterior partilhado — ': 'Exterior compartido — ',
    'Multisplit mais económico': 'Multisplit más económico',
    'Mesma unidade exterior partilhada — interiores mais económicos · ': 'Misma unidad exterior compartida — interiores más económicos · ',
    'IVA incluído · Excl. instalação · Peça orçamento para confirmar compatibilidade': 'IVA incluido · Excl. instalación · Solicite presupuesto para confirmar compatibilidad',
    'Alternativa Multisplit': 'Alternativa Multisplit',
    'Mesmo com modelos diferentes, pode instalar uma unidade exterior partilhada · ': 'Incluso con modelos diferentes, puede instalar una unidad exterior compartida · ',
    'IVA incluído · Excl. instalação · Peça-nos orçamento para confirmar compatibilidade': 'IVA incluido · Excl. instalación · Pídanos presupuesto para confirmar compatibilidad',
    'Sensira Budget · CTXF interior + MXF exterior': 'Sensira Budget · CTXF interior + MXF exterior',
    'Padrão · FTXM interior + MXM exterior': 'Estándar · FTXM interior + MXM exterior',
    'Alternativa Monosplit': 'Alternativa Monosplit',
    'Uma unidade exterior por cada interior — total independência por divisão': 'Una unidad exterior por cada interior — total independencia por habitación',
    'IVA incluído · Excl. instalação · Gama de entrada por divisão': 'IVA incluido · Excl. instalación · Gama de entrada por habitación',
    'Preencha os dados de pelo menos uma divisão antes de solicitar orçamento.': 'Rellene los datos de al menos una habitación antes de solicitar presupuesto.',
    'Por favor indique o seu nome e contacto.': 'Por favor indique su nombre y contacto.',
  },

  de: {
    // ── NAV ──
    'Início': 'Startseite',
    'Serviços': 'Leistungen',
    'Marcas': 'Marken',
    'Catálogos': 'Kataloge',
    'Catálogo AC': 'Klimakatalog',
    'Solar AQS': 'Solar WW',
    'Simulador': 'Simulator',
    'Sobre Nós': 'Über Uns',
    'Contacto': 'Kontakt',
    'Contactar': 'Kontakt',
    '← Voltar ao Site': '← Zurück zur Seite',
    '← Voltar ao início': '← Zurück zur Startseite',
    'Simulador AC': 'Klimasimulator',

    // ── HERO ──
    '✦ Venda · Instalação · Assistência Técnica': '✦ Verkauf · Installation · Technischer Service',
    'Climatização que': 'Klimaanlage die',
    'Faz a Diferença': 'Den Unterschied Macht',
    '🔍 Simular Instalação →': '🔍 Installation Simulieren →',
    '📞 Ligar Agora': '📞 Jetzt Anrufen',
    'Clientes': 'Kunden',
    'Anos de Experiência': 'Jahre Erfahrung',
    'Satisfação': 'Zufriedenheit',
    'O conforto térmico da': 'Der Wärmekomfort Ihres',
    'sua casa': 'Ihres Hauses',
    'em boas mãos.': 'in guten Händen.',
    'Venda, instalação e assistência especializada': 'Verkauf, Installation und spezialisierter Service',
    'em climatização em Tavira e em todo o Algarve.': 'für Klimaanlagen in Tavira und im gesamten Algarve.',

    // ── SERVICES ──
    'O que fazemos': 'Was wir tun',
    'Os Nossos Serviços': 'Unsere Leistungen',
    'Soluções completas de climatização e energia solar para habitações e empresas.': 'Komplette Klima- und Solarenergielösungen für Privathaushalte und Unternehmen.',
    'Instalação de Ar Condicionado': 'Klimaanlage Installation',
    'Instalação profissional de raiz ou em substituição de equipamento existente. Trabalhamos com Daikin, Bosch e Daitsu, aproveitando a infraestrutura sempre que possível.': 'Professionelle Installation von Grund auf oder als Ersatz vorhandener Geräte. Wir arbeiten mit Daikin, Bosch und Daitsu und nutzen vorhandene Infrastruktur wo möglich.',
    'Substituição de Equipamento': 'Geräteaustausch',
    'Removemos o equipamento antigo e instalamos um novo modelo mais eficiente. Assessoria personalizada para escolher a melhor solução para o seu espaço.': 'Wir entfernen das alte Gerät und installieren ein neues, effizienteres Modell. Persönliche Beratung zur besten Lösung für Ihren Raum.',
    'Assistência Técnica': 'Technischer Kundendienst',
    'Manutenção preventiva e corretiva para garantir a máxima eficiência e longevidade do seu equipamento de ar condicionado ou sistema solar.': 'Präventive und korrektive Wartung für maximale Effizienz und Langlebigkeit Ihrer Klimaanlage oder Solaranlage.',
    'Higienização de Ar Condicionado': 'Klimaanlage Hygieniserung',
    'Limpeza profunda da unidade interior ou manutenção completa (interior + exterior). Ar mais limpo, maior eficiência e relatório incluído — válido para dossier HACCP.': 'Tiefenreinigung der Inneneinheit oder komplette Wartung (Innen + Außen). Sauberere Luft, höhere Effizienz und Bericht inklusive — gültig für HACCP-Dokumentation.',
    'Painéis Solares AQS': 'Solarthermie Warmwasser',
    'Instalação e manutenção de painéis solares para Águas Quentes Sanitárias. Representamos Bosch para soluções de energia solar eficientes e duradouras.': 'Installation und Wartung von Solarpanelen für Warmwasser. Wir vertreten Bosch für effiziente und langlebige Solarenergielösungen.',
    'Pedir orçamento →': 'Angebot anfragen →',
    'Agendar →': 'Terminieren →',
    'Saber mais →': 'Mehr erfahren →',

    // ── BRANDS ──
    'Parceiros Oficiais': 'Offizielle Partner',
    'Marcas que Representamos': 'Marken die wir Vertreten',
    'Revendedores autorizados das melhores marcas do mercado em climatização e energia solar.': 'Autorisierte Händler der besten Marken im Bereich Klimatisierung und Solarenergie.',
    'Ar Condicionado': 'Klimaanlage',

    // ── CATALOGUES CTA ──
    'Os Nossos Produtos': 'Unsere Produkte',
    'Consulte os nossos catálogos de equipamentos e encontre a solução ideal para a sua casa ou empresa.': 'Sehen Sie unsere Gerätekataloge und finden Sie die ideale Lösung für Ihr Zuhause oder Unternehmen.',
    'Ar condicionado Daikin, Bosch e Daitsu — 49 modelos disponíveis com especificações e preços.': 'Daikin, Bosch und Daitsu Klimaanlagen — 49 Modelle mit technischen Daten und Preisen.',
    'Ver Catálogo →': 'Katalog Ansehen →',
    'Catálogo Solar AQS': 'Solarthermie Katalog',
    'Painéis solares e bombas de calor Bosch para águas quentes sanitárias.': 'Bosch Solarpanele und Wärmepumpen für Warmwasser.',
    'Simulador de Instalação': 'Installationssimulator',
    'Descubra a potência certa para cada divisão e compare soluções mono e multisplit com preços indicativos.': 'Finden Sie die richtige Leistung für jeden Raum und vergleichen Sie Mono- und Multisplit-Lösungen mit Richtpreisen.',
    'Iniciar Simulação →': 'Simulation Starten →',

    // ── WHY US ──
    'Porquê nós': 'Warum Wir',
    'A Nossa Diferença': 'Unser Unterschied',
    'Resposta Rápida': 'Schnelle Reaktion',
    'Orçamento e agendamento no próprio dia. Sem esperas desnecessárias.': 'Angebot und Terminvereinbarung am selben Tag. Keine unnötigen Wartezeiten.',
    'Marcas de Referência': 'Führende Marken',
    'Revendedores autorizados Daikin, Bosch e Daitsu em climatização, e Bosch em painéis solares AQS.': 'Autorisierte Händler von Daikin, Bosch und Daitsu für Klimaanlagen sowie Bosch für Solarthermie.',
    'Instalação Garantida': 'Garantierte Installation',
    'Garantia na instalação com técnicos especializados e materiais de qualidade.': 'Installationsgarantie mit Fachleuten und Qualitätsmaterialien.',
    'Empresa Certificada': 'Zertifiziertes Unternehmen',
    'Empresa registada e técnicos certificados para total segurança e conformidade.': 'Eingetragenes Unternehmen und zertifizierte Techniker für vollständige Sicherheit und Konformität.',

    // ── ABOUT ──
    'Onde o Conforto': 'Wo Komfort',
    'Ganha Vida': 'Zum Leben Erwacht',
    'Certificação EIC': 'EIC-Zertifizierung',
    'Certif. nº GF-0879': 'Zertif. Nr. GF-0879',
    'O que nos torna especiais': 'Was uns besonders macht',
    'Soluções personalizadas para cada cliente': 'Maßgeschneiderte Lösungen für jeden Kunden',
    'Equipamentos de última geração e eficiência energética': 'Modernste Geräte und Energieeffizienz',
    'Atendimento rápido, transparente e profissional': 'Schneller, transparenter und professioneller Service',
    'Técnicos certificados e apaixonados pelo que fazem': 'Zertifizierte Techniker mit Leidenschaft für ihre Arbeit',
    'Garantia de conforto em todas as estações do ano': 'Komfortgarantie in allen Jahreszeiten',
    'Fale Connosco →': 'Kontakt →',
    'Na Ártico Climatização, não vendemos apenas soluções térmicas — entregamos experiências de conforto absoluto. Somos uma empresa recente, mas com uma alma profundamente experiente: a nossa equipa acumula mais de': 'Bei Ártico Climatização verkaufen wir nicht nur Wärmelösungen — wir liefern absolute Komforterlebnisse. Wir sind ein junges Unternehmen, aber mit einer tief erfahrenen Seele: unser Team hat mehr als',
    '20 anos de prática': '20 Jahre praktische Erfahrung',
    'no setor da climatização, com técnicos altamente qualificados e certificados.': 'im Klimaanlagenbereich, mit hochqualifizierten und zertifizierten Technikern.',
    'Começámos com o propósito de fazer melhor — mais próximos, mais honestos e mais eficientes. Cada projeto é tratado com rigor, dedicação e um compromisso inabalável com a excelência.': 'Wir begannen mit dem Ziel, besser zu machen — näher, ehrlicher und effizienter. Jedes Projekt wird mit Strenge, Hingabe und einem unerschütterlichen Engagement für Exzellenz behandelt.',
    '"A nossa missão? Ir ao encontro das necessidades de cada cliente com o máximo brio, profissionalismo e atenção ao detalhe."': '"Unsere Mission? Die Bedürfnisse jedes Kunden mit größtem Stolz, Professionalismus und Detailtreue zu erfüllen."',

    // ── CHOOSE ──
    'Qual é a certa para si?': 'Welche ist die Richtige für Sie?',
    'Ajude-me a Escolher': 'Hilf mir zu Wählen',
    'Cada marca tem o seu perfil. Descubra qual se adapta melhor ao seu projeto e ao seu orçamento.': 'Jede Marke hat ihr Profil. Finden Sie heraus, welche am besten zu Ihrem Projekt und Budget passt.',
    'Eficiência e Silêncio': 'Effizienz und Stille',
    'A Daikin é líder mundial em climatização, reconhecida pela elevada eficiência energética, funcionamento silencioso e fiabilidade a longo prazo. Para quem quer o melhor, sem compromissos.': 'Daikin ist der Weltmarktführer in der Klimatisierung, bekannt für hohe Energieeffizienz, leisen Betrieb und langfristige Zuverlässigkeit. Für alle, die das Beste wollen, ohne Kompromisse.',
    '✓ Eficiência A+++ em arrefecimento e aquecimento': '✓ A+++-Effizienz beim Kühlen und Heizen',
    '✓ WiFi integrado (Perfera, Stylish, Emura)': '✓ Integriertes WiFi (Perfera, Stylish, Emura)',
    '✓ Gama mais completa: 7 a 28.000 BTU': '✓ Vollständigstes Sortiment: 7 bis 28.000 BTU',
    '✓ Design premiado — Stylish e Emura': '✓ Preisgekröntes Design — Stylish und Emura',
    'Ideal para: lar familiar, escritórios, quem valoriza qualidade e design a longo prazo': 'Ideal für: Familienhäuser, Büros, alle, die Qualität und Design langfristig schätzen',
    'Robustez e Tecnologia': 'Robustheit und Technologie',
    'A Bosch alia a robustez alemã à tecnologia de ponta, com auto-limpeza iClean, tratamento anticorrosivo Golden Fin e integração com Alexa, Google e Siri (via acessório WiFi). Durabilidade comprovada em condições exigentes.': 'Bosch verbindet deutsche Robustheit mit Spitzentechnologie: iClean-Selbstreinigung, Golden-Fin-Korrosionsschutz und Integration mit Alexa, Google und Siri (via WLAN-Zubehör). Bewährte Langlebigkeit unter anspruchsvollen Bedingungen.',
    '✓ Alexa, Google e Siri (via acessório WiFi)': '✓ Alexa, Google und Siri (via WLAN-Zubehör)',
    '✓ Auto-limpeza iClean + Super Ionizador': '✓ iClean-Selbstreinigung + Super-Ionisator',
    '✓ Golden Fin anticorrosivo (resistente ao sal e humidade)': '✓ Golden Fin Korrosionsschutz (salz- und feuchtigkeitsbeständig)',
    '✓ Ionizador, sensor de movimento e Swing 3D (Climate 6000i)': '✓ Ionisator, Bewegungssensor und 3D-Swing (Climate 6000i)',
    '✓ Marca alemã de confiança': '✓ Vertrauenswürdige deutsche Marke',
    'Ideal para: habitações modernas, utilizadores de assistentes de voz e domótica': 'Ideal für: moderne Häuser, Nutzer von Sprachassistenten und Smart Home',
    'Relação Qualidade-Preço': 'Preis-Leistungs-Verhältnis',
    'A Daitsu oferece equipamentos de alto desempenho a preços acessíveis, com WiFi incluído de série, I Feel, Gentle Air e filtros de qualidade do ar em 5 camadas. Tecnologia premium sem pagar mais.': 'Daitsu bietet Hochleistungsgeräte zu erschwinglichen Preisen, mit integriertem WiFi, I Feel, Gentle Air und 5-Schicht-Luftqualitätsfiltern. Premium-Technologie ohne Aufpreis.',
    '✓ WiFi incluído de série': '✓ Serienmäßig integriertes WiFi',
    '✓ I Feel — sensor de temperatura no comando': '✓ I Feel — Temperatursensor in der Fernbedienung',
    '✓ Gentle Air — distribuição suave do ar': '✓ Gentle Air — sanfte Luftverteilung',
    '✓ 5 filtros de qualidade do ar': '✓ 5 Luftqualitätsfilter',
    'Ideal para: quem quer tecnologia avançada com excelente relação custo-benefício': 'Ideal für: alle, die fortschrittliche Technologie mit ausgezeichnetem Preis-Leistungs-Verhältnis wollen',
    'Ainda tem dúvidas? O nosso simulador calcula a potência certa e sugere o equipamento ideal para a sua casa.': 'Haben Sie noch Fragen? Unser Simulator berechnet die richtige Leistung und schlägt die ideale Ausrüstung für Ihr Zuhause vor.',
    '🔍 Vamos Simular! →': '🔍 Jetzt Simulieren! →',

    // ── REVIEWS ──
    'Clientes reais, palavras reais': 'Echte Kunden, echte Worte',
    'O Que Dizem de Nós': 'Was sie über uns sagen',
    'Avaliações verificadas no Google Business Profile.': 'Verifizierte Bewertungen auf Google Business Profile.',
    'Deixar Review →': 'Bewertung Hinterlassen →',
    'Ver Todas as Reviews no Google': 'Alle Bewertungen auf Google Ansehen',
    '☀️ Energia Solar · Algarve': '☀️ Solarenergie · Algarve',
    '+300 dias de sol por ano.': '+300 Sonnentage pro Jahr.',
    'Aproveite-os.': 'Nutzen Sie sie.',
    'O Algarve é um dos locais mais privilegiados da Europa para energia solar. Cada sistema AQS que instalamos é um passo para uma casa mais autónoma e uma fatura mais leve.': 'Die Algarve ist einer der privilegiertesten Orte Europas für Solarenergie. Jedes Brauchwassersystem, das wir installieren, ist ein Schritt zu einem autonomeren Zuhause und einer leichteren Rechnung.',
    'Até 75% de poupança': 'Bis zu 75% Ersparnis',
    'Na fatura anual de água quente sanitária': 'Bei der jährlichen Warmwasserrechnung',
    'Dedução IRS 30%': '30% Steuerabzug',
    'Até 700€ de dedução no IRS por agregado familiar': 'Bis zu 700€ Steuerabzug pro Haushalt',
    'Valorização do imóvel': 'Wertsteigerung der Immobilie',
    'Sistemas certificados aumentam o valor da habitação em 5–8%': 'Zertifizierte Systeme steigern den Immobilienwert um 5–8%',
    '25+ anos de vida útil': 'Über 25 Jahre Nutzungsdauer',
    'Tecnologia durável com retorno do investimento garantido': 'Langlebige Technologie mit garantiertem Return on Investment',
    '☀️ Ver Sistemas Solares →': '☀️ Solarsysteme Ansehen →',
    '⚡ Ver Retorno Solar →': '⚡ Solar-Rendite Ansehen →',

    // ── CONTACT ──
    'Fale Connosco': 'Kontakt',
    'Estamos disponíveis para responder a todas as suas dúvidas.': 'Wir stehen zur Beantwortung all Ihrer Fragen zur Verfügung.',
    'Telefone': 'Telefon',
    'Envie-nos uma mensagem diretamente': 'Senden Sie uns eine Nachricht direkt',
    'Iniciar Conversa': 'Gespräch Starten',
    'Email': 'E-Mail',
    'Horário': 'Öffnungszeiten',
    'Segunda a Sexta:': 'Montag bis Freitag:',

    // ── FOOTER ──
    'Todos os direitos reservados': 'Alle Rechte vorbehalten',
    'Política de Privacidade': 'Datenschutzrichtlinie',
    'Política de Cookies': 'Cookie-Richtlinie',
    'Legislação F-Gas': 'F-Gas-Gesetzgebung',
    'Livro de Reclamações': 'Beschwerdebuch',
    'Certif. EIC nº GF-0879': 'EIC-Zertif. Nr. GF-0879',
    '© 2025 ARTICOCLIMA · Todos os direitos reservados': '© 2025 ARTICOCLIMA · Alle Rechte vorbehalten',
    'Perguntas Frequentes': 'Häufige Fragen',

    // ── FORM ──
    'Nome': 'Name',
    'Contacto (telemóvel ou e-mail)': 'Kontakt (Handy oder E-Mail)',
    'Marca do equipamento': 'Gerätemarke',
    'Tipo de sistema': 'Systemtyp',
    'Descrição da anomalia / tipo de manutenção': 'Fehlerbeschreibung / Wartungsart',
    'Selecione...': 'Auswählen...',
    'Outra': 'Andere',
    'Enviar Pedido →': 'Anfrage Senden →',
    '✅ Pedido enviado! Entraremos em contacto brevemente.': '✅ Anfrage gesendet! Wir werden uns bald bei Ihnen melden.',

    // ── SIMULATOR ──
    'Ferramenta Online': 'Online-Tool',
    'Diga-nos como são as suas divisões e calculamos a potência certa. Compare soluções mono e multisplit das marcas que representamos.': 'Sagen Sie uns, wie Ihre Räume sind, und wir berechnen die richtige Leistung. Vergleichen Sie Mono- und Multisplit-Lösungen der Marken, die wir vertreten.',
    'Divisões': 'Räume',
    'Detalhes': 'Details',
    'Sugestão': 'Vorschlag',
    'Quantas divisões pretende climatizar?': 'Wie viele Räume möchten Sie klimatisieren?',
    'Selecione o número de divisões da sua habitação onde quer instalar ar condicionado.': 'Wählen Sie die Anzahl der Räume in Ihrem Zuhause, in denen Sie Klimaanlagen installieren möchten.',
    'Clique no número para avançar automaticamente.': 'Klicken Sie auf die Zahl, um automatisch fortzufahren.',
    'Marca preferida': 'Bevorzugte Marke',
    '(pode mudar na sugestão final)': '(kann im endgültigen Vorschlag geändert werden)',
    'Detalhe cada divisão': 'Detaillieren Sie jeden Raum',
    'Preencha as dimensões e as condições de cada divisão para calcularmos a potência necessária.': 'Geben Sie die Abmessungen und Bedingungen jedes Raums ein, damit wir die erforderliche Leistung berechnen können.',
    '← Voltar': '← Zurück',
    'Ver Sugestão →': 'Vorschlag Sehen →',
    '← Rever detalhes': '← Details Überprüfen',
    '📄 Guardar PDF': '📄 PDF Speichern',

    // ── SIMULATOR JS (dynamic) ──
    'Preencha os dados da divisão': 'Raumdetails ausfüllen',
    'Nome da divisão': 'Raumname',
    'Tipo de divisão': 'Raumart',
    'Quarto': 'Schlafzimmer',
    'Sala': 'Wohnzimmer',
    'Cozinha': 'Küche',
    'Outro': 'Andere',
    'Sala aberta para cozinha (+3.000 BTU)': 'Offener Küchenbereich (+3.000 BTU)',
    'Área (m²)': 'Fläche (m²)',
    'Altura (m)': 'Höhe (m)',
    'Janelas': 'Fenster',
    'Exposição solar': 'Sonneneinstrahlung',
    'Sul': 'Süd',
    'Norte': 'Nord',
    'Este': 'Ost',
    'Oeste': 'West',
    'Remover': 'Entfernen',
    'Remover divisão': 'Raum entfernen',
    'Modelo sugerido': 'Vorgeschlagenes Modell',
    'Preencha a área para ver o modelo sugerido': 'Fläche ausfüllen um das vorgeschlagene Modell zu sehen',
    'Sistema Individual': 'Einzelsystem',
    'Multisplit': 'Multisplit',
    'Multisplit Budget': 'Budget-Multisplit',
    'Cor:': 'Farbe:',
    'Branco': 'Weiß',
    'Prateado': 'Silber',
    'Preto': 'Schwarz',
    'Mudar modelo →': 'Modell wechseln →',
    'Escolha o modelo para ': 'Modell wählen für ',
    'Potência necessária: ': 'Erforderliche Leistung: ',
    ' · Marca: ': ' · Marke: ',
    'Unidade interior · sistema total: ': 'Inneneinheit · Systemgesamt: ',
    'Série económica': 'Günstige Serie',
    'Filtro PM2.5': 'PM2.5-Filter',
    '★ Mais económico': '★ Bester Preis',
    'vs. opção base': 'vs. Basisoption',
    'Sistema individual': 'Einzelsystem',
    'Unidade exterior partilhada': 'Gemeinsame Außeneinheit',
    'zonas': 'Zonen',
    'para: ': 'für: ',
    'divisão': 'Raum',
    'divisões': 'Räume',
    'Monosplit': 'Monosplit',
    'Sistema multisplit': 'Multisplit-System',
    'Multisplit Budget Sensira': 'Budget-Multisplit Sensira',
    'A sua configuração ': 'Ihre Konfiguration ',
    ' configuração': '',
    'Total equipamentos': 'Gerätegesamt',
    'IVA incluído · Exclui instalação, suportes e materiais': 'MwSt. inkl. · Ohne Installation, Halterungen und Materialien',
    ' também resolve esta necessidade': ' deckt diesen Bedarf ebenfalls ab',
    'desde ': 'ab ',
    'Ver detalhes ▾': 'Details ansehen ▾',
    '· IVA inc. · Excl. instalação': '· MwSt. ink. · Ohne Installation',
    'Exterior: ': 'Außen: ',
    'Exterior partilhado — ': 'Gemeinsam außen — ',
    'Multisplit mais económico': 'Günstigstes Multisplit',
    'Mesma unidade exterior partilhada — interiores mais económicos · ': 'Gleiche gemeinsame Außeneinheit — günstigere Inneneinheiten · ',
    'IVA incluído · Excl. instalação · Peça orçamento para confirmar compatibilidade': 'MwSt. inkl. · Ohne Installation · Angebot anfordern zur Kompatibilitätsbestätigung',
    'Alternativa Multisplit': 'Multisplit-Alternative',
    'Mesmo com modelos diferentes, pode instalar uma unidade exterior partilhada · ': 'Auch mit verschiedenen Modellen können Sie eine gemeinsame Außeneinheit installieren · ',
    'IVA incluído · Excl. instalação · Peça-nos orçamento para confirmar compatibilidade': 'MwSt. inkl. · Ohne Installation · Fragen Sie uns nach einem Angebot zur Kompatibilitätsbestätigung',
    'Sensira Budget · CTXF interior + MXF exterior': 'Sensira Budget · CTXF innen + MXF außen',
    'Padrão · FTXM interior + MXM exterior': 'Standard · FTXM innen + MXM außen',
    'Alternativa Monosplit': 'Monosplit-Alternative',
    'Uma unidade exterior por cada interior — total independência por divisão': 'Eine Außeneinheit pro Inneneinheit — volle Unabhängigkeit pro Raum',
    'IVA incluído · Excl. instalação · Gama de entrada por divisão': 'MwSt. inkl. · Ohne Installation · Einstiegssortiment pro Raum',
    'Preencha os dados de pelo menos uma divisão antes de solicitar orçamento.': 'Füllen Sie die Details für mindestens einen Raum aus, bevor Sie ein Angebot anfordern.',
    'Por favor indique o seu nome e contacto.': 'Bitte geben Sie Ihren Namen und Kontakt an.',
  },
};

// ─── t() — helper para conteúdo gerado dinamicamente por JS ───
function t(str) {
  if (currentLang !== 'pt' && TRANSLATIONS[currentLang]) {
    const dict = TRANSLATIONS[currentLang];
    return dict[str] !== undefined ? dict[str] : str;
  }
  return str;
}

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
  const dropdown = document.getElementById('langDropdown');

  if (lang !== 'pt') {
    if (!isInitialLoad) restoreOriginal();
    walkAndReplace(document.body, TRANSLATIONS[lang], true);
  } else {
    restoreOriginal();
  }

  // Update button label
  var FLAG_CODES = { pt: 'pt', en: 'gb', fr: 'fr', es: 'es', de: 'de' };
  if (btn) {
    var fc = FLAG_CODES[lang] || lang;
    btn.innerHTML = '<span class="fi fi-' + fc + '"></span> ' + lang.toUpperCase() + ' ▾';
  }

  // Mark active lang in dropdown
  if (dropdown) {
    dropdown.querySelectorAll('button[data-lang]').forEach(function(b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  }

  document.documentElement.lang = lang;
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
}

function setLang(lang) {
  applyLang(lang);
  // Close dropdown
  var dd = document.getElementById('langDropdown');
  if (dd) dd.classList.remove('open');
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('langToggle');
  var dropdown = document.getElementById('langDropdown');

  if (btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (dropdown) dropdown.classList.toggle('open');
    });
  }

  // Attach click handlers to each lang option button
  if (dropdown) {
    dropdown.querySelectorAll('button[data-lang]').forEach(function(b) {
      b.addEventListener('click', function(e) {
        e.stopPropagation();
        setLang(b.dataset.lang);
      });
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', function() {
    if (dropdown) dropdown.classList.remove('open');
  });

  // Apply stored language
  if (currentLang !== 'pt') {
    applyLang(currentLang, true);
  } else {
    // Update active state in dropdown for PT
    if (dropdown) {
      dropdown.querySelectorAll('button[data-lang]').forEach(function(b) {
        b.classList.toggle('active', b.dataset.lang === 'pt');
      });
    }
  }
});
