const { Configuration, OpenAIApi } = require("openai");

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
    console.error('OPENAI_API_KEY is not set.');
    process.exit(1);
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    openai,
};
// const OpenAI = require('openai');

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
// });

// module.exports = {
//     openai,
// };