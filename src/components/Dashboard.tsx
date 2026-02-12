import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    ChevronRight,
    Map as MapIcon,
    Utensils,
    Sparkles,
    Star,
    Palmtree,
    Waves,
    Moon,
    Sun,
    Clock,
    Instagram,
    Phone
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
import cockatooImg from '../assets/park/cockatoo.jpg';
import tentImg from '../assets/park/tent.jpg';
import pondImg from '../assets/park/pond.jpg';
import wallabyImg from '../assets/park/wallaby.jpg';

export interface DashboardProps {
    language: 'en' | 'fr' | 'ar';
    isNightMode: boolean;
    toggleNightMode: () => void;
}

export const Dashboard = ({ language: currentLanguage, isNightMode, toggleNightMode }: DashboardProps) => {
    const isRTL = currentLanguage === 'ar';
    const [currentView, setCurrentView] = useState<'base' | 'menu' | 'tracker' | 'booking' | 'stargazer' | 'exhibition' | 'fun' | 'hours'>('base');
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
            about_title: "Respirez la Nature",
            about_text: "Nestled 11 km from Mohammedia, 10 km from Benslimane, and 8 km from Bouznika, just minutes from the Mensouria highway exit, Natura Jungle Park offers an immersive escape in the heart of nature. This peaceful haven charms with its idyllic setting, featuring a mini zoo, restaurant, children's play areas, equestrian adventures, thrilling quad excursions, and a refreshing swimming pool. For nature lovers, the park offers luxury bungalows for a harmonious night in this green oasis.",
            bundles: [
                { id: 1, title: "The Wild Circuit", sub: "Species Discovery", color: "bg-emerald-900", icon: Palmtree, image: wallabyImg, action: () => setCurrentView('exhibition') },
                { id: 4, title: "Fun & Play", sub: "Family Activities", color: "bg-orange-800", icon: Sparkles, image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800", action: () => setCurrentView('fun') },
                { id: 2, title: "The Oasis", sub: "Poolside Serenity", color: "bg-blue-900", icon: Waves, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800", action: () => { } },
                { id: 3, title: "Jungle Stays", sub: "Bungalows & Tents", color: "bg-amber-900", icon: Sparkles, image: tentImg, action: () => setCurrentView('booking') }
            ]
        },
        fr: {
            brand: "Natura Jungle",
            tagline: "L'expérience Sauvage",
            explore: "Zones d'Expérience",
            map_title: "Le Circuit Sauvage",
            map_status: "Suivi en Direct",
            kitchen: "La Cuisine",
            kitchen_status: "Cuisine Ouverte",
            kitchen_wait: "Prép. estimée: 25 min",
            order_btn: "Commander au Transat",
            about_title: "Respirez la Nature",
            about_text: "Niché à 11 kilomètres de Mohammedia, à 10km de Benslimane et 8km de Bouznika, quelques kilomètres de la sortie autoroute Mensouria, le Parc Natura Jungle offre une escapade immersive en pleine nature. Ce havre de paix séduit par son cadre idyllique, abritant un mini zoo, un restaurant, des espaces de jeux dédiés aux enfants, des aventures équestres, des excursions en quad palpitantes, ainsi qu'une piscine rafraîchissante. Pour les amoureux de la nature, le parc propose des bungalows de luxe, invitant à une nuit harmonieuse au cœur de cette oasis verdoyante.",
            bundles: [
                { id: 1, title: "Le Circuit Sauvage", sub: "Découverte des Espèces", color: "bg-emerald-900", icon: Palmtree, image: cockatooImg, action: () => setCurrentView('exhibition') },
                { id: 4, title: "Fun & Jeux", sub: "Activités Familiales", color: "bg-orange-800", icon: Sparkles, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?q=80&w=800", action: () => { } },
                { id: 2, title: "L'Oasis", sub: "Sérénité au Bord de l'Eau", color: "bg-blue-900", icon: Waves, image: pondImg, action: () => { } },
                { id: 3, title: "Séjours Jungle", sub: "Bungalows & Tents", color: "bg-amber-900", icon: Sparkles, image: tentImg, action: () => setCurrentView('booking') }
            ]
        },
        ar: {
            brand: "نطورا جانغل",
            tagline: "تجربة برية",
            explore: "مناطق التجربة",
            map_title: "المسار البري",
            map_status: "تتبع مباشر",
            kitchen: "المطبخ",
            kitchen_status: "المطبخ مفتوح",
            kitchen_wait: "مدة التحضير: ٢٥ دقيقة",
            order_btn: "اطلب الآن",
            about_title: "استنشق الطبيعة",
            about_text: "يقع منتزه نطورا جانغل على بعد ١١ كم من المحمدية، و١٠ كم من بنسليمان، و٨ كم من بوزنيقة، وعلى بعد دقائق قليلة من مخرج الطريق السيار المنصورية، ويوفر ملاذاً غامراً في قلب الطبيعة. يسحر هذا الملاذ الهادئ زواره بموقعه المثالي، حيث يضم حديقة حيوانات صغيرة، مطعماً، مساحات لعب للأطفال، مغامرات الفروسية، رحلات الكواد المثيرة، بالإضافة إلى مسبح منعش. لمحبي الطبيعة، يقدم المنتزه بناغل فاخرة لقضاء ليلة متناغمة في هذه الواحة الخضراء.",
            bundles: [
                { id: 1, title: isRTL ? 'المسار البري' : 'Wild Path', sub: isRTL ? 'اكتشاف الأنواع' : 'Species Discovery', color: "bg-emerald-900", icon: Palmtree, image: wallabyImg, action: () => setCurrentView('exhibition') },
                { id: 4, title: isRTL ? 'المرح واللعب' : 'Fun & Play', sub: isRTL ? 'أنشطة عائلية' : 'Family Activities', color: "bg-orange-800", icon: Sparkles, image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800", action: () => setCurrentView('fun') },
                { id: 2, title: isRTL ? 'الالواحة' : 'The Oasis', sub: isRTL ? 'هدوء المسبح' : 'Poolside Serenity', color: "bg-blue-900", icon: Waves, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800", action: () => { } },
                { id: 3, title: isRTL ? 'إقامات الغابة' : 'Jungle Stays', sub: isRTL ? 'بناغل وخيام' : 'Bungalows & Tents', color: "bg-amber-900", icon: Sparkles, image: tentImg, action: () => setCurrentView('booking') }
            ]
        }
    };

    const text = translations[currentLanguage];

    return (
        <div className={`min-h-screen font-sans transition-colors duration-1000 ${isNightMode ? 'dark bg-[#0D160D] text-white' : 'bg-egg-shell text-jungle-green'}`} dir={isRTL ? 'rtl' : 'ltr'}>

            {/* Header: Concierge Bar */}
            <header className="px-6 py-8 flex justify-between items-center sticky top-0 z-50 bg-inherit/80 backdrop-blur-md">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => alert(isRTL ? 'القائمة قريباً' : 'Menu Coming Soon')}
                    className="w-10 h-10 flex items-center justify-center text-sand-gold"
                >
                    <Menu className="w-6 h-6 text-jungle-green dark:text-sand-gold" />
                </motion.button>

                <div className="text-center">
                    <h1 className="text-xl font-serif font-bold tracking-widest uppercase text-sand-gold">
                        {text.brand}
                    </h1>
                    <p className="text-[8px] uppercase tracking-[0.3em] font-bold opacity-40">
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
                        className="w-8 h-8 flex items-center justify-center text-sand-gold/60"
                    >
                        {isNightMode ? <Sun className="w-5 h-5 text-sand-gold" /> : <Moon className="w-5 h-5 text-jungle-green" />}
                    </motion.button>
                </div>
            </header>

            <main className="pb-32">
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
                        {/* Hero Experience Carousel */}
                        <section className="mt-4 section-mask">
                            <div className="px-6 mb-4 flex justify-between items-end">
                                <h2 className="text-2xl font-serif text-jungle-green dark:text-white transition-colors">{text.explore}</h2>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="text-sand-gold text-xs font-bold uppercase tracking-widest"
                                >
                                    {isRTL ? 'عرض الكل' : 'View All'}
                                </motion.button>
                            </div>

                            <div className="flex overflow-x-auto gap-6 px-6 pb-8 no-scrollbar touch-pan-x">
                                {text.bundles.map((bundle) => {
                                    const Icon = bundle.icon;
                                    return (
                                        <motion.div
                                            key={bundle.id}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={bundle.action}
                                            className={`flex-none w-[280px] h-96 rounded-[2.5rem] relative overflow-hidden group shadow-2xl cursor-pointer ${bundle.color}`}
                                        >
                                            {bundle.image && (
                                                <div className="absolute inset-0">
                                                    <img src={bundle.image} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt={bundle.title} />
                                                </div>
                                            )}
                                            <div className="photo-overlay" />

                                            <div className="absolute inset-0 flex flex-col justify-end p-8">
                                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20">
                                                    <Icon className="text-sand-gold w-6 h-6" />
                                                </div>
                                                <h3 className="text-2xl font-serif text-white mb-1 leading-tight">{bundle.title}</h3>
                                                <p className="text-white/60 text-xs font-medium uppercase tracking-widest">{bundle.sub}</p>
                                            </div>

                                            <div className="absolute top-6 right-6">
                                                <div className="w-10 h-10 rounded-full bg-sand-gold flex items-center justify-center text-jungle-green translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-lg">
                                                    <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </section>

                        <div className="px-6 space-y-10">
                            {/* About Section */}
                            <section className="mt-4">
                                <div className="glass-morphism rounded-[2.5rem] p-8 border border-sand-gold/10 relative overflow-hidden backdrop-blur-xl">
                                    <div className="absolute -right-4 -top-4 opacity-5">
                                        <Palmtree className="w-32 h-32" />
                                    </div>
                                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-sand-gold mb-4">{text.about_title}</h2>
                                    <p className="text-lg font-serif leading-relaxed opacity-80 italic">
                                        "{text.about_text}"
                                    </p>
                                </div>
                            </section>


                            {/* Jungle Kitchen Section */}
                            <section className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <h2 className="text-2xl font-serif text-jungle-green dark:text-white transition-colors">{text.kitchen}</h2>
                                    <div className="flex items-center gap-2 text-jungle-terracotta bg-jungle-terracotta/5 px-3 py-1 rounded-full">
                                        <Clock className="w-3 h-3" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{text.kitchen_wait}</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {currentView === 'tracker' && activeOrder ? (
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
                                    ) : (
                                        <motion.button
                                            onClick={() => setCurrentView('menu')}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full bg-sand-gold text-jungle-green rounded-[3rem] p-8 flex items-center justify-between group overflow-hidden relative shadow-xl gold-shadow"
                                        >
                                            <div className="flex items-center gap-4 relative z-10">
                                                <div className="w-14 h-14 rounded-2xl bg-jungle-green/10 flex items-center justify-center">
                                                    <Utensils className="w-8 h-8" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{isRTL ? 'اطلب الآن' : 'Order Now'}</p>
                                                    <span className="text-xl font-serif">{text.order_btn}</span>
                                                </div>
                                            </div>
                                            <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                                        </motion.button>
                                    )}
                                </div>
                            </section>

                            {/* Smart Concierge Section */}
                            <SmartConcierge isRTL={isRTL} />

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
            <nav className="fixed bottom-0 left-0 right-0 h-24 flex justify-around items-center px-8 z-50 glass-dark border-t border-white/5">
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
                    <MapIcon className="w-5 h-5" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">{isRTL ? 'الخريطة' : 'Navigation'}</span>
                </motion.button>

                <div className="relative -mt-16">
                    <div className="absolute inset-0 bg-sand-gold blur-2xl opacity-40 rounded-full" />
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentView('exhibition')}
                        className={`w-16 h-16 rounded-[1.8rem] bg-sand-gold flex items-center justify-center text-jungle-green shadow-2xl relative z-10 gold-shadow ${currentView === 'exhibition' ? 'scale-110 ring-4 ring-sand-gold/20' : ''}`}
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
            </AnimatePresence>
        </div>
    );
};
