/* =============================================
   ARTICOCLIMA — Catálogo de Produtos
   =============================================
   Para atualizar produtos, edite o array PRODUCTS abaixo.
   Para adicionar imagens, coloque os ficheiros em:
     assets/products/NOME-DO-FICHEIRO.jpg
   e atualize o campo "image" de cada produto.
   ============================================= */

/* imagens partilhadas por série (3 fotos reais por modelo) */
const IMG = {
  sensira:         ['assets/products/daikin-sensira-1.webp','assets/products/daikin-sensira-2.webp','assets/products/daikin-sensira-3.webp'],
  confora:         ['assets/products/daikin-confora-1.webp','assets/products/daikin-confora-2.webp','assets/products/daikin-confora-3.webp'],
  perfera:         ['assets/products/daikin-perfera-1.webp','assets/products/daikin-perfera-2.webp','assets/products/daikin-perfera-3.webp'],
  stylishBranco:   ['assets/products/daikin-stylish-branco-1.webp','assets/products/daikin-stylish-branco-2.webp','assets/products/daikin-stylish-branco-3.webp'],
  stylishSilver:   ['assets/products/daikin-stylish-silver-1.webp','assets/products/daikin-stylish-silver-2.webp','assets/products/daikin-stylish-silver-3.webp'],
  stylishBlack:    ['assets/products/daikin-stylish-black-1.webp','assets/products/daikin-stylish-black-2.webp','assets/products/daikin-stylish-black-3.webp'],
  emuraBranco:     ['assets/products/daikin-emura-branco-1.webp','assets/products/daikin-emura-branco-2.webp','assets/products/daikin-emura-branco-3.webp'],
  emuraSilver:     ['assets/products/daikin-emura-silver-1.webp','assets/products/daikin-emura-silver-2.webp','assets/products/daikin-emura-silver-3.webp'],
  emuraBlack:      ['assets/products/daikin-emura-black-1.webp','assets/products/daikin-emura-black-2.webp','assets/products/daikin-emura-black-3.webp'],
  bosch3000i:      ['assets/products/bosch-3000i-1.webp','assets/products/bosch-3000i-2.webp'],
  bosch6000i:      ['assets/products/bosch-6000i-1.webp','assets/products/bosch-6000i-2.webp','assets/products/bosch-6000i-3.webp','assets/products/bosch-6000i-4.webp'],
  bosch7000iBranco:['assets/products/bosch-7000i-branco-1.webp','assets/products/bosch-7000i-branco-2.webp','assets/products/bosch-7000i-branco-3.webp'],
  bosch7000iSilver:['assets/products/bosch-7000i-silver-1.webp','assets/products/bosch-7000i-silver-2.webp','assets/products/bosch-7000i-silver-3.webp'],
  bosch7000iBlack: ['assets/products/bosch-7000i-black-1.webp','assets/products/bosch-7000i-black-2.webp','assets/products/bosch-7000i-black-3.webp'],
  articPlus:       ['assets/products/daitsu-artic-plus-1.webp','assets/products/daitsu-artic-plus-2.webp','assets/products/daitsu-artic-plus-3.webp','assets/products/daitsu-artic-plus-4.jpg'],
};

