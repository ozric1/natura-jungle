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
        <div className="relative min-h-screen w-full overflow-hidden bg-jungle-green font-sans">
            {/* Background Narrative (Video Fallback) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-jungle-green via-jungle-green/40 to-transparent z-10" />
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                    className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544979592-74892477383a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60"
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-20 min-h-screen flex flex-col justify-end p-8 md:p-16 pb-24 md:pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <div className="mb-12">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-sand-gold font-serif italic text-xl md:text-2xl mb-2 tracking-widest uppercase italic"
                        >
                            Natura Jungle
                        </motion.h1>
                        <h2 className="text-white font-serif text-5xl md:text-8xl leading-tight">
                            The Wild <br /> Experience.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {languages.map((lang, index) => (
                            <motion.button
                                key={lang.code}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
                                onClick={() => onSelect(lang.code as any)}
                                className={`glass-morphism h-40 group relative overflow-hidden text-left p-6 transition-all duration-500 hover:bg-white/30 border-white/10 ${lang.dir === 'rtl' ? 'text-right' : 'text-left'}`}
                                dir={lang.dir || 'ltr'}
                            >
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <span className="text-sand-gold/80 text-[10px] uppercase tracking-[0.2em] font-bold">
                                        {lang.name}
                                    </span>
                                    <div>
                                        <p className="text-white text-xl font-serif mb-1">
                                            {lang.label}
                                        </p>
                                        <p className="text-white/60 text-xs tracking-wide">
                                            {lang.sub}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-sand-gold text-2xl">→</span>
                                </div>
                                <motion.div
                                    className="absolute inset-x-0 bottom-0 h-1 bg-sand-gold origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Concierge Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-white/20 relative">
                    <motion.div
                        initial={{ top: 0 }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute w-[1px] h-4 bg-sand-gold"
                    />
                </div>
                <span className="text-white/20 text-[8px] uppercase tracking-[0.4em] font-bold">Scroll to Explore</span>
            </motion.div>
        </div>
    );
};

