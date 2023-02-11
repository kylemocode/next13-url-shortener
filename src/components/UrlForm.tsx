'use client';

import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { isWebUri } from 'valid-url';

import { shortenUrl } from '@/api/client-only';

export default function ShortForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isInvalidUrlError, setIsInvalidUrlError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (originalUrl) {
      if (!isWebUri(originalUrl)) {
        setIsInvalidUrlError(true);
        setTimeout(() => {
          setIsInvalidUrlError(false);
        }, 2000);
        return;
      }

      setLoading(true);
      const { data, statusCode, error } = await shortenUrl(originalUrl);

      if (statusCode == 200) {
        router.push(`/success?urlCode=${data.urlCode}`);
        setError(null);
        setLoading(false);
      } else {
        setLoading(false);
        setError(error.message);
      }
    }
  };

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(e.target.value);
  }, []);

  return (
    <form
      className='max-w-[600px] w-full flex justify-center my-4 mx-auto'
      onSubmit={handleFormSubmit}
    >
      <div className='flex flex-col w-full relative'>
        <input
          type='text'
          className={`border border-solid p-4 rounded-l-lg w-full ${
            error && 'border-rose-600'
          }`}
          placeholder='Enter URL you want to shorten...'
          onChange={handleInputChange}
          required
        />
        {error && (
          <div className='text-xs text-pink-600 my-2 absolute top-14'>
            {error}
          </div>
        )}
        {isInvalidUrlError && (
          <div className='text-xs text-pink-600 my-2 absolute top-14'>
            Invalid URL (Must start with http or https)
          </div>
        )}
      </div>
      <input
        type='submit'
        className='bg-amber-500 hover:bg-amber-600 transition-colors duration-500 font-bold text-white p-4 rounded-r-lg cursor-pointer'
        value={loading ? '...' : 'Shorten URL'}
      />
    </form>
  );
}
