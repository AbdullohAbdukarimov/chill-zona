# JoyBand Telegram Boti 🤖

Ushbu Telegram bot **"JoyBand"** ko‘ngilochar va faol dam olish maskanlarini bron qilish platformasi uchun yaratilgan.

## 🎯 Imkoniyatlari:
1. **Foydalanuvchini ro‘yxatga olish (`/start`)**:
   - Foydalanuvchidan qulay Reply Keyboard orqali telefon raqamini ulashishni (`request_contact`) so‘raydi.
   - Telefon raqam tasdiqlangach, asosiy boshqaruv menyusini ochadi.
2. **Asosiy Inline Menyu**:
   - **🔍 Joylarni izlash**: Toshkentdagi top-3 mashhur dam olish maskanlarini (kvest, karting, romantik kecha) ko‘rsatadi va to‘g‘ridan-to‘g‘ri bron qilish tugmalarini beradi.
   - **📅 Mening bandlarim**: Foydalanuvchining so‘nggi bron qilingan chiptasi (#JB-9941), sanasi, vaqti va QR chipta havolasini taqdim etadi.
   - **🌐 Saytga o‘tish**: Telegram Mini App orqali to‘g‘ridan-to‘g‘ri JoyBand Vercel ilovasini ochadi.
   - **ℹ️ Yordam**: 24/7 call-markaz raqami va ma’muriyat kontaktlari.
3. **Saytdan xabarnoma yuborish funksiyasi (`sendBookingNotification`)**:
   - Veb-sayt backend tizimi muvaffaqiyatli to‘lov/bron bo‘lganda foydalanuvchiga Telegram orqali chipta ma’lumotlarini avtomatik jo‘natadi.

---

## 🚀 O‘rnatish va Ishga Tushirish:

### 1-qadam: Bot Token olish
1. Telegramda [@BotFather](https://t.me/BotFather) botiga kiring.
2. `/newbot` buyrug‘ini yuboring.
3. Botingizga nom (masalan: `JoyBand Booking Bot`) va username (masalan: `JoyBand_Booking_Bot`) bering.
4. BotFather sizga bergan **HTTP API Token** (masalan: `7891234567:AAH...`) dan nusxa oling.

### 2-qadam: Sozlamalar (.env)
`bot` papkasida `.env` faylini yarating (yoki `.env.example` nusxasini oling):
```env
BOT_TOKEN=7891234567:AAHxxxxxxxxxxxxxxxxxxxxxxx
WEBAPP_URL=https://chill-zone-ten.vercel.app
```

### 3-qadam: Kutubxonalarni o‘rnatish
```bash
cd bot
npm install
```

### 4-qadam: Botni ishga tushirish
```bash
# Oddiy ishga tushirish:
npm start

# Yoki avtomatik qayta yuklanuvchi rejimda:
npm run dev
```

---

## 📲 Veb Backenddan Bildirishnoma Yuborish (Namuna):

```javascript
import { sendBookingNotification } from './bot/index.js';

// Foydalanuvchi saytda joy bron qilganda:
await sendBookingNotification(123456789, {
  id: 'BK-5520',
  title: 'Apex Karting Arena: Poyga va Drift',
  district: 'Yunusobod',
  date: '2026-10-18',
  time: '18:00',
  guests: 3,
  totalPrice: 360000,
  paymentMethod: 'Payme'
});
```
