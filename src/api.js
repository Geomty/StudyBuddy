require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI();

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

module.exports = startConversation;
