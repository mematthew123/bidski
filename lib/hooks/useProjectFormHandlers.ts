import { useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export type ProjectState = {
  name: string;
  address: string;
  squareFeet: number;
  needsCleaning: boolean;
  paintType: string;
  clientName: string;
  projectZipcode: string;
  project_image: string;
};

export interface Paint {
  paint_brand: string;
  paint_price: number;
  user_id: string;
}

const useProjectFormHandlers = (setProject: any) => {
  const supabase = createClientComponentClient();
  const handleChange = useCallback(
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setProject((prev: any) => ({
        ...prev,
        [key]: key === 'squareFeet' ? Number(e.target.value) : e.target.value,
      }));
    },
    [setProject]
  );

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      setProject((prev: any) => {
        const updatedProject = { ...prev, project_image: filePath };
        console.log('Updated project state:', updatedProject);
        return updatedProject;
      });
    },
    [setProject]
  );

  const handleAddProject = useCallback(
    async (
      project: ProjectState,
      paintBrand: Paint[], // Assuming you have a Paint type defined
      totalCost: number
    ) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

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
          total_cost: totalCost, // Use the calculated cost here
          project_image: project.project_image, // Include the image path here
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
          project_image: '',
          totalCost: 0,
        });
      }
    },
    [supabase, setProject]
  );

  return { handleChange, handleFileChange, handleAddProject };
};

export default useProjectFormHandlers;
