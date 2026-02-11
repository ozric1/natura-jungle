import { motion } from 'framer-motion';
import { Home, Tent, Calendar as CalendarIcon, ChevronRight } from 'lucide-react';

export const SmartBooking = () => {
    const options = [
        { id: 'bungalow', title: 'Luxury Bungalow', price: '1,200', icon: Home, color: 'bg-jungle-sage/10 text-jungle-sage' },
        { id: 'tent', title: 'Berber Tent', price: '650', icon: Tent, color: 'bg-jungle-terracotta/10 text-jungle-terracotta' },
    ];

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center px-2">
                <h2 className="text-lg font-bold">Smart Booking</h2>
                <button className="text-jungle-sage text-sm font-bold flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" /> Availability
                </button>
            </div>

            <div className="space-y-3">
                {options.map((opt) => (
                    <motion.div
                        key={opt.id}
                        whileHover={{ x: 5 }}
                        className="jungle-card flex items-center gap-4 bg-white p-4 cursor-pointer"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${opt.color} flex items-center justify-center`}>
                            <opt.icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-jungle-dark">{opt.title}</h3>
                            <p className="text-xs text-jungle-sage/60">From MAD {opt.price} / night</p>
                        </div>
                        <ChevronRight className="text-jungle-sand" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
