import React, { useState, FormEvent } from 'react';

interface UrlCreatorProps {}

const UrlCreator: React.FC<UrlCreatorProps> = () => {
  const [url, setUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  


  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
    } catch (_) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    e.preventDefault();
    setError('');

    if (!url) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        'https://url-shortener-gejj.onrender.com/api/CreateShortenedUrl/' + encodeURIComponent(url),
        {
          method: 'POST',
        }
      );
      if (!response.ok) {
        // Handle non-successful response (status code not in 200-299 range)
        throw new Error('Failed to create shortened URL');
      }
      const data = await response.text();
      // Assuming the response is a string
      setShortenedUrl(`pielyn.com/${data}`);
      setShowAlert(true);
      setUrl(''); // Clear the input field
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create shortened URL');
    } finally {
      setIsLoading(false);
    }
  };

  const [isCopied, setIsCopied] = useState(false);
  const [buttonColor, setButtonColor] = useState('btn-ghost');
  
  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default button click behavior
  
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setIsCopied(true);
      setButtonColor('btn-success'); // Change button color to green
      console.log('Shortened URL copied to clipboard');
      setTimeout(() => {
        setIsCopied(false);
        setButtonColor('btn-ghost'); // Reset button color after a delay
      }, 500); // Change the delay time as needed (1000ms = 1 second)
    } catch (error) {
      console.error('Error copying shortened URL to clipboard:', error);
    }
  };







  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-2xl mx-4">
        {showAlert && (
          <div role="alert" className="alert shadow-lg mb-4 flex justify-between">
            <div>
              <span className="">Shortened URL: </span>
              <a
                href={shortenedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover text-yellow-500"
              >
                {shortenedUrl}
              </a>
            </div>
            <div className="flex-none">
            <button className={`btn btn-sm ${buttonColor}`} onClick={handleCopy}>
              {isCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
          </div>
        )}
         <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Your Url"
          className="input w-full max-w-2xl mb-4"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button type="submit" className="btn btn-warning mb-4 relative">
          {isLoading && (
            <span className="loading loading-spinner loading-xs absolute left-2 mx-1"></span>
          )}
          <span className={`${isLoading ? 'ml-6' : ''}`}>Create Shortened Url</span>
        </button>
        
      </form>
    </div>
  );
};

export default UrlCreator;
