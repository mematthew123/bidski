'use client';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from './ui/button';

function MaterialsCard() {
  const supabase = createClientComponentClient();
  const [materials, setMaterials] = useState({
    paint: '',
    primer: '',
    rollers: '',
    brushes: '',
    tape: '',
    caulk: '',
    paint_price: null,
    primer_price: null,
    rollers_price: null,
    brushes_price: null,
    tape_price: null,
    caulk_price: null,
  });

  const handleAddMaterials = async () => {
    const { error } = await supabase.from('materials').insert([materials]);

    if (error) {
      console.error('Error adding materials:', error);
    } else {
      setMaterials({
        paint: '',
        primer: '',
        rollers: '',
        brushes: '',
        tape: '',
        caulk: '',
        paint_price: null,
        primer_price: null,
        rollers_price: null,
        brushes_price: null,
        tape_price: null,
        caulk_price: null,
      });
    }
  };

  const handleChange = (field: any) => (e: any) => {
    const value = e.target.value;
    setMaterials((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className='container overflow-y-auto h-screen   mx-auto'>
      <h2 className='text-2xl my-10 font-bold text-gray-800'>
        Enter Material Details
      </h2>
      <form
        className='my-10 p-4 rounded-md'
        onSubmit={(e) => {
          e.preventDefault();
          handleAddMaterials();
        }}
      >
        {/* Repeat this block for each material and price */}
        <label className='block'>
          Paint:
          <input
            type='text'
            value={materials.paint}
            onChange={handleChange('paint')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
          />
        </label>
        <label className='block'>
          Paint Price:
          <input
            type='number'
            value={materials.paint_price || ''}
            onChange={handleChange('paint_price')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
          />
        </label>
        {/* ... repeat for other materials and prices ... */}
        <label className='block'>
          Primer:
          <input
            type='text'
            value={materials.primer}
            onChange={handleChange('primer')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
          />
        </label>

        <label className='block'>
          Primer Price:
          <input
            type='number'
            value={materials.primer_price || ''}
            onChange={handleChange('primer_price')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
          />
        </label>

        <label className='block'>
          Rollers:
          <input
            type='text'
            value={materials.rollers}
            onChange={handleChange('rollers')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
          />
        </label>

        <label className='block'>
          Rollers Price:
          <input
            type='number'
            value={materials.rollers_price || ''}
            onChange={handleChange('rollers_price')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
          />
        </label>

        <label className='block'>
          Brushes:
          <input
            type='text'
            value={materials.brushes}
            onChange={handleChange('brushes')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
          />
        </label>

        <label className='block'>
          Brushes Price:
          <input
            type='number'
            value={materials.brushes_price || ''}
            onChange={handleChange('brushes_price')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
          />
        </label>

        <label className='block'>
          Tape:
          <input
            type='text'
            value={materials.tape}
            onChange={handleChange('tape')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
          />
        </label>

        <label className='block'>
          Tape Price:
          <input
            type='number'
            value={materials.tape_price || ''}
            onChange={handleChange('tape_price')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
          />
        </label>

        <label className='block'>
          Caulk:
          <input
            type='text'
            value={materials.caulk}
            onChange={handleChange('caulk')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
          />
        </label>

        <label className='block'>
          Caulk Price:
          <input
            type='number'
            value={materials.caulk_price || ''}
            onChange={handleChange('caulk_price')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
          />
        </label>

        <Button type='submit'>Add Materials</Button>
      </form>
    </div>
  );
}

export default MaterialsCard;
