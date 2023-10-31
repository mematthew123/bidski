'use client';
import { useQuery } from '@apollo/client';
import { SOURCES_QUERY } from '@/lib/queries';
import client from '@/lib/apollo-client';
import OneBidForm, { OneBidFormData } from './OneBidForm'; // adjust path as needed
import { useState } from 'react';

function OneBidComponent() {
  const [inputData, setInputData] = useState<OneBidFormData>({
    state: 'Montana',
    county: 'Missoula',
    searchTerm: 'painting',
    categoryTreeItem: 'Painting',
    pageLimit: 1,
  });

  const { loading, error, data } = useQuery(SOURCES_QUERY, {
    client,
    variables: {
      input: {
        state: inputData.state,
        county: inputData.county,
        searchTerm: inputData.searchTerm,
        page: {
          limit: inputData.pageLimit,
        },
        // categoryTreeItem: inputData.categoryTreeItem,
      },
    },
  });

  const handleFormSubmit = (data: OneBidFormData) => {
    setInputData(data as OneBidFormData);
  };

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <OneBidForm onSubmit={handleFormSubmit} />

      {data.sources.nodes.map((node: any) => (
        <div key={node.id}>
          <p className='text-2xl font-bold'>{node.name}</p>
          {/* Convert cents to dollars for display */}
          <p className='text-xl'>
            Calculated Unit Rate: $
            {(node.calculatedUnitRateUsdCents / 100).toFixed(2)}
          </p>
          <p className='text-2xl font-bold'>
            {' '}
            ${(node.laborRateUsdCents / 100).toFixed(2)}
          </p>
          <p className='text-2xl font-bold'>
            Material Rate: ${(node.materialRateUsdCents / 100).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default OneBidComponent;
