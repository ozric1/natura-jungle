import { motion, AnimatePresence } from 'framer-motion';
import { Users, Star, ChevronLeft, Moon, Sparkles, Calendar as CalendarIcon, Info, Check, CheckCircle2, Minus, Plus } from 'lucide-react';
import { useState, useMemo, useRef } from 'react';

interface BungalowBookingProps {
    onBack: () => void;
    onPaymentComplete: () => void;
    currentLanguage: 'en' | 'fr' | 'ar';
}

export const BungalowBooking = ({ onBack, currentLanguage }: BungalowBookingProps) => {
    const isRTL = currentLanguage === 'ar';

    const translations = {
        fr: {
            title: "Bungalow Horizon Jungle",
            subtitle: "Séjour de Luxe",
            checkIn: "Arrivée 14h",
            checkOut: "Départ Midi (12h)",
            selectOffer: "Choisissez votre offre",
            selectDates: "Sélectionnez vos dates",
            selectArrival: "Date d'arrivée",
            selectDeparture: "Date de départ",
            highDemand: "Forte demande pour ce bungalow. 70% des dates sont déjà réservées. Sécurisez la vôtre aujourd'hui !",
            maxCapacityNotice: "Capacité maximale de 4 personnes par bungalow. Au-delà, un autre bungalow est requis.",
            bungalowCount: "Nombre de bungalows",
            total: "Montant Total",
            continue: "Vérifier la Disponibilité",
            selectDatesFirst: "Sélectionnez vos dates",
            selectOfferFirst: "Choisissez une offre d'abord",
            night: "Nuit",
            nights: "Nuits",
            fillAllFields: "Veuillez répondre à toutes les questions",
            reserve: "Réserver",
            selected: "Sélectionné",
            poolOffersNotice: "Offres avec accès piscine pour toute la famille",
            offers: [
                {
                    id: 3,
                    price: 900,
                    title: "🌿 Offre Découverte",
                    guests: "👨‍👩‍👦 2 adultes + 1 enfant gratuit",
                    features: ["🦙 Accès parc animalier", "🎪 Accès espace de jeux", "🥐 Petit déjeuner"]
                },
                {
                    id: 4,
                    price: 1100,
                    title: "🦙 Offre Famille Découverte",
                    guests: "👨‍👩‍👧‍👦 2 adultes + 2 enfants",
                    features: ["🦙 Accès parc animalier", "🎪 Accès espace de jeux", "🥐 Petit déjeuner"]
                },
                {
                    id: 1,
                    price: 1200,
                    title: "👑 Offre Premium",
                    guests: "👨‍👩‍👦 2 adultes + 1 enfant gratuit",
                    features: ["🏊‍♂️ Accès piscine", "🦙 Accès parc animalier", "🎪 Accès espace de jeux", "🥐 Petit déjeuner"]
                },
                {
                    id: 2,
                    price: 1400,
                    title: "👨‍👩‍👧‍👦 Offre Famille Plus",
                    guests: "👨‍👩‍👧‍👦 2 adultes + 2 enfants",
                    features: ["🏊‍♂️ Accès piscine", "🦙 Accès parc animalier", "🎪 Accès espace de jeux", "🥐 Petit déjeuner"]
                }
            ]
        },
        en: {
            title: "Jungle Horizon Bungalow",
            subtitle: "Luxury Stay",
            checkIn: "Check-in 14h",
            checkOut: "Check-out 12h",
            selectOffer: "Choose your offer",
            selectDates: "Select Dates",
            selectArrival: "Arrival Date",
            selectDeparture: "Departure Date",
            highDemand: "High demand for this bungalow. 70% of dates are already booked for this month. Secure yours today!",
            maxCapacityNotice: "Maximum capacity is 4 people per bungalow. For more, another bungalow is required.",
            bungalowCount: "Number of bungalows",
            total: "Total Amount",
            continue: "Check Availability",
            selectDatesFirst: "Select Dates First",
            selectOfferFirst: "Select an offer first",
            night: "Night",
            nights: "Nights",
            fillAllFields: "Please answer all questions first",
            reserve: "Reserve",
            selected: "Selected",
            poolOffersNotice: "Offers with pool access for the whole family",
            offers: [
                {
                    id: 3,
                    price: 900,
                    title: "🌿 Discovery Offer",
                    guests: "👨‍👩‍👦 2 Adults + 1 Kid Free",
                    features: ["🦙 Animal park access", "🎪 Kids play area", "🥐 Breakfast"]
                },
                {
                    id: 4,
                    price: 1100,
                    title: "🦙 Discovery Family Offer",
                    guests: "👨‍👩‍👧‍👦 2 Adults + 2 Kids",
                    features: ["🦙 Animal park access", "🎪 Kids play area", "🥐 Breakfast"]
                },
                {
                    id: 1,
                    price: 1200,
                    title: "👑 Premium Offer",
                    guests: "👨‍👩‍👦 2 Adults + 1 Kid Free",
                    features: ["🏊‍♂️ Pool access", "🦙 Animal park access", "🎪 Kids play area", "🥐 Breakfast"]
                },
                {
                    id: 2,
                    price: 1400,
                    title: "👨‍👩‍👧‍👦 Family Plus Offer",
                    guests: "👨‍👩‍👧‍👦 2 Adults + 2 Kids",
                    features: ["🏊‍♂️ Pool access", "🦙 Animal park access", "🎪 Kids play area", "🥐 Breakfast"]
                }
            ]
        },
        ar: {
            title: "بناغل الغابة الفاخرة",
            subtitle: "إقامة فاخرة",
            checkIn: "وصول 14:00",
            checkOut: "مغادرة 12:00",
            selectOffer: "اختر عرضك",
            selectDates: "اختر التواريخ",
            selectArrival: "تاريخ الوصول",
            selectDeparture: "تاريخ المغادرة",
            highDemand: "تم حجز ٧٠٪ من التواريخ لهذا الشهر. احجز مبكراً لتجنب خيبة الأمل.",
            maxCapacityNotice: "الحد الأقصى للسعة هو 4 أشخاص لكل بنغل. لأكثر من ذلك، يلزم بنغل آخر.",
            bungalowCount: "عدد البناغل",
            total: "المجموع",
            continue: "التحقق من التوفر",
            selectDatesFirst: "اختر التواريخ أولاً",
            selectOfferFirst: "اختر عرضًا أولاً",
            night: "ليلة",
            nights: "ليالي",
            fillAllFields: "يرجى الإجابة على جميع الأسئلة",
            reserve: "حجز",
            selected: "محدد",
            poolOffersNotice: "عروض مع دخول المسبح لجميع أفراد العائلة",
            offers: [
                {
                    id: 3,
                    price: 900,
                    title: "🌿 العرض الاستكشافي",
                    guests: "👨‍👩‍👦 شخصين + طفل واحد مجاناً",
                    features: ["🦙 دخول حديقة الحيوان", "🎪 منطقة ألعاب الأطفال", "🥐 فطور"]
                },
                {
                    id: 4,
                    price: 1100,
                    title: "🦙 عرض العائلة الاستكشافي",
                    guests: "👨‍👩‍👧‍👦 شخصين + طفلين",
                    features: ["🦙 دخول حديقة الحيوان", "🎪 منطقة ألعاب الأطفال", "🥐 فطور"]
                },
                {
                    id: 1,
                    price: 1200,
                    title: "👑 العرض الشامل",
                    guests: "👨‍👩‍👦 شخصين + طفل واحد مجاناً",
                    features: ["🏊‍♂️ دخول المسبح", "🦙 دخول حديقة الحيوان", "🎪 منطقة ألعاب الأطفال", "🥐 فطور"]
                },
                {
                    id: 2,
                    price: 1400,
                    title: "👨‍👩‍👧‍👦 عرض العائلة بلس",
                    guests: "👨‍👩‍👧‍👦 شخصين + طفلين",
                    features: ["🏊‍♂️ دخول المسبح", "🦙 دخول حديقة الحيوان", "🎪 منطقة ألعاب الأطفال", "🥐 فطور"]
                }
            ]
        }
    };

    const t = translations[currentLanguage];
    
    const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
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
            
            let current = new Date(lower);
            while (current <= upper) {
                const str = getDateString(current.getFullYear(), current.getMonth(), current.getDate());
                if (isDayDisabled(str)) return [dateString];
                range.push(str);
                current.setDate(current.getDate() + 1);
            }
            return range;
        });
    };

    const nights = Math.max(0, selectedDates.length - 1);
    const selectedOffer = t.offers.find(o => o.id === selectedOfferId);
    const grandTotal = selectedOffer ? (nights * selectedOffer.price * bungalowCount) : 0;

    const handleOfferSelect = (id: number) => {
        setSelectedOfferId(id);
        setTimeout(() => {
            if (calendarRef.current) {
                calendarRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 150);
    };

    const handleCheckout = () => {
        if (!selectedOfferId) {
            alert(t.selectOfferFirst);
            return;
        }
        if (nights === 0) {
            alert(t.selectDatesFirst);
            return;
        }

        const arrivalDate = selectedDates[0];
        const departureDate = selectedDates[selectedDates.length - 1];
        
        const message = `*NOUVELLE DEMANDE DE RÉSERVATION BUNGALOW*\n\n` +
            `*📍 Bungalow :* Horizon Jungle\n` +
            `*🏠 Nombre de Bungalows :* ${bungalowCount}\n` +
            `*💎 Offre choisie :* ${selectedOffer?.title}\n` +
            `*👥 Inclus par bungalow :* ${selectedOffer?.guests}\n` +
            `*📅 Arrivée :* ${arrivalDate}\n` +
            `*📅 Départ :* ${departureDate}\n` +
            `*🌙 Durée :* ${nights} nuit(s)\n\n` +
            `*RÉSUMÉ FINANCIER :*\n` +
            `💰 Prix par nuit/bungalow : ${selectedOffer?.price} MAD\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n` +
            `*✨ MONTANT TOTAL : ${grandTotal} MAD*\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `Merci de me confirmer la disponibilité pour ces dates.`;
        
        const whatsappUrl = `https://wa.me/212681813081?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="relative h-[100dvh] w-full bg-egg-shell text-jungle-green overflow-hidden flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth pb-32">
                {/* Gallery Header */}
                <div className="relative h-[35vh] w-full overflow-hidden shrink-0">
                    <img
                        src="/assets/natura/bugalow.webp"
                        className="w-full h-full object-cover"
                        alt="Bungalow"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-egg-shell via-transparent to-black/30" />

                    <button
                        onClick={onBack}
                        className="absolute top-6 left-6 w-10 h-10 glass-dark rounded-full flex items-center justify-center text-white z-10 shadow-lg"
                    >
                        <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>

                    <div className="absolute bottom-6 left-6 flex items-center gap-2 glass-dark px-3 py-1.5 rounded-full border border-white/20">
                        <Star className="w-3 h-3 text-sand-gold fill-sand-gold" />
                        <span className="text-white text-[10px] font-bold">4.9 (124 reviews)</span>
                    </div>
                </div>

                <div className="px-6 py-8 space-y-8 max-w-2xl mx-auto">
                    <div>
                        <span className="text-sand-gold font-bold uppercase tracking-[0.3em] text-[9px] mb-2 block">
                            {t.subtitle}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-serif leading-tight">
                            {t.title}
                        </h1>
                    </div>

                    {/* Features Row - Asymmetric Layout */}
                    <div className="flex flex-wrap gap-2 sm:gap-4 items-stretch">
                        <div className="flex-[1.5] min-w-[120px] p-4 bg-white rounded-3xl border border-sand-gold/10 text-center shadow-sm flex flex-col items-center justify-center">
                            <Users className="w-4 h-4 mx-auto text-sand-gold mb-1" />
                            <p className="text-[9px] font-bold uppercase opacity-60 tracking-tighter leading-tight">{t.subtitle}</p>
                        </div>
                        <div className="flex-1 min-w-[100px] p-4 bg-white rounded-3xl border border-sand-gold/10 text-center shadow-sm flex flex-col items-center justify-center">
                            <Sparkles className="w-4 h-4 mx-auto text-sand-gold mb-1" />
                            <p className="text-[9px] font-bold uppercase opacity-60 tracking-tighter leading-tight">{t.checkIn}</p>
                        </div>
                        <div className="flex-1 min-w-[100px] p-4 bg-white rounded-3xl border border-sand-gold/10 text-center shadow-sm flex flex-col items-center justify-center">
                            <Moon className="w-4 h-4 mx-auto text-sand-gold mb-1" />
                            <p className="text-[9px] font-bold uppercase opacity-60 tracking-tighter leading-tight">{t.checkOut}</p>
                        </div>
                    </div>

                    {/* Offers Section */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Star className="w-4 h-4 text-sand-gold" />
                            {t.selectOffer}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {t.offers.map((offer, index) => {
                                const isSelected = selectedOfferId === offer.id;
                                const offerCard = (
                                    <motion.div 
                                        key={offer.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleOfferSelect(offer.id)}
                                        className={`
                                            relative rounded-[2rem] p-6 cursor-pointer border transition-all duration-300 flex flex-col h-full
                                            ${isSelected 
                                                ? 'bg-jungle-green text-white border-sand-gold shadow-xl' 
                                                : 'bg-white text-jungle-green border-sand-gold/10 hover:border-sand-gold/40 shadow-sm'
                                            }
                                        `}
                                    >
                                        <div className="mb-4">
                                            <h4 className="font-serif text-lg leading-tight mb-1">{offer.title}</h4>
                                            <p className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-sand-gold' : 'text-sand-gold'}`}>
                                                {offer.guests}
                                            </p>
                                        </div>
                                        
                                        <ul className="space-y-2 mb-6 flex-1">
                                            {offer.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs">
                                                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isSelected ? 'text-sand-gold' : 'text-jungle-green/40'}`} />
                                                    <span className={isSelected ? 'text-white/90' : 'text-jungle-green/80'}>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        
                                        <div className="flex justify-between items-end mt-auto pt-4 border-t border-dashed border-white/20">
                                            <div>
                                                <span className={`text-[10px] font-bold uppercase opacity-60 block mb-1 ${isSelected ? 'text-white' : 'text-jungle-green'}`}>/ {t.night}</span>
                                                <span className="text-2xl font-serif text-sand-gold">{offer.price} DH</span>
                                            </div>
                                            <button 
                                                className={`
                                                    px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors
                                                    ${isSelected ? 'bg-sand-gold text-jungle-green' : 'bg-egg-shell text-jungle-green/60'}
                                                `}
                                            >
                                                {isSelected ? (
                                                    <span className="flex items-center gap-1"><Check className="w-3 h-3" /> {t.selected}</span>
                                                ) : t.reserve}
                                            </button>
                                        </div>
                                    </motion.div>
                                );

                                if (index === 2) {
                                    return [
                                        <div key="pool-notice" className="col-span-1 sm:col-span-2 text-center py-4 my-2 border-y border-sand-gold/20 flex items-center justify-center gap-2">
                                            <Sparkles className="w-4 h-4 text-sand-gold" />
                                            <p className="text-[11px] font-bold uppercase tracking-widest text-jungle-green">
                                                {t.poolOffersNotice}
                                            </p>
                                            <Sparkles className="w-4 h-4 text-sand-gold" />
                                        </div>,
                                        offerCard
                                    ];
                                }
                                return offerCard;
                            })}
                        </div>
                    </div>

                    {/* Calendar Section (Visible after offer selection) */}
                    <AnimatePresence>
                        {selectedOfferId && (
                            <motion.div
                                ref={calendarRef}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-sand-gold/10"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="w-4 h-4 text-sand-gold" />
                                        <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                                            {selectedDates.length === 0 ? t.selectArrival : selectedDates.length === 1 ? t.selectDeparture : t.selectDates}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => {
                                                if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
                                                else setCurrentMonth(currentMonth - 1);
                                            }}
                                            className="w-8 h-8 flex items-center justify-center bg-egg-shell rounded-xl hover:bg-sand-gold/20 transition-colors"
                                        >
                                            <ChevronLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                                        </button>
                                        <span className="text-xs font-bold uppercase tracking-widest min-w-[100px] text-center">
                                            {new Date(currentYear, currentMonth).toLocaleString(currentLanguage, { month: 'long', year: 'numeric' })}
                                        </span>
                                        <button 
                                            onClick={() => {
                                                if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
                                                else setCurrentMonth(currentMonth + 1);
                                            }}
                                            className="w-8 h-8 flex items-center justify-center bg-egg-shell rounded-xl hover:bg-sand-gold/20 transition-colors"
                                        >
                                            <ChevronLeft className={`w-4 h-4 ${isRTL ? '' : 'rotate-180'}`} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 gap-1 text-center">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                        <span key={i} className="text-[10px] opacity-40 font-bold mb-2">{d}</span>
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
                                                disabled={isDisabled}
                                                onClick={() => toggleDate(dateString)}
                                                className={`
                                                    h-10 w-10 flex items-center justify-center rounded-2xl text-xs font-serif transition-all duration-300 relative
                                                    ${isDisabled ? 'bg-gray-50 text-gray-200 cursor-not-allowed' : ''}
                                                    ${isSelected && !isMiddle ? 'bg-jungle-green text-white scale-110 shadow-lg z-10' : ''}
                                                    ${isMiddle ? 'bg-jungle-green/10 text-jungle-green' : ''}
                                                    ${!isDisabled && !isSelected ? 'text-jungle-green/80 hover:bg-sand-gold/10' : ''}
                                                `}
                                            >
                                                <span className="relative z-20">{day}</span>
                                                {isArrival && selectedDates.length > 1 && (
                                                    <div className={`absolute inset-0 bg-jungle-green/10 ${isRTL ? 'rounded-l-2xl right-1/2 w-1/2' : 'rounded-r-2xl left-1/2 w-1/2'} z-0`} />
                                                )}
                                                {isDeparture && selectedDates.length > 1 && (
                                                    <div className={`absolute inset-0 bg-jungle-green/10 ${isRTL ? 'rounded-r-2xl left-1/2 w-1/2' : 'rounded-l-2xl right-1/2 w-1/2'} z-0`} />
                                                )}
                                                {(isArrival || isDeparture) && (
                                                    <motion.div
                                                        layoutId="selected-date"
                                                        className="absolute inset-0 border border-sand-gold/50 rounded-2xl z-10"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                                
                                {nights > 0 && (
                                    <div className="mt-6 flex justify-between items-center px-4 py-3 bg-sand-gold/10 rounded-xl">
                                        <span className="text-xs font-bold uppercase tracking-wider text-jungle-green">{t.nights}</span>
                                        <span className="text-lg font-serif text-sand-gold font-bold">{nights}</span>
                                    </div>
                                )}

                                <div className="mt-4 p-4 bg-jungle-green/5 rounded-2xl flex items-center gap-3 border border-sand-gold/10">
                                    <Info className="w-4 h-4 text-sand-gold shrink-0" />
                                    <p className="text-[10px] text-jungle-green font-medium leading-tight">
                                        {t.highDemand}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bungalow Quantity & Capacity Notice */}
                    <AnimatePresence>
                        {nights > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2rem] p-6 shadow-sm border border-sand-gold/10 space-y-4"
                            >
                                <div className="p-4 bg-sand-gold/10 rounded-2xl flex items-start gap-3">
                                    <Info className="w-5 h-5 text-sand-gold shrink-0 mt-0.5" />
                                    <p className="text-xs text-jungle-green font-medium leading-relaxed">
                                        {t.maxCapacityNotice}
                                    </p>
                                </div>
                                
                                <div className="flex justify-between items-center pt-2">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-jungle-green">{t.bungalowCount}</h3>
                                    <div className="flex items-center gap-3 bg-egg-shell p-1.5 rounded-2xl border border-sand-gold/5">
                                        <button
                                            onClick={() => bungalowCount > 1 && setBungalowCount(bungalowCount - 1)}
                                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${bungalowCount > 1 ? 'bg-white text-jungle-green shadow-sm' : 'text-jungle-green/20'}`}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-6 text-center font-bold text-sm font-serif">{bungalowCount}</span>
                                        <button
                                            onClick={() => bungalowCount < 10 && setBungalowCount(bungalowCount + 1)}
                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-white text-jungle-green shadow-sm transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-sand-gold/10 z-30">
                <div className="flex justify-between items-center mb-4 max-w-2xl mx-auto px-2">
                    <div>
                        <span className="text-[10px] font-bold uppercase opacity-60 block">{t.total}</span>
                        <span className="text-2xl font-serif text-sand-gold leading-none">{grandTotal} MAD</span>
                    </div>
                </div>
                
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className={`
                        w-full max-w-2xl mx-auto block py-5 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all duration-500
                        ${(selectedOfferId && nights > 0) 
                            ? 'bg-jungle-green text-white cursor-pointer hover:bg-jungle-green/90' 
                            : 'bg-egg-shell text-jungle-green/40 border border-jungle-green/10 cursor-pointer'}
                    `}
                >
                    {!selectedOfferId ? t.selectOfferFirst : nights === 0 ? t.selectDatesFirst : t.continue}
                </motion.button>
            </div>
        </div>
    );
};
