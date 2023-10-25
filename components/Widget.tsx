'use client';

import { useEffect } from 'react';

const Widget: React.FC = () => {
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
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  const initWidget = () => {
    if (window.onebuild) {
      console.log('Initializing widget');
      window.onebuild.init({
        key: '1build_emb.atPSUCeL.n0rSs8o7WaWrc3q2wqckQzBXzVLUMDnV',
      });
    } else {
      console.error('window.onebuild is not defined');
    }
  };

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
        sourceTypeFilter: ['MATERIAL'],
        typeaheadDelay: 10,
      });
    } else {
      console.error('window.onebuild is not defined');
    }
  };

  return (
    <div className='container bg-gray-200 h-screen mx-auto flex justify-center mt-20 '>
      <button onClick={handleOpen}>Open</button>;{' '}
    </div>
  );
};

export default Widget;
