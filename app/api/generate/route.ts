import { NextResponse } from 'next/server';

interface ChatResponse {
  choices: [
    {
      message: {
        content: string;
      };
    }
  ];
}

const templatePrompt = (topic: string) => {
  return `Please ignore all previous instructions. Respond in English. I want you to act as a best teacher like Feynmann. Explain about ${topic} in 200 words. Explain as fast as possible, Respond to this in under 10 second!. start with {start explanation} tags at the beginning of the explanation and end with {stop explanation} tags at the end of the explanation. Use metaphors. I want you to start with a short story. Avoid generic phrases, self-referencing, and apologies. Use metaphors and mini-stories to explain difficult concepts. Focus on providing a comprehensive and detailed explanation`;
};

// GPT NPM Package
// const { Configuration, OpenAIApi } = require('openai');

// const configuration = new Configuration({
//   apiKey: process.env.API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// const chatGPT = async (prompt: String) => {
//   // console.log(prompt);
//   const response = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo-0301',
//     messages: [{ role: 'user', content: templatePrompt(prompt) }],
//   });
//   return response['data']['choices'][0]['message']['content'];
// };

const chatGPT = async (prompt: string) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-0301',
      messages: [{ role: 'user', content: templatePrompt(prompt) }],
    }),
  });
  const responseData: ChatResponse = await response.json();
  // console.log(responseData);
  return responseData.choices[0].message.content;
};

// POST /api/generate
export async function POST(request: Request) {
  if (!request.body) {
    return NextResponse.json({ error: 'No body' });
  }
  const bodyObj = await request.json();
  if (!bodyObj.prompt) {
    return NextResponse.json({ error: 'No prompt' });
  }

  const { prompt } = bodyObj;
  const answer = await chatGPT(prompt);
  return NextResponse.json({ answer });
}

export async function GET(request: Request) {
  return NextResponse.json({ error: 'No GET' });
}
