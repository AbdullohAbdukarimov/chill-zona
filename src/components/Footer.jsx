import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Phone, Mail, MapPin, Send, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer = () => {
  const { navigate, updateFilters } = useApp();

  const handleCategoryClick = (catId) => {
    updateFilters({ categories: [catId] });
    navigate('explore');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => navigate('home')}
              className="flex items-center gap-3 cursor-pointer group inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-orange-400 transition-colors">
                Chill zone
              </span>
            </div>
            
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Toshkent va O‘zbekiston bo‘ylab eng qiziqarli ko‘ngilochar maskanlar, kvestlar, bouling, sport va romantik sarguzashtlarni bir necha soniyada bron qiling.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+998 (71) 200-44-22 (Call-markaz 24/7)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Send className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Telegram: @chillzone_support_bot</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Toshkent sh., Mirobod t., Oybek ko‘chasi 42-uy</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              Toifalar
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => handleCategoryClick('kvest')} className="hover:text-orange-400 transition-colors">
                  Kvest xonalari (Horror / Escape)
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('sport')} className="hover:text-orange-400 transition-colors">
                  Karting va Drift Arena
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('romantik')} className="hover:text-orange-400 transition-colors">
                  Tomdagi Romantik Kechalar
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('bouling')} className="hover:text-orange-400 transition-colors">
                  Bouling & Bilyard Klublari
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('ot-minish')} className="hover:text-orange-400 transition-colors">
                  Chorvoq Ot Sayri va Piknik
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('oilaviy')} className="hover:text-orange-400 transition-colors">
                  Oilaviy Akvapark & Okeanarium
                </button>
              </li>
            </ul>
          </div>

          {/* Foydalanuvchilarga */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Foydalanuvchilarga
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => navigate('explore')} className="hover:text-orange-400 transition-colors">
                  Barcha xizmatlar katalogi
                </button>
              </li>
              <li>
                <button onClick={() => navigate('user-dashboard')} className="hover:text-orange-400 transition-colors">
                  Mening chiptalarim va QR kodlar
                </button>
              </li>
              <li>
                <span className="hover:text-orange-400 cursor-pointer transition-colors">
                  Xavfsizlik va pulni qaytarish
                </span>
              </li>
              <li>
                <span className="hover:text-orange-400 cursor-pointer transition-colors">
                  Ko‘p beriladigan savollar (FAQ)
                </span>
              </li>
              <li>
                <span className="hover:text-orange-400 cursor-pointer transition-colors">
                  Sovg‘a sertifikatlari
                </span>
              </li>
            </ul>
          </div>

          {/* Biznes uchun */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Hamkorlarga
            </h4>
            <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700/60 mb-3">
              <p className="text-xs text-stone-300 font-medium mb-2.5">
                Ko‘ngilochar maskaningiz bormi? Mijozlar oqimini oshiring!
              </p>
              <button
                onClick={() => navigate('partner-dashboard')}
                className="w-full py-2 px-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold rounded-lg transition-all shadow-md"
              >
                Hamkor Kabineti
              </button>
            </div>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <span className="hover:text-orange-400 cursor-pointer transition-colors">
                  Hamkorlik shartlari (0% komissiya)
                </span>
              </li>
              <li>
                <span className="hover:text-orange-400 cursor-pointer transition-colors">
                  Reklama va banner joylashtirish
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span>© 2026 Chill zone (Hordiq-Pro). Barcha huquqlar himoyalangan.</span>
            <span className="text-stone-600">|</span>
            <span className="flex items-center gap-1 text-stone-300">
              Made with <Heart className="w-3 h-3 text-orange-500 fill-orange-500 inline" /> in Tashkent
            </span>
          </div>

          {/* Payment Methods Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-stone-300 font-medium">To‘lov tizimlari:</span>
            <span className="px-2.5 py-1 bg-stone-800 border border-stone-700 rounded-md text-[11px] font-bold text-sky-400">
              Payme
            </span>
            <span className="px-2.5 py-1 bg-stone-800 border border-stone-700 rounded-md text-[11px] font-bold text-emerald-400">
              Click Up
            </span>
            <span className="px-2.5 py-1 bg-stone-800 border border-stone-700 rounded-md text-[11px] font-bold text-purple-400">
              Uzum Bank
            </span>
            <span className="px-2 py-1 bg-stone-800 border border-stone-700 rounded-md text-[10px] font-semibold text-stone-300">
              UZCARD
            </span>
            <span className="px-2 py-1 bg-stone-800 border border-stone-700 rounded-md text-[10px] font-semibold text-amber-300">
              HUMO
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
