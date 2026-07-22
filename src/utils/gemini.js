import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config";

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

/**
 * Executes a diagnostic using Gemini 2.5 Flash
 * @param {Object} payload 
 * @param {Array} payload.images - Array of base64 image strings (with or without data:image/jpeg;base64, prefix)
 * @param {string} payload.text_input - Additional text input from user
 * @param {string} payload.type - "task" or "question"
 * @param {Array} contextQuestions - The questions context
 * @returns {Promise<Object>}
 */
export const executeGeminiDiagnostic = async (payload, contextQuestions = []) => {
  const model = genAI.getGenerativeModel({ model: config.geminiModel || "gemini-1.5-flash" });
  
  // Construct the prompt
  let prompt = `You are an AI diagnostic tool for education. 
Analyze the following student input for the provided question(s). 
Provide a detailed response in JSON format with the following keys:
- "Analysis": Your evaluation of the student's work.
- "Solution": The correct solution or steps.
- "Answer": The final answer.

Questions:
${contextQuestions.map((q, i) => `Q${i+1}: ${q}`).join("\n")}

Student's Additional Text Input: ${payload.text_input || "None"}
`;

  const parts = [{ text: prompt }];

  // Add images if present
  if (payload.images && payload.images.length > 0) {
    payload.images.forEach((imgBase64, index) => {
      // Remove data:image/...;base64, prefix if present
      const base64Data = imgBase64.replace(/^data:image\/\w+;base64,/, "");
      parts.push({
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg"
        }
      });
    });
  }

  try {
    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse JSON from response
    try {
      // Find JSON block if it's wrapped in markdown
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { Analysis: text };
    } catch (e) {
      return { Analysis: text };
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
};
