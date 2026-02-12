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
        <div className="jungle-card bg-white dark:bg-ink-black/80 shadow-2xl border-sand-gold/10 p-8 relative overflow-hidden">
            <div className="flex justify-between items-start mb-10">
                <div className="flex-1">
                    <h3 className="text-2xl font-serif mb-1 dark:text-white">{statusText[status]}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-sand-gold/60">
                        {isRTL ? 'رقم الطلب' : 'Order Ref'}: #{orderId}
                    </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-sand-gold/10 flex items-center justify-center text-sand-gold">
                    <Utensils className="w-7 h-7" />
                </div>
            </div>

            {/* Professional Progress Bar */}
            <div className="mb-12 relative">
                <div className="flex justify-between relative z-10">
                    {steps.map((step, idx) => {
                        const isCompleted = steps.findIndex(s => s.id === status) >= idx;
                        const isCurrent = step.id === status;
                        const StepIcon = step.icon;

                        return (
                            <div key={step.id} className="flex flex-col items-center gap-3">
                                <motion.div
                                    animate={isCurrent ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                                    transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0, repeatDelay: 2 }}
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isCompleted
                                        ? 'bg-sand-gold text-jungle-green shadow-lg shadow-sand-gold/20'
                                        : 'bg-jungle-green/5 dark:bg-white/5 text-jungle-green/20 dark:text-white/10'
                                        }`}
                                >
                                    <StepIcon className="w-6 h-6" />
                                </motion.div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${isCompleted ? 'text-sand-gold' : 'text-jungle-green/20 dark:text-white/10'
                                    }`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Connecting Lines */}
                <div className="absolute top-6 left-8 right-8 h-[2px] bg-jungle-green/5 dark:bg-white/5 -z-0">
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: status === 'preparing' ? '0%' : status === 'ready' ? '50%' : '100%' }}
                        className="h-full bg-sand-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]"
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
