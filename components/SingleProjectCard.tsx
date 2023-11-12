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
        <div
          key={project.name}
          className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'
        >
          <h2 className='text-3xl font-bold text-blue-800 mb-2'>
            {' '}
            Project Name
          </h2>
          <p className='font-semibold text-gray-700'> {project.project_name}</p>
          <h2 className='text-3xl font-bold text-blue-800 mt-4 mb-2'>
            {' '}
            Project ID
          </h2>
          <p className='font-semibold text-gray-700'> {project.project_id}</p>
          <h2 className='text-3xl font-bold text-blue-800 mt-4 mb-2'>
            {' '}
            Project Details
          </h2>
          <div className='text-gray-600 space-y-1'>
            <p>
              {' '}
              <span className='font-semibold'>Square Feet:</span>{' '}
              {project.total_square_feet}
            </p>
            <p>
              {' '}
              <span className='font-semibold'>Address:</span>{' '}
              {project.project_address}
            </p>
            <p>
              {' '}
              <span className='font-semibold'>Paint Type:</span>{' '}
              {project.paint_type}
            </p>
            <p>
              {' '}
              <span className='font-semibold'>Zipcode:</span>{' '}
              {project.project_zipcode}
            </p>
            <p>
              {' '}
              <span className='font-semibold'>Client:</span>{' '}
              {project.client_name}
            </p>
            <p>
              {' '}
              <span className='font-semibold'>Cleaning Needed:</span>{' '}
              {project.needs_cleaning}
            </p>
            <p>
              {' '}
              <span className='font-semibold'>Total Cost:</span>{' '}
              {project.total_cost}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default SingleProjectCard;
