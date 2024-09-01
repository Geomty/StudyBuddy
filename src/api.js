require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class Conversation {
    constructor(note) {
        this.chat = model.startChat({ systemInstruction: { role: "system", parts: [{ text: `Your task is to act as a study buddy for the user and generate questions based on inputted study notes. When you are told to generate a question, only respond with the question, nothing else. When the user answers the question, respond with either "Correct answer." and a small compliment (e.g. "Good job!"), or with "Incorrect answer" and the correct answer. If the user at any point asks for clarification, answer their question. The study notes are: ${note}` }] } });
    }
    async generateQuestion() {
        return await this.#response("Generate a question."); // role: system
    }
    async validateAnswer(answer) {
        return await this.#response(answer); // role: user
    }
    async #response(prompt) {
        const result = await this.chat.sendMessage(prompt)
        return result.response.text();
    }
}

module.exports = Conversation;
