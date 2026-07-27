"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type IntroPhase = "hang" | "words" | "today";
type IntroBackground = "light" | "mist" | "dark" | "dark2";

type IntroAnimationProps = {
  onReveal: () => void;
};

const WORDS = [
  { text: "let's", time: 3100 },
  { text: "us", time: 3500 },
  { text: "automate", time: 3900 },
  { text: "your", time: 4300 },
  { text: "business", time: 4700 },
  { text: "around", time: 5100, shade: true },
  { text: "Tally", time: 5500, gold: true },
  { text: "today", time: 5900 },
] as const;

export function IntroAnimation({ onReveal }: IntroAnimationProps) {
  const [phase, setPhase] = useState<IntroPhase>("hang");
  const [background, setBackground] = useState<IntroBackground>("light");
  const [flashWord, setFlashWord] = useState("");
  const [isGold, setIsGold] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const timers = useRef<number[]>([]);
  const finished = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const schedule = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, delay);
    timers.current.push(timer);
  }, []);

  const finish = useCallback(() => {
    if (finished.current) return;

    finished.current = true;
    clearTimers();
    setIsLeaving(true);
    document.body.style.overflow = "";
    window.scrollTo({ top: 0 });
    onReveal();

    schedule(() => {
      setIsVisible(false);
    }, 650);
  }, [clearTimers, onReveal, schedule]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      finished.current = true;
      setIsVisible(false);
      document.body.style.overflow = "";
      onReveal();
      return;
    }

    document.body.style.overflow = "hidden";

    schedule(() => setBackground("mist"), 1800);

    schedule(() => {
      setBackground("dark");
      setPhase("words");
    }, 3100);

    WORDS.forEach((word) => {
      schedule(() => {
        setFlashWord(word.text);
        setIsGold(Boolean("gold" in word && word.gold));

        if ("shade" in word && word.shade) {
          setBackground("dark2");
        }
      }, word.time);
    });

    schedule(() => setPhase("today"), 6300);
    schedule(finish, 7850);

    return () => {
      clearTimers();
      document.body.style.overflow = "";
    };
  }, [clearTimers, finish, onReveal, schedule]);

  if (!isVisible) return null;

  const backgroundClass = {
    light: "",
    mist: "bg-mist",
    dark: "bg-dark",
    dark2: "bg-dark2",
  }[background];

  return (
    <div
      id="intro"
      data-phase={phase}
      className={`${backgroundClass} ${isLeaving ? "leaving" : ""}`}
      role="presentation"
    >
      <button id="skip-intro" type="button" onClick={finish}>
        Skip intro →
      </button>

      <div className="intro-texture" aria-hidden="true">
        <div className="texture-grid" />
        <div className="texture-rules" />

        <svg
          className="texture-figures"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <g
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="strong"
          >
            <path d="M60 130 V70 H120" />
            <path d="M1140 130 V70 H1080" />
            <path d="M60 670 V730 H120" />
            <path d="M1140 670 V730 H1080" />
          </g>

          <g
            className="spin-slow"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10 16"
            opacity=".9"
          >
            <circle cx="170" cy="600" r="96" />
          </g>

          <g
            className="spin-reverse"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 12"
          >
            <circle cx="1030" cy="210" r="128" />
          </g>

          <g
            className="bob-y"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          >
            <path d="M92 214 h132 v168 H92 z" />
            <path d="M112 250 h64 M112 278 h92 M112 306 h74" />
            <path
              d="M112 340 h44"
              stroke="currentColor"
              className="gold"
              strokeWidth="6"
            />
          </g>

          <g
            className="bob-y-reverse"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          >
            <path d="M986 512 h140 v150 H986 z" />
            <path d="M1008 546 h70 M1008 574 h96 M1008 602 h58" />
          </g>

          <g stroke="currentColor" strokeWidth="2.5">
            <path d="M250 470 H340 l30 30 H430" strokeDasharray="7 9" />
            <path d="M950 320 H860 l-30 -30 H770" strokeDasharray="7 9" />
          </g>

          <g fill="currentColor" className="gold">
            <circle cx="430" cy="500" r="7" />
            <circle cx="770" cy="290" r="7" />
          </g>

          <g fill="currentColor">
            <circle cx="250" cy="470" r="6" />
            <circle cx="950" cy="320" r="6" />
          </g>

          <g
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="gold"
          >
            <path d="M330 150 h30 M345 135 v30" />
            <path d="M880 690 h26 M893 677 v26" />
          </g>

          <g
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity=".8"
          >
            <path d="M150 380 h26 M163 367 v26" />
            <path d="M1070 430 h26 M1083 417 v26" />
          </g>

          <g
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gold"
          >
            <path d="M470 690 l14 16 26 -32" />
            <path d="M700 120 l14 16 26 -32" />
          </g>
        </svg>

        <div className="tallies">
          <Tally left="7%" delay="0s" />
          <Tally left="19%" delay="6.5s" scale={0.78} />
          <Tally left="78%" delay="3s" />
          <Tally left="90%" delay="10s" scale={0.7} />
          <Tally left="65%" delay="14s" scale={0.88} />
        </div>

        <div className="texture-ring" />
        <div className="texture-ring second" />

        <div className="texture-rails">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="intro-phase hang-phase">
        <div className="hang-stage">
          <span className="pull-string" />

          <div className="hey-group">
            <span className="hey hey-two">hey</span>
            <span className="hey hey-one">hey</span>
            <span className="hey hey-three">hey</span>
          </div>

          <span className="pull-ball" />

          <div className="stop-scrolling">
            <span>stop</span>
            <b>scrolling</b>
          </div>
        </div>
      </div>

      <div className="intro-phase words-phase">
        <span className={isGold ? "flash-word gold" : "flash-word"}>
          {flashWord}
        </span>
      </div>

      <div className="intro-phase today-phase">
        <div className="today-stack-wrap">
          <div className="today-stack">
            {Array.from({ length: 9 }, (_, index) => (
              <span key={index}>today</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type TallyProps = {
  left: string;
  delay: string;
  scale?: number;
};

function Tally({ left, delay, scale = 1 }: TallyProps) {
  return (
    <div
      className="tally"
      style={
        {
          left,
          animationDelay: delay,
          "--tally-scale": scale,
        } as React.CSSProperties
      }
    >
      <i />
      <i />
      <i />
      <i />
      <b />
    </div>
  );
}
