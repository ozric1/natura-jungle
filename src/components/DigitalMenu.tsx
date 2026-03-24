import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    Utensils,
    Flame,
    Pizza,
    CupSoda,
    ShoppingBag,
    Coffee,
    Leaf,
    GlassWater,
    Cookie,
    Soup
} from 'lucide-react';
import { useState } from 'react';

export interface MenuItem {
    id: string;
    name: { en: string; fr: string; ar: string };
    description: { en: string; fr: string; ar: string };
    price: number;
    category: 'Petit Déjeuner' | 'Salades' | 'Tagines' | 'Plats' | 'Sandwiches' | 'Pizza' | 'Boissons' | 'Jus' | 'Desserts' | 'Suppléments' | 'H\'rira' | 'Café';
}

interface DigitalMenuProps {
    onBack: () => void;
    isRTL?: boolean;
    language: 'en' | 'fr' | 'ar';
}

export const DigitalMenu = ({ onBack, isRTL = false, language }: DigitalMenuProps) => {
    const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('Petit Déjeuner');

    const menuItems: MenuItem[] = [
        // Petit Déjeuner
        {
            id: 'pt1',
            name: { en: 'Gourmand', fr: 'Gourmand', ar: 'فطور غيورماند' },
            description: {
                en: 'Orange juice, pastries, m\'semmen, Cheese Omelet, Jben, honey, jam, butter, bread, coffee or tea.',
                fr: 'Jus d\'orange, viennoiserie, m\'semmen, Omelettes Fromage, Jben, miel, confiture, beurre, pain, café ou thé.',
                ar: 'عصير برتقال، مخبوزات، مسمن، أومليت بالجبن، جبن، عسل، مربى، زبدة، خبز، قهوة أو شاي'
            },
            price: 60,
            category: 'Petit Déjeuner',
        },
        // Petit Déjeuner
        {
            id: 'pt2',
            name: { en: 'Moroccan', fr: 'Marocain', ar: 'فطور مغربي' },
            description: {
                en: 'Orange juice, m\'semmen, eggs with khlii, Jben, honey, bread, coffee or tea.',
                fr: 'Jus d\'orange, m\'semmen, oeufs au khlii, Jben, miel, pain, café ou thé.',
                ar: 'عصير برتقال، مسمن، بيض بالخليع، جبن، عسل، خبز، قهوة أو شاي'
            },
            price: 55,
            category: 'Petit Déjeuner'
        },
        {
            id: 'pt3',
            name: { en: 'Express', fr: 'Express', ar: 'فطور إكسبريس' },
            description: {
                en: 'Orange juice, pastries, m\'semmen, Jben, honey, bread, coffee or tea.',
                fr: 'Jus d\'orange, viennoiserie, m\'semmen, Jben, miel, pain, café ou thé.',
                ar: 'عصير برتقال، مخبوزات، مسمن، جبن، عسل، خبز، قهوة أو شاي'
            },
            price: 45,
            category: 'Petit Déjeuner'
        },

        // Salades
        {
            id: 'sl1',
            name: { en: 'Moroccan Salad', fr: 'Salade Marocaine', ar: 'سلطة مغربية' },
            description: { en: 'Fresh diced vegetables', fr: 'Légumes frais coupés en dés', ar: 'خضروات طازجة مقطعة' },
            price: 30,
            category: 'Salades'
        },
        {
            id: 'sl2',
            name: { en: 'Nicoise Salad', fr: 'Salade Niçoise', ar: 'سلطة نيسواز' },
            description: { en: 'Tuna, beans, eggs, olives', fr: 'Thon, haricots, œufs, olives', ar: 'تونة، فاصوليا، بيض، زيتون' },
            price: 40,
            category: 'Salades'
        },
        {
            id: 'sl3',
            name: { en: 'Natura Jungle Salad', fr: 'Salade Natura Jungle', ar: 'سلطة نطورا جانغل' },
            description: { en: 'Signature house salad', fr: 'Salade signature de la maison', ar: 'سلطة الدار المميزة' },
            price: 50,
            category: 'Salades'
        },

        // Plats
        {
            id: 'pl1',
            name: { en: 'Minced Meat Skewers', fr: 'Brochettes Viande Hachée', ar: 'بروشيت لحم مفروم' },
            description: { en: 'Grilled minced meat skewers', fr: 'Brochettes de viande hachée grillées', ar: 'أسياخ لحم مفروم مشوي' },
            price: 80,
            category: 'Plats'
        },
        {
            id: 'pl2',
            name: { en: 'Chicken Skewers', fr: 'Brochettes Poulet', ar: 'بروشيت دجاج' },
            description: { en: 'Grilled chicken skewers', fr: 'Brochettes de poulet grillées', ar: 'أسياخ دجاج مشوي' },
            price: 75,
            category: 'Plats'
        },
        {
            id: 'pl3',
            name: { en: 'Mixed Skewers', fr: 'Brochettes Mixte', ar: 'بروشيت مشكل' },
            description: { en: 'Mixed meat skewers', fr: 'Brochettes de viandes mixtes', ar: 'أسياخ لحم مشكل' },
            price: 80,
            category: 'Plats'
        },
        {
            id: 'pl4',
            name: { en: 'Nuggets Plate', fr: 'Plat Nuggets', ar: 'صحن ناجتس' },
            description: { en: 'Chicken nuggets plate', fr: 'Assiette de nuggets de poulet', ar: 'طبق ناجتس دجاج' },
            price: 70,
            category: 'Plats'
        },

        // Tagines
        {
            id: 'tg1',
            name: { en: 'Beef Tagine with Prunes', fr: 'Tagine Viande Pruneaux', ar: 'طاجين لحم بالبرقوق' },
            description: { en: 'Beef tagine with prunes', fr: 'Tagine de bœuf aux pruneaux', ar: 'طاجين لحم بالبرقوق' },
            price: 140,
            category: 'Tagines'
        },
        {
            id: 'tg2',
            name: { en: 'Goat Tagine', fr: 'Tagine Chevreaux', ar: 'طاجين معيز' },
            description: { en: 'Goat meat tagine', fr: 'Tagine de viande de chèvre', ar: 'طاجين لحم الماعز' },
            price: 140,
            category: 'Tagines'
        },
        {
            id: 'tg3',
            name: { en: 'Beldi Chicken Tagine', fr: 'Tagine Poulet Beldi Citron', ar: 'طاجين دجاج بلدي بالحامض' },
            description: { en: 'Free-range chicken with lemon', fr: 'Poulet beldi au citron', ar: 'دجاج بلدي بالحامض' },
            price: 135,
            category: 'Tagines'
        },
        {
            id: 'tg4',
            name: { en: 'Couscous (Friday)', fr: 'Couscous (Vendredi)', ar: 'كسكس (الجمعة)' },
            description: { en: 'Friday Special - Per Person', fr: 'Spécial Vendredi - Par Personne', ar: 'مخصوص الجمعة - للشخص' },
            price: 80,
            category: 'Tagines'
        },
        {
            id: 'tg5',
            name: { en: 'R\'fissa (Wednesday)', fr: 'R\'fissa (Mercredi)', ar: 'رفيسة (الأربعاء)' },
            description: { en: 'Wednesday Special - Per Person', fr: 'Spécial Mercredi - Par Personne', ar: 'مخصوص الأربعاء - للشخص' },
            price: 80,
            category: 'Tagines'
        },

        // Sandwiches
        {
            id: 'sw1',
            name: { en: 'Turkey Sandwich', fr: 'Sandwich Dinde', ar: 'ساندويتش ديك رومي' },
            description: { en: 'Served with Fries', fr: 'Accompagné de Frites', ar: 'يقدم مع البطاطس المقلية' },
            price: 50,
            category: 'Sandwiches'
        },
        {
            id: 'sw2',
            name: { en: 'Minced Meat Sandwich', fr: 'Sandwich Viande Hachée', ar: 'ساندويتش لحم مفروم' },
            description: { en: 'Served with Fries', fr: 'Accompagné de Frites', ar: 'يقدم مع البطاطس المقلية' },
            price: 55,
            category: 'Sandwiches'
        },
        {
            id: 'sw3',
            name: { en: 'Cheeseburger', fr: 'Cheeseburger', ar: 'تشيز برجر' },
            description: { en: 'Served with Fries', fr: 'Accompagné de Frites', ar: 'يقدم مع البطاطس المقلية' },
            price: 50,
            category: 'Sandwiches'
        },
        {
            id: 'sw4',
            name: { en: 'Nuggets', fr: 'Nuggets', ar: 'ناجتس' },
            description: { en: 'Served with Fries', fr: 'Accompagné de Frites', ar: 'يقدم مع البطاطس المقلية' },
            price: 50,
            category: 'Sandwiches'
        },

        // Pizza
        {
            id: 'pz1',
            name: { en: 'Minced Meat Pizza', fr: 'Pizza Viande Hachée', ar: 'بيتزا لحم مفروم' },
            description: { en: 'Minced meat', fr: 'Viande hachée', ar: 'لحم مفروم' },
            price: 70,
            category: 'Pizza'
        },
        {
            id: 'pz2',
            name: { en: 'Chicken Pizza', fr: 'Pizza Poulet', ar: 'بيتزا دجاج' },
            description: { en: 'Chicken', fr: 'Poulet', ar: 'دجاج' },
            price: 70,
            category: 'Pizza'
        },
        {
            id: 'pz3',
            name: { en: 'Seafood Pizza', fr: 'Pizza Fruit de Mer', ar: 'بيتزا فواكه البحر' },
            description: { en: 'Seafood', fr: 'Fruits de mer', ar: 'فواكه البحر' },
            price: 80,
            category: 'Pizza'
        },
        {
            id: 'pz4',
            name: { en: 'Tuna Pizza', fr: 'Pizza Thon', ar: 'بيتزا تونة' },
            description: { en: 'Tuna', fr: 'Thon', ar: 'تونة' },
            price: 65,
            category: 'Pizza'
        },
        {
            id: 'pz5',
            name: { en: '4 Cheese Pizza', fr: 'Pizza 4 Fromages', ar: 'بيتزا ٤ أجبان' },
            description: { en: 'Four Cheeses', fr: 'Quatre Fromages', ar: 'أربعة أجبان' },
            price: 65,
            category: 'Pizza'
        },

        // Suppléments
        {
            id: 'sp1',
            name: { en: 'M\'semen', fr: 'M\'semen', ar: 'مسمن' },
            description: { en: 'Moroccan pancake', fr: 'Crêpe marocaine', ar: 'فطيرة مغربية' },
            price: 6,
            category: 'Suppléments'
        },
        {
            id: 'sp2',
            name: { en: 'Harcha', fr: 'Harcha', ar: 'حرشة' },
            description: { en: 'Semolina bread', fr: 'Galette de semoule', ar: 'خبز السميد' },
            price: 6,
            category: 'Suppléments'
        },
        {
            id: 'sp3',
            name: { en: 'Croissant', fr: 'Croissant', ar: 'كرواسون' },
            description: { en: 'Butter croissant', fr: 'Croissant au beurre', ar: 'كرواسون بالزبدة' },
            price: 5,
            category: 'Suppléments'
        },
        {
            id: 'sp4',
            name: { en: 'Omelet', fr: 'Omelette', ar: 'أومليت' },
            description: { en: 'Eggs', fr: 'Œufs', ar: 'بيض' },
            price: 15,
            category: 'Suppléments'
        },
        {
            id: 'sp5',
            name: { en: 'Cheese', fr: 'Fromage', ar: 'جبن' },
            description: { en: 'Cheese portion', fr: 'Portion de fromage', ar: 'قطعة جبن' },
            price: 5,
            category: 'Suppléments'
        },

        // Jus
        {
            id: 'js1',
            name: { en: 'Orange Juice', fr: 'Jus d\'Orange', ar: 'عصير برتقال' },
            description: { en: 'Freshly squeezed', fr: 'Fraîchement pressé', ar: 'عصير طازج' },
            price: 20,
            category: 'Jus'
        },

        // Desserts
        {
            id: 'ds1',
            name: { en: 'Fruit Salad', fr: 'Salade de Fruits', ar: 'سلطة فواكه' },
            description: { en: 'Fresh seasonal fruits', fr: 'Fruits frais de saison', ar: 'فواكه موسمية طازجة' },
            price: 30,
            category: 'Desserts'
        },
        {
            id: 'ds2',
            name: { en: 'Moroccan Sweet', fr: 'Gâteau Marocain', ar: 'حلوى مغربية' },
            description: { en: 'Traditional sweet', fr: 'Douceur traditionnelle', ar: 'حلوى تقليدية' },
            price: 40,
            category: 'Desserts'
        },

        // H'rira
        {
            id: 'hr1',
            name: { en: 'Harira + Egg + Dates', fr: 'H\'rira + Oeuf + Dattes', ar: 'حريرة + بيض + تمر' },
            description: { en: 'Soup set', fr: 'Ensemble soupe', ar: 'مجموعة الحريرة' },
            price: 30,
            category: 'H\'rira'
        },

        // Boissons
        {
            id: 'bs1',
            name: { en: 'Soda', fr: 'Soda', ar: 'صودا' },
            description: { en: 'Fresh drink', fr: 'Boisson fraîche', ar: 'مشروب بارد' },
            price: 15,
            category: 'Boissons'
        },
        {
            id: 'bs2',
            name: { en: 'Mineral Water (S)', fr: 'Eau Minérale (P)', ar: 'ماء معدني (صغير)' },
            description: { en: 'Small Water', fr: 'Petite Eau', ar: 'ماء صغير' },
            price: 12,
            category: 'Boissons'
        },
        {
            id: 'bs3',
            name: { en: 'Mineral Water (L)', fr: 'Eau Minérale (G)', ar: 'ماء معدني (كبير)' },
            description: { en: 'Large Water', fr: 'Grande Eau', ar: 'ماء كبير' },
            price: 16,
            category: 'Boissons'
        },
        {
            id: 'bs4',
            name: { en: 'Sparkling Water', fr: 'Eau Gazeuse', ar: 'ماء فوار' },
            description: { en: 'Sparkling Water', fr: 'Eau Gazeuse', ar: 'ماء غازي' },
            price: 17,
            category: 'Boissons'
        },
        {
            id: 'bs5',
            name: { en: 'Verbena Tea', fr: 'Verveine', ar: 'لويزة' },
            description: { en: 'Herbal Tea', fr: 'Tisane', ar: 'شاي أعشاب' },
            price: 17,
            category: 'Boissons'
        },
        {
            id: 'bs6',
            name: { en: 'Moroccan Tea (S)', fr: 'Thé Marocain (P)', ar: 'شاي مغربي (صغير)' },
            description: { en: 'Mint Tea Small', fr: 'Thé à la menthe petit', ar: 'شاي بالنعناع صغير' },
            price: 15,
            category: 'Boissons'
        },
        {
            id: 'bs7',
            name: { en: 'Moroccan Tea (L)', fr: 'Thé Marocain (G)', ar: 'شاي مغربي (كبير)' },
            description: { en: 'Mint Tea Large', fr: 'Thé à la menthe grand', ar: 'شاي بالنعناع كبير' },
            price: 25,
            category: 'Boissons'
        },

        // Café
        {
            id: 'cf1',
            name: { en: 'Coffee with Milk', fr: 'Café au Lait', ar: 'قهوة بالحليب' },
            description: { en: 'Coffee with milk', fr: 'Café au lait', ar: 'قهوة وحليب' },
            price: 17,
            category: 'Café'
        },
        {
            id: 'cf2',
            name: { en: 'Chocolate Milk', fr: 'Lait au Chocolat', ar: 'حليب بالشوكولاتة' },
            description: { en: 'Chocolate milk', fr: 'Lait chocolaté', ar: 'حليب شكولاتة' },
            price: 17,
            category: 'Café'
        },
        {
            id: 'cf3',
            name: { en: 'Cappuccino', fr: 'Cappuccino', ar: 'كابتشينو' },
            description: { en: 'Foamy coffee', fr: 'Café mousseux', ar: 'قهوة برغوة' },
            price: 17,
            category: 'Café'
        },
    ];

    const text = {
        title: { en: 'Menu', fr: 'Menu', ar: 'القائمة' },
        ingredients: { en: 'Ingredients', fr: 'Ingrédients', ar: 'المكونات' },
        categories: {
            breakfast: { en: 'Breakfast', fr: 'Petit Déjeuner', ar: 'فطور' },
            salads: { en: 'Salads', fr: 'Salades', ar: 'سلطات' },
            tagines: { en: 'Tagines', fr: 'Tagines', ar: 'طواجن' },
            dishes: { en: 'Dishes', fr: 'Plats', ar: 'أطباق' },
            sandwiches: { en: 'Sandwiches', fr: 'Sandwiches', ar: 'ساندويتش' },
            pizza: { en: 'Pizza', fr: 'Pizza', ar: 'بيتزا' },
            supplements: { en: 'Extras', fr: 'Suppléments', ar: 'إضافات' },
            juice: { en: 'Juice', fr: 'Jus', ar: 'عصائر' },
            desserts: { en: 'Desserts', fr: 'Desserts', ar: 'حلويات' },
            hrira: { en: 'H\'rira', fr: 'H\'rira', ar: 'حريرة' },
            drinks: { en: 'Drinks', fr: 'Boissons', ar: 'مشروبات' },
            coffee: { en: 'Coffee', fr: 'Café', ar: 'قهوة' }
        }
    };

    const categories = [
        { id: 'Petit Déjeuner', icon: Coffee, label: text.categories.breakfast[language] },
        { id: 'Salades', icon: Leaf, label: text.categories.salads[language] },
        { id: 'Plats', icon: Utensils, label: text.categories.dishes[language] },
        { id: 'Tagines', icon: Flame, label: text.categories.tagines[language] },
        { id: 'Sandwiches', icon: ShoppingBag, label: text.categories.sandwiches[language] },
        { id: 'Pizza', icon: Pizza, label: text.categories.pizza[language] },
        { id: 'Suppléments', label: text.categories.supplements[language], icon: Utensils },
        { id: 'Jus', icon: GlassWater, label: text.categories.juice[language] },
        { id: 'Desserts', icon: Cookie, label: text.categories.desserts[language] },
        { id: 'H\'rira', icon: Soup, label: text.categories.hrira[language] },
        { id: 'Boissons', icon: CupSoda, label: text.categories.drinks[language] },
        { id: 'Café', icon: Coffee, label: text.categories.coffee[language] },
    ];

    const filteredItems = menuItems.filter(item => item.category === activeCategory);

    return (
        <div className={`min-h-screen ${isRTL ? 'text-right' : 'text-left'} bg-inherit text-inherit max-w-7xl mx-auto`} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <header className="px-4 lg:px-12 py-6 flex justify-between items-center glass-pure-nature dark:glass-jungle-deep border-b border-luxury-gold/10 sticky top-0 z-50 backdrop-blur-md">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onBack}
                    className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-2xl bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/10"
                >
                    <ChevronLeft className={`w-5 h-5 lg:w-6 lg:h-6 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.button>
                <div className="text-center">
                    <h1 className="text-lg lg:text-2xl font-serif font-bold tracking-widest uppercase text-luxury-gold">
                        {text.title[language]}
                    </h1>
                </div>
                <div className="w-10 lg:w-12" /> {/* Spacer for centering */}
            </header>

            <main className="pb-12">
                {/* Category Picker */}
                <div className="flex gap-3 overflow-x-auto lg:flex-nowrap px-4 lg:px-12 py-6 no-scrollbar scroll-smooth">
                    {categories.map((cat, idx) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <motion.button
                                key={cat.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setActiveCategory(cat.id as any)}
                                className={`flex-none px-5 py-3 lg:px-8 lg:py-5 rounded-[1.5rem] lg:rounded-[2rem] flex flex-col items-center gap-2 transition-all duration-500 border ${isActive
                                    ? 'bg-jungle-deep text-luxury-gold border-luxury-gold shadow-2xl scale-105 z-10'
                                    : 'bg-white/40 dark:bg-white/5 text-jungle-deep/40 dark:text-pure-nature/20 border-white/20 dark:border-white/5 hover:bg-white/60'
                                    }`}
                            >
                                <div className={`w-8 h-8 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center ${isActive ? 'bg-luxury-gold/20 shadow-inner' : 'bg-transparent'}`}>
                                    <Icon className="w-4 h-4 lg:w-6 lg:h-6" />
                                </div>
                                <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">{cat.label}</span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Items Grid */}
                <div className="px-4 lg:px-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-16"
                        >
                            {filteredItems.map((item, idx) => {
                                const isEven = idx % 2 === 0;
                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`flex flex-col gap-4 group relative ${!isEven ? 'md:mt-12 lg:mt-24' : ''}`}
                                    >
                                        <div className="flex justify-between items-start mb-2 lg:mb-4">
                                            <h3 className="text-xl lg:text-3xl font-serif text-jungle-deep dark:text-white group-hover:text-luxury-gold transition-colors flex-1">{item.name[language]}</h3>
                                            <span className="text-sm lg:text-lg font-bold text-luxury-gold whitespace-nowrap ml-4">
                                                {item.price} MAD
                                            </span>
                                        </div>

                                        {/* Ingredients and descriptions removed per user request */}
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};
