'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const CurrentMaterialGrid = () => {
  const [materials, setMaterials] = useState([]);
  const supabase = createClientComponentClient();

  const userMaterials = async () => {
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

    if (error) {
      console.log(error);
    } else {
      setMaterials(data as any);
    }
  };

  useEffect(() => {
    userMaterials();
  }, []);

  return (
    // we render the project name here.
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold text-gray-800'> Current Materials</h2>

      <div className='w-full mx-auto mt-10 lg:mt-10 grid lg:grid-cols-2 h-screen md:h-96  gap-4'>
        {materials.map((material: any) => (
          <div
            key={material.name}
            className='bg-gray-100 h-full cursor-auto flex items-center justify-center'
          >
            <div className='grid grid-cols-1 gap-4'>
              <h2>Material List</h2>
              <p>
                Paint: {material.paint} per gallon cost: {material.paint_price}
              </p>
              <p>
                Primer: {material.primer} per gallon cost:{' '}
                {material.primer_price}
              </p>
              <p>
                Tape: {material.tape} per roll cost: {material.tape_price}
              </p>
              <p>
                Caulk: {material.caulk} per tube cost: {material.caulk_price}
              </p>
              ]
              <p>
                Rollers: {material.rollers} per roller cost:{' '}
                {material.rollers_price}
              </p>
              <p>
                Brushes: {material.brushes} per brush cost:{' '}
                {material.brushes_price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentMaterialGrid;
