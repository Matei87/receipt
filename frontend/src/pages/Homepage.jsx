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
        <ul className='nav nav-tabs' id='myTab' role='tablist'>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link active'
              id='home-tab'
              data-bs-toggle='tab'
              data-bs-target='#home-tab-pane'
              type='button'
              role='tab'
              aria-controls='home-tab-pane'
              aria-selected='true'
            >
              Receipt OCR
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='profile-tab'
              data-bs-toggle='tab'
              data-bs-target='#profile-tab-pane'
              type='button'
              role='tab'
              aria-controls='profile-tab-pane'
              aria-selected='false'
            >
              📄 General OCR
            </button>
          </li>
        </ul>
        <div className='tab-content' id='myTabContent'>
          <div
            className='tab-pane fade show active'
            id='home-tab-pane'
            role='tabpanel'
            aria-labelledby='home-tab'
            tabIndex='0'
          >
            <div className='container-fluid d-flex flex-column gap-3'>
              <h3 className='mt-4'>React File Upload</h3>
              <form onSubmit={handleSubmit}>
                <div className='input-group mb-3'>
                  <label
                    className='input-group-text'
                    htmlFor='inputGroupFile01'
                  >
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
                <button type='submit' className='btn btn-primary'>
                  Upload
                </button>
              </form>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                {/* <p style={{ whiteSpace: 'pre', margin: '0 0 0 2.5rem' }}>
                  {testData && testData.ParsedText}
                </p> */}
              </div>

              {/* <Table
                  columns={columns}
                  data={newObj}
                  tableLayout={'fixed'}
                  rowKey={(record) => record}
                /> */}

              <p>{secondError && secondError}</p>
              <div className='container text-center border w-100 h-100 w-md-100'>
                <div className='row border'>
                  <div className='col border bg-success'>
                    <h1>Parsed Receipt</h1>
                  </div>
                </div>
                <div className='row border d-flex' style={{ height: '400px' }}>
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
            </div>
            <button
              type='submit'
              className='btn btn-primary mt-4'
              onClick={() => addReceipt(secondData)}
              disabled={secondIsLoading}
            >
              Save Receipt
            </button>
          </div>
          <div
            className='tab-pane fade'
            id='profile-tab-pane'
            role='tabpanel'
            aria-labelledby='profile-tab'
            tabIndex='0'
          >
            <h3 className='mt-4 text-center'>To be continued..</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
