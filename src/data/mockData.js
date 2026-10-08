// Mock data tailored for Uzbekistan (Tashkent venues, UZS currency, local districts)

export const CATEGORIES = [
  { id: 'sport', name: 'Sport & Fitness', icon: 'Trophy', count: 24, description: 'Karting, tennis, futbol, skalodrom' },
  { id: 'kvest', name: 'Kvest xonalari', icon: 'Ghost', count: 18, description: 'Qo‘rqinchli, detektiv va VR sarguzashtlar' },
  { id: 'romantik', name: 'Romantik', icon: 'Heart', count: 15, description: 'Tomdagi shinam kechki ovqat, VIP kino' },
  { id: 'oilaviy', name: 'Oilaviy', icon: 'Users', count: 32, description: 'Akvapark, o‘yin markazlari, attraksionlar' },
  { id: 'bouling', name: 'Bouling & Bilyard', icon: 'Flame', count: 12, description: 'Zamonaviy bouling yo‘lakchalari va launj' },
  { id: 'ot-minish', name: 'Ot minish', icon: 'Compass', count: 9, description: 'Chorvoq manzaralari va ippodrom sayrlari' },
];

export const DISTRICTS = [
  'Mirobod',
  'Chilonzor',
  'Yunusobod',
  'Yakkasaroy',
  'Shayxontohur',
  'Mirzo Ulug‘bek',
  'Sergeli',
  'Yashnobod'
];

