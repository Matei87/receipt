import { useContext, useState } from 'react';
import Table from 'rc-table';
import Modal from '../components/Modal';
import { ReceiptContext } from '../Context/context';

const Dashboard = () => {
  const [selectedModal, setSelectedModal] = useState({});
  const { receipt, removeReceipt } = useContext(ReceiptContext);

  const handleDelete = (record, e) => {
    e.preventDefault();
    console.log(record);
    removeReceipt(record);
  };

  const handleModal = (record, e) => {
    e.preventDefault();
    setSelectedModal(record);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 40,
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      width: 400,
      ellipsis: true,
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'modal',
      width: 100,
      render: (_, record) => (
        <div className='d-flex justify-content-around'>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#staticBackdrop'
            onClick={(e) => handleModal(record, e)}
          >
            Open
          </button>
          <button
            type='button'
            className='btn btn-danger'
            onClick={(e) => handleDelete(record.id, e)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const data = receipt.map((info) => ({
    id: info.id.slice(0, 8),
    data: info.text,
    key: info.id,
  }));

  return (
    <div>
      <h2 className='text-center my-5'>Dashboard</h2>
      <Table
        columns={columns}
        data={data}
        // expandable={{
        //   expandRowByClick: true,
        //   expandedRowRender: (record) => <p>{record.data}</p>,
        //   expandIcon: (props) => (
        //     <>
        //       {props?.expanded ? <>&#x2191; collapse </> : <>&#x2193; expand</>}
        //     </>
        //   ),
        // }}
        className='table'
      />

      <Modal selectedModal={selectedModal} />
    </div>
  );
};

export default Dashboard;
