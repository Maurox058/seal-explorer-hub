import harpSealImg from '@/assets/harp-seal.jpg';
import elephantSealImg from '@/assets/elephant-seal.jpg';
import leopardSealImg from '@/assets/leopard-seal.jpg';
import greySealImg from '@/assets/grey-seal.jpg';
import monkSealImg from '@/assets/monk-seal.jpg';

export interface SealSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  spanishName: string;
  description: string;
  habitat: string;
  diet: string[];
  size: {
    length: string;
    weight: string;
  };
  conservationStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR';
  conservationLabel: string;
  population: string;
  lifespan: string;
  regions: string[];
  coordinates: { lat: number; lng: number }[];
  image: string;
  funFacts: string[];
  threats: string[];
  behaviors: string[];
}

export const conservationStatusColors: Record<string, { bg: string; text: string }> = {
  LC: { bg: 'bg-green-500/20', text: 'text-green-700' },
  NT: { bg: 'bg-lime-500/20', text: 'text-lime-700' },
  VU: { bg: 'bg-yellow-500/20', text: 'text-yellow-700' },
  EN: { bg: 'bg-orange-500/20', text: 'text-orange-700' },
  CR: { bg: 'bg-red-500/20', text: 'text-red-700' },
};

export const conservationStatusLabels: Record<string, string> = {
  LC: 'Preocupación Menor',
  NT: 'Casi Amenazada',
  VU: 'Vulnerable',
  EN: 'En Peligro',
  CR: 'En Peligro Crítico',
};

