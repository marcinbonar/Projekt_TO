import React, { Fragment } from 'react';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import '../Tools.css';

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from 'reactflow';

import 'reactflow/dist/style.css';

import PrintButton from '../PrintButton/PrintButton';
import useGraph from './useGraph';
import { nodeTypesConfig } from './constants';


const Playground = () => {
  const { nodes, edges, onNodesChange, onConnect, handleCreateNewNode, onEdgesChange } = useGraph();

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
          nodeTypes={nodeTypesConfig}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
};

export default Playground;