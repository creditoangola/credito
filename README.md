# Crédito.ao

Site em Astro 5 para simular, comparar e pedir crédito em Angola. Paleta toda em verdes (sem azul).

## Arrancar
```bash
npm install
cp .env.example .env     # preencha WhatsApp, endpoint, verificações
npm run dev              # desenvolvimento
npm run build && npm run seo   # build + verificação de SEO (densidade, títulos, schemas)
```

## Estrutura
- `src/data/products.ts`: copy, simulador, documentos, etapas e FAQ de cada produto. **Preencha `prazoResposta` e `prazoDinheiro`** com os prazos reais de cada banco assim que os confirmar.
- `src/data/banks.ts`: bancos e taxas. Só aparecem os `published: true`, sempre com fonte.
- `src/data/seo.ts`: title, description e palavras-chave por página.
- `src/content/blog/`: artigos (3 por produto + 2 gerais). Cada produto mostra 3 artigos relacionados no fim.
- `src/components/LeadWizard.astro` + `src/scripts/wizard.ts`: formulário em 5 passos que grava cada passo (ver `docs/receber-pedidos.md`).
- `src/assets/photos/LEIA-ME.md`: lista de fotografias a produzir.

## Antes de publicar
1. `PUBLIC_LEAD_ENDPOINT`: sem isto os pedidos **não ficam guardados**.
2. `PUBLIC_WHATSAPP`, e-mail em `src/data/site.ts`.
3. `PUBLIC_BNA_REGISTRO`: o intermediário tem de estar registado no BNA (Aviso 4/22).
4. Páginas legais são rascunhos: revisão do advogado.
5. Compromissos escritos no site que tem de cumprir: "0 Kz para simular e pedir" e "dizemos-lhe o prazo previsto do banco".
6. Registe o site no Google Search Console, Bing Webmaster e Yandex Webmaster e ponha os códigos no `.env`.
