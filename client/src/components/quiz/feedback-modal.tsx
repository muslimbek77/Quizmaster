import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@shared/schema";

interface FeedbackModalProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  onClose: () => void;
}

export default function FeedbackModal({
  question,
  selectedAnswer,
  onClose,
}: FeedbackModalProps) {
  if (selectedAnswer === null) return null;

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-bounce-in">
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isCorrect ? 'bg-emerald-100' : 'bg-red-100'
          }`}>
            <i className={`${
              isCorrect ? 'fas fa-check text-emerald-600' : 'fas fa-times text-red-600'
            } text-2xl`}></i>
          </div>
          
          <h3 className={`text-xl font-bold mb-2 ${
            isCorrect ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {isCorrect ? 'To\'g\'ri!' : 'Noto\'g\'ri'}
          </h3>
          
          <p className="text-slate-600 mb-4">
            {isCorrect 
              ? 'Ajoyib! Siz to\'g\'ri javob berdingiz.' 
              : 'Afsuski, javobingiz noto\'g\'ri.'
            }
          </p>
          
          {!isCorrect && (
            <div className="bg-emerald-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-slate-600 mb-1">To'g'ri javob:</p>
              <p className="font-semibold text-emerald-700">
                {question.options[question.correctAnswer]}
              </p>
            </div>
          )}
          
          <Button
            onClick={onClose}
            className="w-full"
          >
            Davom etish
          </Button>
        </div>
      </div>
    </div>
  );
}
