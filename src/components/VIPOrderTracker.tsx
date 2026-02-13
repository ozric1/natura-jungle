import { motion } from 'framer-motion';
import { Utensils, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface VIPOrderTrackerProps {
    status: 'preparing' | 'ready' | 'collected';
    orderId: string;
    items: string[];
    total: string;
    isRTL?: boolean;
    onReset?: () => void;
}

export const VIPOrderTracker = ({ status: initialStatus, orderId, items, total, isRTL = false, onReset }: VIPOrderTrackerProps) => {
    const [isPaid, setIsPaid] = useState(false);
    const [status, setStatus] = useState(initialStatus);

    const steps = [
        { id: 'preparing', label: isRTL ? 'تحضير' : 'Preparing', icon: Utensils },
        { id: 'ready', label: isRTL ? 'جاهز' : 'Ready', icon: CheckCircle2 },
        { id: 'collected', label: isRTL ? 'تم الاستلام' : 'Collected', icon: MessageSquare }
    ];

    const handleWhatsAppPayment = () => {
        const message = `Order Ref: ${orderId}\nItems: ${items.join(', ')}\nTotal: ${total}\nStatus: Payment Requested`;
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/212600000000?text=${encoded}`, '_blank');
        setIsPaid(true);

        // Simulate progress for demo
        setTimeout(() => setStatus('ready'), 3000);
    };

    const statusText = {
        preparing: isRTL ? 'يتم تحضير طلبك' : 'Your order is being prepared',
        ready: isRTL ? 'طلبك جاهز للاستلام' : 'Your order is ready for collection',
        collected: isRTL ? 'تم الاستلام' : 'Order Collected'
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
                    <h3 className="text-3xl font-serif mb-2 text-jungle-deep dark:text-pure-nature leading-tight">{statusText[status]}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold/80">
                        {isRTL ? 'رقم الطلب' : 'Order Ref'}: #{orderId}
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
                    <span className="text-jungle-green/40 dark:text-white/40 text-[10px] uppercase font-bold tracking-widest">{isRTL ? 'المجموع المستحق' : 'Total Amount'}</span>
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
                            {isRTL ? 'تأكيد عبر WhatsApp' : 'Confirm via WhatsApp'}
                        </motion.button>
                        <p className="text-[10px] text-center text-jungle-green/40 dark:text-white/30 uppercase tracking-tighter">
                            {isRTL ? 'سيتم إرسال إيصال الدفع تلقائياً' : 'Payment confirmation will be sent automatically'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 py-4 rounded-2xl text-center">
                            <p className="text-[10px] font-bold uppercase tracking-widest">
                                {isRTL ? 'تم الدفع - المطبخ يعمل!' : 'Verified - Kitchen is live!'}
                            </p>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onReset?.()}
                            className="w-full bg-sand-gold text-jungle-green py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 gold-shadow"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            {status === 'ready' ? (isRTL ? 'خدمة ممتازة' : 'Great Service!') : (isRTL ? 'العودة للمنصة' : 'Back to Platform')}
                        </motion.button>
                    </div>
                )}
            </div>

            <div className="mt-8 flex items-center gap-3 p-4 bg-sand-gold/5 rounded-2xl border border-sand-gold/10">
                <Clock className="w-5 h-5 text-sand-gold" />
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sand-gold">{isRTL ? 'وقت الوصول المتوقع' : 'Estimated Arrival'}</span>
                    <span className="text-xs text-jungle-green/60 dark:text-white/60 font-medium">15 - 20 {isRTL ? 'دقيقة' : 'minutes'}</span>
                </div>
            </div>
        </div>
    );
};
