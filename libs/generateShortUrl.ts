/* eslint-disable import/no-anonymous-default-export */
import { customAlphabet } from 'nanoid';

export default (host: string) => {
  const nanoId = customAlphabet('1234567890abcdefghi', 10);
  const shortCode = nanoId();

  return {
    shortCode,
    shortUrl: `http://${host}/api/${shortCode}`,
  };
};
