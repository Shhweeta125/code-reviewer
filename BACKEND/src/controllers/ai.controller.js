const aiService = require('../services/ai.service');

module.exports = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).json({ error: "Code is required" });
    }

    try {
        const response = await aiService.generateContent(code);
        res.json({ review: response });
    } catch (error) {
        console.error("AI Service Error:", error.message || error);

        // Return meaningful error message to frontend
        const statusCode = error.status || 500;
        let errorMessage = "Failed to generate code review";

        if (statusCode === 429) {
            errorMessage = "API rate limit exceeded. Please wait a moment and try again.";
        } else if (statusCode === 401 || statusCode === 403) {
            errorMessage = "Invalid API key. Please check your GOOGLE_GEMINI_KEY in .env";
        } else if (error.message) {
            errorMessage = error.message;
        }

        res.status(statusCode).json({ error: errorMessage });
    }
};