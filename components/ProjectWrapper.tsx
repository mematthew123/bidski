import React, { ReactNode } from 'react';
import HeaderComponent from './Header';

interface ProjectWrapperProps {
  children: ReactNode;
}

const ProjectWrapper = ({ children }: ProjectWrapperProps) => {
  return (
    <>
      <HeaderComponent />
      <div className='flex-col h-screen bg-gray-50  overflow-hidden'>
        {children}
      </div>
    </>
  );
};

export default ProjectWrapper;
