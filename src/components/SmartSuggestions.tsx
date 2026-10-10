import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Sparkles, Compass, Home, Utensils, Waves, ArrowRight } from 'lucide-react';

export interface SmartSuggestionsProps {
    language: 'en' | 'fr' | 'ar';
    onNavigate: (view: 'quad' | 'booking' | 'menu' | 'pricing' | 'hours') => void;
}

export const SmartSuggestions = ({ language, onNavigate }: SmartSuggestionsProps) => {
    const isRTL = language === 'ar';
    const [isVisible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDismissed, setIsDismissed] = useState(false);

    const suggestions = [
        {
            id: 'quad',
            icon: Compass,
            badge: { en: 'Sunset Adventure', fr: 'Aventure & Nature', ar: 'مغامرة واستكشاف' },
            title: { en: 'Sunset Quad Ride', fr: 'Balade à Quad au Couché de Soleil', ar: 'جولة كواد عند الغروب' },
            text: {
                en: 'Enjoy thrilling forest trails and breathtaking sunset views from 150 DH!',
                fr: 'Profitez d\'une balade à Quad magique au coucher du soleil en pleine forêt dès 150 DH !',
                ar: 'استمتع بجولة كواد ساحرة عند غروب الشمس وسط الطبيعة ابتداءً من 150 درهم !'
            },
            cta: { en: 'Discover Quad', fr: 'Découvrir le Quad', ar: 'اكتشف الكواد' },
            action: () => onNavigate('quad')
        },
        {
            id: 'bungalow',
            icon: Home,
            badge: { en: 'Family Stays', fr: 'Séjour en Famille', ar: 'إقامة عائلية' },
            title: { en: 'Family Bungalow Stays', fr: 'Séjour Bungalow dès 900 DH', ar: 'إقامة البنغالو ابتداءً من 900 درهم' },
            text: {
                en: 'Discover our 4 official bungalow packages with breakfast, animal park & pool options!',
                fr: 'Découvrez nos 4 formules de séjour avec petit-déjeuner, parc animalier et option piscine !',
                ar: 'اكتشف باقاتنا الـ 4 الرسمية للإقامة مع فطور الصباح، حديقة الحيوان وخيار المسبح!'
            },
            cta: { en: 'View Packages', fr: 'Voir les Formules', ar: 'عرض الباقات' },
            action: () => onNavigate('booking')
        },
        {
            id: 'restaurant',
            icon: Utensils,
            badge: { en: 'Gourmet Kitchen', fr: 'Pause Gourmande', ar: 'أطباق شهية' },
            title: { en: 'New Restaurant Menu', fr: 'Nouvelle Carte & Rôtisserie', ar: 'قائمة طعام جديدة' },
            text: {
                en: 'Taste authentic Tagines, roasted chicken and fresh fruit cocktails in nature!',
                fr: 'Savourez nos Tagines authentiques, notre poulet rôti doré et nos jus frais !',
                ar: 'تذوق ألذ الطواجن المغربية، الدجاج المحمر والعصائر الطبيعية المنعشة !'
            },
            cta: { en: 'View Menu', fr: 'Voir le Menu', ar: 'عرض القائمة' },
            action: () => onNavigate('menu')
        },
        {
            id: 'pool',
            icon: Waves,
            badge: { en: 'No Reservation Required', fr: 'Visite Libre & Détente', ar: 'زيارة بدون حجز' },
            title: { en: 'Park & Pool Day', fr: 'Journée Parc & Piscine', ar: 'يوم في المتنزه والمسبح' },
            text: {
                en: 'Animal park access with complimentary cold drink & refreshing pool area!',
                fr: 'Accès au parc avec boisson fraîche offerte et espace piscine sans réservation préalable.',
                ar: 'دخول حديقة الحيوان مع مشروب بارد مجاني ومنطقة مسبح رائعة بدون حجز مسبق.'
            },
            cta: { en: 'View Rates', fr: 'Voir les Tarifs', ar: 'عرض الأسعار' },
            action: () => onNavigate('pricing')
        }
    ];

    // Trigger on scroll or after initial timeout
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isDismissed) setIsVisible(true);
        }, 3500);

        const handleScroll = () => {
            if (!isDismissed && window.scrollY > 200) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isDismissed]);

    // Rotate suggestions automatically
    useEffect(() => {
        if (!isVisible || isDismissed) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % suggestions.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [isVisible, isDismissed, suggestions.length]);

    if (isDismissed || !isVisible) return null;

    const currentItem = suggestions[currentIndex];
    const Icon = currentItem.icon;

    return (
        <aside aria-label="Interactive Suggestions" className={`fixed bottom-24 lg:bottom-8 ${isRTL ? 'left-4 sm:left-8' : 'right-4 sm:right-8'} z-[110] max-w-sm w-[calc(100%-2rem)] sm:w-96 pointer-events-auto`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="rounded-3xl p-4 sm:p-5 bg-[#0B1D12]/95 dark:bg-black/95 text-white border border-sand-gold/30 shadow-2xl backdrop-blur-xl relative overflow-hidden"
                    dir={isRTL ? 'rtl' : 'ltr'}
                >
                    {/* Glowing highlight */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sand-gold/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Close button */}
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            setIsDismissed(true);
                        }}
                        className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors z-20"
                        title="Fermer"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-start gap-3 relative z-10">
                        <div className="w-10 h-10 rounded-2xl bg-sand-gold/20 text-sand-gold border border-sand-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 pr-4">
                            <div className="flex items-center gap-1.5 mb-1">
                                <Sparkles className="w-3 h-3 text-sand-gold animate-pulse" />
                                <span className="text-[9px] font-bold uppercase tracking-wider text-sand-gold">
                                    {currentItem.badge[language]}
                                </span>
                            </div>

                            <h3 className="text-sm font-serif font-bold text-white leading-snug">
                                {currentItem.title[language]}
                            </h3>

                            <p className="text-xs text-white/80 font-medium leading-relaxed mt-1 mb-3">
                                {currentItem.text[language]}
                            </p>

                            <div className="flex items-center justify-between pt-1 border-t border-white/10">
                                <div className="flex gap-1">
                                    {suggestions.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-5 bg-sand-gold' : 'w-1.5 bg-white/30'}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={currentItem.action}
                                    className="px-3.5 py-1.5 rounded-xl bg-sand-gold text-jungle-deep font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5 hover:bg-white transition-all shadow-md active:scale-95 cursor-pointer"
                                >
                                    <span>{currentItem.cta[language]}</span>
                                    <ArrowRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </aside>
    );
};
