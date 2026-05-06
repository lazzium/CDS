import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const closeOnClick = (setActiveTab: (tab: string | null) => void) => () => setActiveTab(null);

const TABS = [
  {
    id: 'offre',
    label: 'Offre',
    content: (setActiveTab: (tab: string | null) => void) => (
      <div className="w-[350px] p-6 text-black bg-white">
        <h3 className="font-bold mb-2 uppercase text-[0.6rem] tracking-wider text-black/50">Ce qui est inclus</h3>
        <div className="grid grid-cols-1 gap-1 mt-4 text-sm font-medium tracking-normal text-black capitalize">
          <a href="#services" onClick={closeOnClick(setActiveTab)} className="flex items-center justify-between p-3 rounded-none hover:bg-black/5 cursor-pointer group transition-colors">
            <span>Boutique Shopify optimisée</span>
            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
          </a>
          <a href="#services" onClick={closeOnClick(setActiveTab)} className="flex items-center justify-between p-3 rounded-none hover:bg-black/5 cursor-pointer group transition-colors">
            <span>Produit validé</span>
            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
          </a>
          <a href="#services" onClick={closeOnClick(setActiveTab)} className="flex items-center justify-between p-3 rounded-none hover:bg-black/5 cursor-pointer group transition-colors">
            <span>Créatives TikTok & Meta</span>
            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
          </a>
        </div>
      </div>
    )
  },
  {
    id: 'agence',
    label: 'Agence',
    content: (setActiveTab: (tab: string | null) => void) => (
      <div className="w-[250px] p-6 text-black bg-white">
        <h3 className="font-bold mb-2 uppercase text-[0.6rem] tracking-wider text-black/50">Cosmic Digital Studio</h3>
        <ul className="text-sm space-y-1 mt-4 font-medium tracking-normal capitalize text-black">
          <li><a href="#methode" onClick={closeOnClick(setActiveTab)} className="hover:bg-black/5 px-3 py-2 rounded-none cursor-pointer transition-colors block">Méthode</a></li>
          <li><a href="#contact" onClick={closeOnClick(setActiveTab)} className="hover:bg-black/5 px-3 py-2 rounded-none cursor-pointer transition-colors block">Accompagnement</a></li>
          <li><a href="#faq" onClick={closeOnClick(setActiveTab)} className="hover:bg-black/5 px-3 py-2 rounded-none cursor-pointer transition-colors block">FAQ</a></li>
        </ul>
      </div>
    )
  },
  {
    id: 'solutions',
    label: 'Solutions',
    content: (setActiveTab: (tab: string | null) => void) => (
      <div className="w-[420px] p-6 text-black bg-white">
        <h3 className="font-bold mb-2 uppercase text-[0.6rem] tracking-wider text-black/50">Ce que nous faisons</h3>
        <div className="grid grid-cols-2 gap-3 text-sm mt-4 tracking-normal capitalize">
          <a href="#services" onClick={closeOnClick(setActiveTab)} className="p-4 bg-black/5 rounded-none hover:bg-[#c084fc]/40 cursor-pointer transition-colors block">
            <div className="font-bold mb-1 text-black">Shopify</div>
            <p className="text-black/60 text-xs">Structure, pages, conversion</p>
          </a>
          <a href="#services" onClick={closeOnClick(setActiveTab)} className="p-4 bg-black/5 rounded-none hover:bg-[#c084fc]/40 cursor-pointer transition-colors block">
            <div className="font-bold mb-1 text-black">Produit</div>
            <p className="text-black/60 text-xs">Recherche, potentiel, angle</p>
          </a>
          <a href="#services" onClick={closeOnClick(setActiveTab)} className="p-4 bg-black/5 rounded-none hover:bg-[#c084fc]/40 cursor-pointer transition-colors block">
            <div className="font-bold mb-1 text-black">Publicités</div>
            <p className="text-black/60 text-xs">TikTok, Meta, créatives</p>
          </a>
        </div>
      </div>
    )
  },
];

export function MegaNavigation() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveTab(null);
    }, 220);
  };

  const handleMouseEnter = () => {
    clearCloseTimeout();
  };

  const activeContent = TABS.find((t) => t.id === activeTab)?.content;

  return (
    <div
      className="hidden lg:flex flex-col z-50 text-[0.65rem] font-bold tracking-[0.1em] text-black/80 uppercase"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="flex items-center gap-1 h-10">
        {TABS.map((tab) => (
          <div
            key={tab.id}
            className="relative cursor-pointer transition-colors"
            onMouseEnter={() => setActiveTab(tab.id)}
          >
            <div className="relative z-10 px-4 py-2 flex items-center gap-1 transition-colors hover:text-black">
              {tab.label}
              {tab.content && <ChevronDown size={12} className={`transition-transform duration-300 ${activeTab === tab.id ? 'rotate-180 opacity-100' : 'opacity-70'}`} strokeWidth={2.5} />}
            </div>
            {/* Active Tab Hover Pill */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-[#c084fc]/50 rounded-none z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mega Menu Content Area - Overlays the content below */}
      <div className="absolute top-full left-0 w-full pointer-events-none" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <AnimatePresence>
          {activeTab && activeContent && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden pointer-events-auto bg-white shadow-xl border-t border-black/5 mt-0"
            >
              <div className="p-8">
                <motion.div
                  key={activeTab} // forces remount for crossfade effect
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {activeContent(setActiveTab)}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
