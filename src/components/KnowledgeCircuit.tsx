import { motion, AnimatePresence } from 'framer-motion';
import { TreePine, Zap, Info, X } from 'lucide-react';

interface DiscoveryCard {
    id: string;
    name: string;
    personality: string;
    rating: number;
    funFact: string;
    image: string;
}

export const KnowledgeCircuit = () => {
    const activeDiscovery: DiscoveryCard = {
        id: 'wally',
        name: 'Wally the Wallaby',
        personality: 'The shy sunbather',
        rating: 7,
        funFact: 'Wallabies have specially adapted feet that act like springs, allowing them to jump great distances without using much energy!',
        image: 'https://images.unsplash.com/photo-1516233501032-2d03c0defed3?auto=format&fit=crop&q=80&w=800'
    };

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Knowledge Circuit</h2>
                <div className="flex items-center gap-1 text-jungle-sage text-xs font-bold bg-jungle-sage/10 px-3 py-1 rounded-full">
                    <Zap className="w-3 h-3" /> GPS ACTIVE
                </div>
            </div>

            <AnimatePresence>
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="relative rounded-[2.5rem] overflow-hidden bg-jungle-dark shadow-2xl"
                >
                    <img
                        src={activeDiscovery.image}
                        className="w-full h-80 object-cover opacity-70"
                        alt={activeDiscovery.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center gap-2">
                            <TreePine className="w-5 h-5 text-jungle-sage" />
                            <span className="text-white text-xs font-bold uppercase">Mini-Zoo Section</span>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                        <div className="space-y-1">
                            <h3 className="text-3xl font-bold text-white">{activeDiscovery.name}</h3>
                            <p className="text-jungle-sand font-medium italic">{activeDiscovery.personality}</p>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex-1 flex flex-col items-center">
                                <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest mb-1">Intelligence</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-xl font-black text-white">{activeDiscovery.rating}</span>
                                    <span className="text-white/40 text-xs font-bold">/10</span>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex-[2] flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-1">
                                    <Info className="w-3 h-3 text-jungle-sage" />
                                    <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Fun Fact</span>
                                </div>
                                <p className="text-white/80 text-[10px] leading-relaxed line-clamp-2">
                                    {activeDiscovery.funFact}
                                </p>
                            </div>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-jungle-sage text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-jungle-sage/30"
                        >
                            Collect Eco-Badge
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
};
