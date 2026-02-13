import { motion } from 'framer-motion';
import { X, Calendar, Users, MessageSquare, Utensils } from 'lucide-react';
import { useState } from 'react';

interface CateringPartyserviceProps {
    onClose: () => void;
    language: 'en' | 'fr' | 'ar';
}

export const CateringPartyservice = ({ onClose, language }: CateringPartyserviceProps) => {
    const isRTL = language === 'ar';
    const [formData, setFormData] = useState({
        size: '',
        time: '',
        food: ''
    });

    const text = {
        title: {
            en: 'Catering & Party',
            fr: 'Traiteur & Fêtes',
            ar: 'خدمة الحفلات والتموين'
        },
        subtitle: {
            en: 'Plan your special event with us.',
            fr: 'Planifiez votre événement spécial avec nous.',
            ar: 'خطط لمناسبتك معنا'
        },
        groupSize: {
            en: 'Group Size',
            fr: 'Taille du Groupe',
            ar: 'حجم المجموعة'
        },
        guestsPlaceholder: {
            en: 'Number of guests',
            fr: 'Nombre d\'invités',
            ar: 'عدد الأشخاص'
        },
        arrivalTime: {
            en: 'Arrival Time',
            fr: 'Heure d\'Arrivée',
            ar: 'وقت الوصول'
        },
        foodOrders: {
            en: 'Food Orders',
            fr: 'Commandes de Nourriture',
            ar: 'طلبات الطعام'
        },
        menuPlaceholder: {
            en: 'Check menu, or describe specific requests...',
            fr: 'Vérifiez le menu, ou décrivez vos demandes...',
            ar: 'تحقق من القائمة، أو صف طلباتك الخاصة...'
        },
        bookButton: {
            en: 'Book on WhatsApp',
            fr: 'Réserver sur WhatsApp',
            ar: 'احجز عبر واتساب'
        }
    };

    const handleBook = () => {
        const message = `New Catering Request:%0A
- Group Size: ${formData.size}%0A
- Arrival Time: ${formData.time}%0A
- Food Orders: ${formData.food}`;

        window.open(`https://wa.me/212605500058?text=${message}`, '_blank');
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
                        {text.title[language]}
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                        {text.subtitle[language]}
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    {/* Group Size */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                            <Users className="w-4 h-4 text-sand-gold" />
                            {text.groupSize[language]}
                        </label>
                        <input
                            type="number"
                            value={formData.size}
                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                            placeholder={text.guestsPlaceholder[language]}
                            className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-4 text-neutral-900 dark:text-white focus:ring-2 focus:ring-sand-gold outline-none transition-all"
                        />
                    </div>

                    {/* Arrival Time */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-sand-gold" />
                            {text.arrivalTime[language]}
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
                            {text.foodOrders[language]}
                        </label>
                        <textarea
                            value={formData.food}
                            onChange={(e) => setFormData({ ...formData, food: e.target.value })}
                            placeholder={text.menuPlaceholder[language]}
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
                            {text.bookButton[language]}
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
