import { ArrowUpRight, ChevronDown, ArrowRight, CornerDownRight, Hexagon, Aperture, Sun, Calendar } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { MegaNavigation } from './components/MegaNavigation';
import { motion, useScroll, useInView, useTransform, AnimatePresence, MotionValue } from 'motion/react';
import headerBackground from '../assets/image de fond de header.jpg';
import boutiqueImage1 from '../assets/service ~ boutiques/image 1.png';
import boutiqueImage2 from '../assets/service ~ boutiques/image 2.png';
import boutiqueImage3 from '../assets/service ~ boutiques/image 3.png';
import produitImage1 from '../assets/service ~ produit/image 1.png';
import produitImage2 from '../assets/service ~ produit/image 2.png';
import produitImage3 from '../assets/service ~ produit/Image 3.png';
import coachingImage1 from '../assets/service ~ coaching/Image 1.png';
import coachingImage2 from '../assets/service ~ coaching/image 2.png';
import coachingImage3 from '../assets/service ~ coaching/Image 3.png';

const WHATSAPP_LINK = 'https://wa.me/message/SGQCQZA5J56EE1';

function AnimatedSection({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 72, scale: 0.985, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

function CountUp({
  end,
  prefix = '',
  suffix = '',
  duration = 1400,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.55 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return;
    }

    let frame = 0;
    let startTime: number | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (time: number) => {
      startTime ??= time;
      const progress = Math.min((time - startTime) / duration, 1);
      setValue(Math.round(end * easeOut(progress)));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [duration, end, isInView]);

  return (
    <span ref={ref}>
      {prefix}{value}{suffix}
    </span>
  );
}

function ScrollRevealWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = Math.max(0, index * step - 0.08);
  const end = Math.min(1, start + step * 3.6);
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [28, 0]);
  const blur = useTransform(progress, [start, end], [12, 0]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.span className="inline-block mr-[0.18em]" style={{ opacity, y, filter }}>
      {word}
    </motion.span>
  );
}

function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 82%', 'end 35%'],
  });
  const words = text.split(' ');

  return (
    <motion.h2
      ref={ref}
      className={className}
    >
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <ScrollRevealWord
            word={word}
            index={index}
            total={words.length}
            progress={scrollYProgress}
          />
        </React.Fragment>
      ))}
    </motion.h2>
  );
}

function MouseFollower() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[9999] text-white/90 text-2xl font-light mix-blend-difference hidden md:block"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      +
    </div>
  );
}

interface StepItemProps {
  step: {
    num: string;
    badge: string;
    title: string;
    desc: string;
  };
}

const StepItem: React.FC<StepItemProps> = ({ step }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "1000px 0px -50% 0px" });

  return (
    <div ref={ref} className="relative flex items-start w-full pl-[30px] md:pl-[100px]">
      {/* Square Dot (visible on mobile) */}
      <div 
        className={`absolute left-0 md:left-[60px] top-[0.4rem] w-[10px] h-[10px] -translate-x-[calc(50%-0.5px)] z-30 transition-colors duration-300 ${isInView ? 'bg-[var(--color-accent)]' : 'bg-white border-2 border-[var(--color-ink)]/20'}`}
      ></div>

      {/* Number (hidden on mobile, shown on md) */}
      <div 
        className={`absolute left-0 top-[0.25rem] text-[0.75rem] font-medium tracking-wide hidden md:block w-[40px] text-right transition-colors duration-300 ${isInView ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink)]/40'}`}
      >
        {step.num}
      </div>

      {/* Content */}
      <div className="flex-1 w-full flex flex-col items-start pr-4">
        {/* Mobile Number/Badge - stacked */}
        <div className="md:hidden flex flex-col items-start gap-3 mb-5">
          <span className={`text-[0.85rem] font-medium tracking-tight transition-colors duration-300 ${isInView ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink)]/40'}`}>{step.num}</span>
          <div className="bg-[var(--color-accent)] text-[var(--color-ink)] text-[0.7rem] font-bold tracking-wide px-3.5 py-1.5 rounded-none">
            {step.badge}
          </div>
        </div>
        
        {/* Desktop Badge */}
        <div className="hidden md:inline-block bg-[var(--color-accent)] text-[var(--color-ink)] text-[0.7rem] font-bold tracking-wide px-3.5 py-1.5 rounded-none mb-4 md:mb-6">
          {step.badge}
        </div>
        <h3 className={`text-[1.35rem] md:text-[2rem] font-medium tracking-tight mb-4 md:mb-5 leading-[1.25] transition-colors duration-300 ${isInView ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink)]/70'}`}>
          {step.title}
        </h3>
        <p className={`text-[0.95rem] md:text-base leading-relaxed max-w-[420px] transition-colors duration-300 font-medium ${isInView ? 'text-[var(--color-ink)]/70' : 'text-[var(--color-ink)]/40'}`}>
          {step.desc}
        </p>
      </div>
    </div>
  );
}

