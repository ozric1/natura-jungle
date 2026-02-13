import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Coffee, Utensils, Zap, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface SmartConciergeProps {
    language: 'en' | 'fr' | 'ar';
}

export const SmartConcierge = ({ language }: SmartConciergeProps) => {
    const isRTL = language === 'ar';
    const [isExpanded, setIsExpanded] = useState(false);

    const content = {
        title: { en: 'Smart Concierge', fr: 'Conciergerie Intelligente', ar: 'الكونسيرج الذكي' },
        subtitle: { en: 'One tap service Bungalow Guest only', fr: 'Service en un clic pour les invités Bungalow', ar: 'خدمة الضغط الواحدة - لضيوف البنغل فقط' },
        live: { en: 'Live Service', fr: 'Service En Direct', ar: 'مباشر' },
        bannerTitle: { en: 'One-Tap Service', fr: 'Service Express', ar: 'نظام الخدمة السريع' },
        bannerSub: { en: 'Bungalow Guests Only', fr: 'Invités Bungalow Uniquement', ar: 'خاص بضيوف البنغل' },
        showOptions: { en: 'Request Service', fr: 'Demander un Service', ar: 'اطلب الخدمة الآن' },
        hideOptions: { en: 'Hide Options', fr: 'Masquer les Options', ar: 'إخفاء الخيارات' }
    };

    const services = [
        {
            id: 'towel',
            icon: Zap,
            label: { en: 'Request Towels', fr: 'Demander des Serviettes', ar: 'طلب مناشف' },
            message: { en: 'I need fresh towels please.', fr: 'J\'ai besoin de serviettes propres s\'il vous plaît.', ar: 'أحتاج إلى مناشف نظيفة من فضلك.' }
        },
        {
            id: 'coffee',
            icon: Coffee,
            label: { en: 'Morning Brew', fr: 'Café du Matin', ar: 'خدمة القهوة' },
            message: { en: 'I would like to order coffee.', fr: 'Je voudrais commander un café.', ar: 'أود طلب القهوة.' }
        },
        {
            id: 'cleaning',
            icon: Bell,
            label: { en: 'Room Service', fr: 'Service de Chambre', ar: 'تنظيف الغرفة' },
            message: { en: 'Please send housekeeping.', fr: 'Veuillez envoyer le service de ménage.', ar: 'الرجاء إرسال خدمة تنظيف الغرف.' }
        },
        {
            id: 'help',
            icon: HelpCircle,
            label: { en: 'Concierge Help', fr: 'Aide Concierge', ar: 'مساعدة' },
            message: { en: 'I need assistance with my query.', fr: 'J\'ai besoin d\'aide pour ma demande.', ar: 'أحتاج إلى مساعدة في استفساري.' }
        },
    ];

    const handleServiceClick = (message: string) => {
        const fullMessage = `Bungalow Service Request:%0A${message}`;
        window.open(`https://wa.me/212605500058?text=${fullMessage}`, '_blank');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-serif text-sand-gold transition-colors">{content.title[language]}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-jungle-green/40 dark:text-white/40 mt-1">
                        {content.subtitle[language]}
                    </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sand-gold animate-pulse">
                    {content.live[language]}
                </span>
            </div>

            {/* Main Banner - Now First */}
            <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="rounded-[2rem] p-8 relative overflow-hidden group border border-white/5 cursor-pointer bg-gradient-to-r from-emerald-900 to-black shadow-2xl"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Utensils className="w-24 h-24 text-white" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-white text-xl font-serif mb-2">
                        {content.bannerTitle[language]}
                    </h3>
                    <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-6">
                        {content.bannerSub[language]}
                    </p>
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                        className="bg-sand-gold text-jungle-green px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-sand-gold/20 flex items-center gap-2"
                    >
                        {isExpanded
                            ? content.hideOptions[language]
                            : content.showOptions[language]}
                    </button>
                </div>
            </motion.div>

            {/* Expanded Content - Now Second (Underneath) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            {services.map((service) => {
                                const Icon = service.icon;
                                return (
                                    <motion.button
                                        key={service.id}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleServiceClick(service.message[language])}
                                        className="premium-card p-4 text-left flex items-center gap-4 group hover:border-sand-gold/20"
                                        dir={isRTL ? 'rtl' : 'ltr'}
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-sand-gold/10 flex items-center justify-center text-sand-gold group-hover:scale-110 transition-transform flex-shrink-0">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm font-bold text-neutral-900 dark:text-white/90">
                                            {service.label[language]}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
