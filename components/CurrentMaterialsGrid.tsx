'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import UpdateMaterialsModal from './UpdateMaterialsModal';

type Material = {
  id: string;
  paint: string;
  paint_price: number;
  primer: string;
  primer_price: number;
  tape: string;
  tape_price: number;
  rollers: string;
  rollers_price: number;
  brushes: string;
  brushes_price: number;
  drop_sheets: string;
  drop_sheets_price: number;
  user_id: string;
  caulk: string;
  caulk_price: number;
  cleaning_supplies: string;
  cleaning_supplies_price: number;
};

const useMaterials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      const supabase = createClientComponentClient();
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) {
        setError('Failed to fetch materials');
      } else {
        setMaterials(data as Material[]);
      }
      setLoading(false);
    };

    fetchMaterials();
  }, []);

  return { materials, loading, error };
};

const CurrentMaterialGrid = () => {
  const { materials, loading, error } = useMaterials();
  const [showModal, setShowModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );

  const openModal = (material: Material) => {
    setSelectedMaterial(material);
    setShowModal(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {materials.map((material) => (
          <div
            key={material.id}
            className='bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer'
            onClick={() => openModal(material)}
          >
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {material.primer}
                </h3>
                <p className='text-sm text-gray-500'>
                  Primer Brand - {material.primer_price} per gallon
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {material.tape}
                </h3>
                <p className='text-sm text-gray-500'>
                  Tape Brand - {material.tape_price} per roll
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {material.rollers}
                </h3>
                <p className='text-sm text-gray-500'>
                  Rollers Brand - {material.rollers_price} per roller
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {material.brushes}
                </h3>
                <p className='text-sm text-gray-500'>
                  Brushes Brand - {material.brushes_price} per brush
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {material.drop_sheets}
                </h3>
                <p className='text-sm text-gray-500'>
                  Drop Sheets Brand - {material.drop_sheets_price} per sheet
                </p>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {material.caulk}
                </h3>
                <p className='text-sm text-gray-500'>
                  Caulk Brand - {material.caulk_price} per tube
                </p>
              </div>
              {showModal && selectedMaterial && (
                <UpdateMaterialsModal
                  material={selectedMaterial}
                  onClose={() => setShowModal(false)}
                  open={showModal}
                />
              )}

              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {material.cleaning_supplies}
                </h3>
                <p className='text-sm text-gray-500'>
                  Cleaning Supplies - {material.cleaning_supplies_price} per
                  item
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentMaterialGrid;
