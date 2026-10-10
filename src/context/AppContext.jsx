import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MOCK_ACTIVITIES, 
  INITIAL_USER_BOOKINGS, 
  INITIAL_PARTNER_LISTINGS, 
  INITIAL_PARTNER_ORDERS 
} from '../data/mockData';
import { translations } from '../data/translations';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // 1. AUTHENTICATION STATE (Strict Gatekeeping: starts false so Registration is always shown first)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Clear legacy localStorage auth so registration screen is strictly shown first
  useEffect(() => {
    localStorage.removeItem('chillzone_auth');
    localStorage.removeItem('joyband_auth');
  }, []);

  // 2. THEME STATE (Dark Mode Toggle)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('chillzone_theme') || localStorage.getItem('joyband_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('chillzone_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 3. LANGUAGE STATE (UZB / RUS)
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('chillzone_lang') || localStorage.getItem('joyband_lang') || 'uz';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('chillzone_lang', lang);
  };

  // Translation helper function
  const t = (key) => {
    return translations[language]?.[key] || translations.uz[key] || key;
  };

  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedActivityId, setSelectedActivityId] = useState('act-1');
  
  // Hash routing sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash.startsWith('activity/')) {
        const id = hash.replace('activity/', '');
        setSelectedActivityId(id);
        setCurrentPage('activity');
      } else if (['home', 'explore', 'dashboard', 'partner'].includes(hash)) {
        setCurrentPage(hash === 'dashboard' ? 'user-dashboard' : hash === 'partner' ? 'partner-dashboard' : hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page, activityId = null) => {
    setCurrentPage(page);
    if (activityId) {
      setSelectedActivityId(activityId);
      window.location.hash = `activity/${activityId}`;
    } else {
      const hashName = page === 'user-dashboard' ? 'dashboard' : page === 'partner-dashboard' ? 'partner' : page;
      window.location.hash = hashName;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // USER ACCOUNTS & SESSION HELPERS
  // ==========================================
  const getUserAccountKey = (phone) => {
    if (!phone) return 'user_guest';
    const cleanPhone = String(phone).replace(/[^0-9+]/g, '');
    return `user_${cleanPhone}`;
  };

  const saveUserAccount = (user) => {
    if (!user || !user.phone) return;
    const key = getUserAccountKey(user.phone);
    try {
      localStorage.setItem(key, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user account:', e);
    }
  };

  const getUserAccount = (phone) => {
    if (!phone) return null;
    const key = getUserAccountKey(phone);
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  };

  // ==========================================
  // USER-SPECIFIC FAVORITES STORAGE HELPERS
  // ==========================================
  const getUserFavoritesKey = (phone) => {
    if (!phone) return 'favorites_guest';
    const cleanPhone = String(phone).replace(/[^0-9+]/g, '');
    return `favorites_${cleanPhone}`;
  };

  const loadUserFavoritesFromStorage = (phone) => {
    if (!phone) return [];
    const primaryKey = getUserFavoritesKey(phone);
    const directKey = `favorites_${phone}`;
    const saved = localStorage.getItem(primaryKey) || localStorage.getItem(directKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Error loading user favorites from storage:', e);
      }
    }
    return [];
  };

  const saveUserFavoritesToStorage = (phone, favList) => {
    if (!phone) return;
    const primaryKey = getUserFavoritesKey(phone);
    const directKey = `favorites_${phone}`;
    try {
      const data = JSON.stringify(favList);
      localStorage.setItem(primaryKey, data);
      localStorage.setItem(directKey, data);
    } catch (e) {
      console.error('Error saving user favorites to storage:', e);
    }
  };

  // ==========================================
  // USER-SPECIFIC BOOKINGS STORAGE HELPERS
  // ==========================================
  const getUserBookingsKey = (phone) => {
    if (!phone) return 'bookings_guest';
    const cleanPhone = String(phone).replace(/[^0-9+]/g, '');
    return `bookings_${cleanPhone}`;
  };

  const loadUserBookingsFromStorage = (phone) => {
    if (!phone) return [];
    const primaryKey = getUserBookingsKey(phone);
    const directKey = `bookings_${phone}`;
    const saved = localStorage.getItem(primaryKey) || localStorage.getItem(directKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Error loading user bookings from storage:', e);
      }
    }
    // If default demo user (Abdulloh Abdukarimov) has no saved bookings yet, initialize with demo mock bookings
    const cleanPhone = String(phone).replace(/[^0-9+]/g, '');
    if (cleanPhone.includes('901234567')) {
      saveUserBookingsToStorage(phone, INITIAL_USER_BOOKINGS);
      return INITIAL_USER_BOOKINGS;
    }
    return [];
  };

  const saveUserBookingsToStorage = (phone, bookingList) => {
    if (!phone) return;
    const primaryKey = getUserBookingsKey(phone);
    const directKey = `bookings_${phone}`;
    try {
      const data = JSON.stringify(bookingList);
      localStorage.setItem(primaryKey, data);
      localStorage.setItem(directKey, data);
    } catch (e) {
      console.error('Error saving user bookings to storage:', e);
    }
  };

  // Active User Profile State
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('chillzone_active_session') || 
                  localStorage.getItem('chillzone_current_user') || 
                  localStorage.getItem('chillzone_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });

  // User Favorites State (100% user-specific)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('chillzone_current_user') || localStorage.getItem('chillzone_active_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.phone) {
          return loadUserFavoritesFromStorage(parsed.phone);
        }
      } catch (e) {}
    }
    return [];
  });

  // User Bookings State (100% user-specific)
  const [userBookings, setUserBookings] = useState(() => {
    const saved = localStorage.getItem('chillzone_current_user') || localStorage.getItem('chillzone_active_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.phone) {
          return loadUserBookingsFromStorage(parsed.phone);
        }
      } catch (e) {}
    }
    return [];
  });

  // Login simulation
  const login = (userData = {}) => {
    setIsAuthenticated(true);
    const targetPhone = userData.phone || '+998 (90) 123-45-67';
    const cleanPhone = String(targetPhone).replace(/[^0-9+]/g, '');

    // Check if an account was previously registered with this phone
    const existing = getUserAccount(targetPhone);

    let finalName = userData.name;
    let finalSurname = userData.surname;
    let finalCity = userData.city;

    if (!finalName) {
      if (existing?.name) {
        finalName = existing.name;
        finalSurname = existing.surname || '';
        finalCity = existing.city || 'Toshkent';
      } else if (cleanPhone.includes('901234567')) {
        finalName = 'Abdulloh';
        finalSurname = 'Abdukarimov';
        finalCity = 'Toshkent';
      } else {
        finalName = `Mijoz (${cleanPhone.slice(-4) || '7821'})`;
        finalSurname = '';
        finalCity = 'Toshkent';
      }
    }

    const newUser = {
      name: finalName,
      surname: finalSurname !== undefined ? finalSurname : (existing?.surname || ''),
      phone: targetPhone,
      city: finalCity || existing?.city || 'Toshkent',
      email: `${finalName.toLowerCase().replace(/[^\w]/g, '.')}@chillzone.uz`
    };

    // Save to user registry
    saveUserAccount(newUser);

    // Save active session
    try {
      localStorage.setItem('chillzone_active_session', JSON.stringify(newUser));
      localStorage.setItem('chillzone_current_user', JSON.stringify(newUser));
      localStorage.setItem('chillzone_user_profile', JSON.stringify(newUser));
    } catch (e) {}

    // 1. Update user profile / currentUser state immediately
    setUserProfile(newUser);

    // 2. Fetch and load user-specific favorites
    const userFavorites = loadUserFavoritesFromStorage(targetPhone);
    setFavorites(userFavorites);

    // 3. Fetch and load user-specific bookings
    const userSpecificBookings = loadUserBookingsFromStorage(targetPhone);
    setUserBookings(userSpecificBookings);

    navigate('home');
    addToast(
      language === 'uz'
        ? `Xush kelibsiz, ${finalName}! Chill Zone platformasiga kirdingiz.`
        : `Добро пожаловать, ${finalName}! Вы вошли в Chill Zone.`,
      'success'
    );
  };

  const logout = () => {
    setIsAuthenticated(false);

    // 2. COMPLETE STATE CLEARING ON LOGOUT:
    setUserProfile(null);
    setFavorites([]);
    setUserBookings([]);

    // Remove activeSession and currentUser from localStorage
    localStorage.removeItem('chillzone_active_session');
    localStorage.removeItem('chillzone_current_user');
    localStorage.removeItem('chillzone_user_profile');
    localStorage.removeItem('chillzone_auth');
    localStorage.removeItem('joyband_auth');

    addToast(
      language === 'uz' ? 'Tizimdan muvaffaqiyatli chiqdingiz' : 'Вы успешно вышли из системы',
      'info'
    );
  };

  const toggleFavorite = (activityId) => {
    const activePhone = userProfile?.phone;

    setFavorites((prev) => {
      const exists = prev.includes(activityId);
      const activity = MOCK_ACTIVITIES.find(a => a.id === activityId);
      const title = activity ? activity.title : 'Maskan';
      
      const updated = exists 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId];

      // Read & write to active user's specific localStorage array
      if (activePhone) {
        saveUserFavoritesToStorage(activePhone, updated);
      }

      if (exists) {
        addToast(
          language === 'uz'
            ? `"${title}" sevimlilardan olib tashlandi`
            : `"${title}" удалено из избранного`,
          'info'
        );
      } else {
        addToast(
          language === 'uz'
            ? `"${title}" sevimlilarga qo‘shildi!`
            : `"${title}" добавлено в избранное!`,
          'success'
        );
      }

      return updated;
    });
  };

  const addBooking = (newBooking) => {
    const activePhone = userProfile?.phone;
    setUserBookings((prev) => {
      const updated = [newBooking, ...prev];
      if (activePhone) {
        saveUserBookingsToStorage(activePhone, updated);
      }
      return updated;
    });
    addToast(
      language === 'uz'
        ? 'Bron muvaffaqiyatli amalga oshirildi! Chiptangiz profilingizda saqlandi.'
        : 'Бронирование успешно завершено! Ваш билет сохранен в профиле.',
      'success'
    );
  };

  const cancelBooking = (bookingId) => {
    const activePhone = userProfile?.phone;
    setUserBookings((prev) => {
      const updated = prev.map(b => 
        b.id === bookingId ? { ...b, status: 'Cancelled', statusText: language === 'uz' ? 'Bekor qilingan' : 'Отменено' } : b
      );
      if (activePhone) {
        saveUserBookingsToStorage(activePhone, updated);
      }
      return updated;
    });
    addToast(
      language === 'uz'
        ? `Band qilish (#${bookingId}) bekor qilindi`
        : `Бронь (#${bookingId}) отменена`,
      'warning'
    );
  };

  // Partner dashboard state
  const [partnerListings, setPartnerListings] = useState(INITIAL_PARTNER_LISTINGS);
  const [partnerOrders, setPartnerOrders] = useState(INITIAL_PARTNER_ORDERS);

  const addPartnerListing = (listing) => {
    setPartnerListings(prev => [listing, ...prev]);
    addToast(
      language === 'uz' ? 'Yangi xizmat muvaffaqiyatli qo‘shildi!' : 'Новая услуга успешно добавлена!',
      'success'
    );
  };

  const toggleListingStatus = (id) => {
    setPartnerListings(prev => 
      prev.map(l => l.id === id ? { ...l, active: !l.active } : l)
    );
    addToast(
      language === 'uz' ? 'Xizmat faollik holati o‘zgartirildi' : 'Статус активности услуги изменен',
      'info'
    );
  };

  const approveOrder = (orderId) => {
    setPartnerOrders(prev => 
      prev.map(o => o.id === orderId ? { ...o, status: 'Approved' } : o)
    );
    addToast(
      language === 'uz'
        ? `Buyurtma #${orderId} tasdiqlandi va mijozga SMS jo‘natildi!`
        : `Заказ #${orderId} подтвержден, клиенту отправлено SMS!`,
      'success'
    );
  };

  const declineOrder = (orderId) => {
    setPartnerOrders(prev => 
      prev.map(o => o.id === orderId ? { ...o, status: 'Declined' } : o)
    );
    addToast(
      language === 'uz' ? `Buyurtma #${orderId} rad etildi` : `Заказ #${orderId} отклонен`,
      'warning'
    );
  };

  // Global search filters
  const [filters, setFilters] = useState({
    priceRange: [50000, 1000000],
    districts: [],
    categories: [],
    minRating: 0,
    searchQuery: '',
    selectedDate: ''
  });

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [50000, 1000000],
      districts: [],
      categories: [],
      minRating: 0,
      searchQuery: '',
      selectedDate: ''
    });
    addToast(
      language === 'uz' ? 'Barcha filtrlar tozalandi' : 'Все фильтры сброшены',
      'info'
    );
  };

  // Modals state
  const [modalState, setModalState] = useState({
    bookingModal: false,
    newListingModal: false,
    galleryModal: false,
    ticketModal: false,
    selectedBooking: null,
    selectedGalleryImages: []
  });

  const openBookingModal = () => setModalState(prev => ({ ...prev, bookingModal: true }));
  const closeBookingModal = () => setModalState(prev => ({ ...prev, bookingModal: false }));

  const openNewListingModal = () => setModalState(prev => ({ ...prev, newListingModal: true }));
  const closeNewListingModal = () => setModalState(prev => ({ ...prev, newListingModal: false }));

  const openGalleryModal = (images) => setModalState(prev => ({ ...prev, galleryModal: true, selectedGalleryImages: images }));
  const closeGalleryModal = () => setModalState(prev => ({ ...prev, galleryModal: false }));

  const openTicketModal = (booking) => setModalState(prev => ({ ...prev, ticketModal: true, selectedBooking: booking }));
  const closeTicketModal = () => setModalState(prev => ({ ...prev, ticketModal: false, selectedBooking: null }));

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      theme,
      toggleTheme,
      language,
      changeLanguage,
      t,
      currentPage,
      selectedActivityId,
      navigate,
      userProfile,
      currentUser: userProfile,
      setUserProfile,
      favorites,
      toggleFavorite,
      userBookings,
      addBooking,
      cancelBooking,
      partnerListings,
      partnerOrders,
      addPartnerListing,
      toggleListingStatus,
      approveOrder,
      declineOrder,
      filters,
      updateFilters,
      resetFilters,
      modalState,
      openBookingModal,
      closeBookingModal,
      openNewListingModal,
      closeNewListingModal,
      openGalleryModal,
      closeGalleryModal,
      openTicketModal,
      closeTicketModal,
      toasts,
      addToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
