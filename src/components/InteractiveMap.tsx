import { useState } from 'react';
import { MapPin, X, ExternalLink } from 'lucide-react';
import { sealsData, SealSpecies } from '@/data/sealsData';

const InteractiveMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredSpecies, setHoveredSpecies] = useState<SealSpecies | null>(null);

  const regions = [
    { id: 'arctic', name: 'Ártico', x: 45, y: 8, species: ['harp-seal'] },
    { id: 'north-atlantic', name: 'Atlántico Norte', x: 35, y: 24, species: ['grey-seal', 'harp-seal'] },
    { id: 'pacific-north', name: 'Pacífico Norte', x: 12, y: 28, species: ['elephant-seal'] },
    { id: 'mediterranean', name: 'Mediterráneo', x: 50, y: 32, species: ['monk-seal'] },
    { id: 'antarctica', name: 'Antártida', x: 50, y: 94, species: ['leopard-seal'] },
    { id: 'south-atlantic', name: 'Atlántico Sur', x: 28, y: 72, species: ['leopard-seal'] },
    { id: 'africa-west', name: 'África Occidental', x: 44, y: 52, species: ['monk-seal'] },
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
        <div className="relative bg-gradient-to-b from-ocean-deep via-ocean-mid to-ocean-deep rounded-3xl p-4 md:p-8 overflow-hidden shadow-2xl border border-ocean-surface/20">
          {/* Detailed World Map SVG */}
          <div className="relative aspect-[2/1] w-full">
            <svg 
              viewBox="0 0 1000 500" 
              className="w-full h-full drop-shadow-lg"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Defs for gradients and filters */}
              <defs>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(200, 80%, 25%)" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="hsl(200, 70%, 35%)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(200, 80%, 25%)" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="continentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(140, 40%, 45%)" />
                  <stop offset="100%" stopColor="hsl(140, 35%, 35%)" />
                </linearGradient>
                <linearGradient id="iceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(200, 30%, 95%)" />
                  <stop offset="100%" stopColor="hsl(200, 40%, 85%)" />
                </linearGradient>
                <filter id="continentShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.3"/>
                </filter>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Ocean Background */}
              <rect width="1000" height="500" fill="url(#oceanGradient)" />
              
              {/* Grid Lines - Latitude */}
              {[100, 150, 200, 250, 300, 350, 400].map(y => (
                <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="10,10" />
              ))}
              {/* Grid Lines - Longitude */}
              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(x => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="10,10" />
              ))}

              {/* North America - More detailed shape */}
              <path 
                d="M50,80 L80,60 L120,50 L180,55 L220,70 L250,60 L280,75 L270,95 L250,110 L260,130 L250,160 L230,180 L210,200 L190,220 L170,240 L155,250 L145,270 L130,290 L135,310 L155,320 L165,330 L150,340 L125,330 L110,310 L95,290 L85,260 L75,230 L60,200 L50,170 L45,140 L50,110 L45,90 Z" 
                fill="url(#continentGradient)"
                stroke="hsl(140, 30%, 25%)"
                strokeWidth="2"
                filter="url(#continentShadow)"
                className="hover:brightness-110 transition-all duration-300"
              />
              {/* Greenland */}
              <path 
                d="M320,50 L370,45 L400,55 L410,80 L395,110 L360,120 L330,105 L315,75 Z" 
                fill="url(#iceGradient)"
                stroke="hsl(200, 30%, 70%)"
                strokeWidth="1.5"
                filter="url(#continentShadow)"
              />

              {/* South America */}
              <path 
                d="M170,310 L200,295 L230,300 L260,310 L280,340 L290,380 L285,420 L270,455 L245,480 L215,475 L190,450 L175,410 L165,370 L160,340 Z" 
                fill="url(#continentGradient)"
                stroke="hsl(140, 30%, 25%)"
                strokeWidth="2"
                filter="url(#continentShadow)"
                className="hover:brightness-110 transition-all duration-300"
              />
              
              {/* Europe */}
              <path 
                d="M450,90 L480,85 L510,95 L540,90 L560,100 L555,125 L540,140 L520,145 L500,155 L480,150 L465,160 L450,155 L440,140 L445,115 Z" 
                fill="url(#continentGradient)"
                stroke="hsl(140, 30%, 25%)"
                strokeWidth="2"
                filter="url(#continentShadow)"
                className="hover:brightness-110 transition-all duration-300"
              />
              {/* UK and Ireland */}
              <path 
                d="M420,105 L440,100 L445,115 L435,125 L420,120 Z" 
                fill="url(#continentGradient)"
                stroke="hsl(140, 30%, 25%)"
                strokeWidth="1.5"
                filter="url(#continentShadow)"
              />
              {/* Iceland */}
              <path 
                d="M390,75 L410,72 L420,82 L410,92 L392,88 Z" 
                fill="url(#iceGradient)"
                stroke="hsl(200, 30%, 70%)"
                strokeWidth="1"
              />
              
              {/* Africa */}
              <path 
                d="M440,175 L480,170 L530,180 L570,190 L590,220 L585,270 L570,320 L555,370 L530,410 L500,430 L465,420 L445,390 L435,340 L440,290 L445,240 L440,200 Z" 
                fill="url(#continentGradient)"
                stroke="hsl(140, 30%, 25%)"
                strokeWidth="2"
                filter="url(#continentShadow)"
                className="hover:brightness-110 transition-all duration-300"
              />
              {/* Madagascar */}
              <path 
                d="M595,355 L610,345 L620,365 L615,395 L600,400 L590,380 Z" 
                fill="url(#continentGradient)"
                stroke="hsl(140, 30%, 25%)"
                strokeWidth="1.5"
              />
              
              {/* Asia */}
              <path 
                d="M560,85 L620,75 L680,70 L750,80 L820,75 L880,90 L920,110 L930,150 L920,190 L895,230 L860,260 L820,280 L770,290 L720,280 L680,260 L640,240 L610,220 L590,190 L570,160 L565,130 L560,100 Z" 
                fill="url(#continentGradient)"
                stroke="hsl(140, 30%, 25%)"
                strokeWidth="2"
                filter="url(#continentShadow)"
                className="hover:brightness-110 transition-all duration-300"
              />
              {/* India */}
              <path 
                d="M680,220 L720,215 L735,250 L720,295 L690,310 L660,290 L665,250 Z" 
                fill="url(#continentGradient)"
                stroke="hsl(140, 30%, 25%)"
                strokeWidth="1.5"
                filter="url(#continentShadow)"
              />
              {/* Japan */}
              <path 
                d="M895,145 L910,135 L925,145 L920,170 L905,180 L890,165 Z" 
                fill="url(#continentGradient)"
                stroke="hsl(140, 30%, 25%)"
                strokeWidth="1.5"
              />
              
              {/* Southeast Asia / Indonesia */}
              <path 
                d="M780,300 L830,295 L870,310 L890,330 L880,350 L845,355 L800,340 L775,320 Z" 
                fill="url(#continentGradient)"
                stroke="hsl(140, 30%, 25%)"
                strokeWidth="1.5"
                filter="url(#continentShadow)"
              />
              
              {/* Australia */}
              <path 
                d="M780,370 L850,360 L900,375 L930,400 L925,440 L890,465 L840,475 L790,460 L765,425 L770,390 Z" 
                fill="url(#continentGradient)"
                stroke="hsl(140, 30%, 25%)"
                strokeWidth="2"
                filter="url(#continentShadow)"
                className="hover:brightness-110 transition-all duration-300"
              />
              {/* New Zealand */}
              <path 
                d="M950,420 L965,410 L975,430 L970,455 L955,460 L945,440 Z" 
                fill="url(#continentGradient)"
                stroke="hsl(140, 30%, 25%)"
                strokeWidth="1.5"
              />
              
              {/* Antarctica */}
              <path 
                d="M50,480 L150,470 L300,465 L450,460 L600,462 L750,465 L900,475 L950,485 L950,500 L50,500 Z" 
                fill="url(#iceGradient)"
                stroke="hsl(200, 40%, 80%)"
                strokeWidth="2"
                filter="url(#continentShadow)"
              />
              
              {/* Arctic Ice */}
              <path 
                d="M250,15 L350,10 L450,8 L550,10 L650,15 L700,25 L680,40 L600,35 L500,30 L400,32 L300,38 L250,30 Z" 
                fill="url(#iceGradient)"
                stroke="hsl(200, 40%, 80%)"
                strokeWidth="1.5"
                opacity="0.8"
              />

              {/* Ocean Labels - positioned subtly */}
              <text x="100" y="250" fill="rgba(255,255,255,0.15)" fontSize="14" fontFamily="sans-serif" fontWeight="300">OCÉANO PACÍFICO</text>
              <text x="320" y="200" fill="rgba(255,255,255,0.15)" fontSize="12" fontFamily="sans-serif" fontWeight="300">ATLÁNTICO</text>
              <text x="700" y="320" fill="rgba(255,255,255,0.15)" fontSize="12" fontFamily="sans-serif" fontWeight="300">ÍNDICO</text>
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
