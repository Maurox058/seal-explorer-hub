import { useState, useMemo } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain } from 'lucide-react';
import { sealsData } from '@/data/sealsData';

// Función para mezclar un array (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const pickRandom = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const buildOptions = (correct: string, pool: string[], count = 4) => {
  const uniquePool = Array.from(new Set(pool.filter((item) => item !== correct)));
  const options = [correct];
  while (options.length < count && uniquePool.length > 0) {
    const index = Math.floor(Math.random() * uniquePool.length);
    options.push(uniquePool.splice(index, 1)[0]);
  }
  if (options.length < count) return null;
  return shuffleArray(options);
};

const generateQuizQuestions = (count: number): QuizQuestion[] => {
  const allDiets = sealsData.flatMap((s) => s.diet);
  const allRegions = sealsData.flatMap((s) => s.regions);
  const allThreats = sealsData.flatMap((s) => s.threats);
  const allBehaviors = sealsData.flatMap((s) => s.behaviors);
  const allHabitats = sealsData.map((s) => s.habitat);
  const allScientificNames = sealsData.map((s) => s.scientificName);
  const allSpanishNames = sealsData.map((s) => s.spanishName);

  const questionPool: QuizQuestion[] = [];

  sealsData.forEach((species) => {
    // Nombre científico
    const sciOptions = buildOptions(
      species.scientificName,
      allScientificNames,
    );
    if (sciOptions) {
      questionPool.push({
        id: `sci-${species.id}`,
        question: `¿Cuál es el nombre científico de la ${species.spanishName}?`,
        options: sciOptions,
        correctAnswer: sciOptions.indexOf(species.scientificName),
        explanation: `El nombre científico de la ${species.spanishName} es ${species.scientificName}.`,
      });
    }

    // Especie por nombre científico
    const speciesOptions = buildOptions(species.spanishName, allSpanishNames);
    if (speciesOptions) {
      questionPool.push({
        id: `spanish-${species.id}`,
        question: `¿Qué especie corresponde al nombre científico ${species.scientificName}?`,
        options: speciesOptions,
        correctAnswer: speciesOptions.indexOf(species.spanishName),
        explanation: `${species.scientificName} corresponde a la ${species.spanishName}.`,
      });
    }

    // Hábitat
    const habitatOptions = buildOptions(species.habitat, allHabitats);
    if (habitatOptions) {
      questionPool.push({
        id: `habitat-${species.id}`,
        question: `¿En qué hábitat vive principalmente la ${species.spanishName}?`,
        options: habitatOptions,
        correctAnswer: habitatOptions.indexOf(species.habitat),
        explanation: `La ${species.spanishName} habita en: ${species.habitat}.`,
      });
    }

    // Región
    const regionCorrect = pickRandom(species.regions);
    const regionOptions = buildOptions(regionCorrect, allRegions);
    if (regionOptions) {
      questionPool.push({
        id: `region-${species.id}-${regionCorrect}`,
        question: `¿En qué región se encuentra la ${species.spanishName}?`,
        options: regionOptions,
        correctAnswer: regionOptions.indexOf(regionCorrect),
        explanation: `La ${species.spanishName} se distribuye en regiones como: ${species.regions.join(', ')}.`,
      });
    }

    // Dieta
    const dietCorrect = pickRandom(species.diet);
    const dietOptions = buildOptions(dietCorrect, allDiets);
    if (dietOptions) {
      questionPool.push({
        id: `diet-${species.id}-${dietCorrect}`,
        question: `¿Cuál de estos alimentos forma parte de la dieta de la ${species.spanishName}?`,
        options: dietOptions,
        correctAnswer: dietOptions.indexOf(dietCorrect),
        explanation: `La ${species.spanishName} se alimenta de: ${species.diet.join(', ')}.`,
      });
    }

    // Amenazas
    const threatCorrect = pickRandom(species.threats);
    const threatOptions = buildOptions(threatCorrect, allThreats);
    if (threatOptions) {
      questionPool.push({
        id: `threat-${species.id}-${threatCorrect}`,
        question: `¿Cuál es una amenaza para la ${species.spanishName}?`,
        options: threatOptions,
        correctAnswer: threatOptions.indexOf(threatCorrect),
        explanation: `Entre las amenazas de la ${species.spanishName} están: ${species.threats.join(', ')}.`,
      });
    }

    // Comportamientos
    const behaviorCorrect = pickRandom(species.behaviors);
    const behaviorOptions = buildOptions(behaviorCorrect, allBehaviors);
    if (behaviorOptions) {
      questionPool.push({
        id: `behavior-${species.id}-${behaviorCorrect}`,
        question: `¿Qué comportamiento es típico de la ${species.spanishName}?`,
        options: behaviorOptions,
        correctAnswer: behaviorOptions.indexOf(behaviorCorrect),
        explanation: `Comportamientos típicos: ${species.behaviors.join(', ')}.`,
      });
    }
  });

  return shuffleArray(questionPool).slice(0, Math.min(count, questionPool.length));
};

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [shuffleKey, setShuffleKey] = useState(0);

  // Generar preguntas dinámicas al inicio y cuando se reinicia
  const shuffledQuestions = useMemo(() => {
    return generateQuizQuestions(5);
  }, [shuffleKey]);

  const question = shuffledQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const nextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setAnsweredQuestions([]);
    setShuffleKey(prev => prev + 1); // Forzar nuevo shuffle
  };

  const getScoreMessage = () => {
    const percentage = (score / shuffledQuestions.length) * 100;
    if (percentage === 100) return '¡Perfecto! Eres un experto en focas! 🎉';
    if (percentage >= 80) return '¡Excelente! Conoces muy bien a las focas! 🌟';
    if (percentage >= 60) return '¡Bien hecho! Tienes buenos conocimientos. 👍';
    if (percentage >= 40) return 'No está mal, pero hay más por aprender. 📚';
    return 'Sigue explorando para aprender más sobre las focas. 🦭';
  };

  return (
    <section id="quiz" className="py-20 md:py-32 bg-gradient-to-br from-ocean-deep via-ocean-mid to-ocean-deep">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-ocean-surface/20 text-ocean-surface rounded-full text-sm font-medium mb-4">
            Aprender Jugando
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
            Quiz de Focas
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Pon a prueba tus conocimientos sobre estos fascinantes mamíferos marinos.
          </p>
        </div>

        {!quizComplete ? (
          <div className="bg-card rounded-3xl shadow-elevated p-6 md:p-8">
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Pregunta {currentQuestion + 1} de {shuffledQuestions.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-foreground">
                  {score} puntos
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-muted rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question */}
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-6">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;
                
                let buttonClass = 'w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ';
                
                if (!showResult) {
                  buttonClass += 'border-border hover:border-primary/50 hover:bg-muted/50';
                } else if (isCorrectAnswer) {
                  buttonClass += 'border-green-500 bg-green-500/10';
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += 'border-red-500 bg-red-500/10';
                } else {
                  buttonClass += 'border-border opacity-50';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          showResult && isCorrectAnswer 
                            ? 'bg-green-500 text-primary-foreground' 
                            : showResult && isSelected && !isCorrectAnswer
                            ? 'bg-red-500 text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-foreground font-medium">{option}</span>
                      </div>
                      {showResult && isCorrectAnswer && (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      )}
                      {showResult && isSelected && !isCorrectAnswer && (
                        <XCircle className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className={`p-4 rounded-xl mb-6 ${isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-orange-500/10 border border-orange-500/30'}`}>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">{isCorrect ? '¡Correcto! ' : 'Respuesta correcta: '}</span>
                  {question.explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {showResult && (
              <button
                onClick={nextQuestion}
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                {currentQuestion < shuffledQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
              </button>
            )}
          </div>
        ) : (
          /* Results Screen */
          <div className="bg-card rounded-3xl shadow-elevated p-8 text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
            
            <h3 className="text-3xl font-display font-bold text-foreground mb-2">
              ¡Quiz Completado!
            </h3>
            
            <div className="text-6xl font-display font-bold text-primary my-6">
              {score}/{shuffledQuestions.length}
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              {getScoreMessage()}
            </p>

            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
              Intentar de Nuevo
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizSection;
