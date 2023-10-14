import React, { ReactNode } from 'react';
import HeaderComponent from './Header';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Documents', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
function SideBar() {
  return (
    <nav
      className='fixed top-0 left-0 h-full w-64 bg-white'
      aria-label='Sidebar'
    >
      <ul role='list' className='space-y-1 py-4 pr-4'>
        {navigation.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-50 text-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                'group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold'
              )}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface ProjectWrapperProps {
  children: ReactNode;
}

const ProjectWrapper = ({ children }: ProjectWrapperProps) => {
  return (
    <>
      <HeaderComponent />
      {/* <SideBar /> */}

      <div className='flex h-screen bg-gray-50 ml-64 overflow-hidden'>
        {children}
      </div>
    </>
  );
};

export default ProjectWrapper;
