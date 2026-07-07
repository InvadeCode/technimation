import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronRight, ArrowRight, Server, Shield, 
  Cloud, Database, Cpu, Activity, Layout, Globe, Code,
  Zap, BarChart, MapPin, Phone, Linkedin
} from 'lucide-react';

// --- GLOBAL DATA ---
const SERVICES = [
  { id: 'consulting', title: 'IT Consulting', icon: <Activity size={24} />, brief: 'Strategic technology roadmaps.' },
  { id: 'app-dev', title: 'Application Dev', icon: <Code size={24} />, brief: 'Custom enterprise software.' },
  { id: 'cloud', title: 'Cloud Computing', icon: <Cloud size={24} />, brief: 'Migration & management.' },
  { id: 'datacenter', title: 'Datacenter', icon: <Server size={24} />, brief: 'Infrastructure provisioning.' },
  { id: 'iot', title: 'IoT Solutions', icon: <Cpu size={24} />, brief: 'Connecting device ecosystems.' },
  { id: 'motion', title: 'Motion Media', icon: <Layout size={24} />, brief: 'High-end visual communication.' },
  { id: 'continuity', title: 'Continuity', icon: <Zap size={24} />, brief: 'Disaster recovery planning.' },
  { id: 'cybersecurity', title: 'Cybersecurity', icon: <Shield size={24} />, brief: 'Enterprise threat protection.' },
];

