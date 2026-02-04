import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import axios from 'axios';

const RSVP = () => {
  const [formData, setFormData] = useState({
    nombres_completos: '',
    cantidad_adultos: 1,
    cantidad_ninos: '',
    cantidad_ninas: '',
    edades_ninos: [],
    edades_ninas: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // API base URL - en monolito usamos rutas relativas
  const API_URL = '/api/v1';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const initEdad = () => ({ valor: 0, unidad: 'años' });

  const handleEdadNino = (index, value) => {
    setFormData((prev) => {
      const edades = prev.edades_ninos || [];
      const nuevasEdades = [...edades];
      const actual = nuevasEdades[index] || initEdad();
      nuevasEdades[index] = { ...actual, valor: value === '' ? '' : (parseInt(value, 10) || 0) };
      return { ...prev, edades_ninos: nuevasEdades };
    });
  };

  const handleUnidadEdadNino = (index, unidad) => {
    setFormData((prev) => {
      const edades = prev.edades_ninos || [];
      const nuevasEdades = [...edades];
      const actual = nuevasEdades[index] || initEdad();
      nuevasEdades[index] = { ...actual, unidad: unidad === 'meses' ? 'meses' : 'años' };
      return { ...prev, edades_ninos: nuevasEdades };
    });
  };

  const handleEdadNina = (index, value) => {
    setFormData((prev) => {
      const edades = prev.edades_ninas || [];
      const nuevasEdades = [...edades];
      const actual = nuevasEdades[index] || initEdad();
      nuevasEdades[index] = { ...actual, valor: value === '' ? '' : (parseInt(value, 10) || 0) };
      return { ...prev, edades_ninas: nuevasEdades };
    });
  };

  const handleUnidadEdadNina = (index, unidad) => {
    setFormData((prev) => {
      const edades = prev.edades_ninas || [];
      const nuevasEdades = [...edades];
      const actual = nuevasEdades[index] || initEdad();
      nuevasEdades[index] = { ...actual, unidad: unidad === 'meses' ? 'meses' : 'años' };
      return { ...prev, edades_ninas: nuevasEdades };
    });
  };

  const handleCantidadNinos = (e) => {
    if (e.target.name !== 'cantidad_ninos') return;
    const raw = String(e.target.value).replace(/\D/g, '').slice(0, 3); // solo dígitos, máx 3
    const cantidad = raw === '' ? '' : Math.min(99, parseInt(raw, 10) || 0);
    const n = cantidad === '' ? 0 : cantidad;
    setFormData((prev) => {
      if (raw === '' && prev.cantidad_ninos !== '' && (prev.edades_ninos || []).length > 0) {
        return prev;
      }
      const currentEdades = prev.edades_ninos || [];
      const sameLength = currentEdades.length === n;
      const newEdades =
        n === 0
          ? []
          : sameLength && n > 0
            ? currentEdades
            : Array(n)
                .fill(null)
                .map((_, i) => currentEdades[i] || initEdad());
      return { ...prev, cantidad_ninos: cantidad, edades_ninos: newEdades };
    });
  };

  const handleCantidadNinas = (e) => {
    if (e.target.name !== 'cantidad_ninas') return;
    const raw = String(e.target.value).replace(/\D/g, '').slice(0, 3);
    const cantidad = raw === '' ? '' : Math.min(99, parseInt(raw, 10) || 0);
    const n = cantidad === '' ? 0 : cantidad;
    setFormData((prev) => {
      if (raw === '' && prev.cantidad_ninas !== '' && (prev.edades_ninas || []).length > 0) {
        return prev;
      }
      const currentEdades = prev.edades_ninas || [];
      const sameLength = currentEdades.length === n;
      const newEdades =
        n === 0
          ? []
          : sameLength && n > 0
            ? currentEdades
            : Array(n)
                .fill(null)
                .map((_, i) => currentEdades[i] || initEdad());
      return { ...prev, cantidad_ninas: cantidad, edades_ninas: newEdades };
    });
  };

  const handleCantidadAdultos = (e) => {
    const raw = e.target.value;
    const valor = raw === '' ? '' : Math.max(1, parseInt(raw) || 1);
    setFormData((prev) => ({
      ...prev,
      cantidad_adultos: valor,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const cantAdultos = formData.cantidad_adultos === '' ? 1 : parseInt(formData.cantidad_adultos, 10) || 1;
      const cantNinos = formData.cantidad_ninos === '' ? 0 : parseInt(formData.cantidad_ninos, 10) || 0;
      const cantNinas = formData.cantidad_ninas === '' ? 0 : parseInt(formData.cantidad_ninas, 10) || 0;
      const toEdadObj = (item) => {
        if (!item || typeof item !== 'object') return { valor: 0, unidad: 'años' };
        const v = item.valor;
        const valor = v === '' || v === undefined ? 0 : (typeof v === 'number' ? v : parseInt(v, 10) || 0);
        return { valor, unidad: item.unidad === 'meses' ? 'meses' : 'años' };
      };
      const edadesNinos = Array.from({ length: cantNinos }, (_, i) => toEdadObj((formData.edades_ninos || [])[i]));
      const edadesNinas = Array.from({ length: cantNinas }, (_, i) => toEdadObj((formData.edades_ninas || [])[i]));
      const response = await axios.post(`${API_URL}/invitados`, {
        nombres_completos: formData.nombres_completos,
        cantidad_adultos: Math.max(1, cantAdultos),
        cantidad_ninos: Math.max(0, cantNinos),
        cantidad_ninas: Math.max(0, cantNinas),
        edades_ninos: edadesNinos,
        edades_ninas: edadesNinas,
      });

      if (response.data.success) {
        setSuccess(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        // Reset form
        setFormData({
          nombres_completos: '',
          cantidad_adultos: 1,
          cantidad_ninos: '',
          cantidad_ninas: '',
          edades_ninos: [],
          edades_ninas: [],
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Error al enviar la confirmación. Por favor, intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-plin-blanco scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl text-center mb-4 font-pacifico"
          style={{
            background: 'linear-gradient(135deg, #FFD93D, #F5A623, #FF9800)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Confirma tu Asistencia
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 mb-12 text-lg"
        >
          ¡Queremos celebrar contigo! 🐝
        </motion.p>

        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            colors={['#FFD93D', '#F5A623', '#FF9800', '#7CB342', '#FF8FAB']}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-plin-amarillo/50 relative overflow-hidden"
        >
          {/* Decoraciones de esquina - Panal */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-plin-amarillo to-transparent opacity-20 rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-plin-miel to-transparent opacity-20 rounded-tl-full"></div>

          {/* Abejitas decorativas */}
          <div className="absolute top-4 right-4 text-3xl animate-bounce">🐝</div>
          <div className="absolute bottom-4 left-4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🐝</div>

          <div className="flex justify-center -mt-16 mb-6">
            <div className="bg-white p-4 rounded-full shadow-lg border-4 border-plin-amarillo">
              <span className="text-5xl">🐝</span>
            </div>
          </div>
          {success ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl text-plin-miel mb-4 font-pacifico">
                ¡Confirmación Exitosa!
              </h3>
              <p className="text-gray-600 text-lg">
                Te esperamos en la celebración. ¡Nos vemos pronto!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nombres Completos *
                </label>
                <input
                  type="text"
                  name="nombres_completos"
                  value={formData.nombres_completos}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-plin-amarillo/50 focus:border-plin-miel focus:outline-none"
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Cantidad de Adultos (incluyéndote) *
                </label>
                <input
                  type="number"
                  name="cantidad_adultos"
                  value={formData.cantidad_adultos}
                  onChange={handleCantidadAdultos}
                  min="1"
                  className="w-full px-4 py-3 rounded-lg border-2 border-plin-amarillo/50 focus:border-plin-miel focus:outline-none"
                  placeholder="Ej: 1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Cantidad de Niños (masculino)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  name="cantidad_ninos"
                  value={formData.cantidad_ninos}
                  onChange={handleCantidadNinos}
                  className="w-full px-4 py-3 rounded-lg border-2 border-plin-amarillo/50 focus:border-plin-miel focus:outline-none"
                  placeholder="0"
                />
              </div>

              {(formData.cantidad_ninos !== '' && Number(formData.cantidad_ninos) > 0) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3"
                >
                  <label className="block text-gray-700 font-semibold mb-2">
                    Edades de los Niños
                  </label>
                  {Array.from({ length: Number(formData.cantidad_ninos) }).map((_, index) => {
                    const item = formData.edades_ninos[index] || { valor: 0, unidad: 'años' };
                    const valor = item.valor ?? '';
                    const unidad = item.unidad || 'años';
                    const maxVal = unidad === 'meses' ? 36 : 18;
                    return (
                      <div key={`nino-${index}`} className="flex flex-wrap items-end gap-2">
                        <div className="flex-1 min-w-[80px]">
                          <label className="block text-gray-600 text-sm mb-1">
                            Edad del niño {index + 1}
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={valor}
                              onChange={(e) => handleEdadNino(index, e.target.value)}
                              min="0"
                              max={maxVal}
                              className="flex-1 px-4 py-2 rounded-lg border-2 border-plin-amarillo/50 focus:border-plin-miel focus:outline-none"
                              placeholder="0"
                            />
                            <select
                              value={unidad}
                              onChange={(e) => handleUnidadEdadNino(index, e.target.value)}
                              className="px-3 py-2 rounded-lg border-2 border-plin-amarillo/50 focus:border-plin-miel focus:outline-none bg-white min-w-[100px]"
                            >
                              <option value="meses">mes(es)</option>
                              <option value="años">año(s)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Cantidad de Niñas (femenino)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  name="cantidad_ninas"
                  value={formData.cantidad_ninas}
                  onChange={handleCantidadNinas}
                  className="w-full px-4 py-3 rounded-lg border-2 border-plin-amarillo/50 focus:border-plin-miel focus:outline-none"
                  placeholder="0"
                />
              </div>

              {(formData.cantidad_ninas !== '' && Number(formData.cantidad_ninas) > 0) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3"
                >
                  <label className="block text-gray-700 font-semibold mb-2">
                    Edades de las Niñas
                  </label>
                  {Array.from({ length: Number(formData.cantidad_ninas) }).map((_, index) => {
                    const item = formData.edades_ninas[index] || { valor: 0, unidad: 'años' };
                    const valor = item.valor ?? '';
                    const unidad = item.unidad || 'años';
                    const maxVal = unidad === 'meses' ? 36 : 18;
                    return (
                      <div key={`nina-${index}`} className="flex flex-wrap items-end gap-2">
                        <div className="flex-1 min-w-[80px]">
                          <label className="block text-gray-600 text-sm mb-1">
                            Edad de la niña {index + 1}
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={valor}
                              onChange={(e) => handleEdadNina(index, e.target.value)}
                              min="0"
                              max={maxVal}
                              className="flex-1 px-4 py-2 rounded-lg border-2 border-plin-amarillo/50 focus:border-plin-miel focus:outline-none"
                              placeholder="0"
                            />
                            <select
                              value={unidad}
                              onChange={(e) => handleUnidadEdadNina(index, e.target.value)}
                              className="px-3 py-2 rounded-lg border-2 border-plin-amarillo/50 focus:border-plin-miel focus:outline-none bg-white min-w-[100px]"
                            >
                              <option value="meses">mes(es)</option>
                              <option value="años">año(s)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className="w-full bg-gradient-to-r from-plin-amarillo via-plin-miel to-plin-naranja text-gray-800 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white"
              >
                {loading ? 'Enviando...' : '¡Sí, Confirmar! 🐝'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;
