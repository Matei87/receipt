import { useContext } from 'react';
import { ReceiptContext } from '../Context/context';

const Modal = ({ selectedModal }) => {
  const { receipt } = useContext(ReceiptContext);

  console.log('Modal ', selectedModal, receipt);
  return (
    <div
      className='modal fade'
      id='staticBackdrop'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='staticBackdropLabel'>
              Receipt Details
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body overflow-auto' style={{ height: '400px' }}>
            <p style={{ whiteSpace: 'pre' }}>{selectedModal.data}</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
