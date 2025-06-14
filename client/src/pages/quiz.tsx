import { useState } from "react";
import WelcomeScreen from "@/components/quiz/welcome-screen";
import QuizScreen from "@/components/quiz/quiz-screen";
import ResultsScreen from "@/components/quiz/results-screen";
import FeedbackModal from "@/components/quiz/feedback-modal";
import ReviewModal from "@/components/quiz/review-modal";
import { useQuiz } from "@/hooks/use-quiz";

type QuizState = "welcome" | "quiz" | "results";

export default function Quiz() {
  const [state, setState] = useState<QuizState>("welcome");
  const [showFeedback, setShowFeedback] = useState(false);
  const [showReview, setShowReview] = useState(false);
  
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    isLoading,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    restartQuiz,
    results,
    startTime
  } = useQuiz();

  const handleStartQuiz = async () => {
    await startQuiz();
    setState("quiz");
  };

  const handleSelectAnswer = (answerIndex: number) => {
    selectAnswer(answerIndex);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      finishQuiz();
      setState("results");
    }
  };

  const handleRestartQuiz = () => {
    restartQuiz();
    setState("welcome");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Quiz yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-brain text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Innovatsion Iqtisodiyot</h1>
                <p className="text-sm text-slate-600">Quiz O'yini</p>
              </div>
            </div>
            {state === "quiz" && startTime && (
              <div className="bg-slate-100 px-4 py-2 rounded-lg">
                <i className="fas fa-clock text-slate-600 mr-2"></i>
                <span className="font-mono text-slate-800">
                  {Math.floor((Date.now() - startTime) / 60000).toString().padStart(2, '0')}:
                  {Math.floor(((Date.now() - startTime) % 60000) / 1000).toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      {state === "welcome" && (
        <WelcomeScreen onStartQuiz={handleStartQuiz} />
      )}

      {state === "quiz" && (
        <QuizScreen
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          userAnswers={userAnswers}
          onSelectAnswer={handleSelectAnswer}
          onNextQuestion={handleNextQuestion}
          onPreviousQuestion={previousQuestion}
        />
      )}

      {state === "results" && results && (
        <ResultsScreen
          results={results}
          onRestartQuiz={handleRestartQuiz}
          onShowReview={() => setShowReview(true)}
        />
      )}

      {/* Modals */}
      {showFeedback && questions.length > 0 && (
        <FeedbackModal
          question={questions[currentQuestionIndex]}
          selectedAnswer={userAnswers[currentQuestionIndex]}
          onClose={() => setShowFeedback(false)}
        />
      )}

      {showReview && (
        <ReviewModal
          questions={questions}
          userAnswers={userAnswers}
          onClose={() => setShowReview(false)}
        />
      )}
    </div>
  );
}
