// Verifica a integridade do banco bilíngue. Uso: node scripts/check.js
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'questions.json');
const Q = JSON.parse(fs.readFileSync(file, 'utf8'));
const TASKS = new Set(JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'tasks.json'), 'utf8')).map((t) => t.id));
const errs = [];
const ids = new Set();

for (const q of Q) {
  const e = (m) => errs.push(`${q.id}: ${m}`);
  if (ids.has(q.id)) e('id duplicado');
  ids.add(q.id);
  if (![1, 2, 3, 4].includes(q.domain)) e('domínio inválido');
  if (!TASKS.has(q.task) || q.task[0] !== String(q.domain)) e('task inválida ou de outro domínio');
  if (!q.correct.length || q.correct.some((i) => !(i in q.en.options))) e('gabarito inválido');
  if (q.multi !== q.correct.length > 1) e('flag multi inconsistente');
  for (const lang of ['en', 'pt']) {
    const t = q[lang];
    if (!t) { e(`sem idioma ${lang}`); continue; }
    if (!t.scenario || !t.question) e(`${lang}: texto vazio`);
    if (t.options.length !== q.en.options.length) e(`${lang}: número de alternativas difere`);
    if (t.rationales.length !== t.options.length) e(`${lang}: justificativas não batem com alternativas`);
  }
  const WORD = { 2: 'DUAS', 3: 'TRÊS', 4: 'QUATRO' };
  const tag = q.pt.question.match(/\(Selecione (\S+)\.\)/);
  if (q.multi ? tag?.[1] !== WORD[q.correct.length] : tag) e('pt: marcação "Selecione N" não bate com o gabarito');
}

const by = [1, 2, 3, 4].map((d) => Q.filter((q) => q.domain === d).length);
console.log(`${Q.length} questões · por domínio ${by.join(' / ')} · múltipla resposta ${Q.filter((q) => q.multi).length}`);
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
console.log('OK');
