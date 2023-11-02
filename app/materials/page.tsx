import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CurrentMaterialGrid from '@/components/CurrentMaterialsGrid';
import ProjectWrapper from '@/components/ProjectWrapper';

export const dynamic = 'force-dynamic';

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
    <div>
      <ProjectWrapper>
        <CurrentMaterialGrid />
      </ProjectWrapper>
    </div>
  );
}
