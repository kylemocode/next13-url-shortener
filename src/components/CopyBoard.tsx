'use client';

import { useRef, useState, FormEvent } from 'react';

type CopyBoardProps = {
  urlCode: string;
};

export default function CopyBoard({ urlCode }: CopyBoardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } else {
      setIsCopied(false);
    }
  };

  return (
    <div className='flex flex-col'>
      <form
        className='max-w-[600px] w-full flex justify-center my-4 mx-auto flex-1'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          className='border border-solid p-4 rounded-l-lg w-full'
          value={`${process.env.NEXT_PUBLIC_API_URL}/api/${urlCode}`}
          ref={inputRef}
          readOnly
        />
        <div className='relative'>
          <input
            type='submit'
            className='bg-amber-500 hover:bg-amber-600 transition-colors duration-500 font-bold text-white p-4 rounded-r-lg cursor-pointer'
            value='Copy URL'
          />
          {isCopied && (
            <div className='absolute top-16 left-2 bg-black text-white p-2 rounded-lg text-sm'>
              URL Copied
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
