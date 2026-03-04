import { motion } from 'framer-motion';
import { X, Calendar, Users, MessageSquare, Utensils, Clock } from 'lucide-react';
import { useState } from 'react';

interface CateringPartyserviceProps {
    onClose: () => void;
    language: 'en' | 'fr' | 'ar';
    eventType: 'catering' | 'teambuilding' | 'school';
}

export const CateringPartyservice = ({ onClose, language, eventType }: CateringPartyserviceProps) => {
    const isRTL = language === 'ar';
    const [formData, setFormData] = useState({
        size: '',
        date: '',
        time: '',
        food: '',
        name: ''
    });

    const text = {
        title: {
            catering: {
                en: 'Catering & Party',
                fr: 'Traiteur & Fêtes',
                ar: 'خدمة الحفلات والتموين'
            },
            teambuilding: {
                en: 'Team Building & Events',
                fr: 'Team Building & Événements',
                ar: 'بناء الفريق والفعاليات'
            },
            school: {
                en: 'School Trips',
                fr: 'Sorties Scolaires',
                ar: 'الطلعات المدرسية'
            }
        },
        subtitle: {
            catering: {
                en: 'Plan your special event with us.',
                fr: 'Planifiez votre événement spécial avec nous.',
                ar: 'خطط لمناسبتك معنا'
            },
            teambuilding: {
                en: 'Organize an unforgettable team experience.',
                fr: 'Organisez une expérience d\'équipe inoubliable.',
                ar: 'نظم تجربة فريق لا تُنسى'
            },
            school: {
                en: 'Educational and fun adventures for students.',
                fr: 'Aventures éducatives et ludiques pour les élèves.',
                ar: 'مغامرات تعليمية وممتعة للطلاب'
            }
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
        arrivalDate: {
            en: 'Arrival Date',
            fr: 'Date d\'Arrivée',
            ar: 'تاريخ الوصول'
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
        },
        nameLabel: {
            en: 'Full Name',
            fr: 'Nom Complet',
            ar: 'الاسم الكامل'
        },
        namePlaceholder: {
            en: 'Enter your name',
            fr: 'Entrez votre nom',
            ar: 'أدخل اسمك'
        }
    };

    const handleBook = () => {
        const typeHeader = text.title[eventType][language];

        // Construct the message with clean newlines
        const message = `*${typeHeader}*\n\n` +
            `*Client:* ${formData.name || 'N/A'}\n` +
            `*Group Size:* ${formData.size} ${language === 'ar' ? 'أشخاص' : (language === 'fr' ? 'invités' : 'guests')}\n` +
            `*Arrival Date:* ${formData.date || 'Not specified'}\n` +
            `*Arrival Time:* ${formData.time || 'Not specified'}\n` +
            `*Food Orders:*\n${formData.food || 'No specific food order yet.'}\n\n` +
            `_Sent via Natura Jungle App_`;

        // Encode the entire message to handle special characters and newlines correctly
        const encodedMessage = encodeURIComponent(message);

        window.open(`https://wa.me/212605500058?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" dir={isRTL ? 'rtl' : 'ltr'} onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-[2.5rem] pointer-events-auto relative shadow-2xl border border-sand-gold/20 flex flex-col max-h-[90vh]"
            >
                {/* Close Button - Sticky/Fixed relative to modal */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/10 flex items-center justify-center text-neutral-500 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/20 transition-colors z-[60]"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 overflow-y-auto no-scrollbar">
                    {/* Header */}
                    <div className="mb-8 pr-10">
                        <h2 className="text-3xl font-serif text-sand-gold mb-2">
                            {text.title[eventType][language]}
                        </h2>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                            {text.subtitle[eventType][language]}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-sand-gold" />
                                {text.nameLabel[language]}
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={text.namePlaceholder[language]}
                                className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-4 text-neutral-900 dark:text-white focus:ring-2 focus:ring-sand-gold outline-none transition-all"
                            />
                        </div>

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

                        {/* Date & Time Row */}
                        <div className="flex gap-4">
                            {/* Arrival Date */}
                            <div className="space-y-2 flex-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-sand-gold" />
                                    {text.arrivalDate[language]}
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-4 text-neutral-900 dark:text-white focus:ring-2 focus:ring-sand-gold outline-none transition-all"
                                />
                            </div>

                            {/* Arrival Time */}
                            <div className="space-y-2 flex-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-sand-gold" />
                                    {text.arrivalTime[language]}
                                </label>
                                <input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl p-4 text-neutral-900 dark:text-white focus:ring-2 focus:ring-sand-gold outline-none transition-all"
                                />
                            </div>
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
                </div>
            </motion.div>
        </div>
    );
};
