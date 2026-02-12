import { motion, AnimatePresence } from 'framer-motion';
import { Users, Star, ChevronLeft, CreditCard, CheckCircle2, Moon, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface BungalowBookingProps {
    onBack: () => void;
    onPaymentComplete: () => void;
    isRTL?: boolean;
}

export const BungalowBooking = ({ onBack, onPaymentComplete, isRTL = false }: BungalowBookingProps) => {
    const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
    const [nights, setNights] = useState(1);
    const pricePerNight = 1000;

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
        <div className="min-h-screen bg-egg-shell text-jungle-green pb-20 overflow-y-auto" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Gallery Header */}
            <div className="relative h-[40vh] w-full overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Bungalow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-egg-shell via-transparent to-black/30" />

                <button
                    onClick={onBack}
                    className="absolute top-8 left-8 w-12 h-12 glass-morphism rounded-full flex items-center justify-center text-white z-10"
                >
                    <ChevronLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                </button>

                <div className="absolute bottom-8 left-8 flex items-center gap-2 glass-morphism px-4 py-2 rounded-full border border-white/20">
                    <Star className="w-4 h-4 text-sand-gold fill-sand-gold" />
                    <span className="text-white text-xs font-bold">4.9 (124 reviews)</span>
                </div>
            </div>

            <div className="px-8 mt-10 space-y-8 max-w-2xl mx-auto">
                <div>
                    <span className="text-sand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">
                        {isRTL ? 'إقامة فاخرة' : 'Luxury Stay'}
                    </span>
                    <h1 className="text-4xl font-serif">{isRTL ? 'بناغل الغابة الفاخرة' : 'Jungle Horizon Bungalow'}</h1>
                    <p className="mt-4 text-jungle-green/60 leading-relaxed italic">
                        {isRTL ? 'استمتع بليلة هندية ساحرة تحت سماء منصورية الصافية.' : 'A premium retreat designed for deep immersion into the North African night sky.'}
                    </p>
                </div>

                {/* Features */}
                <div className="flex justify-between p-6 bg-white rounded-[2rem] border border-sand-gold/10">
                    <div className="text-center space-y-1">
                        <Users className="w-5 h-5 mx-auto text-sand-gold" />
                        <p className="text-[10px] font-bold uppercase">{isRTL ? 'شخصين' : '2 Guests'}</p>
                    </div>
                    <div className="text-center space-y-1">
                        <Moon className="w-5 h-5 mx-auto text-sand-gold" />
                        <p className="text-[10px] font-bold uppercase">{isRTL ? 'ليلة واحدة' : '1 Night'}</p>
                    </div>
                    <div className="text-center space-y-1">
                        <Sparkles className="w-5 h-5 mx-auto text-sand-gold" />
                        <p className="text-[10px] font-bold uppercase">{isRTL ? 'خاص' : 'Private'}</p>
                    </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1 bg-white p-6 rounded-[2rem] border border-sand-gold/10">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-sand-gold block mb-2">{isRTL ? 'عدد الليالي' : 'Nights'}</label>
                            <div className="flex items-center justify-between">
                                <button onClick={() => setNights(Math.max(1, nights - 1))} className="w-8 h-8 rounded-full border border-jungle-green/10 flex items-center justify-center">-</button>
                                <span className="text-xl font-serif">{nights}</span>
                                <button onClick={() => setNights(nights + 1)} className="w-8 h-8 rounded-full border border-jungle-green/10 flex items-center justify-center">+</button>
                            </div>
                        </div>
                        <div className="flex-1 bg-white p-6 rounded-[2rem] border border-sand-gold/10 flex flex-col justify-center">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-sand-gold block mb-2">{isRTL ? 'السعر الكلي' : 'Total'}</label>
                            <span className="text-2xl font-serif text-jungle-green">{nights * pricePerNight} MAD</span>
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep('payment')}
                        className="w-full bg-jungle-green text-white py-6 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-xs shadow-xl"
                    >
                        {isRTL ? 'احجز الآن' : 'Reserve Now'}
                    </motion.button>
                </div>
            </div>

            {/* Payment Modal Overlay */}
            <AnimatePresence>
                {step === 'payment' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-end justify-center"
                    >
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            className="w-full bg-white rounded-t-[3rem] p-10 pb-16 max-w-xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-serif">{isRTL ? 'الدفع الآمن' : 'Secure Payment'}</h3>
                                <button onClick={() => setStep('details')} className="text-xs font-bold uppercase opacity-40">Cancel</button>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-egg-shell p-6 rounded-[2rem] flex items-center gap-4">
                                    <CreditCard className="w-6 h-6 text-sand-gold" />
                                    <div className="flex-1">
                                        <p className="text-xs font-bold opacity-40 uppercase">Card Number</p>
                                        <p className="text-sm font-serif">•••• •••• •••• 4242</p>
                                    </div>
                                </div>

                                <div className="flex justify-between border-t border-jungle-green/5 pt-6">
                                    <span className="font-serif italic text-jungle-green/60">Total to pay</span>
                                    <span className="text-xl font-serif text-sand-gold">{nights * pricePerNight} MAD</span>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handlePayment}
                                    className="w-full bg-sand-gold text-jungle-green py-6 rounded-3xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    {isRTL ? 'إتمام الحجز' : 'Confirm & Pay'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
