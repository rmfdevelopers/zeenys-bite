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
      <section id="hero" className="bg-black pt-40 pb-20 relative">
        <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-wrap justify-center">
          <div className="w-full lg:w-1/2 xl:w-1/3 p-6 text-center">
            <h1 className="text-6xl tracking-tighter leading-[0.9]">Enugu’s Most Flavorful Party Plates</h1>
            <p className="text-lg">From smoky jollof to luxury small chops, we bring the vibe to your table.</p>
            <button className="bg-accent text-black px-4 py-2 rounded">Order Now</button>
          </div>
          <div className="w-full lg:w-1/2 xl:w-2/3 p-6 text-center">
            <SafeImage src="https://images.unsplash.com/photo-1665332195309-9d75071138f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxzdGVhbWluZyUyMGhvdCUyME5pZ2VyaWFuJTIwam9sbG9mJTIwcmljZSUyMHBvdHxlbnwxfDB8fHwxNzgwNDA5MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="steaming hot Nigerian jollof rice pot" fill={false} className="object-cover h-64 w-full" priority={true} />
          </div>
        </div>
      </section>
      <section id="features" className="bg-neutral-900 pt-20 pb-20">
        <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-wrap justify-center">
          <h2 className="text-5xl tracking-tighter leading-[0.9] w-full text-center mb-4">Why Choose The Best Bite?</h2>
          <div className="w-full lg:w-1/3 xl:w-1/3 p-6 text-center">
            <Lucide.Flame className="text-3xl mb-2" />
            <h3 className="text-2xl">The Smoky Standard</h3>
            <p className="text-lg">Authentic firewood-style jollof aroma in every single bite.</p>
          </div>
          <div className="w-full lg:w-1/3 xl:w-1/3 p-6 text-center">
            <Lucide.UtensilsCrossed className="text-3xl mb-2" />
            <h3 className="text-2xl">Event Ready</h3>
            <p className="text-lg">Scalable catering solutions for weddings, birthdays, and corporate gigs.</p>
          </div>
          <div className="w-full lg:w-1/3 xl:w-1/3 p-6 text-center">
            <Lucide.Timer className="text-3xl mb-2" />
            <h3 className="text-2xl">Prompt Delivery</h3>
            <p className="text-lg">Fresh, hot food delivered straight to your venue across Enugu.</p>
          </div>
        </div>
      </section>
      <section id="products" className="bg-black pt-20 pb-20">
        <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-wrap justify-center">
          <h2 className="text-5xl tracking-tighter leading-[0.9] w-full text-center mb-4">Our Menu Highlights</h2>
          <div className="w-full lg:w-1/3 xl:w-1/3 p-6 text-center">
            <h3 className="text-2xl">Smoky Jollof Feast</h3>
            <p className="text-lg">Our signature party jollof served with fried plantain and peppered protein.</p>
            <p className="text-lg">₦12,500</p>
          </div>
          <div className="w-full lg:w-1/3 xl:w-1/3 p-6 text-center">
            <h3 className="text-2xl">Luxury Small Chops</h3>
            <p className="text-lg">A mix of puff puff, samosas, spring rolls, and spicy gizzard.</p>
            <p className="text-lg">₦8,000</p>
          </div>
          <div className="w-full lg:w-1/3 xl:w-1/3 p-6 text-center">
            <h3 className="text-2xl">Signature Jollof Cup</h3>
            <p className="text-lg">The perfect grab-and-go cup featuring rice, moin-moin, and turkey.</p>
            <p className="text-lg">₦4,500</p>
          </div>
        </div>
      </section>
    </main>
  );
}