import { NextResponse } from 'next/server';

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const chatGPT = async (prompt: String) => {
  // console.log(prompt);
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  return response['data']['choices'][0]['message']['content'];
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
