'use client';

import { useState } from 'react';
import {
  Baby,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';
import './feature-modules.css';

const modulesList = [
  {
    id: 'bercario',
    label: 'Berçário & Baby Kids',
    icon: Baby,
    color: '#ff6b6b',
    lightBg: '#ffecec',
    badge: 'O queridinho dos pais',
    headline: 'Diário do Bebê em tempo real para os pais ficarem tranquilos',
    description:
      'Registro diário de mamadeiras, refeições, trocas de fralda, sonecas e administração de medicamentos com foto da receita médica.',
    features: [
      'Alimentação: aceitação de frutas, papinhas e almoço',
      'Trocas de fraldas com registro de evacuação e pomada',
      'Horário e duração de cada soneca do bebê',
      'Fotos diárias e recadinhos afetivos com 1 clique',
      'Envio de receita médica e controle de remédios',
      'Aviso imediato se a criança apresentar febre ou sintoma',
    ],
    highlightText: '98% dos pais relatam mais confiança e sensação de proximidade com a escolinha.',
  },
  {
    id: 'comunicacao',
    label: 'Agenda Digital & App',
    icon: MessageSquare,
    color: '#ffb703',
    lightBg: '#fff8e1',
    badge: 'Comunicação Segura',
    headline: 'Fim dos grupos caóticos de WhatsApp e bilhetinhos perdidos',
    description:
      'Canal oficial e elegante para comunicados, convites de apresentações, fotos de eventos e canal de atendimento seguro sem expor o número dos professores.',
    features: [
      'Comunicados com confirmação de leitura obrigatória',
      'Autorização digital para passeios e excursões escolares',
      'Álbuns de fotos e vídeos com download seguro',
      'Calendário de eventos, aniversários e datas comemorativas',
      'Chat com horário de atendimento configurável',
      'Notificações push direto no celular dos responsáveis',
    ],
    highlightText: 'Economize mais de 15 resmas de papel por mês substituindo a agenda física.',
  },
  {
    id: 'pedagogico',
    label: 'Pedagógico & BNCC',
    icon: GraduationCap,
    color: '#8b5cf6',
    lightBg: '#f3e8ff',
    badge: 'Alinhado ao MEC',
    headline: 'Planejamento de aula descomplicado e relatórios pedagógicos',
    description:
      'Diário de classe moderno com campos de experiência da Educação Infantil e competências do Ensino Fundamental para relatórios perfeitos.',
    features: [
      'Campos de experiência BNCC com 1 toque',
      'Pareceres descritivos ilustrados e relatórios de desenvolvimento',
      'Chamada de presença rápida com foto dos alunos',
      'Diário de conteúdos, objetivos e atividades lúdicas',
      'Boletim com notas, conceitos ou medalhas por turma',
      'Portfólio digital das produções artísticas das crianças',
    ],
    highlightText: 'Professores economizam cerca de 2 horas por semana no preenchimento de diários.',
  },
  {
    id: 'financeiro',
    label: 'Financeiro & Pix Auto',
    icon: CreditCard,
    color: '#10b981',
    lightBg: '#e8fbf4',
    badge: 'Inadimplência Zero',
    headline: 'Cobrança automática com Pix, boleto e cartão de crédito',
    description:
      'Gere mensalidades em lote, envie lembretes amigáveis no WhatsApp antes do vencimento e receba direto na conta da escola com baixa automática.',
    features: [
      'Emissão de boletos com QR Code Pix integrado',
      'Régua de cobrança automática por WhatsApp e E-mail',
      'Controle rigoroso de fluxo de caixa e relatórios fiscais',
      'Segunda via de boleto emitida pelos próprios pais no app',
      'Gestão de bolsas de estudo, irmãos e descontos por pontualidade',
      'Relatórios de faturamento e extrato consolidado por período',
    ],
    highlightText: 'Redução média de até 67% na taxa de inadimplência escolar no primeiro trimestre.',
  },
  {
    id: 'secretaria',
    label: 'Matrículas & Secretaria',
    icon: BookOpen,
    color: '#38b6ff',
    lightBg: '#e0f2fe',
    badge: '100% sem papel',
    headline: 'Matrículas e rematrículas online com assinatura eletrônica',
    description:
      'Capture novos alunos pelo site da escola, receba documentos digitalizados e colete assinaturas válidas juridicamente pelo celular dos pais.',
    features: [
      'Formulário de pré-matrícula personalizado para seu site',
      'Contratos de prestação de serviços com assinatura digital',
      'Ficha médica, alergias, restrições e tipo sanguíneo',
      'Rematrícula com 1 clique para alunos já matriculados',
      'Emissão de declarações, histórico escolar e transferências',
      'Emissão de fichas cadastrais e relatórios da turma',
    ],
    highlightText: 'Matricule novos alunos 5x mais rápido sem filas na secretaria.',
  },
  {
    id: 'seguranca',
    label: 'Portaria & Cantina',
    icon: ShieldCheck,
    color: '#ec4899',
    lightBg: '#fdf2f8',
    badge: 'Segurança Total',
    headline: 'Controle de saída das crianças e alimentação saudável',
    description:
      'Portaria inteligente com foto das pessoas autorizadas a buscar o aluno e gestão de cantina com cardápio semanal e saldo pré-pago.',
    features: [
      'Autorização de terceiros com foto para retirada da criança',
      'Notificação aos pais assim que o aluno entra ou sai da escola',
      'Controle de catracas ou leitura de QR Code na portaria',
      'Cardápio semanal com aviso de intolerâncias e alergias',
      'Recarga de saldo da cantina online pelos pais no app',
      'Biblioteca escolar com empréstimo lúdico de livrinhos',
    ],
    highlightText: 'Máxima tranquilidade para as famílias e segurança jurídica para a escola.',
  },
];

export function FeatureModules() {
  const [activeTab, setActiveTab] = useState(0);
  const activeModule = modulesList[activeTab];
  const Icon = activeModule.icon;

  return (
    <section className="feature-section" id="modulos">
      <div className="feature-heading">
        <span className="feature-kicker">
          <Sparkles size={15} /> Ecossistema 100% Completo
        </span>
        <h2>
          Tudo o que sua escola precisa,
          <br />
          <span>em um sistema intuitivo e colorido.</span>
        </h2>
        <p>
          Do berçário ao ensino fundamental: ative os módulos ideais para o porte da sua escola e encante famílias e professores.
        </p>
      </div>

      <div className="feature-shell">
        {/* Navigation tabs */}
        <div className="feature-nav" role="tablist">
          {modulesList.map((item, index) => {
            const TabIcon = item.icon;
            const isSelected = activeTab === index;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isSelected}
                className={`feature-nav-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
                style={{ '--tab-color': item.color } as React.CSSProperties}
              >
                <div className="feature-nav-btn-left">
                  <div className="feature-nav-icon">
                    <TabIcon size={20} />
                  </div>
                  <span>{item.label}</span>
                </div>
                <ChevronRight size={16} style={{ opacity: isSelected ? 1 : 0.4 }} />
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <div
          className="feature-content"
          style={
            {
              '--accent-color': activeModule.color,
              '--accent-light': activeModule.lightBg,
            } as React.CSSProperties
          }
        >
          <span className="feature-tag-category">{activeModule.badge}</span>
          <div className="feature-title-box">
            <div className="feature-main-icon">
              <Icon size={28} />
            </div>
            <div>
              <h3>{activeModule.headline}</h3>
            </div>
          </div>

          <p>{activeModule.description}</p>

          <div className="feature-highlights-grid">
            {activeModule.features.map((feature, idx) => (
              <div className="feature-item-pill" key={idx}>
                <CheckCircle2 size={18} style={{ color: activeModule.color }} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="feature-extra-bar">
            <div className="feature-extra-bar-left">
              <Sparkles size={20} style={{ color: activeModule.color }} />
              <span>{activeModule.highlightText}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
