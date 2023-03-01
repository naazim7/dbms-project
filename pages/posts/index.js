

import axios from 'axios';
import { useEffect, useState } from 'react';
import BlogList from './PostCard';


function LatestPost() {
  const [posts,setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    
       <div className="flex flex-wrap">
      {posts?.map(post => (

        <BlogList title={post.title} body={post.body} post_id={post.post_id} date={post.created_at} ></BlogList>
      ))}
    </div>
  );
}

export default LatestPost;