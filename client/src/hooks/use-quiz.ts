import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { QuizQuestion, QuizState, QuizResults } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export function useQuiz() {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    isCompleted: false,
    startTime: 0,
  });

  const [results, setResults] = useState<QuizResults | null>(null);

  // Fetch random questions for quiz
  const { data: questions, isLoading, refetch } = useQuery<QuizQuestion[]>({
    queryKey: ['/api/quiz/questions', { count: 50 }],
    enabled: false, // Don't auto-fetch
  });

  // Submit quiz session
  const submitQuizMutation = useMutation({
    mutationFn: async (sessionData: any) => {
      return apiRequest('POST', '/api/quiz/submit', sessionData);
    },
  });

  const startQuiz = useCallback(async () => {
    const { data } = await refetch();
    if (data) {
      setQuizState({
        questions: data,
        currentQuestionIndex: 0,
        userAnswers: new Array(data.length).fill(null),
        isCompleted: false,
        startTime: Date.now(),
      });
    }
  }, [refetch]);

  const selectAnswer = useCallback((answerIndex: number) => {
    setQuizState(prev => {
      const newAnswers = [...prev.userAnswers];
      newAnswers[prev.currentQuestionIndex] = answerIndex;
      return {
        ...prev,
        userAnswers: newAnswers,
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1),
    }));
  }, []);

  const previousQuestion = useCallback(() => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0),
    }));
  }, []);

  const finishQuiz = useCallback(() => {
    const correctAnswers = quizState.userAnswers.reduce((count, answer, index) => {
      return count + (answer === quizState.questions[index]?.correctAnswer ? 1 : 0);
    }, 0);

    const totalQuestions = quizState.questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const timeSpent = Date.now() - quizState.startTime;

    const quizResults: QuizResults = {
      score: correctAnswers,
      totalQuestions,
      percentage,
      correctAnswers,
      wrongAnswers: totalQuestions - correctAnswers,
      timeSpent,
    };

    setResults(quizResults);
    setQuizState(prev => ({ ...prev, isCompleted: true }));

    // Submit quiz session to backend
    submitQuizMutation.mutate({
      questionsUsed: quizState.questions.map(q => q.id),
      userAnswers: quizState.userAnswers,
      score: correctAnswers,
      totalQuestions,
    });
  }, [quizState, submitQuizMutation]);

  const restartQuiz = useCallback(() => {
    setQuizState({
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],
      isCompleted: false,
      startTime: 0,
    });
    setResults(null);
  }, []);

  return {
    questions: quizState.questions,
    currentQuestionIndex: quizState.currentQuestionIndex,
    userAnswers: quizState.userAnswers,
    isCompleted: quizState.isCompleted,
    startTime: quizState.startTime,
    results,
    isLoading,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    restartQuiz,
  };
}
