import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_ACTIVITIES } from '../data/mockData';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  ArrowRight
} from 'lucide-react';

export const BookingModal = ({ activityId, initialDate, initialTime, initialGuests }) => {
  const { modalState, closeBookingModal, addBooking, openTicketModal, navigate, userProfile } = useApp();
  const activity = MOCK_ACTIVITIES.find(a => a.id === activityId) || MOCK_ACTIVITIES[0];

  const [date, setDate] = useState(initialDate || '2026-10-18');
  const [time, setTime] = useState(initialTime || activity.timeSlots[0]);
  const [guests, setGuests] = useState(initialGuests || 2);
  const [paymentMethod, setPaymentMethod] = useState('Payme');
  const [customerPhone, setCustomerPhone] = useState(userProfile?.phone || '+998 (90) 123-45-67');
  const [customerName, setCustomerName] = useState(
    userProfile?.name ? `${userProfile.name} ${userProfile.surname || ''}`.trim() : 'Abdulloh Abdukarimov'
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);

  if (!modalState.bookingModal) return null;

  const totalPrice = activity.price * guests;

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      activityId: activity.id,
      title: activity.title,
      category: activity.categoryName,
      district: activity.district,
      date: date,
      time: time,
      guests: guests,
      totalPrice: totalPrice,
      status: 'Confirmed',
      statusText: 'Tasdiqlangan',
      paymentMethod: paymentMethod,
      image: activity.images[0],
      qrCode: `JB-BK-${Math.floor(1000 + Math.random() * 9000)}-VERIFIED-2026`,
      phone: customerPhone,
      name: customerName
    };

    addBooking(newBooking);
    setCreatedBooking(newBooking);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-850">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-stone-900 dark:text-white text-lg">
              {isSuccess ? 'Band qilish tasdiqlandi!' : 'Bron qilishni rasmiylashtirish'}
            </h3>
          </div>
          <button
            onClick={() => {
              setIsSuccess(false);
              closeBookingModal();
            }}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSuccess && createdBooking ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-stone-900 dark:text-white">
                  Tabriklaymiz, joyingiz band qilindi!
                </h4>
                <p className="text-stone-500 dark:text-slate-400 text-sm mt-1">
                  Buyurtma kodi: <span className="font-bold text-orange-600 dark:text-orange-400">#{createdBooking.id}</span>.
                </p>
              </div>

              {/* Mini Ticket Card */}
              <div className="bg-orange-50/60 dark:bg-slate-800 border border-orange-200/80 dark:border-slate-700 rounded-2xl p-4 text-left space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-stone-900 dark:text-white text-sm">{createdBooking.title}</h5>
                    <p className="text-xs text-stone-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      {activity.address}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500 text-white text-[11px] font-bold rounded-full">
                    Tasdiqlandi
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    closeBookingModal();
                    openTicketModal(createdBooking);
                  }}
                  className="flex-1 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Elektron chiptani ko‘rish (QR)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmBooking} className="space-y-5">
              
              {/* Activity Info Summary */}
              <div className="flex gap-4 p-3 bg-stone-50 dark:bg-slate-800 rounded-2xl border border-stone-200/80 dark:border-slate-700 items-center">
                <img
                  src={activity.images[0]}
                  alt={activity.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-stone-900 dark:text-white text-sm truncate">{activity.title}</h4>
                  <p className="text-xs text-stone-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    {activity.district} tumani
                  </p>
                  <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mt-1">
                    {activity.price.toLocaleString('uz-UZ')} UZS <span className="text-stone-400 font-normal">/ {activity.priceType}</span>
                  </p>
                </div>
              </div>

              {/* Slot and Date picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    Tashrif sanasi:
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    Vaqt seansi:
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    {activity.timeSlots.map(slot => (
                      <option key={slot} value={slot} className="dark:bg-slate-900">{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest counter */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-orange-500" />
                    Mehmonlar soni:
                  </span>
                </label>
                <div className="flex items-center justify-between p-2.5 bg-stone-50 dark:bg-slate-800 rounded-xl border border-stone-200 dark:border-slate-700">
                  <span className="text-sm font-semibold text-stone-800 dark:text-slate-200">{guests} kishi</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={guests <= activity.minGuests}
                      onClick={() => setGuests(prev => Math.max(activity.minGuests, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 font-bold text-stone-700 dark:text-slate-200 hover:bg-stone-100 disabled:opacity-40 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-stone-900 dark:text-white">{guests}</span>
                    <button
                      type="button"
                      disabled={guests >= activity.maxGuests}
                      onClick={() => setGuests(prev => Math.min(activity.maxGuests, prev + 1))}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 font-bold text-stone-700 dark:text-slate-200 hover:bg-stone-100 disabled:opacity-40 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                    Ism:
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                    Telefon:
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-2 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-orange-500" />
                  To‘lov usuli:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Payme', 'Click Up', 'Uzum Bank', 'Joyida to‘lash'].map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        paymentMethod === method
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 shadow-xs'
                          : 'border-stone-200 dark:border-slate-700 text-stone-600 dark:text-slate-300 bg-white dark:bg-slate-800'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Bronni tasdiqlash ({totalPrice.toLocaleString('uz-UZ')} UZS)</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
