import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface VIPOrderTrackerProps {
    status: 'preparing' | 'ready' | 'collected';
    orderId: string;
    items: string[];
    total: string;
    isRTL?: boolean;
}

export const VIPOrderTracker = ({ status, orderId, items, total, isRTL = false }: VIPOrderTrackerProps) => {
    const [isPaid, setIsPaid] = useState(false);

    const handleWhatsAppPayment = () => {
        const message = `Order Ref: ${orderId}\nItems: ${items.join(', ')}\nTotal: ${total}\nStatus: Payment Requested`;
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/212600000000?text=${encoded}`, '_blank');
        setIsPaid(true);
    };

    const statusText = {
        preparing: isRTL ? 'يتم تحضير طلبك' : 'Your order is being prepared',
        ready: isRTL ? 'طلبك جاهز للاستلام' : 'Your order is ready for collection',
        collected: isRTL ? 'تم الاستلام' : 'Order Collected'
    };

    return (
        <div className="jungle-card bg-white shadow-2xl border-sand-gold/10 p-8 relative overflow-hidden">
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h3 className="text-2xl font-serif mb-1">{statusText[status]}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-sand-gold/60">
                        Ref: {orderId}
                    </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-sand-gold/10 flex items-center justify-center text-sand-gold">
                    <Utensils className="w-7 h-7" />
                </div>
            </div>

            {/* Tea Glass Loader / Progress */}
            <div className="flex justify-center py-8">
                <div className="relative w-24 h-32 border-4 border-jungle-green/20 rounded-b-3xl rounded-t-lg overflow-hidden glass-morphism">
                    {/* Tea Level */}
                    <motion.div
                        initial={{ height: '0%' }}
                        animate={{ height: status === 'preparing' ? '60%' : '100%' }}
                        transition={{ duration: 2 }}
                        className="absolute bottom-0 left-0 right-0 bg-sand-gold/60"
                        style={{ background: 'linear-gradient(to top, #C5A059, #E5D3B3)' }}
                    />

                    {/* Steam Bubbles */}
                    {status === 'preparing' && (
                        <AnimatePresence>
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 20, opacity: 0, x: i * 10 }}
                                    animate={{ y: -40, opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                    className="absolute bottom-0 w-2 h-2 bg-white/40 rounded-full"
                                />
                            ))}
                        </AnimatePresence>
                    )}

                    {status === 'ready' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <CheckCircle2 className="w-12 h-12 text-jungle-green/40" />
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-jungle-green/40 font-medium">{isRTL ? 'قائمة الطلبات' : 'Menu Summary'}</span>
                    <span className="font-bold">{total}</span>
                </div>

                {!isPaid ? (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleWhatsAppPayment}
                        className="w-full bg-sand-gold text-jungle-green py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 gold-shadow"
                    >
                        <MessageSquare className="w-4 h-4" />
                        {isRTL ? 'الدفع عبر واتساب' : 'Pay & Confirm via WhatsApp'}
                    </motion.button>
                ) : (
                    <div className="w-full bg-emerald-500/10 text-emerald-600 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 border border-emerald-500/20">
                        <CheckCircle2 className="w-4 h-4" />
                        {isRTL ? 'تم تأكيد الدفع' : 'Payment Confirmed'}
                    </div>
                )}
            </div>

            <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-jungle-green/30">
                <Clock className="w-3 h-3" />
                <span>{isRTL ? 'الاستلام عندLounger' : 'Estimated delivery to your lounger'}</span>
            </div>
        </div>
    );
};
