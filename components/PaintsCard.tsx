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
    <div className='container bg-yellow-200  h-screen text-center mx-auto'>
      <h2 className='text-2xl  font-bold text-gray-800'>Manage Paint Types</h2>
      <div className='mx-auto flex justify-center max-h-[80vh] overflow-y-auto p-4 rounded-md '>
        {/* Form to add new paint */}
        <form
          className='flex flex-col w-1/3'
          onSubmit={handleAddPaint} // Attach the handleAddPaint function to form submission
        >
          <label className='text-gray-800 font-bold'>Name</label>
          <input
            className='border border-gray-400 p-2 rounded-md'
            value={newPaintBrand}
            onChange={(e) => setNewPaintBrand(e.target.value)} // Update the state when the input changes
          />
          <label className='text-gray-800 font-bold'>Price</label>
          <input
            type='number' // Ensure that only numbers can be entered
            className='border border-gray-400 p-2 rounded-md'
            value={newPaintPrice}
            onChange={(e) => setNewPaintPrice(e.target.value)} // Update the state when the input changes
          />
          <Button type='submit' className='mt-2'>
            Add
          </Button>{' '}
        </form>

        {/* List of paints */}
      </div>
      <div className='flex mx-auto justify-center'>
        {paints.map((paint) => (
          <div key={paint.user_id}>
            <label className='text-gray-800 font-bold'>Brand</label>
            <p>{paint.paint_brand}</p>
            <label className='text-gray-800 font-bold'>Price</label>
            <p>{paint.paint_price}</p>
            <Button
              onClick={() => handleDeletePaint(paint.paint_brand)} // Pass paint_brand to the delete function
              className='mt-2'
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaintsCard;
