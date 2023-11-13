import Link from 'next/link';
import Messages from './messages';

export default function Login() {
  return (
    <div className='flex-1 flex justify-center items-center w-full px-8 sm:max-w-md'>
      <form className='w-full space-y-4' action='/auth/sign-in' method='post'>
        <div>
          <label className='block text-md mb-2' htmlFor='email'>
            Email
          </label>
          <input
            className='w-full rounded-md px-4 py-2 border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            name='email'
            type='email'
            placeholder='you@example.com'
            required
          />
        </div>

        <div>
          <label className='block text-md mb-2' htmlFor='password'>
            Password
          </label>
          <input
            className='w-full rounded-md px-4 py-2 border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            type='password'
            name='password'
            placeholder='••••••••'
            required
          />
        </div>

        <button className='w-full bg-green-700 hover:bg-green-800 rounded py-2 text-white'>
          Sign In
        </button>
        <button
          formAction='/auth/sign-up'
          className='w-full border border-gray-700 hover:border-gray-800 rounded py-2 text-black'
        >
          Sign Up
        </button>

        <Messages />
      </form>
    </div>
  );
}
