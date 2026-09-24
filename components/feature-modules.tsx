import {
  Baby,
  BookOpen,
  Check,
  ChevronDown,
  CreditCard,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import './feature-modules.css';

const moduleGroups = [
  {
    id: 'pedagogico',
    title: 'Pedagógico e sala de aula',
    description: 'Mais organização para ensinar e acompanhar.',
    icon: GraduationCap,
    features: [
      'Planejamento com campos da BNCC',
      'Diário de classe e chamada',
      'Notas e boletins',
      'Pareceres de desenvolvimento',
      'Atividades e portfólio digital',
    ],
  },
  {
    id: 'comunicacao',
    title: 'Comunicação com as famílias',
    description: 'Recados, fotos e informações no mesmo lugar.',
    icon: MessageSquare,
    features: [
      'Agenda digital e comunicados',
      'Confirmação de leitura',
      'Álbuns de fotos e vídeos',
      'Calendário de eventos',
      'Autorizações para passeios',
    ],
  },
  {
    id: 'secretaria',
    title: 'Secretaria e matrículas',
    description: 'Da primeira matrícula à próxima rematrícula.',
    icon: BookOpen,
    features: [
      'Pré-matrícula online',
      'Contratos e assinatura digital',
      'Documentos e fichas dos alunos',
      'Rematrículas',
      'Declarações e histórico escolar',
    ],
  },
  {
    id: 'bercario',
    title: 'Berçário e educação infantil',
    description: 'O cuidado de cada dia registrado com atenção.',
    icon: Baby,
    features: [
      'Diário do bebê',
      'Registro de alimentação',
      'Trocas de fralda e sonecas',
      'Receitas e medicamentos',
      'Fotos e recados para os responsáveis',
    ],
  },
  {
    id: 'seguranca',
    title: 'Portaria e rotina escolar',
    description: 'Informações à mão nos momentos de cuidado.',
    icon: ShieldCheck,
    features: [
      'Cadastro de pessoas autorizadas',
      'Registro de entrada e saída',
      'Cardápio e restrições alimentares',
      'Saldo e gestão da cantina',
      'Empréstimos da biblioteca',
    ],
  },
];

export function FeatureModules() {
  return (
    <section
      className="feature-section"
      id="modulos"
      aria-labelledby="feature-title"
    >
      <div className="feature-container">
        <div className="feature-heading" data-reveal>
          <h2 id="feature-title">
            Menos tarefas espalhadas.
            <br />
            <span>Mais escola acontecendo.</span>
          </h2>
          <p>
            Conecte a gestão financeira, o trabalho pedagógico e a comunicação
            em uma rotina mais simples para toda a escola.
          </p>
        </div>
        <div className="feature-shell">
          <div className="feature-finance" data-reveal>
            <div className="feature-finance-icon">
              <CreditCard size={29} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <h3>
              O financeiro merece
              <br />a sua tranquilidade.
            </h3>
            <p>
              Organize mensalidades, acompanhe os recebimentos e tenha mais
              clareza sobre o caixa da escola.
            </p>
            <ul className="feature-finance-benefits">
              {[
                'Cobranças por Pix e boleto',
                'Lembretes de vencimento',
                'Controle de bolsas e descontos',
                'Fluxo de caixa e relatórios',
              ].map((feature) => (
                <li key={feature}>
                  <Check size={18} strokeWidth={1.8} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="feature-finance-note">
              <span>Da cobrança ao acompanhamento</span>
              <p>
                Informações centralizadas para cuidar da saúde financeira da sua
                escola.
              </p>
            </div>
          </div>
          <div className="feature-groups" data-reveal>
            {moduleGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <details
                  className="feature-group"
                  key={group.id}
                  name="school-modules"
                  open={index === 0}
                >
                  <summary>
                    <span className="feature-group-icon">
                      <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="feature-group-title">
                      <strong>{group.title}</strong>
                      <span>{group.description}</span>
                    </span>
                    <ChevronDown
                      className="feature-chevron"
                      size={20}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </summary>
                  <ul>
                    {group.features.map((feature) => (
                      <li key={feature}>
                        <Check size={15} strokeWidth={1.8} aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </details>
              );
            })}
            <p className="feature-plan-note">
              A disponibilidade dos recursos varia conforme o plano escolhido.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
