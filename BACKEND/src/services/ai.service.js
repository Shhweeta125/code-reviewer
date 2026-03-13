const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

const SYSTEM_PROMPT = `You are an expert code reviewer. When given code, you must:
1. Analyze the code for bugs, errors, and potential issues
2. Check for security vulnerabilities
3. Suggest performance improvements
4. Review code style and best practices
5. Provide a clear, structured review with specific line references when possible

Format your response in markdown with sections:
## Summary
## Issues Found
## Suggestions
## Improved Code (if applicable)`;

async function generateContent(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${SYSTEM_PROMPT}\n\nPlease review the following code:\n\n${prompt}`,
  });
  return response.text;
}

module.exports = {
  generateContent,
};