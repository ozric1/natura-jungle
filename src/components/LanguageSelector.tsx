import { motion } from 'framer-motion';

interface LanguageSelectorProps {
    onSelect: (lang: 'en' | 'fr' | 'ar') => void;
}

export const LanguageSelector = ({ onSelect }: LanguageSelectorProps) => {
    const languages = [
        { code: 'en', name: 'English', label: 'Welcome to Nature', sub: 'The Wild Experience' },
        { code: 'fr', name: 'Français', label: 'Bienvenue au Nature', sub: "L'expérience Sauvage" },
        { code: 'ar', name: 'العربية', label: 'مرحبا بكم في الطبيعة', sub: 'تجربة برية لا تنسى', dir: 'rtl' },
    ];

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black font-sans">
            {/* Immersive Hero Background */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="w-full h-full relative"
                >
                    <img
                        src="/assets/natura/Natura sky view MAIN PAGE BKGRND TWO.jpeg"
                        className="w-full h-full object-cover opacity-80"
                        alt="Natura Jungle Entry"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
                </motion.div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-20 min-h-screen flex flex-col justify-end p-8 md:p-16 pb-24 md:pb-32 max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
                    className="w-full"
                >
                    <div className="mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 1 }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <div className="h-[1px] w-12 bg-luxury-gold/50" />
                            <span className="text-luxury-gold font-bold uppercase tracking-[0.4em] text-[10px]">
                                Premium Nature Sanctuary
                            </span>
                        </motion.div>
                        <h1 className="text-white font-serif text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] font-bold tracking-tighter mb-8 max-w-4xl drop-shadow-2xl">
                            Natura <br />
                            <span className="text-luxury-gold italic">Jungle.</span>
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                            <p className="text-white/40 text-[11px] uppercase tracking-[0.5em] font-bold">
                                Mohammedia • Morocco
                            </p>
                            <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold/30" />
                            <p className="text-white/40 text-[11px] uppercase tracking-[0.5em] font-bold">
                                Est. 2024
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
                        {languages.map((lang, index) => (
                            <motion.button
                                key={lang.code}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 1.8 + index * 0.15,
                                    duration: 1.2,
                                    ease: [0.19, 1, 0.22, 1]
                                }}
                                whileHover={{ y: -12 }}
                                onClick={() => onSelect(lang.code as any)}
                                className="group relative text-left outline-none"
                                dir={lang.dir || 'ltr'}
                            >
                                <div className="h-56 md:h-64 p-10 flex flex-col justify-between transition-all duration-700 bg-black/20 backdrop-blur-md group-hover:bg-black/40 border border-white/10 group-hover:border-luxury-gold/30 relative z-10 shadow-3xl overflow-hidden rounded-[3rem]">
                                    {/* Animated Background Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/0 via-transparent to-luxury-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-center mb-8">
                                            <span className="text-luxury-gold/60 text-[10px] uppercase tracking-[0.4em] font-bold transition-colors group-hover:text-luxury-gold">
                                                {lang.name}
                                            </span>
                                            <div className="w-1 h-1 rounded-full bg-luxury-gold/40 group-hover:w-8 transition-all duration-500" />
                                        </div>
                                        <div className={lang.dir === 'rtl' ? 'text-right' : 'text-left'}>
                                            <p className="text-white text-3xl md:text-4xl font-serif mb-3 leading-tight tracking-tight drop-shadow-lg">
                                                {lang.label}
                                            </p>
                                            <p className="text-white/40 text-[10px] tracking-[0.2em] font-bold uppercase group-hover:text-white/60 transition-colors">
                                                {lang.sub}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`mt-auto flex ${lang.dir === 'rtl' ? 'justify-start' : 'justify-end'} opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0`}>
                                        <div className="w-14 h-14 rounded-2xl bg-luxury-gold text-jungle-deep flex items-center justify-center shadow-xl shadow-luxury-gold/20">
                                            <span className={`text-2xl font-bold ${lang.dir === 'rtl' ? 'rotate-180' : ''}`}>→</span>
                                        </div>
                                    </div>
                                </div>
                                <motion.div
                                    className="absolute -inset-1 rounded-[3.2rem] bg-gradient-to-tr from-luxury-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10"
                                    initial={false}
                                />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Cinematic Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-sand-gold to-transparent relative overflow-hidden">
                    <motion.div
                        initial={{ top: '-100%' }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[1px] h-8 bg-white"
                    />
                </div>
                <span className="text-white/30 text-[9px] uppercase tracking-[0.8em] font-bold">Nature Awaits</span>
            </motion.div>

            {/* Floating Dust Particles (Subtle Texture) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * 100 + '%',
                            y: Math.random() * 100 + '%',
                            opacity: 0,
                            scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                            y: [null, '-20%', '120%'],
                            opacity: [0, 0.3, 0],
                            x: (Math.random() - 0.5) * 20 + '%'
                        }}
                        transition={{
                            duration: 15 + Math.random() * 25,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "linear"
                        }}
                        className="absolute w-1.5 h-1.5 bg-luxury-gold/15 rounded-full blur-[2px]"
                    />
                ))}
            </div>
        </div>
    );
};

