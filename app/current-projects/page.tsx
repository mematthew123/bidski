import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CurrentProjectGrid from '@/components/CurrentProjectGrid';
import ProjectWrapper from '@/components/ProjectWrapper';

export const dynamic = 'force-dynamic';

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);
  if (!user) {
    redirect('/login');
  }

  async function fetchProjects() {
    const { user } = (await supabase.auth.getUser()) as any;
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  }

  return (
    <div className='container mx-auto'>
      <ProjectWrapper>
        <CurrentProjectGrid />
      </ProjectWrapper>
    </div>
  );
}
