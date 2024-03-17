import React, { useCallback, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import '../Tools.css';

import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  DefaultEdgeOptions,
  NodeTypes,
  BackgroundVariant
} from 'reactflow';

import 'reactflow/dist/style.css';
import PrintButton from '../PrintButton';
import { createNewNode } from './createNewNode'; // Importing createNewNode function



function Playground(): JSX.Element {
  const [nodes, setNodes] = useState<Node[]>([]);
  
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],

  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const handleCreateNewNode = () => {
    const updatedNodes = createNewNode(nodes);
    setNodes(updatedNodes);
  }


  return (
    <>
      <div className='ToolsDiv'>
        <PrintButton className='ToolsButton' onClick={handleCreateNewNode} iconName={faTable} />
      </div>
      <div style={{ width: '83.3vw', height: '92.1vh', padding: '4px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}

export default Playground;