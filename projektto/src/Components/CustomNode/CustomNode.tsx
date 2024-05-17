import React, { FC, useState } from 'react';
import { Card, Flex } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Handle, Position } from 'reactflow';

import { deleteTable, deleteTableElement } from '../../store/graph/graphSlice';
import { NodeData, TElement } from '../../types/node';
import AddRowModal from './components/AddRowModal';
import ChangeTitleTable from './components/ChangeTitleTable';
import { useModalVisibility } from '../../utils/useModalVisibility';
import { getCurrentGraph } from '../../store/graph/selectors';
import { DatabaseType } from '../../types/database';
import ChangeForeignKeyName from './components/ChangeForeignKeyName/ChangeForeignKeyName';

const NodeComponent: FC<{ id: string, data: NodeData }> = ({ id, data }) => {
  const { label, elements } = data || {};
  const dispatch = useDispatch();
  const currentGraph = useSelector(getCurrentGraph);

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

  const [isForeignKeyModalVisible, setForeignKeyModalVisible] = useState(false);
  const [currentElement, setCurrentElement] = useState<TElement | null>(null);

  const openForeignKeyModal = (element: TElement) => {
    setCurrentElement(element);
    setForeignKeyModalVisible(true);
  };

  const closeForeignKeyModal = () => {
    setCurrentElement(null);
    setForeignKeyModalVisible(false);
  };

  const getDisplayName = (notNull: boolean, unique: boolean, primaryKey: boolean, defaultValue: boolean) => {
    const arr = [];
    if (notNull) arr.push('NOT NULL');
    if (unique) arr.push('UNIQUE');
    if (primaryKey) arr.push('PRIMARY KEY');
    if (defaultValue) arr.push('DEFAULT');
    return arr.join(', ');
  };

  const getRow = (element: TElement, type: DatabaseType) => {
    if (element.foreignTable && element.foreignKey) {
      const prefix = type === DatabaseType.RELATIONAL ? 'FOREIGN KEY ' : '';
      return (
        <p
          style={{ border: `2px solid ${element.color}`, padding: '4px' }}
          onClick={() => openForeignKeyModal(element)}
        >
          {prefix}<span style={{ fontWeight: 700 }}>{element.foreignKey}</span> REFERENCES {element.foreignTable}({element.foreignKey})
        </p>
      );
    }
    return (
      <p style={{ border: `2px solid ${element.color}`, padding: '4px' }}>
        <span style={{ fontWeight: 700 }}>{element.name}</span> {element.type}({element.length}), {getDisplayName(element.notNull, element.unique, element.primaryKey, element.defaultValue)}
      </p>
    );
  };

  return (
    <>
      <Card size='small' title={label}
            extra={<Flex gap={16}>
              <DeleteOutlined onClick={() => dispatch(deleteTable({ tableId: id }))}
                              style={{ fontSize: '16px', color: '#E57373' }} />
              <EditOutlined onClick={() => openChangeTitleModal()} style={{ fontSize: '16px', color: '#81C784' }} />
              <PlusOutlined onClick={() => openAddRowModal()} style={{ fontSize: '16px', color: '#64B5F6' }} />
            </Flex>}
            style={{ width: 400 }}>
        {elements.map((element) => (
          <Flex key={element.id} gap={8} align='center'>
            {getRow(element, currentGraph.type)}
            <DeleteOutlined onClick={() => dispatch(deleteTableElement({ id, elementId: element.id }))}
                            style={{ color: '#E57373' }} />
          </Flex>
        ))}
      </Card>
      <Handle type='target' position={Position.Bottom} style={{ borderRadius: 8, width: 14, height: 14 }} />
      <Handle type='source' position={Position.Top} style={{ borderRadius: 8, width: 14, height: 14 }} />
      <AddRowModal isModalVisible={isAddRowModalVisible} closeModal={closeAddRowModal} id={id} />
      <ChangeTitleTable isModalVisible={isChangeTitleModalVisible} closeModal={closeChangeTitleModal} id={id} />
      {currentElement && (
        <ChangeForeignKeyName
          isVisible={isForeignKeyModalVisible}
          closeModal={closeForeignKeyModal}
          elementId={currentElement.id}
          initialValue={currentElement.foreignKey}
          tableId={id}
        />
      )}
    </>
  );
};

export default NodeComponent;
