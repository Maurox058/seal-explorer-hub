import { MapPin, Ruler, Scale } from 'lucide-react';
import { SealSpecies, conservationStatusColors } from '@/data/sealsData';

interface SpeciesCardProps {
  species: SealSpecies;
  onClick: () => void;
  isSelected?: boolean;
}

const SpeciesCard = ({ species, onClick, isSelected }: SpeciesCardProps) => {
  const statusColors = conservationStatusColors[species.conservationStatus];

  return (
    <button
      onClick={onClick}
      className={`group w-full text-left bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={species.image} 
          alt={species.spanishName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        {/* Conservation Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColors.bg} ${statusColors.text}`}>
          {species.conservationStatus}
        </div>

        {/* Name Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-xl font-display font-bold text-primary-foreground mb-1">
            {species.spanishName}
          </h3>
          <p className="text-sm text-primary-foreground/80 italic">
            {species.scientificName}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {species.description}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Ruler className="h-3.5 w-3.5" />
            <span className="truncate">{species.size.length.split(' ')[0]}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Scale className="h-3.5 w-3.5" />
            <span className="truncate">{species.size.weight.split(' ')[0]}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{species.regions[0]}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default SpeciesCard;