export const sealsData: SealSpecies[] = [
  {
    id: 'harp-seal',
    commonName: 'Harp Seal',
    scientificName: 'Pagophilus groenlandicus',
    spanishName: 'Foca Arpa',
    description: 'La foca arpa es conocida por su distintivo patrón en forma de arpa en su espalda. Las crías nacen con un pelaje blanco esponjoso que les proporciona camuflaje en el hielo ártico.',
    habitat: 'Aguas árticas y subárticas del Atlántico Norte, especialmente en el hielo marino durante la temporada de reproducción.',
    diet: ['Peces pequeños', 'Capelín', 'Arenque', 'Bacalao', 'Crustáceos'],
    size: {
      length: '1.7-2.0 metros',
      weight: '130-150 kg',
    },
    conservationStatus: 'LC',
    conservationLabel: 'Preocupación Menor',
    population: '7.4 millones',
    lifespan: '30-35 años',
    regions: ['Canadá', 'Groenlandia', 'Noruega', 'Rusia'],
    coordinates: [
      { lat: 50.0, lng: -55.0 },
      { lat: 72.0, lng: -40.0 },
      { lat: 70.0, lng: 20.0 },
      { lat: 68.0, lng: 45.0 },
    ],
    image: harpSealImg,
    funFacts: [
      'Las crías de foca arpa pueden ganar hasta 2 kg por día durante la lactancia.',
      'Pueden sumergirse hasta 270 metros de profundidad.',
      'Su pelaje blanco de cría dura solo 2-3 semanas.',
      'Migran más de 3,000 km cada año.',
    ],
    threats: ['Cambio climático', 'Caza comercial histórica', 'Contaminación oceánica'],
    behaviors: ['Formación de grandes colonias en hielo', 'Migración estacional', 'Vocalizaciones submarinas'],
  },
  {
    id: 'elephant-seal',
    commonName: 'Northern Elephant Seal',
    scientificName: 'Mirounga angustirostris',
    spanishName: 'Elefante Marino del Norte',
    description: 'El elefante marino del norte es el segundo pinnípedo más grande del mundo. Los machos desarrollan una probóscide característica que puede inflarse para producir sonidos fuertes.',
    habitat: 'Costas del Pacífico oriental, desde Alaska hasta Baja California. Prefieren playas rocosas y arenosas para reproducirse.',
    diet: ['Calamares', 'Peces de aguas profundas', 'Rayas', 'Tiburones pequeños'],
    size: {
      length: '3.0-4.5 metros (machos)',
      weight: '1,500-2,300 kg (machos)',
    },
    conservationStatus: 'LC',
    conservationLabel: 'Preocupación Menor',
    population: '225,000',
    lifespan: '14-19 años',
    regions: ['California', 'México', 'Alaska'],
    coordinates: [
      { lat: 35.0, lng: -121.0 },
      { lat: 28.0, lng: -115.0 },
      { lat: 58.0, lng: -150.0 },
    ],
    image: elephantSealImg,
    funFacts: [
      'Pueden contener la respiración hasta 2 horas.',
      'Bucean regularmente a profundidades de 1,500 metros.',
      'Los machos pueden pesar hasta 20 veces más que las hembras.',
      'Pasan el 80% de su vida en el océano.',
    ],
    threats: ['Entanglement en redes de pesca', 'Contaminación marina', 'Perturbación humana en playas de reproducción'],
    behaviors: ['Luchas territoriales entre machos', 'Ayuno prolongado durante la reproducción', 'Buceo de forrajeo profundo'],
  },
  {
    id: 'leopard-seal',
    commonName: 'Leopard Seal',
    scientificName: 'Hydrurga leptonyx',
    spanishName: 'Foca Leopardo',
    description: 'La foca leopardo es uno de los depredadores más temidos de la Antártida. Su cuerpo aerodinámico y mandíbulas poderosas la convierten en una cazadora eficiente.',
    habitat: 'Aguas antárticas y subantárticas, incluyendo islas del Atlántico Sur y ocasionalmente costas de Australia y Nueva Zelanda.',
    diet: ['Pingüinos', 'Otras focas', 'Peces', 'Krill', 'Cefalópodos'],
    size: {
      length: '2.4-3.5 metros',
      weight: '200-600 kg',
    },
    conservationStatus: 'LC',
    conservationLabel: 'Preocupación Menor',
    population: '220,000-440,000',
    lifespan: '20-26 años',
    regions: ['Antártida', 'Islas Georgias del Sur', 'Islas Malvinas'],
    coordinates: [
      { lat: -64.0, lng: -60.0 },
      { lat: -54.0, lng: -37.0 },
      { lat: -51.0, lng: -59.0 },
    ],
    image: leopardSealImg,
    funFacts: [
      'Son conocidas por "jugar" con sus presas antes de comerlas.',
      'Pueden abrir su boca hasta 160 grados.',
      'Las hembras son generalmente más grandes que los machos.',
      'Producen vocalizaciones que pueden escucharse bajo el agua a grandes distancias.',
    ],
    threats: ['Cambio climático afectando el hielo antártico', 'Reducción de presas', 'Contaminación'],
    behaviors: ['Caza solitaria', 'Patrullaje de colonias de pingüinos', 'Descanso en témpanos de hielo'],
  },
  {
    id: 'grey-seal',
    commonName: 'Grey Seal',
    scientificName: 'Halichoerus grypus',
    spanishName: 'Foca Gris',
    description: 'La foca gris es una de las especies de focas más grandes, caracterizada por su hocico alargado y distintivo perfil "romano". Son extremadamente curiosas y se acercan frecuentemente a los buzos.',
    habitat: 'Costas rocosas y playas del Atlántico Norte, especialmente en el Reino Unido, Islandia, y las costas de Canadá.',
    diet: ['Bacalao', 'Platija', 'Arenque', 'Salmón', 'Pulpo'],
    size: {
      length: '2.0-3.3 metros',
      weight: '170-310 kg',
    },
    conservationStatus: 'LC',
    conservationLabel: 'Preocupación Menor',
    population: '550,000-600,000',
    lifespan: '25-35 años',
    regions: ['Reino Unido', 'Islandia', 'Canadá', 'Mar Báltico'],
    coordinates: [
      { lat: 56.0, lng: -3.0 },
      { lat: 65.0, lng: -18.0 },
      { lat: 47.0, lng: -61.0 },
      { lat: 58.0, lng: 20.0 },
    ],
    image: greySealImg,
    funFacts: [
      'El Reino Unido alberga el 40% de la población mundial.',
      'Pueden identificarse individualmente por sus patrones de manchas únicos.',
      'Los machos establecen territorios acuáticos para reproducirse.',
      'Las crías nacen con un pelaje blanco llamado "lanugo".',
    ],
    threats: ['Conflictos con pescadores', 'Contaminación por PCBs', 'Bycatch en redes de pesca'],
    behaviors: ['Formación de harems reproductivos', 'Curiosidad hacia humanos', 'Vocalizaciones territoriales'],
  },
  {
    id: 'monk-seal',
    commonName: 'Mediterranean Monk Seal',
    scientificName: 'Monachus monachus',
    spanishName: 'Foca Monje del Mediterráneo',
    description: 'La foca monje del Mediterráneo es una de las especies de focas más raras del mundo. Es la única especie de foca que habita en aguas cálidas del Mediterráneo.',
    habitat: 'Cuevas costeras y playas remotas del Mar Mediterráneo, Mar Negro y costas del Atlántico noroeste de África.',
    diet: ['Peces', 'Pulpos', 'Calamares', 'Langostas', 'Anguilas'],
    size: {
      length: '2.4-2.8 metros',
      weight: '250-400 kg',
    },
    conservationStatus: 'EN',
    conservationLabel: 'En Peligro',
    population: '600-700',
    lifespan: '20-30 años',
    regions: ['Grecia', 'Turquía', 'Mauritania', 'Madeira'],
    coordinates: [
      { lat: 35.0, lng: 25.0 },
      { lat: 36.0, lng: 28.0 },
      { lat: 21.0, lng: -17.0 },
      { lat: 32.0, lng: -17.0 },
    ],
    image: monkSealImg,
    funFacts: [
      'Es una de las 10 especies de mamíferos más amenazadas del mundo.',
      'Prefieren dar a luz en cuevas marinas para proteger a sus crías.',
      'Fueron veneradas en la antigua Grecia como símbolos de buena suerte.',
      'Pueden vivir en agua dulce o salada.',
    ],
    threats: ['Pérdida de hábitat', 'Perturbación humana', 'Captura accidental en redes', 'Contaminación'],
    behaviors: ['Vida solitaria', 'Uso de cuevas para reproducción', 'Actividad principalmente nocturna'],
  },
];

