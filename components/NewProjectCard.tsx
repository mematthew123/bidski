'use client';
import React, { useState } from 'react';
import RoomsCard from './RoomsCard';
import { ProjectCard } from './ProjectCard';
import { useEffect } from 'react';

export default function NewProjectCard() {
  const [projectId, setProjectId] = useState<number | null>(null);
  const [projectStarted, setProjectStarted] = useState(false);
  useEffect(() => {
    if (projectId) {
      setProjectStarted(true);
    }
  }, [projectId]);

  return (
    <div className='flex flex-col space-y-4'>
      {!projectStarted && (
        <ProjectCard
          setProjectId={setProjectId}
          setProjectStarted={setProjectStarted}
        />
      )}
      {projectStarted && <RoomsCard projectId={projectId} />}
    </div>
  );
}
