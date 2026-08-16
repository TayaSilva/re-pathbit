import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import pathbitLogo from "../../assets/images/logo.svg";
import networkBg from "../../assets/images/network-bg.png";
import pathbitSymbol from "../../assets/images/pathbit-symbol.svg.svg";
import "./Hero.css";
import { NetworkLights } from "./NetworkLights";

gsap.registerPlugin(ScrollTrigger);

const HERO_TYPED_WORDS = [
  "Tecnologia.",
  "Estratégia.",
  "Inovação.",
  "IA.",
  "Experiência.",
  "Transformação.",
  "Resultados.",
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollYRef = useRef(0);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sceneARef = useRef<HTMLDivElement>(null);
  const sceneBRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLAnchorElement>(null);
  const [typedWord, setTypedWord] = useState("");
  const [typedWordIndex, setTypedWordIndex] = useState(0);
  const [isDeletingWord, setIsDeletingWord] = useState(false);
  const [hasHeaderGlass, setHasHeaderGlass] = useState(false);
  const [isHeaderOnLight, setIsHeaderOnLight] = useState(false);
  const [isHeaderTransitionInstant, setIsHeaderTransitionInstant] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      const hero = heroRef.current;
      const header = headerRef.current;
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollYRef.current;

      setHasHeaderGlass(currentScrollY > 12);
      setIsHeaderTransitionInstant(isScrollingUp);
      lastScrollYRef.current = currentScrollY;

      if (!hero || !header) return;

      const probeY = header.offsetHeight + 8;
      const elementBelowHeader = document.elementFromPoint(window.innerWidth / 2, probeY);
      const isOverDarkSection = Boolean(elementBelowHeader?.closest('[data-header-theme="dark"]'));
      const isPastHero = hero.getBoundingClientRect().bottom <= probeY;

      setIsHeaderOnLight(isPastHero && !isOverDarkSection);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, []);

  useEffect(() => {
    const sceneA = sceneARef.current;
    const sceneB = sceneBRef.current;

    if (!sceneA || !sceneB) return;

    gsap.set(sceneA, {
      scale: 1,
      opacity: 1,
      transformOrigin: "center center",
    });

    gsap.set(sceneB, {
      scale: 0.94,
      opacity: 0,
      transformOrigin: "center center",
    });

    const cycle = 13;
    const crossfade = 3.25;
    const timeline = gsap.timeline({
      repeat: -1,
      defaults: {
        ease: "none",
      },
    });

    timeline
      .to(sceneA, { scale: 1.18, duration: cycle }, 0)
      .to(sceneA, { opacity: 0, duration: crossfade }, cycle - crossfade)
      .to(sceneB, { scale: 1, duration: cycle - crossfade }, crossfade)
      .to(sceneB, { opacity: 1, duration: crossfade }, cycle - crossfade);

    return () => {
      timeline.kill();
      gsap.killTweensOf([sceneA, sceneB]);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const explore = exploreRef.current;

    if (!hero || !content || !explore) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const createScrollParallax = ({
        contentY,
      }: {
        contentY: number;
      }) => {
        gsap.to(content, {
          y: contentY,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "70% top",
            scrub: 1,
          },
        });

        gsap.to(explore, {
          y: 20,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "30% top",
            scrub: 0.8,
          },
        });
      };

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([content, explore], { clearProps: "all" });
      });

      media.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        createScrollParallax({
          contentY: 100,
        });
      });

      media.add("(max-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        createScrollParallax({
          contentY: 42,
        });
      });
    }, hero);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const fullWord = HERO_TYPED_WORDS[typedWordIndex];
    let delay = isDeletingWord ? 46 : 82;

    if (!isDeletingWord && typedWord === fullWord) {
      delay = 1450;
    }

    if (isDeletingWord && typedWord === "") {
      delay = 260;
    }

    const timeout = window.setTimeout(() => {
      if (!isDeletingWord && typedWord === fullWord) {
        setIsDeletingWord(true);
        return;
      }

      if (isDeletingWord && typedWord === "") {
        setIsDeletingWord(false);
        setTypedWordIndex((currentIndex) => (
          currentIndex + 1
        ) % HERO_TYPED_WORDS.length);
        return;
      }

      setTypedWord((currentWord) => {
        const nextLength = currentWord.length + (isDeletingWord ? -1 : 1);

        return fullWord.slice(0, nextLength);
      });
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeletingWord, typedWord, typedWordIndex]);

  return (
    <section ref={heroRef} className="hero">
      <div ref={parallaxRef} className="hero__parallax">
        <div className="hero__infinite-background">
          <div ref={sceneARef} className="hero__scene hero__scene--a">
            <img src={networkBg} className="hero__image" alt="" />
            <NetworkLights />
          </div>

          <div ref={sceneBRef} className="hero__scene hero__scene--b">
            <img src={networkBg} className="hero__image" alt="" />
            <NetworkLights />
          </div>
        </div>
      </div>

      <div className="hero__overlay" />

      <header
        ref={headerRef}
        className={`hero__header${hasHeaderGlass ? " hero__header--glass" : ""}${
          isHeaderOnLight ? " hero__header--light" : ""
        }${isHeaderTransitionInstant ? " hero__header--instant" : ""
        }`}
      >
        <a className="hero__brand" href="/" aria-label="Pathbit">
          <img className="hero__brand-symbol" src={pathbitSymbol} alt="" />
          <img className="hero__brand-logo" src={pathbitLogo} alt="" />
        </a>

        <nav className="hero__nav" aria-label="Navegação principal">
          <a href="#solucoes">Nossas soluções</a>
          <a href="#contato">Fale com a Path</a>
        </nav>
      </header>

      <div ref={contentRef} className="hero__content">
        <h1 className="hero__title">
          <span className="hero__title-line">Criamos o futuro</span>
          <span className="hero__title-line hero__title-line--dynamic">
            <span className="hero__title-static">com</span>
            <span className="hero__dynamic">
              <span className="hero__cursor" aria-hidden="true">
                |
              </span>
              <span className="hero__word">{typedWord}</span>
            </span>
          </span>
        </h1>

        <p className="hero__description">
          Transformamos desafios em soluções que impulsionam negócios.
        </p>
      </div>

      <a ref={exploreRef} className="hero__explore" href="#solucoes">
        <span className="hero__explore-icon" aria-hidden="true">
          <span />
          <span />
        </span>
        explore nossas solucoes
      </a>
    </section>
  );
}
