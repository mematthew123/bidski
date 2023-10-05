import { ProjectCard } from '@/components/ProjectCard';
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    <div>
      <div>new project page</div>
      <ProjectCard />\{' '}
    </div>
  );
}
