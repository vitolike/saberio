'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Baby,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  CreditCard,
  GraduationCap,
  HeartHandshake,
  Layers3,
  Mail,
  Menu,
  MessageCircle,
  School,
  Sprout,
  Users,
  X,
} from 'lucide-react';
import { FeatureModules } from '@/components/feature-modules';
import { ScreensShowcase } from '@/components/screens-showcase';
import { LandingMotion } from '@/components/landing-motion';
import { trackEvent, captureCampaign } from '@/lib/marketing';

const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(
  /\D/g,
  '',
);
const contactEmail = 'contato@saberio.com.br';
const hasWhatsapp = /^55\d{10,11}$/.test(whatsapp);
const audiences = [
  {
    icon: Baby,
    title: 'Berçário e Educação Infantil',
    description:
      'Alimentação, sonecas, fotos e recados. A rotina dos pequenos mais próxima de quem cuida.',
  },
  {
    icon: GraduationCap,
    title: 'Ensino Fundamental e Médio',
    description:
      'Presença, notas e planejamento pedagógico organizados para acompanhar cada etapa da aprendizagem.',
  },
  {
    icon: School,
    title: 'Direção e mantenedores',
    description:
      'Matrículas, mensalidades e indicadores reunidos para decidir com mais clareza.',
  },
  {
    icon: HeartHandshake,
    title: 'Famílias e responsáveis',
    description:
      'Comunicados, atividades e informações financeiras em um lugar fácil de acompanhar.',
  },
];
const pricingPlans = [
  {
    name: 'Sementinha',
    id: 'sementinha',
    icon: Sprout,
    limit: 'Até 50 alunos',
    description: 'Para começar a organizar a escola.',
    price: '500',
    featured: false,
    features: [
      'Agenda Digital e Diário Baby',
      'Fotos e recados para as famílias',
      'Cobrança por Pix e boleto',
      'Presença e histórico escolar',
      'Suporte via WhatsApp',
    ],
  },
  {
    name: 'Crescer',
    id: 'crescer',
    icon: School,
    limit: 'Até 200 alunos',
    description: 'Para conectar a gestão e o ensino.',
    price: '1.780',
    featured: true,
    features: [
      'Tudo do plano Sementinha',
      'Matrículas e contratos digitais',
      'Diário do professor com BNCC',
      'Régua de cobrança por WhatsApp',
      'Portaria e relatórios pedagógicos',
    ],
  },
  {
    name: 'Voar Alto',
    id: 'voar-alto',
    icon: GraduationCap,
    limit: 'Até 600 alunos',
    description: 'Para uma operação mais completa.',
    price: '5.800',
    featured: false,
    features: [
      'Todos os módulos do sistema',
      'Fluxo de caixa e relatórios',
      'Portaria integrada com catracas',
      'Gerente de conta e suporte prioritário',
      'Treinamento ao vivo para a equipe',
    ],
  },
];
const faqs = [
  {
    question: 'O Saberio atende qual tipo de escola?',
    answer:
      'O Saberio reúne recursos para berçários, Educação Infantil, Ensino Fundamental e Médio. Os planos atendem diferentes números de alunos, e redes de ensino podem conversar com a equipe sobre o plano Grandão.',
  },
  {
    question: 'Posso conhecer o sistema antes de contratar?',
    answer:
      'Sim. Solicite uma demonstração gratuita para conhecer os recursos com a equipe. O teste de 7 dias está disponível no plano Sementinha e deve ser solicitado no botão “Solicitar teste grátis”. Os botões “Contratar” iniciam a contratação paga.',
  },
  {
    question: 'Como funciona a migração dos dados?',
    answer:
      'Na demonstração, conte qual sistema ou planilha sua escola usa. A equipe avalia os dados, o formato de importação e o cronograma de implantação. O plano Crescer inclui migração de dados gratuita.',
  },
  {
    question: 'Famílias e professores também têm acesso?',
    answer:
      'Sim. O sistema possui ambientes para gestão, professores, famílias e alunos. Você pode conhecer as telas de cada perfil nesta página e conferir os recursos incluídos no plano com a equipe.',
  },
  {
    question: 'Como funcionam as cobranças e a contratação?',
    answer:
      'Os planos incluem recursos de cobrança por Pix e boleto para as mensalidades escolares. Para contratar o Saberio, os botões dos planos Sementinha, Crescer e Voar Alto abrem o checkout da InfinitePay. Confira o valor e as condições no checkout antes de pagar.',
  },
  {
    question: 'Minha escola tem mais de 600 alunos. Qual plano escolher?',
    answer:
      'Converse com a equipe sobre o plano Grandão, a partir de R$ 15.000 por mês. Ele contempla redes, franquias e gestão de múltiplas unidades, com uma proposta adequada à operação da escola.',
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoIntent, setDemoIntent] = useState('Demonstração gratuita');
  const [contactReady, setContactReady] = useState(false);
  const [contactLink, setContactLink] = useState('');
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<{
    plan: string;
    message: string;
  } | null>(null);
  const [studentCount, setStudentCount] = useState(120);
  const [minutesPerStudent, setMinutesPerStudent] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(25);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const checkoutPending = useRef(false);
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    captureCampaign();
    const observer = new IntersectionObserver(([entry]) =>
      setShowMobileCta(!entry.isIntersecting),
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);
  const openDemo = (intent = 'Demonstração gratuita', source = 'page') => {
    openerRef.current = document.activeElement as HTMLElement;
    setDemoIntent(intent);
    setContactReady(false);
    setMenuOpen(false);
    dialogRef.current?.showModal();
    trackEvent('LeadIntent', { source, intent });
  };
  const closeDemo = () => dialogRef.current?.close();
  const handleLeadSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => {
      const value = data.get(name);
      return typeof value === 'string' ? value.trim() : '';
    };
    const message = `Olá! Tenho interesse em ${demoIntent.toLowerCase()} do Saberio.\n\nNome: ${field('name')}\nEscola: ${field('school')}\nWhatsApp: ${field('phone')}\nE-mail: ${field('email')}`;
    const url = hasWhatsapp
      ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
      : `mailto:${contactEmail}?subject=${encodeURIComponent(`${demoIntent} - Saberio`)}&body=${encodeURIComponent(message)}`;
    setContactLink(url);
    setContactReady(true);
    trackEvent('ContactHandoff', {
      channel: hasWhatsapp ? 'whatsapp' : 'email',
      intent: demoIntent,
    });
    // The visitor sends the message in their app. This is not a confirmed lead.
    if (hasWhatsapp) window.open(url, '_blank', 'noopener,noreferrer');
    else window.location.href = url;
  };
  const startCheckout = async (plan: string) => {
    if (checkoutPending.current) return;
    checkoutPending.current = true;
    setCheckoutPlan(plan);
    setCheckoutError(null);
    trackEvent('LeadIntent', { source: 'pricing', plan, intent: 'checkout' });
    try {
      const response = await fetch('/api/infinitepay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (!response.ok || !data.checkoutUrl) throw new Error('checkout');
      const destination = new URL(data.checkoutUrl);
      if (destination.protocol !== 'https:') throw new Error('checkout');
      window.location.assign(destination.href);
    } catch {
      setCheckoutError({
        plan,
        message:
          'Não foi possível abrir o pagamento. Tente novamente ou fale com a equipe para contratar.',
      });
      trackEvent('CheckoutError', { plan });
    } finally {
      checkoutPending.current = false;
      setCheckoutPlan(null);
    }
  };
  const hours = (studentCount * minutesPerStudent) / 60;
  const currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
  return (
    <div className="landing-page">
      <LandingMotion />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="announcement">
        <span>Conheça o Saberio na prática.</span>
        <button
          onClick={() =>
            openDemo(
              'Teste grátis de 7 dias do plano Sementinha',
              'announcement',
            )
          }
        >
          7 dias grátis no Sementinha <ArrowRight size={14} />
        </button>
      </div>
      <header className="site-header">
        <nav className="site-nav container" aria-label="Menu principal">
          <a href="#inicio" className="brand" aria-label="Saberio, início">
            <Image
              src="/saberio-logo-v3.png"
              alt="Saberio"
              width={2172}
              height={724}
              sizes="180px"
              priority
            />
          </a>
          <div className="nav-links">
            <a href="#para-quem">Para Quem É</a>
            <a href="#modulos">Módulos</a>
            <a href="#planos">Planos &amp; Preços</a>
            <a href="#duvidas">Dúvidas</a>
          </div>
          <button
            className="button button-primary nav-cta"
            onClick={() => openDemo('Demonstração gratuita', 'header')}
          >
            Agendar demonstração <ArrowRight size={17} />
          </button>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        {menuOpen && (
          <nav id="mobile-menu" className="mobile-menu" aria-label="Menu móvel">
            <a href="#para-quem" onClick={() => setMenuOpen(false)}>
              Para Quem É
            </a>
            <a href="#modulos" onClick={() => setMenuOpen(false)}>
              Módulos
            </a>
            <a href="#planos" onClick={() => setMenuOpen(false)}>
              Planos &amp; Preços
            </a>
            <a href="#duvidas" onClick={() => setMenuOpen(false)}>
              Dúvidas
            </a>
            <button
              className="button button-primary"
              onClick={() => openDemo('Demonstração gratuita', 'mobile_menu')}
            >
              Agendar demonstração <ArrowRight size={17} />
            </button>
          </nav>
        )}
      </header>
      <main id="conteudo">
        <section id="inicio" className="hero container" ref={heroRef}>
          <div className="hero-copy">
            <span className="eyebrow" data-hero>
              <BookOpen size={17} /> SISTEMA DE GESTÃO ESCOLAR
            </span>
            <h1 data-hero>
              Menos burocracia.
              <br />
              <span>Mais escola.</span>
            </h1>
            <p data-hero>
              Matrículas, financeiro e famílias em um só sistema. Simplifique a
              gestão e ganhe tempo para o que importa: educar.
            </p>
            <div className="hero-actions" data-hero>
              <button
                className="button button-primary"
                onClick={() => openDemo('Demonstração gratuita', 'hero')}
              >
                Agendar demonstração <ArrowRight size={18} />
              </button>
              <a href="#sistema" className="button button-text">
                Conhecer o sistema <ArrowDown size={17} />
              </a>
            </div>
          </div>
          <figure className="hero-visual" data-hero-visual>
            <div className="hero-visual-heading">
              <span>
                <Layers3 size={17} /> Tudo conectado
              </span>
              <span>Gestão escolar</span>
            </div>
            <div className="hero-screen">
              <Image
                src="/screens-admin.png"
                alt="Painel do Saberio com acesso a alunos, matrículas, financeiro e comunicados da escola"
                width={1521}
                height={675}
                sizes="(max-width: 900px) 94vw, 55vw"
                priority
              />
            </div>
            <figcaption>
              <span className="icon-tile">
                <School size={24} />
              </span>
              <div>
                <strong>Uma visão completa da sua escola.</strong>
                <span>Da secretaria à sala de aula, no mesmo lugar.</span>
              </div>
              <ArrowRight size={20} />
            </figcaption>
          </figure>
        </section>
        <div
          className="benefits-strip container"
          aria-label="Recursos principais"
        >
          <span>
            <CreditCard /> Financeiro organizado
          </span>
          <span>
            <BookOpen /> Rotina pedagógica integrada
          </span>
          <span>
            <MessageCircle /> Famílias mais próximas
          </span>
          <span>
            <Users /> Acesso por perfil
          </span>
        </div>
        <ScreensShowcase />
        <section id="para-quem" className="section audience-section container">
          <div className="section-heading" data-reveal>
            <h2>
              Cada escola tem uma rotina.
              <br />
              <span>O Saberio conecta todas elas.</span>
            </h2>
            <p>
              Ferramentas para quem administra, ensina e acompanha cada
              conquista.
            </p>
          </div>
          <div className="audience-grid">
            {audiences.map(({ icon: Icon, title, description }) => (
              <article className="audience-item" key={title} data-reveal>
                <span className="icon-tile">
                  <Icon size={25} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <FeatureModules />
        <section id="calculadora" className="section container">
          <div className="calculator" data-reveal>
            <div className="calculator-copy">
              <span className="eyebrow">
                <Clock3 size={17} /> TEMPO PARA EDUCAR
              </span>
              <h2>
                O tempo da sua equipe
                <br />
                também tem valor.
              </h2>
              <p>
                Simule o valor de reduzir tarefas manuais. Ajuste as premissas à
                realidade da sua escola.
              </p>
              <label className="range-label" htmlFor="students">
                Alunos na escola{' '}
                <output htmlFor="students">{studentCount}</output>
              </label>
              <input
                id="students"
                type="range"
                min="20"
                max="1000"
                step="10"
                value={studentCount}
                onChange={(event) =>
                  setStudentCount(Number(event.target.value))
                }
                onPointerUp={() =>
                  trackEvent('CalculatorUse', { students: studentCount })
                }
              />
              <div className="range-limits">
                <span>20 alunos</span>
                <span>1.000 alunos</span>
              </div>
              <div className="calculator-inputs">
                <label htmlFor="minutes">
                  Minutos poupados por aluno/mês
                  <input
                    id="minutes"
                    type="number"
                    min="1"
                    max="120"
                    value={minutesPerStudent}
                    onChange={(event) =>
                      setMinutesPerStudent(
                        Math.min(120, Math.max(1, Number(event.target.value))),
                      )
                    }
                  />
                </label>
                <label htmlFor="hourly-cost">
                  Custo da hora da equipe (R$)
                  <input
                    id="hourly-cost"
                    type="number"
                    min="1"
                    max="500"
                    value={hourlyCost}
                    onChange={(event) =>
                      setHourlyCost(
                        Math.min(500, Math.max(1, Number(event.target.value))),
                      )
                    }
                  />
                </label>
              </div>
            </div>
            <div className="calculator-result">
              <span className="icon-tile">
                <Clock3 size={26} />
              </span>
              <p>Tempo potencialmente liberado</p>
              <div className="result-hours" aria-live="polite">
                <strong>
                  {hours.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}
                </strong>
                <span>horas / mês</span>
              </div>
              <div className="result-value">
                <span>Valor equivalente em horas de trabalho</span>
                <strong>
                  {currency.format(hours * hourlyCost)}
                  <small>/mês</small>
                </strong>
              </div>
              <p className="calculator-note">
                Simulação: alunos × minutos ÷ 60 × custo/hora. Não representa
                uma garantia de economia e não desconta o valor do plano.
              </p>
              <a className="button button-primary" href="#planos">
                Encontrar meu plano <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <section id="planos" className="section pricing-section container">
          <div className="section-heading" data-reveal>
            <h2>
              Um plano para cada
              <br />
              <span>momento da sua escola.</span>
            </h2>
            <p>Compare os recursos, conheça o sistema e escolha com clareza.</p>
          </div>
          <div className="pricing-grid">
            {pricingPlans.map((plan) => {
              const Icon = plan.icon;
              return (
                <article
                  className={`pricing-card ${plan.featured ? 'featured' : ''}`}
                  key={plan.id}
                  data-reveal
                >
                  <div className="plan-heading">
                    <span className="icon-tile">
                      <Icon size={24} />
                    </span>
                    {plan.featured && (
                      <span className="plan-badge">Gestão + pedagógico</span>
                    )}
                  </div>
                  <h3>{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                  <span className="plan-limit">{plan.limit}</span>
                  <div className="plan-price">
                    <span>R$</span>
                    <strong>{plan.price}</strong>
                    <small>/mês</small>
                  </div>
                  <button
                    className={`button ${plan.featured ? 'button-primary' : 'button-outline'}`}
                    disabled={checkoutPlan !== null}
                    aria-busy={checkoutPlan === plan.id}
                    onClick={() => startCheckout(plan.id)}
                  >
                    {checkoutPlan === plan.id
                      ? 'Abrindo pagamento...'
                      : `Contratar ${plan.name}`}
                    <ArrowRight size={17} />
                  </button>
                  {checkoutError?.plan === plan.id && (
                    <div className="checkout-error" role="alert">
                      <p>{checkoutError.message}</p>
                      <button
                        onClick={() =>
                          openDemo(
                            `Contratação do plano ${plan.name}`,
                            'checkout_error',
                          )
                        }
                      >
                        Falar com a equipe
                      </button>
                    </div>
                  )}
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={17} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.id === 'sementinha' && (
                    <button
                      className="text-link plan-trial"
                      onClick={() =>
                        openDemo(
                          'Teste grátis de 7 dias do plano Sementinha',
                          'pricing_trial',
                        )
                      }
                    >
                      Solicitar teste grátis de 7 dias <ArrowRight size={15} />
                    </button>
                  )}
                  {plan.id === 'crescer' && (
                    <p className="plan-footnote">
                      Migração de dados gratuita incluída.
                    </p>
                  )}
                </article>
              );
            })}
          </div>
          <div className="enterprise-plan" data-reveal>
            <span className="icon-tile">
              <School size={26} />
            </span>
            <div>
              <h3>Grandão. Para redes e grandes escolas.</h3>
              <p>
                Multiunidades, alunos ilimitados e uma proposta para sua
                operação. A partir de <strong>R$ 15.000/mês.</strong>
              </p>
            </div>
            <button
              className="button button-outline"
              onClick={() =>
                openDemo('Proposta do plano Grandão', 'enterprise')
              }
            >
              Falar com a equipe <ArrowRight size={17} />
            </button>
          </div>
          <p className="pricing-note">
            <CreditCard size={16} /> Contratação via InfinitePay. Confira as
            condições de pagamento no checkout.
          </p>
        </section>
        <section className="section onboarding-section container">
          <div className="onboarding-intro" data-reveal>
            <h2>
              O próximo passo
              <br />
              <span>pode ser simples.</span>
            </h2>
            <p>Conheça a plataforma com a sua rotina em mente.</p>
            <button
              className="text-link"
              onClick={() => openDemo('Demonstração gratuita', 'onboarding')}
            >
              Agendar demonstração <ArrowRight size={18} />
            </button>
          </div>
          <ol className="onboarding-list">
            <li data-reveal>
              <span className="icon-tile">
                <MessageCircle size={23} />
              </span>
              <div>
                <h3>Conte sobre a sua escola</h3>
                <p>
                  Compartilhe os desafios da gestão e o que sua equipe precisa
                  simplificar.
                </p>
              </div>
            </li>
            <li data-reveal>
              <span className="icon-tile">
                <Layers3 size={23} />
              </span>
              <div>
                <h3>Veja o Saberio em ação</h3>
                <p>
                  Conheça os módulos e tire suas dúvidas em uma demonstração
                  guiada.
                </p>
              </div>
            </li>
            <li data-reveal>
              <span className="icon-tile">
                <GraduationCap size={23} />
              </span>
              <div>
                <h3>Planeje a implantação</h3>
                <p>
                  Combine com a equipe o plano, a migração e os próximos passos.
                </p>
              </div>
            </li>
          </ol>
        </section>
        <section id="duvidas" className="section faq-section container">
          <div className="section-heading" data-reveal>
            <h2>Vamos tirar suas dúvidas?</h2>
            <p>O que você precisa saber antes de começar.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>
                  {faq.question}
                  <ChevronDown size={20} />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="final-cta container" data-reveal>
          <div className="final-cta-icon" aria-hidden="true">
            <BookOpen size={44} strokeWidth={1.5} />
          </div>
          <h2>
            Mais perto das famílias.
            <br />
            <span>Mais tempo para educar.</span>
          </h2>
          <p>Descubra como o Saberio pode fazer parte da sua escola.</p>
          <button
            className="button button-primary"
            onClick={() => openDemo('Demonstração gratuita', 'final_cta')}
          >
            Agendar demonstração gratuita <ArrowRight size={18} />
          </button>
        </section>
      </main>
      <footer className="site-footer container">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href="#inicio" aria-label="Saberio, início">
              <Image
                src="/saberio-logo-v3.png"
                alt="Saberio"
                width={2172}
                height={724}
                sizes="180px"
              />
            </a>
            <p>
              Gestão que simplifica.
              <br />
              Educação que aproxima.
            </p>
          </div>
          <div>
            <h3>O sistema</h3>
            <a href="#para-quem">Para Quem É</a>
            <a href="#modulos">Módulos</a>
            <a href="#sistema">Conheça as telas</a>
          </div>
          <div>
            <h3>Sua escola</h3>
            <a href="#planos">Planos &amp; Preços</a>
            <a href="#calculadora">Simule seu tempo</a>
            <a href="#duvidas">Dúvidas</a>
          </div>
          <div>
            <h3>Vamos conversar</h3>
            <a href={`mailto:${contactEmail}`}>
              <Mail size={16} /> {contactEmail}
            </a>
            {hasWhatsapp && (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} /> WhatsApp comercial
              </a>
            )}
            <button
              className="text-link"
              onClick={() => openDemo('Demonstração gratuita', 'footer')}
            >
              Agendar demonstração <ArrowRight size={15} />
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © 2026 Saberio · Vco Consultoria LTDA - CNPJ: 67.168.092/0001-94.
          </span>
          <span>Feito para quem transforma o futuro.</span>
        </div>
      </footer>
      <div
        className={`mobile-cta ${showMobileCta && !menuOpen ? 'visible' : ''}`}
        inert={!showMobileCta || menuOpen}
      >
        <span>
          Conheça o Saberio<strong>Demonstração gratuita</strong>
        </span>
        <button
          className="button button-primary"
          onClick={() => openDemo('Demonstração gratuita', 'mobile_sticky')}
        >
          Agendar <ArrowRight size={16} />
        </button>
      </div>
      <dialog
        className="lead-dialog"
        ref={dialogRef}
        aria-labelledby="demo-title"
        onClose={() => {
          if (openerRef.current?.isConnected) openerRef.current.focus();
          else
            document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
        }}
      >
        <div className="dialog-content">
          <button
            className="dialog-close"
            onClick={closeDemo}
            aria-label="Fechar demonstração"
          >
            <X size={22} />
          </button>
          <span className="icon-tile">
            <MessageCircle size={26} />
          </span>
          <p className="dialog-intent">{demoIntent}</p>
          <h2 id="demo-title">Vamos conhecer sua escola?</h2>
          <p>
            Conte um pouco sobre você para preparar a conversa com a equipe.
          </p>
          <form onSubmit={handleLeadSubmit}>
            <label htmlFor="lead-name">
              Seu Nome
              <input
                id="lead-name"
                name="name"
                autoComplete="name"
                placeholder="Como podemos chamar você?"
                maxLength={120}
                required
              />
            </label>
            <label htmlFor="lead-school">
              Nome da sua Escola
              <input
                id="lead-school"
                name="school"
                autoComplete="organization"
                placeholder="Nome da instituição"
                maxLength={160}
                required
              />
            </label>
            <label htmlFor="lead-phone">
              WhatsApp com DDD
              <input
                id="lead-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="(11) 99999-8888"
                pattern={'[0-9+\\(\\) .\\-]{10,20}'}
                title="Informe o telefone com DDD, entre 10 e 20 caracteres."
                maxLength={20}
                required
              />
            </label>
            <label htmlFor="lead-email">
              E-mail Profissional
              <input
                id="lead-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="voce@suaescola.com.br"
                maxLength={180}
                required
              />
            </label>
            <button className="button button-primary" type="submit">
              {hasWhatsapp ? 'Continuar no WhatsApp' : 'Continuar por e-mail'}
              <ArrowRight size={18} />
            </button>
          </form>
          <p className="form-note">
            {hasWhatsapp
              ? 'Você poderá revisar e enviar a mensagem no WhatsApp.'
              : 'Seu aplicativo de e-mail abrirá com a mensagem pronta para você revisar e enviar.'}
          </p>
          {contactReady && (
            <output className="contact-status">
              <strong>Sua mensagem está pronta.</strong>
              <p>Conclua o envio no aplicativo para falar com a equipe.</p>
              <a
                href={contactLink}
                target={hasWhatsapp ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                Abrir {hasWhatsapp ? 'WhatsApp' : 'e-mail'} novamente{' '}
                <ArrowRight size={15} />
              </a>
            </output>
          )}
        </div>
      </dialog>
    </div>
  );
}
