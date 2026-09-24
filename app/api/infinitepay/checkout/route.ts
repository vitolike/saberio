import { NextRequest, NextResponse } from 'next/server';

const plans = {
  sementinha: { description: 'Plano Sementinha - Saberio', price: 50000 },
  crescer: { description: 'Plano Crescer - Saberio', price: 178000 },
  'voar-alto': { description: 'Plano Voar Alto - Saberio', price: 580000 },
  grandao: { description: 'Plano Grandão - Saberio', price: 1500000 },
} as const;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const plan = body && typeof body === 'object' ? body.plan : undefined;

  if (
    typeof plan !== 'string' ||
    !Object.prototype.hasOwnProperty.call(plans, plan)
  ) {
    return NextResponse.json(
      { error: 'Selecione um plano válido para continuar.' },
      { status: 400 },
    );
  }

  const selectedPlan = plans[plan as keyof typeof plans];
  const handle = process.env.INFINITEPAY_HANDLE?.trim();
  if (!handle) {
    return NextResponse.json(
      {
        error:
          'O checkout está temporariamente indisponível. Fale com nossa equipe.',
      },
      { status: 503 },
    );
  }

  let response: Response;
  try {
    response = await fetch('https://api.checkout.infinitepay.io/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        handle,
        items: [
          {
            quantity: 1,
            price: selectedPlan.price,
            description: selectedPlan.description,
          },
        ],
        order_nsu: `saberio-${plan}-${Date.now()}`,
        redirect_url: `${(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saberio.com.br').replace(/\/$/, '')}/pagamento-concluido`,
      }),
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'TimeoutError';
    return NextResponse.json(
      {
        error: timedOut
          ? 'O checkout demorou para responder. Tente novamente.'
          : 'Não foi possível conectar ao checkout. Tente novamente.',
      },
      { status: timedOut ? 504 : 502 },
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Não foi possível criar o checkout.' },
      { status: 502 },
    );
  }

  const data = await response.json().catch(() => null);
  const checkoutUrl = data?.url || data?.link || data?.checkout_url;
  if (typeof checkoutUrl === 'string') {
    try {
      const url = new URL(checkoutUrl);
      if (url.protocol === 'https:' && !url.username && !url.password) {
        return NextResponse.json({ checkoutUrl: url.href });
      }
    } catch {
      // A malformed provider response must not redirect the customer.
    }
  }
  return NextResponse.json(
    { error: 'A InfinitePay não retornou um link válido. Tente novamente.' },
    { status: 502 },
  );
}
