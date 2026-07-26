var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_express_rate_limit = __toESM(require("express-rate-limit"), 1);
var import_jsdom = require("jsdom");
var import_dompurify = __toESM(require("dompurify"), 1);
var window = new import_jsdom.JSDOM("").window;
var DOMPurify = (0, import_dompurify.default)(window);
var ai = new import_genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  const limiter = (0, import_express_rate_limit.default)({
    windowMs: 15 * 60 * 1e3,
    // 15 minutes
    max: 100,
    // limit each IP to 100 requests per windowMs
    message: { message: "Too many requests from this IP, please try again later." }
  });
  app.use(import_express.default.json({ limit: "1mb" }));
  app.use("/api/", limiter);
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });
  app.post("/api/execute", async (req, res) => {
    const { language, code, files, entry } = req.body;
    if (!language || !code && !files) {
      return res.status(400).json({ message: "Language and code/files are required" });
    }
    try {
      let projectContext = code;
      if (files && Array.isArray(files)) {
        projectContext = files.map((f) => `--- FILE: ${f.name} ---
${f.content}`).join("\n\n");
      }
      const prompt = `You are a professional, high-fidelity code execution engine called LiveCompile Engine. 
      Execute the following ${language} project and return the EXACT output it would produce in a real terminal environment.
      
      CRITICAL RULES:
      1. STDOUT MUST be the literal output of the program.
      2. STDERR MUST contain any compilation errors, runtime errors, or stack traces if the code is invalid.
      3. DO NOT add any conversational filler, meta-comments, or explanations.
      4. If there are multiple files, handle imports, headers, and relationships correctly according to the language's standards.
      5. Use the file "${entry || "main"}" as the primary entry point.
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
      const textOutput = result.text || "{}";
      let cleanedOutput = textOutput.trim();
      if (cleanedOutput.startsWith("```json")) {
        cleanedOutput = cleanedOutput.replace(/^```json\n/, "").replace(/\n```$/, "");
      } else if (cleanedOutput.startsWith("```")) {
        cleanedOutput = cleanedOutput.replace(/^```\n?/, "").replace(/\n?```$/, "");
      }
      let data;
      try {
        data = JSON.parse(cleanedOutput);
      } catch (parseError) {
        console.error("Failed to parse AI output:", cleanedOutput);
        data = { stdout: cleanedOutput, stderr: "", code: 0, time: 100 };
      }
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
    } catch (error) {
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
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
