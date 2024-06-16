import { FC } from 'react';
import { Checkbox, InputNumber, Modal, Select } from 'antd';
import { Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addTableElement } from '../../../../store/graph/graphSlice';

const options = [
  { label: 'VARCHAR', value: 'VARCHAR' },
  { label: 'INT', value: 'INT' },
  { label: 'TEXT', value: 'TEXT' },
  { label: 'DATE', value: 'DATE' },
  { label: 'BOOLEAN', value: 'BOOLEAN' },
  { label: 'FLOAT', value: 'FLOAT' },
  { label: 'DOUBLE', value: 'DOUBLE' },
  { label: 'DECIMAL', value: 'DECIMAL' },
  { label: 'CHAR', value: 'CHAR' },
  { label: 'BIGINT', value: 'BIGINT' },
  { label: 'NUMERIC', value: 'NUMERIC' },
  { label: 'REAL', value: 'REAL' },
  { label: 'SMALLINT', value: 'SMALLINT' },
  { label: 'TIMESTAMP', value: 'TIMESTAMP' },
  { label: 'TIME', value: 'TIME' },
  { label: 'BINARY', value: 'BINARY' },
  { label: 'VARBINARY', value: 'VARBINARY' },
  { label: 'ARRAY', value: 'ARRAY' },
  { label: 'JSON', value: 'JSON' }
];

const AddRowModal: FC<{ isModalVisible: boolean, closeModal: () => void, id: string }> = ({
                                                                                            isModalVisible,
                                                                                            closeModal,
                                                                                            id,
                                                                                          }) => {

  const [form] = useForm();

  const dispatch = useDispatch();


  const onSubmitModal = async () => {
    try {
      await form.validateFields();
      dispatch(addTableElement({ id, element: { id: uuidv4(), ...form.getFieldsValue() } }));
    } catch (e) {
      console.log(e);
    } finally {
      form.resetFields();
      closeModal();
    }
  };

  return <Modal title='Dodaj nową wartość' open={isModalVisible} onOk={onSubmitModal} onCancel={closeModal}>
    <Form form={form} layout='vertical'>
      <Form.Item label='Nazwa pola' name='name'>
        <Input placeholder='Podaj nazwę pola' />
      </Form.Item>
      <Form.Item label='Typ pola' name='type'>
        <Select
          allowClear
          placeholder='Wybierz typ'
          options={options}
        />
      </Form.Item>
      <Form.Item label='Wielkość' name='length'>
        <InputNumber min={1} max={500} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item valuePropName='checked' name='notNull' initialValue={false}>
        <Checkbox>
          Wartośc NOT NULL
        </Checkbox>
      </Form.Item>
      <Form.Item valuePropName='checked' name='unique' initialValue={false}>
        <Checkbox>
          Wartośc UNIQUE
        </Checkbox>
      </Form.Item>
      <Form.Item valuePropName='checked' name='primaryKey' initialValue={false}>
        <Checkbox>
          Wartośc PRIMARY KEY
        </Checkbox>
      </Form.Item>
    </Form>
  </Modal>;
};

export default AddRowModal;