import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';
import Button from '@/components/Button';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='w-full flex flex-col items-center'>
      <nav className='w-full flex justify-center '>
        <div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground'>
          <h1 className='text-2xl font-bold'>Bidski</h1>
          {user ? (
            <div className='flex items-center gap-4'>
              Hey, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            <Link
              href='/login'
              className='py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <Button />
    </div>
  );
}
