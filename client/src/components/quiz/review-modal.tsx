import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@shared/schema";

interface ReviewModalProps {
  questions: QuizQuestion[];
  userAnswers: (number | null)[];
  onClose: () => void;
}

export default function ReviewModal({
  questions,
  userAnswers,
  onClose,
}: ReviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-800">Javoblar Ko'rib Chiqish</h3>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-slate-600"
            >
              <i className="fas fa-times text-xl"></i>
            </Button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={index} className="mb-6 p-6 border border-slate-200 rounded-lg">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-slate-600">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 mb-2">{question.question}</h4>
                  </div>
                  <div className="flex-shrink-0">
                    {isCorrect ? (
                      <i className="fas fa-check-circle text-emerald-500 text-xl"></i>
                    ) : (
                      <i className="fas fa-times-circle text-red-500 text-xl"></i>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 ml-12">
                  {question.options.map((option, optionIndex) => {
                    let className = 'p-3 rounded-lg border ';
                    if (optionIndex === question.correctAnswer) {
                      className += 'border-emerald-200 bg-emerald-50 text-emerald-800';
                    } else if (optionIndex === userAnswer && !isCorrect) {
                      className += 'border-red-200 bg-red-50 text-red-800';
                    } else {
                      className += 'border-slate-200 bg-slate-50 text-slate-700';
                    }
                    
                    return (
                      <div key={optionIndex} className={className}>
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">{String.fromCharCode(65 + optionIndex)}.</span>
                          <span className="flex-1">{option}</span>
                          {optionIndex === question.correctAnswer && (
                            <i className="fas fa-check text-emerald-600"></i>
                          )}
                          {optionIndex === userAnswer && !isCorrect && (
                            <i className="fas fa-times text-red-600"></i>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
