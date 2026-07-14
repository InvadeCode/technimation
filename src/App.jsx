import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Server, Shield, Cloud, Cpu, Activity, Layout, 
  Code, Zap, Database, Linkedin, CheckCircle2, Globe2,
  ArrowRight
} from 'lucide-react';

const SERVICES = [
  { id: 'engineering', title: 'Custom Engineering', icon: <Code size={20} />, brief: 'Bespoke enterprise software and scalable microservice architectures.' },
  { id: 'infra', title: 'Managed Infra', icon: <Server size={20} />, brief: 'High-availability infrastructure provisioning and 24/7 management.' },
  { id: 'cloud', title: 'Cloud Transformation', icon: <Cloud size={20} />, brief: 'Seamless migration and multi-cloud ecosystem optimization.' },
  { id: 'consulting', title: 'IT Advisory', icon: <Activity size={20} />, brief: 'Strategic technology roadmaps aligning IT with business velocity.' },
  { id: 'iot', title: 'IoT Integration', icon: <Cpu size={20} />, brief: 'Connecting physical device ecosystems securely to the cloud.' },
  { id: 'interfaces', title: 'Digital Interfaces', icon: <Layout size={20} />, brief: 'High-end UI/UX engineering for complex enterprise portals.' },
  { id: 'continuity', title: 'Continuity Planning', icon: <Zap size={20} />, brief: 'Disaster recovery and failover systems for mission-critical apps.' },
  { id: 'cybersecurity', title: 'Zero-Trust Security', icon: <Shield size={20} />, brief: 'Enterprise threat protection, audits, and network sanitization.' },
];

