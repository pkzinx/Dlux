import React from 'react';

const Analytics = () => {
  const gaTracking = process.env.NEXT_PUBLIC_GA_TRACKING;

  if (!gaTracking) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaTracking}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaTracking}');
          `,
        }}
      />
    </>
  );
};

export default Analytics;
