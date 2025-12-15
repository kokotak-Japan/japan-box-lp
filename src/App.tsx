import React, { useState, useEffect } from 'react';
import { Leaf, Flame, Heart, Sprout, Soup, Tv, X, Check, BookOpen, Hammer, Clock, Shield } from 'lucide-react';

// ==========================================
// 🛠 CTO設定エリア: IDを入れてください！
// ==========================================
const CONFIG = {
  // Google Analytics 4 (測定ID: G-XXXXXXXXXX)
  GA_ID: 'G-WV1R8H7CV6', 
  
  // Meta (Facebook) Pixel (ID: 123456789012345)
  PIXEL_ID: '1585984742559528', 
  
  // フォームの送信先URL (GASのウェブアプリURL)
  FORM_ENDPOINT: 'https://script.google.com/macros/s/AKfycbw1U0GZjl1_-EDYmNl4pKs6Ib6kJPqEjEeNLiH_ivN5jfhvgNbx2xs3hmq6aZx9Yv4uFA/exec', 

  // ローンチまでの日数
  DAYS_TO_LAUNCH: 2,

  // お問い合わせ先メールアドレス
  CONTACT_EMAIL: 'contact@ai2i.jp'
};

interface Box {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  accent: string;
  image: string;
  tags: string[];
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer?: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _fbq?: any;
  }
}

