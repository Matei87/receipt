import { createContext, useEffect, useState } from 'react';

export const ReceiptContext = createContext(null);

const getInitialState = () => {
  const receipt = localStorage.getItem('receipt');
  return receipt ? JSON.parse(receipt) : [];
};

export const ReceiptProvider = (props) => {
  const [receipt, setReceipt] = useState(getInitialState);

  console.log('ReceiptProvider ', receipt);

  useEffect(() => {
    localStorage.setItem('receipt', JSON.stringify(receipt));
  }, [receipt]);

  return (
    <ReceiptContext.Provider
      value={{
        receipt,
        addReceipt: (localReceipt) =>
          setReceipt((prev) => [...prev, localReceipt]),
        removeReceipt: (id) => {
          const newReceipts = receipt.filter(
            (data) => data.id.slice(0, 8) !== id
          );
          setReceipt(newReceipts);
        },
      }}
    >
      {props.children}
    </ReceiptContext.Provider>
  );
};
