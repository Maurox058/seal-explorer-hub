import { X, MapPin, Ruler, Scale, Heart, AlertTriangle, Lightbulb, Clock } from 'lucide-react';
import { SealSpecies, conservationStatusColors } from '@/data/sealsData';

interface SpeciesDetailProps {
  species: SealSpecies;
  onClose: () => void;
}

const SpeciesDetail = ({ species, onClose }: SpeciesDetailProps) => {
  const statusColors = conservationStatusColors[species.conservationStatus];

  return (
    <div className="animate-scale-in bg-card rounded-3xl shadow-elevated overflow-hidden border border-border">
      <div className="grid lg:grid-cols-2">
        {/* Image Side */}
        <div className="relative h-64 lg:h-auto">
          <img 
            src={species.image} 
            alt={species.spanishName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent lg:bg-gradient-to-r" />
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>

          {/* Name on Image (Mobile) */}
          <div className="absolute bottom-4 left-4 right-4 lg:hidden">
            <h3 className="text-2xl font-display font-bold text-primary-foreground">
              {species.spanishName}
            </h3>
            <p className="text-primary-foreground/80 italic">{species.scientificName}</p>
          </div>
        </div>

        {/* Content Side */}
        <div className="p-6 lg:p-8">
          {/* Header (Desktop) */}
          <div className="hidden lg:block mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-display font-bold text-foreground">
                {species.spanishName}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors.bg} ${statusColors.text}`}>
                {species.conservationLabel}
              </span>
            </div>
            <p className="text-muted-foreground italic">{species.scientificName}</p>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {species.description}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-muted p-3 rounded-xl text-center">
              <Ruler className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-xs text-muted-foreground">Longitud</div>
              <div className="text-sm font-semibold text-foreground">{species.size.length}</div>
            </div>
            <div className="bg-muted p-3 rounded-xl text-center">
              <Scale className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-xs text-muted-foreground">Peso</div>
              <div className="text-sm font-semibold text-foreground">{species.size.weight}</div>
            </div>
            <div className="bg-muted p-3 rounded-xl text-center">
              <Heart className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-xs text-muted-foreground">Población</div>
              <div className="text-sm font-semibold text-foreground">{species.population}</div>
            </div>
            <div className="bg-muted p-3 rounded-xl text-center">
              <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-xs text-muted-foreground">Esperanza</div>
              <div className="text-sm font-semibold text-foreground">{species.lifespan}</div>
            </div>
          </div>

          {/* Regions */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">Distribución</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {species.regions.map((region) => (
                <span 
                  key={region} 
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {region}
                </span>
              ))}
            </div>
          </div>

          {/* Diet */}
          <div className="mb-6">
            <h4 className="font-semibold text-foreground mb-2">🐟 Dieta Principal</h4>
            <div className="flex flex-wrap gap-2">
              {species.diet.map((food) => (
                <span 
                  key={food} 
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {food}
                </span>
              ))}
            </div>
          </div>

          {/* Fun Facts */}
          <div className="mb-6 bg-accent/10 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-accent" />
              <span className="font-semibold text-foreground">¿Sabías que...?</span>
            </div>
            <ul className="space-y-2">
              {species.funFacts.slice(0, 2).map((fact, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-accent">•</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="bg-destructive/10 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span className="font-semibold text-foreground">Amenazas</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {species.threats.map((threat) => (
                <span 
                  key={threat} 
                  className="px-3 py-1 bg-destructive/20 text-destructive rounded-full text-xs"
                >
                  {threat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesDetail;
