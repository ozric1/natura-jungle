import { motion } from 'framer-motion';
import { X, Calendar, Users, MessageSquare, ArrowRight, Utensils } from 'lucide-react';
import { useState } from 'react';

interface CateringPartyserviceProps {
    onClose: () => void;
    isRTL?: boolean;
}

export const CateringPartyservice = ({ onClose, isRTL = false }: CateringPartyserviceProps) => {
    const [formData, setFormData] = useState({
        size: '',
        time: '',
        food: ''
    });

    const handleBook = () => {
        const text = `New Catering Request:%0A
- Group Size: ${formData.size}%0A
- Arrival Time: ${formData.time}%0A
- Food Orders: ${formData.food}`;

        window.open(`https://wa.me/212605500058?text=${text}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center pointer-events-none p-4" dir={isRTL ? 'rtl' : 'ltr'}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            />

            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-[2.5rem] p-8 pointer-events-auto relative shadow-2xl border border-sand-gold/20"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/10 flex items-center justify-center text-neutral-500 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/20 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-serif text-sand-gold mb-2">
                        {isRTL ? 'خدمة الحفلات والتموين' : 'Catering & Party'}
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                        {isRTL ? 'خطط لمناسبتك معنا' : 'Plan your special event with us.'}
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    {/* Group Size */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                            <Users className="w-4 h-4 text-sand-gold" />
                            {isRTL ? 'حجم المجموعة' : 'Group Size'}
                        </label>
                        <input
                            type="number"
                            value={formData.size}
                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                            placeholder={isRTL ? 'عدد الأشخاص' : 'Number of guests'}
                            className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-4 text-neutral-900 dark:text-white focus:ring-2 focus:ring-sand-gold outline-none transition-all"
                        />
                    </div>

                    {/* Arrival Time */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-sand-gold" />
                            {isRTL ? 'وقت الوصول' : 'Arrival Time'}
                        </label>
                        <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-4 text-neutral-900 dark:text-white focus:ring-2 focus:ring-sand-gold outline-none transition-all"
                        />
                    </div>

                    {/* Food Orders */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                            <Utensils className="w-4 h-4 text-sand-gold" />
                            {isRTL ? 'طلبات الطعام' : 'Food Orders'}
                        </label>
                        <textarea
                            value={formData.food}
                            onChange={(e) => setFormData({ ...formData, food: e.target.value })}
                            placeholder={isRTL ? 'تحقق من القائمة، إذا كان لديك طلب خاص اتصل بنا' : 'Check menu, or describe specific requests...'}
                            rows={3}
                            className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-4 text-neutral-900 dark:text-white focus:ring-2 focus:ring-sand-gold outline-none transition-all resize-none"
                        />
                    </div>

                    {/* Book Button */}
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBook}
                        className="w-full bg-gradient-to-r from-emerald-900 to-black text-white p-5 rounded-2xl flex items-center justify-between group shadow-lg shadow-emerald-900/20"
                    >
                        <span className="font-bold uppercase tracking-widest text-xs">
                            {isRTL ? 'احجز عبر واتساب' : 'Book on WhatsApp'}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                        </div>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};
