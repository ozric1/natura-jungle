import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, Bookmark, Share2, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { AnimalDiscovery } from './AnimalDiscovery';
import pigsImg from '../assets/park/pigs.jpg';
import cockatooImg from '../assets/park/cockatoo.jpg';
import wallabyImg from '../assets/park/wallaby.jpg';

interface AnimalExhibit {
    id: string;
    name: { en: string; fr: string; ar: string };
    fact: { en: string; fr: string; ar: string };
    image: string;
    category: 'Avian' | 'Mammal' | 'Farm';
}

interface WildCircuitExhibitionProps {
    onBack: () => void;
    isRTL?: boolean;
    language: 'en' | 'fr' | 'ar';
}

export const WildCircuitExhibition = ({ onBack, isRTL = false, language }: WildCircuitExhibitionProps) => {
    const [selectedAnimal, setSelectedAnimal] = useState<AnimalExhibit | null>(null);

    const exhibits: AnimalExhibit[] = [
        {
            id: 'ducks',
            name: { en: 'Ducks', fr: 'Canards', ar: 'البط' },
            fact: { en: 'Our ducks love the central pond and are often the first to greet visitors.', fr: 'Nos canards adorent l\'étang central et sont souvent les premiers à saluer les visiteurs.', ar: 'تحب طيور البط لدينا البركة المركزية وغالباً ما تكون هي أول من يستقبل الزوار.' },
            image: 'https://images.unsplash.com/photo-1530121223246-013ca6dd3438?q=80&w=800',
            category: 'Avian'
        },
        {
            id: 'black-swan',
            name: { en: 'Black Swan', fr: 'Cygne Noir', ar: 'البجع الأسود' },
            fact: { en: 'Majestic and rare, the black swan is a symbol of elegance in our park.', fr: 'Majestueux et rare, le cygne noir est un symbole d\'élégance dans notre parc.', ar: 'مهيب ونادر، البجع الأسود هو رمز للأناقة في منتزهنا.' },
            image: 'https://images.unsplash.com/photo-1549466699-db3730302b4e?q=80&w=800',
            category: 'Avian'
        },
        {
            id: 'white-swan',
            name: { en: 'White Swan', fr: 'Cygne Blanc', ar: 'البجع الأبيض' },
            fact: { en: 'Often found gliding gracefully, they represent the serenity of Natura Jungle.', fr: 'Souvent vus glissant avec grâce, ils représentent la sérénité de Natura Jungle.', ar: 'غالباً ما يظهرون وهم يسبحون بنعمة، وهم يمثلون هدوء فطورا جانغل.' },
            image: 'https://images.unsplash.com/photo-1511216113906-8f57bb83e776?q=80&w=800',
            category: 'Avian'
        },
        {
            id: 'horses',
            name: { en: 'Horses', fr: 'Chevaux', ar: 'الخيول' },
            fact: { en: 'Our stables house gentle spirits ready for equestrian adventures.', fr: 'Nos écuries abritent des esprits doux prêts pour des aventures équestres.', ar: 'تضم اسطبلاتنا خيولاً لطيفة وجاهزة لمغامرات الفروسية.' },
            image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=800',
            category: 'Mammal'
        },
        {
            id: 'ostrich',
            name: { en: 'Ostrich', fr: 'Autruche', ar: 'النعام' },
            fact: { en: 'The fastest bird on land, our ostriches are curious and impressive.', fr: 'L\'oiseau le plus rapide sur terre, nos autruches sont curieuses et impressionnantes.', ar: 'أسرع طائر على وجه الأرض، النعام لدينا فضولي ومثير للإعجاب.' },
            image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=800',
            category: 'Avian'
        },
        {
            id: 'tibet-goat',
            name: { en: 'Tibet Goat', fr: 'Chèvre du Tibet', ar: 'ماعز التبت' },
            fact: { en: 'Known for their soft coat and climbing skills.', fr: 'Connues pour leur pelage doux et leurs talents de grimpeur.', ar: 'معروفة بفرائها الناعم ومهاراتها في التسلق.' },
            image: 'https://images.unsplash.com/photo-1621213303681-37d4529ec9d2?q=80&w=800',
            category: 'Mammal'
        },
        {
            id: 'tibet-sheep',
            name: { en: 'Tibet Sheep', fr: 'Mouton du Tibet', ar: 'خروف التبت' },
            fact: { en: 'Hardy and peaceful, they thrive in the hilly sections of the circuit.', fr: 'Robustes et paisibles, ils s\'épanouissent dans les sections vallonnées du circuit.', ar: 'قوية وهادئة، تزدهر في الأجزاء التلية من المسار.' },
            image: 'https://images.unsplash.com/photo-1484557918186-7b4e571d4b12?q=80&w=800',
            category: 'Mammal'
        },
        {
            id: 'peacock',
            name: { en: 'Peacock', fr: 'Paon', ar: 'الطاووس' },
            fact: { en: 'A living masterpiece of nature, displaying vibrant "eyes" to dazzle.', fr: 'Un chef-d\'œuvre vivant de la nature, arborant des "yeux" vibrants pour éblouir.', ar: 'تحفة طبيعية حية، تظهر "عيوناً" ملونة للانبهار.' },
            image: 'https://images.unsplash.com/photo-1521613271131-4876b3281165?q=80&w=800',
            category: 'Avian'
        },
        {
            id: 'kangaroo',
            name: { en: 'Kangaroo (Wallaby)', fr: 'Kangourou (Wallaby)', ar: 'الكنغر (والابي)' },
            fact: { en: 'Agile and alert, these marsupials are a joy to observe in their enclosure.', fr: 'Agiles et alertes, ces marsupiaux sont un plaisir à observer dans leur enclos.', ar: 'رشيقة ويقظة، هذه الجرابيات هي متعة لمراقبتها في حظيرتها.' },
            image: wallabyImg,
            category: 'Mammal'
        },
        {
            id: 'small-pigs',
            name: { en: 'Small Pigs', fr: 'Petits Cochons', ar: 'الخنازير الصغيرة' },
            fact: { en: 'Intelligent and playful, they are a favorite among our younger guests.', fr: 'Intelligents et enjoués, ils sont les favoris de nos plus jeunes invités.', ar: 'ذكية ومرحة، وهي مفضلة لدى زوارنا الصغار.' },
            image: pigsImg,
            category: 'Farm'
        },
        {
            id: 'ivory-parrot',
            name: { en: 'Ivory Parrot (Cockatoo)', fr: 'Perroquet Ivoire (Cacatoès)', ar: 'الببغاء العاجي (كاكاتو)' },
            fact: { en: 'Vocal and colorful, the Cockatoo is the voice of the forest canopy.', fr: 'Vocal et coloré, le Cacatoès est la voix de la canopée de la forêt.', ar: 'صوت ملون، الكاكاتو هو صوت غطاء الغابة.' },
            image: cockatooImg,
            category: 'Avian'
        }
    ];

    return (
        <div className="h-screen w-full bg-egg-shell dark:bg-ink-black text-jungle-green dark:text-white overflow-y-auto pb-32 no-scrollbar scroll-smooth" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <header className="px-6 py-12 flex justify-between items-end sticky top-0 z-50 bg-egg-shell/95 dark:bg-ink-black/95 backdrop-blur-xl border-b border-sand-gold/10">
                <div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onBack}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-jungle-green/10 dark:bg-white/10 text-jungle-green dark:text-white mb-4"
                    >
                        <ChevronLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                    </motion.button>
                    <h1 className="text-4xl font-serif italic text-jungle-green dark:text-white">
                        {language === 'ar' ? 'المسار البري' : language === 'fr' ? 'Le Circuit Sauvage' : 'The Wild Circuit'}
                    </h1>
                    <p className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-40 mt-2">
                        {language === 'ar' ? 'استكشاف الأنواع' : language === 'fr' ? 'Découverte des Espèces' : 'Species Discovery Exhibition'}
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full border border-sand-gold/20 flex items-center justify-center text-sand-gold relative">
                        <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                </div>
            </header>

            {/* Interactive Scroll List */}
            <div className="px-6 space-y-20 mt-12 pb-20">
                {exhibits.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: index % 3 * 0.1 }}
                        className="group relative"
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            {/* Image Container */}
                            <div className="relative w-full md:w-1/2 aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl gold-shadow group-hover:scale-[1.02] transition-transform duration-700">
                                <img src={item.image} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0" alt={item.name[language]} />
                                <div className="absolute inset-0 bg-gradient-to-t from-jungle-green/80 via-transparent to-transparent opacity-60" />

                                <div className="absolute top-6 left-6 glass-dark px-4 py-2 rounded-full border border-white/20">
                                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">{item.category}</span>
                                </div>
                            </div>

                            {/* Info Container */}
                            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-[1px] bg-sand-gold/40" />
                                        <span className="text-sand-gold text-[10px] font-bold uppercase tracking-widest">0{index + 1} / {exhibits.length}</span>
                                    </div>
                                    <h2 className="text-5xl font-serif text-jungle-green group-hover:text-sand-gold transition-colors duration-500">{item.name[language]}</h2>
                                </div>

                                <motion.div
                                    className="p-8 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-[2.5rem] border border-sand-gold/10 shadow-sm relative"
                                >
                                    <div className="absolute -top-3 left-8 w-6 h-6 bg-sand-gold rounded-full flex items-center justify-center text-jungle-green">
                                        <Info className="w-3 h-3" />
                                    </div>
                                    <p className="text-lg font-serif italic text-jungle-green/80 leading-relaxed">
                                        "{item.fact[language]}"
                                    </p>

                                    <div className="mt-8 flex flex-col gap-4">
                                        <div className="flex gap-4">
                                            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sand-gold hover:text-jungle-green transition-colors">
                                                <Bookmark className="w-4 h-4" />
                                                Save
                                            </button>
                                            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">
                                                <Share2 className="w-4 h-4" />
                                                Share
                                            </button>
                                        </div>

                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedAnimal(item)}
                                            className="w-full mt-4 flex items-center justify-between group/btn py-4 px-6 bg-sand-gold/10 rounded-2xl border border-sand-gold/20 hover:bg-sand-gold transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Sparkles className="w-4 h-4 text-sand-gold group-hover/btn:text-jungle-green" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-sand-gold group-hover/btn:text-jungle-green">
                                                    {language === 'ar' ? 'اكتشف المزيد' : language === 'fr' ? 'Découvrir Plus' : 'Learn More'}
                                                </span>
                                            </div>
                                            <ArrowRight className={`w-4 h-4 text-sand-gold group-hover/btn:text-jungle-green ${isRTL ? 'rotate-180' : ''}`} />
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
                className="mt-20 px-6 text-center"
            >
                <div className="max-w-xl mx-auto p-12 bg-jungle-green rounded-[3rem] text-white overflow-hidden relative shadow-2xl gold-shadow">
                    <div className="absolute inset-0 opacity-10 blur-3xl bg-sand-gold" />
                    <Sparkles className="w-12 h-12 text-sand-gold mx-auto mb-6" />
                    <h3 className="text-3xl font-serif mb-4">Want to meet them?</h3>
                    <p className="text-white/60 mb-10 text-sm">Experience the magic in person. Book your tour or stay today.</p>
                    <button onClick={onBack} className="bg-sand-gold text-jungle-green px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 mx-auto">
                        Return to Dashboard
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
