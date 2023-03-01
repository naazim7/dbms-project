import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import dayjs from 'dayjs';

const SinglePost = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
     <div className="bg-gray-100 py-4">
      <div className=" mx-5 p-3">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {post?.img_url && (
            <img className="w-full h-64 object-cover object-center" src={post.img_url} alt={post.title} />
          )}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">{post?.title}</h1>
            <div className="text-gray-600 text-sm mb-4"> {dayjs(post.created_at).format('MMMM D, YYYY')}</div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post?.body }} />
          </div>
        </div>
      </div>
      </div>
    
    
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { post_id } = params;

  try {
    const response = await axios.get(`http://localhost:3001/posts/${post_id}`);
    const post = response.data;

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export default SinglePost;
