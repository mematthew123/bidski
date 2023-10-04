import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='w-full h-screen flex bg-amber-500'>
      <h1 className='text-2xl mx-auto font-bold'>Bidski</h1>
    </div>
  );
}
