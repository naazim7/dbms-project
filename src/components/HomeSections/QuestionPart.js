import React from 'react';
import HeroSection from '../Header/HeroSection';

import LatestQuestion from '../Question/LatestQuestion';
import Statistics from './Statistics';
import TagList from './TagList';

const QuestionPart = () => {
    return (
        <>
        <HeroSection/>
       
        <div className="flex">
  <div className="w-9/12 p-4">
  <div className='mx-auto'> <LatestQuestion/></div>
  </div>
  <div className="w-3/12 p-4">
    <div className='card p-4'>
      <p>Tags</p>
       <TagList/>
        
    </div>
  </div>
</div>
</>
    );
};

export default QuestionPart;