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
      const randomQuestions = await storage.getRandomQuestions(count);
      
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
      const totalQuestions = await storage.getTotalQuestionsCount();
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

  // Admin routes
  app.post("/api/admin/questions", async (req, res) => {
    try {
      const { question, options, correctAnswer, category } = req.body;
      
      if (!question || !options || options.length !== 4) {
        return res.status(400).json({ error: 'Invalid question data' });
      }
      
      const newQuestion = await storage.addQuestion({
        question,
        options,
        correctAnswer: correctAnswer || 0,
        category: category || 'innovatsion_iqtisodiyot'
      });
      
      res.json(newQuestion);
    } catch (error) {
      console.error("Error adding question:", error);
      res.status(500).json({ error: 'Failed to add question' });
    }
  });

  app.post("/api/admin/import-csv", async (req, res) => {
    try {
      const { csvData } = req.body;
      
      if (!csvData) {
        return res.status(400).json({ error: 'No CSV data provided' });
      }
      
      const lines = csvData.trim().split('\n');
      let imported = 0;
      
      for (const line of lines) {
        if (line.trim()) {
          const parts = line.split(',').map(part => part.trim().replace(/"/g, ''));
          
          if (parts.length >= 6) {
            try {
              const [question, option1, option2, option3, option4, correctAnswerStr, category] = parts;
              const correctAnswer = parseInt(correctAnswerStr) || 0;
              
              await storage.addQuestion({
                question,
                options: [option1, option2, option3, option4],
                correctAnswer,
                category: category || 'innovatsion_iqtisodiyot'
              });
              
              imported++;
            } catch (error) {
              console.log("Skipping invalid line:", line);
            }
          }
        }
      }
      
      res.json({ imported });
    } catch (error) {
      console.error("Error importing CSV:", error);
      res.status(500).json({ error: 'Failed to import CSV' });
    }
  });

  app.post("/api/admin/populate-questions", async (req, res) => {
    try {
      const imported = await storage.populateQuestionsFromParser();
      res.json({ imported });
    } catch (error) {
      console.error("Error populating questions:", error);
      res.status(500).json({ error: 'Failed to populate questions' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
