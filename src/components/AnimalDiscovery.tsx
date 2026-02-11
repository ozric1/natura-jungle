import { motion } from 'framer-motion';
import { ArrowLeft, Play, Heart, Share2, Volume2 } from 'lucide-react';

interface AnimalDiscoveryProps {
    animal: {
        name: string;
        species: string;
        character: string;
        intelligence: string;
        image: string;
        audioSrc: string;
    };
    onBack: () => void;
    isRTL?: boolean;
}

export const AnimalDiscovery = ({ animal, onBack, isRTL = false }: AnimalDiscoveryProps) => {
    return (
        <div className="min-h-screen bg-egg-shell text-jungle-green font-sans pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Magazine Header Image */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${animal.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-egg-shell via-transparent to-transparent" />

                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="absolute top-8 left-8 w-12 h-12 glass-morphism rounded-full flex items-center justify-center text-white"
                >
                    <ArrowLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                </button>

                <div className="absolute bottom-12 left-8 right-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <span className="text-sand-gold font-bold uppercase tracking-[0.3em] text-xs mb-2 block">
                            {animal.species}
                        </span>
                        <h1 className="text-6xl md:text-8xl font-serif leading-tight">{animal.name}</h1>
                    </motion.div>
                </div>
            </div>

            {/* Magazine Content */}
            <div className="px-8 max-w-4xl mx-auto -mt-4 relative z-10">
                <div className="flex flex-wrap gap-8 mb-16">
                    <div className="flex-1 min-w-[300px] border-l-2 border-sand-gold/20 pl-8 relative">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-sand-gold mb-6 block">The Character</span>
                        <p className="text-2xl font-serif italic leading-relaxed">
                            "{animal.character}"
                        </p>
                    </div>

                    <div className="w-full md:w-64 space-y-8">
                        <div className="flex justify-between border-t border-jungle-green/10 pt-4">
                            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-sand-gold transition-colors">
                                <Volume2 className="w-4 h-4" />
                                {isRTL ? 'دليل صوتي' : 'Audio Guide'}
                            </button>
                            <div className="flex gap-4">
                                <Heart className="w-4 h-4 text-sand-gold" />
                                <Share2 className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fun Facts Section */}
                <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-sand-gold/5 flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-24 h-24 rounded-full bg-sand-gold/10 flex items-center justify-center flex-shrink-0">
                        <Play className="w-10 h-10 text-sand-gold fill-current" />
                    </div>
                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-sand-gold mb-4">The Intelligence</h3>
                        <p className="text-lg leading-relaxed text-jungle-green/70 italic">
                            {animal.intelligence}
                        </p>
                    </div>
                </div>

                {/* Gallery Preview */}
                <div className="mt-20">
                    <h3 className="text-2xl font-serif mb-8">{isRTL ? 'معرض الصور' : 'Species Gallery'}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-48 bg-jungle-green/5 rounded-[2rem] overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1544979592-74892477383a?q=80&w=600" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Detail 1" />
                        </div>
                        <div className="h-48 bg-jungle-green/5 rounded-[2rem] overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Detail 2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
