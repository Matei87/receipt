import { useState } from 'react';
import Navbar from './components/Navbar';

const App = () => {
  const [file, setFile] = useState('');
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(e.target, file);

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData);
        const request = await fetch('http://localhost:5000/uploadFile', {
          method: 'POST',
          // headers: {
          //   'content-type': 'multipart/form-data',
          // },
          body: formData,
        });
        const response = await request.json();
        console.log(response);
        setData(response);
      }
    } catch (error) {
      setError(error);
    }
  };

  console.log('error ', error, file, data);

  return (
    <>
      <Navbar />
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
            </div>
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
      {JSON.parse(null, data, 2)}
      {error && <p>Error uploading file: {error.message}</p>}
    </>
  );
};

export default App;
