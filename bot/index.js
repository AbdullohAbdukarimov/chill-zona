/**
 * Chill Zone - Activity & Entertainment Booking Marketplace Telegram Bot
 * Built using Node.js & Telegraf
 */

import { Telegraf, Markup } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://chill-zone-ten.vercel.app';

if (!BOT_TOKEN) {
  console.warn('⚠️ DIQQAT: BOT_TOKEN topilmadi! .env faylida BOT_TOKEN ni sozlang.');
}

export const bot = new Telegraf(BOT_TOKEN);

// Foydalanuvchilar ma'lumotlarini vaqtinchalik saqlash (In-Memory Database)
const registeredUsers = new Map();

// 3 ta mock faol maskanlar ro'yxati (Search activities uchun)
const MOCK_ACTIVITIES = [
  {
    id: 'act-1',
    title: 'Insomnia: O‘ta Qo‘rqinchli Kvest',
    category: 'Kvest xonasi',
    district: 'Mirobod',
    price: '180,000 UZS',
    rating: '⭐ 4.95 (142 sharh)',
    url: `${WEBAPP_URL}#activity/act-1`
  },
  {
    id: 'act-2',
    title: 'Apex Karting Arena: Poyga va Drift',
    category: 'Sport & Adrenalin',
    district: 'Yunusobod',
    price: '120,000 UZS',
    rating: '⭐ 4.88 (230 sharh)',
    url: `${WEBAPP_URL}#activity/act-2`
  },
  {
    id: 'act-3',
    title: 'Skyline: Tomda Romantik Sham Kechasi',
    category: 'Romantik',
    district: 'Yakkasaroy',
    price: '650,000 UZS (juftlik)',
    rating: '⭐ 4.98 (89 sharh)',
    url: `${WEBAPP_URL}#activity/act-3`
  }
];

// Asosiy Inline menyuni yaratish yordamchi funksiyasi
const getMainInlineKeyboard = () => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('🔍 Joylarni izlash', 'menu_search'),
      Markup.button.callback('📅 Mening bandlarim', 'menu_bookings')
    ],
    [
      // Telegram Mini App tugmasi
      Markup.button.webApp('🌐 Saytga o‘tish (Mini App)', WEBAPP_URL)
    ],
    [
      Markup.button.callback('ℹ️ Yordam & Call-markaz', 'menu_help')
    ]
  ]);
};

// ==========================================
// 1. COMMANDS & KEYBOARDS (Kirish va Ro'yxatdan o'tish)
// ==========================================

// /start komandasi
bot.start(async (ctx) => {
  const firstName = ctx.from?.first_name || 'Hurmatli foydalanuvchi';
  const chatId = ctx.chat.id;

  // Agar foydalanuvchi allaqachon ro'yxatdan o'tgan bo'lsa
  if (registeredUsers.has(chatId)) {
    const user = registeredUsers.get(chatId);
    return ctx.reply(
      `👋 Qaytganingiz bilan, ${firstName}!\n\n` +
      `Siz Chill Zone tizimidan muvaffaqiyatli ro‘yxatdan o‘tgansiz.\n` +
      `📱 Raqamingiz: ${user.phone}\n\n` +
      `Quyidagi menyu orqali kerakli bo‘limni tanlang:`,
      getMainInlineKeyboard()
    );
  }

  // Ro'yxatdan o'tish uchun telefon raqamini so'rash
  await ctx.reply(
    `👋 Assalomu alaykum, ${firstName}!\n\n` +
    `🔥 <b>Chill Zone botiga xush kelibsiz!</b>\n` +
    `Toshkentdagi eng sara kvestlar, bouling, sport va romantik dam olish maskanlarini bir necha soniyada bron qiling.\n\n` +
    `<i>Iltimos, ro‘yxatdan o‘tish uchun telefon raqamingizni yuboring:</i>`,
    {
      parse_mode: 'HTML',
      ...Markup.keyboard([
        [Markup.button.contactRequest('📱 Telefon raqamni yuborish')]
      ])
      .resize()
      .oneTime()
    }
  );
});

// Kontakt qabul qiluvchi handler (request_contact)
bot.on('contact', async (ctx) => {
  const contact = ctx.message.contact;
  const chatId = ctx.chat.id;
  const firstName = ctx.from?.first_name || 'Foydalanuvchi';

  // Telefon raqamini formatlash
  let phone = contact.phone_number;
  if (!phone.startsWith('+')) {
    phone = '+' + phone;
  }

  // Foydalanuvchini bazaga (in-memory) saqlash
  registeredUsers.set(chatId, {
    chatId,
    phone,
    name: firstName,
    registeredAt: new Date().toISOString()
  });

  // Reply klaviaturani olib tashlash va muvaffaqiyatli xabar
  await ctx.reply(
    `✅ <b>Rahmat, ${firstName}!</b>\n` +
    `Sizning raqamingiz muvaffaqiyatli ro‘yxatga olindi:\n` +
    `📞 <b>${phone}</b>\n\n` +
    `Endi siz Chill Zone platformasidagi barcha xizmatlardan foydalanishingiz va yangi buyurtmalaringiz haqida xabarnomalarni qabul qilishingiz mumkin.`,
    {
      parse_mode: 'HTML',
      ...Markup.removeKeyboard()
    }
  );

  // Asosiy Inline menyuni ko'rsatish
  await ctx.reply(
    `Quyidagi bo‘limlardan birini tanlang:`,
    getMainInlineKeyboard()
  );
});

