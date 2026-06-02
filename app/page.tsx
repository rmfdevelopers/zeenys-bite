'use client';
import { useState, useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import Image from 'next/image';

const useScrollReveal = (threshold = 0.15) => {
  const [v, setV] = useState(false); 
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold });
    if (ref.current) o.observe(ref.current); 
    return () => o.disconnect();
  }, []); 
  return { ref, v };
};

function SafeImage({ src, alt, fill, className, priority }: any) {
  const [e, setE] = useState(false);
  if (e || !src) return <div className={`bg-neutral-900 flex items-center justify-center ${className}`}><Lucide.ImageOff className="opacity-20"/></div>;
  return <Image src={src} alt={alt} fill={fill} className={className} priority={priority} onError={() => setE(true)} unoptimized />;
}

export default function Page() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section id="hero" className="bg-black pt-40 pb-20">
        <div className="container mx-auto p-4">
          <h1 className="text-6xl tracking-tighter leading-[0.9]">Experience The Best Bite In Enugu.</h1>
          <p className="text-2xl">From smoky jollof pots to premium grills, we cater to your cravings with professional precision.</p>
          <button className="bg-accent hover:bg-accent/80 text-black py-2 px-4 rounded">Book Catering</button>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <SafeImage src="https://images.unsplash.com/photo-1700625914525-54dba25d2125?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxOaWdlcmlhbiUyMHBhcnR5JTIwZm9vZCUyMGNhdGVyaW5nJTIwZGlzcGxheSUyMGNvbG9yZnVsfGVufDF8MHx8fDE3ODA0MDg1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Nigerian party food catering display colorful" className="object-cover h-full w-full" />
        </div>
      </section>
      <section id="features" className="bg-gradient-to-b from-black to-neutral-900 pt-40 pb-20">
        <div className="container mx-auto p-4">
          <h2 className="text-5xl tracking-tighter leading-[0.9]">Why Choose Zeeny's?</h2>
          <p className="text-2xl">Professionalism meets incredible flavor in every bite.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Lucide.Flame className="text-accent" />
              <h3 className="text-2xl">Authentic Smoky Flavor</h3>
              <p className="text-lg">We bring the traditional firewood taste to every grain of jollof.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Lucide.Calendar className="text-accent" />
              <h3 className="text-2xl">Event Ready</h3>
              <p className="text-lg">Full-scale catering for weddings, birthdays, and corporate gatherings.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Lucide.Utensils className="text-accent" />
              <h3 className="text-2xl">Fresh Daily</h3>
              <p className="text-lg">Every bowl is prepared fresh with locally sourced Enugu ingredients.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="products" className="bg-neutral-900 pt-40 pb-20">
        <div className="container mx-auto p-4">
          <h2 className="text-5xl tracking-tighter leading-[0.9]">Our Menu</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Image src="https://images.unsplash.com/photo-1665332195309-9d75071138f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxhdXRoZW50aWMlMjBzbW9reSUyME5pZ2VyaWFuJTIwam9sbG9mJTIwcmljZSUyMGJvd2wlMjBjbG9zZXVwfGVufDF8MHx8fDE3ODA0MDg1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="authentic smoky Nigerian jollof rice bowl closeup" className="object-cover h-48 w-full" />
              <h3 className="text-2xl">Signature Smoky Jollof Bowl</h3>
              <p className="text-lg">Our famous firewood-flavored jollof rice served with plantain and choice of protein.</p>
              <p className="text-lg">₦4,500</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Image src="https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxOaWdlcmlhbiUyMHNtYWxsJTIwY2hvcHMlMjBwbGF0dGVyJTIwZm9vZCUyMHNwcHJlYWQlMjBmZXN0aXZlJTIwYXRtb3NwaGVyZXxlbnwxfDB8fHwxNzgwNDA4NTYxfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Nigerian small chops platter puff puff samosa" className="object-cover h-48 w-full" />
              <h3 className="text-2xl">Party Small Chops Box</h3>
              <p className="text-lg">A vibrant mix of spring rolls, samosas, puff-puff, and spicy gizzard.</p>
              <p className="text-lg">₦3,500</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Image src="https://images.unsplash.com/photo-1555423020-dcbc8eeceb15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxqb2xsb2YlMjByaWNlJTIwaW4lMjBhJTIwY3VwJTIwc3RyZWV0JTIwZm9vZHxlbnwxfDB8fHwxNzgwNDA4NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="jollof rice in a cup street food" className="object-cover h-48 w-full" />
              <h3 className="text-2xl">Zeeny's Jollof Cup</h3>
              <p className="text-lg">The perfect on-the-go snack featuring jollof rice, chicken chunks, and dodo.</p>
              <p className="text-lg">₦2,000</p>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="bg-black pt-40 pb-20">
        <div className="container mx-auto p-4">
          <h2 className="text-5xl tracking-tighter leading-[0.9]">Our Culinary Story</h2>
          <p className="text-2xl">Based in the heart of Enugu, Zeeny's Bite started with a simple mission: to provide the most authentic smoky jollof experience without the stress of firewood. Today, we are Enugu's go-to for event catering, known for our 'Best Bite' promise and uncompromising quality.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Lucide.Users className="text-accent" />
              <h3 className="text-2xl">500+ Events Catered</h3>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Lucide.Smile className="text-accent" />
              <h3 className="text-2xl">10k+ Jollof Cups Sold</h3>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Lucide.Zap className="text-accent" />
              <h3 className="text-2xl">100% Smoky Flavor</h3>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials" className="bg-gradient-to-b from-black to-neutral-900 pt-40 pb-20">
        <div className="container mx-auto p-4">
          <h2 className="text-5xl tracking-tighter leading-[0.9]">Happy Clients</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <p className="text-lg">The smoky jollof is the real deal. It tasted like it came straight from a village wedding pot!</p>
              <h3 className="text-2xl">Chinedu Obi</h3>
              <p className="text-lg">Wedding Client</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <p className="text-lg">Their jollof cups were the highlight of my office birthday party. So neat and delicious.</p>
              <h3 className="text-2xl">Amaka Egwu</h3>
              <p className="text-lg">Corporate Lead</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <p className="text-lg">Best small chops in Enugu, hands down. The samosas were actually full of meat!</p>
              <h3 className="text-2xl">Nneka Okoro</h3>
              <p className="text-lg">Regular Customer</p>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="bg-black pt-40 pb-20">
        <div className="container mx-auto p-4">
          <h2 className="text-5xl tracking-tighter leading-[0.9]">Get The Best Bite Today</h2>
          <p className="text-2xl">Contact us to book your next event or to place an order.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Lucide.MapPin className="text-accent" />
              <h3 className="text-2xl">Address</h3>
              <p className="text-lg">16 Ideani Mount Abani road, Enugu, Nigeria</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <Lucide.Phone className="text-accent" />
              <h3 className="text-2xl">Phone</h3>
              <p className="text-lg">+234 901 234 5678</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}