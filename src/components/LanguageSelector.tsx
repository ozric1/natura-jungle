import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
    onSelect: (lang: 'en' | 'fr' | 'ar') => void;
}

export const LanguageSelector = ({ onSelect }: LanguageSelectorProps) => {
    const languages = [
        { code: 'en', name: 'English', label: 'Welcome' },
        { code: 'fr', name: 'Français', label: 'Bienvenue' },
        { code: 'ar', name: 'العربية', label: 'أهلاً بك' },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-jungle-light">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md text-center"
            >
                <div className="mb-8 flex justify-center">
                    <div className="bg-jungle-sage/10 p-6 rounded-full">
                        <Globe className="w-16 h-16 text-jungle-sage animate-pulse" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold mb-2 text-jungle-dark">Natura Jungle</h1>
                <p className="text-jungle-sage/60 mb-12">Select your preferred language</p>

                <div className="space-y-4">
                    {languages.map((lang, index) => (
                        <motion.button
                            key={lang.code}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            onClick={() => onSelect(lang.code as any)}
                            className="w-full p-6 text-left jungle-card hover:border-jungle-sage transition-all group flex justify-between items-center"
                        >
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-jungle-sage/40 block mb-1">
                                    {lang.name}
                                </span>
                                <span className="text-xl font-semibold text-jungle-dark group-hover:text-jungle-sage transition-colors">
                                    {lang.label}
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-jungle-sand/20 flex items-center justify-center group-hover:bg-jungle-sage group-hover:text-white transition-all">
                                →
                            </div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
