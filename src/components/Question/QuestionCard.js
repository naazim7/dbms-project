import Link from 'next/link';
import React from 'react';

const QuestionCard = ({ question, answer,ques_id }) => {
  return (
    <div className="p-4 w-full bg-white shadow-lg rounded-lg mx-auto mt-1 mb-1">
      <Link href={`/question/${ques_id}`} className="text-lg font-medium text-blue-400">{question}</Link>
      <p className="mt-2 text-gray-600">{answer}</p>
      <p className='text-sm'>Answer: <span className='text-gray-400'>20</span></p>
    
    </div>
  );
};

export default QuestionCard;
