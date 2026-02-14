import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ExperienceShowcaseProps {
    type: string;
    language: 'en' | 'fr' | 'ar';
    onClose: () => void;
    onAction: (target: string) => void;
}

interface Slide {
    image: string;
    title: { [key: string]: string };
    desc: { [key: string]: string };
    zoomType?: 'dish' | 'playground';
}


const restau2Img = '/assets/natura/Jungle restau 2.jpeg';
const restau3Img = '/assets/natura/Jungle Restaurant 3.jpeg';
const tajineImg = '/assets/natura/Jungle restaurant Tajine.jpeg';

const tentNightImg = '/assets/natura/berber tent at night.jpeg';
const berberTentImg = '/assets/natura/BERBER TENT.jpeg';

const parkViewImg = '/assets/natura/Natura view from above MAIN PAGE BCKGRND.jpeg';

const aquaPoolImg = '/assets/natura/pool.jpeg';
const restau4Img = '/assets/natura/Jungle RESTAURENT 4.jpeg';
const restau5Img = '/assets/natura/JUNGLE RESTAURANT 5.jpeg';
const friendlyAnimalsImg = '/assets/natura/WhatsApp Image 2026-02-13 at 13.42.27.jpeg';
const playgroundAerialImg = '/assets/natura/Natura view from above MAIN PAGE BCKGRND.jpeg';
const pondUpdateImg = '/assets/natura/pond_update.jpg';

