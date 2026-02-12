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
        { id: 'pt1', name: language === 'ar' ? 'فطور كونتيننتال' : 'Continental', description: 'Jus d\'orange, viennoiserie, corbeille de notre boulanger, confiture, miel, beurre, café au thé.', price: 40, category: 'Petit Déjeuner', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=400' },
        { id: 'pt2', name: language === 'ar' ? 'فطور غيورماند' : 'Gourmand', description: 'Jus d\'orange, viennoiserie, misemmen, omelette fromage, corbeille de notre boulanger, confiture, beurre, café ou thé.', price: 60, category: 'Petit Déjeuner', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=400' },
        { id: 'pt3', name: language === 'ar' ? 'فطور تقليدي' : 'Traditionnel', description: 'Jus d\'orange, m\'semmen, harcha, corbeille de notre boulanger, olives et amlou, jben, miel, huile d\'olive, café ou thé.', price: 50, category: 'Petit Déjeuner', image: 'https://images.unsplash.com/photo-1549466699-db3730302b4e?q=80&w=400' },
        { id: 'pt4', name: language === 'ar' ? 'فطور مغربي' : 'Marocain', description: 'Jus d\'orange, m\'semmen, oeufs au khlii, corbeille de notre boulanger, café ou thé.', price: 55, category: 'Petit Déjeuner', image: 'https://images.unsplash.com/photo-1506084868730-3423e9339e05?q=80&w=400' },

        // Salades
        { id: 'sl1', name: language === 'ar' ? 'سلطة مغربية' : 'Salade Marocaine', description: 'Authentic Moroccan salad', price: 30, category: 'Salades', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=400' },
        { id: 'sl2', name: language === 'ar' ? 'سلطة نيسواز' : 'Salade Nicoise', description: 'Classic Niçoise salad', price: 40, category: 'Salades', image: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?q=80&w=400' },
        { id: 'sl3', name: language === 'ar' ? 'سلطة مكسيكية' : 'Salade Mexicaine', description: 'Spicy Mexican flavors', price: 40, category: 'Salades', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400' },
        { id: 'sl4', name: language === 'ar' ? 'سلطة بيشور' : 'Salade Pêcheur', description: 'Ocean fresh seafood salad', price: 60, category: 'Salades', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400' },
        { id: 'sl5', name: language === 'ar' ? 'سلطة نطورا جانغل' : 'Salade Natura Jungle', description: 'Signature home salad', price: 50, category: 'Salades', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400' },

        // Tagines
        { id: 'tg1', name: language === 'ar' ? 'طاجين لحم بالبرقوق' : 'Tagine Viande Pruneaux', description: 'Slow-cooked tradition', price: 135, category: 'Tagines', image: 'https://images.unsplash.com/photo-1541518763669-279f00ed51ca?q=80&w=400' },
        { id: 'tg2', name: language === 'ar' ? 'طاجين دجاج بلدي' : 'Tagine Poulet Beldi', description: 'Free-range chicken tagine', price: 135, category: 'Tagines', image: 'https://images.unsplash.com/photo-1541518763669-279f00ed51ca?q=80&w=400' },
        { id: 'tg3', name: language === 'ar' ? 'طاجين السمان' : 'Tagine de Cailles', description: 'Delicate quail tagine', price: 135, category: 'Tagines', image: 'https://images.unsplash.com/photo-1541518763669-279f00ed51ca?q=80&w=400' },
        { id: 'tg4', name: language === 'ar' ? 'طاجين خضار' : 'Tagine Legumes', description: 'Seasonal vegetable mix', price: 115, category: 'Tagines', image: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=400' },
        { id: 'tg5', name: language === 'ar' ? 'طاجين لحم مفروم' : 'Tagine Viande Hachée', description: 'Minced meat with eggs', price: 125, category: 'Tagines', image: 'https://images.unsplash.com/photo-1541518763669-279f00ed51ca?q=80&w=400' },
        { id: 'tg6', name: language === 'ar' ? 'طاجين معيز' : 'Tagine Chevreaux', description: 'Tender goat meat tagine', price: 135, category: 'Tagines', image: 'https://images.unsplash.com/photo-1541518763669-279f00ed51ca?q=80&w=400' },

        // Plats
        { id: 'pl1', name: language === 'ar' ? 'صحن لحم مفروم' : 'Plat Viande Hachée', description: 'Accompagnés par des frites et salade', price: 80, category: 'Plats', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=400' },
        { id: 'pl2', name: language === 'ar' ? 'صحن بروشيت مشكل' : 'Plat Brochettes Mixte', description: 'Accompagnés par des frites et salade', price: 85, category: 'Plats', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=400' },
        { id: 'pl3', name: language === 'ar' ? 'صحن بروشيت دجاج' : 'Plat Brochettes de Poulet', description: 'Accompagnés par des frites et salade', price: 75, category: 'Plats', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=400' },
        { id: 'pl4', name: language === 'ar' ? 'صحن ريش لحم' : 'Plat Côtelettes d\'Agneau', description: 'Accompagnés par des frites et salade', price: 85, category: 'Plats', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=400' },
        { id: 'pl5', name: language === 'ar' ? 'صحن صوصيص' : 'Plat Saucisse', description: 'Accompagnés par des frites et salade', price: 85, category: 'Plats', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=400' },
        { id: 'pl6', name: language === 'ar' ? 'صحن مشكل' : 'Plat Mixte', description: 'Accompagnés par des frites et salade', price: 85, category: 'Plats', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=400' },
        { id: 'pl7', name: language === 'ar' ? 'صحن ناجتس' : 'Plat Nugets', description: 'Accompagnés par des frites et salade', price: 70, category: 'Plats', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400' },

        // Sandwiches
        { id: 'sw1', name: language === 'ar' ? 'ساندويتش لحم مفروم' : 'Sandwich Viande Hachée', description: 'Accompagner de Frites', price: 50, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1502035618526-642f1f5b9049?q=80&w=400' },
        { id: 'sw2', name: language === 'ar' ? 'ساندويتش ديك رومي' : 'Sandwich Dinde', description: 'Accompagner de Frites', price: 45, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1502035618526-642f1f5b9049?q=80&w=400' },
        { id: 'sw3', name: language === 'ar' ? 'ساندويتش مشكل' : 'Sandwich Mixte', description: 'Accompagner de Frites', price: 50, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1502035618526-642f1f5b9049?q=80&w=400' },
        { id: 'sw4', name: language === 'ar' ? 'هامبرغر' : 'Hamburger', description: 'Accompagner de Frites', price: 45, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400' },
        { id: 'sw5', name: language === 'ar' ? 'تشيز برجر' : 'Cheeseburger', description: 'Accompagner de Frites', price: 50, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400' },

        // Pizza
        { id: 'pz1', name: language === 'ar' ? 'بيتزا لحم مفروم' : 'Pizza Viande Hachée', description: 'Tomato sauce, minced meat, cheese', price: 70, category: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400' },
        { id: 'pz2', name: language === 'ar' ? 'بيتزا دجاج' : 'Pizza Poulet', description: 'Tomato sauce, chicken, cheese', price: 70, category: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400' },
        { id: 'pz3', name: language === 'ar' ? 'بيتزا فواكه البحر' : 'Pizza Fruit de Mer', description: 'Assorted seafood and cheese', price: 80, category: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400' },
        { id: 'pz4', name: language === 'ar' ? 'بيتزا تونة' : 'Pizza Thon', description: 'Tuna, olives, and onions', price: 65, category: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400' },
        { id: 'pz5', name: language === 'ar' ? 'بيتزا ٤ أجبان' : 'Pizza 4 Fromages', description: 'Mozzarella, Roquefort, Edam, Cheddar', price: 65, category: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400' },

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
        { id: 'js1', name: language === 'ar' ? 'نكتار برتقال' : 'Nectars Jus d\'Orange', description: '100% natural', price: 15, category: 'Jus', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=400' },
        { id: 'js2', name: language === 'ar' ? 'عصير فواكه حمراء' : 'Jus de Fruits Rouge', description: 'Berry mix', price: 17, category: 'Jus', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=400' },
        { id: 'js3', name: language === 'ar' ? 'عصير تفاح' : 'Jus de Pomme', description: 'Fresh apple juice', price: 17, category: 'Jus', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=400' },
        { id: 'js4', name: language === 'ar' ? 'عصير مانجو' : 'Jus de Mangue', description: 'Fresh mango juice', price: 17, category: 'Jus', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=400' },
        { id: 'js5', name: language === 'ar' ? 'عصير أناناس' : 'Jus de Ananas', description: 'Fresh pineapple juice', price: 17, category: 'Jus', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=400' },
        { id: 'js6', name: language === 'ar' ? 'عصير فواكه استوائية' : 'Jus Exotique', description: 'Tropical mix', price: 17, category: 'Jus', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=400' },

        // Desserts
        { id: 'ds1', name: language === 'ar' ? 'سلطة فواكه' : 'Salade de Fruits', description: 'Fresh seasonal fruit mix', price: 30, category: 'Desserts', image: 'https://images.unsplash.com/photo-1490474418144-942824f2b931?q=80&w=400' },
        { id: 'ds2', name: language === 'ar' ? 'فلان' : 'Flan', description: 'Caramel custard', price: 25, category: 'Desserts', image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?q=80&w=400' },

        // Menu Enfants
        { id: 'me1', name: language === 'ar' ? 'وجبة أطفال' : 'Menu Enfants', description: 'Nugget ou Hamburger + Frite', price: 40, category: 'Menu Enfants', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?q=80&w=400' },

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
        { id: 'Menu Enfants', icon: Baby, label: language === 'ar' ? 'قائمة الأطفال' : 'Menu Enfants' },
        { id: 'Suppléments', icon: Plus, label: language === 'ar' ? 'إضافات' : 'Suppléments' },
    ];

    const filteredItems = menuItems.filter(item => item.category === activeCategory);

    return (
        <div className={`min-h-screen ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <header className="px-6 py-8 flex justify-between items-center bg-white/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onBack}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-sand-gold/10 text-sand-gold"
                >
                    <ChevronLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.button>
                <div className="text-center">
                    <h1 className="text-xl font-serif font-bold tracking-widest uppercase text-sand-gold">
                        {language === 'ar' ? 'قائمة الطلبات' : 'Digital Menu'}
                    </h1>
                </div>
                <div className="relative">
                    <ShoppingCart className="w-6 h-6 text-sand-gold" />
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
                <div className="flex gap-4 overflow-x-auto px-6 py-6 no-scrollbar">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <motion.button
                                key={cat.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(cat.id as any)}
                                className={`flex-none px-6 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 border ${isActive
                                    ? 'bg-sand-gold text-jungle-green border-sand-gold shadow-lg shadow-sand-gold/20'
                                    : 'bg-white/5 text-white/40 border-white/10'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-xs font-bold uppercase tracking-widest">{cat.label}</span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Items Grid */}
                <div className="px-6 space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid gap-6"
                        >
                            {filteredItems.map((item) => {
                                const cartItem = cart.find(i => i.id === item.id);
                                return (
                                    <div key={item.id} className="jungle-card p-4 flex gap-4 bg-white shadow-xl">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden flex-none">
                                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                        </div>
                                        <div className="flex-1 py-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-lg font-serif">{item.name}</h3>
                                                <span className="text-sand-gold font-bold">{item.price} MAD</span>
                                            </div>
                                            <p className="text-xs text-jungle-green/40 mb-3">{item.description}</p>

                                            <div className="flex justify-end">
                                                {cartItem ? (
                                                    <div className="flex items-center gap-4 bg-sand-gold/10 rounded-xl p-1">
                                                        <motion.button
                                                            whileTap={{ scale: 0.8 }}
                                                            onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-jungle-green shadow-sm"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </motion.button>
                                                        <span className="text-sm font-bold w-4 text-center">{cartItem.quantity}</span>
                                                        <motion.button
                                                            whileTap={{ scale: 0.8 }}
                                                            onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-sand-gold text-jungle-green shadow-sm"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </motion.button>
                                                    </div>
                                                ) : (
                                                    <motion.button
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => addToCart(item)}
                                                        className="px-4 py-2 bg-jungle-green text-sand-gold rounded-xl text-xs font-bold uppercase tracking-widest border border-sand-gold/20"
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
                        <div className="bg-jungle-green border border-sand-gold/30 rounded-[2.5rem] p-6 shadow-2xl gold-shadow flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-sand-gold/10 flex items-center justify-center text-sand-gold">
                                    <ShoppingBag className="w-6 h-6" />
                                </div>
                                <div className="text-white">
                                    <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{cartCount} {language === 'ar' ? 'عناصر' : 'Items'}</p>
                                    <p className="text-xl font-serif text-sand-gold">{cartTotal} MAD</p>
                                </div>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onOrderPlaced(cart, cartTotal)}
                                className="bg-sand-gold text-jungle-green px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg"
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
