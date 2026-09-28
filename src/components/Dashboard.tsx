import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from 'framer-motion';
import {
    Menu,
    ArrowRight,
    Utensils,
    Sparkles,
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
    Compass,
    Flame
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { JungleConnect } from './JungleConnect';
import { DigitalMenu } from './DigitalMenu';
import { BungalowBooking } from './BungalowBooking';
import { NightSkyMap } from './NightSkyMap';
import { FunPlay } from './FunPlay';
import { ParkHours } from './ParkHours';
import { CateringPartyservice } from './CateringPartyservice';
import { ExperienceShowcase } from './ExperienceShowcase';
import { SmartSuggestions } from './SmartSuggestions';

const bungalowImg = '/assets/natura/bugalow.webp';
const restaurantImg = '/assets/natura/Jungle restaurant.webp';
const cateringImg = '/assets/natura/Jungle restaurant.webp';
const tentDayImg = '/assets/natura/berber tent at day.webp';
const lamaImg = '/assets/natura/animal circuit Lama.webp';
const poolImg = '/assets/natura/pool.webp';
const skyViewImg = '/assets/natura/gaming space/DSC03228.webp';
const packDayImg = '/assets/natura/WhatsApp Image 2026-02-13 at 13.42.27.webp';
const quadImg = '/assets/natura/park_view.webp';

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
            about_title: "Breathe in Nature | Natura Jungle Park",
            about_text: "Escape the city buzz and reconnect with nature at Natura Jungle Park—a serene eco-sanctuary just moments from Casablanca and Rabat.",
            promoBanner: {
                badge: "Limited Time Offer",
                title: "Autumn Family Bungalow Stay",
                desc: "Stay from 900 DH/night (instead of 1200 DH) with Breakfast, Animal Park, Play Area & FREE POOL ACCESS until October 10!",
                cta: "Book Bungalow",
                save: "Save up to 25%"
            },
            quadSpotlight: {
                badge: "New Activity",
                title: "Sunset Quad Adventure",
                desc: "Explore scenic off-road nature trails with our 1-seater (150 DH) & 2-seater (200 DH) quads (30 min ride).",
                cta: "Discover Quad"
            },
            bundles: [
                { id: 1, title: "Jungle Bungalow", sub: "Special Promo Stays", icon: Home, image: bungalowImg, action: () => { setActiveExperience('bungalow'); setCurrentView('experience'); } },
                { id: 2, title: "Balade à Quad", sub: "Sunset Adventure", icon: Compass, image: quadImg, action: () => { setActiveExperience('quad'); setCurrentView('experience'); } },
                { id: 3, title: "Jungle Restaurant", sub: "Roasted Chicken & Tagines", icon: Utensils, image: restaurantImg, action: () => { setActiveExperience('restaurant'); setCurrentView('experience'); } },
                { id: 4, title: "Berber Tents", sub: "Authentic Experience", icon: Tent, image: tentDayImg, action: () => { setActiveExperience('tents'); setCurrentView('experience'); } },
                { id: 5, title: "Animal Park", sub: "Animal Discovery", icon: Palmtree, image: lamaImg, action: () => { setActiveExperience('park'); setCurrentView('experience'); } },
                { id: 6, title: "Kid's & Equitation", sub: "Horse, Pony & Fun Games", icon: Sparkles, image: skyViewImg, action: () => { setActiveExperience('kids'); setCurrentView('experience'); } },
                { id: 7, title: "Aqua Jungle", sub: "Poolside Serenity", icon: Waves, image: poolImg, action: () => { setActiveExperience('pool'); setCurrentView('experience'); } }
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
                title: "Official Pricing & Rates",
                subtitle: "Discover all rates for entry, pool, quad, horse riding and bungalow stays.",
                button: "View All Pricing",
                tag: "Rates"
            },
            navigation: {
                pricing: { title: "Pricing & Plans", subtitle: "Rates" },
                quad: { title: "Balade à Quad", subtitle: "Adventure" },
                bungalow: { title: "Bungalow Jungle", subtitle: "Promo Stay" },
                restaurant: { title: "Restaurant & Menu", subtitle: "Dining" },
                zones: { title: "Experience Zones", subtitle: "Discover" },
                catering: { title: "Catering & Events", subtitle: "Services" },
                teamBuilding: { title: "Team Building", subtitle: "Corporate" },
                school: { title: "School Trips", subtitle: "Education" },
                hours: { title: "Opening Hours", subtitle: "Time" },
                animals: { title: "Animal Circuit", subtitle: "Fauna" },
                map: { title: "Park Map & Location", subtitle: "GPS" }
            },
            pricingModal: {
                title: "Official Pricing",
                subtitle: "Choose Your Experience",
                parkEntry: {
                    title: "Park Entry",
                    adults: "Adults",
                    kids: "Kids (2 to 12 y/o)",
                    desc: "Full animal park access.",
                    offer: "Complimentary cold drink included",
                    book: "Book Now"
                },
                footer_hours: "Daily: 10 AM - 8 PM",
                poolAccess: {
                    title: "Pool Area",
                    adults: "Adults",
                    kids: "Kids (2 to 12 y/o)",
                    desc: "Includes sunbed + Free park entry.",
                    book: "Book Now"
                },
                bungalow: {
                    tag: "Promo & Standard",
                    title: "Bungalow Stay",
                    perNight: "Starting From",
                    desc: "Promo (until Oct 10): 900 DH & 1100 DH with Free Pool. From Oct 10: 4 Standard formulas (900 DH to 1400 DH).",
                    additional: "Breakfast, animal park & kids play area included in all stays.",
                    book: "View Packages & Book"
                },
                activities: {
                    title: "Activities & Leisure",
                    quad1: "Balade à Quad (1 Seat)",
                    quad1Desc: "30 min forest ride.",
                    quad2: "Balade à Quad (2 Seats)",
                    quad2Desc: "30 min tandem ride.",
                    horse: "Horse Riding",
                    horseDesc: "10 min: 40 DH | 30 min Ride: 100 DH.",
                    poney: "Pony Ride (Kids)",
                    poneyDesc: "10 min guided ride.",
                    gaming: "Kids Play Area",
                    gamingDesc: "Unlimited day bracelet pass."
                },
                noReservationNotice: "Reservations are only required for Bungalows & Special Events. For general visits, pool, animal park and activities, you are welcome without reservation!"
            },
            menu: {
                mission: "Our Mission",
                story: "Our Story",
                contact: "Contact Us"
            },
            topNav: {
                hours: "Hours",
                map: "Map",
                circuit: "Circuit",
                kitchen: "Menu",
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
            explore: "Zones d'Expérience",
            map_title: "Circuit Animalier",
            map_status: "Suivi en Direct",
            about_title: "Respirez la Nature | Natura Jungle Park",
            about_text: "Évadez-vous de l'agitation urbaine et reconnectez avec la nature au Natura Jungle Park—un sanctuaire écologique serein à quelques pas de Casablanca et Rabat.",
            promoBanner: {
                badge: "Offre Limitée",
                title: "Séjour en Famille au Cœur de la Nature",
                desc: "Bungalows à partir de 900 DH/nuit (au lieu de 1200 DH) avec Petit-déjeuner, Parc animalier, Espace jeux & PISCINE GRATUITE jusqu'au 10 Octobre !",
                cta: "Réserver mon Bungalow",
                save: "Jusqu'à -25% de réduction"
            },
            quadSpotlight: {
                badge: "Nouvelle Activité",
                title: "Balade à Quad en Pleine Nature",
                desc: "Vivez une aventure palpitante au coucher du soleil sur nos pistes sécurisées : 1 Place (150 DH) & 2 Places (200 DH) pour 30 min.",
                cta: "Découvrir le Quad"
            },
            bundles: [
                { id: 1, title: "Bungalow Jungle", sub: "Offre Promo Séjour", icon: Home, image: bungalowImg, action: () => { setActiveExperience('bungalow'); setCurrentView('experience'); } },
                { id: 2, title: "Balade à Quad", sub: "Aventure & Sunset", icon: Compass, image: quadImg, action: () => { setActiveExperience('quad'); setCurrentView('experience'); } },
                { id: 3, title: "Restaurant Jungle", sub: "Poulet Rôti & Tagines", icon: Utensils, image: restaurantImg, action: () => { setActiveExperience('restaurant'); setCurrentView('experience'); } },
                { id: 4, title: "Tentes Berbères", sub: "Expérience Authentique", icon: Tent, image: tentDayImg, action: () => { setActiveExperience('tents'); setCurrentView('experience'); } },
                { id: 5, title: "Parc Animalier", sub: "Circuit Découverte", icon: Palmtree, image: lamaImg, action: () => { setActiveExperience('park'); setCurrentView('experience'); } },
                { id: 6, title: "Enfants & Équitation", sub: "Cheval, Poney & Jeux", icon: Sparkles, image: skyViewImg, action: () => { setActiveExperience('kids'); setCurrentView('experience'); } },
                { id: 7, title: "Aqua Jungle", sub: "Sérénité au Bord de l'Eau", icon: Waves, image: poolImg, action: () => { setActiveExperience('pool'); setCurrentView('experience'); } }
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
                title: "Grille Tarifaire Officielle",
                subtitle: "Découvrez tous nos tarifs pour l'entrée, la piscine, le quad, l'équitation et les séjours en bungalow.",
                button: "Voir Tous les Tarifs",
                tag: "Tarifs"
            },
            navigation: {
                pricing: { title: "Tarifs & Formules", subtitle: "Prix" },
                quad: { title: "Balade à Quad", subtitle: "Nouveauté" },
                bungalow: { title: "Bungalow Jungle", subtitle: "Séjour Promo" },
                restaurant: { title: "Restaurant & Menu", subtitle: "Carte" },
                zones: { title: "Zones d'Expérience", subtitle: "Découvrir" },
                catering: { title: "Traiteur & Événements", subtitle: "Services" },
                teamBuilding: { title: "Team Building", subtitle: "Entreprise" },
                school: { title: "Sorties Scolaires", subtitle: "Éducation" },
                hours: { title: "Heures d'Ouverture", subtitle: "Horaires" },
                animals: { title: "Circuit Animalier", subtitle: "Animaux" },
                map: { title: "Plan & Localisation", subtitle: "GPS" }
            },
            pricingModal: {
                title: "Nos Tarifs Officiels",
                subtitle: "Choisissez Votre Expérience",
                parkEntry: {
                    title: "Ticket d'Entrée",
                    adults: "Adulte",
                    kids: "Enfant (2 à 12 ans)",
                    desc: "Accès complet au parc animalier.",
                    offer: "Boisson fraîche offerte incluse",
                    book: "Réserver"
                },
                footer_hours: "Tous les jours : 10h - 20h",
                poolAccess: {
                    title: "Accès Piscine",
                    adults: "Adulte",
                    kids: "Enfant (2 à 12 ans)",
                    desc: "Inclus : Transat + Entrée parc offerte.",
                    book: "Réserver"
                },
                bungalow: {
                    tag: "Promo & Standards",
                    title: "Séjour Bungalow",
                    perNight: "À partir de",
                    desc: "Promo (jusqu'au 10 Oct) : 900 DH & 1100 DH avec Piscine Gratuite. Dès le 10 Oct : 4 Formules Standards (900 DH à 1400 DH).",
                    additional: "Petit-déjeuner, parc animalier et espace jeux inclus dans toutes les formules séjour.",
                    book: "Voir les Formules"
                },
                activities: {
                    title: "Activités & Loisirs",
                    quad1: "Balade à Quad (1 Place)",
                    quad1Desc: "30 min de pistes sauvages.",
                    quad2: "Balade à Quad (2 Places)",
                    quad2Desc: "30 min en duo.",
                    horse: "Équitation (Cheval)",
                    horseDesc: "10 min : 40 DH | Balade 30 min : 100 DH.",
                    poney: "Balade à Poney (Enfants)",
                    poneyDesc: "10 min encadrées.",
                    gaming: "Espace Jeux Enfants",
                    gamingDesc: "Bracelet illimité pour la journée."
                },
                noReservationNotice: "Les réservations sont requises uniquement pour les séjours en Bungalow et Événements. Pour la visite du parc, la piscine et les activités, vous êtes les bienvenus sans réservation !"
            },
            menu: {
                mission: "Notre Mission",
                story: "Notre Histoire",
                contact: "Contactez-nous"
            },
            topNav: {
                hours: "Horaires",
                map: "Carte",
                circuit: "Circuit",
                kitchen: "Menu",
                theme: "Thème"
            }
        },
        ar: {
            brand: "نطورا جانغل",
            tagline: "تجربة طبيعية لا تُنسى",
            explore: "مناطق الاستكشاف",
            map_title: "مسار الحيوانات",
            map_status: "تتبع مباشر",
            about_title: "استنشق عبير الطبيعة | منتزه نطورا جانغل",
            about_text: "اهرب من صخب المدينة واكتشف جمال الطبيعة في منتزه ناتورا جانغل—ملاذك البيئي الهادئ على بعد دقائق من الدار البيضاء والرباط.",
            promoBanner: {
                badge: "عرض حصري محدود",
                title: "إقامة عائلية فاخرة في البناغل",
                desc: "ابتداءً من 900 درهم/ليلة (بدلاً من 1200 درهم) مع فطور الصباح، حديقة الحيوان، ألعاب الأطفال ومسبح مجاني حتى 10 أكتوبر!",
                cta: "احجز البنغالو الآن",
                save: "خصم يصل إلى 25%"
            },
            quadSpotlight: {
                badge: "نشاط جديد",
                title: "جولة الكواد عند الغروب",
                desc: "استمتع بمغامرة شيقة وسط مسارات الغابة الطبيعية: مقعد واحد (150 درهم) ومقعدين (200 درهم) لمدة 30 دقيقة.",
                cta: "اكتشف الكواد"
            },
            bundles: [
                { id: 1, title: "بناغل الغابة", sub: "عرض الإقامة الخاص", icon: Home, image: bungalowImg, action: () => { setActiveExperience('bungalow'); setCurrentView('experience'); } },
                { id: 2, title: "جولة الكواد", sub: "مغامرة الغروب", icon: Compass, image: quadImg, action: () => { setActiveExperience('quad'); setCurrentView('experience'); } },
                { id: 3, title: "مطعم الغابة", sub: "طواجن ودجاج محمر", icon: Utensils, image: restaurantImg, action: () => { setActiveExperience('restaurant'); setCurrentView('experience'); } },
                { id: 4, title: "خيام بربرية", sub: "أصالة وراحة", icon: Tent, image: tentDayImg, action: () => { setActiveExperience('tents'); setCurrentView('experience'); } },
                { id: 5, title: "حديقة الحيوان", sub: "مسار الطبيعة", icon: Palmtree, image: lamaImg, action: () => { setActiveExperience('park'); setCurrentView('experience'); } },
                { id: 6, title: "الأطفال والفروسية", sub: "خيل، بوني وألعاب", icon: Sparkles, image: skyViewImg, action: () => { setActiveExperience('kids'); setCurrentView('experience'); } },
                { id: 7, title: "أكوا جانغل", sub: "استرخاء المسبح", icon: Waves, image: poolImg, action: () => { setActiveExperience('pool'); setCurrentView('experience'); } }
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
                title: "الأسعار الرسمية",
                subtitle: "اكتشف جميع أسعار الدخول، المسبح، الكواد، ركوب الخيل وإقامات البناغل.",
                button: "عرض كافة الأسعار",
                tag: "الأسعار"
            },
            navigation: {
                pricing: { title: "الأسعار والباقات", subtitle: "تعريفة" },
                quad: { title: "جولة الكواد", subtitle: "نشاط جديد" },
                bungalow: { title: "بناغل الغابة", subtitle: "إقامة مخفضة" },
                restaurant: { title: "المطعم والقائمة", subtitle: "طعام" },
                zones: { title: "مناطق التجربة", subtitle: "اكتشف" },
                catering: { title: "التموين والحفلات", subtitle: "خدمات" },
                teamBuilding: { title: "بناء الفريق", subtitle: "شركات" },
                school: { title: "الرحلات المدرسية", subtitle: "تعليم" },
                hours: { title: "ساعات العمل", subtitle: "توقيت" },
                animals: { title: "مسار الحيوانات", subtitle: "حيوانات" },
                map: { title: "خريطة المنتزه", subtitle: "موقع" }
            },
            pricingModal: {
                title: "أسعارنا الرسمية",
                subtitle: "اختر تجربتك المفضلة",
                parkEntry: {
                    title: "تذكرة الدخول",
                    adults: "كبار",
                    kids: "أطفال (من 2 إلى 12 سنة)",
                    desc: "دخول كامل إلى حديقة الحيوان.",
                    offer: "مشروب بارد مجاني مشمول",
                    book: "احجز الآن"
                },
                footer_hours: "يومياً: 10 ص - 8 م",
                poolAccess: {
                    title: "المسبح",
                    adults: "كبار",
                    kids: "أطفال (من 2 إلى 12 سنة)",
                    desc: "شامل كرسي استرخاء + دخول مجاني للحديقة.",
                    book: "احجز الآن"
                },
                bungalow: {
                    tag: "عروض وباقات",
                    title: "إقامة البنغالو",
                    perNight: "ابتداءً من",
                    desc: "عرض خاص (حتى 10 أكتوبر): 900 و 1100 درهم مع مسبح مجاني. ابتداءً من 10 أكتوبر: 4 باقات عادية (من 900 إلى 1400 درهم).",
                    additional: "فطور الصباح، حديقة الحيوان وفضاء الألعاب مشمولة في جميع صيغ الإقامة.",
                    book: "عرض الباقات"
                },
                activities: {
                    title: "الأنشطة والترفيه",
                    quad1: "جولة كواد (مقعد واحد)",
                    quad1Desc: "30 دقيقة في مسارات الغابة.",
                    quad2: "جولة كواد (مقعدين)",
                    quad2Desc: "30 دقيقة لشخصين.",
                    horse: "ركوب الخيل",
                    horseDesc: "10 دقائق: 40 درهم | جولة 30 دقيقة: 100 درهم.",
                    poney: "ركوب البوني للأطفال",
                    poneyDesc: "10 دقائق للأطفال.",
                    gaming: "فضاء ألعاب الأطفال",
                    gamingDesc: "سوار اشتراك غير محدود طيلة اليوم."
                },
                noReservationNotice: "الحجز المسبق مطلوب فقط للإقامات في البناغل والمناسبات. لزيارة المتنزه، المسبح والأنشطة، نرحب بكم بدون حجز مسبق!"
            },
            menu: {
                mission: "مهمتنا",
                story: "قصتنا",
                contact: "اتصل بنا"
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
                kitchen: "القائمة",
                theme: "الوضع"
            }
        }
    };

    const text = translations[currentLanguage];

    // Animation loop for carousel
    useAnimationFrame((_, delta) => {
        if (!isDragging && baseWidth > 0) {
            const moveBy = (delta / 1000) * 35;
            const currentX = x.get();
            let newX = currentX - moveBy;
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
        <div className={`min-h-screen font-sans transition-colors duration-700 ${isNightMode ? 'dark bg-[#050B07] text-[#F9F7F2]' : 'bg-[#F8F6F0] text-[#08170E]'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Interactive Suggestions Widget */}
            <SmartSuggestions
                language={currentLanguage}
                onNavigate={(view) => {
                    if (view === 'quad') {
                        setActiveExperience('quad');
                        setCurrentView('experience');
                    } else if (view === 'pricing') {
                        setShowPricing(true);
                    } else {
                        setCurrentView(view as any);
                    }
                }}
            />

            {/* Navigation Drawer Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col lg:flex-row overflow-hidden"
                    >
                        <div className="p-8 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative z-10">
                            <div className="space-y-4 text-center lg:text-left">
                                <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.3em] block">
                                    {text.brand}
                                </span>
                                <h2 className="text-3xl lg:text-5xl font-serif text-white">Menu</h2>
                                <p className="text-white/50 font-bold uppercase tracking-[0.3em] text-[10px]">
                                    {text.tagline}
                                </p>
                            </div>

                            <div className="flex justify-center lg:justify-start">
                                <motion.button
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-14 h-14 flex items-center justify-center text-luxury-gold bg-white/5 rounded-full border border-white/10 hover:bg-luxury-gold hover:text-jungle-deep transition-all duration-300 mt-6 lg:mt-0"
                                >
                                    <X className="w-6 h-6" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Navigation Grid */}
                        <div className="flex-1 overflow-y-auto p-6 lg:p-16 relative z-10 scrollbar-hide">
                            <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                <motion.button
                                    onClick={() => { setIsMenuOpen(false); setShowPricing(true); }}
                                    className={`group flex items-center gap-4 text-left p-3 rounded-2xl hover:bg-white/5 transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-sand-gold/15 flex items-center justify-center text-sand-gold group-hover:bg-sand-gold group-hover:text-jungle-deep transition-all">
                                        <span className="text-lg font-bold font-serif">DH</span>
                                    </div>
                                    <div>
                                        <div className="text-white/50 text-[9px] font-bold uppercase tracking-widest">{text.navigation.pricing.subtitle}</div>
                                        <div className="text-xl font-serif text-white group-hover:text-sand-gold transition-colors">{text.navigation.pricing.title}</div>
                                    </div>
                                </motion.button>

                                <motion.button
                                    onClick={() => { setIsMenuOpen(false); setActiveExperience('quad'); setCurrentView('experience'); }}
                                    className={`group flex items-center gap-4 text-left p-3 rounded-2xl hover:bg-white/5 transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-sand-gold/15 flex items-center justify-center text-sand-gold group-hover:bg-sand-gold group-hover:text-jungle-deep transition-all">
                                        <Compass className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white/50 text-[9px] font-bold uppercase tracking-widest">{text.navigation.quad.subtitle}</div>
                                        <div className="text-xl font-serif text-white group-hover:text-sand-gold transition-colors">{text.navigation.quad.title}</div>
                                    </div>
                                </motion.button>

                                <motion.button
                                    onClick={() => { setIsMenuOpen(false); setActiveExperience('bungalow'); setCurrentView('experience'); }}
                                    className={`group flex items-center gap-4 text-left p-3 rounded-2xl hover:bg-white/5 transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-sand-gold/15 flex items-center justify-center text-sand-gold group-hover:bg-sand-gold group-hover:text-jungle-deep transition-all">
                                        <Home className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white/50 text-[9px] font-bold uppercase tracking-widest">{text.navigation.bungalow.subtitle}</div>
                                        <div className="text-xl font-serif text-white group-hover:text-sand-gold transition-colors">{text.navigation.bungalow.title}</div>
                                    </div>
                                </motion.button>

                                <motion.button
                                    onClick={() => { setIsMenuOpen(false); setCurrentView('menu'); }}
                                    className={`group flex items-center gap-4 text-left p-3 rounded-2xl hover:bg-white/5 transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-sand-gold/15 flex items-center justify-center text-sand-gold group-hover:bg-sand-gold group-hover:text-jungle-deep transition-all">
                                        <Utensils className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white/50 text-[9px] font-bold uppercase tracking-widest">{text.navigation.restaurant.subtitle}</div>
                                        <div className="text-xl font-serif text-white group-hover:text-sand-gold transition-colors">{text.navigation.restaurant.title}</div>
                                    </div>
                                </motion.button>

                                <motion.button
                                    onClick={() => { setIsMenuOpen(false); setCurrentView('catering'); }}
                                    className={`group flex items-center gap-4 text-left p-3 rounded-2xl hover:bg-white/5 transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-sand-gold/15 flex items-center justify-center text-sand-gold group-hover:bg-sand-gold group-hover:text-jungle-deep transition-all">
                                        <PartyPopper className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white/50 text-[9px] font-bold uppercase tracking-widest">{text.navigation.catering.subtitle}</div>
                                        <div className="text-xl font-serif text-white group-hover:text-sand-gold transition-colors">{text.navigation.catering.title}</div>
                                    </div>
                                </motion.button>

                                <motion.button
                                    onClick={() => { setIsMenuOpen(false); setCurrentView('teambuilding'); }}
                                    className={`group flex items-center gap-4 text-left p-3 rounded-2xl hover:bg-white/5 transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-sand-gold/15 flex items-center justify-center text-sand-gold group-hover:bg-sand-gold group-hover:text-jungle-deep transition-all">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white/50 text-[9px] font-bold uppercase tracking-widest">{text.navigation.teamBuilding.subtitle}</div>
                                        <div className="text-xl font-serif text-white group-hover:text-sand-gold transition-colors">{text.navigation.teamBuilding.title}</div>
                                    </div>
                                </motion.button>

                                <motion.button
                                    onClick={() => { setIsMenuOpen(false); setCurrentView('hours'); }}
                                    className={`group flex items-center gap-4 text-left p-3 rounded-2xl hover:bg-white/5 transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-sand-gold/15 flex items-center justify-center text-sand-gold group-hover:bg-sand-gold group-hover:text-jungle-deep transition-all">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white/50 text-[9px] font-bold uppercase tracking-widest">{text.navigation.hours.subtitle}</div>
                                        <div className="text-xl font-serif text-white group-hover:text-sand-gold transition-colors">{text.navigation.hours.title}</div>
                                    </div>
                                </motion.button>

                                <motion.button
                                    onClick={() => { setIsMenuOpen(false); setCurrentView('circuit-map'); }}
                                    className={`group flex items-center gap-4 text-left p-3 rounded-2xl hover:bg-white/5 transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-sand-gold/15 flex items-center justify-center text-sand-gold group-hover:bg-sand-gold group-hover:text-jungle-deep transition-all">
                                        <Palmtree className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-white/50 text-[9px] font-bold uppercase tracking-widest">{text.navigation.animals.subtitle}</div>
                                        <div className="text-xl font-serif text-white group-hover:text-sand-gold transition-colors">{text.navigation.animals.title}</div>
                                    </div>
                                </motion.button>
                            </nav>

                            {/* Contact Footer */}
                            <div className="mt-8 pt-6 border-t border-white/10 flex justify-center gap-6">
                                <a href="https://www.instagram.com/naturajunglepark/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-sand-gold transition-colors">
                                    <Instagram className="w-6 h-6" />
                                </a>
                                <a href="tel:0605500058" className="text-white/60 hover:text-sand-gold transition-colors">
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
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#08170E] w-full max-w-5xl rounded-[2.5rem] overflow-hidden border border-sand-gold/30 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar scroll-smooth relative text-white"
                        >
                            <button
                                onClick={() => setShowPricing(false)}
                                className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sand-gold hover:bg-sand-gold hover:text-jungle-deep transition-all z-50 text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-6 sm:p-10 lg:p-12">
                                <div className="text-center mb-8">
                                    <h2 className="text-sand-gold text-xs font-bold uppercase tracking-[0.3em] mb-2">
                                        {text.pricingModal.title}
                                    </h2>
                                    <h3 className="text-2xl sm:text-4xl font-serif text-white">
                                        {text.pricingModal.subtitle}
                                    </h3>
                                    <div className="mt-4 max-w-2xl mx-auto bg-sand-gold/10 border border-sand-gold/25 rounded-2xl p-4 text-center">
                                        <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                                            ✨ {text.pricingModal.noReservationNotice}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                    {/* 1. Park Entry */}
                                    <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 flex flex-col justify-between">
                                        <div>
                                            <div className="w-10 h-10 rounded-xl bg-sand-gold/20 text-sand-gold flex items-center justify-center mb-4">
                                                <Palmtree className="w-5 h-5" />
                                            </div>
                                            <h4 className="text-xl font-serif text-sand-gold mb-3">{text.pricingModal.parkEntry.title}</h4>
                                            <div className="space-y-2 border-y border-white/10 py-3 mb-3">
                                                <div className="flex justify-between items-baseline">
                                                    <span className="text-white/70 text-xs">{text.pricingModal.parkEntry.adults}</span>
                                                    <span className="text-xl font-serif font-bold text-white">40 <span className="text-xs text-sand-gold">DH</span></span>
                                                </div>
                                                <div className="flex justify-between items-baseline">
                                                    <span className="text-white/70 text-xs">{text.pricingModal.parkEntry.kids}</span>
                                                    <span className="text-xl font-serif font-bold text-white">30 <span className="text-xs text-sand-gold">DH</span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-sand-gold font-medium">
                                            🎁 {text.pricingModal.parkEntry.offer}
                                        </p>
                                    </div>

                                    {/* 2. Pool Access */}
                                    <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 flex flex-col justify-between">
                                        <div>
                                            <div className="w-10 h-10 rounded-xl bg-sand-gold/20 text-sand-gold flex items-center justify-center mb-4">
                                                <Waves className="w-5 h-5" />
                                            </div>
                                            <h4 className="text-xl font-serif text-sand-gold mb-3">{text.pricingModal.poolAccess.title}</h4>
                                            <div className="space-y-2 border-y border-white/10 py-3 mb-3">
                                                <div className="flex justify-between items-baseline">
                                                    <span className="text-white/70 text-xs">{text.pricingModal.poolAccess.adults}</span>
                                                    <span className="text-xl font-serif font-bold text-white">150 <span className="text-xs text-sand-gold">DH</span></span>
                                                </div>
                                                <div className="flex justify-between items-baseline">
                                                    <span className="text-white/70 text-xs">{text.pricingModal.poolAccess.kids}</span>
                                                    <span className="text-xl font-serif font-bold text-white">100 <span className="text-xs text-sand-gold">DH</span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-white/60">
                                            {text.pricingModal.poolAccess.desc}
                                        </p>
                                    </div>

                                    {/* 3. Balade à Quad & Activités */}
                                    <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 flex flex-col justify-between">
                                        <div>
                                            <div className="w-10 h-10 rounded-xl bg-sand-gold/20 text-sand-gold flex items-center justify-center mb-4">
                                                <Compass className="w-5 h-5" />
                                            </div>
                                            <h4 className="text-xl font-serif text-sand-gold mb-3">{text.pricingModal.activities.title}</h4>
                                            <div className="space-y-2.5 text-xs">
                                                <div className="flex justify-between items-baseline border-b border-white/5 pb-1">
                                                    <span>{text.pricingModal.activities.quad1}</span>
                                                    <span className="font-serif font-bold text-white text-base">150 <span className="text-[10px] text-sand-gold">DH</span></span>
                                                </div>
                                                <div className="flex justify-between items-baseline border-b border-white/5 pb-1">
                                                    <span>{text.pricingModal.activities.quad2}</span>
                                                    <span className="font-serif font-bold text-white text-base">200 <span className="text-[10px] text-sand-gold">DH</span></span>
                                                </div>
                                                <div className="flex justify-between items-baseline border-b border-white/5 pb-1">
                                                    <span>{text.pricingModal.activities.horse}</span>
                                                    <span className="font-serif font-bold text-white text-base">40 / 100 <span className="text-[10px] text-sand-gold">DH</span></span>
                                                </div>
                                                <div className="flex justify-between items-baseline border-b border-white/5 pb-1">
                                                    <span>{text.pricingModal.activities.poney}</span>
                                                    <span className="font-serif font-bold text-white text-base">30 <span className="text-[10px] text-sand-gold">DH</span></span>
                                                </div>
                                                <div className="flex justify-between items-baseline">
                                                    <span>{text.pricingModal.activities.gaming}</span>
                                                    <span className="font-serif font-bold text-white text-base">50 <span className="text-[10px] text-sand-gold">DH</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 4. Bungalow Promo */}
                                    <div className="bg-gradient-to-br from-sand-gold/25 via-[#183322] to-black rounded-[2rem] p-6 border border-sand-gold/40 flex flex-col justify-between shadow-xl">
                                        <div>
                                            <span className="inline-block px-2.5 py-0.5 bg-luxury-gold text-jungle-deep text-[9px] font-black uppercase rounded-full mb-3 shadow-md">
                                                {text.pricingModal.bungalow.tag}
                                            </span>
                                            <h4 className="text-xl font-serif text-sand-gold mb-2">{text.pricingModal.bungalow.title}</h4>
                                            <div className="border-y border-sand-gold/20 py-3 mb-3">
                                                <span className="text-[10px] text-white/70 uppercase block">{text.pricingModal.bungalow.perNight}</span>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-serif font-bold text-white">900 <span className="text-xs text-sand-gold">DH</span></span>
                                                    <span className="text-xs line-through text-white/50">1200 DH</span>
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-white/90 leading-relaxed mb-4">
                                                {text.pricingModal.bungalow.additional}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => { setShowPricing(false); setActiveExperience('bungalow'); setCurrentView('experience'); }}
                                            className="w-full py-2.5 rounded-xl bg-sand-gold text-jungle-deep font-bold uppercase text-[10px] tracking-wider hover:bg-white transition-colors cursor-pointer shadow-md"
                                        >
                                            {text.pricingModal.bungalow.book}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Top Navigation */}
            <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-[60] h-14 items-center justify-center gap-8 px-8 bg-[#08170E]/90 dark:bg-black/90 backdrop-blur-xl border-b border-sand-gold/20 shadow-md">
                <button onClick={() => setCurrentView('hours')} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${currentView === 'hours' ? 'text-sand-gold' : 'text-white/80 hover:text-sand-gold'}`}>
                    <Clock className="w-4 h-4 text-sand-gold" />
                    {text.topNav.hours}
                </button>
                <button onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Natura+Jungle+Park+Mohammedia', '_blank')} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-sand-gold transition-colors">
                    <MapPin className="w-4 h-4 text-sand-gold" />
                    {text.topNav.map}
                </button>
                <button onClick={() => setCurrentView('circuit-map')} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${currentView === 'circuit-map' ? 'text-sand-gold' : 'text-white/80 hover:text-sand-gold'}`}>
                    <Palmtree className="w-4 h-4 text-sand-gold" />
                    {text.topNav.circuit}
                </button>
                <button onClick={() => setCurrentView('menu')} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${currentView === 'menu' ? 'text-sand-gold' : 'text-white/80 hover:text-sand-gold'}`}>
                    <Utensils className="w-4 h-4 text-sand-gold" />
                    {text.topNav.kitchen}
                </button>
                <button onClick={toggleNightMode} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-sand-gold transition-colors">
                    {isNightMode ? <Sun className="w-4 h-4 text-sand-gold" /> : <Moon className="w-4 h-4 text-sand-gold" />}
                    {text.topNav.theme}
                </button>
            </nav>

            {/* Main Header */}
            <header className="px-6 lg:px-12 py-5 lg:pt-20 flex justify-between items-center sticky top-0 z-50 bg-[#F8F6F0]/90 dark:bg-[#050B07]/90 backdrop-blur-md max-w-7xl mx-auto w-full border-b border-sand-gold/15">
                <div className="flex-1 flex justify-start">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMenuOpen(true)}
                        className="w-10 h-10 flex items-center justify-center text-[#08170E] dark:text-sand-gold bg-white dark:bg-white/10 backdrop-blur-md rounded-2xl border border-sand-gold/25 hover:bg-sand-gold hover:text-jungle-deep transition-all shadow-sm"
                    >
                        <Menu className="w-5 h-5" />
                    </motion.button>
                </div>

                <div className="text-center flex-1">
                    <h1 className="text-lg lg:text-3xl font-serif font-bold tracking-[0.2em] uppercase text-[#08170E] dark:text-sand-gold">
                        {text.brand}
                    </h1>
                    <p className="text-[8px] lg:text-[10px] uppercase tracking-[0.35em] font-bold text-sand-gold">
                        {text.tagline}
                    </p>
                </div>

                <div className="flex-1 flex justify-end items-center gap-2">
                    {/* Language Switcher */}
                    {['fr', 'en', 'ar'].filter(lang => lang !== currentLanguage).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang as any)}
                            className="px-2.5 py-1 rounded-lg border border-sand-gold/30 bg-white/80 dark:bg-black/30 text-[10px] font-bold tracking-wider text-[#08170E] dark:text-sand-gold hover:bg-sand-gold hover:text-jungle-deep transition-all uppercase shadow-sm"
                        >
                            {lang === 'ar' ? 'العربية' : lang.toUpperCase()}
                        </button>
                    ))}

                    <motion.button
                        onClick={toggleNightMode}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 flex items-center justify-center text-[#08170E] dark:text-sand-gold bg-white dark:bg-white/10 backdrop-blur-md rounded-2xl border border-sand-gold/25 ml-2 shadow-sm hover:bg-sand-gold hover:text-jungle-deep transition-all"
                    >
                        {isNightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </motion.button>
                </div>
            </header>

            <main className="pb-28 lg:pb-16 max-w-7xl mx-auto">
                {/* Promotional Autumn Bungalow Banner */}
                <div className="px-6 lg:px-12 my-6">
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="rounded-[2.5rem] p-6 sm:p-8 bg-gradient-to-r from-[#08170E] via-[#15301E] to-[#08170E] text-white border border-sand-gold/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                        <div className="space-y-2 relative z-10 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-luxury-gold text-jungle-deep text-[10px] font-black uppercase rounded-full tracking-wider shadow-md">
                                <Flame className="w-3.5 h-3.5" />
                                <span>{text.promoBanner.badge} • {text.promoBanner.save}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-serif text-sand-gold font-bold">
                                {text.promoBanner.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-white/90 max-w-2xl font-medium leading-relaxed">
                                {text.promoBanner.desc}
                            </p>
                        </div>

                        <div className="flex gap-3 shrink-0 relative z-10">
                            <button
                                onClick={() => { setActiveExperience('bungalow'); setCurrentView('experience'); }}
                                className="px-6 py-3.5 rounded-2xl bg-luxury-gold text-jungle-deep font-bold uppercase text-xs tracking-wider hover:bg-white transition-all shadow-xl cursor-pointer"
                            >
                                {text.promoBanner.cta}
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Experience Carousel */}
                <div className="px-6 lg:px-12 mb-4 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-serif text-sand-gold tracking-tight">{text.explore}</h2>
                        <div className="h-1 w-12 bg-sand-gold mt-1.5 rounded-full" />
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
                            const currentX = x.get();
                            let newX = currentX;
                            while (newX < -baseWidth) newX += baseWidth;
                            while (newX > 0) newX -= baseWidth;
                            x.set(newX);
                        }}
                        className="flex gap-5 px-6 cursor-grab active:cursor-grabbing"
                    >
                        {displayBundles.map((bundle, idx) => {
                            const Icon = bundle.icon;
                            return (
                                <motion.div
                                    key={`${bundle.id}-${idx}`}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={bundle.action}
                                    className="flex-none w-[260px] sm:w-[300px] lg:w-[340px] h-[340px] lg:h-[440px] rounded-[2.5rem] relative overflow-hidden group shadow-xl border border-sand-gold/25 cursor-pointer"
                                >
                                    <div className="absolute inset-0">
                                        <img
                                            src={bundle.image}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            alt={bundle.title}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20 text-sand-gold group-hover:bg-sand-gold group-hover:text-jungle-deep transition-colors">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-serif text-white mb-1 group-hover:text-sand-gold transition-colors">{bundle.title}</h3>
                                        <p className="text-white/75 text-[10px] font-bold uppercase tracking-wider">{bundle.sub}</p>

                                        <div className="mt-4 flex items-center gap-1.5 text-sand-gold text-xs font-bold uppercase tracking-wider">
                                            <span>{isRTL ? 'استكشف' : 'Explorer'}</span>
                                            <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                <div className="px-6 lg:px-12 space-y-10">
                    {/* Quad Spotlight Card - Redesigned in Luxurious Deep Forest Gold Style */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="rounded-[2.5rem] p-6 sm:p-8 bg-gradient-to-r from-[#08170E] via-[#15301E] to-[#08170E] text-white border border-sand-gold/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-5 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-sand-gold/20 text-sand-gold border border-sand-gold/30 flex items-center justify-center shrink-0 shadow-inner">
                                <Compass className="w-7 h-7" />
                            </div>
                            <div className="space-y-1 text-center md:text-left">
                                <span className="text-[10px] font-black uppercase text-sand-gold tracking-[0.25em] block">
                                    {text.quadSpotlight.badge}
                                </span>
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white leading-tight">
                                    {text.quadSpotlight.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-white/85 max-w-xl font-medium leading-relaxed">
                                    {text.quadSpotlight.desc}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => { setActiveExperience('quad'); setCurrentView('experience'); }}
                            className="px-6 py-3.5 rounded-2xl bg-luxury-gold text-jungle-deep hover:bg-white font-bold uppercase text-xs tracking-wider transition-all shadow-xl cursor-pointer shrink-0 relative z-10"
                        >
                            {text.quadSpotlight.cta}
                        </button>
                    </motion.div>

                    {/* About Section */}
                    <section>
                        <div className="bg-white dark:bg-[#0B1D12] rounded-[2.5rem] p-8 lg:p-12 border border-sand-gold/25 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-sand-gold/5 rounded-full blur-3xl pointer-events-none" />
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-sand-gold mb-4 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {text.about_title}
                            </h2>
                            <p className="text-lg lg:text-2xl font-serif leading-relaxed text-[#08170E] dark:text-[#F8F6F0] italic font-medium">
                                "{text.about_text}"
                            </p>
                        </div>
                    </section>

                    {/* Catering, Team Building & School Trips */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-sand-gold">
                            {text.catering_title}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCurrentView('catering')}
                                className="h-44 rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg border border-sand-gold/20"
                            >
                                <img src={cateringImg} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Catering" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <h3 className="text-xl font-serif text-white">{translations[currentLanguage].title.catering}</h3>
                                </div>
                            </motion.div>

                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCurrentView('teambuilding')}
                                className="h-44 rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg border border-sand-gold/20"
                            >
                                <img src={tentDayImg} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Team Building" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <h3 className="text-xl font-serif text-white">{translations[currentLanguage].title.teambuilding}</h3>
                                </div>
                            </motion.div>

                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCurrentView('school')}
                                className="h-44 rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg border border-sand-gold/20"
                            >
                                <img src={lamaImg} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="School Trips" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <h3 className="text-xl font-serif text-white">{translations[currentLanguage].title.school}</h3>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Pack Day Section */}
                    <section>
                        <motion.div
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowPricing(true)}
                            className="relative h-64 lg:h-72 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl border border-sand-gold/25"
                        >
                            <img src={packDayImg} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Pack Day" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                            <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                                <h2 className="text-2xl lg:text-3xl font-serif text-white mb-2">
                                    {text.packDay.title}
                                </h2>
                                <p className="text-white/80 text-xs sm:text-sm max-w-md font-medium mb-4">
                                    {text.packDay.subtitle}
                                </p>
                                <button className="bg-sand-gold text-jungle-deep px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg">
                                    <Sparkles className="w-4 h-4" />
                                    {text.packDay.button}
                                </button>
                            </div>
                        </motion.div>
                    </section>

                    {/* Jungle Connect Section */}
                    <JungleConnect isRTL={isRTL} language={currentLanguage} />
                </div>

                {/* Footer */}
                <div className="pt-12 pb-6 text-center flex flex-col items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sand-gold">
                        © 2026 Natura Jungle. All Rights Reserved.
                    </p>
                    <a href="tel:0605500058" className="text-xs font-bold text-sand-gold hover:underline">
                        📞 Infoline & WhatsApp : 06 05 50 00 58
                    </a>
                </div>
            </main>

            {/* Bottom Mobile Navigation */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm h-16 bg-[#08170E]/95 dark:bg-black/95 backdrop-blur-xl rounded-[2rem] border border-sand-gold/30 flex lg:hidden items-center justify-around px-4 z-[90] shadow-2xl">
                <button
                    onClick={() => setCurrentView('hours')}
                    className={`flex flex-col items-center gap-0.5 ${currentView === 'hours' ? 'text-sand-gold' : 'text-white/60 hover:text-white'}`}
                >
                    <Clock className="w-4 h-4" />
                    <span className="text-[8px] font-bold uppercase">{text.topNav.hours}</span>
                </button>

                <button
                    onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Natura+Jungle+Park+Mohammedia', '_blank')}
                    className="flex flex-col items-center gap-0.5 text-white/60 hover:text-white"
                >
                    <MapPin className="w-4 h-4" />
                    <span className="text-[8px] font-bold uppercase">{text.topNav.map}</span>
                </button>

                <button
                    onClick={() => setCurrentView('circuit-map')}
                    className="w-12 h-12 rounded-full bg-sand-gold text-jungle-deep flex items-center justify-center shadow-lg -mt-6 hover:scale-105 transition-transform"
                >
                    <Palmtree className="w-6 h-6" />
                </button>

                <button
                    onClick={() => setCurrentView('menu')}
                    className={`flex flex-col items-center gap-0.5 ${currentView === 'menu' ? 'text-sand-gold' : 'text-white/60 hover:text-white'}`}
                >
                    <Utensils className="w-4 h-4" />
                    <span className="text-[8px] font-bold uppercase">{text.topNav.kitchen}</span>
                </button>

                <button
                    onClick={toggleNightMode}
                    className="flex flex-col items-center gap-0.5 text-white/60 hover:text-white"
                >
                    {isNightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span className="text-[8px] font-bold uppercase">{text.topNav.theme}</span>
                </button>
            </nav>

            {/* View Transitions */}
            <AnimatePresence>
                {currentView === 'menu' && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed inset-0 z-[200] bg-[#F8F6F0] dark:bg-[#050B07] overflow-y-auto"
                    >
                        <DigitalMenu language={currentLanguage} isRTL={isRTL} onBack={() => setCurrentView('base')} />
                    </motion.div>
                )}

                {currentView === 'booking' && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed inset-0 z-[150] bg-[#F8F6F0] dark:bg-[#050B07] overflow-y-auto"
                    >
                        <BungalowBooking
                            currentLanguage={currentLanguage}
                            onBack={() => setCurrentView('base')}
                            onPaymentComplete={() => {
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
                                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20"
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
                        className="fixed inset-0 z-[190] bg-[#F8F6F0] dark:bg-[#050B07] overflow-y-auto"
                    >
                        <FunPlay isRTL={isRTL} language={currentLanguage} onBack={() => setCurrentView('base')} />
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
                        transition={{ type: 'spring', damping: 25 }}
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
                        onAction={(target) => {
                            if (target === 'pricing') {
                                setActiveExperience(null);
                                setCurrentView('base');
                                setShowPricing(true);
                            } else {
                                setCurrentView(target as any);
                            }
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
