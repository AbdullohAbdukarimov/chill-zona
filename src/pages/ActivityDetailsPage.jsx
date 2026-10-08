import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_ACTIVITIES, MOCK_REVIEWS } from '../data/mockData';
import { 
  Star, 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  Users, 
  ShieldCheck, 
  Wifi, 
  Car, 
  Coffee, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Maximize2, 
  Award, 
  MessageSquare, 
  Send, 
  ChevronRight,
  Flame,
  ThumbsUp
} from 'lucide-react';

export const ActivityDetailsPage = () => {
  const { 
    selectedActivityId, 
    favorites, 
    toggleFavorite, 
    openBookingModal, 
    openGalleryModal, 
    addToast,
    navigate 
  } = useApp();

  const activity = MOCK_ACTIVITIES.find(a => a.id === selectedActivityId) || MOCK_ACTIVITIES[0];
  const isFav = favorites.includes(activity.id);

  // Booking Widget Local State
  const [selectedDate, setSelectedDate] = useState('2026-10-18');
  const [selectedSlot, setSelectedSlot] = useState(activity.timeSlots[0] || '12:00');
  const [guestsCount, setGuestsCount] = useState(2);

  // Review submission state
  const [reviewsList, setReviewsList] = useState(MOCK_REVIEWS);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Havola nusxalandi!', 'success');
    } else {
      addToast('Havola: ' + window.location.href, 'info');
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      userName: newReviewAuthor.trim() || 'Hurmatli Mehmon',
      userCity: 'Toshkent',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      rating: newReviewRating,
      date: 'Hozirgina',
      comment: newReviewText,
      helpful: 1
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewText('');
    setNewReviewAuthor('');
    addToast('Sharhingiz muvaffaqiyatli qo‘shildi!', 'success');
  };

  // Pricing calculations
  const totalPrice = activity.price * guestsCount;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-24">
      
      {/* Top Header & Breadcrumbs */}
      <div className="bg-white border-b border-stone-200/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="hover:text-stone-900 cursor-pointer" onClick={() => navigate('home')}>Bosh sahifa</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="hover:text-stone-900 cursor-pointer" onClick={() => navigate('explore')}>Katalog</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-orange-600 font-bold truncate max-w-xs">{activity.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Ulashish</span>
            </button>
            <button
              onClick={() => toggleFavorite(activity.id)}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                isFav
                  ? 'border-orange-200 bg-orange-50 text-orange-600'
                  : 'border-stone-200 hover:bg-stone-50 text-stone-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-orange-500 text-orange-500' : ''}`} />
              <span className="hidden sm:inline">{isFav ? 'Saqlangan' : 'Sevimlilar'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Title & Location Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
              {activity.categoryName}
            </span>
            {activity.discount && (
              <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-black rounded-full">
                -{activity.discount}% Aksiya narxi
              </span>
            )}
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Tekshirilgan maskan
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
            {activity.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-500 mt-2">
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
              <span>{activity.rating}</span>
              <span className="text-stone-400 font-normal ml-1">({activity.reviewsCount} ta sharh)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-stone-700 font-medium">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>{activity.address}</span>
            </div>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">{activity.metro}</span>
          </div>
        </div>

        {/* 1. MASONRY-STYLE AIRBNB IMAGE GALLERY */}
        <div className="relative rounded-3xl overflow-hidden mb-10 shadow-lg bg-stone-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px] sm:h-[460px]">
            {/* 1 Large Hero Image (2 cols) */}
            <div 
              onClick={() => openGalleryModal(activity.images)}
              className="md:col-span-2 h-full overflow-hidden cursor-pointer group relative"
            >
              <img
                src={activity.images[0]}
                alt="Main cover"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* 4 Smaller Images in 2x2 Grid */}
            <div className="hidden md:grid col-span-2 grid-cols-2 gap-2 h-full">
              {activity.images.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => openGalleryModal(activity.images)}
                  className="h-full overflow-hidden cursor-pointer group relative"
                >
                  <img
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Floating View All Photos Button */}
          <button
            onClick={() => openGalleryModal(activity.images)}
            className="absolute bottom-4 right-4 py-2.5 px-4 bg-white/95 hover:bg-white text-stone-900 font-bold text-xs rounded-xl shadow-xl flex items-center gap-2 backdrop-blur-md transition-all hover:scale-105"
          >
            <Maximize2 className="w-4 h-4 text-orange-500" />
            <span>Barcha fotosuratlarni ko‘rish ({activity.images.length})</span>
          </button>
        </div>

        {/* 2-COLUMN AIRBNB DETAILS CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* ==================== LEFT COLUMN (MAIN INFO) ==================== */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Host / Organizer Banner */}
            <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs">
              <div className="flex items-center gap-4">
                <img
                  src={activity.host.avatar}
                  alt={activity.host.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-orange-400"
                />
                <div>
                  <h3 className="font-bold text-base text-stone-900">
                    Tashkilotchi: {activity.host.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-500">
                    <span className="flex items-center gap-1 text-orange-600 font-bold">
                      <Award className="w-3.5 h-3.5" />
                      {activity.host.badge}
                    </span>
                    <span>•</span>
                    <span>{activity.host.experience}</span>
                  </div>
                </div>
              </div>

              <span className="hidden sm:inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold rounded-xl">
                Aloqa: {activity.host.phone}
              </span>
            </div>

            {/* Key Highlights */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 space-y-3">
              <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider text-orange-600">
                Asosiy afzalliklar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activity.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* "Nimalar kutmoqda?" (About the activity) */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200/80 space-y-4">
              <h3 className="font-black text-xl text-stone-900">
                Nimalar kutmoqda?
              </h3>
              <p className="text-stone-600 leading-relaxed text-sm whitespace-pre-line">
                {activity.description}
              </p>

              <div className="pt-4 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 block text-[11px]">Davomiyligi:</span>
                  <span className="font-bold text-stone-800">{activity.duration}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Tashrifchilar:</span>
                  <span className="font-bold text-stone-800">{activity.minGuests} - {activity.maxGuests} kishi</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Manzil:</span>
                  <span className="font-bold text-stone-800">{activity.district} tumani</span>
                </div>
              </div>
            </div>

            {/* "Qulayliklar" (Amenities) */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200/80 space-y-5">
              <h3 className="font-black text-xl text-stone-900">
                Qulayliklar va servis
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {activity.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200/60 text-xs font-semibold text-stone-800"
                  >
                    <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map & Location */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200/80 space-y-4">
              <h3 className="font-black text-xl text-stone-900">
                Joylashuv va marshrut
              </h3>
              <p className="text-xs text-stone-500">
                {activity.address} • Eng yaqin bekat: <strong className="text-stone-800">{activity.metro}</strong>
              </p>
              
              {/* Interactive Mock Map View */}
              <div className="relative h-64 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                  alt="Tashkent Map Mock"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-stone-950/30 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-2xl animate-bounce mb-2">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <span className="font-black text-white text-base drop-shadow-md">
                    {activity.title}
                  </span>
                  <span className="text-xs text-stone-200 mt-1 bg-stone-900/70 px-3 py-1 rounded-full">
                    {activity.address}
                  </span>
                </div>
              </div>
            </div>

            {/* REVIEWS SECTION */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200/80 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
                <div>
                  <h3 className="font-black text-2xl text-stone-900 flex items-center gap-2">
                    <span>Mijozlar sharhlari</span>
                    <span className="text-orange-500 text-lg">({reviewsList.length})</span>
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-stone-900">{activity.rating} dan 5.0</span>
                    <span>• Barcha baholar tasdiqlangan tashrifchilar tomonidan berilgan</span>
                  </div>
                </div>
              </div>

              {/* Rating criteria breakdown bars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 block mb-1">Tozalik va qulaylik</span>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[95%]"></div>
                  </div>
                  <span className="font-bold text-stone-800 mt-1 block">4.9</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-1">Xodimlar muomalasi</span>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[100%]"></div>
                  </div>
                  <span className="font-bold text-stone-800 mt-1 block">5.0</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-1">Joylashuv qulayligi</span>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[92%]"></div>
                  </div>
                  <span className="font-bold text-stone-800 mt-1 block">4.8</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-1">Narx va sifat</span>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[94%]"></div>
                  </div>
                  <span className="font-bold text-stone-800 mt-1 block">4.8</span>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6 pt-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="border-b border-stone-100 pb-6 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.userAvatar}
                          alt={rev.userName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-stone-900">{rev.userName}</h4>
                          <span className="text-[11px] text-stone-400">{rev.userCity} • {rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < Math.floor(rev.rating) ? 'fill-amber-400' : 'text-stone-200'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {rev.comment}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-stone-400 pt-1">
                      <button className="hover:text-orange-600 flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>Foydali ({rev.helpful})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-4">
                <h4 className="font-bold text-sm text-stone-900">
                  O‘z taassurotingiz bilan o‘rtoqlashing
                </h4>
                <form onSubmit={handleAddReview} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Ismingiz..."
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                    <div className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-xl">
                      <span className="text-xs text-stone-500">Bahongiz:</span>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="text-xs font-bold text-amber-600 bg-transparent focus:outline-none"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 - A’lo darajada)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 - Yaxshi)</option>
                        <option value={3}>⭐⭐⭐ (3 - O‘rtacha)</option>
                      </select>
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Qanday taassurot oldingiz? Qulayliklar va xodimlar xizmati yoqdimi?.."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    required
                    className="w-full p-3 text-xs bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  ></textarea>

                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Sharhni yuborish</span>
                  </button>
                </form>
              </div>

            </div>

          </div>

          {/* ==================== RIGHT COLUMN (STICKY BOOKING WIDGET) ==================== */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl border border-stone-200 shadow-xl p-6 space-y-6">
              
              {/* Price Header */}
              <div className="flex items-baseline justify-between border-b border-stone-100 pb-5">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-stone-900">
                      {activity.price.toLocaleString('uz-UZ')} UZS
                    </span>
                    <span className="text-xs text-stone-400">/ {activity.priceType}</span>
                  </div>
                  {activity.discount && (
                    <span className="text-xs text-stone-400 line-through">
                      {(activity.price * 1.2).toLocaleString('uz-UZ')} UZS
                    </span>
                  )}
                </div>

                <div className="flex items-center text-xs font-bold text-stone-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                  <span>{activity.rating}</span>
                </div>
              </div>

              {/* Interactive Date Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" />
                  <span>Tashrif buyurish sanasi:</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-800 focus:ring-2 focus:ring-orange-500 focus:outline-none cursor-pointer"
                />
              </div>

              {/* Time Slots Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  <span>Bo‘sh vaqt seanslari:</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {activity.timeSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guest Counter */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-orange-500" />
                    <span>Mehmonlar soni:</span>
                  </span>
                  <span className="text-[11px] text-stone-400 font-normal">
                    Max: {activity.maxGuests} kishi
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-xs font-bold text-stone-800">{guestsCount} nafar tashrifchi</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={guestsCount <= activity.minGuests}
                      onClick={() => setGuestsCount(prev => Math.max(activity.minGuests, prev - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-stone-200 font-bold text-stone-700 hover:bg-stone-100 disabled:opacity-30 flex items-center justify-center transition-colors text-sm"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-bold text-xs text-stone-900">{guestsCount}</span>
                    <button
                      type="button"
                      disabled={guestsCount >= activity.maxGuests}
                      onClick={() => setGuestsCount(prev => Math.min(activity.maxGuests, prev + 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-stone-200 font-bold text-stone-700 hover:bg-stone-100 disabled:opacity-30 flex items-center justify-center transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>{activity.price.toLocaleString('uz-UZ')} UZS × {guestsCount} kishi</span>
                  <span>{totalPrice.toLocaleString('uz-UZ')} UZS</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Chill zone xizmat to‘lovi</span>
                  <span className="text-emerald-600 font-bold">0 UZS (Aksiya)</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-sm font-bold text-stone-900">
                  <span>Jami hisoblangan:</span>
                  <span className="text-base font-black text-orange-600">
                    {totalPrice.toLocaleString('uz-UZ')} UZS
                  </span>
                </div>
              </div>

              {/* HUGE "HOZIR BRON QILISH" BUTTON */}
              <button
                onClick={openBookingModal}
                className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base rounded-2xl shadow-xl shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Flame className="w-5 h-5" />
                <span>Hozir bron qilish</span>
              </button>

              <div className="text-center space-y-1">
                <p className="text-[11px] text-stone-400">
                  Karta ma’lumotlari darhol yechilmaydi
                </p>
                <span className="text-[10px] text-emerald-600 font-bold block">
                  ✓ 24 soat oldin bepul bekor qilish imkoni
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
