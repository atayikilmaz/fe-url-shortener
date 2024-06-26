import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface RedirectorProps {}

const Redirector: React.FC<RedirectorProps> = () => {
  const { shortenedUrlKey } = useParams<{ shortenedUrlKey: string }>();
  const [longUrl, setLongUrl] = useState<string>('');

  useEffect(() => {
    const fetchLongUrl = async () => {
      try {
        const response = await fetch(`https://url-shortener-gejj.onrender.com/api/GetLongUrl/${shortenedUrlKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch long URL');
        }
        const data = await response.text();
        setLongUrl(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchLongUrl();
  }, [shortenedUrlKey]);

  useEffect(() => {
    if (longUrl) {
      window.location.href = longUrl;
    }
  }, [longUrl]);

  return (
    <div className="flex justify-center items-center h-screen">
            <span className="text-4xl">Redirecting</span>
 
      <span className="loading loading-dots loading-lg text-4xl mx-1"></span>
    </div>
  );
};

export default Redirector;