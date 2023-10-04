import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div className='w-full mx-auto mt-10 lg:mt-52  grid lg:grid-cols-2 h-screen md:h-96  gap-4'>
      <Link href='/new-project'>
        <div className='bg-gray-100 h-full cursor-auto flex items-center justify-center'>
          Start New Bid
        </div>
      </Link>
    </div>
  );
}
