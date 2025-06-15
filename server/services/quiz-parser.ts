export class QuizParser {
  private static questions = [
    {
      question: "Innovatsiya nima?",
      options: [
        "Yangilik kiritish",
        "Eski usulni takrorlash", 
        "Faqat tadqiqot",
        "Pul tejash"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Innovatsion iqtisodiyotning asosiy xususiyati nima?",
      options: [
        "Bilim va texnologiyaga asoslangan rivojlanish",
        "Faqat sanoat rivojlanishi",
        "Qishloq xo'jaligi rivojlanishi",
        "Import ko'paytirish"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Raqamli iqtisodiyot nima?",
      options: [
        "Raqamli texnologiyalar asosida tashkil etilgan iqtisodiyot",
        "Faqat kompyuter ishlatish",
        "Internet foydalanish",
        "Mobil telefon sotish"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Startap nima?",
      options: [
        "Yangi g'oya asosida yaratilgan biznes loyiha",
        "Katta kompaniya",
        "Davlat korxonasi",
        "Xorijiy firma"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Innovatsion klaster nima?",
      options: [
        "Bir hududda joylashgan innovatsion korxonalar guruhi",
        "Bitta katta zavod",
        "Xorijiy kompaniya",
        "Davlat idorasi"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Texnopark nima?",
      options: [
        "Ilmiy-texnik faoliyat uchun maxsus hudud",
        "O'yin bog'i",
        "Sport majmuasi",
        "Savdo markazi"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Venture kapital nima?",
      options: [
        "Yuqori xavfli loyihalarga sarmoya",
        "Bank krediti",
        "Davlat subsidiyasi",
        "Xayriya yordam"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Intellektual mulk nima?",
      options: [
        "Aqliy faoliyat natijasi bo'lgan mulk",
        "Uy-joy mulki",
        "Transport vositalari",
        "Pul mablag'lari"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Patent nima?",
      options: [
        "Ixtiroga huquqiy himoya beruvchi hujjat",
        "Pasport",
        "Diplom",
        "Guvohnoma"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Biznes-inkubator nima?",
      options: [
        "Yangi bizneslarni qo'llab-quvvatlovchi tashkilot",
        "Bolalar bog'chasi",
        "Kasalxona",
        "Maktab"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "E-commerce nima?",
      options: [
        "Elektron tijorat",
        "Elektr energiyasi",
        "Elektron pochta",
        "Elektron o'yinlar"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Fintech nima?",
      options: [
        "Moliyaviy texnologiyalar",
        "Oziq-ovqat texnologiyasi",
        "Qurilish texnologiyasi",
        "Transport texnologiyasi"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Blockchain texnologiyasi nima?",
      options: [
        "Tarqatilgan ma'lumotlar bazasi texnologiyasi",
        "Qurilish texnologiyasi",
        "Oziq-ovqat texnologiyasi",
        "Transport texnologiyasi"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Sun'iy intellekt nima?",
      options: [
        "Kompyuter tizimlarining inson kabi fikrlash qobiliyati",
        "Tabiiy intellekt",
        "Hayvonlar intellekti",
        "O'simliklar intellekti"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Big Data nima?",
      options: [
        "Katta hajmdagi ma'lumotlar",
        "Kichik ma'lumotlar",
        "O'rtacha ma'lumotlar",
        "Hech qanday ma'lumot emas"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "IoT (Internet of Things) nima?",
      options: [
        "Narsalar interneti",
        "Odamlar interneti",
        "Hayvonlar interneti",
        "O'simliklar interneti"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Cloud computing nima?",
      options: [
        "Bulutli hisoblash",
        "Yerosti hisoblash",
        "Suv osti hisoblash",
        "Kosmik hisoblash"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Robotlashtirish nima?",
      options: [
        "Ishlab chiqarishda robotlardan foydalanish",
        "Robotlar yasash",
        "Robotlarni buzish",
        "Robotlar bilan o'ynash"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "3D printing nima?",
      options: [
        "Uch o'lchamli bosib chiqarish",
        "Ikki o'lchamli bosib chiqarish",
        "Bir o'lchamli bosib chiqarish",
        "Hech qanday bosib chiqarish emas"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Virtual reality nima?",
      options: [
        "Virtual haqiqat",
        "Haqiqiy haqiqat",
        "Yolg'on haqiqat",
        "Noma'lum haqiqat"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Augmented reality nima?",
      options: [
        "Kengaytirilgan haqiqat",
        "Qisqartirilgan haqiqat",
        "Oddiy haqiqat",
        "Murakkab haqiqat"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Nanotexnologiya nima?",
      options: [
        "Nano o'lchamdagi texnologiya",
        "Katta o'lchamdagi texnologiya",
        "O'rtacha o'lchamdagi texnologiya",
        "Hech qanday o'lcham yo'q"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Biotexnologiya nima?",
      options: [
        "Tirik organizmlardan foydalanuvchi texnologiya",
        "O'lik organizmlardan foydalanuvchi texnologiya",
        "Sun'iy organizmlardan foydalanuvchi texnologiya",
        "Hech qanday organizmdan foydalanmaydigan texnologiya"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Genetik muhandislik nima?",
      options: [
        "Genlarni o'zgartirish texnologiyasi",
        "Binolarni qurish",
        "Yo'llar qurish",
        "Ko'priklar qurish"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Kvant hisoblash nima?",
      options: [
        "Kvant mexanikasi asosidagi hisoblash",
        "Klassik hisoblash",
        "Oddiy hisoblash",
        "Murakkab hisoblash"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Kriptovalyuta nima?",
      options: [
        "Raqamli valyuta",
        "Qog'oz valyuta",
        "Metall valyuta",
        "Plastik valyuta"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Smart city nima?",
      options: [
        "Aqlli shahar",
        "Ahmoq shahar",
        "Oddiy shahar",
        "Qadimiy shahar"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Green technology nima?",
      options: [
        "Yashil texnologiya",
        "Qizil texnologiya",
        "Ko'k texnologiya",
        "Qora texnologiya"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Renewable energy nima?",
      options: [
        "Qayta tiklanadigan energiya",
        "Qayta tiklanmaydigan energiya",
        "Cheksiz energiya",
        "Chekli energiya"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Machine learning nima?",
      options: [
        "Mashinani o'rgatish",
        "Mashinani buzish",
        "Mashinani sotish",
        "Mashinani sotib olish"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Deep learning nima?",
      options: [
        "Chuqur o'rganish",
        "Sayoz o'rganish",
        "O'rtacha o'rganish",
        "Hech o'rganmaslik"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Neural network nima?",
      options: [
        "Neyron tarmoq",
        "Yo'l tarmoq",
        "Elektr tarmoq",
        "Suv tarmoq"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Cybersecurity nima?",
      options: [
        "Kiber xavfsizlik",
        "Jismoniy xavfsizlik",
        "Moliyaviy xavfsizlik",
        "Ijtimoiy xavfsizlik"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Data mining nima?",
      options: [
        "Ma'lumotlarni qazib olish",
        "Oltin qazib olish",
        "Ko'mir qazib olish",
        "Neft qazib olish"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "API nima?",
      options: [
        "Dasturlash interfeysi",
        "Foydalanuvchi interfeysi",
        "Grafik interfeys",
        "Audio interfeys"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Open source nima?",
      options: [
        "Ochiq manba",
        "Yopiq manba",
        "Yarim ochiq manba",
        "Noma'lum manba"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Agile methodology nima?",
      options: [
        "Chaqqon metodologiya",
        "Sekin metodologiya",
        "O'rtacha metodologiya",
        "Noma'lum metodologiya"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "DevOps nima?",
      options: [
        "Rivojlantirish va operatsiyalar",
        "Faqat rivojlantirish",
        "Faqat operatsiyalar",
        "Hech narsa emas"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Microservices nima?",
      options: [
        "Mikro xizmatlar",
        "Makro xizmatlar",
        "Katta xizmatlar",
        "O'rtacha xizmatlar"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Container technology nima?",
      options: [
        "Konteyner texnologiyasi",
        "Quti texnologiyasi",
        "Sumka texnologiyasi",
        "Xalta texnologiyasi"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Edge computing nima?",
      options: [
        "Chekka hisoblash",
        "Markaziy hisoblash",
        "Ichki hisoblash",
        "Tashqi hisoblash"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "5G texnologiyasi nima?",
      options: [
        "Beshinchi avlod mobil aloqa",
        "To'rtinchi avlod mobil aloqa",
        "Uchinchi avlod mobil aloqa",
        "Ikkinchi avlod mobil aloqa"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Digital twin nima?",
      options: [
        "Raqamli egizak",
        "Jismoniy egizak",
        "Virtual egizak",
        "Haqiqiy egizak"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Industry 4.0 nima?",
      options: [
        "To'rtinchi sanoat inqilobi",
        "Uchinchi sanoat inqilobi",
        "Ikkinchi sanoat inqilobi",
        "Birinchi sanoat inqilobi"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Smart manufacturing nima?",
      options: [
        "Aqlli ishlab chiqarish",
        "Oddiy ishlab chiqarish",
        "Qadimiy ishlab chiqarish",
        "Murakkab ishlab chiqarish"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Predictive analytics nima?",
      options: [
        "Bashoratli tahlil",
        "Tarixiy tahlil",
        "Hozirgi tahlil",
        "Kelajak tahlili"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Business intelligence nima?",
      options: [
        "Biznes intellekti",
        "Shaxsiy intellekt",
        "Sun'iy intellekt",
        "Tabiiy intellekt"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Data visualization nima?",
      options: [
        "Ma'lumotlarni vizuallashtirish",
        "Ma'lumotlarni yashirish",
        "Ma'lumotlarni o'chirish",
        "Ma'lumotlarni saqlash"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Digital transformation nima?",
      options: [
        "Raqamli transformatsiya",
        "Jismoniy transformatsiya",
        "Kimyoviy transformatsiya",
        "Biologik transformatsiya"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    },
    {
      question: "Automation nima?",
      options: [
        "Avtomatlashtirish",
        "Qo'lda boshqarish",
        "Yarim avtomatik boshqarish",
        "Mexanik boshqarish"
      ],
      correctAnswer: 0,
      category: "innovatsion_iqtisodiyot"
    }
  ];

  static getAllQuestions() {
    return this.questions;
  }

  static getQuestionsByCategory(category: string) {
    return this.questions.filter(q => q.category === category);
  }

  static getRandomQuestions(count: number) {
    const shuffled = [...this.questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, this.questions.length));
  }
}