'use client';
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CurrentProjectGrid = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getProjects = async () => {
      const { data } = await supabase.from('projects').select();
      if (data) {
        setProjects(data as any);
      }
    };

    getProjects();
  }, [supabase, setProjects]);

  console.log(projects.length);
  // When we select
  return (
    // we render the project name here.
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold text-gray-800'> Current Projects</h2>

      <div className='w-full mx-auto mt-10 lg:mt-10 grid lg:grid-cols-2 h-screen md:h-96  gap-4'>
        {projects.map((project: any) => (
          <Link href={`/project/${project.project_name}`}>
            <div
              key={project.name}
              className='bg-gray-100 h-full cursor-auto flex items-center justify-center'
            >
              <div className='grid grid-cols-1 gap-4'>
                <h2>Project Name</h2>
                <p className='text-gray-600'> {project.project_name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CurrentProjectGrid;
