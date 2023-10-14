import Link from 'next/link';
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProjectWrapper from '@/components/ProjectWrapper';

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);
  if (!user) {
    redirect('/login');
  }

  return (
    <ProjectWrapper>
      <section className='h-screen flex flex-col justify-center items-center'>
        <div className='container mx-auto text-center'>
          <h1 className='text-3xl font-bold text-purple-600'>
            Welcome{user ? `, ${user.email}` : ''}!
          </h1>
          <h1 className='text-3xl font-bold text-purple-600'>
            What would you like to do?
          </h1>
          <div className='container mx-auto gap-4 flex  justify-center items-center'>
            <Link href='/new-project'>
              <button className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-10'>
                Create a new project
              </button>
            </Link>
            <Link href='/current-projects'>
              <button className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-10'>
                Current projects
              </button>
            </Link>
          </div>
        </div>
      </section>
    </ProjectWrapper>
  );
}
