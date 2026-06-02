'use client';
import { useState, useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import Image from 'next/image';

const useScrollReveal = (threshold = 0.15) => {
  const [v, setV] = useState(false); const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold });
    if (ref.current) o.observe(ref.current); return () => o.disconnect();
  }, []); return { ref, v };
};

function SafeImage({ src, alt, fill, className, priority }: any) {
  const [e, setE] = useState(false);
  if (e || !src) return <div className={`bg-neutral-900 flex items-center justify-center ${className}`}><Lucide.ImageOff className="opacity-20"/></div>;
  return <Image src={src} alt={alt} fill={fill} className={className} priority={priority} onError={() => setE(true)} unoptimized />;
}

export default function Page() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section id="hero" className="pt-40 pb-20 bg-black">
        <div className="container mx-auto p-4 flex flex-col items-center justify-center">
          <h1 className="text-6xl tracking-tighter leading-[0.9] font-heading mb-4">The Best Bite In Every Grain.</h1>
          <p className="text-lg text-center mb-8">Exquisite event catering for the discerning palate. Bringing the soul of Enugu’s finest grills and smoky jollof to your table.</p>
          <a href="#contact" className="bg-accent text-black py-2 px-4 rounded">Book Your Event</a>
          <div className="mt-12">
            <SafeImage src="https://images.unsplash.com/photo-1665332195309-9d75071138f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxMdXh1cnklMjBOaWdlcmlhbiUyMGV2ZW50JTIwY2F0ZXJpbmclMjBzbW9reSUyMGpvbGxvZiUyMHJpY2UlMjBwbGF0dGVyJTIwdGFibGUlMjBzZXR0aW5nfGVufDF8MHx8fDE3ODA0MDk3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Luxury Nigerian event catering smoky jollof rice platter table setting" fill className="object-cover h-80 w-full" priority />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="pt-40 pb-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="container mx-auto p-4 flex flex-col items-center justify-center">
          <h2 className="text-5xl tracking-tighter leading-[0.9] font-heading mb-4">The Zeeny Excellence</h2>
          <p className="text-lg text-center mb-8">Why we are Enugu's first choice for premium catering.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Lucide.Flame className="text-accent" size={24} />
              <h3 className="text-lg font-heading mt-2">Authentic Smoky Flavor</h3>
              <p className="text-sm">We maintain the traditional firewood technique for that unmistakable party jollof taste.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Lucide.Package className="text-accent" size={24} />
              <h3 className="text-lg font-heading mt-2">Premium Packaging</h3>
              <p className="text-sm">Luxury presentation that elevates your event aesthetic from the first glance.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Lucide.CalendarCheck className="text-accent" size={24} />
              <h3 className="text-lg font-heading mt-2">Event Ready</h3>
              <p className="text-sm">Scaled to handle everything from intimate dinners to grand wedding receptions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="pt-40 pb-20 bg-neutral-900">
        <div className="container mx-auto p-4 flex flex-col items-center justify-center">
          <h2 className="text-5xl tracking-tighter leading-[0.9] font-heading mb-4">Our Signature Menus</h2>
          <p className="text-lg text-center mb-8">Curated dishes for unforgettable celebrations.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <h3 className="text-lg font-heading mt-2">Smoky Jollof Party Tray</h3>
              <p className="text-sm">Our signature firewood-flavored rice served with choice of protein and sides.</p>
              <p className="text-sm">₦35,000</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <h3 className="text-lg font-heading mt-2">Jollof Cup Deluxe</h3>
              <p className="text-sm">Perfectly portioned luxury cups for corporate events and intimate gatherings.</p>
              <p className="text-sm">₦4,500</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <h3 className="text-lg font-heading mt-2">Gourmet Small Chops Box</h3>
              <p className="text-sm">An exquisite selection of puff puff, samosas, spring rolls, and peppered gizzard.</p>
              <p className="text-sm">₦15,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="pt-40 pb-20 bg-black">
        <div className="container mx-auto p-4 flex flex-col items-center justify-center">
          <h2 className="text-5xl tracking-tighter leading-[0.9] font-heading mb-4">Enugu's Gourmet Kitchen</h2>
          <p className="text-lg text-center mb-8">Zeeny’s Bite started with a simple mission: to refine the Nigerian catering experience. From our kitchen in the heart of Enugu, we blend traditional techniques with luxury presentation to ensure your guests enjoy the best bite, every time.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <h3 className="text-lg font-heading mt-2">500+</h3>
              <p className="text-sm">Events Catered</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <h3 className="text-lg font-heading mt-2">100%</h3>
              <p className="text-sm">Smoky Guarantee</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <h3 className="text-lg font-heading mt-2">10k+</h3>
              <p className="text-sm">Bites Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="pt-40 pb-20 bg-black">
        <div className="container mx-auto p-4 flex flex-col items-center justify-center">
          <h2 className="text-5xl tracking-tighter leading-[0.9] font-heading mb-4">Reserve Your Date</h2>
          <p className="text-lg text-center mb-8">Get in touch with us to book your event.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <h3 className="text-lg font-heading mt-2">Address</h3>
              <p className="text-sm">16 Ideani Mount Abani road, Enugu, Nigeria</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <h3 className="text-lg font-heading mt-2">Social Media</h3>
              <p className="text-sm">Instagram: @zeenysbitefood.ng</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}