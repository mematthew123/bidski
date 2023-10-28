import Widget from '@/components/Widget';
import Head from 'next/head';
import React from 'react';

function page() {
  return (
    <div>
      <Head>
        {/* Other head elements */}
        <script src='https://cdn.1build.com/widget.js' async defer></script>
      </Head>
      <Widget />
    </div>
  );
}

export default page;
