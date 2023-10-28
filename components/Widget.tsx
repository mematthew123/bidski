'use client';

import Head from 'next/head';
import { useEffect } from 'react';

interface WidgetInitParams {
  // The API key provided by 1build.
  key: string;
  // An object to set the color palette and typography configuration.
  theme?: {
    palette?: Record<string, unknown>;
    typography?: Record<string, unknown>;
  };
}

const Widget: React.FC = () => {
  const initWidget = () => {
    if (typeof window.onebuild !== 'undefined') {
      console.log('Initializing widget');
      window.onebuild.init({
        key: '1build_emb.atPSUCeL.n0rSs8o7WaWrc3q2wqckQzBXzVLUMDnV',
      });
    } else {
      console.error('window.onebuild is not defined');
    }
  };

  useEffect(() => {
    // This will be executed once the component mounts
    const script = document.createElement('script');
    script.src = 'https://cdn.1build.com/widget.js';
    script.async = true;
    script.onload = initWidget;

    document.body.appendChild(script);

    // Cleanup method: Remove script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleOpen = () => {
    if (window.onebuild) {
      console.log('Opening widget');
      window.onebuild.open({
        closeOnRateSelected: true,
        requestBrowserLocation: true,
        searchTerm: 'paint',
        location: {
          county: '59804',
          state: '',
        },
        sourceTypeFilter: ['ASSEMBLY'],
      });
    } else {
      console.error('double check your widget script');
    }
  };

  return (
    <>
      <script src='https://cdn.1build.com/widget.js' async defer></script>
      <div className='container bg-gray-200 h-1/2 mx-auto flex justify-center mt-20 '>
        <button onClick={handleOpen}>Open</button>;{' '}
      </div>
    </>
  );
};

export default Widget;
