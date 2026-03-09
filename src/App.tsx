import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Plus, Minus, Truck, ClipboardList, Palette, Phone } from 'lucide-react';

const Reveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-dark h-[60px]">
      <div className="max-w-[1140px] mx-auto px-6 h-full flex justify-between items-center">
        <a href="#" className="font-serif text-[0.95rem] text-cream font-bold tracking-[2.5px] uppercase">
          Burnt Basque Co.
        </a>
        <button className="md:hidden text-cream" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-[60px] md:top-0 left-0 w-full md:w-auto bg-dark md:bg-transparent p-6 md:p-0 gap-4 md:gap-7 items-start md:items-center`}>
          {['About', 'Flavours', 'Wholesale', 'Order', 'FAQ'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-white/65 text-[0.72rem] font-medium tracking-[2px] uppercase hover:text-gold transition-colors">
                {item}
              </a>
            </li>
          ))}
          <li>
            <a href="#order" onClick={() => setIsOpen(false)} className="bg-gold text-dark px-5 py-2 rounded-full font-semibold text-[0.72rem] tracking-[2px] uppercase hover:bg-gold-light transition-colors inline-block">
              Order Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center pt-[60px] relative overflow-hidden bg-gradient-to-b from-blush via-blush-2 to-cream">
      <div className="absolute rounded-full opacity-15 w-[300px] h-[300px] bg-peach -top-[60px] -right-[80px]" />
      <div className="absolute rounded-full opacity-10 w-[200px] h-[200px] bg-gold bottom-[40px] -left-[60px]" />
      
      <div className="relative z-10 max-w-[760px] px-6">
        <p className="text-[0.7rem] tracking-[5px] uppercase text-gold-dark mb-7 font-semibold">
          Handcrafted in Toronto
        </p>
        <h1 className="text-dark mb-2 text-[clamp(2.6rem,7vw,5rem)] leading-[1.05] font-serif font-bold">
          Burnt on the<br />
          <em className="italic text-gold">outside.</em><br />
          Creamy on the<br />
          <em className="italic text-gold">inside.</em>
        </h1>
        <p className="text-[1rem] text-text-dim my-6 mx-auto max-w-[440px] font-normal leading-[1.7]">
          Small-batch Basque burnt cheesecake. Simple ingredients. No shortcuts. Baked fresh to order.
        </p>
        <div className="flex gap-3.5 justify-center flex-wrap">
          <a href="#order" className="inline-block px-[34px] py-[14px] rounded-full font-sans font-semibold text-[0.82rem] tracking-[1.5px] uppercase bg-dark text-cream hover:bg-dark-2 transition-transform hover:-translate-y-0.5">
            Order Now
          </a>
          <a href="#wholesale" className="inline-block px-[34px] py-[14px] rounded-full font-sans font-semibold text-[0.82rem] tracking-[1.5px] uppercase border-2 border-dark text-dark hover:bg-dark hover:text-cream transition-colors hover:-translate-y-0.5">
            Wholesale
          </a>
        </div>
        <div className="mt-14 text-[0.65rem] tracking-[3px] uppercase text-text-dim/50 flex flex-col items-center">
          Scroll
          <div className="w-px h-9 bg-text-dim/30 mt-2.5" />
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="bg-dark py-5 overflow-hidden flex">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center">
            {['Original', 'Matcha', 'Earl Grey', 'Low-Sugar', 'Original', 'Matcha', 'Earl Grey', 'Low-Sugar', 'Original', 'Matcha', 'Earl Grey', 'Low-Sugar'].map((flavor, j) => (
              <span key={j} className="flex items-center">
                <span className="font-serif text-[clamp(1.6rem,4vw,2.8rem)] italic text-cream opacity-20 px-5">
                  {flavor}
                </span>
                <span className="text-gold opacity-45 px-1.5 text-[0.6em]">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="bg-white py-[90px]">
      <div className="max-w-[1140px] mx-auto px-6">
        <Reveal className="grid md:grid-cols-2 gap-8 md:gap-[60px] items-center">
          <div>
            <p className="text-[0.7rem] tracking-[4px] uppercase text-gold-dark mb-3.5 font-semibold">Our Story</p>
            <h2 className="text-dark mb-5 text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.15] font-serif font-bold">
              We do one thing,<br />and we do it right.
            </h2>
            <p className="text-text-dim text-[0.93rem] leading-[1.7]">
              We're a small-batch bakery in Toronto obsessed with the perfect Basque burnt cheesecake. Every cake is handcrafted using simple, quality ingredients — cream cheese, eggs, cream, sugar. No preservatives. No artificial flavours. No shortcuts. Just the way it was meant to be made, one cake at a time.
            </p>
          </div>
          <div className="w-full aspect-[4/5] relative">
            <motion.img 
              src="/Image/Matcha Whole and Slice.png" 
              alt="Matcha Whole and Slice" 
              className="absolute top-0 right-0 w-[75%] h-[75%] object-cover rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-10"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img 
              src="/Image/Matcha Slice 2.png" 
              alt="Matcha Slice 2" 
              className="absolute bottom-0 left-0 w-[65%] h-[65%] object-cover rounded-[20px] shadow-[0_15px_30px_rgba(0,0,0,0.1)] z-20"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const flavoursData = [
  {
    name: "Original",
    desc: "Classic San Sebastián–style. Rich, creamy, with a deep caramelized top.",
    prices: { 6: 42, 8: 48 },
    img: "/Image/Matha Whole.png"
  },
  {
    name: "Matcha",
    desc: "Premium Japanese matcha folded into our signature Basque base. Earthy, smooth, vibrant.",
    prices: { 6: 45, 8: 52 },
    img: "/Image/Matcha Slice.png"
  },
  {
    name: "Earl Grey",
    desc: "Bergamot-infused with a delicate floral finish. Pairs perfectly with coffee.",
    prices: { 6: 43, 8: 50 },
    img: "/Image/Earl Grey Whole.png"
  },
  {
    name: "Low-Sugar",
    desc: "Same creamy Basque texture, 40% less sugar. No compromise on taste.",
    prices: { 6: 43, 8: 50 },
    img: "/Image/Early Grey Slice.png"
  }
];

const Flavours = () => {
  return (
    <section id="flavours" className="bg-cream py-[90px]">
      <div className="max-w-[1140px] mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="block text-[0.7rem] tracking-[4px] uppercase text-gold-dark mb-3 font-semibold">The Collection</span>
          <h2 className="text-dark text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.15] font-serif font-bold">Our Flavours</h2>
          <p className="text-text-dim max-w-[480px] mx-auto mt-3 text-[0.92rem]">
            Each cake is handcrafted with premium ingredients. No preservatives. No shortcuts.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-[360px] sm:max-w-none mx-auto">
          {flavoursData.map((f, i) => (
            <Reveal key={i} className="bg-white rounded-[16px] overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] text-center border border-black/5 group">
              <div className="w-full aspect-square bg-warm overflow-hidden relative">
                <img src={f.img} alt={f.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
              </div>
              <div className="px-[18px] pt-[22px] pb-[26px]">
                <h3 className="text-dark font-serif mb-2 text-[1.15rem] font-bold">{f.name}</h3>
                <p className="text-[0.82rem] text-text-dim mb-3.5 min-h-[48px]">{f.desc}</p>
                <p className="text-[0.8rem] text-brown font-semibold tracking-[0.5px]">
                  6" — ${f.prices[6 as keyof typeof f.prices]} <span className="mx-1.5 text-text-dim font-normal">|</span> 8" — ${f.prices[8 as keyof typeof f.prices]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Choose", desc: "Pick your flavour and size." },
    { num: "02", title: "Order", desc: "Use our order form or DM on Instagram." },
    { num: "03", title: "We Bake", desc: "Fresh to order. 48 hours notice." },
    { num: "04", title: "Enjoy", desc: "Pickup or delivery across Toronto." }
  ];

  return (
    <section className="bg-blush-2 py-[90px]">
      <div className="max-w-[1140px] mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="block text-[0.7rem] tracking-[4px] uppercase text-gold-dark mb-3 font-semibold">How It Works</span>
          <h2 className="text-dark text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.15] font-serif font-bold">Order in 4 steps.</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-[300px] sm:max-w-none mx-auto">
          {steps.map((s, i) => (
            <Reveal key={i} className="text-center p-5">
              <div className="font-serif text-[2.4rem] text-gold font-bold mb-2">{s.num}</div>
              <h3 className="text-dark mb-1.5 font-sans font-semibold text-[1.1rem]">{s.title}</h3>
              <p className="text-[0.82rem] text-text-dim">{s.desc}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-10">
          <a href="#order" className="inline-block px-[34px] py-[14px] rounded-full font-sans font-semibold text-[0.82rem] tracking-[1.5px] uppercase bg-dark text-cream hover:bg-dark-2 transition-transform hover:-translate-y-0.5">
            Order Now
          </a>
        </Reveal>
      </div>
    </section>
  );
};

const Wholesale = () => {
  return (
    <section id="wholesale" className="bg-dark text-cream py-[90px]">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-[60px] items-start">
          <Reveal>
            <p className="text-[0.7rem] tracking-[4px] uppercase text-gold mb-3.5 font-semibold">For Cafés & Restaurants</p>
            <h2 className="mb-5 text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.15] font-serif font-bold">Let's work together.</h2>
            <ul className="list-none my-6 mb-9">
              {[
                { title: "01 — Zero Prep.", desc: "Slice and serve. No baking, no plating, no kitchen time needed." },
                { title: "02 — Fresh Delivery.", desc: "Baked to order, delivered to your door. Weekly or bi-weekly across downtown Toronto." },
                { title: "03 — Instagram-Worthy.", desc: "Your customers will photograph the cross-section before they take a bite." },
                { title: "04 — Boost Your Check.", desc: "A premium dessert option that raises your average ticket without adding any prep work." }
              ].map((item, i) => (
                <li key={i} className="py-3.5 border-b border-white/10 text-[0.9rem] text-[#C9C4BA]">
                  <strong className="text-cream font-semibold">{item.title}</strong> {item.desc}
                </li>
              ))}
            </ul>
            <a href="mailto:burntbasqueco@gmail.com?subject=Wholesale%20Inquiry" className="inline-block px-[34px] py-[14px] rounded-full font-sans font-semibold text-[0.82rem] tracking-[1.5px] uppercase bg-gold text-white hover:bg-gold-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,169,110,0.3)]">
              Get Wholesale Pricing
            </a>
          </Reveal>
          <Reveal className="bg-dark-2 rounded-[16px] p-9 border border-gold/10">
            <p className="text-[#B5B0A6] text-[0.92rem] mb-6 leading-[1.7]">
              We supply select cafés and restaurants across downtown Toronto. Start with a trial — two cakes, no commitment. If your customers love them, we keep going.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { icon: <Truck size={24} />, title: "Free Delivery", desc: "Downtown, min 2 cakes" },
                { icon: <ClipboardList size={24} />, title: "No Contract", desc: "Start with a trial order" },
                { icon: <Palette size={24} />, title: "4 Flavours", desc: "Rotate or keep favourites" },
                { icon: <Phone size={24} />, title: "Direct Line", desc: "Talk to the baker, always" }
              ].map((perk, i) => (
                <div key={i} className="bg-gold/5 rounded-[10px] p-5 text-center border border-gold/10">
                  <div className="text-gold flex justify-center mb-2">{perk.icon}</div>
                  <h4 className="font-sans text-[0.82rem] text-cream font-semibold mb-1">{perk.title}</h4>
                  <p className="text-[0.75rem] text-[#908B82]">{perk.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Order = () => {
  const [flavour, setFlavour] = useState("Original");
  const [size, setSize] = useState<6 | 8>(6);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [delivery, setDelivery] = useState("pickup");
  const [notes, setNotes] = useState("");

  const unitPrice = flavoursData.find(f => f.name === flavour)?.prices[size as keyof typeof flavoursData[0]['prices']] || 42;
  const total = unitPrice * qty;

  const handleCheckout = () => {
    if (!name.trim() || !contact.trim()) {
      alert("Please enter your name and contact info.");
      return;
    }
    
    const body = `Hi Burnt Basque Co.!%0A%0A`
      + `Name: ${name}%0AContact: ${contact}%0A`
      + `Flavour: ${flavour}%0ASize: ${size}"%0A`
      + `Qty: ${qty}%0ATotal: $${total}%0A`
      + `Date: ${date || 'Flexible'}%0A`
      + `${delivery === 'delivery' ? 'Delivery' : 'Pickup'}%0A`
      + `Notes: ${notes || 'None'}`;
      
    window.location.href = `mailto:burntbasqueco@gmail.com?subject=New Order — ${flavour} ${size}"&body=${body}`;
  };

  return (
    <section id="order" className="bg-white py-[90px]">
      <div className="max-w-[1140px] mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="block text-[0.7rem] tracking-[4px] uppercase text-gold-dark mb-3 font-semibold">Place an Order</span>
          <h2 className="text-dark text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.15] font-serif font-bold">
            Fresh cheesecake,<br />delivered to you.
          </h2>
          <p className="text-text-dim max-w-[480px] mx-auto mt-3 text-[0.92rem]">
            Build your order and pay securely with Stripe.
          </p>
        </Reveal>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Reveal className="bg-cream rounded-[16px] p-9 border border-black/5">
            <h3 className="font-serif text-[1.4rem] text-dark mb-6 text-center font-bold">Build Your Order</h3>
            
            <div className="mb-5">
              <label className="block text-[0.78rem] tracking-[1px] uppercase text-text-dim mb-2 font-semibold">Flavour</label>
              <div className="flex flex-wrap gap-2">
                {flavoursData.map(f => (
                  <button
                    key={f.name}
                    onClick={() => setFlavour(f.name)}
                    className={`px-[18px] py-[10px] rounded-full text-[0.8rem] font-medium border-[1.5px] transition-all select-none ${
                      flavour === f.name 
                        ? 'bg-gold text-white border-gold' 
                        : 'bg-white text-text-main border-black/10 hover:border-gold'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-[0.78rem] tracking-[1px] uppercase text-text-dim mb-2 font-semibold">Size</label>
              <div className="flex gap-2">
                {[6, 8].map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s as 6 | 8)}
                    className={`flex-1 py-3 rounded-[10px] text-[0.85rem] font-semibold border-[1.5px] transition-all text-center ${
                      size === s
                        ? 'bg-dark text-cream border-dark'
                        : 'bg-white text-text-main border-black/10 hover:border-gold'
                    }`}
                  >
                    {s} inch
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-[0.78rem] tracking-[1px] uppercase text-text-dim mb-2 font-semibold">Quantity</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-full border-[1.5px] border-black/10 bg-white flex items-center justify-center transition-all hover:bg-dark hover:text-cream hover:border-dark">
                  <Minus size={16} />
                </button>
                <span className="text-[1.3rem] font-bold min-w-[30px] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 rounded-full border-[1.5px] border-black/10 bg-white flex items-center justify-center transition-all hover:bg-dark hover:text-cream hover:border-dark">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3.5 mb-5">
              <div>
                <label className="block text-[0.78rem] tracking-[1px] uppercase text-text-dim mb-2 font-semibold">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full px-4 py-[13px] rounded-[10px] border-[1.5px] border-black/10 bg-white text-[0.9rem] focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div>
                <label className="block text-[0.78rem] tracking-[1px] uppercase text-text-dim mb-2 font-semibold">Email or Phone</label>
                <input type="text" value={contact} onChange={e => setContact(e.target.value)} placeholder="Email or phone" className="w-full px-4 py-[13px] rounded-[10px] border-[1.5px] border-black/10 bg-white text-[0.9rem] focus:outline-none focus:border-gold transition-colors" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3.5 mb-5">
              <div>
                <label className="block text-[0.78rem] tracking-[1px] uppercase text-text-dim mb-2 font-semibold">Preferred Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-[13px] rounded-[10px] border-[1.5px] border-black/10 bg-white text-[0.9rem] focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div>
                <label className="block text-[0.78rem] tracking-[1px] uppercase text-text-dim mb-2 font-semibold">Pickup / Delivery</label>
                <select value={delivery} onChange={e => setDelivery(e.target.value)} className="w-full px-4 py-[13px] rounded-[10px] border-[1.5px] border-black/10 bg-white text-[0.9rem] focus:outline-none focus:border-gold transition-colors">
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery (Downtown Toronto)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[0.78rem] tracking-[1px] uppercase text-text-dim mb-2 font-semibold">Notes (optional)</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. extra for a birthday, allergies, etc." className="w-full px-4 py-[13px] rounded-[10px] border-[1.5px] border-black/10 bg-white text-[0.9rem] focus:outline-none focus:border-gold transition-colors min-h-[70px] resize-y" />
            </div>
          </Reveal>

          <Reveal className="bg-cream rounded-[16px] p-9 border border-black/5 sticky top-[84px]">
            <h3 className="font-serif text-[1.4rem] text-dark mb-6 font-bold">Order Summary</h3>
            <div className="flex justify-between py-3 border-b border-black/5 text-[0.9rem]">
              <span className="text-text-dim">Flavour</span>
              <span className="font-medium">{flavour}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-black/5 text-[0.9rem]">
              <span className="text-text-dim">Size</span>
              <span className="font-medium">{size} inch</span>
            </div>
            <div className="flex justify-between py-3 border-b border-black/5 text-[0.9rem]">
              <span className="text-text-dim">Unit Price</span>
              <span className="font-medium">${unitPrice}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-black/5 text-[0.9rem]">
              <span className="text-text-dim">Quantity</span>
              <span className="font-medium">{qty}</span>
            </div>
            <div className="flex justify-between pt-4 text-[1.1rem] font-bold text-dark">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <button onClick={handleCheckout} className="w-full py-4 rounded-[10px] bg-dark text-cream font-sans font-bold text-[0.9rem] tracking-[1px] uppercase mt-5 transition-colors hover:bg-gold hover:text-dark flex items-center justify-center gap-2.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              Pay with Stripe
            </button>
            <p className="text-[0.65rem] opacity-50 text-center mt-2.5">Secure payment powered by Stripe</p>

            <div className="text-center mt-4 text-[0.85rem] text-text-dim">
              or DM us on <a href="https://instagram.com/burntbasqueco" target="_blank" rel="noreferrer" className="text-gold-dark font-semibold hover:underline">@burntbasqueco</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const FaqItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-black/10 py-4.5 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex justify-between items-center font-serif text-[1rem] text-dark font-bold">
        {q}
        <span className={`transition-transform duration-300 text-[1.1rem] text-gold ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </div>
      <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-[200px] pt-3' : 'max-h-0'}`}>
        <p className="text-[0.88rem] text-text-dim leading-[1.7]">{a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "How far in advance should I order?", a: "We need at least 48 hours notice. For large or wholesale orders, 3–5 days is ideal." },
    { q: "Do you deliver?", a: "Yes — free delivery in downtown Toronto for 2+ cakes. Single cake delivery available for a small fee." },
    { q: "How should I store the cheesecake?", a: "Refrigerate and consume within 3–4 days. Bring to room temperature 20 minutes before serving for the best texture." },
    { q: "I'm a café owner. Can I try a sample?", a: "Absolutely. We offer free samples for wholesale partners. Reach out via email or DM and we'll arrange a tasting." },
    { q: "What's the minimum wholesale order?", a: "Just 2 cakes. No contract required — start with a trial and scale as you need." }
  ];

  return (
    <section id="faq" className="bg-cream py-[90px]">
      <div className="max-w-[1140px] mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="block text-[0.7rem] tracking-[4px] uppercase text-gold-dark mb-3 font-semibold">FAQ</span>
          <h2 className="text-dark text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.15] font-serif font-bold">Common Questions</h2>
        </Reveal>
        <Reveal className="max-w-[680px] mx-auto">
          {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark pt-14 pb-8 text-cream">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 md:gap-10 mb-10 text-center md:text-left">
          <div>
            <div className="font-serif text-[1rem] tracking-[2.5px] uppercase font-bold mb-3">Burnt Basque Co.</div>
            <p className="text-[0.82rem] text-[#8A8578] leading-[1.6]">
              Small-batch Basque burnt cheesecake, handcrafted in Toronto with love and simple ingredients.
            </p>
            <div className="flex gap-4 mt-3 justify-center md:justify-start">
              <a href="https://instagram.com/burntbasqueco" target="_blank" rel="noreferrer" className="text-[#8A8578] text-[0.8rem] hover:text-gold transition-colors">Instagram</a>
              <a href="mailto:burntbasqueco@gmail.com" className="text-[#8A8578] text-[0.8rem] hover:text-gold transition-colors">Email</a>
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="font-sans text-[0.7rem] tracking-[2px] uppercase text-gold mb-3.5 font-semibold">Navigate</h4>
            <a href="#about" className="text-[#8A8578] text-[0.82rem] py-1 hover:text-cream transition-colors">About</a>
            <a href="#flavours" className="text-[#8A8578] text-[0.82rem] py-1 hover:text-cream transition-colors">Flavours</a>
            <a href="#wholesale" className="text-[#8A8578] text-[0.82rem] py-1 hover:text-cream transition-colors">Wholesale</a>
            <a href="#order" className="text-[#8A8578] text-[0.82rem] py-1 hover:text-cream transition-colors">Order</a>
            <a href="#faq" className="text-[#8A8578] text-[0.82rem] py-1 hover:text-cream transition-colors">FAQ</a>
          </div>
          <div className="flex flex-col">
            <h4 className="font-sans text-[0.7rem] tracking-[2px] uppercase text-gold mb-3.5 font-semibold">Get in Touch</h4>
            <a href="https://instagram.com/burntbasqueco" target="_blank" rel="noreferrer" className="text-[#8A8578] text-[0.82rem] py-1 hover:text-cream transition-colors">Instagram → @burntbasqueco</a>
            <a href="mailto:burntbasqueco@gmail.com" className="text-[#8A8578] text-[0.82rem] py-1 hover:text-cream transition-colors">burntbasqueco@gmail.com</a>
            <span className="text-[#8A8578] text-[0.82rem] py-1">Toronto, ON</span>
          </div>
        </div>
        <div className="text-center pt-7 border-t border-white/5 text-[0.72rem] text-white/25">
          © 2026 Burnt Basque Co. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const FloatingOrder = () => {
  return (
    <a href="#order" className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-[99] bg-dark text-cream rounded-full px-8 py-3.5 font-semibold text-[0.8rem] tracking-[1.5px] uppercase shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform">
      Order Now
    </a>
  );
};

export default function App() {
  return (
    <div className="font-sans text-text-main bg-cream">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Flavours />
      <HowItWorks />
      <Wholesale />
      <Order />
      <FAQ />
      <Footer />
      <FloatingOrder />
    </div>
  );
}
