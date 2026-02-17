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
    name: string;
    description: string;
    price: number;
    category: 'Petit Déjeuner' | 'Salades' | 'Tagines' | 'Plats' | 'Sandwiches' | 'Pizza' | 'Boissons' | 'Jus' | 'Desserts' | 'Suppléments' | 'H\'rira' | 'Café';
    image: string;
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
            name: language === 'ar' ? 'فطور غيورماند' : 'Gourmand',
            description: language === 'ar' ? 'عصير برتقال، مخبوزات، مسمن، أومليت بالجبن، جبن، عسل، مربى، زبدة، خبز، قهوة أو شاي' : 'Jus d\'orange, viennoiserie, m\'semmen, Omelettes Fromage, Jben, miel, confiture, beurre, pain, café ou thé.',
            price: 60,
            category: 'Petit Déjeuner',
            image: '/assets/natura/Jungle restau 2.jpeg'
        },
        {
            id: 'pt2',
            name: language === 'ar' ? 'فطور مغربي' : 'Marocain',
            description: language === 'ar' ? 'عصير برتقال، مسمن، بيض بالخليع، جبن، عسل، خبز، قهوة أو شاي' : 'Jus d\'orange, m\'semmen, oeufs au khlii, Jben, miel, pain, café ou thé.',
            price: 55,
            category: 'Petit Déjeuner',
            image: '/assets/natura/Jungle RESTAURENT 4.jpeg'
        },
        {
            id: 'pt3',
            name: language === 'ar' ? 'فطور إكسبريس' : 'Express',
            description: language === 'ar' ? 'عصير برتقال، مخبوزات، مسمن، جبن، عسل، خبز، قهوة أو شاي' : 'Jus d\'orange, viennoiserie, m\'semmen, Jben, miel, pain, café ou thé.',
            price: 45,
            category: 'Petit Déjeuner',
            image: '/assets/natura/Jungle restaurant.jpeg'
        },

        // Salades
        { id: 'sl1', name: language === 'ar' ? 'سلطة مغربية' : 'Salade Marocaine', description: 'Fresh diced vegetables', price: 30, category: 'Salades', image: '/assets/natura/Jungle Restaurant 3.jpeg' },
        { id: 'sl2', name: language === 'ar' ? 'سلطة نيسواز' : 'Salade Niçoise', description: 'Tuna, beans, eggs, olives', price: 40, category: 'Salades', image: '/assets/natura/Jungle restau 2.jpeg' },
        { id: 'sl3', name: language === 'ar' ? 'سلطة نطورا جانغل' : 'Salade Natura Jungle', description: 'Signature house salad', price: 50, category: 'Salades', image: '/assets/natura/Jungle RESTAURANT 5.jpeg' },

        // Plats
        { id: 'pl1', name: language === 'ar' ? 'بروشيت لحم مفروم' : 'Brochettes Viande Hachée', description: 'Grilled minced meat skewers', price: 80, category: 'Plats', image: '/assets/natura/Jungle restaurant.jpeg' },
        { id: 'pl2', name: language === 'ar' ? 'بروشيت دجاج' : 'Brochettes Poulet', description: 'Grilled chicken skewers', price: 75, category: 'Plats', image: '/assets/natura/Jungle Restaurant 3.jpeg' },
        { id: 'pl3', name: language === 'ar' ? 'بروشيت مشكل' : 'Brochettes Mixte', description: 'Mixed meat skewers', price: 80, category: 'Plats', image: '/assets/natura/Jungle RESTAURENT 4.jpeg' },
        { id: 'pl4', name: language === 'ar' ? 'صحن ناجتس' : 'Plat Nuggets', description: 'Chicken nuggets plate', price: 70, category: 'Plats', image: '/assets/natura/Jungle RESTAURANT 5.jpeg' },

        // Tagines
        { id: 'tg1', name: language === 'ar' ? 'طاجين لحم بالبرقوق' : 'Tagine Viande Pruneaux', description: 'Beef tagine with prunes', price: 140, category: 'Tagines', image: '/assets/natura/Jungle restaurant Tajine.jpeg' },
        { id: 'tg2', name: language === 'ar' ? 'طاجين معيز' : 'Tagine Chevreaux', description: 'Goat meat tagine', price: 140, category: 'Tagines', image: '/assets/natura/Jungle RESTAURENT 4.jpeg' },
        { id: 'tg3', name: language === 'ar' ? 'طاجين دجاج بلدي بالحامض' : 'Tagine Poulet Beldi Citron', description: 'Free-range chicken with lemon', price: 135, category: 'Tagines', image: '/assets/natura/Jungle RESTAURANT 5.jpeg' },
        { id: 'tg4', name: language === 'ar' ? 'كسكس (الجمعة)' : 'Couscous (Vendredi)', description: 'Friday Special - Per Person', price: 80, category: 'Tagines', image: '/assets/natura/Jungle restau 2.jpeg' },
        { id: 'tg5', name: language === 'ar' ? 'رفيسة (الأربعاء)' : 'R\'fissa (Mercredi)', description: 'Wednesday Special - Per Person', price: 80, category: 'Tagines', image: '/assets/natura/Jungle Restaurant 3.jpeg' },

        // Sandwiches
        { id: 'sw1', name: language === 'ar' ? 'ساندويتش ديك رومي' : 'Sandwich Dinde', description: 'Accompagner de Frites', price: 50, category: 'Sandwiches', image: '/assets/natura/Jungle RESTAURANT 5.jpeg' },
        { id: 'sw2', name: language === 'ar' ? 'ساندويتش لحم مفروم' : 'Sandwich Viande Hachée', description: 'Accompagner de Frites', price: 55, category: 'Sandwiches', image: '/assets/natura/Jungle RESTAURENT 4.jpeg' },
        { id: 'sw3', name: language === 'ar' ? 'تشيز برجر' : 'Cheeseburger', description: 'Accompagner de Frites', price: 50, category: 'Sandwiches', image: '/assets/natura/Jungle restau 2.jpeg' },
        { id: 'sw4', name: language === 'ar' ? 'ناجتس' : 'Nuggets', description: 'Accompagner de Frites', price: 50, category: 'Sandwiches', image: '/assets/natura/Jungle Restaurant 3.jpeg' },

        // Pizza
        { id: 'pz1', name: language === 'ar' ? 'بيتزا لحم مفروم' : 'Pizza Viande Hachée', description: 'Minced meat', price: 70, category: 'Pizza', image: '/assets/natura/Jungle restaurant.jpeg' },
        { id: 'pz2', name: language === 'ar' ? 'بيتزا دجاج' : 'Pizza Poulet', description: 'Chicken', price: 70, category: 'Pizza', image: '/assets/natura/Jungle Restaurant 3.jpeg' },
        { id: 'pz3', name: language === 'ar' ? 'بيتزا فواكه البحر' : 'Pizza Fruit de Mer', description: 'Seafood', price: 80, category: 'Pizza', image: '/assets/natura/Jungle RESTAURENT 4.jpeg' },
        { id: 'pz4', name: language === 'ar' ? 'بيتزا تونة' : 'Pizza Thon', description: 'Tuna', price: 65, category: 'Pizza', image: '/assets/natura/Jungle RESTAURANT 5.jpeg' },
        { id: 'pz5', name: language === 'ar' ? 'بيتزا ٤ أجبان' : 'Pizza 4 Fromages', description: 'Four Cheeses', price: 65, category: 'Pizza', image: '/assets/natura/Jungle restaurant Tajine.jpeg' },

        // Suppléments
        { id: 'sp1', name: language === 'ar' ? 'مسمن' : 'M\'semen', description: 'Moroccan pancake', price: 6, category: 'Suppléments', image: '/assets/natura/Jungle restau 2.jpeg' },
        { id: 'sp2', name: language === 'ar' ? 'حرشة' : 'Harcha', description: 'Semolina bread', price: 6, category: 'Suppléments', image: '/assets/natura/Jungle Restaurant 3.jpeg' },
        { id: 'sp3', name: language === 'ar' ? 'كرواسون' : 'Croissant', description: 'Butter croissant', price: 5, category: 'Suppléments', image: '/assets/natura/Jungle RESTAURENT 4.jpeg' },
        { id: 'sp4', name: language === 'ar' ? 'أومليت' : 'Omelette', description: 'Eggs', price: 15, category: 'Suppléments', image: '/assets/natura/Jungle restaurant.jpeg' },
        { id: 'sp5', name: language === 'ar' ? 'جبن' : 'Fromage', description: 'Cheese portion', price: 5, category: 'Suppléments', image: '/assets/natura/Jungle RESTAURANT 5.jpeg' },

        // Jus
        { id: 'js1', name: language === 'ar' ? 'عصير برتقال' : 'Jus d\'Orange', description: 'Freshly squeezed', price: 20, category: 'Jus', image: '/assets/natura/Jungle restaurant Tajine.jpeg' },

        // Desserts
        { id: 'ds1', name: language === 'ar' ? 'سلطة فواكه' : 'Salade de Fruits', description: 'Fresh seasonal fruits', price: 30, category: 'Desserts', image: '/assets/natura/Jungle restaurant.jpeg' },
        { id: 'ds2', name: language === 'ar' ? 'حلوى مغربية' : 'Gâteau Marocain', description: 'Traditional sweet', price: 40, category: 'Desserts', image: '/assets/natura/Jungle restau 2.jpeg' },

        // H'rira
        { id: 'hr1', name: language === 'ar' ? 'حريرة + بيض + تمر' : 'H\'rira + Oeuf + Dattes', description: 'Soup set', price: 30, category: 'H\'rira', image: '/assets/natura/Jungle Restaurant 3.jpeg' },

        // Boissons
        { id: 'bs1', name: language === 'ar' ? 'صودا' : 'Soda', description: 'Fresh drink', price: 15, category: 'Boissons', image: '/assets/natura/Jungle RESTAURANT 5.jpeg' },
        { id: 'bs2', name: language === 'ar' ? 'ماء معدني (صغير)' : 'Eau Minérale (P)', description: 'Small Water', price: 12, category: 'Boissons', image: '/assets/natura/Jungle restaurant.jpeg' },
        { id: 'bs3', name: language === 'ar' ? 'ماء معدني (كبير)' : 'Eau Minérale (G)', description: 'Large Water', price: 16, category: 'Boissons', image: '/assets/natura/Jungle Restaurant 3.jpeg' },
        { id: 'bs4', name: language === 'ar' ? 'ماء فوار' : 'Eau Gazeuse', description: 'Sparkling Water', price: 17, category: 'Boissons', image: '/assets/natura/Jungle RESTAURENT 4.jpeg' },
        { id: 'bs5', name: language === 'ar' ? 'لويزة' : 'Verveine', description: 'Herbal Tea', price: 17, category: 'Boissons', image: '/assets/natura/Jungle restau 2.jpeg' },
        { id: 'bs6', name: language === 'ar' ? 'شاي مغربي (صغير)' : 'Thé Marocain (P)', description: 'Mint Tea Small', price: 15, category: 'Boissons', image: '/assets/natura/Jungle restaurant Tajine.jpeg' },
        { id: 'bs7', name: language === 'ar' ? 'شاي مغربي (كبير)' : 'Thé Marocain (G)', description: 'Mint Tea Large', price: 25, category: 'Boissons', image: '/assets/natura/Jungle RESTAURANT 5.jpeg' },

        // Café
        { id: 'cf1', name: language === 'ar' ? 'قهوة بالحليب' : 'Café au Lait', description: 'Coffee with milk', price: 17, category: 'Café', image: '/assets/natura/Jungle Restaurant 3.jpeg' },
        { id: 'cf2', name: language === 'ar' ? 'حليب بالشوكولاتة' : 'Lait au Chocolat', description: 'Chocolate milk', price: 17, category: 'Café', image: '/assets/natura/Jungle RESTAURENT 4.jpeg' },
        { id: 'cf3', name: language === 'ar' ? 'كابتشينو' : 'Cappuccino', description: 'Foamy coffee', price: 17, category: 'Café', image: '/assets/natura/Jungle restaurant.jpeg' },
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
        { id: 'Suppléments', label: text.categories.supplements[language], icon: Utensils }, // Placeholder icon if needed
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
                                        <div className="relative aspect-[4/3] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-xl border border-white/10 group-hover:shadow-luxury-gold/20 transition-all duration-700">
                                            <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1)" alt={item.name} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                            <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6">
                                                <span className="px-4 py-2 lg:px-6 lg:py-3 bg-luxury-gold text-jungle-deep font-bold rounded-xl lg:rounded-2xl shadow-xl text-xs lg:text-base">
                                                    {item.price} MAD
                                                </span>
                                            </div>
                                        </div>

                                        <div className="px-2 lg:px-4">
                                            <div className="flex justify-between items-baseline mb-2 lg:mb-4">
                                                <h3 className="text-xl lg:text-3xl font-serif text-jungle-deep dark:text-white group-hover:text-luxury-gold transition-colors">{item.name}</h3>
                                            </div>

                                            <div className="mb-4 lg:mb-8 min-h-[3rem]">
                                                {['Petit Déjeuner', 'Salades', 'Tagines', 'Plats', 'Pizza'].includes(item.category) && (
                                                    <p className="text-[8px] lg:text-[10px] uppercase tracking-[0.2em] text-luxury-gold font-bold mb-1 opacity-80">{text.ingredients[language]}</p>
                                                )}
                                                <p className="text-xs lg:text-sm font-serif leading-relaxed text-jungle-deep/60 dark:text-pure-nature/60 italic">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
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