function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const steps = [
    {
      num: '001',
      badge: 'Diagnostic',
      title: 'On comprend ton niveau et ton objectif.',
      desc: 'Débutant, déjà bloqué ou avancé: on clarifie ta situation, ton budget, ton ambition et les erreurs à éviter avant de construire quoi que ce soit.'
    },
    {
      num: '002',
      badge: 'Produit',
      title: 'On valide une direction produit exploitable.',
      desc: 'Tu ne pars pas au hasard. On cherche un produit avec un vrai potentiel, un angle de vente clair et une logique de marge défendable.'
    },
    {
      num: '003',
      badge: 'Création',
      title: 'On prépare la boutique et les publicités.',
      desc: 'Tu récupères un site Shopify optimisé, une présentation produit solide et des créatives TikTok & Meta prêtes à être diffusées.'
    },
    {
      num: '004',
      badge: 'Lancement',
      title: 'Tu pars avec une base opérationnelle.',
      desc: 'Le but est simple: te faire gagner du temps, réduire les risques inutiles et te donner une boutique prête à lancer sérieusement.'
    }
  ];

  return (
    <AnimatedSection id="methode" className="relative w-full overflow-visible z-10 bg-white text-[var(--color-ink)]">
      <div className="max-w-[2000px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-0">
        <div className="mb-16 md:mb-24">
          <span className="text-[0.8rem] font-medium tracking-tight text-[var(--color-ink)]/50 block mb-6">Le processus</span>
          <h2 className="text-[2.25rem] md:text-[5rem] lg:text-[7.5rem] font-medium leading-[0.9] tracking-tight text-[var(--color-ink)] max-w-5xl pr-4 md:pr-0">
            Une méthode claire pour lancer sans te disperser.
          </h2>
        </div>

        <div ref={containerRef} className="relative flex flex-col md:flex-row gap-12 md:gap-8 items-start mt-16 md:mt-32">
        
        {/* Left Sticky Column */}
        <div className="w-full md:w-5/12 sticky top-24 md:top-32 lg:top-40 pt-0 md:pt-4 z-10">
          <div className="text-[var(--color-accent)] text-[4rem] md:text-[6rem] leading-none mb-2 md:mb-4 font-bold" style={{fontFamily: 'serif'}}>“</div>
          <p className="text-[1.1rem] md:text-[1.75rem] font-medium leading-[1.3] text-[var(--color-ink)] mb-8 max-w-[280px] md:max-w-sm">
            Tu n’as pas besoin de maîtriser Shopify, le choix produit et la création publicitaire pour commencer proprement.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[var(--color-ink)] font-medium text-[0.95rem] tracking-tight">Cosmic Digital Studio</span>
              <span className="text-[var(--color-ink)]/50 text-[0.8rem] mt-0.5">Accompagnement e-commerce</span>
            </div>
          </div>
        </div>

        {/* Right Scrolling Column */}
        <div className="w-full md:w-7/12 relative mt-8 md:mt-0 pb-[15vh]">
          {/* Background Timeline Line */}
          <div className="absolute left-0 md:left-[60px] top-3 -bottom-32 md:-bottom-40 lg:-bottom-48 w-px bg-[var(--color-ink)]/10 z-0"></div>
          
          {/* Animated Scroll Progress Line */}
          <motion.div 
            className="absolute left-0 md:left-[60px] top-3 -bottom-32 md:-bottom-40 lg:-bottom-48 w-0.5 bg-[var(--color-accent)] origin-top z-20"
            style={{ scaleY: scrollYProgress, translateX: '-0.5px' }}
          ></motion.div>

          <div className="flex flex-col gap-12 md:gap-32 w-full pt-4 md:pt-0">
            {steps.map((step, i) => (
              <StepItem key={i} step={step} />
            ))}
          </div>
        </div>

        </div>
      </div>
    </AnimatedSection>
  );
}

