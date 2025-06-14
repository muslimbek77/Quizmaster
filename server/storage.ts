import { Question, QuizSession, type InsertQuestion, type InsertQuizSession } from "@shared/schema";
import { QuizParser } from "./services/quiz-parser";

export interface IStorage {
  getAllQuestions(): Promise<Question[]>;
  getQuestionById(id: number): Promise<Question | undefined>;
  createQuizSession(session: InsertQuizSession): Promise<QuizSession>;
  getQuizSessionById(id: number): Promise<QuizSession | undefined>;
}

export class MemStorage implements IStorage {
  private questions: Map<number, Question>;
  private quizSessions: Map<number, QuizSession>;
  private currentQuestionId: number;
  private currentSessionId: number;

  constructor() {
    this.questions = new Map();
    this.quizSessions = new Map();
    this.currentQuestionId = 1;
    this.currentSessionId = 1;
    
    // Initialize with hardcoded questions
    this.initializeQuestions();
  }

  private initializeQuestions() {
    const questionData = QuizParser.getAllQuestions();
    
    questionData.forEach((questionData: Omit<Question, 'id'>) => {
      const id = this.currentQuestionId++;
      const question: Question = { ...questionData, id };
      this.questions.set(id, question);
    });
  }

  async getAllQuestions(): Promise<Question[]> {
    return Array.from(this.questions.values());
  }

  async getQuestionById(id: number): Promise<Question | undefined> {
    return this.questions.get(id);
  }

  async createQuizSession(insertSession: InsertQuizSession): Promise<QuizSession> {
    const id = this.currentSessionId++;
    const session: QuizSession = {
      id,
      userId: insertSession.userId ?? null,
      questionsUsed: insertSession.questionsUsed,
      userAnswers: insertSession.userAnswers,
      score: insertSession.score,
      totalQuestions: insertSession.totalQuestions,
      completedAt: new Date(),
    };
    this.quizSessions.set(id, session);
    return session;
  }

  async getQuizSessionById(id: number): Promise<QuizSession | undefined> {
    return this.quizSessions.get(id);
  }
}

export const storage = new MemStorage();
