import { BookOpen, Heart, Dna, Shield } from 'lucide-react';
import { generalSealInfo } from '@/data/sealsData';

const AboutSection = () => {
  const features = [
    {
      icon: Dna,
      title: 'Biología Fascinante',
      description: 'Adaptaciones únicas para la vida acuática, desde aletas especializadas hasta sistemas de buceo avanzados.',
    },
    {
      icon: Heart,
      title: 'Comportamiento Social',
      description: 'Desde focas solitarias hasta colonias de miles, cada especie tiene patrones sociales únicos.',
    },
    {
      icon: Shield,
      title: 'Conservación Urgente',
      description: 'Muchas especies enfrentan amenazas críticas que requieren acción inmediata para su protección.',
    },
    {
      icon: BookOpen,
      title: 'Historia Evolutiva',
      description: '35 millones de años de evolución han creado estas maravillas de adaptación marina.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Descubre
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            El Mundo de las Focas
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Las focas son mamíferos marinos pertenecientes a la familia Phocidae, conocidas como "focas verdaderas". 
            Habitan en todos los océanos del mundo, desde las aguas heladas del Ártico hasta las costas templadas del Mediterráneo.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-6 bg-card rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Info Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Evolution */}
          <div className="bg-gradient-to-br from-ocean-deep to-ocean-mid p-8 rounded-3xl text-primary-foreground">
            <h3 className="text-2xl font-display font-bold mb-4">
              {generalSealInfo.evolution.title}
            </h3>
            <p className="text-primary-foreground/90 mb-6 leading-relaxed">
              {generalSealInfo.evolution.content}
            </p>
            <div className="space-y-3">
              {generalSealInfo.evolution.timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-ocean-surface mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-ocean-surface">{item.period}:</span>
                    <span className="text-primary-foreground/80 ml-2">{item.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Biology */}
          <div className="bg-card p-8 rounded-3xl shadow-card border border-border">
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">
              {generalSealInfo.biology.title}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {generalSealInfo.biology.content}
            </p>
            <div className="space-y-3">
              {generalSealInfo.biology.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conservation */}
          <div className="bg-secondary p-8 rounded-3xl">
            <h3 className="text-2xl font-display font-bold text-secondary-foreground mb-4">
              {generalSealInfo.conservation.title}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {generalSealInfo.conservation.content}
            </p>
            <div className="space-y-3">
              {generalSealInfo.conservation.challenges.map((challenge, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border"
                >
                  <div className="w-2 h-2 rounded-full bg-destructive flex-shrink-0" />
                  <span className="text-foreground text-sm">{challenge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
