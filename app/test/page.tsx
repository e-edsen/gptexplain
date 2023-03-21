'use client'

import React, { useState } from 'react';

export default function Test() {
  const [answer, setAnswer] = useState<String>('');
  const prompt = 'React?';

  async function generate(prompt: String){
    const res = await fetch('https://gptexplain.vercel.app/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })

    return res.json()
  }

  const clicked = async (e: any) =>{
    e.preventDefault();
    const call = await generate(prompt)
    setAnswer(call.answer)
  }
  return (
    <div>
      <h1>API</h1>
      <button className="btn btn-primary" onClick={clicked}>
        Generate
      </button>
      {answer ? <p>{answer}</p> : <h1>No Answer</h1>}
    </div>
  );
}
