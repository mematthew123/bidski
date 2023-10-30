import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import LogoutButton from '../components/LogoutButton';

export const dynamic = 'force-dynamic';

export async function Navigation() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className='bg-white w-full border-b md:border-0'>
      <div className='flex justify-between mx-auto py-3 md:py-5 '>
        <Link href='/'>
          <h1 className='text-3xl font-bold text-purple-600 cursor-pointer'>
            Bidski
          </h1>
        </Link>

        {user ? (
          <LogoutButton />
        ) : (
          <Link
            href='/login'
            className='py-2 px-3 rounded-md text-gray-600 hover:text-indigo-600'
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
