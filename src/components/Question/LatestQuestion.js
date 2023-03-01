

import axios from 'axios';
import { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';

function LatestQuestion() {
  const [questions,setQuestion] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/latest-questions')
      .then(res => setQuestion(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {questions.map(question => (
        <QuestionCard question={question.title} answer={question.body} ques_id={question.question_id} ></QuestionCard>
      ))}
    </div>
  );
}

export default LatestQuestion;