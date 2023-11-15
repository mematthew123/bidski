'use client';
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const SingleProjectCard = () => {
  const [singleProject, setSingleProject] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false); // New state for deletion success
  const supabase = createClientComponentClient();
  const { slug } = useParams();
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const router = useRouter(); // useRouter hook for navigation

  // Toggle Modal Visibility
  const toggleDeleteModal = () => {
    setShowDeleteProjectModal(!showDeleteProjectModal);
  };

  // Get Single Project
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

  // Delete Project

  const handleDeleteProject = async (projectName: string) => {
    const { data, error } = await supabase
      .from('projects')
      .delete()
      .match({ project_name: projectName });
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      setDeleteSuccess(true); // Set success state
      setTimeout(() => {
        router.push('/current-projects'); // Redirect after a short delay
      }, 3000);
    }
  };

  return (
    <>
      {singleProject.map((project: any) => (
        <div
          key={project.name}
          className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'
        >
          {/* Modal */}
          {showDeleteProjectModal && (
            <div className='bg-white min-h-screen rounded-lg shadow-lg p-4'>
              {!deleteSuccess ? (
                // Confirmation message
                <>
                  <h2 className='text-2xl font-bold text-blue-800 mb-2'>
                    Delete Project
                  </h2>
                  <p className='text-gray-700'>
                    Are you sure you want to delete this project?
                  </p>
                  <div className='flex justify-end mt-4'>
                    <button
                      onClick={() => handleDeleteProject(project.project_name)}
                      className='bg-red-800 text-white font-semibold px-4 py-2 rounded-lg'
                    >
                      Delete
                    </button>
                    <button
                      onClick={toggleDeleteModal}
                      className='bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg ml-4'
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                // Success message
                <div className='bg-green-500 text-white font-semibold px-4 py-2 rounded-lg'>
                  Project successfully deleted!
                </div>
              )}
            </div>
          )}
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
          <button
            onClick={toggleDeleteModal}
            className='bg-red-800 text-white font-semibold px-4 py-2 rounded-lg mt-4'
          >
            Delete Project
          </button>
        </div>
      ))}
    </>
  );
};
export default SingleProjectCard;