const useInView = (options = { threshold: 0.15 }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionHeader = ({ subtitle, title, align = 'left' }) => (
  <Reveal className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start'} mb-12 md:mb-16`}>
    <div className="flex items-center gap-4 mb-4">
      {align === 'center' && <span className="w-6 h-[1px] bg-orange-500" />}
      <span className="text-orange-500 font-mono text-xs tracking-widest uppercase font-bold">{subtitle}</span>
      <span className="w-6 md:w-8 h-[1px] bg-orange-500" />
    </div>
    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
      {title}
    </h2>
  </Reveal>
);

const Preloader = ({ onAppReady, onComplete }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); 

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

    const loadingDuration = 1500; 
    const seamDelay = 80;
    const seamDuration = 760;

    const start = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const runLater = (fn, delay) => {
      const id = setTimeout(() => { if (!cancelled) fn(); }, delay);
      timers.push(id);
    };

    const getBarMetrics = () => {
      if (!barMeasureRef.current) return { barWidth: 400, leftExtension: 24, rightExtension: window.innerWidth - 424 };
      const rect = barMeasureRef.current.getBoundingClientRect();
      return { barWidth: rect.width, leftExtension: rect.left, rightExtension: Math.max(window.innerWidth - rect.right, 0) };
    };

    const updateLine = (loadProgress, seamProgress) => {
      if (!rootRef.current) return;
      const { barWidth, leftExtension, rightExtension } = getBarMetrics();
      const loadWidth = barWidth * loadProgress;
      const leftGrow = leftExtension * seamProgress;
      const rightGrow = rightExtension * seamProgress;

      rootRef.current.style.setProperty('--line-left', `${-leftGrow}px`);
      rootRef.current.style.setProperty('--line-width', `${loadWidth + leftGrow + rightGrow}px`);
      rootRef.current.style.setProperty('--line-opacity', '1');
    };

    const animate = (time) => {
      if (cancelled) return;
      const elapsed = time - start;
      const rawLoadProgress = Math.min(elapsed / loadingDuration, 1);
      const loadProgress = easeOutQuart(rawLoadProgress);
      const rawSeamProgress = Math.min(Math.max((elapsed - loadingDuration - seamDelay) / seamDuration, 0), 1);
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
        runLater(() => setPhase('opening'), 80);
        runLater(() => onAppReadyRef.current?.(), 260);
        runLater(() => onCompleteRef.current?.(), 1500);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => { cancelled = true; cancelAnimationFrame(rafId); timers.forEach(clearTimeout); };
  }, []);

  const isSeam = phase === 'seam' || phase === 'opening';
  const isOpening = phase === 'opening';

  const ProgressSeam = ({ measure = false, bottom = false }) => (
    <div ref={measure ? barMeasureRef : null} className="w-full max-w-[400px] relative h-[1px] overflow-visible">
      <div
        className={`absolute top-0 h-full bg-gradient-to-r from-orange-600 via-rose-500 to-amber-400 shadow-[0_0_10px_rgba(249,115,22,0.8)] will-change-[left,width,opacity] ${bottom && !isOpening ? 'opacity-0' : 'opacity-100'}`}
        style={{ left: 'var(--line-left)', width: 'var(--line-width)' }}
      />
      <div
        className={`absolute top-1/2 h-[14px] -translate-y-1/2 bg-orange-500/20 blur-xl will-change-[left,width,opacity] ${bottom && !isOpening ? 'opacity-0' : 'opacity-100'}`}
        style={{ left: 'var(--line-left)', width: 'var(--line-width)' }}
      />
    </div>
  );

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] pointer-events-none overflow-hidden" style={{ '--line-left': '0px', '--line-width': '0px', '--line-opacity': '1' }}>
      <div className={`absolute top-0 left-0 w-full h-[50vh] bg-[#020202] transform-gpu transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform ${isOpening ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="absolute bottom-0 left-0 w-full flex flex-col justify-end">
          <div className="w-full px-[3%]">
            <div className={`w-full max-w-[400px] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isSeam ? 'opacity-0 scale-90 blur-xl translate-y-4' : 'opacity-100 scale-100 blur-0 translate-y-0'}`}>
              <div className="flex flex-col mb-5">
                <span className="text-orange-500 font-mono text-xs tracking-[0.3em] uppercase mb-1">System Boot</span>
                <div className="text-white text-5xl md:text-7xl font-bold tracking-tighter leading-none" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  {displayProgress}<span className="text-3xl md:text-4xl text-orange-500">%</span>
                </div>
              </div>
            </div>
            <ProgressSeam measure />
          </div>
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-[50vh] bg-[#020202] transform-gpu transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform ${isOpening ? 'translate-y-full' : 'translate-y-0'}`}>
        <div className="absolute top-0 left-0 w-full flex flex-col justify-start">
          <div className="w-full px-[3%]">
            <ProgressSeam bottom />
          </div>
        </div>
      </div>
    </div>
  );
};

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const isPrimary = variant === 'primary';
  return (
    <button 
      onClick={onClick} 
      className={`group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden z-10 rounded-[9px] ${
        isPrimary ? 'text-black hover:text-white border border-transparent' : 'text-white border border-white/20 hover:border-transparent'
      } ${className}`}
    >
      <div className={`absolute inset-0 -z-20 transition-opacity duration-500 ${isPrimary ? 'bg-white group-hover:opacity-0' : 'bg-[#020202]'}`} />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 origin-top scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 -z-10" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

const Header = ({ navigate, currentPage, isAppReady }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-[1200ms] delay-500 ${
        isAppReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      } ${isScrolled ? 'pt-4' : 'pt-6'}`}>
        
        <div className={`mx-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? 'w-[98%] bg-[#050505]/95 backdrop-blur-xl rounded-[9px] px-6 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/5' : 'w-full px-[3%] py-2 border border-transparent'
        }`}>
          <div className="group relative cursor-pointer flex items-center" onClick={() => navigate('home')}>
            <span className="text-xl md:text-2xl font-normal text-white tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Technimation<span className="text-orange-500">.</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
          </div>
          <button onClick={() => setIsMenuOpen(true)} className="flex items-center justify-center w-10 h-10 text-white hover:text-orange-500 transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-[100] bg-[#020202]/95 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-center items-center ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute top-6 w-[100vw] px-[1%] flex justify-end">
          <button onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all hover:rotate-90 duration-300">
            <X size={18} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-6 md:gap-8">
          {['home', 'services', 'industries', 'contact'].map((page, i) => (
            <div key={page} className="overflow-hidden p-2">
              <button 
                onClick={() => { navigate(page); setIsMenuOpen(false); }}
                className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white hover:text-orange-500 transition-colors block"
                style={{ fontFamily: '"Space Grotesk", sans-serif', transform: isMenuOpen ? 'translateY(0)' : 'translateY(100%)', transition: `transform 800ms cubic-bezier(0.16,1,0.3,1) ${isMenuOpen ? i * 100 + 200 : 0}ms` }}
              >
                {page}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const ManifestoSection = () => (
  // The first section in the scroll flow. 
  // It has a transparent background so the sticky hero grid blurs cleanly underneath it as it slides up.
  <section className="w-full px-[3%] py-24 md:py-32 relative overflow-hidden flex items-center justify-center border-b border-white/5 bg-[#020202]/70 backdrop-blur-3xl">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-orange-500/10 to-rose-500/5 blur-[100px] rounded-full pointer-events-none" />
    <Reveal className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
      <h2 className="text-2xl md:text-4xl lg:text-[2.75rem] font-light text-neutral-400 leading-[1.3] tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
        We are not a software vendor. We are your{' '}
        <span className="relative inline-block group text-white font-medium cursor-default z-10">
          engineering partner
          <span className="absolute -bottom-2 md:-bottom-2 left-0 w-full h-[3px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left -z-10" />
        </span>
        , providing the talent and strategy to transform complex operations into agile, autonomous ecosystems.
      </h2>
      
      <div className="mt-16 flex items-center gap-4 text-orange-500 font-mono tracking-[0.2em] uppercase text-xs font-bold cursor-pointer group hover:text-orange-400 transition-colors">
        <span>Learn More</span>
        <div className="w-8 h-8 rounded-full border border-orange-500/30 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-all duration-300">
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Reveal>
  </section>
);

const PartnerMarqueeSection = () => {
  const partners = ['ACME CORP', 'GLOBAL DYNAMICS', 'NEXUS HEAVY', 'VANGUARD SEC', 'STELLAR AEROSPACE'];
  const duplicated = [...partners, ...partners];
  
  return (
    <div className="w-full overflow-hidden bg-[#020202] py-8 border-b border-white/5 relative flex">
      <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-[#020202] to-transparent z-10" />
      <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-[#020202] to-transparent z-10" />
      <div className="flex animate-[marquee_20s_linear_infinite] w-max">
        {duplicated.map((name, i) => (
          <div key={i} className="flex items-center gap-16 px-8 whitespace-nowrap">
            <span className="text-white/20 font-bold tracking-widest text-lg md:text-xl uppercase font-mono">{name}</span>
            <span className="text-white/10">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BentoServicesSection = () => (
  <section className="w-full py-24 bg-[#020202] relative overflow-hidden">
    <div className="px-[3%] mb-8">
      <SectionHeader subtitle="Core Capabilities" title="The Enterprise Stack" />
    </div>
    
    <Reveal delay={200} className="relative">
      <div className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-[3%] pb-12 pt-4">
        {SERVICES.map((service) => (
          <div 
            key={service.id} 
            className="snap-start shrink-0 w-[85vw] sm:w-[320px] lg:w-[360px] h-[380px] group relative bg-[#050505] border border-white/5 rounded-[2rem] p-8 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] hover:border-orange-500/30 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between cursor-pointer"
          >
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-neutral-400 mb-8 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 border border-white/10 shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 transition-colors group-hover:text-orange-500" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                {service.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                {service.brief}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-5 mt-6">
              <span className="text-xs font-bold text-white uppercase tracking-widest group-hover:text-orange-500 transition-colors">
                Service Details
              </span>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-orange-500 group-hover:bg-orange-500 transition-all duration-500 overflow-hidden relative shadow-sm">
                <ArrowRight size={16} className="absolute -translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                <ArrowRight size={16} className="absolute group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
              </div>
            </div>
          </div>
        ))}
        <div className="shrink-0 w-2 md:w-[2vw]" />
      </div>
    </Reveal>
  </section>
);

const useCounter = (end, duration = 2000, startAnimating) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startAnimating) { setCount(0); return; }
    let start = null;
    const step = (time) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, startAnimating]);
  return count;
};

const StatsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const uptime = useCounter(99, 2000, inView);
  const value = useCounter(2, 2500, inView);

  return (
    <section ref={ref} className="w-full px-[3%] py-24 relative bg-[#050505] border-y border-white/5 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10 max-w-[1200px] mx-auto">
        <Reveal delay={0} className="flex flex-col items-center text-center">
          <div className="text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            {uptime}.99%
          </div>
          <div className="text-lg text-neutral-300 font-medium mb-1">Uptime Guaranteed</div>
          <div className="text-xs text-neutral-500 font-mono uppercase tracking-widest font-bold">Mission-critical</div>
        </Reveal>
        <Reveal delay={200} className="flex flex-col items-center text-center">
          <div className="text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            ${value}B+
          </div>
          <div className="text-lg text-neutral-300 font-medium mb-1">Client Value Generated</div>
          <div className="text-xs text-neutral-500 font-mono uppercase tracking-widest font-bold">Via transformation</div>
        </Reveal>
        <Reveal delay={400} className="flex flex-col items-center text-center">
          <div className="text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            24/7
          </div>
          <div className="text-lg text-neutral-300 font-medium mb-1">Active Threat Hunting</div>
          <div className="text-xs text-neutral-500 font-mono uppercase tracking-widest font-bold">Zero-trust SOC</div>
        </Reveal>
      </div>
    </section>
  );
};

// ==========================================
// UPDATED: 3D Holographic Globe Component
// ==========================================
const HolographicGlobe = () => {
  const radius = 400; // Massive scale up (800px diameter)

  // Real world coordinates mapped to the CSS sphere
  const hubs = [
    { name: 'New York', lat: 40.7, lng: -74 },
    { name: 'London', lat: 51.5, lng: -0.1 },
    { name: 'Tokyo', lat: 35.6, lng: 139.6 },
    { name: 'Sydney', lat: -33.8, lng: 151.2 },
    { name: 'Singapore', lat: 1.3, lng: 103.8 },
    { name: 'Dubai', lat: 25.2, lng: 55.2 },
    { name: 'San Francisco', lat: 37.7, lng: -122.4 }
  ];

  return (
    <div className="relative w-[800px] h-[800px] flex items-center justify-center [perspective:1600px]">
      
      {/* Ambient outer space glow */}
      <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-orange-500/10 via-transparent to-rose-500/5 blur-[100px] opacity-70 pointer-events-none" />

      {/* The core 3D Sphere */}
      <div className="relative w-full h-full [transform-style:preserve-3d] animate-[globe-spin_45s_linear_infinite]">
        
        {/* Longitudes (Vertical lines) */}
        {[0, 30, 60, 90, 120, 150].map(deg => (
          <div key={`lng-${deg}`} className="absolute inset-0 border border-white/10 rounded-full" style={{ transform: `rotateY(${deg}deg)` }} />
        ))}

        {/* Latitudes (Horizontal lines) - Added more density for higher fidelity */}
        {[-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75].map(deg => {
          const z = Math.sin(deg * Math.PI / 180) * radius;
          const ringRadius = Math.cos(deg * Math.PI / 180) * radius;
          const isEquator = deg === 0;
          
          return (
            <div
              key={`lat-${deg}`}
              className={`absolute rounded-full ${isEquator ? 'border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]' : 'border border-white/10'}`}
              style={{
                width: `${ringRadius * 2}px`,
                height: `${ringRadius * 2}px`,
                top: '50%',
                left: '50%',
                marginLeft: `-${ringRadius}px`,
                marginTop: `-${ringRadius}px`,
                transform: `rotateX(90deg) translateZ(${z}px)`
              }}
            />
          );
        })}

        {/* Global Hub Nodes (Cities) - Scaled up for visibility */}
        {hubs.map(hub => (
          <div key={hub.name} className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: `rotateY(${hub.lng}deg) rotateX(${-hub.lat}deg)` }}>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-orange-500 rounded-full shadow-[0_0_25px_#f97316]" style={{ transform: `translateZ(${radius}px)` }}>
              {/* Pulsing beacon effect */}
              <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EcosystemSection = () => (
  <section className="w-full px-[3%] py-32 relative bg-[#020202] flex flex-col justify-center min-h-[600px] lg:min-h-[850px] overflow-hidden">
    
    {/* Text content strict to the left */}
    <div className="w-full lg:w-1/2 relative z-10">
      <Reveal>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-orange-500 font-mono text-xs tracking-widest uppercase font-bold">Engagement</span>
          <span className="w-8 h-[1px] bg-orange-500" />
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          Global Delivery Model
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <p className="text-lg text-neutral-400 mb-8 max-w-lg leading-relaxed">
          We deploy highly specialized, cross-functional engineering pods that integrate seamlessly with your internal teams to drive scalable growth and execute complex digital transformations.
        </p>
        <ul className="space-y-4 font-mono text-sm tracking-widest text-neutral-300 font-bold">
          {['Dedicated Engineering Teams', 'Strategic IT Advisory', '24/7 Managed Operations'].map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-orange-500" /> {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
    
    {/* Oversized Globe pushed off the extreme right edge */}
    <div className="absolute right-[-400px] md:right-[-350px] lg:right-[-250px] top-1/2 -translate-y-1/2 pointer-events-none opacity-25 lg:opacity-100 mix-blend-screen flex justify-end z-0">
      <Reveal delay={400}>
        <HolographicGlobe />
      </Reveal>
    </div>
  </section>
);

const CyberSecuritySection = () => {
  const tracks = [...Array(20)].map((_, i) => ({
    top: 5 + (i * 4.5), 
    delay: (i * 0.37) % 2.5, 
    duration: 1.5 + ((i * 0.17) % 1.5), 
    isThreat: i % 4 === 0,
  }));

  return (
    <section className="w-full px-[3%] py-24 relative bg-[#050505] overflow-hidden border-y border-white/5">
      <SectionHeader subtitle="SOC Defense" title="Managed Security Services" align="center" />
      
      <Reveal delay={200} className="w-full max-w-5xl mx-auto h-[350px] md:h-[450px] relative mt-12 bg-[#020202] border border-white/10 rounded-[1.5rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center">
        
        <div className="absolute inset-0 z-0">
          {tracks.map((track, i) => (
            <div key={i} className="absolute left-0 w-full h-[1px] bg-white/5" style={{ top: `${track.top}%` }}>
              <div className="absolute left-0 w-1/2 h-full overflow-hidden">
                <div 
                  className={`absolute top-0 h-[2px] w-[60px] -translate-y-[0.5px] rounded-full blur-[1px] ${track.isThreat ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : 'bg-white/20'}`}
                  style={{ animation: `stream-zip ${track.duration}s linear ${track.delay}s infinite` }}
                />
              </div>
              {!track.isThreat && (
                <div className="absolute right-0 w-1/2 h-full overflow-hidden">
                  <div 
                    className="absolute top-0 h-[2px] w-[60px] -translate-y-[0.5px] rounded-full blur-[1px] bg-white/20"
                    style={{ animation: `stream-zip ${track.duration}s linear ${track.delay + (track.duration/2)}s infinite` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="relative z-20 w-20 h-20 md:w-28 md:h-28 bg-[#050505] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 rounded-2xl border border-orange-500/50 animate-[forcefield_2s_linear_infinite]" />
          <div className="absolute inset-0 rounded-2xl border border-orange-500/30 animate-[forcefield_2s_linear_infinite] delay-1000" />
          <Shield size={32} className="text-orange-500 relative z-10" />
        </div>

        <div className="absolute top-6 left-6 md:top-8 md:left-8 font-mono text-[9px] md:text-xs tracking-widest text-neutral-500 z-30">
          <span className="flex items-center gap-2 mb-1"><span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" /> INGRESS TRAFFIC</span>
          <span className="text-orange-500 pl-3">THREAT VECTOR ISOLATED</span>
        </div>
        
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 font-mono text-[9px] md:text-xs tracking-widest text-neutral-500 text-right z-30">
          <span className="flex items-center justify-end gap-2 mb-1">EGRESS PIPELINE <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /></span>
          <span className="text-white pr-3">PAYLOAD SANITIZED</span>
        </div>

        <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#020202] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#020202] to-transparent z-10" />
      </Reveal>
    </section>
  );
};

const EngagementsSection = () => (
  <section className="w-full px-[3%] py-24 bg-[#020202] relative overflow-hidden">
    <SectionHeader subtitle="Impact" title="Featured Engagements" />
    <div className="flex flex-col gap-8 max-w-[1200px] mx-auto">
      
      <Reveal className="group flex flex-col md:flex-row bg-[#050505] rounded-[1.5rem] border border-white/5 overflow-hidden hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] hover:border-orange-500/30 transition-all duration-700 hover:-translate-y-1">
        <div className="md:w-2/5 bg-[#020202] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,#f97316,transparent_50%)]" />
          <Database size={32} className="text-orange-500 mb-8 relative z-10" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-500 font-mono text-[10px] tracking-[0.2em] uppercase font-bold">FinTech Sector</span>
            </div>
            <h3 className="text-2xl md:text-3xl text-white font-bold tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Global Payments Fabric</h3>
          </div>
        </div>
        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-[#0a0a0a]">
          <p className="text-neutral-400 text-base md:text-lg mb-8 leading-relaxed">Architected a multi-region, active-active serverless transactional core capable of processing 10,000 TPS with sub-millisecond latency, entirely replacing a legacy monolithic mainframe.</p>
          <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-6">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>-85%</div>
              <div className="text-neutral-500 text-xs font-medium uppercase tracking-widest font-mono">Latency Reduction</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>$12M</div>
              <div className="text-neutral-500 text-xs font-medium uppercase tracking-widest font-mono">Annual Infra Savings</div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={200} className="group flex flex-col md:flex-row-reverse bg-[#050505] rounded-[1.5rem] border border-white/5 overflow-hidden hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] hover:border-orange-500/30 transition-all duration-700 hover:-translate-y-1">
        <div className="md:w-2/5 bg-[#020202] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,#f97316,transparent_50%)]" />
          <Activity size={32} className="text-orange-500 mb-8 relative z-10" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-500 font-mono text-[10px] tracking-[0.2em] uppercase font-bold">Healthcare</span>
            </div>
            <h3 className="text-2xl md:text-3xl text-white font-bold tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Predictive Diagnostics</h3>
          </div>
        </div>
        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-[#0a0a0a] border-l border-white/5 md:border-l-0 md:border-r">
          <p className="text-neutral-400 text-base md:text-lg mb-8 leading-relaxed">Deployed a secure, HIPAA-compliant ML data pipeline that aggregates unstructured clinical records into actionable, real-time diagnostic models used by 50+ hospital networks.</p>
          <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-6">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>24/7</div>
              <div className="text-neutral-500 text-xs font-medium uppercase tracking-widest font-mono">Automated Analysis</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>3x</div>
              <div className="text-neutral-500 text-xs font-medium uppercase tracking-widest font-mono">Faster Diagnostics</div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="w-full px-[3%] py-24 relative bg-[#020202]">
    <Reveal className="flex flex-col items-center text-center mb-16">
      <div className="flex items-center gap-4 mb-4">
        <span className="w-6 h-[1px] bg-orange-500" />
        <span className="text-orange-500 font-mono text-xs tracking-widest uppercase font-bold">Methodology</span>
        <span className="w-6 h-[1px] bg-orange-500" />
      </div>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>How We Execute</h2>
    </Reveal>
    
    <div className="max-w-3xl mx-auto relative mt-12">
      <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2" />
      {[
        { step: "01", name: "Audit & Architecture", desc: "Comprehensive vulnerability scanning and infrastructure mapping." },
        { step: "02", name: "Strategic Deployment", desc: "Phased integration of cloud native solutions and agentic models." },
        { step: "03", name: "Continuous Ops", desc: "24/7 SOC monitoring, automated scaling, and proactive patching." }
      ].map((process, i) => (
        <Reveal key={i} delay={i * 200} className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center mb-12 last:mb-0 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
          <div className="absolute left-0 md:left-1/2 w-12 h-12 bg-[#050505] border-2 border-white/10 rounded-full flex items-center justify-center text-neutral-400 font-mono text-xs tracking-widest font-bold z-10 md:-translate-x-1/2 shadow-sm cursor-default">
            {process.step}
          </div>
          <div className={`ml-20 md:ml-0 md:w-1/2 flex flex-col justify-center pt-2 md:pt-0 ${i % 2 !== 0 ? 'md:text-left md:items-start' : 'md:text-right md:items-end'}`}>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{process.name}</h4>
            <p className="text-neutral-400 text-sm md:text-base max-w-sm leading-relaxed">{process.desc}</p>
          </div>
          <div className="hidden md:block w-1/2" />
        </Reveal>
      ))}
    </div>
  </section>
);

const PreFooterCTA = () => (
  <section className="w-full px-[3%] py-32 relative bg-[#020202] overflow-hidden text-center flex flex-col items-center border-b border-white/5">
    
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
    
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
      <div className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-orange-600/20 blur-[80px] rounded-full animate-[roam_20s_linear_infinite]" />
      <div className="absolute w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-amber-500/10 blur-[60px] rounded-full animate-[roam-alt_25s_linear_infinite]" />
    </div>

    <div
      className="absolute inset-0 z-0 opacity-20"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        animation: 'pan-grid 4s linear infinite',
        WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)',
        maskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)'
      }}
    />

    <Reveal className="relative z-10 flex flex-col items-center w-full">
      <span className="text-neutral-400 font-mono tracking-[0.3em] uppercase text-xs mb-6 font-bold flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        Initiate Protocol
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse delay-150" />
      </span>
      
      <h2 className="text-4xl md:text-6xl lg:text-[6vw] font-bold text-white tracking-tighter leading-none mb-10 uppercase relative" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
        Ready to <br/> Deploy?
        <span className="absolute inset-0 blur-3xl bg-white/5 -z-10 rounded-full" />
      </h2>
      
      <Button className="!bg-white !text-[#050505] hover:!bg-neutral-200 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-500">
        Begin Transformation
      </Button>
    </Reveal>
  </section>
);

const DetailedFooter = () => (
  <footer className="w-full px-[1%] pt-24 pb-8 bg-[#020202] relative z-10">
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24 px-[2%]">
        <div>
          <div className="flex items-center gap-2 mb-6 cursor-default">
            <span className="text-xl font-normal text-white tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Technimation<span className="text-orange-500">.</span></span>
          </div>
          <p className="text-neutral-500 max-w-xs mb-6 leading-relaxed">Architecting the digital foundation for tomorrow's autonomous enterprises.</p>
          <div className="flex gap-4">
            <Linkedin size={20} className="text-neutral-500 hover:text-white cursor-pointer transition-colors" />
            <Globe2 size={20} className="text-neutral-500 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm font-mono">Capabilities</h4>
          <ul className="space-y-4 text-neutral-500">
            {['Cloud Migration', 'Zero-Trust Security', 'Agentic AI', 'Disaster Recovery'].map(item => <li key={item} className="hover:text-orange-500 cursor-pointer transition-colors">{item}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm font-mono">Company</h4>
          <ul className="space-y-4 text-neutral-500">
            {['About Us', 'Case Studies', 'Careers', 'Contact'].map(item => <li key={item} className="hover:text-orange-500 cursor-pointer transition-colors">{item}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm font-mono">Global HQ</h4>
          <p className="text-neutral-500 mb-2">100 Tech Corridor, Suite 900</p>
          <p className="text-neutral-500 mb-6">San Francisco, CA 94107</p>
          <p className="text-neutral-500 font-mono text-sm hover:text-orange-500 cursor-pointer transition-colors">sys@technimation.io</p>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 px-[2%] text-neutral-600 text-xs font-mono uppercase tracking-widest font-bold">
        <p>© {new Date().getFullYear()} Technimation. All rights reserved.</p>
        <div className="flex gap-8">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
);

const HomePage = ({ navigate, isAppReady }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const HERO_DATA = [
    { title: "Enterprise IT", num: "01", desc: "Premier technology consulting and custom engineering services. We architect and manage the scalable foundations of tomorrow's digital economy for global enterprises.", btnPrimary: "Our Services", btnSecondary: "Book a Consultation" },
    { title: "Managed Security", num: "02", desc: "Deploying elite cybersecurity teams and implementing zero-trust architectures to actively monitor, defend, and sanitize your critical digital assets 24/7.", btnPrimary: "View Security Services", btnSecondary: "Threat Assessment" },
    { title: "AI Integration", num: "03", desc: "Expert advisory and implementation services to embed autonomous, self-optimizing intelligence frameworks directly into your existing business operations.", btnPrimary: "AI Consulting", btnSecondary: "Talk to an Expert" }
  ];
  
  const heroRef = useRef(null);
  const mousePos = useRef({ x: 50, y: 50 });
  const targetMouse = useRef({ x: 50, y: 50 });

  useEffect(() => {
    if (!isAppReady) return;
    const interval = setInterval(() => setCurrentTextIndex(prev => (prev + 1) % HERO_DATA.length), 8000); 
    return () => clearInterval(interval);
  }, [isAppReady]);

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

  const handleMouseLeave = () => targetMouse.current = { x: 50, y: 50 };

  return (
    <div className="w-full relative">
      
      {/* 
        THE STICKY CURTAIN REVEAL:
        This section is fixed to the background. As you scroll down the page,
        the rest of the content (which has a solid background and starts 100vh down)
        will slide up and beautifully cover it.
      */}
      <section 
        className="fixed top-0 left-0 w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#020202] z-0" 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave} 
        ref={heroRef} 
        style={{ '--mouse-x': '50%', '--mouse-y': '50%' }}
      >
        <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        {/* Ambient background morphs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center transition-opacity duration-[2000ms] ease-in-out" style={{ opacity: isAppReady ? 1 : 0 }}>
          <div className="absolute w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-orange-600 via-rose-600 to-amber-500 opacity-20 blur-[100px]" style={{ animation: 'amoeba-morph 15s ease-in-out infinite alternate, roam 30s ease-in-out infinite', transformOrigin: 'center center' }} />
        </div>
        
        {/* BASE LAYER (Blurred) */}
        <div className="relative z-30 w-full px-[3%] h-full flex flex-col justify-center pointer-events-none">
          <div className="grid place-items-center w-full max-w-5xl mx-auto h-full">
            {HERO_DATA.map((item, i) => {
              const isActive = i === currentTextIndex;
              return (
                <div key={`base-${item.title}`} className="col-start-1 row-start-1 flex flex-col items-center justify-center text-center w-full" style={{ zIndex: isActive ? 10 : 0, pointerEvents: isActive ? 'auto' : 'none' }}>
                  <div className={`flex items-center justify-center gap-4 mb-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{ transitionDelay: isActive ? '100ms' : '0ms' }}>
                    <span className="w-8 h-[1px] bg-orange-500" /><span className="text-orange-500 font-mono text-xs tracking-widest font-bold">{item.num} // 03</span><span className="w-8 h-[1px] bg-orange-500" />
                  </div>
                  <h1 className={`text-[12vw] sm:text-[10vw] md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] text-orange-200/10 mb-6 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-y-0 scale-100 tracking-tighter' : 'opacity-0 translate-y-12 scale-[1.05] tracking-[0.1em]'}`} style={{ fontFamily: '"Space Grotesk", sans-serif', filter: isActive ? 'blur(12px)' : 'blur(24px)', transitionDelay: isActive ? '200ms' : '0ms' }}>
                    {item.title}
                  </h1>
                  <p className={`text-neutral-400 text-center mx-auto text-base md:text-lg leading-relaxed font-light max-w-2xl mb-10 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{ transitionDelay: isActive ? '300ms' : '0ms' }}>
                    {item.desc}
                  </p>
                  <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{ transitionDelay: isActive ? '400ms' : '0ms' }}>
                    <Button onClick={() => navigate('services')}>{item.btnPrimary}</Button>
                    <Button variant="secondary" onClick={() => navigate('contact')}>{item.btnSecondary}</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SPOTLIGHT LAYER (Sharp Text + Grid Background) */}
        <div className="absolute inset-0 pointer-events-none z-40 transition-all duration-[1500ms]" style={{ opacity: isAppReady ? 1 : 0, WebkitMaskImage: 'radial-gradient(circle 35vmax at var(--mouse-x) var(--mouse-y), black 0%, black 15%, transparent 70%)', maskImage: 'radial-gradient(circle 35vmax at var(--mouse-x) var(--mouse-y), black 0%, black 15%, transparent 70%)' }}>
          
          {/* Architectural Tech-Grid (Only visible in the spotlight) */}
          <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="relative z-10 w-full px-[3%] h-full flex flex-col justify-center">
            <div className="grid place-items-center w-full max-w-5xl mx-auto h-full">
              {HERO_DATA.map((item, i) => {
                const isActive = i === currentTextIndex;
                return (
                  <div key={`sharp-${item.title}`} className="col-start-1 row-start-1 flex flex-col items-center justify-center text-center w-full">
                    <div className={`flex items-center justify-center gap-4 mb-6 opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`} style={{ transitionDelay: isActive ? '100ms' : '0ms' }}>
                      <span className="w-8 h-[1px]" /><span className="font-mono text-xs tracking-widest">{item.num} // 03</span><span className="w-8 h-[1px]" />
                    </div>
                    <h1 className={`text-[12vw] sm:text-[10vw] md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] text-white mb-6 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-y-0 scale-100 tracking-tighter' : 'opacity-0 translate-y-12 scale-[1.05] tracking-[0.1em]'}`} style={{ fontFamily: '"Space Grotesk", sans-serif', textShadow: '0 0 40px rgba(255,255,255,0.1), 0 0 80px rgba(255,165,0,0.3)', filter: isActive ? 'blur(0px)' : 'blur(16px)', transitionDelay: isActive ? '200ms' : '0ms' }}>
                      {item.title}
                    </h1>
                    <p className={`text-center mx-auto text-base md:text-lg leading-relaxed font-light max-w-2xl mb-10 opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`} style={{ transitionDelay: isActive ? '300ms' : '0ms' }}>
                      {item.desc}
                    </p>
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`} style={{ transitionDelay: isActive ? '400ms' : '0ms' }}>
                      <Button>{item.btnPrimary}</Button><Button variant="secondary">{item.btnSecondary}</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 
        THE SCROLLABLE CONTENT:
        This container holds everything below the hero. It has a top margin of 100dvh
        to push it below the screen initially. As you scroll, it perfectly covers the fixed hero.
      */}
      <div className="relative z-10 mt-[100dvh] w-full bg-[#020202] flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.8)] border-t border-white/5">
        <ManifestoSection />
        <PartnerMarqueeSection />
        <BentoServicesSection />
        <StatsSection />
        <EcosystemSection />
        <CyberSecuritySection />
        <EngagementsSection />
        <ProcessSection />
        <PreFooterCTA />
        <DetailedFooter />
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAppReady, setIsAppReady] = useState(false);
  const [isPreloaderMounted, setIsPreloaderMounted] = useState(true);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="bg-[#020202] text-slate-300 min-h-screen w-full font-sans selection:bg-orange-500 selection:text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      <style>{`
        /* Global CSS utilities */
        html, body { overflow-x: hidden; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Keyframe Animations */
        @keyframes amoeba-morph { 0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; } 33% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 66% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; } 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; } }
        @keyframes roam { 0% { transform: translate(-30vw, -35vh) scale(1) rotate(0deg); } 25% { transform: translate(30vw, 35vh) scale(1.1) rotate(90deg); } 50% { transform: translate(15vw, -40vh) scale(0.9) rotate(180deg); } 75% { transform: translate(-30vw, 25vh) scale(1.05) rotate(270deg); } 100% { transform: translate(-30vw, -35vh) scale(1) rotate(360deg); } }
        @keyframes roam-alt { 0% { transform: translate(30vw, 35vh) scale(1) rotate(0deg); } 33% { transform: translate(-30vw, -25vh) scale(1.2) rotate(-120deg); } 66% { transform: translate(-15vw, 40vh) scale(0.8) rotate(-240deg); } 100% { transform: translate(30vw, 35vh) scale(1) rotate(-360deg); } }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        @keyframes pan-grid { 0% { background-position: 0 0; } 100% { background-position: 40px -40px; } }
        
        /* Cybersecurity Data Stream Physics */
        @keyframes stream-zip {
          0% { left: -100px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes forcefield {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        /* 3D Holographic Globe Physics */
        @keyframes globe-spin {
          0% { transform: rotateX(-15deg) rotateY(0deg); }
          100% { transform: rotateX(-15deg) rotateY(360deg); }
        }
      `}</style>
      
      {isPreloaderMounted && <Preloader onAppReady={() => setIsAppReady(true)} onComplete={() => setIsPreloaderMounted(false)} />}
      <Header navigate={setCurrentPage} currentPage={currentPage} isAppReady={isAppReady} />
      <main className="w-full relative">
        <HomePage navigate={setCurrentPage} isAppReady={isAppReady} />
      </main>
    </div>
  );
}
