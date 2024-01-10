require('dotenv').config();

const Filter =  require('bad-words');
const filter = new Filter();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.GPT_API_KEY,
});

const openai = new OpenAIApi(configuration);
let requestsCount = 0;



async function runPrompt (summary) {
    requestsCount++;
    console.log(`Request ${requestsCount}`);
  

    const prompt = `This is a website that automatically generates an email based on the subject, the sender and the recipient. 
    \n\n The summary of the email is ${filter.clean(summary)}. If the summary does not make sense, please return exactly and only one word, 'rephrase'.
    Limit the response to 200 words.
    
    \n\n Make the email engaging. Understand the context and format the email properly, change the formality according to the context.
    Make the email, atmost 200 words.`;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.9
    })

    return response.data.choices[0].text;
}

module.exports = runPrompt;