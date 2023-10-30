'use client';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

interface RoomCardProps {
  projectId: string;
}

export function RoomCard({ projectId }: RoomCardProps) {
  const [roomName, setRoomName] = useState('');
  const [squareFeet, setSquareFeet] = useState('');
  const [needsCleaning, setNeedsCleaning] = useState(false);
  const [paintType, setPaintType] = useState('Regular'); // Default value

  async function saveRoom() {
    const { data, error } = await supabase.from('rooms').insert([
      {
        project_id: projectId,
        room_name: roomName,
        square_feet: parseInt(squareFeet),
        needs_cleaning: needsCleaning,
        paint_type: paintType,
      },
    ]);

    if (error) {
      console.error('Error saving room:', error);
      // Optionally display an error message to the user
    } else {
      // Handle successful room creation (e.g., clear the form, show a success message, etc.)
    }
  }

  return (
    <div className='room-card'>
      <h3>Add Room</h3>
      <label>
        Room Name:
        <input
          type='text'
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </label>
      <label>
        Square Feet:
        <input
          type='number'
          value={squareFeet}
          onChange={(e) => setSquareFeet(e.target.value)}
        />
      </label>
      <label>
        Needs Cleaning:
        <input
          type='checkbox'
          checked={needsCleaning}
          onChange={(e) => setNeedsCleaning(e.target.checked)}
        />
      </label>
      <label>
        Paint Type:
        <select
          value={paintType}
          onChange={(e) => setPaintType(e.target.value)}
        >
          <option value='Cheap'>Cheap</option>
          <option value='Regular'>Regular</option>
          <option value='Expensive'>Expensive</option>
        </select>
      </label>
      <button onClick={saveRoom}>Save Room</button>
    </div>
  );
}
