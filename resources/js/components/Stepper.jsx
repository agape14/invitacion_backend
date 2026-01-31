import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Stepper = ({ currentSection, onSectionChange }) => {
  const sections = [
    { id: 'inicio', label: 'Inicio', icon: '🐝' },
    { id: 'timeline', label: 'Recuerdos', icon: '🌻' },
    { id: 'ubicacion', label: 'Ubicación', icon: '🍯' },
    { id: 'rsvp', label: 'Confirmar', icon: '💛' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Altura del stepper
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      onSectionChange(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'timeline', 'ubicacion', 'rsvp'];
      const scrollPosition = window.scrollY + 150; // Offset para detectar sección

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            onSectionChange(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Llamar una vez al cargar
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onSectionChange]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-plin-blanco via-white to-plin-blanco backdrop-blur-lg shadow-md border-b-2 border-plin-amarillo/30"
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between relative">
          {/* Línea de progreso */}
          <div className="absolute top-6 left-12 right-12 h-1 bg-plin-amarillo/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-plin-amarillo to-plin-miel rounded-full"
              initial={{ width: '0%' }}
              animate={{
                width: `${((sections.findIndex(s => s.id === currentSection) + 1) / sections.length) * 100}%`
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {sections.map((section, index) => {
            const isActive = currentSection === section.id;
            const isCompleted = sections.findIndex(s => s.id === currentSection) > index;

            return (
              <div key={section.id} className="flex flex-col items-center flex-1 relative z-10">
                <motion.button
                  onClick={() => scrollToSection(section.id)}
                  className="flex flex-col items-center w-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-plin-amarillo to-plin-miel text-white shadow-xl scale-110'
                        : isCompleted
                        ? 'bg-plin-verde/20 text-plin-verde shadow-md'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                    animate={
                      isActive
                        ? {
                            scale: [1, 1.15, 1],
                            boxShadow: [
                              '0 4px 6px rgba(0,0,0,0.1)',
                              '0 8px 16px rgba(255,217,61,0.4)',
                              '0 4px 6px rgba(0,0,0,0.1)',
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isCompleted && !isActive ? (
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        ✓
                      </motion.span>
                    ) : (
                      section.icon
                    )}
                  </motion.div>
                  <motion.span
                    className={`text-xs font-bold transition-colors ${
                      isActive
                        ? 'text-plin-miel'
                        : isCompleted
                        ? 'text-plin-verde'
                        : 'text-gray-500'
                    }`}
                    animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {section.label}
                  </motion.span>
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Stepper;
