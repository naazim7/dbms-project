import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../hooks/userContext';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import AskQuestionNotice from './AskQuestionNotice';

function AskForm() {
  const router=useRouter();
  const [title, setTitle] = useState('');
  const [tag_id, setTagId] = useState(null);
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState('');
  const { user} = useContext(UserContext);
 
 // console.log(user)
  const { user_id } = user;
  useEffect(() => {
    // Fetch all available tags from your API
    axios.get('http://localhost:3001/tags')
      .then(response => {
        setTags(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleTagChange(event) {
  
   
    setTagId(parseInt(event.target.value));
  }

  function handleBodyChange(event) {
    setBody(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    

    // Create the question object with the user's input
    const question = {
      title,
      body,
      user_id,
      tag_id
    };
    console.log(question);

    // Submit the question to your API
   axios.post('http://localhost:3001/questions', question)
      .then(response => {
        console.log(response.data);
        Swal.fire({
            title: 'Success!',
            text: 'Your question has been submitted.',
            icon: 'success',
            confirmButtonText: 'Go to Home',
          }).then((result) => {
            if (result.isConfirmed) {
            router.push('/')
            }
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

if(user){
  return (
    <>
    <div className="mb-4 bg-white shadow-md ">
    <h2 className="text-lg font-bold text-gray-800 m-2 text-center">Ask A Question</h2>
    <hr className="border-gray-400 border-1 w-full"></hr>
  </div>
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-8 border border-gray-200 rounded-lg shadow-lg">
    <div className="mb-4">
      <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
      <input type="text" id="title" value={title} onChange={handleTitleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>
    <div className="mb-4">
      <label htmlFor="tag" className="block text-gray-700 font-bold mb-2">Tag:</label>
      <select
  className="border p-2 rounded w-full"
  name="tag"
  id="tag"
  value={tag_id}
  onChange={handleTagChange}
>
  <option value="">Select a tag</option>
  {tags.map(tag => (
    <option key={tag.tag_id} value={tag.tag_id}>
      {tag.name}
    </option>
  ))}
</select>

    </div>
    <div className="mb-4">
      <label htmlFor="body" className="block text-gray-700 font-bold mb-2">Question Body:</label>
      <textarea id="body" value={body} onChange={handleBodyChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
    </div>
    
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
  </form>
  <AskQuestionNotice/></>
  )}

else {

return <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-medium">Message</h2>
        <p className="text-gray-600">Please Login for Asking a Question</p>
      </div>
}
}
export default AskForm;
