import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const SeccionInicio = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Bloquear scroll cuando el sobre está cerrado
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, [isOpen]);

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden pt-24">
      {/* Cielo con nubes y abejas volando */}
      <div className="absolute inset-0 bg-gradient-to-b from-plin-celeste via-plin-blanco to-plin-amarillo/20">
        {/* Nubes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-10 opacity-40"
            style={{ left: `${20 + i * 20}%` }}
            animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity }}
          >
            <div className="text-6xl">☁️</div>
          </motion.div>
        ))}
        {/* Flores */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`flower-${i}`}
            className="absolute text-3xl"
            style={{
              bottom: `${5 + (i % 3) * 10}%`,
              left: `${5 + i * 12}%`,
            }}
            animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
          >
            🌻
          </motion.div>
        ))}
      </div>

      {/* Panal decorativo */}
      <div className="absolute top-20 right-10 opacity-20">
        <div className="text-8xl">🍯</div>
      </div>

      {/* Estado Cerrado: Sobre de Abejita */}
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-plin-celeste via-plin-blanco to-plin-amarillo/30 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Partículas de fondo - Abejas y flores */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-40 select-none pointer-events-none"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
                scale: 0
              }}
              animate={{
                y: [null, Math.random() * -100],
                rotate: [0, 360],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              {['🌻', '🌸', '🍯', '✨'][i % 4]}
            </motion.div>
          ))}

          {/* Imagen de Abejita Plin Plin decorativa */}
          <motion.img
            src="/abejita-chiquitita-plim-plim.png"
            alt="Abejita Plin Plin"
            className="absolute top-10 right-10 w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg"
            animate={{ 
              y: [0, -15, 0], 
              rotate: [-5, 5, -5],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/abejita-chiquitita-plim-plim-2.png"
            alt="Abejita Plin Plin"
            className="absolute bottom-20 left-10 w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg"
            animate={{ 
              y: [0, -10, 0], 
              rotate: [5, -5, 5],
              x: [0, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          <motion.div
            className="relative cursor-pointer group perspective-1000"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {/* Sobre CSS - Temática Abejita */}
            <div className="w-80 md:w-96 h-52 md:h-64 bg-plin-amarillo rounded-sm shadow-2xl relative flex items-center justify-center overflow-hidden z-10 transition-shadow group-hover:shadow-[0_20px_50px_rgba(255,217,61,0.5)]">

              {/* Rayas de abejita en el sobre */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-4 bg-plin-negro"
                    style={{ top: `${i * 20}%` }}
                  />
                ))}
              </div>

              {/* Solapa del sobre (Triángulo superior) */}
              <div className="absolute top-0 left-0 w-full h-0 border-l-[160px] md:border-l-[192px] border-r-[160px] md:border-r-[192px] border-t-[100px] md:border-t-[130px] border-l-transparent border-r-transparent border-t-plin-miel z-20 origin-top transform transition-transform duration-500 group-hover:scale-y-90"></div>

              {/* Cuerpo del sobre */}
              <div className="absolute inset-2 bg-plin-blanco z-0"></div>

              {/* Contenido asomándose con patrón hexagonal */}
              <div className="absolute top-4 bg-white w-11/12 h-full z-1 shadow-sm rounded-t-lg transition-transform duration-500 group-hover:-translate-y-6">
                <div className="w-full h-4 bg-gradient-to-r from-plin-amarillo via-plin-miel to-plin-naranja opacity-80"></div>
                <div className="flex justify-center gap-2 mt-2">
                  <span className="text-xl">🌻</span>
                  <span className="text-xl">🍯</span>
                  <span className="text-xl">🌻</span>
                </div>
              </div>

              {/* Bolsillo del sobre */}
              <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] md:border-l-[192px] border-b-[110px] md:border-b-[140px] border-r-[160px] md:border-r-[192px] border-l-plin-miel border-r-plin-miel border-b-plin-naranja border-t-transparent z-30"></div>

              {/* Sello con imagen de Abejita */}
              <div className="absolute z-40 bg-gradient-to-br from-plin-amarillo to-plin-miel w-24 h-24 rounded-full shadow-lg flex items-center justify-center border-4 border-white transform transition-transform group-hover:scale-110 group-hover:rotate-12 overflow-hidden">
                <img 
                  src="/abejita-chiquitita-plim-plim.png" 
                  alt="Abejita" 
                  className="w-20 h-20 object-contain"
                />
              </div>

              {/* Texto "Abrir" flotante */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 group-hover:-translate-y-2">
                <span className="bg-white/90 text-plin-miel px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  ¡Bzzzz Click!
                </span>
              </div>
            </div>

            {/* Texto de instrucción inferior */}
            <div className="mt-12 text-center relative z-50">
              <motion.h3
                className="text-3xl md:text-4xl font-pacifico text-plin-negro mb-2 drop-shadow-sm"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ¡Bzzzz... Tienes una invitación!
              </motion.h3>
              <motion.p
                className="text-lg md:text-xl font-quicksand text-gray-600 font-semibold bg-white/50 inline-block px-6 py-2 rounded-full"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🌻 Toca el sobre para abrir 🌻
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Estado Abierto: Contenido Principal */}
      <div className={`relative z-20 max-w-5xl w-full transition-all duration-1000 ${!isOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isOpen ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', damping: 20, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-xl rounded-[3rem] shadow-2xl border-8 border-plin-amarillo/30 p-6 md:p-12 relative overflow-hidden text-center mx-4"
        >
          {/* Decoraciones flotantes internas */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-plin-amarillo rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-plin-miel rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-plin-verde rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

          {/* Imagen de Abejita principal */}
          <motion.div 
            className="absolute top-4 right-4 md:top-8 md:right-8"
            animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <img 
              src="/abejita-chiquitita-plim-plim.png" 
              alt="Abejita Plin Plin" 
              className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-lg"
            />
          </motion.div>
          <motion.div 
            className="absolute top-4 left-4 md:top-8 md:left-8"
            animate={{ y: [0, -8, 0], rotate: [5, -5, 5] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          >
            <img 
              src="/abejita-chiquitita-plim-plim-2.png" 
              alt="Abejita Plin Plin" 
              className="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-lg"
            />
          </motion.div>

          {/* Encabezado elegante */}
          <div className="relative mb-6 pt-8">
            <motion.span
              className="inline-block text-xl md:text-2xl text-gray-500 font-medium tracking-widest uppercase mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Te invitamos al
            </motion.span>
            <motion.h1
              className="text-6xl md:text-8xl font-pacifico bg-gradient-to-r from-plin-amarillo via-plin-miel to-plin-naranja bg-clip-text text-transparent drop-shadow-sm pb-2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
            >
              1er Añito
            </motion.h1>
            <div className="mt-4 pb-2">
              <span className="text-3xl md:text-4xl text-gray-400 font-quicksand block mb-1">de</span>
              <motion.h2
                className="text-7xl md:text-9xl font-pacifico bg-gradient-to-r from-plin-miel via-plin-amarillo to-plin-naranja bg-clip-text text-transparent drop-shadow-lg p-2 pb-8"
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.8, type: "spring", bounce: 0.6 }}
              >
                Kailany
              </motion.h2>
            </div>
          </div>

          <div className="my-8 flex justify-center items-center">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-plin-amarillo to-transparent"></div>
            <motion.img 
              src="/abejita-chiquitita-plim-plim.png" 
              alt="Abejita" 
              className="mx-4 w-12 h-12 object-contain"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-plin-amarillo to-transparent"></div>
          </div>

          {/* Detalles del Evento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Tarjeta Fecha */}
            <motion.div
              className="bg-plin-amarillo/20 rounded-2xl p-6 flex flex-col items-center justify-center border-2 border-plin-amarillo/50"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <span className="text-4xl mb-2">📅</span>
              <h3 className="text-plin-miel font-bold uppercase text-sm tracking-wider">¿Cuándo?</h3>
              <p className="text-3xl font-bold text-gray-700 font-pacifico mt-1">14 de Marzo</p>
              <p className="text-gray-500 font-semibold">5:00 PM</p>
            </motion.div>

            {/* Tarjeta Lugar */}
            <motion.div
              className="bg-plin-celeste/20 rounded-2xl p-6 flex flex-col items-center justify-center border-2 border-plin-celeste/50"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
            >
              <span className="text-4xl mb-2">📍</span>
              <h3 className="text-plin-celeste font-bold uppercase text-sm tracking-wider">¿Dónde?</h3>
              <p className="text-2xl font-bold text-gray-700 mt-1">Salón de Eventos</p>
              <p className="text-gray-500 text-sm">Ver mapa abajo</p>
            </motion.div>
          </div>

          {/* Frase emotiva */}
          <motion.p
            className="text-gray-500 italic text-lg mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            "Acompáñanos a celebrar un año lleno de amor, dulzura y primeras veces. ¡Tu presencia es el mejor regalo! 🌻"
          </motion.p>

          {/* Flecha para scrollear */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-4 opacity-50 cursor-pointer"
            onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-2 font-quicksand text-plin-miel">Desliza para ver más</p>
            <div className="text-2xl">⬇️</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Jardín en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-plin-verde/30 via-plin-verde/10 to-transparent opacity-50 z-10">
        <div className="flex justify-around items-end h-full pb-4">
          {['🌻', '🌸', '🌺', '🌼', '🌻'].map((flower, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2 + i * 0.2 }}
              className="text-3xl"
            >
              {flower}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeccionInicio;