function TeamSection() {
  return (
    <AnimatedSection id="equipe" className="relative w-full bg-[var(--color-accent-soft)] pt-24 pb-16 md:pt-32 md:pb-24 xl:pt-40 xl:pb-32 overflow-hidden z-20">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/60 via-[var(--color-accent)]/10 to-[var(--color-primary)]/10 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-[2000px] mx-auto px-6 md:px-12 flex flex-col justify-between h-full"> 
        <div className="flex flex-col lg:flex-row items-start font-medium mb-10 lg:mb-24">
          <div className="w-full lg:w-3/12 mb-6 lg:mb-0 pt-2 lg:pl-4">
            <span className="text-[0.85rem] font-medium tracking-tight text-[var(--color-primary)] block">L'equiqe</span>
          </div>
          <div className="w-full lg:w-9/12 lg:pr-12">
            <WordReveal
              text="On est des stratèges, créatifs et experts e-commerce qui rendent le lancement en ligne simple, rapide et sans stress."
              className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] tracking-tighter leading-[0.9] text-[var(--color-ink)] font-medium max-w-5xl"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 lg:gap-8 mt-12 mb-20 w-full">
          <div className="w-full lg:w-4/12 flex items-start gap-4 text-[var(--color-primary)] lg:pl-4">
            <div className="mt-1">
              <ArrowRight size={20} className="opacity-90" strokeWidth={1.5} />
            </div>
            <p className="text-[1.35rem] md:text-xl font-medium leading-[1.2] tracking-tight text-[var(--color-ink)]">
              Pas d'intermédiaires, pas de stagiaires sur ton projet. Tu travailles directement avec notre équipe senior.
            </p>
          </div>
          
          <div className="w-full h-px bg-[var(--color-primary)]/30 my-4 md:hidden"></div>

          <div className="w-full lg:w-7/12 flex flex-col pl-0 lg:pl-12">
            <div className="flex flex-col items-start w-full">
              
              <div className="w-full max-w-lg flex flex-col">
                <p className="text-[var(--color-ink)]/80 text-[0.95rem] md:text-base leading-relaxed mb-10 font-medium">
                  De la création de boutique Shopify clé en main au marketing digital orienté résultats, on gère chaque étape pour accélérer ton lancement — et tes premières ventes.
                </p>

                <div className="w-full sm:w-auto pr-6 sm:pr-0">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-[var(--color-primary-dark)] text-white px-6 py-4 flex items-center justify-center gap-4 font-bold text-[0.95rem] tracking-wide hover:bg-[var(--color-primary)] transition-colors w-full sm:w-auto rounded-none">
                    Parler avec nous <ArrowUpRight size={18} strokeWidth={2.5} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </AnimatedSection>
  );
}

