import { Question, QuizSession, type InsertQuestion, type InsertQuizSession, questions, quizSessions } from "@shared/schema";
import { QuizParser } from "./services/quiz-parser";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAllQuestions(): Promise<Question[]>;
  getQuestionById(id: number): Promise<Question | undefined>;
  createQuizSession(session: InsertQuizSession): Promise<QuizSession>;
  getQuizSessionById(id: number): Promise<QuizSession | undefined>;
  getTotalQuestionsCount(): Promise<number>;
  addQuestion(question: InsertQuestion): Promise<Question>;
  populateQuestionsFromParser(): Promise<number>;
  getRandomQuestions(count: number): Promise<Question[]>;
}

export class DatabaseStorage implements IStorage {
  async getAllQuestions(): Promise<Question[]> {
    const result = await db.select().from(questions);
    
    // If no questions in database, populate with quiz data
    if (result.length === 0) {
      await this.populateQuestions();
      return await db.select().from(questions);
    }
    
    return result;
  }

  async getQuestionById(id: number): Promise<Question | undefined> {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    return question || undefined;
  }

  async createQuizSession(insertSession: InsertQuizSession): Promise<QuizSession> {
    const [session] = await db
      .insert(quizSessions)
      .values({
        userId: insertSession.userId ?? null,
        questionsUsed: insertSession.questionsUsed,
        userAnswers: insertSession.userAnswers,
        score: insertSession.score,
        totalQuestions: insertSession.totalQuestions,
      })
      .returning();
    return session;
  }

  async getQuizSessionById(id: number): Promise<QuizSession | undefined> {
    const [session] = await db.select().from(quizSessions).where(eq(quizSessions.id, id));
    return session || undefined;
  }

  private async populateQuestions(): Promise<void> {
    const questionData = QuizParser.getAllQuestions();
    
    const questionsToInsert = questionData.map((q) => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      category: q.category,
    }));

    await db.insert(questions).values(questionsToInsert);
  }
}

export const storage = new DatabaseStorage();