// --- ADVANCED PRELOADER (Cinematic Shutter Reveal - Restored No Jerk 100vw) ---
const Preloader = ({ onAppReady, onComplete }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [phase, setPhase] = useState('loading');
  // loading -> seam -> opening

  const rootRef = useRef(null);
  const barMeasureRef = useRef(null);
  const lastPercentRef = useRef(-1);

  const onAppReadyRef = useRef(onAppReady);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onAppReadyRef.current = onAppReady;
    onCompleteRef.current = onComplete;
  }, [onAppReady, onComplete]);

  useEffect(() => {
    let cancelled = false;
    let rafId = 0;
    const timers = [];

    const loadingDuration = 2000;
    const seamDelay = 80;
    const seamDuration = 760;

    const start = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const runLater = (fn, delay) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, delay);

      timers.push(id);
    };

    const getBarMetrics = () => {
      if (!barMeasureRef.current) {
        return {
          barWidth: 400,
          leftExtension: 24,
          rightExtension: window.innerWidth - 424,
        };
      }

      const rect = barMeasureRef.current.getBoundingClientRect();

      return {
        barWidth: rect.width,
        leftExtension: rect.left,
        rightExtension: Math.max(window.innerWidth - rect.right, 0),
      };
    };

    const updateLine = (loadProgress, seamProgress) => {
      if (!rootRef.current) return;

      const { barWidth, leftExtension, rightExtension } = getBarMetrics();

      const loadWidth = barWidth * loadProgress;
      const leftGrow = leftExtension * seamProgress;
      const rightGrow = rightExtension * seamProgress;

      /**
       * One single line:
       * - during loading: starts at 0 and grows inside the 400px bar bounds
       * - after 100%: seamlessly expands into the negative space to reach 100vw
       */
      rootRef.current.style.setProperty('--line-left', `${-leftGrow}px`);
      rootRef.current.style.setProperty(
        '--line-width',
        `${loadWidth + leftGrow + rightGrow}px`
      );
      rootRef.current.style.setProperty('--line-opacity', '1');
    };

    const animate = (time) => {
      if (cancelled) return;

      const elapsed = time - start;

      const rawLoadProgress = Math.min(elapsed / loadingDuration, 1);
      const loadProgress = easeOutQuart(rawLoadProgress);

      const rawSeamProgress = Math.min(
        Math.max((elapsed - loadingDuration - seamDelay) / seamDuration, 0),
        1
      );
      const seamProgress = easeInOutCubic(rawSeamProgress);

      updateLine(loadProgress, seamProgress);

      const nextPercent = Math.floor(loadProgress * 100);

      if (nextPercent !== lastPercentRef.current) {
        lastPercentRef.current = nextPercent;
        setDisplayProgress(nextPercent);
      }

      if (rawLoadProgress < 1 || rawSeamProgress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setDisplayProgress(100);
        setPhase('seam');

        runLater(() => {
          setPhase('opening');
        }, 80);

        runLater(() => {
          onAppReadyRef.current?.();
        }, 260);

        runLater(() => {
          onCompleteRef.current?.();
        }, 1500);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
    };
  }, []);

  const isSeam = phase === 'seam' || phase === 'opening';
  const isOpening = phase === 'opening';

  const ProgressSeam = ({ measure = false, bottom = false }) => (
    <div
      ref={measure ? barMeasureRef : null}
      className="w-full max-w-[400px] relative h-[1px] overflow-visible"
    >
      <div
        className={`absolute top-0 h-full bg-gradient-to-r from-orange-600 via-rose-500 to-amber-400 shadow-[0_0_10px_rgba(249,115,22,0.8)] will-change-[left,width,opacity] ${
          bottom && !isOpening ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: 'var(--line-left)',
          width: 'var(--line-width)',
        }}
      />

      <div
        className={`absolute top-1/2 h-[14px] -translate-y-1/2 bg-orange-500/20 blur-xl will-change-[left,width,opacity] ${
          bottom && !isOpening ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: 'var(--line-left)',
          width: 'var(--line-width)',
        }}
      />
    </div>
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
      style={{
        '--line-left': '0px',
        '--line-width': '0px',
        '--line-opacity': '1',
      }}
    >

      {/* Top Black Gate */}
      <div
        className={`absolute top-0 left-0 w-full h-[50vh] bg-[#020202] transform-gpu transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform ${
          isOpening ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="absolute bottom-0 left-0 w-full flex flex-col justify-end">
          <div className="w-[100vw] px-[3%]">
            {/* Text Block */}
            <div
              className={`w-full max-w-[400px] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isSeam
                  ? 'opacity-0 scale-90 blur-xl translate-y-4'
                  : 'opacity-100 scale-100 blur-0 translate-y-0'
              }`}
            >
              <div className="flex flex-col mb-5">
                <span className="text-orange-500 font-mono text-xs tracking-[0.3em] uppercase mb-1">
                  System Boot
                </span>

                <div
                  className="text-white text-6xl md:text-8xl font-bold tracking-tighter leading-none"
                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                >
                  {displayProgress}
                  <span className="text-4xl text-orange-500">%</span>
                </div>
              </div>
            </div>

            {/* Main seam attached to top gate */}
            <ProgressSeam measure />
          </div>
        </div>
      </div>

      {/* Bottom Black Gate */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[50vh] bg-[#020202] transform-gpu transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform ${
          isOpening ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="absolute top-0 left-0 w-full flex flex-col justify-start">
          <div className="w-[100vw] px-[3%]">
            {/* Bottom seam only becomes visible when gates actually open */}
            <ProgressSeam bottom />
          </div>
        </div>
      </div>

    </div>
  );
};

// --- UI COMPONENTS ---
const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const isPrimary = variant === 'primary';
  
  return (
    <button 
      onClick={onClick} 
      className={`group relative inline-flex items-center justify-center px-8 py-4 font-medium transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden z-10 ${
        isPrimary ? 'text-black hover:text-white border border-transparent' : 'text-white border border-slate-700 hover:border-transparent'
      } ${className}`}
    >
      <div className={`absolute inset-0 -z-20 transition-opacity duration-500 ${isPrimary ? 'bg-white group-hover:opacity-0' : 'bg-black'}`} />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 origin-top scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 -z-10" />

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

const Header = ({ navigate, currentPage, isAppReady }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemClass = (page) => `relative px-5 py-2 text-sm font-medium transition-colors duration-300 capitalize rounded-full ${
    currentPage === page ? 'text-white' : 'text-slate-400 hover:text-white'
  }`;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-[1200ms] delay-500 pt-6 ${
      isAppReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
    }`}>
      {/* Changed to 100vw and 1% padding */}
      <div className="w-[100vw] px-[1%] flex items-center justify-between pointer-events-none">
        
        {/* Insane Animated Logo */}
        <div className="flex items-center gap-4 cursor-pointer pointer-events-auto group" onClick={() => navigate('home')}>
          
          <div className="relative flex items-center justify-center w-12 h-12">
            {/* Reactive Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-rose-500/20 rounded-full blur-md group-hover:scale-150 group-hover:opacity-100 opacity-70 transition-all duration-700 ease-out" />
            
            {/* Multi-layered Orbital Rings */}
            <svg className="absolute w-full h-full" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(249,115,22,0.1)" strokeWidth="1" />
              
              {/* Fast outer orbit */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="url(#orbit-grad)" strokeWidth="1.5" strokeDasharray="30 250" strokeLinecap="round" className="origin-center animate-[spin_3s_linear_infinite]" />
              
              {/* Slow counter-rotating inner orbit */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="40 180" strokeLinecap="round" className="origin-center animate-[spin_7s_linear_infinite_reverse]" />
            </svg>
            
            {/* Counter-Rotating Geometric Core */}
            <div className="absolute w-5 h-5 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-orange-500/80 rounded-[4px] origin-center animate-[spin_8s_linear_infinite] group-hover:border-orange-400 transition-colors" />
              <div className="absolute inset-0 border-[1.5px] border-amber-400/80 rounded-[4px] rotate-45 origin-center animate-[spin_12s_linear_infinite_reverse] group-hover:border-amber-300 transition-colors" />
            </div>

            {/* Pulsing Quantum Center */}
            <div className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_4px_rgba(249,115,22,0.8)] animate-pulse" />
          </div>

          {/* Upgraded Typography */}
          <span className="text-2xl font-bold text-white tracking-tighter hidden sm:flex items-center gap-1 group-hover:text-orange-50 transition-colors duration-300" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Technimation
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
          </span>
        </div>

        {/* Floating Glass Pill Navigation */}
        <div className={`pointer-events-auto flex items-center gap-1 p-1.5 rounded-full border transition-all duration-500 backdrop-blur-xl ${
          isScrolled ? 'bg-white/10 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : 'bg-white/5 border-white/10'
        }`}>
          {['home', 'services', 'industries', 'contact'].map((page) => (
            <button 
              key={page}
              onClick={() => navigate(page)} 
              className={navItemClass(page)}
            >
              <span className="relative z-10">{page}</span>
              {currentPage === page && (
                <div className="absolute inset-0 bg-white/10 rounded-full -z-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
              )}
            </button>
          ))}
        </div>

        {/* Right Action */}
        <div className="pointer-events-auto hidden sm:flex items-center">
           <button onClick={() => navigate('contact')} className="text-sm font-medium text-white hover:text-orange-500 transition-colors uppercase tracking-widest px-4 py-2">
             Get in touch
           </button>
        </div>
      </div>
    </header>
  );
};

