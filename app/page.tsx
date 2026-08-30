'use client';

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Baby,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  FileCheck,
  GraduationCap,
  Heart,
  HelpCircle,
  Laptop,
  Lock,
  Menu,
  MessageCircle,
  MessageSquare,
  Phone,
  Play,
  QrCode,
  School,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { FeatureModules } from '@/components/feature-modules';
import { ScreensShowcase } from '@/components/screens-showcase';

const audiences = [
  {
    emoji: '🧸',
    title: 'Berçário & Educação Infantil',
    description:
      'Diário do bebê com mamadeiras, sonecas e trocas de fralda em tempo real. Fotos diárias e recadinhos que derretem o coração dos pais.',
    tags: ['Agenda Baby', 'Fotos do Dia', 'Remédios & Alergias', 'Saída Segura'],
    accent: '#ff6b6b',
    bg: '#ffecec',
  },
  {
    emoji: '📚',
    title: 'Ensino Fundamental & Médio',
    description:
      'Diário de classe moderno alinhado à BNCC, lançamento rápido de notas, faltas, controle de entregas e boletim ilustrado sem planilhas.',
    tags: ['BNCC', 'Boletim Online', 'Chamada Rápida', 'Tarefas'],
    accent: '#38b6ff',
    bg: '#e0f2fe',
  },
  {
    emoji: '💼',
    title: 'Direção & Mantenedores',
    description:
      'Matrículas e rematrículas online com assinatura digital, faturamento no Pix com baixa automática e controle total de inadimplência.',
    tags: ['Pix Automático', 'Contratos Digitais', 'Zero Inadimplência', 'MEC'],
    accent: '#10b981',
    bg: '#e8fbf4',
  },
  {
    emoji: '👨‍👩‍👧‍👦',
    title: 'Famílias & Responsáveis',
    description:
      'Um aplicativo leve no celular onde os pais acompanham o desenvolvimento do filho, autorizam saídas e pagam mensalidades em 1 toque.',
    tags: ['App no Celular', '2ª Via de Boleto', 'Autorização de Saída', 'Mural'],
    accent: '#8b5cf6',
    bg: '#f3e8ff',
  },
];

const transformationSteps = [
  {
    number: '1',
    title: 'Migração Mágica sem Trabalho',
    description:
      'Nossa equipe de especialistas importa todos os seus alunos, turmas e históricos em até 24 horas. Você não perde nenhum dado da planilha ou sistema antigo.',
    icon: Sparkles,
  },
  {
    number: '2',
    title: 'Equipe Treinada em 15 Minutos',
    description:
      'O Saberio é tão simples e intuitivo quanto usar o WhatsApp. Seus professores e secretaria começam a usar no mesmo dia sem treinamentos cansativos.',
    icon: Smile,
  },
  {
    number: '3',
    title: 'Pais Encantados & Inadimplência Zero',
    description:
      'Famílias elogiam a transparência, os professores ganham 2 horas livres por dia e a escola recebe as mensalidades em dia com cobranças automáticas.',
    icon: Heart,
  },
];

const pricingPlans = [
  {
    name: 'Plano Sementinha',
    badge: 'Para Pequenas Escolas',
    ideal: 'Ideal para berçários e escolinhas de até 50 alunos',
    price: 'R$ 500',
    period: '/mês',
    featured: false,
    color: '#ff8500',
    ctaText: 'Testar 7 Dias Grátis',
    features: [
      'Até 50 alunos ativos',
      'Agenda Digital & Diário Baby',
      'Envio de fotos e recados no app',
      'Cobrança no Pix e Boleto bancário',
      'Controle de presença e histórico',
      'Suporte humanizado via WhatsApp',
    ],
  },
  {
    name: 'Plano Crescer',
    badge: 'Mais Escolhido ⭐',
    ideal: 'Perfeito para Educação Infantil e Fundamental',
    price: 'R$ 1.780',
    period: '/mês',
    featured: true,
    color: '#2563eb',
    ctaText: 'Contratar Plano',
    features: [
      'Até 200 alunos ativos',
      'Tudo do Plano Sementinha',
      'Matrículas e Contratos com Assinatura Digital',
      'Diário do Professor alinhado à BNCC',
      'Régua de cobrança automática por WhatsApp',
      'Portaria segura com foto de autorizados',
      'Relatórios e gráficos pedagógicos completos',
      'Migração de dados 100% gratuita',
    ],
  },
  {
    name: 'Plano Voar Alto',
    badge: 'Colégios Médio/Grande',
    ideal: 'Para escolas e colégios consolidados',
    price: 'R$ 5.800',
    period: '/mês',
    featured: false,
    color: '#8b5cf6',
    ctaText: 'Solicitar Demonstração',
    features: [
      'Até 600 alunos ativos',
      'Todas as funcionalidades do sistema',
      'Relatórios de desempenho e evolução pedagógica',
      'Previsão financeira e fluxo de caixa detalhado',
      'Portaria integrada com catracas',
      'Gerente de conta e suporte prioritário',
      'Treinamento ao vivo para equipe',
    ],
  },
  {
    name: 'Plano Grandão',
    badge: 'Redes & Franquias 🏢',
    ideal: 'Redes de ensino, franquias e grupos escolares',
    price: 'A partir de R$ 15.000',
    period: '/mês',
    featured: false,
    color: '#ec4899',
    ctaText: 'Falar com Consultor',
    features: [
      'Alunos e turmas ilimitadas',
      'Gestão centralizada multi-unidades / filiais',
      'Servidor e infraestrutura dedicada',
      'Customizações avançadas e integrações ERP',
      'SLA de atendimento 24/7 executivo',
      'Consultoria pedagógica e treinamento presencial',
    ],
  },
];

