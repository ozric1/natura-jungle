import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Camera } from 'lucide-react';
import pigsImg from '../assets/park/pigs.jpg';

interface JungleConnectProps {
    isRTL?: boolean;
}

export const JungleConnect = ({ isRTL = false }: JungleConnectProps) => {
    const memories = [
        {
            id: 1,
            user: "Sarah M.",
            image: pigsImg,
            likes: "1.2k"
        },
        {
            id: 2,
            user: "Ahmed K.",
            image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=400",
            likes: "2.4k"
        },
        {
            id: 3,
            user: "Elena G.",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=400",
            likes: "850"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <h2 className="text-2xl font-serif text-jungle-green dark:text-white transition-colors">{isRTL ? 'جنجل كونكت' : 'Jungle Connect'}</h2>
                <div className="flex items-center gap-2 text-sand-gold">
                    <Camera className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                        {isRTL ? 'شارك ذكرياتك' : 'Share Memory'}
                    </span>
                </div>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 pr-6">
                {memories.map((memory) => (
                    <motion.div
                        key={memory.id}
                        whileTap={{ scale: 0.95 }}
                        className="flex-none w-[200px] h-72 rounded-[2rem] relative overflow-hidden shadow-xl"
                    >
                        <img
                            src={memory.image}
                            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            alt={`Memory ${memory.id}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Branded Watermark */}
                        <div className="absolute top-4 right-4">
                            <span className="text-[8px] font-serif text-white/40 uppercase tracking-[0.2em] border border-white/20 px-2 py-1 rounded">
                                Natura
                            </span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                            <span className="text-white text-xs font-bold">{memory.user}</span>
                            <div className="flex justify-between items-center text-white/60">
                                <div className="flex items-center gap-1">
                                    <Heart className="w-3 h-3 text-sand-gold fill-current" />
                                    <span className="text-[10px]">{memory.likes}</span>
                                </div>
                                <div className="flex gap-2">
                                    <MessageCircle className="w-3 h-3" />
                                    <Share2 className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
