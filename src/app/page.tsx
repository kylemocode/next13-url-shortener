import UrlForm from '@/components/UrlForm';

export default function Home() {
  return (
    <>
      <h1 className='text-4xl text-slate-700 my-4 text-center'>
        URL Shortener
      </h1>
      <UrlForm />
    </>
  );
}
