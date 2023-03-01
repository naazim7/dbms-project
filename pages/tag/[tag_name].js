import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const TagPage = ({ tag_name, questions }) => {
  const router = useRouter();
  const [tagName, setTagName] = useState(tag_name);
  const [questionsList, setQuestionsList] = useState(questions);
 
  useEffect(() => {
    setTagName(router.query.tag_name);
  }, [router.query.tag_name]);

  return (
    <>
      <div className='bg-blue-500 p-5 text-center text-xl text-white-500 mt-5 mb-4'>{tagName}</div>
      <div className="flex flex-wrap justify-center">
        {questionsList.map(question => (
          <div key={question.question_id} className="max-w-md w-full mx-3 my-3 bg-white rounded-md shadow-md overflow-hidden">
            <div className="px-4 py-2">
             <Link href={`/question/${question.question_id}`}><div className="font-bold text-xl mb-2">{question.title}</div></Link>
              <p className="text-gray-700 text-base">{question.body}</p>
            </div>
            <div className="px-4 py-2 bg-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">{question.views} views</div>
              <div className="text-sm text-gray-600">by  {question.username}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TagPage;

export async function getServerSideProps(context) {
  const { tag_name } = context.params;

  try {
    const response = await axios.get(`http://localhost:3001/tag/${tag_name}`);
    const questions = response.data;

    return { props: { tag_name, questions } };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
}
