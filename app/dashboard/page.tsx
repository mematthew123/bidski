import Link from 'next/link';
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SideBar from '@/components/SideBar';

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);
  if (!user) {
    redirect('/login');
  }

  return (
    <div className='w-full mx-auto mt-10 lg:mt-10 grid lg:grid-cols-2 h-screen md:h-96  gap-4'>
      <SideBar />
      <div className='container mx-auto'>
        <h2 className='text-2xl font-bold text-gray-800'>My Projects</h2>
        <p className='text-gray-600'> Hello {user?.email}</p>
      </div>
      <Link href='/new-project'>
        <div className='bg-gray-100 h-full cursor-auto flex items-center justify-center'>
          Start New Bid
        </div>
      </Link>
      <Link href='/current-projects'>
        <div className='bg-gray-100 h-full cursor-auto flex items-center justify-center'>
          Current Projects
        </div>
      </Link>
    </div>
  );
}
