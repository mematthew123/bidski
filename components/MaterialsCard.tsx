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
    drop_sheets: '',
    drop_sheets_price: null,
    cleaning_supplies: '',
    cleaning_supplies_price: null,
  });

  const handleAddMaterials = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from('materials').insert([
      {
        paint: materials.paint,
        primer: materials.primer,
        rollers: materials.rollers,
        brushes: materials.brushes,
        tape: materials.tape,
        caulk: materials.caulk,
        paint_price: materials.paint_price,
        primer_price: materials.primer_price,
        rollers_price: materials.rollers_price,
        brushes_price: materials.brushes_price,
        tape_price: materials.tape_price,
        caulk_price: materials.caulk_price,
        user_id: user?.id,
        drop_sheets: materials.drop_sheets,
        drop_sheets_price: materials.drop_sheets_price,
        cleaning_supplies: materials.cleaning_supplies,
        cleaning_supplies_price: materials.cleaning_supplies_price,
      },
    ]);

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
        drop_sheets: '',
        drop_sheets_price: null,
        cleaning_supplies: '',
        cleaning_supplies_price: null,
      });
    }
  };

  const handleChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setMaterials({ ...materials, [key]: e.target.value });
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

        <label className='block'>
          Drop Sheets:
          <input
            type='text'
            value={materials.drop_sheets}
            onChange={handleChange('drop_sheets')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
          />
        </label>

        <label className='block'>
          Drop Sheets Price:
          <input
            type='number'
            value={materials.drop_sheets_price || ''}
            onChange={handleChange('drop_sheets_price')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
          />
        </label>

        <label className='block'>
          Cleaning Supplies:
          <input
            type='text'
            value={materials.cleaning_supplies}
            onChange={handleChange('cleaning_supplies')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
          />
        </label>

        <label className='block'>
          Cleaning Supplies Price:
          <input
            type='number'
            value={materials.cleaning_supplies_price || ''}
            onChange={handleChange('cleaning_supplies_price')}
            className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
          />
        </label>

        <Button type='submit'>Add Materials</Button>
      </form>
    </div>
  );
}

export default MaterialsCard;
