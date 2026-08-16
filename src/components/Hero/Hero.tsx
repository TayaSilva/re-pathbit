import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import networkBg from "../../assets/images/network-bg.png";
import "./Hero.css";
import { NetworkLights } from "./NetworkLights";

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
  const sceneARef = useRef<HTMLDivElement>(null);
  const sceneBRef = useRef<HTMLDivElement>(null);
  const [typedWord, setTypedWord] = useState("");
  const [typedWordIndex, setTypedWordIndex] = useState(0);
  const [isDeletingWord, setIsDeletingWord] = useState(false);

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

      <div className="hero__overlay" />

      <header className="hero__header">
        <a className="hero__brand" href="/" aria-label="Pathbit">
          PATHBIT
        </a>

        <nav className="hero__nav" aria-label="Navegação principal">
          <a href="#solucoes">nossas soluções</a>
          <a href="#contato">fale com a path</a>
        </nav>
      </header>

      <div className="hero__content">
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

      <a className="hero__explore" href="#solucoes">
        <span className="hero__explore-icon" aria-hidden="true">
          <span />
          <span />
        </span>
        explore nossas solucoes
      </a>
    </section>
  );
}
