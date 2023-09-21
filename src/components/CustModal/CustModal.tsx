import React from 'react';
import './CustModal.css';

interface IModalProps {
  title: string;
  onClick: () => void;
}

const CustModal: React.FC<IModalProps> = ({ title, onClick }) => {
  return (
    <>
      <div className="cus-modal" onClick={onClick}>
        <h1 className="cus-modal__text">{title}</h1>
      </div>
    </>
  );
};

export default CustModal;
