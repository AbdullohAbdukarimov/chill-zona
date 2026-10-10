import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  QrCode, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Printer, 
  CheckCircle2, 
  Flame 
} from 'lucide-react';

export const TicketModal = () => {
  const { modalState, closeTicketModal, addToast } = useApp();
  const booking = modalState.selectedBooking;

  if (!modalState.ticketModal || !booking) return null;

  const handlePrint = () => {
    window.print();
    addToast('Chipta chop etishga tayyorlandi', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-slate-800 overflow-hidden flex flex-col">
        
        {/* Ticket Header Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white relative">
          <button
            onClick={closeTicketModal}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">JoyBand Pass</span>
            <span className="ml-auto mr-6 px-2 py-0.5 bg-white/30 text-[10px] font-bold rounded-full">
              ELEKTRON CHIPTA
            </span>
          </div>

          <h3 className="text-xl font-black leading-snug mt-3">
            {booking.title}
          </h3>
          <p className="text-xs text-orange-100 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5" />
            {booking.district} tumani
          </p>
        </div>

        {/* Ticket Body */}
        <div className="p-6 space-y-5 bg-white dark:bg-slate-900 relative">
          
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-dashed border-stone-200 dark:border-slate-800 text-xs">
            <div>
              <span className="text-stone-400 dark:text-slate-500 block text-[11px] mb-0.5">Buyurtma ID</span>
              <span className="font-black text-stone-900 dark:text-white text-sm tracking-wider">#{booking.id}</span>
            </div>
            <div>
              <span className="text-stone-400 dark:text-slate-500 block text-[11px] mb-0.5">Holat</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold rounded-md text-[11px]">
                <CheckCircle2 className="w-3 h-3" />
                {booking.statusText || 'Tasdiqlangan'}
              </span>
            </div>
            <div>
              <span className="text-stone-400 dark:text-slate-500 block text-[11px] mb-0.5">Tashrif sanasi</span>
              <span className="font-bold text-stone-800 dark:text-slate-200 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-orange-500" />
                {booking.date}
              </span>
            </div>
            <div>
              <span className="text-stone-400 dark:text-slate-500 block text-[11px] mb-0.5">Vaqt seansi</span>
              <span className="font-bold text-stone-800 dark:text-slate-200 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                {booking.time}
              </span>
            </div>
            <div>
              <span className="text-stone-400 dark:text-slate-500 block text-[11px] mb-0.5">Mehmonlar</span>
              <span className="font-bold text-stone-800 dark:text-slate-200 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-orange-500" />
                {booking.guests} kishi
              </span>
            </div>
            <div>
              <span className="text-stone-400 dark:text-slate-500 block text-[11px] mb-0.5">To‘lov summasi</span>
              <span className="font-black text-orange-600 dark:text-orange-400">
                {booking.totalPrice?.toLocaleString('uz-UZ')} UZS
              </span>
            </div>
          </div>

          {/* QR Code Simulation */}
          <div className="text-center py-2 space-y-3">
            <div className="w-40 h-40 mx-auto bg-stone-50 dark:bg-slate-800 border-2 border-stone-200 dark:border-slate-700 rounded-2xl p-3 flex flex-col items-center justify-center shadow-inner group">
              <QrCode className="w-28 h-28 text-stone-900 dark:text-white group-hover:scale-105 transition-transform" />
              <span className="text-[10px] font-mono tracking-widest text-stone-500 dark:text-slate-400 mt-1">
                {booking.qrCode || `JB-${booking.id}-2026`}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Chop etish</span>
            </button>
            <button
              onClick={closeTicketModal}
              className="py-3 px-4 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Yopish
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