export const generalSealInfo = {
  evolution: {
    title: 'Historia Evolutiva',
    content: 'Las focas pertenecen al grupo Pinnipedia, que evolucionó hace aproximadamente 30-35 millones de años de ancestros carnívoros terrestres similares a los osos. Los fósiles más antiguos de pinnípedos se han encontrado en América del Norte.',
    timeline: [
      { period: '35 millones de años', event: 'Primeros pinnípedos aparecen' },
      { period: '25 millones de años', event: 'Divergencia entre focas verdaderas y otáridos' },
      { period: '15 millones de años', event: 'Radiación de especies modernas' },
      { period: '5 millones de años', event: 'Focas colonizan la Antártida' },
    ],
  },
  biology: {
    title: 'Biología y Anatomía',
    content: 'Las focas tienen cuerpos fusiformes perfectamente adaptados para la vida acuática. Sus extremidades se han modificado en aletas, y poseen una gruesa capa de grasa que les proporciona aislamiento térmico y reservas de energía.',
    features: [
      'Capa de grasa de hasta 10 cm de espesor',
      'Ojos grandes adaptados para visión submarina',
      'Bigotes sensibles (vibrisas) para detectar presas',
      'Capacidad de reducir el ritmo cardíaco durante el buceo',
    ],
  },
  conservation: {
    title: 'Conservación Global',
    content: 'Muchas especies de focas enfrentan amenazas significativas. El cambio climático está reduciendo el hielo marino crítico para la reproducción, mientras que la contaminación y la sobrepesca afectan sus fuentes de alimento.',
    challenges: [
      'Pérdida de hábitat de hielo marino',
      'Contaminación por plásticos y químicos',
      'Reducción de poblaciones de peces',
      'Interacción con pesquerías comerciales',
    ],
  },
};

export const quizQuestions = [
  {
    id: 1,
    question: '¿Cuál es la foca más grande del mundo?',
    options: ['Foca Arpa', 'Elefante Marino del Sur', 'Foca Leopardo', 'Foca Gris'],
    correctAnswer: 1,
    explanation: 'El elefante marino del sur puede pesar hasta 4,000 kg, siendo el pinnípedo más grande.',
  },
  {
    id: 2,
    question: '¿Qué especie de foca es conocida por cazar pingüinos?',
    options: ['Foca Monje', 'Foca Arpa', 'Foca Leopardo', 'Foca Gris'],
    correctAnswer: 2,
    explanation: 'La foca leopardo es un depredador ápice en la Antártida y frecuentemente caza pingüinos.',
  },
  {
    id: 3,
    question: '¿Cuánto tiempo pueden contener la respiración los elefantes marinos?',
    options: ['30 minutos', '1 hora', '2 horas', '4 horas'],
    correctAnswer: 2,
    explanation: 'Los elefantes marinos pueden contener la respiración hasta 2 horas durante sus buceos profundos.',
  },
  {
    id: 4,
    question: '¿Cuál es el estado de conservación de la foca monje del Mediterráneo?',
    options: ['Preocupación Menor', 'Vulnerable', 'En Peligro', 'Extinta'],
    correctAnswer: 2,
    explanation: 'La foca monje del Mediterráneo está en peligro con solo 600-700 individuos restantes.',
  },
  {
    id: 5,
    question: '¿Qué característica hace única a la cría de foca arpa?',
    options: ['Nace con pelaje negro', 'Nace con pelaje blanco', 'Nace sin pelaje', 'Nace con manchas'],
    correctAnswer: 1,
    explanation: 'Las crías de foca arpa nacen con un distintivo pelaje blanco esponjoso para camuflarse en el hielo.',
  },
];