function CasesSection() {
  const cases = [
    {
      id: "001",
      logoIcon: <Hexagon size={18} fill="currentColor" className="text-white/80" />,
      logoText: "Boutiques lancées",
      stat: "120+",
      desc: "boutiques Shopify\nlancées",
      date: "Inclus"
    },
    {
      id: "003",
      logoIcon: <Aperture size={18} strokeWidth={2.5} className="text-white/80" />,
      logoText: "Personnes accompagnées",
      stat: "350+",
      desc: "entrepreneurs\nguidés",
      date: "Inclus"
    },
    {
      id: "002",
      logoIcon: <Sun size={18} strokeWidth={2.5} className="text-white/80" />,
      logoText: "Chiffre d'affaires généré",
      stat: "+12M",
      desc: "euros de CA\ngénérés",
      date: "Inclus"
    }
  ];

  return (
    <AnimatedSection id="resultats" className="relative w-full bg-[var(--color-primary-dark)]">
      <div className="max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10 border-t border-b border-white/10">
        {cases.map((c, i) => (
          <motion.div
            key={i}
            className="flex flex-col p-8 md:p-12 lg:p-16 min-h-[450px] lg:min-h-[550px] justify-between group hover:bg-[var(--color-accent)]/[0.04] transition-colors relative overflow-hidden"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            
            {/* Ticks pattern removed */}

            <div className="z-10 relative">
              <div className="text-[0.7rem] font-bold tracking-widest text-white/40 mb-6 uppercase">Pilier {c.id}</div>
              <div className="flex items-center gap-2.5 text-white font-bold tracking-tight text-lg mb-12">
                {c.logoIcon}
                {c.logoText}
              </div>
            </div>

            <div className="mt-auto z-10 relative">
              <div className="text-[5.5rem] lg:text-[7rem] font-medium tracking-tighter text-white leading-none mb-8">
                {c.stat === '120+' && <CountUp end={120} suffix="+" />}
                {c.stat === '350+' && <CountUp end={350} suffix="+" />}
                {c.stat === '+12M' && <CountUp end={12} prefix="+" suffix="M" />}
              </div>
              
              <div className="flex items-end justify-between w-full">
                <p className="text-white/60 text-sm md:text-base leading-snug whitespace-pre-line font-medium tracking-tight">
                  {c.desc}
                </p>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-none px-3.5 py-1.5 text-white/70 text-[0.7rem] font-bold tracking-wider uppercase backdrop-blur-sm">
                  <Calendar size={12} strokeWidth={2.5} />
                  {c.date}
                </div>
              </div>
            </div>
            
            {/* Subtle Gradient overlay for wave feel */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--color-accent)]/[0.08] to-transparent pointer-events-none opacity-40"></div>
          </motion.div>
        ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const faqs = [
    {
      question: "Je débute complètement. Est-ce que c’est fait pour moi ?",
      answer: "Oui. L’offre est pensée pour les personnes qui veulent lancer une boutique e-commerce sans compétences techniques. Tu n’as pas besoin de savoir créer un site, choisir un thème ou produire des publicités."
    },
    {
      question: "J’ai déjà essayé l’e-commerce sans résultat. Qu’est-ce qui change ?",
      answer: "On ne te livre pas seulement un site. On travaille aussi la sélection du produit, l’angle marketing et les créatives publicitaires. Le but est de réduire les décisions hasardeuses qui font perdre du temps et de l’argent."
    },
    {
      question: "Pourquoi passer par WhatsApp ?",
      answer: "WhatsApp permet d’échanger vite, de qualifier ton projet et de comprendre ton niveau sans formulaire compliqué. C’est le point d’entrée unique pour recevoir un devis adapté."
    },
    {
      question: "Est-ce que le produit est vraiment inclus ?",
      answer: "Oui. La recherche d’un produit à fort potentiel fait partie de la prestation. L’objectif est que tu ne démarres pas avec une boutique vide ou un produit choisi au hasard."
    },
    {
      question: "Les publicités sont-elles prêtes à diffuser ?",
      answer: "Tu reçois des créatives pensées pour TikTok et Meta. Elles servent de base pour lancer tes premiers tests publicitaires plus rapidement."
    }
  ];

  return (
    <AnimatedSection id="faq" className="relative w-full bg-white text-[var(--color-ink)]">
      <div className="max-w-[2000px] mx-auto px-6 md:px-12 py-24 md:py-32 lg:py-40">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side */}
        <div className="w-full lg:w-5/12 flex flex-col items-start pt-4">
          <h2 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-medium tracking-tighter leading-[0.9] text-[var(--color-ink)] mb-8 lg:mb-16">
            FAQ.
          </h2>
          <p className="text-[1.2rem] md:text-[1.35rem] font-medium tracking-tight leading-[1.3] text-[var(--color-ink)] mb-12 max-w-[280px]">
            Les réponses aux blocages les plus fréquents avant de lancer une boutique.
          </p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-4 px-6 md:px-7 py-3.5 md:py-4 rounded-none border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors text-[0.95rem] font-bold tracking-wide">
            Poser ma question <ArrowUpRight size={18} strokeWidth={2.5} />
          </a>
        </div>

        {/* Right Side - Accordion */}
        <div className="w-full lg:w-7/12 flex flex-col lg:pt-8">
          <div className="border-t border-[var(--color-ink)]/10">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[var(--color-ink)]/10">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 md:py-8 text-left hover:text-[var(--color-primary)] transition-colors group"
                >
                  <span className="text-base md:text-lg lg:text-xl font-medium tracking-tight pr-4">{faq.question}</span>
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-none bg-[var(--color-accent-soft)] group-hover:bg-[var(--color-accent)]/25 transition-colors flex items-center justify-center shrink-0">
                     <ChevronDown 
                        size={14} 
                        strokeWidth={2.5}
                        className={`text-[var(--color-primary)] transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                     />
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 pb-6 md:pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-[var(--color-ink)]/60 text-sm md:text-base leading-relaxed pr-12 font-medium tracking-tight">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        </div>
      </div>
    </AnimatedSection>
  );
}

function ContactAndFooterSection() {
  return (
    <>
      {/* Top CTA */}
      <AnimatedSection id="contact" className="relative w-full bg-[linear-gradient(135deg,var(--color-accent-soft)_0%,var(--color-surface)_48%,#f3ddff_100%)] py-32 md:py-48 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden z-10">
        {/* Cross Pattern Background */}
        <div 
          className="absolute inset-[-50%] z-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><path d="M 30 15 L 30 45 M 15 30 L 45 30" stroke="%234b166f" stroke-width="1.5" stroke-linecap="round" fill="none" /></svg>')`,
            backgroundSize: '60px 60px',
            transform: 'rotate(-8deg) scale(1.2)'
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
          {/* Removed Contact badge */}
          
          <h2 className="text-[var(--color-ink)] text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.76] font-medium tracking-tighter mb-12 max-w-4xl">
            Prêt à lancer<br/>ta boutique ?
          </h2>
          
          <div className="flex w-full sm:w-auto items-center justify-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none justify-center bg-[var(--color-primary-dark)] text-white px-8 py-4 rounded-none text-[0.95rem] font-bold tracking-wide hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] transition-colors flex items-center gap-4 border border-[var(--color-primary-dark)]">
              Discuter maintenant <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* Bottom Footer */}
      <footer className="relative w-full bg-[var(--color-primary-dark)] text-[var(--color-accent-soft)] overflow-hidden z-20">
        <div className="max-w-[2000px] mx-auto relative z-10 px-6 md:px-12 pt-24 pb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24 md:mb-32">
            
            {/* Left Box */}
            <div className="w-full lg:w-4/12 flex flex-col items-start gap-8">
              <p className="text-[var(--color-accent-soft)] text-[1.2rem] md:text-[1.35rem] font-medium leading-[1.3] tracking-tight">
                Tu veux savoir si ton projet e-commerce est viable ? Envoie-nous un message sur WhatsApp et on cadre la suite.
              </p>
              
              <div className="flex items-center gap-0 w-full sm:w-auto mt-4">
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none justify-center bg-[var(--color-accent-soft)] text-[var(--color-primary-dark)] px-7 py-3.5 rounded-none text-[0.95rem] font-bold tracking-wide hover:bg-white transition-colors flex items-center gap-4">
                  Démarrer maintenant <ArrowUpRight size={18} strokeWidth={2.5} />
                </a>
              </div>
            </div>

            {/* Right Links */}
            <div className="w-full lg:w-6/12 flex flex-col md:flex-row justify-between md:justify-end gap-12 md:gap-32 lg:pr-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[var(--color-accent-soft)]/60 text-[0.7rem] font-bold tracking-widest uppercase mb-4">
                  <CornerDownRight size={14} className="opacity-70" /> PAGES
                </div>
                <div className="flex flex-col gap-3">
                  {['Accueil', 'Offre', 'Méthode', 'Services', 'FAQ', 'WhatsApp'].map(link => (
                    <a key={link} href="#" className="text-[var(--color-accent-soft)] hover:text-white transition-colors text-[1rem] font-medium tracking-tight">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Huge Logo and Copyright */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-[var(--color-accent-soft)]/10 pt-10">
            <h1 className="text-[4rem] md:text-[9rem] lg:text-[13rem] leading-[0.8] font-medium text-[var(--color-accent-soft)] tracking-tighter">
              ©CDS
            </h1>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 text-[var(--color-accent-soft)]/60 text-[0.65rem] font-bold tracking-widest uppercase pb-2">
              <span>AGENCE E-COMMERCE</span>
              <span>©2026 Cosmic Digital Studio</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Simulate complex loading
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 min-h-[100dvh] z-[10000] flex items-center justify-center overflow-hidden bg-white"
    >
      <img
        src={headerBackground}
        alt="Loading background"
        className="absolute inset-0 h-full w-full object-cover opacity-95"
      />
      <div className="absolute inset-0 bg-[var(--color-primary-dark)]/10"></div>
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-[var(--color-primary-dark)] text-2xl md:text-5xl font-medium tracking-tight capitalize text-center font-geist drop-shadow-[0_1px_16px_rgba(255,255,255,0.9)]"
        >
          Cosmic <br className="md:hidden" /> Digital Studio
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeService, setActiveService] = useState<number | null>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);

  const mobileMenuItems = [
    {
      id: 'offre',
      label: 'Offre',
      links: [
        { label: 'Boutique Shopify optimisée', href: '#services' },
        { label: 'Produit validé', href: '#services' },
        { label: 'Créatives TikTok & Meta', href: '#services' },
      ],
    },
    {
      id: 'agence',
      label: 'Agence',
      links: [
        { label: 'Méthode', href: '#methode' },
        { label: 'Accompagnement', href: '#contact' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    {
      id: 'solutions',
      label: 'Solutions',
      links: [
        { label: 'Shopify', href: '#services' },
        { label: 'Produit', href: '#services' },
        { label: 'Publicités', href: '#services' },
      ],
    },
  ];

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  const services = [
    {
      id: '001',
      title: 'Boutique Shopify optimisée',
      description: 'Une boutique claire, rapide et pensée pour rassurer le visiteur, présenter le produit et faciliter le passage à l’achat.',
      images: [
        boutiqueImage1,
        boutiqueImage2,
        boutiqueImage3
      ]
    },
    {
      id: '002',
      title: 'Produit à fort potentiel',
      description: 'Une recherche produit structurée pour éviter de lancer une boutique autour d’une idée faible ou choisie au hasard.',
      images: [
        produitImage1,
        produitImage2,
        produitImage3,
      ]
    },
    {
      id: '003',
      title: 'Créatives TikTok & Meta',
      description: 'Des contenus publicitaires prêts à tester pour TikTok Ads et Meta Ads, avec des angles pensés pour attirer l’attention.'
    },
    {
      id: '004',
      title: 'Accompagnement au lancement',
      description: 'Un cadrage humain pour avancer sans jargon, comprendre quoi faire ensuite et éviter les erreurs qui coûtent cher.',
      images: [
        coachingImage1,
        coachingImage2,
        coachingImage3
      ]
    }
  ];

  return (
    <div className="relative bg-[var(--color-primary-dark)] selection:bg-[var(--color-accent)] selection:text-[var(--color-ink)] overflow-x-hidden text-white w-full" style={{ fontFamily: '"Geist", sans-serif' }}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <MouseFollower />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
        {/* --- BACKGROUND ART --- */}
        <div className="absolute inset-0 z-0">
          <img
            src={headerBackground}
            alt="Wind turbines on green hills"
            className="w-full h-full object-cover object-bottom opacity-100"
          />
        </div>



        {/* --- HEADER --- */}
        <header className="absolute top-0 left-0 w-full z-20 pointer-events-none">
          <div
            className="max-w-[2000px] mx-auto p-4 md:p-5 flex justify-center items-start"
            style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
          >
          {/* Left Nav Box */}
          <div className="flex bg-white w-full md:w-auto px-6 py-4 items-center justify-between md:justify-center md:gap-10 rounded-none shadow-sm min-h-[72px] relative pointer-events-auto">
            <div className="font-semibold text-lg tracking-tight text-[var(--color-ink)] flex items-center h-10">
              Cosmic Digital Studio
            </div>
            <MegaNavigation />
            <div className="hidden md:flex items-center gap-0">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-[var(--color-accent)] text-[var(--color-ink)] px-6 py-3 rounded-none text-xs font-semibold tracking-wide hover:bg-[var(--color-accent-soft)] transition-colors shadow-sm border border-transparent">
                Contact
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-[var(--color-accent)] text-[var(--color-ink)] p-3 rounded-none hover:bg-[var(--color-accent-soft)] transition-colors flex items-center justify-center shadow-sm border border-transparent">
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>
            </div>
            
            {/* Hamburger on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden text-[var(--color-ink)] hover:opacity-70 transition-opacity"
              aria-label="Ouvrir le menu"
              aria-expanded={isMobileMenuOpen}
            >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <line x1="4" y1="9" x2="20" y2="9"></line>
                 <line x1="4" y1="15" x2="20" y2="15"></line>
               </svg>
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute top-full left-0 w-full md:hidden bg-white border-t border-[var(--color-primary)]/10 shadow-lg"
                >
                  <div className="px-4 py-3 flex flex-col">
                    {mobileMenuItems.map((item) => {
                      const isOpen = activeMobileMenu === item.id;
                      return (
                        <div key={item.id} className="border-b border-[var(--color-primary)]/10 last:border-b-0">
                          <button
                            onClick={() => setActiveMobileMenu(isOpen ? null : item.id)}
                            className="w-full flex items-center justify-between py-3 text-left text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--color-ink)]"
                          >
                            {item.label}
                            <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="overflow-hidden"
                              >
                                <div className="pb-3 flex flex-col gap-1">
                                  {item.links.map((link) => (
                                    <a
                                      key={link.label}
                                      href={link.href}
                                      className="block px-2 py-2 text-sm text-[var(--color-ink)]/80 hover:text-[var(--color-primary)] hover:bg-[var(--color-accent-soft)] transition-colors"
                                      onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setActiveMobileMenu(null);
                                      }}
                                    >
                                      {link.label}
                                    </a>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </div>
        </header>

        {/* --- HERO CONTENT --- */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 w-full pt-[100px] md:pt-0">
          
          <h1 className="text-[3.2rem] leading-[1.05] md:text-6xl lg:text-[5.5rem] font-medium tracking-tight text-[var(--color-primary-dark)] mb-6 drop-shadow-[0_2px_18px_rgba(255,255,255,0.92)] max-w-[90vw]">
            Lance ta boutique<br className="md:hidden"/> e-commerce <br className="hidden md:block"/> sans partir<br className="md:hidden"/> de zéro
          </h1>
          
          <p className="text-[var(--color-ink)] text-base md:text-base max-w-[320px] md:max-w-[550px] mb-10 leading-relaxed font-medium drop-shadow-[0_1px_12px_rgba(255,255,255,0.9)]">
            Site Shopify optimisé, produit à fort potentiel validé et créatives TikTok & Meta prêtes à diffuser. Une solution clé en main pour débutants, profils avancés ou personnes qui ont déjà échoué.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-1">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-[var(--color-accent)] text-[var(--color-ink)] px-7 py-3 rounded-none text-[0.95rem] font-medium tracking-wide hover:bg-white transition-colors shadow-lg">
              Demander un devis
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-[var(--color-accent)] text-[var(--color-ink)] p-3.5 rounded-none hover:bg-white transition-colors flex items-center justify-center shadow-lg">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
          </div>
        </main>

        {/* --- SCROLL BOTTOM --- */}
        <div
          className="relative z-20 w-full pb-8 flex justify-center items-center"
          style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
        >
          <span className="text-[0.6rem] font-bold tracking-[0.2em] text-[var(--color-primary-dark)]/80 uppercase cursor-pointer hover:text-[var(--color-primary-dark)] transition-colors drop-shadow-[0_1px_10px_rgba(255,255,255,0.9)]">
            Découvrir l’offre
          </span>
        </div>
      </section>

      {/* --- NEW SECTION --- */}
      <AnimatedSection id="offre" className="relative w-full bg-white text-[var(--color-ink)]">
        <div className="relative z-10 max-w-[2000px] mx-auto px-6 md:px-12 py-24 md:py-32 xl:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-4 items-start">
          <div className="md:col-span-4 pl-0 lg:pl-10">
            <h3 className="font-bold text-[0.95rem] tracking-tight text-[var(--color-accent)]">
              Offre clé en main
            </h3>
          </div>
          <div className="md:col-span-8 max-w-2xl pr-0 md:pr-4">
            <h2 className="text-[2.1rem] md:text-[2.25rem] lg:text-[2.5rem] font-medium leading-[1.1] mb-8 text-[var(--color-ink)] tracking-tight">
              Tu obtiens une base e-commerce complète: une boutique Shopify prête à vendre, un produit sélectionné avec méthode et des créatives publicitaires pour lancer tes premiers tests.
            </h2>
            <p className="text-[var(--color-ink)]/60 text-base leading-relaxed max-w-[340px] md:max-w-lg mb-10">
              L’objectif est de te faire gagner du temps, d’éviter les choix hasardeux et de réduire les risques financiers inutiles avant de lancer.
            </p>
            
            {/* Button matched to DA */}
            <div className="flex items-center gap-0 w-full sm:w-auto">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none justify-center bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] px-7 py-3.5 rounded-none text-[0.8rem] font-bold tracking-wide hover:bg-[var(--color-primary)] hover:text-white transition-colors flex items-center gap-4">
                Parler du projet <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
        </div>
      </AnimatedSection>

      {/* --- ANALYTICS SECTION --- */}
      <AnimatedSection id="chiffres" className="relative w-full border-t border-[var(--color-primary)]/5 bg-[var(--color-surface)] text-[var(--color-ink)]">
        <div className="max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary)]/10">
          
          {/* Card 1 */}
          <motion.div
            className="flex flex-col p-8 pt-10 md:p-12 lg:p-16 min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full flex justify-end mb-4">
              <span className="text-[0.8rem] font-medium tracking-tight text-[var(--color-primary)]/45">001</span>
            </div>
            <div className="flex-1 flex flex-col justify-start md:justify-center">
              <div className="text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] font-medium tracking-tighter text-[var(--color-primary)] leading-none mb-10 md:mb-0">
                <CountUp end={3} />
              </div>
            </div>
            <div className="w-full flex justify-end">
              <p className="text-[0.95rem] md:text-base text-[var(--color-ink)]/60 leading-relaxed text-right max-w-[200px] md:max-w-[250px] font-medium">
                piliers livrés ensemble:<br className="hidden md:block" /> boutique, produit, créatives.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="flex flex-col p-8 pt-10 md:p-12 lg:p-16 min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full flex justify-end mb-4">
              <span className="text-[0.8rem] font-medium tracking-tight text-[var(--color-primary)]/45">002</span>
            </div>
            <div className="flex-1 flex flex-col justify-start md:justify-center">
              <div className="text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] font-medium tracking-tighter text-[var(--color-primary)] leading-none mb-10 md:mb-0">
                <CountUp end={0} />
              </div>
            </div>
            <div className="w-full flex justify-end">
              <p className="text-[0.95rem] md:text-base text-[var(--color-ink)]/60 leading-relaxed text-right max-w-[200px] md:max-w-[250px] font-medium">
                compétence technique requise pour démarrer.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="flex flex-col p-8 pt-10 md:p-12 lg:p-16 min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full flex justify-end mb-4">
              <span className="text-[0.8rem] font-medium tracking-tight text-[var(--color-primary)]/45">003</span>
            </div>
            <div className="flex-1 flex flex-col justify-start md:justify-center">
              <div className="text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] font-medium tracking-tighter text-[var(--color-primary)] leading-none mb-10 md:mb-0">
                X
              </div>
            </div>
            <div className="w-full flex justify-end">
              <p className="text-[0.95rem] md:text-base text-[var(--color-ink)]/60 leading-relaxed text-right max-w-[200px] md:max-w-[250px] font-medium">
                Adapté aux débutants ou expérimentés.
              </p>
            </div>
          </motion.div>

        </div>
        </div>
      </AnimatedSection>

      {/* --- SERVICES SECTION --- */}
      <AnimatedSection id="services" className="relative w-full bg-white text-[var(--color-ink)]">
        <div className="max-w-[2000px] mx-auto px-6 md:px-12 py-24 md:py-32 lg:py-40">
        <div className="text-left mb-16 md:mb-24">
          <h2 className="text-[3.5rem] md:text-[6rem] lg:text-[10rem] font-medium tracking-tighter leading-none text-[var(--color-ink)]">
            Services
          </h2>
        </div>

        <div className="w-full flex flex-col border-t border-[var(--color-primary)]/10">
          {services.map((service, index) => {
            const isActive = activeService === index;

            return (
              <div
                key={service.id}
                onClick={() => setActiveService(isActive ? null : index)}
                className="grid grid-cols-12 gap-4 py-8 md:py-12 border-b border-[var(--color-primary)]/10 group cursor-pointer hover:bg-[var(--color-accent-soft)]/50 transition-colors"
              >
                <div className="col-span-2 md:col-span-3 flex items-start pl-0 md:pl-8 lg:pl-12 pt-2 md:pt-4">
                  <ArrowRight strokeWidth={1.5} className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${isActive ? 'text-[var(--color-accent)] translate-x-2' : 'text-[var(--color-primary)]/30 group-hover:text-[var(--color-primary)]/70'}`} />
                </div>
                <div className="col-span-10 md:col-span-9 pr-0 md:pr-4">
                  <div className="flex flex-col md:flex-row items-start">
                    {isActive && <span className="text-[0.8rem] font-medium tracking-tight text-[var(--color-primary)] mb-2 md:mb-0 md:hidden">{service.id}</span>}
                    <h3 className={`font-medium tracking-tight transition-all duration-300 ${isActive ? 'text-[2.25rem] md:text-[4.5rem] lg:text-[5.5rem] text-[var(--color-ink)] leading-none' : 'text-[1.5rem] md:text-[2rem] text-[var(--color-ink)]/70 group-hover:text-[var(--color-ink)]'}`}>
                      {service.title}
                    </h3>
                    {isActive && <span className="hidden md:block text-[0.8rem] font-medium tracking-tight text-[var(--color-primary)] ml-4 md:ml-6 mt-1 md:mt-2">{service.id}</span>}
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key={`service-content-${service.id}`}
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 md:mt-12">
                          <p className="text-[0.95rem] md:text-base text-[var(--color-ink)]/70 max-w-[340px] md:max-w-[400px] leading-relaxed ml-2 md:ml-6 font-medium">
                            {service.description}
                          </p>

                          <div className="mt-8 flex items-center ml-2 md:ml-6 w-full sm:w-auto pr-6 sm:pr-0">
                            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none justify-center bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] px-7 py-3.5 rounded-none text-[0.95rem] font-bold tracking-wide hover:bg-[var(--color-primary)] hover:text-white transition-colors flex items-center gap-4">
                              En parler maintenant <ArrowUpRight size={18} strokeWidth={2.5} />
                            </a>
                          </div>

                      {service.images && (
                        <div className="mt-12 md:mt-16 flex flex-col md:flex-row gap-4 md:gap-6 overflow-visible md:overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                              {service.images.map((img, i) => (
                             <div key={i} className="w-full md:w-[400px] lg:w-[450px] h-[250px] md:h-[300px] lg:h-[338px] rounded-none overflow-hidden shrink-0">
                                    <img src={img} alt={`${service.title} preview ${i + 1}`} className="w-full h-full object-cover" />
                                 </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </AnimatedSection>

      {/* --- QUOTE / CTA SECTION --- */}
      <AnimatedSection className="relative w-full overflow-hidden bg-[var(--color-surface)] text-[var(--color-ink)]">
        <div className="max-w-[2000px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-[1.2] text-[var(--color-ink)] tracking-tight">
            Une boutique rentable ne commence pas par un template au hasard. Elle commence par un produit clair, une page crédible et des contenus publicitaires prêts à tester.
          </h2>
        </div>

        {/* Decorative ticks removed */}

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-start gap-4 md:gap-6 max-w-lg">
            <div className="flex flex-col">
              <p className="text-[var(--color-ink)]/70 text-sm md:text-base leading-relaxed mb-3">
                Le but n’est pas de te vendre une formation de plus. Le but est de te livrer une base opérationnelle pour lancer plus vite, avec moins d’incertitude.
              </p>
              <span className="text-[var(--color-primary)] font-medium text-sm tracking-wide">Cosmic Digital Studio</span>
            </div>
          </div>
          
          <div className="flex flex-shrink-0">
            <div className="flex items-center gap-0">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-[var(--color-accent)] text-[var(--color-ink)] px-7 py-3.5 rounded-none text-[0.8rem] font-medium tracking-wide hover:bg-[var(--color-primary)] hover:text-white transition-colors shadow-sm">
                Démarrer maintenant
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-[var(--color-accent)] text-[var(--color-ink)] p-3.5 rounded-none hover:bg-[var(--color-primary)] hover:text-white transition-colors flex items-center justify-center shadow-sm">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
        </div>
      </AnimatedSection>

      <ProcessSection />

      <TeamSection />

      <CasesSection />

      <FaqSection />

      <ContactAndFooterSection />
    </div>
  );
}
