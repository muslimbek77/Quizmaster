import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStartQuiz: () => void;
}

export default function WelcomeScreen({ onStartQuiz }: WelcomeScreenProps) {
  const { data: stats } = useQuery({
    queryKey: ['/api/quiz/stats'],
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-graduation-cap text-white text-2xl"></i>
        </div>
        
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Innovatsion Iqtisodiyot Quiz</h2>
        
        <p className="text-slate-600 mb-8 leading-relaxed">
          Bu quiz sizning innovatsion iqtisodiyot bo'yicha bilimlaringizni sinaydi. 
          Sizga 50 ta tasodifiy savol beriladi va har biriga 4 ta javob varianti taklif etiladi.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">50</div>
            <div className="text-sm text-slate-600">Savol</div>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">4</div>
            <div className="text-sm text-slate-600">Javob varianti</div>
          </div>
          <div className="bg-violet-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-violet-600">{stats?.totalQuestions || "..."}</div>
            <div className="text-sm text-slate-600">Jami savollar</div>
          </div>
        </div>

        <Button 
          onClick={onStartQuiz}
          className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          size="lg"
        >
          <i className="fas fa-play mr-2"></i>
          Quizni Boshlash
        </Button>
      </div>
    </div>
  );
}
