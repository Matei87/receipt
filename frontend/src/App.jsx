import { useState, useEffect } from 'react';
import Table from 'rc-table';
import Navbar from './components/Navbar';

const App = () => {
  const [file, setFile] = useState('');
  const [data, setData] = useState('');
  const [tesData, setTesData] = useState('');
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
        //formData.append('image', file);
        // console.log(formData);

        const request = await fetch('http://localhost:5000/uploadFile', {
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
        console.log(request);
        if (request.ok) {
          let response = await request.json();
          // console.log(response);
          // const data = response.map((el) => el.text + '\n');
          // console.log(data);
          setTesData(response);
        }
      }
    } catch (error) {
      setError(error);
    }
  };

  const getData = async () => {
    try {
      const request = await fetch('http://localhost:5000/api');
      const response = await request.json();

      let obj = {};

      if (response.data) {
        const data = response.data.inference.prediction;
        obj = {
          supplierName: data.supplierName.value,
          supplierAddress: data.supplierAddress.value,
          category: data.category.value,
          subcategory: data.subcategory.value,
          date: data.date.value,
          time: data.time.value,
          // lineItems: data.lineItems.map((el) => ({
          //   description: el?.description,
          //   quantity: el?.quantity,
          //   totalAmount: el?.totalAmount,
          //   unitPrice: el?.unitPrice,
          // })),
          documentType: data.documentType.value,
          totalAmount: data.totalAmount.value,
          moneda: data.locale.currency,
          // taxes: [data.taxes[0].code, data.taxes[0].rate, data.taxes[0].value],
          totalTax: data.totalTax.value,
        };
      }
      setData(obj);
    } catch (error) {
      setError(error.message);
    }
  };

  const getData2 = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const request = await fetch(
          'https://api.api-ninjas.com/v1/imagetotext',
          {
            method: 'POST',
            headers: {
              'X-Api-Key': import.meta.env.VITE_NINJAS_API_KEY,
              'Content-Type': 'multipart/form-data',
            },
            data: formData,
          }
        );
        const response = await request.json();
        console.log('getData2 ', request, response);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = Object.keys(data).map(
    (el) => ({
      title: el,
      dataIndex: el,
      key: el,
      width: 125,
      align: 'center',
    })
    // {
    //   title: 'Operations',
    //   dataIndex: '',
    //   key: 'operations',
    //   render: () => <a href='#'>Delete</a>,
    // },
  );

  // const datas = Object.values(data).map(el =>
  //   ({ name: 'Jack', age: 28, address: 'some where', key: '1' })
  //   //{ name: 'Rose', age: 36, address: 'some where', key: '2' },
  // );
  // const datas = [{ name: 'Jack', age: 28, address: 'some where', key: '1' }];
  const mapped = [];
  for (let key in data) {
    mapped.push({ [key]: data[key] });
  }
  const newObj = [Object.assign({}, ...mapped)];
  //console.log(columns, mapped, [newObj]);
  //console.log('error ', error, file, data);

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <pre>{JSON.stringify(data, null, 4)}</pre>
        <p style={{ whiteSpace: 'pre', margin: '0 0 0 2.5rem' }}>{tesData}</p>
      </div>
      <Table
        columns={columns}
        data={newObj}
        tableLayout={'fixed'}
        rowKey={(record) => record}
      />
      {error && <p>Error uploading file: {error.message}</p>}
    </>
  );
};

export default App;
