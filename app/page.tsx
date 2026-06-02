'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Utensils, Flame, Timer, ShieldCheck, Mail, MapPin, 
  ArrowRight, CheckCheck, Loader2, Menu, X, Instagram, 
  ImageOff, Phone, Smile, Zap, Building2
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: oversized

// --- CONSTANTS ---

const BRAND = {
  name: "Zeeny's Bite",
  tagline: "The Best Bite for Every Occasion",
  description: "Premium event catering in Enugu specializing in authentic smoky jollof, artisan small chops, and gourmet food bowls for celebrations of all sizes.",
  industry: "Food",
  region: "Nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1555244162-803834f70033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  gallery: [
    "https://images.unsplash.com/photo-1665332195309-9d75071138f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1763048443535-1243379234e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1664334997177-6ae654a62735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1664992960082-0ea299a9c53e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1664334996736-ff70477e00d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1664334996269-54ca4fb9a168?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ]
};

// --- HOOKS ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 55) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text]);
  return display;
};

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: 'Home', href: '#hero' },
    { name: 'Menu', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-accent flex items-center justify-center font-bold text-black rounded-lg group-hover:rotate-6 transition-transform">ZB</div>
          <span className="font-heading text-2xl font-bold tracking-tight text-white uppercase italic">Zeeny's Bite</span>
        </a>
        <div className="hidden md:flex gap-8 items-center">
          {links.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-white/80 hover:text-accent transition-colors uppercase tracking-widest">{link.name}</a>
          ))}
          <a href="#contact" className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-accent transition-all">Order Now</a>
        </div>
        <button onClick={() => setOpen(true)} className="md:hidden text-white"><Menu size={28} /></button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-primary z-[110] transition-transform duration-500 transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
             <div className="w-10 h-10 bg-accent flex items-center justify-center font-bold text-black rounded-lg">ZB</div>
             <button onClick={() => setOpen(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-6">
            {links.map(link => (
              <a key={link.name} onClick={() => setOpen(false)} href={link.href} className="text-4xl font-heading font-bold text-white uppercase">{link.name}</a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/10">
            <a href="#contact" onClick={() => setOpen(false)} className="block w-full bg-accent text-black text-center py-5 rounded-2xl font-bold text-lg">Order for Your Event</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function Home() {
  const typedTagline = useTypewriter(BRAND.tagline);
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <main>
      <Navbar />

      {/* HERO SECTION - HR-D */}
      <section id="hero" className="min-h-screen flex flex-col justify-center bg-black px-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-30 grayscale mix-blend-screen pointer-events-none">
          <SafeImage src={IMAGES.hero} alt={BRAND.name} fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto w-full pt-20">
          <h1 className="font-heading text-[14vw] md:text-[8vw] font-black text-white leading-none tracking-tighter uppercase italic">
            {typedTagline}<span className="text-accent animate-pulse">_</span>
          </h1>
          <div className={`mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10 pt-8 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={heroReveal.ref}>
            <p className="text-white/50 text-lg md:text-xl max-w-sm leading-relaxed">
              {BRAND.description}
            </p>
            <a href="#contact" className="bg-accent text-black px-12 py-5 font-black text-lg shadow-[6px_6px_0px_rgba(178,66,29,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_rgba(178,66,29,1)] transition-all duration-200 shrink-0 uppercase tracking-tight">
              Order for Your Event
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - F-ICON-GRID */}
      <section id="features" ref={featuresReveal.ref} className="py-28 px-6 bg-[#F5F2ED]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="font-heading text-5xl md:text-7xl font-black text-primary uppercase italic leading-none">Why Choose Zeeny's</h2>
              <p className="text-primary/60 mt-4 text-xl">The secret ingredient is excellence</p>
            </div>
            <div className="h-px bg-primary/20 flex-1 mx-8 hidden md:block mb-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Authentic Smoky Taste", desc: "We preserve the traditional firewood flavor in every single pot of jollof.", icon: Flame },
              { title: "Punctual Delivery", desc: "Your event timeline is sacred to us. We arrive hot and on time.", icon: Timer },
              { title: "Hygienic Preparation", desc: "Strict quality control from the market to your table.", icon: ShieldCheck }
            ].map((f, i) => (
              <div 
                key={i} 
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`p-10 rounded-3xl border border-primary/10 bg-white shadow-sm hover:shadow-xl transition-all duration-500 group ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              >
                <div className="mb-6 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <f.icon size={32} />
                </div>
                <h3 className="font-heading font-black text-primary text-2xl leading-tight uppercase italic">{f.title}</h3>
                <p className="text-zinc-600 mt-4 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER - D-STAT */}
      <div className="bg-primary py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center">
          {[
            { number: '500+', label: 'Events Catered' },
            { number: '10k+',  label: 'Happy Clients' },
            { number: '100%', label: 'Smoky Flavor' }
          ].map((s, i) => (
            <div key={i} className="px-8 py-8 md:py-4">
              <p className="text-5xl font-heading font-black text-white tracking-tighter italic">{s.number}</p>
              <p className="text-white/60 text-xs mt-2 font-bold uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS SECTION - P-STAGGER */}
      <section id="products" ref={productsReveal.ref} className="py-28 px-6 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-28">
          <div className="text-center">
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white leading-none italic uppercase">Menu Highlights</h2>
            <p className="text-white/40 mt-4 text-xl">Delicious options for every palate</p>
          </div>
          {[
            { name: "Smoky Jollof Party Tray", price: "₦18,500", desc: "Our signature firewood-flavored jollof rice served with proteins of choice.", img: IMAGES.gallery[0] },
            { name: "Deluxe Small Chops Box", price: "₦9,500", desc: "A curated selection of puff-puff, samosas, spring rolls, and peppered gizzards.", img: IMAGES.gallery[1] },
            { name: "Signature Grill Platter", price: "₦12,000", desc: "Flame-grilled chicken and spicy turkey seasoned with house-made spices.", img: IMAGES.gallery[3] },
            { name: "Premium Jollof Cups", price: "₦6,500", desc: "Individual portion-controlled cups perfect for corporate lunch meetings.", img: IMAGES.gallery[0] }
          ].map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[4/3] relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
                  <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className={`absolute -bottom-6 ${i % 2 === 0 ? '-right-6' : '-left-6'} w-1/2 h-1/2 bg-primary/20 rounded-full -z-10 blur-3xl`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-bold text-accent text-sm tracking-widest uppercase mb-4 block">0{i + 1} — Highlight</span>
                <h3 className="font-heading text-5xl md:text-6xl font-black text-white leading-none italic uppercase">{p.name}</h3>
                <p className="text-white/50 mt-6 text-xl leading-relaxed max-w-xl">{p.desc}</p>
                <div className={`mt-8 flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'items-end'}`}>
                  <span className="text-4xl font-heading font-black text-accent">{p.price}</span>
                  <a href="#contact" className="bg-primary text-white px-10 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:brightness-110 transition-all">Order Now</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION - V3 Split */}
      <section id="about" ref={aboutReveal.ref} className="min-h-[80vh] grid md:grid-cols-[1fr_1fr] bg-[#F5F2ED] overflow-hidden">
        <div className={`flex flex-col justify-center px-8 md:px-16 py-24 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <p className="text-primary font-bold text-sm tracking-[0.4em] uppercase mb-6">Our Culinary Journey</p>
          <h2 className="font-heading text-5xl md:text-[5.5rem] font-black text-primary leading-none italic uppercase">Taste the Fire</h2>
          <p className="text-zinc-600 mt-8 text-xl max-w-md leading-relaxed italic">
            Zeeny's Bite started with a simple passion: to bring the authentic taste of Nigerian celebrations to every home in Enugu. Sharp catering for Enugu's finest.
          </p>
          <div className="mt-16 grid grid-cols-2 gap-10 border-t border-primary/10 pt-10">
            <div className={`transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Utensils className="text-accent mb-4" size={32} />
              <p className="font-heading text-4xl font-black text-primary italic">500+</p>
              <p className="text-primary/40 text-xs uppercase font-bold tracking-widest mt-1">Events Catered</p>
            </div>
            <div className={`transition-all duration-1000 delay-450 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Smile className="text-accent mb-4" size={32} />
              <p className="font-heading text-4xl font-black text-primary italic">10k+</p>
              <p className="text-primary/40 text-xs uppercase font-bold tracking-widest mt-1">Happy Clients</p>
            </div>
          </div>
        </div>
        <div className={`relative min-h-[50vh] md:min-h-full transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <SafeImage src={IMAGES.gallery[4]} alt="Catering process" fill className="object-cover" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
        </div>
      </section>

      {/* GALLERY - Masonry */}
      <section id="gallery" ref={galleryReveal.ref} className="py-28 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white italic uppercase leading-none">Catering Gallery</h2>
            <p className="text-white/40 mt-4 text-xl">A feast for your eyes</p>
          </div>
          <div className={`columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 transition-all duration-1000 ${galleryReveal.isVisible ? 'max-w-full opacity-100' : 'max-w-0 opacity-0 overflow-hidden'}`}>
            {IMAGES.gallery.map((src, i) => (
              <div key={i} className="break-inside-avoid group relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <SafeImage src={src} alt={`Gallery ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-SLIDER */}
      <section id="testimonials" ref={testimonialReveal.ref} className="py-28 bg-accent/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white italic uppercase leading-none">What People Say</h2>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[
              { name: "Uchechi Okoro", text: "The smoky jollof is the best I've had in Enugu. My wedding guests couldn't stop talking about it!", role: "Wedding Client" },
              { name: "Emeka Nwosu", text: "Professional service and the small chops were fresh and crunchy. Highly recommend Zeeny's.", role: "Corporate Event Organizer" },
              { name: "Chinwe Madu", text: "Their food bowls are my go-to for weekend treats. Large portions and amazing taste.", role: "Loyal Customer" },
              { name: "Uchechi Okoro", text: "The smoky jollof is the best I've had in Enugu. My wedding guests couldn't stop talking about it!", role: "Wedding Client" },
              { name: "Emeka Nwosu", text: "Professional service and the small chops were fresh and crunchy. Highly recommend Zeeny's.", role: "Corporate Event Organizer" },
              { name: "Chinwe Madu", text: "Their food bowls are my go-to for weekend treats. Large portions and amazing taste.", role: "Loyal Customer" }
            ].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-sm">
                <div className="flex gap-1.5 mb-8">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-3 h-3 rounded-full bg-accent" />)}
                </div>
                <p className="text-white/80 text-xl leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-8">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl italic border-2 border-accent">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-white text-lg uppercase italic">{t.name}</p>
                    <p className="text-accent text-xs font-bold uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - C2 */}
      <section id="contact" ref={contactReveal.ref} className="py-28 px-6 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {sent ? (
              <div className="bg-zinc-900/80 backdrop-blur-3xl p-16 rounded-[3rem] border border-white/10 text-center animate-scaleIn">
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-8 border border-accent/40">
                  <CheckCheck size={48} className="text-accent" />
                </div>
                <h3 className="font-heading text-4xl font-black text-white uppercase italic mb-4">Message Sent</h3>
                <p className="text-white/60 text-lg">Thank you. Our kitchen team will review your inquiry and respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleForm} className="bg-zinc-900/60 backdrop-blur-3xl p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
                <h3 className="font-heading text-4xl font-black text-white uppercase italic mb-10">Book Your Bite</h3>
                <div className="space-y-4">
                  {(['name', 'email', 'phone'] as const).map(field => (
                    <input
                      key={field}
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={(form as any)[field]}
                      onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                      required={field !== 'phone'}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-lg outline-none transition-all duration-300 focus:bg-white/10 focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  ))}
                  <textarea rows={4} placeholder="Your event details..."
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-lg outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full mt-10 bg-accent text-black py-5 rounded-2xl font-black text-xl hover:brightness-110 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3 group uppercase italic">
                  {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" /></>}
                </button>
              </form>
            )}
          </div>
          <div className={`transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <h2 className="font-heading text-6xl md:text-[6.5rem] font-black text-white leading-[0.9] italic uppercase mb-12">Let's Cook Something Great</h2>
            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Call Us</p>
                  <p className="text-white text-2xl font-bold italic">+234 ENUGU BITE</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                  <MapPin size={28} />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Our Location</p>
                  <p className="text-white text-2xl font-bold italic">16 Ideani Mount Abani, Enugu</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                  <Instagram size={28} />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Follow Us</p>
                  <p className="text-white text-2xl font-bold italic">@zeenysbitefood.ng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <a href="#hero" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-accent flex items-center justify-center font-black text-black rounded-xl italic group-hover:scale-110 transition-transform">ZB</div>
              <span className="font-heading text-3xl font-black tracking-tight text-white uppercase italic">Zeeny's Bite</span>
            </a>
            <p className="text-white/40 leading-relaxed text-lg italic">
              Bringing premium catering and authentic smoky firewood flavor to the heart of Enugu celebrations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h4 className="font-heading text-xl font-black text-white uppercase italic mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#hero" className="text-white/40 hover:text-accent transition-colors">Home</a></li>
                <li><a href="#products" className="text-white/40 hover:text-accent transition-colors">Menu</a></li>
                <li><a href="#about" className="text-white/40 hover:text-accent transition-colors">Story</a></li>
                <li><a href="#contact" className="text-white/40 hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xl font-black text-white uppercase italic mb-6">Social</h4>
              <ul className="space-y-4">
                <li><a href="https://instagram.com/zeenysbitefood.ng" className="text-white/40 hover:text-accent transition-colors flex items-center gap-2">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-sm font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Zeeny's Bite. All Rights Reserved.</p>
          <p>Handcrafted for Enugu's Finest celebrations.</p>
        </div>
      </footer>
    </main>
  );
}