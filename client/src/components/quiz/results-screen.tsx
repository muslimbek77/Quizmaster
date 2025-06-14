import { Button } from "@/components/ui/button";
import { QuizResults } from "@shared/schema";

interface ResultsScreenProps {
  results: QuizResults;
  onRestartQuiz: () => void;
  onShowReview: () => void;
}

export default function ResultsScreen({
  results,
  onRestartQuiz,
  onShowReview,
}: ResultsScreenProps) {
  const getPerformanceConfig = (percentage: number) => {
    if (percentage >= 90) {
      return {
        icon: 'fas fa-trophy',
        iconBg: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
        title: 'Ajoyib natija!',
        titleColor: 'text-emerald-600',
        message: 'Siz innovatsion iqtisodiyot bo\'yicha ajoyib bilimga egasiz!',
        badge: 'A\'lo darajada',
        badgeBg: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
      };
    } else if (percentage >= 70) {
      return {
        icon: 'fas fa-medal',
        iconBg: 'bg-gradient-to-r from-blue-400 to-blue-600',
        title: 'Yaxshi natija!',
        titleColor: 'text-blue-600',
        message: 'Siz yaxshi bilimga egasiz, ammo yana o\'rganishingiz mumkin.',
        badge: 'Yaxshi daraja',
        badgeBg: 'bg-gradient-to-r from-blue-400 to-blue-600',
      };
    } else if (percentage >= 50) {
      return {
        icon: 'fas fa-star',
        iconBg: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        title: 'O\'rtacha natija',
        titleColor: 'text-yellow-600',
        message: 'Siz asosiy bilimga egasiz, ammo ko\'proq o\'rganishingiz kerak.',
        badge: 'O\'rtacha daraja',
        badgeBg: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      };
    } else {
      return {
        icon: 'fas fa-book',
        iconBg: 'bg-gradient-to-r from-red-400 to-red-600',
        title: 'Ko\'proq o\'rganish kerak',
        titleColor: 'text-red-600',
        message: 'Innovatsion iqtisodiyot bo\'yicha bilimlaringizni oshirishingiz tavsiya etiladi.',
        badge: 'Boshlang\'ich daraja',
        badgeBg: 'bg-gradient-to-r from-red-400 to-red-600',
      };
    }
  };

  const config = getPerformanceConfig(results.percentage);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-bounce-in">
        {/* Results Header */}
        <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${config.iconBg}`}>
          <i className={`${config.icon} text-white text-3xl`}></i>
        </div>
        
        <h2 className={`text-3xl font-bold mb-4 ${config.titleColor}`}>
          {config.title}
        </h2>
        
        <p className="text-slate-600 mb-8 text-lg">
          {config.message}
        </p>

        {/* Score Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">
              {results.percentage}%
            </div>
            <div className="text-slate-600">Umumiy Ball</div>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl">
            <div className="text-3xl font-bold text-emerald-600">
              {results.correctAnswers}
            </div>
            <div className="text-slate-600">To'g'ri Javoblar</div>
          </div>
          <div className="bg-red-50 p-6 rounded-xl">
            <div className="text-3xl font-bold text-red-600">
              {results.wrongAnswers}
            </div>
            <div className="text-slate-600">Noto'g'ri Javoblar</div>
          </div>
        </div>

        {/* Performance Badge */}
        <div className={`inline-block px-6 py-3 rounded-full text-white font-semibold mb-8 ${config.badgeBg}`}>
          {config.badge}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRestartQuiz}
            className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            size="lg"
          >
            <i className="fas fa-redo mr-2"></i>
            Qaytadan Boshlash
          </Button>
          
          <Button
            onClick={onShowReview}
            variant="outline"
            className="px-8 py-4 rounded-xl font-semibold"
            size="lg"
          >
            <i className="fas fa-eye mr-2"></i>
            Javoblarni Ko'rish
          </Button>
        </div>
      </div>
    </div>
  );
}
