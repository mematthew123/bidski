'use client';
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from './ui/button';

interface Paint {
  paint_brand: string;
  paint_price: number;
  user_id: string;
}

function ProjectCard() {
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);
  const [paintBrand, setPaintBrand] = useState<Paint[]>([]);

  const supabase = createClientComponentClient();

  const fetchPaints = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from('paint_types')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching paints:', error);
      } else {
        setPaintBrand(data);
      }
    } else {
      console.error('No user logged in');
      setPaintBrand([]);
    }
  };

  useEffect(() => {
    fetchPaints();
  }, []);
  console.log(paintBrand);
  const [project, setProject] = useState({
    name: '',
    address: '',
    squareFeet: 0,
    needsCleaning: false,
    paintType: 'What type of paint?',
    clientName: '',
    projectZipcode: '',
    project_image: '',
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const filePath = `project-images/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('bidski')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading file:', error);
      return;
    }

    console.log('File path:', filePath);
    setProject((prev) => {
      const updatedProject = { ...prev, project_image: filePath };
      console.log('Updated project state:', updatedProject);
      return updatedProject;
    });
  };

  const handleAddProject = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Find the selected material
    const selectedMaterial = paintBrand.find(
      (m) => m.paint_brand === project.paintType
    );

    // Ensuring that the paint price is a number
    const paintPrice = selectedMaterial
      ? Number(selectedMaterial.paint_price)
      : 0;

    // Calculate the cost if the paint type is selected and square footage is provided
    let totalCost = null;
    if (selectedMaterial && project.squareFeet && !isNaN(paintPrice)) {
      const costPerHundredSqFt = paintPrice * 2;
      totalCost = (project.squareFeet / 100) * costPerHundredSqFt;
    } else {
      console.error('Invalid input for price or square footage');
    }
    console.log('Project data being inserted:', project); // Log the project data

    // Insert the project with total_cost
    const { error } = await supabase.from('projects').insert([
      {
        project_name: project.name,
        project_address: project.address,
        total_square_feet: project.squareFeet,
        needs_cleaning: project.needsCleaning,
        paint_type: project.paintType,
        client_name: project.clientName,
        project_zipcode: project.projectZipcode,
        user_id: user?.id,
        total_cost: totalCost, // Include the calculated cost here
        project_image: project.project_image, // Include the image path here
      },
    ]);
    console.log('Project data before submission:', project);

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
        project_image: '',
      });
      setCalculatedCost(totalCost); // Update the state if needed
    }
  };

  const handleChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setProject((prev) => ({
        ...prev,
        [key]: key === 'squareFeet' ? Number(e.target.value) : e.target.value,
      }));
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
              onChange={handleChange('name')}
              className='my-4 block w-full  border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
            />
          </label>
          <label className='block'>
            Client Name:
            <input
              type='text'
              value={project.clientName}
              onChange={handleChange('clientName')}
              className='my-4 block w-full  border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
            />
          </label>
          <label className='block'>
            Address:
            <input
              type='text'
              value={project.address}
              onChange={handleChange('address')}
              className='my-4 block w-full  border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
            />
          </label>
          <label className='block'>
            Zipcode:
            <input
              type='text'
              value={project.projectZipcode}
              onChange={handleChange('projectZipcode')}
              className='my-4 block w-full  border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
            />
          </label>
          <label className='block'>
            Square Feet:
            <input
              type='number'
              value={project.squareFeet}
              onChange={handleChange('squareFeet')}
              className='my-4 block w-full  border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
            />
          </label>
          <label className='block'>
            Needs Cleaning:
            <input
              type='checkbox'
              checked={project.needsCleaning}
              onChange={handleChange('needsCleaning')}
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
              {paintBrand.map((paint) => (
                <option key={paint.paint_brand} value={paint.paint_brand}>
                  {paint.paint_brand}
                </option>
              ))}
            </select>
            <input type='file' onChange={handleFileChange} />
          </label>
          <Button type='submit'>Add Project</Button>
        </form>
      </div>
      {calculatedCost !== null && (
        <p>
          The estimated cost for the project is: ${calculatedCost.toFixed(2)}
        </p>
      )}
    </div>
  );
}

export default ProjectCard;