export const MOCK_ACTIVITIES = [
  {
    id: 'act-1',
    title: 'Insomnia: O‘ta Qo‘rqinchli Kvest (Aktyorlar bilan)',
    category: 'kvest',
    categoryName: 'Kvest xonalari',
    district: 'Mirobod',
    address: 'Mirobod tumani, Nukus ko‘chasi 24B',
    metro: 'Oybek metrosi (400m)',
    rating: 4.95,
    reviewsCount: 142,
    price: 180000,
    priceType: 'kishi boshiga',
    duration: '80 daqiqa',
    minGuests: 2,
    maxGuests: 8,
    isTrending: true,
    discount: 15,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Toshkentdagi eng hayajonli va qo‘rqinchli kontaktli kvest! Haqiqiy professional teatr aktyorlari, mistik ovoz effektlari va kutilmagan jumboqlar sizni unutilmas psixologik sarguzashtga yetaklaydi. Qorong‘u koridorlardan chiqish yo‘lini topa olasizmi?',
    highlights: [
      'Professional aktyorlar jamoasi (3 ta personaj)',
      '300 kv.m maydondagi 6 ta interaktiv xona',
      'Kamera orqali to‘liq xavfsizlik nazorati',
      'Yurak kasalligi borlarga tavsiya etilmaydi'
    ],
    amenities: ['Wi-Fi bepul', 'Avtoturargoh', 'Konditsioner', 'Kofe/Choy bepul', 'Kiyinish xonasi', 'Foto zona'],
    timeSlots: ['11:00', '13:00', '15:00', '17:30', '19:30', '21:30', '23:00'],
    host: {
      name: 'Questoria Tashkent Hub',
      badge: 'Super Hamkor',
      experience: '4 yil tajriba',
      phone: '+998 71 200 88 44',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'act-2',
    title: 'Apex Karting Arena: Poyga va Drift Chempionati',
    category: 'sport',
    categoryName: 'Sport & Fitness',
    district: 'Yunusobod',
    address: 'Yunusobod tumani, Amir Temur ko‘chasi 107A',
    metro: 'Shahriston metrosi (300m)',
    rating: 4.88,
    reviewsCount: 230,
    price: 120000,
    priceType: '10 daqiqa / kishi',
    duration: 'Har seans 10-15 daqiqa',
    minGuests: 1,
    maxGuests: 12,
    isTrending: true,
    discount: null,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Zamonaviy elektr va benzinli nemis Sodi Kart kartinglari, 700 metrli professional asfalat trek va telemetriya vaqt hisoblagichi. Do‘stlar bilan haqiqiy Formula-1 poygachisi kabi tezlik va adrenalin hissini tuying!',
    highlights: [
      'Eng yangi Sodi Kart 270cc poyga mashinalari',
      'Elektron tablodagi aniq poyga natijalari (Lap times)',
      'Professional shlem va himoya kiyimlari taqdim etiladi',
      'Podium marosimi va esdalik fotosuratlar'
    ],
    amenities: ['Katta avtoturargoh', 'Sport bar & Kafe', 'Konditsioner', 'Dush xonasi', 'Wi-Fi bepul', 'VIP tomosha lojasi'],
    timeSlots: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    host: {
      name: 'Apex Racing Club',
      badge: 'Rasmiy Trek',
      experience: '6 yil faoliyat',
      phone: '+998 90 999 12 34',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'act-3',
    title: 'Skyline: Tomda Romantik Sham Yorug‘idagi Kechki Ovqat',
    category: 'romantik',
    categoryName: 'Romantik',
    district: 'Yakkasaroy',
    address: 'Yakkasaroy tumani, Shota Rustaveli ko‘chasi 56 (22-qavat)',
    metro: 'Kosmonavtlar metrosi (800m)',
    rating: 4.98,
    reviewsCount: 89,
    price: 650000,
    priceType: 'juftlik uchun (2 kishi)',
    duration: '2.5 soat',
    minGuests: 2,
    maxGuests: 2,
    isTrending: true,
    discount: 10,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Toshkentning 360 darajali tungi manzarasi, shinam shisha gumbaz (iglu), jonli skripka musiqasi, maxsus bezatilgan shamlar va nozik taomlar menyusi. Tug‘ilgan kun, sevgi izhori yoki nikoh yilligi uchun ideal tanlov.',
    highlights: [
      'Maxsus isitiladigan panorama shisha gumbaz',
      'Gullar kompozitsiyasi va bayramona dekoratsiya',
      '3 bosqichli italyan/yevropa mualliflik menyusi',
      '30 daqiqalik shaxsiy fotosessiya sovg‘a qilinadi'
    ],
    amenities: ['Shaxsiy ofitsiant', 'VIP zona', 'Isitish / Konditsioner', 'Musiqa buyurtmasi', 'Avtoturargoh', 'Wi-Fi bepul'],
    timeSlots: ['17:00', '19:30', '22:00'],
    host: {
      name: 'Skyline Terrace Lounge',
      badge: 'Premium Servis',
      experience: '3 yil faoliyat',
      phone: '+998 71 207 77 11',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'act-4',
    title: 'Strike Pro: VIP Bouling va Bilyard Majmuasi',
    category: 'bouling',
    categoryName: 'Bouling & Bilyard',
    district: 'Chilonzor',
    address: 'Chilonzor tumani, Bunyodkor shoh ko‘chasi 15',
    metro: 'Mirzo Ulug‘bek metrosi (150m)',
    rating: 4.82,
    reviewsCount: 168,
    price: 150000,
    priceType: 'yo‘lakcha soatiga',
    duration: '1 - 3 soat',
    minGuests: 1,
    maxGuests: 6,
    isTrending: false,
    discount: null,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1545232979-fbf67140f7f3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Brunswick avtomatik tizimlari bilan jihozlangan 16 ta professional bouling yo‘lakchalari, keng bilyard zali (rus piramidasi va amerika puli), DJ va muzdek kokteyllar. Do‘stlar va oila a’zolari bilan quvnoq hordiq uchun mo‘ljallangan maskan.',
    highlights: [
      'Bolalar uchun avtomatik ko‘tariluvchi himoya bortlari',
      'Har bir yo‘lakcha uchun qulay divanlar va stol',
      'Maxsus toza bouling poyabzallari barcha o‘lchamlarda',
      'Jonli musiqa va sport o‘yinlari translyatsiyasi'
    ],
    amenities: ['Kafe / Restoran', 'Avtoturargoh', 'Konditsioner', 'Wi-Fi bepul', 'Bilyard zali', 'PlayStation 5 xonasi'],
    timeSlots: ['12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00'],
    host: {
      name: 'Strike Bowling Club',
      badge: 'Ommabop Maskan',
      experience: '5 yil faoliyat',
      phone: '+998 71 277 00 22',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'act-5',
    title: 'Chorvoq Ot Sayri va Tog‘dagi Piknik Sayohati',
    category: 'ot-minish',
    categoryName: 'Ot minish',
    district: 'Mirzo Ulug‘bek',
    address: 'Mirzo Ulug‘bek tumani (To‘planish joyi) / Chorvoq yo‘nalishi',
    metro: 'Buyuk Ipak Yo‘li metrosi (Transfer)',
    rating: 4.97,
    reviewsCount: 194,
    price: 320000,
    priceType: 'kishi boshiga (3 soat)',
    duration: '3 soatlik marshrut',
    minGuests: 1,
    maxGuests: 10,
    isTrending: true,
    discount: 20,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Chorvoq suv ombori bo‘yidagi yashil qirlar va qorli tog‘lar etagida tajribali instruktor hamrohligida xavfsiz ot minish safari. Yangi boshlovchilar uchun o‘rgatish bepul. Tog‘ havosida choy va issiq somsa bilan piknik tashkil etiladi.',
    highlights: [
      'O‘rgatilgan, xotirjam va vafodor zotli otlar',
      'Har bir mehmon uchun individual instruktor yo‘lboshchiligi',
      'Professional fotosessiya va video lavhalar',
      'Toshkentdan qulay mikroavtobusda transfer imkoni'
    ],
    amenities: ['Bepul transfer', 'Ochiq osmon ostida choyxona', 'Instruktor xizmati', 'Himoya anjomlari', 'Fotosessiya'],
    timeSlots: ['09:00', '13:00', '16:00'],
    host: {
      name: 'Samoviy Tulpor Club',
      badge: 'Ekoturizm Lideri',
      experience: '7 yil tajriba',
      phone: '+998 97 450 11 22',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'act-6',
    title: 'Magic Oceanarium & VR Suv Osti Simulyatori',
    category: 'oilaviy',
    categoryName: 'Oilaviy',
    district: 'Shayxontohur',
    address: 'Shayxontohur tumani, Bobur ko‘chasi, Magic Park',
    metro: 'Xalqlar Do‘stligi metrosi (500m)',
    rating: 4.89,
    reviewsCount: 312,
    price: 90000,
    priceType: 'bolalar va kattalar uchun',
    duration: 'Kun bo‘yi kirish chiptasi',
    minGuests: 1,
    maxGuests: 15,
    isTrending: true,
    discount: null,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'O‘zbekistondagi eng ulkan dengiz akvariumi: akulalar, stingray balig‘i va minglab tropik jonzotlar yashaydigan 20 metrlik shisha tunnel. Bolalar uchun interaktiv o‘yinlar, akulalarni oziqlantirish shousi va VR suv osti ekspeditsiyasi.',
    highlights: [
      '20 metrlik to‘liq panoramali suv osti tunneli',
      'Har kuni soat 15:00 da akulalarni oziqlantirish shousi',
      'Bolalar uchun dengiz biologiyasi interaktiv darsi',
      'Maxsus sovg‘alar do‘koni va akva-kafe'
    ],
    amenities: ['Bolalar aravachasi ruxsat', 'Katta avtoturargoh', 'Kafe va muzqaymoq', 'Wi-Fi bepul', 'Suvenirlar burchagi'],
    timeSlots: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    host: {
      name: 'Magic Ocean World',
      badge: 'Oilaviy Tanlov',
      experience: '2 yil faoliyat',
      phone: '+998 71 202 33 00',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'act-7',
    title: 'Everest Climbing: Skalodrom va Bouldering Zali',
    category: 'sport',
    categoryName: 'Sport & Fitness',
    district: 'Mirobod',
    address: 'Mirobod tumani, Shahrisabz ko‘chasi 31',
    metro: 'Oybek metrosi (250m)',
    rating: 4.85,
    reviewsCount: 94,
    price: 85000,
    priceType: 'cheksiz mashg‘ulot',
    duration: 'Cheklanmagan vaqt',
    minGuests: 1,
    maxGuests: 8,
    isTrending: false,
    discount: null,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    ],
    description: '14 metr balandlikdagi avtomatik xavfsizlik arqonlari o‘rnatilgan sun’iy tosh devorlari hamda bouldering zali. Yangi boshlovchilardan tortib professional alpinistlargacha bo‘lgan 40 dan ortiq rangli marshrutlar.',
    highlights: [
      'Avtomatik sug‘urta (Auto-Belay) tizimlari',
      'Maxsus tosh poyabzali va magniy ijarasi mavjud',
      'Malakali sport ustalaridan 20 daqiqalik master-klass',
      'Xavfsiz qalin gimnastika matlari'
    ],
    amenities: ['Dush va kiyinish xonalari', 'Fitnes zonasi', 'Wi-Fi bepul', 'Sport kofe burchagi', 'Avtoturargoh'],
    timeSlots: ['09:00', '12:00', '15:00', '18:00', '20:30'],
    host: {
      name: 'Everest Vertical Group',
      badge: 'Sport Sertifikati',
      experience: '5 yil tajriba',
      phone: '+998 90 120 40 50',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'act-8',
    title: 'Chernobil-86: Maxfiy Bunkerdan Qochish Kvesti',
    category: 'kvest',
    categoryName: 'Kvest xonalari',
    district: 'Sergeli',
    address: 'Sergeli tumani, Yangi Sergeli ko‘chasi 8A',
    metro: 'Sergeli 3-bekat (200m)',
    rating: 4.91,
    reviewsCount: 115,
    price: 160000,
    priceType: 'kishi boshiga',
    duration: '75 daqiqa',
    minGuests: 2,
    maxGuests: 6,
    isTrending: false,
    discount: 10,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Haqiqiy sovet davri asbob-uskunalari, Dozimetr Geyger hisoblagichlari va sirenalar bilan jihozlangan bunker. Reaktor portlashidan oldin tizimni o‘chirib, bunkerdan chiqishga ulguring!',
    highlights: [
      'Tarixiy rekvizitlar va haqiqiy germetik temir eshiklar',
      'Mantiqiy, elektron va mexanik jumboqlar',
      'Jamoaviy jipslashuv (Teambuilding) uchun ajoyib format'
    ],
    amenities: ['Wi-Fi bepul', 'Avtoturargoh', 'Konditsioner', 'Choyxona burchagi'],
    timeSlots: ['12:00', '14:30', '17:00', '19:30', '22:00'],
    host: {
      name: 'Vault Mystery Rooms',
      badge: 'Super Hamkor',
      experience: '3 yil faoliyat',
      phone: '+998 93 300 12 34',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    }
  }
];

export const MOCK_REVIEWS = [
  {
    id: 'rev-1',
    userName: 'Jasur Bekmurodov',
    userCity: 'Toshkent',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: '3 kun oldin',
    comment: 'Do‘stlarim bilan keldik, hissiyotlar so‘z bilan ta’riflab bo‘lmaydi! Aktyorlarning o‘yini, atmosfera, musiqa — hammasi eng yuqori darajada. 100% tavsiya qilaman!',
    helpful: 24
  },
  {
    id: 'rev-2',
    userName: 'Madina Umarova',
    userCity: 'Samarqand',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: '1 hafta oldin',
    comment: 'Chill zone orqali bron qilish juda qulay bo‘ldi. Hech qanday ortiqcha qo‘ng‘iroqlarsiz, to‘lovni Payme orqali qilib yetib bordik. Joy ham aytilganidek toza va xushmuomala xodimlar.',
    helpful: 19
  },
  {
    id: 'rev-3',
    userName: 'Sardor Aliyev',
    userCity: 'Toshkent',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    rating: 4.8,
    date: '2 hafta oldin',
    comment: 'Bouling yo‘lakchalari yangi, to‘plar toza. Qulay divanlar va pizza ham mazali ekan. Yana albatta kelamiz!',
    helpful: 11
  }
];

export const INITIAL_USER_BOOKINGS = [
  {
    id: 'BK-9941',
    activityId: 'act-1',
    title: 'Insomnia: O‘ta Qo‘rqinchli Kvest',
    category: 'Kvest xonalari',
    district: 'Mirobod',
    date: '2026-10-15',
    time: '19:30',
    guests: 4,
    totalPrice: 720000,
    status: 'Confirmed', // Confirmed, Completed, Cancelled
    statusText: 'Tasdiqlangan',
    paymentMethod: 'Payme',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80',
    qrCode: 'CHZ-BK-9941-VALID-2026'
  },
  {
    id: 'BK-9812',
    activityId: 'act-3',
    title: 'Skyline: Tomda Romantik Sham Kechki Ovqati',
    category: 'Romantik',
    district: 'Yakkasaroy',
    date: '2026-10-22',
    time: '20:00',
    guests: 2,
    totalPrice: 650000,
    status: 'Confirmed',
    statusText: 'Tasdiqlangan',
    paymentMethod: 'Click Up',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    qrCode: 'CHZ-BK-9812-VALID-2026'
  },
  {
    id: 'BK-8720',
    activityId: 'act-2',
    title: 'Apex Karting Arena: Poyga va Drift',
    category: 'Sport & Fitness',
    district: 'Yunusobod',
    date: '2026-09-28',
    time: '18:00',
    guests: 3,
    totalPrice: 360000,
    status: 'Completed',
    statusText: 'Tugallangan',
    paymentMethod: 'Uzum Bank',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80',
    qrCode: 'CHZ-BK-8720-ARCHIVED'
  },
  {
    id: 'BK-7611',
    activityId: 'act-5',
    title: 'Chorvoq Ot Sayri va Piknik',
    category: 'Ot minish',
    district: 'Mirzo Ulug‘bek',
    date: '2026-09-10',
    time: '10:00',
    guests: 2,
    totalPrice: 640000,
    status: 'Cancelled',
    statusText: 'Bekor qilingan',
    paymentMethod: 'Naqd pul',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=400&q=80',
    qrCode: 'CHZ-BK-7611-CANCELLED'
  }
];

export const INITIAL_PARTNER_LISTINGS = [
  {
    id: 'lst-1',
    title: 'Apex Karting Arena: Grand Prix Track',
    category: 'Sport & Fitness',
    district: 'Yunusobod',
    price: 120000,
    monthlyBookings: 84,
    monthlyRevenue: 10080000,
    rating: 4.88,
    active: true,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'lst-2',
    title: 'Apex VIP Simulyator & VR E-Sports',
    category: 'Sport & Fitness',
    district: 'Yunusobod',
    price: 90000,
    monthlyBookings: 52,
    monthlyRevenue: 4680000,
    rating: 4.92,
    active: true,
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'lst-3',
    title: 'Apex Outdoor Go-Kart Night Race',
    category: 'Sport & Fitness',
    district: 'Yunusobod',
    price: 150000,
    monthlyBookings: 41,
    monthlyRevenue: 6150000,
    rating: 4.75,
    active: false,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=300&q=80'
  }
];

export const INITIAL_PARTNER_ORDERS = [
  {
    id: 'ORD-5101',
    customerName: 'Otabek Zokirov',
    customerPhone: '+998 90 980 44 22',
    listingTitle: 'Apex Karting Arena: Grand Prix Track',
    date: '2026-10-09',
    timeSlot: '18:00',
    guests: 4,
    amount: 480000,
    status: 'Pending', // Pending, Approved, Declined
    paymentStatus: 'To‘langan (Payme)',
    timeAgo: '12 daqiqa oldin'
  },
  {
    id: 'ORD-5102',
    customerName: 'Nodira Xolmatova',
    customerPhone: '+998 93 512 88 99',
    listingTitle: 'Apex VIP Simulyator & VR E-Sports',
    date: '2026-10-10',
    timeSlot: '15:00',
    guests: 2,
    amount: 180000,
    status: 'Pending',
    paymentStatus: 'To‘langan (Click)',
    timeAgo: '45 daqiqa oldin'
  },
  {
    id: 'ORD-5098',
    customerName: 'Farrux Tursunov',
    customerPhone: '+998 97 701 33 21',
    listingTitle: 'Apex Karting Arena: Grand Prix Track',
    date: '2026-10-08',
    timeSlot: '20:30',
    guests: 6,
    amount: 720000,
    status: 'Approved',
    paymentStatus: 'To‘langan (Uzum Bank)',
    timeAgo: '2 soat oldin'
  },
  {
    id: 'ORD-5095',
    customerName: 'Bobur Yoqubov',
    customerPhone: '+998 94 404 11 00',
    listingTitle: 'Apex Outdoor Go-Kart Night Race',
    date: '2026-10-08',
    timeSlot: '22:00',
    guests: 2,
    amount: 300000,
    status: 'Declined',
    paymentStatus: 'Qaytarildi',
    timeAgo: '5 soat oldin'
  }
];

export const REVENUE_CHART_DATA = [
  { day: 'Dush', revenue: 3800000, bookings: 12 },
  { day: 'Sesh', revenue: 4200000, bookings: 14 },
  { day: 'Chor', revenue: 5100000, bookings: 18 },
  { day: 'Pay', revenue: 6400000, bookings: 22 },
  { day: 'Jum', revenue: 8900000, bookings: 31 },
  { day: 'Shan', revenue: 11400000, bookings: 42 },
  { day: 'Yak', revenue: 10200000, bookings: 38 },
];
