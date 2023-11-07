import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProjectWrapper from '@/components/ProjectWrapper';
import PaintsCard from '@/components/PaintsCard';

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

  return (
    <div className='container mx-auto'>
      <ProjectWrapper>
        <PaintsCard />
      </ProjectWrapper>
    </div>
  );
}
