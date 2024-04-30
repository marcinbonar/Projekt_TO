import { useCallback, useState } from 'react';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges, Connection,
  Edge,
  OnConnect,
  OnEdgesChange,
} from 'reactflow';

import { createNewNode } from '../constants/newNode';
import { getTables } from '../store/graph/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addNewGraphElement, addTableElement, onEdgeChange, onNodeChanges } from '../store/graph/graphSlice';
import { v4 as uuidv4 } from 'uuid';


const useGraph = () => {
  const tables = useSelector(getTables);
  const [edges, setEdges] = useState<Edge[]>([]);
  const dispatch = useDispatch();

  const onAddForeignKey = (connection: Connection) => {
    const { source: sourceTableId, target: targetTableId } = connection;
    const currentModifyTable = tables.find(({ id }) => id === sourceTableId);
    const sourcePrimaryElement = currentModifyTable?.data.elements.find((primaryKey: { primaryKey: boolean }) => primaryKey);
    const foreignElement = {
      ...sourcePrimaryElement,
      id: uuidv4(),
      foreignKey: sourcePrimaryElement?.name || '',
      foreignTable: currentModifyTable?.data.label || '',
    };
    if (!targetTableId || !sourcePrimaryElement) return;
    dispatch(addTableElement({ id: targetTableId, element: foreignElement }));
  };

  const onNodesChange = useCallback((changes: any) => {
    dispatch(onNodeChanges(applyNodeChanges(changes, tables)));
  }, [tables, dispatch]);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => {
      const edges = applyEdgeChanges(changes, eds);
      dispatch(onEdgeChange(edges));
      return edges;
    }),
    [setEdges, dispatch, tables],
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => {
      const edges = addEdge({ ...connection, sourceHandle: uuidv4(), style: { stroke: 'red' } }, eds);
      connection.target && onAddForeignKey(connection);
      dispatch(onEdgeChange(edges));
      return edges;
    }),
    [setEdges, dispatch, tables],
  );

  const handleCreateNewNode = () => {
    const newNode = createNewNode();
    dispatch(addNewGraphElement(newNode));
  };

  return {
    tables,
    edges,
    onNodesChange,
    onConnect,
    handleCreateNewNode,
    onEdgesChange,
  };
};

export default useGraph;