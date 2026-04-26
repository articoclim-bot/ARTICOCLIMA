const http = require('http');
const fs = require('fs');
const path = require('path');

// Carrega .env se existir (sem npm)
try {
  fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split('\n').forEach(line => {
    const eq = line.indexOf('=');
    if (eq > 0) {
      const k = line.slice(0, eq).trim();
      const v = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (k && !process.env[k]) process.env[k] = v;
    }
  });
} catch {}

const PORT = process.env.PORT || 8080;
const DATA_DIR = path.join(__dirname, 'data');
const COUNTER_FILE = path.join(DATA_DIR, 'counter.json');
const QUOTES_FILE = path.join(DATA_DIR, 'orcamentos.json');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

function json(res, data, status = 200) {
  const body = JSON.stringify(data);
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(body);
}

function readJson(filePath, fallback) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); }
  catch { return fallback; }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function loadCatalogs() {
  const brands = ['daitsu', 'daikin', 'bosch'];
  const catalogs = [];
  for (const b of brands) {
    const f = path.join(DATA_DIR, `catalogo_${b}.json`);
    if (fs.existsSync(f)) catalogs.push(readJson(f, {}));
  }
  return catalogs;
}

async function callClaude(systemPrompt, userMessage) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY não definida');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-7',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.content[0].text;
}

async function handleSugerir(req, res) {
  let body = '';
  req.on('data', c => body += c);
  req.on('end', async () => {
    try {
      const payload = JSON.parse(body);
      const { descricao, catalogText: clientCatalog } = payload;
      if (!descricao) return json(res, { erro: 'descricao obrigatória' }, 400);

      let catalogText = clientCatalog;
      if (!catalogText) {
        const catalogs = loadCatalogs();
        catalogText = catalogs.map(c =>
          `=== ${c.marca} ===\n` +
          (c.produtos || []).map(p => {
            const pvp = p.pvp_com_iva || (p.pvp_sem_iva ? Math.round(p.pvp_sem_iva * 1.23) : '?');
            return `${p.nome} | ${p.tipo} | ${p.kw_frio}kW | ${p.btu ? p.btu + 'BTU | ' : ''}${pvp}€ c/IVA`;
          }).join('\n')
        ).join('\n\n');
      }

      const system = `És um especialista em climatização. Dado o pedido do técnico, sugere TODAS as opções relevantes para o cliente.

REGRAS OBRIGATÓRIAS:
- Apresenta opções de TODAS as marcas disponíveis (Daikin, Bosch, Daitsu)
- Para pedidos de múltiplas divisões: inclui SEMPRE opção multi-split (kit completo) E opção mono-splits individuais
- Ordena por relação qualidade/preço (melhor primeiro)
- Todos os preços são COM IVA 23% incluído
- Cada opção precisa de uma justificação de venda (2-3 frases) para o técnico apresentar ao cliente

Devolve APENAS JSON válido (sem markdown, sem texto extra):
{
  "resumo": "1 frase resumo da necessidade",
  "kw_recomendado": 3.5,
  "opcoes": [
    {
      "posicao": 1,
      "titulo": "Bosch Climate 3200i 35 — Mono-split",
      "marca": "Bosch",
      "produto_id": "bosch-3200i-35",
      "modelo": "CL3200i-Set 35 WE",
      "tipo": "mono_split",
      "kw": 3.5,
      "btu": 12000,
      "classe": "A++",
      "pvp_unitario": 996,
      "imagem": "assets/products/bosch-3200i-new-1.jpg",
      "justificacao": "Texto de venda 2-3 frases.",
      "unidades": [
        { "descricao": "Bosch Climate 3200i Set 35 WE (kit split)", "qty": 1, "pvp": 996 }
      ]
    }
  ]
}

CATÁLOGOS:
${catalogText}`;

      const resposta = await callClaude(system, descricao);

      let opcoes;
      try {
        const match = resposta.match(/\{[\s\S]*\}/);
        opcoes = JSON.parse(match ? match[0] : resposta);
      } catch {
        return json(res, { erro: 'Resposta inválida do Claude', raw: resposta }, 500);
      }

      json(res, opcoes);
    } catch (e) {
      json(res, { erro: e.message }, 500);
    }
  });
}

function handleGerarOrcamento(req, res) {
  let body = '';
  req.on('data', c => body += c);
  req.on('end', () => {
    try {
      const dados = JSON.parse(body);
      if (!dados.itens || dados.itens.length === 0) return json(res, { erro: 'itens obrigatório' }, 400);

      if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

      const counter = readJson(COUNTER_FILE, { ultimo_orcamento: 0 });
      counter.ultimo_orcamento += 1;
      writeJson(COUNTER_FILE, counter);

      const numero = counter.ultimo_orcamento;
      const ano = new Date().getFullYear();
      const numero_formatado = `ORC-${ano}-${String(numero).padStart(4, '0')}`;

      const orcamento = {
        numero,
        numero_formatado,
        data: new Date().toISOString(),
        categoria: dados.categoria || 'ac',
        cliente: dados.cliente || '',
        itens: dados.itens || [],
        opcoes: dados.opcoes || null,
        instalacao: dados.instalacao || null,
        desconto: dados.desconto || 0,
        notas: dados.notas || '',
        justificacao: dados.justificacao || '',
        total_com_iva: dados.total_com_iva || null,
      };

      const orcamentos = readJson(QUOTES_FILE, []);
      orcamentos.push(orcamento);
      writeJson(QUOTES_FILE, orcamentos);

      json(res, { sucesso: true, orcamento });
    } catch (e) {
      json(res, { erro: e.message }, 500);
    }
  });
}

function handleListarOrcamentos(req, res) {
  const orcamentos = readJson(QUOTES_FILE, []);
  json(res, orcamentos.slice().reverse());
}

function handleGetOrcamento(req, res, id) {
  const orcamentos = readJson(QUOTES_FILE, []);
  const orc = orcamentos.find(o => o.numero === parseInt(id) || o.numero_formatado === id);
  if (!orc) return json(res, { erro: 'Orçamento não encontrado' }, 404);
  json(res, orc);
}

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }

  const url = req.url.split('?')[0];

  if (req.method === 'POST' && url === '/api/sugerir') return handleSugerir(req, res);
  if (req.method === 'POST' && url === '/api/gerar-orcamento') return handleGerarOrcamento(req, res);
  if (req.method === 'GET' && url === '/api/orcamentos') return handleListarOrcamentos(req, res);
  if (req.method === 'GET' && url.startsWith('/api/orcamentos/')) {
    const id = url.split('/').pop();
    return handleGetOrcamento(req, res, id);
  }

  const filePath = path.join(__dirname, url === '/' ? 'index.html' : url);
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'text/plain';

  fs.stat(filePath, (err, stat) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }

    if (stat.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (err2) => {
        if (err2) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(indexPath).pipe(res);
      });
      return;
    }

    const total = stat.size;
    const rangeHeader = req.headers['range'];

    if (rangeHeader) {
      const [startStr, endStr] = rangeHeader.replace('bytes=', '').split('-');
      const start = parseInt(startStr, 10);
      const end = endStr ? parseInt(endStr, 10) : Math.min(start + 1024 * 1024, total - 1);
      const chunkSize = end - start + 1;
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { 'Accept-Ranges': 'bytes', 'Content-Length': total, 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    }
  });
}).listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));
