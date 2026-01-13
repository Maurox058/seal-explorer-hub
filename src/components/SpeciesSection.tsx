import { useState } from 'react';
import { sealsData } from '@/data/sealsData';
import SpeciesCard from './SpeciesCard';
import SpeciesDetail from './SpeciesDetail';

const SpeciesSection = () => {
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);

  const handleSelectSpecies = (id: string) => {
    setSelectedSpecies(selectedSpecies === id ? null : id);
  };

  const selectedSeal = sealsData.find(s => s.id === selectedSpecies);

  return (
    <section id="species" className="py-20 md:py-32 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
            Directorio
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Especies de Focas
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explora las diferentes especies de focas que habitan nuestros océanos. 
            Haz clic en cualquier tarjeta para descubrir más información detallada.
          </p>
        </div>

        {/* Species Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {sealsData.map((species) => (
            <SpeciesCard
              key={species.id}
              species={species}
              onClick={() => handleSelectSpecies(species.id)}
              isSelected={selectedSpecies === species.id}
            />
          ))}
        </div>

        {/* Species Detail Panel */}
        {selectedSeal && (
          <SpeciesDetail 
            species={selectedSeal} 
            onClose={() => setSelectedSpecies(null)} 
          />
        )}
      </div>
    </section>
  );
};

export default SpeciesSection;
