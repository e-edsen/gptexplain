import React from 'react';
import ReactMarkdown from 'react-markdown';

interface AnswerProps {
  answer: String;
}

export default function Answer({ answer }: AnswerProps) {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      {answer === 'loading' ? (
        <h1>loading...</h1>
      ) : (
        <ReactMarkdown className='w-2/3 text-left markdown'>
          {answer.toString()}
        </ReactMarkdown>
      )}
    </div>
  );
}
