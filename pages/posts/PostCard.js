import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

const BlogPost = ({ title, body, post_id,date }) => {
  const excerpt = `${body.split(' ').slice(0, 50).join(' ')}...`;

  return (
   
  <div className="w-full md:w-1/3 p-3">
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div dangerouslySetInnerHTML={{ __html: excerpt }} />

      <p className="text-gray-600 text-sm">
        {dayjs(date).format('MMMM D, YYYY')}
      </p>
      <Link href={`/posts/${post_id}`} className="text-blue-500 hover:text-blue-700 font-medium">
        Read more
      </Link>
    </div>
  </div>
  
  


  );
};



export default BlogPost;
