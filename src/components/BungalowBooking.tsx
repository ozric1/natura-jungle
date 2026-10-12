import { motion } from 'framer-motion';
import { Users, Star, ChevronLeft, Moon, Sparkles, Calendar as CalendarIcon, Info, Check, CheckCircle2, Minus, Plus, Home } from 'lucide-react';
import { useState, useMemo, useRef } from 'react';

interface BungalowBookingProps {
    onBack: () => void;
    onPaymentComplete: () => void;
    currentLanguage: 'en' | 'fr' | 'ar';
}

interface BungalowOffer {
    id: string;
    price: number;
    badge: string;
    title: string;
    subtitle?: string;
    guests: string;
    hasPool?: boolean;
    features: string[];
}

export const BungalowBooking = ({ onBack, currentLanguage }: BungalowBookingProps) => {
    const isRTL = currentLanguage === 'ar';

    const translations = {
        fr: {
            title: "Bungalow Horizon Jungle",
            subtitle: "Séjour en Famille au Cœur de la Nature",
            checkIn: "Arrivée 14h",
            checkOut: "Départ 12h",
            heroBadge: "Séjour en Famille",
            bannerNotice: "✨ Nos formules officielles de séjour en bungalow • Petit-déjeuner, parc animalier & espace jeux inclus.",
            selectOffer: "Choisissez votre formule",
            selectDates: "Sélectionnez vos dates",
            selectArrival: "Date d'arrivée",
            selectDeparture: "Date de départ",
            highDemand: "Forte demande pour les séjours en bungalow. Réservez tôt pour garantir vos dates.",
            maxCapacityNotice: "Capacité maximale de 4 personnes par bungalow. Au-delà, un autre bungalow est requis.",
            bungalowCount: "Nombre de bungalows",
            total: "Montant Total",
            continue: "Vérifier la Disponibilité sur WhatsApp",
            selectDatesFirst: "Veuillez sélectionner vos dates d'arrivée et départ",
            selectOfferFirst: "Choisissez une formule d'abord",
            night: "Nuit",
            nights: "Nuits",
            reserve: "Sélectionner",
            selected: "Sélectionné",
            officialBadge: "Formule Officielle",
            offers: [
                {
                    id: "std-1",
                    price: 900,
                    badge: "Formule Découverte",
                    title: "🌿 Offre Découverte",
                    guests: "👨‍👩‍👦 2 Adultes + 1 Enfant",
                    hasPool: false,
                    features: [
                        "🥐 Petit-déjeuner inclus",
                        "🦙 Accès au parc animalier inclus",
                        "🎪 Accès à l'espace de jeux enfants inclus"
                    ]
                },
                {
                    id: "std-2",
                    price: 1100,
                    badge: "Famille Découverte",
                    title: "🦙 Famille Découverte",
                    guests: "👨‍👩‍👧‍👦 2 Adultes + 2 Enfants",
                    hasPool: false,
                    features: [
                        "🥐 Petit-déjeuner inclus",
                        "🦙 Accès au parc animalier inclus",
                        "🎪 Accès à l'espace de jeux enfants inclus"
                    ]
                }
            ] as BungalowOffer[]
        },
        en: {
            title: "Jungle Horizon Bungalow",
            subtitle: "Family Stay in the Heart of Nature",
            checkIn: "Check-in 14:00",
            checkOut: "Check-out 12:00",
            heroBadge: "Family Stay",
            bannerNotice: "✨ Our official bungalow stay packages • Breakfast, animal park & kids play area included.",
            selectOffer: "Choose your package",
            selectDates: "Select your dates",
            selectArrival: "Arrival Date",
            selectDeparture: "Departure Date",
            highDemand: "High demand for bungalow stays. Book early to secure your dates.",
            maxCapacityNotice: "Maximum capacity is 4 people per bungalow. For more, another bungalow is required.",
            bungalowCount: "Number of bungalows",
            total: "Total Amount",
            continue: "Check Availability on WhatsApp",
            selectDatesFirst: "Please select arrival and departure dates",
            selectOfferFirst: "Select a package first",
            night: "Night",
            nights: "Nights",
            reserve: "Select",
            selected: "Selected",
            officialBadge: "Official Package",
            offers: [
                {
                    id: "std-1",
                    price: 900,
                    badge: "Discovery Package",
                    title: "🌿 Discovery Offer",
                    guests: "👨‍👩‍👦 2 Adults + 1 Child",
                    hasPool: false,
                    features: [
                        "🥐 Breakfast included",
                        "🦙 Animal park access included",
                        "🎪 Kids play area access included"
                    ]
                },
                {
                    id: "std-2",
                    price: 1100,
                    badge: "Family Discovery",
                    title: "🦙 Family Discovery",
                    guests: "👨‍👩‍👧‍👦 2 Adults + 2 Children",
                    hasPool: false,
                    features: [
                        "🥐 Breakfast included",
                        "🦙 Animal park access included",
                        "🎪 Kids play area access included"
                    ]
                }
            ] as BungalowOffer[]
        },
        ar: {
            title: "بناغل الغابة الفاخرة",
            subtitle: "إقامة عائلية فاخرة في قلب الطبيعة",
            checkIn: "وصول 14:00",
            checkOut: "مغادرة 12:00",
            heroBadge: "إقامة عائلية",
            bannerNotice: "✨ باقاتنا الرسمية للإقامة في بناغل الغابة • فطور الصباح، حديقة الحيوانات وفضاء الألعاب مشمولة.",
            selectOffer: "اختر العرض المناسب",
            selectDates: "اختر تواريخ الإقامة",
            selectArrival: "تاريخ الوصول",
            selectDeparture: "تاريخ المغادرة",
            highDemand: "إقبال كبير على الإقامات في البناغل. احجز مبكراً لتأكيد التواريخ المطلوبة.",
            maxCapacityNotice: "الحد الأقصى للسعة هو 4 أشخاص لكل بنغل. لأكثر من ذلك، يلزم بنغل إضافي.",
            bungalowCount: "عدد البناغل",
            total: "المجموع الكلي",
            continue: "تأكيد التوفر عبر الواتساب",
            selectDatesFirst: "يرجى تحديد تواريخ الوصول والمغادرة",
            selectOfferFirst: "اختر عرضاً أولاً",
            night: "ليلة",
            nights: "ليالي",
            reserve: "اختيار",
            selected: "تم الاختيار",
            officialBadge: "باقة رسمية",
            offers: [
                {
                    id: "std-1",
                    price: 900,
                    badge: "باقة الاستكشاف",
                    title: "🌿 عرض الاستكشاف",
                    guests: "👨‍👩‍👦 شخصين بالغين + طفل واحد",
                    hasPool: false,
                    features: [
                        "🥐 وجبة فطور الصباح مشمولة",
                        "🦙 دخول حديقة الحيوانات مشمول",
                        "🎪 دخول فضاء ألعاب الأطفال مشمول"
                    ]
                },
                {
                    id: "std-2",
                    price: 1100,
                    badge: "عائلي استكشافي",
                    title: "🦙 باقة العائلة الاستكشافية",
                    guests: "👨‍👩‍👧‍👦 شخصين بالغين + طفلين",
                    hasPool: false,
                    features: [
                        "🥐 وجبة فطور الصباح مشمولة",
                        "🦙 دخول حديقة الحيوانات مشمول",
                        "🎪 دخول فضاء ألعاب الأطفال مشمول"
                    ]
                }
            ] as BungalowOffer[]
        }
    };

    const t = translations[currentLanguage];

    const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [bungalowCount, setBungalowCount] = useState<number>(1);
    const calendarRef = useRef<HTMLDivElement>(null);

    const bookedDates: string[] = useMemo(() => [], []);

    const getDateString = (year: number, month: number, day: number) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const today = new Date();
    const todayStr = getDateString(today.getFullYear(), today.getMonth(), today.getDate());

    const isDayDisabled = (dateString: string) => {
        return dateString < todayStr || bookedDates.includes(dateString);
    };

    const toggleDate = (dateString: string) => {
        if (isDayDisabled(dateString)) return;

        setSelectedDates(prev => {
            if (prev.length === 0 || prev.length > 1) {
                return [dateString];
            }

            const start = new Date(prev[0]);
            const end = new Date(dateString);

            const range: string[] = [];
            const [lower, upper] = start < end ? [start, end] : [end, start];

            const current = new Date(lower);
            while (current <= upper) {
                const str = getDateString(current.getFullYear(), current.getMonth(), current.getDate());
                if (isDayDisabled(str)) return [dateString];
                range.push(str);
                current.setDate(current.getDate() + 1);
            }
            return range;
        });
    };

    const nights = Math.max(1, selectedDates.length > 1 ? selectedDates.length - 1 : 1);
    const selectedOffer = t.offers.find(o => o.id === selectedOfferId) || null;
    const grandTotal = selectedOffer ? (nights * selectedOffer.price * bungalowCount) : 0;

    const handleOfferSelect = (id: string) => {
        setSelectedOfferId(id);
        setTimeout(() => {
            if (calendarRef.current) {
                calendarRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 150);
    };

    const handleCheckout = () => {
        if (!selectedOffer) {
            alert(t.selectOfferFirst);
            return;
        }
        if (selectedDates.length < 2) {
            alert(t.selectDatesFirst);
            return;
        }

        const arrivalDate = selectedDates[0];
        const departureDate = selectedDates[selectedDates.length - 1];

        const message =
            `*🌿 DEMANDE DE RÉSERVATION BUNGALOW*\n\n` +
            `*📍 Établissement :* Natura Jungle Park\n` +
            `*🏷️ Formule Choisie :* ${selectedOffer.title}\n` +
            `*👥 Composition :* ${selectedOffer.guests}\n` +
            `*🏠 Nombre de Bungalows :* ${bungalowCount}\n` +
            `*📅 Date d'Arrivée :* ${arrivalDate}\n` +
            `*📅 Date de Départ :* ${departureDate}\n` +
            `*🌙 Durée :* ${nights} nuit(s)\n\n` +
            `*📋 Inclus dans la Formule :*\n` +
            `• Petit-déjeuner inclus\n` +
            `• Accès au parc animalier inclus\n` +
            `• Accès à l'espace de jeux enfants inclus\n\n` +
            `*💰 TARIF :*\n` +
            `Prix / nuit : *${selectedOffer.price} DH*\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n` +
            `*✨ MONTANT TOTAL : ${grandTotal} DH*\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `Bonjour, merci de bien vouloir me confirmer la disponibilité du bungalow pour ces dates.`;

        // Routing specifically to bungalow reservation number
        const whatsappUrl = `https://wa.me/212681813081?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="relative h-[100dvh] w-full bg-egg-shell dark:bg-ink-black text-jungle-green dark:text-white overflow-hidden flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth pb-36">
                {/* Gallery Header */}
                <div className="relative h-[36vh] w-full overflow-hidden shrink-0">
                    <img
                        src="/assets/natura/bugalow.webp"
                        className="w-full h-full object-cover"
                        alt="Bungalow Natura Jungle"
                        loading="eager"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <button
                        onClick={onBack}
                        className="absolute top-6 left-6 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white z-10 border border-white/20 hover:bg-black/60 transition-colors"
                    >
                        <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>

                    <div className="absolute top-6 right-6 flex items-center gap-2 bg-luxury-gold text-jungle-deep px-3 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider shadow-lg">
                        <Home className="w-3.5 h-3.5" />
                        <span>{t.heroBadge}</span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                        <div>
                            <span className="text-sand-gold font-bold uppercase tracking-[0.3em] text-[9px] mb-1 block">
                                {t.subtitle}
                            </span>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white leading-tight">
                                {t.title}
                            </h1>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                            <Star className="w-3.5 h-3.5 text-sand-gold fill-sand-gold" />
                            <span className="text-white text-[11px] font-bold">4.9 / 5</span>
                        </div>
                    </div>
                </div>

                <div className="px-4 sm:px-6 py-6 space-y-6 max-w-3xl mx-auto">
                    {/* Notice Banner */}
                    <div className="p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3 bg-gradient-to-r from-sand-gold/20 via-sand-gold/10 to-transparent border-sand-gold/30">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md bg-sand-gold text-jungle-deep">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs sm:text-sm font-bold text-jungle-green dark:text-sand-gold">
                                {t.bannerNotice}
                            </p>
                        </div>
                    </div>

                    {/* Features Badges */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        <div className="p-3 sm:p-4 bg-white dark:bg-white/5 rounded-2xl border border-sand-gold/15 text-center flex flex-col items-center justify-center shadow-sm">
                            <Users className="w-4 h-4 text-sand-gold mb-1" />
                            <p className="text-[10px] font-bold uppercase opacity-80">{isRTL ? 'سياحة عائلية' : 'Family Stay'}</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-white dark:bg-white/5 rounded-2xl border border-sand-gold/15 text-center flex flex-col items-center justify-center shadow-sm">
                            <Sparkles className="w-4 h-4 text-sand-gold mb-1" />
                            <p className="text-[10px] font-bold uppercase opacity-80">{t.checkIn}</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-white dark:bg-white/5 rounded-2xl border border-sand-gold/15 text-center flex flex-col items-center justify-center shadow-sm">
                            <Moon className="w-4 h-4 text-sand-gold mb-1" />
                            <p className="text-[10px] font-bold uppercase opacity-80">{t.checkOut}</p>
                        </div>
                    </div>

                    {/* The 2 Official Offers */}
                    <div>
                        <div className="mb-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-sand-gold">
                                <Star className="w-4 h-4" />
                                {t.selectOffer}
                            </h3>
                        </div>

                        {/* Offers Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {t.offers.map((offer) => {
                                const isSelected = selectedOfferId === offer.id;
                                return (
                                    <motion.div
                                        key={offer.id}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => handleOfferSelect(offer.id)}
                                        className={`
                                            relative rounded-[2rem] p-5 sm:p-6 cursor-pointer border transition-all duration-300 flex flex-col justify-between
                                            ${isSelected
                                                ? 'bg-jungle-deep text-white border-sand-gold shadow-2xl ring-2 ring-sand-gold/40'
                                                : 'bg-white dark:bg-white/5 text-jungle-green dark:text-white border-sand-gold/20 hover:border-sand-gold/50 shadow-sm'
                                            }
                                        `}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider mb-2 transition-colors ${
                                                    isSelected
                                                        ? 'bg-sand-gold text-jungle-deep font-black shadow-sm'
                                                        : 'bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 border border-sand-gold/15'
                                                }`}>
                                                    {offer.badge}
                                                </span>
                                                <h4 className="font-serif text-lg font-bold leading-tight">{offer.title}</h4>
                                                <p className="text-xs font-semibold text-sand-gold mt-1">
                                                    {offer.guests}
                                                </p>
                                            </div>
                                        </div>

                                        <ul className="space-y-2.5 my-4 text-xs">
                                            {offer.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-sand-gold" />
                                                    <span className={isSelected ? 'text-white/90' : 'text-jungle-green/80 dark:text-white/80'}>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex justify-between items-end pt-3 border-t border-sand-gold/20 mt-auto">
                                            <div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-serif font-bold text-sand-gold">{offer.price} DH</span>
                                                    <span className="text-[10px] font-semibold opacity-60">/ {t.night}</span>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className={`
                                                    px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200
                                                    ${isSelected ? 'bg-sand-gold text-jungle-deep shadow-md font-black' : 'bg-sand-gold/10 text-sand-gold hover:bg-sand-gold/20'}
                                                `}
                                            >
                                                {isSelected ? (
                                                    <span className="flex items-center gap-1"><Check className="w-3 h-3" /> {t.selected}</span>
                                                ) : t.reserve}
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Calendar Section */}
                    <motion.div
                        ref={calendarRef}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-white/5 rounded-[2.5rem] p-5 sm:p-6 shadow-sm border border-sand-gold/15"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-sand-gold" />
                                <h3 className="text-xs font-bold uppercase tracking-wider">
                                    {selectedDates.length === 0 ? t.selectArrival : selectedDates.length === 1 ? t.selectDeparture : t.selectDates}
                                </h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
                                        else setCurrentMonth(currentMonth - 1);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center bg-sand-gold/10 rounded-xl hover:bg-sand-gold/20 transition-colors"
                                >
                                    <ChevronLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                                </button>
                                <span className="text-xs font-bold uppercase tracking-widest min-w-[110px] text-center">
                                    {new Date(currentYear, currentMonth).toLocaleString(currentLanguage, { month: 'long', year: 'numeric' })}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
                                        else setCurrentMonth(currentMonth + 1);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center bg-sand-gold/10 rounded-xl hover:bg-sand-gold/20 transition-colors"
                                >
                                    <ChevronLeft className={`w-4 h-4 ${isRTL ? '' : 'rotate-180'}`} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                <span key={i} className="text-[10px] opacity-50 font-bold mb-2">{d}</span>
                            ))}
                            {Array.from({ length: (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7 }).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}
                            {Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }, (_, i) => i + 1).map(day => {
                                const dateString = getDateString(currentYear, currentMonth, day);
                                const isDisabled = isDayDisabled(dateString);
                                const isSelected = selectedDates.includes(dateString);
                                const isArrival = selectedDates.length > 0 && selectedDates[0] === dateString;
                                const isDeparture = selectedDates.length > 1 && selectedDates[selectedDates.length - 1] === dateString;
                                const isMiddle = isSelected && !isArrival && !isDeparture;

                                return (
                                    <button
                                        key={day}
                                        type="button"
                                        disabled={isDisabled}
                                        onClick={() => toggleDate(dateString)}
                                        className={`
                                            h-9 sm:h-10 w-full flex items-center justify-center rounded-2xl text-xs font-semibold transition-all relative
                                            ${isDisabled ? 'opacity-20 cursor-not-allowed' : ''}
                                            ${isSelected && !isMiddle ? 'bg-sand-gold text-jungle-deep font-bold scale-105 shadow-md z-10' : ''}
                                            ${isMiddle ? 'bg-sand-gold/20 text-jungle-green dark:text-sand-gold' : ''}
                                            ${!isDisabled && !isSelected ? 'hover:bg-sand-gold/10' : ''}
                                        `}
                                    >
                                        <span className="relative z-20">{day}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-4 p-3 bg-sand-gold/10 rounded-2xl flex items-center gap-3">
                            <Info className="w-4 h-4 text-sand-gold shrink-0" />
                            <p className="text-[11px] font-medium leading-tight">
                                {t.highDemand}
                            </p>
                        </div>
                    </motion.div>

                    {/* Bungalow Quantity & Capacity Notice */}
                    <div className="bg-white dark:bg-white/5 rounded-[2rem] p-5 shadow-sm border border-sand-gold/15 space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider">{t.bungalowCount}</h3>
                                <p className="text-[10px] opacity-60 mt-0.5">{t.maxCapacityNotice}</p>
                            </div>
                            <div className="flex items-center gap-3 bg-sand-gold/10 p-1.5 rounded-2xl">
                                <button
                                    type="button"
                                    onClick={() => bungalowCount > 1 && setBungalowCount(bungalowCount - 1)}
                                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${bungalowCount > 1 ? 'bg-white dark:bg-black/40 text-jungle-green dark:text-white shadow-sm' : 'opacity-30'}`}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-6 text-center font-bold text-sm font-serif">{bungalowCount}</span>
                                <button
                                    type="button"
                                    onClick={() => bungalowCount < 10 && setBungalowCount(bungalowCount + 1)}
                                    className="w-8 h-8 rounded-xl flex items-center justify-center bg-white dark:bg-black/40 text-jungle-green dark:text-white shadow-sm transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-sand-gold/20 z-30">
                <div className="flex justify-between items-center mb-3 max-w-3xl mx-auto px-2">
                    <div>
                        <span className="text-[10px] font-bold uppercase opacity-60 block">{t.total} ({nights} {nights > 1 ? t.nights : t.night})</span>
                        <span className="text-2xl font-serif text-sand-gold font-bold">
                            {selectedOffer ? `${grandTotal} DH` : '—'}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] text-sand-gold font-bold uppercase tracking-wider block">
                            🏛️ {t.officialBadge}
                        </span>
                        <span className="text-[9px] text-neutral-500 dark:text-neutral-400 block font-medium">
                            {selectedOffer ? selectedOffer.title : t.selectOfferFirst}
                        </span>
                    </div>
                </div>

                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full max-w-3xl mx-auto block py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl bg-luxury-gold text-jungle-deep hover:bg-white hover:text-jungle-deep transition-all cursor-pointer"
                >
                    {selectedOffer ? t.continue : t.selectOfferFirst}
                </motion.button>
            </div>
        </div>
    );
};