const PRODUCTS = [

  /* ===================================================
     DAIKIN — Sensira (gama entrada)
     =================================================== */
  { id:'daikin-sensira-ftxf20', brand:'daikin', series:'Sensira', model:'FTXF20',
    btu:7000,  kw:2.0, energyCool:'A++', energyHeat:'A+', noiseIn:21, noiseOut:46,
    tech:['Inverter','R-32'], features:['Modo seco','Timer','Auto-restart','Filtro básico'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:972,
    image:IMG.sensira[0], images:IMG.sensira },
  { id:'daikin-sensira-ftxf25', brand:'daikin', series:'Sensira', model:'FTXF25',
    btu:9000,  kw:2.5, energyCool:'A++', energyHeat:'A+', noiseIn:22, noiseOut:47,
    tech:['Inverter','R-32'], features:['Modo seco','Timer','Auto-restart','Filtro básico'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1033,
    image:IMG.sensira[0], images:IMG.sensira },
  { id:'daikin-sensira-ftxf35', brand:'daikin', series:'Sensira', model:'FTXF35',
    btu:12000, kw:3.5, energyCool:'A++', energyHeat:'A+', noiseIn:25, noiseOut:49,
    tech:['Inverter','R-32'], features:['Modo seco','Timer','Auto-restart','Filtro básico'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1169,
    image:IMG.sensira[0], images:IMG.sensira },
  { id:'daikin-sensira-ftxf42', brand:'daikin', series:'Sensira', model:'FTXF42',
    btu:15000, kw:4.2, energyCool:'A++', energyHeat:'A+', noiseIn:28, noiseOut:51,
    tech:['Inverter','R-32'], features:['Modo seco','Timer','Auto-restart','Filtro básico'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1396,
    image:IMG.sensira[0], images:IMG.sensira },
  { id:'daikin-sensira-ftxf50', brand:'daikin', series:'Sensira', model:'FTXF50',
    btu:18000, kw:5.0, energyCool:'A+', energyHeat:'A', noiseIn:30, noiseOut:52,
    tech:['Inverter','R-32'], features:['Modo seco','Timer','Auto-restart','Filtro básico'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1863,
    image:IMG.sensira[0], images:IMG.sensira },
  { id:'daikin-sensira-ftxf60', brand:'daikin', series:'Sensira', model:'FTXF60',
    btu:24000, kw:7.0, energyCool:'A+', energyHeat:'A', noiseIn:35, noiseOut:57,
    tech:['Inverter','R-32'], features:['Modo seco','Timer','Auto-restart','Filtro básico'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:2319,
    image:IMG.sensira[0], images:IMG.sensira },
  { id:'daikin-sensira-ftxf71', brand:'daikin', series:'Sensira', model:'FTXF71',
    btu:28000, kw:8.2, energyCool:'A+', energyHeat:'A', noiseIn:39, noiseOut:60,
    tech:['Inverter','R-32'], features:['Modo seco','Timer','Auto-restart','Filtro básico'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:2774,
    image:IMG.sensira[0], images:IMG.sensira },

  /* ===================================================
     DAIKIN — Confora (gama intermédia)
     =================================================== */
  { id:'daikin-confora-ftxp20', brand:'daikin', series:'Confora', model:'FTXP20',
    btu:7000,  kw:2.0, energyCool:'A+++', energyHeat:'A++', noiseIn:20, noiseOut:46,
    tech:['Inverter','R-32','WiFi opcional'], features:['Modo I-Feel','Coanda','Filtro PM2.5','Timer semanal'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1224,
    image:IMG.confora[0], images:IMG.confora },
  { id:'daikin-confora-ftxp25', brand:'daikin', series:'Confora', model:'FTXP25',
    btu:9000,  kw:2.5, energyCool:'A+++', energyHeat:'A++', noiseIn:21, noiseOut:47,
    tech:['Inverter','R-32','WiFi opcional'], features:['Modo I-Feel','Coanda','Filtro PM2.5','Timer semanal'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1316,
    image:IMG.confora[0], images:IMG.confora },
  { id:'daikin-confora-ftxp35', brand:'daikin', series:'Confora', model:'FTXP35',
    btu:12000, kw:3.5, energyCool:'A+++', energyHeat:'A++', noiseIn:23, noiseOut:49,
    tech:['Inverter','R-32','WiFi opcional'], features:['Modo I-Feel','Coanda','Filtro PM2.5','Timer semanal'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1482,
    image:IMG.confora[0], images:IMG.confora },
  { id:'daikin-confora-ftxp50', brand:'daikin', series:'Confora', model:'FTXP50',
    btu:18000, kw:5.0, energyCool:'A+++', energyHeat:'A++', noiseIn:31, noiseOut:54,
    tech:['Inverter','R-32','WiFi opcional'], features:['Modo I-Feel','Coanda','Filtro PM2.5','Timer semanal'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:2343,
    image:IMG.confora[0], images:IMG.confora },
  { id:'daikin-confora-ftxp60', brand:'daikin', series:'Confora', model:'FTXP60',
    btu:24000, kw:7.0, energyCool:'A+++', energyHeat:'A++', noiseIn:35, noiseOut:58,
    tech:['Inverter','R-32','WiFi opcional'], features:['Modo I-Feel','Coanda','Filtro PM2.5','Timer semanal'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:2927,
    image:IMG.confora[0], images:IMG.confora },
  { id:'daikin-confora-ftxp71', brand:'daikin', series:'Confora', model:'FTXP71',
    btu:28000, kw:8.2, energyCool:'A+++', energyHeat:'A++', noiseIn:40, noiseOut:61,
    tech:['Inverter','R-32','WiFi opcional'], features:['Modo I-Feel','Coanda','Filtro PM2.5','Timer semanal'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:3383,
    image:IMG.confora[0], images:IMG.confora },

  /* ===================================================
     DAIKIN — Perfera (gama premium)
     =================================================== */
  { id:'daikin-perfera-ftxm20', brand:'daikin', series:'Perfera', model:'FTXM20',
    btu:7000,  kw:2.0, energyCool:'A+++', energyHeat:'A++', noiseIn:19, noiseOut:44,
    tech:['Inverter','R-32','WiFi integrado'], features:['I-Feel','Coanda','Filtro PM2.5','Purificador de ar','Controlo por app'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1451,
    image:IMG.perfera[0], images:IMG.perfera },
  { id:'daikin-perfera-ftxm25', brand:'daikin', series:'Perfera', model:'FTXM25',
    btu:9000,  kw:2.5, energyCool:'A+++', energyHeat:'A++', noiseIn:20, noiseOut:46,
    tech:['Inverter','R-32','WiFi integrado'], features:['I-Feel','Coanda','Filtro PM2.5','Purificador de ar','Controlo por app'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1538,
    image:IMG.perfera[0], images:IMG.perfera },
  { id:'daikin-perfera-ftxm35', brand:'daikin', series:'Perfera', model:'FTXM35',
    btu:12000, kw:3.5, energyCool:'A+++', energyHeat:'A++', noiseIn:22, noiseOut:48,
    tech:['Inverter','R-32','WiFi integrado'], features:['I-Feel','Coanda','Filtro PM2.5','Purificador de ar','Controlo por app'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1771,
    image:IMG.perfera[0], images:IMG.perfera },
  { id:'daikin-perfera-ftxm42', brand:'daikin', series:'Perfera', model:'FTXM42',
    btu:15000, kw:4.2, energyCool:'A+++', energyHeat:'A++', noiseIn:26, noiseOut:50,
    tech:['Inverter','R-32','WiFi integrado'], features:['I-Feel','Coanda','Filtro PM2.5','Purificador de ar','Controlo por app'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:2251,
    image:IMG.perfera[0], images:IMG.perfera },
  { id:'daikin-perfera-ftxm50', brand:'daikin', series:'Perfera', model:'FTXM50',
    btu:18000, kw:5.0, energyCool:'A+++', energyHeat:'A++', noiseIn:28, noiseOut:52,
    tech:['Inverter','R-32','WiFi integrado'], features:['I-Feel','Coanda','Filtro PM2.5','Purificador de ar','Controlo por app'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:2897,
    image:IMG.perfera[0], images:IMG.perfera },
  { id:'daikin-perfera-ftxm60', brand:'daikin', series:'Perfera', model:'FTXM60',
    btu:24000, kw:7.0, energyCool:'A+++', energyHeat:'A++', noiseIn:33, noiseOut:56,
    tech:['Inverter','R-32','WiFi integrado'], features:['I-Feel','Coanda','Filtro PM2.5','Purificador de ar','Controlo por app'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:3506,
    image:IMG.perfera[0], images:IMG.perfera },
  { id:'daikin-perfera-ftxm71', brand:'daikin', series:'Perfera', model:'FTXM71',
    btu:28000, kw:8.2, energyCool:'A+++', energyHeat:'A++', noiseIn:38, noiseOut:59,
    tech:['Inverter','R-32','WiFi integrado'], features:['I-Feel','Coanda','Filtro PM2.5','Purificador de ar','Controlo por app'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:4041,
    image:IMG.perfera[0], images:IMG.perfera },

  /* ===================================================
     DAIKIN — Stylish (design, 3 cores)
     =================================================== */
  { id:'daikin-stylish-ftxa20', brand:'daikin', series:'Stylish', model:'FTXA20',
    btu:7000,  kw:2.0, energyCool:'A+++', energyHeat:'A++', noiseIn:20, noiseOut:46,
    tech:['Inverter','R-32','WiFi integrado'],
    features:['Design premium','I-Feel','Coanda','Filtro PM2.5','Controlo por app'],
    colors:[{name:'Branco',hex:'#F0F0F0'},{name:'Prateado',hex:'#B8B8C0'},{name:'Preto',hex:'#2C2C2E'}],
    pvp:1728,
    image:IMG.stylishBranco[0], images:IMG.stylishBranco,
    colorGallery:{'Branco':IMG.stylishBranco,'Prateado':IMG.stylishSilver,'Preto':IMG.stylishBlack} },
  { id:'daikin-stylish-ftxa25', brand:'daikin', series:'Stylish', model:'FTXA25',
    btu:9000,  kw:2.5, energyCool:'A+++', energyHeat:'A++', noiseIn:21, noiseOut:47,
    tech:['Inverter','R-32','WiFi integrado'],
    features:['Design premium','I-Feel','Coanda','Filtro PM2.5','Controlo por app'],
    colors:[{name:'Branco',hex:'#F0F0F0'},{name:'Prateado',hex:'#B8B8C0'},{name:'Preto',hex:'#2C2C2E'}],
    pvp:1851,
    image:IMG.stylishBranco[0], images:IMG.stylishBranco,
    colorGallery:{'Branco':IMG.stylishBranco,'Prateado':IMG.stylishSilver,'Preto':IMG.stylishBlack} },
  { id:'daikin-stylish-ftxa35', brand:'daikin', series:'Stylish', model:'FTXA35',
    btu:12000, kw:3.5, energyCool:'A+++', energyHeat:'A++', noiseIn:23, noiseOut:49,
    tech:['Inverter','R-32','WiFi integrado'],
    features:['Design premium','I-Feel','Coanda','Filtro PM2.5','Controlo por app'],
    colors:[{name:'Branco',hex:'#F0F0F0'},{name:'Prateado',hex:'#B8B8C0'},{name:'Preto',hex:'#2C2C2E'}],
    pvp:2146,
    image:IMG.stylishBranco[0], images:IMG.stylishBranco,
    colorGallery:{'Branco':IMG.stylishBranco,'Prateado':IMG.stylishSilver,'Preto':IMG.stylishBlack} },
  { id:'daikin-stylish-ftxa42', brand:'daikin', series:'Stylish', model:'FTXA42',
    btu:15000, kw:4.2, energyCool:'A+++', energyHeat:'A++', noiseIn:26, noiseOut:51,
    tech:['Inverter','R-32','WiFi integrado'],
    features:['Design premium','I-Feel','Coanda','Filtro PM2.5','Controlo por app'],
    colors:[{name:'Branco',hex:'#F0F0F0'},{name:'Prateado',hex:'#B8B8C0'},{name:'Preto',hex:'#2C2C2E'}],
    pvp:2712,
    image:IMG.stylishBranco[0], images:IMG.stylishBranco,
    colorGallery:{'Branco':IMG.stylishBranco,'Prateado':IMG.stylishSilver,'Preto':IMG.stylishBlack} },
  { id:'daikin-stylish-ftxa50', brand:'daikin', series:'Stylish', model:'FTXA50',
    btu:18000, kw:5.0, energyCool:'A+++', energyHeat:'A++', noiseIn:29, noiseOut:54,
    tech:['Inverter','R-32','WiFi integrado'],
    features:['Design premium','I-Feel','Coanda','Filtro PM2.5','Controlo por app'],
    colors:[{name:'Branco',hex:'#F0F0F0'},{name:'Prateado',hex:'#B8B8C0'},{name:'Preto',hex:'#2C2C2E'}],
    pvp:3229,
    image:IMG.stylishBranco[0], images:IMG.stylishBranco,
    colorGallery:{'Branco':IMG.stylishBranco,'Prateado':IMG.stylishSilver,'Preto':IMG.stylishBlack} },

  /* ===================================================
     DAIKIN — Emura (design icónico, 3 cores)
     =================================================== */
  { id:'daikin-emura-ftxj20', brand:'daikin', series:'Emura', model:'FTXJ20',
    btu:7000,  kw:2.0, energyCool:'A+++', energyHeat:'A++', noiseIn:19, noiseOut:45,
    tech:['Inverter','R-32','WiFi integrado'],
    features:['Design icónico','I-Feel','Coanda','Filtro PM2.5','Purificador de ar','Controlo por app'],
    colors:[{name:'Branco',hex:'#F0F0F0'},{name:'Prateado',hex:'#B8B8C0'},{name:'Preto',hex:'#2C2C2E'}],
    pvp:1919,
    image:IMG.emuraBranco[0], images:IMG.emuraBranco,
    colorGallery:{'Branco':IMG.emuraBranco,'Prateado':IMG.emuraSilver,'Preto':IMG.emuraBlack} },
  { id:'daikin-emura-ftxj25', brand:'daikin', series:'Emura', model:'FTXJ25',
    btu:9000,  kw:2.5, energyCool:'A+++', energyHeat:'A++', noiseIn:20, noiseOut:47,
    tech:['Inverter','R-32','WiFi integrado'],
    features:['Design icónico','I-Feel','Coanda','Filtro PM2.5','Purificador de ar','Controlo por app'],
    colors:[{name:'Branco',hex:'#F0F0F0'},{name:'Prateado',hex:'#B8B8C0'},{name:'Preto',hex:'#2C2C2E'}],
    pvp:2005,
    image:IMG.emuraBranco[0], images:IMG.emuraBranco,
    colorGallery:{'Branco':IMG.emuraBranco,'Prateado':IMG.emuraSilver,'Preto':IMG.emuraBlack} },
  { id:'daikin-emura-ftxj35', brand:'daikin', series:'Emura', model:'FTXJ35',
    btu:12000, kw:3.5, energyCool:'A+++', energyHeat:'A++', noiseIn:22, noiseOut:49,
    tech:['Inverter','R-32','WiFi integrado'],
    features:['Design icónico','I-Feel','Coanda','Filtro PM2.5','Purificador de ar','Controlo por app'],
    colors:[{name:'Branco',hex:'#F0F0F0'},{name:'Prateado',hex:'#B8B8C0'},{name:'Preto',hex:'#2C2C2E'}],
    pvp:2300,
    image:IMG.emuraBranco[0], images:IMG.emuraBranco,
    colorGallery:{'Branco':IMG.emuraBranco,'Prateado':IMG.emuraSilver,'Preto':IMG.emuraBlack} },
  { id:'daikin-emura-ftxj42', brand:'daikin', series:'Emura', model:'FTXJ42',
    btu:15000, kw:4.2, energyCool:'A+++', energyHeat:'A++', noiseIn:25, noiseOut:52,
    tech:['Inverter','R-32','WiFi integrado'],
    features:['Design icónico','I-Feel','Coanda','Filtro PM2.5','Purificador de ar','Controlo por app'],
    colors:[{name:'Branco',hex:'#F0F0F0'},{name:'Prateado',hex:'#B8B8C0'},{name:'Preto',hex:'#2C2C2E'}],
    pvp:2946,
    image:IMG.emuraBranco[0], images:IMG.emuraBranco,
    colorGallery:{'Branco':IMG.emuraBranco,'Prateado':IMG.emuraSilver,'Preto':IMG.emuraBlack} },
  { id:'daikin-emura-ftxj50', brand:'daikin', series:'Emura', model:'FTXJ50',
    btu:18000, kw:5.0, energyCool:'A+++', energyHeat:'A++', noiseIn:28, noiseOut:54,
    tech:['Inverter','R-32','WiFi integrado'],
    features:['Design icónico','I-Feel','Coanda','Filtro PM2.5','Purificador de ar','Controlo por app'],
    colors:[{name:'Branco',hex:'#F0F0F0'},{name:'Prateado',hex:'#B8B8C0'},{name:'Preto',hex:'#2C2C2E'}],
    pvp:3419,
    image:IMG.emuraBranco[0], images:IMG.emuraBranco,
    colorGallery:{'Branco':IMG.emuraBranco,'Prateado':IMG.emuraSilver,'Preto':IMG.emuraBlack} },

  /* ===================================================
     BOSCH — Climate 3000i (gama entrada, A++)
     =================================================== */
  { id:'bosch-3000i-26', brand:'bosch', series:'Climate 3000i', model:'CL3000i-Set 26 WE',
    btu:9000,  kw:2.6, energyCool:'A++', energyHeat:'A+', noiseIn:25, noiseOut:51,
    tech:['Inverter','R-32','Matter'],
    features:['Função iClean (56°C)','Follow-Me','Filtro anti-bactérias','Alexa / Google Home / Siri'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:699,
    image:IMG.bosch3000i[0], images:IMG.bosch3000i },
  { id:'bosch-3000i-35', brand:'bosch', series:'Climate 3000i', model:'CL3000i-Set 35 WE',
    btu:12000, kw:3.5, energyCool:'A++', energyHeat:'A+', noiseIn:27, noiseOut:53,
    tech:['Inverter','R-32','Matter'],
    features:['Função iClean (56°C)','Follow-Me','Filtro anti-bactérias','Alexa / Google Home / Siri'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:799,
    image:IMG.bosch3000i[0], images:IMG.bosch3000i },
  { id:'bosch-3000i-53', brand:'bosch', series:'Climate 3000i', model:'CL3000i-Set 53 WE',
    btu:18000, kw:5.3, energyCool:'A++', energyHeat:'A+', noiseIn:33, noiseOut:57,
    tech:['Inverter','R-32','Matter'],
    features:['Função iClean (56°C)','Follow-Me','Filtro anti-bactérias','Alexa / Google Home / Siri'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1099,
    image:IMG.bosch3000i[0], images:IMG.bosch3000i },
  { id:'bosch-3000i-70', brand:'bosch', series:'Climate 3000i', model:'CL3000i-Set 70 WE',
    btu:24000, kw:7.0, energyCool:'A++', energyHeat:'A+', noiseIn:38, noiseOut:60,
    tech:['Inverter','R-32','Matter'],
    features:['Função iClean (56°C)','Follow-Me','Filtro anti-bactérias','Alexa / Google Home / Siri'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1399,
    image:IMG.bosch3000i[0], images:IMG.bosch3000i },

  /* ===================================================
     BOSCH — Climate 6000i (gama intermédia, A+++)
     =================================================== */
  { id:'bosch-6000i-26', brand:'bosch', series:'Climate 6000i', model:'CL6000i-Set 26 WE',
    btu:9000,  kw:2.6, energyCool:'A+++', energyHeat:'A++', noiseIn:22, noiseOut:48,
    tech:['Inverter','R-32','WiFi integrado','Matter'],
    features:['Ionizador integrado','Sensor de presença','Controlo de humidade','Filtro avançado','Alexa / Google Home / Siri'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:999,
    image:IMG.bosch6000i[0], images:IMG.bosch6000i },
  { id:'bosch-6000i-35', brand:'bosch', series:'Climate 6000i', model:'CL6000i-Set 35 WE',
    btu:12000, kw:3.5, energyCool:'A+++', energyHeat:'A++', noiseIn:24, noiseOut:50,
    tech:['Inverter','R-32','WiFi integrado','Matter'],
    features:['Ionizador integrado','Sensor de presença','Controlo de humidade','Filtro avançado','Alexa / Google Home / Siri'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1149,
    image:IMG.bosch6000i[0], images:IMG.bosch6000i },
  { id:'bosch-6000i-53', brand:'bosch', series:'Climate 6000i', model:'CL6000i-Set 53 WE',
    btu:18000, kw:5.3, energyCool:'A+++', energyHeat:'A++', noiseIn:30, noiseOut:55,
    tech:['Inverter','R-32','WiFi integrado','Matter'],
    features:['Ionizador integrado','Sensor de presença','Controlo de humidade','Filtro avançado','Alexa / Google Home / Siri'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1449,
    image:IMG.bosch6000i[0], images:IMG.bosch6000i },
  { id:'bosch-6000i-70', brand:'bosch', series:'Climate 6000i', model:'CL6000i-Set 70 WE',
    btu:24000, kw:7.0, energyCool:'A+++', energyHeat:'A++', noiseIn:36, noiseOut:58,
    tech:['Inverter','R-32','WiFi integrado','Matter'],
    features:['Ionizador integrado','Sensor de presença','Controlo de humidade','Filtro avançado','Alexa / Google Home / Siri'],
    colors:[{name:'Branco',hex:'#EFEFEF'}], pvp:1749,
    image:IMG.bosch6000i[0], images:IMG.bosch6000i },

  /* ===================================================
     BOSCH — Climate 7000i (gama premium, A+++ / A+++ — 3 cores)
     =================================================== */
  { id:'bosch-7000i-26', brand:'bosch', series:'Climate 7000i', model:'CL7000i-Set 26 E',
    btu:9000,  kw:2.5, energyCool:'A+++', energyHeat:'A+++', noiseIn:19, noiseOut:46,
    tech:['Inverter','R-32','WiFi integrado','Matter'],
    features:['Ionizador avançado','Modo Silent (19 dB)','Monitorização de energia','Sensor de presença','iF Design Award 2025','Alexa / Google Home / Siri'],
    colors:[{name:'Branco',hex:'#F0F0F0'}], pvp:1399,
    image:IMG.bosch7000iBranco[0], images:IMG.bosch7000iBranco },
  { id:'bosch-7000i-35', brand:'bosch', series:'Climate 7000i', model:'CL7000i-Set 35 E',
    btu:12000, kw:3.5, energyCool:'A+++', energyHeat:'A+++', noiseIn:21, noiseOut:48,
    tech:['Inverter','R-32','WiFi integrado','Matter'],
    features:['Ionizador avançado','Modo Silent (19 dB)','Monitorização de energia','Sensor de presença','iF Design Award 2025','Alexa / Google Home / Siri'],
    colors:[{name:'Branco',hex:'#F0F0F0'}], pvp:1599,
    image:IMG.bosch7000iBranco[0], images:IMG.bosch7000iBranco },
  { id:'bosch-7000i-53', brand:'bosch', series:'Climate 7000i', model:'CL7000i-Set 53 E',
    btu:18000, kw:5.0, energyCool:'A+++', energyHeat:'A+++', noiseIn:26, noiseOut:52,
    tech:['Inverter','R-32','WiFi integrado','Matter'],
    features:['Ionizador avançado','Modo Silent (19 dB)','Monitorização de energia','Sensor de presença','iF Design Award 2025','Alexa / Google Home / Siri'],
    colors:[{name:'Branco',hex:'#F0F0F0'}], pvp:1899,
    image:IMG.bosch7000iBranco[0], images:IMG.bosch7000iBranco },

  /* ===================================================
     DAITSU — Série ARTIC PLUS (DS-KTP-6)
     Classe A+++ arref. / A++ aquec. | WiFi incluído
     Preços Tabela 2025 c/ IVA
     =================================================== */
  {
    id: 'daitsu-artic-plus-9',
    brand: 'daitsu', series: 'ARTIC Plus', model: 'DS-9KTP-6',
    btu: 9000, kw: 2.6,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 37, noiseOut: 52,
    tech: ['Inverter', 'R-32', 'WiFi incluído', 'A+++'],
    features: [
      'Classe A+++ arrefecimento / A++ aquecimento',
      'WiFi incluído',
      '5 filtros de alta eficiência (pó, iões prata, carvão ativo, catequina, vitamina C)',
      'Modo Gentle Air — brisa suave sem correntes diretas',
      'Auto-limpeza do evaporador',
      'Sensor I Feel no telecomando',
      'Swing automático horizontal e vertical',
      'Modo super silencioso (reduz até 2 dB)',
      'Contacto seco ON/OFF',
    ],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 745,
    image: IMG.articPlus[0], images: IMG.articPlus,
  },
  {
    id: 'daitsu-artic-plus-12',
    brand: 'daitsu', series: 'ARTIC Plus', model: 'DS-12KTP-6',
    btu: 12000, kw: 3.5,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 37, noiseOut: 53,
    tech: ['Inverter', 'R-32', 'WiFi incluído', 'A+++'],
    features: [
      'Classe A+++ arrefecimento / A++ aquecimento',
      'WiFi incluído',
      '5 filtros de alta eficiência (pó, iões prata, carvão ativo, catequina, vitamina C)',
      'Modo Gentle Air — brisa suave sem correntes diretas',
      'Auto-limpeza do evaporador',
      'Sensor I Feel no telecomando',
      'Swing automático horizontal e vertical',
      'Modo super silencioso (reduz até 2 dB)',
      'Contacto seco ON/OFF',
    ],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 760,
    image: IMG.articPlus[0], images: IMG.articPlus,
  },
  {
    id: 'daitsu-artic-plus-18',
    brand: 'daitsu', series: 'ARTIC Plus', model: 'DS-18KTP-6',
    btu: 18000, kw: 5.2,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 40, noiseOut: 55,
    tech: ['Inverter', 'R-32', 'WiFi incluído', 'A+++'],
    features: [
      'Classe A+++ arrefecimento / A++ aquecimento',
      'WiFi incluído',
      '5 filtros de alta eficiência (pó, iões prata, carvão ativo, catequina, vitamina C)',
      'Modo Gentle Air — brisa suave sem correntes diretas',
      'Auto-limpeza do evaporador',
      'Sensor I Feel no telecomando',
      'Swing automático horizontal e vertical',
      'Modo super silencioso (reduz até 2 dB)',
      'Contacto seco ON/OFF',
    ],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 1230,
    image: IMG.articPlus[0], images: IMG.articPlus,
  },
  {
    id: 'daitsu-artic-plus-24',
    brand: 'daitsu', series: 'ARTIC Plus', model: 'DS-24KTP-6',
    btu: 24000, kw: 6.9,
    energyCool: 'A+++', energyHeat: 'A++',
    noiseIn: 40, noiseOut: 58,
    tech: ['Inverter', 'R-32', 'WiFi incluído', 'A+++'],
    features: [
      'Classe A+++ arrefecimento / A++ aquecimento',
      'WiFi incluído',
      '5 filtros de alta eficiência (pó, iões prata, carvão ativo, catequina, vitamina C)',
      'Modo Gentle Air — brisa suave sem correntes diretas',
      'Auto-limpeza do evaporador',
      'Sensor I Feel no telecomando',
      'Swing automático horizontal e vertical',
      'Modo super silencioso (reduz até 2 dB)',
      'Contacto seco ON/OFF',
    ],
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    pvp: 1555,
    image: IMG.articPlus[0], images: IMG.articPlus,
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

const AC_ICON = `<svg viewBox="0 0 96 44" width="96" height="44" fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
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

function btuLabel(btu) {
  return (btu / 1000) + 'k BTU';
}

/* =============================================
   GROUP BY SERIES
   ============================================= */

function groupBySeries(products) {
  const map = new Map();
  products.forEach(p => {
    const key = p.brand + '::' + p.series;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(p);
  });
  map.forEach(arr => arr.sort((a, b) => a.btu - b.btu));
  return [...map.values()];
}

function seriesKey(p) {
  return p.brand + '--' + p.series.toLowerCase().replace(/[\s/]+/g, '-');
}

/* =============================================
   SERIES CARD TEMPLATE
   ============================================= */
function seriesCardHTML(group) {
  const first = group[0];
  const sk = seriesKey(first);

  const btuPills = group.map((p, i) =>
    `<button class="btu-pill${i === 0 ? ' active' : ''}" data-sk="${sk}" data-idx="${i}">${btuLabel(p.btu)}</button>`
  ).join('');

  const hasColors = first.colors.length > 1;
  const colorDots = hasColors
    ? first.colors.map(c => `<span class="color-dot" style="background:${c.hex}" title="${c.name}"></span>`).join('')
    : '';

  const tagline = first.tech.join(' · ');

  return `
    <article class="series-card" data-brand="${first.brand}" data-btus="${group.map(p => p.btu).join(',')}" data-sk="${sk}">
      <div class="series-card__img">
        <img src="${first.image}" alt="${BRAND_LABEL[first.brand]} ${first.series}" class="series-card__photo" onerror="this.style.display='none'">
        <div class="series-card__fallback">${AC_ICON}</div>
      </div>
      <div class="series-card__body">
        <div class="series-card__header-row">
          <span class="series-card__brand">${BRAND_LABEL[first.brand]}</span>
          <span id="sc-energy-${sk}">${energyBadge(first.energyCool)}</span>
        </div>
        <h3 class="series-card__name">${first.series}</h3>
        <p class="series-card__tagline">${tagline}</p>
        <div class="series-card__btu-section">
          <span class="series-card__btu-label">Potência disponível</span>
          <div class="btu-pills">${btuPills}</div>
        </div>
        ${hasColors ? `
        <div class="series-card__color-row">
          <span class="series-card__color-label">Cores</span>
          <div class="series-card__color-dots">${colorDots}</div>
        </div>` : ''}
        <div class="series-card__footer">
          <div>
            <span class="price-from">A partir de · c/ IVA</span>
            <span class="price-val" id="sc-price-${sk}">${first.pvp.toLocaleString('pt-PT')} €</span>
          </div>
          <button class="btn btn--primary btn--sm sc-detail-btn" data-sk="${sk}" data-idx="0">Ver detalhes →</button>
        </div>
      </div>
    </article>`;
}

/* =============================================
   MODAL TEMPLATE
   ============================================= */
function modalHTML(p) {
  /* gallery: use colorGallery[first color] or images or fallback to single image */
  const initGallery = (p.colorGallery && p.colors[0])
    ? (p.colorGallery[p.colors[0].name] || p.images || [p.image])
    : (p.images || [p.image]);

  const colorSwatches = p.colors.map((c, i) => `
    <button class="cswatch ${i === 0 ? 'active' : ''}"
      style="background:${c.hex}"
      title="${c.name}"
      data-color="${c.name}">
    </button>`).join('');

  const thumbsHTML = initGallery.map((src, i) => `
    <button class="modal__thumb${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="Foto ${i + 1}">
      <img src="${src}" alt="Foto ${i + 1}" loading="lazy">
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
          <img src="${initGallery[0]}" alt="${BRAND_LABEL[p.brand]} ${p.series} ${p.model}" id="modalImg" onerror="this.style.display='none'" style="cursor:zoom-in">
          <div class="product-card__fallback modal__fallback">${AC_ICON}</div>
          <button class="modal__zoom-btn" id="modalZoomBtn" aria-label="Ampliar imagem">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </button>
        </div>
        ${initGallery.length > 1 ? `
        <div class="modal__thumbs" id="modalThumbs">${thumbsHTML}</div>` : ''}
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
            <span class="modal__price-note">* Preço c/ IVA. Instalação não incluída.</span>
          </div>
          <div class="modal__btn-row">
            <a href="simulador.html" class="btn btn--primary modal-close-trigger">Pedir Orçamento →</a>
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
  const modalBody = document.getElementById('modalBody');
  const closeBtn  = document.getElementById('modalClose');
  const brandTabs = document.querySelectorAll('.ctab');
  const btuSel    = document.getElementById('btuFilter');

  if (!grid) return;

  const allGroups = groupBySeries(PRODUCTS);
  let activeBrand = 'all';
  let activeBtu   = 'all';

  /* ---- Render ---- */
  function render() {
    const filtered = allGroups.filter(group => {
      const brandOk = activeBrand === 'all' || group[0].brand === activeBrand;
      const btuOk   = activeBtu  === 'all' || group.some(p => p.btu === parseInt(activeBtu, 10));
      return brandOk && btuOk;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<p class="catalog__empty">Nenhum modelo encontrado com os filtros selecionados.</p>`;
      return;
    }
    grid.innerHTML = filtered.map(seriesCardHTML).join('');
  }

  /* ---- Card interactions (event delegation) ---- */
  grid.addEventListener('click', e => {
    /* BTU pill */
    const pill = e.target.closest('.btu-pill');
    if (pill) {
      e.stopPropagation();
      const sk  = pill.dataset.sk;
      const idx = parseInt(pill.dataset.idx, 10);
      const group = allGroups.find(g => seriesKey(g[0]) === sk);
      if (!group) return;
      const p = group[idx];

      grid.querySelectorAll(`.btu-pill[data-sk="${sk}"]`).forEach(b => b.classList.remove('active'));
      pill.classList.add('active');

      const priceEl = document.getElementById(`sc-price-${sk}`);
      if (priceEl) priceEl.textContent = p.pvp.toLocaleString('pt-PT') + ' €';

      const energyEl = document.getElementById(`sc-energy-${sk}`);
      if (energyEl) energyEl.innerHTML = energyBadge(p.energyCool);

      const detailBtn = grid.querySelector(`.sc-detail-btn[data-sk="${sk}"]`);
      if (detailBtn) detailBtn.dataset.idx = idx;
      return;
    }

    /* Detail button */
    const detailBtn = e.target.closest('.sc-detail-btn');
    if (detailBtn) {
      e.stopPropagation();
      const sk  = detailBtn.dataset.sk;
      const idx = parseInt(detailBtn.dataset.idx, 10);
      const group = allGroups.find(g => seriesKey(g[0]) === sk);
      if (group) openModal(group[idx].id);
      return;
    }

    /* Card body click → open for currently selected BTU */
    const card = e.target.closest('.series-card');
    if (card) {
      const sk  = card.dataset.sk;
      const btn = card.querySelector('.sc-detail-btn');
      const idx = btn ? parseInt(btn.dataset.idx, 10) : 0;
      const group = allGroups.find(g => seriesKey(g[0]) === sk);
      if (group) openModal(group[idx].id);
    }
  });

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

  /* ---- Auto-filter from URL param (?brand=daikin#catalogo) ---- */
  const urlBrand = new URLSearchParams(location.search).get('brand');
  if (urlBrand) {
    const tab = [...brandTabs].find(t => t.dataset.brand === urlBrand);
    if (tab) {
      brandTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeBrand = urlBrand;
      render();
    }
  }

  /* ---- Modal ---- */
  function openModal(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;

    modalBody.innerHTML = modalHTML(p);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    /* gallery state */
    let currentGallery = (p.colorGallery && p.colors[0])
      ? (p.colorGallery[p.colors[0].name] || p.images || [p.image])
      : (p.images || [p.image]);
    let currentIdx = 0;

    const modalImg   = document.getElementById('modalImg');
    const modalThumbs = document.getElementById('modalThumbs');

    /* switch to photo by index */
    function switchToIdx(idx) {
      currentIdx = idx;
      modalImg.src = currentGallery[idx];
      modalImg.style.display = '';
      if (modalThumbs) {
        modalThumbs.querySelectorAll('.modal__thumb').forEach((t, i) => {
          t.classList.toggle('active', i === idx);
        });
      }
    }

    /* rebuild thumbnails when color changes */
    function rebuildThumbs(gallery) {
      currentGallery = gallery;
      currentIdx = 0;
      modalImg.src = gallery[0];
      modalImg.style.display = '';
      if (modalThumbs) {
        modalThumbs.innerHTML = gallery.map((src, i) => `
          <button class="modal__thumb${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="Foto ${i + 1}">
            <img src="${src}" alt="Foto ${i + 1}" loading="lazy">
          </button>`).join('');
        bindThumbClicks();
      }
    }

    function bindThumbClicks() {
      if (!modalThumbs) return;
      modalThumbs.querySelectorAll('.modal__thumb').forEach(thumb => {
        thumb.addEventListener('click', () => switchToIdx(parseInt(thumb.dataset.idx, 10)));
      });
    }
    bindThumbClicks();

    /* lightbox */
    function openLightbox(startIdx) {
      let lbIdx = startIdx;
      const lb = document.createElement('div');
      lb.className = 'gal-lb-overlay';
      lb.innerHTML = `
        <button class="gal-lb-close" aria-label="Fechar">✕</button>
        <button class="gal-lb-prev" aria-label="Anterior">&#8249;</button>
        <img class="gal-lb-img" src="${currentGallery[lbIdx]}" alt="">
        <button class="gal-lb-next" aria-label="Seguinte">&#8250;</button>
        <span class="gal-lb-counter">${lbIdx + 1} / ${currentGallery.length}</span>`;
      document.body.appendChild(lb);

      const lbImg    = lb.querySelector('.gal-lb-img');
      const counter  = lb.querySelector('.gal-lb-counter');

      function goTo(idx) {
        lbIdx = (idx + currentGallery.length) % currentGallery.length;
        lbImg.src = currentGallery[lbIdx];
        counter.textContent = `${lbIdx + 1} / ${currentGallery.length}`;
      }

      if (currentGallery.length <= 1) {
        lb.querySelector('.gal-lb-prev').style.display = 'none';
        lb.querySelector('.gal-lb-next').style.display = 'none';
        lb.querySelector('.gal-lb-counter').style.display = 'none';
      }

      lb.querySelector('.gal-lb-close').addEventListener('click', () => lb.remove());
      lb.querySelector('.gal-lb-prev').addEventListener('click', e => { e.stopPropagation(); goTo(lbIdx - 1); });
      lb.querySelector('.gal-lb-next').addEventListener('click', e => { e.stopPropagation(); goTo(lbIdx + 1); });
      lb.addEventListener('click', e => { if (e.target === lb) lb.remove(); });

      function lbKey(e) {
        if (!document.body.contains(lb)) { document.removeEventListener('keydown', lbKey); return; }
        if (e.key === 'ArrowLeft')  goTo(lbIdx - 1);
        else if (e.key === 'ArrowRight') goTo(lbIdx + 1);
        else if (e.key === 'Escape') { lb.remove(); document.removeEventListener('keydown', lbKey); }
      }
      document.addEventListener('keydown', lbKey);
    }

    /* zoom button + main image click → lightbox */
    const zoomBtn = document.getElementById('modalZoomBtn');
    if (zoomBtn) zoomBtn.addEventListener('click', () => openLightbox(currentIdx));
    if (modalImg) modalImg.addEventListener('click', () => openLightbox(currentIdx));

    /* color swatches → switch gallery */
    modalBody.querySelectorAll('.cswatch').forEach(sw => {
      sw.addEventListener('click', () => {
        modalBody.querySelectorAll('.cswatch').forEach(s => s.classList.remove('active'));
        sw.classList.add('active');
        const colorName = sw.dataset.color;
        if (p.colorGallery && p.colorGallery[colorName]) {
          rebuildThumbs(p.colorGallery[colorName]);
        }
      });
    });

    modal.querySelector('.modal__overlay').addEventListener('click', closeModal);
    modalBody.querySelectorAll('.modal-close-trigger').forEach(el => {
      el.addEventListener('click', closeModal);
    });
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ---- Init ---- */
  render();
})();

/* =============================================
   SOLAR AQS — PRODUCTS
   ============================================= */
const SOLAR_ICON = `<svg viewBox="0 0 96 96" width="48" height="48" fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="4" stroke-linecap="round">
  <circle cx="48" cy="48" r="16"/>
  <line x1="48" y1="8"  x2="48" y2="22"/>
  <line x1="48" y1="74" x2="48" y2="88"/>
  <line x1="8"  y1="48" x2="22" y2="48"/>
  <line x1="74" y1="48" x2="88" y2="48"/>
  <line x1="22" y1="22" x2="31" y2="31"/>
  <line x1="65" y1="65" x2="74" y2="74"/>
  <line x1="74" y1="22" x2="65" y2="31"/>
  <line x1="31" y1="65" x2="22" y2="74"/>
</svg>`;

const SOLAR_PRODUCTS = [
  /* ---- BOSCH ---- */
  {
    id: 'bosch-solar-fcc-200',
    brand: 'bosch', series: 'Solar FCC 220', model: 'FCC 220 Kit 200L',
    capacity: 200, energyClass: 'A++', pvp: 1890,
    image: 'assets/products/bosch-solar-fcc.jpg',
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    tagline: 'Coletor plano · Termossifão',
    features: ['Coletor plano FCC 220-2V de alta eficiência', 'Depósito 200 L', 'Kit completo de instalação', 'Proteção antibacteriana (55°C)'],
    specs: [{ label: 'Volume', val: '200 L' }, { label: 'Coletores', val: '2 painéis planos' }, { label: 'Área captação', val: '3,84 m²' }, { label: 'Pressão máx.', val: '6 bar' }],
  },
  {
    id: 'bosch-solar-fcc-300',
    brand: 'bosch', series: 'Solar FCC 220', model: 'FCC 220 Kit 300L',
    capacity: 300, energyClass: 'A++', pvp: 2490,
    image: 'assets/products/bosch-solar-fcc.jpg',
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    tagline: 'Coletor plano · Termossifão',
    features: ['Coletor plano FCC 220-2V de alta eficiência', 'Depósito 300 L', 'Kit completo de instalação', 'Proteção antibacteriana (55°C)'],
    specs: [{ label: 'Volume', val: '300 L' }, { label: 'Coletores', val: '3 painéis planos' }, { label: 'Área captação', val: '5,76 m²' }, { label: 'Pressão máx.', val: '6 bar' }],
  },
  {
    id: 'bosch-compress-190',
    brand: 'bosch', series: 'Compress 3000 AWBS', model: 'AWBS 8-190 P',
    capacity: 190, energyClass: 'A+', pvp: 1690,
    image: 'assets/products/bosch-compress.jpg',
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    tagline: 'Bomba de calor · AQS',
    features: ['Bomba de calor integrada', 'COP 3,5', 'Compatível com modo solar', 'Painel de controlo LCD'],
    specs: [{ label: 'Volume', val: '190 L' }, { label: 'COP', val: '3,5' }, { label: 'Temp. máx.', val: '62°C' }, { label: 'Pressão máx.', val: '8,7 bar' }],
  },
  {
    id: 'bosch-compress-290',
    brand: 'bosch', series: 'Compress 3000 AWBS', model: 'AWBS 8-290 P',
    capacity: 290, energyClass: 'A+', pvp: 2190,
    image: 'assets/products/bosch-compress.jpg',
    colors: [{ name: 'Branco', hex: '#EFEFEF' }],
    tagline: 'Bomba de calor · AQS',
    features: ['Bomba de calor integrada', 'COP 3,5', 'Compatível com modo solar', 'Painel de controlo LCD'],
    specs: [{ label: 'Volume', val: '290 L' }, { label: 'COP', val: '3,5' }, { label: 'Temp. máx.', val: '62°C' }, { label: 'Pressão máx.', val: '8,7 bar' }],
  },
];

/* =============================================
   SOLAR — GROUP BY SERIES
   ============================================= */
function groupBySolarSeries(products) {
  const map = new Map();
  products.forEach(p => {
    const key = p.brand + '::' + p.series;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(p);
  });
  map.forEach(arr => arr.sort((a, b) => a.capacity - b.capacity));
  return [...map.values()];
}

function solarSeriesKey(p) {
  return p.brand + '--' + p.series.toLowerCase().replace(/[\s/]+/g, '-');
}

/* =============================================
   SOLAR — CARD TEMPLATE
   ============================================= */
function solarSeriesCardHTML(group) {
  const first = group[0];
  const sk = solarSeriesKey(first);

  const capPills = group.map((p, i) =>
    `<button class="btu-pill${i === 0 ? ' active' : ''}" data-sk="${sk}" data-idx="${i}">${p.capacity}L</button>`
  ).join('');

  return `
    <article class="series-card" data-brand="${first.brand}" data-sk="${sk}">
      <div class="series-card__img">
        <img src="${first.image}" alt="${BRAND_LABEL[first.brand]} ${first.series}" class="series-card__photo" onerror="this.style.display='none'">
        <div class="series-card__fallback">${SOLAR_ICON}</div>
      </div>
      <div class="series-card__body">
        <div class="series-card__header-row">
          <span class="series-card__brand">${BRAND_LABEL[first.brand]}</span>
          <span id="sc-energy-${sk}">${energyBadge(first.energyClass)}</span>
        </div>
        <h3 class="series-card__name">${first.series}</h3>
        <p class="series-card__tagline">${first.tagline}</p>
        <div class="series-card__btu-section">
          <span class="series-card__btu-label">Volume disponível</span>
          <div class="btu-pills">${capPills}</div>
        </div>
        <div class="series-card__footer">
          <div>
            <span class="price-from">A partir de · c/ IVA</span>
            <span class="price-val" id="sc-price-${sk}">${first.pvp.toLocaleString('pt-PT')} €</span>
          </div>
          <button class="btn btn--primary btn--sm sc-detail-btn" data-sk="${sk}" data-idx="0">Ver detalhes →</button>
        </div>
      </div>
    </article>`;
}

/* =============================================
   SOLAR — MODAL TEMPLATE
   ============================================= */
function solarModalHTML(p) {
  const featureList = p.features.map(f => `<li>${f}</li>`).join('');
  const specRows = p.specs.map(s => `
    <div class="spec-row">
      <span class="spec-row__label">${s.label}</span>
      <span class="spec-row__val">${s.val}</span>
    </div>`).join('');

  const waMsg = encodeURIComponent(
    `Olá ARTICOCLIMA! 👋\n` +
    `Tenho interesse no sistema solar ${BRAND_LABEL[p.brand]} ${p.series} — ${p.model} (${p.capacity}L).\n` +
    `Podiam dar-me mais informações e disponibilidade?`
  );

  return `
    <div class="modal__layout">
      <div class="modal__img-col">
        <div class="modal__img-wrap brand-bg--${p.brand}" id="modalImgWrap">
          <img src="${p.image}" alt="${BRAND_LABEL[p.brand]} ${p.series}" id="modalImg" onerror="this.style.display='none'">
          <div class="product-card__fallback modal__fallback">${SOLAR_ICON}</div>
        </div>
      </div>
      <div class="modal__info-col">
        <p class="modal__brand-name">${BRAND_LABEL[p.brand]}</p>
        <p class="modal__series-name">${p.series}</p>
        <h2 class="modal__model-name">${p.model}</h2>
        <div class="modal__energy-row">
          <div class="modal__energy-item">
            ${energyBadge(p.energyClass)}
            <span>Eficiência</span>
          </div>
          <div class="modal__energy-item">
            <span class="energy-badge energy--a" style="min-width:44px;justify-content:center">${p.capacity}L</span>
            <span>Volume</span>
          </div>
        </div>
        <div class="modal__specs">${specRows}</div>
        <div class="modal__features">
          <p class="modal__features-label">Características</p>
          <ul>${featureList}</ul>
        </div>
        <div class="modal__cta">
          <div class="modal__price-block">
            <span class="modal__price-label">PVP a partir de</span>
            <span class="modal__price-val">${p.pvp.toLocaleString('pt-PT')}€</span>
            <span class="modal__price-note">* Preço c/ IVA. Sujeito a confirmação.</span>
          </div>
          <div class="modal__btn-row">
            <a href="index.html#contacto" class="btn btn--primary modal-close-trigger">Pedir Orçamento →</a>
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
   SOLAR CATALOG INIT
   ============================================= */
(function initSolarCatalog() {
  const grid      = document.getElementById('solarGrid');
  const modal     = document.getElementById('catalogModal');
  const modalBody = document.getElementById('modalBody');
  const closeBtn  = document.getElementById('modalClose');
  const brandTabs = document.querySelectorAll('.ctab');

  if (!grid) return;

  const allGroups = groupBySolarSeries(SOLAR_PRODUCTS);
  let activeBrand = 'all';

  function render() {
    const filtered = allGroups.filter(g =>
      activeBrand === 'all' || g[0].brand === activeBrand
    );
    if (filtered.length === 0) {
      grid.innerHTML = `<p class="catalog__empty">Nenhum modelo encontrado.</p>`;
      return;
    }
    grid.innerHTML = filtered.map(solarSeriesCardHTML).join('');
  }

  grid.addEventListener('click', e => {
    const pill = e.target.closest('.btu-pill');
    if (pill) {
      const sk = pill.dataset.sk;
      const idx = parseInt(pill.dataset.idx, 10);
      const group = allGroups.find(g => solarSeriesKey(g[0]) === sk);
      if (group) {
        grid.querySelectorAll(`.btu-pill[data-sk="${sk}"]`).forEach(b => b.classList.remove('active'));
        pill.classList.add('active');
        const p = group[idx];
        const priceEl = document.getElementById('sc-price-' + sk);
        if (priceEl) priceEl.textContent = p.pvp.toLocaleString('pt-PT') + ' €';
      }
      return;
    }
    const card = e.target.closest('.series-card');
    if (card) {
      const sk = card.dataset.sk;
      const activePill = card.querySelector('.btu-pill.active');
      const idx = activePill ? parseInt(activePill.dataset.idx, 10) : 0;
      const group = allGroups.find(g => solarSeriesKey(g[0]) === sk);
      if (group) openSolarModal(group[idx].id);
    }
  });

  brandTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      brandTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeBrand = tab.dataset.brand;
      render();
    });
  });

  function openSolarModal(id) {
    const p = SOLAR_PRODUCTS.find(x => x.id === id);
    if (!p) return;
    modalBody.innerHTML = solarModalHTML(p);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalBody.querySelector('.modal-close-trigger')?.addEventListener('click', closeSolarModal);
  }

  function closeSolarModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeSolarModal);
  modal.querySelector('.modal__overlay').addEventListener('click', closeSolarModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSolarModal(); });

  const urlBrand = new URLSearchParams(location.search).get('brand');
  if (urlBrand) {
    const tab = [...brandTabs].find(t => t.dataset.brand === urlBrand);
    if (tab) { brandTabs.forEach(t => t.classList.remove('active')); tab.classList.add('active'); activeBrand = urlBrand; }
  }

  render();
})();
