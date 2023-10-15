'use client';

import { Database } from '@/types/supabase';
import { useParams } from 'next/navigation';

async function getProject(slug: string) {
  const res = await fetch(`https://.../projects/${slug}`);
  const project = await res.json();
  console.log(project);
  return project;
}

export default function Page() {
  const params = useParams();
  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold text-gray-800'>Current Project</h2>
      <div className='w-full mx-auto mt-10 lg:mt-10 h-screen md:h-96'>
        <div className='bg-gray-100 h-full cursor-pointer flex items-center justify-center'>
          <div className='grid grid-cols-1 gap-4'>
            <h2>Project Name</h2>
            <p className='text-gray-600'>{params.slug}</p>
            <p className='text-gray-600'>Project Description</p>
          </div>
        </div>
      </div>
    </div>
  );
}
