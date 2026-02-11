import { motion } from 'framer-motion';
import {
    Menu,
    Globe,
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
    Award
} from 'lucide-react';
import { useState } from 'react';
import { VIPOrderTracker } from './VIPOrderTracker';
import { AnimalDiscovery } from './AnimalDiscovery';

export interface DashboardProps {
    language: 'en' | 'fr' | 'ar';
    isNightMode: boolean;
    toggleNightMode: () => void;
}

export const Dashboard = ({ language: currentLanguage, isNightMode, toggleNightMode }: DashboardProps) => {
    const isRTL = currentLanguage === 'ar';
    const [selectedAnimal, setSelectedAnimal] = useState<any>(null);

    const dummyAnimal = {
        name: currentLanguage === 'ar' ? 'الببغاء الذهبي' : 'Golden Cockatoo',
        species: currentLanguage === 'ar' ? 'ببغاء استوائي' : 'Tropical Psittaciformes',
        character: currentLanguage === 'ar' ? 'ذكي للغاية واجتماعي، يحب التفاعل مع الزوار.' : 'Highly intelligent and social, known for its vibrant personality and love for interaction.',
        intelligence: currentLanguage === 'ar' ? 'يمكنه حل الألغاز المعقدة وتقليد أكثر من ٥٠ صوتاً مختلفاً.' : 'Capable of solving complex puzzles and mimicking over 50 distinct sounds in the wild.',
        image: 'https://images.unsplash.com/photo-1544979592-74892477383a?q=80&w=2070&auto=format&fit=crop',
        audioSrc: '#'
    };

    if (selectedAnimal) {
        return <AnimalDiscovery animal={selectedAnimal} onBack={() => setSelectedAnimal(null)} isRTL={isRTL} />;
    }

    const translations = {
        en: {
            brand: "Natura Jungle",
            tagline: "The Wild Experience",
            explore: "Experience Bundles",
            map_title: "Interactive Park Map",
            map_status: "Live in the Park",
            kitchen: "Jungle Kitchen",
            kitchen_status: "Kitchen Open",
            kitchen_wait: "Est. Prep: 25 mins",
            order_btn: "Order to your Lounger",
            bundles: [
                { id: 1, title: "Wild Encounters", sub: "Animals & Biozones", color: "bg-emerald-900", icon: Palmtree },
                { id: 2, title: "Poolside Serenity", sub: "Water & Relaxation", color: "bg-blue-900", icon: Waves },
                { id: 3, title: "Nature Explorer", sub: "Discovery Circuit", color: "bg-amber-900", icon: Sparkles }
            ]
        },
        fr: {
            brand: "Natura Jungle",
            tagline: "L'expérience Sauvage",
            explore: "Packs d'Expérience",
            map_title: "Carte Interactive",
            map_status: "En direct du Parc",
            kitchen: "Cuisine de la Jungle",
            kitchen_status: "Cuisine Ouverte",
            kitchen_wait: "Prép. estimée: 25 min",
            order_btn: "Commander au Transat",
            bundles: [
                { id: 1, title: "Rencontres Sauvages", sub: "Animaux & Biozones", color: "bg-emerald-900", icon: Palmtree },
                { id: 2, title: "Sérénité Piscine", sub: "Eau & Détente", color: "bg-blue-900", icon: Waves },
                { id: 3, title: "Explorateur Nature", sub: "Circuit Découverte", color: "bg-amber-900", icon: Sparkles }
            ]
        },
        ar: {
            brand: "نطورا جانغل",
            tagline: "تجربة برية",
            explore: "باقات التجربة",
            map_title: "خريطة الحديقة التفاعلية",
            map_status: "مباشر من الحديقة",
            kitchen: "مطبخ الغابة",
            kitchen_status: "المطبخ مفتوح",
            kitchen_wait: "مدة التحضير: ٢٥ دقيقة",
            order_btn: "اطلب الآن",
            bundles: [
                { id: 1, title: "لقاءات برية", sub: "حيوانات ومناطق حيوية", color: "bg-emerald-900", icon: Palmtree },
                { id: 2, title: "هدوء المسبح", sub: "ماء واسترخاء", color: "bg-blue-900", icon: Waves },
                { id: 3, title: "مستكشف الطبيعة", sub: "مسار الاكتشاف", color: "bg-amber-900", icon: Sparkles }
            ]
        }
    };

    const text = translations[currentLanguage];

    return (
        <div className={`min-h-screen font-sans transition-colors duration-1000 ${isNightMode ? 'bg-jungle-green text-white' : 'bg-egg-shell text-jungle-green'}`} dir={isRTL ? 'rtl' : 'ltr'}>

            {/* Header: Concierge Bar */}
            <header className="px-6 py-8 flex justify-between items-center sticky top-0 z-50 bg-inherit/80 backdrop-blur-md">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 flex items-center justify-center text-sand-gold"
                >
                    <Menu className="w-6 h-6" />
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
                    <motion.button
                        onClick={toggleNightMode}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 flex items-center justify-center text-sand-gold/60"
                    >
                        {isNightMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </motion.button>
                    <Globe className="w-5 h-5 text-sand-gold/40" />
                </div>
            </header>

            <main className="pb-32">
                {/* Hero Experience Carousel */}
                <section className="mt-4">
                    <div className="px-6 mb-4 flex justify-between items-end">
                        <h2 className="text-2xl font-serif">{text.explore}</h2>
                        <span className="text-sand-gold text-xs font-bold uppercase tracking-widest">{isRTL ? 'عرض الكل' : 'View All'}</span>
                    </div>

                    <div className="flex overflow-x-auto gap-6 px-6 pb-8 no-scrollbar touch-pan-x">
                        {text.bundles.map((bundle) => {
                            const Icon = bundle.icon;
                            return (
                                <motion.div
                                    key={bundle.id}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex-none w-[280px] h-96 rounded-[2.5rem] relative overflow-hidden group shadow-2xl ${bundle.color}`}
                                >
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20">
                                            <Icon className="text-sand-gold w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-serif text-white mb-1 leading-tight">{bundle.title}</h3>
                                        <p className="text-white/60 text-xs font-medium uppercase tracking-widest">{bundle.sub}</p>
                                    </div>

                                    <div className="absolute top-6 right-6">
                                        <div className="w-10 h-10 rounded-full bg-sand-gold flex items-center justify-center text-jungle-green translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                <div className="px-6 space-y-10">
                    {/* Interactive Park Map Snippet */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif">{text.map_title}</h2>
                        <motion.div
                            whileTap={{ scale: 0.98 }}
                            className="h-64 rounded-[3rem] relative overflow-hidden gold-shadow border border-sand-gold/10 bg-[url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-jungle-green/40 to-transparent" />
                            <div className="absolute top-6 right-6 flex items-center gap-2 glass-morphism px-4 py-2 rounded-full">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[10px] text-white font-bold uppercase tracking-widest">{text.map_status}</span>
                            </div>

                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-sand-gold flex items-center justify-center text-jungle-green shadow-lg">
                                    <MapIcon className="w-6 h-6" />
                                </div>
                                <div className="text-white">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Full Detail</p>
                                    <p className="text-lg font-serif">Open Atlas</p>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Jungle Kitchen Section */}
                    <section className="space-y-4">
                        <div className="flex justify-between items-end">
                            <h2 className="text-2xl font-serif">{text.kitchen}</h2>
                            <div className="flex items-center gap-2 text-jungle-terracotta bg-jungle-terracotta/5 px-3 py-1 rounded-full">
                                <Clock className="w-3 h-3" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{text.kitchen_wait}</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <VIPOrderTracker
                                status="preparing"
                                orderId="NJ-7742"
                                items={['Lamb Tagine', 'Mint Tea']}
                                total="240 MAD"
                                isRTL={isRTL}
                            />

                            <motion.button
                                onClick={() => setSelectedAnimal(dummyAnimal)}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-jungle-green border border-sand-gold/20 text-sand-gold rounded-[2rem] p-6 flex items-center justify-between group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-sand-gold/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-sand-gold/10 flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-sand-gold" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{isRTL ? 'اكتشف المزيد' : 'Featured Story'}</p>
                                        <span className="text-lg font-serif">{isRTL ? 'اكتشف الببغاء الذهبي' : 'Meet the Golden Cockatoo'}</span>
                                    </div>
                                </div>
                                <ChevronRight className={`w-6 h-6 relative z-10 transition-transform group-hover:translate-x-2 ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                            </motion.button>
                        </div>
                    </section>

                    {/* Night Sky Feature (If applicable) */}
                    {(isNightMode || new Date().getHours() >= 18 || new Date().getHours() < 6) && (
                        <motion.section
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-[3rem] p-8 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-black border border-indigo-500/20 text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Star className="w-32 h-32 fill-white" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-indigo-400 mb-4">
                                    <Moon className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Overnight Experience</span>
                                </div>
                                <h3 className="text-3xl font-serif mb-2">Stargazer Guide</h3>
                                <p className="text-sm text-white/40 mb-6 max-w-[200px]">Live AR star map for the dark skies over Mansouria.</p>
                                <button className="bg-indigo-600/20 border border-indigo-400/30 text-indigo-100 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-600/40 transition-all">
                                    Launch AR View
                                </button>
                            </div>
                        </motion.section>
                    )}
                </div>
            </main>

            {/* Premium Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 h-24 flex justify-around items-center px-8 z-50 glass-dark">
                <motion.button whileTap={{ y: -5 }} className="w-10 h-10 flex items-center justify-center text-sand-gold">
                    <Sparkles className="w-6 h-6" />
                </motion.button>
                <motion.button whileTap={{ y: -5 }} className="w-10 h-10 flex items-center justify-center text-white/20">
                    <MapIcon className="w-6 h-6" />
                </motion.button>

                <div className="relative -mt-16">
                    <div className="absolute inset-0 bg-sand-gold blur-2xl opacity-40 rounded-full" />
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 rounded-[1.5rem] bg-sand-gold flex items-center justify-center text-jungle-green shadow-2xl relative z-10 gold-shadow"
                    >
                        <Utensils className="w-8 h-8" />
                    </motion.button>
                </div>

                <motion.button whileTap={{ y: -5 }} className="w-10 h-10 flex items-center justify-center text-white/20">
                    <Award className="w-6 h-6" />
                </motion.button>
                <motion.button whileTap={{ y: -5 }} className="w-10 h-10 flex items-center justify-center text-white/20">
                    <Moon className="w-6 h-6" />
                </motion.button>
            </nav>
        </div>
    );
};

