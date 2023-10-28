'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from './ui/button';

interface FormGroupProps {
  label: string;
  children: React.ReactNode;
}

function FormGroup({ label, children }: FormGroupProps) {
  return (
    <div className='flex flex-col space-y-1.5'>
      <label>{label}</label>
      {children}
    </div>
  );
}

interface ProjectCardProps {
  setProjectId: React.Dispatch<React.SetStateAction<number | null>>;
  setProjectStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProjectCard({
  setProjectId,
  setProjectStarted,
}: ProjectCardProps) {
  const supabase = createClientComponentClient();

  const [project, setProject] = useState({
    name: '',
  });
  const [, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const { data } = await supabase.from('projects').select();
      if (data) {
        setProjects(data as any);
      }
    };

    getProjects();
  }, [supabase, setProjects]);

  const handleAddProject = async () => {
    if (project.name) {
      const { data, error } = await supabase.from('projects').insert([
        {
          project_name: project.name,
        },
      ]);

      if (!error && data) {
        const newProject = data[0] as { project_id: number }; // Add type annotation
        setProjectId(newProject.project_id);
        setProjectStarted(true); // Set projectStarted to true when project is successfully created
      } else {
        console.log('Data:', data);
        console.log('Error:', error);
      }
    }
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Start your estimate.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProject();
          }}
        >
          <FormGroup label='Name'>
            <input
              id='projectName'
              placeholder='Name of your project'
              value={project.name}
              onChange={(e) =>
                setProject((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </FormGroup>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          variant='outline'
          onClick={() => setProject((prev) => ({ ...prev, name: '' }))}
        >
          Cancel
        </Button>
        <Button type='submit' onClick={handleAddProject}>
          Start Project
        </Button>
      </CardFooter>
    </Card>
  );
}
