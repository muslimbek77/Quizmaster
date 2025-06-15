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
  updateQuestion(id: number, question: InsertQuestion): Promise<Question>;
  deleteQuestion(id: number): Promise<void>;
  getQuestionsPaginated(page: number, limit: number): Promise<{ questions: Question[], total: number }>;
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

  async getTotalQuestionsCount(): Promise<number> {
    const result = await db.select().from(questions);
    return result.length;
  }

  async addQuestion(question: InsertQuestion): Promise<Question> {
    const [newQuestion] = await db.insert(questions).values(question).returning();
    return newQuestion;
  }

  async getRandomQuestions(count: number): Promise<Question[]> {
    const allQuestions = await db.select().from(questions);
    
    // Shuffle questions and return the requested count
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, Math.min(count, allQuestions.length));
    
    // Randomize answer positions for each question
    const randomizedQuestions = selectedQuestions.map(question => {
      const options = [...question.options];
      const correctAnswer = question.correctAnswer;
      
      // Create array with indices to shuffle
      const indices = [0, 1, 2, 3];
      
      // Fisher-Yates shuffle for better randomization
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      
      // Rearrange options based on shuffled indices
      const shuffledOptions = indices.map(index => options[index]);
      
      // Find new position of correct answer
      const newCorrectAnswer = indices.indexOf(correctAnswer);
      
      return {
        ...question,
        options: shuffledOptions,
        correctAnswer: newCorrectAnswer
      };
    });
    
    return randomizedQuestions;
  }

  async populateQuestionsFromParser(): Promise<number> {
    const parserQuestions = QuizParser.getAllQuestions();
    let imported = 0;
    
    for (const question of parserQuestions) {
      try {
        // Check if question already exists
        const existing = await db.select().from(questions)
          .where(eq(questions.question, question.question))
          .limit(1);
        
        if (existing.length === 0) {
          await db.insert(questions).values(question);
          imported++;
        }
      } catch (error) {
        console.log('Error adding question:', error);
      }
    }
    
    return imported;
  }

  async updateQuestion(id: number, questionData: InsertQuestion): Promise<Question> {
    const [updatedQuestion] = await db
      .update(questions)
      .set({
        question: questionData.question,
        options: questionData.options,
        correctAnswer: questionData.correctAnswer,
        category: questionData.category,
      })
      .where(eq(questions.id, id))
      .returning();
    
    if (!updatedQuestion) {
      throw new Error('Question not found');
    }
    
    return updatedQuestion;
  }

  async deleteQuestion(id: number): Promise<void> {
    const result = await db
      .delete(questions)
      .where(eq(questions.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error('Question not found');
    }
  }

  async getQuestionsPaginated(page: number, limit: number): Promise<{ questions: Question[], total: number }> {
    const offset = (page - 1) * limit;
    
    // Get total count
    const totalResult = await db.select().from(questions);
    const total = totalResult.length;
    
    // Get paginated results
    const paginatedQuestions = await db
      .select()
      .from(questions)
      .limit(limit)
      .offset(offset);
    
    return {
      questions: paginatedQuestions,
      total
    };
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
