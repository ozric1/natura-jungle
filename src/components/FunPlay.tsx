import { motion } from 'framer-motion';
import { ChevronLeft, Sparkles, Smile, Trophy, Zap, ArrowRight, Star } from 'lucide-react';

interface Activity {
    id: string;
    name: { en: string; fr: string; ar: string };
    desc: { en: string; fr: string; ar: string };
    image: string;
    icon: any;
}

interface FunPlayProps {
    onBack: () => void;
    isRTL?: boolean;
    language: 'en' | 'fr' | 'ar';
}

const boxingImg = '/assets/natura/Jungle RESTAURANT 5.jpeg';
const trampolineImg = '/assets/natura/pool.jpeg';
const jumpRopeImg = '/assets/natura/park_view.jpg';

export const FunPlay = ({ onBack, isRTL = false, language }: FunPlayProps) => {
    const activities: Activity[] = [
        {
            id: 'boxing',
            name: { en: 'Boxing Machine', fr: 'Machine de Boxe', ar: 'آلة الملاكمة' },
            desc: { en: 'Test your strength and speed on our pro-grade punch machines.', fr: 'Testez votre force et votre rapidité sur nos machines de frappe professionnelles.', ar: 'اختبر قوتك وسرعتك على آلات الملاكمة الاحترافية لدينا.' },
            image: boxingImg,
            icon: Trophy
        },
        {
            id: 'trampoline',
            name: { en: 'Giant Trampoline', fr: 'Trampoline Géant', ar: 'ترامبولين عملاق' },
            desc: { en: 'Reach for the sky in our safe, high-elasticity jumping zone.', fr: 'Touchez le ciel dans notre zone de saut sécurisée à haute élasticité.', ar: 'صل إلى السماء في منطقة القفز الآمنة وذات المرونة العالية.' },
            image: trampolineImg,
            icon: Zap
        },
        {
            id: 'jump-rope',
            name: { en: 'Jumping Rope', fr: 'Corde à Sauter', ar: 'حبل القفز' },
            desc: { en: 'Classic fun to keep you active and energized.', fr: 'Un divertissement classique pour rester actif et énergisé.', ar: 'متعة كلاسيكية لتبقيك نشيطاً وحيوياً.' },
            image: jumpRopeImg,
            icon: Sparkles
        }
    ];

    return (
        <div className="h-screen w-full bg-pure-nature dark:bg-jungle-deep text-jungle-deep dark:text-pure-nature overflow-y-auto no-scrollbar scroll-smooth" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <header className="px-6 lg:px-12 py-12 flex justify-between items-end sticky top-0 z-50 bg-pure-nature/90 dark:bg-jungle-deep/90 backdrop-blur-xl border-b border-jungle-leaf/10">
                <div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onBack}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-jungle-leaf/10 text-jungle-deep dark:text-luxury-gold mb-6 border border-jungle-leaf/10"
                    >
                        <ChevronLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                    </motion.button>
                    <h1 className="text-4xl lg:text-6xl font-serif text-jungle-deep dark:text-luxury-gold tracking-tight">
                        {language === 'ar' ? 'المرح واللعب' : language === 'fr' ? 'Fun & Jeux' : 'Fun & Play'}
                    </h1>
                    <div className="h-1.5 w-16 bg-luxury-gold mt-4 rounded-full" />
                </div>
                <div className="w-16 h-16 rounded-[2rem] bg-luxury-gold text-jungle-deep flex items-center justify-center shadow-lg gold-shadow">
                    <Smile className="w-8 h-8" />
                </div>
            </header>

            <div className="px-6 py-12 space-y-24">
                {activities.map((act, index) => (
                    <motion.div
                        key={act.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
                    >
                        <div className="w-full md:w-1/2 aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative group">
                            <img src={act.image} alt={act.name[language]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 to-transparent" />
                            <div className="absolute top-6 right-6 p-4 glass-dark rounded-2xl border border-white/20">
                                <act.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 space-y-6">
                            <div className="flex items-center gap-3">
                                <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">Active Duty</span>
                            </div>
                            <h2 className="text-5xl font-serif leading-tight">{act.name[language]}</h2>
                            <p className="text-lg opacity-70 leading-relaxed font-medium">
                                {act.desc[language]}
                            </p>
                            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-700 hover:text-orange-950 transition-colors">
                                Learn More
                                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <footer className="p-16 text-center bg-jungle-deep text-pure-nature rounded-t-[4rem] mt-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" />
                <Smile className="w-16 h-16 mx-auto mb-8 text-luxury-gold" />
                <h3 className="text-4xl lg:text-5xl font-serif mb-6 text-luxury-gold">Ready for the challenge?</h3>
                <p className="text-pure-nature/60 mb-12 max-w-lg mx-auto text-lg leading-relaxed">Join us in the activities zone. Safe equipment, professional supervision, and endless fun for everyone.</p>
                <button
                    onClick={onBack}
                    className="bg-luxury-gold text-jungle-deep px-12 py-6 rounded-3xl font-bold uppercase tracking-widest text-sm gold-shadow hover:scale-105 transition-transform"
                >
                    Back to Dashboard
                </button>
            </footer>
        </div>
    );
};
