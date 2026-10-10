import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_ACTIVITIES } from '../data/mockData';
import { 
  Calendar, 
  Heart, 
  Settings, 
  Clock, 
  CheckCircle2, 
  QrCode, 
  MapPin, 
  Key, 
  Phone, 
  Mail, 
  Save, 
  LogOut 
} from 'lucide-react';

export const UserDashboardPage = () => {
  const { 
    userProfile, 
    setUserProfile, 
    userBookings, 
    cancelBooking, 
    favorites, 
    toggleFavorite, 
    openTicketModal, 
    addToast,
    navigate,
    logout,
    t 
  } = useApp();

  // Active Tab: 'bookings', 'favorites', 'settings'
  const [activeTab, setActiveTab] = useState('bookings');

  // Bookings sub-filter: 'all', 'confirmed', 'completed', 'cancelled'
  const [bookingFilter, setBookingFilter] = useState('all');

  // Settings form local state
  const [settingsForm, setSettingsForm] = useState({
    name: userProfile.name,
    surname: userProfile.surname,
    phone: userProfile.phone,
    email: userProfile.email,
    city: userProfile.city,
    currentPassword: '',
    newPassword: '',
  });

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    setUserProfile({
      name: settingsForm.name,
      surname: settingsForm.surname,
      phone: settingsForm.phone,
      email: settingsForm.email,
      city: settingsForm.city,
    });
    addToast('Profil sozlamalari muvaffaqiyatli saqlandi!', 'success');
  };

  // Filtered bookings
  const filteredBookings = userBookings.filter(b => {
    if (bookingFilter === 'confirmed') return b.status === 'Confirmed';
    if (bookingFilter === 'completed') return b.status === 'Completed';
    if (bookingFilter === 'cancelled') return b.status === 'Cancelled';
    return true;
  });

  // Favorite activities list
  const favoriteActivities = MOCK_ACTIVITIES.filter(a => favorites.includes(a.id));

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-slate-100 pb-24 transition-colors duration-300">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border-b border-stone-200/80 dark:border-slate-800 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-orange-500/20">
                {userProfile.name[0]}{userProfile.surname[0]}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
                  {userProfile.name} {userProfile.surname}
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                  <span>Mijoz ID: #USR-7821</span>
                  <span>•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{userProfile.city}, O‘zbekiston</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-stone-50 dark:bg-slate-800 rounded-2xl border border-stone-200 dark:border-slate-700 text-xs">
                <span className="text-stone-400 dark:text-slate-400 block text-[10px]">{t('activeBookingsCount')}</span>
                <span className="font-bold text-stone-800 dark:text-white text-sm">
                  {userBookings.filter(b => b.status === 'Confirmed').length} ta
                </span>
              </div>
              <div className="px-4 py-2 bg-orange-50 dark:bg-orange-950/60 rounded-2xl border border-orange-200 dark:border-orange-800 text-xs">
                <span className="text-orange-500 dark:text-orange-400 block text-[10px]">{t('favorites')}:</span>
                <span className="font-bold text-orange-600 dark:text-orange-400 text-sm">
                  {favorites.length} ta
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* ==================== LEFT SIDEBAR NAVIGATION ==================== */}
          <aside className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs space-y-2 sticky top-24 transition-colors">
            <div className="pb-3 border-b border-stone-100 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500 px-3">
                {t('navProfile')}
              </span>
            </div>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-stone-700 dark:text-slate-300 hover:bg-stone-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>{t('myBookings')}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === 'bookings' ? 'bg-white/20 text-white' : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-400'
              }`}>
                {userBookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'favorites'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-stone-700 dark:text-slate-300 hover:bg-stone-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4" />
                <span>{t('favorites')}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === 'favorites' ? 'bg-white/20 text-white' : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-400'
              }`}>
                {favorites.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-stone-700 dark:text-slate-300 hover:bg-stone-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>{t('settings')}</span>
              </div>
            </button>

            {/* Logout button */}
            <button
              onClick={logout}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all cursor-pointer pt-2"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4" />
                <span>{t('navLogout')}</span>
              </div>
            </button>
          </aside>

          {/* ==================== RIGHT CONTENT AREA ==================== */}
          <main className="lg:col-span-3">
            
            {/* TAB 1: MENING BANDLARIM (MY BOOKINGS) */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                
                {/* Header & Sub-filter pills */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
                  <div>
                    <h2 className="text-xl font-black text-stone-900 dark:text-white">
                      {t('myBookings')}
                    </h2>
                    <p className="text-xs text-stone-500 dark:text-slate-400 mt-0.5">
                      Siz buyurtma qilgan barcha chiptalar va hordiq maskanlari
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-slate-800 rounded-2xl">
                    {[
                      { id: 'all', label: 'Barchasi' },
                      { id: 'confirmed', label: t('statusConfirmed') },
                      { id: 'completed', label: t('statusCompleted') },
                      { id: 'cancelled', label: t('statusCancelled') },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setBookingFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          bookingFilter === tab.id
                            ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-xs'
                            : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bookings List */}
                {filteredBookings.length === 0 ? (
                  <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-stone-200/80 dark:border-slate-800 text-center space-y-3">
                    <Calendar className="w-12 h-12 text-stone-300 dark:text-slate-600 mx-auto" />
                    <h3 className="font-bold text-stone-700 dark:text-slate-300 text-base">Ushbu holatda bandlar topilmadi</h3>
                    <button
                      onClick={() => navigate('explore')}
                      className="py-2.5 px-5 bg-orange-500 text-white font-bold text-xs rounded-xl hover:bg-orange-600 transition-colors cursor-pointer"
                    >
                      Katalogni ko‘rish
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredBookings.map((b) => {
                      const isConfirmed = b.status === 'Confirmed';
                      const isCompleted = b.status === 'Completed';
                      const isCancelled = b.status === 'Cancelled';

                      return (
                        <div
                          key={b.id}
                          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
                        >
                          <div className="flex gap-4 items-center">
                            <img
                              src={b.image}
                              alt={b.title}
                              className="w-20 h-20 rounded-2xl object-cover shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400">
                                  #{b.id}
                                </span>
                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                                  isConfirmed
                                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                                    : isCompleted
                                    ? 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300'
                                    : 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300'
                                }`}>
                                  {b.statusText || b.status}
                                </span>
                              </div>

                              <h3 className="font-bold text-base text-stone-900 dark:text-white leading-snug">
                                {b.title}
                              </h3>

                              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 dark:text-slate-400 mt-2">
                                <span className="flex items-center gap-1 font-medium">
                                  <Calendar className="w-3.5 h-3.5 text-orange-500" />
                                  {b.date}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1 font-medium">
                                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                                  {b.time}
                                </span>
                                <span>•</span>
                                <span>{b.guests} kishi</span>
                                <span>•</span>
                                <span className="font-bold text-stone-900 dark:text-white">
                                  {b.totalPrice?.toLocaleString('uz-UZ')} UZS
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-stone-100 dark:border-slate-800 justify-end">
                            {isConfirmed && (
                              <>
                                <button
                                  onClick={() => openTicketModal(b)}
                                  className="py-2 px-3.5 bg-orange-50 dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 text-orange-700 dark:text-orange-300 font-bold text-xs rounded-xl border border-orange-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                                >
                                  <QrCode className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                  <span>{t('ticketQrBtn')}</span>
                                </button>
                                <button
                                  onClick={() => cancelBooking(b.id)}
                                  className="py-2 px-3 bg-stone-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-stone-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-bold text-xs rounded-xl border border-stone-200 dark:border-slate-700 transition-colors cursor-pointer"
                                >
                                  {t('cancelBtn')}
                                </button>
                              </>
                            )}

                            {isCompleted && (
                              <button
                                onClick={() => navigate('activity', b.activityId)}
                                className="py-2 px-3.5 bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 text-stone-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-stone-200 dark:border-slate-700 transition-colors cursor-pointer"
                              >
                                Yana bron qilish
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            )}

            {/* TAB 2: SEVIMLILAR (FAVORITES) */}
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white">
                    {t('favorites')}
                  </h2>
                </div>

                {favoriteActivities.length === 0 ? (
                  <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-stone-200/80 dark:border-slate-800 text-center space-y-3">
                    <Heart className="w-12 h-12 text-stone-300 dark:text-slate-600 mx-auto" />
                    <h3 className="font-bold text-stone-700 dark:text-slate-300 text-base">Hozircha sevimlilar bo‘sh</h3>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteActivities.map((act) => (
                      <div
                        key={act.id}
                        className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col group hover:shadow-xl transition-all"
                      >
                        <div className="relative h-48 bg-stone-200 dark:bg-slate-800">
                          <img
                            src={act.images[0]}
                            alt={act.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <button
                            onClick={() => toggleFavorite(act.id)}
                            className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-900/90 rounded-full text-orange-500 shadow-md cursor-pointer"
                          >
                            <Heart className="w-4 h-4 fill-orange-500" />
                          </button>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase">
                              {act.categoryName}
                            </span>
                            <h3 className="font-bold text-base text-stone-900 dark:text-white mt-1 line-clamp-1">
                              {act.title}
                            </h3>
                          </div>

                          <div className="pt-4 mt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-sm font-black text-orange-600 dark:text-orange-400">
                              {act.price.toLocaleString('uz-UZ')} UZS
                            </span>
                            <button
                              onClick={() => navigate('activity', act.id)}
                              className="py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                            >
                              Bron qilish
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SOZLAMALAR (SETTINGS) */}
            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs space-y-6 transition-colors">
                <div>
                  <h2 className="text-xl font-black text-stone-900 dark:text-white">
                    {t('settings')}
                  </h2>
                </div>

                <form onSubmit={handleSettingsSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                        Ismingiz:
                      </label>
                      <input
                        type="text"
                        value={settingsForm.name}
                        onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                        required
                        className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                        Familiyangiz:
                      </label>
                      <input
                        type="text"
                        value={settingsForm.surname}
                        onChange={(e) => setSettingsForm({ ...settingsForm, surname: e.target.value })}
                        required
                        className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-orange-500" />
                        <span>Telefon raqami:</span>
                      </label>
                      <input
                        type="tel"
                        value={settingsForm.phone}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                        required
                        className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-orange-500" />
                        <span>Elektron pochta:</span>
                      </label>
                      <input
                        type="email"
                        value={settingsForm.email}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                        required
                        className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{t('saveChanges')}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

          </main>

        </div>
      </div>

    </div>
  );
};
