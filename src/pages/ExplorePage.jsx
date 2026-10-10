import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CATEGORIES, 
  DISTRICTS, 
  MOCK_ACTIVITIES 
} from '../data/mockData';
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  Heart, 
  MapPin, 
  Clock, 
  Users, 
  ArrowUpDown, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X, 
  Filter
} from 'lucide-react';

export const ExplorePage = () => {
  const { 
    filters, 
    updateFilters, 
    resetFilters, 
    favorites, 
    toggleFavorite, 
    navigate,
    t 
  } = useApp();

  // Mobile filters drawer open state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sorting: 'recommended', 'price-asc', 'price-desc', 'rating-desc'
  const [sortBy, setSortBy] = useState('recommended');

  // Search input query
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '');

  // Pagination state
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 6;

  // Filter handlers
  const handlePriceChange = (e) => {
    const val = Number(e.target.value);
    updateFilters({ priceRange: [50000, val] });
    setCurrentPageNum(1);
  };

  const handleDistrictToggle = (district) => {
    const current = filters.districts || [];
    const updated = current.includes(district)
      ? current.filter(d => d !== district)
      : [...current, district];
    updateFilters({ districts: updated });
    setCurrentPageNum(1);
  };

  const handleCategoryToggle = (catId) => {
    const current = filters.categories || [];
    const updated = current.includes(catId)
      ? current.filter(c => c !== catId)
      : [...current, catId];
    updateFilters({ categories: updated });
    setCurrentPageNum(1);
  };

  const handleRatingChange = (rating) => {
    updateFilters({ minRating: filters.minRating === rating ? 0 : rating });
    setCurrentPageNum(1);
  };

  // Filtered & Sorted Activities
  const filteredActivities = useMemo(() => {
    return MOCK_ACTIVITIES.filter((act) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = act.title.toLowerCase().includes(query);
        const matchesDesc = act.description.toLowerCase().includes(query);
        const matchesDistrict = act.district.toLowerCase().includes(query);
        const matchesCategory = act.categoryName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesDistrict && !matchesCategory) return false;
      }

      // Price range
      const maxPrice = filters.priceRange ? filters.priceRange[1] : 1000000;
      if (act.price > maxPrice) return false;

      // Districts
      if (filters.districts?.length > 0) {
        if (!filters.districts.includes(act.district)) return false;
      }

      // Categories
      if (filters.categories?.length > 0) {
        if (!filters.categories.includes(act.category)) return false;
      }

      // Rating
      if (filters.minRating > 0) {
        if (act.rating < filters.minRating) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      return 0; // 'recommended' uses natural order
    });
  }, [filters, searchQuery, sortBy]);

  // Pagination calculation
  const totalItems = filteredActivities.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedActivities = filteredActivities.slice(
    (currentPageNum - 1) * itemsPerPage,
    currentPageNum * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-slate-100 pb-20 transition-colors duration-300">
      
      {/* Top Banner / Breadcrumb */}
      <div className="bg-white dark:bg-slate-900 border-b border-stone-200/80 dark:border-slate-800 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-400 dark:text-slate-500 mb-1">
                <span className="hover:text-stone-800 dark:hover:text-white cursor-pointer" onClick={() => navigate('home')}>
                  {t('navHome')}
                </span>
                <span>/</span>
                <span className="text-orange-600 dark:text-orange-400 font-semibold">{t('navCatalog')}</span>
              </div>
              <h1 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight">
                {t('catalogTitle')}
              </h1>
              <p className="text-sm text-stone-500 dark:text-slate-400 mt-1">
                {t('catalogSubtitle')}
              </p>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{t('filterTitle')}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* ==================== LEFT SIDEBAR (FILTERS) ==================== */}
          <aside className="hidden lg:block bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs space-y-6 sticky top-24 transition-colors">
            
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-base text-stone-900 dark:text-white">{t('filterTitle')}</h3>
              </div>
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-stone-400 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
                title={t('filterReset')}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('filterReset')}</span>
              </button>
            </div>

            {/* 1. Price Range Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-700 dark:text-slate-300">{t('filterMaxPrice')}</span>
                <span className="font-black text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 px-2 py-0.5 rounded-md border border-orange-200 dark:border-orange-800">
                  {(filters.priceRange ? filters.priceRange[1] : 1000000).toLocaleString('uz-UZ')} so‘m
                </span>
              </div>
              
              <input
                type="range"
                min="50000"
                max="1000000"
                step="25000"
                value={filters.priceRange ? filters.priceRange[1] : 1000000}
                onChange={handlePriceChange}
                className="w-full accent-orange-500 cursor-pointer h-2 bg-stone-200 dark:bg-slate-800 rounded-lg"
              />

              <div className="flex justify-between text-[11px] text-stone-400 dark:text-slate-500 font-medium">
                <span>50,000 UZS</span>
                <span>1,000,000 UZS</span>
              </div>
            </div>

            {/* 2. Districts Checklist */}
            <div className="border-t border-stone-100 dark:border-slate-800 pt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500">
                {t('filterDistricts')}
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {DISTRICTS.map((district) => {
                  const isChecked = filters.districts?.includes(district);
                  const countInDistrict = MOCK_ACTIVITIES.filter(a => a.district === district).length;
                  return (
                    <label
                      key={district}
                      className="flex items-center justify-between text-xs text-stone-700 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white cursor-pointer py-1 px-1 rounded-lg hover:bg-stone-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleDistrictToggle(district)}
                          className="w-4 h-4 rounded border-stone-300 dark:border-slate-700 text-orange-500 focus:ring-orange-500 accent-orange-500"
                        />
                        <span>{district} tumani</span>
                      </div>
                      <span className="text-[11px] text-stone-400 dark:text-slate-500">({countInDistrict})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. Category Checkboxes */}
            <div className="border-t border-stone-100 dark:border-slate-800 pt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500">
                {t('filterCategories')}
              </h4>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => {
                  const isChecked = filters.categories?.includes(cat.id);
                  return (
                    <label
                      key={cat.id}
                      className="flex items-center justify-between text-xs text-stone-700 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white cursor-pointer py-1 px-1 rounded-lg hover:bg-stone-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCategoryToggle(cat.id)}
                          className="w-4 h-4 rounded border-stone-300 dark:border-slate-700 text-orange-500 focus:ring-orange-500 accent-orange-500"
                        />
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-[11px] text-stone-400 dark:text-slate-500">({cat.count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 4. Rating Filter */}
            <div className="border-t border-stone-100 dark:border-slate-800 pt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500">
                {t('filterMinRating')}
              </h4>
              <div className="space-y-2">
                {[
                  { rating: 4.8, label: '4.8+' },
                  { rating: 4.5, label: '4.5+' },
                  { rating: 4.0, label: '4.0+' }
                ].map((item) => {
                  const isSelected = filters.minRating === item.rating;
                  return (
                    <button
                      key={item.rating}
                      onClick={() => handleRatingChange(item.rating)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-orange-500 text-white shadow-xs'
                          : 'bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-750 text-stone-700 dark:text-slate-300 border border-stone-200/60 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Star className={`w-3.5 h-3.5 ${isSelected ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </aside>

          {/* ==================== RIGHT MAIN AREA ==================== */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Search and Sort Toolbar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between transition-colors">
              
              {/* Search query input */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPageNum(1);
                  }}
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-slate-300"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sorting and Results Count */}
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 text-xs">
                <span className="text-stone-500 dark:text-slate-400 font-medium">
                  <span className="font-bold text-stone-900 dark:text-white">{filteredActivities.length}</span> {t('venuesFound')}
                </span>

                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 dark:text-slate-500 shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl px-3 py-2 font-bold text-stone-800 dark:text-white text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none cursor-pointer"
                  >
                    <option value="recommended" className="dark:bg-slate-900">{t('sortRecommended')}</option>
                    <option value="price-asc" className="dark:bg-slate-900">{t('sortPriceAsc')}</option>
                    <option value="price-desc" className="dark:bg-slate-900">{t('sortPriceDesc')}</option>
                    <option value="rating-desc" className="dark:bg-slate-900">{t('sortRatingDesc')}</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Grid of Activity Cards */}
            {paginatedActivities.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 dark:text-white">
                  Mos keluvchi maskan topilmadi
                </h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 max-w-sm mx-auto">
                  Kiritilgan filtr parametrlarini kamaytirib ko‘ring yoki boshqa tuman va toifalarni tanlang.
                </p>
                <button
                  onClick={resetFilters}
                  className="py-2.5 px-6 bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  {t('filterReset')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedActivities.map((act) => {
                  const isFav = favorites.includes(act.id);
                  return (
                    <div
                      key={act.id}
                      className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs hover:shadow-2xl hover:border-orange-300 dark:hover:border-orange-500 transition-all duration-300 overflow-hidden flex flex-col group"
                    >
                      {/* Image container */}
                      <div className="relative h-52 overflow-hidden bg-stone-200 dark:bg-slate-800">
                        <img
                          src={act.images[0]}
                          alt={act.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Category & Discount tags */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="px-2.5 py-1 bg-stone-900/85 backdrop-blur-md text-white text-[11px] font-bold rounded-full">
                            {act.categoryName}
                          </span>
                          {act.discount && (
                            <span className="px-2 py-1 bg-red-500 text-white text-[11px] font-black rounded-full">
                              -{act.discount}%
                            </span>
                          )}
                        </div>

                        {/* Favorite button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(act.id);
                          }}
                          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md hover:bg-white dark:hover:bg-slate-900 text-stone-600 dark:text-slate-300 hover:text-orange-500 transition-all shadow-md group/btn cursor-pointer"
                          title="Sevimlilarga qo‘shish"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'text-orange-500 fill-orange-500' : 'group-hover/btn:text-orange-500'}`} />
                        </button>

                        {/* Location badge */}
                        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-stone-800 dark:text-white text-xs font-semibold flex items-center gap-1 shadow-sm">
                          <MapPin className="w-3.5 h-3.5 text-orange-500" />
                          <span>{act.district}</span>
                        </div>
                      </div>

                      {/* Card Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Rating and Reviews */}
                          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-slate-400 mb-2">
                            <div className="flex items-center text-amber-500 font-bold">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                              <span>{act.rating}</span>
                            </div>
                            <span>•</span>
                            <span>({act.reviewsCount} {t('reviewsCount')})</span>
                          </div>

                          <h3
                            onClick={() => navigate('activity', act.id)}
                            className="font-bold text-base text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
                          >
                            {act.title}
                          </h3>

                          <p className="text-xs text-stone-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                            {act.description}
                          </p>
                        </div>

                        {/* Price & CTA */}
                        <div className="pt-4 mt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-slate-500 block">
                              {t('startFrom')}
                            </span>
                            <span className="text-base font-black text-orange-600 dark:text-orange-400">
                              {act.price.toLocaleString('uz-UZ')} UZS
                            </span>
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
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between text-xs transition-colors">
                <button
                  disabled={currentPageNum === 1}
                  onClick={() => setCurrentPageNum(prev => Math.max(1, prev - 1))}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700 disabled:opacity-40 font-bold text-stone-700 dark:text-slate-300 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t('btnPrev')}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => setCurrentPageNum(num)}
                      className={`w-9 h-9 rounded-xl font-bold transition-all cursor-pointer ${
                        currentPageNum === num
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-300 border border-stone-200 dark:border-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPageNum === totalPages}
                  onClick={() => setCurrentPageNum(prev => Math.min(totalPages, prev + 1))}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700 disabled:opacity-40 font-bold text-stone-700 dark:text-slate-300 cursor-pointer"
                >
                  <span>{t('btnNext')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* MOBILE DRAWER FILTERS */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xs bg-white dark:bg-slate-900 h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-slate-800">
              <h3 className="font-bold text-lg dark:text-white">{t('filterTitle')}</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-2 text-stone-500 dark:text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price slider */}
            <div>
              <span className="text-xs font-bold block mb-2 dark:text-slate-300">{t('filterMaxPrice')}</span>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="25000"
                value={filters.priceRange ? filters.priceRange[1] : 1000000}
                onChange={handlePriceChange}
                className="w-full accent-orange-500"
              />
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 mt-1 block">
                {(filters.priceRange ? filters.priceRange[1] : 1000000).toLocaleString('uz-UZ')} UZS
              </span>
            </div>

            {/* Districts */}
            <div>
              <span className="text-xs font-bold block mb-2 dark:text-slate-300">{t('filterDistricts')}</span>
              <div className="space-y-1">
                {DISTRICTS.map((d) => (
                  <label key={d} className="flex items-center gap-2 text-xs py-1 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={filters.districts?.includes(d)}
                      onChange={() => handleDistrictToggle(d)}
                      className="accent-orange-500"
                    />
                    <span>{d}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl cursor-pointer"
            >
              Natijalarni ko‘rish
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
