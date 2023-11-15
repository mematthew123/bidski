'use client';
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from './ui/button';

interface Paint {
  paint_brand: string;
  paint_price: number;
  user_id: string;
}

function PaintsCard() {
  const [paints, setPaints] = useState<Paint[]>([]);
  const [newPaintBrand, setNewPaintBrand] = useState('');
  const [newPaintPrice, setNewPaintPrice] = useState('');
  const supabase = createClientComponentClient();

  // Function to fetch paints from the database
  const fetchPaints = async () => {
    // Check if the user is logged in
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from('paint_types')
        .select('*')
        .eq('user_id', user.id); // Filter paints by the logged-in user's ID

      if (error) {
        console.error('Error fetching paints:', error);
      } else {
        setPaints(data);
      }
    } else {
      // Handle the case where there is no user logged in
      console.error('No user logged in');
      setPaints([]); // Clear the paints if no user is logged in
    }
  };

  const handleAddPaint = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from('paint_types').insert([
      {
        paint_brand: newPaintBrand,
        paint_price: parseFloat(newPaintPrice), // Make sure to convert the price to a number
        user_id: user?.id,
      },
    ]);

    if (error) {
      console.error('Error adding paint:', error);
    } else {
      fetchPaints(); // Refresh the list of paints
      setNewPaintBrand(''); // Reset the form
      setNewPaintPrice('');
    }
  };

  // ... include other handlers for edit and delete operations

  const handleDeletePaint = async (paint_brand: string) => {
    const { error } = await supabase
      .from('paint_types')
      .delete()
      .match({ paint_brand });

    if (error) {
      console.error('Error deleting paint:', error);
    } else {
      fetchPaints(); // Refresh the list of paints
    }
  };

  useEffect(() => {
    fetchPaints();
  }, []);

  return (
    <div className='container mx-auto bg-gray-100 p-6 h-screen'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
        Manage Paint Types
      </h2>
      <div className='flex justify-center mx-auto max-h-[80vh] overflow-y-auto p-4 rounded-md'>
        <form
          className='flex flex-col w-full md:w-1/2 lg:w-1/3 space-y-4'
          onSubmit={handleAddPaint}
        >
          <label className='font-semibold'>Name</label>
          <input
            className='border border-gray-300 p-3 rounded-md focus:border-indigo-500 focus:ring-indigo-500'
            value={newPaintBrand}
            onChange={(e) => setNewPaintBrand(e.target.value)}
          />
          <label className='font-semibold'>Price</label>
          <input
            type='number'
            className='border border-gray-300 p-3 rounded-md focus:border-indigo-500 focus:ring-indigo-500'
            value={newPaintPrice}
            onChange={(e) => setNewPaintPrice(e.target.value)}
          />
          <button
            type='submit'
            className='mt-2 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700'
          >
            Add
          </button>
        </form>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        {paints.map((paint) => (
          <div
            key={paint.user_id}
            className='bg-white shadow-md rounded-lg p-4'
          >
            <label className='text-gray-800 font-semibold'>Brand</label>
            <p>{paint.paint_brand}</p>
            <label className='text-gray-800 font-semibold'>Price</label>
            <p>{paint.paint_price}</p>
            <button
              onClick={() => handleDeletePaint(paint.paint_brand)}
              className='mt-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaintsCard;
