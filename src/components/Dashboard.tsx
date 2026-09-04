import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from 'framer-motion';
import {
    Menu,
    ChevronRight,
    ArrowRight,
    Utensils,
    Sparkles,
    Star,
    Palmtree,
    Waves,
    Moon,
    Sun,
    Clock,
    Home,
    Tent,
    MapPin,
    Phone,
    Instagram,
    PartyPopper,
    X,
    Users,
    Quote
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { SmartConcierge } from './SmartConcierge';
import { JungleConnect } from './JungleConnect';
import { DigitalMenu } from './DigitalMenu';
import { BungalowBooking } from './BungalowBooking';
import { NightSkyMap } from './NightSkyMap';
import { FunPlay } from './FunPlay';
import { ParkHours } from './ParkHours';
import { CateringPartyservice } from './CateringPartyservice';
import { ExperienceShowcase } from './ExperienceShowcase';
const bungalowImg = '/assets/natura/bugalow.webp';
const restaurantImg = '/assets/natura/Jungle restaurant.webp';
const cateringImg = '/assets/natura/Jungle restaurant.webp';
const tentDayImg = '/assets/natura/berber tent at day.webp';
const lamaImg = '/assets/natura/animal circuit Lama.webp';
const poolImg = '/assets/natura/pool.webp';
const skyViewImg = '/assets/natura/gaming space/DSC03228.webp';
const packDayImg = '/assets/natura/WhatsApp Image 2026-02-13 at 13.42.27.webp';

export interface DashboardProps {
    language: 'en' | 'fr' | 'ar';
    setLanguage: (lang: 'en' | 'fr' | 'ar') => void;
    isNightMode: boolean;
    toggleNightMode: () => void;
}

export const Dashboard = ({ language: currentLanguage, setLanguage, isNightMode, toggleNightMode }: DashboardProps) => {
    const isRTL = currentLanguage === 'ar';
    const [currentView, setCurrentView] = useState<'base' | 'menu' | 'booking' | 'stargazer' | 'exhibition' | 'fun' | 'hours' | 'catering' | 'teambuilding' | 'school' | 'experience' | 'circuit-map'>('base');
    const [activeExperience, setActiveExperience] = useState<string | null>(null);
    const [hasBooked, setHasBooked] = useState(false);

    const [showPricing, setShowPricing] = useState(false);

    // Carousel State & Logic
    const [isDragging, setIsDragging] = useState(false);
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [baseWidth, setBaseWidth] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Body Scroll Lock
    useEffect(() => {
        if (currentView !== 'base' || isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [currentView, isMenuOpen]);

    const translations = {
        en: {
            brand: "Natura Jungle",
            tagline: "Nature's Sanctuary",
            explore: "Experience Zones",
            map_title: "The Animal Circuit",
            map_status: "Live Tracking",
            kitchen: "In-Place Order",
            kitchen_status: "Kitchen Open",
            kitchen_wait: "Est. Prep: 25 mins",
            kitchen_desc: "Relax in your tent or by the pool. Place your order, confirm it, and we'll notify you when it's ready for pickup.",
            order_btn: "Start Your Order",
            about_title: "Breathe in Nature | Natura Jungle Park",
            about_text: "Escape the city buzz and reconnect with nature at Natura Jungle Park—a serene eco-sanctuary just moments from Casablanca and Rabat.",
            bundles: [
                { id: 1, title: "Jungle Bungalow", sub: "Luxury Stays", color: "from-[#1a2f1a] to-[#0b1d12]", icon: Home, image: bungalowImg, action: () => { setActiveExperience('bungalow'); setCurrentView('experience'); } },
                { id: 2, title: "Jungle Restaurant", sub: "Fine Dining", color: "from-[#3d5a45] to-[#0b1d12]", icon: Utensils, image: restaurantImg, action: () => { setActiveExperience('restaurant'); setCurrentView('experience'); } },
                { id: 3, title: "Berber Tents", sub: "Authentic Experience", color: "from-[#a08860] to-[#0b1d12]", icon: Tent, image: tentDayImg, action: () => { setActiveExperience('tents'); setCurrentView('experience'); } },
                { id: 4, title: "Animal Park", sub: "Animal Discovery", color: "from-[#88a070] to-[#0b1d12]", icon: Palmtree, image: lamaImg, action: () => { setActiveExperience('park'); setCurrentView('experience'); } },
                { id: 5, title: "Kid's & Equitation", sub: "Family Fun", color: "from-[#c96b4d] to-[#0b1d12]", icon: Sparkles, image: skyViewImg, action: () => { setActiveExperience('kids'); setCurrentView('experience'); } },
                { id: 6, title: "Aqua Jungle", sub: "Poolside Serenity", color: "from-[#1a3a3a] to-[#0b1d12]", icon: Waves, image: poolImg, action: () => { setActiveExperience('pool'); setCurrentView('experience'); } }
            ],
            catering_title: "Catering & Events",
            event_title: "Special Events",
            event_book: "Book Your Special Event",
            kitchen_order: "Open the Menu",
            title: {
                catering: 'Catering & Party',
                teambuilding: 'Team Building & Events',
                school: 'School Trips'
            },
            subtitle: {
                catering: 'Plan your special event with us.',
                teambuilding: 'Organize an unforgettable team experience.',
                school: 'Educational and fun adventures for students, Monday to Friday.'
            },
            packDay: {
                title: "Pricing",
                subtitle: "Discover our rates and packages.",
                button: "View Pricing",
                tag: "Rates"
            },
            navigation: {
                pricing: { title: "Pricing", subtitle: "Plans" },
                bungalow: { title: "Bungalow Jungle", subtitle: "Stay" },
                restaurant: { title: "Restaurant & Menu", subtitle: "Dining" },
                zones: { title: "Experience Zones", subtitle: "Discover" },
                catering: { title: "Catering & Events", subtitle: "Services" },
                teamBuilding: { title: "Team Building", subtitle: "Corporate" },
                school: { title: "School Trips", subtitle: "Education" },
                hours: { title: "Opening Hours", subtitle: "Time" },
                animals: { title: "Circuit", subtitle: "Animals" },
                map: { title: "Park Map", subtitle: "Location" }
            },
            pricingModal: {
                title: "Our Pricing Plans",
                subtitle: "Choose Your Experience",
                parkEntry: {
                    title: "Park Entry",
                    adults: "Adults",
                    kids: "Kids",
                    desc: "Access to animal zones.",
                    offer: "Free cold drink",
                    book: "Book Now"
                },
                footer_hours: "Daily: 10 AM - 8 PM",
                poolAccess: {
                    title: "Pool Area",
                    adults: "Adults",
                    kids: "Kids",
                    desc: "Includes park access. Sunbeds.",
                    book: "Book Now"
                },
                bungalow: {
                    tag: "Best Value",
                    title: "Bungalow Stay",
                    perNight: "Starting From",
                    desc: "Discover our exclusive offers starting from 900 DH per night.",
                    additional: "Click below to view all available packages and book your stay.",
                    poolDesc: "",
                    book: "View Offers"
                },
                activities: {
                    title: "Activities & Leisure",
                    gaming: "Kids Gaming Space",
                    gamingDesc: "Unlimited bracelet access.",
                    poney: "Poney Ride",
                    poneyDesc: "10 minutes of fun ride.",
                    horse: "Horse Ride",
                    horseDesc: "10 minutes equestrian experience.",
                    book: "Book Now"
                },
                noReservationNotice: "Reservations are only required for Bungalow stays and Events. For a visit to Natura Jungle Park, including the pool and activities, you are welcome to visit without a reservation!"
            },
            menu: {
                mission: "Our Mission",
                story: "Our Story",
                contact: "Contact Us",
                mission_text: "Natura Jungle Park is your eco-friendly escape near Casablanca and Rabat. Our mission is to provide every visitor a peaceful environment to enjoy quality time. We believe in protecting nature while creating magical memories for everyone.",
                story_text: "We started Natura Jungle because we love family time and nature. With our expert background in relaxation, we dreamed of a place where everyone can feel at home in nature. Today, that dream is a reality. We offer professional service with a warm, family touch in the heart of the forest."
            },
            topNav: {
                hours: "Hours",
                map: "Map",
                circuit: "Circuit",
                kitchen: "Kitchen",
                theme: "Theme"
            },
            nightSky: {
                tag: "Premium Night Sky",
                title: "Stargazer Guide",
                desc: "Live AR star map for the dark skies over Mansouria.",
                button: "Launch AR View"
            }
        },
        fr: {
            brand: "Natura Jungle",
            tagline: "Respirer la Nature",
            explore: "Exploration Nature",
            map_title: "Circuit",
            map_status: "Suivi en Direct",
            kitchen: "Commande sur Place",
            kitchen_status: "Cuisine Ouverte",
            kitchen_wait: "Prép. estimée: 25 min",
            kitchen_desc: "Détendez-vous dans votre tente ou au bord de la piscine. Passez commande et nous vous préviendrons dès qu'elle est prête.",
            order_btn: "Lancer ma Commande",
            about_title: "Respirez la Nature | Natura Jungle Park",
            about_text: "Évadez-vous de l'agitation urbaine et reconnectez avec la nature au Natura Jungle Park—un sanctuaire écologique serein à quelques pas de Casablanca et Rabat.",
            bundles: [
                { id: 1, title: "Bungalow Jungle", sub: "Séjours de Luxe", color: "from-[#1a2f1a] to-[#0b1d12]", icon: Home, image: bungalowImg, action: () => { setActiveExperience('bungalow'); setCurrentView('experience'); } },
                { id: 2, title: "Restaurant Jungle", sub: "Gastronomie", color: "from-[#3d5a45] to-[#0b1d12]", icon: Utensils, image: restaurantImg, action: () => { setActiveExperience('restaurant'); setCurrentView('experience'); } },
                { id: 3, title: "Tentes Berbères", sub: "Expérience Authentique", color: "from-[#a08860] to-[#0b1d12]", icon: Tent, image: tentDayImg, action: () => { setActiveExperience('tents'); setCurrentView('experience'); } },
                { id: 4, title: "Parc Animalier", sub: "Circuit Animalier", color: "from-[#88a070] to-[#0b1d12]", icon: Palmtree, image: lamaImg, action: () => { setActiveExperience('park'); setCurrentView('experience'); } },
                { id: 5, title: "Enfants & Équitation", sub: "Plaisir en Famille", color: "from-[#c96b4d] to-[#0b1d12]", icon: Sparkles, image: skyViewImg, action: () => { setActiveExperience('kids'); setCurrentView('experience'); } },
                { id: 6, title: "Aqua Jungle", sub: "Sérénité au Bord de l'Eau", color: "from-[#1a3a3a] to-[#0b1d12]", icon: Waves, image: poolImg, action: () => { setActiveExperience('pool'); setCurrentView('experience'); } }
            ],
            catering_title: "Traiteur & Fêtes",
            event_title: "Événements Spéciaux",
            event_book: "Réservez Votre Événement",
            kitchen_order: "Ouvrir le Menu",
            title: {
                catering: 'Traiteur & Fêtes',
                teambuilding: 'Team Building & Événements',
                school: 'Sorties Scolaires'
            },
            subtitle: {
                catering: 'Planifiez votre événement spécial avec nous.',
                teambuilding: 'Organisez une expérience d\'équipe inoubliable.',
                school: 'Aventures éducatives et ludiques pour les écoles, du Lundi au Vendredi.'
            },
            packDay: {
                title: "Tarifs",
                subtitle: "Découvrez nos tarifs et forfaits.",
                button: "Voir les Tarifs",
                tag: "Tarifs"
            },
            navigation: {
                pricing: { title: "Tarifs", subtitle: "Formules" },
                bungalow: { title: "Bungalow Jungle", subtitle: "Séjour" },
                restaurant: { title: "Restaurant & Menu", subtitle: "Repas" },
                zones: { title: "Zones d'Expérience", subtitle: "Découvrir" },
                catering: { title: "Traiteur & Événements", subtitle: "Services" },
                teamBuilding: { title: "Team Building", subtitle: "Entreprise" },
                school: { title: "Sorties Scolaires", subtitle: "Éducation" },
                hours: { title: "Heures d'Ouverture", subtitle: "Horaires" },
                animals: { title: "Circuit", subtitle: "Animaux" },
                map: { title: "Plan du Parc", subtitle: "Localisation" }
            },
            pricingModal: {
                title: "Nos Formules",
                subtitle: "Choisissez Votre Expérience",
                parkEntry: {
                    title: "Entrée Parc",
                    adults: "Adultes",
                    kids: "Enfants",
                    desc: "Accès aux zones animalières.",
                    offer: "Boisson froide offerte",
                    book: "Réserver"
                },
                footer_hours: "Tous les jours : 10h - 20h",
                poolAccess: {
                    title: "Accès Piscine",
                    adults: "Adultes",
                    kids: "Enfants",
                    desc: "Comprend l'accès au parc. Transats.",
                    book: "Réserver"
                },
                bungalow: {
                    tag: "Meilleure Offre",
                    title: "Séjour en Bungalow",
                    perNight: "À partir de",
                    desc: "Découvrez nos offres exclusives à partir de 900 DH par nuit.",
                    additional: "Cliquez ci-dessous pour voir toutes nos formules.",
                    poolDesc: "",
                    book: "Voir les Offres"
                },
                activities: {
                    title: "Activités & Loisirs",
                    gaming: "Espace jeux enfants",
                    gamingDesc: "Bracelet illimité.",
                    poney: "Balade à Poney",
                    poneyDesc: "10 minutes.",
                    horse: "Équitation (Cheval)",
                    horseDesc: "10 minutes.",
                    book: "Réserver"
                },
                noReservationNotice: "Les réservations sont obligatoires uniquement pour les séjours en Bungalow et les Événements. Pour le parc, l'accès piscine et les autres activités, vous êtes les bienvenus sans réservation !"
            },
            menu: {
                mission: "Notre Mission",
                story: "Notre Histoire",
                contact: "Contactez-nous",
                mission_text: "Natura Jungle Park est votre évasion écologique près de Casablanca et Rabat. Notre mission est d'offrir à chaque visiteur un environnement paisible pour profiter de moments de qualité. Nous croyons en la protection de la nature tout en créant des souvenirs magiques pour tous.",
                story_text: "Nous avons créé Natura Jungle car nous aimons les moments en famille et la nature. Forts de notre expertise en relaxation, nous avons rêvé d'un lieu où chacun se sent chez soi en pleine nature. Aujourd'hui, ce rêve est réalité. Nous offrons un service professionnel avec une touche familiale chaleureuse au cœur de la forêt."
            },
            topNav: {
                hours: "Horaires",
                map: "Carte",
                circuit: "Circuit",
                kitchen: "Cuisine",
                theme: "Thème"
            }
        },
        ar: {
            brand: "نطورا جانغل",
            tagline: "تجربة طبيعية لا تُنسى",
            explore: "مناطق الاستكشاف",
            map_title: "مسار الحيوانات",
            map_status: "تتبع مباشر",
            kitchen: "طلب من مكانك",
            kitchen_status: "المطبخ مفتوح",
            kitchen_wait: "وقت التحضير: ٢٥ دقيقة",
            kitchen_desc: "استرخِ في خيمتك أو بجانب المسبح. اطلب، أكد طلبك، وسنخطرك فور جاهزيته لتستلمه وتستمتع به.",
            order_btn: "ابدأ الطلب الآن",
            about_title: "استنشق عبير الطبيعة | منتزه نطورا جانغل",
            about_text: "اهرب من صخب المدينة واكتشف جمال الطبيعة في منتزه ناتورا جانغل—ملاذك البيئي الهادئ على بعد دقائق من الدار البيضاء والرباط.",
            bundles: [
                { id: 1, title: "بناغل الغابة", sub: "إقامات فاخرة", color: "from-[#1a2f1a] to-[#0b1d12]", icon: Home, image: bungalowImg, action: () => { setActiveExperience('bungalow'); setCurrentView('experience'); } },
                { id: 2, title: "مطعم الغابة", sub: "أرقى المأكولات", color: "from-[#3d5a45] to-[#0b1d12]", icon: Utensils, image: restaurantImg, action: () => { setActiveExperience('restaurant'); setCurrentView('experience'); } },
                { id: 3, title: "خيام بربرية", sub: "أصالة وراحة", color: "from-[#a08860] to-[#0b1d12]", icon: Tent, image: tentDayImg, action: () => { setActiveExperience('tents'); setCurrentView('experience'); } },
                { id: 4, title: "حديقة الحيوان", sub: "مسار الطبيعة", color: "from-[#88a070] to-[#0b1d12]", icon: Palmtree, image: lamaImg, action: () => { setActiveExperience('park'); setCurrentView('experience'); } },
                { id: 5, title: "الأطفال والفروسية", sub: "مرح لكل العائلة", color: "from-[#c96b4d] to-[#0b1d12]", icon: Sparkles, image: skyViewImg, action: () => { setActiveExperience('kids'); setCurrentView('experience'); } },
                { id: 6, title: "أكوا جانغل", sub: "استرخاء المسبح", color: "from-[#1a3a3a] to-[#0b1d12]", icon: Waves, image: poolImg, action: () => { setActiveExperience('pool'); setCurrentView('experience'); } }
            ],
            catering_title: "خدمة الحفلات المتميزة",
            event_title: "مناسبات خاصة",
            event_book: "احجز مناسبتك الخاصة",
            kitchen_order: "اطلب الآن",
            title: {
                catering: 'خدمة الحفلات والتموين',
                teambuilding: 'بناء الفريق والفعاليات',
                school: 'الطلعات المدرسية'
            },
            subtitle: {
                catering: 'خطط لمناسبتك معنا',
                teambuilding: 'نظم تجربة فريق لا تُنسى',
                school: 'مغامرات تعليمية وممتعة للمدارس، من الاثنين إلى الجمعة.'
            },
            packDay: {
                title: "الأسعار",
                subtitle: "اكتشف أسعارنا وعروضنا.",
                button: "عرض الأسعار",
                tag: "الأسعار"
            },
            navigation: {
                pricing: { title: "الأسعار", subtitle: "خطط" },
                bungalow: { title: "بناغل الغابة", subtitle: "إقامة" },
                restaurant: { title: "المطعم والقائمة", subtitle: "طعام" },
                zones: { title: "مناطق التجربة", subtitle: "اكتشف" },
                catering: { title: "التموين والحفلات", subtitle: "خدمات" },
                teamBuilding: { title: "بناء الفريق", subtitle: "شركات" },
                school: { title: "الرحلات المدرسية", subtitle: "تعليم" },
                hours: { title: "ساعات العمل", subtitle: "توقيت" },
                animals: { title: "Circuit", subtitle: "حيوانات" },
                map: { title: "خريطة المنتزه", subtitle: "موقع" }
            },
            pricingModal: {
                title: "خطط أسعارنا",
                subtitle: "اختر تجربتك",
                parkEntry: {
                    title: "تذكرة الدخول",
                    adults: "كبار",
                    kids: "صغار",
                    desc: "دخول مناطق الحيوانات.",
                    offer: "مشروب بارد مجاني",
                    book: "احجز الآن"
                },
                footer_hours: "يومياً: 10 ص - 8 م",
                poolAccess: {
                    title: "المسبح",
                    adults: "كبار",
                    kids: "صغار",
                    desc: "شامل دخول المتنزه. كراسي استرخاء.",
                    book: "احجز الآن"
                },
                bungalow: {
                    tag: "أفضل قيمة",
                    title: "إقامة في البنغالو",
                    perNight: "ابتداءً من",
                    desc: "اكتشف عروضنا الحصرية ابتداءً من 900 درهم لليلة.",
                    additional: "انقر أدناه لعرض جميع الباقات المتاحة.",
                    poolDesc: "",
                    book: "عرض الباقات"
                },
                activities: {
                    title: "الأنشطة والترفيه",
                    gaming: "منطقة ألعاب الأطفال",
                    gamingDesc: "سوار اشتراك غير محدود.",
                    poney: "ركوب البوني",
                    poneyDesc: "10 دقائق.",
                    horse: "ركوب الخيل",
                    horseDesc: "10 دقائق.",
                    book: "احجز الآن"
                },
                noReservationNotice: "الحجز مسبقاً مطلوب فقط للإقامات في البناغل والفعاليات. لزيارة منتزه نطورا جانغل، المسبح، والأنشطة، نرحب بكم بدون حجز مسبق!"
            },
            menu: {
                mission: "Notre Mission",
                story: "قصتنا",
                contact: "اتصل بنا",
                mission_text: "ناتورا جانغل بارك هو ملاذك الصديق للبيئة بالقرب من الدار البيضاء والرباط. مهمتنا هي توفير بيئة هادئة لكل زائر للاستمتاع بوقت نوعي. نحن نؤمن بحماية الطبيعة مع خلق ذكريات ساحرة للجميع.",
                story_text: "لقد بدأنا ناتورا جانغل لأننا نحب الأوقات العائلية والطبيعة. بفضل خبرتنا الكبيرة في مجال الاسترخاء، حلمنا بمكان يشعر فيه الجميع وكأنهم في منزلهم وسط الطبيعة. اليوم، أصبح هذا الحلم حقيقة. نحن نقدم خدمة احترافية بلمسة عائلية دافئة في قلب الغابة."
            },
            nightSky: {
                tag: "تجربة ليلية متميزة",
                title: "خريطة النجوم",
                desc: "دليل النجوم والمجرات فوق منصورية.",
                button: "بدء العرض"
            },
            topNav: {
                hours: "المواعيد",
                map: "الخريطة",
                circuit: "المسار",
                kitchen: "المطبخ",
                theme: "الوضع"
            }
        }
    };

    const text = translations[currentLanguage];

    // Animation loop for slow rotation
    useAnimationFrame((_, delta) => {
        if (!isDragging && baseWidth > 0) {
            const moveBy = (delta / 1000) * 40; // 40px per second
            const currentX = x.get();

            // Unified logic: Move visually Left (translateX decreases)
            let newX = currentX - moveBy;

            // Wrapping logic: always stay between -baseWidth and 0
            if (newX < -baseWidth) {
                newX += baseWidth;
            }

            x.set(newX);
        }
    });

    useEffect(() => {
        const calculateWidth = () => {
            if (containerRef.current) {
                const fullWidth = containerRef.current.scrollWidth;
                setBaseWidth(fullWidth / 3);
            }
        };

        calculateWidth();
        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, [currentLanguage]);

    const displayBundles = [...text.bundles, ...text.bundles, ...text.bundles];

    return (
        <div className={`min-h-screen font-sans transition-colors duration-1000 ${isNightMode ? 'dark bg-[#050805] text-white' : 'bg-egg-shell text-neutral-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>

            {/* Menu Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#050805]/95 backdrop-blur-3xl flex flex-col lg:flex-row overflow-hidden"
                    >
                        {/* Organic Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
                            <Palmtree className="absolute -top-20 -left-20 w-[600px] h-[600px] rotate-[-15deg] text-luxury-gold" />
                            <Palmtree className="absolute -bottom-20 -right-20 w-[600px] h-[600px] rotate-[165deg] text-luxury-gold" />
                        </div>

                        {/* Left/Top Content: Identity */}
                        <div className="w-full lg:w-1/3 p-8 lg:p-20 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 relative z-10 bg-black/20 lg:bg-transparent">
                            <div className="space-y-4 text-center lg:text-start">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-block px-4 py-1 rounded-full border border-luxury-gold/30 bg-luxury-gold/5"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-luxury-gold">Explore Natura</span>
                                </motion.div>
                                <div className="absolute top-6 right-6 lg:top-12 lg:right-12 z-30 flex gap-2">
                                    {['fr', 'en', 'ar'].filter(lang => lang !== currentLanguage).map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => setLanguage(lang as any)}
                                            className="px-3 py-1 rounded-lg border border-luxury-gold/20 bg-black/40 backdrop-blur-md text-[10px] font-bold tracking-widest text-luxury-gold hover:bg-luxury-gold hover:text-jungle-deep transition-all uppercase"
                                        >
                                            {lang === 'ar' ? 'AR' : lang.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-luxury-gold font-serif text-5xl lg:text-7xl leading-tight"
                                >
                                    {text.brand}
                                </motion.h2>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]"
                                >
                                    {text.tagline}
                                </motion.p>
                            </div>

                            <div className="flex justify-center lg:justify-start">
                                <motion.button
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-16 h-16 flex items-center justify-center text-luxury-gold bg-white/5 rounded-full border border-white/10 hover:bg-luxury-gold hover:text-jungle-deep transition-all duration-500 group shadow-2xl mt-12 lg:mt-0"
                                >
                                    <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Right/Bottom Content: Navigation Grid */}
                        <div className="flex-1 overflow-y-auto p-8 lg:p-20 relative z-10 scrollbar-hide">
                            <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                {/* 1. Pricing */}
                                <motion.button
                                    initial={{ x: isRTL ? -20 : 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    onClick={() => { setIsMenuOpen(false); setShowPricing(true); }}
                                    className={`group flex items-center gap-4 text-left ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-jungle-deep transition-all duration-300">
                                        <div className="text-xl font-serif">DH</div>
                                    </div>
                                    <div>
                                        <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{text.navigation.pricing.subtitle}</div>
                                        <div className="text-2xl font-serif text-white group-hover:text-luxury-gold transition-colors">{text.navigation.pricing.title}</div>
                                    </div>
                                </motion.button>

                                {/* 2. Bungalow Jungle */}
                                <motion.button
                                    initial={{ x: isRTL ? -20 : 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.15 }}
                                    onClick={() => { setIsMenuOpen(false); setActiveExperience('bungalow'); setCurrentView('experience'); }}
                                    className={`group flex items-center gap-4 text-left ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-jungle-deep transition-all duration-300">
                                        <Home className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{text.navigation.bungalow.subtitle}</div>
                                        <div className="text-2xl font-serif text-white group-hover:text-luxury-gold transition-colors">{text.navigation.bungalow.title}</div>
                                    </div>
                                </motion.button>

                                {/* 3. Restaurant & Menu */}
                                <motion.button
                                    initial={{ x: isRTL ? -20 : 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    onClick={() => { setIsMenuOpen(false); setCurrentView('menu'); }}
                                    className={`group flex items-center gap-4 text-left ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-jungle-deep transition-all duration-300">
                                        <Utensils className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{text.navigation.restaurant.subtitle}</div>
                                        <div className="text-2xl font-serif text-white group-hover:text-luxury-gold transition-colors">{text.navigation.restaurant.title}</div>
                                    </div>
                                </motion.button>

                                {/* 4. Catering & Events */}
                                <motion.button
                                    initial={{ x: isRTL ? -20 : 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.25 }}
                                    onClick={() => { setIsMenuOpen(false); setCurrentView('catering'); }}
                                    className={`group flex items-center gap-4 text-left ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-jungle-deep transition-all duration-300">
                                        <PartyPopper className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{text.navigation.catering.subtitle}</div>
                                        <div className="text-2xl font-serif text-white group-hover:text-luxury-gold transition-colors">{text.navigation.catering.title}</div>
                                    </div>
                                </motion.button>

                                {/* 6. Team Building & Events */}
                                <motion.button
                                    initial={{ x: isRTL ? -20 : 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.35 }}
                                    onClick={() => { setIsMenuOpen(false); setCurrentView('teambuilding'); }}
                                    className={`group flex items-center gap-4 text-left ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-jungle-deep transition-all duration-300">
                                        <Users className="w-5 h-5" /> {/* Using Users icon if available, otherwise check imports */}
                                    </div>
                                    <div>
                                        <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{text.navigation.teamBuilding.subtitle}</div>
                                        <div className="text-2xl font-serif text-white group-hover:text-luxury-gold transition-colors">{text.navigation.teamBuilding.title}</div>
                                    </div>
                                </motion.button>

                                {/* 7. School Trips */}
                                <motion.button
                                    initial={{ x: isRTL ? -20 : 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    onClick={() => { setIsMenuOpen(false); setCurrentView('school'); }}
                                    className={`group flex items-center gap-4 text-left ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-jungle-deep transition-all duration-300">
                                        <Quote className="w-5 h-5" /> {/* Placeholder icon or use specific if imported */}
                                    </div>
                                    <div>
                                        <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{text.navigation.school.subtitle}</div>
                                        <div className="text-2xl font-serif text-white group-hover:text-luxury-gold transition-colors">{text.navigation.school.title}</div>
                                    </div>
                                </motion.button>

                                {/* 8. Opening Hours */}
                                <motion.button
                                    initial={{ x: isRTL ? -20 : 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.45 }}
                                    onClick={() => { setIsMenuOpen(false); setCurrentView('hours'); }}
                                    className={`group flex items-center gap-4 text-left ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-jungle-deep transition-all duration-300">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{text.navigation.hours.subtitle}</div>
                                        <div className="text-2xl font-serif text-white group-hover:text-luxury-gold transition-colors">{text.navigation.hours.title}</div>
                                    </div>
                                </motion.button>

                                {/* 9. Animal Circuit */}
                                <motion.button
                                    initial={{ x: isRTL ? -20 : 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    onClick={() => { setIsMenuOpen(false); setCurrentView('circuit-map'); }}
                                    className={`group flex items-center gap-4 text-left ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-jungle-deep transition-all duration-300">
                                        <Palmtree className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{text.navigation.animals.subtitle}</div>
                                        <div className="text-2xl font-serif text-white group-hover:text-luxury-gold transition-colors">{text.navigation.animals.title}</div>
                                    </div>
                                </motion.button>

                                {/* 10. Park Map */}
                                <motion.button
                                    initial={{ x: isRTL ? -20 : 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.55 }}
                                    onClick={() => { setIsMenuOpen(false); window.open('https://www.google.com/maps/dir/?api=1&destination=Natura+Jungle+Park+Mohammedia', '_blank'); }}
                                    className={`group flex items-center gap-4 text-left ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-jungle-deep transition-all duration-300">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{text.navigation.map.subtitle}</div>
                                        <div className="text-2xl font-serif text-white group-hover:text-luxury-gold transition-colors">{text.navigation.map.title}</div>
                                    </div>
                                </motion.button>
                            </nav>

                            {/* Social Footer */}
                            <div className="mt-12 pt-8 border-t border-white/5 flex justify-center gap-6">
                                <a href="https://www.instagram.com/naturajunglepark/" target="_blank" className="text-white/40 hover:text-luxury-gold transition-colors">
                                    <Instagram className="w-6 h-6" />
                                </a>
                                <a href="tel:0605500058" className="text-white/40 hover:text-luxury-gold transition-colors">
                                    <Phone className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pricing Modal */}
            <AnimatePresence>
                {showPricing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-8"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0b1d12] w-full max-w-5xl rounded-[3rem] overflow-hidden border border-luxury-gold/20 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar scroll-smooth relative"
                        >
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />

                            {/* Close Button */}
                            <button
                                onClick={() => setShowPricing(false)}
                                className="absolute top-6 right-6 lg:top-10 lg:right-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-jungle-deep transition-all z-50 text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="p-8 lg:p-16">
                                <div className="text-center mb-12">
                                    <h2 className="text-luxury-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
                                        {text.pricingModal.title}
                                    </h2>
                                    <h3 className="text-3xl lg:text-5xl font-serif text-white">
                                        {text.pricingModal.subtitle}
                                    </h3>
                                    <div className="mt-8 max-w-3xl mx-auto bg-luxury-gold/5 border border-luxury-gold/20 rounded-2xl p-4 lg:p-6 text-center backdrop-blur-sm shadow-xl">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Sparkles className="w-4 h-4 text-luxury-gold" />
                                            <span className="text-luxury-gold text-[10px] font-bold uppercase tracking-[0.2em]">Info</span>
                                        </div>
                                        <p className="text-sm lg:text-base text-white/80 font-serif leading-relaxed">
                                            {text.pricingModal.noReservationNotice}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {/* Park Entry */}
                                    <div className="bg-white/5 rounded-[2rem] p-8 hover:bg-white/10 transition-colors border border-white/10 relative group flex flex-col h-full">
                                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Palmtree className="w-32 h-32 text-luxury-gold" />
                                        </div>
                                        <h4 className="text-2xl font-serif text-luxury-gold mb-2">{text.pricingModal.parkEntry.title}</h4>
                                        <div className="space-y-4 my-6">
                                            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                                                <span className="text-white/60 text-sm uppercase tracking-wider">{text.pricingModal.parkEntry.adults}</span>
                                                <span className="text-2xl font-serif text-white">40 <span className="text-xs text-luxury-gold">DH</span></span>
                                            </div>
                                            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                                                <span className="text-white/60 text-sm uppercase tracking-wider">{text.pricingModal.parkEntry.kids}</span>
                                                <span className="text-2xl font-serif text-white">30 <span className="text-xs text-luxury-gold">DH</span></span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-white/40 leading-relaxed">
                                            {text.pricingModal.parkEntry.desc}
                                            {text.pricingModal.parkEntry.offer && (
                                                <>
                                                    <br />
                                                    <span className="text-luxury-gold font-medium mt-1 block">
                                                        {text.pricingModal.parkEntry.offer}
                                                    </span>
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    {/* Pool Access */}
                                    <div className="bg-white/5 rounded-[2rem] p-8 hover:bg-white/10 transition-colors border border-white/10 relative group flex flex-col h-full">
                                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Waves className="w-32 h-32 text-luxury-gold" />
                                        </div>
                                        <h4 className="text-2xl font-serif text-luxury-gold mb-2">{text.pricingModal.poolAccess.title}</h4>
                                        <div className="space-y-4 my-6">
                                            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                                                <span className="text-white/60 text-sm uppercase tracking-wider">{text.pricingModal.poolAccess.adults}</span>
                                                <span className="text-2xl font-serif text-white">150 <span className="text-xs text-luxury-gold">DH</span></span>
                                            </div>
                                            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                                                <span className="text-white/60 text-sm uppercase tracking-wider">{text.pricingModal.poolAccess.kids}</span>
                                                <span className="text-2xl font-serif text-white">100 <span className="text-xs text-luxury-gold">DH</span></span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-white/40 leading-relaxed">
                                            {text.pricingModal.poolAccess.desc}
                                        </p>
                                    </div>

                                    {/* Bungalow Stay */}
                                    <div className="bg-gradient-to-br from-luxury-gold/10 to-transparent rounded-[2rem] p-8 border border-luxury-gold/20 relative group md:col-span-2 lg:col-span-1 flex flex-col h-full">
                                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Home className="w-32 h-32 text-luxury-gold" />
                                        </div>
                                        <div className="inline-block px-3 py-1 bg-luxury-gold text-jungle-deep text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                                            {text.pricingModal.bungalow.tag}
                                        </div>
                                        <h4 className="text-2xl font-serif text-luxury-gold mb-2">{text.pricingModal.bungalow.title}</h4>
                                        <div className="space-y-4 my-6">
                                            <div className="flex justify-between items-baseline border-b border-luxury-gold/10 pb-2">
                                                <span className="text-white/60 text-sm uppercase tracking-wider">{text.pricingModal.bungalow.perNight}</span>
                                                <span className="text-3xl font-serif text-white">900 <span className="text-xs text-luxury-gold">DH</span></span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-white/40 leading-relaxed mb-4">
                                            {text.pricingModal.bungalow.desc}
                                            {text.pricingModal.bungalow.additional && (
                                                <span className="text-luxury-gold/80 mt-2 block font-medium">
                                                    {text.pricingModal.bungalow.additional}
                                                </span>
                                            )}
                                            {(text.pricingModal.bungalow as any).poolDesc && (
                                                <span className="text-luxury-gold/80 mt-1 block font-medium whitespace-pre-wrap">
                                                    {(text.pricingModal.bungalow as any).poolDesc}
                                                </span>
                                            )}
                                        </p>
                                        <div className="mt-auto pt-6">
                                            <button
                                                onClick={() => { setShowPricing(false); setActiveExperience('bungalow'); setCurrentView('experience'); }}
                                                className="w-full py-3 rounded-xl bg-luxury-gold text-jungle-deep font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
                                            >
                                                {text.pricingModal.bungalow.book}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Activities & Leisure */}
                                    <div className="bg-white/5 rounded-[2rem] p-8 hover:bg-white/10 transition-colors border border-white/10 relative group flex flex-col h-full md:col-span-2 lg:col-span-1 xl:col-span-1">
                                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Sparkles className="w-32 h-32 text-luxury-gold" />
                                        </div>
                                        <h4 className="text-2xl font-serif text-luxury-gold mb-2">{text.pricingModal.activities.title}</h4>
                                        <div className="space-y-4 my-6">
                                            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                                                <div className="flex flex-col">
                                                    <span className="text-white text-sm font-bold">{text.pricingModal.activities.gaming}</span>
                                                    <span className="text-white/40 text-[10px] uppercase tracking-wider">{text.pricingModal.activities.gamingDesc}</span>
                                                </div>
                                                <span className="text-2xl font-serif text-white">50 <span className="text-xs text-luxury-gold">DH</span></span>
                                            </div>
                                            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                                                <div className="flex flex-col">
                                                    <span className="text-white text-sm font-bold">{text.pricingModal.activities.poney}</span>
                                                    <span className="text-white/40 text-[10px] uppercase tracking-wider">{text.pricingModal.activities.poneyDesc}</span>
                                                </div>
                                                <span className="text-2xl font-serif text-white">30 <span className="text-xs text-luxury-gold">DH</span></span>
                                            </div>
                                            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                                                <div className="flex flex-col">
                                                    <span className="text-white text-sm font-bold">{text.pricingModal.activities.horse}</span>
                                                    <span className="text-white/40 text-[10px] uppercase tracking-wider">{text.pricingModal.activities.horseDesc}</span>
                                                </div>
                                                <span className="text-2xl font-serif text-white">40 <span className="text-xs text-luxury-gold">DH</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs font-medium uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-luxury-gold" />
                                        <span>El Mansouria, Benslimane</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-luxury-gold" />
                                        <span>{text.pricingModal.footer_hours}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Top Nav — hidden on mobile */}
            <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-[60] desktop-nav h-14 items-center justify-center gap-8 px-8">
                <button onClick={() => setCurrentView('hours')} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${currentView === 'hours' ? 'text-sand-gold' : 'text-white/60 hover:text-white'}`}>
                    <Clock className="w-4 h-4" />
                    {(text as any).topNav.hours}
                </button>
                <button onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Natura+Jungle+Park+Mohammedia', '_blank')} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                    <MapPin className="w-4 h-4" />
                    {(text as any).topNav.map}
                </button>
                <button onClick={() => setCurrentView('circuit-map')} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${currentView === 'circuit-map' ? 'text-sand-gold' : 'text-white/60 hover:text-white'}`}>
                    <Palmtree className="w-4 h-4" />
                    {(text as any).topNav.circuit}
                </button>
                <button onClick={() => setCurrentView('menu')} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${currentView === 'menu' ? 'text-sand-gold' : 'text-white/60 hover:text-white'}`}>
                    <Utensils className="w-4 h-4" />
                    {(text as any).topNav.kitchen}
                </button>
                <button onClick={toggleNightMode} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                    {isNightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    {(text as any).topNav.theme}
                </button>
            </nav>

            {/* Header: Concierge Bar */}
            <header className="px-6 lg:px-12 py-8 lg:pt-20 flex justify-between items-center sticky top-0 z-50 bg-inherit/80 backdrop-blur-md max-w-7xl mx-auto w-full">
                <div className="flex-1 flex justify-start">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMenuOpen(true)}
                        className="w-10 h-10 flex items-center justify-center text-jungle-green dark:text-sand-gold bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </motion.button>
                </div>

                <div className="text-center flex-1">
                    <h1 className="text-xl lg:text-3xl font-serif font-bold tracking-[0.2em] uppercase text-sand-gold drop-shadow-lg">
                        {text.brand}
                    </h1>
                    <p className="text-[8px] lg:text-[10px] uppercase tracking-[0.4em] font-bold opacity-60">
                        {text.tagline}
                    </p>
                </div>

                <div className="flex-1 flex justify-end items-center gap-4">
                    {/* Language Switcher */}
                    <div className="flex items-center gap-3 mr-2">
                        {['fr', 'en', 'ar'].filter(lang => lang !== currentLanguage).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang as any)}
                                className="px-2 py-1 rounded-lg border border-luxury-gold/20 bg-black/20 backdrop-blur-md text-[10px] font-bold tracking-widest text-luxury-gold hover:bg-luxury-gold hover:text-jungle-deep transition-all uppercase"
                            >
                                {lang === 'ar' ? 'AR' : lang.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <motion.button
                        onClick={toggleNightMode}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 flex items-center justify-center text-jungle-green dark:text-sand-gold bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        {isNightMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </motion.button>
                </div>
            </header>

            <main className="pb-32 lg:pb-16 max-w-7xl mx-auto">
                <div className="px-6 lg:px-12 mb-6 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-serif text-luxury-gold tracking-tight">{text.explore}</h2>
                        <div className="h-1 w-12 bg-luxury-gold mt-2 rounded-full" />
                    </div>
                </div>

                <div className="relative overflow-hidden mb-12">
                    <motion.div
                        ref={containerRef}
                        style={{ x }}
                        drag="x"
                        dragConstraints={{ left: -baseWidth * 2, right: 0 }}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => {
                            setIsDragging(false);
                            // Ensure wrapping logic is applied after drag
                            const currentX = x.get();

                            // Robust wrapping logic for both LTR and RTL
                            // We keep it between -baseWidth and 0
                            let newX = currentX;
                            while (newX < -baseWidth) newX += baseWidth;
                            while (newX > 0) newX -= baseWidth;
                            x.set(newX);
                        }}
                        className="flex gap-6 px-6 cursor-grab active:cursor-grabbing"
                    >
                        {displayBundles.map((bundle, idx) => {
                            const Icon = bundle.icon;
                            return (
                                <motion.div
                                    key={`${bundle.id}-${idx}`}
                                    whileHover={{ y: -12, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    animate={{
                                        y: [0, -5, 0],
                                        transition: {
                                            duration: 4,
                                            repeat: Infinity,
                                            delay: (idx % 6) * 0.4,
                                            ease: "easeInOut"
                                        }
                                    }}
                                    onClick={bundle.action}
                                    className="flex-none w-[280px] sm:w-[320px] lg:w-[350px] xl:w-[400px] 2xl:w-[450px] h-[350px] lg:h-[480px] rounded-[2rem] lg:rounded-[3rem] relative overflow-hidden group shadow-2xl border border-white/5"
                                >
                                    {bundle.image && (
                                        <div className="absolute inset-0">
                                            <img
                                                src={bundle.image}
                                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                                                alt={bundle.title}
                                                loading={idx < 2 ? "eager" : "lazy"}
                                                decoding="async"
                                                fetchPriority={idx < 2 ? "high" : "low"}
                                            />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-jungle-deep via-jungle-deep/40 to-transparent opacity-80" />

                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 group-hover:bg-luxury-gold group-hover:text-jungle-deep transition-all duration-500">
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-serif text-pure-nature mb-2 leading-tight group-hover:text-luxury-gold transition-colors">{bundle.title}</h3>
                                        <p className="text-pure-nature/60 text-[10px] font-bold uppercase tracking-[0.2em]">{bundle.sub}</p>

                                        <div className="mt-8 flex items-center gap-2 text-luxury-gold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{isRTL ? 'استكشف' : 'Explore'}</span>
                                            <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                <div className="px-6 lg:px-12 space-y-10">
                    {/* About Section */}
                    <section className="mt-4">
                        <div className="bg-white/80 dark:bg-jungle-deep/40 backdrop-blur-md rounded-[3rem] p-10 lg:p-16 border border-sand-gold/10 relative overflow-hidden shadow-2xl">
                            <div className="absolute -right-8 -bottom-8 opacity-[0.05] rotate-12">
                                <Palmtree className="w-64 h-64 text-jungle-deep dark:text-sand-gold" />
                            </div>
                            <div className="relative z-10 max-w-4xl">
                                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-sand-gold mb-6 flex items-center gap-3">
                                    <div className="h-px w-8 bg-sand-gold/30" />
                                    {text.about_title}
                                </h2>
                                <p className="text-xl lg:text-3xl font-serif leading-relaxed text-jungle-deep dark:text-white italic">
                                    "{text.about_text}"
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Catering & Party Service Section */}
                    <section className="space-y-4">
                        <div className="flex justify-between items-end">
                            <h2 className="text-2xl font-serif text-sand-gold transition-colors">
                                {(text as any).catering_title}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCurrentView('catering')}
                                className="h-48 rounded-[2.5rem] relative overflow-hidden group cursor-pointer shadow-xl border border-sand-gold/10"
                            >
                                <img
                                    src={cateringImg}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="Catering"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                                <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20">
                                        <Utensils className="w-6 h-6 text-sand-gold" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-1">
                                        {translations[currentLanguage].title.catering}
                                    </h3>
                                </div>
                            </motion.div>

                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCurrentView('teambuilding')}
                                className="h-48 rounded-[2.5rem] relative overflow-hidden group cursor-pointer shadow-xl border border-sand-gold/10"
                            >
                                <img
                                    src={tentDayImg}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="Team Building"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                                <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20">
                                        <PartyPopper className="w-6 h-6 text-sand-gold" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-1">
                                        {translations[currentLanguage].title.teambuilding}
                                    </h3>
                                </div>
                            </motion.div>

                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCurrentView('school')}
                                className="h-48 rounded-[2.5rem] relative overflow-hidden group cursor-pointer shadow-xl border border-sand-gold/10"
                            >
                                <img
                                    src={lamaImg}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="School Trips"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                                <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20">
                                        <Palmtree className="w-6 h-6 text-sand-gold" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-1">
                                        {translations[currentLanguage].title.school}
                                    </h3>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Pack Day Section */}
                    <section className="space-y-6">
                        <motion.div
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowPricing(true)}
                            className="relative h-72 lg:h-80 rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl border border-white/10"
                        >
                            <img
                                src={packDayImg}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                                alt="Pack Day"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-jungle-deep/90 via-jungle-deep/40 to-transparent" />

                            <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-center items-center text-center">
                                <div className="max-w-md space-y-4 flex flex-col items-center">
                                    <div>
                                        <h2 className="text-3xl lg:text-4xl font-serif text-white mb-2 leading-tight">
                                            {(translations[currentLanguage] as any).packDay.title}
                                        </h2>
                                        <p className="text-white/80 text-sm lg:text-base font-serif leading-relaxed italic">
                                            {(translations[currentLanguage] as any).packDay.subtitle}
                                        </p>
                                    </div>

                                    <div className="pt-2">
                                        <button className="bg-luxury-gold text-jungle-deep px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl gold-shadow flex items-center gap-3 group/btn hover:scale-105 transition-all">
                                            <Sparkles className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                                            {(translations[currentLanguage] as any).packDay.button}
                                            <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Glassmorphic Badge */}
                            <div className="absolute top-8 right-8 px-4 py-2 bg-luxury-gold/20 backdrop-blur-md rounded-full border border-luxury-gold/30">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3 h-3 text-luxury-gold" />
                                    <span className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest">
                                        {(translations[currentLanguage] as any).packDay.tag}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Smart Concierge Section */}
                    <SmartConcierge language={currentLanguage} />

                    {/* Jungle Connect Section */}
                    <JungleConnect isRTL={isRTL} language={currentLanguage} />

                    {/* Night Sky Feature (If paid) */}
                    {hasBooked && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-[3rem] p-8 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-black border border-indigo-500/20 text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Star className="w-32 h-32 fill-white" />
                            </div>
                            <div className="relative z-10 text-left">
                                <div className="flex items-center gap-2 text-indigo-400 mb-4">
                                    <Moon className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{(translations[currentLanguage] as any).nightSky.tag}</span>
                                </div>
                                <h3 className="text-3xl font-serif mb-2">{(translations[currentLanguage] as any).nightSky.title}</h3>
                                <p className="text-sm text-white/40 mb-6 max-w-[200px]">{(translations[currentLanguage] as any).nightSky.desc}</p>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentView('stargazer')}
                                    className="bg-indigo-600/20 border border-indigo-400/30 text-indigo-100 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-600/40 transition-all font-sans"
                                >
                                    {(translations[currentLanguage] as any).nightSky.button}
                                </motion.button>
                            </div>
                        </motion.section>
                    )}
                </div>

                {/* Creator Signature */}
                <div className="pb-20 pt-10 text-center flex flex-col items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-luxury-gold/40">
                        © 2026 Natura Jungle. All Rights Reserved.
                    </p>
                    <a 
                        href="https://wa.me/212634175357" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold uppercase tracking-[0.4em] text-luxury-gold/40 hover:text-luxury-gold transition-colors duration-500"
                    >
                        Created by <span className="underline decoration-luxury-gold/20 underline-offset-4">Nezar Abdeljalil</span>
                    </a>
                </div>
            </main>

            {/* Premium Visitor Platform Bottom Nav */}
            <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-sm h-20 glass-dark rounded-[2.5rem] border border-white/10 flex lg:hidden items-center justify-around px-4 z-[90] shadow-2xl">
                <div className="flex-1 flex justify-center">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentView('hours')}
                        className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'hours' ? 'text-luxury-gold' : 'text-white/30 hover:text-white/60'}`}
                    >
                        <Clock className="w-5 h-5" />
                        <span className="text-[7px] font-black uppercase tracking-widest">{(text as any).topNav.hours}</span>
                    </motion.button>
                </div>

                <div className="flex-1 flex justify-center">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Natura+Jungle+Park+Mohammedia', '_blank')}
                        className="flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
                    >
                        <MapPin className="w-5 h-5" />
                        <span className="text-[7px] font-black uppercase tracking-widest">{(text as any).topNav.map}</span>
                    </motion.button>
                </div>

                <div className="relative -mt-16 group">
                    <div className="absolute inset-0 bg-luxury-gold blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentView('circuit-map')}
                        className={`w-16 h-16 rounded-full bg-luxury-gold flex items-center justify-center text-jungle-green shadow-2xl relative z-10 gold-shadow transition-all duration-500 ${currentView === 'circuit-map' ? 'scale-110 rotate-12' : ""}`}
                    >
                        <Palmtree className="w-8 h-8" />
                    </motion.button>
                </div>

                <div className="flex-1 flex justify-center">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentView('menu')}
                        className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'menu' ? 'text-luxury-gold' : 'text-white/30 hover:text-white/60'}`}
                    >
                        <Utensils className="w-5 h-5" />
                        <span className="text-[7px] font-black uppercase tracking-widest">{(text as any).topNav.kitchen}</span>
                    </motion.button>
                </div>

                <div className="flex-1 flex justify-center">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleNightMode}
                        className="flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
                    >
                        {isNightMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        <span className="text-[7px] font-black uppercase tracking-widest">{(text as any).topNav.theme}</span>
                    </motion.button>
                </div>
            </nav>

            {/* View Transitions */}
            <AnimatePresence>
                {currentView === 'menu' && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[200] bg-egg-shell dark:bg-ink-black overflow-y-auto"
                    >
                        <DigitalMenu
                            language={currentLanguage}
                            isRTL={isRTL}
                            onBack={() => setCurrentView('base')}
                        />
                    </motion.div>
                )}

                {currentView === 'booking' && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed inset-0 z-[150] bg-egg-shell dark:bg-ink-black overflow-y-auto"
                    >
                        <BungalowBooking
                            currentLanguage={currentLanguage}
                            onBack={() => setCurrentView('base')}
                            onPaymentComplete={() => {
                                setHasBooked(true);
                                setCurrentView('base');
                            }}
                        />
                    </motion.div>
                )}
                {currentView === 'circuit-map' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[220] bg-black overflow-hidden flex flex-col pt-16"
                    >
                        <div className="absolute top-6 left-6 z-50">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setCurrentView('base')}
                                className="w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white border border-white/10"
                            >
                                <X className="w-6 h-6" />
                            </motion.button>
                        </div>
                        <div className="flex-1 w-full h-full p-4 md:p-12 flex items-center justify-center overflow-auto">
                            <img
                                src="/assets/natura/Natura view from above MAIN PAGE BCKGRND.webp"
                                alt="Circuit"
                                loading="lazy"
                                decoding="async"
                                className="max-w-none md:max-w-full max-h-none md:max-h-full w-auto h-auto object-contain shadow-2xl rounded-3xl"
                                style={{
                                    maxWidth: '200%',
                                    maxHeight: '200%'
                                }}
                            />
                        </div>
                    </motion.div>
                )}
                {currentView === 'fun' && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed inset-0 z-[190] bg-orange-50 dark:bg-[#1a0f05] overflow-y-auto"
                    >
                        <FunPlay
                            isRTL={isRTL}
                            language={currentLanguage}
                            onBack={() => setCurrentView('base')}
                        />
                    </motion.div>
                )}
                {currentView === 'stargazer' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[210] bg-black"
                    >
                        <NightSkyMap isRTL={isRTL} onClose={() => setCurrentView('base')} />
                    </motion.div>
                )}
                {currentView === 'hours' && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[250]"
                    >
                        <ParkHours isRTL={isRTL} language={currentLanguage} onClose={() => setCurrentView('base')} />
                    </motion.div>
                )}
                {currentView === 'catering' && (
                    <CateringPartyservice eventType="catering" language={currentLanguage} onClose={() => setCurrentView('base')} />
                )}
                {currentView === 'teambuilding' && (
                    <CateringPartyservice eventType="teambuilding" language={currentLanguage} onClose={() => setCurrentView('base')} />
                )}
                {currentView === 'school' && (
                    <CateringPartyservice eventType="school" language={currentLanguage} onClose={() => setCurrentView('base')} />
                )}
                {currentView === 'experience' && activeExperience && (
                    <ExperienceShowcase
                        type={activeExperience}
                        language={currentLanguage}
                        onClose={() => { setActiveExperience(null); setCurrentView('base'); }}
                        onAction={(target) => setCurrentView(target as any)}
                    />
                )}
            </AnimatePresence>
        </div >
    );
};
