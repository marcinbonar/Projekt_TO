import React, { FC } from 'react';
import { Card, Flex } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteTable, deleteTableElement } from '../../store/graph/graphSlice';
import { NodeData } from '../../types/node';
import AddRowModal from './components/AddRowModal';
import ChangeTitleTable from './components/ChangeTitleTable';
import { useModalVisibility } from '../../utils/useModalVisibility'; // Zaimportuj custom hook

const Node: FC<{ id: string, data: NodeData }> = ({ id, data }) => {
  const { label, elements } = data || {};
  const dispatch = useDispatch();

  const {
    isModalVisible: isAddRowModalVisible,
    openModal: openAddRowModal,
    closeModal: closeAddRowModal,
  } = useModalVisibility();
  const {
    isModalVisible: isChangeTitleModalVisible,
    openModal: openChangeTitleModal,
    closeModal: closeChangeTitleModal,
  } = useModalVisibility();

  const getDisplayName = (notNull: boolean, unique: boolean, primaryKey: boolean, defaultValue: boolean) => {
    const arr = [];
    if (notNull) arr.push('NOT NULL');
    if (unique) arr.push('UNIQUE');
    if (primaryKey) arr.push('PRIMARY KEY');
    if (defaultValue) arr.push('DEFAULT');
    return arr.join(', ');
  };

  const onClickDeleteElement = (elementId: string) => {
    dispatch(deleteTableElement({ id, elementId }));
  };

  const onDeleteTable = () => {
    dispatch(deleteTable({ tableId: id }));
  };

  const onEditTableName = () => {
    openChangeTitleModal();
  };

  return (
    <>
      <Card size='small' title={label}
            extra={<Flex gap={16}>
              <DeleteOutlined onClick={onDeleteTable} style={{ fontSize: '16px', color: '#E57373' }} />
              <EditOutlined onClick={onEditTableName} style={{ fontSize: '16px', color: '#81C784' }} />
              <PlusOutlined onClick={openAddRowModal} style={{ fontSize: '16px', color: '#64B5F6' }} />
            </Flex>}
            style={{ width: 400 }}>
        {elements.map(({ id, name, type, length, notNull, unique, primaryKey, defaultValue }) => (
          <Flex key={id} gap={8}>
            <p>
              <span
                style={{ fontWeight: 700 }}>{name}</span> {type}({length}), {getDisplayName(notNull, unique, primaryKey, defaultValue)}
            </p>
            <DeleteOutlined onClick={() => onClickDeleteElement(id)} style={{ color: '#E57373' }} />
          </Flex>
        ))}
      </Card>
      <AddRowModal isModalVisible={isAddRowModalVisible} closeModal={closeAddRowModal} id={id} />
      <ChangeTitleTable isModalVisible={isChangeTitleModalVisible} closeModal={closeChangeTitleModal} id={id} />
    </>
  );
};

export default Node;
