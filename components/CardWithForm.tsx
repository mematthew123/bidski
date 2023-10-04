'use client';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export function CardWithForm() {
  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState<{ name: string }[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from('projects').select();
      if (data) {
        setProjects(data as any);
      }
    };
    fetchProjects();
  }, [supabase]);

  const handleAddProject = async () => {
    if (projectName) {
      const { error } = await supabase
        .from('projects')
        .insert([{ project_name: projectName }]);

      if (!error) {
        setProjects([...projects, { name: projectName }]);
        setProjectName('');
      } else {
        console.error('Error adding project:', error);
      }
    }
  };

  return (
    <Card className='w-[350px]'>
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
          <div className=' w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                placeholder='Name of your project'
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' onClick={() => setProjectName('')}>
          Cancel
        </Button>
        <Button type='submit' onClick={handleAddProject}>
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
