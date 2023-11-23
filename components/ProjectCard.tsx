'use client';
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from './ui/button';
import { MaterialPrices, fetchUserMaterials } from '@/lib/fetchUserMaterials';
import useUser from '@/lib/utils';
import { calculateTotalCost } from '@/lib/calculateTotalCost';
import { fetchPaints } from '@/lib/fetchPaints';

interface Paint {
  paint_brand: string;
  paint_price: number;
  user_id: string;
}

function ProjectCard() {
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);
  const [paintBrand, setPaintBrand] = useState<Paint[]>([]);
  const [primerPrice, setPrimerPrice] = useState<number | null>(null);
  const [tapePrice, setTapePrice] = useState<number | null>(null);
  const [rollerPrice, setRollerPrice] = useState<number | null>(null);
  const [brushPrice, setBrushPrice] = useState<number | null>(null);
  const [caulkPrice, setCaulkPrice] = useState<number | null>(null);

  const supabase = createClientComponentClient();
  const user = useUser();

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

  useEffect(() => {
    if (user) {
      fetchUserMaterials(user.id)
        .then((data: MaterialPrices) => {
          setPrimerPrice(data.primer_price);
          setTapePrice(data.tape_price);
          setRollerPrice(data.rollers_price);
          setBrushPrice(data.brushes_price);
          setCaulkPrice(data.caulk_price);
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchPaints(user.id)
        .then((paints) => {
          setPaintBrand(paints);
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

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

    const selectedMaterial = paintBrand.find(
      (m) => m.paint_brand === project.paintType
    );

    const totalCost = calculateTotalCost({
      squareFeet: project.squareFeet,
      primerPrice: primerPrice,
      tapePrice: tapePrice,
      rollerPrice: rollerPrice,
      brushPrice: brushPrice,
      caulkPrice: caulkPrice,
      paintPrice: selectedMaterial ? Number(selectedMaterial.paint_price) : 0,
    });

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
      setCalculatedCost(totalCost);
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
    <div className='container items-center flex-col flex mx-auto max-h-[80vh] overflow-y-auto p-4 rounded-md text-center'>
      <h2 className='text-4xl font-bold text-gray-800 my-10'>
        Start a Project
      </h2>
      <form
        className='w-full max-w-md my-10 p-6 bg-white rounded-lg shadow space-y-4'
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProject();
        }}
      >
        <label className='block text-lg font-medium'>
          Project Name:
          <input
            type='text'
            value={project.name}
            onChange={handleChange('name')}
            className='mt-2 block w-full border border-gray-300 h-12 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          />
        </label>
        <label className='block text-lg font-medium'>
          Client Name:
          <input
            type='text'
            value={project.clientName}
            onChange={handleChange('clientName')}
            className='mt-2 block w-full border border-gray-300 h-12 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          />
        </label>
        <label className='block text-lg font-medium'>
          Project Zipcode:
          <input
            type='text'
            value={project.projectZipcode}
            onChange={handleChange('projectZipcode')}
            className='mt-2 block w-full border border-gray-300 h-12 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          />
        </label>
        <label className='block text-lg font-medium'>
          Address:
          <input
            type='text'
            value={project.address}
            onChange={handleChange('address')}
            className='mt-2 block w-full border border-gray-300 h-12 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          />
        </label>

        <label className='block text-lg font-medium'>
          Square Feet:
          <input
            type='number'
            value={project.squareFeet}
            onChange={handleChange('squareFeet')}
            className='mt-2 block w-full border border-gray-300 h-12 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          />
        </label>

        <label className='block text-lg font-medium'>
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
            className='mt-2 block w-full border border-gray-300 h-12 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          />
        </label>

        <label className='block text-lg font-medium'>
          Paint Type:
          <select
            value={project.paintType}
            onChange={(e) =>
              setProject((prev) => ({ ...prev, paintType: e.target.value }))
            }
            className='mt-2 block w-full border border-gray-300 h-12 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          >
            {/* Options */}
            <option value=''>Select a paint type</option>
            {paintBrand.map((paint) => (
              <option key={paint.paint_brand} value={paint.paint_brand}>
                {paint.paint_brand}
              </option>
            ))}
          </select>
        </label>

        <label className='block text-lg font-medium'>
          Attach File:
          <input
            type='file'
            onChange={handleFileChange}
            className='block w-full text-sm text-gray-500'
          />
        </label>
        <button
          type='submit'
          className='w-full bg-indigo-600 text-white py-3 px-4 rounded hover:bg-indigo-700 mt-4'
        >
          Add Project
        </button>
        {calculatedCost !== null && (
          <p className='text-xl mt-4'>
            The estimated cost for the project is:{' '}
            <span className='font-semibold'>${calculatedCost.toFixed(2)}</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default ProjectCard;
