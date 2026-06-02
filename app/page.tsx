'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Flame, 
  UtensilsCrossed, 
  Leaf, 
  Truck, 
  Phone, 
  Instagram, 
  Mail, 
  MapPin, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  ImageOff, 
  Users, 
  Coffee, 
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-QUOTE
// Typography Personality: oversized

// --- CONSTANTS ---
const BRAND = {
  name: "Zeeny's Bite",
  tagline: "The Best Bite for Every Occasion",
  description: "Enugu's premier event catering service specializing in authentic smoky jollof, signature grills, and luxury small chops that transform every gathering into a feast.",
  industry: "Food & Catering",
  region: "Nigeria"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070",
  products: [
    "https://images.unsplash.com/photo-1533606117812-0783e8e690f1?q=80&w=1000",
    "https://images.unsplash.com/photo-1773040835762-ace903c83f36?q=80&w=1000",
    "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=1000",
    "https://images.unsplash.com/photo-1665332195309-9d75071138f0?q=80&w=1000"
  ],
  process: "https://images.unsplash.com/photo-1526016650454-68a6f488910a?q=80&w=1000"
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
  }, [threshold]);
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
  }, [text, speed]);
  return display;
};

// --- COMPONENTS ---
function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill} 
      width={!fill ? (width ?? 800) : undefined} 
      height={!fill ? (height ?? 600) : undefined} 
      className={className} 
      priority={priority} 
      onError={() => setError(true)} 
    />
  );
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-accent/95 backdrop-blur-xl shadow-xl py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg font-heading text-2xl font-black text-secondary">Z</div>
          <span className="font-heading text-2xl font-bold tracking-tighter text-white">ZEENY'S BITE</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Menu', 'About', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-secondary/70 hover:text-primary font-medium text-sm tracking-widest uppercase transition-colors">
              {link}
            </a>
          ))}
          <a href="#contact" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all">
            Book Now
          </a>
        </div>

        <button className="md:hidden text-secondary" onClick={() => setMobileOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-accent z-50 transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <span className="font-heading text-2xl font-bold text-white uppercase italic">Zeeny's Bite</span>
          <button onClick={() => setMobileOpen(false)} className="text-white"><X size={32} /></button>
        </div>
        <div className="flex flex-col items-center justify-center h-[70vh] gap-8">
          {['Menu', 'About', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="text-white text-4xl font-heading font-black italic">
              {link}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-8 bg-primary text-white px-12 py-4 rounded-full font-bold text-lg">
            Order Now
          </a>
        </div>
      </div>
    </nav>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-accent/20 rounded-3xl border border-white/10 relative overflow-hidden h-full min-h-[400px]">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 border border-primary/40 relative z-10">
          <CheckCheck size={32} className="text-primary" />
        </div>
        <h3 className="font-heading text-3xl font-black text-white mb-3">Order Received!</h3>
        <p className="text-white/60 max-w-sm text-lg">We'll contact you shortly to confirm your booking. Sharp sharp!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-accent p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="font-heading text-2xl font-bold text-white mb-8">Secure Your Date</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <textarea 
            rows={4} 
            placeholder="Event details (Date, Pax, Type of Food)"
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none resize-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-8 bg-primary text-white py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all disabled:opacity-60 flex justify-center items-center gap-3 group">
          {loading ? <Loader2 className="animate-spin" size={20} /> : <>Book Catering <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
        </button>
      </div>
    </form>
  );
};

export default function Page() {
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const typedText = useTypewriter("Experience The Best Bite in Enugu");

  return (
    <main className="bg-secondary">
      <Navbar />

      {/* HERO-D SECTION */}
      <section id="hero" className="min-h-screen flex flex-col justify-center bg-accent px-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
           <SafeImage src={IMAGES.hero} alt="Nigerian catering" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <h1 className="font-heading text-[12vw] md:text-[8vw] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
            {typedText}<span className="text-primary animate-pulse">_</span>
          </h1>
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-t border-white/10 pt-10">
            <p className="text-white/50 text-lg md:text-xl max-w-md leading-relaxed animate-slideUp">
              From smoky jollof to gourmet small chops, we bring the flavor that keeps your guests talking across Enugu.
            </p>
            <div className="flex gap-4">
              <a href="#contact" className="bg-primary text-white px-10 py-5 font-black text-lg shadow-[6px_6px_0px_rgba(255,255,255,0.15)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_rgba(255,255,255,0.15)] transition-all shrink-0 uppercase italic">
                Book Event
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* F-ICON-GRID: The Standards */}
      <section ref={featuresReveal.ref} className="py-28 px-6 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`font-heading text-5xl md:text-7xl font-black text-accent uppercase tracking-tighter transition-all duration-700 ${featuresReveal.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
              The Zeeny Standards
            </h2>
            <div className="h-2 w-24 bg-primary mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Authentic Smoke", desc: "Traditional firewood techniques for that signature party flavor.", icon: <Flame /> },
              { title: "Bespoke Menus", desc: "Tailored catering packages designed to fit any budget.", icon: <UtensilsCrossed /> },
              { title: "Premium Sourcing", desc: "The freshest ingredients from local Enugu markets.", icon: <Leaf /> },
              { title: "Sharp Delivery", desc: "Hot, fresh, and on-time service across the coal city.", icon: <Truck /> }
            ].map((f, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`p-10 rounded-2xl border border-accent/5 bg-white group hover:bg-primary transition-all duration-500 cursor-default ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="mb-6 text-primary group-hover:text-white transition-colors">
                  {React.cloneElement(f.icon as React.ReactElement, { size: 40 })}
                </div>
                <h3 className="font-heading font-black text-accent group-hover:text-white text-2xl leading-tight uppercase italic">{f.title}</h3>
                <p className="text-accent/60 group-hover:text-white/80 text-sm mt-3 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* P-ASYMMETRIC: Our Signature Menu */}
      <section id="menu" ref={productsReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
            <h2 className="font-heading text-6xl md:text-8xl font-black text-accent max-w-xl leading-[0.8] uppercase italic">Our Signature Menu</h2>
            <p className="text-accent/50 max-w-xs text-lg font-medium">Carefully crafted delicacies for your next celebration in Enugu.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Featured Item */}
            <div className={`md:col-span-7 group relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="relative h-[500px]">
                <SafeImage src={IMAGES.products[0]} alt="Smoky Jollof" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/20 to-transparent" />
                <div className="absolute bottom-0 p-10 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="bg-primary text-white px-4 py-1 text-xs font-black uppercase tracking-widest italic mb-3 inline-block">Best Seller</span>
                      <h3 className="font-heading text-5xl font-black text-white uppercase italic">Smoky Jollof Party Pack</h3>
                      <p className="text-white/70 mt-3 max-w-sm">Authentic firewood smoky jollof rice served with peppered proteins and plantain.</p>
                    </div>
                    <span className="text-primary font-heading text-4xl font-black shrink-0">₦18,500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Items */}
            <div className="md:col-span-5 grid grid-rows-2 gap-6">
              {[
                { name: "Deluxe Small Chops", price: "₦8,500", img: IMAGES.products[1] },
                { name: "Signature Grill Platter", price: "₦14,000", img: IMAGES.products[2] }
              ].map((p, i) => (
                <div key={i} 
                  style={{ transitionDelay: `${i * 300}ms` }}
                  className={`group relative rounded-3xl overflow-hidden shadow-xl transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                  <div className="relative h-[238px]">
                    <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-accent/60 group-hover:bg-accent/40 transition-colors" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="font-heading text-2xl font-black text-white uppercase italic">{p.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-primary font-heading text-xl font-bold">{p.price}</span>
                        <a href="#contact" className="text-xs font-black text-white/60 hover:text-primary transition-colors tracking-widest uppercase">Order Now →</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* D-QUOTE DIVIDER */}
      <div className="py-24 px-8 text-center bg-primary border-y border-accent/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(62,39,35,0.2),transparent_70%)]" />
        <p className="relative font-heading text-4xl md:text-6xl font-black text-secondary max-w-4xl mx-auto leading-tight uppercase italic">
          &ldquo;THE BEST BITE FOR EVERY OCCASION IN ENUGU.&rdquo;
        </p>
        <p className="relative text-secondary/40 mt-5 text-sm tracking-[0.5em] uppercase font-black">ZEENY'S BITE SPECIALS</p>
      </div>

      {/* PROCESS: The Art of Smoke */}
      <section ref={processReveal.ref} className="py-28 px-6 bg-accent text-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${processReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <h2 className="font-heading text-6xl font-black mb-8 leading-[0.9] uppercase italic">The Art of the Smoke</h2>
              <p className="text-white/50 text-xl mb-12 max-w-md">How we create the perfect party jollof: Sourcing premium grains, the slow-fire technique, and our secret spice blend.</p>
              
              <div className="space-y-10">
                {[
                  { n: "01", t: "Grain Selection", d: "We source only premium long-grain parboiled rice for that perfect texture." },
                  { n: "02", t: "Slow Fire Wood", d: "A 4-hour slow cooking process over local hardwood creates the aroma." },
                  { n: "03", t: "The Secret Blend", d: "Hand-ground spices and local peppers for that deep, rich Enugu flavor." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <span className="font-heading text-4xl font-black text-primary italic leading-none">{step.n}</span>
                    <div>
                      <h4 className="font-heading text-2xl font-bold uppercase tracking-tight mb-1 group-hover:text-primary transition-colors">{step.t}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000 delay-300 ${processReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <SafeImage src={IMAGES.process} alt="Chef cooking jollof" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT: Stats */}
      <section id="about" ref={aboutReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-6xl font-black text-accent mb-8 uppercase italic">Crafting Memories Through Food</h2>
          <p className="text-accent/60 text-xl leading-relaxed max-w-3xl mx-auto mb-16 font-medium">
            Zeeny's Bite started with a simple mission: to bring authentic, high-quality Nigerian party flavors to every doorstep in Enugu. We believe every event deserves the 'Best Bite'.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { num: "1.2k+", label: "Events Catered", icon: <Users /> },
              { num: "15k+", label: "Jollof Cups Sold", icon: <Coffee /> },
              { num: "100%", label: "Freshness Guarantee", icon: <CheckCircle /> }
            ].map((s, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 200}ms` }}
                className={`p-10 rounded-3xl bg-white border border-accent/5 shadow-xl transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="text-primary mb-4 flex justify-center">{React.cloneElement(s.icon as React.ReactElement, { size: 40 })}</div>
                <p className="font-heading text-5xl font-black text-accent tracking-tighter italic">{s.num}</p>
                <p className="text-accent/40 text-xs font-black uppercase tracking-widest mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* T-SLIDER: Testimonials */}
      <section ref={testimonialReveal.ref} className="py-28 bg-accent overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex items-center justify-between">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase italic">Guest Reviews</h2>
          <div className="hidden md:flex gap-2">
            {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-primary" />)}
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[
              { name: "Chika Okoro", text: "The smoky jollof was the highlight of my wedding. Every guest was asking for the caterer's number!", role: "Bride" },
              { name: "Amaka Eze", text: "The small chops were fresh and crispy. Best platter I've had in Enugu so far.", role: "Event Planner" },
              { name: "Emeka Nwosu", text: "Professional service and incredible food bowls. Highly recommend Zeeny's for corporate lunches.", role: "Director, TechHub" },
              { name: "Chika Okoro", text: "The smoky jollof was the highlight of my wedding. Every guest was asking for the caterer's number!", role: "Bride" },
              { name: "Amaka Eze", text: "The small chops were fresh and crispy. Best platter I've had in Enugu so far.", role: "Event Planner" },
              { name: "Emeka Nwosu", text: "Professional service and incredible food bowls. Highly recommend Zeeny's for corporate lunches.", role: "Director, TechHub" }
            ].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-white/5 border border-white/10 rounded-[2rem] p-10 transition-all hover:bg-white/10 hover:border-primary/50">
                <p className="text-white/80 text-lg leading-relaxed italic mb-8 font-medium">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-heading text-2xl font-black italic">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-xl uppercase italic">{t.name}</p>
                    <p className="text-primary text-xs font-black uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C4: CONTACT SECTION */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-20" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-[12vw] md:text-[8vw] font-black text-accent leading-[0.8] mb-12 uppercase italic">
              Secure <br/> Your Date
            </h2>
            <div className="space-y-8 border-l-8 border-accent/20 pl-8">
              <div className="flex items-center gap-4 text-accent group">
                <div className="w-12 h-12 bg-accent text-white flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-accent/50 text-xs font-black uppercase tracking-widest">Call or WhatsApp</p>
                  <p className="text-2xl font-heading font-black">+234 809 239 0623</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-accent group">
                <div className="w-12 h-12 bg-accent text-white flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                  <Instagram size={24} />
                </div>
                <div>
                  <p className="text-accent/50 text-xs font-black uppercase tracking-widest">Instagram</p>
                  <p className="text-2xl font-heading font-black">@zeenysbitefood.ng</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-accent group">
                <div className="w-12 h-12 bg-accent text-white flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-accent/50 text-xs font-black uppercase tracking-widest">Office Address</p>
                  <p className="text-lg font-bold leading-tight">16 Ideani Mount Abani road, Enugu, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER F2 */}
      <footer className="bg-accent py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg font-heading text-2xl font-black text-secondary">Z</div>
                <span className="font-heading text-3xl font-bold tracking-tighter text-white uppercase italic">ZEENY'S BITE</span>
              </div>
              <p className="text-white/40 max-w-sm mb-8 leading-relaxed font-medium">
                Enugu's premier catering service. We bring the smoke, the flavor, and the vibes to every event. Sharp delivery across the coal city.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-heading text-xl font-bold text-white mb-6 uppercase italic">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'Menu', 'About', 'Contact'].map(l => (
                  <li key={l}><a href={`#${l.toLowerCase()}`} className="text-white/40 hover:text-primary transition-colors text-sm uppercase font-black tracking-widest">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xl font-bold text-white mb-6 uppercase italic">Our Service</h4>
              <ul className="space-y-4">
                <li className="text-white/40 text-sm font-medium">Wedding Catering</li>
                <li className="text-white/40 text-sm font-medium">Corporate Lunch</li>
                <li className="text-white/40 text-sm font-medium">Birthday Platters</li>
                <li className="text-white/40 text-sm font-medium">Small Chop Boxes</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em]">
              &copy; {new Date().getFullYear()} ZEENY'S BITE. ALL RIGHTS RESERVED.
            </p>
            <p className="text-white/20 text-xs font-black uppercase tracking-widest italic">
              Sharp delivery nationwide.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}