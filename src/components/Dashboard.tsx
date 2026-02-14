import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    ChevronLeft,
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
    PartyPopper
} from 'lucide-react';
import { useState } from 'react';
import { VIPOrderTracker } from './VIPOrderTracker';

import { SmartConcierge } from './SmartConcierge';
import { JungleConnect } from './JungleConnect';
import { DigitalMenu, type CartItem } from './DigitalMenu';
import { BungalowBooking } from './BungalowBooking';
import { NightSkyMap } from './NightSkyMap';
import { WildCircuitExhibition } from './WildCircuitExhibition';
import { FunPlay } from './FunPlay';
import { ParkHours } from './ParkHours';
import { CateringPartyservice } from './CateringPartyservice';
import { ExperienceShowcase } from './ExperienceShowcase';
const bungalowImg = '/assets/natura/bugalow.jpeg';
const restaurantImg = '/assets/natura/Jungle Restaurant.jpeg';
const cateringImg = '/assets/natura/Jungle Restaurant.jpeg';
const tentDayImg = '/assets/natura/berber tent at day.jpeg';
const lamaImg = '/assets/natura/animal circuit Lama.jpeg';
const poolImg = '/assets/natura/pool.jpeg';
const skyViewImg = '/assets/natura/Natura sky view MAIN PAGE BKGRND TWO.jpeg';

export interface DashboardProps {
    language: 'en' | 'fr' | 'ar';
    isNightMode: boolean;
    toggleNightMode: () => void;
}

