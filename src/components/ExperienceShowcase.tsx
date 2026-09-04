import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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


export const ExperienceShowcase = ({ type, language, onClose, onAction }: ExperienceShowcaseProps) => {
    const [page, setPage] = useState(0);
    const isRTL = language === 'ar';

    const content: { [key: string]: { slides: Slide[], actionLabel?: { [key: string]: string }, actionTarget?: string } } = {
        bungalow: {
            slides: [
                {
                    image: '/assets/natura/more bungalow at night.webp',
                    title: { en: "Starry Sanctuary", fr: "Sanctuaire Étoilé", ar: "ملاذ النجوم" },
                    desc: { en: "Where luxury meets nature.", fr: "Un sanctuaire étoilé où le luxe rencontre la nature.", ar: "حيث تلتقي الفخامة بالطبيعة." }
                },
                {
                    image: '/assets/natura/bugalow.webp',
                    title: { en: "Traditional Elegance", fr: "Élégance Traditionnelle", ar: "أناقة تقليدية" },
                    desc: { en: "Sculpted in the heart of the forest.", fr: "Une élégance traditionnelle sculptée au cœur de la forêt.", ar: "منحوتة في قلب الغابة." }
                },
                {
                    image: '/assets/natura/night stays.webp',
                    title: { en: "Night Whispers", fr: "Murmures Nocturnes", ar: "همسات الليل" },
                    desc: { en: "Wake up to the song of nature.", fr: "Réveillez-vous au murmure des feuilles et au chant de la nature.", ar: "استيقظ على أنغام الطبيعة." }
                },
                {
                    image: '/assets/natura/premisses.webp',
                    title: { en: "Serene Paths", fr: "Sentiers Sereins", ar: "مسارات هادئة" },
                    desc: { en: "Stunning views await your discovery.", fr: "Des vues imprenables et des sentiers sereins attendent votre découverte.", ar: "مناظر خلابة بانتظار اكتشافك." }
                },
                {
                    image: '/assets/natura/WhatsApp Image 2026-02-13 at 13.42.27 (16).webp',
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
                    image: '/assets/natura/catering/_DSC2419.webp',
                    title: { en: "Gourmet Garden", fr: "Jardin Gourmand", ar: "حديقة الذواقة" },
                    desc: { en: "Experience fine dining in the heart of nature.", fr: "Découvrez une cuisine raffinée au cœur de la nature.", ar: "جرب المأكولات الراقية في قلب الطبيعة." }
                },
                {
                    image: '/assets/natura/JUNGLE RESTAURANT 5.webp',
                    title: { en: "The Artist Kitchen", fr: "La Cuisine d'Artiste", ar: "مطبخ الفنان" },
                    desc: { en: "Where our chef prepares your gourmet meals.", fr: "Où notre chef prépare vos repas gastronomiques.", ar: "حيث يحضر الشيف وجباتك الفاخرة." }
                },
                {
                    image: '/assets/natura/catering/_DSC2423.webp',
                    title: { en: "Elegant Premises", fr: "Cadre Élégant", ar: "مرافق أنيقة" },
                    desc: { en: "Dine under the stars and the trees.", fr: "Dînez sous les étoiles et les arbres.", ar: "تناول الطعام تحت النجوم والأشجار." }
                },
                {
                    image: '/assets/natura/catering/_DSC2426.webp',
                    title: { en: "Atmospheric Dining", fr: "Dîner Atmosphérique", ar: "عشاء جوي" },
                    desc: { en: "A perfect blend of luxury and natural beauty.", fr: "Un mélange parfait de luxe et de beauté naturelle.", ar: "مزيج مثالي من الفخامة والجمال الطبيعي." }
                },
                {
                    image: '/assets/natura/catering/_DSC2429.webp',
                    title: { en: "Culinary Excellence", fr: "Excellence Culinaire", ar: "التميز في الطهي" },
                    desc: { en: "Every dish is a masterpiece of flavors.", fr: "Chaque plat est un chef-d'œuvre de saveurs.", ar: "كل طبق هو تحفة من النكهات." }
                },
                {
                    image: '/assets/natura/catering/DSC09972.webp',
                    title: { en: "Sunset Soirée", fr: "Soirée au Coucher du Soleil", ar: "أمسية عند غروب الشمس" },
                    desc: { en: "Unforgettable evenings in our jungle sanctuary.", fr: "Des soirées inoubliables dans notre sanctuaire de la jungle.", ar: "أمسيات لا تنسى في محمية الغابة لدينا." }
                }
            ],
            actionLabel: { en: "Explore Menu", fr: "Explorer le Menu", ar: "استكشف القائمة" },
            actionTarget: "menu"
        },
        tents: {
            slides: [
                {
                    image: '/assets/natura/tents/_DSC4619.webp',
                    title: { en: "Berber Spirit", fr: "L'Esprit Berbère", ar: "الروح البربرية" },
                    desc: { en: "Authentic living in the heart of the jungle.", fr: "Vivre l'authentique au cœur de la jungle.", ar: "حياة أصيلة في قلب الغابة." }
                },
                {
                    image: '/assets/natura/detente berber.webp',
                    title: { en: "Natural Comfort", fr: "Confort Naturel", ar: "راحة طبيعية" },
                    desc: { en: "Wake up to the sounds of nature.", fr: "Réveillez-vous aux sons de la nature.", ar: "استيقظ على أنغام الطبيعة." }
                },
                {
                    image: '/assets/natura/premisses.webp',
                    title: { en: "Premises View", fr: "Vue des Lieux", ar: "منظر للمرافق" },
                    desc: { en: "A beautiful daytime view of our authentic camp.", fr: "Une belle vue de jour de notre camp authentique.", ar: "منظر جميل لمخيمنا الأصيل خلال النهار." }
                },
                {
                    image: '/assets/natura/berber tent at night.webp',
                    title: { en: "Enchanted Nights", fr: "Nuits Enchantées", ar: "ليالي ساحرة" },
                    desc: { en: "Experience the magic of the jungle after sunset.", fr: "Découvrez la magie de la jungle après le coucher du soleil.", ar: "اختبر سحر الغابة بعد غروب الشمس." }
                },
                {
                    image: '/assets/natura/night tent.webp',
                    title: { en: "Starry Night", fr: "Nuit Étoilée", ar: "ليلة مرصعة بالنجوم" },
                    desc: { en: "Experience the magic of the desert night.", fr: "Découvrez la magie de la nuit dans le désert.", ar: "جرب سحر الصحراء ليلاً." }
                }
            ]
        },
        park: {
            slides: [
                {
                    image: '/assets/natura/animals/ducks.webp',
                    title: { en: "Animal Discovery", fr: "Découverte Animalière", ar: "اكتشاف حيواني" },
                    desc: { en: "Meet the majestic animals of Natura.", fr: "Rencontrez la faune majestueuse de Natura.", ar: "تعرف على الحيوانات المهيبة في نطورا." }
                },
                {
                    image: '/assets/natura/animals/austrich.webp',
                    title: { en: "Animal Kingdom", fr: "Royaume Animal", ar: "مملكة الحيوان" },
                    desc: { en: "Step into the heart of nature.", fr: "Entrez au cœur de la nature.", ar: "ادخل إلى قلب الطبيعة." }
                },
                {
                    image: '/assets/natura/animals/DSC00006.webp',
                    title: { en: "Gentle Creatures", fr: "Créatures Douces", ar: "كائنات هادئة" },
                    desc: { en: "Peaceful encounters in nature.", fr: "Rencontres paisibles dans la nature.", ar: "لقاءات هادئة في الطبيعة." }
                },
                {
                    image: '/assets/natura/animals/DSC00009.webp',
                    title: { en: "Nature's Wonders", fr: "Merveilles de la Nature", ar: "عجائب الطبيعة" },
                    desc: { en: "Explore the diversity of the park.", fr: "Explorez la diversité du parc.", ar: "استكشف تنوع المنتزه." }
                },
                {
                    image: '/assets/natura/animals/DSC00014.webp',
                    title: { en: "Natural Habitat", fr: "Habitat Naturel", ar: "موائل طبيعية" },
                    desc: { en: "Animals in their natural surroundings.", fr: "Des animaux dans leur environnement naturel.", ar: "حيوانات في محيطها الطبيعي." }
                },
                {
                    image: '/assets/natura/animals/DSC00018.webp',
                    title: { en: "Eco Sanctuary", fr: "Sanctuaire Eco", ar: "ملاذ بيئي" },
                    desc: { en: "A safe haven for every species.", fr: "Un refuge sûr pour chaque espèce.", ar: "ملجأ آمن لكل الأنواع." }
                },
                {
                    image: '/assets/natura/animals/blackdove.webp',
                    title: { en: "Jungle Life", fr: "Vie dans la Jungle", ar: "حياة الغابة" },
                    desc: { en: "Experience the rhythm of the forest.", fr: "Découvrez le rythme de la forêt.", ar: "اختبر إيقاع الغابة." }
                }
            ]
        },

        kids: {
            slides: [
                {
                    image: '/assets/natura/gaming space/DSC00040.webp',
                    title: { en: "Kids Adventures", fr: "Aventures Enfants", ar: "مغامرات الأطفال" },
                    desc: { en: "Fun and games in the fresh air.", fr: "Jeux et divertissements au grand air.", ar: "ألعاب ومرح في الهواء الطلق." }
                },
                {
                    image: '/assets/natura/gaming space/DSC03232.webp',
                    title: { en: "Riding Academy", fr: "Académie d'Équitation", ar: "أكاديمية الفروسية" },
                    desc: { en: "Learn to ride a horse safely.", fr: "Apprenez à monter à cheval en toute sécurité.", ar: "تعلم الفروسية في بيئة آمنة." }
                },
                {
                    image: '/assets/natura/gaming space/DSC00047.webp',
                    title: { en: "Jungle Play", fr: "Jeux de la Jungle", ar: "لعب الغابة" },
                    desc: { en: "Endless possibilities for fun.", fr: "Des possibilités de divertissement infinies.", ar: "إمكانيات لا حصر لها للمرح." }
                },
                {
                    image: '/assets/natura/gaming space/DSC03228.webp',
                    title: { en: "Outdoor Fun", fr: "Plaisir Extérieur", ar: "متعة في الخارج" },
                    desc: { en: "Safe playgrounds for all ages.", fr: "Des aires de jeux sécurisées pour tous les âges.", ar: "ملاعب آمنة لجميع الأعمار." }
                },
                {
                    image: '/assets/natura/pond_update.webp',
                    title: { en: "Nature's Harmony", fr: "Harmonie Naturelle", ar: "تناغم الطبيعة" },
                    desc: { en: "Enjoy the serenity of our pond area.", fr: "Profitez de la sérénité de notre espace étang.", ar: "استمتع بهدوء منطقة البركة." }
                }
            ]
        },
        pool: {
            slides: [
                {
                    image: '/assets/natura/tents/Pool/DSC00017.webp',
                    title: { en: "Aqua Oasis", fr: "Oasis Aqua", ar: "واحة أكوا" },
                    desc: { en: "A refreshing paradise with crystal waters.", fr: "Un paradis rafraîchissant aux eaux cristallines.", ar: "جنة منعشة بمياه كريستالية." }
                },
                {
                    image: '/assets/natura/tents/Pool/DSC00056.webp',
                    title: { en: "Poolside Serenity", fr: "Sérénité au Bord de l'Eau", ar: "هدوء المسبح" },
                    desc: { en: "Relax in our premium jungle pool.", fr: "Détendez-vous dans notre piscine de jungle haut de gamme.", ar: "استرخ في مسبح الغابة الفاخر." }
                }
            ]
        }
    };

    const currentContent = content[type] || content.bungalow;
    const currentSlide = currentContent.slides[page];

    const handleNext = () => setPage(prev => (prev + 1) % currentContent.slides.length);
    const handlePrev = () => setPage(prev => (prev - 1 + currentContent.slides.length) % currentContent.slides.length);

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
                    <img src={currentSlide.image} className="w-full h-full object-cover opacity-80" alt="Showcase" decoding="async" />
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
                        {language === 'fr' ? (type === 'bungalow' ? 'Bungalows' : type === 'restaurant' ? 'Restaurant' : type === 'tents' ? 'Tentes Berbères' : type === 'park' ? 'Parc Animalier' : type === 'kids' ? 'Jeux Enfants' : 'Aqua Jungle') : 
                        language === 'ar' ? (type === 'bungalow' ? 'بناغل' : type === 'restaurant' ? 'مطعم' : type === 'tents' ? 'خيام بربرية' : type === 'park' ? 'حديقة الحيوان' : type === 'kids' ? 'ألعاب الأطفال' : 'أكوا جانغل') : 
                        (type === 'bungalow' ? 'Bungalows' : type === 'restaurant' ? 'Restaurant' : type === 'tents' ? 'Berber Tents' : type === 'park' ? 'Animal Park' : type === 'kids' ? 'Family Fun' : 'Aqua Jungle')}
                    </span>
                </div>
            </header>

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 sm:px-6 pointer-events-none">
                <button
                    onClick={handlePrev}
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/20 hover:bg-luxury-gold/90 backdrop-blur-md flex items-center justify-center border border-white/10 hover:border-luxury-gold text-white/80 hover:text-jungle-deep transition-all duration-300 pointer-events-auto shadow-lg"
                >
                    <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <button
                    onClick={handleNext}
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/20 hover:bg-luxury-gold/90 backdrop-blur-md flex items-center justify-center border border-white/10 hover:border-luxury-gold text-white/80 hover:text-jungle-deep transition-all duration-300 pointer-events-auto shadow-lg"
                >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
            </div>

            {/* Content Area */}
            <div className="relative z-10 flex-1 flex flex-col justify-end p-8 lg:p-16">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <motion.div
                        key={page + 'text'}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="space-y-4 flex flex-col items-center"
                    >
                        <h2 className="text-2xl sm:text-4xl lg:text-6xl font-serif text-white leading-tight drop-shadow-lg">
                            {currentSlide.title[language]}
                        </h2>
                        <p className="text-sm sm:text-lg text-white/90 font-medium drop-shadow-md">
                            {currentSlide.desc[language]}
                        </p>

                        {/* Persistent Action Button - Now below text */}
                        {currentContent.actionLabel && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => onAction(currentContent.actionTarget!)}
                                className="mt-8 bg-luxury-gold text-jungle-deep px-8 py-4 sm:px-12 sm:py-5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] flex items-center gap-2 sm:gap-4 gold-shadow hover:scale-105 active:scale-95 transition-all shadow-2xl whitespace-nowrap pointer-events-auto"
                            >
                                <span>{currentContent.actionLabel[language]}</span>
                                <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'rotate-180' : ''}`} />
                            </motion.button>
                        )}
                    </motion.div>
                </div>



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
