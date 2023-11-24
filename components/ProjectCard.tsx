'use client';
import React, { useState, useEffect, useRef } from 'react';
import useProjectFormHandlers, {
  ProjectState,
  Paint,
} from '@/lib/hooks/useProjectFormHandlers';
import { calculateTotalCost } from '@/lib/calculateTotalCost';
import useUser from '@/lib/utils';
import { MaterialPrices, fetchUserMaterials } from '@/lib/fetchUserMaterials';
import { fetchPaints } from '@/lib/fetchPaints';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

function ProjectCard() {
  const [project, setProject] = useState<ProjectState>({
    name: '',
    address: '',
    squareFeet: 0,
    needsCleaning: false,
    paintType: 'What type of paint?',
    clientName: '',
    projectZipcode: '',
    project_image: '',
  });
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);
  const [paintBrand, setPaintBrand] = useState<Paint[]>([]);
  const [primerPrice, setPrimerPrice] = useState<number | null>(null);
  const [tapePrice, setTapePrice] = useState<number | null>(null);
  const [rollerPrice, setRollerPrice] = useState<number | null>(null);
  const [brushPrice, setBrushPrice] = useState<number | null>(null);
  const [caulkPrice, setCaulkPrice] = useState<number | null>(null);
  const { handleChange, handleFileChange, handleAddProject } =
    useProjectFormHandlers(setProject);

  const supabase = createClientComponentClient();
  const user = useUser();

  // Calculate total cost whenever relevant state variables change
  useEffect(() => {
    const selectedPaint = paintBrand.find(
      (paint) => paint.paint_brand === project.paintType
    );
    const paintPrice = selectedPaint ? selectedPaint.paint_price : 0;

    const totalCost = calculateTotalCost({
      squareFeet: project.squareFeet,
      primerPrice: primerPrice ?? 0,
      tapePrice: tapePrice ?? 0,
      rollerPrice: rollerPrice ?? 0,
      brushPrice: brushPrice ?? 0,
      caulkPrice: caulkPrice ?? 0,
      paintPrice: paintPrice,
    });

    setCalculatedCost(totalCost);
  }, [project, primerPrice, tapePrice, rollerPrice, brushPrice, caulkPrice]);
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileInputRef.current?.files?.length) {
      await handleFileChange({
        target: fileInputRef.current,
      } as React.ChangeEvent<HTMLInputElement>);
    }

    // Use the calculated cost from the state
    await handleAddProject(project, paintBrand, calculatedCost ?? 0);
  };

  return (
    <div className='container items-center flex-col flex mx-auto max-h-[80vh] overflow-y-auto p-4 rounded-md text-center'>
      <h2 className='text-4xl font-bold text-gray-800 my-10'>
        Start a Project
      </h2>
      <form
        className='w-full max-w-md my-10 p-6 bg-white rounded-lg shadow space-y-4'
        onSubmit={handleSubmit}
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
            ref={fileInputRef}
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