export const Dashboard = ({ language: currentLanguage, isNightMode, toggleNightMode }: DashboardProps) => {
    const isRTL = currentLanguage === 'ar';
    const [currentView, setCurrentView] = useState<'base' | 'menu' | 'tracker' | 'booking' | 'stargazer' | 'exhibition' | 'fun' | 'hours' | 'catering' | 'teambuilding' | 'school' | 'experience'>('base');
    const [activeExperience, setActiveExperience] = useState<string | null>(null);
    const [activeOrder, setActiveOrder] = useState<{ items: string[], total: string } | null>(null);
    const [hasBooked, setHasBooked] = useState(false);

    const translations = {
        en: {
            brand: "Natura Jungle",
            tagline: "The Wild Experience",
            explore: "Experience Zones",
            map_title: "The Wild Circuit",
            map_status: "Live Tracking",
            kitchen: "The Kitchen",
            kitchen_status: "Kitchen Open",
            kitchen_wait: "Est. Prep: 25 mins",
            order_btn: "Order to your Lounger",
            about_title: "Breathe in Nature | Natura Jungle Park",
            about_text: "Natura Jungle Park is an immersive green escape located just minutes from the Mohammedia/Mansouria highway exit. Our eco-resort features a mini-zoo, gourmet restaurant, kids' playground, equestrian academy, and luxury bungalows. Whether you're seeking a family adventure, a refreshing pool day, or a peaceful night in a luxury bungalow, our park offers the perfect harmony of nature and comfort near Casablanca and Rabat.",
            bundles: [
                { id: 1, title: "Jungle Bungalow", sub: "Luxury Stays", color: "from-[#1a2f1a] to-[#0b1d12]", icon: Home, image: bungalowImg, action: () => { setActiveExperience('bungalow'); setCurrentView('experience'); } },
                { id: 2, title: "Jungle Restaurant", sub: "Fine Dining", color: "from-[#3d5a45] to-[#0b1d12]", icon: Utensils, image: restaurantImg, action: () => { setActiveExperience('restaurant'); setCurrentView('experience'); } },
                { id: 3, title: "Berber Tents", sub: "Authentic Experience", color: "from-[#a08860] to-[#0b1d12]", icon: Tent, image: tentDayImg, action: () => { setActiveExperience('tents'); setCurrentView('experience'); } },
                { id: 4, title: "Animal Park", sub: "Wild Circuit", color: "from-[#88a070] to-[#0b1d12]", icon: Palmtree, image: lamaImg, action: () => { setActiveExperience('park'); setCurrentView('experience'); } },
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
                school: 'Educational and fun adventures for students.'
            }
        },
        fr: {
            brand: "Natura Jungle",
            tagline: "L'expérience Sauvage",
            explore: "Exploration Sauvage",
            map_title: "Le Circuit Sauvage",
            map_status: "Suivi en Direct",
            kitchen: "La Cuisine",
            kitchen_status: "Cuisine Ouverte",
            kitchen_wait: "Prép. estimée: 25 min",
            order_btn: "Commander au Transat",
            about_title: "Respirez la Nature | Natura Jungle Park",
            about_text: "Le Parc Natura Jungle est une escapade immersive en pleine nature située à quelques minutes de la sortie d'autoroute Mohammedia/Mansouria. Notre éco-complexe propose un mini-zoo, un restaurant gastronomique, des aires de jeux pour enfants, une académie d'équitation et des bungalows de luxe. Que vous recherchiez une aventure en famille, une journée de détente au bord de la piscine ou une nuit paisible dans un bungalow de luxe, notre parc offre l'harmonie parfaite entre nature et confort.",
            bundles: [
                { id: 1, title: "Bungalow Jungle", sub: "Séjours de Luxe", color: "from-[#1a2f1a] to-[#0b1d12]", icon: Home, image: bungalowImg, action: () => { setActiveExperience('bungalow'); setCurrentView('experience'); } },
                { id: 2, title: "Restaurant Jungle", sub: "Gastronomie", color: "from-[#3d5a45] to-[#0b1d12]", icon: Utensils, image: restaurantImg, action: () => { setActiveExperience('restaurant'); setCurrentView('experience'); } },
                { id: 3, title: "Tentes Berbères", sub: "Expérience Authentique", color: "from-[#a08860] to-[#0b1d12]", icon: Tent, image: tentDayImg, action: () => { setActiveExperience('tents'); setCurrentView('experience'); } },
                { id: 4, title: "Parc Animalier", sub: "Circuit Sauvage", color: "from-[#88a070] to-[#0b1d12]", icon: Palmtree, image: lamaImg, action: () => { setActiveExperience('park'); setCurrentView('experience'); } },
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
                school: 'Aventures éducatives et ludiques pour les élèves.'
            }
        },
        ar: {
            brand: "نطورا جانغل",
            tagline: "تجربة برية لا تُنسى",
            explore: "مناطق الاستكشاف",
            map_title: "المسار البري",
            map_status: "تتبع مباشر",
            kitchen: "المطبخ",
            kitchen_status: "المطبخ مفتوح",
            kitchen_wait: "وقت التحضير: ٢٥ دقيقة",
            order_btn: "اطلب الآن إلى مكانك",
            about_title: "استنشق عبير الطبيعة | منتزه نطورا جانغل",
            about_text: "يعد منتزه نطورا جانغل ملاذاً طبيعياً ساحراً يقع على بعد دقائق من مخرج الطريق السيار المحمدية/المنصورية. يضم منتجعنا البيئي حديقة حيوانات، مطعماً فاخراً، مساحات لعب للأطفال، وأكاديمية للفروسية، بالإضافة إلى بناغل فاخرة. سواء كنت تبحث عن مغامرة عائلية، يوم استرخاء بجانب المسبح، أو ليلة هادئة في قلب الطبيعة، فإن منتزهنا يوفر مزيجاً مثالياً من الراحة والجمال الطبيعي بالقرب من الدار البيضاء والرباط.",
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
                school: 'مغامرات تعليمية وممتعة للطلاب'
            }
        }
    };

    const text = translations[currentLanguage];

    return (
        <div className={`min-h-screen font-sans transition-colors duration-1000 ${isNightMode ? 'dark bg-[#050805] text-white' : 'bg-egg-shell text-neutral-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>

            {/* Desktop Top Nav — hidden on mobile */}
            <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-[60] desktop-nav h-14 items-center justify-center gap-8 px-8">
                <button onClick={() => setCurrentView('hours')} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${currentView === 'hours' ? 'text-sand-gold' : 'text-white/60 hover:text-white'}`}>
                    <Clock className="w-4 h-4" />
                    {isRTL ? 'المواعيد' : 'Hours'}
                </button>
                <button onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Natura+Jungle+Park+Mohammedia', '_blank')} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                    <MapPin className="w-4 h-4" />
                    {isRTL ? 'الخريطة' : 'Map'}
                </button>
                <button onClick={() => setCurrentView('exhibition')} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${currentView === 'exhibition' ? 'text-sand-gold' : 'text-white/60 hover:text-white'}`}>
                    <Palmtree className="w-4 h-4" />
                    {isRTL ? 'الحيوانات' : 'Circuit'}
                </button>
                <button onClick={() => setCurrentView('menu')} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${currentView === 'menu' ? 'text-sand-gold' : 'text-white/60 hover:text-white'}`}>
                    <Utensils className="w-4 h-4" />
                    {isRTL ? 'المطبخ' : 'Kitchen'}
                </button>
                <button onClick={toggleNightMode} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                    {isNightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    {isRTL ? 'الوضع' : 'Theme'}
                </button>
            </nav>

            {/* Header: Concierge Bar */}
            <header className="px-6 lg:px-12 py-8 lg:pt-20 flex justify-between items-center sticky top-0 z-50 bg-inherit/80 backdrop-blur-md max-w-7xl mx-auto w-full">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => alert(isRTL ? 'القائمة قريباً' : 'Menu Coming Soon')}
                    className="w-10 h-10 flex items-center justify-center text-jungle-green dark:text-sand-gold"
                >
                    <Menu className="w-6 h-6" />
                </motion.button>

                <div className="text-center">
                    <h1 className="text-xl font-serif font-bold tracking-widest uppercase text-sand-gold">
                        {text.brand}
                    </h1>
                    <p className="text-[8px] uppercase tracking-[0.3em] font-bold opacity-60">
                        {text.tagline}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <motion.a
                        href="https://www.instagram.com/naturajunglepark/"
                        target="_blank"
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 flex items-center justify-center text-sand-gold/60 border border-sand-gold/20 rounded-full hover:bg-sand-gold/10 transition-colors"
                    >
                        <Instagram className="w-4 h-4 text-jungle-green dark:text-sand-gold" />
                    </motion.a>
                    <motion.a
                        href="tel:0605500058"
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 flex items-center justify-center text-sand-gold/60 border border-sand-gold/20 rounded-full hover:bg-sand-gold/10 transition-colors"
                    >
                        <Phone className="w-4 h-4 text-jungle-green dark:text-sand-gold" />
                    </motion.a>
                    <motion.button
                        onClick={toggleNightMode}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 flex items-center justify-center text-jungle-green dark:text-sand-gold/60"
                    >
                        {isNightMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </motion.button>
                </div>
            </header>

            <main className="pb-32 lg:pb-16 max-w-7xl mx-auto">
                {currentView === 'tracker' && activeOrder ? (
                    <div className="px-6 py-4 animate-slide-up">
                        <VIPOrderTracker
                            status="preparing"
                            orderId={`NJ-${Math.floor(1000 + Math.random() * 9000)}`}
                            items={activeOrder.items}
                            total={activeOrder.total}
                            isRTL={isRTL}
                            onReset={() => {
                                setCurrentView('base');
                                setActiveOrder(null);
                            }}
                        />
                    </div>
                ) : (
                    <>
                        <div className="px-6 lg:px-12 mb-6 flex justify-between items-end">
                            <div>
                                <h2 className="text-3xl font-serif text-luxury-gold tracking-tight">{text.explore}</h2>
                                <div className="h-1 w-12 bg-luxury-gold mt-2 rounded-full" />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        const container = document.getElementById('experience-zones-container');
                                        if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                                    }}
                                    className="w-10 h-10 rounded-full border border-luxury-gold/20 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
                                >
                                    <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                                </button>
                                <button
                                    onClick={() => {
                                        const container = document.getElementById('experience-zones-container');
                                        if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                                    }}
                                    className="w-10 h-10 rounded-full border border-luxury-gold/20 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
                                >
                                    <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        </div>

                        <div
                            id="experience-zones-container"
                            className="flex overflow-x-auto lg:grid lg:grid-cols-3 xl:grid-cols-6 gap-6 px-6 lg:px-12 pb-12 no-scrollbar touch-pan-x snap-x snap-mandatory"
                        >
                            {text.bundles.map((bundle) => {
                                const Icon = bundle.icon;
                                return (
                                    <motion.div
                                        key={bundle.id}
                                        whileHover={{ y: -12, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        animate={{
                                            y: [0, -5, 0],
                                            transition: {
                                                duration: 4,
                                                repeat: Infinity,
                                                delay: bundle.id * 0.4,
                                                ease: "easeInOut"
                                            }
                                        }}
                                        onClick={bundle.action}
                                        className="flex-none w-[85vw] sm:w-[350px] lg:w-auto h-[320px] lg:h-[450px] rounded-[2rem] lg:rounded-[3rem] relative overflow-hidden group shadow-2xl cursor-pointer border border-white/5 snap-center scroll-ml-6"
                                    >
                                        {bundle.image && (
                                            <div className="absolute inset-0">
                                                <img src={bundle.image} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt={bundle.title} />
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
                                                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="px-6 lg:px-12 space-y-10">
                            {/* About Section */}
                            <section className="mt-4">
                                <div className="glass-morphism rounded-[2.5rem] p-8 border border-sand-gold/10 relative overflow-hidden backdrop-blur-xl">
                                    <div className="absolute -right-4 -top-4 opacity-5">
                                        <Palmtree className="w-32 h-32" />
                                    </div>
                                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-sand-gold mb-4">{text.about_title}</h2>
                                    <p className="text-lg font-serif leading-relaxed italic text-black dark:text-white/90">
                                        "{text.about_text}"
                                    </p>
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

                            {/* Jungle Kitchen Section */}
                            <section className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <h2 className="text-2xl font-serif text-sand-gold transition-colors">{text.kitchen}</h2>
                                    <div className="flex items-center gap-2 text-jungle-terracotta bg-jungle-terracotta/5 px-3 py-1 rounded-full">
                                        <Clock className="w-3 h-3" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{text.kitchen_wait}</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <motion.button
                                        onClick={() => setCurrentView('menu')}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full bg-gradient-to-r from-emerald-900 to-black text-white rounded-[3rem] p-8 flex items-center justify-between group overflow-hidden relative shadow-xl gold-shadow"
                                    >
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                                                <Utensils className="w-8 h-8 text-sand-gold" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold">{(text as any).kitchen_order}</p>
                                                <span className="text-xl font-serif">{text.order_btn}</span>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                                    </motion.button>
                                </div>
                            </section>

                            {/* Smart Concierge Section */}
                            <SmartConcierge language={currentLanguage} />

                            {/* Jungle Connect Section */}
                            <JungleConnect isRTL={isRTL} />

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
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{isRTL ? 'تجربة ليلية متميزة' : 'Premium Night Sky'}</span>
                                        </div>
                                        <h3 className="text-3xl font-serif mb-2">{isRTL ? 'خريطة النجوم' : 'Stargazer Guide'}</h3>
                                        <p className="text-sm text-white/40 mb-6 max-w-[200px]">{isRTL ? 'دليل النجوم والمجرات فوق منصورية.' : 'Live AR star map for the dark skies over Mansouria.'}</p>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setCurrentView('stargazer')}
                                            className="bg-indigo-600/20 border border-indigo-400/30 text-indigo-100 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-600/40 transition-all font-sans"
                                        >
                                            {isRTL ? 'بدء العرض' : 'Launch AR View'}
                                        </motion.button>
                                    </div>
                                </motion.section>
                            )}
                        </div>
                    </>
                )}
            </main>

            {/* Premium Visitor Platform Bottom Nav */}
            <nav className="fixed bottom-6 left-6 right-6 h-20 nav-island flex lg:hidden justify-around items-center px-6 z-50">
                <motion.button
                    whileTap={{ y: -5 }}
                    onClick={() => setCurrentView('hours')}
                    className={`flex flex-col items-center gap-1 ${currentView === 'hours' ? 'text-sand-gold' : 'text-white/40'}`}
                >
                    <Clock className="w-5 h-5" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">{isRTL ? 'المواعيد' : 'Hours'}</span>
                </motion.button>

                <motion.button
                    whileTap={{ y: -5 }}
                    onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Natura+Jungle+Park+Mohammedia', '_blank')}
                    className="flex flex-col items-center gap-1 text-white/40"
                >
                    <MapPin className="w-5 h-5" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">{isRTL ? 'الخريطة' : 'Map'}</span>
                </motion.button>

                <div className="relative -mt-12">
                    <div className="absolute inset-0 bg-sand-gold blur-2xl opacity-40 rounded-full" />
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentView('exhibition')}
                        className={`w-16 h-16 rounded-full bg-sand-gold flex items-center justify-center text-jungle-green shadow-2xl relative z-10 gold-shadow ${currentView === 'exhibition' ? 'scale-110 ring-4 ring-sand-gold/20' : ''}`}
                    >
                        <Palmtree className="w-8 h-8" />
                    </motion.button>
                </div>

                <motion.button
                    whileTap={{ y: -5 }}
                    onClick={() => setCurrentView('menu')}
                    className={`flex flex-col items-center gap-1 ${currentView === 'menu' ? 'text-sand-gold' : 'text-white/40'}`}
                >
                    <Utensils className="w-5 h-5" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">{isRTL ? 'المطبخ' : 'Kitchen'}</span>
                </motion.button>

                <motion.button
                    whileTap={{ y: -5 }}
                    onClick={toggleNightMode}
                    className="flex flex-col items-center gap-1 text-white/40"
                >
                    {isNightMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span className="text-[8px] font-bold uppercase tracking-widest">{isRTL ? 'الوضع' : 'Theme'}</span>
                </motion.button>
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
                            onOrderPlaced={(cart: CartItem[], total: number) => {
                                setActiveOrder({
                                    items: cart.map(i => `${i.quantity}x ${i.name}`),
                                    total: `${total} MAD`
                                });
                                setCurrentView('tracker');
                            }}
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
                            isRTL={isRTL}
                            onBack={() => setCurrentView('base')}
                            onPaymentComplete={() => {
                                setHasBooked(true);
                                setCurrentView('base');
                            }}
                        />
                    </motion.div>
                )}
                {currentView === 'exhibition' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[180] bg-egg-shell dark:bg-ink-black overflow-hidden"
                    >
                        <WildCircuitExhibition
                            isRTL={isRTL}
                            language={currentLanguage}
                            onBack={() => setCurrentView('base')}
                        />
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
                        <ParkHours isRTL={isRTL} onClose={() => setCurrentView('base')} />
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
        </div>
    );
};
