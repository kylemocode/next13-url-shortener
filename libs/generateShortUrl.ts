/* eslint-disable import/no-anonymous-default-export */
import { customAlphabet } from 'nanoid';

export const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL
    : 'http://localhost:3000';

const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

export default (host: string) => {
  const nanoId = customAlphabet('1234567890abcdefghi', 10);
  const shortCode = nanoId();

  return {
    shortCode,
    shortUrl: `${protocol}://${host}/api/${shortCode}`,
  };
};
