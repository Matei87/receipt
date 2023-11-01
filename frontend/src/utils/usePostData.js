import { useState, useContext } from 'react';
import { ReceiptContext } from '../Context/context';

const usePostData = (URL) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { receipt } = useContext(ReceiptContext);

  const fetchData = async (options) => {
    try {
      setIsLoading(true);
      const request = await fetch(URL, options);
      if (request.status === 201) {
        const response = await request.json();
        console.log('usePostData request.ok ', response);
        const modifiedResponse = {
          json: response[0]['TextOverlay']['Lines'],
          text: response[0]['ParsedText'],
          id: receipt.length + 1,
        };
        setData(modifiedResponse);
      } else {
        setError(request.statusText);
      }
    } catch (error) {
      console.log('usePostData error ', error);
      setError(error);
    }
    setIsLoading(false);
  };

  console.log('usePostData ', data, isLoading, error, URL);
  return [fetchData, data, isLoading, error];
};

export default usePostData;
