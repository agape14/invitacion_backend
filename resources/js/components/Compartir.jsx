import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { useState, useEffect } from 'react';

const Compartir = () => {
    const [copied, setCopied] = useState(false);
    const [url, setUrl] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setUrl(window.location.href.split('?')[0]); // Base URL without params
        const params = new URLSearchParams(window.location.search);
        setIsAdmin(params.get('admin') === 'true');
    }, []);

    if (!isAdmin) return null;

    const invitationText = `¡Hola! 🌟
Te invito a celebrar el *1er Añito de Kailany* 🎂
Será un día lleno de magia, risas y amigos.

📅 *14 de Marzo*
🕔 *5:00 PM*

Mira la invitación completa y confirma tu asistencia aquí:
${url}

¡Te esperamos! 🐝🐸🐰🧸`;

    const handleCopy = () => {
        navigator.clipboard.writeText(invitationText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleWhatsApp = () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(invitationText)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section id="compartir" className="py-20 px-4 bg-white scroll-mt-20">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-plin-amarillo via-plin-miel to-plin-naranja rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border-8 border-white"
                >
                    {/* Background Decorations */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                        {/* QR Column */}
                        <div className="flex flex-col items-center">
                            <div className="bg-white p-4 rounded-xl shadow-lg mb-4 transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="border-2 border-dashed border-gray-200 p-2 rounded-lg">
                                    <QRCode
                                        value={url || 'http://localhost:8000'}
                                        size={200}
                                        fgColor="#FFD93D"
                                        level="M"
                                    />
                                </div>
                            </div>
                            <p className="font-quicksand font-bold text-gray-700 bg-white/50 px-4 py-1 rounded-full text-sm">
                                ¡Escanea para ver! 📱
                            </p>
                        </div>

                        {/* Text/Actions Column */}
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-pacifico text-white drop-shadow-md mb-4">
                                ¡Comparte la Alegría!
                            </h2>
                            <p className="text-gray-700 font-quicksand mb-6 text-lg">
                                Ayúdanos a que nadie falte. Envía esta invitación a tus amigos y familiares con un solo clic.
                            </p>

                            <div className="space-y-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleWhatsApp}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-colors"
                                >
                                    <span className="text-2xl">💬</span>
                                    Enviar por WhatsApp
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCopy}
                                    className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-xl shadow-md border-2 border-gray-100 flex items-center justify-center gap-3 transition-colors"
                                >
                                    <span>{copied ? '✨ ¡Copiado!' : '📋 Copiar Enlace y Texto'}</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Compartir;
