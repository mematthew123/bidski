import Link from 'next/link';
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProjectWrapper from '@/components/ProjectWrapper';
import { Button } from '@/components/ui/button';

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
      <section className='h-screen flex  justify-center items-center'>
        <div className=' items-center text-center'>
          <h1 className='text-3xl font-bold text-purple-600'>
            Welcome{user ? `, ${user.email}` : ''}!
          </h1>
          <h1 className='text-3xl font-bold my-10 text-purple-600'>
            What would you like to do?
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center'>
            <Link href='/new-project'>
              <Button> Create a new project</Button>
            </Link>
            <Link href='/current-projects'>
              <Button> View current projects</Button>
            </Link>
            <Link href='/add-materials'>
              <Button> Add new materials</Button>
            </Link>
            <Link href='/materials'>
              <Button> View materials</Button>
            </Link>
          </div>
        </div>
      </section>
    </ProjectWrapper>
  );
}
