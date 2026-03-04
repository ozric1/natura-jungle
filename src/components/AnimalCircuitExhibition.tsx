import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, Info, Bookmark, Share2, Sparkles, ArrowRight, Search } from 'lucide-react';
import { useState, useRef, type MouseEvent } from 'react';
import { AnimalDiscovery } from './AnimalDiscovery';


interface AnimalExhibit {
    id: string;
    name: { en: string; fr: string; ar: string };
    fact: { en: string; fr: string; ar: string };
    image: string;
    category: 'Avian' | 'Mammal' | 'Farm' | 'Discovery';
}

interface AnimalDiscoveryExhibitionProps {
    onBack: () => void;
    isRTL?: boolean;
    language: 'en' | 'fr' | 'ar';
}

// Creative Zoom Interaction Component
const InteractiveImage = ({ src, alt, category }: { src: string; alt: string; category: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useSpring(1, { stiffness: 300, damping: 30 });
    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width;
        const yPos = (e.clientY - rect.top) / rect.height;

        x.set(xPos);
        y.set(yPos);
    };

    const handleMouseEnter = () => scale.set(1.5);
    const handleMouseLeave = () => {
        scale.set(1);
        x.set(0.5);
        y.set(0.5);
    };

    // Transform logic for the "Lens" effect
    const lensX = useTransform(xSpring, [0, 1], ['0%', '100%']);
    const lensY = useTransform(ySpring, [0, 1], ['0%', '100%']);

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full relative overflow-hidden cursor-crosshair group"
        >
            <motion.img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-all duration-500"
                style={{ scale, transformOrigin: `${x.get() * 100}% ${y.get() * 100}%` }}
                initial={{ filter: 'grayscale(100%) saturate(50%)' }}
                whileHover={{ filter: 'grayscale(0%) saturate(120%)' }}
            />

            {/* Custom Lens / Zoom Indicator */}
            <motion.div
                className="absolute w-24 h-24 border-2 border-luxury-gold rounded-full pointer-events-none opacity-0 group-hover:opacity-100 backdrop-blur-sm -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                style={{ left: lensX, top: lensY }}
            >
                <Search className="w-5 h-5 text-luxury-gold" />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-jungle-green/80 via-transparent to-transparent opacity-60 pointer-events-none" />

            <div className="absolute top-6 left-6 glass-dark px-4 py-2 rounded-full border border-white/20 pointer-events-none z-10">
                <span className="text-[10px] text-white font-bold uppercase tracking-widest">{category}</span>
            </div>
        </div>
    );
};


