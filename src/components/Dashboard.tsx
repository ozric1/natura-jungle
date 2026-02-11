import { motion } from 'framer-motion';
import {
    Map as MapIcon,
    Utensils,
    Moon,
    Sun,
    Camera,
    Award,
    Star
} from 'lucide-react';
import { TagineTracker } from './TagineTracker';
import { KnowledgeCircuit } from './KnowledgeCircuit';
import { SmartBooking } from './SmartBooking';

export interface DashboardProps {
    language: 'en' | 'fr' | 'ar';
    isNightMode: boolean;
    toggleNightMode: () => void;
}

export const Dashboard = ({ language: currentLanguage, isNightMode, toggleNightMode }: DashboardProps) => {
    const translations = {
        en: { greeting: "Nature awaits,", name: "Adventurer", booking: "Booking", pass: "Pass", food: "Dining", circuit: "Discover", points: "Eco-Points" },
        fr: { greeting: "La nature vous attend,", name: "Aventurier", booking: "Réserver", pass: "Pass", food: "Dîner", circuit: "Découvrir", points: "Éco-Points" },
        ar: { greeting: "الطبيعة بانتظارك،", name: "مغامر", booking: "حجز", pass: "ممر", food: "طعام", circuit: "اكتشاف", points: "نقاط البيئة" }
    };

    const text = translations[currentLanguage];

    return (
        <div className={`min-h-screen transition-colors duration-1000 ${isNightMode ? 'bg-[#0F172A] text-white' : 'bg-jungle-light text-jungle-dark'} pb-32`}>
            {/* Header */}
            <header className={`px-6 pt-12 pb-8 rounded-b-[3rem] shadow-sm transition-colors duration-1000 ${isNightMode ? 'bg-[#1E293B]' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className={`${isNightMode ? 'text-jungle-sand' : 'text-jungle-sage/60'} font-medium`}>{text.greeting}</p>
                        <h1 className="text-3xl font-bold">{text.name}</h1>
                    </div>
                    <motion.button
                        onClick={toggleNightMode}
                        whileTap={{ scale: 0.9 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isNightMode ? 'bg-jungle-terracotta text-white' : 'bg-jungle-sage/10 text-jungle-sage'}`}
                    >
                        {isNightMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    </motion.button>
                </div>

                {/* Eco Points Bar */}
                <div className={`${isNightMode ? 'bg-slate-700' : 'bg-jungle-sage'} p-5 rounded-3xl text-white flex justify-between items-center shadow-lg transition-colors duration-1000`}>
                    <div>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">{text.points}</p>
                        <p className="text-2xl font-bold">1,250 <span className="text-white/60 text-sm font-normal">pts</span></p>
                    </div>
                    <div className="flex gap-4">
                        <motion.div whileHover={{ scale: 1.1 }} className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
                            <Camera className="w-5 h-5 text-white" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
                            <Award className="w-5 h-5 text-white" />
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 mt-8 space-y-10 font-organic text-organic">

                {/* Tagine Tracker */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center px-2">
                        <h2 className={`text-lg font-bold ${isNightMode ? 'text-white' : 'text-jungle-dark'}`}>Live Order</h2>
                        <span className="text-xs font-bold text-jungle-terracotta bg-jungle-terracotta/10 px-3 py-1 rounded-full animate-pulse">ON TRACK</span>
                    </div>
                    <TagineTracker status="cooking" />
                </section>

                {/* Knowledge Circuit */}
                <KnowledgeCircuit />

                {/* Smart Booking */}
                <SmartBooking />

                {/* Night Mode Wellness (Conditional) */}
                {isNightMode && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="jungle-card bg-gradient-to-br from-indigo-900 via-slate-900 to-black border-indigo-500/30 text-white p-8 overflow-hidden relative"
                    >
                        <div className="relative z-10 space-y-4 font-organic">
                            <div className="flex items-center gap-2 text-indigo-400">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="text-xs font-bold uppercase tracking-widest">Adult Wellness</span>
                            </div>
                            <h3 className="text-2xl font-bold">Stargazer Guide</h3>
                            <p className="text-sm text-slate-400">Localized AR star map for the dark night skies over the park.</p>
                            <button className="bg-indigo-600 px-6 py-3 rounded-xl font-bold text-sm">Open Explorer</button>
                        </div>
                        <div className="absolute -right-8 -bottom-8 opacity-20">
                            <Moon className="w-40 h-40 text-white" />
                        </div>
                    </motion.section>
                )}
            </main>

            {/* Bottom Nav */}
            <nav className={`fixed bottom-0 left-0 right-0 h-20 border-t flex justify-around items-center px-6 z-50 transition-colors duration-1000 ${isNightMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-black/5'} backdrop-blur-xl`}>
                <motion.div whileTap={{ y: -5 }}><Sun className={`w-6 h-6 ${isNightMode ? 'text-slate-600' : 'text-jungle-sage'}`} /></motion.div>
                <motion.div whileTap={{ y: -5 }}><MapIcon className="w-6 h-6 text-black/20" /></motion.div>
                <div className={`w-14 h-14 -mt-10 rounded-2xl shadow-lg flex items-center justify-center text-white transition-colors duration-700 ${isNightMode ? 'bg-jungle-terracotta shadow-jungle-terracotta/40' : 'bg-jungle-sage shadow-jungle-sage/30'}`}>
                    <Utensils className="w-6 h-6" />
                </div>
                <motion.div whileTap={{ y: -5 }}><Award className="w-6 h-6 text-black/20" /></motion.div>
                <motion.div whileTap={{ y: -5 }}><Moon className={`w-6 h-6 ${isNightMode ? 'text-white' : 'text-black/20'}`} /></motion.div>
            </nav>
        </div>
    );
};
