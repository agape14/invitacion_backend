import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const Timeline = () => {
  const [visibleMonths, setVisibleMonths] = useState(new Set());
  const [selectedImage, setSelectedImage] = useState(null);
  const monthRefs = useRef([]);

  // Tema único de Abejita Plin Plin
  const themeColors = [
    { bg: 'bg-plin-amarillo/20', border: 'border-plin-amarillo', text: 'text-plin-miel', shadow: 'shadow-yellow-200' },
    { bg: 'bg-plin-miel/20', border: 'border-plin-miel', text: 'text-plin-naranja', shadow: 'shadow-orange-200' },
    { bg: 'bg-plin-naranja/15', border: 'border-plin-naranja', text: 'text-plin-miel', shadow: 'shadow-amber-200' },
    { bg: 'bg-plin-amarillo/25', border: 'border-plin-amarillo', text: 'text-plin-naranja', shadow: 'shadow-yellow-200' },
  ];

  const meses = [
    { numero: 0, nombre: 'Nacimiento', descripcion: 'Nuestro primer encuentro 💕' },
    { numero: 1, nombre: 'Mes 1', descripcion: 'Primeros días mágicos 🌟' },
    { numero: 2, nombre: 'Mes 2', descripcion: 'Creciendo día a día 🌻' },
    { numero: 3, nombre: 'Mes 3', descripcion: 'Sonrisas y descubrimientos 😄' },
    { numero: 4, nombre: 'Mes 4', descripcion: 'Explorando el mundo 🍯' },
    { numero: 5, nombre: 'Mes 5', descripcion: 'Más independencia 🦋' },
    { numero: 6, nombre: 'Mes 6', descripcion: 'Medio año de dulzura 🌸' },
    { numero: 7, nombre: 'Mes 7', descripcion: 'Nuevos logros 🏆' },
    { numero: 8, nombre: 'Mes 8', descripcion: 'Cada vez más activa ✨' },
    { numero: 9, nombre: 'Mes 9', descripcion: 'Personalidad única 💛' },
    { numero: 10, nombre: 'Mes 10', descripcion: '¡Ya casi un año! 🎉' },
    { numero: 11, nombre: 'Mes 11', descripcion: 'Próximamente... 📸' },
  ];

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsAdmin(params.get('admin') === 'true');
  }, []);

  // Bloquear scroll cuando se ve una foto ampliada
  useEffect(() => {
    if (selectedImage) {
      // Prevenir scroll con eventos
      const preventScroll = (e) => {
        e.preventDefault();
      };

      // Bloquear wheel y touch
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });

      // Agregar clase al body
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('wheel', preventScroll);
        document.removeEventListener('touchmove', preventScroll);
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      };
    }
  }, [selectedImage]);

  useEffect(() => {
    const observers = monthRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleMonths((prev) => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const handleImageUpload = (mesIndex, event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(`Imagen cargada para mes ${mesIndex}:`, e.target.result);
        alert("¡Foto cargada localmente! (Simulación)");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="timeline" className="min-h-screen py-24 px-4 bg-gradient-to-b from-plin-blanco to-white scroll-mt-20 relative overflow-hidden">
      {/* Patrón hexagonal de fondo */}
      <div className="absolute inset-0 opacity-5 honeycomb-pattern"></div>

      {/* Imagen de abejita decorativa */}
      <motion.img
        src="/abejita-chiquitita-plim-plim.png"
        alt="Abejita"
        className="absolute top-20 left-10 w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg opacity-70"
        animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.img
        src="/abejita-chiquitita-plim-plim-2.png"
        alt="Abejita"
        className="absolute top-40 right-10 w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-lg opacity-60"
        animate={{ y: [0, -15, 0], x: [0, -10, 0], rotate: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header Decorativo */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-plin-amarillo rounded-full blur-3xl -z-10 opacity-50"
          ></motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl text-center mb-2 font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-plin-amarillo via-plin-miel to-plin-naranja drop-shadow-sm"
          >
            Un Año de Dulzura
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '200px' }}
            viewport={{ once: true }}
            className="h-2 bg-plin-amarillo mx-auto rounded-full mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 text-xl font-quicksand font-semibold"
          >
            Acompáñanos a recordar cada mes de amor 🌻
          </motion.p>
        </div>

        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 md:before:ml-[50%] before:-translate-x-px md:before:mx-auto md:before:w-1 before:w-1.5 before:bg-gradient-to-b before:from-plin-amarillo before:via-plin-miel before:to-plin-naranja before:rounded-full">
          {meses.map((mes, index) => {
            const isVisible = visibleMonths.has(index);
            const theme = themeColors[index % themeColors.length];
            const isPending = mes.numero === 11;
            const imageSrc = `/fotos_meses/mes_${mes.numero}.jpg`;

            return (
              <motion.div
                key={index}
                ref={(el) => (monthRefs.current[index] = el)}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${isPending ? 'opacity-90' : ''}`}
              >

                {/* Icono Central - Abejita o girasol */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-white ${theme.bg} shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-2xl absolute left-0 md:static transform transition-transform group-hover:scale-110`}>
                  {index % 2 === 0 ? '🌻' : '🍯'}
                </div>

                {/* Card de Contenido */}
                <div className={`w-[calc(100%-4rem)] md:w-[45%] ml-16 md:ml-0 p-6 rounded-[2rem] border-2 shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-xl ${theme.bg} ${theme.border} ${theme.shadow} bg-opacity-40 backdrop-blur-sm`}>
                  <div className="flex flex-col md:flex-row gap-5 items-center">
                    {/* Marco de foto */}
                    <div className="relative flex-shrink-0 group-image">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-white flex items-center justify-center relative">
                        {isPending ? (
                          <div className="flex flex-col items-center justify-center text-gray-400 bg-plin-blanco w-full h-full">
                            <span className="text-3xl animate-bounce">⏳</span>
                            <span className="text-xs text-center mt-2 font-bold">Pronto</span>
                          </div>
                        ) : (
                          <div className="relative w-full h-full select-none" style={{ WebkitUserDrag: 'none', userSelect: 'none' }}>
                            <img
                              src={imageSrc}
                              alt={`Mes ${mes.numero}`}
                              draggable={false}
                              onContextMenu={(e) => e.preventDefault()}
                              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                              style={{ WebkitUserDrag: 'none' }}
                              onClick={() => setSelectedImage(imageSrc)}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="hidden absolute inset-0 flex-col items-center justify-center bg-plin-blanco text-gray-400 pointer-events-none">
                              <span className="text-4xl">📷</span>
                            </div>

                            <div
                              className="absolute inset-0 bg-black/30 opacity-0 group-image-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                              onClick={() => setSelectedImage(imageSrc)}
                            >
                              <span className="text-white text-2xl">🔍</span>
                            </div>

                            {isAdmin && (
                              <label className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-gray-100 z-20">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(index, e)}
                                  className="hidden"
                                />
                                <span className="text-sm">✏️</span>
                              </label>
                            )}
                          </div>
                        )}
                      </div>
                      {/* Badge del mes */}
                      <div className="absolute -top-3 -left-3 bg-plin-amarillo text-plin-negro font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-lg border-2 border-white z-20 text-lg">
                        {mes.numero}
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h3 className={`text-2xl ${theme.text} font-bold font-pacifico mb-2`}>{mes.nombre}</h3>
                      <p className="text-gray-700 font-quicksand font-medium leading-relaxed">
                        {mes.descripcion}
                      </p>
                      {isPending && (
                        <div className="mt-3 inline-block px-4 py-1 rounded-full bg-white/60 text-xs font-bold text-gray-500 border border-plin-amarillo/50">
                          🌻 Sorpresa en camino
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Final - Solo con abejitas */}
        <div className="text-center mt-20">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl inline-block drop-shadow-lg"
          >
            🎂
          </motion.div>
          <p className="font-pacifico text-3xl text-plin-miel mt-6 drop-shadow-md">¡Listos para el gran día!</p>
          <div className="flex justify-center gap-4 mt-4">
            <motion.img
              src="/abejita-chiquitita-plim-plim.png"
              alt="Abejita"
              className="w-12 h-12 object-contain"
              animate={{ y: [0, -5, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-3xl">🌻</span>
            <motion.img
              src="/abejita-chiquitita-plim-plim-2.png"
              alt="Abejita"
              className="w-12 h-12 object-contain"
              animate={{ y: [0, -5, 0], rotate: [5, -5, 5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Lightbox / Modal de Imagen */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 cursor-pointer select-none"
            style={{ WebkitUserDrag: 'none', userSelect: 'none' }}
            onClick={() => setSelectedImage(null)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Recuerdo Ampliado"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="max-w-full max-h-full md:max-h-[90vh] rounded-lg shadow-2xl object-contain"
                style={{ objectFit: 'contain', WebkitUserDrag: 'none', userSelect: 'none' }}
              />
              <button
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white bg-plin-amarillo/50 hover:bg-plin-amarillo/80 rounded-full p-3 transition-colors backdrop-blur-sm"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Timeline;
