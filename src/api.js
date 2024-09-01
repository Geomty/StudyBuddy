require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI();

/*
async function startConversation() {
    let conversation = {
        messages: [
            {
                role: "system",
                content: "yada yada" // TODO
            }
        ]
    };
    conversation.getResponse = async function(answer) {
        conversation.messages.push({
            role: "user",
            content: answer
        });
        const completion = await openai.chat.completions.create({
            messages: conversation.messages,
            model: "gpt-4o"
        }).choices.message;
        conversation.messages.push(completion);
        return completion.content;
    }
    return conversation.getResponse("Now give the first question");
}
*/

class Conversation {
    constructor(note) {
        this.note = note;
        this.messages = [];
        this.#response("TODO: Send the notes, ask for one question about them each time a specific keyword is sent, ask for the right answer to the question and whether the user got it right (in the format of a stringified array) each time a guess to the previous question is sent");
    }
    async generateQuestion() {
        return await this.#response("TODO: Keyword");
    }
    async validateAnswer(answer) {
        return await this.#response("TODO: Pass user's guess");
    }
    async #response(prompt) {
        this.messages.push(prompt);
        const response = await openai.chat.completions.create({
            messages: this.messages,
            model: "gpt-4o-mini"
        }).choices[0].message;
        this.messages.push(response);
        return response;
    }
}

module.exports = Conversation;
