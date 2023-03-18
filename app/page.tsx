'use client';

import { useEffect, useState } from 'react';
import Answer from '@/components/Answer';

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
    console.log(prompt);
    generate(prompt);
  };

  async function generate(prompt: String) {
    const res = await prompt;
    setAnswer(res);
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        <div className='flex justify-center items-center h-screen'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center h-screen'>
          <form className='flex flex-col' onSubmit={submitPrompt}>
            <label htmlFor='prompt'>Topics :</label>
            <input
              className='border-2 border-black rounded-sm mb-5'
              type='text'
              value={prompt.toString()}
              name='prompt'
              onChange={editPrompt}
            />
            <button className='border-2 border-black' type='submit'>
              Explain!
            </button>
          </form>

          <div className='mt-5'>
            {answer ? (
              <Answer answer={answer} />
            ) : (
              <h1>Start asking me</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
