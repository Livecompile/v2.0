import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import rateLimit from "express-rate-limit";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window as any);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Security: Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { message: "Too many requests from this IP, please try again later." }
  });

  app.use(express.json({ limit: '1mb' }));
  app.use("/api/", limiter);

  // Security headers
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  // API Route for code execution
  app.post("/api/execute", async (req, res) => {
    const { language, code, files, entry } = req.body;
    
    if (!language || (!code && !files)) {
      return res.status(400).json({ message: "Language and code/files are required" });
    }

    try {
      // Build project context for the AI
      let projectContext = code;
      if (files && Array.isArray(files)) {
        projectContext = files.map((f: any) => `--- FILE: ${f.name} ---\n${f.content}`).join("\n\n");
      }

      const prompt = `You are a professional, high-fidelity code execution engine called LiveCompile Engine. 
      Execute the following ${language} project and return the EXACT output it would produce in a real terminal environment.
      
      CRITICAL RULES:
      1. STDOUT MUST be the literal output of the program.
      2. STDERR MUST contain any compilation errors, runtime errors, or stack traces if the code is invalid.
      3. DO NOT add any conversational filler, meta-comments, or explanations.
      4. If there are multiple files, handle imports, headers, and relationships correctly according to the language's standards.
      5. Use the file "${entry || 'main'}" as the primary entry point.
      6. Return ONLY a JSON object with this structure:
      {
        "stdout": "...",
        "stderr": "...",
        "code": 0 (or error code),
        "time": 100 (estimated ms)
      }

      Project Data:
      ${projectContext}`;

      const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json"
        }
      });

      const textOutput = result.text || '{}';
      
      // Attempt to clean up markdown if present
      let cleanedOutput = textOutput.trim();
      if (cleanedOutput.startsWith('```json')) {
        cleanedOutput = cleanedOutput.replace(/^```json\n/, '').replace(/\n```$/, '');
      } else if (cleanedOutput.startsWith('```')) {
        cleanedOutput = cleanedOutput.replace(/^```\n?/, '').replace(/\n?```$/, '');
      }

      let data;
      try {
        data = JSON.parse(cleanedOutput);
      } catch (parseError) {
        console.error("Failed to parse AI output:", cleanedOutput);
        data = { stdout: cleanedOutput, stderr: "", code: 0, time: 100 };
      }
      
      // Sanitize output to prevent XSS in the client console
      const sanitizedStdout = DOMPurify.sanitize(data.stdout || "");
      const sanitizedStderr = DOMPurify.sanitize(data.stderr || "");

      return res.json({
        run: {
          stdout: sanitizedStdout,
          stderr: sanitizedStderr,
          code: data.code ?? 0,
          signal: null,
          output: sanitizedStdout + sanitizedStderr,
          time: data.time || 50
        }
      });
    } catch (error: any) {
      console.error("Execution Error:", error);
      return res.status(500).json({ 
        run: {
          stdout: "",
          stderr: "LiveCompile Engine Error: " + error.message,
          code: 1,
          output: "LiveCompile Engine Error: " + error.message,
          time: 0
        }
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
