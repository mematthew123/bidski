'use client';
//  we are going to pass the form data to the OneBidComponent which is the parent
// component which reach out to the api to get the data
import React, { useState } from 'react';

export interface OneBidFormData {
  state: string;
  county: string;
  searchTerm: string;
  pageLimit: number;
  categoryTreeItem?: string;
}

interface OneBidFormProps {
  onSubmit: (data: OneBidFormData) => void;
}

const OneBidForm: React.FC<OneBidFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<OneBidFormData>({
    state: '',
    county: '',
    searchTerm: '',
    pageLimit: 5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='state'
        value={formData.state}
        onChange={handleChange}
        placeholder='State'
        className='bg-gray-50 my-8 px-4'
      />
      <input
        name='county'
        value={formData.county}
        onChange={handleChange}
        placeholder='County'
        className='bg-gray-50 my-8 px-4'
      />
      <input
        name='searchTerm'
        value={formData.searchTerm}
        onChange={handleChange}
        placeholder='Search Term'
        className='bg-gray-50 my-8 px-4'
      />
      <button className='my-8 px-4' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default OneBidForm;
