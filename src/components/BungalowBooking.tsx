import { motion, AnimatePresence } from 'framer-motion';
import { Users, Star, ChevronLeft, CheckCircle2, Moon, Sparkles, Calendar as CalendarIcon, Info } from 'lucide-react';
import { useState, useMemo } from 'react';

interface BungalowBookingProps {
    onBack: () => void;
    onPaymentComplete: () => void;
    currentLanguage: 'en' | 'fr' | 'ar';
}

export const BungalowBooking = ({ onBack, onPaymentComplete, currentLanguage }: BungalowBookingProps) => {
    const isRTL = currentLanguage === 'ar';

    const translations = {
        en: {
            title: "Jungle Horizon Bungalow",
            subtitle: "Luxury Stay",
            guests: "2 Adults + 1 Kid",
            private: "Private",
            rest: "Rest",
            selectDates: "Select Dates",
            highDemand: "High demand for this bungalow. 70% of dates are already booked for this month. Secure yours today!",
            pricePerNight: "Price per Night",
            breakfast: "Breakfast included",
            extraKid: "2nd child +150 DH",
            addKidsQuestion: "Additional Kids?",
            howMany: "How many?",
            yes: "Yes",
            no: "No",
            kid: "Kid",
            kids: "Kids",
            total: "Total Amount",
            continue: "Continue to Payment",
            selectDatesFirst: "Select Dates First",
            checkout: "Guest Checkout",
            cardName: "Cardholder Name",
            cardNumber: "Card Number",
            expiry: "Expiry",
            verify: "Verify & Book",
            confirmed: "Booking Confirmed!",
            confirmedMsg: "Your luxury night sky experience is now unlocked.",
            redirecting: "Redirecting...",
            alert: "Please enter all payment details",
            night: "Night",
            nights: "Nights"
        },
        fr: {
            title: "Bungalow Horizon Jungle",
            subtitle: "Séjour de Luxe",
            guests: "2 Adultes + 1 Enfant",
            private: "Privé",
            rest: "Détente",
            selectDates: "Choisir les Dates",
            highDemand: "Forte demande pour ce bungalow. 70% des dates sont déjà réservées. Sécurisez la vôtre aujourd'hui !",
            pricePerNight: "Prix par Nuit",
            breakfast: "Petit-déjeuner inclus",
            extraKid: "2ème enfant +150 DH",
            addKidsQuestion: "Enfants supplémentaires ?",
            howMany: "Combien ?",
            yes: "Oui",
            no: "Non",
            kid: "Enfant",
            kids: "Enfants",
            total: "Montant Total",
            continue: "Continuer vers le Paiement",
            selectDatesFirst: "Sélectionnez vos dates",
            checkout: "Paiement Invité",
            cardName: "Nom du titulaire",
            cardNumber: "Numéro de carte",
            expiry: "Expiration",
            verify: "Vérifier et Réserver",
            confirmed: "Réservation Confirmée !",
            confirmedMsg: "Votre expérience de ciel étoilé de luxe est maintenant débloquée.",
            redirecting: "Redirection...",
            alert: "Veuillez entrer tous les détails de paiement",
            night: "Nuit",
            nights: "Nuits"
        },
        ar: {
            title: "بناغل الغابة الفاخرة",
            subtitle: "إقامة فاخرة",
            guests: "شخصين + طفل واحد",
            private: "خاص",
            rest: "استجمام",
            selectDates: "اختر التواريخ",
            highDemand: "تم حجز ٧٠٪ من التواريخ لهذا الشهر. احجز مبكراً لتجنب خيبة الأمل.",
            pricePerNight: "السعر لليلة",
            breakfast: "شامل الفطور",
            extraKid: "الطفل الثاني +150 درهم",
            addKidsQuestion: "أطفال إضافيون؟",
            howMany: "كم عددهم؟",
            yes: "نعم",
            no: "لا",
            kid: "طفل",
            kids: "أطفال",
            total: "المجموع",
            continue: "إدخال تفاصيل الدفع",
            selectDatesFirst: "اختر التواريخ أولاً",
            checkout: "الدفع الآمن",
            cardName: "اسم حامل البطاقة",
            cardNumber: "رقم البطاقة",
            expiry: "انتهاء الصلاحية",
            verify: "تأكيد الحجز",
            confirmed: "الحجز مؤكد!",
            confirmedMsg: "لقد تم فتح خريطة النجوم المتميزة لك.",
            redirecting: "جاري العودة...",
            alert: "يرجى إدخال جميع تفاصيل الدفع",
            night: "ليلة",
            nights: "ليالي"
        }
    };

    const t = translations[currentLanguage];
    const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
    const [selectedDates, setSelectedDates] = useState<number[]>([]);
    const [addKids, setAddKids] = useState<boolean | null>(null);
    const [kidsCount, setKidsCount] = useState<1 | 2>(1);
    const [paymentData, setPaymentData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const pricePerNight = 900;
    const extraKidPrice = 150;

    // Simulation of occupancy
    const bookedDates: number[] = useMemo(() => [], []);

    const isDayDisabled = (day: number) => bookedDates.includes(day);

    const toggleDate = (day: number) => {
        if (isDayDisabled(day)) return;

        setSelectedDates(prev => {
            if (prev.length === 0 || prev.length > 1) {
                // Start a new selection
                return [day];
            } else {
                // Range selection
                const start = prev[0];
                const end = day;
                const range = [];
                const [lower, upper] = start < end ? [start, end] : [end, start];

                // Check if any booked dates are in the range
                for (let i = lower; i <= upper; i++) {
                    if (isDayDisabled(i)) {
                        // If range includes disabled date, just select the new day
                        return [day];
                    }
                    range.push(i);
                }
                return range;
            }
        });
    };

    const nights = selectedDates.length;

    // Price Calculation
    const totalExtraKidsCost = (addKids && kidsCount > 1) ? (extraKidPrice) : 0;
    const totalPricePerNight = pricePerNight + totalExtraKidsCost;
    const grandTotal = nights * totalPricePerNight;

    const handlePayment = () => {
        if (!paymentData.cardName || !paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
            alert(t.alert);
            return;
        }
        setStep('success');
        setTimeout(() => {
            onPaymentComplete();
        }, 3000);
    };

    if (step === 'success') {
        return (
            <div className="fixed inset-0 bg-jungle-green z-[150] flex flex-col items-center justify-center p-8 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 rounded-full bg-sand-gold flex items-center justify-center mb-8"
                >
                    <CheckCircle2 className="w-12 h-12 text-jungle-green" />
                </motion.div>
                <h2 className="text-4xl font-serif text-white mb-4">
                    {t.confirmed}
                </h2>
                <p className="text-sand-gold/60 mb-12 text-sm max-w-xs mx-auto">
                    {t.confirmedMsg}
                </p>
                <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs">
                    <Sparkles className="w-4 h-4" />
                    {t.redirecting}
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-[100dvh] w-full bg-egg-shell text-jungle-green overflow-hidden flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
                {/* Gallery Header */}
                <div className="relative h-[35vh] w-full overflow-hidden">
                    <img
                        src="/assets/natura/bugalow.jpeg"
                        className="w-full h-full object-cover"
                        alt="Bungalow"
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

                    {/* Features Row */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-4 bg-white rounded-3xl border border-sand-gold/10 text-center shadow-sm">
                            <Users className="w-4 h-4 mx-auto text-sand-gold mb-1" />
                            <p className="text-[8px] font-bold uppercase opacity-60 tracking-tighter">{t.guests}</p>
                        </div>
                        <div className="p-4 bg-white rounded-3xl border border-sand-gold/10 text-center shadow-sm">
                            <Moon className="w-4 h-4 mx-auto text-sand-gold mb-1" />
                            <p className="text-[8px] font-bold uppercase opacity-60 tracking-tighter">{t.private}</p>
                        </div>
                        <div className="p-4 bg-white rounded-3xl border border-sand-gold/10 text-center shadow-sm">
                            <Sparkles className="w-4 h-4 mx-auto text-sand-gold mb-1" />
                            <p className="text-[8px] font-bold uppercase opacity-60 tracking-tighter">{t.rest}</p>
                        </div>
                    </div>

                    {/* Restricted Calendar */}
                    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-sand-gold/10">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-sand-gold" />
                                <h3 className="text-sm font-bold uppercase tracking-widest">{t.selectDates}</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                                <span key={d} className="text-[10px] opacity-40 font-bold mb-2">{d}</span>
                            ))}
                            {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                                const isDisabled = isDayDisabled(day);
                                const isSelected = selectedDates.includes(day);
                                return (
                                    <button
                                        key={day}
                                        disabled={isDisabled}
                                        onClick={() => toggleDate(day)}
                                        className={`
                                            h-10 w-10 flex items-center justify-center rounded-2xl text-xs font-serif transition-all duration-300 relative
                                            ${isDisabled ? 'bg-gray-50 text-gray-200 cursor-not-allowed' : ''}
                                            ${isSelected ? 'bg-jungle-green text-white scale-110 shadow-lg' : 'hover:bg-sand-gold/10'}
                                            ${!isDisabled && !isSelected ? 'text-jungle-green/80' : ''}
                                        `}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-6 p-4 bg-jungle-green/5 rounded-2xl flex items-center gap-3 border border-sand-gold/10">
                            <Info className="w-4 h-4 text-sand-gold" />
                            <p className="text-[10px] text-jungle-green font-medium leading-tight">
                                {t.highDemand}
                            </p>
                        </div>
                    </div>

                    {/* Additional Kids Selection */}
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-sand-gold/10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-jungle-green">{t.addKidsQuestion}</h3>
                            <div className="flex gap-2 bg-egg-shell p-1 rounded-xl">
                                <button
                                    onClick={() => setAddKids(true)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${addKids === true ? 'bg-jungle-green text-white shadow-md' : 'text-jungle-green/40 hover:text-jungle-green'}`}
                                >
                                    {t.yes}
                                </button>
                                <button
                                    onClick={() => { setAddKids(false); setKidsCount(1); }}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${addKids === false ? 'bg-jungle-green text-white shadow-md' : 'text-jungle-green/40 hover:text-jungle-green'}`}
                                >
                                    {t.no}
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {addKids && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 border-t border-sand-gold/10 flex justify-between items-center">
                                        <span className="text-xs font-medium opacity-60">{t.howMany}</span>
                                        <div className="flex gap-3">
                                            {[1, 2].map(num => (
                                                <button
                                                    key={num}
                                                    onClick={() => setKidsCount(num as 1 | 2)}
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all border ${kidsCount === num ? 'bg-sand-gold text-white border-sand-gold shadow-lg scale-110' : 'bg-white border-sand-gold/20 text-jungle-green/60'}`}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-4 text-right">
                                        <span className="text-xs font-serif text-sand-gold italic">
                                            + {(kidsCount > 1 ? extraKidPrice : 0)} MAD / {t.night}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-6 border-t border-sand-gold/10">
                        <div className="flex justify-between text-xs mb-2">
                            <span className="opacity-60">{t.pricePerNight}</span>
                            <span className="font-bold">{pricePerNight} MAD</span>
                        </div>
                        <div className="flex justify-between text-[10px] mb-4 text-sand-gold/80">
                            <span>{t.breakfast}</span>
                            <span>{t.extraKid}</span>
                        </div>

                        {addKids && (
                            <div className="flex justify-between text-xs mb-4 text-jungle-green/80 border-t border-dashed border-jungle-green/10 pt-2">
                                <span>{kidsCount > 1 ? "2nd Child" : "1st Child Included"} x {nights} {t.nights}</span>
                                <span className="font-bold">+ {(kidsCount > 1 ? extraKidPrice * nights : 0)} MAD</span>
                            </div>
                        )}

                        <div className="flex justify-between items-end pt-4 border-t border-jungle-green/5">
                            <span className="text-lg font-serif italic">{t.total}</span>
                            <span className="text-3xl font-serif text-sand-gold">{grandTotal} MAD</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="p-6 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-sand-gold/10 relative z-30">
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={nights === 0}
                    onClick={() => setStep('payment')}
                    className={`
                        w-full py-5 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all duration-500
                        ${nights > 0 ? 'bg-jungle-green text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                    `}
                >
                    {nights === 0 ? t.selectDatesFirst : t.continue}
                </motion.button>
            </div>

            {/* Payment Modal Overlay */}
            <AnimatePresence>
                {step === 'payment' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[500] flex items-end justify-center px-4"
                    >
                        <motion.div
                            initial={{ y: '100dvh' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100dvh' }}
                            className="w-full bg-white rounded-t-[3.5rem] p-8 pb-12 max-w-xl"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-3xl font-serif italic">{t.checkout}</h3>
                                <button onClick={() => setStep('details')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">×</button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4 mb-2 block">{t.cardName}</label>
                                        <input
                                            type="text"
                                            placeholder="Sarah Mansouria"
                                            className="w-full bg-egg-shell rounded-2xl px-6 py-4 border border-sand-gold/5 focus:border-sand-gold outline-none transition-all font-serif italic"
                                            value={paymentData.cardName}
                                            onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4 mb-2 block">{t.cardNumber}</label>
                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full bg-egg-shell rounded-2xl px-6 py-4 border border-sand-gold/5 focus:border-sand-gold outline-none transition-all"
                                            value={paymentData.cardNumber}
                                            onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4 mb-2 block">{t.expiry}</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full bg-egg-shell rounded-2xl px-6 py-4 border border-sand-gold/5 focus:border-sand-gold outline-none transition-all text-center"
                                                value={paymentData.expiry}
                                                onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4 mb-2 block">CVV</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full bg-egg-shell rounded-2xl px-6 py-4 border border-sand-gold/5 focus:border-sand-gold outline-none transition-all text-center"
                                                value={paymentData.cvv}
                                                onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-4 border-t border-jungle-green/5">
                                    <span className="text-lg font-serif italic opacity-60">{t.total}</span>
                                    <span className="text-2xl font-serif text-sand-gold">{grandTotal} MAD</span>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handlePayment}
                                    className="w-full bg-jungle-green text-sand-gold py-6 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 shadow-xl"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    {t.verify}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
