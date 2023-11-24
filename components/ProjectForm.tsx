import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from './ui/select';
import { Paint } from '@/lib/hooks/useProjectFormHandlers';

const projectFormSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  clientName: z.string().min(1, 'Client name is required'),
  projectZipcode: z.string().min(1, 'Zipcode is required'),
  address: z.string().min(1, 'Address is required'),
  squareFeet: z.number().min(1, 'Square feet is required'),
  needsCleaning: z.boolean(),
  paintType: z.string(),
  // Add other fields as necessary
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  defaultValues: ProjectFormValues;
  paintBrand: Paint[]; // Assuming Paint is a type you have defined
  onSubmit: (data: ProjectFormValues) => void;
}

export function ProjectForm({
  defaultValues,
  paintBrand,
  onSubmit,
}: ProjectFormProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  return (
    <div className='container items-center flex-col flex mx-auto max-h-[80vh] overflow-y-auto p-4 rounded-md text-center'>
      <h2 className='text-4xl font-bold text-gray-800 my-10'>
        Start a Project
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full max-w-md my-10 p-6 bg-white rounded-lg shadow space-y-4'
        >
          {/* Form fields */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* ... other fields */}
          <Button
            type='submit'
            className='w-full bg-indigo-600 text-white py-3 px-4 rounded hover:bg-indigo-700 mt-4'
          >
            Add Project
          </Button>
        </form>
      </Form>
    </div>
  );
}
