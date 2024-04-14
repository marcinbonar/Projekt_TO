import React, { FC } from 'react';
import { Form, FormInstance, Input, Modal } from 'antd';

interface SaveAsNewDataBaseProps {
  form: FormInstance
  isModalVisible: boolean;
  closeModal: () => void;
  onSubmitModal: () => void;
}

const SaveAsNewDataBase: FC<SaveAsNewDataBaseProps> = ({ isModalVisible, closeModal, form, onSubmitModal }) => {

  return (
    <Modal
      title="Zapisz jako nowy"
      open={isModalVisible}
      onOk={onSubmitModal}
      onCancel={() => {
        form.resetFields();
        closeModal();
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nazwa bazy"
          name="databaseName"
          rules={[{ required: true, message: 'Nazwa jest wymagana' }]}
        >
          <Input placeholder="Podaj nazwe" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SaveAsNewDataBase;
