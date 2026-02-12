import { motion } from 'framer-motion';
import pondHero from '../assets/park/pond.jpg';

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
                    animate={{ scale: 1.05, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    className="w-full h-full relative"
                >
                    <img
                        src={pondHero}
                        className="w-full h-full object-cover"
                        alt="Natura Jungle Pond"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] z-10" />
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
                    <div className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, letterSpacing: '0.5em' }}
                            animate={{ opacity: 1, letterSpacing: '0.8em' }}
                            transition={{ duration: 2, delay: 1 }}
                            className="text-sand-gold font-serif italic text-sm md:text-lg mb-4 uppercase font-bold text-shadow-lg"
                        >
                            Natura Jungle Park
                        </motion.div>
                        <h1 className="text-white font-serif text-6xl md:text-9xl leading-[0.9] font-bold tracking-tighter mb-4 drop-shadow-2xl">
                            The Wild <br />
                            <span className="text-sand-gold italic">Experience.</span>
                        </h1>
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.6em] font-bold mt-4">
                            Premium Nature Sanctuary • Mohammedia
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                        {languages.map((lang, index) => (
                            <motion.button
                                key={lang.code}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 1.5 + index * 0.15,
                                    duration: 1.2,
                                    ease: [0.19, 1, 0.22, 1]
                                }}
                                whileHover={{ y: -10 }}
                                onClick={() => onSelect(lang.code as any)}
                                className="group relative text-left outline-none"
                                dir={lang.dir || 'ltr'}
                            >
                                <div className="glass-morphism h-48 md:h-56 p-8 flex flex-col justify-between transition-all duration-700 bg-white/5 group-hover:bg-white/10 border-white/5 group-hover:border-sand-gold/30 relative z-10 shadow-2xl overflow-hidden rounded-[2rem]">
                                    {/* Animated Background Pulse */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-sand-gold/0 to-sand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    <div className="relative z-10">
                                        <span className="text-sand-gold/60 text-[10px] uppercase tracking-[0.3em] font-bold block mb-6 transition-colors group-hover:text-sand-gold">
                                            {lang.name}
                                        </span>
                                        <div className={lang.dir === 'rtl' ? 'text-right' : 'text-left'}>
                                            <p className="text-white text-2xl md:text-3xl font-serif mb-2 leading-tight">
                                                {lang.label}
                                            </p>
                                            <p className="text-white/40 text-[11px] tracking-widest font-medium uppercase group-hover:text-white/60 transition-colors">
                                                {lang.sub}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`mt-auto flex ${lang.dir === 'rtl' ? 'justify-start' : 'justify-end'} opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0`}>
                                        <div className="w-10 h-10 rounded-full bg-sand-gold flex items-center justify-center text-black">
                                            <span className={`text-xl font-bold ${lang.dir === 'rtl' ? 'rotate-180' : ''}`}>→</span>
                                        </div>
                                    </div>
                                </div>
                                <motion.div
                                    className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-tr from-sand-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-md -z-10"
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
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * 100 + '%',
                            y: Math.random() * 100 + '%',
                            opacity: 0
                        }}
                        animate={{
                            y: [null, '-20%', '120%'],
                            opacity: [0, 0.4, 0]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            delay: Math.random() * 10
                        }}
                        className="absolute w-1 h-1 bg-sand-gold/20 rounded-full blur-[1px]"
                    />
                ))}
            </div>
        </div>
    );
};

