import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

function TagList() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/tag')
      .then(response => {
        setTags(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-wrap">
      {tags.map(tag => (
        <div key={tag.name} className="m-2 p-2 bg-blue-200 rounded-lg flex items-center">
          <Link href={`/tag/${tag.name}`}><h2 className="font-bold mr-2">{tag.name}</h2></Link>
          <div className="bg-blue-400 px-2 py-1 rounded-full text-white">{tag.count}</div>
        </div>
      ))}
    </div>
  );
}

export default TagList;