// ==========================================
// 2. MAIN MENU (Inline Keyboards Callbacks)
// ==========================================

// 1. "🔍 Joylarni izlash" callback
bot.action('menu_search', async (ctx) => {
  await ctx.answerCbQuery();

  let message = `🎯 <b>Toshkentdagi eng mashhur dam olish maskanlari:</b>\n\n`;

  const buttons = [];

  MOCK_ACTIVITIES.forEach((act, index) => {
    message += `${index + 1}. <b>${act.title}</b>\n` +
      `   🏷 Toifa: ${act.category}\n` +
      `   📍 Manzil: ${act.district} tumani\n` +
      `   💰 Narxi: <b>${act.price}</b>\n` +
      `   ${act.rating}\n\n`;

    buttons.push([
      Markup.button.webApp(`🎟 ${act.title.split(':')[0]} - Bron qilish`, act.url)
    ]);
  });

  buttons.push([
    Markup.button.callback('◀️ Asosiy menyu', 'menu_main')
  ]);

  await ctx.reply(message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard(buttons)
  });
});

// 2. "📅 Mening bandlarim" callback
bot.action('menu_bookings', async (ctx) => {
  await ctx.answerCbQuery();
  const chatId = ctx.chat.id;
  const user = registeredUsers.get(chatId);

  await ctx.reply(
    `🎫 <b>Sizning faol buyurtmalaringiz:</b>\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `📌 <b>Chipta kodi:</b> <code>#JB-9941</code>\n` +
    `🎮 <b>Maskan:</b> Insomnia: O‘ta Qo‘rqinchli Kvest\n` +
    `📍 <b>Manzil:</b> Mirobod tumani, Nukus ko‘chasi 24B\n` +
    `📅 <b>Sana:</b> 18-Oktyabr, 2026\n` +
    `⏰ <b>Vaqt:</b> 19:30\n` +
    `👥 <b>Mehmonlar:</b> 4 kishi\n` +
    `💰 <b>Summa:</b> 720,000 UZS (Payme)\n` +
    `🟢 <b>Holati:</b> Tasdiqlangan (Ochiq)\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n` +
    `<i>Maskanga tashrif buyurganingizda ushbu chipta kodini yoki ilovadagi QR kodni ko‘rsatishingiz kifoya.</i>`,
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.webApp('📲 QR Chiptani ochish (Mini App)', `${WEBAPP_URL}#dashboard`)],
        [Markup.button.callback('◀️ Asosiy menyu', 'menu_main')]
      ])
    }
  );
});

// 3. "ℹ️ Yordam & Call-markaz" callback
bot.action('menu_help', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `📞 <b>Chill Zone Qo‘llab-quvvatlash Markazi:</b>\n\n` +
    `Savollaringiz yoki bron qilishda qiyinchilik bo‘lsa, biz sizga 24/7 yordam berishga tayyormiz:\n\n` +
    `☎️ Telefon: <b>+998 (71) 200-44-22</b>\n` +
    `💬 Telegram Admin: @chillzone_support\n` +
    `📍 Manzil: Toshkent sh., Mirobod t., Oybek ko‘chasi 42-uy`,
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.url('💬 Operatorga yozish', 'https://t.me/telegram')],
        [Markup.button.callback('◀️ Asosiy menyu', 'menu_main')]
      ])
    }
  );
});

// Asosiy menyuga qaytish callback
bot.action('menu_main', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `Bosh menyu:`,
    getMainInlineKeyboard()
  );
});

// /menu komandasi
bot.command('menu', async (ctx) => {
  await ctx.reply(
    `Chill Zone Asosiy Menyusi:`,
    getMainInlineKeyboard()
  );
});

// Har qanday boshqa matnli xabarlarga javob
bot.on('text', async (ctx) => {
  const text = ctx.message.text;
  if (text.startsWith('/')) return;

  await ctx.reply(
    `Iltimos, pastdagi menyu tugmalaridan foydalaning yoki /start buyrug‘ini yuboring.`,
    getMainInlineKeyboard()
  );
});

// ==========================================
// 3. NOTIFICATION FUNCTION (Veb-saytdan chaqiriladigan xabarnoma)
// ==========================================

