import { motion } from 'framer-motion';
import { Utensils, CheckCircle2, Flame, ChefHat, Bell } from 'lucide-react';

interface TagineTrackerProps {
    status: 'received' | 'cooking' | 'plating' | 'ready';
}

export const TagineTracker = ({ status }: TagineTrackerProps) => {
    const steps = [
        { id: 'received', label: 'Order Received', icon: ChefHat },
        { id: 'cooking', label: 'Cooking', icon: Flame },
        { id: 'plating', label: 'Final Plating', icon: Utensils },
        { id: 'ready', label: 'Ready', icon: Bell },
    ];

    const currentIdx = steps.findIndex(s => s.id === status);

    return (
        <div className="jungle-card bg-white shadow-xl shadow-jungle-terracotta/5 border-jungle-terracotta/10">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-xl font-bold text-jungle-dark">Your Lamb Tagine</h3>
                    <p className="text-jungle-terracotta text-sm font-semibold">Cooking in slow heat...</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-jungle-terracotta/10 flex items-center justify-center">
                    <Utensils className="text-jungle-terracotta" />
                </div>
            </div>

            <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-jungle-sand/20 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-jungle-terracotta"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                </div>

                {/* Steps */}
                <div className="relative flex justify-between">
                    {steps.map((step, idx) => {
                        const isCompleted = idx <= currentIdx;
                        const isActive = idx === currentIdx;
                        const Icon = step.icon;

                        return (
                            <div key={step.id} className="flex flex-col items-center">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: isActive ? 1.2 : 1,
                                        backgroundColor: isCompleted ? '#E2725B' : '#F5F5DC',
                                        borderColor: isCompleted ? '#E2725B' : '#E5D3B3'
                                    }}
                                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors relative z-10`}
                                >
                                    {isCompleted && !isActive ? (
                                        <CheckCircle2 className="w-6 h-6 text-white" />
                                    ) : (
                                        <Icon className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-jungle-sage/30'}`} />
                                    )}

                                    {isActive && (
                                        <motion.div
                                            layoutId="active-ring"
                                            className="absolute -inset-2 border-2 border-jungle-terracotta/30 rounded-full"
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                        />
                                    )}
                                </motion.div>
                                <span className={`mt-3 text-[10px] font-bold uppercase tracking-wider ${isCompleted ? 'text-jungle-dark' : 'text-jungle-sage/30'}`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-jungle-sand/10 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-jungle-sage/60 font-medium">Estimated ready in 12 mins</span>
                </div>
                <button className="text-xs font-bold text-jungle-terracotta hover:underline">View Order details</button>
            </div>
        </div>
    );
};
