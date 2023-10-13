import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CurrentProjectGrid from '@/components/CurrentProjectGrid';

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
    let { data, error } = await supabase.from('projects').select('*');

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data;
  }
  fetchProjects().then((projects) => {
    console.log(projects);
  });

  return (
    <div className='container mx-auto'>
      <CurrentProjectGrid />
    </div>
  );
}
