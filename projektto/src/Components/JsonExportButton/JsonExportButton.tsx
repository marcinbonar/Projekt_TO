import { Button } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentGraph } from '../../store/graph/selectors';
import { exportFile } from '../../utils/exportFile';

const JsonExportButton = () => {
  const currentGraph = useSelector(getCurrentGraph);

  const exportDataToJson = () => {
    exportFile(JSON.stringify(currentGraph, null, 4), `${currentGraph.name}.json`);
  };

  return <Button type='default' block style={{ marginTop: 16 }} icon={<FileOutlined />} disabled={!currentGraph.id}
                 onClick={exportDataToJson}>Zapisz
    jako JSON </Button>;
};

export default JsonExportButton;