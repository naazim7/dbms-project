import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "@/src/components/hooks/userContext";
import Swal from "sweetalert2";

export async function getServerSideProps(context) {
  const { q_id } = context.params;

  const [questionRes, answerRes] = await Promise.all([
    axios.get(`http://localhost:3001/questions/${q_id}`),
    axios.get(`http://localhost:3001/answer/${q_id}`),
  ]);

  const question = questionRes.data;
  const answer = answerRes.data;

  return { props: { question, answer } };
}
const SingleQuestionPage = ({ question, answer }) => {
  

  const { user} = useContext(UserContext);

  // console.log(user)
   const { user_id } = user;
   const {question_id}=question;
  let ques_id=question_id;
  const [body, setNewAnswer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       // Create the question object with the user's input
    const answer = {
      body,
      user_id,
      ques_id
      
    };
    console.log(answer);

    // Submit the question to your API
   axios.post('http://localhost:3001/answer', answer)
      .then(response => {
        console.log(response.data);
        Swal.fire({
            title: 'Success!',
            text: 'Your question has been submitted.',
            icon: 'success',
            confirmButtonText: 'Go to Home',
          }).then((result) => {
            window.location.reload();
          });
      })
      .catch(error => {
        console.error(error);
      });
     
    } catch (error) {
      console.error(error);
    }
  };



//Upvote Function 

const vote = async (answer_id, voteType) => {

  if(voteType=="upvote"){

    try {
      const response = await axios.put(`http://localhost:3001/answers/${answer_id}/upvote`, )
      .then(response => {
        console.log(response.data);
        Swal.fire({
            title: 'WOW!!',
            text: 'Your vote has been submitted.',
            icon: 'success',
            confirmButtonText: 'Go to Home',
          }).then((result) => {
            window.location.reload();
          });
      })
      const updatedAnswer = response.data;
  
      // TODO: Update the state to reflect the updated vote count for the answer with answerId
    } catch (error) {
      console.error(error);
    }

  }
  else if(voteType=='downvote'){
    try {
      const response = await axios.put(`http://localhost:3001/answers/${answer_id}/downvote`, )
      .then(response => {
        console.log(response.data);
        Swal.fire({
            title: 'Thanks ',
            text: 'Your vote has been submitted.',
            icon: 'warning',
            confirmButtonText: 'Go to Home',
          }).then((result) => {
            window.location.reload();
          });
      })
      const updatedAnswer = response.data;
  
      // TODO: Update the state to reflect the updated vote count for the answer with answerId
    } catch (error) {
      console.error(error);
    }


  }
  
};






  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="font-bold text-xl mb-2">{question.title}</div>
            <p className="text-gray-700 text-base mb-4">{question.body}</p>
            <div className="text-sm text-gray-600 mb-2">
              {question.views} views • posted by{" "}
              <span className="font-bold">{question.username}</span>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
          <div className="p-6 bg-white border-b border-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="answer"
                >
                  Your answer
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="answer"
                  name="answer"
                  value={body}
                  onChange={(event) => setNewAnswer(event.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
         
        {Array.isArray(answer)&& answer.length > 0 ? (
  <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
    <div className="p-6 bg-white border-b border-gray-200">
      {answer && answer.map((ans) => (
        <div key={ans.answer_id} className="mb-2 bg-yellow-100 p-3">
          <p className="text-gray-700 text-base mb-2">{ans.body}</p>
          <div className="text-sm text-gray-600 mb-2">
            Answer by <span className="font-bold">{ans.username}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button onClick={() => vote(ans.answer_id, 'upvote')} className="py-1 px-2 text-white bg-green-500 rounded-md hover:bg-green-600">
                Upvote
              </button>
              <button onClick={() => vote(ans.answer_id, 'downvote')} className="py-1 px-2 text-white bg-red-500 rounded-md hover:bg-red-600">
                Downvote
              </button>
            </div>
            <p className="text-sm text-gray-600">{ans.upVotes} Upvote</p>
            <p className="text-sm text-gray-600">{ans.downVotes} Downvote</p>
          </div>
        </div>
      ))}
    </div>
  </div>
) : <p>No Answer is given</p>}



          </div>
    </div>
  );
};

export default SingleQuestionPage;

/*{answer.length > 0 ? (
  <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
  <div className="p-6 bg-white border-b border-gray-200">
    {answer.map((ans) => (
      <div key={ans.answer_id} className="mb-4">
        <p className="text-gray-700 text-base mb-2">{ans.body}</p>
        <div className="text-sm text-gray-600 mb-2">
          posted by <span className="font-bold">{ans.username}</span>
        </div>
      </div>
    ))}
  </div>
</div>
) : */