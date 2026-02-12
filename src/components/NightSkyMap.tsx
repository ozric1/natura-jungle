import { motion } from 'framer-motion';
import { Star, X, MapPin, Compass, Search } from 'lucide-react';

interface NightSkyMapProps {
    onClose: () => void;
    isRTL?: boolean;
}

export const NightSkyMap = ({ onClose, isRTL = false }: NightSkyMapProps) => {
    return (
        <div className="fixed inset-0 z-[300] bg-black text-white flex flex-col font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* HUD Header */}
            <div className="px-8 py-10 flex justify-between items-center relative z-20">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md">
                        <Compass className="w-6 h-6 text-indigo-400 animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-xl font-serif text-indigo-100 tracking-wider">
                            {isRTL ? 'سماء منصورية' : 'Mansouria Sky'}
                        </h2>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                            Live AR Orientation
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mt-2"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Interactive Map Area (Simulated) */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                {/* Background Stars Overlay */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                {/* Simulated Constellation SVG */}
                <svg className="w-[120%] h-[120%] absolute pointer-events-none opacity-30" viewBox="0 0 1000 1000">
                    <circle cx="500" cy="500" r="400" stroke="white" strokeWidth="1" fill="none" opacity="0.1" strokeDasharray="5,5" />
                    {/* Ursa Major Simulation */}
                    <path d="M200,300 L300,320 L350,280 L400,350 L450,450 L500,420" stroke="rgba(129, 140, 248, 0.5)" strokeWidth="2" fill="none" />
                    <circle cx="200" cy="300" r="3" fill="white" />
                    <circle cx="300" cy="320" r="4" fill="white" />
                    <circle cx="350" cy="280" r="3" fill="white" />
                    <circle cx="400" cy="350" r="5" fill="white" />
                </svg>

                {/* Main HUD Elements */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 w-full max-w-sm px-8"
                >
                    <div className="glass-dark border-indigo-500/30 rounded-[3rem] p-8 space-y-6 text-center">
                        <Star className="w-10 h-10 text-indigo-300 mx-auto fill-indigo-300/20" />
                        <div>
                            <h3 className="text-2xl font-serif mb-2">{isRTL ? 'الأسد' : 'Leo'}</h3>
                            <p className="text-xs text-white/50 leading-relaxed italic">
                                {isRTL ? 'يلمع في الجنوب، يمثل الشجاعة والقوة.' : 'Currently at 42° elevation. The celestial lion watch over our jungle tonight.'}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                <p className="text-[10px] uppercase tracking-widest text-indigo-400 mb-1">Magnitude</p>
                                <p className="text-lg font-serif">1.35</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                <p className="text-[10px] uppercase tracking-widest text-indigo-400 mb-1">Distance</p>
                                <p className="text-lg font-serif">77 LY</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Controls */}
            <div className="p-8 space-y-4 relative z-20">
                <div className="flex gap-4">
                    <button className="flex-1 py-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-200">
                        <Search className="w-4 h-4" />
                        Find Planet
                    </button>
                    <button className="flex-1 py-5 rounded-2xl bg-indigo-600/40 border border-indigo-400/30 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-100">
                        <MapPin className="w-4 h-4" />
                        View Orbit
                    </button>
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Mansouria Night Observatory</p>
                </div>
            </div>
        </div>
    );
};
