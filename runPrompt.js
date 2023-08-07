require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.GPT_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function runPrompt (from, to, subject) {
    console.log("Running prompt");
    const prompt = `This is a website that automatically generates an email based on the subject, the sender and the recipient. 
    \n\n The sender is ${from}. The recepient is ${to}. The subject of the email is ${subject}. 
    
    \n\n Make the email engaging. Understand the context and format the email properly, change the formality according to the context.
    Make the email, atmost 500 words.`;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1024,
        temperature: 1
    })

    return response.data.choices[0].text;
}

module.exports = runPrompt;