# Saberio

Landing page da marca Saberio e do Sistema Escola V2.

## Deploy

```bash
npm install
npm run dev
```

Na Vercel, configure as variáveis do arquivo `.env.example` para ativar os IDs reais de Meta Pixel, Google Analytics/Ads e TikTok Pixel. A página captura e preserva `utm_source`, `utm_medium`, `utm_campaign`, `utm_term` e `utm_content` em `sessionStorage`.

Eventos disponíveis: `LeadIntent`, `Lead`, `LoginClick`, `VideoClick` e `ModuleClick`.
