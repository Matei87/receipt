import { useState, useContext } from 'react';
import usePostData from '../utils/usePostData.js';
import { ReceiptContext } from '../Context/context';

const Homepage = () => {
  const [file, setFile] = useState('');
  const { receipt, addReceipt } = useContext(ReceiptContext);

  const [fetchData, secondData, secondIsLoading, secondError] = usePostData(
    'http://localhost:5000/uploadFile'
  );

  const handleFileSelect = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target, file);

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      fetchData({
        method: 'POST',
        body: formData,
      });

      // const request = await fetch(
      //   'https://api.api-ninjas.com/v1/imagetotext',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'X-Api-Key': import.meta.env.VITE_NINJAS_API_KEY,
      //     },
      //     body: formData,
      //     enctype: 'multipart/form-data',
      //     processData: false,
      //     contentType: false,
      //   }
      // );
      // const data = response.map((el) => el.text + '\n');
      //console.log(data);
      //setTestData(response[0]);
    }
  };

  console.log(secondData, secondIsLoading, secondError);
  console.log('HOMEPAGE ', receipt);
  return (
    <>
      <h2 className='text-center my-5'>Home</h2>
      <div className='container mt-5'>
        <div className='container-fluid d-flex flex-column gap-3'>
          <h3 className='mt-4'>React File Upload</h3>
          <form onSubmit={handleSubmit}>
            <div className='input-group mb-3'>
              <label className='input-group-text' htmlFor='inputGroupFile01'>
                📷 Use Camera
              </label>
              <input
                type='file'
                accept='image/*'
                capture='camera'
                className='form-control'
                onChange={handleFileSelect}
              />
            </div>
            {/* <div className='input-group mb-3'>
                  <label
                    className='input-group-text'
                    htmlFor='inputGroupFile01'
                  >
                    📂 Browse a receipt
                  </label>
                  <input
                    type='file'
                    accept='image/*'
                    className='form-control'
                    onChange={handleFileSelect}
                  />
                </div> */}
            <button type='submit' className='btn btn-dark'>
              Upload
            </button>
          </form>

          <p>{secondError && secondError}</p>
          <div className='container text-center w-100 h-100 w-md-100'>
            <div className='row'>
              <div className='col bg-success'>
                <h1>Parsed Receipt</h1>
              </div>
            </div>
            <div className='row d-flex' style={{ height: '400px' }}>
              <div className='col border overflow-auto d-flex flex-column p-0 h-100 w-100'>
                <h1 className='w-100 bg-info sticky-top'>JSON Format</h1>
                <p style={{ whiteSpace: 'pre', margin: '0 0 0 2.5rem' }}>
                  {JSON.stringify(secondData['json'], null, 2)}
                </p>
              </div>
              <div className='col border overflow-auto d-flex flex-column p-0 h-100 w-100'>
                <h1 className='w-100 bg-info sticky-top'>Text</h1>
                <p style={{ whiteSpace: 'pre' }}>{secondData['text']}</p>
              </div>
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='btn btn-dark mt-4'
              onClick={() => addReceipt(secondData)}
              disabled={secondIsLoading}
            >
              Save Receipt
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
