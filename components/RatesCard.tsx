'use client';
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Rates {
  id: string;
  rate: number;
  name: string;
  title: string;
  user_id: string;
}

function RatesCard() {
  const [rates, setRates] = useState<Rates[]>([]);
  const [newRate, setNewRate] = useState('');
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const supabase = createClientComponentClient();

  const fetchRates = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from('labor')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching rates:', error);
      } else {
        setRates(data);
      }
    } else {
      console.error('No user logged in');
      setRates([]);
    }
  };

  const handleAddRate = async (event: React.FormEvent) => {
    event.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from('labor').insert([
      {
        hourly_rate: parseFloat(newRate),
        name: newName,
        title: newTitle,
        user_id: user?.id,
      },
    ]);

    if (error) {
      console.error('Error adding rate:', error);
    } else {
      setNewRate('');
      setNewName('');
      setNewTitle('');
      await fetchRates();
    }
  };

  const handleDeleteRate = async (id: string) => {
    const { error } = await supabase.from('labor').delete().match({ id });

    if (error) {
      console.error('Error deleting rate:', error);
    } else {
      await fetchRates();
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div>
      <h2>Labor Rates</h2>
      <form onSubmit={handleAddRate}>
        <input
          type='number'
          placeholder='Rate'
          value={newRate}
          onChange={(event) => setNewRate(event.target.value)}
        />
        <input
          type='text'
          placeholder='Name'
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <input
          type='text'
          placeholder='Title'
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <button type='submit'>Add Rate</button>
      </form>
      <ul>
        {rates.map((rate) => (
          <li key={rate.id}>
            {rate.rate} - {rate.name}{' '}
            <button onClick={() => handleDeleteRate(rate.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RatesCard;
