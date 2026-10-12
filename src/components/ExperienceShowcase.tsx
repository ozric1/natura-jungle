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
                    image: '/assets/natura/quad/quad_fleet_cover.webp',
                    title: {
                        en: "Modern Quad Fleet",
                        fr: "Flotte de Quads Haut de Gamme",
                        ar: "أسطول كواد حديث وفاخر"
                    },
                    desc: {
                        en: "High-performance, modern quads ready to explore nature in full comfort and safety.",
                        fr: "Découvrez notre flotte de quads récents et puissants pour explorer la nature en toute sécurité.",
                        ar: "أسطول من دراجات الكواد الحديثة والقوية لاستكشاف مسارات الطبيعة بكل أمان وراحة."
                    }
                },
                {
                    image: '/assets/natura/quad/quad_poster.webp',
                    title: {
                        en: "Natura Quad Adventure",
                        fr: "Natura Quad : Nature & Sensations",
                        ar: "نطورا كواد : طبيعة ومغامرة"
                    },
                    desc: {
                        en: "Explore, ride, discover, feel the thrill! 1-Seat (150 DH) & 2-Seats (200 DH) for 30 min.",
                        fr: "Explorez, roulez, découvrez, vibrez ! 1 Place (150 DH) & 2 Places (200 DH) pour 30 min de pur plaisir.",
                        ar: "استكشف وانطلق وعش المغامرة ! مقعد واحد (150 درهم) ومقعدين (200 درهم) لـ 30 دقيقة من المتعة."
                    }
                },
                {
                    image: '/assets/natura/quad/quad_group_ride.webp',
                    title: {
                        en: "Group & Family Nature Trails",
                        fr: "Pistes Sauvages & Randonnée en Groupe",
                        ar: "مسارات الغابة والمغامرة الجماعية"
                    },
                    desc: {
                        en: "Ride guided off-road nature trails with helmets and safety gear provided for all riders.",
                        fr: "Parcourez nos pistes sécurisées en famille ou entre amis avec casques et encadrement professionnel.",
                        ar: "انطلق في مسارات الغابة الطبيعية برفقة العائلة والأصدقاء مع خوذات وتأطير احترافي."
                    }
                },
                {
                    image: '/assets/natura/quad/quad_sunset_water.webp',
                    title: {
                        en: "Sunset Magic & Reflections",
                        fr: "Balade au Coucher du Soleil",
                        ar: "سحر الغروب والمسارات المائية"
                    },
                    desc: {
                        en: "Breathtaking sunset views and golden water reflections in the heart of nature.",
                        fr: "Spectacle féerique et reflets dorés au coucher du soleil en pleine nature.",
                        ar: "مناظر طبيعية خلابة وانعكاسات ساحرة عند غروب الشمس في قلب الطبيعة."
                    }
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
                    desc: { en: "Our stay packages starting from 900 DH: Discovery Offer & Family Discovery.", fr: "Nos formules de séjour dès 900 DH : Offre Découverte & Famille Découverte.", ar: "باقات الإقامة ابتداءً من 900 درهم: عرض الاستكشاف وباقة العائلة الاستكشافية." }
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
                    desc: { en: "Breakfast, animal park and kids play area included in all bungalow stays.", fr: "Petit-déjeuner, parc animalier et espace jeux inclus dans toutes vos nuitées.", ar: "فطور الصباح، حديقة الحيوان وفضاء الألعاب مشمولة في جميع الإقامات." }
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
                    desc: { en: "Relax by the turquoise pool in the heart of nature with sunbeds and refreshments.", fr: "Détendez-vous au bord de notre piscine turquoise au cœur de la nature avec transats confortables.", ar: "استمتع بالسباحة والاسترخاء في مسبحنا الفيروزي وسط الطبيعة الهادئة." }
                }
            ]
        }
    };

    const currentContent = content[type] || content.bungalow;
    const currentSlide = currentContent.slides[page] || currentContent.slides[0];

    const handleNext = () => setPage(prev => (prev + 1) % currentContent.slides.length);
    const handlePrev = () => setPage(prev => (prev - 1 + currentContent.slides.length) % currentContent.slides.length);

    // Preload all slide images on mount/change for instant display
    useEffect(() => {
        currentContent.slides.forEach(slide => {
            const img = new Image();
            img.src = slide.image;
        });
    }, [currentContent.slides]);

    const handleActionButton = () => {
        if (currentContent.actionTarget === 'whatsapp') {
            const message = currentContent.whatsappMessage || "Bonjour, je souhaite réserver une activité au Natura Jungle Park.";
            window.open(`https://wa.me/212605500058?text=${encodeURIComponent(message)}`, '_blank');
        } else if (currentContent.actionTarget) {
            onAction(currentContent.actionTarget);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] bg-black text-white overflow-hidden flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Background Image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={page}
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={currentSlide.image}
                        className="w-full h-full object-cover opacity-85"
                        alt={currentSlide.title[language] || "Showcase"}
                        loading="eager"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30" />
                </motion.div>
            </AnimatePresence>

            {/* Header */}
            <header className="relative z-10 p-4 sm:p-6 flex justify-between items-center">
                <button
                    onClick={onClose}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all shadow-lg"
                    aria-label="Close"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-sand-gold/40 shadow-lg">
                    <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-sand-gold">
                        {type === 'quad' ? (language === 'ar' ? 'كواد الغابة' : 'Balade à Quad') :
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
                    className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-luxury-gold backdrop-blur-md flex items-center justify-center border border-white/20 hover:border-luxury-gold text-white hover:text-jungle-deep transition-all duration-200 pointer-events-auto shadow-xl"
                    aria-label="Previous"
                >
                    <ChevronLeft className={`w-6 h-6 sm:w-8 sm:h-8 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
                <button
                    onClick={handleNext}
                    className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-luxury-gold backdrop-blur-md flex items-center justify-center border border-white/20 hover:border-luxury-gold text-white hover:text-jungle-deep transition-all duration-200 pointer-events-auto shadow-xl"
                    aria-label="Next"
                >
                    <ChevronRight className={`w-6 h-6 sm:w-8 sm:h-8 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Content Area */}
            <div className="relative z-10 flex-1 flex flex-col justify-end p-5 sm:p-10 lg:p-14 pb-6 sm:pb-8">
                <div className="max-w-2xl mx-auto text-center mb-6 sm:mb-8">
                    <motion.div
                        key={page + 'text'}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-3 flex flex-col items-center"
                    >
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight drop-shadow-lg">
                            {currentSlide.title[language]}
                        </h2>
                        <p className="text-xs sm:text-base text-white/90 font-medium drop-shadow-md max-w-lg leading-relaxed">
                            {currentSlide.desc[language]}
                        </p>

                        {currentContent.actionLabel && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                onClick={handleActionButton}
                                className="mt-4 bg-luxury-gold text-jungle-deep px-7 py-3 sm:px-9 sm:py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-2xl pointer-events-auto cursor-pointer"
                            >
                                <span>{currentContent.actionLabel[language]}</span>
                                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                            </motion.button>
                        )}
                    </motion.div>
                </div>

                {/* Interactive Filmstrip Thumbnails */}
                <div className="flex justify-center items-center gap-2 sm:gap-3 max-w-md mx-auto overflow-x-auto py-2 px-3 bg-black/40 backdrop-blur-md rounded-2xl border border-white/15">
                    {currentContent.slides.map((slide, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`relative rounded-xl overflow-hidden transition-all duration-300 shrink-0 ${
                                i === page
                                    ? 'w-14 h-11 sm:w-16 sm:h-12 ring-2 ring-luxury-gold scale-105 shadow-md'
                                    : 'w-10 h-8 sm:w-12 sm:h-9 opacity-50 hover:opacity-90'
                            }`}
                        >
                            <img
                                src={slide.image}
                                className="w-full h-full object-cover"
                                alt=""
                                loading="lazy"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