export const ExperienceShowcase = ({ type, language, onClose, onAction }: ExperienceShowcaseProps) => {
    const [page, setPage] = useState(0);
    const isRTL = language === 'ar';

    const content: { [key: string]: { slides: Slide[], actionLabel?: { [key: string]: string }, actionTarget?: string } } = {
        bungalow: {
            slides: [
                {
                    image: '/assets/natura/more bungalow at night.jpeg',
                    title: { en: "Starry Sanctuary", fr: "Sanctuaire Étoilé", ar: "ملاذ النجوم" },
                    desc: { en: "Where luxury meets the wild nature.", fr: "Un sanctuaire étoilé où le luxe rencontre la nature sauvage.", ar: "حيث تلتقي الفخامة بالطبيعة البرية." }
                },
                {
                    image: '/assets/natura/bugalow.jpeg',
                    title: { en: "Traditional Elegance", fr: "Élégance Traditionnelle", ar: "أناقة تقليدية" },
                    desc: { en: "Sculpted in the heart of the forest.", fr: "Une élégance traditionnelle sculptée au cœur de la forêt.", ar: "منحوتة في قلب الغابة." }
                },
                {
                    image: '/assets/natura/night stays.jpeg',
                    title: { en: "Night Whispers", fr: "Murmures Nocturnes", ar: "همسات الليل" },
                    desc: { en: "Wake up to the song of nature.", fr: "Réveillez-vous au murmure des feuilles et au chant de la nature.", ar: "استيقظ على أنغام الطبيعة." }
                },
                {
                    image: '/assets/natura/premisses.jpeg',
                    title: { en: "Serene Paths", fr: "Sentiers Sereins", ar: "مسارات هادئة" },
                    desc: { en: "Stunning views await your discovery.", fr: "Des vues imprenables et des sentiers sereins attendent votre découverte.", ar: "مناظر خلابة بانتظار اكتشافك." }
                },
                {
                    image: '/assets/natura/WhatsApp Image 2026-02-13 at 13.42.27 (16).jpeg',
                    title: { en: "Morning Delight", fr: "Délice Matinal", ar: "صباح الخير" },
                    desc: { en: "Breakfast included in your stay.", fr: "Petit déjeuner inclus dans vos nuitées.", ar: "فطور الصباح مشمول في إقامتك." }
                }
            ],
            actionLabel: { en: "Reserve Now", fr: "Réserver", ar: "احجز الآن" },
            actionTarget: "booking"
        },
        restaurant: {
            slides: [
                {
                    image: restau2Img,
                    title: { en: "The Artist Kitchen", fr: "La Cuisine d'Artiste", ar: "مطبخ الفنان" },
                    desc: { en: "Where our chef prepares your gourmet meals.", fr: "Où notre chef prépare vos repas gastronomiques.", ar: "حيث يحضر الشيف وجباتك الفاخرة." }
                },
                {
                    image: restau3Img,
                    title: { en: "Elegant Premises", fr: "Cadre Élégant", ar: "مرافق أنيقة" },
                    desc: { en: "Dine under the stars and the trees.", fr: "Dînez sous les étoiles et les arbres.", ar: "تناول الطعام تحت النجوم والأشجار." }
                },
                {
                    image: restau5Img,
                    title: { en: "The Chef's Selection", fr: "La Sélection du Chef", ar: "اختيارات الشيف" },
                    desc: { en: "Our finest gourmet creations, presented with precision.", fr: "Nos plus belles créations gastronomiques, présentées avec précision.", ar: "أروع إبداعاتنا الفاخرة، مقدمة بكل دقة." },
                    zoomType: "dish"
                },
                {
                    image: restau4Img,
                    title: { en: "Ambient Dining", fr: "Ambiance Gastronomique", ar: "أجواء الطعام" },
                    desc: { en: "Elegant table settings for an unforgettable evening.", fr: "Des tables élégantes pour une soirée inoubliable.", ar: "طاولات أنيقة لأمسية لا تُنسى." }
                },
                {
                    image: tajineImg,
                    title: { en: "Signature Dishes", fr: "Plats Signature", ar: "أطباقنا المتميزة" },
                    desc: { en: "Authentic flavors with a modern twist.", fr: "Saveurs authentiques avec une touche moderne.", ar: "نكهات أصيلة بلمسة عصرية." },
                    zoomType: "dish"
                }
            ],
            actionLabel: { en: "Explore Menu", fr: "Explorer le Menu", ar: "استكشف القائمة" },
            actionTarget: "menu"
        },
        tents: {
            slides: [
                {
                    image: tentNightImg,
                    title: { en: "Berber Spirit", fr: "L'Esprit Berbère", ar: "الروح البربرية" },
                    desc: { en: "Authentic living in the heart of the jungle.", fr: "Vivre l'authentique au cœur de la jungle.", ar: "حياة أصيلة في قلب الغابة." }
                },
                {
                    image: berberTentImg,
                    title: { en: "Natural Comfort", fr: "Confort Naturel", ar: "راحة طبيعية" },
                    desc: { en: "Wake up to the sounds of nature.", fr: "Réveillez-vous aux sons de la nature.", ar: "استيقظ على أنغام الطبيعة." }
                }
            ]
        },
        park: {
            slides: [
                {
                    image: friendlyAnimalsImg,
                    title: { en: "Friendly Animals", fr: "Animaux Amicaux", ar: "حيوانات أليفة" },
                    desc: { en: "Gentle encounters in their natural habitat.", fr: "Rencontres douces dans leur habitat naturel.", ar: "لقاءات هادئة في بيئتها الطبيعية." }
                },
                {
                    image: parkViewImg,
                    title: { en: "Animal Discovery", fr: "Découverte Animale", ar: "اكتشاف الحيوانات" },
                    desc: { en: "Learn about the wildlife of the region.", fr: "Apprenez-en plus sur la faune de la région.", ar: "تعرف على الحياة البرية في المنطقة." }
                }
            ],
            actionLabel: { en: "Circuit Details", fr: "Détails du Circuit", ar: "تفاصيل المسار" },
            actionTarget: "exhibition"
        },
        kids: {
            slides: [
                {
                    image: playgroundAerialImg,
                    title: { en: "Kids Playground", fr: "Aire de Jeux", ar: "مساحة لعب الأطفال" },
                    desc: { en: "Safety and fun for everyone.", fr: "Sécurité et plaisir pour tous.", ar: "الأمان والمتعة للجميع." },
                    zoomType: "playground"
                },
                {
                    image: pondUpdateImg,
                    title: { en: "Equitation Academy", fr: "Académie d'Équitation", ar: "أكاديمية الفروسية" },
                    desc: { en: "Start your horse riding adventure.", fr: "Commencez votre aventure équestre.", ar: "ابدأ مغامرتك في الفروسية." }
                }
            ],
            actionLabel: { en: "Fun & Play", fr: "Fun & Jeux", ar: "المرح واللعب" },
            actionTarget: "fun"
        },
        pool: {
            slides: [
                {
                    image: aquaPoolImg,
                    title: { en: "Aqua Oasis", fr: "Oasis Aqua", ar: "واحة أكوا" },
                    desc: { en: "A refreshing paradise with crystal waters.", fr: "Un paradis rafraîchissant aux eaux cristallines.", ar: "جنة منعشة بمياه كريستالية." }
                },
                {
                    image: restau4Img,
                    title: { en: "Serene Surrounding", fr: "Environnement Serein", ar: "محيط هادئ" },
                    desc: { en: "Relax in the peaceful jungle atmosphere.", fr: "Détendez-vous dans l'atmosphère paisible de la jungle.", ar: "استرخ في أجواء الغابة الهادئة." }
                }
            ]
        }
    };

    const currentContent = content[type] || content.bungalow;
    const currentSlide = currentContent.slides[page];

    // Auto-rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setPage(prev => (prev + 1) % currentContent.slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [currentContent.slides.length]);

    return (
        <div className="fixed inset-0 z-[200] bg-black text-white overflow-hidden flex flex-col">
            {/* Background Image with Ken Burns effect */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={page}
                    initial={{
                        scale: (currentSlide as any).zoomType === 'dish' ? 1.5 : (currentSlide as any).zoomType === 'playground' ? 1.5 : 1.1,
                        opacity: 0,
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0
                    }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    style={{
                        transformOrigin: (currentSlide as any).zoomType === 'playground' ? 'bottom left' : 'center'
                    }}
                    className="absolute inset-0 z-0"
                >
                    <img src={currentSlide.image} className="w-full h-full object-cover opacity-80" alt="Showcase" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Header */}
            <header className="relative z-10 p-6 flex justify-between items-center">
                <button
                    onClick={onClose}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-gold">
                        {type === 'bungalow' ? 'Bungalows' : type === 'restaurant' ? 'Restaurant' : type === 'tents' ? 'Berber Tents' : type === 'park' ? 'Animal Park' : type === 'kids' ? 'Family Fun' : 'Aqua Jungle'}
                    </span>
                </div>
            </header>

            {/* Content Area */}
            <div className="relative z-10 flex-1 flex flex-col justify-end p-8 lg:p-16">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <motion.div
                        key={page + 'text'}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl lg:text-6xl font-serif text-white leading-tight drop-shadow-lg">
                            {currentSlide.title[language]}
                        </h2>
                        <p className="text-lg text-white/90 font-medium drop-shadow-md">
                            {currentSlide.desc[language]}
                        </p>
                    </motion.div>
                </div>

                {/* Persistent Bottom Center Action Button */}
                {currentContent.actionLabel && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
                        <button
                            onClick={() => onAction(currentContent.actionTarget!)}
                            className="bg-luxury-gold text-jungle-deep px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] flex items-center gap-4 gold-shadow hover:scale-105 active:scale-95 transition-all shadow-2xl"
                        >
                            <span>{currentContent.actionLabel[language]}</span>
                            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                )}

                {/* Navigation and Dots Container - pushed to bottom corners or sides */}
                <div className="absolute inset-x-0 bottom-0 p-8 flex justify-between items-end pointer-events-none">
                    <div className="pointer-events-auto">
                        <button
                            onClick={() => setPage(page === 0 ? currentContent.slides.length - 1 : page - 1)}
                            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors bg-black/20 backdrop-blur-sm"
                        >
                            <ChevronLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex gap-3 pointer-events-auto pb-6">
                        {currentContent.slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`h-1.5 transition-all duration-300 rounded-full shadow-lg ${i === page ? 'w-12 bg-luxury-gold' : 'w-4 bg-white/40 hover:bg-white/60'}`}
                            />
                        ))}
                    </div>

                    <div className="pointer-events-auto">
                        <button
                            onClick={() => setPage((page + 1) % currentContent.slides.length)}
                            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors bg-black/20 backdrop-blur-sm"
                        >
                            <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
