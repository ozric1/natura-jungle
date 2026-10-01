import { motion } from 'framer-motion';
import { ChevronLeft, Sparkles, Smile, Zap, ArrowRight, Star, Compass } from 'lucide-react';

interface Activity {
    id: string;
    name: { en: string; fr: string; ar: string };
    desc: { en: string; fr: string; ar: string };
    price: { en: string; fr: string; ar: string };
    image: string;
    icon: any;
    actionMessage: string;
}

interface FunPlayProps {
    onBack: () => void;
    isRTL?: boolean;
    language: 'en' | 'fr' | 'ar';
}

export const FunPlay = ({ onBack, isRTL = false, language }: FunPlayProps) => {
    const activities: Activity[] = [
        {
            id: 'quad',
            name: { en: 'Balade à Quad (Nature Ride)', fr: 'Balade à Quad (Nature & Pistes)', ar: 'جولة الكواد في قلب الطبيعة' },
            desc: {
                en: 'Exciting 30-minute off-road adventure on forest trails. Available for 1 or 2 riders.',
                fr: 'Aventure palpitante de 30 minutes sur des pistes au milieu de la nature. Disponible en 1 ou 2 places.',
                ar: 'مغامرة ممتعة لمدة ٣٠ دقيقة في مسارات الغابة الطبيعية. متوفرة لشخص واحد أو شخصين.'
            },
            price: {
                en: '1 Rider: 150 DH | 2 Riders: 200 DH (30 min)',
                fr: '1 Place : 150 DH  •  2 Places : 200 DH (30 min)',
                ar: 'مقعد واحد: 150 درهم  •  مقعدين: 200 درهم (30 دقيقة)'
            },
            image: '/assets/natura/quad/quad_fleet_cover.webp',
            icon: Compass,
            actionMessage: "Bonjour, je souhaite réserver une balade en Quad au Natura Jungle Park."
        },
        {
            id: 'equitation',
            name: { en: 'Horse Riding (Équitation)', fr: 'Équitation & Balade à Cheval', ar: 'الفروسية وركوب الخيل' },
            desc: {
                en: 'Equestrian ride with professional guidance in a safe, scenic environment.',
                fr: 'Expérience équestre encadrée dans un cadre naturel sécurisé et ressourçant.',
                ar: 'تجربة فروسية أصيلة مع مدربين محترفين في بيئة آمنة وطبيعية.'
            },
            price: {
                en: '10 min: 40 DH | 30 min Ride: 100 DH',
                fr: '10 min : 40 DH  •  Balade 30 min : 100 DH',
                ar: '10 دقائق: 40 درهم  •  جولة 30 دقيقة: 100 درهم'
            },
            image: '/assets/natura/gaming space/DSC03232.webp',
            icon: Zap,
            actionMessage: "Bonjour, je souhaite réserver une session d'équitation à cheval."
        },
        {
            id: 'poney',
            name: { en: 'Poney Ride for Kids', fr: 'Balade à Poney (Pour Enfants)', ar: 'ركوب البوني للأطفال' },
            desc: {
                en: 'Gentle and memorable pony rides specially tailored for younger kids.',
                fr: 'Moments magiques pour les plus petits avec nos adorables poneys bien dressés.',
                ar: 'لحظات ساحرة وممتعة للأطفال الصغار مع مهور مدربة ولطيفة.'
            },
            price: {
                en: '10 min: 30 DH',
                fr: '10 min : 30 DH',
                ar: '10 دقائق: 30 درهم'
            },
            image: '/assets/natura/gaming space/DSC00040.webp',
            icon: Sparkles,
            actionMessage: "Bonjour, je souhaite des informations sur le poney pour enfants."
        },
        {
            id: 'games',
            name: { en: 'Kids Games & Inflatables', fr: 'Espace de Jeux & Gonflables', ar: 'فضاء ألعاب الأطفال والترامبولين' },
            desc: {
                en: 'Unlimited day pass to giant inflatables, trampolines, kids karts and playgrounds.',
                fr: 'Accès illimité toute la journée aux structures gonflables, trampolines, karts enfants et aires de jeux.',
                ar: 'سوار اشتراك غير محدود طيلة اليوم للألعاب القابلة للنفخ، الترامبولين وكارتينغ الأطفال.'
            },
            price: {
                en: 'Unlimited Pass: 50 DH',
                fr: 'Bracelet Illimité : 50 DH',
                ar: 'سوار غير محدود: 50 درهم'
            },
            image: '/assets/natura/gaming space/DSC03228.webp',
            icon: Star,
            actionMessage: "Bonjour, je souhaite des informations sur l'espace de jeux enfants."
        }
    ];

    const handleReserve = (message: string) => {
        const url = `https://wa.me/212605500058?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen w-full bg-egg-shell dark:bg-ink-black text-jungle-green dark:text-white overflow-y-auto no-scrollbar scroll-smooth" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <header className="px-6 lg:px-12 py-8 flex justify-between items-center sticky top-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-sand-gold/20">
                <div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onBack}
                        className="w-10 h-10 flex items-center justify-center rounded-2xl bg-sand-gold/10 text-sand-gold mb-3 border border-sand-gold/20 hover:bg-sand-gold hover:text-jungle-deep transition-all"
                    >
                        <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    </motion.button>
                    <h1 className="text-2xl sm:text-4xl font-serif text-jungle-deep dark:text-sand-gold tracking-tight">
                        {language === 'ar' ? 'الأنشطة والترفيه' : language === 'fr' ? 'Activités & Loisirs' : 'Activities & Leisure'}
                    </h1>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-sand-gold text-jungle-deep flex items-center justify-center shadow-lg">
                    <Smile className="w-6 h-6" />
                </div>
            </header>

            <div className="px-6 lg:px-12 py-8 space-y-12 max-w-5xl mx-auto">
                {activities.map((act, index) => (
                    <motion.div
                        key={act.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center bg-white dark:bg-white/5 p-6 rounded-[2.5rem] border border-sand-gold/20 shadow-sm`}
                    >
                        <div className="w-full md:w-1/2 aspect-video sm:aspect-4/3 rounded-[2rem] overflow-hidden shadow-xl relative group">
                            <img
                                src={act.image}
                                alt={act.name[language]}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 text-sand-gold">
                                <act.icon className="w-5 h-5" />
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <span className="inline-block px-3 py-1 bg-luxury-gold text-jungle-deep font-bold text-xs rounded-full shadow-md">
                                    {act.price[language]}
                                </span>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 space-y-4">
                            <h2 className="text-2xl lg:text-3xl font-serif leading-tight text-jungle-deep dark:text-white">
                                {act.name[language]}
                            </h2>
                            <p className="text-sm opacity-80 leading-relaxed font-medium">
                                {act.desc[language]}
                            </p>
                            <div className="pt-2">
                                <button
                                    onClick={() => handleReserve(act.actionMessage)}
                                    className="px-6 py-3 rounded-2xl bg-sand-gold text-jungle-deep font-bold uppercase tracking-wider text-xs flex items-center gap-2 hover:bg-jungle-deep hover:text-sand-gold transition-all shadow-md cursor-pointer"
                                >
                                    <span>{language === 'ar' ? 'حجز عبر واتساب' : language === 'fr' ? 'Réserver via WhatsApp' : 'Book on WhatsApp'}</span>
                                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
