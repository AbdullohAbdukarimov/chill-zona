import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DISTRICTS, CATEGORIES } from '../data/mockData';
import { X, PlusCircle, Sparkles, Image, DollarSign, MapPin, Tag } from 'lucide-react';

export const NewListingModal = () => {
  const { modalState, closeNewListingModal, addPartnerListing } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [price, setPrice] = useState(150000);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=80');

  if (!modalState.newListingModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newListing = {
      id: `lst-${Date.now()}`,
      title,
      category,
      district,
      price: Number(price),
      monthlyBookings: 0,
      monthlyRevenue: 0,
      rating: 5.0,
      active: true,
      image: imageUrl
    };

    addPartnerListing(newListing);
    closeNewListingModal();
    setTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">
              Yangi ko‘ngilochar xizmat qo‘shish
            </h3>
          </div>
          <button
            onClick={closeNewListingModal}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Xizmat / Maskan nomi:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masalan: Apex VR Escape Arena"
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-orange-500" />
                Toifasi:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                Tumani:
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                {DISTRICTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-orange-500" />
              Narxi (UZS):
            </label>
            <input
              type="number"
              min="10000"
              step="10000"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
              <Image className="w-3.5 h-3.5 text-orange-500" />
              Surat URL manzili:
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Xizmatni nashr etish</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
