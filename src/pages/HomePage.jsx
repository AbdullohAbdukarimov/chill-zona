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
  const { navigate, updateFilters, favorites, toggleFavorite, t } = useApp();

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
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-slate-100 transition-colors duration-300">
      
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
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/60" />
          <div className="absolute inset-0 bg-radial from-orange-500/15 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs sm:text-sm font-bold backdrop-blur-md mb-6 shadow-lg shadow-orange-500/10">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>{t('heroBadge')}</span>
          </div>

          {/* Big Bold Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-4xl text-balance drop-shadow-md">
            {t('heroTitlePrefix')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              {t('heroTitleHighlight')}
            </span>
          </h1>

          {/* Subheader */}
          <p className="mt-6 text-base sm:text-xl text-stone-300 max-w-2xl font-normal leading-relaxed drop-shadow">
            {t('heroSubtitle')}
          </p>

          {/* COMPREHENSIVE SEARCH BAR */}
          <div className="w-full max-w-4xl mt-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800 transition-colors">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Location Dropdown */}
              <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 dark:bg-slate-800/80 hover:bg-stone-100 dark:hover:bg-slate-800 rounded-2xl border border-stone-200/80 dark:border-slate-700 transition-colors">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <div className="text-left w-full">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-400">
                    {t('searchLocation')}
                  </span>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-stone-800 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="" className="dark:bg-slate-900">{t('searchAllDistricts')}</option>
                    {DISTRICTS.map((d) => (
                      <option key={d} value={d} className="dark:bg-slate-900">{d} tumani</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Picker */}
              <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 dark:bg-slate-800/80 hover:bg-stone-100 dark:hover:bg-slate-800 rounded-2xl border border-stone-200/80 dark:border-slate-700 transition-colors">
                <Calendar className="w-5 h-5 text-orange-500 shrink-0" />
                <div className="text-left w-full">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-400">
                    {t('searchDate')}
                  </span>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-stone-800 dark:text-white focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 dark:bg-slate-800/80 hover:bg-stone-100 dark:hover:bg-slate-800 rounded-2xl border border-stone-200/80 dark:border-slate-700 transition-colors">
                <Tag className="w-5 h-5 text-orange-500 shrink-0" />
                <div className="text-left w-full">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-400">
                    {t('searchCategory')}
                  </span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-stone-800 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="" className="dark:bg-slate-900">{t('searchAllCategories')}</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id} className="dark:bg-slate-900">{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full h-full py-4 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
                <span>{t('searchBtn')}</span>
              </button>

            </form>
          </div>

          {/* Trust stats pill list */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{t('statsBookings')}</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{t('statsVenues')}</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{t('statsGuaranteed')}</span>
            </span>
          </div>

        </div>
      </section>

      {/* 2. CATEGORIES ROW */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
              {t('categoriesTitle')}
            </h2>
            <p className="text-sm text-stone-500 dark:text-slate-400 mt-1">
              {t('categoriesSubtitle')}
            </p>
          </div>
          <button
            onClick={() => navigate('explore')}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors"
          >
            <span>{t('viewAll')}</span>
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
                className="group flex flex-col items-center p-5 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-slate-800 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-amber-500 flex items-center justify-center transition-all duration-300 shadow-inner mb-3">
                  <IconComponent className="w-7 h-7 text-orange-600 dark:text-orange-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-stone-400 dark:text-slate-500 mt-0.5">
                  {cat.count} ta maskan
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. TRENDDAGI JOYLAR (TRENDING ACTIVITIES) SECTION */}
      <section className="py-12 bg-stone-100/70 dark:bg-slate-900/50 border-y border-stone-200/60 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-orange-500 text-white text-[11px] font-black uppercase rounded-md tracking-wider">
                  {t('trendingBadge')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
                  {t('trendingTitle')}
                </h2>
              </div>
              <p className="text-sm text-stone-500 dark:text-slate-400 mt-1">
                {t('trendingSubtitle')}
              </p>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTrending('left')}
                className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-600 transition-all shadow-sm cursor-pointer"
                aria-label="Oldingi"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTrending('right')}
                className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-600 transition-all shadow-sm cursor-pointer"
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
                  className="w-80 sm:w-96 shrink-0 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl hover:border-orange-300 dark:hover:border-orange-500 transition-all duration-300 overflow-hidden flex flex-col snap-start group"
                >
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden bg-stone-200 dark:bg-slate-800">
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
                      className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md hover:bg-white dark:hover:bg-slate-900 text-stone-600 dark:text-slate-300 hover:text-orange-500 transition-all shadow-md group/btn cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'text-orange-500 fill-orange-500' : 'group-hover/btn:text-orange-500'}`} />
                    </button>

                    {/* District Pill */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-stone-800 dark:text-white text-xs font-semibold flex items-center gap-1 shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span>{act.district} tumani</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-slate-400 mb-1.5">
                        <div className="flex items-center text-amber-500 font-bold">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                          <span>{act.rating}</span>
                        </div>
                        <span>•</span>
                        <span>({act.reviewsCount} {t('reviewsCount')})</span>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => navigate('activity', act.id)}
                        className="font-bold text-base text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 cursor-pointer"
                      >
                        {act.title}
                      </h3>
                      
                      <p className="text-xs text-stone-500 dark:text-slate-400 mt-2 line-clamp-2">
                        {act.description}
                      </p>
                    </div>

                    {/* Bottom Price & CTA */}
                    <div className="pt-4 mt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-slate-500 block">
                          {t('startFrom')}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-orange-600 dark:text-orange-400">
                            {act.price.toLocaleString('uz-UZ')} UZS
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate('activity', act.id)}
                        className="py-2.5 px-4 bg-orange-50 dark:bg-slate-800 hover:bg-orange-500 dark:hover:bg-orange-500 text-orange-600 dark:text-orange-400 hover:text-white dark:hover:text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                      >
                        {t('btnDetails')}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* WHY JOYBAND (BENEFITS) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-800">
            {t('whyTitle')}
          </span>
          <h2 className="text-3xl font-black text-stone-900 dark:text-white mt-3">
            {t('whySubtitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all text-left">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-2">{t('benefit1Title')}</h3>
            <p className="text-xs text-stone-500 dark:text-slate-400 leading-relaxed">
              {t('benefit1Desc')}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all text-left">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-2">{t('benefit2Title')}</h3>
            <p className="text-xs text-stone-500 dark:text-slate-400 leading-relaxed">
              {t('benefit2Desc')}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all text-left">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold mb-4">
              <Star className="w-6 h-6 fill-orange-500 text-orange-500" />
            </div>
            <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-2">{t('benefit3Title')}</h3>
            <p className="text-xs text-stone-500 dark:text-slate-400 leading-relaxed">
              {t('benefit3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 4. "BIZNESINGIZ BORMI?" (BECOME A PARTNER) CTA SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-orange-950 dark:from-slate-900 dark:via-slate-900 dark:to-orange-950/80 p-8 sm:p-12 lg:p-16 overflow-hidden border border-stone-800 dark:border-slate-800 shadow-2xl">
          
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold rounded-full">
                <Building2 className="w-3.5 h-3.5" />
                <span>{t('partnerCtaBadge')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {t('partnerCtaTitle')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                  {t('partnerCtaHighlight')}
                </span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-lg">
                {t('partnerCtaDesc')}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('partner-dashboard')}
                  className="py-4 px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-3 transition-all hover:scale-105 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{t('partnerBtnJoin')}</span>
                </button>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-white/10 dark:border-slate-700/60 p-6 text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 dark:border-slate-700 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold">
                    JB
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">JoyBand Partner Portal</h4>
                    <span className="text-xs text-stone-400 dark:text-slate-400">Jonli demo statistikasi</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">
                  {t('statusActive')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-900/60 dark:bg-slate-900/80 rounded-xl border border-stone-800 dark:border-slate-800">
                  <span className="text-stone-400 dark:text-slate-400 block text-[10px]">Oylik yangi mijozlar</span>
                  <span className="text-xl font-bold text-white mt-1 block">+420 ta</span>
                </div>
                <div className="p-3 bg-stone-900/60 dark:bg-slate-900/80 rounded-xl border border-stone-800 dark:border-slate-800">
                  <span className="text-stone-400 dark:text-slate-400 block text-[10px]">Oylik sof aylanma</span>
                  <span className="text-xl font-bold text-orange-400 mt-1 block">48.6 mln so‘m</span>
                </div>
              </div>

              <p className="text-xs text-stone-300 dark:text-slate-300 italic pt-2">
                "JoyBand orqali kvest zalimizga kunlik buyurtmalar 3 barobarga oshdi. Barcha jarayon to‘liq avtomatlashgan."
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
