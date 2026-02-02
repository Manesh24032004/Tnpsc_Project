import { useState } from 'react';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Calculator, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const mathsQuestions = [
  {
    id: 1,
    question: 'If 15% of a number is 45, what is the number?',
    options: ['250', '300', '350', '400'],
    answer: '300',
  },
  {
    id: 2,
    question: 'A train travels 360 km in 4 hours. What is its speed in km/hr?',
    options: ['80', '85', '90', '95'],
    answer: '90',
  },
  {
    id: 3,
    question: 'What is the LCM of 12 and 18?',
    options: ['24', '36', '48', '72'],
    answer: '36',
  },
  {
    id: 4,
    question: 'If A:B = 2:3 and B:C = 4:5, what is A:C?',
    options: ['8:15', '6:15', '4:5', '2:5'],
    answer: '8:15',
  },
  {
    id: 5,
    question: 'A man buys an article for ₹500 and sells it for ₹600. What is the profit percentage?',
    options: ['15%', '18%', '20%', '25%'],
    answer: '20%',
  },
];

const QuizMaths = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswerSelect = (option: string) => {
    if (answered) return;
    
    setSelectedAnswer(option);
    setAnswered(true);
    
    if (option === mathsQuestions[currentQuestion].answer) {
      setScore(score + 1);
      toast.success('Correct! ✓');
    } else {
      toast.error(`Wrong! Correct answer: ${mathsQuestions[currentQuestion].answer}`);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mathsQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <Link to="/home" className="inline-flex items-center text-primary hover:underline">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <Link to="/quiz" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quiz
          </Link>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
            <Calculator className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">Maths Quiz</h1>
          <p className="text-muted-foreground">Test your mathematical aptitude</p>
        </div>

        {showResult ? (
          <Card className="max-w-2xl mx-auto p-8 text-center animate-fade-in">
            <div className="mb-6">
              {score >= mathsQuestions.length * 0.7 ? (
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="h-20 w-20 text-orange-500 mx-auto mb-4" />
              )}
              <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h2>
              <p className="text-xl text-muted-foreground">
                Your Score: <span className="text-primary font-bold">{score}</span> / {mathsQuestions.length}
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestart} variant="outline">
                Try Again
              </Button>
              <Button asChild>
                <Link to="/quiz">
                  More Quizzes
                </Link>
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="max-w-2xl mx-auto p-6 animate-fade-in">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {mathsQuestions.length}
                </span>
                <span className="text-sm font-medium text-primary">
                  Score: {score}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-6">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / mathsQuestions.length) * 100}%` }}
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {mathsQuestions[currentQuestion].question}
              </h3>
            </div>

            <div className="space-y-3 mb-6">
              {mathsQuestions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === mathsQuestions[currentQuestion].answer;
                const showCorrect = answered && isCorrect;
                const showWrong = answered && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={answered}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      showCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : showWrong
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-medium">{option}</span>
                      {showCorrect && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
                      {showWrong && <XCircle className="h-5 w-5 text-red-500 ml-auto" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {answered && (
              <Button onClick={handleNext} className="w-full">
                {currentQuestion < mathsQuestions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  'View Results'
                )}
              </Button>
            )}
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default QuizMaths;