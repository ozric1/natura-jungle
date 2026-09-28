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

    const content: { [key: string]: { slides: Slide[], actionLabel?: { [key: string]: string }, actionTarget?: string, whatsappMessage?: string } } = {
        quad: {
            slides: [
                {
                    image: '/assets/natura/park_view.webp',
                    title: { en: "Balade à Quad & Nature", fr: "Balade à Quad & Aventure", ar: "جولة الكواد والمغامرة" },
                    desc: { en: "Experience thrilling trails and stunning nature at Natura Jungle.", fr: "Vivez une aventure palpitante sur des pistes sécurisées au cœur de la forêt.", ar: "عش مغامرة استثنائية في مسارات الطبيعة الخلابة في نطورا جانغل." }
                },
                {
                    image: '/assets/natura/pond_update.webp',
                    title: { en: "Sunset Quad Experience", fr: "Coucher de Soleil en Pleine Nature", ar: "سحر الغروب على متن الكواد" },
                    desc: { en: "Enjoy the sunset across the forest with friends or family.", fr: "Profitez du spectacle magique du coucher de soleil en plein air.", ar: "استمتع بمشهد غروب الشمس الرائع في قلب الطبيعة الهادئة." }
                },
                {
                    image: '/assets/natura/gaming space/DSC03228.webp',
                    title: { en: "Special Rates (30 min)", fr: "Tarifs Balade à Quad (30 min)", ar: "أسعار جولة الكواد (٣٠ دقيقة)" },
                    desc: { en: "1 Person (30 min): 150 DH | 2 Persons (30 min): 200 DH.", fr: "1 Place (30 min) : 150 DH  •  2 Places (30 min) : 200 DH.", ar: "شخص واحد (30 دقيقة): 150 درهم  •  شخصين (30 دقيقة): 200 درهم." }
                }
            ],
            actionLabel: { en: "Book Quad on WhatsApp", fr: "Réserver ma Balade Quad", ar: "احجز جولة الكواد" },
            actionTarget: "whatsapp",
            whatsappMessage: "Bonjour, je souhaite réserver une balade en Quad au Natura Jungle Park (30 min)."
        },
        bungalow: {
            slides: [
                {
                    image: '/assets/natura/bugalow.webp',
                    title: { en: "Family Bungalow Stays", fr: "Séjour en Famille", ar: "إقامة عائلية فاخرة" },
                    desc: { en: "Enjoy our special discount rates: 900 DH (2 adults + 1 kid) & 1100 DH (2 adults + 2 kids).", fr: "Offre Spéciale : 900 DH (2 adultes + 1 enfant) et 1100 DH (2 adultes + 2 enfants) avec piscine gratuite !", ar: "عرض خاص: 900 درهم (شخصين + طفل) و 1100 درهم (شخصين + طفلين) مع مسبح مجاني!" }
                },
                {
                    image: '/assets/natura/more bungalow at night.webp',
                    title: { en: "Starry Sanctuary", fr: "Sanctuaire Étoilé", ar: "ملاذ النجوم" },
                    desc: { en: "Where luxury meets nature.", fr: "Un sanctuaire étoilé où le luxe rencontre la nature.", ar: "حيث تلتقي الفخامة بالطبيعة." }
                },
                {
                    image: '/assets/natura/night stays.webp',
                    title: { en: "Night Whispers", fr: "Murmures Nocturnes", ar: "همسات الليل" },
                    desc: { en: "Wake up to the song of nature.", fr: "Réveillez-vous au murmure des feuilles et au chant de la nature.", ar: "استيقظ على أنغام الطبيعة." }
                },
                {
                    image: '/assets/natura/WhatsApp Image 2026-02-13 at 13.42.27 (16).webp',
                    title: { en: "Morning Delight", fr: "Délice Matinal", ar: "فطور الصباح" },
                    desc: { en: "Breakfast, animal park, games & free pool included in your stay.", fr: "Petit déjeuner, parc animalier, espace jeux et piscine gratuite inclus dans vos nuitées.", ar: "فطور الصباح، حديقة الحيوان، منطقة الألعاب والمسبح مشمولة في إقامتك." }
                }
            ],
            actionLabel: { en: "View Packages & Book", fr: "Voir les Formules & Réserver", ar: "عرض الباقات والحجز" },
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
                    desc: { en: "Where our chef prepares delicious Tagines, roasted chicken and fresh pizzas.", fr: "Où notre chef prépare vos Tagines, poulet rôti et pizzas fraîches.", ar: "حيث يحضر الشيف أشهى الطواجن والدجاج المحمر والبيتزا الطازجة." }
                },
                {
                    image: '/assets/natura/catering/_DSC2426.webp',
                    title: { en: "Atmospheric Dining", fr: "Dîner Atmosphérique", ar: "عشاء جوي" },
                    desc: { en: "A perfect blend of luxury and natural beauty.", fr: "Un mélange parfait de luxe et de beauté naturelle.", ar: "مزيج مثالي من الفخامة والجمال الطبيعي." }
                },
                {
                    image: '/assets/natura/catering/DSC09972.webp',
                    title: { en: "Sunset Soirée", fr: "Soirée au Coucher du Soleil", ar: "أمسية عند غروب الشمس" },
                    desc: { en: "Unforgettable moments in our jungle sanctuary.", fr: "Des moments inoubliables dans notre sanctuaire.", ar: "لحظات لا تنسى في محمية الغابة لدينا." }
                }
            ],
            actionLabel: { en: "Explore Menu", fr: "Découvrir le Menu", ar: "استكشف القائمة" },
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
                    image: '/assets/natura/berber tent at night.webp',
                    title: { en: "Enchanted Nights", fr: "Nuits Enchantées", ar: "ليالي ساحرة" },
                    desc: { en: "Experience the magic of the jungle after sunset.", fr: "Découvrez la magie de la jungle après le coucher du soleil.", ar: "اختبر سحر الغابة بعد غروب الشمس." }
                }
            ]
        },
        park: {
            slides: [
                {
                    image: '/assets/natura/animals/ducks.webp',
                    title: { en: "Animal Discovery", fr: "Découverte Animalière", ar: "اكتشاف حيواني" },
                    desc: { en: "Meet the majestic animals of Natura Jungle. Cold drink included!", fr: "Rencontrez les animaux de Natura avec boisson froide offerte !", ar: "تعرف على الحيوانات في نطورا مع مشروب بارد مجاني!" }
                },
                {
                    image: '/assets/natura/animals/austrich.webp',
                    title: { en: "Animal Kingdom", fr: "Royaume Animal", ar: "مملكة الحيوان" },
                    desc: { en: "Step into the heart of nature.", fr: "Entrez au cœur de la nature.", ar: "ادخل إلى قلب الطبيعة." }
                },
                {
                    image: '/assets/natura/animals/DSC00006.webp',
                    title: { en: "Gentle Creatures", fr: "Rencontres Paisibles", ar: "كائنات هادئة" },
                    desc: { en: "Adult: 40 DH | Children: 30 DH.", fr: "Adulte : 40 DH  •  Enfant (2 à 12 ans) : 30 DH.", ar: "كبار: 40 درهم  •  صغار (2 إلى 12 سنة): 30 درهم." }
                }
            ]
        },
        kids: {
            slides: [
                {
                    image: '/assets/natura/gaming space/DSC00040.webp',
                    title: { en: "Kids Gaming Space", fr: "Espace de Jeux Enfants", ar: "فضاء ألعاب الأطفال" },
                    desc: { en: "Inflatables, trampolines, kid karts & playgrounds (Unlimited pass: 50 DH).", fr: "Jeux gonflables, trampolines, karts enfants, aires de jeux (Bracelet illimité : 50 DH).", ar: "ألعاب قابلة للنفخ، ترامبولين، كارتينغ أطفال (سوار غير محدود: 50 درهم)." }
                },
                {
                    image: '/assets/natura/gaming space/DSC03232.webp',
                    title: { en: "Horse & Poney Rides", fr: "Équitation & Poney", ar: "ركوب الخيل والبوني" },
                    desc: { en: "Horse ride (10 min: 40 DH, 30 min: 100 DH) | Poney (10 min: 30 DH).", fr: "Cheval (10 min : 40 DH, 30 min : 100 DH)  •  Poney (10 min : 30 DH).", ar: "خيل (10 د: 40 درهم، 30 د: 100 درهم)  •  بوني (10 د: 30 درهم)." }
                }
            ]
        },
        pool: {
            slides: [
                {
                    image: '/assets/natura/tents/Pool/DSC00017.webp',
                    title: { en: "Aqua Oasis", fr: "Oasis Aqua Jungle", ar: "واحة أكوا جانغل" },
                    desc: { en: "Adult: 150 DH | Kids: 100 DH (Includes Sunbed & Free Park Entry).", fr: "Adulte : 150 DH  •  Enfant : 100 DH (Inclus : Transat + Entrée Parc offerte).", ar: "كبار: 150 درهم  •  صغار: 100 درهم (شامل: سرير استرخاء + دخول مجاني للحديقة)." }
                },
                {
                    image: '/assets/natura/tents/Pool/DSC00056.webp',
                    title: { en: "Poolside Serenity", fr: "Sérénité au Bord de l'Eau", ar: "استرخاء المسبح" },
                    desc: { en: "Free pool access for all bungalow guests until October 10!", fr: "Piscine gratuite pour tous les clients séjournant en bungalow jusqu'au 10 Octobre !", ar: "المسبح مجاني لجميع ضيوف البناغل حتى 10 أكتوبر!" }
                }
            ]
        }
    };

    const currentContent = content[type] || content.bungalow;
    const currentSlide = currentContent.slides[page];

    const handleNext = () => setPage(prev => (prev + 1) % currentContent.slides.length);
    const handlePrev = () => setPage(prev => (prev - 1 + currentContent.slides.length) % currentContent.slides.length);

    useEffect(() => {
        const nextPageIndex = (page + 1) % currentContent.slides.length;
        const nextImage = currentContent.slides[nextPageIndex].image;
        const img = new Image();
        img.src = nextImage;
    }, [page, currentContent.slides]);

    const handleActionButton = () => {
        if (currentContent.actionTarget === 'whatsapp') {
            const message = currentContent.whatsappMessage || "Bonjour, je souhaite réserver une activité au Natura Jungle Park.";
            window.open(`https://wa.me/212605500058?text=${encodeURIComponent(message)}`, '_blank');
        } else if (currentContent.actionTarget) {
            onAction(currentContent.actionTarget);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] bg-black text-white overflow-hidden flex flex-col">
            {/* Background Image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={page}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img src={currentSlide.image} className="w-full h-full object-cover opacity-80" alt="Showcase" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Header */}
            <header className="relative z-10 p-6 flex justify-between items-center">
                <button
                    onClick={onClose}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-sand-gold">
                        {type === 'quad' ? (language === 'ar' ? 'كواد' : 'Quad Adventure') :
                         type === 'bungalow' ? (language === 'ar' ? 'بناغل' : 'Bungalows') :
                         type === 'restaurant' ? (language === 'ar' ? 'مطعم' : 'Restaurant') :
                         type === 'tents' ? (language === 'ar' ? 'خيام بربرية' : 'Tentes Berbères') :
                         type === 'park' ? (language === 'ar' ? 'حديقة الحيوان' : 'Parc Animalier') :
                         type === 'kids' ? (language === 'ar' ? 'ألعاب وفروسية' : 'Jeux & Équitation') : 'Aqua Jungle'}
                    </span>
                </div>
            </header>

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 sm:px-6 pointer-events-none">
                <button
                    onClick={handlePrev}
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-luxury-gold/90 backdrop-blur-md flex items-center justify-center border border-white/10 hover:border-luxury-gold text-white hover:text-jungle-deep transition-all duration-300 pointer-events-auto shadow-lg"
                >
                    <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <button
                    onClick={handleNext}
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-luxury-gold/90 backdrop-blur-md flex items-center justify-center border border-white/10 hover:border-luxury-gold text-white hover:text-jungle-deep transition-all duration-300 pointer-events-auto shadow-lg"
                >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
            </div>

            {/* Content Area */}
            <div className="relative z-10 flex-1 flex flex-col justify-end p-6 sm:p-12 lg:p-16">
                <div className="max-w-2xl mx-auto text-center mb-10">
                    <motion.div
                        key={page + 'text'}
                        initial={{ y: 25, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="space-y-4 flex flex-col items-center"
                    >
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight drop-shadow-lg">
                            {currentSlide.title[language]}
                        </h2>
                        <p className="text-sm sm:text-base text-white/90 font-medium drop-shadow-md max-w-lg">
                            {currentSlide.desc[language]}
                        </p>

                        {currentContent.actionLabel && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={handleActionButton}
                                className="mt-6 bg-luxury-gold text-jungle-deep px-8 py-3.5 sm:px-10 sm:py-4 rounded-full text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2 gold-shadow hover:scale-105 active:scale-95 transition-all shadow-2xl pointer-events-auto cursor-pointer"
                            >
                                <span>{currentContent.actionLabel[language]}</span>
                                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                            </motion.button>
                        )}
                    </motion.div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 pb-4">
                    {currentContent.slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`h-1.5 transition-all duration-300 rounded-full shadow-lg ${i === page ? 'w-10 bg-luxury-gold' : 'w-3 bg-white/40 hover:bg-white/60'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
