import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown, ArrowRight, Shield, Cloud, Server, Cpu, CheckCircle, Database, Network, Lock, BarChart3, Users, Globe } from 'lucide-react';

export default function App() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const aboutRef = useRef(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFounder, setActiveFounder] = useState(0);

  const logoSrc = "https://static.wixstatic.com/media/548938_573f491cecff47b39b0e8cfb59295785~mv2.png";
  
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const current = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const aboutMouse = useRef({ x: 0, y: 0 });

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { 
      name: 'Solutions', 
      submenu: [
        { name: 'Enterprise Cloud', href: '#enterprise' },
        { name: 'Zero-Trust Security', href: '#security' },
        { name: 'IT Infrastructure', href: '#infrastructure' }
      ] 
    },
    { name: 'Contact Us', href: '#contact' }
  ];

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      const unmountTimer = setTimeout(() => setShowPreloader(false), 1000);
      return () => clearTimeout(unmountTimer);
    }, 2800);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const founderInterval = setInterval(() => {
      setActiveFounder((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(founderInterval);
  }, []);

  useEffect(() => {
    const videoSrc = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Hls && window.Hls.isSupported()) {
        const hls = new window.Hls({ enableWorker: false });
        hls.loadSource(videoSrc);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current && videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videoSrc;
      }
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.05;
      current.current.y += (target.current.y - current.current.y) * 0.05;
      
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${current.current.x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${current.current.y}px`);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    target.current.x = e.clientX - rect.left;
    target.current.y = e.clientY - rect.top;
  };

  const handleAboutMouseMove = (e) => {
    if (!aboutRef.current) return;
    const rect = aboutRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    aboutRef.current.style.setProperty('--about-mouse-x', `${x}px`);
    aboutRef.current.style.setProperty('--about-mouse-y', `${y}px`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        body { margin: 0; padding: 0; background-color: #070b0a; }
        .font-inter { font-family: 'Inter', sans-serif; }

        @keyframes logo-pulse {
          0% { transform: scale(0.95); filter: drop-shadow(0 0 0px rgba(249,115,22,0)); }
          50% { transform: scale(1.05); filter: drop-shadow(0 0 25px rgba(249,115,22,0.7)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(249,115,22,0.4)); }
        }
        
        @keyframes mask-wipe {
          0% { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }

        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-flow {
          background-size: 200% auto;
          animation: gradient-flow 3s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover { animation-play-state: paused; }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(249, 115, 22, 0.5); border-radius: 10px; }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 100ms; }
        .reveal-delay-2 { transition-delay: 200ms; }
        .reveal-delay-3 { transition-delay: 300ms; }
        .reveal-delay-4 { transition-delay: 400ms; }
        .reveal-delay-5 { transition-delay: 500ms; }

        .founder-card {
          transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .founder-active {
          opacity: 1;
          transform: scale(1);
          filter: blur(0px);
          z-index: 10;
        }
        .founder-inactive {
          opacity: 0;
          transform: scale(1.08);
          filter: blur(16px);
          z-index: 0;
          pointer-events: none;
        }

        .header-transition {
          transition: background-color 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease;
        }

        .spotlight-overlay {
          background: radial-gradient(800px circle at var(--about-mouse-x) var(--about-mouse-y), rgba(249, 115, 22, 0.03), transparent 40%);
        }
      `}</style>

      {showPreloader && (
        <div className={`fixed inset-0 z-[200] bg-[#070b0a] flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoading ? 'opacity-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
          <div className="relative w-64 h-24 md:w-80 md:h-32">
            <div className="absolute inset-0 animate-[logo-pulse_2.8s_cubic-bezier(0.22,1,0.36,1)_forwards]">
              <img src={logoSrc} className="absolute inset-0 w-full h-full object-contain opacity-20" alt="Base Logo" />
              <div 
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-500 animate-[mask-wipe_2s_cubic-bezier(0.85,0,0.15,1)_forwards]"
                style={{ WebkitMaskImage: `url(${logoSrc})`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="font-inter selection:bg-orange-500 selection:text-black overflow-x-hidden bg-[#070b0a]">
        
        <header className={`fixed top-0 left-0 right-0 z-[100] px-[1vw] py-5 header-transition flex items-center justify-between w-full ${isScrolled ? 'bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent border-b border-transparent'}`}>
          <a href="#" className="flex items-center z-[110] pl-4">
            <img src={logoSrc} alt="Technimation Logo" className="h-9 md:h-11 w-auto object-contain drop-shadow-md transition-transform duration-500 hover:scale-105" />
          </a>
          <button onClick={() => setIsMenuOpen(true)} className="p-2 text-white hover:text-orange-400 transition-colors duration-300 focus:outline-none z-[110] pr-4">
            <Menu size={32} strokeWidth={1.5} />
          </button>
        </header>

        <div 
          className={`fixed inset-0 bg-[#070b0a]/80 backdrop-blur-md z-[120] transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div className={`fixed top-0 right-0 h-full w-full max-w-[500px] bg-[#0a0a0a]/95 backdrop-blur-3xl border-l border-white/5 z-[130] flex flex-col p-8 md:p-12 transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-end w-full mb-12">
            <button 
              onClick={() => { setIsMenuOpen(false); setTimeout(() => setExpandedMenu(null), 500); }} 
              className="p-2 text-white/70 hover:text-orange-400 transition-transform duration-500 hover:rotate-90 focus:outline-none"
            >
              <X size={36} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col gap-6 w-full overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
            {menuItems.map((item, index) => (
              <div key={item.name} className={`flex flex-col transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`} style={{ transitionDelay: `${isMenuOpen ? 150 + (index * 80) : 0}ms` }}>
                {item.submenu ? (
                  <button onClick={() => toggleSubmenu(item.name)} className="group relative flex items-center gap-4 text-4xl md:text-5xl font-black uppercase tracking-tighter w-fit text-left focus:outline-none py-1">
                    <div className="relative">
                      <span className={`block transition-all duration-500 ${expandedMenu === item.name ? 'text-transparent' : 'text-transparent group-hover:text-orange-500'}`} style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>{item.name}</span>
                      <span className={`absolute inset-0 text-orange-500 transition-all duration-500 ease-out pointer-events-none ${expandedMenu === item.name ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100'}`}>{item.name}</span>
                    </div>
                    <ChevronDown className={`transition-all duration-500 ${expandedMenu === item.name ? 'rotate-180 text-orange-500' : 'text-white/30 group-hover:text-orange-500'}`} size={28} strokeWidth={3} />
                  </button>
                ) : (
                  <a href={item.href} onClick={() => setIsMenuOpen(false)} className="group relative text-4xl md:text-5xl font-black uppercase tracking-tighter block w-fit py-1">
                    <span className="block text-transparent transition-all duration-500 group-hover:text-orange-500" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>{item.name}</span>
                    <span className="absolute inset-0 text-orange-500 opacity-0 transform translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none">{item.name}</span>
                  </a>
                )}
                {item.submenu && (
                  <div className={`flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${expandedMenu === item.name ? 'max-h-[300px] opacity-100 mt-6 mb-4' : 'max-h-0 opacity-0 mt-0 mb-0'}`}>
                    {item.submenu.map((subItem) => (
                      <a key={subItem.name} href={subItem.href} onClick={() => setIsMenuOpen(false)} className="text-xl md:text-2xl font-light text-white/50 hover:text-orange-400 transition-colors duration-300 ml-4 tracking-wide">{subItem.name}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className={`mt-auto flex flex-col gap-8 transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: `${isMenuOpen ? 600 : 0}ms` }}>
            <div className="flex flex-col ml-1 border-l border-orange-500 pl-4 py-1">
              <p className="text-orange-500 font-semibold text-sm md:text-base italic max-w-[250px] mb-6">"Empowering the next generation of digital architects."</p>
              <div className="flex flex-col gap-1 text-[11px] md:text-xs text-white/40 font-light tracking-wider mt-1">
                <p>123 Innovation Drive, Suite 400</p>
                <p>San Francisco, CA 94105</p>
                <a href="tel:+15551234567" className="hover:text-orange-400 transition-colors mt-1 inline-block w-fit">+1 (555) 123-4567</a>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Background Layer (Section 1: Hero) */}
        <div ref={containerRef} onMouseMove={handleMouseMove} className="fixed inset-0 z-0 w-full h-screen overflow-hidden bg-[#070b0a]">
          <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 lg:left-[5%] xl:left-[8%] z-[10] flex flex-col items-start w-full max-w-[90%] md:max-w-3xl text-left mt-8">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(249,115,22,0.1)] w-fit">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-400 font-mono text-xs font-semibold tracking-[0.2em] uppercase">Enterprise IT Architecture</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-[80px] font-black text-white leading-[1.05] tracking-tighter mb-6 drop-shadow-2xl">
              ENGINEER YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">DIGITAL</span> FUTURE.
            </h1>
            <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-[600px] mb-10 drop-shadow-md">
              Empower your business with resilient, scalable technology. We specialize in comprehensive Enterprise IT Consulting, Cloud Computing, advanced Zero-Trust Cybersecurity, and robust Infrastructure Management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
               <button className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 animate-gradient-flow text-[#070b0a] font-black text-sm tracking-wider uppercase px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:-translate-y-1">
                Explore Solutions
              </button>
              <button className="bg-black/40 border border-white/20 hover:border-white/50 text-white font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-md hover:bg-black/60">
                Schedule Consultation
              </button>
            </div>
          </div>
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-50 z-0" style={{ filter: 'sepia(1) hue-rotate(-15deg) saturate(3.5) contrast(1.1)' }} autoPlay loop muted playsInline />
          <div className="absolute inset-0 z-[2] pointer-events-none transition-opacity duration-500" style={{ background: `radial-gradient(circle 1200px at var(--mouse-x) var(--mouse-y), rgba(7, 11, 10, 0) 10%, rgba(7, 11, 10, 0.5) 50%, rgba(7, 11, 10, 0.95) 100%)` }} />
        </div>

        {/* Scrolling Foreground Layer */}
        <div className="relative z-10 w-full mt-[100vh] bg-white flex flex-col">
          
          {/* Section 2: Flush Marquee Partner Strip */}
          <section className="w-full py-8 bg-[#f8f9fa] border-b border-gray-200 overflow-hidden flex flex-col items-center justify-center relative px-[3vw]">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none" />
            <div className="animate-marquee flex items-center gap-16 md:gap-24">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {['VMware', 'Dell Technologies', 'Microsoft', 'Cisco', 'AWS', 'Oracle', 'IBM', 'Palo Alto Networks'].map((partner, index) => (
                    <div key={`${i}-${index}`} className="text-gray-300 hover:text-orange-500 transition-colors duration-500 text-sm md:text-base font-black uppercase tracking-[0.25em] whitespace-nowrap cursor-default">
                      {partner}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Section 3: About & Metrics (Spotlight Interaction & 12-Col Grid) */}
          <section ref={aboutRef} onMouseMove={handleAboutMouseMove} className="w-full py-24 md:py-32 bg-white relative overflow-hidden px-[3vw]">
            <div className="absolute inset-0 spotlight-overlay pointer-events-none z-0" />
            <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
              
              <div className="lg:col-span-3 reveal">
                <div className="flex items-center gap-3 group cursor-pointer w-fit">
                  <span className="w-2 h-2 rounded-full bg-slate-900 group-hover:bg-orange-500 transition-colors duration-300" />
                  <span className="text-slate-900 font-medium text-sm tracking-widest uppercase relative overflow-hidden">
                    ABOUT
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                  </span>
                </div>
              </div>
              
              <div className="lg:col-span-9 flex flex-col gap-12 lg:gap-16">
                <p className="text-[#334155] text-[22px] md:text-[26px] lg:text-[30px] font-light leading-[1.65] tracking-normal reveal reveal-delay-1 max-w-[1050px]">
                  Technimation is a premier global IT Consulting firm. With over a decade of enterprise experience, we deliver tailored architectural data solutions that empower B2B SaaS and enterprise businesses to scale securely. Our elite engineering team provides strategic GEO and AIO insights to ensure success through robust infrastructure management.
                </p>

                <div className="w-full flex flex-wrap md:flex-nowrap gap-y-12 md:gap-y-0 md:divide-x divide-slate-200/80 mt-4">
                  {/* Metric 1 */}
                  <div className="w-1/2 md:w-1/4 flex flex-col md:pr-6 lg:pr-10 reveal reveal-delay-2">
                    <span className="text-[38px] lg:text-[46px] font-semibold text-[#0f172a] mb-3 tracking-tighter">99.99%</span>
                    <span className="text-slate-500 text-[13px] lg:text-[15px] leading-relaxed max-w-[200px]">Guaranteed enterprise infrastructure uptime.</span>
                  </div>
                  {/* Metric 2 */}
                  <div className="w-1/2 md:w-1/4 flex flex-col md:px-6 lg:px-10 reveal reveal-delay-3">
                    <span className="text-[38px] lg:text-[46px] font-semibold text-[#0f172a] mb-3 tracking-tighter">250+</span>
                    <span className="text-slate-500 text-[13px] lg:text-[15px] leading-relaxed max-w-[200px]">Successful cloud migrations globally.</span>
                  </div>
                  {/* Metric 3 */}
                  <div className="w-1/2 md:w-1/4 flex flex-col md:px-6 lg:px-10 reveal reveal-delay-4">
                    <span className="text-[38px] lg:text-[46px] font-semibold text-[#0f172a] mb-3 tracking-tighter">$50M+</span>
                    <span className="text-slate-500 text-[13px] lg:text-[15px] leading-relaxed max-w-[200px]">Client IT expenditure optimized.</span>
                  </div>
                  {/* Metric 4 */}
                  <div className="w-1/2 md:w-1/4 flex flex-col md:pl-6 lg:pl-10 reveal reveal-delay-5">
                    <span className="text-[38px] lg:text-[46px] font-semibold text-[#0f172a] mb-3 tracking-tighter">0</span>
                    <span className="text-slate-500 text-[13px] lg:text-[15px] leading-relaxed max-w-[200px]">Unmitigated critical security breaches.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: B2B Growth & Funnels (Floating UI) */}
          <section className="w-full py-24 md:py-32 bg-[#f4f3ef] px-[3vw]">
            <div className="w-full max-w-[1600px] mx-auto">
              <div className="text-center mb-16 reveal">
                <h2 className="text-4xl md:text-6xl font-bold text-[#1a3b2b] tracking-tight mb-4">The Proven Choice <br/> For B2B SaaS Growth</h2>
                <p className="text-[#1a3b2b]/70 max-w-2xl mx-auto">Aligning scalable IT architecture with high-converting digital strategies.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal reveal-delay-1">
                {/* Funnel Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full h-48 mb-8 relative flex flex-col items-center justify-end gap-2 pb-4">
                    <div className="w-4/5 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] text-gray-400 font-bold tracking-widest uppercase group-hover:bg-green-50 transition-colors">50k Potential</div>
                    <div className="w-3/5 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] text-gray-400 font-bold tracking-widest uppercase group-hover:bg-green-100 transition-colors">20k Engaged</div>
                    <div className="w-2/5 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] text-gray-400 font-bold tracking-widest uppercase group-hover:bg-green-200 transition-colors">5k Trials</div>
                    <div className="w-6 h-6 bg-[#1a3b2b] rounded-full mt-2 shadow-lg group-hover:scale-125 transition-transform"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Reach The Right Buyers</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">We attract right-fit buyers with Technical SEO, targeted GEO strategies, and AI-optimized architectures.</p>
                </div>

                {/* Offer Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col group hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full h-48 mb-8 flex flex-col gap-4">
                    <div className="w-full bg-gray-50 rounded-2xl p-4 flex justify-between items-center border border-gray-100">
                      <span className="text-3xl font-bold text-gray-900">$62.9K</span>
                      <span className="text-green-600 text-sm font-bold flex items-center gap-1"><ArrowRight size={14} className="-rotate-45"/> 3.2%</span>
                    </div>
                    <div className="w-full bg-gray-50 rounded-2xl p-4 flex flex-col border border-gray-100">
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Users size={14} className="text-green-700"/> Customers</span>
                      <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold text-gray-900">4.2K</span>
                        <span className="text-green-600 text-sm font-bold flex items-center gap-1"><ArrowRight size={14} className="-rotate-45"/> 642%</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Make an Irresistible Offer</h3>
                  <p className="text-gray-500 text-sm leading-relaxed text-center">We optimize cloud performance and landing pages to convert prospects into demos and enterprise trials rapidly.</p>
                </div>

                {/* Bar Chart Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col text-center group hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full h-48 mb-8 flex items-end justify-center gap-3 pb-6 border-b border-gray-100">
                    {[40, 60, 50, 80, 100, 70].map((h, i) => (
                      <div key={i} className="w-8 rounded-t-lg bg-gray-100 relative group-hover:bg-gray-200 transition-colors" style={{height: `${h}%`}}>
                        {i === 4 && <div className="absolute inset-0 bg-[#1a3b2b] rounded-t-lg shadow-lg"></div>}
                      </div>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Scale Sustainably</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">We reallocate wasted IT spend into scalable cloud solutions to attract high LTV customers at a lower cost.</p>
                </div>
              </div>
              
              <div className="mt-12 flex justify-center reveal reveal-delay-2">
                <button className="bg-[#1a3b2b] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide flex items-center gap-3 hover:bg-[#122a1f] transition-colors shadow-xl">
                  Your Free Scalability Plan <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </section>

          {/* Section 5: Founders & Leadership (Cinematic Swap) */}
          <section className="w-full py-24 md:py-32 bg-[#05110d] px-[3vw] text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4ade80 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="reveal">
                <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 leading-tight">Insightful Strategies, <br/><span className="text-green-400">Solutions that Inspire!</span></h2>
                <p className="text-gray-400 text-lg max-w-xl mb-12 font-light">
                  Seamlessly adjust and grow your business with our versatile infrastructure, built by industry veterans to fuel and sustain your global expansion.
                </p>
                <div className="flex gap-4 mb-16">
                  <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-gray-100 transition-colors">Get Started</button>
                  <button className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-white/20 transition-colors">How it works</button>
                </div>
                
                <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
                  <div>
                    <h4 className="text-4xl font-bold mb-2">97%</h4>
                    <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Platform Client<br/>Satisfaction</p>
                  </div>
                  <div>
                    <h4 className="text-4xl font-bold mb-2">30+</h4>
                    <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Weekly Insights<br/>& Resources</p>
                  </div>
                  <div>
                    <h4 className="text-4xl font-bold mb-2">25m</h4>
                    <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Customers<br/>Globally</p>
                  </div>
                </div>
              </div>

              {/* Cinematic Swapping Cards */}
              <div className="relative h-[600px] w-full max-w-[500px] mx-auto lg:ml-auto reveal reveal-delay-1">
                {/* Founder 1 */}
                <div className={`absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-400 rounded-3xl p-6 flex flex-col justify-end shadow-2xl founder-card ${activeFounder === 0 ? 'founder-active' : 'founder-inactive'}`}>
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" alt="Simon Holdings" className="absolute inset-0 w-full h-full object-cover rounded-3xl mix-blend-overlay opacity-80" />
                  <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-gray-900 font-bold text-xl flex items-center gap-2">Simon Holdings <CheckCircle size={16} className="text-blue-500"/></h4>
                        <p className="text-gray-500 text-sm">Sr. Enterprise Architect</p>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-4">
                      <div className="text-center">
                        <span className="block text-gray-900 font-black text-2xl">170</span>
                        <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Consultations</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-gray-900 font-black text-2xl">158</span>
                        <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Happy Clients</span>
                      </div>
                    </div>
                  </div>
                  {/* Floating UI Element */}
                  <div className="absolute -right-8 top-1/2 bg-white rounded-xl p-4 shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce" style={{animationDuration: '3s'}}>
                    <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-md">Book a call</div>
                    <span className="text-gray-900 font-bold text-sm">Chat</span>
                  </div>
                </div>

                {/* Founder 2 */}
                <div className={`absolute inset-0 bg-gradient-to-b from-slate-700 to-slate-900 rounded-3xl p-6 flex flex-col justify-end shadow-2xl founder-card ${activeFounder === 1 ? 'founder-active' : 'founder-inactive'}`}>
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="Elena Rostova" className="absolute inset-0 w-full h-full object-cover rounded-3xl mix-blend-overlay opacity-60" />
                  <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-gray-900 font-bold text-xl flex items-center gap-2">Elena Rostova <CheckCircle size={16} className="text-blue-500"/></h4>
                        <p className="text-gray-500 text-sm">Chief Technology Officer</p>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-4">
                      <div className="text-center">
                        <span className="block text-gray-900 font-black text-2xl">210+</span>
                        <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Deployments</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-gray-900 font-black text-2xl">Zero</span>
                        <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Downtime</span>
                      </div>
                    </div>
                  </div>
                   {/* Floating UI Element */}
                   <div className="absolute -left-12 top-1/3 bg-white rounded-xl p-4 shadow-xl border border-gray-100 w-48 animate-bounce" style={{animationDuration: '4s'}}>
                    <p className="text-gray-400 text-xs font-bold mb-2">System Health</p>
                    <div className="flex items-end gap-1 h-12">
                      {[30,50,40,70,90,60,80].map((h,i)=>( <div key={i} className="flex-1 bg-green-200 rounded-t-sm" style={{height: `${h}%`}}></div> ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Section 6: Expertise Grid */}
          <section className="w-full py-24 md:py-32 bg-white px-[3vw]">
            <div className="w-full max-w-[1600px] mx-auto">
              <div className="mb-16 md:mb-24 reveal">
                <p className="text-orange-500 font-mono text-xs font-semibold tracking-[0.2em] uppercase mb-4">Core Competencies</p>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">ENTERPRISE SOLUTIONS</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="group p-8 md:p-12 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-[0_20px_60px_rgba(249,115,22,0.08)] transition-all duration-500 reveal">
                  <Cloud size={36} className="text-orange-500 mb-8 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Cloud Computing</h3>
                  <p className="text-gray-600 font-light leading-relaxed">Seamlessly migrate, manage, and optimize your workloads across AWS, Azure, and Google Cloud with auto-scaling architectures designed for high availability.</p>
                </div>
                <div className="group p-8 md:p-12 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-[0_20px_60px_rgba(249,115,22,0.08)] transition-all duration-500 reveal reveal-delay-1">
                  <Shield size={36} className="text-orange-500 mb-8 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Zero-Trust Security</h3>
                  <p className="text-gray-600 font-light leading-relaxed">Implement zero-trust protocols, real-time threat hunting, and automated incident response to lock down your digital perimeter against modern AI-driven attacks.</p>
                </div>
                <div className="group p-8 md:p-12 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-[0_20px_60px_rgba(249,115,22,0.08)] transition-all duration-500 reveal reveal-delay-2">
                  <Network size={36} className="text-orange-500 mb-8 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Infrastructure Management</h3>
                  <p className="text-gray-600 font-light leading-relaxed">Design and deploy high-availability on-premise and hybrid data centers built for maximum throughput, edge computing, and zero operational downtime.</p>
                </div>
                <div className="group p-8 md:p-12 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-[0_20px_60px_rgba(249,115,22,0.08)] transition-all duration-500 reveal reveal-delay-3">
                  <Database size={36} className="text-orange-500 mb-8 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Architecture & AIO</h3>
                  <p className="text-gray-600 font-light leading-relaxed">Structure your enterprise data lakes to be readily consumed by Large Language Models, optimizing your business for Generative Engine Optimization (GEO).</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: GEO/AIO Framework */}
          <section className="w-full py-32 bg-[#0a0a0a] px-[3vw] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
            <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
              <div className="w-full lg:w-1/2 reveal">
                <p className="text-orange-500 font-mono text-xs font-semibold tracking-[0.2em] uppercase mb-4">Next-Gen Search Ready</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-8 leading-tight">ENGINEERED FOR <br/>AI SEARCH ENGINES.</h2>
                <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                  The future of discovery is AI. We architect your digital presence and backend data structures using strict Schema.org protocols, ensuring high entity salience for Large Language Models (LLMs). Your business won't just be found; it will be understood and recommended by AI.
                </p>
                <ul className="flex flex-col gap-4 text-gray-300 font-medium">
                  <li className="flex items-center gap-3"><CheckCircle size={20} className="text-orange-500"/> Semantic Data Structuring</li>
                  <li className="flex items-center gap-3"><CheckCircle size={20} className="text-orange-500"/> Generative Engine Optimization (GEO)</li>
                  <li className="flex items-center gap-3"><CheckCircle size={20} className="text-orange-500"/> Knowledge Graph Integration</li>
                </ul>
              </div>
              <div className="w-full lg:w-1/2 relative h-[500px] border border-white/10 rounded-[3rem] bg-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center reveal reveal-delay-1">
                {/* Tech Radar Animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[100%] h-[100%] border border-white/5 rounded-full absolute animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                  <div className="w-[75%] h-[75%] border border-orange-500/20 rounded-full absolute"></div>
                  <div className="w-[50%] h-[50%] border border-white/10 rounded-full absolute"></div>
                  <div className="w-[25%] h-[25%] bg-orange-500/20 blur-xl rounded-full absolute"></div>
                  <Lock size={48} className="text-orange-500 relative z-10 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
                  
                  {/* Floating Nodes */}
                  <div className="absolute top-1/4 left-1/4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-mono text-orange-300">Schema.org</div>
                  <div className="absolute bottom-1/4 right-1/4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-mono text-white">Entity Recognition</div>
                  <div className="absolute top-1/3 right-1/5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-mono text-gray-300">JSON-LD</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Global Scale / Testimonial */}
          <section className="w-full py-32 bg-gray-50 px-[3vw] flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-[1600px] mx-auto reveal">
              <Globe className="w-16 h-16 text-orange-200 mx-auto mb-10" strokeWidth={1} />
              <h3 className="text-3xl md:text-5xl font-medium text-gray-900 leading-snug mb-10 max-w-5xl mx-auto tracking-tight">
                "Technimation didn't just upgrade our servers; they completely re-engineered our operational capacity. Their zero-trust cloud architecture allowed us to scale 400% YoY without a single critical outage."
              </h3>
              <p className="text-gray-900 font-bold uppercase tracking-widest text-sm">CTO, Global FinTech Enterprise</p>
            </div>
          </section>

          {/* Section 9: Epic Final CTA */}
          <section className="w-full py-32 bg-white px-[3vw] relative">
            <div className="w-full max-w-[1600px] mx-auto bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-12 md:p-24 text-center border border-gray-800 shadow-2xl relative overflow-hidden reveal">
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-600/30 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
              
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 relative z-10">
                READY TO REBUILD YOUR <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">INFRASTRUCTURE?</span>
              </h2>
              <p className="text-gray-400 text-xl mb-12 max-w-3xl mx-auto relative z-10 font-light">
                Stop letting legacy technology hold your business back. Schedule a deep-dive technical consultation with our engineering architects today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                <button className="bg-orange-500 hover:bg-orange-400 text-black font-black text-sm tracking-widest uppercase px-12 py-5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]">
                  Start Your Assessment
                </button>
                <button className="bg-white/5 border border-white/10 hover:border-white/30 text-white font-bold text-sm tracking-widest uppercase px-12 py-5 rounded-xl transition-all duration-300 backdrop-blur-md">
                  Contact Sales
                </button>
              </div>
            </div>
          </section>

          {/* Edge-to-Edge Footer */}
          <footer className="w-full py-12 bg-black border-t border-white/10 px-[1vw] flex flex-col md:flex-row items-center justify-between z-20 relative">
            <div className="pl-4 flex items-center mb-6 md:mb-0">
              <img src={logoSrc} alt="Technimation Logo" className="h-8 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
            </div>
            <div className="flex gap-8 pr-4">
              <a href="#" className="text-gray-500 hover:text-orange-500 text-xs font-bold uppercase tracking-widest transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-orange-500 text-xs font-bold uppercase tracking-widest transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-orange-500 text-xs font-bold uppercase tracking-widest transition-colors">LinkedIn</a>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}
