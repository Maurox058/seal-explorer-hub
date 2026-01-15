import { useState, useMemo } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain } from 'lucide-react';
import { quizQuestions } from '@/data/sealsData';

// Función para mezclar un array (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [shuffleKey, setShuffleKey] = useState(0);

  // Mezclar las preguntas y sus respuestas al inicio y cuando se reinicia
  const shuffledQuestions = useMemo(() => {
    return shuffleArray(quizQuestions.map(q => {
      // Crear un array de opciones con sus índices originales
      const optionsWithIndex = q.options.map((opt, idx) => ({ text: opt, originalIndex: idx }));
      const shuffledOptions = shuffleArray(optionsWithIndex);
      
      // Encontrar el nuevo índice de la respuesta correcta
      const newCorrectIndex = shuffledOptions.findIndex(opt => opt.originalIndex === q.correctAnswer);
      
      return {
        ...q,
        options: shuffledOptions.map(opt => opt.text),
        correctAnswer: newCorrectIndex
      };
    }));
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
    if (currentQuestion < quizQuestions.length - 1) {
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
