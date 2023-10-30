'use client';
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { useParams } from 'next/navigation';
const SingleProjectCard = () => {
  const [singleProject, setSingleProject] = useState([]);
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();
  const { slug } = useParams();

  useEffect(() => {
    const getSingleProject = async () => {
      const { data } = await supabase.from('projects').select();
      // we want to filter the data to only show the project that matches the slug.
      const filteredData = data?.filter(
        (project: any) => project.project_name === slug
      );
      console.log(filteredData);
      if (data) {
        setSingleProject(filteredData as any);
      }
    };
    getSingleProject();
  }, [supabase, setSingleProject]);

  console.log(singleProject);
  // When we select
  return (
    <>
      {singleProject.map((project: any) => (
        <div key={project.name}>
          <h2 className='text-2xl font-bold text-gray-800'> Project Name</h2>
          <p className='text-gray-600'> {project.project_name}</p>
          <h2 className='text-2xl font-bold text-gray-800'> Project ID</h2>
          <p className='text-gray-600'> {project.project_id}</p>
          <h2 className='text-2xl font-bold text-gray-800'> Project Details</h2>
          <p className='text-gray-600'> {project.total_square_feet}</p>
          <p className='text-gray-600'> {project.project_address}</p>
          <p className='text-gray-600'> {project.paint_type}</p>
        </div>
      ))}
    </>
  );
};

export default SingleProjectCard;
