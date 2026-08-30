'use client';

import { useState } from 'react';
import {
  Baby,
  Check,
  GraduationCap,
  Heart,
  LayoutDashboard,
  Sparkles,
  Users,
} from 'lucide-react';
import './screens-showcase.css';

const screens = [
  {
    id: 'gestao',
    label: 'Direção & Gestão',
    icon: LayoutDashboard,
    title: 'A escola inteira na palma da sua mão',
    description:
      'Painel em tempo real com matrículas, inadimplência zero, fluxo de caixa, comunicados disparados e relatórios estatísticos para decisões rápidas.',
    pills: [
      'Dashboard com indicadores financeiros e pedagógicos',
      'Controle de turmas, vagas e matrículas em tempo real',
      'Envio de comunicados em massa com 1 clique',
    ],
    image: '/screens-admin.png?v=4',
    color: '#2563eb',
    lightBg: '#eff6ff',
    badge: 'Controle Total 360°',
  },
  {
    id: 'professor',
    label: 'Diário do Educador',
    icon: GraduationCap,
    title: 'Menos burocracia, mais tempo com as crianças',
    description:
      'Diário de classe moderno e acolhedor: registro de presença ilustrado, planejamento de aulas BNCC, envio de fotos de atividades e pareceres avaliativos.',
    pills: [
      'Chamada de presença em segundos com foto dos alunos',
      'Campos de experiência BNCC prontos para preencher',
      'Registro de atividades lúdicas e fotos da turminha',
    ],
    image: '/screens-professor.png?v=4',
    color: '#ff8500',
    lightBg: '#fff7ed',
    badge: 'Feito para Professores',
  },
  {
    id: 'familia',
    label: 'App da Família & Pais',
    icon: Heart,
    color: '#ff5e5e',
    lightBg: '#fef2f2',
    badge: 'Aproximação e Afeto',
    title: 'Pais encantados e presentes em cada conquista',
    description:
      'Aplicativo completo para os responsáveis acompanharem o diário do bebê, recados da professora, fotos do dia a dia, cardápio escolar e 2ª via de mensalidades.',
    pills: [
      'Agenda do dia com mamadeiras, soneca e alimentação',
      'Fotos e vídeos em alta resolução para guardar de recordação',
      'Pagamento fácil no Pix e boletos sem sair de casa',
    ],
    image: '/screens-familia.png?v=4',
  },
  {
    id: 'aluno',
    label: 'Espaço do Aluninho',
    icon: Baby,
    color: '#8b5cf6',
    lightBg: '#f5f3ff',
    badge: 'Lúdico & Gamificado',
    title: 'Aprender vira uma divertida aventura!',
    description:
      'Ambiente digital alegre com tarefas interativas, biblioteca de historinhas infantis, medalhas por participação e mural de recados acolhedor.',
    pills: [
      'Conquistas, estrelinhas e medalhas de incentivo',
      'Acesso fácil às atividades e historinhas recomendadas',
      'Interface colorida e intuitiva pensada para os pequenos',
    ],
    image: '/screens-aluno.png?v=4',
  },
];

export function ScreensShowcase() {
  const [active, setActive] = useState(0);
  const current = screens[active];
  const Icon = current.icon;

  return (
    <section className="screens-section" id="sistema">
      <div className="screens-intro">
        <div className="eyebrow">
          <Sparkles size={14} /> Telas Reais do Sistema
        </div>
        <h2>
          Um único sistema. <span>Quatro experiências</span>
          <br />
          feitas sob medida.
        </h2>
        <p>
          Veja como o Saberio funciona na prática para a direção, professores, famílias e pequenos aprendizes.
        </p>
      </div>

      <div className="screen-tabs" role="tablist">
        {screens.map((item, index) => {
          const TabIcon = item.icon;
          const isSelected = active === index;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isSelected}
              className={`screen-tab-btn ${isSelected ? 'active' : ''}`}
              onClick={() => setActive(index)}
              style={{ '--tab-color': item.color } as React.CSSProperties}
            >
              <TabIcon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div
        className="screen-stage-box"
        style={
          {
            '--screen-color': current.color,
            '--accent-light': current.lightBg,
          } as React.CSSProperties
        }
      >
        <div className="screen-copy-side">
          <span className="screen-badge-role">
            <Icon size={16} />
            {current.badge}
          </span>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          <div className="screen-pills-list">
            {current.pills.map((pill, i) => (
              <div className="screen-pill-item" key={i}>
                <Check size={16} />
                <span>{pill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="screen-window-frame">
          <div className="browser-bar-header">
            <div className="browser-dots">
              <span />
              <span />
              <span />
            </div>
            <div className="browser-url-pill">app.saberio.com.br/demo</div>
          </div>
          <img
            src={current.image}
            alt={`Tela do perfil ${current.label} no sistema Saberio`}
            className="screen-preview-img"
          />
        </div>
      </div>
    </section>
  );
}
