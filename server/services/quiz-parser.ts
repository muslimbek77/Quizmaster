import fs from 'fs';
import path from 'path';
import { Question } from '@shared/schema';

// Hardcoded questions extracted from the DOCX file
const QUIZ_QUESTIONS: Omit<Question, 'id'>[] = [
  {
    question: '"Innovatsion iqtisodiyot" fani nimani o\'rgatadi?',
    options: [
      'Korxona va tashkilotlarda yangiliklarni joriy qilish orqali rivojlantirish yo\'llarini',
      'Korxona resurslaridan tejamli foydalanish yo\'llarini',
      'Xodimlarni samarali boshqarish yo\'llarini',
      'Tashqi bozorlarga chiqish yo\'llarini'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion iqtisodiyot fanini o\'rganish usullari',
    options: [
      'Kuzatish, guruhlash, balansli, analiz, sintez',
      'Kuzatish, taqqoslash, tahlil qilish',
      'Ma\'lumotlar to\'plash, tahlil, qaror qabul qilish',
      'Analiz-sintez, iqtisodiy, ijtimoiy-ruhiy'
    ],
    correctAnswer: 3,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Xozirgi sharoitda innovatsion iqtisodiyotni o\'rganish zarurati',
    options: [
      'Bu iqtisodiyotni raqobatbardoshligini oshirishning muhim omili',
      'Bu o\'tish davrining talablaridan biri',
      'Bu boshqaruvchilarning yetishmasligi',
      'Butun dunyoda innovatsion faoliyatni rivojlanishi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Quyidagilardan qaysi tushunchalar innovatsion iqtisodiyotda ko\'proq qo\'llaniladi?',
    options: [
      'Innovatsion loyihalar, patentlar, ishlanmalar',
      'Xujjatlar to\'plami, ma\'lumotlar bazasi',
      'Biznes – rejalar, rejali ko\'rsatkichlar',
      'Ko\'rgazmalar, tasvirlar (slaydlar)'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion menejmentning asosiy yo\'nalishlari',
    options: [
      'Yangiliklarni innovatsion loyihalar orqali ishlab chiqarishga jalb etish',
      'Iqtisodiyotda sodir bo\'ladigan har bir o\'zgarishga ahamiyat bilan qarash',
      'Yuqori organlar maslahatini kutmasdan o\'zi qo\'ygan maqsadlarga erishish',
      'Qarorlarni qabul qilish va ijrochilarga yetkazish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion menejmentning ustuvor maqsadlari',
    options: [
      'Innovatsion faoliyatni faollashtirish asosida tashkilotni rivojlanishi',
      'Qarorning belgilangan muddatda bajarilishini ta\'minlash',
      'Qarorning bir necha variantlarini ishlab chiqish',
      'Yangi sanoat namunalari xarid qilish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: '"Innovatsiya" - bu',
    options: [
      'Potensial ilmiy – texnik taraqqiyot (ITT)ni yangi mahsulot, xizmatlar va texnologiyalarda ro\'yobga chiqarish',
      'Foyda olishni ko\'zlab mablag\' sarflash',
      'Yangi texnikalarni ishlab chiqarishga joriy qilish',
      'Mahsulotning yangi savdo belgisi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsiyalarning o\'ziga xos mazmunini nima tashkil qiladi?',
    options: [
      'O\'zgarishlar',
      'Yangi texnika',
      'Ilg\'or texnologiya',
      'Yangi texnologiya'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Kashfiyot – bu',
    options: [
      'Oldin noma\'lum bo\'lgan ma\'lumotlarni olish yoki oldin noma\'lum bo\'lgan tabiiy hodisalarni aniqlash jarayoni',
      'Tabiiy jarayonlarda yangilik topish',
      'Texnologik jarayonlarda yangilik topish',
      'Yangi mehnat va boshqaruv usullarini yaratish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yolg\'on innovatsiya deyilganda nima tushuniladi?',
    options: [
      'Mahsulotdagi kichik o\'zgarishlar',
      'Moliyalashtirilmagan innovatsiya',
      'Patentlashtirilmagan innovatsiya',
      'Birovning yangiligini o\'zlashtirish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsiyalarni tijoratlashuv jarayoni nimani anglatadi?',
    options: [
      'Yangilikni bozorga kiritish jarayoni',
      'Yangi mahsulotni bozorda sotish jarayoni',
      'Yangilikka patent olish jarayoni',
      'Yangi mahsulotni ishlab chiqarishga joriy etish jarayoni'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Y.Shumpeter ta\'rifiga ko\'ra innovatsiyalarning guruhlanishi:',
    options: [
      'Yangi mahsulot va xizmatlar, mahsulotlarning yangi xususiyatlari, yangi xom-ashyolardan foydalanish, ishlab chiqarish, boshqarishning yangi usullari, yangi bozor va sotish yo\'llari',
      'Kashfiyot, ixtiro, patent, foydali model, sanoat namunasi',
      'Yangilik, ixtiro, ilmiy-tadqiqot ishlari',
      'Yangi mahsulot, yangi texnika, yangi texnologiya'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Fan-texnika taraqqiyotining asosiy yo\'nalishlari',
    options: [
      'Mehnat qurollarini takomillashtirish, mehnat ashyolarini takomillashtirish, mehnatni tashkil etishni takomillashtirish',
      'Elektrlashtirish, gazlashtirish',
      'G\'oya, patent',
      'Mahsulotlarni takomillashtirish, yangi mahsulot ishlab chiqarish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Biznesning reinjiniringi –',
    options: [
      'Innovatsiyani ishlab chiqarish va sotish asosida tadbirkorlik faoliyatini qayta qurish bo\'yicha muhandislik- maslahat xizmatlari',
      'Ishlab chiqarishga yangi texnologiyalarni joriy qilish',
      'Biznes yuritishni erkinlashtirish',
      'Muhandislik ishlari bo\'yicha maslahat berish xizmati'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsiyalarning produtsenti-',
    options: [
      'Bu ushbu innovatsiyani ishlab chiqaruvchisi',
      'Savdo belgisi egasi',
      'Innovatsiyalarni joriy qiluvchi',
      'Innovatsiyalarning iste\'molchisi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsiyaning hayotiy tsikli-',
    options: [
      'Yangilikning tug\'ilishi, tarqalishi jarayoni',
      'Yangilikka mablag\' sarflashdan uni ishlab chiqarishgacha bo\'lgan vaqt',
      'Yangilikni patent olishgacha bo\'lgan vaqt',
      'Yangi mahsulotni ishlab chiqarishga joriy qilish jarayoni'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion faoliyatning tarkibiy qismlari',
    options: [
      'Yangiliklar bozori, kapital bozori, sof raqobat bozori',
      'Innovatsiyalar, patent',
      'Innovatorlar, yangiliklar',
      'Investitsiyalar, tadbirkorlar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion faoliyatni tartibga solish qaysi darajada amalga oshiriladi?',
    options: [
      'Davlat darajasida, mintaqaviy darajada, alohida korxona, tashkilot, muassasa darajasida',
      'Yuqori, o\'rta, quyi darajada',
      'Xalqaro, ichki, korxona darajasida',
      'Texnik, iqtisodiy, ijtimoiy'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion faoliyatni davlat qanday yo\'l bilan tartibga soladi?',
    options: [
      'Huquqiy, iqtisodiy, tashkiliy',
      'Vazirliklar, idoralar orqali',
      'Investitsion, moliyaviy',
      'Xalqaro tashkilotlar, biznes tuzilmalari orqali'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Xorijiy korporatsiyalarda innovatsion faoliyatga ajratilgan xarajatlar nima deb nomlanadi?',
    options: [
      'Tajriba-konstruktorlik va fan-texnika xarajatlari',
      'Texnik xarajatlar',
      'Reklama xarajatlari',
      'To\'g\'ri xarajatlar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: '"Franchayzing" deyilganda nimani tushunasiz?',
    options: [
      'Savdo belgisi, texnologiyadan foydalanish huquqini berish mexanizmi',
      'Kichik, o\'rta biznes bilan bog\'liq tushuncha',
      'Mehnatkashlarning bandligini ta\'minlashni boshqarish',
      'Ishlab chiqarishni, sotsial rivojlanishni boshqarish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion loyihani yaratish va amalga oshirish qanday bosqichlardan iborat?',
    options: [
      'Innovatsion g\'oyani shakllantirish; Imkoniyatlar izlash; Texnik-iqtisodiy asoslash; Tajriba-sinov ishlari; Ishlab chiqarishga joriy qilish; Texnik-iqtisodiy ko\'rsatkichlar monitoringi',
      'G\'oyani shakllantirish; Tajriba-konstruktorlik ishlari; Sinov ishlari; Yangi mahsulotni ishlab chiqish; Mahsulotni sotish',
      'Huquqiy bazani yaratish; Tashkiliy sharoitlarni yaratish; Iqtisodiy sharoitlar yaratish; Monitoring',
      'Bozorni o\'rganish; Tadqiqotlar asosida loyihani shakllantirish; Investitsiyalash; Yangi mahsulotni ishlab chiqarish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: '"Innovatsion loyiha" tushunchasi',
    options: [
      'Innovatsion faoliyatni maqsadli boshqarish shakli; innovatsiyalarni amalga oshirish jarayoni; hujjatlar majmuasi',
      'Yangi mahsulotning ishchi chizmalari; Texnik-iqtisodiy asosnoma',
      'Yangi mahsulot ishlab chiqarish uchun barcha hujjatlar majmui; G\'oyani amalga oshirish jarayoni',
      'Mahsulotni raqobatbardoshligini oshirish tadbirlari; Yangi mahsulotni ishlab chiqarishga joriy qilish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Investitsiyalarni moliyalashtirish manbalari',
    options: [
      'Ichki va tashqi manbalarning yig\'indisi',
      'Respublikaning iqtisodiy manbalari',
      'Chet el investitsiyalari',
      'Aksiyadorlik kapitali'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion loyihalarni tuzish nimadan boshlanadi?',
    options: [
      'Ilmiy izlanishlardan iborat',
      'Tajriba-konstruktorlik faoliyatidan',
      'Texnologik ishlanmalardan',
      'Innovatsion loyihalarni ishlab chiqish va tasdiqlashdan'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Rivojlanish markazlari nima?',
    options: [
      'Innovatsion boshqaruvning yangi formasi',
      'Ilmiy tadqiqotlar markazi',
      'Ilmiy yangiliklar yaratish markazi',
      'Erkin iqtisodiy zonalar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'ITTKI qisqartmasi nimani ifodalaydi?',
    options: [
      'Ilmiy-tadqiqot va tajriba-konstruktorlik ishlari',
      'Ishlab chiqarishni takomillashtirishni boshqarish',
      'Ishlanmalarni texnik taraqqiyotini kengaytirish instruksiyasi',
      'Ixtiro, tajriba va tadqiqotlarni korxonadagi ishlanmalari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ilmiy g\'oyalarni ishlab chiqish va uni keyinchalik materiallashtirishga yordam beruvchi yangi tashkiliy tuzilmalar-',
    options: [
      'Innovatsion markazlar',
      'Ijtimoiy guruhlar',
      'Ijtimoiy-siyosiy akademiyalar',
      'Iqtisodiy sindikatlar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion jarayon ishtirokchilari:',
    options: [
      'Novatorlar, investorlar, davlat, banklar, korxonalar, iste\'molchilar',
      'Investorlar, buyurtmachilar, konstruktorlar',
      'Xorijiy investorlar, davlat',
      'Korxonalar, tashkilotlar, davlat'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion korxonalar o\'z innovatsiyalarining ustuvor turiga qarab qaysi sinflarga bo\'linadi?',
    options: [
      'Pioner, retsipient, qoloq',
      'Investorlar, buyurtmachilar',
      'Novator, innovator',
      'Ishlab chiqarish, fan'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Modernizatsiya tushunchasi qaysi javobda to\'g\'ri keltirilgan?',
    options: [
      'Yangi texnik, ijtimoiy-iqtisodiy tizimni tashkil etish va o\'zgarishga qaratilgan maqsadli jarayon',
      'Mashina, qurilma quvvatini mehnat unumdorligini oshirish evaziga yangi texnik-iqtisodiy tavsifga ega bo\'lish',
      'Yangi konstruksiyasi o\'z elementlari bo\'yicha avvalgilardan farq qilishi',
      'Ilgari mavjud bo\'lmagan material konstruksiyani yuzaga kelishi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion boshqaruv deganda nimani tushunasiz?',
    options: [
      'Yangiliklarni yaratish jarayoniga ta\'sir o\'tkazish tizimi',
      'Har bir ishchi mehnatining bir vaqtda nazorat qilish',
      'Odamlarga ish buyurish',
      'Odamlarga chora ko\'rish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion tashkilot o\'z ichiga qaysi asosiy jihatlarni oladi?',
    options: [
      'Tashkilotning innovatsion faoliyatdagi kerakli vazifalarni bajarishga qaratilgan harakatlari majmuasi',
      'Moliyaviy qo\'yilmalarni topish',
      'Chet el texnologiyalar orqali ishlab chiqarishni zamonaviylashtirishga qaratilgan',
      'Boshqarish usullarini doimiy ravishda rivojlantirish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korxonaning tashqi muhitga moslashishida qanday vazifalar qo\'yiladi?',
    options: [
      'Tashqi omillar (iqtisodiy o\'zgarishlar, siyosiy omillar, demografik vaziyatlar)ni o\'zgarishiga samarali moslashish',
      'Menejmentga xos bo\'lgan omillarga samarali moslashish',
      'Innovatsion menejmentning tashkil etishning asosiy talabiga samarali moslashish',
      'Menejment funksiyasiga to\'g\'ri moslashish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Firmaning bozordagi yangilik kiritishlar strategiyasi qanday xarakterga ega?',
    options: [
      'Hujumkor va himoyaviy, litsenzion va oralik',
      'Tajriba-konstruktorlik faoliyati va amaliy',
      'Ilmiy izlanish va raqobat',
      'Innovatsion loyihalarni tashkil etishning samaradorligini aniqlash'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion menejmentdagi rejalashtirish jarayoni vazifasi',
    options: [
      'Yangiliklarni yaratish imkoniyatlarini qidirib topish',
      'Ijrochilarni to\'g\'ri tayinlash',
      'Moddiy va ma\'naviy rag\'batlantirishni (sistemasini) yo\'lga qo\'yish',
      'Ijro etishda tashabbuskorlikni rivojlantirish, qaror qabul qilish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion jarayonning asosiy bosqichlari',
    options: [
      'Fundamental tadqiqotlar, amaliy tadqiqotlar, tajriba-konstruktorlik ishlari, tajriba namunasini yaratish, sanoat namunasini yaratish, i/ch, marketing, sotish',
      'Loyiha variantlarini shakllantirish, tanlov, moliyalashtirish',
      'G\'oya, namuna, ishlab chiqarish, sotish',
      'Ishlab chiqarish, sotish, sotuvdan keyingi xizmat'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion faoliyatni boshqarish tuzilmalari',
    options: [
      'Fanlar akademiyalari, ilmiy-tadqiqot institutlari, konstruktorlik byurolari',
      'Innovatsion guruhlar birlashmasi',
      'Olim va mutaxassislarning yirik tashkiloti, trestlar',
      'Qaror qabul qilishga bog\'liq'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion muhit nima?',
    options: [
      'Innovatsiyalarni yaratilishi, amalga oshirilishi, tarqatilishini o\'rab turuvchi holat',
      'Tubdan yangi mahsulotlar texnologiyalarni o\'zlashtirish va tarqatish',
      'Infratuzilma tarkibi, innovatsion texnologik markazlar, texnologik inkubatorlar',
      'Takomillashtirilgan texnologik jarayonga qaratilgan jarayon'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korxona innovatsion faoliyatining o\'rni va yo\'nalishini belgilab beruvchi omil',
    options: [
      'Korxona strategiyasi',
      'Monopolistik kapitalizm davri',
      'Bozor iqtisodiyoti sharoiti',
      'Ishbilarmon boshqaruvchilar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Tashkilotga tadbiq etish kerak bo\'lgan yangiliklar ro\'yxati -',
    options: [
      'Innovatsiyalar portfeli',
      'Instruksiya-ko\'rsatmaning talabi',
      'Iste\'molchining tashabbusi',
      'Rejalashtirish metodi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion faoliyatni boshqarishning asosiy usullari:',
    options: [
      'Iqtisodiy, ma\'muriy, boshqaruv va ijtimoiy-psixologik usullar',
      'Texnik va iqtisodiy usullar',
      'Moliyaviy va investitsion usullar',
      'Tashkiliy va huquqiy usullar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion loyihaning muvaffaqiyatli amalga oshirilishini ta\'minlovchi asosiy omillar:',
    options: [
      'Moliyaviy ta\'minot, texnik imkoniyatlar, bozor talabi, kadrlar salohiyati',
      'Faqat moliyaviy imkoniyatlar',
      'Faqat texnik jihozlar',
      'Faqat bozor konъunkturasi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Raqamli iqtisodiyotda innovatsiyalarning o\'rni:',
    options: [
      'Texnologik taraqqiyotning asosiy harakatlantiruvchi kuchi',
      'Ikkinchi darajali omil',
      'Faqat katta korxonalar uchun muhim',
      'Faqat davlat sektorida muhim'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Startup kompaniyalarining innovatsion faoliyatdagi o\'ziga xos xususiyatlari:',
    options: [
      'Yuqori riskli, tez o\'zgaruvchan, moslashuvchan tuzilma',
      'Past riskli, barqaror faoliyat',
      'Faqat an\'anaviy usullar qo\'llash',
      'Katta hajmdagi investitsiyalar talab qilish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ochiq innovatsiya modeli nimani anglatadi?',
    options: [
      'Tashqi hamkorlar bilan birgalikda innovatsiya yaratish',
      'Faqat ichki kuchlar bilan ishlash',
      'Barcha ma\'lumotlarni ochiq qilish',
      'Raqobatchilar bilan hamkorlik qilmaslik'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion ekotizim tushunchasi:',
    options: [
      'O\'zaro bog\'liq innovatsion sub\'ektlarning yagona tizimi',
      'Faqat universitetlar majmuasi',
      'Faqat biznes inkubatorlar',
      'Faqat ilmiy-tadqiqot institutlari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion loyihalarni baholashda qo\'llaniladigan asosiy ko\'rsatkichlar:',
    options: [
      'NPV, IRR, PP, ROI',
      'Faqat daromad hajmi',
      'Faqat xarajatlar miqdori',
      'Faqat muddat'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Texnologik transfert jarayoni qanday amalga oshiriladi?',
    options: [
      'Litsenziyalash, franchayzing, qo\'shma korxonalar, to\'g\'ridan-to\'g\'ri investitsiyalar',
      'Faqat patent sotish orqali',
      'Faqat xodimlar almashinuvi orqali',
      'Faqat texnik hujjatlar uzatish orqali'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  }
];

export class QuizParser {
  static getAllQuestions(): Omit<Question, 'id'>[] {
    return QUIZ_QUESTIONS;
  }

  static getRandomQuestions(count: number = 50): Omit<Question, 'id'>[] {
    const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  static getTotalQuestionsCount(): number {
    return QUIZ_QUESTIONS.length;
  }
}