const JapanBoxConceptTest = () => {
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && ['wellness', 'gourmet'].includes(tabParam)) {
        setActiveTab(tabParam);
      }

      // 🚨 修正: GA4の読み込みコードを削除しました（index.htmlにあるため不要）
      
      // 3. Facebook Pixelのロード
      if (CONFIG.PIXEL_ID) {
        if (!window.fbq) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const n = function(this: any, ...args: any[]) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
          } as any;
          
          if (!window._fbq) window._fbq = n;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          n.push = n;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          n.loaded = true;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          n.version = '2.0';
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          n.queue = [];
          
          const t = document.createElement('script');
          t.async = true;
          t.src = 'https://connect.facebook.net/en_US/fbevents.js';
          const s = document.getElementsByTagName('script')[0];
          if (s && s.parentNode) {
            s.parentNode.insertBefore(t, s);
          }
          
          window.fbq = n;
        }
        
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        window.fbq?.('init', CONFIG.PIXEL_ID);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        window.fbq?.('track', 'PageView');
      }
    }
  }, []);

  const boxes: Box[] = [
    {
      id: 'zen',
      category: 'wellness',
      title: 'ZEN Retreat Box',
      subtitle: 'Onsen, Incense, Tea etc.',
      description: 'Transform your home into a Japanese ryokan. Experience mindfulness with authentic bath salts (Onsen), temple-grade incense, and meditative green tea.',
      icon: <Leaf className="w-6 h-6" />,
      color: 'bg-emerald-900',
      accent: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1743502731652-998808775394?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      tags: ['Relaxation', 'Wellness', 'Spa']
    },
    {
      id: 'izakaya',
      category: 'gourmet',
      title: 'Izakaya "Otsumami" Box',
      subtitle: 'Authentic Bar Snacks for Home Drinking',
      description: 'Elevate your evening drink. A curated selection of premium Japanese savory snacks (Otsumami) - including smoked delicacies, crackers, and seafood - crafted by artisans.',
      icon: <Flame className="w-6 h-6" />,
      color: 'bg-stone-900',
      accent: 'text-amber-500',
      image: 'https://images.unsplash.com/photo-1617870314635-fc819547ec11?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      tags: ['Savory', 'Craft', 'Premium']
    },
    {
      id: 'longevity',
      category: 'wellness',
      title: 'Japanese Longevity Food Box',
      subtitle: 'Traditional Meals of Centenarians',
      description: 'Eat like a Japanese centenarian. A variety of nutrient-rich foods such as fermented goods (Miso, Natto culture), seaweed, and traditional staples for a healthy life.',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-orange-950',
      accent: 'text-orange-300',
      image: 'https://plus.unsplash.com/premium_photo-1661964226485-cb36c649e9bd?q=80&w=1012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      tags: ['Health', 'Fermentation', 'Tradition']
    },
    {
      id: 'vegan',
      category: 'wellness',
      title: 'Japanese Vegan Box',
      subtitle: 'Plant-Based & Spiritually Pure',
      description: 'Discover the depth of Japanese plant-based cuisine. From Zen-inspired Shojin dishes to modern vegan treats. 100% plant-based, umami-rich, and healthy.',
      icon: <Sprout className="w-6 h-6" />,
      color: 'bg-green-800',
      accent: 'text-green-300',
      image: 'https://images.unsplash.com/photo-1763470260582-894ae15f43bb?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      tags: ['Vegan', 'Clean Eating', 'Umami']
    },
    {
      id: 'ramen',
      category: 'gourmet',
      title: 'Regional Ramen Tour',
      subtitle: 'Hokkaido to Okinawa',
      description: 'Experience the true diversity of Japanese Ramen. From rich Hokkaido Miso to creamy Hakata Tonkotsu. Authentic regional bowls with premium broth and chewy noodles that rival your favorite ramen shop.',
      icon: <Soup className="w-6 h-6" />,
      color: 'bg-red-950',
      accent: 'text-red-400',
      image: 'https://images.unsplash.com/photo-1749957596846-c6595328a118?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      tags: ['Comfort Food', 'Noodles', 'Authentic']
    },
    {
      id: 'anime',
      category: 'gourmet',
      title: 'Anime "Real Food" Box',
      subtitle: 'Inspired by Your Favorite Scenes',
      description: 'Bring 2D flavors to 3D life. We curate snacks similar to those seen in popular anime and provide recipes to recreate iconic dishes at home. (Fan-curated)',
      icon: <Tv className="w-6 h-6" />,
      color: 'bg-indigo-950',
      accent: 'text-indigo-400',
      image: 'https://images.unsplash.com/photo-1763469866616-2d7d7198c46c?q=80&w=737&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      tags: ['Pop Culture', 'Fun', 'Trendy']
    }
  ];

  const handleBoxClick = (box: Box) => {
    console.log("Box Clicked:", box.id); // 🔍 確認用ログ
    
    if (typeof window !== 'undefined' && window.gtag) {
      console.log("Sending event to GA4: select_content"); // 🔍 確認用ログ
      window.gtag('event', 'select_content', {
        content_type: 'box',
        item_id: box.id
      });
    } else {
      console.log("GA4 not found"); // 🔍 GA4がいない場合
    }
    
    setSelectedBox(box);
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBox) return;
    
    setIsSubmitting(true);

    // Tracking
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        console.log("Sending event to GA4: generate_lead"); // 🔍 確認用ログ
        window.gtag('event', 'generate_lead', { 
          box_preference: selectedBox.title 
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (window.fbq) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        window.fbq?.('track', 'CompleteRegistration', {
          content_name: selectedBox.title
        });
      }
    }

    // GAS (Google Apps Script) Submission
    if (CONFIG.FORM_ENDPOINT) {
      try {
        await fetch(CONFIG.FORM_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors', 
          headers: {
            'Content-Type': 'text/plain;charset=utf-8', 
          },
          body: JSON.stringify({
            email: email,
            box_preference: selectedBox.title,
            timestamp: new Date().toISOString()
          })
        });
        setSubmitted(true);
      } catch (error) {
        console.error("Submission Error", error);
        setSubmitted(true);
      }
    } else {
      setTimeout(() => {
        setSubmitted(true);
      }, 500);
    }
    
    setIsSubmitting(false);
  };

  const filteredBoxes = activeTab === 'all' 
    ? boxes 
    : boxes.filter(box => box.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* Urgency Banner */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center text-sm font-bold tracking-wide flex items-center justify-center gap-2">
        <Clock className="w-4 h-4 text-red-500" />
        <span>Pre-launch: Official Release in <span className="text-red-400 underline">{CONFIG.DAYS_TO_LAUNCH} Days</span>. Limited Quantity Available.</span>
      </div>

      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 text-xs font-bold tracking-widest uppercase mb-4">
            Curated from Japan
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">
            What is your <span className="text-red-600">Japan Vibe</span>?
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-8">
            We are launching new subscription boxes. <br className="hidden md:block" />
            Vote for your favorite theme and secure your spot on the waitlist.
          </p>

          {/* Category Tabs */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
             <button 
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === 'all' 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-400'
              }`}
            >
              All Collection
            </button>
            <button 
              onClick={() => setActiveTab('wellness')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'wellness' 
                ? 'bg-emerald-700 text-white shadow-md' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              <Leaf className="w-4 h-4" /> Wellness & Calm
            </button>
            <button 
              onClick={() => setActiveTab('gourmet')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'gourmet' 
                ? 'bg-amber-700 text-white shadow-md' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-amber-300 hover:text-amber-700'
              }`}
            >
              <Flame className="w-4 h-4" /> Taste & Culture
            </button>
          </div>
        </div>
      </header>

      {/* The Grid */}
      <section className="py-12 px-6 bg-slate-50 min-h-[500px] flex-grow">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredBoxes.map((box) => (
              <div 
                key={box.id}
                onClick={() => handleBoxClick(box)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 hover:-translate-y-1"
              >
                {/* Image Area */}
                <div className="h-48 overflow-hidden relative">
                  <div className={`absolute inset-0 ${box.color} opacity-20 group-hover:opacity-10 transition-opacity z-10`}></div>
                  <img src={box.image} alt={box.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                    <div className={box.accent}>{box.icon}</div>
                  </div>
                  {/* Vote Badge */}
                  <div className="absolute bottom-4 right-4 z-20 bg-white text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Select this Box
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {box.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-slate-800 group-hover:text-red-600 transition-colors">
                    {box.title}
                  </h3>
                  <p className={`text-sm font-medium mb-3 ${box.accent.replace('text-', 'text-opacity-80 text-')}`}>
                    {box.subtitle}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {box.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {filteredBoxes.length === 0 && (
             <div className="text-center py-20 text-slate-400">
               No boxes found in this category.
             </div>
          )}
        </div>
      </section>

      {/* Common Features Section */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Included in Every Box</h2>
            <p className="text-slate-500">Not just products. We deliver the full cultural experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-red-600">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Culture Guidebook</h3>
              <p className="text-sm text-slate-500">In-depth booklet explaining the origin, history, and "how-to-enjoy" for every item.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-red-600">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Artisan Stories</h3>
              <p className="text-sm text-slate-500">Meet the makers. We share the stories of the local craftsmen behind the products.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-red-600">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">English Support</h3>
              <p className="text-sm text-slate-500">All labels translated. Full ingredient lists and allergen info in English.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Privacy Policy */}
      <footer className="bg-slate-900 py-8 text-center text-slate-500 text-sm">
        <p>&copy; 2024 Japan Box Project. All rights reserved.</p>
        <button 
          onClick={() => setShowPrivacy(true)}
          className="mt-2 text-slate-400 hover:text-white underline flex items-center justify-center gap-1 mx-auto"
        >
          <Shield className="w-3 h-3" /> Privacy Policy
        </button>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 relative">
            <button 
              onClick={() => setShowPrivacy(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <div className="text-slate-600 space-y-4 text-sm leading-relaxed">
              <p><strong>Last Updated: October 2024</strong></p>
              <p>This Privacy Policy describes how Japan Box Project collects, uses, and discloses your Personal Information when you join our waitlist.</p>
              
              <h3 className="font-bold text-slate-800">1. Information We Collect</h3>
              <p>We only collect your email address and your box preference when you voluntarily sign up for our waitlist. We do not collect payment information at this stage.</p>

              <h3 className="font-bold text-slate-800">2. How We Use Your Information</h3>
              <p>We use your email address solely to notify you when our product launches or to provide updates regarding the Japan Box Project. We do not sell your data to third parties.</p>

              <h3 className="font-bold text-slate-800">3. Data Security</h3>
              <p>We implement reasonable security measures to protect your information.</p>

              <h3 className="font-bold text-slate-800">4. Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, please contact us at <strong>{CONFIG.CONTACT_EMAIL}</strong>.</p>
            </div>
            <button 
              onClick={() => setShowPrivacy(false)}
              className="mt-8 w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal / Fake Door Form */}
      {selectedBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-slide-up">
            
            <button 
              onClick={() => setSelectedBox(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-full z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className={`h-32 ${selectedBox.color} relative flex items-center justify-center`}>
                  <img src={selectedBox.image} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                  <div className="relative z-10 text-white flex flex-col items-center text-center p-4">
                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-md mb-2">
                      {selectedBox.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white shadow-sm">{selectedBox.title}</h3>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                      Almost Full
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Secure Early Access</h4>
                  <p className="text-slate-500 text-sm mb-6">
                    Launch is in {CONFIG.DAYS_TO_LAUNCH} days. Quantities are extremely limited. Join the waitlist to secure your <strong>{selectedBox.title}</strong> before it sells out.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-600/20 ${isSubmitting ? 'bg-slate-400 cursor-wait' : 'bg-red-600 hover:bg-red-700'}`}
                    >
                      {isSubmitting ? 'Securing Spot...' : 'Join Waitlist & Secure Spot'}
                    </button>
                    <p className="text-center text-xs text-slate-400">
                      We'll email you the secret purchase link on launch day.
                    </p>
                  </form>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Spot Secured!</h3>
                <p className="text-slate-500 mb-6">
                  You are on the list for <strong>{selectedBox.title}</strong>. <br/>
                  Keep an eye on your inbox next week.
                </p>
                <button 
                  onClick={() => setSelectedBox(null)}
                  className="text-red-600 font-bold text-sm hover:underline"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-slide-up { animation: slide-up 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default JapanBoxConceptTest;
