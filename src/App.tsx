import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Bot,
  ChartNoAxesCombined,
  Headset,
  Lightbulb,
  MonitorSmartphone,
  Puzzle,
  SquareCode,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import bgIa from "./assets/images/bg-ia.jpeg";
import { Hero } from "./components/Hero/Hero";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

type Solution = {
  icon: LucideIcon;
  name: string;
  strong: string;
  description: string;
};

type AiFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const solutions: Solution[] = [
  {
    icon: Bot,
    name: "PATH",
    strong: "IA",
    description:
      "Desenvolvemos agentes, automações e integrações que escalam o atendimento e otimizam o dia a dia com IA.",
  },
  {
    icon: UsersRound,
    name: "PATH",
    strong: "TALENT",
    description:
      "Alocamos talentos, formamos profissionais e montamos squads sob medida, com foco em qualidade e parceria duradoura.",
  },
  {
    icon: SquareCode,
    name: "PATH",
    strong: "STUDIOS",
    description:
      "Nossa consultoria tech apoia seu time com domínio técnico e visão de produto em várias especialidades do dia a dia real.",
  },
  {
    icon: MonitorSmartphone,
    name: "PATH",
    strong: "BUILD",
    description:
      "Produtos digitais sob medida, com visão de negócio e excelência técnica. Da ideia à entrega, tudo no ritmo da sua empresa.",
  },
  {
    icon: Lightbulb,
    name: "PATH",
    strong: "LAB",
    description:
      "Design com propósito. Conectamos marca e experiência para criar produtos intuitivos, belos e que entregam resultado de verdade.",
  },
  {
    icon: ChartNoAxesCombined,
    name: "PATH",
    strong: "FIN",
    description:
      "Use nossa experiência no mercado financeiro para automatizar processos, otimizar e melhorar a jornada do investidor.",
  },
];

const aiFeatures: AiFeature[] = [
  {
    icon: Headset,
    title: "Plataforma de atendimento",
    description:
      "Atenda em vários canais com uma plataforma unificada e fácil de usar. Organize seu time, automatize conversas e escale com mais fluidez.",
  },
  {
    icon: Bot,
    title: "Agentes inteligentes",
    description:
      "Automatize o atendimento com agentes que falam com seus clientes, executam tarefas e se conectam aos seus sistemas. Sempre com a cara da sua marca.",
  },
  {
    icon: Puzzle,
    title: "Integrações inteligentes",
    description:
      "Conecte CRMs, ERPs e plataformas web de forma simples. Elimine retrabalho, acelere processos e tenha dados fluindo entre os sistemas certos.",
  },
  {
    icon: Zap,
    title: "Automações inteligentes",
    description:
      "Crie fluxos com IA que decide em tempo real. Torne seus processos mais ágeis, personalizados e eficientes, sem erro e com menos esforço.",
  },
];

function App() {
  const aiSectionRef = useRef<HTMLElement>(null);
  const aiBackgroundRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = aiSectionRef.current;
    const background = aiBackgroundRef.current;

    if (!section || !background) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(background, { clearProps: "all" });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          background,
          { yPercent: -10, scale: 1 },
          {
            yPercent: 10,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.85,
            },
          },
        );
      });
    }, section);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Hero />

      <main>
        <section
          ref={aiSectionRef}
          className="ai-section"
          aria-labelledby="ai-title"
          data-header-theme="dark"
        >
          <div className="ai-section__background" aria-hidden="true">
            <img ref={aiBackgroundRef} src={bgIa} alt="" />
          </div>

          <div className="ai-section__inner">
            <p className="ai-section__eyebrow">
              <span>PATH</span>
              <strong>IA</strong>
            </p>
            <h2 id="ai-title" className="ai-section__title">
              <span>Inteligência</span> aplicada para negócios
              <br />
              que querem ir <span>além.</span>
            </h2>

            <div className="ai-section__grid">
              {aiFeatures.map((feature) => (
                <article className="ai-feature" key={feature.title}>
                  <div className="ai-feature__icon" aria-hidden="true">
                    <feature.icon />
                  </div>

                  <div className="ai-feature__copy">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="solucoes" className="solutions-section" aria-labelledby="solutions-title">
          <h2 id="solutions-title" className="sr-only">
            Nossas soluções
          </h2>

          <div className="solutions-grid">
            {solutions.map((solution) => (
              <article className="solution-card" key={`${solution.name}${solution.strong}`}>
                <solution.icon className="solution-card__icon" aria-hidden="true" />

                <h3>
                  {solution.name}
                  <strong>{solution.strong}</strong>
                </h3>

                <p>{solution.description}</p>
              </article>
            ))}
          </div>

          <div className="solutions-cta">
            <h2>É hora de inovar!</h2>
            <p>
              Transformamos desafios em soluções digitais simples, seguras e feitas pra acompanhar
              o crescimento da sua empresa.
            </p>
            <a
              className="solutions-cta__button"
              href="https://api.whatsapp.com/send/?phone=551152866569&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
            >
              <span>Fale com a Path</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <a
        className="whatsapp-float"
        href="https://api.whatsapp.com/send/?phone=551152866569&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noreferrer"
        aria-label="Fale com a Pathbit pelo WhatsApp"
      >
        <svg className="whatsapp-float__icon" viewBox="0 0 448 512" aria-hidden="true">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101 32 1.2 131.8 1.2 254.8c0 39.3 10.3 77.7 29.8 111.5L0 480l116.5-30.6c32.5 17.7 69.1 27 106.9 27h.1c122.9 0 222.7-99.8 222.8-222.7 0-59.5-23.1-115.3-65.4-156.6ZM223.5 438.8h-.1c-33.7 0-66.7-9.1-95.4-26.2l-6.9-4.1-69.1 18.1 18.5-67.3-4.5-6.9c-18.7-29.7-28.6-63.9-28.6-97.6C37.4 152.6 120.7 69.3 223.9 69.3c49.7 0 96.5 19.4 131.7 54.6 35.2 35.3 54.5 82.1 54.5 131.8-.1 103.1-83.4 183.1-186.6 183.1Zm101.3-138.7c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-65.9-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.5-19.4 19-19.4 46.3s19.9 53.7 22.7 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.6-6.7Z" />
        </svg>
      </a>
    </>
  );
}

export default App;
