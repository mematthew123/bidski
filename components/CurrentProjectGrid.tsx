'use client';
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

const CurrentProjectGrid = () => {
  const [projects, setProjects] = useState([]);

  const supabase = createClientComponentClient();

  const userProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

    if (error) {
      console.log(error);
    } else {
      setProjects(data as any);
    }
  };

  useEffect(() => {
    userProjects();
  }, []);

  // When we select
  return (
    // we render the project name here.
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <h2 className='text-3xl sm:text-4xl font-bold text-gray-800 my-6'>
        Current Projects
      </h2>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr'>
        {projects.map((project: any) => (
          <Link href={`/project/${project.project_name}`} key={project.name}>
            <div className='bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col justify-between hover:bg-gray-200 transition duration-300'>
              <div>
                <h3 className='text-xl font-semibold text-gray-700'>
                  {project.project_name}
                </h3>
                <p className='text-gray-600 mt-2'>{project.total_cost}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CurrentProjectGrid;
