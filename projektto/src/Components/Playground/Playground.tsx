import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
} from 'reactflow';
import useGraph from '../../hooks/useGraph';
import { nodeTypesConfig } from '../../constants/nodeConfig';
import { Button, Flex, Select } from 'antd';
import { PlusOutlined, UpSquareOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentGraph } from '../../store/graph/selectors';
import { tableScriptGenerator } from '../../utils/tableScriptGenerator';
import { exportFile } from '../../utils/exportFile';
import { DatabaseType } from '../../types/database';
import { onChangeGraphType } from '../../store/graph/graphSlice';
import CustomEdge from '../CustomEdge/CustomEdge';

const Playground = () => {
  const { tables, onNodesChange, onConnect, edges, handleCreateNewNode, onEdgesChange } = useGraph();

  const currentGraph = useSelector(getCurrentGraph);
  const dispatch = useDispatch();

  const onGenerateSqlFile = () => {
    const config = tableScriptGenerator(currentGraph.tables, currentGraph.type);
    exportFile(config);
  };

  const onChangeGraph = (value: DatabaseType) => {
    dispatch(onChangeGraphType({ type: value }));
  };

  const options = [{
    label: 'Relacyjna', value: 'RELATIONAL',
  }, {
    label: 'Obiektowa', value: 'OBJECT',
  }];

  const edgeTypes = {
    custom: CustomEdge,
  };


  return <div style={{ width: '100vw', height: '70vh', padding: '4px' }}>
    <Flex gap={16}>
      <Button type='primary' icon={<PlusOutlined />} onClick={handleCreateNewNode} style={{ marginBottom: 16 }}>Dodaj
        nową
        tabelę
      </Button>
      <Button type='default' icon={<UpSquareOutlined />} onClick={onGenerateSqlFile} style={{ marginBottom: 16 }}
              disabled={!currentGraph.id}>Wygeneruj plik sql
      </Button>
      <Select
        allowClear
        placeholder='Wybierz typ grafu'
        options={options}
        onChange={onChangeGraph}
        value={currentGraph.type}
      />
    </Flex>
    <ReactFlow
      nodes={tables}
      edges={edges}
      edgeTypes={edgeTypes}
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