import { useEffect, useState } from 'react';
import SeccionInicio from './components/SeccionInicio';
import Timeline from './components/Timeline';
import Ubicacion from './components/Ubicacion';
import Compartir from './components/Compartir';
import RSVP from './components/RSVP';
import Stepper from './components/Stepper';
import AbejitasVoladoras from './components/AbejitasVoladoras';

function App() {
  const [currentSection, setCurrentSection] = useState('inicio');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  useEffect(() => {
    // Google Analytics ya está configurado en index.html
    if (window.gtag) {
      window.gtag('event', 'app_loaded', {
        event_category: 'engagement',
        event_label: 'invitacion_cumple',
      });
    }
  }, []);

  // Detectar cuando se abre el sobre
  useEffect(() => {
    const checkEnvelope = () => {
      const body = document.body;
      if (body.style.overflow === 'auto') {
        setIsEnvelopeOpen(true);
      }
    };

    const observer = new MutationObserver(checkEnvelope);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen scroll-smooth overflow-x-hidden w-full relative">
      {/* Abejitas voladoras - solo visibles cuando el sobre está abierto */}
      {isEnvelopeOpen && <AbejitasVoladoras />}
      
      <Stepper currentSection={currentSection} onSectionChange={setCurrentSection} />
      <div className="pt-24">
        <SeccionInicio />
        <Timeline />
        <Ubicacion />
        <Compartir />
        <RSVP />
      </div>
    </div>
  );
}

export default App;
