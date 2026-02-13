import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Coffee, Utensils, Zap, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface SmartConciergeProps {
    isRTL?: boolean;
}

export const SmartConcierge = ({ isRTL = false }: SmartConciergeProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const services = [
        { id: 'towel', icon: Zap, label: isRTL ? 'طلب مناشف' : 'Request Towels' },
        { id: 'coffee', icon: Coffee, label: isRTL ? 'خدمة القهوة' : 'Morning Brew' },
        { id: 'cleaning', icon: Bell, label: isRTL ? 'تنظيف الغرفة' : 'Room Service' },
        { id: 'help', icon: HelpCircle, label: isRTL ? 'مساعدة' : 'Concierge Help' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-serif text-jungle-green dark:text-white transition-colors">{isRTL ? 'الكونسيرج الذكي' : 'Smart Concierge'}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-jungle-green/40 dark:text-white/40 mt-1">
                        {isRTL ? 'خدمة الضغط الواحدة - لضيوف البنغل فقط' : 'One tap service Bungalow Guest only'}
                    </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sand-gold animate-pulse">
                    {isRTL ? 'مباشر' : 'Live Service'}
                </span>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-2 gap-4 pb-4">
                            {services.map((service) => {
                                const Icon = service.icon;
                                return (
                                    <motion.button
                                        key={service.id}
                                        whileTap={{ scale: 0.95 }}
                                        className="premium-card p-6 text-left flex flex-col gap-4 group hover:border-sand-gold/20"
                                        dir={isRTL ? 'rtl' : 'ltr'}
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-sand-gold/10 flex items-center justify-center text-sand-gold group-hover:scale-110 transition-transform">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white/80">
                                            {service.label}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                        {isRTL ? 'نظام الخدمة السريع' : 'One-Tap Service'}
                    </h3>
                    <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold mb-6">
                        {isRTL ? 'خاص بضيوف البنغل' : 'Bungalow Guests Only'}
                    </p>
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                        className="bg-sand-gold text-jungle-green px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-sand-gold/20"
                    >
                        {isExpanded
                            ? (isRTL ? 'إخفاء الخيارات' : 'Hide Options')
                            : (isRTL ? 'اطلب الخدمة الآن' : 'Request Service')}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
