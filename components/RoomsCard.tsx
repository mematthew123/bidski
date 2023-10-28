'use client';
import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

interface RoomsCardProps {
  projectId: number | null;
}

export default function RoomsCard({ projectId }: RoomsCardProps) {
  console.log('Rendering RoomsCard with projectId:', projectId);

  const supabase = createClientComponentClient();
  // State for room details
  const [roomType, setRoomType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [squareFootage, setSquareFootage] = useState('');
  const [rooms, setRooms] = useState<{ name: string }[]>([]);

  // we want to add the room details to the rooms table
  // Fetch existing rooms
  useEffect(() => {
    const getRooms = async () => {
      const { data } = await supabase.from('rooms').select();
      if (data) {
        setRooms(data);
      }
    };
    getRooms();
  }, [supabase]);

  // Handle room details submission
  const handleRoomDetails = async () => {
    const { error } = await supabase.from('rooms').insert([
      {
        room_type: roomType,
        quantity: Number(quantity),
        square_footage: parseFloat(squareFootage),
        project_id: projectId, // Include project_id to associate room with project
      },
    ]);
    if (!error) {
      setRooms([...rooms, { name: roomType }]);
      setRoomType('');
      setQuantity('');
      setSquareFootage('');
    } else {
      console.error('Error adding room details:', error);
    }
  };

  return (
    <div>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>{' '}
          <CardDescription>Add details</CardDescription>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRoomDetails();
            }}
          >
            <div className=' w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Rooms</Label>
                <Input
                  id='name'
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  placeholder='Room Type'
                />
              </div>
            </div>
          </form>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
