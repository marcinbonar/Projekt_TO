import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { updateForeignKey } from '../../../../store/graph/graphSlice';

const ChangeForeignKeyName = ({ isVisible, closeModal, elementId, initialValue, tableId }: any) => {
  const [foreignKey, setForeignKey] = useState(initialValue);
  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(updateForeignKey({ id: tableId, elementId, newForeignKey: foreignKey }));
    closeModal();
  };

  return (
    <Modal
      title="Change Foreign Key Name"
      visible={isVisible}
      onOk={handleOk}
      onCancel={closeModal}
    >
      <Input
        value={foreignKey}
        onChange={(e) => setForeignKey(e.target.value)}
      />
    </Modal>
  );
};

export default ChangeForeignKeyName;
