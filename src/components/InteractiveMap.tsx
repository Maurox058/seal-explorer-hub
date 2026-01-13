import { useState } from 'react';
import { MapPin, X, ExternalLink } from 'lucide-react';
import { sealsData, SealSpecies } from '@/data/sealsData';

const InteractiveMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredSpecies, setHoveredSpecies] = useState<SealSpecies | null>(null);

  const regions = [
    { id: 'arctic', name: 'Ártico', x: 50, y: 12, species: ['harp-seal'] },
    { id: 'north-atlantic', name: 'Atlántico Norte', x: 38, y: 28, species: ['grey-seal', 'harp-seal'] },
    { id: 'pacific-north', name: 'Pacífico Norte', x: 15, y: 30, species: ['elephant-seal'] },
    { id: 'mediterranean', name: 'Mediterráneo', x: 52, y: 35, species: ['monk-seal'] },
    { id: 'antarctica', name: 'Antártida', x: 50, y: 88, species: ['leopard-seal'] },
    { id: 'south-atlantic', name: 'Atlántico Sur', x: 35, y: 70, species: ['leopard-seal'] },
    { id: 'africa-west', name: 'África Occidental', x: 45, y: 48, species: ['monk-seal'] },
  ];

  const getSpeciesForRegion = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    if (!region) return [];
    return sealsData.filter(s => region.species.includes(s.id));
  };

  return (
    <section id="map" className="py-20 md:py-32 bg-ocean-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-ocean-surface/20 text-ocean-surface rounded-full text-sm font-medium mb-4">
            Explorar
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
            Mapa de Hábitats
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
            Descubre dónde viven las diferentes especies de focas alrededor del mundo. 
            Haz clic en los marcadores para ver qué especies habitan cada región.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative bg-ocean-mid/50 rounded-3xl p-4 md:p-8 overflow-hidden">
          {/* Simplified World Map SVG */}
          <div className="relative aspect-[2/1] w-full">
            <svg 
              viewBox="0 0 100 50" 
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Ocean Background */}
              <rect width="100" height="50" className="fill-ocean-mid/30" />
              
              {/* Simplified Continents */}
              {/* North America */}
              <path 
                d="M5,10 Q10,8 15,10 L20,15 Q22,20 18,25 L15,30 Q12,28 10,25 L8,20 Q5,15 5,10 Z" 
                className="fill-sand/20 stroke-sand/40"
                strokeWidth="0.3"
              />
              {/* South America */}
              <path 
                d="M18,32 Q22,30 25,35 L28,45 Q25,48 22,45 L18,38 Q16,35 18,32 Z" 
                className="fill-sand/20 stroke-sand/40"
                strokeWidth="0.3"
              />
              {/* Europe */}
              <path 
                d="M45,12 Q50,10 55,12 L58,18 Q55,22 50,20 L45,18 Q43,15 45,12 Z" 
                className="fill-sand/20 stroke-sand/40"
                strokeWidth="0.3"
              />
              {/* Africa */}
              <path 
                d="M45,25 Q52,23 55,28 L58,35 Q55,42 50,45 L45,42 Q42,35 42,30 Q43,26 45,25 Z" 
                className="fill-sand/20 stroke-sand/40"
                strokeWidth="0.3"
              />
              {/* Asia */}
              <path 
                d="M58,10 Q70,8 80,12 L85,18 Q82,25 75,22 L65,20 Q58,18 58,10 Z" 
                className="fill-sand/20 stroke-sand/40"
                strokeWidth="0.3"
              />
              {/* Australia */}
              <path 
                d="M78,35 Q85,33 88,38 L87,43 Q82,45 78,42 Q76,38 78,35 Z" 
                className="fill-sand/20 stroke-sand/40"
                strokeWidth="0.3"
              />
              {/* Antarctica */}
              <path 
                d="M20,47 Q50,45 80,47 L85,50 L15,50 Z" 
                className="fill-ice/30 stroke-ice/50"
                strokeWidth="0.3"
              />

              {/* Grid Lines */}
              {[10, 20, 30, 40].map(y => (
                <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} className="stroke-primary-foreground/10" strokeWidth="0.1" />
              ))}
              {[20, 40, 60, 80].map(x => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="50" className="stroke-primary-foreground/10" strokeWidth="0.1" />
              ))}
            </svg>

            {/* Region Markers */}
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${
                  selectedRegion === region.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
                style={{ left: `${region.x}%`, top: `${region.y}%` }}
              >
                <div className={`relative ${selectedRegion === region.id ? 'animate-pulse' : ''}`}>
                  <div className="absolute inset-0 bg-ocean-surface rounded-full blur-md opacity-50 scale-150" />
                  <div className="relative w-6 h-6 md:w-8 md:h-8 bg-ocean-surface rounded-full flex items-center justify-center shadow-lg border-2 border-primary-foreground/30">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 text-ocean-deep" />
                  </div>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-card px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                    <span className="text-sm font-medium text-foreground">{region.name}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Region Panel */}
          {selectedRegion && (
            <div className="mt-6 bg-card rounded-2xl p-6 animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display font-bold text-foreground">
                  {regions.find(r => r.id === selectedRegion)?.name}
                </h3>
                <button 
                  onClick={() => setSelectedRegion(null)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {getSpeciesForRegion(selectedRegion).map((species) => (
                  <div 
                    key={species.id}
                    className="flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors cursor-pointer"
                    onMouseEnter={() => setHoveredSpecies(species)}
                    onMouseLeave={() => setHoveredSpecies(null)}
                  >
                    <img 
                      src={species.image} 
                      alt={species.spanishName}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{species.spanishName}</h4>
                      <p className="text-sm text-muted-foreground italic">{species.scientificName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
              <div className="w-4 h-4 rounded-full bg-ocean-surface" />
              <span>Hábitat de focas</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
              <div className="w-4 h-4 rounded bg-sand/20 border border-sand/40" />
              <span>Continentes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
              <div className="w-4 h-4 rounded bg-ice/30 border border-ice/50" />
              <span>Zonas polares</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
