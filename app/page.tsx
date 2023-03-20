'use client';

import { useEffect, useState } from 'react';
import Answer from '@/components/Answer';

async function getAnswer(prompt: String) {
  const res = await fetch('http://localhost:3000/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

const templatePrompt = (topic: String) => {
  return `Please ignore all previous instructions. target language is English.  Respond only in language [TARGET LANGUAGE].  I want you to act as a very proficient SEO and high end copy writer that speaks and writes fluent English.  Write the text as long as possible, at least 400 words. When preparing the explanation, prepare it using {start explanation} and write the necessary words in bold. I want you to pretend that you can write an explanation so good in English.  that it can outrank other websites.start with {start explanation} tags at the beginning of the explanation and end with {stop explanation} tags at the end of the explanation. Use metaphors. I want you to start with a short story. Do not reply that there are many factors that influence good search rankings. I know that quality of content is just one of them, and it is your task to write the best possible quality content here, not to lecture me on general SEO rules. I give you the Title ${topic} for the explanation we need to write. Write a long, fully markdown formatted explanation in English.  with necessary keywords. The explanation should contain rich and comprehensive, very detailed paragraphs, with lots of details. Do not echo my prompt. Let the explanation be a long explanation of 400 words. Do not remind me what I asked you for. Do not apologize. Do not self-reference. Do not use generic filler phrases. Use lots of mini stories and metaphors. Do use metaphors. Do use useful subheadings with keyword-rich titles. Start the explanation from an agreeable point. Then Get to the point precisely and accurate. Explain what, why, how and when and give needed context. Use metaphors toexplain difficult concepts. just give me your best possible explanation. All output shall be in English. . Write the explanation as long as possible, at least 400 words. Use metaphors.start with {start explanation} tags at the beginning of the article and end with {stop explanation} tags at the end of the article.`;
};

export default function Home() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [prompt, setPrompt] = useState<String>('');
  const [answer, setAnswer] = useState<String>('');

  const editPrompt = (e: any) => {
    e.preventDefault();
    setPrompt(e.target.value);
  };

  const submitPrompt = (e: any) => {
    e.preventDefault();
    if (!prompt) {
      setAnswer('Please enter a topic!');
      return;
    }

    generate(prompt);
  };

  async function generate(prompt: String) {
    setAnswer('loading');

    const res = await getAnswer(templatePrompt(prompt));
    console.log(res);

    setAnswer(res.answer);
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        <div className='flex justify-center items-center min-h-screen'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div
          className={`flex ${
            answer ? 'flex-row' : 'flex-col'
          } justify-center items-center min-h-screen mt-10`}
        >
          <form
            className='flex flex-col justify-start items-start w-1/4 min-h-screen'
            onSubmit={submitPrompt}
          >
            <input
              className='textarea textarea-bordered w-full max-w-xs mb-5'
              placeholder='What is React?'
              type='text'
              value={prompt.toString()}
              name='prompt'
              onChange={editPrompt}
            />
            <select
              className='select select-bordered w-full max-w-xs mb-5'
              disabled
            >
              <option disabled selected>
                Choose a prompt type
              </option>
              <option value='1'>Explain</option>
              <option value='2'>Summarize</option>
              <option value='3'>Answer Multiple Choice</option>
            </select>
            <button className='btn btn-primary w-full max-w-xs' type='submit'>
              Explain!
            </button>
          </form>

          <div className='flex mt-5 w-1/2 justify-center items-center mb-5'>
            {answer ? <Answer answer={answer} /> : <h1>Please ask me!</h1>}
          </div>
        </div>
      )}
    </div>
  );
}
