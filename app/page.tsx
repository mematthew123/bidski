import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import LogoutButton from '../components/LogoutButton';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='w-full h-screen flex justify-center items-center bg-amber-500'>
      <div className='text-center'>
        <h1 className='text-6xl font-extrabold text-white mb-4'>Bidski</h1>
        <p className='text-2xl text-white mb-8'>
          The best way to manage your projects
        </p>
        {user ? (
          // if user is logged in, route to dashboard
          <div className='space-y-4'>
            <a
              href='/dashboard'
              className='inline-block bg-indigo-600 py-3 px-6 rounded-md text-white text-lg font-medium hover:bg-indigo-700 transition duration-300'
            >
              Dashboard
            </a>
            <LogoutButton />
          </div>
        ) : (
          <a
            href='/login'
            className='inline-block bg-white py-3 px-6 rounded-md text-gray-800 text-lg font-medium hover:bg-gray-100 transition duration-300'
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
}
