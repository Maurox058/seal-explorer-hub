import { useState } from 'react';
import { ArrowLeftRight, Check, ChevronDown } from 'lucide-react';
import { sealsData, SealSpecies, conservationStatusColors } from '@/data/sealsData';

const CompareSection = () => {
  const [species1, setSpecies1] = useState<SealSpecies | null>(sealsData[0]);
  const [species2, setSpecies2] = useState<SealSpecies | null>(sealsData[2]);
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);

  const comparisonFields = [
    { key: 'size.length', label: 'Longitud', getValue: (s: SealSpecies) => s.size.length },
    { key: 'size.weight', label: 'Peso', getValue: (s: SealSpecies) => s.size.weight },
    { key: 'lifespan', label: 'Esperanza de vida', getValue: (s: SealSpecies) => s.lifespan },
    { key: 'population', label: 'Población estimada', getValue: (s: SealSpecies) => s.population },
    { key: 'conservationStatus', label: 'Estado de conservación', getValue: (s: SealSpecies) => s.conservationLabel },
    { key: 'habitat', label: 'Hábitat', getValue: (s: SealSpecies) => s.habitat },
  ];

  const swapSpecies = () => {
    const temp = species1;
    setSpecies1(species2);
    setSpecies2(temp);
  };

  const SpeciesSelector = ({ 
    selected, 
    onSelect, 
    isOpen, 
    setIsOpen, 
    excludeId 
  }: { 
    selected: SealSpecies | null; 
    onSelect: (s: SealSpecies) => void;
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    excludeId?: string;
  }) => (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <img 
              src={selected.image} 
              alt={selected.spanishName}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="text-left">
              <div className="font-semibold text-foreground">{selected.spanishName}</div>
              <div className="text-sm text-muted-foreground italic">{selected.scientificName}</div>
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground">Seleccionar especie...</span>
        )}
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-elevated z-50 max-h-64 overflow-y-auto">
          {sealsData.filter(s => s.id !== excludeId).map((species) => (
            <button
              key={species.id}
              onClick={() => { onSelect(species); setIsOpen(false); }}
              className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <img 
                src={species.image} 
                alt={species.spanishName}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="text-left flex-1">
                <div className="font-medium text-foreground">{species.spanishName}</div>
                <div className="text-xs text-muted-foreground italic">{species.scientificName}</div>
              </div>
              {selected?.id === species.id && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section id="compare" className="py-20 md:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Analizar
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Comparar Especies
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Selecciona dos especies diferentes para comparar sus características 
            lado a lado y descubrir sus similitudes y diferencias.
          </p>
        </div>

        {/* Species Selectors */}
        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center mb-12">
          <SpeciesSelector 
            selected={species1} 
            onSelect={setSpecies1}
            isOpen={dropdown1Open}
            setIsOpen={setDropdown1Open}
            excludeId={species2?.id}
          />
          
          <button 
            onClick={swapSpecies}
            className="hidden md:flex w-12 h-12 bg-primary/10 rounded-full items-center justify-center hover:bg-primary/20 transition-colors self-center"
            aria-label="Intercambiar especies"
          >
            <ArrowLeftRight className="h-5 w-5 text-primary" />
          </button>
          
          <SpeciesSelector 
            selected={species2} 
            onSelect={setSpecies2}
            isOpen={dropdown2Open}
            setIsOpen={setDropdown2Open}
            excludeId={species1?.id}
          />
        </div>

        {/* Comparison Table */}
        {species1 && species2 && (
          <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border">
            {/* Images Header */}
            <div className="grid grid-cols-[1fr,1fr] border-b border-border">
              <div className="relative h-48 border-r border-border">
                <img 
                  src={species1.image} 
                  alt={species1.spanishName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-display font-bold text-primary-foreground">
                    {species1.spanishName}
                  </h3>
                </div>
              </div>
              <div className="relative h-48">
                <img 
                  src={species2.image} 
                  alt={species2.spanishName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-display font-bold text-primary-foreground">
                    {species2.spanishName}
                  </h3>
                </div>
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-border">
              {comparisonFields.map((field, index) => (
                <div 
                  key={field.key} 
                  className={`grid grid-cols-[1fr,auto,1fr] ${index % 2 === 0 ? 'bg-card' : 'bg-muted/30'}`}
                >
                  <div className="p-4 text-sm text-foreground">
                    {field.getValue(species1)}
                  </div>
                  <div className="p-4 flex items-center justify-center border-x border-border bg-primary/5 min-w-[120px]">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider text-center">
                      {field.label}
                    </span>
                  </div>
                  <div className="p-4 text-sm text-foreground">
                    {field.getValue(species2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Diet Comparison */}
            <div className="grid grid-cols-[1fr,auto,1fr] border-t border-border">
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {species1.diet.map((food) => (
                    <span key={food} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      {food}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 flex items-center justify-center border-x border-border bg-primary/5 min-w-[120px]">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Dieta
                </span>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {species2.diet.map((food) => (
                    <span key={food} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompareSection;
