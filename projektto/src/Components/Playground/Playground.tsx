import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
} from 'reactflow';
import useGraph from '../../hooks/useGraph';
import { nodeTypesConfig } from '../../constants/nodeConfig';
import { Button, Flex } from 'antd';
import { PlusOutlined, UpSquareOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getCurrentGraph } from '../../store/graph/selectors';
import { tableScriptGenerator } from '../../utils/tableScriptGenerator';
import { exportFile } from '../../utils/exportFile';

const Playground = () => {
  const { tables, edges, onNodesChange, onConnect, handleCreateNewNode, onEdgesChange } = useGraph();

  const currentGraph = useSelector(getCurrentGraph);

  const onGenerateSqlFile = () => {
  const config = tableScriptGenerator(currentGraph.tables)
    exportFile(config)
  }

  return <div style={{ width: '100vw', height: '70vh', padding: '4px' }}>
    <Flex gap={16}>
      <Button type='primary' icon={<PlusOutlined />} onClick={handleCreateNewNode} style={{ marginBottom: 16 }}>Dodaj
        nową
        tabelę
      </Button>
      <Button type='default' icon={<UpSquareOutlined />} onClick={onGenerateSqlFile} style={{ marginBottom: 16 }} disabled={!currentGraph.id}>Wygeneruj plik sql
      </Button>
    </Flex>
    <ReactFlow
      nodes={tables}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypesConfig}
    >
      <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
      <Controls position='bottom-left' />
    </ReactFlow>
  </div>;
};

export default Playground;