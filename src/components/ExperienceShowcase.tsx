import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
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
const restau5Img = '/assets/natura/JUNGLE RESTAURANT 5.jpeg';
const restau4Img = '/assets/natura/Jungle RESTAURENT 4.jpeg';
const tajineImg = '/assets/natura/Jungle restaurant Tajine.jpeg';

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
                    image: '/assets/natura/tents/_DSC4619.jpg',
                    title: { en: "Berber Spirit", fr: "L'Esprit Berbère", ar: "الروح البربرية" },
                    desc: { en: "Authentic living in the heart of the jungle.", fr: "Vivre l'authentique au cœur de la jungle.", ar: "حياة أصيلة في قلب الغابة." }
                },
                {
                    image: '/assets/natura/tents/DSC03202.jpg',
                    title: { en: "Natural Comfort", fr: "Confort Naturel", ar: "راحة طبيعية" },
                    desc: { en: "Wake up to the sounds of nature.", fr: "Réveillez-vous aux sons de la nature.", ar: "استيقظ على أنغام الطبيعة." }
                }
            ]
        },
        park: {
            slides: [
                {
                    image: '/assets/natura/animals/DSC00001.jpg',
                    title: { en: "Wild Discovery", fr: "Découverte Sauvage", ar: "اكتشاف بري" },
                    desc: { en: "Meet the majestic wildlife of Natura.", fr: "Rencontrez la faune majestueuse de Natura.", ar: "تعرف على الحياة البرية المهيبة في نطورا." }
                },
                {
                    image: '/assets/natura/animals/DSC00003.jpg',
                    title: { en: "Animal Kingdom", fr: "Royaume Animal", ar: "مملكة الحيوان" },
                    desc: { en: "Step into the heart of the wild.", fr: "Entrez au cœur du monde sauvage.", ar: "ادخل إلى قلب الحياة البرية." }
                },
                {
                    image: '/assets/natura/animals/DSC00006.jpg',
                    title: { en: "Gentle Creatures", fr: "Créatures Douces", ar: "كائنات هادئة" },
                    desc: { en: "Peaceful encounters in nature.", fr: "Rencontres paisibles dans la nature.", ar: "لقاءات هادئة في الطبيعة." }
                },
                {
                    image: '/assets/natura/animals/DSC00009.jpg',
                    title: { en: "Nature's Wonders", fr: "Merveilles de la Nature", ar: "عجائب الطبيعة" },
                    desc: { en: "Explore the diversity of the park.", fr: "Explorez la diversité du parc.", ar: "استكشف تنوع المنتزه." }
                },
                {
                    image: '/assets/natura/animals/DSC00014.jpg',
                    title: { en: "Wild Habitat", fr: "Habitat Sauvage", ar: "موائل برية" },
                    desc: { en: "Animals in their natural surroundings.", fr: "Des animaux dans leur environnement naturel.", ar: "حيوانات في محيطها الطبيعي." }
                },
                {
                    image: '/assets/natura/animals/DSC00018.jpg',
                    title: { en: "Eco Sanctuary", fr: "Sanctuaire Eco", ar: "ملاذ بيئي" },
                    desc: { en: "A safe haven for every species.", fr: "Un refuge sûr pour chaque espèce.", ar: "ملجأ آمن لكل الأنواع." }
                },
                {
                    image: '/assets/natura/animals/DSC00070.jpg',
                    title: { en: "Jungle Life", fr: "Vie dans la Jungle", ar: "حياة الغابة" },
                    desc: { en: "Experience the rhythm of the forest.", fr: "Découvrez le rythme de la forêt.", ar: "اختبر إيقاع الغابة." }
                }
            ]
        },
        kids: {
            slides: [
                {
                    image: '/assets/natura/gaming space/DSC00040.jpg',
                    title: { en: "Kids Adventures", fr: "Aventures Enfants", ar: "مغامرات الأطفال" },
                    desc: { en: "Fun and games in the fresh air.", fr: "Jeux et divertissements au grand air.", ar: "ألعاب ومرح في الهواء الطلق." }
                },
                {
                    image: '/assets/natura/gaming space/DSC00041.jpg',
                    title: { en: "Equitation Academy", fr: "Académie d'Équitation", ar: "أكاديمية الفروسية" },
                    desc: { en: "Learn to ride in a safe environment.", fr: "Apprenez à monter à cheval en toute sécurité.", ar: "تعلم الفروسية في بيئة آمنة." }
                },
                {
                    image: '/assets/natura/gaming space/DSC00047.jpg',
                    title: { en: "Jungle Play", fr: "Jeux de la Jungle", ar: "لعب الغابة" },
                    desc: { en: "Endless possibilities for fun.", fr: "Des possibilités de divertissement infinies.", ar: "إمكانيات لا حصر لها للمرح." }
                },
                {
                    image: '/assets/natura/gaming space/DSC03228.jpg',
                    title: { en: "Outdoor Fun", fr: "Plaisir Extérieur", ar: "متعة في الخارج" },
                    desc: { en: "Safe playgrounds for all ages.", fr: "Des aires de jeux sécurisées pour tous les âges.", ar: "ملاعب آمنة لجميع الأعمار." }
                },
                {
                    image: '/assets/natura/gaming space/DSC03232.jpg',
                    title: { en: "Mini Equestrians", fr: "Mini Équestres", ar: "فرسان صغار" },
                    desc: { en: "Start your journey with horses.", fr: "Commencez votre voyage avec les chevaux.", ar: "ابدأ رحلتك مع الخيول." }
                },
                {
                    image: '/assets/natura/gaming space/DSC03241.jpg',
                    title: { en: "Active Nature", fr: "Nature Active", ar: "طبيعة نشطة" },
                    desc: { en: "Run, jump and explore the wild.", fr: "Courir, sauter et explorer la nature.", ar: "اركض، اقفز واستكشف البرية." }
                },
                {
                    image: '/assets/natura/gaming space/DSC09995.jpg',
                    title: { en: "Family Moments", fr: "Moments en Famille", ar: "لحظات عائلية" },
                    desc: { en: "Creating memories that last a lifetime.", fr: "Créer des souvenirs qui durent toute une vie.", ar: "خلق ذكريات تدوم مدى الحياة." }
                }
            ],
            actionLabel: { en: "Fun & Play", fr: "Fun & Jeux", ar: "المرح واللعب" },
            actionTarget: "fun"
        },
        pool: {
            slides: [
                {
                    image: '/assets/natura/tents/Pool/DSC00017.jpg',
                    title: { en: "Aqua Oasis", fr: "Oasis Aqua", ar: "واحة أكوا" },
                    desc: { en: "A refreshing paradise with crystal waters.", fr: "Un paradis rafraîchissant aux eaux cristallines.", ar: "جنة منعشة بمياه كريستالية." }
                },
                {
                    image: '/assets/natura/tents/Pool/DSC00056.jpg',
                    title: { en: "Poolside Serenity", fr: "Sérénité au Bord de l'Eau", ar: "هدوء المسبح" },
                    desc: { en: "Relax in our premium jungle pool.", fr: "Détendez-vous dans notre piscine de jungle haut de gamme.", ar: "استرخ في مسبح الغابة الفاخر." }
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

    // Image Preloading
    useEffect(() => {
        const nextPageIndex = (page + 1) % currentContent.slides.length;
        const nextImage = currentContent.slides[nextPageIndex].image;
        const img = new Image();
        img.src = nextImage;
    }, [page, currentContent.slides]);

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
                        <h2 className="text-2xl sm:text-4xl lg:text-6xl font-serif text-white leading-tight drop-shadow-lg">
                            {currentSlide.title[language]}
                        </h2>
                        <p className="text-sm sm:text-lg text-white/90 font-medium drop-shadow-md">
                            {currentSlide.desc[language]}
                        </p>
                    </motion.div>
                </div>

                {/* Persistent Bottom Center Action Button */}
                {currentContent.actionLabel && (
                    <div className="absolute bottom-24 sm:bottom-10 left-1/2 -translate-x-1/2 z-50">
                        <button
                            onClick={() => onAction(currentContent.actionTarget!)}
                            className="bg-luxury-gold text-jungle-deep px-6 py-3 sm:px-12 sm:py-5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-2 sm:gap-4 gold-shadow hover:scale-105 active:scale-95 transition-all shadow-2xl"
                        >
                            <span>{currentContent.actionLabel[language]}</span>
                            <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                )}

                {/* Navigation and Dots Container - pushed to bottom corners or sides */}
                <div className="absolute inset-x-0 bottom-0 p-8 flex justify-center items-end pointer-events-none">
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
                </div>
            </div>
        </div>
    );
};
