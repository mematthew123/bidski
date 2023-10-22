'use client';
import { useQuery } from '@apollo/client';
import { SOURCES_QUERY } from '@/lib/queries';
import client from '@/lib/apollo-client';

function MyComponent() {
  const { loading, error, data } = useQuery(SOURCES_QUERY, {
    client,
    variables: {
      input: {
        state: 'California',
        county: 'Los Angeles County',
        searchTerm: 'water filtration',
        page: {
          limit: 3,
        },
      },
    },
  });

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.sources.nodes.map((node: any) => (
        <div key={node.id}>
          <p>{node.name}</p>
          {/* Convert cents to dollars for display */}
          <p>
            Calculated Unit Rate: $
            {(node.calculatedUnitRateUsdCents / 100).toFixed(2)}
          </p>
          <p>Labor Rate: ${(node.laborRateUsdCents / 100).toFixed(2)}</p>
          <p>Material Rate: ${(node.materialRateUsdCents / 100).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;
