import { motion, AnimatePresence } from 'framer-motion';
import { Users, Star, ChevronLeft, CreditCard, CheckCircle2, Moon, Sparkles, Calendar as CalendarIcon, Info } from 'lucide-react';
import { useState, useMemo } from 'react';

interface BungalowBookingProps {
    onBack: () => void;
    onPaymentComplete: () => void;
    isRTL?: boolean;
}

export const BungalowBooking = ({ onBack, onPaymentComplete, isRTL = false }: BungalowBookingProps) => {
    const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
    const [selectedDates, setSelectedDates] = useState<number[]>([]);
    const pricePerNight = 1000;

    // Simulate booked dates for urgency
    const bookedDates = useMemo(() => [4, 5, 12, 13, 18, 19, 24, 25, 26], []);

    const toggleDate = (day: number) => {
        if (bookedDates.includes(day)) return;
        setSelectedDates(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day].sort((a, b) => a - b)
        );
    };

    const nights = selectedDates.length;

    const handlePayment = () => {
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
                    {isRTL ? 'الحجز مؤكد!' : 'Booking Confirmed!'}
                </h2>
                <p className="text-sand-gold/60 mb-12">
                    {isRTL ? 'لقد تم فتح خريطة النجوم المتميزة لك.' : 'Your luxury night sky experience is now unlocked.'}
                </p>
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs"
                >
                    <Sparkles className="w-4 h-4" />
                    {isRTL ? 'جاري العودة...' : 'Redirecting...'}
                </motion.div>
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
                        src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Bungalow"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-egg-shell via-transparent to-black/30" />

                    <button
                        onClick={onBack}
                        className="absolute top-6 left-6 w-10 h-10 glass-morphism rounded-full flex items-center justify-center text-white z-10 shadow-lg"
                    >
                        <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>

                    <div className="absolute bottom-6 left-6 flex items-center gap-2 glass-morphism px-3 py-1.5 rounded-full border border-white/20">
                        <Star className="w-3 h-3 text-sand-gold fill-sand-gold" />
                        <span className="text-white text-[10px] font-bold">4.9 (124 reviews)</span>
                    </div>
                </div>

                <div className="px-6 py-8 space-y-8 max-w-2xl mx-auto">
                    <div>
                        <span className="text-sand-gold font-bold uppercase tracking-[0.3em] text-[9px] mb-2 block">
                            {isRTL ? 'إقامة فاخرة' : 'Luxury Stay'}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-serif leading-tight">
                            {isRTL ? 'بناغل الغابة الفاخرة' : 'Jungle Horizon Bungalow'}
                        </h1>
                    </div>

                    {/* Features Row - Compact for Mobile */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-4 bg-white rounded-3xl border border-sand-gold/5 text-center">
                            <Users className="w-4 h-4 mx-auto text-sand-gold mb-1" />
                            <p className="text-[8px] font-bold uppercase opacity-60 tracking-tighter">{isRTL ? 'شخصين' : '2 Guests'}</p>
                        </div>
                        <div className="p-4 bg-white rounded-3xl border border-sand-gold/5 text-center">
                            <Moon className="w-4 h-4 mx-auto text-sand-gold mb-1" />
                            <p className="text-[8px] font-bold uppercase opacity-60 tracking-tighter">{isRTL ? 'ليلة واحدة' : 'Private'}</p>
                        </div>
                        <div className="p-4 bg-white rounded-3xl border border-sand-gold/5 text-center">
                            <Sparkles className="w-4 h-4 mx-auto text-sand-gold mb-1" />
                            <p className="text-[8px] font-bold uppercase opacity-60 tracking-tighter">{isRTL ? 'خاص' : 'Stargazing'}</p>
                        </div>
                    </div>

                    {/* High Urgency Calendar */}
                    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-sand-gold/5">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-sand-gold" />
                                <h3 className="text-sm font-bold uppercase tracking-widest">{isRTL ? 'اختر التواريخ' : 'Select Dates'}</h3>
                            </div>
                            <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-wider">
                                <span className="flex items-center gap-1 opacity-40"><div className="w-2 h-2 rounded-full bg-gray-200" /> {isRTL ? 'محجوز' : 'Booked'}</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-sand-gold" /> {isRTL ? 'متاح' : 'Available'}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                                <span key={d} className="text-[10px] opacity-40 font-bold mb-2">{d}</span>
                            ))}
                            {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                                const isBooked = bookedDates.includes(day);
                                const isSelected = selectedDates.includes(day);
                                return (
                                    <button
                                        key={day}
                                        disabled={isBooked}
                                        onClick={() => toggleDate(day)}
                                        className={`
                                            h-10 w-10 flex items-center justify-center rounded-2xl text-xs font-serif transition-all duration-300
                                            ${isBooked ? 'bg-gray-100 text-gray-300 cursor-not-allowed opacity-50 relative overflow-hidden' : ''}
                                            ${isSelected ? 'bg-jungle-green text-white scale-110 shadow-lg' : 'hover:bg-sand-gold/10'}
                                            ${!isBooked && !isSelected ? 'text-jungle-green/80' : ''}
                                        `}
                                    >
                                        {day}
                                        {isBooked && (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                                <div className="w-full h-[1px] bg-black rotate-45" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-6 p-4 bg-amber-50 rounded-2xl flex items-center gap-3">
                            <Info className="w-4 h-4 text-sand-gold" />
                            <p className="text-[10px] text-amber-900 font-medium leading-tight">
                                {isRTL
                                    ? 'هناك طلب كبير على هذا البنغل. تم حجز ٧٠٪ من التواريخ بالفعل.'
                                    : 'High demand for this bungalow. 70% of dates are already booked for this month.'}
                            </p>
                        </div>
                    </div>

                    <div className="p-6 border-t border-sand-gold/10">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">{isRTL ? 'نظرة عامة' : 'Booking Summary'}</h3>
                        <div className="flex justify-between text-xs mb-2">
                            <span className="opacity-60">{isRTL ? 'السعر لليلة' : 'Price per Night'}</span>
                            <span className="font-bold">{pricePerNight} MAD</span>
                        </div>
                        <div className="flex justify-between text-xs mb-4">
                            <span className="opacity-60">{isRTL ? 'عدد الليالي' : `Nights selected`}</span>
                            <span className="font-bold">{nights}</span>
                        </div>
                        <div className="flex justify-between items-end pt-4 border-t border-jungle-green/5">
                            <span className="text-lg font-serif italic">{isRTL ? 'المجموع' : 'Total Amount'}</span>
                            <span className="text-3xl font-serif text-sand-gold">{nights * pricePerNight} MAD</span>
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
                    {isRTL ? 'أتمم الحجز الآن' : nights === 0 ? 'Select Dates First' : 'Secure This Reservation'}
                </motion.button>
            </div>

            {/* Payment Modal Overlay */}
            <AnimatePresence>
                {step === 'payment' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-[500] flex items-end justify-center"
                    >
                        <motion.div
                            initial={{ y: '100dvh' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100dvh' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                            className="w-full bg-white rounded-t-[3.5rem] p-8 pb-12 max-w-xl"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-3xl font-serif italic">{isRTL ? 'الدفع الآمن' : 'Checkout'}</h3>
                                <button onClick={() => setStep('details')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-lg">×</span>
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div className="p-6 bg-egg-shell rounded-3xl border border-sand-gold/5 flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                        <CreditCard className="w-6 h-6 text-sand-gold" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest mb-1">Payment Method</p>
                                        <p className="text-sm font-serif">Mastercard •••• 4242</p>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] font-bold opacity-40 uppercase mb-1">Total Due</p>
                                        <p className="text-3xl font-serif text-jungle-green">{nights * pricePerNight} <span className="text-sm font-sans font-bold text-sand-gold">MAD</span></p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold opacity-40 uppercase mb-1">Stay Duration</p>
                                        <p className="text-lg font-serif italic">{nights} {isRTL ? 'ليالي' : 'Nights'}</p>
                                    </div>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handlePayment}
                                    className="w-full bg-sand-gold text-jungle-green py-6 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 shadow-xl"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    {isRTL ? 'تأكيد ودفع' : 'Confirm & Pay 100%'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
