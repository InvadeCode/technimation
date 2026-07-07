import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown, Activity, Cloud, Shield, Server, Cpu, MapPin, Zap, BarChart, Database, Network, ArrowRight, Users, CheckCircle2, Building, BookOpen, FileText, PieChart, LineChart, Globe, Lock, PlayCircle, LayoutGrid, Terminal, Briefcase, TrendingUp, Settings } from 'lucide-react';

const PageHeader = ({ subtitle, title, description, children }) => (
  <div className="w-full pt-24 pb-16 px-[3vw] bg-[#050706] relative z-10 flex flex-col items-center">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
    <div className="w-full max-w-[1000px] mx-auto relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
      <p className="text-orange-500 text-[9px] font-bold tracking-[0.2em] uppercase mb-2">{subtitle}</p>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">{title}</h1>
      <p className="text-slate-400 text-xs md:text-sm max-w-2xl font-light leading-relaxed mb-8">
        {description}
      </p>
      {children}
    </div>
  </div>
);

const CareersPage = () => (
  <>
    <PageHeader 
      subtitle="Careers at Technimation"
      title="Join the Elite Engineering Unit."
      description="We are always looking for visionary architects, cybersecurity experts, and cloud engineers to help us build the resilient infrastructure of tomorrow."
    />
    <div className="w-full pb-20 px-[3vw] bg-[#050706] relative z-10 flex flex-col items-center">
      <div className="w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { title: "Senior Zero-Trust Architect", loc: "Pune / Remote", type: "Full-Time", dept: "Cybersecurity" },
          { title: "Lead Cloud Infrastructure Engineer", loc: "Pune, India", type: "Full-Time", dept: "Cloud Scaling" },
          { title: "AIOps Machine Learning Specialist", loc: "Pune, India", type: "Full-Time", dept: "Automation" },
          { title: "Enterprise Solutions Consultant", loc: "Pune, India", type: "Full-Time", dept: "Strategy" },
          { title: "Edge Node Deployment Manager", loc: "Pune, India", type: "Full-Time", dept: "Global Infra" },
          { title: "VP of Enterprise Sales", loc: "Pune / Remote", type: "Full-Time", dept: "Sales" }
        ].map((job, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-orange-500/40 transition-all duration-300 group cursor-pointer shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-bl-full group-hover:bg-orange-500/10 transition-colors" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="text-[9px] text-orange-400 font-bold uppercase tracking-widest bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">{job.dept}</span>
              <ArrowRight size={14} className="text-slate-500 group-hover:text-orange-400 group-hover:-rotate-45 transition-all" />
            </div>
            <h3 className="text-sm md:text-base font-bold text-white mb-1.5 group-hover:text-orange-100 transition-colors relative z-10">{job.title}</h3>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium mt-4 relative z-10">
              <span className="flex items-center gap-1"><MapPin size={12} className="text-orange-500"/> {job.loc}</span>
              <span className="flex items-center gap-1"><Briefcase size={12} className="text-slate-500"/> {job.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

const InvestorsPage = () => (
  <>
    <div className="w-full pt-24 pb-10 px-[3vw] bg-[#050706] relative z-10 flex flex-col items-center">
      <div className="w-full max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8">
        <div className="w-full md:w-2/3">
          <p className="text-orange-500 text-[9px] font-bold tracking-[0.2em] uppercase mb-2">Investor Relations</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">Financial Overview</h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-xl font-light leading-relaxed">
            Transparent, resilient growth. Technimation InfoMedia continues to outpace the market in enterprise infrastructure optimization.
          </p>
        </div>
        <div className="w-full md:w-auto bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between md:justify-start gap-5 min-w-[200px] shadow-2xl backdrop-blur-md">
          <div>
             <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-0.5 font-bold">NSE: TECHINFO</p>
             <p className="text-2xl font-bold text-white tracking-tight">₹1,428.00</p>
          </div>
          <div className="text-emerald-400 flex items-center gap-1 font-bold text-xs bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20">
             <TrendingUp size={14} /> +4.2%
          </div>
        </div>
      </div>
    </div>
    
    <div className="w-full pb-20 px-[3vw] bg-[#050706] relative z-10 flex flex-col items-center">
      <div className="w-full max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/30 rounded-xl p-6 shadow-[0_10px_30px_rgba(249,115,22,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity"><BarChart size={32} className="text-orange-500"/></div>
            <p className="text-[9px] text-orange-400 uppercase tracking-widest mb-1.5 font-bold relative z-10">FY26 Q3 Revenue</p>
            <p className="text-3xl font-bold text-white mb-1.5 tracking-tight relative z-10">₹41.2Cr</p>
            <p className="text-[10px] text-slate-300 font-medium relative z-10 flex items-center gap-1"><ArrowRight size={10} className="text-emerald-400"/> +28% Year-over-Year</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity"><PieChart size={32} className="text-emerald-500"/></div>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold relative z-10">Gross Margin</p>
            <p className="text-3xl font-bold text-white mb-1.5 tracking-tight relative z-10">74.2%</p>
            <p className="text-[10px] text-slate-300 font-medium relative z-10 flex items-center gap-1"><ArrowRight size={10} className="text-emerald-400"/> +120 bps expansion</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity"><Globe size={32} className="text-blue-500"/></div>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold relative z-10">Enterprise Clients</p>
            <p className="text-3xl font-bold text-white mb-1.5 tracking-tight relative z-10">104</p>
            <p className="text-[10px] text-slate-300 font-medium relative z-10 flex items-center gap-1"><ArrowRight size={10} className="text-emerald-400"/> 99.8% Net Retention Rate</p>
          </div>
        </div>

        <h2 className="text-lg md:text-xl font-bold text-white mb-5 border-b border-white/10 pb-2">Recent Press Releases</h2>
        <div className="flex flex-col gap-2.5">
          {[
            { date: "Oct 15, 2026", title: "Technimation InfoMedia Announces Record Q3 2026 Financial Results" },
            { date: "Sep 22, 2026", title: "Strategic Expansion of Threat Hunting Capabilities in India" },
            { date: "Aug 05, 2026", title: "Technimation Expands Footprint with New Pune Data Center Node" }
          ].map((pr, i) => (
            <a key={i} href="#" className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 rounded-lg transition-all group shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <span className="text-[9px] text-orange-400 uppercase tracking-widest font-bold whitespace-nowrap bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">{pr.date}</span>
                <span className="text-xs md:text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{pr.title}</span>
              </div>
              <ArrowRight size={14} className="text-slate-500 group-hover:text-orange-400 transition-colors mt-2 md:mt-0 flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </>
);

const LegalPage = ({ title }) => (
  <div className="w-full pt-24 pb-20 px-[3vw] min-h-screen bg-[#050706] relative z-10 flex flex-col items-center">
    <div className="w-full max-w-[800px] mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-xl">
      <h1 className="text-xl md:text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">{title}</h1>
      <div className="prose prose-invert prose-sm md:prose-base max-w-none text-slate-400">
        <p className="mb-4 font-medium text-slate-300">Last Updated: July 3, 2026</p>
        <p className="mb-5 leading-relaxed text-xs md:text-sm">This is a standardized enterprise legal template. At Technimation InfoMedia, we take data privacy, security, and infrastructure compliance incredibly seriously. The following document outlines our operational procedures, data handling, and zero-trust liabilities.</p>
        
        <h3 className="text-white text-base md:text-lg font-bold mt-8 mb-3">1. Data Collection & Telemetry</h3>
        <p className="mb-5 leading-relaxed text-xs md:text-sm">To maintain 99.99% SLA uptime and active threat hunting, our AIOps tools continuously process network telemetry. This data is fully anonymized and routed through our globally distributed edge nodes to ensure zero PII exposure.</p>

        <h3 className="text-white text-base md:text-lg font-bold mt-8 mb-3">2. Zero-Trust Architecture Liabilities</h3>
        <p className="mb-5 leading-relaxed text-xs md:text-sm">Our zero-trust implementations assume the network is inherently hostile. Client responsibilities include maintaining proper identity access management (IAM) hygiene. Technimation is not liable for breaches originating from compromised administrative credentials.</p>

        <h3 className="text-white text-base md:text-lg font-bold mt-8 mb-3">3. Global Compliance</h3>
        <p className="mb-5 leading-relaxed text-xs md:text-sm">We operate strictly under SOC 2 Type II, ISO 27001, GDPR, and CCPA frameworks. Audits are conducted bi-annually by independent third-party cybersecurity validation firms. All compliance reports are available via the client portal under NDA.</p>
      </div>
    </div>
  </div>
);

const BasicPage = ({ title, subtitle, desc }) => (
  <div className="w-full min-h-screen bg-[#050706] flex flex-col">
    <PageHeader subtitle={subtitle} title={title} description={desc} />
    <div className="w-full flex-1 flex flex-col items-center justify-center py-20 px-[3vw]">
       <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 mb-6 animate-[spin_3s_linear_infinite]">
         <Settings size={20} />
       </div>
       <p className="text-slate-400 text-xs text-center font-mono uppercase tracking-widest">Environment provisioning in progress...</p>
    </div>
  </div>
);

export default function App() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const multiplierSectionRef = useRef(null);
  const headerRef = useRef(null);
  
  const [currentView, setCurrentView] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFounder, setActiveFounder] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const logoSrc = "https://static.wixstatic.com/media/548938_573f491cecff47b39b0e8cfb59295785~mv2.png";
  
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const current = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const methodologyTabs = [
    { title: 'Audit & Discover', icon: <BarChart size={14} />, desc: 'We conduct a deep-dive analysis of your existing legacy systems, identifying bottlenecks, security vulnerabilities, and areas for exponential scaling.' },
    { title: 'Architect & Design', icon: <Cpu size={14} />, desc: 'Our elite engineers blueprint a bespoke, high-availability infrastructure utilizing zero-trust protocols and multi-cloud redundancies.' },
    { title: 'Deploy & Migrate', icon: <Cloud size={14} />, desc: 'We execute seamless migrations with zero downtime, ensuring your enterprise operations remain uninterrupted during the transition.' },
    { title: 'Optimize & Scale', icon: <Zap size={14} />, desc: 'Post-deployment, we leverage AIOps to continuously monitor, auto-scale, and financially optimize your entire digital footprint.' }
  ];

  const solutions = [
    { title: 'Cloud Computing', icon: <Cloud size={16} strokeWidth={1.5} />, desc: 'Seamlessly migrate, manage, and optimize your workloads across AWS, Azure, and Google Cloud with auto-scaling architectures.' },
    { title: 'Zero-Trust Cybersecurity', icon: <Shield size={16} strokeWidth={1.5} />, desc: 'Implement zero-trust protocols, real-time threat hunting, and automated incident response to lock down your digital perimeter.' },
    { title: 'IT Infrastructure', icon: <Server size={16} strokeWidth={1.5} />, desc: 'Design and deploy high-availability on-premise and hybrid data centers built for maximum throughput and zero downtime.' },
    { title: 'Strategic Consulting', icon: <Cpu size={16} strokeWidth={1.5} />, desc: 'Align your IT roadmap with executive business goals through comprehensive audits, risk assessments, and modernization planning.' },
    { title: 'AIOps & Automation', icon: <Database size={16} strokeWidth={1.5} />, desc: 'Leverage machine learning to predict outages, automate routine maintenance, and dynamically allocate resources in real-time.' },
    { title: 'Edge Computing', icon: <Network size={16} strokeWidth={1.5} />, desc: 'Deploy processing power closer to your users. Drastically reduce latency and bandwidth use with our globally distributed edge nodes.' }
  ];

  const navigateTo = (view, hash = '') => {
    setCurrentView(view);
    window.scrollTo(0, 0);
    
    if (hash && view === 'home') {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const yOffset = -80; 
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150); 
    }
  };

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      const unmountTimer = setTimeout(() => setShowPreloader(false), 1000);
      return () => clearTimeout(unmountTimer);
    }, 2800);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener('scroll', handleScroll);
    };
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
    
    const handleGlobalMouse = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleGlobalMouse);

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
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleGlobalMouse);
    };
  }, []);

  const handleSectionMouseMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--local-mouse-x', `${x}px`);
    ref.current.style.setProperty('--local-mouse-y', `${y}px`);
  };

  useEffect(() => {
    if (currentView !== 'home') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    const founderInterval = setInterval(() => {
      setActiveFounder((prev) => (prev === 0 ? 1 : 0));
    }, 6000);

    return () => {
      observer.disconnect();
      clearInterval(founderInterval);
    };
  }, [currentView]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap');
        
        .font-sans { font-family: 'Montserrat', sans-serif; }
        body { background-color: #050706; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes hero-slide-up {
          0% { opacity: 0; transform: translateY(30px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        .animate-hero-slide-up {
          opacity: 0;
          animation: hero-slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes logo-pulse {
          0% { transform: scale(0.95); filter: drop-shadow(0 0 0px rgba(249,115,22,0)); }
          50% { transform: scale(1.05); filter: drop-shadow(0 0 20px rgba(249,115,22,0.7)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(249,115,22,0.4)); }
        }
        
        @keyframes mask-wipe {
          0% { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0 0 0); }
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

        .reveal {
          opacity: 0;
          transform: translateY(25px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 100ms; }
        .reveal-delay-2 { transition-delay: 200ms; }

        @keyframes float-up {
          0% { transform: translateY(80px) scale(0.8); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-80px) scale(1.2); opacity: 0; }
        }
        .particle {
          position: absolute;
          background: rgba(249, 115, 22, 0.4);
          border-radius: 50%;
          pointer-events: none;
          animation: float-up 8s infinite linear;
        }

        .founder-card {
          transition: filter 0.8s ease, transform 0.8s ease, opacity 0.8s ease;
        }
        .founder-card.inactive {
          filter: blur(10px) brightness(0.6);
          transform: scale(0.95);
          opacity: 0;
          pointer-events: none;
          position: absolute;
          inset: 0;
        }
        .founder-card.active {
          filter: blur(0px) brightness(1);
          transform: scale(1);
          opacity: 1;
          position: relative;
        }

        .magic-card {
          position: relative;
          border-radius: 16px;
          padding: 1px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .magic-card:hover {
          transform: scale(0.98);
          box-shadow: 0 10px 30px rgba(249, 115, 22, 0.15);
        }
        .magic-card::before {
          content: "";
          position: absolute;
          top: -250%;
          left: -250%;
          width: 600%;
          height: 600%;
          background: conic-gradient(from 0deg, transparent 0 300deg, #f97316 360deg);
          z-index: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          animation: spin 6s linear infinite;
        }
        .magic-card:hover::before { opacity: 1; }
        .magic-card-inner {
          position: relative;
          z-index: 10;
          background: white;
          border-radius: 15px;
          width: 100%;
          height: 100%;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        .nav-bridge::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            height: 20px; 
            background: transparent;
        }
      `}</style>

      {showPreloader && (
        <div className={`fixed inset-0 z-[100] bg-[#050706] flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoading ? 'opacity-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
          <div className="relative w-40 h-12 md:w-48 md:h-16 mb-5">
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
          <div className="flex flex-col items-center gap-1 overflow-hidden">
             <span className="text-orange-500 font-medium tracking-[0.4em] text-[9px] animate-[mask-wipe_1.5s_cubic-bezier(0.85,0,0.15,1)_forwards_0.5s] opacity-0" style={{ animationFillMode: 'forwards' }}>T. E. C. H.</span>
             <span className="text-white/40 text-[8px] tracking-widest uppercase animate-[mask-wipe_1.5s_cubic-bezier(0.85,0,0.15,1)_forwards_0.8s] opacity-0" style={{ animationFillMode: 'forwards' }}>Transformative Enterprise Cloud Hub</span>
          </div>
        </div>
      )}

      {}
      <div ref={containerRef} className="bg-[#050706] min-h-screen font-sans selection:bg-orange-500 selection:text-black overflow-x-hidden flex flex-col w-full relative">
        
        {}
        <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-[50] w-full flex justify-center pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isScrolled ? 'pt-3 md:pt-4 px-[3vw]' : 'pt-0 px-[3vw]'}`}>
          <div className={`flex items-center relative transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-10 pointer-events-auto w-full ${isScrolled ? 'max-w-[900px] bg-[#050706]/90 backdrop-blur-3xl border border-white/10 rounded-[9px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] px-5 md:px-6 py-2.5' : 'max-w-[1400px] bg-transparent border border-transparent shadow-none px-0 py-4 md:py-5'}`}>
            
            <div className="flex-1 flex items-center justify-start min-w-[150px]">
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="flex items-center flex-shrink-0">
                <img src={logoSrc} alt="Technimation InfoMedia Logo" className="w-auto object-contain drop-shadow-md transition-transform duration-500 hover:scale-105 h-[36px]" />
              </a>
            </div>
            
            <nav className="hidden lg:flex flex-none items-center justify-center relative">
               <ul className="flex items-center gap-8 nav-bridge">
                 
                 {/* Company Mega Menu */}
                 <li className="group">
                    <div className="flex items-center gap-1.5 cursor-pointer py-2 text-white/80 hover:text-white transition-colors group-hover:text-white">
                       <span className="text-[11px] font-bold tracking-wide uppercase">Company</span>
                       <ChevronDown size={12} className="text-orange-500 group-hover:rotate-180 transition-transform duration-300" />
                    </div>
                    <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-3 group-hover:translate-y-0 z-50">
                       <div className="w-[700px] bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 flex gap-6">
                          <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-4">
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('about'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><Building size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">About Technimation</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">Our mission, history, and engineering principles.</span>
                             </a>
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('leadership'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><Users size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">Leadership Team</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">Meet the visionaries engineering enterprise tech.</span>
                             </a>
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('network'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><Globe size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">Global Infrastructure</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">Explore our planetary-scale data nodes.</span>
                             </a>
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('careers'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><Terminal size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">Careers</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">Join our elite global engineering unit.</span>
                             </a>
                          </div>
                          <div className="w-[220px] bg-gradient-to-br from-orange-500/10 to-yellow-500/5 border border-orange-500/20 rounded-lg p-5 relative overflow-hidden group/card flex flex-col justify-between cursor-pointer" onClick={() => navigateTo('about')}>
                             <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                             <div className="relative z-10">
                                <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center mb-4 border border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                                   <Building size={14}/>
                                </div>
                                <h3 className="text-xs font-bold text-white mb-1.5 tracking-wide">Our Mission</h3>
                                <p className="text-[10px] text-orange-100/60 leading-relaxed mb-4 font-light">Empowering the digital future of enterprise business.</p>
                             </div>
                             <div className="relative z-10 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-orange-400 group-hover/card:text-orange-300 transition-colors">
                                Learn More <ArrowRight size={10} className="group-hover/card:translate-x-1 transition-transform duration-300"/>
                             </div>
                          </div>
                       </div>
                    </div>
                 </li>

                 {/* Solutions Mega Menu */}
                 <li className="group">
                    <div className="flex items-center gap-1.5 cursor-pointer py-2 text-white/80 hover:text-white transition-colors group-hover:text-white">
                       <span className="text-[11px] font-bold tracking-wide uppercase">Solutions</span>
                       <ChevronDown size={12} className="text-orange-500 group-hover:rotate-180 transition-transform duration-300" />
                    </div>
                    <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-3 group-hover:translate-y-0 z-50">
                       <div className="w-[700px] bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 flex gap-6">
                          <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-4">
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('cloud'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><Cloud size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">Cloud Scaling</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">Multi-region active-active architectures.</span>
                             </a>
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('security'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><Lock size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">Zero-Trust Security</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">Identity-first perimeter lockdown.</span>
                             </a>
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('edge'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><Network size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">Edge Computing</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">Ultra-low latency global data nodes.</span>
                             </a>
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('aiops'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><Activity size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">Threat Hunting</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">AIOps driven anomaly detection.</span>
                             </a>
                          </div>
                          <div className="w-[220px] bg-gradient-to-br from-orange-500/10 to-yellow-500/5 border border-orange-500/20 rounded-lg p-5 relative overflow-hidden group/card flex flex-col justify-between cursor-pointer" onClick={() => navigateTo('framework')}>
                             <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                             <div className="relative z-10">
                                <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center mb-4 border border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                                   <Zap size={14}/>
                                </div>
                                <h3 className="text-xs font-bold text-white mb-1.5 tracking-wide">The Framework</h3>
                                <p className="text-[10px] text-orange-100/60 leading-relaxed mb-4 font-light">Discover how we engineer digital resilience.</p>
                             </div>
                             <div className="relative z-10 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-orange-400 group-hover/card:text-orange-300 transition-colors">
                                Explore <ArrowRight size={10} className="group-hover/card:translate-x-1 transition-transform duration-300"/>
                             </div>
                          </div>
                       </div>
                    </div>
                 </li>

                 {/* Insights Mega Menu */}
                 <li className="group">
                    <div className="flex items-center gap-1.5 cursor-pointer py-2 text-white/80 hover:text-white transition-colors group-hover:text-white">
                       <span className="text-[11px] font-bold tracking-wide uppercase">Insights</span>
                       <ChevronDown size={12} className="text-orange-500 group-hover:rotate-180 transition-transform duration-300" />
                    </div>
                    <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-3 group-hover:translate-y-0 z-50">
                       <div className="w-[700px] bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 flex gap-6">
                          <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-4">
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('whitepapers'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><FileText size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">Whitepapers</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">Deep-dive architectural analyses.</span>
                             </a>
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('docs'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><BookOpen size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">Documentation</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">Technical deployment guides.</span>
                             </a>
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('api'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><Server size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">API Reference</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">REST & GraphQL endpoints.</span>
                             </a>
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('status'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><Activity size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">System Status</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">Live uptime & operations metrics.</span>
                             </a>
                          </div>
                          <div className="w-[220px] bg-gradient-to-br from-orange-500/10 to-yellow-500/5 border border-orange-500/20 rounded-lg p-5 relative overflow-hidden group/card flex flex-col justify-between cursor-pointer" onClick={() => navigateTo('whitepapers')}>
                             <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                             <div className="relative z-10">
                                <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center mb-4 border border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                                   <FileText size={14}/>
                                </div>
                                <h3 className="text-xs font-bold text-white mb-1.5 tracking-wide">2027 Posture</h3>
                                <p className="text-[10px] text-orange-100/60 leading-relaxed mb-4 font-light">Read our latest brief on global cloud security trends.</p>
                             </div>
                             <div className="relative z-10 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-orange-400 group-hover/card:text-orange-300 transition-colors">
                                Read Brief <ArrowRight size={10} className="group-hover/card:translate-x-1 transition-transform duration-300"/>
                             </div>
                          </div>
                       </div>
                    </div>
                 </li>

                 {/* Case Studies Mega Menu */}
                 <li className="group">
                    <div className="flex items-center gap-1.5 cursor-pointer py-2 text-white/80 hover:text-white transition-colors group-hover:text-white">
                       <span className="text-[11px] font-bold tracking-wide uppercase">Case Studies</span>
                       <ChevronDown size={12} className="text-orange-500 group-hover:rotate-180 transition-transform duration-300" />
                    </div>
                    <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-3 group-hover:translate-y-0 z-50">
                       <div className="w-[700px] bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 flex gap-6">
                          <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-4">
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('financial'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><TrendingUp size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">Financial Services</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">HFT and banking infrastructure.</span>
                             </a>
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('healthcare'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><Activity size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">Healthcare & Life</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">HIPAA compliant zero-trust.</span>
                             </a>
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('retail'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><Cloud size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">Retail & E-Com</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">Auto-scaling edge nodes.</span>
                             </a>
                             <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('manufacturing'); }} className="group/comp flex flex-col gap-1.5 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-1 group-hover/comp:bg-orange-500 group-hover/comp:text-black transition-colors shadow-sm"><Cpu size={14}/></div>
                                <span className="text-[11px] font-bold text-white group-hover/comp:text-orange-400 transition-colors">Manufacturing</span>
                                <span className="text-[10px] text-slate-400 leading-relaxed font-light">IoT telemetry routing.</span>
                             </a>
                          </div>
                          <div className="w-[220px] bg-gradient-to-br from-orange-500/10 to-yellow-500/5 border border-orange-500/20 rounded-lg p-5 relative overflow-hidden group/card flex flex-col justify-between cursor-pointer" onClick={() => navigateTo('financial')}>
                             <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                             <div className="relative z-10">
                                <span className="text-[8px] text-orange-400 font-bold uppercase tracking-widest bg-orange-500/10 w-fit px-1.5 py-0.5 rounded border border-orange-500/20 mb-3 inline-block">Fintech</span>
                                <h3 className="text-xl font-bold text-white mb-1.5 tracking-wide">$50M+ Saved</h3>
                                <p className="text-[10px] text-orange-100/60 leading-relaxed mb-4 font-light">Cost reduction via bespoke AIOps auto-scaling.</p>
                             </div>
                             <div className="relative z-10 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-orange-400 group-hover/card:text-orange-300 transition-colors">
                                Read Case <ArrowRight size={10} className="group-hover/card:translate-x-1 transition-transform duration-300"/>
                             </div>
                          </div>
                       </div>
                    </div>
                 </li>
               </ul>
            </nav>

            <div className="flex-1 flex items-center justify-end min-w-[150px]">
               <button className="bg-orange-500 hover:bg-orange-400 text-black font-bold tracking-widest uppercase transition-colors shadow-[0_0_15px_rgba(249,115,22,0.3)] px-4 py-2 text-[10px] rounded-lg whitespace-nowrap">
                 Contact Sales
               </button>
            </div>
          </div>
        </header>

        {}
        <div className="fixed inset-0 w-full h-screen z-0 overflow-hidden bg-[#050706] flex flex-col items-center justify-center pointer-events-none">
          <div className="absolute inset-0 w-full h-full bg-[#050706] z-[-3]" />
          <video 
            ref={videoRef} 
            className="absolute inset-0 w-full h-full object-cover z-[-2] opacity-50 mix-blend-screen" 
            style={{ filter: 'grayscale(100%) brightness(0.6) contrast(1.2)' }} 
            autoPlay loop muted playsInline 
          />
          <div className="absolute inset-0 z-[-1] pointer-events-none mix-blend-color opacity-80 bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500" />
          <div className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-500 mix-blend-multiply opacity-100" style={{ background: `radial-gradient(circle 1000px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(5, 7, 6, 0.2) 0%, rgba(5, 7, 6, 0.95) 50%, rgba(5, 7, 6, 1) 100%)` }} />
        </div>

        {}
        {currentView === 'home' ? (
          <>
            {}
            <section className="relative z-[10] w-full px-[3vw] flex flex-col items-center justify-center pt-28 pb-12 min-h-screen">
              <div className="w-full max-w-[1000px] mx-auto flex flex-col items-center text-center mt-[-5vh]">
                
                <div className="group animate-hero-slide-up flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(249,115,22,0.1)] w-fit mx-auto cursor-default overflow-hidden transition-all duration-500 hover:bg-orange-500/20" style={{ animationDelay: '100ms' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse flex-shrink-0" />
                  <div className="flex items-center text-orange-400 text-[9px] font-bold tracking-[0.2em] uppercase text-center whitespace-nowrap">
                    <span>T.E.C.H.</span>
                    <span className="max-w-0 opacity-0 group-hover:max-w-[300px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex items-center">
                       <span className="w-px h-2 bg-orange-400/50 mx-1.5 hidden group-hover:block" />
                       Transformative Enterprise Cloud Hub
                    </span>
                  </div>
                </div>

                <h1 className="animate-hero-slide-up text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-5 drop-shadow-2xl mx-auto text-center" style={{ animationDelay: '250ms' }}>
                  Engineer Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">Digital</span> Future.
                </h1>

                <p className="animate-hero-slide-up text-white/80 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto mb-8 drop-shadow-md text-center" style={{ animationDelay: '400ms' }}>
                  Empower your business with resilient, scalable technology. We specialize in comprehensive Enterprise IT Consulting, Cloud Computing, advanced Cybersecurity, and robust IT Infrastructure Management to drive your transformation.
                </p>

                <div className="animate-hero-slide-up flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center mx-auto" style={{ animationDelay: '550ms' }}>
                  <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-[#070b0a] font-bold text-[11px] tracking-wider uppercase px-6 py-3 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                    Explore Solutions
                  </button>
                  <button className="bg-transparent border border-white/20 hover:border-orange-500 text-white hover:text-orange-400 font-bold text-[11px] tracking-wider uppercase px-6 py-3 rounded-lg transition-all duration-300 backdrop-blur-md hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                    Schedule Consultation
                  </button>
                </div>
              </div>

              <div className="absolute bottom-6 left-0 right-0 w-full px-[3vw] flex justify-center">
                <div className="animate-hero-slide-up flex items-center px-5 py-2.5 rounded-full bg-[#050706]/60 border border-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] cursor-default max-w-full overflow-x-auto hide-scrollbar" style={{ animationDelay: '700ms' }}>
                  <div className="flex flex-nowrap items-center gap-5 w-max">
                    <div className="flex items-center gap-2 text-white/70 whitespace-nowrap flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)] animate-pulse"></div></div>
                      <span className="text-[9px] tracking-[0.1em] uppercase font-bold text-white">IT Consulting</span>
                    </div>
                    <div className="w-px h-3 bg-white/15 flex-shrink-0" />
                    <div className="flex items-center gap-2 text-white/70 whitespace-nowrap flex-shrink-0">
                      <Cloud size={12} className="text-orange-500" />
                      <span className="text-[9px] tracking-[0.1em] uppercase font-bold text-slate-300">Cloud Computing</span>
                    </div>
                    <div className="w-px h-3 bg-white/15 flex-shrink-0" />
                    <div className="flex items-center gap-2 text-white/70 whitespace-nowrap flex-shrink-0">
                      <Shield size={12} className="text-orange-500" />
                      <span className="text-[9px] tracking-[0.1em] uppercase font-bold text-slate-300">Cybersecurity</span>
                    </div>
                    <div className="w-px h-3 bg-white/15 flex-shrink-0" />
                    <div className="flex items-center gap-2 text-white/70 whitespace-nowrap flex-shrink-0">
                      <Server size={12} className="text-orange-500" />
                      <span className="text-[9px] tracking-[0.1em] uppercase font-bold text-slate-300">Infrastructure Mgt</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {}
            <div className="relative w-full z-20 bg-[#f8f9fa] shadow-[0_-20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col items-center">
              
              <section className="w-full py-4 md:py-5 bg-white flex flex-col items-center justify-center border-b border-slate-100">
                <div className="relative w-full flex items-center max-w-[100vw] overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                  <div className="animate-marquee flex items-center gap-12 md:gap-14 px-5">
                    {[...Array(2)].map((_, i) => (
                      <React.Fragment key={i}>
                        {['AWS', 'Oracle', 'IBM', 'Palo Alto Networks', 'VMware', 'Dell Technologies', 'Microsoft'].map((partner, index) => (
                          <div key={`${i}-${index}`} className="text-slate-300 hover:text-orange-500 transition-colors duration-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap cursor-default">
                            {partner}
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </section>

              <section 
                id="about"
                ref={aboutSectionRef}
                onMouseMove={(e) => handleSectionMouseMove(e, aboutSectionRef)}
                className="w-full py-16 md:py-20 bg-white px-[3vw] relative z-10 overflow-hidden border-b border-slate-100 flex flex-col items-center"
              >
                <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0" style={{ backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
                <div className="absolute inset-0 pointer-events-none opacity-20 z-[1] mix-blend-overlay transition-opacity duration-300" style={{ background: `radial-gradient(circle 600px at var(--local-mouse-x, 50%) var(--local-mouse-y, 50%), rgba(249, 115, 22, 1) 0%, transparent 80%)` }} />

                <div className="w-full max-w-[1000px] mx-auto flex flex-col items-center text-center gap-8 relative z-10">
                  <div className="reveal mx-auto text-center w-full flex justify-center">
                    <div className="flex items-center justify-center gap-1.5 relative group w-fit cursor-default">
                      <span className="w-1 h-1 rounded-full border border-orange-500" />
                      <span className="text-slate-500 font-bold text-[9px] tracking-[0.2em] uppercase text-center">About</span>
                      <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-orange-500 origin-center transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-8 w-full text-center">
                    <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed reveal reveal-delay-1 max-w-3xl mx-auto text-center">
                      Technimation InfoMedia is a premier global IT Consulting firm. With over a decade of enterprise experience, we deliver tailored architectural data solutions that empower B2B SaaS and enterprise businesses to scale securely. Our elite engineering team provides strategic GEO and AIO insights to ensure success through robust infrastructure management.
                    </p>

                    <div className="w-full max-w-4xl mx-auto">
                      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x-0 lg:divide-x divide-y lg:divide-y-0 divide-slate-100 reveal reveal-delay-2 gap-y-6 lg:gap-y-0">
                        {[
                          { num: '99.99%', text: 'Guaranteed enterprise infrastructure uptime.' },
                          { num: '250+', text: 'Successful cloud migrations globally.' },
                          { num: '$50M+', text: 'Client IT expenditure optimized.' },
                          { num: '0', text: 'Unmitigated critical security breaches.' }
                        ].map((metric, idx) => (
                          <div key={idx} className="flex flex-col items-center justify-center py-4 px-3 lg:px-5 text-center group cursor-pointer transition-all duration-500 rounded-xl hover:bg-orange-50/50 hover:shadow-[0_15px_30px_rgba(249,115,22,0.05)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="text-xl md:text-2xl font-bold text-slate-900 mb-1.5 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-yellow-500 transition-all duration-500 relative z-10">{metric.num}</span>
                            <span className="text-slate-500 text-[10px] leading-relaxed font-light max-w-[130px] mx-auto group-hover:text-slate-700 transition-colors duration-500 relative z-10">{metric.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section 
                ref={multiplierSectionRef}
                onMouseMove={(e) => handleSectionMouseMove(e, multiplierSectionRef)}
                className="w-full py-16 md:py-20 bg-[#050706] px-[3vw] relative overflow-hidden flex flex-col items-center text-center border-y border-white/5"
              >
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="particle" style={{ left: `${Math.random() * 100}%`, width: `${Math.random() * 4 + 2}px`, height: `${Math.random() * 4 + 2}px`, animationDuration: `${Math.random() * 8 + 4}s`, animationDelay: `${Math.random() * 5}s` }} />
                  ))}
                </div>
                <div className="absolute inset-0 z-[1] pointer-events-none opacity-20 transition-opacity duration-700 mix-blend-screen" style={{ background: `radial-gradient(circle 600px at var(--local-mouse-x, 50%) var(--local-mouse-y, 50%), rgba(249, 115, 22, 1) 0%, transparent 60%)` }} />
                
                <div className="w-full max-w-[1000px] mx-auto flex flex-col items-center justify-center text-center relative z-10 reveal">
                  <div className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-5 mx-auto w-fit cursor-default">
                    <Activity size={10} className="text-orange-400" />
                    <span className="text-orange-400 text-[8px] font-bold tracking-widest uppercase text-center">The Technimation Multiplier</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-tight leading-[1.2] max-w-3xl mx-auto text-center cursor-default">
                    We transform legacy infrastructure from a cost center into a <br className="hidden md:block" />
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-500 transition-all duration-700 bg-[length:200%_auto]">
                      catalyst for exponential growth.
                    </span>
                  </h2>
                  
                  <p className="text-slate-400 text-xs md:text-sm font-light mt-5 max-w-2xl mx-auto leading-relaxed text-center">
                    Our bespoke architectural solutions don't just keep the lights on—they empower your enterprise to innovate faster, deploy globally, and scale effortlessly without technological friction.
                  </p>

                  <div className="mt-8 w-[1px] h-12 bg-gradient-to-b from-orange-500/0 via-orange-500/50 to-orange-500/0 relative mx-auto">
                    <div className="absolute top-0 left-0 w-full h-1/3 bg-orange-400 blur-[2px] animate-[float-up_3s_infinite_ease-in-out_reverse]" />
                  </div>
                </div>
              </section>

              <section id="framework" className="w-full py-16 md:py-20 bg-white px-[3vw] relative z-10 flex flex-col items-center text-center border-b border-slate-100">
                <div className="w-full max-w-[1000px] mx-auto flex flex-col items-center text-center">
                  <div className="mb-10 reveal mx-auto text-center w-full flex flex-col items-center">
                    <p className="text-orange-500 text-[9px] font-bold tracking-[0.2em] uppercase mb-2 text-center">Our Process</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight text-center">The Technimation Framework</h2>
                  </div>

                  <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-4xl mx-auto">
                    <div className="flex flex-col w-full lg:w-5/12 gap-2.5">
                      {methodologyTabs.map((tab, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveTab(idx)}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 text-left w-full ${activeTab === idx ? 'bg-orange-50/80 border border-orange-200/50 shadow-[0_8px_30px_rgba(249,115,22,0.08)] translate-x-1.5' : 'bg-transparent border border-transparent hover:bg-slate-50'}`}
                        >
                          <div className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors duration-500 flex-shrink-0 ${activeTab === idx ? 'bg-orange-500 text-white shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                            {React.cloneElement(tab.icon, { size: 12 })}
                          </div>
                          <h3 className={`text-xs md:text-sm font-bold transition-colors duration-500 ${activeTab === idx ? 'text-orange-600' : 'text-slate-600'}`}>
                            {tab.title}
                          </h3>
                        </button>
                      ))}
                    </div>

                    <div className="w-full lg:w-7/12 bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-100 shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center min-h-[250px] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-[40px]" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-[30px]" />
                      
                      {methodologyTabs.map((tab, idx) => (
                        <div key={idx} className={`absolute inset-0 p-6 md:p-8 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeTab === idx ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 z-0 pointer-events-none'}`}>
                          <div className="w-8 h-8 mb-4 rounded bg-white shadow-sm border border-slate-100 flex items-center justify-center text-orange-500">
                            {React.cloneElement(tab.icon, { size: 14 })}
                          </div>
                          <h4 className="text-base md:text-lg font-bold text-slate-900 mb-2 text-center">{tab.title}</h4>
                          <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed max-w-xs text-center mx-auto">{tab.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section id="cloud" className="w-full py-16 md:py-20 bg-slate-50 px-[3vw] relative z-10 flex flex-col items-center text-center overflow-hidden border-b border-slate-100">
                <div className="w-full max-w-[1000px] mx-auto flex flex-col items-center text-center">
                  <div className="mb-10 reveal mx-auto text-center w-full flex flex-col items-center">
                    <p className="text-orange-500 text-[9px] font-bold tracking-[0.2em] uppercase mb-2 text-center">Our Expertise</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight text-center">Enterprise Solutions</h2>
                  </div>
                </div>

                <div className="flex overflow-x-auto gap-4 pb-6 pt-4 px-[3vw] snap-x snap-mandatory hide-scrollbar w-full max-w-[1200px] mx-auto">
                  {solutions.map((solution, idx) => (
                    <div key={idx} className="magic-card group min-w-[240px] md:min-w-[280px] h-[220px] snap-center cursor-pointer reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                      <div className="magic-card-inner">
                        <div className="w-8 h-8 rounded bg-orange-50 text-orange-500 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-sm relative z-20">
                          {React.cloneElement(solution.icon, { size: 14 })}
                        </div>
                        <h3 className="text-sm md:text-base font-bold text-slate-900 mb-2 tracking-tight text-center relative z-20">{solution.title}</h3>
                        <p className="text-slate-500 font-light text-[10px] md:text-xs leading-relaxed max-w-[220px] mx-auto text-center relative z-20">{solution.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-1.5 mt-2 text-slate-400 mx-auto">
                  <span className="text-[8px] uppercase tracking-widest font-bold">Swipe to explore</span>
                  <ArrowRight size={10} className="animate-pulse" />
                </div>
              </section>

              <section id="compliance" className="w-full py-16 md:py-20 bg-white px-[3vw] relative z-10 border-t border-slate-100 flex flex-col items-center">
                <div className="w-full max-w-[1000px] mx-auto text-center reveal">
                  <p className="text-orange-500 text-[9px] font-bold tracking-[0.2em] uppercase mb-2">Trust & Validation</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-4">Enterprise-Grade Compliance Posture</h2>
                  <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed max-w-2xl mx-auto mb-12">
                    We engineer zero-trust environments that inherently satisfy the most stringent global regulatory frameworks. Security is baked into the architecture, not bolted on.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: 'SOC 2 Type II', icon: <Shield size={24} className="text-blue-500"/>, desc: 'Independently audited for security, availability, processing integrity, confidentiality, and privacy controls.' },
                      { title: 'ISO 27001', icon: <Lock size={24} className="text-emerald-500"/>, desc: 'Global standard for information security management systems (ISMS), guaranteeing rigorous risk management.' },
                      { title: 'GDPR & HIPAA', icon: <Globe size={24} className="text-orange-500"/>, desc: 'Architected to ensure strict geographic data sovereignty, zero PII exposure, and compliant patient data handling.' }
                    ].map((cert, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl hover:border-slate-200 transition-all duration-300">
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 border border-slate-100">
                          {cert.icon}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mb-2">{cert.title}</h3>
                        <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed font-light">{cert.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="testimonials" className="w-full py-16 md:py-20 bg-slate-50 px-[3vw] relative z-10 border-t border-slate-100 flex flex-col items-center">
                <div className="w-full max-w-[1000px] mx-auto text-center reveal">
                  <p className="text-orange-500 text-[9px] font-bold tracking-[0.2em] uppercase mb-2">Client Success</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-12">Trusted by Global Leaders</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-slate-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col text-left">
                       <div className="flex gap-1 text-orange-400 mb-4">
                         {[1,2,3,4,5].map(star => <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                       </div>
                       <p className="text-slate-600 text-sm font-light italic mb-6 leading-relaxed flex-1">"Technimation fundamentally altered our trajectory. Their AIOps migration reduced our cloud expenditure by 40% while simultaneously eliminating latency spikes during peak high-frequency trading hours."</p>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300" />
                         <div>
                            <p className="text-xs font-bold text-slate-900">CTO, Top 5 Global Fintech</p>
                            <p className="text-[10px] text-slate-500">London, UK</p>
                         </div>
                       </div>
                    </div>
                    <div className="bg-white border border-slate-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col text-left">
                       <div className="flex gap-1 text-orange-400 mb-4">
                         {[1,2,3,4,5].map(star => <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                       </div>
                       <p className="text-slate-600 text-sm font-light italic mb-6 leading-relaxed flex-1">"The zero-trust implementation was flawless. We operate with massive amounts of sensitive patient data, and Technimation's architecture provided the exact security posture required to satisfy our HIPAA auditors."</p>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300" />
                         <div>
                            <p className="text-xs font-bold text-slate-900">VP of Infrastructure, Healthcare Network</p>
                            <p className="text-[10px] text-slate-500">San Francisco, CA</p>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="leadership" className="w-full py-16 md:py-20 bg-[#050706] px-[3vw] relative overflow-hidden flex flex-col items-center text-center border-t border-white/5">
                 <div className="w-full max-w-[1000px] mx-auto flex flex-col items-center text-center">
                   <div className="mb-10 reveal mx-auto text-center w-full flex flex-col items-center">
                     <p className="text-orange-400 text-[9px] font-bold tracking-[0.2em] uppercase mb-2 text-center">Leadership</p>
                     <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-center">Engineered by Visionaries</h2>
                   </div>

                   <div className="flex flex-col gap-6 items-center w-full max-w-2xl mx-auto">
                     
                     <div className="relative aspect-video w-full rounded-2xl overflow-hidden reveal mx-auto border border-white/10 shadow-2xl cursor-default">
                       <div className={`founder-card ${activeFounder === 0 ? 'active' : 'inactive'} w-full h-full`}>
                         <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200" alt="Abhijit Junnarkar" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-[#050706]/40 to-transparent" />
                         <div className="absolute bottom-6 left-0 right-0 text-center px-4 flex flex-col items-center">
                           <h3 className="text-lg md:text-xl font-bold text-white mb-1 text-center drop-shadow-lg">Abhijit Junnarkar</h3>
                           <p className="text-orange-400 text-[9px] font-bold text-center tracking-wide uppercase">Chief Executive Officer</p>
                         </div>
                       </div>

                       <div className={`founder-card ${activeFounder === 1 ? 'active' : 'inactive'} w-full h-full`}>
                         <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200" alt="Mamta Junnarkar" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-[#050706]/40 to-transparent" />
                         <div className="absolute bottom-6 left-0 right-0 text-center px-4 flex flex-col items-center">
                           <h3 className="text-lg md:text-xl font-bold text-white mb-1 text-center drop-shadow-lg">Mamta Junnarkar</h3>
                           <p className="text-orange-400 text-[9px] font-bold text-center tracking-wide uppercase">Chief Executive Officer</p>
                         </div>
                       </div>
                     </div>

                     <div className="flex flex-col items-center gap-4 reveal reveal-delay-2 w-full text-center">
                       <div className="flex justify-center gap-2 mb-1 mx-auto">
                         <button onClick={() => setActiveFounder(0)} className={`h-1.5 rounded-full transition-all duration-500 ${activeFounder === 0 ? 'w-6 bg-orange-500' : 'w-2 bg-slate-700 hover:bg-slate-500'}`} />
                         <button onClick={() => setActiveFounder(1)} className={`h-1.5 rounded-full transition-all duration-500 ${activeFounder === 1 ? 'w-6 bg-orange-500' : 'w-2 bg-slate-700 hover:bg-slate-500'}`} />
                       </div>

                       <div className={`transition-all duration-700 flex flex-col items-center w-full ${activeFounder === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'}`}>
                         <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed mb-4 max-w-xl mx-auto text-center italic">
                           "Infrastructure is no longer a backend requirement; it is the frontline of enterprise competitiveness. We engineer environments that anticipate scale, inherently resist threats, and align precisely with executive financial objectives."
                         </p>
                         <p className="text-slate-500 text-[10px] font-light mx-auto text-center max-w-md">Over 25 years of extensive experience in US Healthcare Global Service Delivery and Technology Architecture.</p>
                       </div>

                       <div className={`transition-all duration-700 flex flex-col items-center w-full ${activeFounder === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'}`}>
                         <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed mb-4 max-w-xl mx-auto text-center italic">
                           "Zero-trust isn't a product you install; it's a philosophy you architect. Our mission is to ensure every packet of data across our clients' networks is authenticated, verified, and fundamentally secure."
                         </p>
                         <p className="text-slate-500 text-[10px] font-light mx-auto text-center max-w-md">Over 24 years of comprehensive expertise in Budgeting, Forecasting, Process Improvement, and Risk Control.</p>
                       </div>
                     </div>
                   </div>
                 </div>
              </section>

              <section className="w-full py-16 md:py-20 bg-[#050706] px-[3vw] relative z-10 border-t border-white/5 flex flex-col items-center text-center">
                <div className="w-full max-w-[800px] mx-auto bg-white/5 rounded-2xl p-8 md:p-10 text-center border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden reveal flex flex-col items-center cursor-default">
                  <div className="absolute -top-32 -right-32 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />
                  <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] bg-yellow-500/10 rounded-full blur-[60px] pointer-events-none" />
                  
                  <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight mb-4 relative z-10 mx-auto text-center">
                    Ready to Rebuild Your <br className="hidden md:block" /> Infrastructure?
                  </h2>
                  <p className="text-slate-400 text-xs md:text-sm mb-6 max-w-md mx-auto relative z-10 font-light leading-relaxed text-center">
                    Stop letting legacy technology hold your business back. Schedule a deep-dive technical consultation with our engineering architects today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10 w-full mx-auto">
                    <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-[#070b0a] font-bold text-[11px] tracking-wider uppercase px-6 py-3 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                      Start Your Assessment
                    </button>
                    <button className="bg-transparent border border-white/20 hover:border-orange-500 text-white hover:text-orange-400 font-bold text-[11px] tracking-wider uppercase px-6 py-3 rounded-lg transition-all duration-300 backdrop-blur-md hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </>
        ) : currentView === 'careers' ? (
          <CareersPage />
        ) : currentView === 'investors' ? (
          <InvestorsPage />
        ) : currentView === 'privacy' ? (
          <LegalPage title="Privacy Policy" />
        ) : currentView === 'terms' ? (
          <LegalPage title="Terms of Service" />
        ) : currentView === 'cookies' ? (
          <LegalPage title="Cookie Policy" />
        ) : currentView === 'about' ? (
          <BasicPage subtitle="Company" title="About Technimation" desc="Our mission, history, and the engineering principles that guide us." />
        ) : currentView === 'leadership' ? (
          <BasicPage subtitle="Company" title="Leadership Team" desc="Meet the visionaries engineering the future of enterprise tech." />
        ) : currentView === 'network' ? (
          <BasicPage subtitle="Company" title="Global Infrastructure" desc="Explore our planetary-scale data nodes and edge locations." />
        ) : currentView === 'cloud' ? (
          <BasicPage subtitle="Solutions" title="Cloud Scaling" desc="Multi-region active-active architectures designed for zero downtime." />
        ) : currentView === 'security' ? (
          <BasicPage subtitle="Solutions" title="Zero-Trust Security" desc="Identity-first perimeter lockdown and continuous threat hunting." />
        ) : currentView === 'aiops' ? (
          <BasicPage subtitle="Solutions" title="AIOps & Automation" desc="Machine learning driven anomaly detection and automated remediation." />
        ) : currentView === 'edge' ? (
          <BasicPage subtitle="Solutions" title="Edge Computing" desc="Ultra-low latency global data nodes pushed to the absolute edge." />
        ) : currentView === 'framework' ? (
          <BasicPage subtitle="Solutions" title="The T.E.C.H. Framework" desc="Discover how we engineer digital resilience with our proprietary enterprise methodology." />
        ) : currentView === 'docs' ? (
          <BasicPage subtitle="Insights" title="Documentation" desc="Technical API references, deployment guides, and integration specifications." />
        ) : currentView === 'whitepapers' ? (
          <BasicPage subtitle="Insights" title="Whitepapers" desc="Deep-dive architectural analyses and thought leadership." />
        ) : currentView === 'cases' ? (
          <BasicPage subtitle="Insights" title="Case Studies" desc="Explore how we have engineered massive infrastructure transformations." />
        ) : currentView === 'api' ? (
          <BasicPage subtitle="Insights" title="API Reference" desc="REST and GraphQL endpoints for integrating directly with our AIOps telemetry." />
        ) : currentView === 'status' ? (
          <BasicPage subtitle="Insights" title="System Status" desc="Live uptime metrics and operational status reports for all global nodes." />
        ) : currentView === 'financial' ? (
          <BasicPage subtitle="Case Studies" title="Financial Services" desc="Securing high-frequency trading and fintech infrastructures." />
        ) : currentView === 'healthcare' ? (
          <BasicPage subtitle="Case Studies" title="Healthcare & Life Sciences" desc="HIPAA compliant zero-trust architectures for patient data." />
        ) : currentView === 'retail' ? (
          <BasicPage subtitle="Case Studies" title="Retail & E-Commerce" desc="Black Friday scale infrastructure with auto-scaling edge nodes." />
        ) : currentView === 'manufacturing' ? (
          <BasicPage subtitle="Case Studies" title="Manufacturing" desc="IoT telemetry and automated factory network routing." />
        ) : null}

        {}
        <footer className="w-full bg-[#050706] border-t border-white/10 pt-16 pb-8 px-[3vw] relative z-20 overflow-hidden text-center md:text-left">
          <div className="w-full max-w-[1000px] mx-auto grid grid-cols-2 lg:grid-cols-10 gap-8 mb-12">
            
            <div className="col-span-2 lg:col-span-4 flex flex-col items-center md:items-start pr-0 lg:pr-8">
              <img src={logoSrc} alt="Technimation InfoMedia" className="h-[36px] mb-5 object-contain cursor-pointer" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} />
              <p className="text-slate-400 text-[10px] md:text-xs font-light leading-relaxed mb-6 max-w-[280px] text-center md:text-left">
                Engineering resilient, scalable IT environments to eliminate bottlenecks and mitigate enterprise risks globally. Transforming legacy infrastructure into exponential growth.
              </p>
              
              <div className="w-full mb-6 flex flex-col items-center md:items-start">
                <h4 className="text-white text-[9px] font-bold uppercase tracking-widest mb-2.5">Subscribe to Insights</h4>
                <div className="relative w-full max-w-[260px]">
                  <input 
                    type="email" 
                    placeholder="Enter business email" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-3 pr-20 py-2 text-[11px] text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                  <button className="absolute right-1 top-1 bottom-1 bg-orange-500 hover:bg-orange-400 text-[#050706] text-[9px] font-bold px-3 rounded-md transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2 flex flex-col items-center md:items-start">
              <h4 className="text-white text-xs font-bold mb-4 tracking-wide">Company</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { name: 'About Technimation', action: () => navigateTo('home', 'about') },
                  { name: 'Leadership Team', action: () => navigateTo('home', 'leadership') },
                  { name: 'Global Infrastructure', action: () => navigateTo('home', 'network') },
                  { name: 'Investor Relations', action: () => navigateTo('investors') },
                  { name: 'Careers', action: () => navigateTo('careers') }
                ].map((link) => (
                  <li key={link.name} className="group flex items-center justify-center md:justify-start">
                    <ArrowRight size={10} className="text-orange-500 mr-1.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 hidden md:block" />
                    <a href="#" onClick={(e) => { e.preventDefault(); link.action(); }} className="text-slate-400 hover:text-white text-[11px] font-light transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 lg:col-span-2 flex flex-col items-center md:items-start">
              <h4 className="text-white text-xs font-bold mb-4 tracking-wide">Solutions</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { name: 'Enterprise Architecture', hash: 'framework' },
                  { name: 'Cloud Migration', hash: 'cloud' },
                  { name: 'Zero-Trust Security', hash: 'security' },
                  { name: 'AIOps & Automation', hash: 'aiops' },
                  { name: 'Edge Computing Nodes', hash: 'edge' }
                ].map((link) => (
                  <li key={link.name} className="group flex items-center justify-center md:justify-start">
                    <ArrowRight size={10} className="text-orange-500 mr-1.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 hidden md:block" />
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home', link.hash); }} className="text-slate-400 hover:text-white text-[11px] font-light transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-2 flex flex-col items-center md:items-start mt-4 lg:mt-0">
              <h4 className="text-white text-xs font-bold mb-4 tracking-wide">Resources</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { name: 'Documentation', action: () => navigateTo('docs') },
                  { name: 'Whitepapers', action: () => navigateTo('whitepapers') },
                  { name: 'Case Studies', action: () => navigateTo('cases') },
                  { name: 'API Reference', action: () => navigateTo('api') },
                  { name: 'System Status', action: () => navigateTo('status') }
                ].map((link) => (
                  <li key={link.name} className="group flex items-center justify-center md:justify-start">
                    <ArrowRight size={10} className="text-orange-500 mr-1.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 hidden md:block" />
                    <a href="#" onClick={(e) => { e.preventDefault(); link.action(); }} className="text-slate-400 hover:text-white text-[11px] font-light transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
          
          <div className="w-full max-w-[1000px] mx-auto border-t border-white/10 pt-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-slate-500 text-[9px] md:text-[10px] font-light">
               <p>© 2026 Technimation InfoMedia Pvt. Ltd.</p>
               <span className="flex items-center gap-1 hidden md:flex"><MapPin size={10} className="text-orange-500"/> Pune, Maharashtra, India 411014</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-5">
              {[
                { name: 'Privacy Policy', action: () => navigateTo('privacy') },
                { name: 'Terms of Service', action: () => navigateTo('terms') },
                { name: 'Cookie Settings', action: () => navigateTo('cookies') }
              ].map((link) => (
                <a key={link.name} href="#" onClick={(e) => { e.preventDefault(); link.action(); }} className="text-slate-500 hover:text-white text-[9px] md:text-[10px] font-light transition-colors">{link.name}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
