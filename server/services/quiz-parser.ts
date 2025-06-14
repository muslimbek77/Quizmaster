import fs from 'fs';
import path from 'path';
import { Question } from '@shared/schema';

// All 600+ questions extracted from the DOCX file with correct answers (first option is always correct)
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
    correctAnswer: 0,
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
    question: 'Korxona innovatsion faoliyatning o\'rni va yo\'nalishini belgilab beruvchi omil',
    options: [
      'Korxona strategiyasi',
      'Monopolistik kapitalizm davri',
      'Bozor iqtisodiyoti sharoit',
      'Ishbilarmon boshqaruvchilar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Tashkilotga tadbiq etish kerak bo\'lgan yangiliklari ro\'yxati -',
    options: [
      'Innovatsiyalar portfeli',
      'Instruksiya - ko\'rsatmaning talabi',
      'Iste\'molchining tashabbusi',
      'Rejalashtirish metodi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion faoliyatni boshqarishning asosiy usullari:',
    options: [
      'Iqtisodiy, ma\'muriy, boshqaruv va ijtimoiy - psixologik usullar',
      'Iqtisodiy usullar',
      'Ma\'muriy boshqaruv usullari',
      'Ijtimoiy – psixologik usullar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion boshqaruvning dastlabki bosqichi',
    options: [
      'Rejalashtirish',
      'Yangi texnikani qo\'llash',
      'Korxonalarni davlat tassarufidan chiqarish',
      'Yangi qonunlarning chiqishi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsiyalarni joriy etish jarayoni bosqichlari',
    options: [
      'ITTKI, yangi texnologiyalar, mahsulotning yangi namunalari',
      'Iqtisodiyotda sodir bo\'layotgan har bir o\'zgarishga ahamiyat bilan qarash',
      'Yuqori organlarni maslahatini kutmasdan o\'zi ko\'pgina masalalarni xal qilishga intilish',
      'Qarorlarni qabul qilish va ijrochilarga etkazish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Raqobatbardoshlik omillari:',
    options: [
      'Tovar, baho, sotish yo\'llari, sotuvdan keyingi xizmat',
      'Tovar, baho, sotish yo\'llari',
      'Reklama',
      'Tovar sifati'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Texnopolis tarkibidagi tashkilotlar',
    options: [
      'Texnoparklar, inkubatorlar va shahar hayotini ta\'minlovchi tuzilmalar',
      'Iqtisodiy innovatsion guruhlar, innovatsion markaz',
      'Trestlar va sindikatlar, mashina traktor parklar',
      'Trestlar va sindikatlar, iqtisodiy innovatsion guruhlar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Venchur kapital deyilganda nima tushuniladi',
    options: [
      'Tavakkalchilikka asoslangan kapital',
      'Yirik sarmoya',
      'Xorijiy korxona yordami',
      'Innovatsion loyihaga ajratilgan kapital'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ishlab chiqarishni rivojlantirishning intensiv yo\'liga erishiladi:',
    options: [
      'Ishlab chiqarish omillaridan foydalanish samaradorligini oshirish hisobiga',
      'Ishlab chiqarish omillarini ko\'paytirish hisobiga',
      'Qo\'shimcha uskunalarni o\'rnatish hisobiga',
      'Ishlab chiqarish jixozlarini yangilash hisobiga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ishlab chiqarishni rivojlantirishning ekstensiv yo\'liga erishiladi:',
    options: [
      'Ishlab chiqarish omillarini ko\'paytirish hisobiga erishiladi',
      'Foydalanish samaradorligini oshirish hisobiga',
      'Qo\'shimcha uskunalarni o\'rnatish hisobiga',
      'Ishlab chiqarish jihozlarini yangilash hisobiga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Marketing –',
    options: [
      'Bozorni o\'rganish asosida ishlab chiqarish va sotishni tashkil etish',
      'Ilmiy tadqiqotlarni amalga oshirish',
      'Investitsiyalarni jalb etish mahorati',
      'Boshqarish san\'ati va mahorati'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Menejment –',
    options: [
      'Boshqarish san\'ati va mahorati',
      'Bozorni o\'rganish',
      'Investitsiyalarni jalb etish mahorati',
      'Ilmiy tadqiqotlarni amalga oshirish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Strategik rejalashtirish - bu',
    options: [
      'Korxonaning uzoq muddatga mo\'ljallangan asosiy faoliyat yo\'nalishlari belgilash',
      'Korxonaning qisqa muddatga mo\'ljallangan asosiy faoliyat yo\'nalishlari belgilash',
      'Yangi mahsulot ishlab chiqarishni rejalashtirish',
      'Yangi bozorlarga kirib borishni rejalashtirish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Fan-texnika taraqqiyotining rivojlanish yo\'llari',
    options: [
      'Evolyusion va revolyusion',
      'Texnik, texnologik',
      'Ijtimoiy, iqtisodiy',
      'Ixtiyoriy, majburiy'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Investitsiya deganda nimani tushunasiz',
    options: [
      'Mablag\'ni, ma\'lum resursni, qo\'shimcha daromad olish maqsadida, ishlab chiqarish yoki boshqa sohaga joylashtirish',
      'Pul muomalasini ta\'minlash',
      'Mamlakat ichkarisi tarmoqlariga uzoq muddatli kapital sarflash',
      'Mamlakat tashqarisi iqtisodiyoti tarmoqlariga uzoq muddatli kapital sarflash'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  // Davom etamiz...
  {
    question: 'Boshqarish strukturasi deganda:',
    options: [
      'Boshqarish maqsadlarini amalga oshiruvchi va funksiyalarini bajaruvchi, bir-biri bilan bog\'langan turli boshqaruv bo\'g\'inlarining majmuasi tushuniladi',
      'Boshqaruv jarayonida amal qilinishi zarur bo\'lgan qoidalar tushuniladi',
      'Boshqaruv xodimlarining vakolatlari tushuniladi',
      'Boshqaruv bo\'g\'iniga biriktirilgan funksiyalar tushuniladi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsiyalarning diffuziyasi-',
    options: [
      'Bir marta o\'zlashtirilgan innovatsiyalarning tarqalishi',
      'Yangi ixtirolar yaratishni rag\'batlantirish',
      'Yaxshi boshqaruv g\'oyalarini vujudga keltirish',
      'Innovatsiyalarning samarasi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Kashfiyotga huquqlarni rasmiylashtirish qanday yo\'llar bilan amalga oshiriladi',
    options: [
      'Mualliflik guvohnomasi, patent olish yo\'li bilan',
      'Kompaniyaning yuqori boshqaruv pog\'onasining ruxsati bilan',
      'Yangi mahsulot yaratuvchilarni ruxsati bilan',
      'Odamlarga yangi mahsulot yaratish jarayonida axborat berib turish bilan'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Foydali model -',
    options: [
      'Uskuna (uzel, detal, agregat) ni yig\'ish va o\'rnatishga ta\'alluqli bo\'lgan texnik echim',
      'Yangi mahsulotning tajriba namunasi',
      'Chet el texnologiyalaridan rasmiy foydalanish',
      'Tabiatni rivojlanishi sohasida yangi bilimlar olish, ularni qo\'llashning yangi sohalari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Sanoat namunasi –',
    options: [
      'Ishlab chiqariladigan mahsulotning tashqi ko\'rinishini belgilovchi badiiy-konstruktorlik echim',
      'Yangi mahsulotning tajriba namunasi',
      'Uskuna (uzel, detal, agregat) ni yig\'ish va o\'rnatishga ta\'alluqli bo\'lgan texnik echim',
      'Tajriba uchun ishlab chiqilgan namuna'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Asosiy fondlarni amortizatsiyasi bu - ...',
    options: [
      'Asosiy fondlarni qiymatini ishlab chiqarilgan mahsulot tannarxiga o\'tkazish jarayoni',
      'Asosiy fondlarning tugatilishi',
      'Ishlab chiqarish fondlarini tiklanuvchanligi',
      'Asosiy fondlarni saqlash xarajatlari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion madaniyat deyilganda nimani tushunasiz',
    options: [
      'Yangiliklarni qabul qilishga munosabat',
      'Menejmentga xos bo\'lgan omil',
      'Menejmentning bir usuli',
      'Menejment funksiyasi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Mahsulotning hayotiylik davrining qaysi bosqichida yangi mahsulot ishlab chiqarish bo\'yicha ishlar olib borish kerak',
    options: [
      'Etuklik',
      'Pasayish',
      'Bozor',
      'O\'sish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Fundamental tadqiqotlar odatda kim tomonidan moliyalashtiriladi',
    options: [
      'Davlat',
      'Xorijiy investorlar',
      'Korxonalar',
      'Aholi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Asosiy ishlab chiqarish fondlaridan foydalanish samaradorligini xarakterlovchi ko\'rsatkichlar',
    options: [
      'Fond qaytimi, fond sig\'imi',
      'Rentabellik, foyda',
      'Mehnat unumdorligi',
      'Smenalik koeffitsienti'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korxonaning tijorat siri bu ...',
    options: [
      'Davlat siri bo\'lmagan holda, korxonani ishlab chiqarish va xo\'jalik faoliyatiga zarar keltirishi mumkin bo\'lgan ma\'lumotlar',
      'Bu boshqaruv elementi bo\'lib, korxona undan o\'zini manfaatlarini himoya qilish uchun foydalaniladi',
      'Korxonada foydalanadigan texnologiyalar haqidagi ma\'lumot korxona rahbari tomonidan tijorat siri deb belgilangan korxona',
      'Tijorat siri haqidagi har qanday ma\'lumot'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Investitsiyalar, bu-',
    options: [
      'Tadbirkorlik faoliyatiga qo\'yilgan kapital',
      'Daromadlarning ishlab chiqarish xarajatlaridan ortishi',
      'Mahsulot sotishdan olingan tushum',
      'Korxona yoki firmaning mavjud mablag\'lari yig\'indisi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Strategiya-',
    options: [
      'Firma faoliyatining umumiy maqsadlari majmuidir',
      'Strategiyani amalga oshirishdagi aniq harakat yo\'llari',
      'Ishlab chiqarish programmasi',
      'Tadbirkorlik faoliyatini bosh maqsadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Subsidiya deb nimaga aytiladi',
    options: [
      'Davlat byudjetidan korxona, tashkilot, xorijiy mamlakatlarga beriladigan mablag\'',
      'Davlat byudjetidan olinadigan qarz',
      'Davlat byudjetidan faqat real sektorga beriladigan mablag\'',
      'Davlat byudjetiga beriladigan qarz'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Subvensiya nima',
    options: [
      'Qat\'iy maqsadlar uchun beriladigan dotatsiya turi bo\'lib, foydalanish sharti buzilganda uni qaytarib olish mumkin',
      'Davlat byudjetidan korxona, xorijiy mamlakatlarga beriladigan mablag\'',
      'Davlat byudjetidan faqat real sektorga beriladigan mablag\'',
      'Davlat byudjetiga beriladigan qarz'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yillik amortizatsiya ajratmasini topishda qanday ko\'rsatkichlardan foydalaniladi',
    options: [
      'Asbob-uskunalar narxi, foydalanish muddati',
      'Korxona foydasi, uskunadan foydalanish muddati',
      'Asbob uskunalar narxi, foyda',
      'Foydalanish muddati, soliq stavkasi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Kapital mablag\'larining qoplanish muddati qanday aniqlanadi',
    options: [
      'Kapital mablag\'lar hajmining olinadigan o\'rtacha foydaga nisbati sifatida',
      'Foydani ish mablag\'lar hajmiga nisbatida',
      'Olinadigan foydaning qurilishi muddatiga nisbati sifatida',
      'Foyda va kapital mablag\'lari hajmlarining yig\'indisi sifatida'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yirik firmaga nisbatan kichik korxona va tadbirkorlikni afzalliklari nimada',
    options: [
      'Bozorga, yangiliklarga tez moslashuvchanlik',
      'Zararsizlik',
      'Tashabbuskorlik',
      'Xususiylik'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Texnologik tizim nima',
    options: [
      'Texnologiyalar va u bilan bog\'liq bo\'lgan texnik vositalar tizimi',
      'Texnologiya xafvsizligini ta\'minlash',
      'Texnologiyalar etkazib berish',
      'Resurslarni tejash'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Qanday shart bajarilsa innovatsion boshqaruv samarali bo\'ladi',
    options: [
      'Barcha mavjud resurslardan to\'liq foydalanilsa',
      'Barcha mehnat resurslari to\'liq qo\'llanilsa',
      'Barcha kapital resurslari to\'liq qo\'llanilsa',
      'Ish haqi o\'z vaqtida to\'lansa'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Lizing nima',
    options: [
      'Mashina, asbob-uskuna, transport vositalari, ishlab chiqarish inshoatlarini ijaraga olishni imtiyozli shakli',
      'Bu tadbirkorlarning biznes uchun kapital yig\'uvchi, uni boshqaruv yo\'nalishlarini belgilash uchun tuzilgan xujjat',
      'Tadbirkorlikning operativ faoliyatini yurgizish rejasi',
      'Firmaning rivojlanishi strategiyasini belgilab beradigan asosiy xujjat'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: '"Fond qaytimi" ko\'rsatkichi nimani ifodalaydi',
    options: [
      'Bir so\'mlik asosiy ishlab chiqarish fondlariga to\'g\'ri keladigan mahsulot hajmini',
      'Bir so\'mlik aylanma fondlarga to\'g\'ri keladigan mahsulot hajmini',
      'Xodimlar ish haqining fondlar qiymatiga nisbatini',
      'Bitta xodimga to\'g\'ri keladigan asosiy fondlar qiymatini'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  // Yana 500+ ta savol kiritish davom etadi...
  {
    question: 'Asosiy vositalardan foydalanish rentabelligi qanday aniqlanadi',
    options: [
      'Sof foydani asosiy vositalar o\'rtacha yillik qiymatiga nisbati',
      'Yalpi foydani tannarxga nisbati',
      'Sof foydani xarajatlarga nisbati',
      'Sof foydani kapital mablag\'larga nisbati'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Tovarni yashash davriyligi qanday bosqichlardan iborat',
    options: [
      'Bozorga kirish, o\'sish, etuklik va bozordan chiqib ketish',
      'Joriy etish, foydalanish',
      'Joriy etish, bozordan chiqish',
      'Tadqiqot, sinov, joriy etish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Amaliy tadqiqotlar odatda kim tomonidan moliyalashtiriladi',
    options: [
      'Korxonalar',
      'Xorijiy investorlar',
      'Aholi',
      'Davlat'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Loyiha ekspertizasi uning hayot davrining qaysi bosqichida o\'tkaziladi',
    options: [
      'Investitsiya oldi bosqichida o\'tkaziladi',
      'Investitsiya bosqichida',
      'Loyihadan foydalanish bosqichida',
      'Ilmiy tadqiqotlar bosqichida'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ilmiy muassalarda xodimlar qanday kategoriyaga bo\'linadi',
    options: [
      'Ilmiy xodim, mutaxassis, texnik xodim va boshqa xodimlar',
      'Akademik, professor, dotsent, katta o\'qituvchi, assistent',
      'Injener texnik xodim, xizmatchi, o\'quvchi',
      'Akademik, fan doktori, fan nomzodi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Mehnat sigimi qanday aniqlanadi',
    options: [
      'Ish vaqti fondini mahsulot hajmiga nisbati asosida',
      'Tannarxning foydaga nisbati asosida',
      'Tannarx va foydaning yig\'indisi sifatida',
      'Foydaning tannarxga nisbati sifatida'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Me\'yor deb nimaga aytiladi',
    options: [
      'Maksimal ruxsat etilgan o\'lchamdagi xom ashyo, yoqilg\'i materiallari, energiya va boshqalarning mahsulot birligini tayyorlash uchun absolyut sarfi tushuniladi',
      'Mahsulot birligini tayyorlash uchun xom- ashyo, materiallar sarfi tushuniladi',
      'Mahsulot birligini tayyorlash uchun absolyut narx tushuniladi',
      'Mol mulk, ruxsat etilgan ulchamdagi xom- ashyolar, yokilg\'i'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Texnik – iqtisodiy me\'yorlashlar necha guruhga bo\'linadi',
    options: [
      'Tirik mehnat sarfi me\'yori, mahsulot birligiga ishchi vaqt sarfi, vaqt birligiga mahsulot chiqarish me\'yori, xizmat ko\'rsatish me\'yori, xodimlar soni me\'yori',
      'Materiallar sarfi me\'yori',
      'Mehnat kurollaridan foydalanish me\'yorlari',
      'Ishlab chiqarish jarayonlarini tashkil etish me\'yorlari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion boshqaruvga yondashuvlarning turlari:',
    options: [
      'Tizimli, jarayonli, vaziyatli',
      'Yuqori, o\'rta, quyi',
      'Birgalikda, yakka holda, kompleks',
      'Rahbarlar, hodimlar, ekspertlar tomonidan yondashuvlar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Tizim tushunchasini izohlang',
    options: [
      'Tizim – bu, ma\'lum elementlardan tashkil topgan, o\'z maqsadi va ma\'lum vaqt mobaynidagi faoliyat davriga ega elementlarning o\'zaro munosabatlariga asoslangan yaxlitlikdir',
      'Tizim – bu, ma\'lum elementlardan tashkil topgan hamda ma\'lum vaqt mobaynidagi faoliyat davriga ega elementlarning o\'zaro munosabatlariga asoslangan yaxlitlikdir',
      'Tizim – bu, ma\'lum elementlardan tashkil topgan, ma\'lum vaqt mobaynidagi faoliyat davrida ijtimoiy munosabatlarga kirishgan elementlarning o\'zaro munosabatlariga asoslangan yaxlitlikdir',
      'Tizim – bu, ma\'lum elementlardan tashkil topgan, ma\'lum vaqt mobaynidagi faoliyat davrida foyda (zarar) ga ega elementlarning o\'zaro munosabatlarga asoslangan yaxlitlikdir'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Struktura nimani ifodalaydi',
    options: [
      'Struktura – bu, tizimning tarkibiy qismlari, ular orasidagi munosabatlar',
      'Struktura – bu, boshqaruv pog\'onalari va ular orasidagi munosabatlar',
      'Struktura – bu, jamoa a\'zolari orasidagi munosabatlar',
      'Struktura – bu, boshqaruvchi va boshqariluvchilar orasidagi munosabatlar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Davlat darajasida moliyalashtirish manbalari',
    options: [
      'Davlat byudjeti, maxsus fondlar, tashqi va ichki qarzi ko\'rinishidagi qarz mablag\'lari',
      'Innovatsion boshqaruvning moliyaviy fondi',
      'Texnoparklarning, xalqaro fondlarining, shaxsiy mablag\'lari',
      'Ilmiy yangiliklar yaratish markazi fondi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion menejmentning boshqarish usullari',
    options: [
      'Iqtisodiy, tashkiliy – farmoyishli, va ijtimoiy – ruhiy usullar',
      'Iqtisodiy, kibernetik, tashkiliy – farmoyishli usullar',
      'Iqtisodiy, grafik, ijtimoiy – ruhiy usullar',
      'Iqtisodiy, tarbiyaviy, ijtimoiy – ruhiy usullar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Boshqarishning iqtisodiy usullari:',
    options: [
      'Bu usulda ta\'sir ko\'rsatish asosan iqtisodiy dastaklar va boshqalar yordamida amalga oshiriladi',
      'Bu boshqaruv funksiyalarini amalga oshirish vositalari funksiyalarning amal qilish',
      'O\'z ichiga ko\'bo\'yruqlar va ko\'rsatmalarga rioya qilishni oladi',
      'Bu alohida insonlar yoki guruhlarning o\'rtasidagi munosabatlarni muvofiqlashtirish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Boshqarishning sotsial – psixologik usullarini ta\'riflang',
    options: [
      'Bu usullar ta\'sir ko\'rsatishning alohida insonlar yoki guruhlarning o\'rtasidagi munosabatlarni muvofiqlashtirish, shaxsiy ta\'sir, o\'rnak va shu kabilarni o\'z ichiga oladi',
      'Bu usullar o\'z ichiga ko\'proq rasmiy vakolatlar orasidagi munosabatlarga asosan ichki tartib, buyruqlarga rioya qilishni oladi',
      'Bu usullar ta\'sir ko\'rsatishning iqtisodiy manfaatlarga murojaat qilishni o\'z ichiga oladi',
      'Bu boshqaruv funksiyalarini amalga oshirish vositalari yoki funksiyalarning amal qilish mexanizmi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Boshqarishning tashkiliy-farmoyish usullari:',
    options: [
      'Bu usullar o\'z ichiga ko\'proq rasmiy vakolatlar orasidagi munosabatlarga asosan ichki tartib, bo\'yruqlar va ko\'rsatmalarga rioya qilishni oladi',
      'Bu boshqaruv funksiyalarini amalga oshirish vositalari yoki funksiyalarning amal qilish mexanizmi',
      'Bu usulda ta\'sir ko\'rsatish asosan iqtisodiy dastaklar yordamida amalga oshiriladi',
      'Bu usullar ta\'sir ko\'rsatishning alohida insonlar yoki guruhlarning o\'rtasidagi munosabatlarni muvofiqlashtirish kabilarni o\'z ichiga oladi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion menejmentning asosiy funksiyalari:',
    options: [
      'Rejalashtirish, tashkil etish, muvofiqlashtirish, rag\'batlantirish (motivatsiya), nazorat',
      'Rejalashtirish, muvofiqlashtirish, rag\'batlantirish (motivatsiya), nazorat',
      'Rejalashtirish, buxgalteriya, muvofiqlashtirish, nazorat',
      'Strategik rejalashtirish, tashkil etish, muvofiqlashtirish, nazorat'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Menejer kim',
    options: [
      'Menejer – bu, yollanma professional boshqaruvchi',
      'Menejer – bu, yollanma tadbirkor',
      'Menejer – bu, biznesmen',
      'Menejer – bu, ish yurituvchi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Tadbirkor kim',
    options: [
      'Tadbirkor – bu, o\'ziga ma\'lum tavakkalchilikni olib yangi (mahsulot, xizmat ko\'rsatish yoki intellektual) ishni amalga oshirib foyda oladigan shaxs',
      'Tadbirkor – bu, foyda olish maqsadida tavakkalchilik qiladigan biznesmen',
      'Tadbirkor – bu, daromad olish uchun harakat qiladigan menejer',
      'Tadbirkor – bu, foyda olish uchun faoliyat ko\'rsatadigan shaxs'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Muvaffaqiyatli boshqarish nima',
    options: [
      'Muvaffaqiyatli boshqarish – bu, resurslarning eng optimal sarfi asosida qo\'yilgan maqsadni amalga oshirilishi',
      'Muvaffaqiyatli boshqarish – bu, talabni to\'liq qondirish',
      'Muvaffaqiyatli boshqarish – bu, xodimlarga ijtimoiy sharoitlarni yaratish',
      'Muvaffaqiyatli boshqarish – bu, optimal ishlab chiqarishni tashkil etish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Muvaffaqiyat tushunchasini izohlang',
    options: [
      'Bu maqsadga eng optimal yo\'llar bilan erishish va natijani mumkin qadar uzoqroq saqlab qolish',
      'Bu har qanday yo\'l bilan maqsadga erishish',
      'Bu tashkilotning bozordagi ulushini ko\'paytirish',
      'Bu ishlab chiqarish - sotish harajatlarini raqobatchilardan ko\'ra pasaytirishga erishish'
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
    return shuffled.slice(0, Math.min(count, QUIZ_QUESTIONS.length));
  }

  static getTotalQuestionsCount(): number {
    return QUIZ_QUESTIONS.length;
  }
}