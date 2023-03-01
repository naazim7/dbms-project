import React, { useContext, useState } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
import { UserContext } from "@/src/components/hooks/userContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [img_url, setimg_url] = useState("");
  const [body, setBody] = useState("");
  const { quill, quillRef } = useQuill();
  const { user} = useContext(UserContext);
  const { user_id } = user;
  const router=useRouter();

  React.useEffect(() => {
      if (quill) {
        quill.on('text-change', () => {
          console.log(quillRef.current.firstChild.innerHTML);
          setBody(quillRef.current.firstChild.innerHTML)
        });
      }
    }, [quill]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleimg_urlChange = (e) => {
    setimg_url(e.target.value);
  };

  const handleBodyChange = (value) => {
    setBody(value);
  };
//title, body, user_id,img_url
  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      title,
      body,
      user_id,
      img_url
    };
    console.log(post);

    // Submit the question to your API
   axios.post('http://localhost:3001/post', post)
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
    console.log(title, img_url, body);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
        Title:
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleTitleChange}
        className="border rounded-lg py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="img_url" className="block text-gray-700 font-semibold mb-2">
        Image URL:
      </label>
      <input
        type="text"
        id="img_url"
        value={img_url}
        onChange={handleimg_urlChange}
        className="border rounded-lg py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="body" className="block text-gray-700 font-semibold mb-2">
        Body:
      </label>
      <div className="bg-gray-100 h-80 rounded-lg p-3">
        <div className="h-64">
          <div ref={quillRef} />
        </div>
      </div>
    </div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2  mt-4 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Submit
    </button>
  </form>
</div>

  );
}

export default CreatePost;
