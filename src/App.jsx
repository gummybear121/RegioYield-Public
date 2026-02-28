import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Pools from './pages/Pools';
import Analysis from './pages/Analysis';
import Portfolio from './pages/Portfolio';
import VaultDetail from './pages/VaultDetail';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Landing /></motion.div>} />
        <Route path="/app" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Dashboard /></motion.div>} />
        <Route path="/pools" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Pools /></motion.div>} />
        <Route path="/analysis" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Analysis /></motion.div>} />
        <Route path="/portfolio" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Portfolio /></motion.div>} />
        <Route path="/vault/:poolId" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><VaultDetail /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
