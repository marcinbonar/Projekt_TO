import { FC } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { addTableElement, updateTableName } from '../../../store/graph/graphSlice';
import { v4 as uuidv4 } from 'uuid';



const ChangeTitleTable: FC<{ isModalVisible: boolean, closeModal: () => void, id: string }> = ({ isModalVisible, closeModal, id, }) =>{

  const [form] = useForm();
  const dispatch = useDispatch();

  const onSubmitModal = async () => {
    try {
      await form.validateFields();
      const newName = form.getFieldValue('nameTable');
      dispatch(updateTableName({ tableId: id, newName }));
    } catch (e) {
      console.error('Error updating table name:', e);
    } finally {
      form.resetFields();
      closeModal();
    }
  };

  return<Modal title='Zmień nazwę tabeli' open={isModalVisible} onOk={onSubmitModal} onCancel={closeModal}>
    <Form form={form} layout='vertical'>
      <Form.Item label='Nazwa pola' name='nameTable'>
        <Input placeholder='Podaj nazwę pola tabeli' />
      </Form.Item>
    </Form>
  </Modal>
}


export default ChangeTitleTable