// --- PAGES ---

const HomePage = ({ navigate, isAppReady }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  // Enriched data with dynamic buttons for each slide
  const HERO_DATA = [
    { 
      title: "Digital Infra", 
      num: "01", 
      desc: "Architecting resilient, hyper-scalable foundations for the next generation of enterprise ecosystems. We build the backbone of tomorrow's digital economy.",
      btnPrimary: "Explore Infrastructure",
      btnSecondary: "Talk to an Architect"
    },
    { 
      title: "Cybersecurity", 
      num: "02", 
      desc: "Military-grade threat intelligence and zero-trust architectures to safeguard your most critical digital assets against asymmetric vectors.",
      btnPrimary: "View Security Stack",
      btnSecondary: "Threat Assessment"
    },
    { 
      title: "Agentic AI", 
      num: "03", 
      desc: "Autonomous, self-optimizing intelligence frameworks that transform static data into proactive business velocity and operational foresight.",
      btnPrimary: "Discover AI Models",
      btnSecondary: "Deploy Intelligence"
    }
  ];
  
  const heroRef = useRef(null);
  const mousePos = useRef({ x: 50, y: 50 });
  const targetMouse = useRef({ x: 50, y: 50 });

  useEffect(() => {
    if (!isAppReady) return;
    const interval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % HERO_DATA.length);
    }, 8000); // 8 seconds of viewing time
    return () => clearInterval(interval);
  }, [isAppReady]);

  // Smooth mouse interpolation loop
  useEffect(() => {
    let req;
    const loop = () => {
      mousePos.current.x += (targetMouse.current.x - mousePos.current.x) * 0.15;
      mousePos.current.y += (targetMouse.current.y - mousePos.current.y) * 0.15;
      
      if (heroRef.current) {
        heroRef.current.style.setProperty('--mouse-x', `${mousePos.current.x}%`);
        heroRef.current.style.setProperty('--mouse-y', `${mousePos.current.y}%`);
      }
      req = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(req);
  }, []);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    targetMouse.current.x = ((e.clientX - rect.left) / rect.width) * 100;
    targetMouse.current.y = ((e.clientY - rect.top) / rect.height) * 100;
  };

  const handleMouseLeave = () => {
    targetMouse.current = { x: 50, y: 50 };
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020202]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={heroRef}
      style={{ '--mouse-x': '50%', '--mouse-y': '50%' }}
    >
      {/* High-End SVG Noise Overlay */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
      />

      {/* Background Grid */}
      <div 
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none transition-opacity duration-[2000ms] ease-in-out"
        style={{ 
          opacity: isAppReady ? 1 : 0,
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 100%)'
        }}
      />

      {/* Roaming Amoebas */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center transition-opacity duration-[2000ms] ease-in-out"
        style={{ opacity: isAppReady ? 1 : 0 }}
      >
        <div 
          className="absolute w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-orange-600 via-rose-600 to-amber-500 opacity-30 blur-[80px]"
          style={{
            animation: 'amoeba-morph 15s ease-in-out infinite alternate, roam 30s ease-in-out infinite',
            transformOrigin: 'center center'
          }}
        />
        <div 
          className="absolute w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] max-w-[600px] max-h-[600px] bg-gradient-to-bl from-amber-400 via-orange-500 to-rose-600 opacity-40 blur-[60px]"
          style={{
            animation: 'amoeba-morph-alt 18s ease-in-out infinite alternate-reverse, roam-alt 35s ease-in-out infinite',
            transformOrigin: '40% 60%'
          }}
        />
      </div>
      
      {/* BASE LAYER (Ambient Blurred Text, Paragraph, Dynamic Buttons) */}
      {/* Changed to 100vw and 3% padding */}
      <div className="relative z-30 w-[100vw] px-[3%] h-full flex flex-col justify-center pointer-events-none pt-20">
        
        {/* Center-aligned Grid for perfect overlap & crossfading */}
        <div className="grid place-items-center w-full">
          {HERO_DATA.map((item, i) => {
            const isActive = i === currentTextIndex;
            return (
              <div 
                key={`base-${item.title}`}
                className="col-start-1 row-start-1 flex flex-col items-center text-center w-full"
                style={{ 
                  zIndex: isActive ? 10 : 0, 
                  pointerEvents: isActive ? 'auto' : 'none' 
                }}
              >
                {/* 1. Pill - Stagger 1 */}
                <div 
                  className={`flex items-center justify-center gap-4 mb-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{ transitionDelay: isActive ? '100ms' : '0ms' }}
                >
                  <span className="w-8 h-[1px] bg-orange-500" />
                  <span className="text-orange-500 font-mono text-sm tracking-widest">{item.num} // 03</span>
                  <span className="w-8 h-[1px] bg-orange-500" />
                </div>

                {/* 2. Blurred Title - Stagger 2 (Cinematic Focus Pull) */}
                <h1 
                  className={`text-[16vw] md:text-[10vw] font-bold leading-none whitespace-nowrap text-orange-200/20 mb-6 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'opacity-100 translate-y-0 scale-100 tracking-tighter' : 'opacity-0 translate-y-12 scale-[1.05] tracking-[0.1em]'
                  }`}
                  style={{ 
                    fontFamily: '"Space Grotesk", sans-serif', 
                    filter: isActive ? 'blur(12px)' : 'blur(24px)',
                    transitionDelay: isActive ? '200ms' : '0ms'
                  }}
                >
                  {item.title}
                </h1>

                {/* 3. Paragraph - Stagger 3 */}
                <p 
                  className={`text-slate-300 text-lg md:text-xl leading-relaxed font-light max-w-4xl mb-12 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{ transitionDelay: isActive ? '300ms' : '0ms' }}
                >
                  {item.desc}
                </p>

                {/* 4. Dynamic CTA Buttons - Stagger 4 */}
                <div 
                  className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{ transitionDelay: isActive ? '400ms' : '0ms' }}
                >
                  <Button onClick={() => navigate('services')}>{item.btnPrimary}</Button>
                  <Button variant="secondary" onClick={() => navigate('contact')}>{item.btnSecondary}</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SHARP MASK LAYER (Mirrors the base layout perfectly to apply the spotlight) */}
      <div 
        className="absolute inset-0 pointer-events-none z-40 transition-all duration-[1500ms]"
        style={{
          opacity: isAppReady ? 1 : 0,
          WebkitMaskImage: 'radial-gradient(circle 45vmax at var(--mouse-x) var(--mouse-y), black 0%, black 25%, transparent 85%)',
          maskImage: 'radial-gradient(circle 45vmax at var(--mouse-x) var(--mouse-y), black 0%, black 25%, transparent 85%)',
        }}
      >
        {/* Changed to 100vw and 3% padding */}
        <div className="relative w-[100vw] px-[3%] h-full flex flex-col justify-center pt-20">
          <div className="grid place-items-center w-full">
            {HERO_DATA.map((item, i) => {
              const isActive = i === currentTextIndex;
              return (
                <div 
                  key={`sharp-${item.title}`}
                  className="col-start-1 row-start-1 flex flex-col items-center text-center w-full"
                >
                  {/* Invisible Pill Spacer */}
                  <div 
                    className={`flex items-center justify-center gap-4 mb-6 opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
                    }`}
                    style={{ transitionDelay: isActive ? '100ms' : '0ms' }}
                  >
                    <span className="w-8 h-[1px]" />
                    <span className="font-mono text-sm tracking-widest">{item.num} // 03</span>
                    <span className="w-8 h-[1px]" />
                  </div>

                  {/* Sharp Title */}
                  <h1 
                    className={`text-[16vw] md:text-[10vw] font-bold leading-none whitespace-nowrap text-white mb-6 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? 'opacity-100 translate-y-0 scale-100 tracking-tighter' : 'opacity-0 translate-y-12 scale-[1.05] tracking-[0.1em]'
                    }`}
                    style={{ 
                      fontFamily: '"Space Grotesk", sans-serif',
                      textShadow: '0 0 40px rgba(255,255,255,0.1), 0 0 80px rgba(255,165,0,0.3)',
                      filter: isActive ? 'blur(0px)' : 'blur(16px)',
                      transitionDelay: isActive ? '200ms' : '0ms'
                    }}
                  >
                    {item.title}
                  </h1>

                  {/* Invisible Paragraph Spacer */}
                  <p 
                    className={`text-lg md:text-xl leading-relaxed font-light max-w-4xl mb-12 opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
                    }`}
                    style={{ transitionDelay: isActive ? '300ms' : '0ms' }}
                  >
                    {item.desc}
                  </p>

                  {/* Invisible Button Spacer to maintain exact flex heights */}
                  <div 
                    className={`flex flex-col sm:flex-row gap-6 justify-center opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
                    }`}
                    style={{ transitionDelay: isActive ? '400ms' : '0ms' }}
                  >
                    <Button>{item.btnPrimary}</Button>
                    <Button variant="secondary">{item.btnSecondary}</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 opacity-50">
        <span className="text-[10px] uppercase tracking-widest font-mono text-slate-400">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-slate-400 to-transparent" />
      </div>

    </section>
  );
};

// --- APP WRAPPER ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAppReady, setIsAppReady] = useState(false);
  const [isPreloaderMounted, setIsPreloaderMounted] = useState(true);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="bg-black text-slate-300 min-h-screen w-[100vw] overflow-x-hidden font-sans selection:bg-orange-500 selection:text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      <style>{`
        @keyframes amoeba-morph {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          33% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          66% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }

        @keyframes amoeba-morph-alt {
          0% { border-radius: 50% 50% 30% 70% / 40% 60% 40% 60%; }
          50% { border-radius: 30% 70% 70% 30% / 50% 30% 70% 50%; }
          100% { border-radius: 50% 50% 30% 70% / 40% 60% 40% 60%; }
        }

        @keyframes roam {
          0% { transform: translate(-30vw, -35vh) scale(1) rotate(0deg); }
          25% { transform: translate(30vw, 35vh) scale(1.1) rotate(90deg); }
          50% { transform: translate(15vw, -40vh) scale(0.9) rotate(180deg); }
          75% { transform: translate(-30vw, 25vh) scale(1.05) rotate(270deg); }
          100% { transform: translate(-30vw, -35vh) scale(1) rotate(360deg); }
        }

        @keyframes roam-alt {
          0% { transform: translate(30vw, 35vh) scale(1) rotate(0deg); }
          33% { transform: translate(-30vw, -25vh) scale(1.2) rotate(-120deg); }
          66% { transform: translate(-15vw, 40vh) scale(0.8) rotate(-240deg); }
          100% { transform: translate(30vw, 35vh) scale(1) rotate(-360deg); }
        }
      `}</style>

      {isPreloaderMounted && (
        <Preloader
          onAppReady={() => setIsAppReady(true)}
          onComplete={() => setIsPreloaderMounted(false)}
        />
      )}

      <Header navigate={setCurrentPage} currentPage={currentPage} isAppReady={isAppReady} />

      <main className="flex-grow w-full">
        <HomePage navigate={setCurrentPage} isAppReady={isAppReady} />
      </main>
    </div>
  );
}
