import { motion } from 'framer-motion';
import { Utensils, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface VIPOrderTrackerProps {
    status: 'preparing' | 'ready' | 'collected';
    orderId: string;
    items: string[];
    total: string;
    isRTL?: boolean;
    language: 'en' | 'fr' | 'ar';
    onReset?: () => void;
}

export const VIPOrderTracker = ({ status: initialStatus, orderId, items, total, isRTL = false, language, onReset }: VIPOrderTrackerProps) => {
    const [isPaid, setIsPaid] = useState(false);
    const [status, setStatus] = useState(initialStatus);

    const translations = {
        preparing: { en: 'Preparing', fr: 'Préparation', ar: 'تحضير' },
        ready: { en: 'Ready', fr: 'Prêt', ar: 'جاهز' },
        collected: { en: 'Collected', fr: 'Récupéré', ar: 'تم الاستلام' },
        statusText: {
            preparing: { en: 'Your order is being prepared', fr: 'Votre commande est en préparation', ar: 'يتم تحضير طلبك' },
            ready: { en: 'Your order is ready for collection', fr: 'Votre commande est prête', ar: 'طلبك جاهز للاستلام' },
            collected: { en: 'Order Collected', fr: 'Commande Récupérée', ar: 'تم الاستلام' }
        },
        orderRef: { en: 'Order Ref', fr: 'Réf Commande', ar: 'رقم الطلب' },
        totalAmount: { en: 'Total Amount', fr: 'Montant Total', ar: 'المجموع المستحق' },
        confirmWhatsapp: { en: 'Confirm via WhatsApp', fr: 'Confirmer sur WhatsApp', ar: 'تأكيد عبر WhatsApp' },
        paymentAuto: { en: 'Payment confirmation will be sent automatically', fr: 'La confirmation de paiement sera envoyée automatiquement', ar: 'سيتم إرسال إيصال الدفع تلقائياً' },
        verifiedKitchen: { en: 'Verified - Kitchen is live!', fr: 'Vérifié - En cuisine !', ar: 'تم الدفع - المطبخ يعمل!' },
        greatService: { en: 'Great Service!', fr: 'Super Service !', ar: 'خدمة ممتازة' },
        backToPlatform: { en: 'Back to Platform', fr: 'Retour à la plateforme', ar: 'العودة للمنصة' },
        estimatedArrival: { en: 'Estimated Arrival', fr: 'Arrivée Estimée', ar: 'وقت الوصول المتوقع' },
        minutes: { en: 'minutes', fr: 'minutes', ar: 'دقيقة' }
    };

    const steps = [
        { id: 'preparing', label: translations.preparing[language], icon: Utensils },
        { id: 'ready', label: translations.ready[language], icon: CheckCircle2 },
        { id: 'collected', label: translations.collected[language], icon: MessageSquare }
    ];

    const handleWhatsAppPayment = () => {
        const message = `Order Ref: ${orderId}\nItems: ${items.join(', ')}\nTotal: ${total}\nStatus: Payment Requested`;
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/212600000000?text=${encoded}`, '_blank');
        setIsPaid(true);

        // Simulate progress for demo
        setTimeout(() => setStatus('ready'), 3000);
    };

    return (
        <div className="jungle-card bg-pure-nature dark:bg-jungle-deep shadow-2xl border-luxury-gold/10 p-10 relative overflow-hidden rounded-[3rem]">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-luxury-gold/10 overflow-hidden">
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/3 bg-luxury-gold shadow-[0_0_15px_rgba(191,160,90,0.8)]"
                />
            </div>
            <div className={`flex justify-between items-start mb-12 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h3 className="text-3xl font-serif mb-2 text-jungle-deep dark:text-pure-nature leading-tight">{(translations.statusText as any)[status][language]}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold/80">
                        {translations.orderRef[language]}: #{orderId}
                    </p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-luxury-gold text-jungle-deep flex items-center justify-center shadow-lg gold-shadow">
                    <Utensils className="w-8 h-8" />
                </div>
            </div>

            {/* Professional Progress Bar */}
            <div className="mb-14 relative">
                <div className="flex justify-between relative z-10">
                    {steps.map((step, idx) => {
                        const isCompleted = steps.findIndex(s => s.id === status) >= idx;
                        const isCurrent = step.id === status;
                        const StepIcon = step.icon;

                        return (
                            <div key={step.id} className="flex flex-col items-center gap-4">
                                <motion.div
                                    animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 ${isCompleted
                                        ? 'bg-luxury-gold text-jungle-deep shadow-xl shadow-luxury-gold/30'
                                        : 'bg-jungle-leaf/10 dark:bg-white/5 text-jungle-deep/20 dark:text-pure-nature/10'
                                        }`}
                                >
                                    <StepIcon className="w-7 h-7" />
                                </motion.div>
                                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isCompleted ? 'text-luxury-gold' : 'text-jungle-deep/30 dark:text-pure-nature/20'
                                    }`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Connecting Lines */}
                <div className={`absolute top-7 ${isRTL ? 'left-10 right-10' : 'left-10 right-10'} h-0.5 bg-jungle-leaf/10 dark:bg-white/5 -z-0`}>
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: status === 'preparing' ? '0%' : status === 'ready' ? '50%' : '100%' }}
                        className={`h-full bg-luxury-gold shadow-[0_0_15px_rgba(191,160,90,0.6)] ${isRTL ? 'float-right' : 'float-left'}`}
                    />
                </div>
            </div>

            <div className="mt-8 space-y-4 relative z-10">
                <div className="border-t border-jungle-green/10 dark:border-white/10 pt-6 space-y-3">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-jungle-green/40 dark:text-white/40">
                            <span>{item}</span>
                            <span className="text-sand-gold opacity-100">✔</span>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-end pt-2">
                    <span className="text-jungle-green/40 dark:text-white/40 text-[10px] uppercase font-bold tracking-widest">{translations.totalAmount[language]}</span>
                    <span className="text-2xl font-serif text-sand-gold">{total}</span>
                </div>

                {!isPaid ? (
                    <div className="space-y-4">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleWhatsAppPayment}
                            className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-green-500/20"
                        >
                            <MessageSquare className="w-4 h-4 fill-current" />
                            {translations.confirmWhatsapp[language]}
                        </motion.button>
                        <p className="text-[10px] text-center text-jungle-green/40 dark:text-white/30 uppercase tracking-tighter">
                            {translations.paymentAuto[language]}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 py-4 rounded-2xl text-center">
                            <p className="text-[10px] font-bold uppercase tracking-widest">
                                {translations.verifiedKitchen[language]}
                            </p>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onReset?.()}
                            className="w-full bg-sand-gold text-jungle-green py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 gold-shadow"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            {status === 'ready' ? translations.greatService[language] : translations.backToPlatform[language]}
                        </motion.button>
                    </div>
                )}
            </div>

            <div className="mt-8 flex items-center gap-3 p-4 bg-sand-gold/5 rounded-2xl border border-sand-gold/10">
                <Clock className="w-5 h-5 text-sand-gold" />
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sand-gold">{translations.estimatedArrival[language]}</span>
                    <span className="text-xs text-jungle-green/60 dark:text-white/60 font-medium">15 - 20 {translations.minutes[language]}</span>
                </div>
            </div>
        </div>
    );
};
