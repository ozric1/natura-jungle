import { motion } from 'framer-motion';
import { X, Clock, Instagram, Phone } from 'lucide-react';

interface ParkHoursProps {
    onClose: () => void;
    isRTL?: boolean;
}

export const ParkHours = ({ onClose, isRTL = false }: ParkHoursProps) => {
    const schedule = [
        { day: { en: 'Monday', ar: 'الاثنين' }, hours: '10 AM – 8 PM' },
        { day: { en: 'Tuesday', ar: 'الثلاثاء' }, hours: '10 AM – 8 PM' },
        { day: { en: 'Wednesday', ar: 'الأربعاء' }, hours: '10 AM – 8 PM' },
        { day: { en: 'Thursday', ar: 'الخميس' }, hours: '10 AM – 8 PM' },
        { day: { en: 'Friday', ar: 'الجمعة' }, hours: '10 AM – 8 PM' },
        { day: { en: 'Saturday', ar: 'السبت' }, hours: '10 AM – 8 PM' },
        { day: { en: 'Sunday', ar: 'الأحد' }, hours: '10 AM – 8 PM' },
    ];

    return (
        <div className="min-h-screen bg-egg-shell dark:bg-ink-black text-jungle-green dark:text-white p-8 flex flex-col items-center justify-center relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.1),transparent_50%)]" />

            <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-8 right-8 w-12 h-12 glass-morphism rounded-full flex items-center justify-center z-50 border border-sand-gold/20"
            >
                <X className="w-6 h-6" />
            </motion.button>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10 text-center"
            >
                <div className="w-20 h-20 bg-sand-gold/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-sand-gold/20">
                    <Clock className="w-10 h-10 text-sand-gold" />
                </div>

                <h2 className="text-4xl font-serif mb-2">{isRTL ? 'ساعات العمل' : 'Opening Hours'}</h2>
                <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-sand-gold mb-12">
                    {isRTL ? 'نحن ننتظرك' : 'We Are Waiting For You'}
                </p>

                <div className="space-y-4 mb-16">
                    {schedule.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex justify-between items-center py-4 border-b border-jungle-green/5 dark:border-white/5 group hover:bg-sand-gold/5 px-4 rounded-xl transition-colors"
                        >
                            <span className="font-bold text-sm text-jungle-green/60 dark:text-white/60 group-hover:text-sand-gold transition-colors">
                                {isRTL ? item.day.ar : item.day.en}
                            </span>
                            <span className="font-serif italic text-lg text-sand-gold">
                                {item.hours}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <motion.a
                        href="https://www.instagram.com/naturajunglepark/"
                        target="_blank"
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center gap-3 p-6 glass-morphism rounded-[2rem] border border-sand-gold/10"
                    >
                        <div className="w-10 h-10 rounded-full bg-sand-gold flex items-center justify-center text-jungle-green shadow-lg">
                            <Instagram className="w-5 h-5" />
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-widest">Instagram</span>
                    </motion.a>

                    <motion.a
                        href="tel:0605500058"
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center gap-3 p-6 glass-morphism rounded-[2rem] border border-sand-gold/10"
                    >
                        <div className="w-10 h-10 rounded-full bg-sand-gold flex items-center justify-center text-jungle-green shadow-lg">
                            <Phone className="w-5 h-5" />
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-widest">{isRTL ? 'اتصل بنا' : 'Call Support'}</span>
                    </motion.a>
                </div>
            </motion.div>
        </div>
    );
};