/**
 * Foydalanuvchi saytda muvaffaqiyatli bron qilganda bot orqali bildirishnoma yuboruvchi funksiya
 * 
 * @param {string|number} chatId - Telegram chat ID (yoki foydalanuvchi ID si)
 * @param {Object} bookingDetails - Buyurtma ma'lumotlari
 * @param {string} bookingDetails.id - Buyurtma/chipta kodi (masalan, "BK-9941")
 * @param {string} bookingDetails.title - Maskan nomi
 * @param {string} bookingDetails.district - Tumani
 * @param {string} bookingDetails.date - Tashrif sanasi
 * @param {string} bookingDetails.time - Seans vaqti
 * @param {number} bookingDetails.guests - Mehmonlar soni
 * @param {number} bookingDetails.totalPrice - Umumiy to'lov miqdori
 * @param {string} [bookingDetails.paymentMethod] - To'lov usuli (Payme, Click va h.k.)
 * @returns {Promise<Object>} Yuborilgan xabar natijasi
 */
export async function sendBookingNotification(chatId, bookingDetails) {
  if (!BOT_TOKEN) {
    throw new Error('BOT_TOKEN belgilanmagan! Xabarnoma yuborib bo‘lmadi.');
  }

  const {
    id = 'JB-NEW',
    title = 'Dam olish maskani',
    district = 'Toshkent',
    date = 'Bugun',
    time = '18:00',
    guests = 2,
    totalPrice = 150000,
    paymentMethod = 'Payme'
  } = bookingDetails;

  const formattedPrice = Number(totalPrice).toLocaleString('uz-UZ');

  const notificationMessage = 
    `🎉 <b>TABRIKLAYMIZ! BRONINGIZ TASDIQLANDI!</b>\n\n` +
    `Sizning Chill Zone platformasidagi buyurtmangiz muvaffaqiyatli qabul qilindi va joy band qilindi:\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `🎫 <b>Chipta ID:</b> <code>#${id}</code>\n` +
    `📍 <b>Maskan:</b> <b>${title}</b>\n` +
    `🏙 <b>Hudud:</b> ${district} tumani\n` +
    `📅 <b>Sana:</b> ${date}\n` +
    `⏰ <b>Vaqt:</b> ${time}\n` +
    `👥 <b>Mehmonlar:</b> ${guests} kishi\n` +
    `💰 <b>To‘lov miqdori:</b> <b>${formattedPrice} UZS</b>\n` +
    `💳 <b>To‘lov usuli:</b> ${paymentMethod}\n` +
    `✅ <b>Holati:</b> Tasdiqlangan\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n` +
    `<i>Tashrif vaqtida ushbu chipta kodini yoki profilingizdagi QR kodni ko‘rsatishingiz mumkin. Maroqli hordiq tilaymiz!</i>`;

  try {
    const sentMessage = await bot.telegram.sendMessage(chatId, notificationMessage, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [
          Markup.button.webApp('📲 QR Chiptani ko‘rish (Mini App)', `${WEBAPP_URL}#dashboard`)
        ],
        [
          Markup.button.url('🌐 Saytda ochish', WEBAPP_URL)
        ]
      ])
    });

    console.log(`✅ Bildirishnoma muvaffaqiyatli yuborildi [ChatId: ${chatId}, Chipta: #${id}]`);
    return { success: true, messageId: sentMessage.message_id };
  } catch (error) {
    console.error(`❌ Xabarnoma yuborishda xatolik [ChatId: ${chatId}]:`, error.message);
    throw error;
  }
}

// Xatoliklarni ushlash
bot.catch((err, ctx) => {
  console.error(`⚠️ Telegram Bot xatoligi (${ctx.updateType}):`, err);
});

// ==========================================
// 4. BOTNI ISHGA TUSHIRISH
// ==========================================

// Agar to'g'ridan-to'g'ri `node index.js` orqali ishga tushirilsa
if (process.argv[1] && process.argv[1].endsWith('index.js')) {
  if (BOT_TOKEN && BOT_TOKEN !== '1234567890:ABCdefGHIjklMNOpqrSTUvwxYZ_sample_token') {
    console.log('🚀 Chill Zone Telegram Boti ishga tushmoqda...');
    bot.launch()
      .then(() => {
        console.log('✨ Chill Zone Telegram Boti muvaffaqiyatli ishlayapti!');
        console.log(`🌐 Mini App URL: ${WEBAPP_URL}`);
      })
      .catch((err) => {
        console.error('❌ Botni ishga tushirishda xatolik:', err.message);
      });

    // To'xtatish signallarini ushlash
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  } else {
    console.log('ℹ️ Bot tokeni sozlanmagan. Iltimos, .env fayliga haqiqiy BOT_TOKEN ni kiriting.');
  }
}
