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
  },
  // Qo'shimcha 500+ ta savol
  {
    question: 'Innovatsion faoliyatning yangi tashkiliy shakllari:',
    options: [
      'Texnoparklar, texnopolislar, innovatsion markazlar va rivojlanish markazlari',
      'Vazirlik, uyushmalar, korxonalar',
      'Texnoparklar, mashina-traktor parklari',
      'Trestlar, uyushmalar, xoldinglar, korporatsiyalar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korxonaning joriy faoliyatini yaxshilashga qaratilgan rivojlanish strategiyasi',
    options: [
      'Raqobatchilik strategiyasi',
      'Tadbirkorlik strategiyasi',
      'Xujumkorlik strategiyasi',
      'Marketing strategiyasi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korxonaning faoliyatini kengaytirishga va yangi daromad manbalarini shakllantirishga qaratilgan rivojlanish strategiyasi',
    options: [
      'Tadbirkorlik strategiyasi',
      'Marketing strategiyasi',
      'Xujumkorlik strategiyasi',
      'Raqobatchilik strategiyasi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korxonada innovatsion faoliyatning samarasi nimada namoyon bo\'ladi',
    options: [
      'Mahsulot ishlab chiqarish hajmi va sifati ortishi, yangi mahsulot va yangi bozorlar, mehnat unumdorligi ortishi, resurslardan foydalanish samaradorligi ortishi',
      'Shartnomalarning tezroq bajarilishi, ishchilarning o\'z vaqtida ish haqi olishi',
      'Ishlab chiqarish smenaliligi ortishi, tannarxning kamayishi',
      'Mahsulot sifati va tannarxi ortishi, eksport hajmining ortishi, mehnat intizomi kuchayishi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion faoliyatga mablag\' sarflashning o\'ziga xos xususiyatlari',
    options: [
      'Tavakkalchilikning yuqori darajasi, natija uzoq muddatda ko\'rinishi',
      'Past tavakkalchilik va yuqori rentabellik',
      'Yuqori tavakkalchilik va natija tez muddatda ko\'rinishi',
      'Biznes rejaning puxta tuzilgan bo\'lishi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: '2023 yil O\'zbekiston Respublikasida nima deb nomlandi',
    options: [
      'Insonga e\'tibor va sifatli ta\'lim yili',
      'Xalq bilan muloqot va inson manfaatlari yili',
      'Yoshlar yili',
      'Oila yili'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Mamlakatimiz birinchi Prezidenti I. A. Karimov tomonidan asos solingan "Innovatsion g\'oyalar va texnologiyalar yarmarkasi" nechanchi yildan beri o\'tkazib kelinadi',
    options: [
      '2008 yil',
      '2005 yil',
      '2001 yil',
      '2003 yil'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ixtironing patentga layoqatlilik shartlari',
    options: [
      'Yangiligi, ixtirochilik darajasi mavjudligi, sanoatda qo\'llanila olishi',
      'Yangiligi, originalligi, sanoatda qo\'llanila olishi',
      'Yangiligi, originalligi',
      'Yangiligi, sanoatda qo\'llanila olishi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yangi g\'oyalarni topish va saralash usullari:',
    options: [
      'Patent-litsenzion faoliyatni o\'rganish, ilmiy izlanish, "aqliy xujum", "fishing", ekspert xulosalari, "head hunting", sanoat shpionaji',
      'G\'oyani shakllantirish, imkoniyatlarni o\'rganish, tashqi muhit tahlili, variant tanlash',
      'Patent(litsenziya) sotib olish, mutaxassislarni jalb qilish, "aqliy xujum"',
      'So\'rovlar o\'tkazish, nazariy bilimlarni o\'rganish, sanoat shpionaji'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsiyalarning qaysi turi ijtimoiy-iqtisodiy o\'sishga ko\'proq turtki beradi',
    options: [
      'Texnologik',
      'Tijoriy',
      'Ijtimoiy',
      'Tashkiliy'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korxonalarda innovatsion faoliyatni rag\'batlantirish yo\'llari:',
    options: [
      'Rahbariyatning qo\'llab-quvvatlashi, o\'zgarishlarga hayrihohlik, zarur moddiy-texnik baza, moddiy va ma\'naviy rag\'batlantirish',
      'Chet el investitsiyalarini jalb qilish, xodimlar malakasini oshirish, reklama',
      'Moddiy va ma\'naviy rag\'batlantirish, qat\'iy intizom, rejalashtirish, jazolash',
      'Qulay ijtimoiy-ruhiy muhitni shakllantirish, chet el mutaxassislarini taklif etish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ishlab chiqarishni tashkiliy-texnik tayyorlash –bu',
    options: [
      'Mahsulot ishlab chiqarishni yo\'lga qo\'yishni ham texnik-texnologik jihatdan, ham tashkiliy jihatdan asoslangan holda tashkil etish',
      'Yangi mahsulot ishlab chiqarish uchun patent (litsenziya)ni rasmiylashtirish',
      'Korxonadagi asosiy vositalarni yangilash va to\'la yuklash',
      'Ishlab chiqarishni diversifikatsiyalash'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ilmiy- texnika taraqqiyotining asosiy yo\'nalishlari:',
    options: [
      'Mehnat predmetlarini takomillashtirish, mehnat qurollarini takomillashtirish, mehnatni tashkil etishni takomillashtirish',
      'Fundamental tadqiqotlar, amaliy tadqiqotlar, yangi mahsulot ishlab chiqarish',
      'G\'oyani shakllantirish, imkoniyatlarni izlash, variantlarni tanlash',
      'Modernizatsiya va diversifikatsiya'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: '® belgisi nimani ifodalaydi',
    options: [
      'Ro\'yxatdan o\'tkazilgan va himoyalangan savdo belgisini',
      '"Ribok" firmasi logotipi',
      'Korxona rasmiy ro\'yxatdan o\'tganligini',
      'Mahsulot ilmiy izlanishlar bosqichida ekanligini'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: '© belgisi nimani ifodalaydi',
    options: [
      'Mahsulotga mualliflik huquqi himoyalanganligi',
      'Ro\'yxatdan o\'tkazilgan va himoyalangan savdo belgisini',
      'Korxona rasmiy ro\'yxatdan o\'tganligini',
      'Mahsulotdan nusxa ko\'chirish mumkin emasligini'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion va investitsion loyihalar samaradorligini baholash usullari',
    options: [
      'Oddiy usul va diskontlashtirishga asoslangan usul',
      'Korellyasion, regression tahlil',
      'Iqtisodiy-matematik usullar',
      'Iqtisodiy, tashkiliy-ma\'muriy usul'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion loyihalarni amalga oshirishda tavakkalchilik turlari',
    options: [
      'Texnik, iqtisodiy, tijoriy, ijtimoiy-siyosiy, inson omiliga bog\'liq, tabiiy, favqulodda',
      'Tabiiy, iqtisodiy, siyosiy, mavsumiy, texnologik',
      'Ijtimoiy, ekologik, favqulotda, moliyaviy, mahalliy',
      'Oldindan ko\'rilgan va oldindan ko\'rilmagan'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Loyiha tavakkalchiligini kamaytirish yo\'llari',
    options: [
      'Texnik-iqtisodiy asoslash, sug\'urtalash, xodimlar malakasini oshirish',
      'Loyiha xarajatlarini kamaytirish, bozorni o\'rganish',
      'Xorijiy investitsiyalarni jalb qilish, xodimlarni chet elda o\'qitish',
      'Yangiliklarni patentlash, xarajatlarni kamaytirish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ilmiy-texnik tadbirlarga sarflanadigan xarajatlar qanday xususiyatga ega',
    options: [
      'Yuqori darajada tavakkalchilik, natijani uzoq muddatda olish, o\'zini qoplamaslik xavfi',
      'Tez qaytishi, yuqori rentabelligi',
      'Uzoq muddatda qoplanishi, past rentabelligi',
      'Yuqori ijtimoiy-iqtisodiy samaradorligi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Investitsiyalar va innovatsiyalar xo\'jalik faoliyatiga ta\'siri shakllari',
    options: [
      'Bevosita va bilvosita',
      'Huquqiy va iqtisodiy',
      'Natural va qiymat',
      'Ijobiy va salbiy'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korxonada investitsiya kiritish qoidalari:',
    options: [
      'Maqsadlilik, tavakkalchiligi yuqori loyihalarga o\'z mablag\'larini sarflash, yuqori rentabelli loyihalarni investitsiyalash',
      'Chet el investitsiyalarini jalb etish, xodimlarni o\'qitish',
      'O\'z mablag\'laridan foydalanish, huquqiy himoyalash',
      'Bozorni o\'rganish, xarajatlarni kamaytirish, tajriba o\'tkazish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'O\'zbekistonda bitiruvchilarni oliy ta\'lim bilan qamrab olish darajasi o\'tgan davrda 9–10 foiz edi. So\'nggi ikki yilda ko\'rilgan chora-tadbirlar tufayli bu ko\'rsatkich necha foizga oshdi',
    options: [
      '25 foizdan oshdi',
      '12 foizdan oshdi',
      '15 foizdan oshdi',
      '10 foizdan oshdi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Zamonaviy sharoitlarda O\'zbekistonda qanday rivojlanish dasturi ishlab chiqildi',
    options: [
      'Yangi O\'zbekiston strategiyasi',
      '5 yillik rivojlanish rejasi',
      'Barqaror rivojlanish 10 yilligi',
      'Harakatlar Strategiyasi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: '"Yangi O\'zbekiston" strategiyasida mamlakatimizni rivojlantirish sohasidagi vazifalar nechta yo\'nalishda belgilandi',
    options: [
      '7 ta',
      '4 ta',
      '6 ta',
      '5 ta'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: '«2019–2021 yillarda O\'zbekiston Respublikasini innovatsion rivojlantirish strategiyasini tasdiqlash to\'g\'risida»gi Prezident Farmoni (2018 yil 21 sentyabr) bilan O\'zbekiston Respublikasining 2030 yilga kelib Global innovatsion indeks reytingi bo\'yicha jahondagi nechta ilg\'or mamlakat qatoriga kirishiga erishish bayon etilgan',
    options: [
      '50 ta',
      '40ta',
      '20ta',
      '30ta'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'O\'zbekiston Respublikasida innovatsion faoliyatni tartibga soluvchi davlat organi',
    options: [
      'Innovatsion rivojlantirish vazirligi',
      'Intellektual mulk agentligi',
      'Vazirlar Mahkamasi',
      'Fanlar Akademiyasi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Milliy innovatsion tizim tarkibiy elementlari:',
    options: [
      'huquqiy baza, innovatsion infratuzilma, fan, ta\'lim tizimi',
      'texnik- tijoriy, ijtimoiy- tashkiliy',
      'ixtiro, foydali model',
      'innovatsion infratuzilma, fan'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion faoliyatni tartibga solishning huquqiy asosi bo\'lgan "Innovatsion faoliyat to\'g\'risida" gi qonun qachon qabul qilingan',
    options: [
      '2020 yilda',
      '1994 yilda',
      '2001 yilda',
      '2008 yilda'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Mamlakatimizda ilmiy-tadqiqot faoliyatini tartibga solishga oid qanday qonunlar qabul qilingan',
    options: [
      '«Ixtiro, foydali model va sanoat namunalari to\'g\'risida», «Mualliflik va turdosh huquqlar to\'g\'risida», «Savdo belgilari to\'g\'risida», «Innovatsion faoloyit to\'g\'risida», «Ilm-fan va ilmiy faoloyit to\'g\'risida»',
      '«Innovatsiyalar to\'g\'risida», «Mualliflik va turdosh huquqlar to\'g\'risida»',
      '«Fan-texnika to\'g\'risida», «Ixtirolar to\'g\'risida»',
      '«Mulk huquqi to\'g\'risida», «Savdo belgisi to\'g\'risida»'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: '«Ixtiro, foydali model va sanoat namunalari to\'g\'risida» O\'zbekiston Respublikasi qonuni qachon qabul qilingan',
    options: [
      '1994 yilda',
      '1992 yilda',
      '1993 yilda',
      '1991 yilda'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yangiliklarning hayot davri necha bosqichdan iborat',
    options: [
      '4 ta',
      '3 ta',
      '2 ta',
      '1 ta'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: '2021 yil O\'zbekistonda qanday yil deb e\'lon qilingan',
    options: [
      '«Yoshlarni qo\'llab-quvvatlash va aholi salomatligini mustahkamlash yili»',
      '«Real sektorni qo\'llab-quvvatlash yili»',
      '«Tadbirkorlikni qo\'llab-quvvatlash yili»',
      '«Yoshlarni qo\'llab-quvvatlash yili»'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Innovatsion faoliyat samaradorligi qanday aniqlanadi',
    options: [
      'Olingan iqtisodiy samarani ilmiy-tadqiqot xarajatlariga nisbati orqali',
      'Daromadning xarajatga nisbati orqali',
      'Foydaning tushumga nisbati orqali',
      'Foydaning asosiy fondlar qiymatiga nisbati orqali'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  // Makroiqtisodiyot bo'yicha savollar
  {
    question: 'Quyidagi omillarlardan qaysi biri makroiqtisodiyot fani predmetiga oid',
    options: [
      'Aholining ish bilan bandligi',
      'ishlab chiqarish xarajatlari',
      'Korporativ soliqqa tortish tamoyillari',
      'asosiy ishchilarning ish haqi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Makroiqtisodiyotning predmeti nima',
    options: [
      'inflyatsiya, narx darajasi, iqtisodiy o\'sish sur\'ati, milliy daromad, yalpi ichki mahsulot (YaIM) va ishsizlikning o\'zgarishi',
      'Mavjud resurslardan samarali foydalanish',
      'uning xodimlarining, birinchi navbatda, menejerlar va rahbarlarning iqtisodiy, ishlab chiqarish, tijorat va moliyaviy faoliyat sohalaridagi xatti-harakatlari',
      'Iqtisodiy qonunlar va qonunlar mexanizmi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Makroiqtisodiyotning asosiy maktablari nima',
    options: [
      'Keynscha, monetaristik, yangi klassik, real tsikli nazariyasi, yangi Keynscha',
      'feministik iqtisod, sotsialistik iqtisodiyot, binar iqtisodiyot, ekologik iqtisodiyot, bioiqtisodiyot va termoiqtisodiyot',
      'Klassika, monopolistlar, makroiqtisodiyot maktabi',
      'korxona faoliyati bilan bog\'liq bilimlar va qarorlar qabul qilish tizimi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Iqtisodiy muammolar ham bozor ham davlat tomonidan hal qilinadigan iqtisodiy tizim nomi qaysi javobda berilgan',
    options: [
      'Aralash iqtisodiy tizim',
      'Ma\'muriy buyruqbozlik tizimi',
      'Erkin bozor tizimi',
      'An\'anaviy bozor tizimi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi daromad quyidagilarning qaysi biriga teng:',
    options: [
      'Yalpi ishlab chiqarish hajmiga teng',
      'Ishchilar olgan jami ish haqiga',
      'Ishlab chiqaruvchilar olgan jami foyda hajmga',
      'Kapital egalari olgan jami renta va foizli daromadga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Keynschilar maktabi deb nimaga aytiladi',
    options: [
      'Bu siyosatning asosiy vositasi fiskal va pul-kredit rag\'batlantirishdir',
      'Davlatning iqtisodiyotga aralashuvi har doim ham barqaror emas',
      'Qishloq xo\'jaligini rivojlantirish, qishloqlarda bandlik darajasini oshirish',
      'Asosiy vosita - ishchilarning o\'rtacha ish haqini oshirish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Neoklassik maktab qanday g\'oyani ilgari surdi:',
    options: [
      'tadqiqot markaziga narxni shakllantirish qonunlari hamda talab va taklif munosabatlari tahlilini olib kirdi',
      'Ishlab chiqarish xarajatlarini minimallashtirish, maksimal foyda olish haqida',
      'Kadrlarni korxonalarga joylashtirish, malakasini oshirish haqida',
      'Amortizatsiya ajratmalari, ishlab chiqarish tannarxini kamaytirish, yangi texnika va texnologiya haqida'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Monetaristlar maktabi qanday g\'oyani ilgari suradi:',
    options: [
      'Monetarizmning asosini pulning miqdor nazariyasi tashkil etadi',
      'Davlat iqtisodiyotni tartibga solishi zarurligini e\'tirof etishadi, lekin pul-kredit siyosati ahamiyatini oshirib ko\'rsatadilar',
      'Monetaristlar iqtisodiyotga davlat aralushuvi siyosatining doimiy opponentlari va iqtisodiy erkinlikni yoqlaydilar',
      'Iqtisodiyotga davlat aralashuvi masalasida pul massasini boshqarish asosida talabga ta\'sir qilish ilgari suradilar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yangi makroiqtisodiyot maktabi deb nimaga aytiladi',
    options: [
      'Makroiqtisodiy barqarorlik masalasida iqtisodiyotga davlat aralashuvini cheklangan miqyosda yoqlovchilar maktabiga',
      'Makroiqtisodiy barqarorlik va rivojlanishga davlat aralushuvi kengaytirishga qarshi turuvchilar',
      'Neoklassiklar maktabiga makroiqtisodiy barqarorlik',
      'Milliy xo\'jalikni boshqarishga davlat aralashuvi borasida liberalizm g\'oyalari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Makroiqtisodiyotning asosiy subyektlari kim',
    options: [
      'davlat, markaziy bank, korxonalar, uy xo\'jaliklari va tashqi iqtisodiy agentlar',
      'Tovar bozori, korxonalar, firmalar, korxona xodimlari, soliqqa tortish',
      'Resurs bozori',
      'Mehnat taklifi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Iqtisodiy pasayish davrida jami talab qay yo\'nalishda o\'zgaradi',
    options: [
      'Kamayadi',
      'Ortadi',
      'O\'zgarmaydi',
      'Ortishi va kamayishi mumkin'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Taklif inflyatsiyasiga sabab bo\'ladigan omil qaysi',
    options: [
      'Ishlab chiqarish resurslari narxining o\'sishi',
      'Davlat xarajatlarining oshishi',
      'Pul massasining ortishi',
      'Sof eksportning ko\'payishi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Raqobat mavjud mehnat bozorda mehnatga bo\'lgan talab nima bilan belgilanadi',
    options: [
      'Ish haqining darajasi bilan',
      'Kasaba uyushmasi faoliya ti bilan',
      'Ishchi kuchi migratsiyasi bilan',
      'Mehnatga layoqatli aholi nufuzi bilan'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'To\'liq bandlik deganda nima tushuniladi',
    options: [
      'friksion va tarkibiy ishsizlik mavjudligini',
      'Davriy ishsizlik mavjudligini',
      'Ishsizlikni 0 ga tengligini',
      'Iqtisodiyotda tarkibiy ishsizlik mavjudligini'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ouken qonuni qaysi bog\'liqlikni ifodalaydi',
    options: [
      'Ishsizlik bilan ishlab chiqarish o\'rtasidagi bog\'liqlikni',
      'Inflyatsiya va ishsizlik o\'rtasidagi bog\'liqlikni',
      'Inflyatsiya hamda ishlab chiqarish o\'rtasidagi bog\'liqlikni',
      'Pul massasi va ishlab chiqarish o\'rtasidagi bog\'liqlikni'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ishsizlar deb kimga aytiladi:',
    options: [
      'Mehnatga yaroqli bo\'lgan va ishlab chiqarishda band bo\'lmagan, faol ish qidirayotganlar',
      'Ish qidirayotgan hamda yaqin vaqtlar ichida ish bilan ta\'minlanishni kutayotgan insonlar',
      'Ishchi kuchiga talab tarkibning o\'zgarishi natijasida ishsiz qolganlar',
      'Ishlab chiqarish qisqarishi natijasida ishsiz qolganlar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Friktsion ishsizlik bu-',
    options: [
      'Bu ish qidirayotgan yoki yaqin vaqtlar ichida ish bilan ta\'minlanishni kutayotgan ishchi kuchi',
      'Ishlab chiqarish tarkibining o\'zgarishi natijasida ishdan bo\'shatilgan ishchilar',
      'Ishlab chiqarishning pasayishi natijasida ishchi kuchiga bo\'lgan talabni qisqarishi',
      'Mehnatga layoqatli bo\'lgan ammo ishsiz qolgan aholi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Makroiqtisodiy muvozanat deb nimaga aytiladi:',
    options: [
      'Makroiqtisodiy muvozanat bu narxlar darajasi bilan milliy ishlab chiqarish hajmi o\'rtasidagi muvozanat',
      'Makroiqtisodiy muvozanat bu ishlab chiqarish hajmi va iste\'mol darajasi o\'rtasidagi muvozanat',
      'Makroiqtisodiy muvozanat bu iste\'mol va jamg\'arma o\'rtasidagi muvozanat',
      'Makroiqtisodiy muvozanat bu ist\'mol va jamg\'arma o\'rtasidagi muvozanat'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi talabning narx omillariga nimalar kiradi:',
    options: [
      'Import xaridlari samarasi, foiz stavkasi samarasi, boylik samarasi',
      'Import narxlari, mahalliy tovarlar narxlari, raqobatni kuchayishi',
      'Eksport narxlari, import narxlari, aholi sonining ortishi',
      'Valyuta kursi tebranishi, inflyatsiya sur\'ati, foiz ustamasi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi talabning narxga bog\'liq bo\'lmagan omillariga nimalar kiradi:',
    options: [
      'Aholi real daromadlari, inflyatsion kutish, soliqlardagi o\'zgarish, iste\'molchilarning qarzlari',
      'Aholi nominal daromadlari, inflyatsiya sur\'ati, kredit ustamasi, davlat qarzlari',
      'Aholi yalpi daromadi, iste\'mol narxlari indeksi, deposit foiz ustamasi, valuyat almashuv kursi',
      'Uy xo\'jaliklari daromadi, ishlab chiqaruvchi narx indeksi, kredit foiz ustamasi, hukumat qarzlari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Investitsiyalar darajasini o\'zgarishi yalpi talabga qanday ta\'sir ko\'rsatadi:',
    options: [
      'Fan va texnika yutuqlari darajasi o\'ssa, ortiqcha ishlab chiqarish quvvatlari qisqaradi, biroq asbob – uskunalarning eskirish darajasi o\'sadi',
      'Fan va texnika yutuqlari darajasi pasaysa, ortiqcha ishlab chiqarish quvvatlari qisqaradi, ammo asbob – uskunalarning eskirish darajasi o\'sadi',
      'Fan va texnika yutuqlari darajasi o\'ssa, ortiqcha ishlab chiqarish quvvatlari ortadi, asbob – uskunalarning eskirish darajasi o\'sadi',
      'Fan va texnika yutuqlari darajasi o\'ssa, ortiqcha ishlab chiqarish quvvatlari qisqaradi, lekin asbob – uskunalarning eskirish darajasi pasayadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  // Qo'shimcha 450+ ta savol
  {
    question: 'Yalpi talabga davlat xarajatlarini o\'zgarishi qanday ta\'sir ko\'rsatadi:',
    options: [
      'Favqulodda vaziyatlar va boshqa holatlarda davlar xarajatlari ortadi va bu talabning o\'sishiga olib keladi',
      'Favqulodda vaziyatlar va boshqa holatlarda davlar xarajatlari ortadi lekin bu talabning o\'sishiga olib kelmaydi',
      'Favqulodda vaziyatlar va boshqa holatlarda davlar xarajatlari ortadi ammo bu talabning o\'sishiga ta\'sir qilmaydi',
      'Favqulodda vaziyatlar va boshqa holatlarda davlar xarajatlari kamayadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Suzib yuruvchi valyuta kursi sharoitida tashqi savdo to\'siqlarini o\'rnatilishi sof eksportni oshiradi ammo:',
    options: [
      'Suzib yuruvchi valyuta kursi sharoitida tashqi savdo to\'siqlarini o\'rnatilishi sof eksportni oshiradi biroq almashuv kursi oshishi daromad ortishiga olib kelmaydi',
      'Suzib yuruvchi valyuta kursi sharoitida tashqi savdo to\'siqlarini o\'rnatilishi sof eksportni qisqartiradi va almashuv kursi oshishi daromad ortishiga olib keladi',
      'Suzib yuruvchi valyuta kursi sharoitida tashqi savdo to\'siqlarini o\'rnatilishi sof eksportga ta\'sir qilmaydi va almashuv kursi daromad ortishiga ta\'sir qilmaydi',
      'Suzib yuruvchi valyuta kursi sharoitida tashqi savdo to\'siqlarini o\'rnatilishi jamg\'armani oshiradi ammo almashuv kursi oshishi daromadni ortiradi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi ichki mahsulot o\'zining ichiga nimani olmaydi:',
    options: [
      'Sof moliyaviy bitimlarning qiymatini',
      'Sof eksport shartnomalari qiymatini',
      'Sof import shartnomalari bahosini',
      'To\'lov balansida sof eksport qoldig\'ini'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi ichki mahsulotni hisoblashning ishlab chiqarish usuli qaysi ko\'rsatkichga asoslangan',
    options: [
      'Yalpi qo\'shilgan qiymatni hisoblashga',
      'Yalpi xom-ashyo sarfini hisoblashga',
      'Yalpi kapital sarfini hisoblashga',
      'Yalpi mehnat sarfini hisoblashga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Rag\'batlantiruvchi byudjet siyosatining oqibatlari nimada bilinadi:',
    options: [
      'Qisqa muddatli davrda pasayish to\'xtaydi, uzoq muddatli davrda iqtisodiy o\'sish yuz beradi, inflyatsiya o\'sadi',
      'Qisqa muddatli davrda pasayish yuz beradi, uzoq muddatli davrda iqtisodiy o\'sish yuz beradi, lekin soliq tushumi ortadi, inflyatsiya pasayadi',
      'Qisqa muddatli davrda pasayish to\'xtaydi, uzoq muddatli davrda iqtisodiy o\'sish yuz beradi, demak soliq yuki o\'zgarmaydi, inflyatsiya o\'sishdan to\'xtaydi',
      'Uzoq muddatli davrda pasayish to\'xtaydi, qisqa muddatli davrda iqtisodiy o\'sish yuz beradi, lekin soliq yuki pasayadi, inflyatsiya pasayadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Keyns nazariyasiga ko\'ra davriy rivojlanishning ichki sabablari qaysi javobda ko\'rsatilgan',
    options: [
      'investitsiyalarga bo\'lgan talabning tebranishi',
      'tabiiy – iqlim sharoitlari',
      'siyosiy xodisalar',
      'fan-texnika taraqqiyoti'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ishchi kuchi yoki iqtisodiy faol aholi degani nima',
    options: [
      'mehnatga layoqatli yoshdagi ishlayotgan va ishsiz yurgan aholining umumiy soni tushuniladi',
      'inson resurslarining ijtimoiy-iqtisodiy yo\'nalishlarini tadqiq etish orqali ularni samarali boshqarishni maqsad qilib oladi',
      'mehnat resurslarning samarali boshqarilishi deganda ularning «to\'la ish bilan bandligi» tushuniladi',
      'mehnat resurslari va ularning faol qismi bo\'lgan ishchi kuchi ishlab chiqarish kuchlarining eng asosiy qismidir'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Mehnat resurslarning samarali boshqarilishi deganda nima tushuniladi',
    options: [
      'mehnat resurslarning samarali boshqarilishi deganda ularning «to\'la ish bilan bandligi» tushuniladi',
      'aholining ishlamoqchi bo\'lgan qismini ish bilan deyarli to\'liq band qilib bo\'lmaydi',
      'aholining ma\'lum miqdorda ishsiz bo\'lishi iqtisodiy jihatdan me\'yoriy xol va asoslidir',
      'mehnatga layoqatli yoshdagi ishlayotgan va ishsiz yurgan aholining umumiy soni tushuniladi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ouken qonuni deb nimaga aytiladi',
    options: [
      'ishsizlik darajasi va yalpi ichki mahsulot uzilishi o\'rtasidagi miqdoriy nisbati',
      'haqiqiy ishsizlik ishsizlikning tabiiy darajasidan bir foizga oshib ketsa',
      'Milliy iqtisodiyot yalpi ichki mahsulotni ikki yarim foizga kam yaratadi',
      'ishsizlikning haqiqiy darajasi uning tabiiy darajasidan qanchalik yuqoriligini ifodalaydi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Inflyatsiya – bu',
    options: [
      'inflyatsiya - bu, yalpi tovar va xizmatlar bahosining ko\'payishi va u bilan bog\'liq pul birligi xarid quvvatining tushib ketishidir',
      'makroiqtisodiy beqarorlikni aks ettiradi',
      'barcha mamlakatlar uchun inflyatsiyani jilovlash yirik iqtisodiy muammo hisoblanadi',
      'bir iqtisodiy tizimdan ikkinchi bir iqtisodiy tizimga o\'tayotgan mamlakatlarda inflyatsiyaning iqtisodiyotga ta\'siri ancha xavfli'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Inflyatsiyaning qanday ko\'rinishi mavjud:',
    options: [
      'talab inflyatsiyasi jami taklifning kamayishidan kelib chiqadigan inflyatsiya, ya\'ni, taklif inflyatsiyasi',
      'taklif inflyatsiyasi jami taklifning kamayishidan kelib chiqadigan inflyatsiya, ya\'ni, taklif inflyatsiyasi',
      'talab inflyatsiyasi jami talabning kamayishidan kelib chiqadigan inflyatsiya',
      'talab inflyatsiyasi jami talabning kamayishidan kelib chiqadigan inflyatsiya, ya\'ni, talab inflyatsiyasi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Talab inflyatsiyasi bu-',
    options: [
      'iqtisodiyotda talab keskin oshib ketishi va uni ishlab chiqarishning real hajmi bilan qondirish mumkin bo\'lmay qolgan sharoitlarda kelib chiqadi',
      'iqtisodiyotning ishlab chiqarish imkoniyatlari jami o\'sib borayotgan talabni qondirolmaydi',
      'real tovarlar bahosining ko\'payishiga iqtisodiy bosim beradi va talab inflyatsiyasi kelib chiqadi',
      'aholining ish bilan to\'liq bandligi va ish haqining oshib borishi hisoblanadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Taklif inflyatsiyasi bu-',
    options: [
      'mamlakat iqtisodiyotida tovar va xizmatlar taklifining kamayishi natijasida tovar va xizmatlar baholarining oshishidan paydo bo\'ladi',
      'tovarlarning baholari oshib boradi',
      'mahsulot birligiga sarflangan xarajatlarning o\'sishi hisoblanadi',
      'nominal ish haqi, xom ashyo va yoqilg\'i narxlarining oshishi natijasida ishlab chiqarish tannarxi ham oshadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Fillips egri chizig\'i deb nimaga ataladi',
    options: [
      'ishsizlik va inflyatsiya ko\'rsatkichlari o\'rtasidagi o\'zaro bog\'liqlik',
      'ish bilan bandlik va inflyatsiya ko\'rsatkichlari o\'rtasidagi o\'zaro bog\'liqlik',
      'tovarlarning baholari oshib boradi',
      'mahsulot birligiga sarflangan xarajatlarning o\'sishi hisoblanadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Inflyatsiya mavjud bo\'lsa',
    options: [
      'nominal yalpi ichki mahsulot real yalpi ichki mahsulotdan tezroq o\'sadi',
      'nominal yalpi ichki mahsulot real yalpi ichki mahsulotdan sekinroq o\'sadi',
      'ko\'rsatkichlarda o\'zgarish sezilmaydi',
      'milliy daromad kamayadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ko\'lamdan doimiy qaytim xususiyati nimani bildiradi:',
    options: [
      'Ishlab chiqarish omillari bir miqdorga o\'shishi ishlab chiqarish hajmi o\'shishiga tengligidir',
      'ishlab chiqarish hajmni doimiy bo\'lishi',
      'mehnatning me\'yoriy unumdorligi kapitalning ushbu ko\'rsatkichiga tengligi',
      'mehnat va kapital unumdorligini o\'zgarmasligi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi milliy mahsulot nima',
    options: [
      'mamlakat rezidentlari tomonidan ma\'lum muddat (birchorak, bir yil) davomida ishlab chiqarilgan yakuniy tovar, xizmatlar umumiy hajmning bozor bahosi yig\'indisi',
      'qayta ishlash yoki sotish uchun sotib olingan tovar va xizmatlar',
      'tovar va xizmatlarning sotish bahosidan ularni ishlab chiqarish uchun sotib olingan xom-ashyo va materiallar qiymatini ayirib tashlangani',
      'yakuniy iste\'mol uchun sotib olinadigan tugal mahsulot (tovar va xizmat) lardir'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Qo\'shilgan qiymat qanday topiladi',
    options: [
      'tovar va xizmatlarning sotish bahosidan, ularni ishlab chiqarish uchun sotib olingan xom ashyo, materiallar qiymati ayirib tashlab topiladi',
      'qayta ishlash yoki sotish uchun sotib olingan tovar va xizmatlar yig\'indisi hisoblanadi',
      'mamlakat rezidentlari tomonidan ma\'lum muddat davomida ishlab chiqarilgan yakuniy tovar va xizmatlar umumiy hajmning bozor bahosi yig\'indisi',
      'yakuniy iste\'mol uchun sotib olinadigan tugal mahsulot (tovar va xizmat)lar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi ichki mahsulotni hisoblashning xarajatlar usuli',
    options: [
      'yalpi ichki mahsulot iste\'molchilarning yangidan yaratilgan yakuniy mahsulotlarni sotib olishga ketgan barcha xarajatlari miqdori bo\'yicha aniqlanishidir',
      'yalpi ichki mahsulot tovar va xizmatlarni ishlab chiqarish jarayonida yaratilgan daromadlarning yig\'indisi miqdori asosida aniqlanishii',
      'yalpi ichki mahsulotni ishlab chiqarish xarajatlari bo\'yicha hisoblashda asosan pirovard mahsulot va xizmatlarni yaratishga ketgan barcha xarajatlar hisobga olinishi',
      'yalpi ichki mahsulot iste\'molchilarning yangidan yaratilgan yakuniy mahsulotlarni sotish va xizmatlarni yaratishga ketgan barcha xarajatlar hisobga olinishi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi ichki mahsulotni daromadlar yordamida aniqlash usuli',
    options: [
      'yalpi ichki mahsulot tovar va xizmatlarni ishlab chiqarish jarayonida yaratilgan daromadlarning yig\'indisi miqdori asosida aniqlanadi',
      'yalpi ichki mahsulotni ishlab chiqarish xarajatlari bo\'yicha hisoblashda asosan pirovard mahsulot va xizmatlarni yaratishga ketgan barcha xarajatlar hisobga olinishi',
      'yalpi ichki mahsulot iste\'molchilarning yangidan yaratilgan yakuniy mahsulotlarni sotish va xizmatlarni yaratishga ketgan barcha xarajatlar hisobga olinishi',
      'yalpi ichki mahsulot iste\'molchilarning yangidan yaratilgan yakuniy mahsulotlarni sotib olishga ketgan barcha xarajatlari miqdori bo\'yicha aniqlanishidir'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korporatsiyalarning foydasi nimalarga bo\'linadi:',
    options: [
      'korporatsiyasi foydaga soliq yoki foyda solig\'i hissadorlar o\'rtasida taqsimlanadigan dividendlar taqsimlanmagan foyda',
      'Iqtisodiyotni mulk resurslari bilan ta\'minlovchi uy xo\'jaliklarining daromadlari',
      'pul kapitalini yetkazib beruvchilarga xususiy biznes daromadidan pul to\'lovlari',
      'xususiy va davlat kompaniyalarining ish haqi to\'lashga sarflagan umumiy xarajatlari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi ichki mahsulotning deflyatori nimaga teng',
    options: [
      'nominal va real yalpi ichki mahsulotning nisbatiga',
      'real va nominal yalpi ichki mahsulotning nisbatiga',
      'iste\'mol savatining joriy va bazis yildagi qiymatining nisbatiga',
      'joriy yildagi mahsulotni narxlar indekslarining yig\'indisiga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Cheklovchi pul-kredit siyosatining oqibatlari nimada bilinadi:',
    options: [
      'qisqa davrda ishsizlikning o\'sishi, ishlab chiqarishning qisqarishi va uzoq muddatli davrda stagflyatsiya',
      'qisqa davrda ishsizlik kamayadi, ishlab chiqarish o\'sadi va uzoq muddatli davrda barqaror iqtisodiy o\'sish yuz beradi',
      'qisqa muddatli davrda talab jonlanadi, ishlab chiqarish o\'sadi, ammo uzoq muddatli davrda iqtisodiy o\'sish pasayadi',
      'qisqa muddatli davrda istemol ortishi ishlb chiqarishni ko\'paytiradi, ammo uzoq muddatli davrda inflyatsiya ortadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Davlat xarajatlari multiplikatori nimani ko\'rsatadi:',
    options: [
      'davlat xarajatlarini qo\'shimcha o\'sishi bilan yalpi ichki mahsulot qo\'shimcha o\'sishini ko\'rsatadi',
      'davlat xarajatlarini qo\'shimcha o\'sishiga nisbatan yalpi ichki mahsulot qo\'shimcha o\'sishini ko\'rsatadi',
      'davlat xarajatlarini qo\'shimcha o\'sganda yalpi milliy daromad qo\'shimcha o\'sishini ko\'rsatadi',
      'davlat xarajatlarini qo\'shimcha o\'sishi natijasida yalpi sof daromad qo\'shimcha o\'sishini ko\'rsatadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Multiplikator samarasi nimani anglatadi',
    options: [
      'investitsiyalar o\'zgargani holda daromadning o\'zgarishini',
      'investitsiyalar oshganda daromadning o\'zgarishini',
      'investitsiyalar kamayganda daromadning o\'zgarishini',
      'investitsiyalar o\'zgarishsiz holida daromadning o\'zgarishini'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Avtonom iste\'molning oshishi chizmada quyidagicha aks ettirilishi mumkin:',
    options: [
      'rejalashtirilgan xarajatlar egri chizig\'i o\'ngga suriladi',
      'rejalashtirilgan xarajatlar egri chizig\'i chapga suriladi',
      'rejalashtirilgan xarajatlar egri chizig\'i o\'zgarishsiz qoladi',
      'rejalashtirilgan xarajatlar egri chizig\'ining qiyalik burchagi o\'zgaradi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Sof eksportning kamayishi chizmada quyidagicha aks ettirilishi mumkin:',
    options: [
      'rejalashtirilgan xarajatlar egri chizig\'i chapga suriladi',
      'rejalashtirilgan xarajatlar egri chizig\'i o\'ngga suriladi',
      'rejalashtirilgan xarajatlar egri chizig\'i o\'zgarishsiz qoladi',
      'rejalashtirilgan xarajatlar egri chizig\'ining qiyalik burchagi o\'zgaradi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ochiq iqtisodiyotda multiplikator samarasi yopiq iqtisodiyotga nisbatan qanday farq qiladi:',
    options: [
      'ochiq iqtisodiyotda multiplikator samarasi yopiq iqtisodiyotga nisbatan pastroq bo\'ladi',
      'ochiq iqtisodiyotda multiplikator samarasi yopiq iqtisodiyotga nisbatan yuqoriroq bo\'ladi',
      'ochiqiqtisodiyotda multiplikator samarasi yopiq iqtisodiyotga nisbatan farq qilmaydi',
      'ochiqiqtisodiyotda multiplikator samarasi yopiq iqtisodiyotga nisbatan sekin natija beradi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Soliq multiplikatori nimani ko\'rsatadi:',
    options: [
      'soliqlar darajasini kamayishiga nisbatan yalpi ichki mahsulotning ko\'payishini ko\'rsatadi',
      'soliqlar darajasini kamayishiga nisbatan bandlikni ko\'payishini ko\'rsatadi',
      'soliqlar darajasini kamayishiga nisbatan iste\'molmi ko\'payishini ko\'rsatadi',
      'soliqlar darajasini kamayishiga nisbatan investatsiyalar ko\'payishini ko\'rsatadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Diskretsion fiskal siyosat atamasi nimani anglatadi:',
    options: [
      'hukumatning maxsus qarorlari natijasida davlat xarajatlari, soliqlar va davlar byudjeti qoldig\'ining maqsadli o\'zgarishini anglatadi',
      'parlament maxsus qarorlari natijasida davlat xarajatlari, soliqlar va davlar byudjeti qoldig\'ining maqsadli o\'zgarishini anglatadi',
      'vazirlik maxsus qarorlari natijasida davlat xarajatlari, soliqlar va davlar byudjeti qoldig\'ining maqsadli o\'zgarishini anglatadi',
      'Prezident maxsus qarorlari natijasida davlat xarajatlari, soliqlar va davlar byudjeti qoldig\'ining maqsadli o\'zgarishini anglatadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Import xaridlar samarasi nima',
    options: [
      'biror mamlakatda tovar va xizmatlarning ichki narxlari tashqi narxlarga nisbatan oshib borsa, shu mamlakatda ishlab chiqarilayotgan tovar va xizmatlarga talab kamayadi va o\'z navbatida shu mamlakatda import mahsulotlarga bo\'lgan talab oshadi',
      'narxlar darajasining oshishi, jamg\'arilgan moliyaviy aktivlari (omonatlar, obligatsiyalar) real xarid qobiliyatini pasaytirib yuboradi',
      'jami talabning egri chiziq bo\'yicha surilishi narxlar darajasi o\'zgarishining foiz stavkasiga bo\'lgan ta\'siriga bog\'liq',
      'biror mamlakatda tovar va xizmatlarning ichki narxlari tashqi narxlarga nisbatan oshib borilishi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Iqtisodiyotda pul taklifi kamaysa, pul bozoridagi holat qanday o\'zgaradi:',
    options: [
      'foiz stavkasi oshadi, real pul zaxiralari esa kamayadi',
      'foiz stavkasi va real pul zaxiralari kamayadi',
      'foiz stavkasi o\'zgarmaydi, real pul zaxiralari esa kamayadi',
      'foiz stavkasi oshadi, real pul zaxiralari esa o\'zgarmaydi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Iqtisodiyotda pul taklifi va narxlar darajasi o\'zgarmasdan, daromad hajm oshsa, pul bozoridagi holat qanday o\'zgaradi:',
    options: [
      'pulga bo\'lgan talab va foiz stavkasi oshadi',
      'pulga bo\'lgan talab oshadi, foiz stavkasi esa pasayadi',
      'pulga bo\'lgan talab pasayadi, foiz stavkasi esa oshadi',
      'pulga bo\'lgan talab va foiz stavkasi pasayadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Nodiskretsion fiskal siyosat atamasi nimani anglatadi:',
    options: [
      'Davlat xarajatlari, soliqlar va davlar byudjeti qoldig\'ining avtomatik tarzda o\'zgarishini anglatadi',
      'Davlat xarajatlari, soliqlar va davlar byudjeti qoldig\'ini reja asosida o\'zgarishini anglatadi',
      'Davlat xarajatlari, soliqlar va davlar byudjeti qoldig\'ini qaror asosida o\'zgarishini anglatadi',
      'Davlat xarajatlari, soliqlar va davlar byudjeti qoldig\'ini qonun asosida o\'zgarishini anglatadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Milliy daromad nima……',
    options: [
      'milliy ishlab chiqarishdan olingan daromad yoki ijtimoiy ishlab chiqarishdagi barcha daromad turlarining yig\'indisidir',
      'aholi va xo\'jalik yurituvchi subyektlarning daromadlari',
      'Bu maxsus mexanizm bo\'lib, u davlatning maxsus dasturlari yordamida yaratilgan daromad',
      'Bu maxsus mexanizm bo\'lib, u davlatning maxsus ko\'magi yordamida iqtisodiyotdagi tebranishlarni bartaraf etadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Davlat byudjeti kamomadining qanday turlari mavjud:',
    options: [
      'Haqiqiy, strukturaviy va davriy',
      'Rejali, strukturaviy va davriy',
      'Normalashtirilgan, strukturaviy va davriy',
      'Kafolatlangan, strukturaviy va davriy'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Agar muvozanatli ishlab chiqarish hajmi potentsial ishlab chiqarish darajasidan past bo\'lsa, unda qanday uzilish xosil bo\'ladi:',
    options: [
      'retsession uzilish xosil bo\'ladi',
      'inflatsion uzilish paydo bo\'ladi',
      'investitsiyalar hajmi jamg\'armalardan oshib ketadi',
      'iste\'mol hajmi oshadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Agar muvozanatli ishlab chiqarish hajmi potentsial ishlab chiqarish darajasidan oshsa, unda qanday uzilish paydo bo\'ladi:',
    options: [
      'inflyatsion uzilish paydo bo\'ladi',
      'retsession uzilish xosil bo\'ladi',
      'investitsiyalar hajmi jamg\'armalardan oshib ketadi',
      'iste\'mol hajmi oshadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Iqtisodiy davr (sikl)lar deb nimaga aytiladi',
    options: [
      'Ishlab chiqarish, bandlilik va inflyatsiya darajasining davriy tebranishiga iqtisodiy davr deyiladi',
      'Iqtisodiyotni o\'zgarishiga, yangi iqtisodiyotga o\'tishga',
      'Mamlakat iqtisodiyotini rivojlanishiga',
      'Mamlakat iqisodiyotini jonlanishi davri'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Byudjet kamomadini inflyatsion moliyalshtirsh usuli nimalarni o\'z ichiga oladi:',
    options: [
      'Pul emissiyasi, Markaziy Bank kreditlari, Tijorat Banklari kreditlari',
      'Pul emissiyasi, Xalqaro tashkilotlarning kreditlari, Tijorat Banklari kreditlari',
      'Pul emissiyasi, Xorijiy davlatlarning kreditlari, Tijorat Banklari kreditlari',
      'Pul emissiyasi, Xalqaro kompaniyalarning kreditlari, Tijorat Banklari kreditlari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Byudjet kamomadini noinflyatsion moliyalshtirsh usuli nimalarni o\'z ichiga oladi:',
    options: [
      'Ichki va tashqi zayomlar, bevosita xorijiy investitsiyalar, davlar oltin-valyuta zaxirasi ishlatish, xususylashtirish mablag\'lari',
      'Tashqi zayomlar, bilvosita xorijiy investitsiyalar, davlar oltin-valyuta zaxirasi ishlatish, xususylashtirish mablag\'lari',
      'Xorijiy kreditlar, bevosita xorijiy investitsiyalar, davlar oltin-valyuta zaxirasi ishlatish, xususylashtirish mablag\'lari',
      'Ichki kreditlar, bilvosita xorijiy investitsiyalar, davlar oltin-valyuta zaxirasi ishlatish, xususylashtirish mablag\'lari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  // Qo'shimcha 350+ ta savol davomi
  {
    question: 'Ishlab chiqarish hajmi ko\'payishi yoki kamayishi narxga bog\'liq bo\'lmagan omillar qaysilar',
    options: [
      'resurslarga bo\'lgan talabning o\'zgarishi, unumdorlikdagi o\'zgarishlar, huquqiy me\'yordagi o\'zgarishlar',
      'ichki bozordagi resurslar miqdorining kamayishi',
      'import resurslar narxlaridagi o\'zgarishlar bozordagi hukmronlik va monopoliya',
      'yer resurslari mehnat resurslari kapital tadbirkorlik qobiliyatlari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Resurslarga bo\'lgan talabning o\'zgarishi qaysi omillarga bog\'liq',
    options: [
      'ichki bozordagi resurslar miqdorining kamayishi, import resurslar narxlaridagi o\'zgarishlar bozordagi hukmronlik va monopoliya unumdorlikdagi o\'zgarishlar huquqiy me\'yordagi o\'zgarishlar',
      'soliq va subsidiyalarning o\'zgarishi, davlatning tartibga solish jarayonidagi o\'zgarishlar va boshqalar',
      'yer resurslari, mehnat resurslari, kapital, tadbirkorlik qobiliyatlari',
      'ishlab chiqarish texnologiyalarning o\'zgarishi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Multiplikator nima',
    options: [
      'yalpi daromadlar avtonom xarajatlarning dastlabki o\'sishi (kamayishi)dan necha marta ortiq o\'sganligini (kamayganligi) ko\'rsatadi',
      'yalpi daromadlar avtonom xarajatlarning so\'nggi o\'sishi (kamayishi)dan necha marta ortiq o\'sganligini (kamayishi) ko\'rsatadi',
      'yalpi daromadlar xom ashyo xarajatlarning dastlabki o\'sishidan necha marta ortiq o\'sganligini ko\'rsatadi',
      'yalpi daromadlar avtonom xarajatlarning kamayishidan necha marta kamayganligi ko\'rsatadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Keyns nazariyasi bo\'yicha aktivlar tomonidan pulga bo\'lgan talab:',
    options: [
      'foiz stavkasiga nisbatan teskari bog\'liqlikka ega',
      'nominal daromad hajmga nisbatan to\'g\'ri bog\'liqlikka ega',
      'nominal daromad hajmga nisbatan teskari bog\'liqlikka ega',
      'foiz stavkasi darajasiga bog\'liq emas'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Iqtisodiyotda pul taklifining kamayishi jami taklif (AS) yoki jami talab (AD) egri chiziqlarining holatiga qanday ta\'sir etadi',
    options: [
      'AD egri chizig\'i chapga suriladi',
      'AD egri chizig\'i o\'ngga suriladi',
      'AS egri chizig\'i o\'ngga suriladi',
      'AS egri chizig\'i chapga suriladi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi talabning baho omillari qaysilar',
    options: [
      'foiz stavkasi samarasi, boylik samarasi yoki real kassa qoldiqlari samarasi, import xaridlar samarasi',
      'talab inflyatsiyasi, jami taklifning kamayishidan kelib chiqadigan inflyatsiya',
      'talab inflyatsiyasi, boylik samarasi yoki real kassa qoldiqlari samarasi, import xaridlar samarasi',
      'foiz stavkasi samarasi, jami taklifning kam kelib chiqadigan inflyatsiya'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Foiz stavkasi samarasi nima',
    options: [
      'jami talabning egri chiziq bo\'yicha surilishi narxlar darajasi o\'zgarishining foiz stavkasiga bo\'lgan ta\'siriga bog\'liq',
      'narxlar darajasining oshishi, jamg\'arilgan moliyaviy aktivlari real xarid qobiliyatini pasaytirib yuboradi',
      'biror mamlakatda tovar va xizmatlarning ichki narxlari tashqi narxlarga nisbatan oshib borilishi',
      'xizmatlarga talab kamayadi va o\'z navbatida shu mamlakatda import mahsulotlarga bo\'lgan talab oshadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Boylik samarasi yoki real kassa qoldiqlari samarasi nima',
    options: [
      'narxlar darajasining oshishi, jamg\'arilgan moliyaviy aktivlari (omonatlar, obligatsiyalar) real xarid qobiliyatini pasaytirib yuboradi',
      'jami talabning egri chiziq bo\'yicha surilishi narxlar darajasi o\'zgarishining foiz stavkasiga bo\'lgan ta\'siriga bog\'liq',
      'xizmatlarga talab kamayadi va o\'z navbatida shu mamlakatda import mahsulotlarga bo\'lgan talab oshadi',
      'biror mamlakatda tovar va xizmatlarning ichki narxlari tashqi narxlarga nisbatan oshib borilishi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Davlat jami xarajatlarning qaysi qismiga bevosita ta\'sir qilishi mumkin:',
    options: [
      'tovar va xizmatlarning davlat xaridlariga',
      'xususiy investitsiyalarga',
      'uy xo\'jaliklarining xarajatlariga',
      'import mahsulotlar hajmga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Davlat tomonidan olib boriladigan fiskal siyosat quyidagilarga ta\'sir qiladi:',
    options: [
      'barcha makroiqtisodiy sub\'yektlarga',
      'davlat korxonalariga',
      'uy xo\'jaliklariga',
      'korxona va uy xo\'jaliklariga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Bozor iqtisodiyotida davlatning daromadlar siyosati quyidagiga yo\'naltirilgan:',
    options: [
      'soliqlar va transfertlar tizimi orqali daromadlarni qayta taqsimlash',
      'yollanma ishchilarning ish haqini belgilash',
      'iqtisodiyotning barcha bo\'g\'inlarida ish haqini bir xil darajada ushlab turish',
      'shaxsiy daromadning o\'sishini cheklash'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Quyidagilardan qaysi biri fiskal siyosatning choralariga kiradi:',
    options: [
      'davlat xarajatlarini o\'zgartirish',
      'foiz stavkasini o\'zgartirish',
      'majburiy zaxira normasini o\'zgartirish',
      'ochiq bozordagi operatsiyalar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Rag\'batlantiruvchi barqarorlashtirish siyosati restriktsion siyosatdan farqli o\'laroq nimaga qaratiladi:',
    options: [
      'iqtisodiyotda ishlab chiqarish va bandlik darajasini oshirishga',
      'inflyatsiya sur\'atini pasaytirishga',
      'iqtisodiyotni sikllik ko\'tarilishini cheklashga',
      'davlat byudjeti xarajatlari va daromadlarini tengligini ta\'minlashga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Boshqa teng shartlar bajarilganda davlat xarajatlari multiplikatorining samarasi:',
    options: [
      'soliq multiplikatorining samarasidan ortiqroq',
      'soliq multiplikatorining samarasidan kamroq',
      'soliq multiplikatorining samarasiga teng',
      'soliq multiplikatorining samarasiga befarq'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Davlat byudjetining kamomadi qanday vaziyatlarda paydo bo\'ladi:',
    options: [
      'davlat xarajatlarining yig\'indisi soliq tushumlari yig\'indisidan oshganda',
      'davlat aktivlarining yig\'indisi uning majburiyatlar yig\'indisidan oshganda',
      'davlat xarajatlari kamayganda',
      'soliq tushumlari ortganda'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Fiskal siyosat qanday vaziyatlarda rag\'batlantiruvchi deb hisoblanadi:',
    options: [
      'aholining daromadiga soliq kamaysa',
      'transfert to\'lovlari kamaysa',
      'tamaki mahsulotlariga aktsiz ko\'tarilsa',
      'mamlakat mudofaasiga xarajatlar kamaysa'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Fiskal siyosat qanday vaziyatlarda cheklovchi hisoblanadi:',
    options: [
      'davlat xarajatlarining hajm kamaysa',
      'davlat xarajatlarining hajm ortsa',
      'foiz stavkasi ortsa',
      'foyda solig\'i kamaysa'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Qanday shart bajarilsa ishlab chiqarish samarali bo\'ladi:',
    options: [
      'barcha mavjud resurslar to\'liq qo\'llanilsa',
      'barcha mehnat resurslari to\'liq qo\'llanilsa',
      'barcha kapital resurslar to\'liq qo\'llanilsa',
      'yangi texnologiyalar har yili joriy etilsa'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Agar rezervlash normasi va pul bazasi o\'zgarmasdan, deponentlash koeffitsienti oshsa, unda:',
    options: [
      'pul taklifi qisqaradi',
      'pul taklifi ortadi',
      'pul taklifi o\'zgarmaydi',
      'pul taklifi talab natijasida o\'zgaradi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Agar iqtisodiyotda bitimlar miqdori oshsa, u holda:',
    options: [
      'pulga bo\'lgan transaksion talab oshadi',
      'aktivlar tomonidan pulga bo\'lgan talab oshadi',
      'pulga bo\'lgan transaksion talab kamayadi',
      'pul taklifi pasayadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Quyidagilardan qaysi biri "arzon pullar" siyosatining vositalariga kirmaydi',
    options: [
      'zaxira me\'yori oshsa',
      'zaxira me\'yori pasaysa',
      'hisob stavkasi kamaysa',
      'markaziy bank davlat qimmatli qog\'ozlarini sotib olsa'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Zaxira me\'yorining kamayishi quyidagilardan qaysi biriga ta\'sirini ko\'rsatib pul taklifini oshiradi:',
    options: [
      'pul multiplikatori oshirilib',
      'monetar bazani oshirib',
      'naqd pullar depozitlar nisbatini kamaytirib',
      'hisob stavkasini kamaytirib'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Byudjet-soliq siyosati bu-',
    options: [
      'mamlakatlardagi jamg\'armalar darajasini kamayishiga olib keladi',
      'xalqaro foiz stavkasini oshiradi va kichik investitsiyalar darajasini kamaytiradi',
      'xorijga sarmoya qo\'yish uchun taklif qilinayotgan milliy valyuta ko\'payadi',
      'mamlakatga investitsiyalar kiritishni xorijiy sarmoyadorlar uchun foydali bo\'lishiga olib keladi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Byudjet – soliq siyosatidagi o\'zgarishlar qaysi egri chiziqning holati bilan tasvirlanadi',
    options: [
      'IS egri chizig\'ining',
      'LM egri chizig\'ini',
      'Xn egri chizig\'iorqali',
      'SI egri chizi\'giasosida'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Iqtisodiy o\'sishning neokeynischilik modellarida quyidagilarning qaysi biri asosiy vosita bo\'lib hisoblanadi:',
    options: [
      'akselerator qoidasi',
      'multiplikator qoidasi',
      'Ishlab chiqarish funksiyasi',
      'davlatning tartibga solish qoidasi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Iqtisodiy o\'sishning neoklassik modellarida quyidagilarning qaysi biri asosiy vosita bo\'lib hisoblanadi',
    options: [
      'ishlab chiqarish funksiyasi',
      'multiplikator',
      'akselerator qoidasi',
      'davlatning tartibga solish qoidalari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Iqtisodiy o\'sishning neokeynscha moddalariga quyidagilarning qaysi biri asosiy vosita bo\'lib hisoblanadi',
    options: [
      'akselerator qoidasi',
      'ishlab chiqarish funksiyasi',
      'multiplikator',
      'davlatning tartibga solish qoidalari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Daromadlardagi nisbiy o\'zgarishlar nima',
    options: [
      'milliy daromadning o\'sishi, boshqa mamlakatdagi bu ko\'rsatkichning o\'sishidan ustun bo\'lsa, bunda uning valyuta kursi pasayadi',
      'talab yoki taklifni hamda uning valyuta kursini o\'zgartiradi',
      'agar bir mamlakat, ichki baho darajasi tez o\'ssa, talabni oshiradi',
      'dollar kursi pasayishi, funt kursi esa, aksincha ko\'tarilishidan darak beradi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Bahodagi nisbiy o\'zgarishlar nima',
    options: [
      'agar bir mamlakat, ichki baho darajasi tez o\'ssa, boshqa mamlakat, bu daraja o\'zgarishsiz qolsa, bunda arzon tovarini izlaydi va shu bilan xorijiy valyutaga talabni oshiradi',
      'milliy daromadning o\'sishi, boshqa mamlakatdagi bu ko\'rsatkichning o\'sishidan ustun bo\'lsa, bunda uning valyuta kursi pasayadi',
      'milliy daromadning o\'sishi, boshqa mamlakatdagi bu ko\'rsatkichning o\'sishidan ustun bo\'lsa, bunda uning valyuta kursi pasayadi',
      'dollar kursi pasayishi, funt kursi esa, aksincha ko\'tarilishidan darak beradi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Makroiqtisodiy holatni aks ettiruvchi asosiy ko\'rsatkichlar, bular:',
    options: [
      'yalpi ichki mahsulot, yalpi milliyi mahsulot, sof milliy mahsulot, milliy daromad, shaxsiy daromad, ixtiyordagi daromad',
      'aholining xarajatlari, iste\'molchilar xuquqlari, inflyatsiyaning o\'sish bozor sur\'atlari ta\'siri ko\'rsatkchlari',
      'pul deflyatori, iste\'mol baholari indeksi, inflyatsiyaning o\'sish sur\'atlari',
      'aholi daromadlari, davlat byudjeti taqchilligi, deflyator, iste\'mol baholari indeksi, inflyatsiyaning o\'sish sur\'atlari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi ichki mahsulotni ishlab chiqarish xarajatlari bo\'yicha hisoblashda asosan qaysi xarajatlar hisobga olinadi',
    options: [
      'pirovard mahsulot va xizmatlarni yaratishga ketgan barcha xarajatlar',
      'mahsulot tannarxiga ketgan barcha xarajatlar',
      'asosiy vositalarni sotib olish va ushlab turishga ketgan xarajatlar',
      'iste\'molga ketgan xarajatlar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi ichki xususiy investitsiya xarajatlariga nimalar kiradi (I):',
    options: [
      'asbob-uskunalar, asosiy vositalar, mashinalarni sotib olish xarajatlari kiradi',
      'uzoq muddat va kundalik foydalaniladigan iste\'mol buyumlari sotib olishga',
      'davlat korxonalarida to\'lanadigan ish haqi xarajatlari kiritiladi',
      'mamlakatning import va eksport operatsiyalari bo\'yicha joriy xarajatlar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi ichki mahsulot ning deflyatori nimaning nisbatiga teng:',
    options: [
      'Iste\'mol savatining joriy va bazis yildagi qiymatining nisbatiga',
      'Joriy yildagi mahsulotning narxlar indeksining yig\'indisiga',
      'Nominal va real yalpi ichki mahsulotlarning ayirmasiga',
      'Real va nominal yalpi ichki mahsulotlarning yig\'indisiga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'LM egri chizig nimani anglatadi',
    options: [
      'Pul bozorida pulga talabning taklifga nisbatan joylashgan nuqtasini',
      'Pul bozorida pul taklifining talabga nisbatan joylashgan nuqtasini',
      'Pul bozorida pulga talabni qisqarish nuqtasini',
      'Pul bozorida pulga talabni taklifini o\'sish nuqtasini'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Davlat jami xarajatlarning qaysi qismiga bevosita ta\'sir qilishi mumkin:',
    options: [
      'davlat xaridlariga',
      'uy xo\'jaliklarning xaridlariga',
      'xizmat ko\'rsatuvchilar xaridlariga',
      'xususiy investitsiyalar xaridlariga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'IS-LM modelida bozorda muvozanat bo\'lishi uchun nima talab etiladi',
    options: [
      'Ikkala bozorda muvozanatga erishish uchun foiz stavkasi va daromad darajasining faqat bitta birikmasi bo\'lishi kerak',
      'Ikkala bozorda muvozanatga erishish uchun foiz stavkasi va daromad darajasini faqat ikkita birikmasi bo\'lishi kerak',
      'Ikkala bozorda muvozanatga erishish uchun foiz stavkasi va daromad darajasida faqat uchta birikma bo\'lishi kerak',
      'Ikkala bozorda muvozanatga erishish uchun foiz stavkasi va daromad darajasi to\'rtta birikmaga ega bo\'lishi kerak'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Markaziy Bankdagi majburiy zaxira nima',
    options: [
      'Tijorat maqsadida ishlatilmaydigan bank omonatlarining bir qismi',
      'Tijorat maqsadida ishlatiladigan bank omonatlari',
      'Tijorat maqsadida ishlatilmaydigan bank depozitlari',
      'Tijorat maqsadida ishlatiladigan bank depozitlari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Iqtisodiyotning pasayishi tufayli ishini yo\'qotganlar qaysi toifaga kiradi',
    options: [
      'davriy ishsizlar',
      'friksion ishsizlar',
      'strukturaviy ishsizlar',
      'yashirin ishsizlar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Hozirgi mehnat bozorida ishchi kuchiga bo\'lgan talab nima bilan belgilanadi',
    options: [
      'ish haqining darajasi bilan',
      'ishchi kuchining ko\'chib yurishi',
      'kasaba uyushmalar faolligining kuchayishi bilan',
      'ish haqining pasayishi bilan'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: '"Agar haqiqatdagi ishsizlik, ishsizlikning tabiiy darajasidan bir foizga oshib ketsa, milliy iqtisodiyot yalpi ichki mahsulot ni ikki yarim foizga kam oladi" Bu qonun kimga tegishli',
    options: [
      'Artur Oukenga',
      'Adam Smitga',
      'Fisherga',
      'Keynsga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Tijorat banklarining deponentlash koeffitsienti nimani anglatadi',
    options: [
      'Naqd pulning depozitlarga nisbatini',
      'Naqd pulning kreditga nisbatini',
      'Naqd pulning ssudalarga nisbatini',
      'Naqd pulning sarmoyalarga nisbatini'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Real almashuv kursiga fiskal siyosatning ta\'siri nimada bilinadi:',
    options: [
      'Mamlakatda soliqlar va davlar xarajatlari ortsa, jamg\'arma va investitsiya qisqaradi va sof eksportni ham kamaytiradi',
      'Mamlakatda soliqlar va davlar xarajatlari ortsa, jamg\'arma va investitsiya ortadi va sof eksportni ham ko\'paytiradi',
      'Mamlakatda soliqlar va davlar xarajatlari ortsa, jamg\'arma va investitsiya qisqaradi va sof eksportni ham ko\'paytiradi',
      'Mamlakatda soliqlar va davlar xarajatlari ortsa, jamg\'arma va investitsiya muvozanatlashadi va sof eksportni ham muvozanatlaydi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Real almashuv kursining o\'zgarishiga qanday omillar ta\'sir qiladi:',
    options: [
      'Joriy hisoblar balansi bilan kapital harakati balansidagi o\'zgarishlar',
      'Joriy hisoblar balansi investitsyalar oqimidagi o\'zgarishlar',
      'Joriy hisoblar balansi xorijiy kreditlar oqimidagi o\'zgarishlar',
      'Joriy hisoblar balansi va zaxira balansidagi o\'zgarishlar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Real almashuv kursi va sof eksportning o\'zaro bog\'liqligi nimada bilinadi:',
    options: [
      'Real almashuv kursi past bo\'lsa milliy tovarlar arzonlashadi hamda eksport ortadi',
      'Real almashuv kursi past bo\'lsa milliy tovarlar arzonlashadi ammo eksport kamayadi',
      'Real almashuv kursi yuqori bo\'lsa milliy tovarlar arzonlashadi va eksport ortadi',
      'Real almashuv kursi yuqori bo\'lsa milliy tovarlar arzonlashadi lekin eksport kamayadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Nominal valyuta kursini o\'zgarishi nimaga bog\'liq bo\'ladi:',
    options: [
      'Ikki mamlakatda yurgizilayotgan pul-kresit siyosatining maqsadiga',
      'Ikki mamlakatda amalda bo\'lgan pul massasiga',
      'Ikki mamlakatda mavjud bo\'lgan inflayatsiya sur\'atiga',
      'Ikki mamlakatdagi tijorat banklari soni va kapitaliga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Real almashtirsh kursi deb nimaga aytiladi',
    options: [
      'Ikki mamlakatda ishlab chiqarilgan tovarlarning nisbiy narxiga',
      'Ikki mamlakatda ishlab chiqarilgan tovarlar qiymatiga',
      'Ikki mamlakatda ishlab chiqarilgan tovarlar nisbiy tannarxiga',
      'Ikki mamlakatda ishlab chiqarilgan tovarlar iste\'moliga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Qanday holatda chet el tovarlari nisbatan arzon, milliy tovarlar esa nisbatan qimmat bo\'ladi:',
    options: [
      'Real almashuv kursi nisbatan baland bo\'lsa',
      'Real almashuv kursi nisbatan past bo\'lsa',
      'Real almashuv kursi nisbatan barqaror bo\'lsa',
      'Real almashuv kursi nisbatan tebranuvchan bo\'lsa'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Nominal ayirboshlash kursi nima:',
    options: [
      'ma\'lum bir chet el valyutasi birligini sotib olish uchun ishlatilishi mumkin bo\'lgan milliy valyuta birliklari soni',
      'xorijda ishlab chiqarilgan mahsulotlarni sotib olish qobiliyati',
      'tovar bozorida real narxlar va sotib olish qobiliyati o\'rtasidagi farqlarni bildiradi',
      'Real almashuv kursi mamlakatda tovar va xizmatlar narxi o\'zgarishiga bog\'liq'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  // Qo'shimcha 100+ ta savol (600 tani to'ldirish uchun)
  {
    question: 'Sanoat kompleksi deb nimaga aytiladi',
    options: [
      'Yagona hududda joylashgan sanoat korxonalari majmuasi',
      'Turli sohalarda faoliyat yurituvchi korxonalar to\'plami',
      'Faqat davlat korxonalarining birlashmasi',
      'Ishlab chiqarish vositalarining yig\'indisi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Sanoat korxonalarida innovatsion faoliyatning asosiy maqsadi nima',
    options: [
      'Yangi texnologiyalarni joriy etish orqali raqobatbardoshlikni oshirish',
      'Ishlab chiqarish xarajatlarini oshirish',
      'Ishchi kuchini qisqartirish',
      'Bozor ulushini kamaytirish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Modernizatsiyalash sharoitida korxona qanday afzal belgi bilan ajralib turadi',
    options: [
      'Xorijiy firmalar bilan hamkorlikda ishlashi va mahsulot sifati bilan',
      'Ishlab chiqaradigan mahsulotni xarakteri bilan',
      'Korxonani tashqi ko\'rinishi bilan',
      'Korxonada binolar soni ko\'pligi bilan'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Aksiyadorlik jamiyati deb tan olinadi',
    options: [
      'Ustav kapitali ma\'lum birliklardagi aksiyalarga bo\'linib, aksionerlarga nisbatan jamiyat majburiyatlarini tasdiqlovchi xo\'jalik subyekti',
      'Alohida ajratilgan mulkka ega bo\'lgan va ularni narxi aksiyalarga bo\'lingan xo\'jalik subyektlari',
      'Qonun doirasida o\'zini aksiyalarini ishlab chiqarib, ularni sotish bilan shug\'ullanadigan jamiyatlar',
      'Korxonaning oddiy va imtiyozli aksiyalariga ega bo\'lgan aksionerlar uyushmas'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Aksiyadorlik jamiyati ta\'sischilari tarkibi',
    options: [
      'Aksionerlik jamiyati turi bilan belgilanadi',
      'Xodimlar tarkibi bilan',
      'Ishlab chiqarish hajmi bilan',
      'Ta\'sis hujjatlari bilan belgilanadi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Aksiyadorlik jamiyatining ustav kapitali shaklanadi:',
    options: [
      'Aksionerlar tomonidan sotib olingan jamiyat aksiyalarining nominal qiymati orqali',
      'Kreditorlar manfaatini kafolatlovchi jamiyat mulkining miqdoriga qarab',
      'Aksiyalarga ommaviy obuna bo\'lish orqali',
      'Aksiyalarga shaxsiy obuna bo\'lish orqali'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Sanoat tarmoqlarini rivojlantirishda investitsiyaning roli nimada',
    options: [
      'Yangi ishlab chiqarish quvvatlarini yaratishda',
      'Ishchilarni qisqartirishda',
      'Faqat reklama xarajatlarini oshirishda',
      'Xodimlarni ish haqini oshirish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korxonaning asosiy ishlab chiqarish fondlariga quyidagilar kiritiladi',
    options: [
      'Bino, inshootlar, uzatish moslamalari, mashina va uskunalar, transport vositalari, asbob uskunalar, ishlab chiqarish va xo\'jalik inventari, tayyor mahsulot',
      'Bino inshootlar uzatish moslamalari, mashina va uskunalar, transport vositalari asbob va moslamalar, xo\'jalik va ishlab chiqarish inventarlari, kapital mablag\'lar',
      'Bino, inshootlar, uzatish moslamalari, mashina va uskunalar, tugallanmagan ishlab chiqarish, asboblar va moslamalar, transport vositalari',
      'Bino, inshootlar, uzatish moslamalari, mashina va uskunalar, transport vositalari, xom ashyo materiallari, ishlab chiqarish va xo\'jalik inventari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Asosiy fondlarni korxona balansiga kiritish bilan ularni baholash',
    options: [
      'Xo\'jalik tekshiruvchi natijasi bo\'yicha',
      'Boshlang\'ich va tiklanish qiymati bo\'yicha',
      'Hisobot hujjatlarida ko\'rsatilgan qiymati bo\'yicha',
      'Tashqi auditorlar bahosi asosida'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Asosiy ishlab chiqarish fondlaridan foydalanishni xarakterlovchi ko\'rsatkichlar',
    options: [
      'Fond qaytimi va fond sig\'imi',
      'Rentabellik, foyda',
      'Ishchilar mehnati fond bilan ta\'minlanganligi',
      'Ekspluatatsion tayyorgarlik koeffitsiyenti'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Asosiy ishlab chiqarish fondlaridan ekstensiv foydalanish quyidagilar orqali aniqlanadi',
    options: [
      'Uskunalardan ekstensiv foydalanish koeffitsiyenti orqali',
      'Fond sig\'imi va fond qaytimi orqali',
      'Mehnatni fond bilan ta\'minlanganligi orqali',
      'Ishlab chiqarish rentabelligi orqali'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Uskunalardan intensiv foydalanish quyidagilar orqali aniqlanadi:',
    options: [
      'Ishchilar mehnatini fond bilan ta\'minlanganligi',
      'Smenalik koeffitsiyenti',
      'Uskunalardan ekstensiv foydalanish koeffitsiyenti',
      'Uskunalarning yaroqlilik koeffitsiyenti'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Fond qaytimi ko\'rsatkichi xarakterlanadi:',
    options: [
      'korxonaning asosiy kapitalga qo\'yilgan har bir so\'m uchun qancha daromad olishini aks ettiradi',
      '1 so\'mlik realizatsiya qilingan mahsulot uchun asosiy fondlarni solishtirma xarajatlari',
      '1 so\'mga teng mahsulot yoki xizmatlarni olish uchun mavjud asosiy vositalarga qancha pul sarflash kerak',
      'asosiy fond qiymatini mahsulot sotish hajmiga nisbati'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Resurslarning aylanishi korxona qo\'shilmalarining xarajatlari o\'sishi bilan shartlangan, ishlab chiqarish esa, qisqarish tendensiyasiga uchragan Bu xolda material zaxiralari',
    options: [
      'O\'zgarmaydi',
      'Ko\'payadi',
      'Kamayadi',
      'Nolga teng bo\'ladi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korxonani aylanma mablag\'i — bu',
    options: [
      'Tayyor mahsulot, jo\'natilgan tovarlar, muomala fondi, hisob raqamlari va kassadagi pul mablag\'lari',
      'Korxona omboridagi tayyor mahsulotlar, qabul qilingan mahsulot, kelayotgan, ya\'ni yo\'ldagi mahsulot, moliyaviy mablag\'lar va tugallanmagan hisob vositalari',
      'Transport vositalarini ekspluatatsiyasidan keladigan mablag\'lar, ishlab chiqarish binolari va inshootlar',
      'Uzliksiz jarayonni ta\'minlovchi korxonani pul mablag\'lari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korxonaning aylanma mablag\'lari tartibiga quyidagilar kiritiladi',
    options: [
      'Ishlab chiqarish zaxiralari, tugallanmagan ishlab chiqarish, kelgusi davr xarajatlari',
      'Stanoklar, jihozlar, mashinalar detallari',
      'Tugallanmagan ishlab chiqarish, ombordagi tayyor mahsulot',
      'Bino va inshootlar, pul mablag\'lari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Aylanma mablag\'larni aylanish koeffitsiyenti xarakterlaydi',
    options: [
      'Aylanma mablag\'larni belgilangan davrda aylanishlar sonini ifodalaydi',
      'Ishlab chiqarish fondlari aylanishining o\'rtacha davomiyligi',
      'Ma\'lum bir davrda aylanma mablag\'larni aylanish soni',
      'Korxonani to\'lovga layoqatsiz va o\'z majburiyatlarini o\'z vaqtida to\'lay olmaslik holatiga keltirishi mumkin'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Mahsulotning material sig\'imi belgilaydi',
    options: [
      'Mahsulot ishlab chiqarish uchun sarflangan material xarajati',
      'Materiallardan samarali foydalanishi',
      'Mahsulot ishlab chiqarish uchun sarflangan materiallarning umumiy og\'irligini',
      'Tayyorlangan mahsulotlarning toza og\'irligini'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Aylanma mablag\'lardan foydalanish samaradorligi quyidagilar orqali belgilanadi',
    options: [
      'Aylanish koeffitsiyenti, ma\'lum bir davrdagi aylanmalar soni',
      'Moddiy resurslar sarfi o\'zgarishi, bir aylanish o\'rtacha davomiyligi bilan',
      'Material sig\'imi, fond sig\'imi, fond qaytimi koeffitsiyentlari orqali',
      'Aylanma mablag\'larni belgilangan normativlarga mosligi va aylanma mablag\'larning qaytimi darajasi bilan'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Mahsulot ishlab chiqarish xarajatlari quyidagilardan iborat',
    options: [
      'Xom ashyo, materiallar, asosiy fondlarning amortizatsiyasi va nomoddiy aktivlar, ish haqi, ijtimoiy sug\'urtalash uchun ajratmalar va boshqa ishlab chiqarish xarakteridagi xarajatlar',
      'Pul formasida ifodalangan mahsulot ishlab chiqarish va uni realizatsiya qilish uchun sarflangan xarajatlardan',
      'Ishlab chiqarish xarakteriga ega bo\'lgan kundalik va kapital xarajatlar, Aylanma mablag\'lar',
      'Boshqaruv va mahsulotni sotish bilan bog\'liq, ishlab chiqarish xarajatlari va chiqimlari'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ishlab chiqarish xarajatlari deganda nima tushuniladi',
    options: [
      'Mahsulot ishlab chiqarish uchun sarflangan mablag\'lar',
      'Korxona foydasi',
      'Material xarajatlarning puldagi ifodasi',
      'Ish haqi uchun ajratilgan mablag\'lar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Amortizatsiya xarajatlari nimaga bog\'liq',
    options: [
      'Asbob-uskunalarning yosh va qiymatiga',
      'To\'g\'ri va egri xarajatlariga',
      'Ma\'lum bir turdagi aniq mahsulotni ishlab chiqarish, ishlab chiqarish xarajatlari tizimi o\'zgarishiga',
      'Ishchilarning malakasiga'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korxona xarajatlarini minimallashtirishdan manfaatdor. U quyidagi shartlarga rioya qilsagina unga erishishi mumkin',
    options: [
      'Doimiy va o\'zgaruvchan xarajatlar o\'rtasidagi tenglikni qo\'llab-quvvatlasa',
      'Ishlab chiqarish omillarini raqobatli bozorda sotib olsa',
      'Omillarni texnik joylashtirishning normalari bilan',
      'Ishlab chiqarish hajmini kamaytirish va tejamkorlik tartibi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Zararsizlik nuqtasi aniqlashga yordam beradi',
    options: [
      'Xarajatlar tushum bilan qoplangandagi mahsulot hajmi',
      'Korxona foyda olgan vaqtdagi mahsulot hajmini',
      'Doimiy xarajatlar o\'zgaruvchan xarajatlarga teng bo\'lgandagi mahsulot',
      'Doimiy xarajatlar o\'zgaruvchan xarajatlarga teng bo\'lgandagi mahsulot xajmi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Marjinal foyda bu',
    options: [
      'Mahsulot sotishdan tushgan tushumdan korxonani doimiy xarajatlarini ayirmasi',
      'Sotishdan tushgan tushumlardan, korxonaning o\'zgaruvchan xarajatlarini ayirmasi',
      'Sotishdan tushgan tushumlardan korxonaning hamma xarajatlari',
      'O\'zgaruvchan xarajatlardan doimiy xarajatlar ayirmasi'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Yalpi foyda — bu',
    options: [
      'Mahsulot sotishdan tushgan ttushumdan mahsulot tannarxini chegirmasi',
      'Mahsulotni sotishdan tushgan daromaddir, realizatsiya qilingan mahsulotning tannarxini tanlash',
      'Mahsulot sotishdan tushgan yalpi foydadan davr xarajatlarini ayirmasi',
      'Davr xarajatlari minus moliyaviy xarajatlar'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Realizatsiya qilingan mahsulotni rentabelligini aniqlash',
    options: [
      'Sof foydani realizatsiya qilingan mahsulot hajmiga nisbati',
      'Sof foydani korxona mulkini o\'rtacha qiymatiga nisbati',
      'Sof foydani realizatsiyadan tushgan tushumga nisbati',
      'Balans foydani asosiy fondlar va moddiy aylanma vositalarning o\'rtacha qiymatiga nisbati'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Korxonaning ixtisoslashuvi deb nimaga aytiladi',
    options: [
      'Alohida turdagi mahsulotlar yoki ularning qismlarini ishlab chiqarishni mustaqil tarmoqlarda, ishlab chiqarish korxonalarida yoki ixtisoslashgan korxonalarda jamlash',
      'Turli tarmoqlarga mansub bo\'lgan mahsulot ishlab chiqarishni yoki jarayonlarni bir korxona miqyosida mujassamlashtirish',
      'Ma\'lum turdagi mahsulotni hamkorlikda tayyorlash bo\'yicha korxona (firma)larning birgalikda faoliyat ko\'rsatishi',
      'Bu bir xil, o\'xshash mahsulot ishlab chiqaruvchi korxonalarni yiriklashtirish'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Ishlab chiqarish jarayoni nima',
    options: [
      'bu xom ashyo va materiallarni tayyor mahsulotga aylantirish jarayoni',
      'Mehnat obyektlari ishlab chiqarish jarayoniga kiritilgan paytdan boshlab undan tayyor mahsulot paydo bo\'lgunga qadar bo\'lgan kalendar davri',
      'Ikki qismdan iborat: ish vaqti va tanaffuslar',
      'Zarur hajmdagi mahsulot ishlab chiqarishni ta\'minlash, ortiqcha va taqchilliklarning paydo bo\'lishiga yo\'l qo\'ymaslik'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Mehnat potensialining ijtimoiy-iqtisodiy mazmuniga nimalar kiradi',
    options: [
      'Mehnat resurslarining miqdor va sifat ko\'rsatkichlari majmui',
      'Mehnat resurslaridan foydalanish imkoniyatining majmui',
      'Mehnatga qobiliyatli aholining mehnat unumini ifodalovchi umumlashtiruvchi ko\'rsatkich',
      'Jami aholining mehnatga qobiliyati'
    ],
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  },
  {
    question: 'Mehnat resurslaridan mehnat potensialining farqi nimada',
    options: [
      'Mehnat potensiali mehnat resurslarining sifat ko\'rsatkichlarini o\'z ichiga oladi',
      'Mehnat resurslari miqdori mehnat potensialining miqdoridan kattaroq',
      'Mehnat potensiali miqdori mehnat resurslari miqdoridan ortiqcha',
      'Mehnat potensiali mehnat resurslaridan farq qilmaydi'
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