const testimonials = [
  {
    name: 'Carolina Freire',
    role: 'Diretora Pedagógica',
    school: 'Escola Casa do Sol (Educação Infantil)',
    avatar: 'CF',
    quote:
      'O Saberio transformou o relacionamento com as famílias. Antes usávamos caderninhos de papel que se perdiam. Hoje os pais recebem as fotos e o diário do bebê e ficam maravilhados!',
    color: '#ff8500',
  },
  {
    name: 'Marcelo Queiroz',
    role: 'Mantenedor e Gestor Financeiro',
    school: 'Colégio Futuro Brilhante',
    avatar: 'MQ',
    quote:
      'Nossa inadimplência caiu de 18% para menos de 3% no primeiro mês com a cobrança automática no Pix. O sistema se pagou sozinho logo no início.',
    color: '#10b981',
  },
  {
    name: 'Renata Vasconcelos',
    role: 'Coordenadora de Berçário',
    school: 'Espaço Aprender & Brincar',
    avatar: 'RV',
    quote:
      'As professoras amaram a facilidade de registrar sonecas, mamadeiras e trocas de fralda. Em 5 minutinhos o diário está completo e sobra tempo para cuidar das crianças.',
    color: '#8b5cf6',
  },
];

const faqs = [
  {
    question: 'É difícil migrar os dados da minha planilha ou sistema atual?',
    answer:
      'Não, é super rápido e tranquilo! Nossa equipe técnica faz toda a importação da sua lista de alunos, turmas e responsáveis sem nenhum custo adicional. Em até 24h sua escola já está pronta para funcionar.',
  },
  {
    question: 'Como funciona o teste gratuito de 7 dias?',
    answer:
      'O teste gratuito de 7 dias é disponibilizado no Plano Sementinha para você e sua equipe experimentarem o Saberio na prática. Não pedimos cartão de crédito na contratação do teste e você só continua se a sua escola realmente amar os resultados.',
  },
  {
    question: 'Os pais e professores precisam pagar pelo aplicativo?',
    answer:
      'Não! O aplicativo para famílias e professores é 100% gratuito. Eles podem baixar diretamente na Google Play Store ou App Store (ou acessar pelo navegador no computador ou tablet).',
  },
  {
    question: 'O Saberio está de acordo com a LGPD e as normas da BNCC?',
    answer:
      'Sim! Todos os dados e fotos das crianças são armazenados com criptografia de ponta e em conformidade estrita com a LGPD. O diário pedagógico já vem estruturado com os campos de experiência e objetivos da BNCC.',
  },
  {
    question: 'Como funciona o recebimento das mensalidades por Pix e Boleto?',
    answer:
      'O sistema gera automaticamente os boletos com QR Code Pix integrado. Quando o responsável paga, o sistema reconhece a baixa automaticamente e atualiza o financeiro da escola em tempo real.',
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [studentCount, setStudentCount] = useState(120);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeHeroTab, setActiveHeroTab] = useState<'baby' | 'financeiro' | 'professor'>('baby');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lead form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSchool, setLeadSchool] = useState('');

  const openDemoModal = () => {
    setModalOpen(true);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Gostaria de agendar uma demonstração do Saberio para a minha escola:%0A%0A*Nome:* ${leadName}%0A*Escola:* ${leadSchool}%0A*WhatsApp:* ${leadPhone}%0A*E-mail:* ${leadEmail}`;
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
    setModalOpen(false);
    alert('Obrigado! Redirecionando para o WhatsApp da equipe Saberio...');
  };

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSent(true);
      setTimeout(() => setNewsletterSent(false), 5000);
      setNewsletterEmail('');
    }
  };

  // Calculations for ROI Calculator
  const hoursSavedPerWeek = Math.round(studentCount * 0.12);
  const paperSavedPerYear = Math.round(studentCount * 38);
  const estimatedSavings = Math.round(studentCount * 45);

  return (
    <main className="min-h-screen bg-[#fffdf9] text-[#15294a] relative overflow-hidden">
      {/* Background Animated Floating Bubbles */}
      <div className="bubbles-background" aria-hidden="true">
        <div className="floating-bubble" style={{ width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(56,182,255,0.2) 0%, rgba(56,182,255,0) 70%)', left: '10%', animationDuration: '18s', animationDelay: '0s' }} />
        <div className="floating-bubble" style={{ width: '80px', height: '80px', background: 'radial-gradient(circle, rgba(255,183,3,0.2) 0%, rgba(255,183,3,0) 70%)', left: '85%', animationDuration: '14s', animationDelay: '3s' }} />
        <div className="floating-bubble" style={{ width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 70%)', left: '45%', animationDuration: '22s', animationDelay: '7s' }} />
        <div className="floating-bubble" style={{ width: '90px', height: '90px', background: 'radial-gradient(circle, rgba(255,94,94,0.18) 0%, rgba(255,94,94,0) 70%)', left: '70%', animationDuration: '16s', animationDelay: '2s' }} />
        <div className="floating-bubble" style={{ width: '110px', height: '110px', background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0) 70%)', left: '25%', animationDuration: '20s', animationDelay: '5s' }} />
      </div>
      {/* Top Announcement Bar */}
      <div className="promo-bar">
        <span>🎉 <strong>Volta às Aulas</strong> 7 dias de teste grátis no Plano Sementinha + Migração gratuita da sua planilha ou sistema!</span>
      </div>

      {/* Sticky Header / Navigation */}
      <header className={`nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="nav">
          <a href="#inicio" className="brand-logo-link">
            <img src="/saberio-logo.png" alt="Saberio - Sistema de Gestão Escolar" className="brand-logo-img" />
          </a>

          <div className="navlinks">
            <a href="#para-quem">Para Quem É</a>
            <a href="#modulos" className="badge-nav">
              Módulos <span className="badge-pill-hot">Novo</span>
            </a>
            <a href="#planos">Planos & Preços</a>
            <a href="#duvidas">Dúvidas</a>
          </div>

          <div className="navactions">
            <a
              href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20tirar%20dúvidas%20sobre%20o%20Saberio"
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp-nav"
            >
              <MessageCircle size={17} /> WhatsApp
            </a>
            <button className="btn-primary" onClick={openDemoModal}>
              Testar 7 Dias Grátis <ArrowRight size={16} />
            </button>
          </div>

          <button
            className="mobile-menu-btn md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="mobile-drawer">
            <a href="#para-quem" onClick={() => setMenuOpen(false)}>Para Quem É</a>
            <a href="#modulos" onClick={() => setMenuOpen(false)}>Módulos do Sistema</a>
            <a href="#planos" onClick={() => setMenuOpen(false)}>Planos e Preços</a>
            <a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas Frequentes</a>
            <button className="btn-accent mt-2" onClick={openDemoModal}>
              Agendar Demonstração Grátis <ArrowRight size={16} />
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero-v2">
        <div>
          <div className="badge-tag-hero">
            <Sparkles size={16} /> O Sistema Escolar Mais Amado por Diretores & Famílias
          </div>
          <h1>
            A gestão da sua escola <span className="highlight-yellow">tão simples</span> e colorida quanto o <span className="highlight-blue">aprender</span> das crianças.
          </h1>
          <p className="hero-subtitle">
            Do berçário ao ensino fundamental: centralize matrículas, mensalidades no Pix automático, agenda digital de recados, diário de classe e fotos do dia a dia em uma única plataforma encantadora.
          </p>

          <div className="hero-cta-group">
            <button className="btn-accent" onClick={openDemoModal}>
              Agendar Demonstração Gratuita 🚀
            </button>
            <a href="#calculadora" className="btn-secondary">
              Simular Economia da Escola 💡
            </a>
          </div>

          <div className="trust-badges-hero">
            <div className="trust-item">
              <div className="trust-item-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
                <Star size={16} fill="currentColor" />
              </div>
              <span><strong>4.9/5 estrelas</strong> por +350 escolas</span>
            </div>
            <div className="trust-item">
              <div className="trust-item-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
                <ShieldCheck size={16} />
              </div>
              <span><strong>100% Seguro</strong> Conforme a LGPD</span>
            </div>
            <div className="trust-item">
              <div className="trust-item-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
                <CheckCircle2 size={16} />
              </div>
              <span><strong>7 Dias Grátis</strong> no Plano Sementinha</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Visual / Live Mockup */}
        <div className="hero-visual-card">
          {/* Floating cute stickers */}
          <div className="floating-sticker sticker-top-right animate-float">
            <span style={{ fontSize: '22px' }}>🧸</span>
            <div>
              <b style={{ fontSize: '11.5px', display: 'block', color: '#0f172a' }}>Diário Baby Atualizado</b>
              <small style={{ fontSize: '9.5px', color: '#64748b' }}>Os pais viram a fotinha!</small>
            </div>
          </div>

          <div className="floating-sticker sticker-bottom-left animate-float-reverse">
            <span style={{ fontSize: '22px' }}>💸</span>
            <div>
              <b style={{ fontSize: '11.5px', display: 'block', color: '#0f172a' }}>Mensalidade Recebida</b>
              <small style={{ fontSize: '9.5px', color: '#10b981', fontWeight: 'bold' }}>Baixa automática via Pix</small>
            </div>
          </div>

          {/* Mockup Header */}
          <div className="mockup-top-bar">
            <div className="mockup-school-info">
              <div className="school-avatar">🏫</div>
              <div>
                <h4>Escola Aquarela do Saber</h4>
                <span>● 248 aluninhos ativos hoje</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setActiveHeroTab('baby')}
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '6px 10px',
                  borderRadius: '8px',
                  background: activeHeroTab === 'baby' ? '#ff6b6b' : '#f1f5f9',
                  color: activeHeroTab === 'baby' ? '#fff' : '#475569',
                  border: 0,
                }}
              >
                👶 Berçário
              </button>
              <button
                onClick={() => setActiveHeroTab('financeiro')}
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '6px 10px',
                  borderRadius: '8px',
                  background: activeHeroTab === 'financeiro' ? '#10b981' : '#f1f5f9',
                  color: activeHeroTab === 'financeiro' ? '#fff' : '#475569',
                  border: 0,
                }}
              >
                💰 Financeiro
              </button>
              <button
                onClick={() => setActiveHeroTab('professor')}
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '6px 10px',
                  borderRadius: '8px',
                  background: activeHeroTab === 'professor' ? '#2563eb' : '#f1f5f9',
                  color: activeHeroTab === 'professor' ? '#fff' : '#475569',
                  border: 0,
                }}
              >
                🎨 Pedagógico
              </button>
            </div>
          </div>

          {/* Interactive Mockup Body */}
          {activeHeroTab === 'baby' && (
            <div style={{ padding: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#ff6b6b' }}>✦ DIÁRIO DA TURMINHA BERÇÁRIO II</span>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Hoje, 14:30</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div style={{ background: '#fff5f5', padding: '12px', borderRadius: '12px', border: '1px solid #fed7d7' }}>
                  <div style={{ fontSize: '11px', color: '#e53e3e', fontWeight: 800 }}>🍼 Alimentação</div>
                  <b style={{ fontSize: '13px', color: '#2d3748' }}>Mamadeira 180ml</b>
                  <div style={{ fontSize: '10px', color: '#718096' }}>Tomou tudo às 11:30</div>
                </div>
                <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 800 }}>😴 Soneca</div>
                  <b style={{ fontSize: '13px', color: '#2d3748' }}>1h 45min</b>
                  <div style={{ fontSize: '10px', color: '#718096' }}>Dormiu tranquilo</div>
                </div>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '16px' }}>🎨</span>
                  <b style={{ fontSize: '12px', color: '#0f172a' }}>Momento Mágico do Dia: Pintura a dedo</b>
                </div>
                <p style={{ fontSize: '11.5px', color: '#64748b' }}>
                  "As crianças exploraram cores primárias e se divertiram muito criando seus primeiros quadrinhos!"
                </p>
              </div>
            </div>
          )}

          {activeHeroTab === 'financeiro' && (
            <div style={{ padding: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981' }}>✦ MENSALIDADES DESTE MÊS</span>
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800 }}>↑ 98.2% Arrecadado</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 800 }}>Recebido via Pix</div>
                  <b style={{ fontSize: '18px', color: '#0f172a' }}>R$ 142.800</b>
                  <div style={{ fontSize: '10px', color: '#16a34a' }}>● Baixa automática imediata</div>
                </div>
                <div style={{ background: '#fffbeb', padding: '12px', borderRadius: '12px', border: '1px solid #fde68a' }}>
                  <div style={{ fontSize: '11px', color: '#d97706', fontWeight: 800 }}>Inadimplência</div>
                  <b style={{ fontSize: '18px', color: '#d97706' }}>1.8%</b>
                  <div style={{ fontSize: '10px', color: '#718096' }}>Lembretes WhatsApp ativos</div>
                </div>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11.5px', color: '#475569' }}>
                ✓ <strong>240 boletos e carnês</strong> enviados automaticamente por e-mail e WhatsApp para os pais.
              </div>
            </div>
          )}

          {activeHeroTab === 'professor' && (
            <div style={{ padding: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb' }}>✦ DIÁRIO DE CLASSE & BNCC</span>
                <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 800 }}>Turma Jardim II</span>
              </div>
              <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '10px' }}>
                <div style={{ fontSize: '11px', color: '#1d4ed8', fontWeight: 800 }}>Campo de Experiência BNCC:</div>
                <b style={{ fontSize: '12.5px', color: '#1e293b' }}>Traços, sons, cores e formas (EI03TS02)</b>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '10px 14px', borderRadius: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Chamada de Presença (24/24 alunos)</span>
                <span style={{ fontSize: '11px', background: '#dcfce7', color: '#16a34a', padding: '3px 8px', borderRadius: '6px', fontWeight: 800 }}>100% Presentes</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Target Audience Segment Section */}
      <section id="para-quem" className="audience-section">
        <div className="section-header-center">
          <span className="section-kicker" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <Sparkles size={14} /> Soluções Sob Medida
          </span>
          <h2>
            Feito com carinho para o seu <span className="highlight-blue">tipo de escola</span>
          </h2>
          <p>
            Seja uma escolinha de bairro ou um grande colégio, o Saberio se adapta perfeitamente à rotina de quem educa.
          </p>
        </div>

        <div className="audience-grid">
          {audiences.map((aud, index) => (
            <div
              className="audience-card"
              key={index}
              style={{
                '--card-accent': aud.accent,
                '--bg-accent': aud.bg,
              } as React.CSSProperties}
            >
              <div className="audience-emoji-box">{aud.emoji}</div>
              <h3>{aud.title}</h3>
              <p>{aud.description}</p>
              <div className="audience-tags">
                {aud.tags.map((t, idx) => (
                  <span className="audience-tag" key={idx}>
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Steps Transformation Section */}
      <section className="steps-section">
        <div className="section-header-center">
          <span className="section-kicker" style={{ background: '#fef3c7', color: '#d97706' }}>
            <Zap size={14} /> Sem Complicação
          </span>
          <h2>
            Como transformamos a sua escola em <span style={{ color: '#ff8500' }}>3 passos simples</span>
          </h2>
          <p>
            Esqueça softwares antigos e complicados. No Saberio, a transição é leve, rápida e acompanhada de perto.
          </p>
        </div>

        <div className="steps-grid">
          {transformationSteps.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <div className="step-card" key={idx}>
                <div className="step-number-bubble">{step.number}</div>
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#eff6ff', display: 'grid', placeItems: 'center', color: '#2563eb', marginTop: '10px' }}>
                  <StepIcon size={24} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Modules Detailed Deep-dive */}
      <FeatureModules />

      {/* Screens Showcase */}
      <ScreensShowcase />

      {/* Interactive Savings / ROI Calculator */}
      <section id="calculadora" className="calculator-section">
        <div className="calculator-container">
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 183, 3, 0.2)', color: '#ffb703', padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>
              <BarChart3 size={14} /> Calculadora de Economia
            </span>
            <h2 style={{ fontSize: '36px', lineHeight: '1.15', margin: '14px 0', color: '#fff' }}>
              Veja quanto tempo e dinheiro sua escola vai economizar.
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              Arraste a barra com o número de alunos da sua escola e descubra o impacto imediato do Saberio na sua rotina:
            </p>

            <div className="calculator-slider-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#cbd5e1' }}>Número de Alunos na Escola:</span>
                <strong style={{ fontSize: '24px', color: '#ffb703', fontFamily: 'var(--font-heading)' }}>
                  {studentCount} alunos
                </strong>
              </div>
              <input
                type="range"
                min="20"
                max="800"
                step="10"
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                className="slider-custom"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                <span>20 alunos</span>
                <span>400 alunos</span>
                <span>800+ alunos</span>
              </div>
            </div>
          </div>

          <div className="calc-results-grid">
            <div className="calc-stat-card">
              <Clock size={28} style={{ margin: '0 auto 8px', color: '#2563eb' }} />
              <b>~{hoursSavedPerWeek}h</b>
              <small>Economizadas pela secretaria toda semana</small>
            </div>
            <div className="calc-stat-card">
              <FileCheck size={28} style={{ margin: '0 auto 8px', color: '#10b981' }} />
              <b>{paperSavedPerYear} resmas</b>
              <small>De papel e impressões poupadas por ano</small>
            </div>
            <div className="calc-stat-card" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, #ffffff 0%, #fff8e1 100%)' }}>
              <div style={{ fontSize: '13px', color: '#b45309', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                Economia Estimada Anual
              </div>
              <b style={{ color: '#d97706', fontSize: '38px' }}>R$ {estimatedSavings.toLocaleString('pt-BR')}</b>
              <small style={{ color: '#78350f', fontSize: '12px' }}>
                Entre redução de inadimplência, eliminação de agendas físicas e otimização de horas da equipe.
              </small>
              <button
                className="btn-accent"
                style={{ width: '100%', marginTop: '16px', padding: '12px' }}
                onClick={openDemoModal}
              >
                Quero Economizar na Minha Escola <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="pricing-section">
        <div className="section-header-center">
          <span className="section-kicker" style={{ background: '#f0fdf4', color: '#16a34a' }}>
            <CreditCard size={14} /> Planos Acessíveis & Transparentes
          </span>
          <h2>
            Um investimento que se paga no <span className="highlight-blue">primeiro mês</span>
          </h2>
          <p>
            Sem pegadinhas, sem taxas escondidas de adesão e com 7 dias de teste grátis no Plano Sementinha para você comprovar os resultados.
          </p>
        </div>

        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <div className={`pricing-card ${plan.featured ? 'featured' : ''}`} key={index}>
              {plan.featured && <div className="pricing-badge-popular">{plan.badge}</div>}
              {!plan.featured && (
                <span style={{ fontSize: '11px', fontWeight: 800, color: plan.color, textTransform: 'uppercase', marginBottom: '4px' }}>
                  {plan.badge}
                </span>
              )}
              <h3>{plan.name}</h3>
              <p style={{ fontSize: '13px', color: '#64748b', minHeight: '38px', marginTop: '4px' }}>{plan.ideal}</p>

              <div className="price-tag">
                {plan.price}
                <small>{plan.period}</small>
              </div>

              <ul className="pricing-features-list">
                {plan.features.map((feat, i) => (
                  <li key={i}>
                    <Check size={16} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                className={plan.featured ? 'btn-accent' : 'btn-secondary'}
                style={{ width: '100%' }}
                onClick={openDemoModal}
              >
                {plan.ctaText} <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials / Social Proof */}
      <section className="testimonials-section">
        <div className="section-header-center">
          <span className="section-kicker" style={{ background: '#fdf2f8', color: '#db2777' }}>
            <Heart size={14} /> Histórias Reais
          </span>
          <h2>
            Quem usa o Saberio, <span style={{ color: '#ff5e5e' }}>se apaixona</span>
          </h2>
          <p>
            Veja o que diretoras e coordenadoras de todo o Brasil dizem sobre a mudança na rotina escolar.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div className="testimonial-card" key={idx}>
              <div>
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-quote">“{t.quote}”</p>
              </div>
              <div className="testimonial-author-box">
                <div className="author-pic" style={{ background: t.color, color: '#fff', fontWeight: 900 }}>
                  {t.avatar}
                </div>
                <div className="author-info">
                  <h4>{t.name}</h4>
                  <span>{t.role} · <strong>{t.school}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="duvidas" className="faq-section">
        <div className="section-header-center">
          <span className="section-kicker" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
            <HelpCircle size={14} /> Tira-Dúvidas
          </span>
          <h2>
            Perguntas frequentes de <span className="highlight-blue">diretores e gestores</span>
          </h2>
          <p>
            Tudo o que você precisa saber antes de dar esse passo rumo à modernização da sua escola.
          </p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div className="faq-item" key={index}>
                <button
                  className="faq-question"
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp size={20} color="#2563eb" /> : <ChevronDown size={20} color="#94a3b8" />}
                </button>
                {isOpen && <div className="faq-answer">{faq.answer}</div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Conversion CTA Section */}
      <section className="final-cta-section">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.15)', padding: '6px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px' }}>
          ✨ Comece Hoje Mesmo
        </span>
        <h2>
          Sua escola merece mais tempo para educar
          <br />
          e menos dor de cabeça com burocracias.
        </h2>
        <p>
          Junte-se a centenas de escolas que já transformaram a relação com pais e professores com o Saberio.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button className="btn-accent" onClick={openDemoModal} style={{ fontSize: '17px', padding: '18px 36px' }}>
            Experimentar 7 Dias Grátis 🚀
          </button>
          <a
            href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20uma%20demonstração%20ao%20vivo%20do%20Saberio"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ fontSize: '16px', padding: '18px 28px' }}
          >
            <MessageCircle size={18} color="#059669" /> Falar com um Consultor
          </a>
        </div>
      </section>

      {/* Premium & Lúdico Footer V3 */}
      <footer className="footer-v3">
        {/* Curved Wave Top Divider */}
        <div className="footer-wave-divider" aria-hidden="true">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="#0f172a">
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
          </svg>
        </div>

        <div className="footer-container">
          {/* Top Interactive Cards (Support & Newsletter) */}
          <div className="footer-top-cards">
            {/* VIP WhatsApp Support Card */}
            <div className="footer-support-card">
              <div>
                <div className="support-online-badge">
                  <span className="online-dot" /> Atendimento Online Agora
                </div>
                <h4 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 800, margin: '4px 0 6px' }}>
                  Dúvidas sobre o sistema ou implantação?
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
                  Converse diretamente com nossos especialistas em gestão escolar via WhatsApp.
                </p>
              </div>
              <a
                href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20tirar%20dúvidas%20sobre%20o%20Saberio"
                target="_blank"
                rel="noreferrer"
                className="btn-accent"
                style={{ padding: '12px 22px', fontSize: '14px', whiteSpace: 'nowrap' }}
              >
                <MessageCircle size={16} /> Chamar no WhatsApp
              </a>
            </div>

            {/* Educational Newsletter Card */}
            <div className="footer-newsletter-card">
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#38b6ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                💌 Boletim Pedagógico Saberio
              </span>
              <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 800, margin: '4px 0 6px' }}>
                Receba novidades da BNCC e dicas de gestão
              </h4>
              {newsletterSent ? (
                <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#6ee7b7', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} /> Inscrição realizada com sucesso! Bem-vindo(a).
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <input
                    type="email"
                    required
                    placeholder="Seu melhor e-mail institucional..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn">
                    Assinar Grátis <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Main Footer Grid */}
          <div className="footer-main-grid">
            {/* Brand Column */}
            <div className="footer-brand-info">
              <img src="/saberio-logo.png" alt="Saberio" className="brand-logo-img-footer" />
              <p>
                O ecossistema inteligente, acolhedor e colorido que simplifica a rotina de diretores, encanta os professores e aproxima as famílias da escola.
              </p>
              <div className="footer-trust-pills">
                <span className="footer-trust-pill">🛡️ 100% LGPD</span>
                <span className="footer-trust-pill">⭐ Nota 4.9/5</span>
                <span className="footer-trust-pill">☁️ Backup Diário</span>
                <span className="footer-trust-pill">⚡ 99.9% Uptime</span>
              </div>
            </div>

            {/* Col 1: Soluções */}
            <div className="footer-col">
              <h5>Soluções</h5>
              <ul>
                <li><a href="#para-quem">👶 Berçário & Baby Kids</a></li>
                <li><a href="#para-quem">🎨 Educação Infantil</a></li>
                <li><a href="#para-quem">📚 Ensino Fundamental</a></li>
                <li><a href="#para-quem">💼 Direção & Mantenedores</a></li>
                <li><a href="#para-quem">👨‍👩‍👧 Famílias & Alunos</a></li>
              </ul>
            </div>

            {/* Col 2: Módulos */}
            <div className="footer-col">
              <h5>Módulos</h5>
              <ul>
                <li><a href="#modulos">📱 Agenda Digital & App</a></li>
                <li><a href="#modulos">📝 Matrículas Online</a></li>
                <li><a href="#modulos">💸 Cobrança Pix & Boleto</a></li>
                <li><a href="#modulos">📋 Diário de Classe BNCC</a></li>
                <li><a href="#modulos">🚪 Portaria & Catracas</a></li>
                <li><a href="#modulos">🥪 Cantina & Nutrição</a></li>
              </ul>
            </div>

            {/* Col 3: Ferramentas */}
            <div className="footer-col">
              <h5>Recursos</h5>
              <ul>
                <li><a href="#calculadora">💡 Calculadora de ROI</a></li>
                <li><a href="#planos">🏷️ Tabela de Planos</a></li>
                <li><a href="#duvidas">❓ Perguntas Frequentes</a></li>
                <li><a href="#inicio" onClick={openDemoModal}>🚀 Agendar Demonstração</a></li>
                <li><a href="#planos">🌱 Teste 7 Dias Grátis</a></li>
              </ul>
            </div>

            {/* Col 4: Contato & Suporte */}
            <div className="footer-col">
              <h5>Atendimento</h5>
              <ul>
                <li>
                  <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
                    💬 WhatsApp Oficial
                  </a>
                </li>
                <li>
                  <a href="mailto:contato@saberio.com.br">
                    ✉️ contato@saberio.com.br
                  </a>
                </li>
                <li style={{ color: '#64748b', fontSize: '12.5px', marginTop: '4px' }}>
                  🕒 Seg a Sex das 08h às 19h
                </li>
                <li style={{ color: '#64748b', fontSize: '12.5px' }}>
                  🏫 Plantão aos Sábados
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <div>
              <span>© 2026 Saberio · Vco Consultoria LTDA — CNPJ: 67.168.092/0001-94.</span>
              <span style={{ display: 'block', marginTop: '4px', color: '#94a3b8' }}>
                Feito com <span className="heartbeat-icon">❤️</span> para educadores que transformam o futuro.
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="#inicio" style={{ color: '#94a3b8' }}>Termos de Uso</a>
                <a href="#inicio" style={{ color: '#94a3b8' }}>Privacidade</a>
                <a href="#inicio" style={{ color: '#94a3b8' }}>Segurança LGPD</a>
              </div>

              <div className="footer-social-links">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                  📸
                </a>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="WhatsApp">
                  💬
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="YouTube">
                  ▶️
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                  💼
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Demo / Lead Capture Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
              <X size={18} />
            </button>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <img src="/saberio-logo.png" alt="Saberio" style={{ height: '42px', margin: '0 auto 8px' }} />
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff8e1', color: '#b45309', padding: '3px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>
                <Sparkles size={13} /> Demonstração Gratuita
              </div>
            </div>
            <h2 style={{ fontSize: '24px', lineHeight: '1.2', color: '#0f172a', marginBottom: '6px', textAlign: 'center' }}>
              Veja o Saberio na sua escola!
            </h2>
            <p style={{ color: '#64748b', fontSize: '13.5px', marginBottom: '18px', textAlign: 'center' }}>
              Preencha para testar 7 dias grátis ou receber uma demonstração guiada pelo WhatsApp:
            </p>

            <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '4px' }}>Seu Nome</label>
                <input
                  required
                  type="text"
                  placeholder="Ex: Carolina Freire"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '4px' }}>Nome da sua Escola</label>
                <input
                  required
                  type="text"
                  placeholder="Ex: Escola Aquarela do Saber"
                  value={leadSchool}
                  onChange={(e) => setLeadSchool(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '4px' }}>WhatsApp com DDD</label>
                <input
                  required
                  type="tel"
                  placeholder="Ex: (11) 99999-8888"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '4px' }}>E-mail Profissional</label>
                <input
                  required
                  type="email"
                  placeholder="Ex: diretoria@escola.com.br"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px' }}
                />
              </div>

              <button type="submit" className="btn-accent mt-2" style={{ width: '100%' }}>
                Testar 7 Dias Grátis <ArrowRight size={16} />
              </button>
            </form>

            <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '11px', color: '#94a3b8' }}>
              🔒 Seus dados estão seguros e não enviamos spam.
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
