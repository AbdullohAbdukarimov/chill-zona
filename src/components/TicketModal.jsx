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
  Flame, 
  Sparkles 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        
        {/* Ticket Header Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white relative">
          <button
            onClick={closeTicketModal}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">Chill zone Pass</span>
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

        {/* Ticket Body with perforated style */}
        <div className="p-6 space-y-5 bg-white relative">
          
          {/* Perforated edge marks */}
          <div className="absolute -top-3 left-0 w-6 h-6 rounded-full bg-stone-900/70 -translate-x-3"></div>
          <div className="absolute -top-3 right-0 w-6 h-6 rounded-full bg-stone-900/70 translate-x-3"></div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-dashed border-stone-200 text-xs">
            <div>
              <span className="text-stone-400 block text-[11px] mb-0.5">Buyurtma ID</span>
              <span className="font-black text-stone-900 text-sm tracking-wider">#{booking.id}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px] mb-0.5">Holat</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded-md text-[11px]">
                <CheckCircle2 className="w-3 h-3" />
                {booking.statusText || 'Tasdiqlangan'}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px] mb-0.5">Tashrif sanasi</span>
              <span className="font-bold text-stone-800 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-orange-500" />
                {booking.date}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px] mb-0.5">Vaqt seansi</span>
              <span className="font-bold text-stone-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                {booking.time}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px] mb-0.5">Mehmonlar</span>
              <span className="font-bold text-stone-800 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-orange-500" />
                {booking.guests} kishi
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px] mb-0.5">To‘lov summasi</span>
              <span className="font-black text-orange-600">
                {booking.totalPrice?.toLocaleString('uz-UZ')} UZS
              </span>
            </div>
          </div>

          {/* QR Code Simulation */}
          <div className="text-center py-2 space-y-3">
            <div className="w-40 h-40 mx-auto bg-stone-50 border-2 border-stone-200 rounded-2xl p-3 flex flex-col items-center justify-center shadow-inner group">
              <QrCode className="w-28 h-28 text-stone-900 group-hover:scale-105 transition-transform" />
              <span className="text-[10px] font-mono tracking-widest text-stone-500 mt-1">
                {booking.qrCode || `CHZ-${booking.id}-2026`}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 leading-tight">
              Maskanga kirishda ushbu QR kodni ma’muriyatga ko‘rsating.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Chop etish / Saqlash</span>
            </button>
            <button
              onClick={closeTicketModal}
              className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-all"
            >
              Yopish
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
