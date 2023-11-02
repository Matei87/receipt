import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const usePostData = (URL) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const receiptId = uuidv4();

  const fetchData = async (options) => {
    try {
      setIsLoading(true);
      const request = await fetch(URL, options);
      if (request.status === 201) {
        const response = await request.json();
        const modifiedResponse = {
          json: response[0]['TextOverlay']['Lines'],
          text: response[0]['ParsedText'],
          id: receiptId,
        };
        setData(modifiedResponse);
      } else {
        setError(request.statusText);
      }
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  console.log('usePostData ', data, isLoading, error, URL);
  return [fetchData, data, isLoading, error];
};

export default usePostData;
