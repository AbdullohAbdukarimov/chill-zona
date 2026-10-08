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
  const { modalState, closeBookingModal, addBooking, openTicketModal, navigate } = useApp();
  const activity = MOCK_ACTIVITIES.find(a => a.id === activityId) || MOCK_ACTIVITIES[0];

  const [date, setDate] = useState(initialDate || '2026-10-18');
  const [time, setTime] = useState(initialTime || activity.timeSlots[0]);
  const [guests, setGuests] = useState(initialGuests || 2);
  const [paymentMethod, setPaymentMethod] = useState('Payme');
  const [customerPhone, setCustomerPhone] = useState('+998 90 123 45 67');
  const [customerName, setCustomerName] = useState('Azizbek Rahimov');
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
      qrCode: `CHZ-BK-${Math.floor(1000 + Math.random() * 9000)}-VERIFIED-2026`,
      phone: customerPhone,
      name: customerName
    };

    addBooking(newBooking);
    setCreatedBooking(newBooking);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">
              {isSuccess ? 'Band qilish tasdiqlandi!' : 'Bron qilishni rasmiylashtirish'}
            </h3>
          </div>
          <button
            onClick={() => {
              setIsSuccess(false);
              closeBookingModal();
            }}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSuccess && createdBooking ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-stone-900">
                  Tabriklaymiz, joyingiz band qilindi!
                </h4>
                <p className="text-stone-500 text-sm mt-1">
                  Buyurtma kodi: <span className="font-bold text-orange-600">#{createdBooking.id}</span>. SMS orqali tasdiqnoma yuborildi.
                </p>
              </div>

              {/* Mini Ticket Card */}
              <div className="bg-orange-50/60 border border-orange-200/80 rounded-2xl p-4 text-left space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-stone-900 text-sm">{createdBooking.title}</h5>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      {activity.address}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500 text-white text-[11px] font-bold rounded-full">
                    Tasdiqlandi
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-orange-100 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Sana:</span>
                    <span className="font-bold text-stone-800">{createdBooking.date}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Vaqt:</span>
                    <span className="font-bold text-stone-800">{createdBooking.time}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Mehmonlar:</span>
                    <span className="font-bold text-stone-800">{createdBooking.guests} kishi</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    closeBookingModal();
                    openTicketModal(createdBooking);
                  }}
                  className="flex-1 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
                >
                  <span>Elektron chiptani ko‘rish (QR)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    closeBookingModal();
                    navigate('user-dashboard');
                  }}
                  className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm rounded-xl transition-all"
                >
                  Mening profilimga o‘tish
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmBooking} className="space-y-5">
              
              {/* Activity Info Summary */}
              <div className="flex gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-200/80 items-center">
                <img
                  src={activity.images[0]}
                  alt={activity.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-stone-900 text-sm truncate">{activity.title}</h4>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    {activity.district} tumani
                  </p>
                  <p className="text-xs font-bold text-orange-600 mt-1">
                    {activity.price.toLocaleString('uz-UZ')} UZS <span className="text-stone-400 font-normal">/ {activity.priceType}</span>
                  </p>
                </div>
              </div>

              {/* Slot and Date picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    Tashrif sanasi:
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    Vaqt seansi:
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    {activity.timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest counter */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-orange-500" />
                    Mehmonlar soni:
                  </span>
                  <span className="text-stone-400 font-normal text-[11px]">
                    Min: {activity.minGuests}, Max: {activity.maxGuests}
                  </span>
                </label>
                <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-sm font-semibold text-stone-800">{guests} kishi</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={guests <= activity.minGuests}
                      onClick={() => setGuests(prev => Math.max(activity.minGuests, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-stone-200 font-bold text-stone-700 hover:bg-stone-100 disabled:opacity-40 flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-stone-900">{guests}</span>
                    <button
                      type="button"
                      disabled={guests >= activity.maxGuests}
                      onClick={() => setGuests(prev => Math.min(activity.maxGuests, prev + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-stone-200 font-bold text-stone-700 hover:bg-stone-100 disabled:opacity-40 flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Ism va familiya:
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    placeholder="Masalan: Azizbek"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Telefon raqam:
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    placeholder="+998 90 123 45 67"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-orange-500" />
                  To‘lov usulini tanlang:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Payme', 'Click Up', 'Uzum Bank', 'Joyida to‘lash'].map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                        paymentMethod === method
                          ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 text-stone-600 bg-white'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price calculation summary */}
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>{activity.price.toLocaleString('uz-UZ')} UZS × {guests} kishi</span>
                  <span>{totalPrice.toLocaleString('uz-UZ')} UZS</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Xizmat komissiyasi (0%)</span>
                  <span className="text-emerald-600 font-bold">Bepul</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-sm font-bold text-stone-900">
                  <span>Jami to‘lov miqdori:</span>
                  <span className="text-lg text-orange-600">{totalPrice.toLocaleString('uz-UZ')} UZS</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Bronni tasdiqlash ({totalPrice.toLocaleString('uz-UZ')} UZS)</span>
              </button>

              <p className="text-[11px] text-center text-stone-400">
                🔒 256-bit shifrlangan xavfsiz to‘lov. 24 soat oldin bekor qilish 100% bepul.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
