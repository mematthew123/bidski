import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

import SingleProjectCard from '@/components/SingleProjectCard';

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);
  if (!user) {
    redirect('/login');
  }

  async function fetchSingleProject() {
    let { data, error } = await supabase.from('projects').select('*');

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  fetchSingleProject().then((projects) => {
    console.log(projects);
  });

  return (
    <div>
      <SingleProjectCard />
    </div>
  );
}
