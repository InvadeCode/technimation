import React, { useEffect, useRef, useState } from 'react';
import { 
  Menu, X, ChevronDown, Shield, Cloud, Server, Cpu, CheckCircle, 
  Users, TrendingUp, Target, BarChart, Globe, Zap, Network, Lock, ArrowRight
} from 'lucide-react';

export default function App() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const aboutRef = useRef(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeFounder, setActiveFounder] = useState(0);

  const logoSrc = "https://static.wixstatic.com/media/548938_573f491cecff47b39b0e8cfb59295785~mv2.png";
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { 
      name: 'Solutions', 
      submenu: [
        { name: 'Enterprise IT', href: '#enterprise' },
        { name: 'Cloud Migration', href: '#cloud' },
        { name: 'Cybersecurity', href: '#security' }
      ] 
    },
    { name: 'Contact Us', href: '#contact' }
  ];

  const toggleSubmenu = (name) => {
    setExpandedMenu(expandedMenu === name ? null : name);
  };

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      const unmountTimer = setTimeout(() => setShowPreloader(false), 1000);
      return () => clearTimeout(unmountTimer);
    }, 2800);
    return () => clearTimeout(loadTimer);
  }, []);

  // Founder Auto-Swap
  useEffect(() => {
    const founderTimer = setInterval(() => {
      setActiveFounder((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(founderTimer);
  }, []);

  // HLS Video Setup
  useEffect(() => {
    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    current.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const videoSrc = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Hls && window.Hls.isSupported()) {
        const hls = new window.Hls({ enableWorker: false });
        hls.loadSource(videoSrc);
        if(videoRef.current) hls.attachMedia(videoRef.current);
      } else if (videoRef.current && videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videoSrc;
      }
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Hero Mouse Tracking Animation
  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.03;
      current.current.y += (target.current.y - current.current.y) * 0.03;
      
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${current.current.x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${current.current.y}px`);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleHeroMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    target.current.x = e.clientX - rect.left;
    target.current.y = e.clientY - rect.top;
  };

  // About Section Spotlight Effect
  const handleAboutMouseMove = (e) => {
    if (!aboutRef.current) return;
    const rect = aboutRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    aboutRef.current.style.setProperty('--spot-x', `${x}px`);
    aboutRef.current.style.setProperty('--spot-y', `${y}px`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap');
        
        .font-poppins { font-family: 'Poppins', sans-serif; }

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
        .animate-marquee:hover {
          animation-play-state: paused;
        }

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
        
        .spotlight-overlay {
          background: radial-gradient(800px circle at var(--spot-x) var(--spot-y), rgba(249, 115, 22, 0.04), transparent 40%);
        }
        
        .blur-out { filter: blur(20px); transform: scale(1.05); opacity: 0; }
        .blur-in { filter: blur(0px); transform: scale(1); opacity: 1; }
      `}</style>

      {/* Preloader */}
      {showPreloader && (
        <div className={`fixed inset-0 z-[100] bg-[#070b0a] flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoading ? 'opacity-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
          <div className="relative w-64 h-24 md:w-80 md:h-32">
            <div className="absolute inset-0 animate-[logo-pulse_2.8s_cubic-bezier(0.22,1,0.36,1)_forwards]">
              <img src={logoSrc} className="absolute inset-0 w-full h-full object-contain opacity-20" alt="Base Logo" />
              <div 
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-500 animate-[mask-wipe_2s_cubic-bezier(0.85,0,0.15,1)_forwards]"
                style={{
                  WebkitMaskImage: `url(${logoSrc})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-[#070b0a] min-h-screen font-poppins selection:bg-orange-500 selection:text-white overflow-x-hidden">
        
        {}
        <section ref={containerRef} onMouseMove={handleHeroMouseMove} className="fixed top-0 left-0 w-full h-screen overflow-hidden z-0">
          {/* Header */}
          <header className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 z-[50] w-[95%] max-w-[1400px] flex items-center justify-between pl-8 pr-6 py-4 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-1000 delay-500 hover:border-white/10">
            <a href="#" className="flex items-center z-[50]">
              <img src={logoSrc} alt="Technimation Logo" className="h-10 md:h-12 w-auto object-contain drop-shadow-md transition-transform duration-500 hover:scale-105" />
            </a>
            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-white/70 hover:text-orange-400 transition-colors duration-300 focus:outline-none z-[50]">
              <Menu size={32} strokeWidth={1.5} />
            </button>
          </header>

          {/* Full Screen Menu */}
          <div className={`fixed inset-0 bg-[#070b0a]/80 backdrop-blur-md z-[60] transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />
          <div className={`fixed top-0 right-0 h-full w-full max-w-[500px] bg-[#0a0a0a]/95 backdrop-blur-3xl border-l border-white/5 z-[70] flex flex-col p-8 md:p-12 transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-end w-full mb-12">
              <button onClick={() => { setIsMenuOpen(false); setTimeout(() => setExpandedMenu(null), 500); }} className="p-2 text-white/70 hover:text-orange-400 transition-transform duration-500 hover:rotate-90 focus:outline-none">
                <X size={36} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col gap-6 w-full overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
              {menuItems.map((item, index) => (
                <div key={item.name} className={`flex flex-col transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`} style={{ transitionDelay: `${isMenuOpen ? 150 + (index * 80) : 0}ms` }}>
                  {item.submenu ? (
                    <button onClick={() => toggleSubmenu(item.name)} className="group relative flex items-center gap-4 text-5xl font-black uppercase tracking-tighter w-fit text-left focus:outline-none py-1">
                      <div className="relative">
                        <span className={`block transition-all duration-500 ${expandedMenu === item.name ? 'text-transparent' : 'text-transparent group-hover:text-orange-500'}`} style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>{item.name}</span>
                        <span className={`absolute inset-0 text-orange-500 transition-all duration-500 ease-out pointer-events-none ${expandedMenu === item.name ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100'}`}>{item.name}</span>
                      </div>
                      <ChevronDown className={`transition-all duration-500 ${expandedMenu === item.name ? 'rotate-180 text-orange-500' : 'text-white/30 group-hover:text-orange-500'}`} size={32} strokeWidth={3} />
                    </button>
                  ) : (
                    <a href={item.href} onClick={() => setIsMenuOpen(false)} className="group relative text-5xl font-black uppercase tracking-tighter block w-fit py-1">
                      <span className="block text-transparent transition-all duration-500 group-hover:text-orange-500" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>{item.name}</span>
                      <span className="absolute inset-0 text-orange-500 opacity-0 transform translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none">{item.name}</span>
                    </a>
                  )}
                  {item.submenu && (
                    <div className={`flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${expandedMenu === item.name ? 'max-h-[300px] opacity-100 mt-6 mb-4' : 'max-h-0 opacity-0 mt-0 mb-0'}`}>
                      {item.submenu.map((subItem) => (
                        <a key={subItem.name} href={subItem.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-light text-white/50 hover:text-orange-400 transition-colors duration-300 ml-4 tracking-wide">{subItem.name}</a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className={`mt-auto flex flex-col gap-8 transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: `${isMenuOpen ? 600 : 0}ms` }}>
              <div className="flex flex-col ml-1 border-l border-orange-500 pl-4 py-1">
                <p className="text-orange-500 font-semibold text-sm italic max-w-[250px] mb-6">"Empowering the next generation of digital architects."</p>
                <div className="flex flex-col gap-1 text-xs text-white/40 font-light tracking-wider mt-1">
                  <p>123 Innovation Drive, Suite 400</p>
                  <p>San Francisco, CA 94105</p>
                  <a href="tel:+15551234567" className="hover:text-orange-400 transition-colors mt-1 inline-block w-fit">+1 (555) 123-4567</a>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-20 md:bottom-28 left-6 md:left-12 lg:left-[5%] xl:left-[8%] z-[10] flex flex-col items-start w-full max-w-[90%] md:max-w-3xl text-left pointer-events-auto">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(249,115,22,0.1)] w-fit">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-400 font-mono text-xs font-semibold tracking-[0.2em] uppercase">Enterprise IT Consulting</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black text-white leading-[1.05] tracking-tighter mb-6 drop-shadow-2xl">
              ENGINEER YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">DIGITAL</span> FUTURE.
            </h1>
            <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-[500px] mb-10 drop-shadow-md">
              Technimation specializes in comprehensive Enterprise IT Consulting, Cloud Computing, advanced Cybersecurity, and robust IT Infrastructure Management to drive B2B scale and transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
               <button className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-yellow-400 to-orange-600 animate-gradient-flow text-[#070b0a] font-black text-xs md:text-sm tracking-wider uppercase px-8 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:-translate-y-1">
                Explore Solutions
              </button>
              <button className="bg-black/30 border border-white/10 hover:border-white/30 text-white hover:text-white font-bold text-xs md:text-sm tracking-wider uppercase px-8 py-3.5 rounded-xl transition-all duration-300 backdrop-blur-md">
                Schedule Consultation
              </button>
            </div>
          </div>

          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-60 z-0" style={{ filter: 'sepia(1) hue-rotate(-15deg) saturate(3.5) contrast(1.1)' }} autoPlay loop muted playsInline />
          <div className="absolute inset-0 z-[2] pointer-events-none transition-opacity duration-500" style={{ background: `radial-gradient(circle 1200px at var(--mouse-x) var(--mouse-y), rgba(7, 11, 10, 0) 10%, rgba(7, 11, 10, 0.4) 50%, rgba(7, 11, 10, 0.95) 100%)` }} />
          <div className="absolute inset-0 z-[3] pointer-events-none mix-blend-screen opacity-50" style={{ background: `radial-gradient(circle 800px at var(--mouse-x) var(--mouse-y), rgba(249, 115, 22, 0.08) 0%, rgba(234, 88, 12, 0.03) 40%, transparent 70%)` }} />
        </section>

        <div className="relative z-10 w-full mt-[100vh]">
          {}
          <section className="relative w-full py-6 md:py-8 bg-[#f8f9fa] overflow-hidden flex flex-col items-center justify-center z-20 rounded-t-[24px] shadow-[0_-15px_40px_rgba(0,0,0,0.3)]">
            <div className="relative w-full flex items-center">
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none" />
            <div className="animate-marquee flex items-center gap-16 md:gap-24 px-8">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {['VMware', 'Dell Technologies', 'Microsoft', 'Cisco', 'AWS', 'Oracle', 'IBM', 'Palo Alto Networks'].map((partner, index) => (
                    <div key={`${i}-${index}`} className="text-gray-300 hover:text-orange-500 transition-colors duration-500 text-sm md:text-base font-black uppercase tracking-[0.3em] whitespace-nowrap cursor-default">
                      {partner}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {}
        <section ref={aboutRef} onMouseMove={handleAboutMouseMove} className="w-full py-24 md:py-32 bg-[#f8f9fa] px-6 md:px-12 lg:px-[8%] relative z-10 overflow-hidden">
          <div className="absolute inset-0 spotlight-overlay pointer-events-none z-0" />
          
          <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
            {/* Left Column: Fixed Eyebrow */}
            <div className="lg:col-span-3 reveal">
              <div className="flex items-center gap-3 mt-2">
                <span className="w-2 h-2 rounded-full bg-slate-800" />
                <span className="group relative font-normal text-slate-700 tracking-wide text-sm md:text-base cursor-default uppercase">
                  ABOUT
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </div>
            </div>
            
            {/* Right Column: Refined Lead Text & Metrics */}
            <div className="lg:col-span-9 flex flex-col gap-14 md:gap-20 reveal reveal-delay-1">
              <p className="text-[#1e293b] text-xl md:text-2xl lg:text-[28px] font-normal leading-[1.5] tracking-tight max-w-[95%]">
                Technimation is a premier global IT Consulting firm. With over a decade of enterprise experience, we deliver tailored architectural data solutions that empower B2B SaaS and enterprise businesses to scale securely. Our elite engineering team provides strategic GEO and AIO insights to ensure success through robust infrastructure management.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 w-full reveal reveal-delay-2">
                {/* Metric 1 */}
                <div className="flex flex-col pr-4 lg:pr-8 border-r border-slate-200">
                  <span className="text-5xl lg:text-[56px] font-normal text-[#0f172a] mb-4 tracking-tighter leading-none">99.99%</span>
                  <span className="text-slate-500 text-sm md:text-base leading-snug w-full max-w-[240px]">Guaranteed enterprise infrastructure uptime.</span>
                </div>
                
                {/* Metric 2 */}
                <div className="flex flex-col pl-6 lg:px-8 lg:border-r border-slate-200">
                  <span className="text-5xl lg:text-[56px] font-normal text-[#0f172a] mb-4 tracking-tighter leading-none">250+</span>
                  <span className="text-slate-500 text-sm md:text-base leading-snug w-full max-w-[240px]">Successful cloud migrations globally.</span>
                </div>
                
                {/* Metric 3 */}
                <div className="flex flex-col pr-4 lg:px-8 border-r border-slate-200">
                  <span className="text-5xl lg:text-[56px] font-normal text-[#0f172a] mb-4 tracking-tighter leading-none">$50M+</span>
                  <span className="text-slate-500 text-sm md:text-base leading-snug w-full max-w-[240px]">Client IT expenditure optimized.</span>
                </div>
                
                {/* Metric 4 */}
                <div className="flex flex-col pl-6 lg:pl-8">
                  <span className="text-5xl lg:text-[56px] font-normal text-[#0f172a] mb-4 tracking-tighter leading-none">0</span>
                  <span className="text-slate-500 text-sm md:text-base leading-snug w-full max-w-[240px]">Unmitigated critical security breaches.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="w-full py-24 md:py-32 bg-white border-t border-gray-100 px-6 md:px-12 lg:px-[8%] relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            
            <div className="reveal mb-16 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] tracking-tighter mb-6">
                The Proven Choice For <br /> B2B Enterprise Growth
              </h2>
              <p className="text-gray-500 text-lg font-light">Seamlessly adjust and grow your business with our versatile IT infrastructure, purpose-built to fuel, secure, and sustain your digital expansion.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
              {/* Funnel Card */}
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col items-center justify-between text-center group hover:border-orange-500/30 transition-all duration-500 reveal">
                <div className="w-full flex flex-col items-center gap-2 mb-8 h-[140px] justify-end relative">
                   <div className="w-48 h-8 bg-gray-200 rounded-t-xl group-hover:bg-orange-100 transition-colors flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">50k Data Streams</div>
                   <div className="w-32 h-8 bg-gray-300 rounded-sm group-hover:bg-orange-200 transition-colors flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">20k Processed</div>
                   <div className="w-16 h-8 bg-gray-400 rounded-sm group-hover:bg-orange-300 transition-colors flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-widest">5k Saved</div>
                   <div className="w-4 h-4 bg-gray-800 rounded-full group-hover:bg-orange-500 transition-colors mt-2 shadow-lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Reach Optimal Scale</h3>
                <p className="text-sm text-gray-500">We align your tech stack to attract and sustain right-fit enterprise clients globally.</p>
              </div>

               {/* Metrics Card */}
               <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col items-center justify-between text-center group hover:border-orange-500/30 transition-all duration-500 reveal reveal-delay-1">
                <div className="w-full flex flex-col items-center justify-center gap-4 mb-8 h-[140px]">
                   <div className="w-full bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex items-center justify-between">
                     <span className="text-2xl font-black text-gray-900">$12M+</span>
                     <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full flex items-center"><TrendingUp size={12} className="mr-1"/> 3.2%</span>
                   </div>
                   <div className="w-full bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex flex-col items-start text-left">
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Users size={12}/> Active Nodes</span>
                     <div className="flex items-center justify-between w-full">
                       <span className="text-2xl font-black text-gray-900">14.2K</span>
                       <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full flex items-center"><TrendingUp size={12} className="mr-1"/> 64%</span>
                     </div>
                   </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Unmatched Uptime Offer</h3>
                <p className="text-sm text-gray-500">We optimize computing power to convert latency constraints into seamless user experiences.</p>
              </div>

              {/* Bar Chart Card */}
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col items-center justify-between text-center group hover:border-orange-500/30 transition-all duration-500 reveal reveal-delay-2">
                <div className="w-full flex items-end justify-center gap-3 mb-8 h-[140px] px-4">
                  {[40, 60, 45, 80, 100, 50].map((h, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className={`w-8 rounded-t-lg transition-all duration-700 ease-out ${i === 4 ? 'bg-orange-500 group-hover:h-full' : 'bg-gray-200 group-hover:bg-gray-300'}`} style={{ height: `${h}%` }} />
                      <span className="text-[9px] font-bold text-gray-400 uppercase">{['Dec','Jan','Feb','Mar','Apr','May'][i]}</span>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Scale Sustainably</h3>
                <p className="text-sm text-gray-500">Reallocate wasted server spend to attract high LTV SaaS customers at a fraction of the cost.</p>
              </div>
            </div>

            <button className="bg-gray-900 hover:bg-orange-500 text-white font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-orange-500/30 reveal">
              Start Free Architecture Plan <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {}
        <section className="w-full py-24 md:py-32 bg-[#0a0f12] px-6 md:px-12 lg:px-[8%] relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="flex flex-col gap-6 reveal">
              <p className="text-orange-500 font-mono text-xs font-semibold tracking-[0.2em] uppercase">Executive Leadership</p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-tight">
                Insightful Strategies, <br /> Solutions that Inspire!
              </h2>
              <p className="text-white/60 font-light leading-relaxed mb-8 max-w-md">
                Meet the architects behind Technimation. Our directors leverage decades of enterprise IT consulting to seamlessly grow your business with versatile, secure infrastructure built for tomorrow.
              </p>
              
              <div className="flex items-center gap-8 mb-8">
                <div className="flex flex-col">
                   <span className="text-3xl font-black text-white">97%</span>
                   <span className="text-xs text-white/50 uppercase tracking-widest mt-1">Client Satisfaction</span>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="flex flex-col">
                   <span className="text-3xl font-black text-white">25m</span>
                   <span className="text-xs text-white/50 uppercase tracking-widest mt-1">End Users Secured</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveFounder(0)} 
                  className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${activeFounder === 0 ? 'bg-orange-500 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                >
                  CEO
                </button>
                <button 
                  onClick={() => setActiveFounder(1)} 
                  className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${activeFounder === 1 ? 'bg-orange-500 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                >
                  CTO
                </button>
              </div>
            </div>

            <div className="relative aspect-[3/4] md:aspect-square lg:aspect-[4/5] w-full max-w-md mx-auto reveal reveal-delay-1">
              
              {/* Founder 1 */}
              <div className={`absolute inset-0 bg-[#162025] rounded-3xl p-2 border border-white/10 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeFounder === 0 ? 'blur-in z-10' : 'blur-out pointer-events-none z-0'}`}>
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" alt="CEO" className="w-full h-full object-cover rounded-[20px] opacity-80 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f12] via-transparent to-transparent rounded-[20px]" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-bold text-lg">Simon Holdings</h4>
                    <p className="text-white/60 text-xs tracking-wider">Chief Executive Officer</p>
                  </div>
                  <div className="flex gap-4 text-center">
                     <div>
                       <span className="block text-white font-black">170</span>
                       <span className="text-[9px] text-white/50 uppercase tracking-widest">Consultations</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* Founder 2 */}
              <div className={`absolute inset-0 bg-[#162025] rounded-3xl p-2 border border-white/10 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeFounder === 1 ? 'blur-in z-10' : 'blur-out pointer-events-none z-0'}`}>
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="CTO" className="w-full h-full object-cover rounded-[20px] opacity-80 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f12] via-transparent to-transparent rounded-[20px]" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-bold text-lg">Elena Rostova</h4>
                    <p className="text-white/60 text-xs tracking-wider">Chief Technology Officer</p>
                  </div>
                  <div className="flex gap-4 text-center">
                     <div>
                       <span className="block text-white font-black">250+</span>
                       <span className="text-[9px] text-white/50 uppercase tracking-widest">Deployments</span>
                     </div>
                  </div>
                </div>
              </div>
              
              {/* Floating UI Element */}
              <div className="absolute -top-6 -right-6 md:-right-12 bg-white rounded-xl shadow-2xl p-4 flex flex-col gap-2 z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                 <div className="flex items-center gap-2 mb-2">
                   <Target size={14} className="text-orange-500"/>
                   <span className="text-[10px] font-bold uppercase text-gray-800 tracking-wider">KPI Hit</span>
                 </div>
                 <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                   <div className="w-[85%] h-full bg-green-500 rounded-full" />
                 </div>
              </div>

            </div>
          </div>
        </section>

        {}
        <section className="w-full py-24 md:py-32 bg-white px-6 md:px-12 lg:px-[8%] relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:mb-24 reveal text-center max-w-3xl mx-auto">
              <p className="text-orange-500 font-mono text-xs font-semibold tracking-[0.2em] uppercase mb-4">Core Competencies</p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">ENTERPRISE SOLUTIONS</h2>
              <p className="text-gray-500 font-light">As a specialized IT Consulting firm, Technimation engineers robust architectures optimized for search, security, and global scale.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="group p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(249,115,22,0.1)] transition-all duration-500 hover:-translate-y-2 reveal cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                  <Cloud size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Cloud Computing & Migration</h3>
                <p className="text-gray-500 font-light leading-relaxed">Seamlessly migrate, manage, and optimize enterprise workloads across AWS, Azure, and Google Cloud with auto-scaling, high-availability architectures.</p>
              </div>

              <div className="group p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(249,115,22,0.1)] transition-all duration-500 hover:-translate-y-2 reveal reveal-delay-1 cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                  <Shield size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Zero-Trust Cybersecurity</h3>
                <p className="text-gray-500 font-light leading-relaxed">Implement advanced zero-trust protocols, real-time threat hunting, and automated incident response to permanently lock down your digital perimeter.</p>
              </div>

              <div className="group p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(249,115,22,0.1)] transition-all duration-500 hover:-translate-y-2 reveal reveal-delay-2 cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                  <Server size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">IT Infrastructure Management</h3>
                <p className="text-gray-500 font-light leading-relaxed">Design and deploy resilient on-premise and hybrid data centers built for maximum throughput, low latency, and guaranteed zero downtime.</p>
              </div>

              <div className="group p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(249,115,22,0.1)] transition-all duration-500 hover:-translate-y-2 reveal reveal-delay-3 cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                  <Cpu size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Strategic IT Consulting</h3>
                <p className="text-gray-500 font-light leading-relaxed">Align your complex IT roadmap with executive business goals through comprehensive audits, risk assessments, and targeted modernization planning.</p>
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="w-full py-24 md:py-32 bg-[#f8f9fa] border-y border-gray-200 px-6 md:px-12 lg:px-[8%] relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="w-full lg:w-1/2 flex flex-col gap-6 reveal">
              <p className="text-orange-500 font-mono text-xs font-semibold tracking-[0.2em] uppercase">Future-Proofed Data</p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter mb-2">THE AIO & GEO FRAMEWORK</h2>
              <p className="text-gray-600 font-medium text-lg leading-relaxed">
                Technimation is fully optimized for Artificial Intelligence Optimization (AIO) and Generative Engine Optimization (GEO).
              </p>
              <p className="text-gray-500 font-light leading-relaxed mb-4">
                We construct semantic data pipelines and entity-rich knowledge graphs. This ensures your enterprise infrastructure is not just fast and secure, but perfectly readable by LLMs, AI agents, and next-generation search engines. When AI looks for top-tier IT Consulting, it finds the structures we build.
              </p>
              <ul className="space-y-3">
                {['Semantic Entity Structuring', 'LLM-Ready Data Architecture', 'Knowledge Graph Integration'].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-semibold text-gray-800">
                     <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-500"><Zap size={12} /></div>
                     {item}
                   </li>
                ))}
              </ul>
            </div>

            <div className="w-full lg:w-1/2 h-[400px] relative flex items-center justify-center reveal reveal-delay-2">
               {/* Central Node */}
               <div className="absolute w-24 h-24 bg-white rounded-full shadow-2xl z-20 flex items-center justify-center border-4 border-orange-500 animate-pulse">
                 <Network size={32} className="text-orange-500" />
               </div>
               {/* Orbiting Nodes (CSS managed positions for simplicity) */}
               <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                  <div className="absolute top-[10%] left-[40%] w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400">
                    <Cloud size={16} />
                  </div>
                  <div className="absolute bottom-[20%] right-[20%] w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400">
                    <Lock size={16} />
                  </div>
                  <div className="absolute top-[40%] left-[10%] w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400">
                    <DatabaseIcon />
                  </div>
               </div>
               {/* Rings */}
               <div className="absolute w-[250px] h-[250px] border border-orange-500/20 rounded-full" />
               <div className="absolute w-[350px] h-[350px] border border-orange-500/10 rounded-full border-dashed animate-[spin_30s_linear_infinite_reverse]" />
            </div>

          </div>
        </section>

        {}
        <section className="w-full py-32 bg-white px-6 md:px-12 lg:px-[8%] relative z-10 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Background Map Element */}
          <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
             <Globe size={800} strokeWidth={0.5} />
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10 reveal">
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center mx-auto mb-10 shadow-lg shadow-orange-500/30 transform rotate-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
             </div>
            <h3 className="text-2xl md:text-4xl font-medium text-gray-900 leading-[1.4] mb-10 tracking-tight">
              "Technimation didn't just upgrade our legacy servers; they completely re-engineered our operational capacity. Their cloud architecture and IT consulting allowed us to scale globally at 400% YoY without a single critical outage."
            </h3>
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-900 font-bold uppercase tracking-widest text-sm">CTO, Global FinTech Enterprise</span>
              <span className="text-orange-500 text-xs font-semibold tracking-wider uppercase">London, UK</span>
            </div>
          </div>
        </section>

        {}
        <section className="w-full py-32 bg-[#070b0a] px-6 md:px-12 lg:px-[8%] relative z-10">
          <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 60%)` }} />
          
          <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-2xl rounded-[40px] p-10 md:p-20 text-center border border-white/10 shadow-2xl relative overflow-hidden reveal">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
            
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 relative z-10">
              READY TO REBUILD YOUR <br className="hidden md:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 animate-gradient-flow">INFRASTRUCTURE?</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto relative z-10 font-light">
              Stop letting legacy technology hold your enterprise back. Schedule a deep-dive technical consultation with Technimation's engineering architects today to secure your digital future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-yellow-400 to-orange-600 animate-gradient-flow text-[#070b0a] font-black text-sm tracking-wider uppercase px-10 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:-translate-y-1">
                Start Your Assessment
              </button>
              <button className="bg-transparent border border-white/20 hover:border-orange-500 hover:text-orange-400 text-white font-bold text-sm tracking-wider uppercase px-10 py-4 rounded-xl transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        </div>
      </div>
    </>
  );
}

// Helper icon for the tech radar
function DatabaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
      <path d="M3 12A9 3 0 0 0 21 12"></path>
    </svg>
  );
}
