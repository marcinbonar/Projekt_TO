import { useCallback, useState } from 'react';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from 'reactflow';

import { createNewNode } from '../constants/newNode';
import { getTables } from '../store/graph/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addNewGraphElement, onNodeChanges } from '../store/graph/graphSlice';


const useGraph = () => {
  const tables = useSelector(getTables);
  const [edges, setEdges] = useState<Edge[]>([]);
  const dispatch = useDispatch();


  const onNodesChange = useCallback((changes: any) => {
    dispatch(onNodeChanges(applyNodeChanges(changes, tables)));
  }, [tables]);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
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