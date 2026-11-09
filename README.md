# AIB-C01 · Banco de questões bilíngue (EN / PT-BR)

Banco de questões de prática para a certificação **AWS Certified AI Business Strategist (AIB-C01)**, em inglês e português do Brasil, num formato JSON pronto para apps.

- **340 questões** de cenário, 85 por domínio (24 de múltipla resposta)
- Justificativa para **cada alternativa**, nos dois idiomas
- Gabarito único, compartilhado entre os idiomas

## Origem e créditos

As questões em inglês são do projeto [zghanw/aws-ai-business-strategist](https://github.com/zghanw/aws-ai-business-strategist) (licença MIT), no commit `e9e87eb`. Este repositório converte os arquivos `.js` originais para JSON e acrescenta uma **tradução não oficial para PT-BR**.

As questões não são oficiais da AWS e não vêm do exame real.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `data/questions.json` | Array com as 340 questões, nos dois idiomas |
| `data/manifest.json` | Versão, commit de origem e contagens |
| `scripts/check.js` | Validação de integridade (`node scripts/check.js`) |

## Formato

```json
{
  "id": "d1-23",
  "domain": 1,
  "correct": [0, 2],
  "multi": true,
  "en": { "scenario": "...", "question": "...", "options": ["..."], "rationales": ["..."] },
  "pt": { "scenario": "...", "question": "...", "options": ["..."], "rationales": ["..."] }
}
```

As alternativas e justificativas de `pt` seguem a mesma ordem de `en`, então os índices de `correct` valem para os dois idiomas.

| Domínio | Peso no exame |
|---|---|
| 1. Fundamentos e letramento em IA | 24% |
| 2. Estratégia de IA e criação de valor | 28% |
| 3. Governança e IA responsável | 24% |
| 4. Prontidão, liderança e transformação | 24% |

## Uso

```js
const URL = "https://raw.githubusercontent.com/michellemeloc/aib-c01-questions/<commit>/data/questions.json";
const questions = await fetch(URL).then((r) => r.json());
```

Fixe a URL em um commit para que o conteúdo não mude sem aviso.

## Licença

MIT. Veja [LICENSE](LICENSE).
