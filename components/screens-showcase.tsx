'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { animate, createScope, stagger } from 'animejs';
import { useMotionEnabled } from '@/lib/motion-preference';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  GraduationCap,
  LayoutDashboard,
  Users,
} from 'lucide-react';
import './screens-showcase.css';

const screens = [
  {
    id: 'gestao',
    label: 'Direção',
    icon: LayoutDashboard,
    title: 'A visão que você precisa para decidir.',
    description:
      'Acompanhe a operação da escola em um painel que reúne os principais dados da gestão.',
    features: [
      'Alunos, turmas e matrículas',
      'Financeiro e mensalidades',
      'Agenda, comunicados e relatórios',
    ],
    image: '/screens-admin.png',
    width: 1521,
    height: 675,
    alt: 'Painel da direção do Saberio com alunos ativos, turmas, compromissos e resumo financeiro',
  },
  {
    id: 'professor',
    label: 'Professores',
    icon: GraduationCap,
    title: 'Mais organização para quem ensina.',
    description:
      'Aulas, presença e atividades da turma em um só lugar, para simplificar a rotina pedagógica.',
    features: [
      'Diário de classe e frequência',
      'Aulas, tarefas e banco de questões',
      'Comunicados para os responsáveis',
    ],
    image: '/screens-professor.png',
    width: 1265,
    height: 712,
    alt: 'Painel do professor no Saberio com aulas, diário de classe, banco de questões e avisos às famílias',
  },
  {
    id: 'familia',
    label: 'Famílias',
    icon: Users,
    title: 'A escola mais perto da família.',
    description:
      'Dê aos responsáveis um espaço para acompanhar a vida escolar dos filhos e falar com a escola.',
    features: [
      'Comunicados e calendário escolar',
      'Atividades e acompanhamento do aluno',
      'Consulta de mensalidades e pagamentos',
    ],
    image: '/screens-familia.png',
    width: 1521,
    height: 675,
    alt: 'Portal da família no Saberio com informações do aluno, aulas, tarefas e calendário escolar',
  },
  {
    id: 'aluno',
    label: 'Alunos',
    icon: BookOpen,
    title: 'Tudo pronto para a próxima descoberta.',
    description:
      'Um ambiente que organiza os conteúdos da turma e ajuda o aluno a acompanhar suas atividades.',
    features: [
      'Aulas e conteúdos da turma',
      'Tarefas e avaliações',
      'Biblioteca e leituras digitais',
    ],
    image: '/screens-aluno.png',
    width: 1265,
    height: 712,
    alt: 'Portal do aluno no Saberio com acesso às aulas, tarefas, provas e biblioteca digital',
  },
];

export function ScreensShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const root = useRef<HTMLElement>(null);
  const motionEnabled = useMotionEnabled();

  useEffect(() => {
    if (!motionEnabled || !root.current) return;
    const scope = createScope({ root }).add(() => {
      animate('.screen-stage-box:not([hidden]) .screen-copy-side > *', {
        y: [28, 0],
        opacity: [0, 1],
        delay: stagger(80),
        duration: 700,
        ease: 'out(3)',
      });
      animate('.screen-stage-box:not([hidden]) .screen-window-frame', {
        y: [40, 0],
        scale: [0.95, 1],
        opacity: [0, 1],
        duration: 900,
        ease: 'out(3)',
      });
    });
    return () => scope.revert();
  }, [active, motionEnabled]);

  function navigateTabs(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % screens.length;
    else if (event.key === 'ArrowLeft')
      next = (index - 1 + screens.length) % screens.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = screens.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section
      ref={root}
      className="screens-section"
      id="sistema"
      aria-labelledby="screens-title"
    >
      <div className="screens-container">
        <div className="screens-intro" data-reveal>
          <h2 id="screens-title">
            Uma escola conectada.
            <br />
            <span>Cada pessoa no seu espaço.</span>
          </h2>
          <p>
            Explore as telas do Saberio e veja como direção, professores,
            famílias e alunos participam da mesma rotina.
          </p>
        </div>
        <div
          className="screen-tabs"
          role="tablist"
          aria-label="Perfis de acesso ao Saberio"
        >
          {screens.map((screen, index) => {
            const Icon = screen.icon;
            return (
              <button
                key={screen.id}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                id={`screen-tab-${screen.id}`}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls={`screen-panel-${screen.id}`}
                tabIndex={active === index ? 0 : -1}
                className="screen-tab-btn"
                onClick={() => setActive(index)}
                onKeyDown={(event) => navigateTabs(event, index)}
              >
                <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                {screen.label}
              </button>
            );
          })}
        </div>
        <div className="screen-panels" data-reveal>
          {screens.map((screen, index) => (
            <div
              key={screen.id}
              id={`screen-panel-${screen.id}`}
              role="tabpanel"
              aria-labelledby={`screen-tab-${screen.id}`}
              tabIndex={0}
              hidden={active !== index}
              className="screen-stage-box"
            >
              <div className="screen-copy-side">
                <h3>{screen.title}</h3>
                <p>{screen.description}</p>
                <ul className="screen-benefits">
                  {screen.features.map((feature) => (
                    <li key={feature}>
                      <Check size={17} strokeWidth={1.8} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  className="screen-expand-link"
                  href={screen.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ampliar tela: ${screen.label} (abre em nova aba)`}
                >
                  Ampliar tela{' '}
                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </a>
              </div>
              <div className="screen-window-frame">
                <Image
                  src={screen.image}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 96px), 810px"
                  className="screen-preview-img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
