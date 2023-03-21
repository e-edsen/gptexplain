'use client';

import React, { useState } from 'react';

export default function Test() {
  const [answer, setAnswer] = useState<String>('');
  const prompt = 'React?';

  const templatePrompt = (topic: String) => {
    return `Please ignore all previous instructions. target language is English.  Respond only in language English.  I want you to act as a very proficient SEO and high end copy writer that speaks and writes fluent English.  Write the text as long as possible, at least 400 words. When preparing the explanation, prepare it using {start explanation} and write the necessary words in bold. I want you to pretend that you can write an explanation so good in English.  that it can outrank other websites.start with {start explanation} tags at the beginning of the explanation and end with {stop explanation} tags at the end of the explanation. Use metaphors. I want you to start with a short story. Do not reply that there are many factors that influence good search rankings. I know that quality of content is just one of them, and it is your task to write the best possible quality content here, not to lecture me on general SEO rules. I give you the Title ${topic} for the explanation we need to write. Write a long, fully markdown formatted explanation in English.  with necessary keywords. The explanation should contain rich and comprehensive, very detailed paragraphs, with lots of details. Do not echo my prompt. Let the explanation be a long explanation of 400 words. Do not remind me what I asked you for. Do not apologize. Do not self-reference. Do not use generic filler phrases. Use lots of mini stories and metaphors. Do use metaphors. Do use useful subheadings with keyword-rich titles. Start the explanation from an agreeable point. Then Get to the point precisely and accurate. Explain what, why, how and when and give needed context. Use metaphors toexplain difficult concepts. just give me your best possible explanation. All output shall be in English. . Write the explanation as long as possible, at least 400 words. Use metaphors.start with {start explanation} tags at the beginning of the article and end with {stop explanation} tags at the end of the article.`;
  };

  async function generate(prompt: String) {
    const res = await fetch('https://gptexplain.vercel.app/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    return res.json();
  }

  const clicked = async (e: any) => {
    e.preventDefault();
    const call = await generate(templatePrompt(prompt));
    setAnswer(call.answer);
  };
  return (
    <div>
      <h1>API</h1>
      <button className='btn btn-primary' onClick={clicked}>
        Generate
      </button>
      {answer ? <p>{answer}</p> : <h1>No Answer</h1>}
    </div>
  );
}
