import { motion, AnimatePresence } from 'framer-motion';
import { Users, Star, ChevronLeft, CheckCircle2, Moon, Sparkles, Calendar as CalendarIcon, Info } from 'lucide-react';
import { useState, useMemo } from 'react';

interface BungalowBookingProps {
    onBack: () => void;
    onPaymentComplete: () => void;
    isRTL?: boolean;
}

export const BungalowBooking = ({ onBack, onPaymentComplete, isRTL = false }: BungalowBookingProps) => {
    const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
    const [selectedDates, setSelectedDates] = useState<number[]>([]);
    const [paymentData, setPaymentData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const pricePerNight = 1000;

    // Simulation of occupancy
    const bookedDates: number[] = useMemo(() => [], []);

    const isDayDisabled = (day: number) => bookedDates.includes(day);

    const toggleDate = (day: number) => {
        if (isDayDisabled(day)) return;
        setSelectedDates(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day].sort((a, b) => a - b)
        );
    };

    const nights = selectedDates.length;

    const handlePayment = () => {
        if (!paymentData.cardName || !paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
            alert(isRTL ? 'يرجى إدخال جميع تفاصيل الدفع' : 'Please enter all payment details');
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
                    {isRTL ? 'الحجز مؤكد!' : 'Booking Confirmed!'}
                </h2>
                <p className="text-sand-gold/60 mb-12 text-sm max-w-xs mx-auto">
                    {isRTL ? 'لقد تم فتح خريطة النجوم المتميزة لك.' : 'Your luxury night sky experience is now unlocked.'}
                </p>
                <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs">
                    <Sparkles className="w-4 h-4" />
                    {isRTL ? 'جاري العودة...' : 'Redirecting...'}
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
                            {isRTL ? 'إقامة فاخرة' : 'Luxury Stay'}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-serif leading-tight">
                            {isRTL ? 'بناغل الغابة الفاخرة' : 'Jungle Horizon Bungalow'}
                        </h1>
                    </div>

                    {/* Features Row */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-4 bg-white rounded-3xl border border-sand-gold/10 text-center shadow-sm">
                            <Users className="w-4 h-4 mx-auto text-sand-gold mb-1" />
                            <p className="text-[8px] font-bold uppercase opacity-60 tracking-tighter">{isRTL ? 'شخصين' : '2 Guests'}</p>
                        </div>
                        <div className="p-4 bg-white rounded-3xl border border-sand-gold/10 text-center shadow-sm">
                            <Moon className="w-4 h-4 mx-auto text-sand-gold mb-1" />
                            <p className="text-[8px] font-bold uppercase opacity-60 tracking-tighter">{isRTL ? 'خاص' : 'Private'}</p>
                        </div>
                        <div className="p-4 bg-white rounded-3xl border border-sand-gold/10 text-center shadow-sm">
                            <Sparkles className="w-4 h-4 mx-auto text-sand-gold mb-1" />
                            <p className="text-[8px] font-bold uppercase opacity-60 tracking-tighter">{isRTL ? 'استجمام' : 'Rest'}</p>
                        </div>
                    </div>

                    {/* Restricted Calendar */}
                    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-sand-gold/10">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-sand-gold" />
                                <h3 className="text-sm font-bold uppercase tracking-widest">{isRTL ? 'اختر التواريخ' : 'Select Dates'}</h3>
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
                                {isRTL
                                    ? 'تم حجز ٧٠٪ من التواريخ لهذا الشهر. احجز مبكراً لتجنب خيبة الأمل.'
                                    : 'High demand for this bungalow. 70% of dates are already booked for this month. Secure yours today!'}
                            </p>
                        </div>
                    </div>

                    <div className="p-6 border-t border-sand-gold/10">
                        <div className="flex justify-between text-xs mb-2">
                            <span className="opacity-60">{isRTL ? 'السعر لليلة' : 'Price per Night'}</span>
                            <span className="font-bold">{pricePerNight} MAD</span>
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
                    {isRTL ? 'إدخال تفاصيل الدفع' : nights === 0 ? 'Select Dates First' : 'Continue to Payment'}
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
                                <h3 className="text-3xl font-serif italic">{isRTL ? 'الدفع الآمن' : 'Guest Checkout'}</h3>
                                <button onClick={() => setStep('details')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">×</button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4 mb-2 block">{isRTL ? 'اسم حامل البطاقة' : 'Cardholder Name'}</label>
                                        <input
                                            type="text"
                                            placeholder="Sarah Mansouria"
                                            className="w-full bg-egg-shell rounded-2xl px-6 py-4 border border-sand-gold/5 focus:border-sand-gold outline-none transition-all font-serif italic"
                                            value={paymentData.cardName}
                                            onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4 mb-2 block">{isRTL ? 'رقم البطاقة' : 'Card Number'}</label>
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
                                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4 mb-2 block">{isRTL ? 'انتهاء الصلاحية' : 'Expiry'}</label>
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
                                    <span className="text-lg font-serif italic opacity-60">Total</span>
                                    <span className="text-2xl font-serif text-sand-gold">{nights * pricePerNight} MAD</span>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handlePayment}
                                    className="w-full bg-jungle-green text-sand-gold py-6 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 shadow-xl"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    {isRTL ? 'تأكيد الحجز' : 'Verify & Book'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
