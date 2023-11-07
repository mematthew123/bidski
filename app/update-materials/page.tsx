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
    <div>
      <ProjectWrapper>
        <h1>Update Materials</h1>
      </ProjectWrapper>
    </div>
  );
}
