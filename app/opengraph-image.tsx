/* oxlint-disable next/no-img-element -- ImageResponse renders static images; next/image is unsupported here. */
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt =
  'Saberio: sistema de gestão escolar, financeiro e agenda digital';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const [logo, screen] = await Promise.all([
    readFile(join(process.cwd(), 'public/saberio-logo-v3.png'), 'base64'),
    readFile(join(process.cwd(), 'public/screens-admin.png'), 'base64'),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 64px',
        background: '#f8fbff',
        color: '#132c50',
        fontFamily: 'sans-serif',
      }}
    >
      <img
        src={`data:image/png;base64,${logo}`}
        alt="Saberio"
        width="270"
        height="90"
      />
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 44 }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: 480 }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              letterSpacing: '-2px',
              lineHeight: 1.08,
            }}
          >
            Mais tempo para educar.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              marginTop: 28,
              color: '#49607b',
            }}
          >
            Gestão escolar, financeiro e famílias conectados em um só lugar.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            width: 548,
            padding: 12,
            border: '1px solid #d7e6f7',
            borderRadius: 20,
            background: '#ffffff',
            boxShadow: '0 20px 40px rgba(19, 44, 80, 0.12)',
          }}
        >
          <img
            src={`data:image/jpeg;base64,${screen}`}
            alt="Painel de gestão escolar do Saberio"
            width="522"
            height="232"
            style={{ borderRadius: 10 }}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 21,
        }}
      >
        <span style={{ color: '#49607b' }}>
          Sistema de gestão escolar e agenda digital
        </span>
        <span style={{ color: '#1766d5', fontWeight: 700 }}>
          Conheça o Saberio
        </span>
      </div>
    </div>,
    size,
  );
}
