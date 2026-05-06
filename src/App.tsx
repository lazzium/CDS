import { ArrowUpRight, ChevronDown, ArrowRight, CornerDownRight, Hexagon, Aperture, Sun, Calendar } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { MegaNavigation } from './components/MegaNavigation';
import { motion, useScroll, useInView, AnimatePresence } from 'motion/react';

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
      className="pointer-events-none fixed z-[9999] text-white/90 text-2xl font-light mix-blend-difference"
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
        className={`absolute left-0 md:left-[60px] top-[0.4rem] w-[10px] h-[10px] -translate-x-[calc(50%-0.5px)] z-30 transition-colors duration-300 ${isInView ? 'bg-[#dcf5a1]' : 'bg-white border-2 border-[#1a1a1a]/20'}`}
      ></div>

      {/* Number (hidden on mobile, shown on md) */}
      <div 
        className={`absolute left-0 top-[0.25rem] text-[0.75rem] font-medium tracking-wide hidden md:block w-[40px] text-right transition-colors duration-300 ${isInView ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/40'}`}
      >
        {step.num}
      </div>

      {/* Content */}
      <div className="flex-1 w-full flex flex-col items-start pr-4">
        {/* Mobile Number/Badge - stacked */}
        <div className="md:hidden flex flex-col items-start gap-3 mb-5">
          <span className={`text-[0.85rem] font-medium tracking-tight transition-colors duration-300 ${isInView ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/40'}`}>{step.num}</span>
          <div className="bg-[#dcf5a1] text-[#1c1c1c] text-[0.7rem] font-bold tracking-wide px-3.5 py-1.5 rounded-none">
            {step.badge}
          </div>
        </div>
        
        {/* Desktop Badge */}
        <div className="hidden md:inline-block bg-[#dcf5a1] text-[#1c1c1c] text-[0.7rem] font-bold tracking-wide px-3.5 py-1.5 rounded-none mb-4 md:mb-6">
          {step.badge}
        </div>
        <h3 className={`text-[1.35rem] md:text-[2rem] font-medium tracking-tight mb-4 md:mb-5 leading-[1.25] transition-colors duration-300 ${isInView ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/70'}`}>
          {step.title}
        </h3>
        <p className={`text-[0.95rem] md:text-base leading-relaxed max-w-[420px] transition-colors duration-300 font-medium ${isInView ? 'text-[#1a1a1a]/70' : 'text-[#1a1a1a]/40'}`}>
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
      badge: 'Discovery',
      title: 'We listen first—no jargon.',
      desc: 'This phase sets the foundation for everything that follows by clarifying goals, uncovering opportunities, and identifying any potential challenges early on.'
    },
    {
      num: '002',
      badge: 'Strategy',
      title: 'We create a comprehensive roadmap for success.',
      desc: 'From positioning and messaging to user journeys and content structure, we define how your digital presence will work—and win.'
    },
    {
      num: '003',
      badge: 'Creation',
      title: 'We build your digital assets with precision.',
      desc: 'Our design and development teams bring the strategy to life with pixel-perfect visuals and robust code.'
    },
    {
      num: '004',
      badge: 'Launch',
      title: 'We ensure a smooth rollout.',
      desc: 'Before the world sees it, we rigorously test your product. Once approved, we ensure a flawless launch and ongoing stability.'
    }
  ];

  return (
    <section className="relative w-full pt-24 md:pt-32 pb-0 px-6 md:px-12 max-w-[2000px] mx-auto overflow-visible z-10 bg-white text-[#1a1a1a]">
      <div className="mb-16 md:mb-24">
        <span className="text-[0.8rem] font-medium tracking-tight text-[#1a1a1a]/50 block mb-6">The process</span>
        <h2 className="text-[2.25rem] md:text-[5rem] lg:text-[7.5rem] font-medium leading-[0.9] tracking-tight text-[#1a1a1a] max-w-5xl pr-4 md:pr-0">
          How we guide every single project to the finish line.
        </h2>
      </div>

      <div ref={containerRef} className="relative flex flex-col md:flex-row gap-12 md:gap-8 items-start mt-16 md:mt-32">
        
        {/* Left Sticky Column */}
        <div className="w-full md:w-5/12 sticky top-24 md:top-32 lg:top-40 pt-0 md:pt-4 z-10">
          <div className="text-[#dcf5a1] text-[4rem] md:text-[6rem] leading-none mb-2 md:mb-4 font-bold" style={{fontFamily: 'serif'}}>“</div>
          <p className="text-[1.1rem] md:text-[1.75rem] font-medium leading-[1.3] text-[#1a1a1a] mb-8 max-w-[280px] md:max-w-sm">
            Each phase is handled by specialists who work together seamlessly, ensuring nothing falls through the cracks.
          </p>
          <div className="flex items-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" 
              alt="Taylor Kim" 
              className="w-12 h-12 md:w-14 md:h-14 rounded-none object-cover grayscale opacity-80" 
            />
            <div className="flex flex-col">
              <span className="text-[#1a1a1a] font-medium text-[0.95rem] tracking-tight">Taylor Kim</span>
              <span className="text-[#1a1a1a]/50 text-[0.8rem] mt-0.5">Client Success Manager</span>
            </div>
          </div>
        </div>

        {/* Right Scrolling Column */}
        <div className="w-full md:w-7/12 relative mt-8 md:mt-0 pb-[15vh]">
          {/* Background Timeline Line */}
          <div className="absolute left-0 md:left-[60px] top-3 -bottom-32 md:-bottom-40 lg:-bottom-48 w-px bg-[#1a1a1a]/10 z-0"></div>
          
          {/* Animated Scroll Progress Line */}
          <motion.div 
            className="absolute left-0 md:left-[60px] top-3 -bottom-32 md:-bottom-40 lg:-bottom-48 w-0.5 bg-[#dcf5a1] origin-top z-20"
            style={{ scaleY: scrollYProgress, translateX: '-0.5px' }}
          ></motion.div>

          <div className="flex flex-col gap-12 md:gap-32 w-full pt-4 md:pt-0">
            {steps.map((step, i) => (
              <StepItem key={i} step={step} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function TeamSection() {
  const teamMembers = [
    {
      id: '001',
      name: 'Taylor Kim',
      role: 'Client Success Manager',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: '002',
      name: 'Sarah Colins',
      role: 'Strategy Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: '003',
      name: 'Alex Morgan',
      role: 'Technical Lead',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: '004',
      name: 'Jamie West',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: '005',
      name: 'Morgan Blair',
      role: 'UI Designer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <section className="relative w-full bg-[#dcf5a1] pt-24 pb-16 md:pt-32 md:pb-24 xl:pt-40 xl:pb-32 overflow-hidden z-20">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-transparent mix-blend-overlay pointer-events-none"></div>
      
      <div className="relative z-10 max-w-[2000px] mx-auto px-6 md:px-12 flex flex-col justify-between h-full"> 
        <div className="flex flex-col lg:flex-row items-start font-medium mb-10 lg:mb-24">
          <div className="w-full lg:w-3/12 mb-6 lg:mb-0 pt-2 lg:pl-4">
            <span className="text-[0.85rem] font-medium tracking-tight text-[#0a0a0a] block">The team</span>
          </div>
          <div className="w-full lg:w-9/12 lg:pr-12">
            <h2 className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] tracking-tighter leading-[0.9] text-[#0a0a0a] font-medium max-w-5xl">
              We’re strategic<br className="md:hidden"/><br className="hidden md:block"/> <span className="text-[#0a0a0a]">designers,</span><br className="md:hidden"/> <span className="text-[#0a0a0a]">marketers,</span> and<br className="md:hidden"/> <span className="text-[#0a0a0a]">developers</span> making<br/> online growth<br className="hidden md:block"/> straightforward and<br/> stress-free.
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 lg:gap-8 mt-12 mb-20 w-full">
          <div className="w-full lg:w-4/12 flex items-start gap-4 text-black lg:pl-4">
            <div className="mt-1">
              <ArrowRight size={20} className="opacity-90" strokeWidth={1.5} />
            </div>
            <p className="text-[1.35rem] md:text-xl font-medium leading-[1.2] tracking-tight text-[#0a0a0a]">
              Meet the minds<br />
              behind your success
            </p>
          </div>
          
          <div className="w-full h-px bg-black/30 my-4 md:hidden"></div>

          <div className="w-full lg:w-7/12 flex flex-col pl-0 lg:pl-12">
            <div className="flex flex-col items-start w-full">
              
              <div className="w-full max-w-lg flex flex-col">
                <div className="flex items-center gap-6 mb-8 text-[#0a0a0a]">
                  <span className="text-[2.5rem] font-medium tracking-tighter leading-none">©2026</span>
                </div>

                <p className="text-[#0a0a0a]/80 text-[0.95rem] md:text-base leading-relaxed mb-10 font-medium">
                  A diverse team of specialists united by a passion
                  for creating exceptional digital experiences. No account
                  managers, no junior staff handling your project. You
                  work directly with our senior team.
                </p>

                <div className="w-full sm:w-auto pr-6 sm:pr-0">
                  <button className="bg-[#1c1c1c] text-[#dcf5a1] px-6 py-4 flex items-center justify-center gap-4 font-bold text-[0.95rem] tracking-wide hover:bg-black transition-colors w-full sm:w-auto rounded-none">
                    About us <ArrowUpRight size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- TEAM MEMBERS SCROLL --- */}
        <div className="w-full relative overflow-visible">
          <div className="flex gap-6 md:gap-10 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {teamMembers.map((member, i) => (
              <div 
                key={member.id} 
                className={`min-w-[72vw] sm:min-w-[38vw] md:min-w-[27vw] lg:min-w-[22vw] xl:min-w-[19vw] flex flex-col snap-start shrink-0 ${
                  i === 0 ? 'mt-0' :
                  i === 1 ? 'mt-10 md:mt-14 lg:mt-20' :
                  i === 2 ? 'mt-20 md:mt-28 lg:mt-40' :
                  i === 3 ? 'mt-30 md:mt-42 lg:mt-60' :
                  'mt-40 md:mt-56 lg:mt-80'
                }`}
              >
                <div 
                  className="w-full aspect-[4/5] bg-black/10 overflow-hidden mb-6 md:mb-8"
                  style={{ clipPath: 'polygon(60px 0, 100% 0, 100% 100%, 0 100%, 0 60px)' }}
                >
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <div>
                  <h4 className="text-black text-[1.4rem] md:text-[1.6rem] font-medium tracking-tight mb-1">{member.name}</h4>
                  <p className="text-black/60 text-sm md:text-base font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CasesSection() {
  const cases = [
    {
      id: "001",
      logoIcon: <Hexagon size={18} fill="currentColor" className="text-white/80" />,
      logoText: "Frequencil",
      stat: "70%",
      desc: "Increased user\nretention by 70%",
      date: "May 2026"
    },
    {
      id: "003",
      logoIcon: <Aperture size={18} strokeWidth={2.5} className="text-white/80" />,
      logoText: "Luminary",
      stat: "2x",
      desc: "Doubled the traffic\nin just 3 months",
      date: "Jan 2026"
    },
    {
      id: "002",
      logoIcon: <Sun size={18} strokeWidth={2.5} className="text-white/80" />,
      logoText: "Euphoria",
      stat: "25+",
      desc: "25+ new\nleads captured",
      date: "Mar 2026"
    }
  ];

  return (
    <section className="relative w-full max-w-[2000px] mx-auto bg-[#151515]">
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10 border-t border-b border-white/10">
        {cases.map((c, i) => (
          <div key={i} className="flex flex-col p-8 md:p-12 lg:p-16 min-h-[450px] lg:min-h-[550px] justify-between group hover:bg-white/[0.02] transition-colors relative overflow-hidden">
            
            {/* Ticks pattern removed */}

            <div className="z-10 relative">
              <div className="text-[0.7rem] font-bold tracking-widest text-white/40 mb-6 uppercase">Case {c.id}</div>
              <div className="flex items-center gap-2.5 text-white font-bold tracking-tight text-lg mb-12">
                {c.logoIcon}
                {c.logoText}
              </div>
            </div>

            <div className="mt-auto z-10 relative">
              <div className="text-[5.5rem] lg:text-[7rem] font-medium tracking-tighter text-white leading-none mb-8">
                {c.stat}
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
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none opacity-40"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const faqs = [
    {
      question: "How long does a typical project take from start to finish?",
      answer: "The timeline depends on the scope and complexity of the project. Generally, a standard website takes 4-8 weeks, while full-scale applications can take 3-6 months. We will provide a detailed timeline during the discovery phase."
    },
    {
      question: "What makes your agency different from others?",
      answer: "We optimize your site structure, content, and speed, ensuring better search rankings and visibility."
    },
    {
      question: "Do you offer ongoing support after the project launches?",
      answer: "Yes, we offer maintenance packages to keep your platform secure, up-to-date, and performing optimally. We can also partner on iterative improvements."
    },
    {
      question: "What if I only need one specific service, not the full package?",
      answer: "We are flexible. Whether you need just UI/UX design, or specialized development, we can tailor our services to meet your specific needs."
    },
    {
      question: "Do you offer SEO services?",
      answer: "We build all our websites with SEO best practices in mind. We can also provide advanced SEO audits, strategy, and ongoing optimization."
    }
  ];

  return (
    <section className="relative w-full bg-white text-[#1a1a1a] py-24 md:py-32 lg:py-40 px-6 md:px-12 max-w-[2000px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side */}
        <div className="w-full lg:w-5/12 flex flex-col items-start pt-4">
          <h2 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-medium tracking-tighter leading-[0.9] text-[#1a1a1a] mb-8 lg:mb-16">
            FAQ.
          </h2>
          <p className="text-[1.2rem] md:text-[1.35rem] font-medium tracking-tight leading-[1.3] text-[#1a1a1a] mb-12 max-w-[280px]">
            Answers to the stuff people usually ask and space to ask your own.
          </p>
          <button className="w-full sm:w-auto flex items-center justify-center gap-4 px-6 md:px-7 py-3.5 md:py-4 rounded-none border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#efece5] transition-colors text-[0.95rem] font-bold tracking-wide">
            Ask a question <ArrowUpRight size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Right Side - Accordion */}
        <div className="w-full lg:w-7/12 flex flex-col lg:pt-8">
          <div className="border-t border-[#1a1a1a]/10">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[#1a1a1a]/10">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 md:py-8 text-left hover:text-[#1a1a1a]/70 transition-colors group"
                >
                  <span className="text-base md:text-lg lg:text-xl font-medium tracking-tight pr-4">{faq.question}</span>
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-none bg-[#1a1a1a]/[0.04] group-hover:bg-[#1a1a1a]/10 transition-colors flex items-center justify-center shrink-0">
                     <ChevronDown 
                        size={14} 
                        strokeWidth={2.5}
                        className={`text-[#1a1a1a] transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                     />
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 pb-6 md:pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-[#1a1a1a]/60 text-sm md:text-base leading-relaxed pr-12 font-medium tracking-tight">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}

function ContactAndFooterSection() {
  return (
    <>
      {/* Top CTA */}
      <section className="relative w-full bg-[#dcf5a1] py-32 md:py-48 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden z-10">
        {/* Cross Pattern Background */}
        <div 
          className="absolute inset-[-50%] z-0 pointer-events-none opacity-[0.15]"
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><path d="M 30 15 L 30 45 M 15 30 L 45 30" stroke="%23000000" stroke-width="1.5" stroke-linecap="round" fill="none" /></svg>')`,
            backgroundSize: '60px 60px',
            transform: 'rotate(-8deg) scale(1.2)'
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
          {/* Removed Contact badge */}
          
          <h2 className="text-[#151515] text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.76] font-medium tracking-tighter mb-12 max-w-4xl">
            Interested in our<br/>Services?
          </h2>
          
          <div className="flex w-full sm:w-auto items-center justify-center">
            <button className="flex-1 sm:flex-none justify-center bg-[#151515] text-white px-8 py-4 rounded-none text-[0.95rem] font-bold tracking-wide hover:bg-white hover:text-[#151515] transition-colors flex items-center gap-4 border border-[#151515]">
              Let's chat <ArrowUpRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <footer className="relative w-full bg-[#121615] text-[#dcf5a1] pt-24 pb-8 px-6 md:px-12 overflow-hidden z-20">
        <div className="max-w-[2000px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24 md:mb-32">
            
            {/* Left Box */}
            <div className="w-full lg:w-4/12 flex flex-col items-start gap-8">
              <p className="text-[#dcf5a1] text-[1.2rem] md:text-[1.35rem] font-medium leading-[1.3] tracking-tight">
                Start your project today! Contact us to learn more and let's work together to achieve your goals.
              </p>
              
              <div className="flex items-center gap-0 w-full sm:w-auto mt-4">
                <button className="flex-1 sm:flex-none justify-center bg-[#dcf5a1] text-[#121615] px-7 py-3.5 rounded-none text-[0.95rem] font-bold tracking-wide hover:bg-white transition-colors flex items-center gap-4">
                  Start a Project <ArrowUpRight size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Right Links */}
            <div className="w-full lg:w-6/12 flex flex-col md:flex-row justify-between md:justify-end gap-12 md:gap-32 lg:pr-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[#dcf5a1]/60 text-[0.7rem] font-bold tracking-widest uppercase mb-4">
                  <CornerDownRight size={14} className="opacity-70" /> PAGES
                </div>
                <div className="flex flex-col gap-3">
                  {['Home', 'Projects', 'About Us', 'Solutions', 'Careers', 'News', 'Contact'].map(link => (
                    <a key={link} href="#" className="text-[#dcf5a1] hover:text-white transition-colors text-[1rem] font-medium tracking-tight">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[#dcf5a1]/60 text-[0.7rem] font-bold tracking-widest uppercase mb-4">
                  <CornerDownRight size={14} className="opacity-70" /> SOCIAL
                </div>
                {/* Horizontal on mobile, flex-col on desktop or row depending on layout, Image 11 shows row! */}
                <div className="flex flex-row md:flex-col flex-wrap gap-6 md:gap-3">
                  {['Instagram', 'Linkedin', 'X'].map(link => (
                    <a key={link} href="#" className="text-[#dcf5a1] hover:text-white transition-colors text-[1rem] font-medium tracking-tight">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Huge Logo and Copyright */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-[#dcf5a1]/10 pt-10">
            <h1 className="text-[4rem] md:text-[9rem] lg:text-[13rem] leading-[0.8] font-medium text-[#dcf5a1] tracking-tighter">
              ©Hydra
            </h1>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 text-[#dcf5a1]/60 text-[0.65rem] font-bold tracking-widest uppercase pb-2">
              <span>SAN FRANCISCO 12:03:14</span>
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
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#dcf5a1]"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#121615] text-2xl md:text-5xl font-medium tracking-tight capitalize text-center font-geist"
        >
          Cosmic <br className="md:hidden" /> Digital Studio
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeService, setActiveService] = useState<number | null>(null);

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
      title: 'Development',
      description: 'Robust, scalable, and high-performance solutions engineered for the modern web.',
      images: [
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: '002',
      title: 'Design & Branding',
      description: 'Good design does more than look nice — it works. We make it easy for people to connect with your brand.',
      images: [
        'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop',
      ]
    },
    {
      id: '003',
      title: 'Strategy',
      description: 'Data-driven roadmaps that align your business goals with user needs for lasting impact.',
      images: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: '004',
      title: 'Marketing',
      description: 'Targeted campaigns that elevate your voice and reach the right audience at the right time.',
      images: [
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
      ]
    }
  ];

  return (
    <div className="relative bg-[#1c1c1c] selection:bg-[#dcf5a1] selection:text-black overflow-x-hidden text-white w-full" style={{ fontFamily: '"Geist", sans-serif' }}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <MouseFollower />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* --- BACKGROUND ART --- */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop"
            alt="Wind turbines on green hills"
            className="w-full h-full object-cover object-bottom opacity-80"
          />
          {/* Gradual overlays to make text readable and blend edges */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-black/20 to-transparent"></div>
        </div>



        {/* --- HEADER --- */}
        <header className="absolute top-0 left-0 w-full z-20 p-4 md:p-5 flex justify-between items-start max-w-[2000px] mx-auto pointer-events-none">
          {/* Left Nav Box */}
          <div className="flex bg-white w-full md:w-auto px-6 py-4 items-start justify-between md:justify-start md:gap-10 rounded-none shadow-sm min-h-[72px] relative pointer-events-auto">
            <div className="font-semibold text-lg tracking-tight text-black flex items-center h-10">
              &copy;Hydra
            </div>
            <MegaNavigation />
            
            {/* Hamburger on mobile */}
            <button className="md:hidden text-black hover:opacity-70 transition-opacity">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <line x1="4" y1="9" x2="20" y2="9"></line>
                 <line x1="4" y1="15" x2="20" y2="15"></line>
               </svg>
            </button>
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-0 pointer-events-auto">
            <button className="bg-[#dcf5a1] text-black px-6 py-3 rounded-none text-xs font-semibold tracking-wide hover:bg-white transition-colors shadow-sm">
              Contact Us
            </button>
            <button className="bg-[#dcf5a1] text-black p-3 rounded-none hover:bg-white transition-colors flex items-center justify-center shadow-sm">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </header>

        {/* --- HERO CONTENT --- */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 w-full pt-[100px] md:pt-0">
          
          <h1 className="text-[3.2rem] leading-[1.05] md:text-6xl lg:text-[5.5rem] font-medium tracking-tight text-white mb-6 drop-shadow-sm max-w-[90vw]">
            Sustainable<br className="md:hidden"/> Solutions <br className="hidden md:block"/> for a<br className="md:hidden"/> Better Future
          </h1>
          
          <p className="text-white text-base md:text-base max-w-[320px] md:max-w-[550px] mb-10 leading-relaxed font-normal shadow-sm">
            Empowering businesses and communities to thrive in a low-carbon world through tailored clean energy solutions.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-1">
            <button className="bg-[#dcf5a1] text-black px-7 py-3 rounded-none text-[0.95rem] font-medium tracking-wide hover:bg-white transition-colors shadow-lg">
              Start a Project
            </button>
            <button className="bg-[#dcf5a1] text-black p-3.5 rounded-none hover:bg-white transition-colors flex items-center justify-center shadow-lg">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </main>

        {/* --- SCROLL BOTTOM --- */}
        <div className="relative z-20 w-full pb-8 flex justify-center items-center">
          <span className="text-[0.6rem] font-bold tracking-[0.2em] text-white/80 uppercase cursor-pointer hover:text-white transition-colors">
            Scroll Down
          </span>
        </div>
      </section>

      {/* --- NEW SECTION --- */}
      <section className="relative w-full py-24 md:py-32 xl:py-40 px-6 md:px-12 max-w-[2000px] mx-auto bg-white text-black">


        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-4 items-start">
          <div className="md:col-span-4 pl-0 lg:pl-10">
            <h3 className="font-bold text-[0.95rem] tracking-tight text-[#8fb339]">
              (t)rifecta&reg;
            </h3>
          </div>
          <div className="md:col-span-8 max-w-2xl pr-0 md:pr-4">
            <h2 className="text-[2.1rem] md:text-[2.25rem] lg:text-[2.5rem] font-medium leading-[1.1] mb-8 text-black tracking-tight">
              From captivating website design and development to performance-driven digital marketing, we offer end-to-end services to accelerate your brand's success.
            </h2>
            <p className="text-black/60 text-base leading-relaxed max-w-[340px] md:max-w-lg mb-10">
              Our cross-functional teams collaborate to deliver exceptional results across all digital touchpoints.
            </p>
            
            {/* Button matched to DA */}
            <div className="flex items-center gap-0 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none justify-center bg-transparent border border-black text-black px-7 py-3.5 rounded-none text-[0.8rem] font-bold tracking-wide hover:bg-black hover:text-white transition-colors">
                <span className="flex items-center justify-center gap-4">About us <ArrowUpRight size={16} strokeWidth={2.5} /></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- ANALYTICS SECTION --- */}
      <section className="relative w-full max-w-[2000px] mx-auto border-t border-black/5 bg-[#fafafa] text-black">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/5">
          
          {/* Card 1 */}
          <div className="flex flex-col p-8 pt-10 md:p-12 lg:p-16 min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
            <div className="w-full flex justify-end mb-4">
              <span className="text-[0.8rem] font-medium tracking-tight text-black/40">001</span>
            </div>
            <div className="flex-1 flex flex-col justify-start md:justify-center">
              <div className="text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] font-medium tracking-tighter text-black leading-none mb-10 md:mb-0">
                3x
              </div>
            </div>
            <div className="w-full flex justify-end">
              <p className="text-[0.95rem] md:text-base text-black/60 leading-relaxed text-right max-w-[200px] md:max-w-[250px] font-medium">
                Our model cuts typical<br className="hidden md:block" /> delivery timelines by two-thirds.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col p-8 pt-10 md:p-12 lg:p-16 min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
            <div className="w-full flex justify-end mb-4">
              <span className="text-[0.8rem] font-medium tracking-tight text-black/40">002</span>
            </div>
            <div className="flex-1 flex flex-col justify-start md:justify-center">
              <div className="text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] font-medium tracking-tighter text-black leading-none mb-10 md:mb-0">
                6+
              </div>
            </div>
            <div className="w-full flex justify-end">
              <p className="text-[0.95rem] md:text-base text-black/60 leading-relaxed text-right max-w-[200px] md:max-w-[250px] font-medium">
                Years shipping brands.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col p-8 pt-10 md:p-12 lg:p-16 min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
            <div className="w-full flex justify-end mb-4">
              <span className="text-[0.8rem] font-medium tracking-tight text-black/40">003</span>
            </div>
            <div className="flex-1 flex flex-col justify-start md:justify-center">
              <div className="text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] font-medium tracking-tighter text-black leading-none mb-10 md:mb-0">
                95+
              </div>
            </div>
            <div className="w-full flex justify-end">
              <p className="text-[0.95rem] md:text-base text-black/60 leading-relaxed text-right max-w-[200px] md:max-w-[250px] font-medium">
                Digital projects delivered<br className="hidden md:block" /> across all industries.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="relative w-full py-24 md:py-32 lg:py-40 px-6 md:px-12 max-w-[2000px] mx-auto bg-white text-black">
        <div className="text-left mb-16 md:mb-24">
          <h2 className="text-[3.5rem] md:text-[6rem] lg:text-[10rem] font-medium tracking-tighter leading-none text-black">
            Services
          </h2>
        </div>

        <div className="w-full flex flex-col border-t border-black/10">
          {services.map((service, index) => {
            const isActive = activeService === index;

            return (
              <div
                key={service.id}
                onClick={() => setActiveService(isActive ? null : index)}
                className="grid grid-cols-12 gap-4 py-8 md:py-12 border-b border-black/10 group cursor-pointer hover:bg-black/[0.02] transition-colors"
              >
                <div className="col-span-2 md:col-span-3 flex items-start pl-0 md:pl-8 lg:pl-12 pt-2 md:pt-4">
                  <ArrowRight strokeWidth={1.5} className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${isActive ? 'text-black translate-x-2' : 'text-black/30 group-hover:text-black/60'}`} />
                </div>
                <div className="col-span-10 md:col-span-9 pr-0 md:pr-4">
                  <div className="flex flex-col md:flex-row items-start">
                    {isActive && <span className="text-[0.8rem] font-medium tracking-tight text-black mb-2 md:mb-0 md:hidden">{service.id}</span>}
                    <h3 className={`font-medium tracking-tight transition-all duration-300 ${isActive ? 'text-[2.25rem] md:text-[4.5rem] lg:text-[5.5rem] text-black leading-none' : 'text-[1.5rem] md:text-[2rem] text-black/70 group-hover:text-black'}`}>
                      {service.title}
                    </h3>
                    {isActive && <span className="hidden md:block text-[0.8rem] font-medium tracking-tight text-black ml-4 md:ml-6 mt-1 md:mt-2">{service.id}</span>}
                  </div>

                  {isActive && (
                    <div className="mt-6 md:mt-12 overflow-hidden transition-all duration-300">
                      <p className="text-[0.95rem] md:text-base text-black/70 max-w-[340px] md:max-w-[400px] leading-relaxed ml-2 md:ml-6 font-medium">
                        {service.description}
                      </p>

                      <div className="mt-8 flex items-center ml-2 md:ml-6 w-full sm:w-auto pr-6 sm:pr-0">
                        <button className="flex-1 sm:flex-none justify-center bg-transparent border border-black text-black px-7 py-3.5 rounded-none text-[0.95rem] font-bold tracking-wide hover:bg-black hover:text-white transition-colors flex items-center gap-4">
                          Get started <ArrowUpRight size={18} strokeWidth={2.5} />
                        </button>
                      </div>

                      {service.images && (
                        <div className="mt-12 md:mt-16 flex gap-4 md:gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                          {service.images.map((img, i) => (
                             <div key={i} className="min-w-[85vw] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[450px] aspect-[4/3] rounded-none overflow-hidden">
                                <img src={img} alt={`${service.title} preview ${i + 1}`} className="w-full h-full object-cover" />
                             </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- QUOTE / CTA SECTION --- */}
      <section className="relative w-full py-24 md:py-32 px-6 md:px-12 max-w-[2000px] mx-auto overflow-hidden bg-[#fafafa] text-black">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-[1.2] text-black tracking-tight">
            Choosing a digital partner isn't just about capabilities or portfolios. It's about trust, reliability, and alignment with your goals.
          </h2>
        </div>

        {/* Decorative ticks removed */}

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-start gap-4 md:gap-6 max-w-lg">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" 
              alt="Sarah Colins" 
              className="w-12 h-12 md:w-14 md:h-14 rounded-none object-cover grayscale opacity-90"
            />
            <div className="flex flex-col">
              <p className="text-black/70 text-sm md:text-base leading-relaxed mb-3">
                Our clients don't just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.
              </p>
              <span className="text-black font-medium text-sm tracking-wide">Sarah Colins</span>
            </div>
          </div>
          
          <div className="flex flex-shrink-0">
            <div className="flex items-center gap-0">
              <button className="bg-[#dcf5a1] text-black px-7 py-3.5 rounded-none text-[0.8rem] font-medium tracking-wide hover:bg-black hover:text-white transition-colors shadow-sm">
                Start a Project
              </button>
              <button className="bg-[#dcf5a1] text-black p-3.5 rounded-none hover:bg-black hover:text-white transition-colors flex items-center justify-center shadow-sm">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />

      <TeamSection />

      <CasesSection />

      <FaqSection />

      <ContactAndFooterSection />
    </div>
  );
}
