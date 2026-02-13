import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    Plus,
    Minus,
    ShoppingCart,
    Utensils,
    Flame,
    Pizza,
    CupSoda,
    ShoppingBag,
    Coffee,
    Leaf,
    GlassWater,
    Cookie,
    Baby
} from 'lucide-react';
import { useState } from 'react';

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'Petit Déjeuner' | 'Salades' | 'Tagines' | 'Plats' | 'Sandwiches' | 'Pizza' | 'Boissons' | 'Jus' | 'Desserts' | 'Menu Enfants' | 'Suppléments';
    image: string;
}

export interface CartItem extends MenuItem {
    quantity: number;
}

interface DigitalMenuProps {
    onBack: () => void;
    onOrderPlaced: (cart: CartItem[], total: number) => void;
    isRTL?: boolean;
    language: 'en' | 'fr' | 'ar';
}

export const DigitalMenu = ({ onBack, onOrderPlaced, isRTL = false, language }: DigitalMenuProps) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('Petit Déjeuner');

    const menuItems: MenuItem[] = [
        // Petit Déjeuner
        { id: 'pt1', name: language === 'ar' ? 'فطور كونتيننتال' : 'Continental', description: 'Orange juice, pastries, baker\'s basket, jam, honey, butter, coffee or tea.', price: 40, category: 'Petit Déjeuner', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=90&w=800' },
        { id: 'pt2', name: language === 'ar' ? 'فطور غيورماند' : 'Gourmand', description: 'Orange juice, pastries, msemmen, cheese omelette, baker\'s basket, jam, butter, coffee or tea.', price: 60, category: 'Petit Déjeuner', image: 'https://images.unsplash.com/photo-1496042399014-97ef44e37608?q=90&w=800' },
        { id: 'pt3', name: language === 'ar' ? 'فطور تقليدي' : 'Traditionnel', description: 'Orange juice, msemmen, harcha, baker\'s basket, olives, amlou, jben, honey, olive oil, coffee or tea.', price: 50, category: 'Petit Déjeuner', image: 'https://images.unsplash.com/photo-1549466699-db3730302b4e?q=90&w=800' },
        { id: 'pt4', name: language === 'ar' ? 'فطور مغربي' : 'Marocain', description: 'Orange juice, msemmen, eggs with khlii, baker\'s basket, coffee or tea.', price: 55, category: 'Petit Déjeuner', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=90&w=800' },

        // Salades
        { id: 'sl1', name: language === 'ar' ? 'سلطة مغربية' : 'Salade Marocaine', description: 'Fresh tomatoes, crisp cucumbers, fine onions, and fresh parsley with olive oil.', price: 30, category: 'Salades', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=90&w=800' },
        { id: 'sl2', name: language === 'ar' ? 'سلطة نيسواز' : 'Salade Nicoise', description: 'Tuna, hard-boiled eggs, green beans, and potatoes on a bed of fresh greens.', price: 40, category: 'Salades', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=90&w=800' },
        { id: 'sl3', name: language === 'ar' ? 'سلطة مكسيكية' : 'Salade Mexicaine', description: 'Corn, beans, avocado, and spicy chicken with a zesty lime dressing.', price: 40, category: 'Salades', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=90&w=800' },
        { id: 'sl4', name: language === 'ar' ? 'سلطة بيشور' : 'Salade Pêcheur', description: 'Sautéed shrimp, calamari, and white fish over a fresh garden medley.', price: 60, category: 'Salades', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=90&w=800' },
        { id: 'sl5', name: language === 'ar' ? 'سلطة نطورا جانغل' : 'Salade Natura Jungle', description: 'Signature house blend with wild herbs, goat cheese, and roasted nuts.', price: 50, category: 'Salades', image: 'https://images.unsplash.com/photo-1505253716362-afaba1d32ba7?q=90&w=800' },

        // Tagines
        { id: 'tg1', name: language === 'ar' ? 'طاجين لحم بالبرقوق' : 'Tagine Viande Pruneaux', description: 'Premium lamb, sweet prunes, toasted almonds, and organic honey.', price: 135, category: 'Tagines', image: 'https://images.unsplash.com/photo-1541518763669-279f00ed51ca?q=90&w=800' },
        { id: 'tg2', name: language === 'ar' ? 'طاجين دجاج بلدي' : 'Tagine Poulet Beldi', description: 'Free-range chicken, preserved lemons, red olives, and traditional spices.', price: 135, category: 'Tagines', image: 'https://images.unsplash.com/photo-1647619124290-00fb73663001?q=90&w=800' },
        { id: 'tg3', name: language === 'ar' ? 'طاجين السمان' : 'Tagine de Cailles', description: 'Delicate quails slow-cooked with caramelized onions and raisins.', price: 135, category: 'Tagines', image: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30e5a?q=90&w=800' },
        { id: 'tg4', name: language === 'ar' ? 'طاجين خضار' : 'Tagine Legumes', description: 'Market-fresh seasonal vegetables, organic herbs, and cold-pressed olive oil.', price: 115, category: 'Tagines', image: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=90&w=800' },
        { id: 'tg5', name: language === 'ar' ? 'طاجين لحم مفروم' : 'Tagine Viande Hachée', description: 'Kefta meatballs in zesty tomato sauce with organic farmhouse eggs.', price: 125, category: 'Tagines', image: 'https://images.unsplash.com/photo-1662116212108-99933f2da71c?q=90&w=800' },
        { id: 'tg6', name: language === 'ar' ? 'طاجين معيز' : 'Tagine Chevreaux', description: 'Tender baby goat, mountain herbs, and local garden vegetables.', price: 135, category: 'Tagines', image: 'https://images.unsplash.com/photo-1541518763669-279f00ed51ca?q=90&w=800' },

        // Plats
        { id: 'pl1', name: language === 'ar' ? 'صحن لحم مفروم' : 'Plat Viande Hachée', description: 'Grilled kefta served with golden fries, crisp garden salad, and house dip.', price: 80, category: 'Plats', image: 'https://images.unsplash.com/photo-1529692236671-f1f6e9460272?q=90&w=800' },
        { id: 'pl2', name: language === 'ar' ? 'صحن بروشيت مشكل' : 'Plat Brochettes Mixte', description: 'A variety of lamb and beef skewers served with fries and salad.', price: 85, category: 'Plats', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=90&w=800' },
        { id: 'pl3', name: language === 'ar' ? 'صحن بروشيت دجاج' : 'Plat Brochettes de Poulet', description: 'Marinated chicken breast skewers with fries and a fresh side.', price: 75, category: 'Plats', image: 'https://images.unsplash.com/photo-1598514983318-296258af4b51?q=90&w=800' },
        { id: 'pl4', name: language === 'ar' ? 'صحن ريش لحم' : 'Plat Côtelettes d\'Agneau', description: 'Tender lamb chops grilled with rosemary and served with garden sides.', price: 85, category: 'Plats', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=90&w=800' },
        { id: 'pl5', name: language === 'ar' ? 'صحن صوصيص' : 'Plat Saucisse', description: 'Traditional beef sausages served with crispy fries and salad.', price: 85, category: 'Plats', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=90&w=800' },
        { id: 'pl6', name: language === 'ar' ? 'صحن مشكل' : 'Plat Mixte', description: 'The ultimate grill plate with skewers, kefta, and chops.', price: 85, category: 'Plats', image: 'https://images.unsplash.com/photo-1544124499-58b122dd8338?q=90&w=800' },
        { id: 'pl7', name: language === 'ar' ? 'صحن ناجتس' : 'Plat Nugets', description: 'Golden chicken nuggets with fries, a family favorite.', price: 70, category: 'Plats', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=90&w=800' },

        // Sandwiches
        { id: 'sw1', name: language === 'ar' ? 'ساندويتش لحم مفروم' : 'Sandwich Viande Hachée', description: 'Toasted baguette with kefta, fresh veggies, and golden fries.', price: 50, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1509722747041-619f38175631?q=90&w=800' },
        { id: 'sw2', name: language === 'ar' ? 'ساندويتش ديك رومي' : 'Sandwich Dinde', description: 'Smoked turkey slices with light mayo and crisp lettuce with fries.', price: 45, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?q=90&w=800' },
        { id: 'sw3', name: language === 'ar' ? 'ساندويتش مشكل' : 'Sandwich Mixte', description: 'A hearty blend of turkey and beef in a toasted bun with fries.', price: 50, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1502035618526-642f1f5b9049?q=90&w=800' },
        { id: 'sw4', name: language === 'ar' ? 'هامبرغر' : 'Hamburger', description: 'Classic beef patty with fresh toppings and a side of fries.', price: 45, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=90&w=800' },
        { id: 'sw5', name: language === 'ar' ? 'تشيز برجر' : 'Cheeseburger', description: 'Golden melted cheese over a juicy beef patty with fries.', price: 50, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=90&w=800' },

        // Pizza
        { id: 'pz1', name: language === 'ar' ? 'بيتزا لحم مفروم' : 'Pizza Viande Hachée', description: 'Stone-baked dough with herb tomato sauce and seasoned kefta.', price: 70, category: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=90&w=800' },
        { id: 'pz2', name: language === 'ar' ? 'بيتزا دجاج' : 'Pizza Poulet', description: 'Roasted chicken strips with mozzarella and garden oregano.', price: 70, category: 'Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=90&w=800' },
        { id: 'pz3', name: language === 'ar' ? 'بيتزا فواكه البحر' : 'Pizza Fruit de Mer', description: 'Atlantic seafood medley with secret chef white sauce.', price: 80, category: 'Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?q=90&w=800' },
        { id: 'pz4', name: language === 'ar' ? 'بيتزا تونة' : 'Pizza Thon', description: 'Mediterranean tuna flakes with black olives and onions.', price: 65, category: 'Pizza', image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=90&w=800' },
        { id: 'pz5', name: language === 'ar' ? 'بيتزا ٤ أجبان' : 'Pizza 4 Fromages', description: 'A harmony of Mozzarella, Gorgonzola, Edam, and local goat cheese.', price: 65, category: 'Pizza', image: 'https://images.unsplash.com/photo-1573821663912-56990544c382?q=90&w=800' },

        // Boissons
        { id: 'bs1', name: language === 'ar' ? 'صودا' : 'Soda', description: 'Various flavors', price: 15, category: 'Boissons', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400' },
        { id: 'bs2', name: language === 'ar' ? 'ماء معدني' : 'Eau Minérale (P)', description: 'Still water small', price: 12, category: 'Boissons', image: 'https://images.unsplash.com/photo-1523362628242-f513a005271d?q=80&w=400' },
        { id: 'bs3', name: language === 'ar' ? 'ماء فوار' : 'Eau Gazeuse', description: 'Sparkling water', price: 17, category: 'Boissons', image: 'https://images.unsplash.com/photo-1523362628242-f513a005271d?q=80&w=400' },
        { id: 'bs4', name: language === 'ar' ? 'لويزة' : 'Verveine', description: 'Herbal tea', price: 17, category: 'Boissons', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400' },
        { id: 'bs5', name: language === 'ar' ? 'شاي مغربي' : 'Thé Marocain (P)', description: 'Traditional mint tea', price: 15, category: 'Boissons', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400' },
        { id: 'bs6', name: language === 'ar' ? 'قهوة' : 'Café', description: 'Black coffee', price: 17, category: 'Boissons', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=400' },
        { id: 'bs7', name: language === 'ar' ? 'قهوة بالحليب' : 'Café au Lait', description: 'Coffee with milk', price: 17, category: 'Boissons', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=400' },
        { id: 'bs8', name: language === 'ar' ? 'حليب بالشوكولاتة' : 'Lait au Chocolat', description: 'Hot chocolate milk', price: 17, category: 'Boissons', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=400' },
        { id: 'bs9', name: language === 'ar' ? 'كابتشينو' : 'Cappuccino', description: 'Frothy coffee', price: 17, category: 'Boissons', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=400' },

        // Jus
        { id: 'js1', name: language === 'ar' ? 'نكتار برتقال' : 'Nectars Jus d\'Orange', description: 'Freshly squeezed sun-ripened oranges.', price: 15, category: 'Jus', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=90&w=800' },
        { id: 'js2', name: language === 'ar' ? 'عصير فواكه حمراء' : 'Jus de Fruits Rouge', description: 'Antioxidant-rich blend of summer berries.', price: 17, category: 'Jus', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=90&w=800' },
        { id: 'js3', name: language === 'ar' ? 'عصير تفاح' : 'Jus de Pomme', description: 'Crisp, refreshing cold-pressed apples.', price: 17, category: 'Jus', image: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?q=90&w=800' },
        { id: 'js4', name: language === 'ar' ? 'عصير مانجو' : 'Jus de Mangue', description: 'Smooth, tropical alphanso mango nectar.', price: 17, category: 'Jus', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=90&w=800' },
        { id: 'js5', name: language === 'ar' ? 'عصير أناناس' : 'Jus de Ananas', description: 'Tangy and sweet golden pineapple juice.', price: 17, category: 'Jus', image: 'https://images.unsplash.com/photo-1600266185084-37a9a675f294?q=90&w=800' },
        { id: 'js6', name: language === 'ar' ? 'عصير فواكه استوائية' : 'Jus Exotique', description: 'A vibrant medley of exotic island fruits.', price: 17, category: 'Jus', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=90&w=800' },

        // Desserts
        { id: 'ds1', name: language === 'ar' ? 'سلطة فواكه' : 'Salade de Fruits', description: 'Assorted seasonal fruits carved fresh and served in its own juice.', price: 30, category: 'Desserts', image: 'https://images.unsplash.com/photo-1490474418144-942824f2b931?q=90&w=800' },
        { id: 'ds2', name: language === 'ar' ? 'فلان' : 'Flan', description: 'Silky smooth caramel custard with a light burnt sugar top.', price: 25, category: 'Desserts', image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?q=90&w=800' },

        // Menu Enfants
        { id: 'me1', name: language === 'ar' ? 'للأطفال' : 'Menu Enfants', description: 'Choice of golden nuggets or a mini burger with a side of small fries.', price: 40, category: 'Menu Enfants', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?q=90&w=800' },

        // Suppléments
        { id: 'sp1', name: language === 'ar' ? 'مسمن' : 'Msemen', description: 'Extra unit', price: 5, category: 'Suppléments', image: 'https://images.unsplash.com/photo-1589113110374-279262e3d30b?q=80&w=400' },
        { id: 'sp2', name: language === 'ar' ? 'حرشة' : 'Harcha', description: 'Extra unit', price: 5, category: 'Suppléments', image: 'https://images.unsplash.com/photo-1589113110374-279262e3d30b?q=80&w=400' },
        { id: 'sp3', name: language === 'ar' ? 'كرواسون' : 'Croissant', description: 'Extra unit', price: 5, category: 'Suppléments', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400' },
        { id: 'sp4', name: language === 'ar' ? 'أومليت' : 'Omelette', description: 'Extra unit', price: 15, category: 'Suppléments', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=400' },
        { id: 'sp5', name: language === 'ar' ? 'جبن' : 'Fromage', description: 'Extra serving', price: 5, category: 'Suppléments', image: 'https://images.unsplash.com/photo-1485962391942-d698143973b1?q=80&w=400' },

    ];

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: string) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === itemId);
            if (existing && existing.quantity > 1) {
                return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
            }
            return prev.filter(i => i.id !== itemId);
        });
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const categories = [
        { id: 'Petit Déjeuner', icon: Coffee, label: language === 'ar' ? 'فطور' : 'Petit Déjeuner' },
        { id: 'Salades', icon: Leaf, label: language === 'ar' ? 'سلطات' : 'Salades' },
        { id: 'Tagines', icon: Flame, label: language === 'ar' ? 'طواجن' : 'Tagines' },
        { id: 'Plats', icon: Utensils, label: language === 'ar' ? 'أطباق' : 'Plats' },
        { id: 'Sandwiches', icon: ShoppingBag, label: language === 'ar' ? 'ساندويتش' : 'Sandwiches' },
        { id: 'Pizza', icon: Pizza, label: language === 'ar' ? 'بيتزا' : 'Pizza' },
        { id: 'Boissons', icon: CupSoda, label: language === 'ar' ? 'مشروبات' : 'Boissons' },
        { id: 'Jus', icon: GlassWater, label: language === 'ar' ? 'عصائر' : 'Jus' },
        { id: 'Desserts', icon: Cookie, label: language === 'ar' ? 'حلويات' : 'Desserts' },
        { id: 'Menu Enfants', icon: Baby, label: language === 'ar' ? 'للأطفال' : 'Enfants' },
        { id: 'Suppléments', icon: Plus, label: language === 'ar' ? 'إضافات' : 'Extras' },
    ];

    const filteredItems = menuItems.filter(item => item.category === activeCategory);

    return (
        <div className={`min-h-screen ${isRTL ? 'text-right' : 'text-left'} bg-inherit text-inherit max-w-7xl mx-auto`} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <header className="px-6 lg:px-12 py-10 flex justify-between items-center glass-pure-nature dark:glass-jungle-deep border-b border-luxury-gold/10 sticky top-0 z-50">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onBack}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/10"
                >
                    <ChevronLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.button>
                <div className="text-center">
                    <h1 className="text-2xl font-serif font-bold tracking-widest uppercase text-luxury-gold">
                        {language === 'ar' ? 'قائمة الطلبات' : 'Digital Menu'}
                    </h1>
                </div>
                <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-luxury-gold text-jungle-deep flex items-center justify-center shadow-lg gold-shadow">
                        <ShoppingCart className="w-6 h-6" />
                    </div>
                    {cartCount > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-jungle-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                        >
                            {cartCount}
                        </motion.span>
                    )}
                </div>
            </header>

            <main className="pb-40">
                {/* Category Picker */}
                <div className="flex gap-4 overflow-x-auto lg:flex-wrap px-6 lg:px-12 py-6 no-scrollbar">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <motion.button
                                key={cat.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(cat.id as any)}
                                className={`flex-none px-6 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 border ${isActive
                                    ? 'bg-luxury-gold text-jungle-deep border-luxury-gold shadow-xl shadow-luxury-gold/20'
                                    : 'bg-jungle-leaf/5 dark:bg-white/5 text-jungle-deep/60 dark:text-pure-nature/40 border-jungle-leaf/10 dark:border-white/10'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-jungle-deep' : 'text-luxury-gold'}`} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{cat.label}</span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Items Grid */}
                <div className="px-6 lg:px-12 space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredItems.map((item) => {
                                const cartItem = cart.find(i => i.id === item.id);
                                return (
                                    <div key={item.id} className="jungle-card p-5 flex gap-5 bg-pure-nature dark:bg-jungle-leaf/5 rounded-[2rem] border border-luxury-gold/5 group hover:border-luxury-gold/20 transition-all">
                                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden flex-none shadow-premium bg-luxury-gold/5">
                                            <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.name} loading="lazy" />
                                        </div>
                                        <div className="flex-1 min-w-0 py-1">
                                            <div className="flex justify-between items-start gap-2 mb-2">
                                                <h3 className="text-lg lg:text-xl font-serif text-jungle-deep dark:text-pure-nature leading-tight">{item.name}</h3>
                                                <span className="text-luxury-gold font-bold text-base lg:text-lg whitespace-nowrap">{item.price} MAD</span>
                                            </div>
                                            <p className="text-[10px] lg:text-xs text-jungle-deep/50 dark:text-pure-nature/40 mb-4 line-clamp-3 lg:line-clamp-2 leading-relaxed">{item.description}</p>

                                            <div className="flex justify-end">
                                                {cartItem ? (
                                                    <div className="flex items-center gap-4 bg-sand-gold/10 rounded-xl p-1">
                                                        <motion.button
                                                            whileTap={{ scale: 0.8 }}
                                                            onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-pure-nature dark:bg-jungle-deep text-luxury-gold shadow-sm border border-luxury-gold/10"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </motion.button>
                                                        <span className="text-sm font-bold w-6 text-center text-jungle-deep dark:text-luxury-gold">{cartItem.quantity}</span>
                                                        <motion.button
                                                            whileTap={{ scale: 0.8 }}
                                                            onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-luxury-gold text-jungle-deep shadow-lg gold-shadow"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </motion.button>
                                                    </div>
                                                ) : (
                                                    <motion.button
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => addToCart(item)}
                                                        className="px-6 py-2.5 bg-jungle-deep dark:bg-luxury-gold text-luxury-gold dark:text-jungle-deep rounded-xl text-[10px] font-bold uppercase tracking-widest border border-luxury-gold/20 shadow-md active:scale-95 transition-all"
                                                    >
                                                        {language === 'ar' ? 'إضافة' : 'Add to Cart'}
                                                    </motion.button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Cart Float */}
            <AnimatePresence>
                {cartCount > 0 && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 right-0 p-6 z-[60]"
                    >
                        <div className="bg-jungle-deep border border-luxury-gold/30 rounded-[3rem] p-8 shadow-2xl gold-shadow flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                                    <ShoppingBag className="w-7 h-7" />
                                </div>
                                <div className="text-pure-nature">
                                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold mb-1">{cartCount} {language === 'ar' ? 'عناصر' : 'Items'}</p>
                                    <p className="text-3xl font-serif text-luxury-gold">{cartTotal} MAD</p>
                                </div>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onOrderPlaced(cart, cartTotal)}
                                className="bg-luxury-gold text-jungle-deep px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl gold-shadow active:scale-105 transition-transform"
                            >
                                {language === 'ar' ? 'ادفع الآن' : 'Pay Now'}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
