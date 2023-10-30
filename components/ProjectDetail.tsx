import React, { useState } from 'react';
import { RoomCard } from '@/components/RoomsCard';

function ProjectDetail({ projectId }: { projectId: any }) {
  const [roomCount, setRoomCount] = useState(1);

  return (
    <div>
      <h1>Project Details</h1>

      {/* Dynamically render RoomCard components based on roomCount */}
      {[...Array(roomCount)].map((_, index) => (
        <RoomCard key={index} projectId={projectId} />
      ))}

      <button onClick={() => setRoomCount((prevCount) => prevCount + 1)}>
        Add Room
      </button>
    </div>
  );
}

export default ProjectDetail;
