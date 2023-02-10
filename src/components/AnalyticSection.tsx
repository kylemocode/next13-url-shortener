import Link from 'next/link';

interface AnalyticProps {
  clickedCount: number;
  originalUrl: string;
  shortUrl: string;
}

async function AnalyticSection({
  clickedCount,
  originalUrl,
  shortUrl,
}: AnalyticProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-4 mt-8'>
        <div className='flex'>Total URL Click Counts: {clickedCount}</div>
        <div className='flex'>
          <span className='mr-2'>Original URL</span>

          <Link href={originalUrl} className='text-blue-300' target='_blank'>
            {originalUrl}
          </Link>
        </div>

        <div className='flex'>
          <span className='mr-2'>Short URL</span>

          <Link
            href={shortUrl}
            className='text-blue-300'
            target='_blank'
            prefetch={false}
          >
            {shortUrl}
          </Link>
        </div>
      </div>

      <button type='button' className='p-4 mt-8 bg-orange-400 rounded-lg'>
        <Link href='/' className='text-white'>
          Back to shorten other URL
        </Link>
      </button>
    </div>
  );
}

export default AnalyticSection;
