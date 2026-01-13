import { ChevronDown, Waves } from 'lucide-react';
import heroImage from '@/assets/hero-seal.jpg';

const HeroSection = () => {
  const scrollToContent = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean-mid/60 to-ocean-deep/90" />
      </div>

      {/* Animated Wave Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg 
          className="absolute bottom-0 w-full h-24 animate-wave" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z" 
            className="fill-background/30"
          />
        </svg>
        <svg 
          className="absolute bottom-0 w-full h-20 animate-wave-slow" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ animationDelay: '-2s' }}
        >
          <path 
            d="M0,80 C300,40 600,100 900,60 C1050,40 1150,80 1200,70 L1200,120 L0,120 Z" 
            className="fill-background/50"
          />
        </svg>
        <svg 
          className="absolute bottom-0 w-full h-16" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,90 C150,70 350,100 500,85 C650,70 800,100 1000,80 C1100,70 1150,85 1200,80 L1200,120 L0,120 Z" 
            className="fill-background"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6 animate-fade-up">
          <Waves className="h-8 w-8 text-ocean-surface" />
          <span className="text-ocean-surface font-medium tracking-widest uppercase text-sm">
            Descubre el Mundo Marino
          </span>
          <Waves className="h-8 w-8 text-ocean-surface" />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground mb-6 animate-fade-up leading-tight">
          Explorando las
          <span className="block text-gradient-ocean drop-shadow-lg">Focas</span>
        </h1>

        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-12 animate-fade-up font-light leading-relaxed" style={{ animationDelay: '0.2s' }}>
          Un viaje interactivo por los océanos del mundo para conocer a estos fascinantes mamíferos marinos, su biología, comportamiento y los desafíos que enfrentan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={scrollToContent}
            className="group px-8 py-4 bg-primary-foreground text-ocean-deep rounded-full font-semibold text-lg shadow-elevated hover:shadow-card transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            Comenzar Exploración
            <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
          </button>
          <a 
            href="#species"
            className="px-8 py-4 border-2 border-primary-foreground/50 text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary-foreground/10 transition-all duration-300"
          >
            Ver Especies
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-up" style={{ animationDelay: '0.6s' }}>
          {[
            { number: '33', label: 'Especies' },
            { number: '7', label: 'Continentes' },
            { number: '50M', label: 'Individuos' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-primary-foreground/70 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8 text-primary-foreground/70" />
      </button>
    </section>
  );
};

export default HeroSection;
