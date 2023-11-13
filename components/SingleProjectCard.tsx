'use client';
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams } from 'next/navigation';

const SingleProjectCard = () => {
  const [singleProject, setSingleProject] = useState([]);
  const supabase = createClientComponentClient();
  const { slug } = useParams();

  useEffect(() => {
    const getSingleProject = async () => {
      const { data } = await supabase.from('projects').select();
      const filteredData = data?.filter(
        (project) => project.project_name === slug
      );
      if (filteredData) {
        // Fetch the image URLs for each project
        for (const project of filteredData) {
          if (project.project_image) {
            try {
              const { data: urlData }: { data: { publicUrl: string } } =
                supabase.storage
                  .from('bidski')
                  .getPublicUrl(project.project_image);
              project.project_image_url = urlData.publicUrl;
            } catch (error) {
              console.error(error);
            }
          }
        }
        setSingleProject(filteredData as any);
      }
    };
    getSingleProject();
  }, [slug]);

  return (
    <>
      {singleProject.map((project: any) => (
        <div
          key={project.name}
          className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start'>
            {/* Text Content */}
            <div>
              <h2 className='text-3xl font-bold text-blue-800 mb-2'>
                Project Name
              </h2>
              <p className='font-semibold text-gray-700'>
                {project.project_name}
              </p>

              <h2 className='text-3xl font-bold text-blue-800 mt-4 mb-2'>
                Client Name
              </h2>
              <p className='font-semibold text-gray-700'>
                {project.client_name}
              </p>

              <h2 className='text-3xl font-bold text-blue-800 mt-4 mb-2'>
                Project Details
              </h2>
              <div className='text-gray-600 space-y-1'>
                {/* Project Details */}
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
                  {project.needs_cleaning ? 'Yes' : 'No'}
                </p>
                <p>
                  {' '}
                  <span className='font-semibold'>Total Cost:</span>{' '}
                  {project.total_cost}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className='flex justify-center md:justify-end mt-4 md:mt-0'>
              <img
                src={project.project_image_url}
                alt={project.project_name}
                className='w-full md:w-3/4 lg:w-1/2'
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SingleProjectCard;
