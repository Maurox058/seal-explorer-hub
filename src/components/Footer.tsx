import { Waves, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Waves className="h-8 w-8 text-ocean-surface" />
              <span className="font-display font-bold text-xl text-primary-foreground">
                Explorando las Focas
              </span>
            </div>
            <p className="text-primary-foreground/70 mb-4 max-w-md">
              Un proyecto educativo interactivo dedicado a la conservación y 
              comprensión de los pinnípedos más fascinantes del mundo.
            </p>
            <p className="text-sm text-primary-foreground/50 flex items-center gap-1">
              Hecho con <Heart className="h-4 w-4 text-red-400 fill-red-400" /> para los amantes de la naturaleza
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Explorar</h4>
            <ul className="space-y-2">
              {[
                { href: '#about', label: 'Sobre las Focas' },
                { href: '#species', label: 'Especies' },
                { href: '#map', label: 'Mapa de Hábitats' },
                { href: '#compare', label: 'Comparar Especies' },
                { href: '#quiz', label: 'Quiz Educativo' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/70 hover:text-ocean-surface transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Conservation */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Conservación</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>• Protege los océanos</li>
              <li>• Reduce el uso de plásticos</li>
              <li>• Apoya santuarios marinos</li>
              <li>• Educa a otros</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/50">
              © {currentYear} Explorando las Focas. Proyecto educativo sin fines de lucro.
            </p>
            <p className="text-sm text-primary-foreground/50">
              🦭 Protejamos a estos increíbles mamíferos marinos 🌊
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
