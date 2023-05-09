import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Answer from '@/components/Answer';

async function getAnswer(prompt: String) {
  const res = await fetch('https://gptexplain.vercel.app/api/generate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export default function Home() {
  const [prompt, setPrompt] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const editPrompt = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPrompt(e.target.value);
  };

  const submitPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) {
      setAnswer('Please enter a topic!');
      return;
    }

    generate(prompt);
  };

  async function generate(prompt: string) {
    setAnswer('loading');

    const res = await getAnswer(prompt);
    console.log(res);

    setAnswer(res.answer);
  }

  return (
    <div>
      {loading ? (
        <div className='flex justify-center items-center max-h-screen'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div
          className={`flex ${
            answer ? 'flex-row' : 'flex-col'
          } justify-center items-center min-h-screen mt-10`}
        >
          <form
            className='flex flex-col justify-center items-center w-1/4'
            onSubmit={submitPrompt}
          >
            <input
              className='textarea textarea-bordered w-full max-w-xs mb-5'
              placeholder='What is React?'
              type='text'
              value={prompt}
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
