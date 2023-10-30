import { useRouter } from 'next/router';
import ProjectDetail from '@/components/ProjectDetail';

function ProjectRoomPage() {
  const router = useRouter();
  const { projectId } = router.query;

  // Ensure projectId is available (routes can initially render without params in Next.js)
  if (!projectId) return <div>Loading...</div>;

  return <ProjectDetail projectId={projectId} />;
}

export default ProjectRoomPage;
