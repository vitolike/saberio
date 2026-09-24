import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ReceiptText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Retorno do checkout',
  description:
    'Confira a confirmação do seu pagamento na InfinitePay e os próximos passos para ativar o Saberio.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/pagamento-concluido' },
};

export default function PaymentComplete() {
  return (
    <main
      style={{
        minHeight: '100svh',
        display: 'grid',
        placeItems: 'center',
        padding: '64px 24px',
        background: '#f5f8fc',
        color: '#15294a',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          padding: 'clamp(28px, 6vw, 64px)',
          background: '#fff',
          border: '1px solid #e0e7ef',
          borderRadius: 24,
        }}
      >
        <Link
          href="/"
          aria-label="Saberio, página inicial"
          style={{
            display: 'inline-block',
            marginBottom: 48,
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 28,
            color: '#15294a',
            textDecoration: 'none',
          }}
        >
          saberio<span style={{ color: '#2563eb' }}>.</span>
        </Link>
        <ReceiptText
          aria-hidden="true"
          size={36}
          strokeWidth={1.5}
          style={{ color: '#2563eb', marginBottom: 24 }}
        />
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#2563eb',
            marginBottom: 12,
          }}
        >
          Próximos passos
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(30px, 5vw, 42px)',
            lineHeight: 1.12,
            letterSpacing: '-0.035em',
            marginBottom: 24,
          }}
        >
          Confira a confirmação do pagamento.
        </h1>
        <p style={{ lineHeight: 1.7, color: '#52617a', marginBottom: 16 }}>
          Você está na página de retorno do checkout. Consulte o status e o
          comprovante do pagamento na InfinitePay.
        </p>
        <p style={{ lineHeight: 1.7, color: '#52617a', marginBottom: 32 }}>
          Após a confirmação do pagamento, nossa equipe entrará em contato para
          orientar a ativação do seu acesso ao Saberio.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            minHeight: 48,
            padding: '12px 20px',
            borderRadius: 10,
            background: '#2563eb',
            color: '#fff',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          <ArrowLeft aria-hidden="true" size={18} /> Voltar para o Saberio
        </Link>
      </div>
    </main>
  );
}
