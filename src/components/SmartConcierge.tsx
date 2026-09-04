import { motion, AnimatePresence } from "framer-motion";
import { Bell, Coffee, Utensils, Zap, HelpCircle, ChevronRight } from "lucide-react";
import { useState } from "react";

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
        window.open(`https://wa.me/212681813081?text=${fullMessage}`, '_blank');
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end px-2">
                <div className="space-y-1">
                    <h2 className="text-3xl font-serif text-luxury-gold tracking-tight">{content.title[language]}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-jungle-deep/40 dark:text-pure-nature/40">
                        {content.subtitle[language]}
                    </p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-luxury-gold/5 rounded-full border border-luxury-gold/10">
                    <div className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">
                        {content.live[language]}
                    </span>
                </div>
            </div>

            {/* Main Banner */}
            <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="rounded-[3rem] p-10 lg:p-14 relative overflow-hidden group border border-luxury-gold/10 cursor-pointer bg-[#0b1d12] shadow-2xl"
            >
                {/* Welcoming Background Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/assets/natura/night stays.webp" 
                        className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000 object-center"
                        alt="Service Express Welcome"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1d12] via-[#0b1d12]/60 to-transparent" />
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-50" />
                </div>

                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000 rotate-12">
                    <Zap className="w-40 h-40 text-white" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                            <Utensils className="w-8 h-8 text-luxury-gold" />
                        </div>
                        <div>
                            <h3 className="text-white text-2xl lg:text-3xl font-serif mb-2">
                                {content.bannerTitle[language]}
                            </h3>
                            <p className="text-white/50 text-[10px] uppercase tracking-[0.4em] font-bold">
                                {content.bannerSub[language]}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                        className="bg-luxury-gold text-jungle-deep px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-2xl shadow-luxury-gold/20 flex items-center gap-4 active:scale-95 transition-all hover:bg-white hover:text-jungle-deep"
                    >
                        {isExpanded
                            ? content.hideOptions[language]
                            : content.showOptions[language]}
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            className="bg-jungle-deep/10 p-1 rounded-md"
                        >
                            <ChevronRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
                        </motion.div>
                    </button>
                </div>
            </motion.div>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -20 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -20 }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                            {services.map((service, idx) => {
                                const Icon = service.icon;
                                return (
                                    <motion.button
                                        key={service.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ y: -5 }}
                                        onClick={() => handleServiceClick(service.message[language])}
                                        className={`flex flex-col items-center justify-center gap-4 p-8 rounded-[2rem] border border-luxury-gold/5 bg-white/50 dark:bg-white/5 hover:bg-white hover:shadow-2xl hover:border-luxury-gold/20 transition-all duration-500 group`}
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-luxury-gold text-jungle-deep flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-xl gold-shadow mb-2">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <span className="text-[9px] font-bold text-jungle-deep dark:text-luxury-gold uppercase tracking-[0.2em] text-center max-w-[100px]">
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
