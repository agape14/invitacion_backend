import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const AbejitasVoladoras = () => {
  const { scrollYProgress } = useScroll();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Detectar scroll y manejar visibilidad
  useEffect(() => {
    const handleScroll = () => {
      // Mostrar abejitas cuando hay scroll
      setIsVisible(true);

      // Limpiar timeout anterior
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      // Ocultar después de 4 segundos sin scroll
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Mostrar inicialmente por 2 segundos
    setIsVisible(true);
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // Zona segura lateral (máximo 80px desde el borde)
  const leftZone = 60;
  const rightZone = windowSize.width - 80;

  // Abejita 1 - Lado izquierdo
  const bee1X = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [20, 50, 30, 60, 25]);
  const bee1Y = useTransform(scrollYProgress, [0, 1], [150, windowSize.height * 3]);
  const bee1Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 15, -10]);

  // Abejita 2 - Lado derecho
  const bee2X = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    [rightZone, rightZone - 30, rightZone, rightZone - 40, rightZone - 10, rightZone]
  );
  const bee2Y = useTransform(scrollYProgress, [0, 1], [200, windowSize.height * 3.5]);
  const bee2Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [10, -15, 10]);

  // Abejita 3 - Lado izquierdo inferior
  const bee3X = useTransform(scrollYProgress, [0, 0.5, 1], [40, 70, 35]);
  const bee3Y = useTransform(scrollYProgress, [0, 1], [400, windowSize.height * 4]);
  const bee3Rotate = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -20, 10, -15, 5]);

  // Abejita 4 - Lado derecho
  const bee4X = useTransform(scrollYProgress, [0, 0.5, 1], [rightZone - 20, rightZone, rightZone - 30]);
  const bee4Y = useTransform(scrollYProgress, [0, 1], [350, windowSize.height * 3.2]);
  const bee4Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 20, -10]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Abejita 1 - Izquierda */}
          <motion.div
            className="absolute"
            style={{ 
              x: bee1X, 
              y: bee1Y,
              rotate: bee1Rotate,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src="/abejita-chiquitita-plim-plim.png"
              alt="Abejita volando"
              className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-lg"
              animate={{
                y: [0, -6, 0, 6, 0],
                scale: [1, 1.05, 1, 0.95, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="absolute -right-2 top-1/2 text-sm opacity-50"
              animate={{ opacity: [0.3, 0.6, 0.3], x: [-5, 0, -5] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </motion.div>

          {/* Abejita 2 - Derecha */}
          <motion.div
            className="absolute"
            style={{ 
              x: bee2X, 
              y: bee2Y,
              rotate: bee2Rotate,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, x: 50 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <motion.img
              src="/abejita-chiquitita-plim-plim-2.png"
              alt="Abejita volando"
              className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-lg"
              animate={{
                y: [0, 5, 0, -5, 0],
                scale: [1, 0.95, 1, 1.05, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
            <motion.span
              className="absolute -left-2 top-1/2 text-sm opacity-40"
              animate={{ opacity: [0.2, 0.5, 0.2], x: [5, 0, 5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🌸
            </motion.span>
          </motion.div>

          {/* Abejita 3 - Izquierda inferior */}
          <motion.div
            className="absolute hidden md:block"
            style={{ 
              x: bee3X, 
              y: bee3Y,
              rotate: bee3Rotate,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, x: -30 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.img
              src="/abejita-chiquitita-plim-plim.png"
              alt="Abejita volando"
              className="w-10 h-10 object-contain drop-shadow-md"
              animate={{
                y: [0, -8, 0, 8, 0],
                x: [0, 3, 0, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            />
          </motion.div>

          {/* Abejita 4 - Derecha */}
          <motion.div
            className="absolute hidden lg:block"
            style={{ 
              x: bee4X, 
              y: bee4Y,
              rotate: bee4Rotate,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.75, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, x: 30 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <motion.img
              src="/abejita-chiquitita-plim-plim-2.png"
              alt="Abejita volando"
              className="w-11 h-11 object-contain drop-shadow-md"
              animate={{
                y: [0, -5, 0, 5, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              }}
            />
          </motion.div>

          {/* Girasoles decorativos */}
          <motion.div 
            className="absolute left-2 top-1/4 text-2xl opacity-30"
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 0.3, rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
            exit={{ opacity: 0, rotate: 20 }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌻
          </motion.div>
          <motion.div 
            className="absolute right-2 top-2/3 text-2xl opacity-30"
            initial={{ opacity: 0, rotate: 20 }}
            animate={{ opacity: 0.3, rotate: [5, -5, 5], scale: [1, 1.1, 1] }}
            exit={{ opacity: 0, rotate: -20 }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
          >
            🌻
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AbejitasVoladoras;
