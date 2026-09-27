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
    Soup,
    Drumstick
} from 'lucide-react';
import { useState } from 'react';

export interface MenuItem {
    id: string;
    name: { en: string; fr: string; ar: string };
    description?: { en: string; fr: string; ar: string };
    price: number;
    category: 'Petit Déjeuner' | 'Salades' | 'Tagines' | 'Traditionnel' | 'Plats' | 'Poulet Rôti' | 'Sandwiches' | 'Pizza' | 'Jus' | 'Boissons' | 'Desserts' | 'Suppléments';
}

interface DigitalMenuProps {
    onBack: () => void;
    isRTL?: boolean;
    language: 'en' | 'fr' | 'ar';
}

export const DigitalMenu = ({ onBack, isRTL = false, language }: DigitalMenuProps) => {
    const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('Petit Déjeuner');

    const menuItems: MenuItem[] = [
        // ================= PETIT DÉJEUNER =================
        {
            id: 'pt_exp',
            name: { en: 'Express Breakfast', fr: 'Petit Déjeuner Express', ar: 'فطور إكسبريس' },
            description: {
                en: 'Hot drink, orange juice, pastry, bread, butter, olives, hsouwa.',
                fr: 'Boisson chaude, jus d\'orange, viennoiserie, pain, beurre, olives, hsouwa.',
                ar: 'مشروب ساخن، عصير برتقال، مخبوزات، خبز، زبدة، زيتون، حسوة.'
            },
            price: 45,
            category: 'Petit Déjeuner',
        },
        {
            id: 'pt_mar',
            name: { en: 'Moroccan Breakfast', fr: 'Petit Déjeuner Marocain', ar: 'فطور مغربي' },
            description: {
                en: 'Hot drink, orange juice, msemen, harcha, eggs with khlii, olives, butter, hsouwa.',
                fr: 'Boisson chaude, jus d\'orange, mesmen, Harcha, œufs au khli, olives, Beurre, hsouwa.',
                ar: 'مشروب ساخن، عصير برتقال، مسمن، حرشة، بيض بالخليع، زيتون، زبدة، حسوة.'
            },
            price: 55,
            category: 'Petit Déjeuner',
        },
        {
            id: 'pt_gour',
            name: { en: 'Gourmand Breakfast', fr: 'Petit Déjeuner Gourmand', ar: 'فطور غورماند' },
            description: {
                en: 'Hot drink, orange juice, omelette of choice, msemen, harcha, pastries, cheese, jam, butter, olives, hsouwa.',
                fr: 'Boisson chaude, jus d\'orange, omelette au choix, Msemen, Harcha, Viennoiseries, fromage, confiture, beurre, olives, hsouwa.',
                ar: 'مشروب ساخن، عصير برتقال، أومليت حسب الاختيار، مسمن، حرشة، مخبوزات، جبن، مربى، زبدة، زيتون، حسوة.'
            },
            price: 60,
            category: 'Petit Déjeuner',
        },

        // ================= SALADES =================
        {
            id: 'sl_mar',
            name: { en: 'Moroccan Salad', fr: 'Salade Marocaine', ar: 'سلطة مغربية' },
            description: { en: 'Fresh traditional Moroccan salad', fr: 'Salade marocaine fraîche traditionnelle', ar: 'سلطة مغربية تقليدية طازجة' },
            price: 30,
            category: 'Salades'
        },
        {
            id: 'sl_nic',
            name: { en: 'Niçoise Salad', fr: 'Salade Niçoise', ar: 'سلطة نيسواز' },
            description: { en: 'Tuna, seasonal vegetables, eggs, olives', fr: 'Thon, légumes de saison, œufs, olives', ar: 'تونة، خضار موسمية، بيض، زيتون' },
            price: 40,
            category: 'Salades'
        },
        {
            id: 'sl_nat',
            name: { en: 'Natura Salad', fr: 'Salade Natura', ar: 'سلطة ناتورا' },
            description: { en: 'House signature chef salad', fr: 'Salade signature du chef', ar: 'سلطة الشيف الخاصة' },
            price: 50,
            category: 'Salades'
        },
        {
            id: 'sl_poke',
            name: { en: 'Poke Bowl', fr: 'Poke Bowl', ar: 'بوكي بول' },
            description: { en: 'Fresh bowl of proteins, fresh vegetables and grains', fr: 'Bol gourmand et équilibré aux ingrédients frais', ar: 'طبق بوكي صحي ومتوازن بمكونات طازجة' },
            price: 60,
            category: 'Salades'
        },

        // ================= TAGINES =================
        {
            id: 'tg_prun',
            name: { en: 'Beef Tagine with Prunes (½ kg)', fr: 'Tagine Viande Pruneaux ½ kg', ar: 'طاجين لحم بالبرقوق ½ كغ' },
            description: { en: 'Tender beef with caramelized prunes and roasted almonds', fr: 'Viande mijotée aux pruneaux caramélisés et amandes', ar: 'لحم طري بالبرقوق المعسل واللوز' },
            price: 140,
            category: 'Tagines'
        },
        {
            id: 'tg_vh',
            name: { en: 'Minced Meat Tagine (½ kg)', fr: 'Tagine Viande Hachée ½ kg', ar: 'طاجين كفتة ½ كغ' },
            description: { en: 'Spiced minced beef balls in rich tomato sauce', fr: 'Boulettes de viande hachée dans une sauce tomate parfumée', ar: 'كرات كفتة في صلصة طماطم متبلة' },
            price: 120,
            category: 'Tagines'
        },
        {
            id: 'tg_leg_viande',
            name: { en: 'Beef & Vegetables Tagine', fr: 'Tagine Légume Viande', ar: 'طاجين لحم بالخضر' },
            description: { en: 'Slow cooked beef with fresh seasonal garden vegetables', fr: 'Viande savoureuse mijotée aux légumes frais', ar: 'لحم شهي مطهو مع خضار طازجة' },
            price: 135,
            category: 'Tagines'
        },
        {
            id: 'tg_leg_poulet',
            name: { en: 'Beldi Chicken & Veggies Tagine', fr: 'Tagine Légume Poulet Beldi', ar: 'طاجين دجاج بلدي بالخضر' },
            description: { en: 'Free-range chicken with aromatic garden vegetables', fr: 'Poulet fermier beldi aux légumes du jardin', ar: 'دجاج بلدي مع خضار الحديقة العطرية' },
            price: 130,
            category: 'Tagines'
        },

        // ================= TRADITIONNEL =================
        {
            id: 'tr_couscous',
            name: { en: 'Couscous 1P (Friday)', fr: 'Couscous 1P (Vendredi)', ar: 'كسكس فردي (الجمعة)' },
            description: { en: 'Friday Special - Traditional Moroccan couscous with 7 vegetables', fr: 'Spécial Vendredi - Couscous traditionnel aux sept légumes', ar: 'طبق الجمعة الخاص - كسكس مغربي تقليدي بسبع خضار' },
            price: 70,
            category: 'Traditionnel'
        },
        {
            id: 'tr_rfissa',
            name: { en: 'Rfissa 1P (Wednesday)', fr: 'Rfissa 1P (Mercredi)', ar: 'رفيسة فردية (الأربعاء)' },
            description: { en: 'Wednesday Special - Authentic Moroccan Rfissa with lentils & spices', fr: 'Spécial Mercredi - Rfissa traditionnelle marocaine aux épices', ar: 'طبق الأربعاء الخاص - رفيسة مغربية أصيلة بالأعشاب' },
            price: 70,
            category: 'Traditionnel'
        },
        {
            id: 'tr_hrira',
            name: { en: 'Hrira + Dates + Egg', fr: 'Hrira + Dattes + Œuf', ar: 'حريرة + تمر + بيض' },
            description: { en: 'Classic Moroccan soup served with dates and boiled egg', fr: 'Soupe marocaine traditionnelle servie avec dattes et œuf', ar: 'شوربة حريرة مغربية تقليدية مع تمر وبيض' },
            price: 30,
            category: 'Traditionnel'
        },

        // ================= PLATS (AVEC FRITES ET LÉGUMES) =================
        {
            id: 'pl_vh',
            name: { en: 'Minced Meat Skewers', fr: 'Brochettes V.H', ar: 'بروشيت كفتة' },
            description: { en: 'Grilled minced beef skewers served with fries and sautéed vegetables', fr: 'Brochettes de viande hachée avec frites et légumes', ar: 'أسياخ كفتة مشوية تقدم مع البطاطس والخضر' },
            price: 80,
            category: 'Plats'
        },
        {
            id: 'pl_dind',
            name: { en: 'Turkey Skewers', fr: 'Brochettes Dinde', ar: 'بروشيت بيبي (ديك رومي)' },
            description: { en: 'Marinated turkey skewers served with fries and vegetables', fr: 'Brochettes de dinde marinée avec frites et légumes', ar: 'أسياخ لحم الديك الرومي مع البطاطس والخضر' },
            price: 70,
            category: 'Plats'
        },
        {
            id: 'pl_viande',
            name: { en: 'Beef Meat Skewers', fr: 'Brochettes Viande', ar: 'بروشيت لحم' },
            description: { en: 'Tender beef cubes grilled to perfection with fries and vegetables', fr: 'Morceaux de bœuf grillés avec frites et légumes', ar: 'أسياخ لحم بقري مشوي مع البطاطس والخضر' },
            price: 85,
            category: 'Plats'
        },
        {
            id: 'pl_mixte',
            name: { en: 'Mixed Skewers', fr: 'Brochettes Mixte', ar: 'بروشيت مشكل' },
            description: { en: 'Assortment of grilled skewers with fries and vegetables', fr: 'Assortiment de brochettes grillées avec frites et légumes', ar: 'تشكيلة أسياخ مشوية متنوعة مع البطاطس والخضر' },
            price: 80,
            category: 'Plats'
        },
        {
            id: 'pl_nugget',
            name: { en: 'Nuggets Plate', fr: 'Plat Nuggets', ar: 'صحن ناجتس' },
            description: { en: 'Crispy chicken nuggets served with golden fries and vegetables', fr: 'Nuggets croustillants avec frites et légumes', ar: 'قطع ناجتس مقرمشة مع البطاطس والخضر' },
            price: 70,
            category: 'Plats'
        },

        // ================= POULET RÔTI (AVEC FRITES ET RIZ) =================
        {
            id: 'pr_quart',
            name: { en: '¼ Roasted Chicken', fr: '¼ Poulet Rôti', ar: '¼ دجاج محمر' },
            description: { en: 'Quarter rotisserie roasted chicken served with fries and rice', fr: 'Un quart de poulet doré au four avec frites et riz', ar: 'ربع دجاجة محمرة بالفرن مع بطاطس وأرز' },
            price: 65,
            category: 'Poulet Rôti'
        },
        {
            id: 'pr_demi',
            name: { en: '½ Roasted Chicken', fr: '½ Poulet Rôti', ar: '½ دجاج محمر' },
            description: { en: 'Half rotisserie roasted chicken served with fries and rice', fr: 'Un demi-poulet doré au four avec frites et riz', ar: 'نصف دجاجة محمرة بالفرن مع بطاطس وأرز' },
            price: 120,
            category: 'Poulet Rôti'
        },
        {
            id: 'pr_complet',
            name: { en: 'Whole Roasted Chicken', fr: 'Poulet Complet', ar: 'دجاجة كاملة محمرة' },
            description: { en: 'Whole delicious roasted chicken served with fries and rice', fr: 'Poulet entier rôti savoureux avec frites et riz', ar: 'دجاجة كاملة محمرة بخلطة خاصة مع بطاطس وأرز' },
            price: 200,
            category: 'Poulet Rôti'
        },

        // ================= SANDWICHES & BURGERS =================
        {
            id: 'sw_vh',
            name: { en: 'Minced Meat Sandwich', fr: 'Sandwich V.H (Avec Frites)', ar: 'ساندويتش كفتة (مع بطاطس)' },
            description: { en: 'Minced meat sandwich served with crispy fries', fr: 'Sandwich viande hachée avec frites', ar: 'ساندويتش كفتة مع بطاطس مقلية' },
            price: 55,
            category: 'Sandwiches'
        },
        {
            id: 'sw_dind',
            name: { en: 'Turkey Sandwich', fr: 'Sandwich Dinde (Avec Frites)', ar: 'ساندويتش بيبي (مع بطاطس)' },
            description: { en: 'Marinated turkey sandwich served with crispy fries', fr: 'Sandwich dinde avec frites', ar: 'ساندويتش ديك رومي مع بطاطس مقلية' },
            price: 50,
            category: 'Sandwiches'
        },
        {
            id: 'sw_thon',
            name: { en: 'Tuna Sandwich', fr: 'Sandwich Thon (Avec Frites)', ar: 'ساندويتش تونة (مع بطاطس)' },
            description: { en: 'Fresh tuna sandwich served with crispy fries', fr: 'Sandwich au thon avec frites', ar: 'ساندويتش تونة طازج مع بطاطس مقلية' },
            price: 45,
            category: 'Sandwiches'
        },
        {
            id: 'sw_nugget',
            name: { en: 'Nugget Sandwich', fr: 'Sandwich Nugget (Avec Frites)', ar: 'ساندويتش ناجتس (مع بطاطس)' },
            description: { en: 'Crispy nuggets sandwich served with fries', fr: 'Sandwich nuggets avec frites', ar: 'ساندويتش ناجتس مقرمش مع بطاطس مقلية' },
            price: 50,
            category: 'Sandwiches'
        },
        {
            id: 'bg_cheese',
            name: { en: 'Cheeseburger', fr: 'Cheeseburger', ar: 'تشيز برجر' },
            description: { en: 'Beef burger with melted cheese and french fries', fr: 'Burger pur bœuf avec fromage fondant et frites', ar: 'برجر لحم مع جبن ذائب وبطاطس مقلية' },
            price: 55,
            category: 'Sandwiches'
        },
        {
            id: 'bg_chicken',
            name: { en: 'Chickenburger', fr: 'Chickenburger', ar: 'تشيكن برجر' },
            description: { en: 'Crispy chicken fillet burger with fries', fr: 'Burger de poulet croustillant et frites', ar: 'برجر دجاج مقرمش مع بطاطس مقلية' },
            price: 50,
            category: 'Sandwiches'
        },
        {
            id: 'bg_double',
            name: { en: 'Double Cheese Burger', fr: 'DoubleCheese Burger', ar: 'دبل تشيز برجر' },
            description: { en: 'Double beef patty with double cheese and fries', fr: 'Double steak haché, double fromage et frites', ar: 'برجر دبل لحم وجبن مضاعف مع بطاطس' },
            price: 65,
            category: 'Sandwiches'
        },

        // ================= PIZZA =================
        {
            id: 'pz_marg',
            name: { en: 'Pizza Margarita', fr: 'Pizza Margarita', ar: 'بيتزا مارغريتا' },
            description: { en: 'Tomato sauce, mozzarella, fresh basil and oregano', fr: 'Sauce tomate, mozzarella, basilic et origan', ar: 'صلصة طماطم، موزاريلا، حبق وزعتر' },
            price: 60,
            category: 'Pizza'
        },
        {
            id: 'pz_vh',
            name: { en: 'Minced Meat Pizza', fr: 'Pizza Viande Hachée', ar: 'بيتزا كفتة' },
            description: { en: 'Tomato sauce, seasoned minced beef, mozzarella', fr: 'Sauce tomate, viande hachée assaisonnée, mozzarella', ar: 'صلصة طماطم، كفتة متبلة، موزاريلا' },
            price: 75,
            category: 'Pizza'
        },
        {
            id: 'pz_poulet',
            name: { en: 'Chicken Pizza', fr: 'Pizza Poulet', ar: 'بيتزا دجاج' },
            description: { en: 'Tender chicken slices, peppers, mushrooms, mozzarella', fr: 'Poulet grillé, poivrons, champignons, mozzarella', ar: 'قطع دجاج، فلفل، فطر، موزاريلا' },
            price: 70,
            category: 'Pizza'
        },
        {
            id: 'pz_mer',
            name: { en: 'Seafood Pizza', fr: 'Pizza Fruit de Mer', ar: 'بيتزا فواكه البحر' },
            description: { en: 'Fresh assorted seafood, garlic, mozzarella', fr: 'Fruits de mer frais, ail, mozzarella', ar: 'فواكه البحر الطازجة، ثوم، موزاريلا' },
            price: 80,
            category: 'Pizza'
        },
        {
            id: 'pz_thon',
            name: { en: 'Tuna Pizza', fr: 'Pizza Thon', ar: 'بيتزا تونة' },
            description: { en: 'Tuna, olives, onions, tomato sauce, mozzarella', fr: 'Thon, olives, oignons, sauce tomate, mozzarella', ar: 'تونة، زيتون، بصل، صلصة طماطم، موزاريلا' },
            price: 70,
            category: 'Pizza'
        },
        {
            id: 'pz_4f',
            name: { en: '4 Cheese Pizza', fr: 'Pizza 4 Fromages', ar: 'بيتزا 4 أجبان' },
            description: { en: 'Rich combination of four fine cheeses', fr: 'Mélange gourmand de quatre fromages fondants', ar: 'مزيج شهي من أربعة أنواع من الجبن' },
            price: 65,
            category: 'Pizza'
        },

        // ================= JUS & MOJITOS =================
        {
            id: 'js_orange',
            name: { en: 'Fresh Orange Juice', fr: 'Jus d\'Orange', ar: 'عصير برتقال طازج' },
            description: { en: '100% freshly pressed orange juice', fr: 'Pur jus d\'orange fraîchement pressé', ar: 'عصير برتقال طبيعي معصور' },
            price: 25,
            category: 'Jus'
        },
        {
            id: 'js_ananas',
            name: { en: 'Pineapple Juice', fr: 'Jus d\'Ananas', ar: 'عصير أناناس' },
            description: { en: 'Fresh tropical pineapple juice', fr: 'Jus frais d\'ananas tropical', ar: 'عصير أناناس استوائي منعش' },
            price: 30,
            category: 'Jus'
        },
        {
            id: 'js_mangue',
            name: { en: 'Mango Juice', fr: 'Jus de Mangue', ar: 'عصير مانجو' },
            description: { en: 'Smooth sweet mango juice', fr: 'Jus onctueux de mangue mûre', ar: 'عصير مانجو غني ولذيذ' },
            price: 30,
            category: 'Jus'
        },
        {
            id: 'js_tropical',
            name: { en: 'Tropical Juice', fr: 'Jus Tropical', ar: 'عصير استوائي' },
            description: { en: 'Exotic blend of tropical fruits', fr: 'Cocktail de fruits tropicaux exotiques', ar: 'كوكتيل فواكه استوائية منعش' },
            price: 30,
            category: 'Jus'
        },
        {
            id: 'js_mojito_classic',
            name: { en: 'Classic Virgin Mojito', fr: 'Mojito Classique', ar: 'موهيتو كلاسيك' },
            description: { en: 'Fresh mint, lime, cane sugar, sparkling soda', fr: 'Menthe fraîche, citron vert, sucre de canne, soda pétillant', ar: 'نعناع طازج، ليمون، سكر قصب، صودا فوارة' },
            price: 30,
            category: 'Jus'
        },
        {
            id: 'js_mojito_rouge',
            name: { en: 'Red Berries Mojito', fr: 'Mojito Fruit Rouge', ar: 'موهيتو توت أحمر' },
            description: { en: 'Fresh red berries, mint, lime, crushed ice & soda', fr: 'Fruits rouges sauvages, menthe, citron, soda rafraîchissant', ar: 'توت بري أحمر، نعناع، ليمون، صودا مثلجة' },
            price: 30,
            category: 'Jus'
        },

        // ================= BOISSONS & CAFÉ =================
        {
            id: 'bs_eau_p',
            name: { en: 'Mineral Water (Small)', fr: 'Eau Minérale (Petit)', ar: 'ماء معدني (صغير)' },
            description: { en: 'Small bottle of mineral water', fr: 'Petite bouteille d\'eau minérale', ar: 'قنينة ماء معدني صغيرة' },
            price: 10,
            category: 'Boissons'
        },
        {
            id: 'bs_eau_g',
            name: { en: 'Mineral Water (Large)', fr: 'Eau Minérale (Grand)', ar: 'ماء معدني (كبير)' },
            description: { en: 'Large bottle of mineral water', fr: 'Grande bouteille d\'eau minérale', ar: 'قنينة ماء معدني كبيرة' },
            price: 15,
            category: 'Boissons'
        },
        {
            id: 'bs_soda',
            name: { en: 'Soda / Soft Drink', fr: 'Soda', ar: 'مشروب غازي' },
            description: { en: 'Refreshing canned soft drink', fr: 'Boisson gazeuse fraîche au choix', ar: 'مشروب غازي منعش' },
            price: 15,
            category: 'Boissons'
        },
        {
            id: 'bs_cafe',
            name: { en: 'Espresso Coffee', fr: 'Café', ar: 'قهوة إسبريسو' },
            description: { en: 'Rich aromatic espresso', fr: 'Café expresso corsé et aromatique', ar: 'قهوة إسبريسو غنية' },
            price: 17,
            category: 'Boissons'
        },
        {
            id: 'bs_cafe_lait',
            name: { en: 'Coffee with Milk', fr: 'Café au Lait', ar: 'قهوة بالحليب' },
            description: { en: 'Classic smooth coffee with warm milk', fr: 'Café crème au lait chaud', ar: 'قهوة ناعمة بالحليب الساخن' },
            price: 19,
            category: 'Boissons'
        },
        {
            id: 'bs_cappuccino',
            name: { en: 'Cappuccino', fr: 'Cappuccino', ar: 'كابتشينو' },
            description: { en: 'Espresso with rich velvety steamed milk foam', fr: 'Expresso surmonté d\'une mousse de lait veloutée', ar: 'إسبريسو برغوة الحليب المخملية' },
            price: 19,
            category: 'Boissons'
        },
        {
            id: 'bs_chocolat',
            name: { en: 'Hot Chocolate Milk', fr: 'Lait au Chocolat', ar: 'حليب بالشوكولاتة' },
            description: { en: 'Creamy hot chocolate with fresh milk', fr: 'Chocolat chaud onctueux au lait', ar: 'حليب دافئ بالشوكولاتة اللذيذة' },
            price: 19,
            category: 'Boissons'
        },
        {
            id: 'bs_the_p',
            name: { en: 'Moroccan Mint Tea (Small)', fr: 'Thé Marocain (Petit)', ar: 'شاي مغربي (صغير)' },
            description: { en: 'Traditional Moroccan mint tea pot (Small)', fr: 'Théière traditionnelle à la menthe (Petite)', ar: 'براد شاي مغربي بالنعناع (صغير)' },
            price: 15,
            category: 'Boissons'
        },
        {
            id: 'bs_the_m',
            name: { en: 'Moroccan Mint Tea (Medium)', fr: 'Thé Marocain (Moyen)', ar: 'شاي مغربي (متوسط)' },
            description: { en: 'Traditional Moroccan mint tea pot (Medium)', fr: 'Théière traditionnelle à la menthe (Moyenne)', ar: 'براد شاي مغربي بالنعناع (متوسط)' },
            price: 20,
            category: 'Boissons'
        },

        // ================= DESSERTS =================
        {
            id: 'ds_gateau',
            name: { en: 'Moroccan Pastry Plate', fr: 'Gâteau Marocain', ar: 'حلويات مغربية' },
            description: { en: 'Authentic selection of Moroccan honey pastries', fr: 'Assortiment de gâteaux et douceurs traditionnelles marocaines', ar: 'تشكيلة حلويات مغربية أصيلة بالعسل واللوز' },
            price: 40,
            category: 'Desserts'
        },
        {
            id: 'ds_salade_fruits',
            name: { en: 'Fruit Salad', fr: 'Salade de Fruits', ar: 'سلطة فواكه' },
            description: { en: 'Bowl of diced fresh seasonal fruits', fr: 'Coupe de fruits frais de saison coupés', ar: 'كوب فواكه موسمية طازجة ومقطعة' },
            price: 25,
            category: 'Desserts'
        },
        {
            id: 'ds_assiette_fruits',
            name: { en: 'Grand Fruit Platter', fr: 'Assiette de Fruits', ar: 'طبق فواكه مشكلة' },
            description: { en: 'Generous platter of whole & sliced fresh fruits', fr: 'Grande assiette généreuse de fruits frais assortis', ar: 'صحن فاخر مشكل من الفواكه الطازجة' },
            price: 50,
            category: 'Desserts'
        },

        // ================= SUPPLÉMENTS =================
        {
            id: 'sp_msemen',
            name: { en: 'Msemen', fr: 'Msemen', ar: 'مسمن' },
            price: 5,
            category: 'Suppléments'
        },
        {
            id: 'sp_harcha',
            name: { en: 'Harcha', fr: 'Harcha', ar: 'حرشة' },
            price: 5,
            category: 'Suppléments'
        },
        {
            id: 'sp_omelette',
            name: { en: 'Omelette', fr: 'Omelette', ar: 'أومليت' },
            price: 15,
            category: 'Suppléments'
        },
        {
            id: 'sp_croissant',
            name: { en: 'Croissant', fr: 'Croissant', ar: 'كرواسون' },
            price: 5,
            category: 'Suppléments'
        },
        {
            id: 'sp_fromage',
            name: { en: 'Cheese Portion', fr: 'Fromage', ar: 'جبن' },
            price: 3,
            category: 'Suppléments'
        },
        {
            id: 'sp_amlou',
            name: { en: 'Amlou (Almond dip)', fr: 'Amlou', ar: 'أملو' },
            price: 3,
            category: 'Suppléments'
        },
        {
            id: 'sp_jben',
            name: { en: 'Jbén (Traditional fresh cheese)', fr: 'Jbén', ar: 'جبن بلدي' },
            price: 5,
            category: 'Suppléments'
        }
    ];

    const text = {
        title: { en: 'Restaurant Menu', fr: 'Carte du Restaurant', ar: 'قائمة المطعم' },
        currency: { en: 'DH', fr: 'DH', ar: 'درهم' },
        categories: {
            breakfast: { en: 'Breakfast', fr: 'Petit Déjeuner', ar: 'فطور' },
            salads: { en: 'Salads', fr: 'Salades', ar: 'سلطات' },
            tagines: { en: 'Tagines', fr: 'Tagines', ar: 'طواجن' },
            traditional: { en: 'Traditional', fr: 'Traditionnel', ar: 'أطباق تقليدية' },
            dishes: { en: 'Plates & Grills', fr: 'Plats & Brochettes', ar: 'أطباق ومشويات' },
            chicken: { en: 'Rotisserie Chicken', fr: 'Poulet Rôti', ar: 'دجاج محمر' },
            sandwiches: { en: 'Sandwiches & Burgers', fr: 'Sandwiches & Burgers', ar: 'ساندويتش وبرجر' },
            pizza: { en: 'Pizza', fr: 'Pizza', ar: 'بيتزا' },
            juice: { en: 'Juices & Mojitos', fr: 'Jus & Mojitos', ar: 'عصائر وموهيتو' },
            drinks: { en: 'Drinks & Coffee', fr: 'Boissons & Café', ar: 'مشروبات وقهوة' },
            desserts: { en: 'Desserts', fr: 'Desserts', ar: 'حلويات وفواكه' },
            supplements: { en: 'Extras', fr: 'Suppléments', ar: 'إضافات' }
        }
    };

    const categories = [
        { id: 'Petit Déjeuner', icon: Coffee, label: text.categories.breakfast[language] },
        { id: 'Salades', icon: Leaf, label: text.categories.salads[language] },
        { id: 'Tagines', icon: Flame, label: text.categories.tagines[language] },
        { id: 'Traditionnel', icon: Soup, label: text.categories.traditional[language] },
        { id: 'Plats', icon: Utensils, label: text.categories.dishes[language] },
        { id: 'Poulet Rôti', icon: Drumstick, label: text.categories.chicken[language] },
        { id: 'Sandwiches', icon: ShoppingBag, label: text.categories.sandwiches[language] },
        { id: 'Pizza', icon: Pizza, label: text.categories.pizza[language] },
        { id: 'Jus', icon: GlassWater, label: text.categories.juice[language] },
        { id: 'Boissons', icon: CupSoda, label: text.categories.drinks[language] },
        { id: 'Desserts', icon: Cookie, label: text.categories.desserts[language] },
        { id: 'Suppléments', icon: Utensils, label: text.categories.supplements[language] }
    ];

    const filteredItems = menuItems.filter(item => item.category === activeCategory);

    return (
        <div className={`min-h-screen ${isRTL ? 'text-right' : 'text-left'} bg-egg-shell dark:bg-ink-black text-jungle-green dark:text-white max-w-7xl mx-auto`} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <header className="px-4 lg:px-12 py-6 flex justify-between items-center bg-white/70 dark:bg-black/60 border-b border-sand-gold/20 sticky top-0 z-50 backdrop-blur-md">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onBack}
                    className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-2xl bg-sand-gold/10 text-sand-gold border border-sand-gold/20 hover:bg-sand-gold hover:text-jungle-deep transition-all"
                >
                    <ChevronLeft className={`w-5 h-5 lg:w-6 lg:h-6 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.button>
                <div className="text-center">
                    <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-sand-gold block">Natura Jungle</span>
                    <h1 className="text-lg lg:text-2xl font-serif font-bold tracking-widest uppercase text-jungle-deep dark:text-sand-gold">
                        {text.title[language]}
                    </h1>
                </div>
                <div className="w-10 lg:w-12" /> {/* Spacer for centering */}
            </header>

            <main className="pb-16">
                {/* Category Picker */}
                <div className="flex gap-2.5 overflow-x-auto px-4 lg:px-12 py-6 no-scrollbar scroll-smooth">
                    {categories.map((cat, idx) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <motion.button
                                key={cat.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(cat.id as MenuItem['category'])}
                                className={`flex-none px-4 py-3 lg:px-6 lg:py-4 rounded-[1.5rem] flex flex-col items-center gap-2 transition-all duration-300 border ${isActive
                                    ? 'bg-jungle-deep text-sand-gold border-sand-gold shadow-xl scale-105 z-10'
                                    : 'bg-white/70 dark:bg-white/5 text-jungle-deep/70 dark:text-white/70 border-sand-gold/10 hover:bg-white dark:hover:bg-white/10'
                                    }`}
                            >
                                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-sand-gold/20 text-sand-gold' : 'bg-sand-gold/10 text-sand-gold'}`}>
                                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                                </div>
                                <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">{cat.label}</span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Items Grid */}
                <div className="px-4 lg:px-12 mt-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.25 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
                        >
                            {filteredItems.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.04 }}
                                    className="p-5 lg:p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-sand-gold/15 hover:border-sand-gold/40 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
                                >
                                    <div className="flex justify-between items-start gap-4 mb-2">
                                        <h3 className="text-base lg:text-lg font-serif font-bold text-jungle-deep dark:text-white">
                                            {item.name[language]}
                                        </h3>
                                        <span className="text-base lg:text-xl font-bold font-serif text-sand-gold whitespace-nowrap bg-sand-gold/10 px-3 py-1 rounded-full">
                                            {item.price} {text.currency[language]}
                                        </span>
                                    </div>
                                    {item.description && (
                                        <p className="text-xs lg:text-sm text-jungle-deep/60 dark:text-white/60 font-medium leading-relaxed mt-1">
                                            {item.description[language]}
                                        </p>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};
