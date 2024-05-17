import { useCallback, useEffect, useState } from 'react';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges, Connection,
  Edge,
  OnConnect,
  OnEdgesChange,
} from 'reactflow';

import { createNewNode } from '../constants/newNode';
import { getEdges, getTables } from '../store/graph/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewGraphElement,
  addTableElement,
  onEdgeChange,
  onNodeChanges,
} from '../store/graph/graphSlice';
import { v4 as uuidv4 } from 'uuid';
import { getRandomColor } from '../utils/getRandomColor';


const useGraph = () => {
  const tables = useSelector(getTables);
  const storeEdges = useSelector(getEdges)
  const [edges, setEdges] = useState<Edge[]>([]);
  const dispatch = useDispatch();

  console.log([edges, storeEdges])

  const onAddForeignKey = (connection: Connection, color?: string) => {
    const { source: sourceTableId, target: targetTableId } = connection;
    const currentModifyTable = tables.find(({ id }) => id === sourceTableId);
    const sourcePrimaryElement = currentModifyTable?.data.elements.find((primaryKey: { primaryKey: boolean }) => primaryKey);
    const foreignElement = {
      ...sourcePrimaryElement,
      id: uuidv4(),
      foreignKey: sourcePrimaryElement?.name || '',
      foreignTable: currentModifyTable?.data.label || '',
      color,
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
      const color = getRandomColor();
      const edges = addEdge({
        ...connection,
        sourceHandle: uuidv4(),
        style: { stroke: color },
        labelStyle: { fill: color, fontWeight: 700 },
        type: 'custom',
      }, eds);
      connection.target && onAddForeignKey(connection, color);
      dispatch(onEdgeChange(edges));
      return edges;
    }),
    [setEdges, dispatch, tables],
  );

  const handleCreateNewNode = () => {
    const newNode = createNewNode();
    dispatch(addNewGraphElement(newNode));
  };

  useEffect(() => {
    setEdges(storeEdges)
  }, [storeEdges])

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