export const AnimalDiscoveryExhibition = ({ onBack, isRTL = false, language }: AnimalDiscoveryExhibitionProps) => {
    const [selectedAnimal, setSelectedAnimal] = useState<AnimalExhibit | null>(null);

    const exhibits: AnimalExhibit[] = [
        {
            id: 'ducks',
            name: { en: 'Ducks', fr: 'Canards', ar: 'البط' },
            fact: { en: 'Our ducks love the central pond and are often the first to greet visitors.', fr: 'Nos canards adorent l\'étang central et sont souvent les premiers à saluer les visiteurs.', ar: 'تحب طيور البط لدينا البركة المركزية وغالباً ما تكون هي أول من يستقبل الزوار.' },
            image: '/assets/natura/animals/ducks.jpg',
            category: 'Avian'
        },
        {
            id: 'ostrich',
            name: { en: 'Ostrich', fr: 'Autruche', ar: 'النعام' },
            fact: { en: 'The fastest bird on land, our ostriches are curious and impressive.', fr: 'L\'oiseau le plus rapide sur terre, nos autruches sont curieuses et impressionnantes.', ar: 'أسرع طائر على وجه الأرض، النعام لدينا فضولي ومثير للإعجاب.' },
            image: '/assets/natura/animals/austrich.jpg',
            category: 'Avian'
        },
        {
            id: 'black-dove',
            name: { en: 'Black Dove', fr: 'Pigeon Noir', ar: 'الحمام الأسود' },
            fact: { en: 'A rare and beautiful sight, the black dove is a symbol of peace in our gardens.', fr: 'Un spectacle rare et magnifique, le pigeon noir est un symbole de paix dans nos jardins.', ar: 'رؤية نادرة وجميلة، اليمامة السوداء هي رمز للسلام في حدائقنا.' },
            image: '/assets/natura/animals/blackdove.jpg',
            category: 'Avian'
        },
        {
            id: 'deer',
            name: { en: 'Deer', fr: 'Cerf', ar: 'الغزلان' },
            fact: { en: 'Graceful runners that represent the gentle soul of the forest.', fr: 'Coureurs gracieux qui représentent l\'âme douce de la forêt.', ar: 'عدائين رشيقين يمثلون الروح اللطيفة للغابة.' },
            image: '/assets/natura/animals/deer.jpg',
            category: 'Mammal'
        },
        {
            id: 'park-highlight-1',
            name: { en: 'Gentle Moments', fr: 'Moments de Douceur', ar: 'لحظات هادئة' },
            fact: { en: 'Every corner of our sanctuary offers a peaceful encounter with nature.', fr: 'Chaque coin de notre sanctuaire offre une rencontre paisible avec la nature.', ar: 'كل ركن في محميتنا يقدم لقاءً هادئاً مع الطبيعة.' },
            image: '/assets/natura/animals/DSC00006.jpg',
            category: 'Discovery'
        },
        {
            id: 'park-highlight-2',
            name: { en: 'Nature Harmony', fr: 'Harmonie Naturelle', ar: 'تناغم الطبيعة' },
            fact: { en: 'Observing animals in their natural habitat brings a sense of serenity.', fr: 'Observer les animaux dans leur habitat naturel apporte un sentiment de سيرينتي.', ar: 'مراقبة الحيوانات في بيئتها الطبيعية يمنح شعوراً بالسكينة.' },
            image: '/assets/natura/animals/DSC00014.jpg',
            category: 'Discovery'
        },
        {
            id: 'park-highlight-3',
            name: { en: 'Sanctuary Peace', fr: 'Paix du Sanctuaire', ar: 'سلام المحمية' },
            fact: { en: 'A glimpse into the daily life of our cherished inhabitants.', fr: 'Un aperçu de la vie quotidienne de nos chers habitants.', ar: 'لمحة عن الحياة اليومية لسكاننا الأعزاء.' },
            image: '/assets/natura/animals/DSC00009.jpg',
            category: 'Discovery'
        },
        {
            id: 'lama',
            name: { en: 'Lama', fr: 'Lama', ar: 'اللاما' },
            fact: { en: 'Gentle and curious, they often hum when they are happy and content.', fr: 'Doux et curieux, ils fredonnent souvent lorsqu\'ils sont heureux et satisfaits.', ar: 'لطيفة وفضولية، غالباً ما تدندن عندما تكون سعيدة وراضية.' },
            image: '/assets/natura/animal circuit Lama.jpeg',
            category: 'Mammal'
        },
        {
            id: 'black-swan',
            name: { en: 'Black Swan', fr: 'Cygne Noir', ar: 'البجع الأسود' },
            fact: { en: 'Majestic and rare, the black swan is a symbol of elegance in our park.', fr: 'Majestueux et rare, le cygne noir est un symbole d\'élégance dans notre parc.', ar: 'مهيب ونادر، البجع الأسود هو رمز للأناقة في منتزهنا.' },
            image: '/assets/natura/black_swan_update.jpg',
            category: 'Avian'
        },
        {
            id: 'cockatoo',
            name: { en: 'Cockatoo', fr: 'Cacatoès', ar: 'الكاكاتو' },
            fact: { en: 'Social and intelligent birds that add music to our sanctuary.', fr: 'Oiseaux sociaux et intelligents qui ajoutent de la musique à notre sanctuaire.', ar: 'طيور اجتماعية وذكية تضفي لمسة موسيقية على محمتنا.' },
            image: '/assets/natura/cockatoo.jpg',
            category: 'Avian'
        },
        {
            id: 'horses',
            name: { en: 'Horses', fr: 'Chevaux', ar: 'الخيول' },
            fact: { en: 'Our stables house gentle spirits ready for equestrian adventures.', fr: 'Nos écuries abritent des esprits doux prêts pour des aventures équestres.', ar: 'تضم اسطبلاتنا خيولاً لطيفة وجاهزة لمغامرات الفروسية.' },
            image: '/assets/natura/horse_update.jpg',
            category: 'Mammal'
        },
        {
            id: 'peacock',
            name: { en: 'Peacock', fr: 'Paon', ar: 'الطاووس' },
            fact: { en: 'A living masterpiece of nature, displaying vibrant "eyes" to dazzle.', fr: 'Un chef-d\'œuvre vivant de la nature, arborant des "yeux" vibrants pour éblouir.', ar: 'تحفة طبيعية حية، تظهر "عيوناً" ملونة للانبهار.' },
            image: '/assets/natura/peacock_update.jpg',
            category: 'Avian'
        },
        {
            id: 'wallaby',
            name: { en: 'Kangaroo (Wallaby)', fr: 'Kangourou (Wallaby)', ar: 'الكنغر (والابي)' },
            fact: { en: 'Agile and alert, these marsupials are a joy to observe in their enclosure.', fr: 'Agiles et alertes, ces marsupiaux sont un plaisir à observer dans leur enclos.', ar: 'رشيقة ويقظة، هذه الجرابيات هي متعة لمراقبتها في حظيرتها.' },
            image: '/assets/natura/wallaby.jpg',
            category: 'Mammal'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white relative overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>

            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-jungle-deep/95 to-transparent backdrop-blur-md border-b border-luxury-gold/10">
                <button onClick={onBack} className="w-12 h-12 rounded-2xl glass-pure-nature flex items-center justify-center hover:scale-110 transition-transform group border border-luxury-gold/20 shadow-lg">
                    <ChevronLeft className={`w-6 h-6 text-pure-nature group-hover:text-luxury-gold ${isRTL ? 'rotate-180' : ''}`} />
                </button>
                <div className="text-center">
                    <h1 className="text-3xl font-serif text-pure-nature tracking-tight">
                        {language === 'ar' ? 'مسار الحيوانات' : language === 'fr' ? 'Le Circuit Animalier' : 'The Animal Circuit'}
                    </h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">
                        {language === 'ar' ? 'معرض اكتشاف الحيوانات' : language === 'fr' ? 'Exposition Découverte' : 'Animal Discovery Exhibition'}
                    </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-luxury-gold text-jungle-deep flex items-center justify-center shadow-lg gold-shadow">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
            </div>

            <div className="pt-32 pb-40 space-y-32">
                {exhibits.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative px-6"
                    >
                        <div className={`max-w-6xl mx-auto flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>

                            {/* Image Container with Lens Effect */}
                            <div className="w-full md:w-1/2 h-64 md:h-[500px] rounded-[2.5rem] overflow-hidden relative group shadow-2xl gold-shadow">
                                <InteractiveImage src={item.image} alt={item.name[language]} category={item.category} />
                            </div>

                            {/* Info Container */}
                            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-[1px] bg-sand-gold/40" />
                                        <span className="text-sand-gold text-[10px] font-bold uppercase tracking-widest">
                                            {String(index + 1).padStart(2, '0')} / {exhibits.length}
                                        </span>
                                    </div>
                                    <h2 className="text-5xl font-serif text-jungle-green group-hover:text-sand-gold transition-colors duration-500 text-white">
                                        {item.name[language]}
                                    </h2>
                                </div>

                                <motion.div
                                    className="p-10 bg-pure-nature/5 dark:bg-jungle-leaf/5 backdrop-blur-xl rounded-[3rem] border border-luxury-gold/20 shadow-2xl relative"
                                >
                                    <div className="absolute -top-4 left-10 w-8 h-8 bg-luxury-gold rounded-2xl flex items-center justify-center text-jungle-deep shadow-lg">
                                        <Info className="w-4 h-4" />
                                    </div>
                                    <p className="text-2xl font-serif italic text-pure-nature/90 leading-relaxed dark:text-pure-nature">
                                        "{item.fact[language]}"
                                    </p>

                                    <div className="mt-10 flex flex-col gap-6">
                                        <div className="flex gap-6 items-center">
                                            <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-luxury-gold hover:text-pure-nature transition-colors">
                                                <Bookmark className="w-5 h-5" />
                                                {language === 'ar' ? 'حفظ' : language === 'fr' ? 'Enregistrer' : 'Save'}
                                            </button>
                                            <div className="w-1 h-1 rounded-full bg-luxury-gold/40" />
                                            <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all text-pure-nature">
                                                <Share2 className="w-5 h-5" />
                                                {language === 'ar' ? 'مشاركة' : language === 'fr' ? 'Partager' : 'Share'}
                                            </button>
                                        </div>

                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedAnimal(item)}
                                            className="w-full mt-4 flex items-center justify-between group/btn py-6 px-10 bg-luxury-gold/10 rounded-3xl border border-luxury-gold/30 hover:bg-luxury-gold transition-all duration-500 gold-shadow-sm"
                                        >
                                            <div className="flex items-center gap-4">
                                                <Sparkles className="w-5 h-5 text-luxury-gold group-hover/btn:text-jungle-deep" />
                                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-luxury-gold group-hover/btn:text-jungle-deep">
                                                    {language === 'ar' ? 'اكتشف المزيد' : language === 'fr' ? 'Découvrir Plus' : 'Learn More'}
                                                </span>
                                            </div>
                                            <ArrowRight className={`w-5 h-5 text-luxury-gold group-hover/btn:text-jungle-deep transition-transform duration-500 group-hover/btn:translate-x-2 ${isRTL ? 'rotate-180' : ''}`} />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedAnimal && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed inset-0 z-[1000] overflow-y-auto no-scrollbar"
                    >
                        <AnimalDiscovery
                            animal={{
                                name: selectedAnimal.name[language],
                                species: selectedAnimal.category,
                                character: selectedAnimal.fact[language],
                                intelligence: "Intelligent and curious, this species plays a vital role in our park's ecosystem.",
                                image: selectedAnimal.image,
                                audioSrc: ""
                            }}
                            onBack={() => setSelectedAnimal(null)}
                            isRTL={isRTL}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Call to Action */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-32 px-6 pb-24 text-center"
            >
                <div className="max-w-xl mx-auto p-16 bg-jungle-deep rounded-[4rem] text-pure-nature overflow-hidden relative shadow-2xl gold-shadow border border-luxury-gold/20">
                    <div className="absolute inset-0 opacity-10 blur-3xl bg-luxury-gold" />
                    <Sparkles className="w-16 h-16 text-luxury-gold mx-auto mb-8" />
                    <h3 className="text-4xl font-serif mb-6 text-luxury-gold">
                        {language === 'ar' ? 'هل تود لقاءهم؟' : language === 'fr' ? 'Voulez-vous les rencontrer ?' : 'Want to meet them?'}
                    </h3>
                    <p className="text-pure-nature/60 mb-12 text-lg leading-relaxed">
                        {language === 'ar' ? 'عش السحر شخصياً. احجز جولتك أو إقامتك اليوم.' : language === 'fr' ? 'Vivez la magie en personne. Réservez votre visite ou séjour dès aujourd\'hui.' : 'Experience the magic in person. Book your tour or stay today.'}
                    </p>
                    <button onClick={onBack} className="bg-luxury-gold text-jungle-deep px-12 py-6 rounded-3xl font-bold uppercase tracking-widest text-sm flex items-center gap-4 mx-auto gold-shadow hover:scale-105 transition-transform">
                        {language === 'ar' ? 'العودة إلى لوحة القيادة' : language === 'fr' ? 'Retour au Tableau de Bord' : 'Return to Dashboard'}
                        <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
