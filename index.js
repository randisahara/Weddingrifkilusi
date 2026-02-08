import React, { useState, useEffect, useRef } from 'react';
import { Heart, MapPin, Calendar, Clock, Music, Pause, Play, Home, User, Map as MapIcon, Grid } from 'lucide-react';

// --- KONFIGURASI ---
const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=wedding-cinematic-126649.mp3";

const WeddingInvitation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const audioRef = useRef(null);
  
  // Target Date: 15 Feb 2025, 08:00 AM
  const targetDate = new Date('2025-02-15T08:00:00').getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const openInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
    setTimeout(() => {
        if(audioRef.current) audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }, 500);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openMap = () => {
    const address = "Jln.Burujul,Desa.Sirnagalih,Rt/Rw:04/01 Kec.Bantarkalong,Kab.Tasikmalaya";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#111] font-sans text-gray-200 overflow-hidden relative selection:bg-[#D4AF37] selection:text-black pb-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Great+Vibes&family=Urbanist:wght@300;400;600&display=swap');
        
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-title { font-family: 'Cinzel', serif; }
        .font-body { font-family: 'Urbanist', sans-serif; }
        
        .gold-gradient {
          background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .gold-border {
            border: 1px solid transparent;
            background-image: linear-gradient(#111, #111), linear-gradient(to right, #bf953f, #aa771c);
            background-origin: border-box;
            background-clip: content-box, border-box;
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .animate-spin-slow {
            animation: spin 8s linear infinite;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* Bottom Nav Active State */
        .nav-item.active {
            color: #D4AF37;
        }
        .nav-item.active::after {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #D4AF37;
        }
      `}</style>

      {/* Audio Element */}
      <audio ref={audioRef} loop src={MUSIC_URL} />

      {/* --- COVER OVERLAY (MODAL) --- */}
      <div 
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-between bg-black transition-transform duration-1000 ease-in-out ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560982-1927bb5a6271?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80"></div>
        
        <div className="relative z-10 w-full pt-20 px-6 text-center animate-fade-in-down">
             <p className="font-title text-sm tracking-[0.3em] text-white/80 mb-4">THE WEDDING OF</p>
             <h1 className="font-script text-6xl text-[#D4AF37] drop-shadow-lg">Lusi & Rifki</h1>
        </div>

        <div className="relative z-10 w-full pb-16 px-6 text-center">
            <div className="glass-panel p-6 rounded-2xl mx-auto max-w-xs mb-8 border-t border-[#D4AF37]/50 shadow-2xl">
                <p className="text-xs text-gray-400 tracking-widest mb-3 uppercase">Kepada Yth.</p>
                <h3 className="text-xl font-bold font-title text-white mb-4">Tamu Undangan</h3>
                <button 
                    onClick={openInvitation}
                    className="w-full py-3 bg-[#D4AF37] text-black font-bold text-sm tracking-widest rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                    <Music size={14} /> BUKA UNDANGAN
                </button>
            </div>
        </div>
      </div>

      {/* --- FLOATING MUSIC BUTTON --- */}
      <div className={`fixed top-6 right-6 z-50 transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={toggleMusic}
            className={`w-10 h-10 rounded-full flex items-center justify-center border border-[#D4AF37] bg-black/50 backdrop-blur-md text-[#D4AF37] ${isPlaying ? 'animate-spin-slow' : ''}`}
          >
            {isPlaying ? <Music size={16} /> : <Pause size={16} />}
          </button>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>

        {/* 1. HERO SECTION (HOME) */}
        <section id="home" className="min-h-screen relative flex items-center justify-center py-20 bg-[#111]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560982-1927bb5a6271?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-transparent to-[#111]"></div>
            
            <div className="relative z-10 text-center px-6">
                <p className="font-title text-[#D4AF37] text-sm tracking-[0.4em] mb-6">WALIMATUL 'URSY</p>
                
                {/* Image Frame */}
                <div className="w-64 h-80 mx-auto mb-8 p-1 border border-[#D4AF37]/30 rounded-t-full rounded-b-none relative">
                     <div className="absolute -inset-2 border border-[#D4AF37]/20 rounded-t-full rounded-b-none -z-10"></div>
                     <img src="https://images.unsplash.com/photo-1623164228913-c2a41d3d6232?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover rounded-t-full" alt="Couple" />
                </div>

                <h1 className="font-script text-6xl gold-gradient mb-2">Lusi & Rifki</h1>
                <p className="font-body text-gray-400 text-sm tracking-widest mb-8">MINGGU, 15 FEBRUARI 2025</p>

                {/* Countdown Box */}
                <div className="glass-panel p-4 rounded-xl inline-flex gap-4 border-t border-[#D4AF37]/30">
                    {[
                        { label: 'HARI', value: timeLeft.days },
                        { label: 'JAM', value: timeLeft.hours },
                        { label: 'MENIT', value: timeLeft.minutes },
                    ].map((item, idx) => (
                        <div key={idx} className="text-center px-2">
                            <span className="block text-xl font-bold text-white">{item.value}</span>
                            <span className="text-[10px] text-[#D4AF37]">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* 2. MEMPELAI SECTION */}
        <section id="mempelai" className="py-24 bg-[#0a0a0a] relative">
            <div className="container mx-auto px-6">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/27/Basmala.svg" className="h-10 mx-auto mb-12 filter invert opacity-50" alt="Bismillah" />
                
                <h2 className="font-title text-center text-2xl text-[#D4AF37] mb-12 tracking-[0.2em]">MEMPELAI</h2>

                {/* Card Lusi */}
                <div className="glass-panel p-8 rounded-2xl mb-8 flex flex-col items-center text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 rounded-bl-full -mr-4 -mt-4"></div>
                    <div className="w-32 h-32 rounded-full border-2 border-[#D4AF37] p-1 mb-4">
                        <img src="https://images.unsplash.com/photo-1532452119098-a3650b3c46d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-full h-full rounded-full object-cover" alt="Lusi" />
                    </div>
                    <h3 className="font-script text-4xl text-[#D4AF37] mb-2">Lusi Rahmawati</h3>
                    <p className="font-title text-sm font-bold mb-4">Putri</p>
                    <p className="font-body text-gray-400 text-sm">Bapak Ujang Atang & Ibu Wiwin</p>
                </div>

                {/* Divider */}
                <div className="text-center text-4xl font-script text-[#D4AF37]/50 my-6">&</div>

                {/* Card Rifki */}
                <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-[#D4AF37]/10 rounded-br-full -ml-4 -mt-4"></div>
                    <div className="w-32 h-32 rounded-full border-2 border-[#D4AF37] p-1 mb-4">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-full h-full rounded-full object-cover" alt="Rifki" />
                    </div>
                    <h3 className="font-script text-4xl text-[#D4AF37] mb-2">Rifki Firdaus</h3>
                    <p className="font-title text-sm font-bold mb-4">Putra</p>
                    <p className="font-body text-gray-400 text-sm">Bapak Deni & Ibu Kokoy</p>
                </div>
            </div>
        </section>

        {/* 3. ACARA SECTION */}
        <section id="acara" className="py-24 bg-[#111] relative">
            <div className="container mx-auto px-6">
                <h2 className="font-title text-center text-2xl text-[#D4AF37] mb-12 tracking-[0.2em]">RANGKAIAN ACARA</h2>

                <div className="relative border-l border-[#D4AF37]/30 ml-4 md:ml-auto md:mr-auto md:w-full md:max-w-md space-y-12 pl-8 md:pl-0 md:border-l-0">
                    
                    {/* Akad */}
                    <div className="relative">
                        <div className="absolute -left-[41px] top-0 bg-[#D4AF37] w-6 h-6 rounded-full border-4 border-[#111] md:hidden"></div>
                        <div className="glass-panel p-6 rounded-xl border-l-4 border-[#D4AF37]">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-title text-xl font-bold text-white">Akad Nikah</h3>
                                <Heart size={20} className="text-[#D4AF37]" />
                            </div>
                            <div className="space-y-2 text-sm text-gray-300 font-body">
                                <p className="flex items-center gap-2"><Calendar size={14} className="text-[#D4AF37]"/> Minggu, 15 Februari 2025</p>
                                <p className="flex items-center gap-2"><Clock size={14} className="text-[#D4AF37]"/> Pukul 08.00 WIB</p>
                            </div>
                        </div>
                    </div>

                    {/* Resepsi */}
                    <div className="relative">
                        <div className="absolute -left-[41px] top-0 bg-[#D4AF37] w-6 h-6 rounded-full border-4 border-[#111] md:hidden"></div>
                        <div className="glass-panel p-6 rounded-xl border-l-4 border-[#D4AF37]">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-title text-xl font-bold text-white">Resepsi</h3>
                                <Music size={20} className="text-[#D4AF37]" />
                            </div>
                            <div className="space-y-2 text-sm text-gray-300 font-body">
                                <p className="flex items-center gap-2"><Calendar size={14} className="text-[#D4AF37]"/> Minggu, 15 Februari 2025</p>
                                <p className="flex items-center gap-2"><Clock size={14} className="text-[#D4AF37]"/> Pukul 11.00 WIB - Selesai</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* 4. LOKASI SECTION */}
        <section id="lokasi" className="py-24 bg-[#0a0a0a] text-center">
             <div className="container mx-auto px-6">
                <h2 className="font-title text-2xl text-[#D4AF37] mb-8 tracking-[0.2em]">LOKASI</h2>
                <p className="font-body text-gray-400 mb-8 max-w-md mx-auto">
                    Jln. Burujul, Desa Sirnagalih, Rt/Rw:04/01<br/>
                    Kec. Bantarkalong, Kab. Tasikmalaya
                </p>

                <div className="glass-panel p-2 rounded-xl max-w-lg mx-auto mb-8">
                     <iframe 
                        width="100%" 
                        height="250" 
                        style={{border:0, borderRadius: '8px', filter: 'grayscale(100%) invert(90%)'}}
                        loading="lazy" 
                        allowFullScreen 
                        src={`https://www.google.com/maps?q=Jln.Burujul,Desa.Sirnagalih,Rt/Rw:04/01+Kec.Bantarkalong,Kab.Tasikmalaya&output=embed`}>
                     </iframe>
                </div>

                <button 
                  onClick={openMap}
                  className="bg-[#D4AF37] text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-white transition-colors flex items-center justify-center gap-2 mx-auto text-sm tracking-widest"
                >
                  <MapPin size={16} /> BUKA GOOGLE MAPS
                </button>
             </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#111] py-8 text-center pb-32">
            <h2 className="font-script text-3xl text-[#D4AF37] opacity-50 mb-2">Lusi & Rifki</h2>
            <p className="text-[10px] text-gray-600 uppercase tracking-widest">Created with Love</p>
        </footer>

      </div>

      {/* --- BOTTOM NAVIGATION BAR (Signature Style) --- */}
      <div className={`fixed bottom-4 left-4 right-4 z-40 transition-transform duration-500 ${isOpen ? 'translate-y-0' : 'translate-y-[150%]'}`}>
          <div className="glass-panel rounded-full px-6 py-4 flex justify-between items-center shadow-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#D4AF37]/20">
              <button 
                onClick={() => scrollToSection('home')} 
                className={`nav-item relative flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-[#D4AF37]' : 'text-gray-500'}`}
              >
                  <Home size={20} strokeWidth={1.5} />
                  <span className="text-[10px] font-medium">Home</span>
              </button>
              
              <button 
                onClick={() => scrollToSection('mempelai')} 
                className={`nav-item relative flex flex-col items-center gap-1 transition-colors ${activeTab === 'mempelai' ? 'text-[#D4AF37]' : 'text-gray-500'}`}
              >
                  <User size={20} strokeWidth={1.5} />
                  <span className="text-[10px] font-medium">Mempelai</span>
              </button>

              <div className="w-px h-8 bg-[#D4AF37]/20"></div>

              <button 
                onClick={() => scrollToSection('acara')} 
                className={`nav-item relative flex flex-col items-center gap-1 transition-colors ${activeTab === 'acara' ? 'text-[#D4AF37]' : 'text-gray-500'}`}
              >
                  <Grid size={20} strokeWidth={1.5} />
                  <span className="text-[10px] font-medium">Acara</span>
              </button>

              <button 
                onClick={() => scrollToSection('lokasi')} 
                className={`nav-item relative flex flex-col items-center gap-1 transition-colors ${activeTab === 'lokasi' ? 'text-[#D4AF37]' : 'text-gray-500'}`}
              >
                  <MapIcon size={20} strokeWidth={1.5} />
                  <span className="text-[10px] font-medium">Lokasi</span>
              </button>
          </div>
      </div>

    </div>
  );
};

export default WeddingInvitation;

