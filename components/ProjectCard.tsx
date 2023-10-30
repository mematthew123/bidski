'use client';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from './ui/button';

function ProjectCard() {
  const supabase = createClientComponentClient();
  const [project, setProject] = useState({
    name: '',
    address: '',
    squareFeet: 0,
    needsCleaning: false,
    paintType: 'Regular', // Default to Regular
    clientName: '',
    projectZipcode: '',
  });

  const handleAddProject = async () => {
    const { error } = await supabase.from('projects').insert([
      {
        project_name: project.name,
        project_address: project.address,
        total_square_feet: project.squareFeet,
        needs_cleaning: project.needsCleaning,
        paint_type: project.paintType,
        client_name: project.clientName,
        project_zipcode: project.projectZipcode,
      },
    ]);

    if (error) {
      console.error('Error adding project:', error);
    } else {
      setProject({
        name: '',
        address: '',
        squareFeet: 0,
        needsCleaning: false,
        paintType: 'Regular',
        clientName: '',
        projectZipcode: '',
      });
    }
  };

  return (
    <div className='container h-screen  text-center  mx-auto'>
      <h2 className='text-2xl my-10 font-bold text-gray-800'>
        {' '}
        Start a Project
      </h2>
      <div className='mx-auto flex justify-center  max-h-[80vh] overflow-y-auto p-4 rounded-md '>
        <form
          className='w-full max-w-sm my-10 p-4 rounded-md'
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProject();
          }}
        >
          <label className='block'>
            Project Name:
            <input
              type='text'
              value={project.name}
              onChange={(e) =>
                setProject((prev) => ({ ...prev, name: e.target.value }))
              }
              className='my-4 block w-full  border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
            />
          </label>

          <label className='block'>
            Client Name:
            <input
              type='text'
              value={project.clientName}
              onChange={(e) =>
                setProject((prev) => ({ ...prev, clientName: e.target.value }))
              }
              className='my-4 block w-full  border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
            />
          </label>

          <label className='block'>
            Address:
            <input
              type='text'
              value={project.address}
              onChange={(e) =>
                setProject((prev) => ({ ...prev, address: e.target.value }))
              }
              className='my-4 block w-full  border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
            />
          </label>
          <label className='block'>
            Zipcode:
            <input
              type='text'
              value={project.projectZipcode}
              onChange={(e) =>
                setProject((prev) => ({
                  ...prev,
                  projectZipcode: e.target.value,
                }))
              }
              className='my-4 block w-full  border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
            />
          </label>

          <label className='block'>
            Square Feet:
            <input
              type='number'
              value={project.squareFeet}
              onChange={(e) =>
                setProject((prev) => ({
                  ...prev,
                  squareFeet: parseInt(e.target.value),
                }))
              }
              className='my-4 block w-full  border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
            />
          </label>

          <label className='block'>
            Needs Cleaning:
            <input
              type='checkbox'
              checked={project.needsCleaning}
              onChange={(e) =>
                setProject((prev) => ({
                  ...prev,
                  needsCleaning: e.target.checked,
                }))
              }
              className='my-4 block w-full  border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
            />
          </label>

          <label className='block'>
            Paint Type:
            <select
              value={project.paintType}
              onChange={(e) =>
                setProject((prev) => ({ ...prev, paintType: e.target.value }))
              }
              className='my-4 block w-full  border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
            >
              <option value=''>Select a paint type</option>
              <option value='Cheap'>Cheap</option>
              <option value='Regular'>Regular</option>
              <option value='Expensive'>Expensive</option>
            </select>
          </label>

          <Button type='submit'>Add Project</Button>
        </form>
      </div>
    </div>
  );
}

export default ProjectCard;
