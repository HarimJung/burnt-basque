import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Plus, Minus, Truck, ClipboardList, Palette, Phone, ShoppingCart, Star, MapPin, Clock, Mail, ChevronDown, Check } from 'lucide-react';

export type Flavour = "Original" | "Matcha" | "Earl Grey" | "Low-Sugar";
export type Size = 6 | 8;

export interface CartItem {
  id: string;
  flavour: Flavour;
  size: Size;
  qty: number;
  unitPrice: number;
  halfAndHalf?: boolean;
  secondFlavour?: Flavour;
}

interface AppState {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  couponUsed: boolean;
  setCouponUsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppState | null>(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("Missing AppContext");
  return ctx;
}; const Reveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
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

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hidden = localStorage.getItem('promoDismissed');
    if (!hidden) setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gold-dark text-white text-[0.75rem] font-medium py-2 px-6 flex justify-center items-center relative z-[60]">
      🎉 First order? Use code FIRST15 for 15% off!
      <button
        onClick={() => {
          setIsVisible(false);
          localStorage.setItem('promoDismissed', 'true');
        }}
        className="absolute right-4 hover:opacity-70 transition-opacity"
      >
        <X size={14} />
      </button>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, setIsCartOpen } = useAppContext();

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="fixed top-0 w-full z-50">
      <PromoBanner />
      <nav className="bg-dark h-[60px] w-full relative">
        <div className="max-w-[1140px] mx-auto px-6 h-full flex justify-between items-center">
          <a href="#" className="font-serif text-[0.95rem] text-cream font-bold tracking-[2.5px] uppercase">
            Burnt Basque Co.
          </a>

          <div className="flex items-center gap-4 md:hidden text-cream">
            <button onClick={() => setIsCartOpen(true)} className="relative" aria-label="Cart">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-dark text-[10px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <ul className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-[60px] md:top-0 left-0 w-full md:w-auto bg-dark md:bg-transparent p-6 md:p-0 gap-4 md:gap-7 items-start md:items-center`}>
            {['About', 'Flavours', 'Wholesale', 'Order', 'FAQ'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-white/65 text-[0.72rem] font-medium tracking-[2px] uppercase hover:text-gold transition-colors">
                  {item}
                </a>
              </li>
            ))}
            <li className="hidden md:flex items-center gap-5">
              <button
                onClick={() => { setIsCartOpen(true); setIsOpen(false); }}
                className="text-white relative hover:text-gold transition-colors block"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-dark text-[10px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <a href="#order" onClick={() => setIsOpen(false)} className="bg-gold text-dark px-5 py-2 rounded-full font-semibold text-[0.72rem] tracking-[2px] uppercase hover:bg-gold-light transition-colors inline-block">
                Order Now
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
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

export const flavoursData = [
  {
    name: "Original",
    desc: "Classic San Sebastián–style. Rich, creamy, with a deep caramelized top.",
    prices: { 6: 42, 8: 48 },
    img: "/Image/Matha Whole.png",
    allergens: ["Dairy", "Eggs", "Wheat"],
    gfOption: true
  },
  {
    name: "Matcha",
    desc: "Premium Japanese matcha folded into our signature Basque base. Earthy, smooth, vibrant.",
    prices: { 6: 45, 8: 52 },
    img: "/Image/Matcha Slice.png",
    allergens: ["Dairy", "Eggs", "Wheat"]
  },
  {
    name: "Earl Grey",
    desc: "Bergamot-infused with a delicate floral finish. Pairs perfectly with coffee.",
    prices: { 6: 43, 8: 50 },
    img: "/Image/Earl Grey Whole.png",
    allergens: ["Dairy", "Eggs", "Wheat"]
  },
  {
    name: "Low-Sugar",
    desc: "Same creamy Basque texture, 40% less sugar. No compromise on taste.",
    prices: { 6: 43, 8: 50 },
    img: "/Image/Early Grey Slice.png",
    allergens: ["Dairy", "Eggs", "Wheat"]
  }
];

const ProductDetailModal = ({ flavour, onClose }: { flavour: typeof flavoursData[0] | null, onClose: () => void }) => {
  const { cart, setCart, setIsCartOpen } = useAppContext();
  const [size, setSize] = useState<Size>(6);
  const [qty, setQty] = useState(1);
  const [halfAndHalf, setHalfAndHalf] = useState(false);
  const [secondFlavour, setSecondFlavour] = useState<Flavour>("Matcha");

  const [toast, setToast] = useState("");

  useEffect(() => {
    if (flavour) {
      setSize(6);
      setQty(1);
      setHalfAndHalf(false);
      setSecondFlavour(flavoursData.find(f => f.name !== flavour.name)?.name as Flavour || "Original");
    }
  }, [flavour]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!flavour) return null;

  const unitPrice = flavour.prices[size as keyof typeof flavour.prices] + (halfAndHalf ? 3 : 0);

  const handleAdd = () => {
    const newItem: CartItem = {
      id: `${flavour.name}-${size}-${halfAndHalf ? secondFlavour : 'none'}-${Date.now()}`,
      flavour: flavour.name as Flavour,
      size,
      qty,
      unitPrice,
      halfAndHalf,
      secondFlavour: halfAndHalf ? secondFlavour : undefined
    };
    setCart((c: CartItem[]) => [...c, newItem]);
    setToast("Added to cart!");
    setTimeout(() => {
      setToast("");
      onClose();
      setIsCartOpen(true);
    }, 800);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex justify-center items-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
          className="bg-cream w-full max-w-[900px] min-h-[500px] rounded-[24px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative mt-auto mb-auto"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/50 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
            <X size={20} />
          </button>

          <div className="w-full md:w-1/2 bg-warm relative min-h-[300px] md:min-h-full">
            <img src={flavour.img} alt={flavour.name} className="w-full h-full object-cover absolute inset-0" />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
            <div className="flex items-center gap-1 text-gold mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              <span className="text-[0.75rem] text-text-dim ml-2 font-medium">4.8/5 (120+ orders)</span>
            </div>

            <h2 className="font-serif text-[clamp(2rem,4vw,2.5rem)] font-bold text-dark leading-[1.1] mb-3">
              {flavour.name}
            </h2>
            <p className="text-text-dim text-[0.95rem] mb-6 leading-[1.6]">{flavour.desc}</p>

            <div className="mb-6">
              <label className="block text-[0.78rem] tracking-[1px] uppercase text-text-dim mb-2 font-semibold">Size</label>
              <div className="flex gap-2">
                {[6, 8].map(s => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s as Size);
                      if (s === 6) setHalfAndHalf(false);
                    }}
                    className={`flex-1 py-3 rounded-[10px] text-[0.85rem] font-semibold border-[1.5px] transition-all text-center ${size === s ? 'bg-dark text-cream border-dark' : 'bg-white text-text-main border-black/10 hover:border-gold'
                      }`}
                  >
                    {s}" — ${flavour.prices[s as keyof typeof flavour.prices]}
                  </button>
                ))}
              </div>
            </div>

            {size === 8 && (
              <div className="mb-6 p-4 rounded-[12px] bg-white border border-black/5">
                <label className="flex items-center gap-3 cursor-pointer mb-1">
                  <input type="checkbox" checked={halfAndHalf} onChange={e => setHalfAndHalf(e.target.checked)} className="w-4 h-4 accent-gold" />
                  <span className="text-[0.85rem] font-semibold flex-1">Make it Half & Half (+$3)</span>
                </label>
                {halfAndHalf && (
                  <div className="mt-3">
                    <select
                      value={secondFlavour} onChange={e => setSecondFlavour(e.target.value as Flavour)}
                      className="w-full p-2.5 rounded-[8px] bg-warm border-none text-[0.85rem] focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      {flavoursData.filter(f => f.name !== flavour.name).map(f => (
                        <option key={f.name} value={f.name}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-4 border-[1.5px] border-black/10 rounded-full bg-white px-3 py-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-7 h-7 flex items-center justify-center hover:text-gold transition-colors"><Minus size={16} /></button>
                <span className="text-[1.1rem] font-bold min-w-[20px] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-7 h-7 flex items-center justify-center hover:text-gold transition-colors"><Plus size={16} /></button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 py-4 flex justify-center items-center gap-2 rounded-full font-sans font-bold text-[0.85rem] tracking-[1.5px] uppercase transition-all shadow-lg text-cream bg-gold hover:bg-gold-dark"
              >
                {toast || `Add to Cart — $${unitPrice * qty}`}
              </button>
            </div>

            <div className="mt-auto space-y-3 pt-6 border-t border-black/5">
              <div className="flex items-start gap-2 text-[0.75rem] text-text-dim">
                <Check size={14} className="text-gold shrink-0 mt-0.5" />
                <p>
                  <strong className="text-dark font-medium">Contains allergens:</strong> {flavour.allergens.join(", ")}.
                  {flavour.gfOption && <span className="text-green-600 block mt-0.5">Gluten-free option available upon request.</span>}
                </p>
              </div>
              <div className="flex items-start gap-2 text-[0.75rem] text-text-dim">
                <Check size={14} className="text-gold shrink-0 mt-0.5" />
                <p>
                  <strong className="text-dark font-medium">Storage:</strong> Refrigerate. Best within 3-4 days. Serve at room temp for 20 min.
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Flavours = () => {
  const [selectedFlavour, setSelectedFlavour] = useState<typeof flavoursData[0] | null>(null);

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
            <Reveal key={f.name} className="bg-white rounded-[16px] overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] text-center border border-black/5 group flex flex-col relative pb-5">
              <div className="w-full aspect-square bg-warm overflow-hidden relative cursor-pointer" onClick={() => setSelectedFlavour(f)}>
                <img src={f.img} alt={f.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
              </div>
              <div className="px-[18px] pt-[22px] pb-[16px] flex flex-col flex-1">
                <h3 className="text-dark font-serif mb-2 text-[1.15rem] font-bold cursor-pointer hover:text-gold transition-colors" onClick={() => setSelectedFlavour(f)}>{f.name}</h3>
                <p className="text-[0.82rem] text-text-dim mb-3.5 min-h-[48px]">{f.desc}</p>

                <div className="mt-auto text-[0.8rem] text-brown font-semibold tracking-[0.5px] pb-4 border-b border-black/5">
                  6" — ${f.prices[6 as keyof typeof f.prices]} <span className="mx-1.5 text-text-dim font-normal">|</span> 8" — ${f.prices[8 as keyof typeof f.prices]}
                </div>

                {/* Allergens badges */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-4 mb-4">
                  {f.allergens.map(a => (
                    <span key={a} className="bg-warm text-text-main px-2 py-0.5 rounded-full text-[0.6rem] uppercase tracking-[1px] font-semibold">{a}</span>
                  ))}
                  {f.gfOption && <span className="bg-[#E7F0E6] text-[#4A7244] px-2 py-0.5 rounded-full text-[0.6rem] uppercase tracking-[1px] font-semibold">GF Option</span>}
                </div>

                <button
                  onClick={() => setSelectedFlavour(f)}
                  className="w-full py-2.5 rounded-full border-[1.5px] border-dark text-dark text-[0.75rem] font-bold uppercase tracking-[1px] hover:bg-dark hover:text-cream transition-colors"
                >
                  Details & Add to Cart
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      {selectedFlavour && <ProductDetailModal flavour={selectedFlavour} onClose={() => setSelectedFlavour(null)} />}
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    { name: "Sarah K.", date: "Dec 2025", text: "Best cheesecake I've ever had in Toronto. The matcha one is unreal." },
    { name: "James L.", date: "Jan 2026", text: "Ordered for my birthday and everyone was obsessed. Will order again!" },
    { name: "Michelle W.", date: "Nov 2025", text: "The Earl Grey flavour is so unique. Perfect with afternoon tea." },
    { name: "David R., Café Owner", date: "Feb 2026", text: "We serve this at our café and customers keep coming back for it." },
    { name: "Amy T.", date: "Jan 2026", text: "Half & half option is genius. Couldn't decide so I got both!" },
  ];

  return (
    <section className="bg-blush py-[90px] overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-6 mb-10 text-center">
        <span className="block text-[0.7rem] tracking-[4px] uppercase text-gold-dark mb-3 font-semibold">Testimonials</span>
        <h2 className="text-dark text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.15] font-serif font-bold">What Our Customers Say</h2>
      </div>
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-6 md:justify-center gap-6">
        {reviews.map((r, i) => (
          <Reveal key={i} className="min-w-[280px] max-w-[320px] bg-white rounded-[20px] p-7 shadow-sm snap-center shrink-0 border border-black/5">
            <div className="flex gap-1 mb-4 text-gold">
              {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
            </div>
            <p className="text-[0.9rem] text-dark leading-[1.6] mb-6 italic">"{r.text}"</p>
            <div className="mt-auto">
              <p className="text-[0.8rem] font-bold text-dark">{r.name}</p>
              <p className="text-[0.7rem] text-text-dim mt-0.5 uppercase tracking-[1px]">{r.date}</p>
            </div>
          </Reveal>
        ))}
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
  const [form, setForm] = useState({ business: "", name: "", email: "", phone: "", type: "Café", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('wholesaleSubmissions', JSON.stringify([{ ...form, date: new Date().toISOString() }]));
    setSubmitted(true);
  };

  return (
    <section id="wholesale" className="bg-dark text-cream py-[90px]">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-[60px] items-start mb-16">
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
              Get Wholesale Pricing via Email
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

        <Reveal className="bg-dark-2 border border-gold/10 rounded-[16px] p-8 md:p-12 max-w-[800px] mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-serif text-[1.8rem] font-bold text-cream mb-2">Request Wholesale Pricing</h3>
            <p className="text-[#B5B0A6] text-[0.9rem]">Fill out the form below and we'll send you our catalog and pricing sheet.</p>
          </div>
          {submitted ? (
            <div className="bg-[#1C201A] border border-[#2D3A29] p-6 rounded-[12px] text-center text-[#9CC092]">
              <Check size={32} className="mx-auto mb-3 opacity-80" />
              <h4 className="font-serif text-[1.2rem] font-bold mb-1">Inquiry Received</h4>
              <p className="text-[0.85rem]">Thanks! We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
              <div><input required placeholder="Business Name" className="w-full bg-dark border border-white/10 rounded-[8px] p-3 text-[0.85rem] focus:border-gold outline-none text-cream" value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} /></div>
              <div><input required placeholder="Contact Name" className="w-full bg-dark border border-white/10 rounded-[8px] p-3 text-[0.85rem] focus:border-gold outline-none text-cream" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div><input required type="email" placeholder="Email Address" className="w-full bg-dark border border-white/10 rounded-[8px] p-3 text-[0.85rem] focus:border-gold outline-none text-cream" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              <div><input type="tel" placeholder="Phone Number" className="w-full bg-dark border border-white/10 rounded-[8px] p-3 text-[0.85rem] focus:border-gold outline-none text-cream" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              <div className="sm:col-span-2">
                <select className="w-full bg-dark border border-white/10 rounded-[8px] p-3 text-[0.85rem] focus:border-gold outline-none text-cream" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option>Café</option><option>Restaurant</option><option>Hotel</option><option>Catering</option><option>Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <textarea rows={3} placeholder="Tell us a bit about your business..." className="w-full bg-dark border border-white/10 rounded-[8px] p-3 text-[0.85rem] focus:border-gold outline-none resize-none text-cream" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <div className="sm:col-span-2 mt-2">
                <button type="submit" className="w-full py-3.5 rounded-full bg-gold text-dark font-sans font-bold text-[0.85rem] tracking-[1.5px] uppercase transition-all hover:bg-gold-light">
                  Submit Inquiry
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};

const Order = () => {
  const { cart, couponUsed, setCouponUsed } = useAppContext();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [delivery, setDelivery] = useState("pickup");
  const [notes, setNotes] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [dateError, setDateError] = useState("");

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
  const deliveryFee = delivery === "delivery" ? (cartSubtotal >= 80 ? 0 : 7.99) : 0;

  // Apply coupon if valid and not previously used
  const calculatedCouponApplied = couponApplied || (coupon === "FIRST15" && !couponUsed);
  const discount = calculatedCouponApplied ? (cartSubtotal * 0.15) : 0;

  const total = cartSubtotal + deliveryFee - discount;

  const handleApplyCoupon = () => {
    if (coupon === "FIRST15") {
      if (couponUsed) {
        alert("This coupon has already been used.");
      } else {
        setCouponApplied(true);
      }
    } else {
      alert("Invalid coupon code.");
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if at least 48 hours away (roughly 2 days)
    const diffTime = selectedDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const dayOfWeek = selectedDate.getUTCDay(); // 0 is Sunday, 4 is Thursday

    if (diffDays < 2) {
      setDateError("Please select a date at least 48 hours from today.");
    } else if (dayOfWeek !== 0 && dayOfWeek < 4) { // Not Thu, Fri, Sat, Sun
      setDateError("Delivery/Pickup is only available Thursday–Sunday.");
    } else {
      setDateError("");
    }
    setDate(e.target.value);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty.");
    if (!name.trim() || !contact.trim()) return alert("Please enter your name and contact info.");
    if (!date || dateError) return alert("Please select a valid date.");

    let itemsStr = cart.map(item => `- ${item.qty}x ${item.flavour} ${item.size}" ${item.halfAndHalf ? `(Half ${item.secondFlavour})` : ''}`).join('%0A');

    const body = `Hi Burnt Basque Co.!%0A%0A`
      + `Name: ${name}%0AContact: ${contact}%0A%0A`
      + `ORDER ITEMS:%0A${itemsStr}%0A%0A`
      + `Subtotal: $${cartSubtotal.toFixed(2)}%0A`
      + `Delivery: $${deliveryFee.toFixed(2)}%0A`
      + (discount > 0 ? `Discount (FIRST15): -$${discount.toFixed(2)}%0A` : '')
      + `Total: $${total.toFixed(2)}%0A%0A`
      + `Date: ${date}%0A`
      + `${delivery === 'delivery' ? 'Delivery' : 'Pickup'}%0A`
      + `Notes: ${notes || 'None'}`;

    if (calculatedCouponApplied) {
      setCouponUsed(true);
    }

    window.location.href = `mailto:burntbasqueco@gmail.com?subject=New Checkout Order&body=${body}`;
  };

  return (
    <section id="order" className="bg-white py-[90px]">
      <div className="max-w-[1140px] mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="block text-[0.7rem] tracking-[4px] uppercase text-gold-dark mb-3 font-semibold">Checkout</span>
          <h2 className="text-dark text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.15] font-serif font-bold">
            Complete your order.
          </h2>
          <p className="text-text-dim max-w-[480px] mx-auto mt-3 text-[0.92rem]">
            Review your cart and provide delivery details.
          </p>
        </Reveal>

        {cart.length === 0 ? (
          <div className="text-center p-12 bg-cream rounded-[16px] max-w-[600px] mx-auto border border-black/5">
            <h3 className="font-serif text-[1.4rem] font-bold mb-3">Your cart is empty!</h3>
            <p className="text-text-dim mb-6">Add some delicious cheesecake from our Flavours section.</p>
            <a href="#flavours" className="inline-block px-[34px] py-[14px] rounded-full font-sans font-semibold text-[0.82rem] tracking-[1.5px] uppercase bg-dark text-cream hover:bg-gold hover:text-dark transition-colors">
              Browse Flavours
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <Reveal className="bg-cream rounded-[16px] p-9 border border-black/5">
              <h3 className="font-serif text-[1.4rem] text-dark mb-6 font-bold">Your Details</h3>

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

              <div className="grid gap-3.5 mb-5">
                <div>
                  <label className="block text-[0.78rem] tracking-[1px] uppercase text-text-dim mb-2 font-semibold">Preferred Date (Thu–Sun only)</label>
                  <input type="date" value={date} onChange={handleDateChange} min={new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]} className={`w-full px-4 py-[13px] rounded-[10px] border-[1.5px] bg-white text-[0.9rem] focus:outline-none transition-colors ${dateError ? 'border-red-400 focus:border-red-500' : 'border-black/10 focus:border-gold'}`} />
                  {dateError && <p className="text-red-500 text-[0.75rem] mt-1.5">{dateError}</p>}
                </div>
                <div>
                  <label className="block text-[0.78rem] tracking-[1px] uppercase text-text-dim mb-2 font-semibold">Pickup / Delivery</label>
                  <select value={delivery} onChange={e => setDelivery(e.target.value)} className="w-full px-4 py-[13px] rounded-[10px] border-[1.5px] border-black/10 bg-white text-[0.9rem] focus:outline-none focus:border-gold transition-colors">
                    <option value="pickup">Pickup (Downtown Toronto)</option>
                    <option value="delivery">Delivery ($7.99, Free over $80)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[0.78rem] tracking-[1px] uppercase text-text-dim mb-2 font-semibold">Notes (optional)</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. extra for a birthday, allergies, etc." className="w-full px-4 py-[13px] rounded-[10px] border-[1.5px] border-black/10 bg-white text-[0.9rem] focus:outline-none focus:border-gold transition-colors min-h-[70px] resize-y" />
              </div>

              <div className="mt-5 border-t border-black/5 pt-5">
                <button onClick={() => setShowCoupon(!showCoupon)} className="flex items-center gap-2 text-[0.8rem] font-semibold tracking-[0.5px] uppercase text-gold hover:text-gold-dark transition-colors">
                  Have a coupon? <ChevronDown size={14} className={`transition-transform duration-300 ${showCoupon ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showCoupon && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="flex gap-2 mt-3">
                        <input type="text" value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter code" className="flex-1 px-4 py-2.5 rounded-[8px] border-[1.5px] border-black/10 bg-white text-[0.9rem] focus:outline-none focus:border-gold uppercase" disabled={calculatedCouponApplied} />
                        <button onClick={handleApplyCoupon} disabled={calculatedCouponApplied} className="px-5 py-2.5 rounded-[8px] bg-dark text-cream font-bold text-[0.8rem] tracking-[1px] uppercase disabled:opacity-50 hover:bg-gold hover:text-dark transition-colors">
                          {calculatedCouponApplied ? 'Applied' : 'Apply'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            <Reveal className="bg-cream rounded-[16px] p-9 border border-black/5 sticky top-[84px]">
              <h3 className="font-serif text-[1.4rem] text-dark mb-6 font-bold">Order Summary</h3>

              <div className="max-h-[240px] overflow-y-auto pr-2 mb-4 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-[0.85rem]">
                    <div className="flex flex-col">
                      <span className="font-medium text-dark">{item.qty}x {item.flavour} ({item.size}")</span>
                      {item.halfAndHalf && <span className="text-text-dim text-[0.75rem]">Half {item.secondFlavour}</span>}
                    </div>
                    <span className="font-medium text-dark">${(item.unitPrice * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-black/5 pt-4 space-y-2">
                <div className="flex justify-between text-[0.85rem]">
                  <span className="text-text-dim">Subtotal</span>
                  <span className="font-medium">${cartSubtotal.toFixed(2)}</span>
                </div>
                {delivery === "delivery" && (
                  <div className="flex justify-between text-[0.85rem]">
                    <span className="text-text-dim">Delivery</span>
                    <span className="font-medium">{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-[0.85rem] text-green-600">
                    <span>Discount (15%)</span>
                    <span className="font-medium">-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4 mt-4 border-t border-black/10 text-[1.2rem] font-bold text-dark">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button onClick={handleCheckout} className="w-full py-4 rounded-[10px] bg-dark text-cream font-sans font-bold text-[0.9rem] tracking-[1px] uppercase mt-5 transition-colors hover:bg-gold hover:text-dark flex items-center justify-center gap-2.5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                Pay with Stripe
              </button>
              <p className="text-[0.65rem] opacity-50 text-center mt-2.5">Secure payment powered by Stripe</p>
            </Reveal>
          </div>
        )}
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

const CartPanel = () => {
  const { cart, setCart, isCartOpen, setIsCartOpen } = useAppContext();

  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);

  const removeItem = (id: string) => setCart(c => c.filter(item => item.id !== id));

  const updateQty = (id: string, delta: number) => {
    setCart(c => c.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-cream z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-black/5">
              <h2 className="font-serif text-[1.4rem] font-bold">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="hover:opacity-60 transition-opacity"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="text-center text-text-dim mt-10">Your cart is empty.</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-black/5 pb-6">
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-[1.1rem]">
                        {item.flavour} {item.halfAndHalf ? `/ ${item.secondFlavour} (Half & Half)` : ''}
                      </h4>
                      <p className="text-[0.8rem] text-text-dim mb-2 mt-1">Size: {item.size}"</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3 border border-black/10 rounded-full px-2 py-1 bg-white">
                          <button onClick={() => updateQty(item.id, -1)} className="hover:text-gold"><Minus size={14} /></button>
                          <span className="text-[0.85rem] font-bold min-w-[12px] text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="hover:text-gold"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-[0.75rem] text-text-dim underline hover:text-dark">Remove</button>
                      </div>
                    </div>
                    <div className="font-bold text-[1rem]">${item.unitPrice * item.qty}</div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-black/5 bg-white">
                <div className="flex justify-between font-bold text-[1.2rem] mb-4">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-4 rounded-full bg-dark text-cream font-sans font-bold text-[0.9rem] tracking-[1px] uppercase transition-colors hover:bg-gold hover:text-dark"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const FirstPurchasePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      const timer = setTimeout(() => setIsOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('subscriberEmail', email);
      setShowCode(true);
      localStorage.setItem('hasVisited', 'true');
    }
  };

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('hasVisited', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-cream rounded-[20px] shadow-2xl w-full max-w-[440px] p-8 md:p-10 relative text-center"
      >
        <button onClick={closePopup} className="absolute top-4 right-4 text-text-dim hover:text-dark transition-colors">
          <X size={20} />
        </button>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.2rem)] font-bold text-dark leading-[1.15] mb-4">
          Get 15% Off Your First Order
        </h2>
        {showCode ? (
          <div className="bg-blush border border-peach rounded-[12px] p-6 mt-6">
            <p className="text-[0.85rem] text-dark font-medium mb-2 uppercase tracking-[1px]">Your Coupon Code:</p>
            <div className="font-serif text-[2.2rem] text-gold font-bold tracking-[2px]">FIRST15</div>
            <p className="text-[0.75rem] text-text-dim mt-3">Use this code at checkout.</p>
          </div>
        ) : (
          <>
            <p className="text-[0.9rem] text-text-dim mb-7 leading-[1.6]">
              Sign up for our newsletter to get your exclusive code and early access to seasonal flavours.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email" required placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-full border border-black/10 bg-white text-[0.95rem] focus:outline-none focus:border-gold transition-colors text-center"
              />
              <button type="submit" className="w-full py-3.5 rounded-full bg-gold text-white font-sans font-bold text-[0.85rem] tracking-[1.5px] uppercase transition-all hover:bg-gold-dark hover:-translate-y-0.5 shadow-lg">
                Get My Coupon
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

const DeliveryPickupInfo = () => {
  return (
    <section className="bg-blush-2 py-[90px]">
      <div className="max-w-[1140px] mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="block text-[0.7rem] tracking-[4px] uppercase text-gold-dark mb-3 font-semibold">Logistics</span>
          <h2 className="text-dark text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.15] font-serif font-bold">Delivery & Pickup</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          <Reveal className="bg-white p-8 rounded-[20px] shadow-sm border border-black/5 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-warm text-gold border border-peach rounded-full flex justify-center items-center mb-5">
              <MapPin size={24} />
            </div>
            <h3 className="font-serif text-[1.4rem] font-bold text-dark mb-2">Pickup</h3>
            <p className="text-[0.9rem] text-text-dim leading-[1.6]">
              Available Thursday–Sunday.<br />
              Location shared upon order confirmation.<br />
              Downtown Toronto, ON.
            </p>
          </Reveal>

          <Reveal className="bg-white p-8 rounded-[20px] shadow-sm border border-black/5 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-warm text-gold border border-peach rounded-full flex justify-center items-center mb-5">
              <Truck size={24} />
            </div>
            <h3 className="font-serif text-[1.4rem] font-bold text-dark mb-2">Delivery</h3>
            <p className="text-[0.9rem] text-text-dim leading-[1.6] mb-3">
              Available Thursday–Sunday across the GTA.<br />
              $7.99 delivery fee. <strong className="text-gold-dark">Free delivery on orders over $80.</strong>
            </p>
            <p className="text-[0.75rem] text-text-dim opacity-80 uppercase tracking-[1px]">
              Zones: Downtown Toronto, North York, Scarborough, Etobicoke, Mississauga, Markham, Richmond Hill, Vaughan
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const existing = JSON.parse(localStorage.getItem('newsletterEmails') || '[]');
      localStorage.setItem('newsletterEmails', JSON.stringify([...existing, email]));
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="bg-cream py-[90px] border-t border-black/5">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <Reveal>
          <div className="w-12 h-12 bg-blush text-gold border border-peach rounded-full flex justify-center items-center mx-auto mb-5">
            <Mail size={20} />
          </div>
          <h2 className="text-dark text-[clamp(1.8rem,3vw,2.2rem)] leading-[1.15] font-serif font-bold mb-3">Stay in the Loop</h2>
          <p className="text-[0.95rem] text-text-dim mb-8">
            Get early access to seasonal flavours, limited drops, and exclusive discounts.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email" required placeholder="Enter your email"
              value={email} onChange={e => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full border border-black/10 bg-white text-[0.95rem] focus:outline-none focus:border-gold transition-colors text-center sm:text-left"
            />
            <button type="submit" className="sm:w-auto w-full px-8 py-3.5 rounded-full bg-gold text-white font-sans font-bold text-[0.85rem] tracking-[1.5px] uppercase transition-all hover:bg-gold-dark hover:-translate-y-0.5 shadow-md">
              Subscribe
            </button>
          </form>
          <AnimatePresence>
            {submitted && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-600 text-[0.85rem] mt-4 font-semibold">
                Thanks for subscribing! Keep an eye on your inbox.
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bbCart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponUsed, setCouponUsed] = useState(() => {
    return localStorage.getItem('couponUsed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('bbCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('couponUsed', couponUsed ? 'true' : 'false');
  }, [couponUsed]);

  return (
    <AppContext.Provider value={{ cart, setCart, isCartOpen, setIsCartOpen, couponUsed, setCouponUsed }}>
      <div className="font-sans text-text-main bg-cream">
        <FirstPurchasePopup />
        <CartPanel />
        <Navbar />
        <Hero />
        <Marquee />
        <About />
        <Flavours />
        <HowItWorks />
        <Reviews />
        <Wholesale />
        <Order />
        <FAQ />
        <DeliveryPickupInfo />
        <Newsletter />
        <Footer />
        <FloatingOrder />
      </div>
    </AppContext.Provider>
  );
}
