import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { REVENUE_CHART_DATA } from '../data/mockData';
import { 
  Building2, 
  DollarSign, 
  Calendar, 
  Eye, 
  PlusCircle, 
  Check, 
  X, 
  Phone, 
  Star, 
  BarChart3, 
  ToggleLeft, 
  ToggleRight, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';

export const PartnerDashboardPage = () => {
  const { 
    partnerListings, 
    partnerOrders, 
    toggleListingStatus, 
    approveOrder, 
    declineOrder, 
    openNewListingModal,
    t 
  } = useApp();

  const [chartPeriod, setChartPeriod] = useState('weekly');
  const [selectedChartBar, setSelectedChartBar] = useState(REVENUE_CHART_DATA[4]);

  const totalEarnings = partnerOrders
    .filter(o => o.status === 'Approved')
    .reduce((sum, o) => sum + o.amount, 48650000);

  const activeOrdersCount = partnerOrders.filter(o => o.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-slate-100 pb-24 transition-colors duration-300">
      
      {/* Top Admin Bar */}
      <div className="bg-stone-900 dark:bg-slate-900 text-white py-8 border-b border-stone-800 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/20">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight">
                    JoyBand Host Portal
                  </h1>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-md">
                    Verifikatsiyadan o‘tgan
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  Hamkor ID: #PTN-4019 • Toshkent, Yunusobod tumani
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={openNewListingModal}
                className="py-3 px-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2 hover:scale-105 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('addListingBtn')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* ==================== 1. TOP METRIC CARDS ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Jami daromad */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs space-y-2 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-400 dark:text-slate-500 uppercase tracking-wider">
                {t('totalEarnings')}
              </span>
              <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">
              {totalEarnings.toLocaleString('uz-UZ')} UZS
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4%</span>
            </div>
          </div>

          {/* Card 2: Faol bandlar */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs space-y-2 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-400 dark:text-slate-500 uppercase tracking-wider">
                {t('activeOrders')}
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">
              34 ta buyurtma
            </div>
            <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeOrdersCount} ta yangi</span>
            </div>
          </div>

          {/* Card 3: Saytga kirishlar */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs space-y-2 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-400 dark:text-slate-500 uppercase tracking-wider">
                {t('profileViews')}
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">
              8,920 marta
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+24.5%</span>
            </div>
          </div>

          {/* Card 4: O‘rtacha baho */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs space-y-2 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-400 dark:text-slate-500 uppercase tracking-wider">
                {t('avgRating')}
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
            </div>
            <div className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">
              4.92 / 5.0
            </div>
            <div className="text-xs text-stone-500 dark:text-slate-400">
              177 ta mijoz sharhlari
            </div>
          </div>

        </div>

        {/* ==================== 2. MAIN CHART AREA ==================== */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-black text-stone-900 dark:text-white">
                  {t('revenueAnalytics')}
                </h2>
              </div>
              <p className="text-xs text-stone-500 dark:text-slate-400 mt-0.5">
                {selectedChartBar.day}: {selectedChartBar.revenue.toLocaleString('uz-UZ')} UZS
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setChartPeriod('weekly')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  chartPeriod === 'weekly' ? 'bg-orange-500 text-white shadow-xs' : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300'
                }`}
              >
                Haftalik
              </button>
              <button
                onClick={() => setChartPeriod('monthly')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  chartPeriod === 'monthly' ? 'bg-orange-500 text-white shadow-xs' : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300'
                }`}
              >
                Oylik
              </button>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2 sm:px-6">
            {REVENUE_CHART_DATA.map((item, idx) => {
              const maxVal = 12000000;
              const heightPercent = Math.round((item.revenue / maxVal) * 100);
              const isSelected = selectedChartBar.day === item.day;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedChartBar(item)}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end cursor-pointer group"
                >
                  <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-all ${
                    isSelected ? 'bg-stone-900 dark:bg-slate-800 text-white shadow-md' : 'text-stone-400 dark:text-slate-500 group-hover:text-stone-900 dark:group-hover:text-white'
                  }`}>
                    {(item.revenue / 1000000).toFixed(1)}M
                  </div>

                  <div className="w-full max-w-[48px] bg-stone-100 dark:bg-slate-800 rounded-2xl overflow-hidden h-full flex items-end p-1">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-xl transition-all duration-500 ${
                        isSelected
                          ? 'bg-gradient-to-t from-orange-600 to-amber-400 shadow-md shadow-orange-500/30'
                          : 'bg-stone-300 dark:bg-slate-700 group-hover:bg-orange-400'
                      }`}
                    />
                  </div>

                  <span className={`text-xs font-bold transition-colors ${
                    isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-stone-500 dark:text-slate-400'
                  }`}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== 3. YANGI BUYURTMALAR (RECENT ORDERS) ==================== */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs space-y-6 transition-colors">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-black text-stone-900 dark:text-white">
                  {t('recentOrders')}
                </h2>
              </div>
            </div>

            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 font-bold text-xs rounded-full">
              {partnerOrders.length} ta buyurtma
            </span>
          </div>

          <div className="space-y-3">
            {partnerOrders.map((order) => {
              const isPending = order.status === 'Pending';
              const isApproved = order.status === 'Approved';
              const isDeclined = order.status === 'Declined';

              return (
                <div
                  key={order.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
                    isPending
                      ? 'bg-orange-50/40 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800'
                      : isApproved
                      ? 'bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800'
                      : 'bg-stone-50 dark:bg-slate-900/60 border-stone-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 flex flex-col items-center justify-center font-bold text-stone-700 dark:text-slate-300 shadow-xs">
                      <span className="text-[10px] text-stone-400">SOAT</span>
                      <span className="text-xs font-black text-orange-600 dark:text-orange-400">{order.timeSlot}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900 dark:text-white">{order.customerName}</span>
                        <span className="text-[10px] text-stone-400 font-mono">#{order.id}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                          isPending
                            ? 'bg-amber-100 text-amber-800'
                            : isApproved
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {isPending ? 'Kutilyapti' : isApproved ? t('statusConfirmed') : 'Rad etildi'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 dark:text-slate-400 mt-1">
                        <span className="font-medium text-stone-700 dark:text-slate-300">{order.listingTitle}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-orange-500" />
                          {order.customerPhone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-100 dark:border-slate-800">
                    <span className="text-xs font-black text-stone-900 dark:text-white">
                      {order.amount.toLocaleString('uz-UZ')} UZS
                    </span>

                    {isPending && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => approveOrder(order.id)}
                          className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{t('approveBtn')}</span>
                        </button>
                        <button
                          onClick={() => declineOrder(order.id)}
                          className="py-2 px-3 bg-stone-100 dark:bg-slate-800 hover:bg-red-100 text-stone-600 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>{t('declineBtn')}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== 4. MENING XIZMATLARIM ==================== */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-slate-800 pb-5">
            <div>
              <h2 className="text-lg font-black text-stone-900 dark:text-white">
                {t('myListings')}
              </h2>
            </div>

            <button
              onClick={openNewListingModal}
              className="py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('addListingBtn')}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-slate-800 border-b border-stone-100 dark:border-slate-800 text-stone-400 uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-3 px-4">Maskan</th>
                  <th className="py-3 px-4">Toifasi</th>
                  <th className="py-3 px-4">Narxi</th>
                  <th className="py-3 px-4">Holati</th>
                  <th className="py-3 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-slate-800">
                {partnerListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-stone-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <span className="font-bold text-stone-900 dark:text-white block">{listing.title}</span>
                          <span className="text-[11px] text-stone-400 dark:text-slate-500">{listing.district} tumani</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-stone-700 dark:text-slate-300">
                      {listing.category}
                    </td>
                    <td className="py-4 px-4 font-black text-orange-600 dark:text-orange-400">
                      {listing.price.toLocaleString('uz-UZ')} UZS
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleListingStatus(listing.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[11px] cursor-pointer ${
                          listing.active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-100 dark:bg-slate-800 text-stone-500 dark:text-slate-400'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${listing.active ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'}`}></span>
                        <span>{listing.active ? t('statusActive') : t('statusPaused')}</span>
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => toggleListingStatus(listing.id)}
                        className="text-stone-400 hover:text-orange-600 p-1 cursor-pointer"
                      >
                        {listing.active ? (
                          <ToggleRight className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <ToggleLeft className="w-5 h-5 text-stone-400" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
};
