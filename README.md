# Saberio

Landing page da marca Saberio e do Sistema Escola V2.

## Deploy

```bash
npm install
npm run dev
```

Configure `NEXT_PUBLIC_WHATSAPP_NUMBER` com o WhatsApp comercial real, incluindo 55 e DDD, somente números. Sem essa variável, o formulário prepara uma mensagem para `contato@saberio.com.br` no aplicativo de e-mail do visitante. O visitante revisa e envia a mensagem; abrir o aplicativo não confirma o recebimento de um lead.

### Conversão e medição

A página preserva `utm_source`, `utm_medium`, `utm_campaign`, `utm_term` e `utm_content` em `sessionStorage` e inclui os parâmetros nos eventos do `window.dataLayer`. Eventos: `LeadIntent`, `ContactHandoff`, `CheckoutError` e `CalculatorUse`. Dados pessoais do formulário não são enviados aos eventos. Configure um coletor de analytics/tag manager e o consentimento aplicável antes de usar esses eventos em campanhas; apenas definir IDs de GA/Meta/TikTok não carrega esses serviços.

Os botões de demonstração e teste gratuito preparam contato com a equipe. Os botões “Contratar” iniciam o checkout pago. A calculadora é uma simulação baseada em premissas editáveis, não uma promessa de economia.

### SEO e interface

Título, descrição, canonical, Open Graph, Twitter e JSON-LD estão em `app/layout.tsx`. `/opengraph-image` gera a imagem de compartilhamento. `/sitemap.xml` inclui a página comercial, e `/robots.txt` bloqueia a API. O retorno do pagamento usa `noindex`. Fontes são servidas localmente por `next/font` e imagens por `next/image`.

As animações com Anime.js seguem `prefers-reduced-motion` por padrão. O botão “Ativar/Pausar animações” permite escolher para esta página e conserva a escolha na sessão da aba, sem alterar o sistema operacional. Há entrada sequenciada, revelações ao rolar, transições nas abas e movimento da prévia, pausado quando sai da tela.

```bash
npm run build
npm run lint
npm test
```

## InfinitePay

Configure `INFINITEPAY_HANDLE` com sua InfiniteTag (sem `$`). O domínio padrão é `https://www.saberio.com.br`; defina `NEXT_PUBLIC_SITE_URL` apenas para sobrescrevê-lo em previews ou outros ambientes. Os botões dos planos Sementinha, Crescer e Voar Alto criam o checkout via `/api/infinitepay/checkout`.

O retorno do checkout não verifica a transação nem ativa o sistema automaticamente. A confirmação deve ser consultada na InfinitePay. Para ativação automática, integre a verificação do pagamento com o provisionamento do sistema.
