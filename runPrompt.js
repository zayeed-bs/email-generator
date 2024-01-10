require('dotenv').config();

const Filter =  require('bad-words');
const filter = new Filter();

const OpenAI = require('openai');

const openai = new OpenAI.OpenAIApi(new OpenAI.Configuration({apiKey: process.env.GPT_API_KEY}));


let requestsCount = 0;

async function runPrompt (summary, req) {
    requestsCount++;
    console.log(`Request ${requestsCount}, IP: ${req.socket.remoteAddress}`);
  

    const prompt = `This is a website that automatically generates an email based on the subject, the sender and the recipient. 
    \n\n The summary of the email is ${filter.clean(summary)}. If the summary does not make sense, please return exactly and only one word, 'rephrase'.
    Limit the response to 200 words.
    
    \n\n Make the email engaging. Understand the context and format the email properly, change the formality according to the context.
    Make the email, atmost 200 words.`;

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            "role": "user", 
            "content": prompt,
        }],

        "temperature": 0.9,
        "max_tokens": 170,
    })

    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
}

module.exports = runPrompt;