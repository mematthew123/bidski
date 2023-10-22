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

export default function RoomsCard() {
  const supabase = createClientComponentClient();

  // Updated state for room details based on the rooms table structure
  const [roomName, setRoomName] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [colorChoice, setColorChoice] = useState('');
  const [notes, setNotes] = useState('');
  const [rooms, setRooms] = useState<any[]>([]);

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
        room_name: roomName,
        width: parseFloat(width),
        length: parseFloat(length),
        height: parseFloat(height),
        color_choice: colorChoice,
        notes: notes,
      },
    ]);
    if (!error) {
      setRooms([...rooms, { room_name: roomName }]);
      setRoomName('');
      setWidth('');
      setLength('');
      setHeight('');
      setColorChoice('');
      setNotes('');
    } else {
      console.error('Error adding room details:', error);
    }
  };

  return (
    <div>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle> Room Details</CardTitle>
          <CardDescription>Add details</CardDescription>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRoomDetails();
            }}
          >
            <div className=' w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='roomName'>Room Name</Label>
                <Input
                  id='roomName'
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder='Room Name'
                />

                <Label htmlFor='width'>Width</Label>
                <Input
                  id='width'
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder='Width'
                />

                <Label htmlFor='length'>Length</Label>
                <Input
                  id='length'
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder='Length'
                />

                <Label htmlFor='height'>Height</Label>
                <Input
                  id='height'
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder='Height'
                />

                <Label htmlFor='colorChoice'>Color Choice</Label>
                <Input
                  id='colorChoice'
                  value={colorChoice}
                  onChange={(e) => setColorChoice(e.target.value)}
                  placeholder='Color Choice'
                />

                <Label htmlFor='notes'>Notes</Label>
                <Input
                  id='notes'
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder='Notes'
                />

                <Button type='submit'>Add Room</Button>
              </div>
            </div>
          </form>
        </CardHeader>
        <CardContent>
          <CardFooter className='flex justify-between'>
            <Button
              variant='outline'
              onClick={() =>
                setRoomName((prev: any) => ({ ...prev, name: '' }))
              }
            >
              Cancel
            </Button>
            <Button type='submit' onClick={handleRoomDetails}>
              Add
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
