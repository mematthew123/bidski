import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import LogoutButton from '../components/LogoutButton';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='w-full h-screen flex justify-center bg-amber-500'>
      <div className='flex flex-col justify-center items-center h-full'>
        <h1 className='text-5xl font-bold text-white'>Bidski</h1>
        <h1 className='text-3xl font-bold text-white'>
          The best way to manage your projects
        </h1>
        {user ? (
          <LogoutButton />
        ) : (
          <a
            href='/login'
            className='py-2 px-3 rounded-md text-gray-600 hover:text-indigo-600'
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
}
