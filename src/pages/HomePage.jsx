import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CATEGORIES, 
  DISTRICTS, 
  MOCK_ACTIVITIES 
} from '../data/mockData';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Tag, 
  Star, 
  Heart, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Trophy, 
  Ghost, 
  Users, 
  Flame, 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  Building2, 
  CheckCircle,
  TrendingUp
} from 'lucide-react';

const categoryIconMap = {
  sport: Trophy,
  kvest: Ghost,
  romantik: Heart,
  oilaviy: Users,
  bouling: Flame,
  'ot-minish': Compass
};

export const HomePage = () => {
  const { navigate, updateFilters, favorites, toggleFavorite } = useApp();

  // Search Bar State
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-10-18');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Horizontal scroll ref for trending activities
  const scrollContainerRef = useRef(null);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    updateFilters({
      districts: selectedDistrict ? [selectedDistrict] : [],
      categories: selectedCategory ? [selectedCategory] : [],
      selectedDate: selectedDate
    });
    navigate('explore');
  };

  const handleCategorySelect = (categoryId) => {
    updateFilters({ categories: [categoryId] });
    navigate('explore');
  };

  const scrollTrending = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const trendingActivities = MOCK_ACTIVITIES.filter(a => a.isTrending || a.featured);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      
      {/* 1. MASSIVE HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark & Vibrant Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80"
            alt="Entertainment in Tashkent"
            className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-1000"
            style={{ animationDuration: '10s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-900/60" />
          <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs sm:text-sm font-bold backdrop-blur-md mb-6 shadow-lg shadow-orange-500/10">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>O‘zbekistondagi #1 Ko‘ngilochar va Faol Dam Olish Ekotizimi</span>
          </div>

          {/* Big Bold Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-4xl text-balance drop-shadow-md">
            Toshkentda dam olishning <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">yangi darajasi</span>
          </h1>

          {/* Subheader */}
          <p className="mt-6 text-base sm:text-xl text-stone-300 max-w-2xl font-normal leading-relaxed drop-shadow">
            100+ dan ortiq kvestlar, bouling, sport majmualari, ot sporti va romantik maskanlar — barchasi bir joyda onlayn tezkor bron qilish bilan.
          </p>

          {/* COMPREHENSIVE SEARCH BAR */}
          <div className="w-full max-w-4xl mt-10 bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/20">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Location Dropdown */}
              <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200/80 transition-colors">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <div className="text-left w-full">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Joylashuv
                  </span>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-stone-800 focus:outline-none cursor-pointer"
                  >
                    <option value="">Barcha tumanlar</option>
                    {DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d} tumani</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Picker */}
              <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200/80 transition-colors">
                <Calendar className="w-5 h-5 text-orange-500 shrink-0" />
                <div className="text-left w-full">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Qachon
                  </span>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-stone-800 focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200/80 transition-colors">
                <Tag className="w-5 h-5 text-orange-500 shrink-0" />
                <div className="text-left w-full">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Toifa
                  </span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-stone-800 focus:outline-none cursor-pointer"
                  >
                    <option value="">Barcha toifalar</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full h-full py-4 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
                <span>Qidirish</span>
              </button>

            </form>
          </div>

          {/* Trust stats pill list */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>50,000+ muvaffaqiyatli band qilishlar</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>250+ tekshirilgan maskanlar</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>100% kafolatlangan joy</span>
            </span>
          </div>

        </div>
      </section>

      {/* 2. CATEGORIES ROW */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Dam olish toifasini tanlang
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Har qanday kayfiyat va qiziqish uchun saralangan sarguzashtlar
            </p>
          </div>
          <button
            onClick={() => navigate('explore')}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <span>Barchasini ko‘rish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Circular icons row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const IconComponent = categoryIconMap[cat.id] || Compass;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className="group flex flex-col items-center p-5 bg-white rounded-3xl border border-stone-200/80 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-50 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-amber-500 flex items-center justify-center transition-all duration-300 shadow-inner mb-3">
                  <IconComponent className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-stone-400 mt-0.5">
                  {cat.count} ta maskan
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. TRENDDAGI JOYLAR (TRENDING ACTIVITIES) SECTION */}
      <section className="py-12 bg-stone-100/70 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-orange-500 text-white text-[11px] font-black uppercase rounded-md tracking-wider">
                  TOP REYTINQ
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  Trenddagi joylar
                </h2>
              </div>
              <p className="text-sm text-stone-500 mt-1">
                Toshkent ahlini o‘ziga rom etayotgan eng mashhur va qaynoq maskanlar
              </p>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTrending('left')}
                className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-all shadow-sm"
                aria-label="Oldingi"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTrending('right')}
                className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-all shadow-sm"
                aria-label="Keyingi"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal scrollable row */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {trendingActivities.map((act) => {
              const isFav = favorites.includes(act.id);
              return (
                <div
                  key={act.id}
                  className="w-80 sm:w-96 shrink-0 bg-white rounded-3xl border border-stone-200/80 shadow-md hover:shadow-2xl hover:border-orange-300 transition-all duration-300 overflow-hidden flex flex-col snap-start group"
                >
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden bg-stone-200">
                    <img
                      src={act.images[0]}
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-bold rounded-full">
                        {act.categoryName}
                      </span>
                      {act.discount && (
                        <span className="px-2 py-1 bg-red-500 text-white text-[11px] font-black rounded-full">
                          -{act.discount}% AKSIYA
                        </span>
                      )}
                    </div>

                    {/* Heart button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(act.id);
                      }}
                      className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-stone-600 hover:text-orange-500 transition-all shadow-md group/btn"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'text-orange-500 fill-orange-500' : 'group-hover/btn:text-orange-500'}`} />
                    </button>

                    {/* District Pill */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-stone-800 text-xs font-semibold flex items-center gap-1 shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span>{act.district} tumani</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
                        <div className="flex items-center text-amber-500 font-bold">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                          <span>{act.rating}</span>
                        </div>
                        <span>•</span>
                        <span>({act.reviewsCount} ta sharh)</span>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => navigate('activity', act.id)}
                        className="font-bold text-base text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2 cursor-pointer"
                      >
                        {act.title}
                      </h3>
                      
                      <p className="text-xs text-stone-500 mt-2 line-clamp-2">
                        {act.description}
                      </p>
                    </div>

                    {/* Bottom Price & CTA */}
                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-400 block">
                          Boshlang‘ich narx:
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-orange-600">
                            {act.price.toLocaleString('uz-UZ')} UZS
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate('activity', act.id)}
                        className="py-2.5 px-4 bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                      >
                        Batafsil
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* WHY CHILL ZONE (BENEFITS) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Nega aynan Chill zone?
          </span>
          <h2 className="text-3xl font-black text-stone-900 mt-3">
            Hordiq chiqarishning zamonaviy standarti
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-lg transition-all text-left">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900 mb-2">Qo‘ng‘iroqsiz onlayn bron</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Operator javobini kutish shart emas. Real vaqt rejimida bo‘sh vaqtlarni ko‘ring va 30 soniyada o‘rningizni band qiling.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-lg transition-all text-left">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900 mb-2">100% Kafolatlangan narx</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Yashirin to‘lovlarsiz, joyning o‘zidagi rasmiy narxlar. Bekor qilish bo‘lsa, to‘lovingiz to‘liq qaytariladi.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-lg transition-all text-left">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold mb-4">
              <Star className="w-6 h-6 fill-orange-500 text-orange-500" />
            </div>
            <h3 className="font-bold text-lg text-stone-900 mb-2">Haqiqiy sharhlar va reyting</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Faqatgina maskanga tashrif buyurib xizmatdan foydalangan mehmonlarning xolis fikr va fotosuratlari.
            </p>
          </div>
        </div>
      </section>

      {/* 4. "BIZNESINGIZ BORMI?" (BECOME A PARTNER) CTA SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-orange-950 p-8 sm:p-12 lg:p-16 overflow-hidden border border-stone-800 shadow-2xl">
          
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold rounded-full">
                <Building2 className="w-3.5 h-3.5" />
                <span>Entertainment Biznes egalari uchun</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Biznesingiz bormi? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                  Mijozlaringizni 3 baravarga oshiring!
                </span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-lg">
                O‘z kvest zali, bouling klubi, sport arenasi, ot maktabi yoki ko‘ngilochar maskaningizni Chill zone platformasiga qo‘shing. Dastlabki 30 kun 0% komissiya!
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-stone-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Avtomatlashtirilgan CRM taqvim</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real vaqt rejimida daromad statistikasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Payme & Click to‘g‘ridan-to‘g‘ri hisobga</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24/7 Shaxsiy menedjer yordami</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('partner-dashboard')}
                  className="py-4 px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-3 transition-all hover:scale-105"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Hamkor bo‘lish (Bepul ro‘yxatdan o‘tish)</span>
                </button>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6 text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold">
                    CZ
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Hamkor Kabineti Ko‘rinishi</h4>
                    <span className="text-xs text-stone-400">Jonli demo statistikasi</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">
                  Faol Maskan
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">Oylik yangi mijozlar</span>
                  <span className="text-xl font-bold text-white mt-1 block">+420 ta</span>
                </div>
                <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">Oylik sof aylanma</span>
                  <span className="text-xl font-bold text-orange-400 mt-1 block">48.6 mln so‘m</span>
                </div>
              </div>

              <p className="text-xs text-stone-300 italic pt-2">
                "Chill zone tufayli bizning kvest xonamizga kunlik buyurtmalar 2.5 barobar oshdi. Mijozlar qo‘ng‘iroq qilmasdan o‘zi bron qilib keladi."
              </p>
              <span className="text-[11px] font-bold text-orange-400 block">
                — Rustam K., Questoria Tashkent asoschisi
              </span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
