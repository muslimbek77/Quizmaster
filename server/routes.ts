import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { QuizParser } from "./services/quiz-parser";
import { insertQuizSessionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all questions
  app.get("/api/questions", async (req, res) => {
    try {
      const questions = await storage.getAllQuestions();
      res.json(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Get random questions for quiz
  app.get("/api/quiz/questions", async (req, res) => {
    try {
      const count = parseInt(req.query.count as string) || 50;
      const randomQuestions = QuizParser.getRandomQuestions(count);
      
      // Add IDs for the response
      const questionsWithIds = randomQuestions.map((q, index) => ({
        ...q,
        id: index + 1
      }));
      
      res.json(questionsWithIds);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      res.status(500).json({ message: "Failed to fetch quiz questions" });
    }
  });

  // Get quiz statistics
  app.get("/api/quiz/stats", async (req, res) => {
    try {
      const totalQuestions = QuizParser.getTotalQuestionsCount();
      res.json({ totalQuestions });
    } catch (error) {
      console.error("Error fetching quiz stats:", error);
      res.status(500).json({ message: "Failed to fetch quiz stats" });
    }
  });

  // Submit quiz session
  app.post("/api/quiz/submit", async (req, res) => {
    try {
      const validatedData = insertQuizSessionSchema.parse(req.body);
      const session = await storage.createQuizSession(validatedData);
      res.json(session);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      res.status(400).json({ message: "Invalid quiz submission data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
