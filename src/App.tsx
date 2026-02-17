import { useState } from 'react';
import { LanguageSelector } from './components/LanguageSelector';
import { Dashboard } from './components/Dashboard';
import { AnimatePresence, motion } from 'framer-motion';

type Language = 'en' | 'fr' | 'ar';

function App() {
  const [activeLanguage, setActiveLanguage] = useState<Language | null>('fr');
  const [isNightMode, setIsNightMode] = useState(false);

  return (
    <div className={`text-organic ${isNightMode ? 'dark' : ''}`}>
      <AnimatePresence mode="wait">
        {!activeLanguage ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <LanguageSelector onSelect={setActiveLanguage} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard
              language={activeLanguage}
              setLanguage={setActiveLanguage}
              isNightMode={isNightMode}
              toggleNightMode={() => setIsNightMode(!isNightMode)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
