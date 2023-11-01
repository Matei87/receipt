import { useContext, useState } from 'react';
import Table from 'rc-table';
import Modal from '../components/Modal';
import { ReceiptContext } from '../Context/context';

const Dashboard = () => {
  const [selectedModal, setSelectedModal] = useState({});
  const { receipt } = useContext(ReceiptContext);

  console.log('Dashboard ', receipt, selectedModal);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 30,
      className: 'border',
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      width: 400,
      ellipsis: true,
      className: 'border',
    },
    // {
    //   title: '',
    //   dataIndex: '',
    //   key: 'modal',
    //   width: 25,
    //   render: (e, f, g) => {
    //     console.log(e, f, g, selectedModal);
    //     return (
    //       <button
    //         type='button'
    //         className='btn btn-primary'
    //         data-bs-toggle='modal'
    //         data-bs-target={`#modal_${e.id}`}
    //         onClick={() => setSelectedModal(e)}
    //       >
    //         Open modal
    //       </button>
    //     );
    //   },
    // },
  ];

  const data = receipt.map((info) => ({
    id: info.id,
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
