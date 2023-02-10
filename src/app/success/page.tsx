import React from 'react';

import CopyBoard from '@/components/CopyBoard';
import AnalyticSection from '@/components/AnalyticSection';
import { getAnalyticCount } from '@/api/server-only';

type PageProps = {
  searchParams: {
    urlCode: string;
  };
};

export default async function SuccessPage({ searchParams }: PageProps) {
  const { urlCode } = searchParams;

  const analyticData = await getAnalyticCount(urlCode);

  return (
    <>
      <h1 className='text-4xl text-slate-700 my-4 text-center'>
        This is your shortened URL
      </h1>
      <CopyBoard urlCode={urlCode} />
      {/* TypeScript doesn't support async server component for now */}
      {/* @ts-ignore */}
      <AnalyticSection
        clickedCount={analyticData.data.clickedCount}
        originalUrl={analyticData.data.url.originalUrl}
        shortUrl={analyticData.data.url.shortUrl}
      />
    </>
  );
}
