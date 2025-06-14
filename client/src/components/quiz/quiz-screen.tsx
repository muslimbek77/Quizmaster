import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@shared/schema";

interface QuizScreenProps {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  onSelectAnswer: (answerIndex: number) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
}

export default function QuizScreen({
  questions,
  currentQuestionIndex,
  userAnswers,
  onSelectAnswer,
  onNextQuestion,
  onPreviousQuestion,
}: QuizScreenProps) {
  if (questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const selectedAnswer = userAnswers[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">
            Savol {currentQuestionIndex + 1} / {questions.length}
          </span>
          <span className="text-sm font-medium text-slate-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-violet-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 animate-slide-up">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="fas fa-question text-blue-600"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Savol {currentQuestionIndex + 1}
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelectAnswer(index)}
              className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-slate-300 rounded-full flex items-center justify-center text-sm font-semibold">
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={onPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          variant="outline"
          className="px-6 py-3"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Oldingi
        </Button>
        
        <Button
          onClick={onNextQuestion}
          disabled={selectedAnswer === null}
          className="px-6 py-3"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Yakunlash' : 'Keyingi'}
          <i className="fas fa-arrow-right ml-2"></i>
        </Button>
      </div>
    </div>
  );
}
