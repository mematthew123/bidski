import React from 'react';
import OneBidComponent from '@/components/OneBidComponent';
import Widget from '@/components/Widget';

function page() {
  return (
    <div className='container bg-gray-200 h-screen mx-auto flex justify-center mt-20 '>
      <OneBidComponent />
      {/* <Widget /> */}
    </div>
  );
}

export default page;
