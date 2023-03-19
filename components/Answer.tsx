import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Answer {
  answer: String;
}

export default function Answer({ answer }: Answer) {
  return (
    <div className='w-full p-2/3 flex flex-col justify-center items-center'>
      <ReactMarkdown className="w-2/3 mx-2">{answer.toString()}</ReactMarkdown>
    </div>
  );
}
