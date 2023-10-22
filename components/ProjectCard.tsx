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
import RoomsCard from './RoomsCard';

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

export function ProjectCard() {
  const supabase = createClientComponentClient();
  const [showRoomsCard, setShowRoomsCard] = useState(false);

  const [project, setProject] = useState({
    name: '',
    rooms: 0,
    squareFeet: 0,
    needsCleaning: false,
    paintType: '',
    projectOverview: '',
  });
  const [projects, setProjects] = useState([]);

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
      const { error } = await supabase.from('projects').insert([
        {
          project_name: project.name,
          room_count: project.rooms,
          square_footage: project.squareFeet,
          needs_cleaning: project.needsCleaning,
          paint_type: project.paintType,
          project_overview: project.projectOverview,
        },
      ]);

      if (!error) {
        [...projects, project];
        setProject({
          name: '',
          rooms: 0,
          squareFeet: 0,
          needsCleaning: false,
          paintType: '',
          projectOverview: '',
        });
        setShowRoomsCard(true); // Update state to show RoomsCard
      } else {
        console.error('Error adding project:', error);
      }
    }
  };

  return (
    <div className='w-[350px]'>
      {!showRoomsCard && (
        <Card>
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

              <FormGroup label='Rooms'>
                <input
                  id='rooms'
                  placeholder='Number of rooms'
                  type='number'
                  value={project.rooms}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      rooms: parseInt(e.target.value),
                    }))
                  }
                />
              </FormGroup>

              <FormGroup label='Square feet'>
                <input
                  id='squareFeet'
                  placeholder='Square feet'
                  type='number'
                  value={project.squareFeet}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      squareFeet: parseInt(e.target.value),
                    }))
                  }
                />
              </FormGroup>

              <FormGroup label='Needs cleaning?'>
                <input
                  id='needsCleaning'
                  placeholder='Needs cleaning?'
                  type='checkbox'
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      needsCleaning: e.target.checked,
                    }))
                  }
                />
              </FormGroup>

              <FormGroup label='Paint type'>
                <input
                  id='paintType'
                  placeholder='Paint type'
                  value={project.paintType}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      paintType: e.target.value,
                    }))
                  }
                />
              </FormGroup>
              <FormGroup label='Project overview'>
                <input
                  id='projectOverview'
                  placeholder='Project overview'
                  value={project.projectOverview}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      projectOverview: e.target.value,
                    }))
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
              Add
            </Button>
          </CardFooter>
        </Card>
      )}
      {showRoomsCard && <RoomsCard />}
    </div>
  );
}
