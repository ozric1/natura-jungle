import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Camera, MapPin, User } from 'lucide-react';

interface JungleConnectProps {
    isRTL?: boolean;
    language?: 'en' | 'fr' | 'ar';
}

export const JungleConnect = ({ isRTL = false, language = 'en' }: JungleConnectProps) => {

    const text = {
        title: {
            en: 'Jungle Connect',
            fr: 'Jungle Connect',
            ar: 'جنجل كونكت'
        },
        subtitle: {
            en: 'Moments shared by our guests',
            fr: 'Moments partagés par nos invités',
            ar: 'لحظات مشتركة من ضيوفنا'
        },
        share: {
            en: 'Share Your Memory',
            fr: 'Partagez Votre Souvenir',
            ar: 'شارك ذكرياتك'
        }
    };

    // Helper for location translation (basic mapping for demo data)
    const getLocationText = (loc: string) => {
        const locations: any = {
            "Animal Circuit": { en: "Animal Circuit", fr: "Circuit Animalier", ar: "مسار الحيوانات" },
            "Main Pool": { en: "Main Pool", fr: "Piscine Principale", ar: "المسبح الرئيسي" },
            "Berber Tent": { en: "Berber Tent", fr: "Tente Berbère", ar: "الخيمة البربرية" },
            "Equestrian Academy": { en: "Equestrian Academy", fr: "Académie Équestre", ar: "أكاديمية الفروسية" },
            "Wild Circuit": { en: "Wild Circuit", fr: "Circuit Sauvage", ar: "المسار البري" },
            "Jungle Restaurant": { en: "Jungle Restaurant", fr: "Restaurant Jungle", ar: "مطعم الغابة" }
        };
        return locations[loc]?.[language] || loc;
    };

    const memories = [
        {
            id: 1,
            user: "Sarah M.",
            handle: "@sarah_jungle",
            location: "Animal Circuit",
            image: '/assets/natura/animal circuit Lama.jpeg',
            likes: "1.2k"
        },
        {
            id: 2,
            user: "Ahmed K.",
            handle: "@ahmed_explores",
            location: "Main Pool",
            image: '/assets/natura/pool.jpeg',
            likes: "2.4k"
        },
        {
            id: 3,
            user: "Elena G.",
            handle: "@elena_vibe",
            location: "Berber Tent",
            image: '/assets/natura/berber tent at night.jpeg',
            likes: "850"
        },
        {
            id: 4,
            user: "Karim B.",
            handle: "@karim_nature",
            location: "Equestrian Academy",
            image: '/assets/natura/horse_update.jpg',
            likes: "1.5k"
        },
        {
            id: 5,
            user: "Sofia L.",
            handle: "@sofia_jungle",
            location: "Wild Circuit",
            image: '/assets/natura/peacock_update.jpg',
            likes: "3.1k"
        },
        {
            id: 6,
            user: "Yassine J.",
            handle: "@yassine_eat",
            location: "Jungle Restaurant",
            image: '/assets/natura/Jungle restau 2.jpeg',
            likes: "920"
        }
    ];

    // Duplicate memories for seamless loop
    const allMemories = [...memories, ...memories];

    return (
        <div className="space-y-10 overflow-hidden py-10">
            <div className="flex justify-between items-end px-6 lg:px-12">
                <div className="space-y-2">
                    <h2 className="text-3xl lg:text-4xl font-serif text-sand-gold">{text.title[language]}</h2>
                    <p className="text-xs lg:text-sm text-jungle-deep/40 dark:text-pure-nature/40 uppercase tracking-[0.3em] font-bold">
                        {text.subtitle[language]}
                    </p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-luxury-gold/10 rounded-full text-luxury-gold border border-luxury-gold/20">
                    <Camera className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                        {text.share[language]}
                    </span>
                </div>
            </div>

            <div className="relative group">
                <motion.div
                    animate={{
                        x: isRTL ? [0, 100 * memories.length] : [0, -280 * memories.length],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear",
                        },
                    }}
                    className="flex gap-6 px-6 cursor-grab active:cursor-grabbing"
                >
                    {allMemories.map((memory, idx) => (
                        <motion.div
                            key={`${memory.id}-${idx}`}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="flex-none w-[280px] lg:w-[320px] aspect-[4/5] rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-white/10 group/card bg-white dark:bg-jungle-deep"
                        >
                            <img
                                src={memory.image}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover/card:scale-110"
                                alt={`Memory ${memory.id}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                            {/* Location Tag */}
                            <div className="absolute top-6 left-6">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                    <MapPin className="w-3 h-3 text-luxury-gold" />
                                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{getLocationText(memory.location)}</span>
                                </div>
                            </div>

                            <div className="absolute bottom-8 left-8 right-8 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-luxury-gold/20 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden">
                                        <User className="w-5 h-5 text-white/60" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white text-sm font-bold leading-none">{memory.user}</span>
                                        <span className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{memory.handle}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5">
                                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                                            <span className="text-white text-xs font-bold">{memory.likes}</span>
                                        </div>
                                        <MessageCircle className="w-4 h-4 text-white/60" />
                                    </div>
                                    <Share2 className="w-4 h-4 text-white/60" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Gradient Fades for ultra-wide screens */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-egg-shell/50 dark:from-jungle-deep/50 to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-egg-shell/50 dark:from-jungle-deep/50 to-transparent z-10" />
            </div>
        </div>
    );
};
