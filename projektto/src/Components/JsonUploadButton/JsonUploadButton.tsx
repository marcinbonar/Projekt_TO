import React from 'react';
import { Upload, Button, message } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setGraph } from '../../store/graph/graphSlice';
import { TDatabase } from '../../types/database';
import { saveView } from '../../store/graphs/graphsSlice';

const readFileContent = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e?.target?.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};

const JsonUploadButton = () => {
  const dispatch = useDispatch();
  const handleFileChange = async (info: any) => {
    try {
      const content = await readFileContent(info.fileList[0].originFileObj) as string;
      const parsedData = JSON.parse(content) as TDatabase
      dispatch(setGraph(parsedData));
      dispatch(saveView({ database: parsedData }));
      message.success(`${info.file.name} został załadowany pomyślnie`);
    } catch (error) {
      message.error('Nie udało się załadować pliku');
    }
  };

  return (
    <Upload
      accept='.json'
      beforeUpload={() => false}
      onChange={handleFileChange}
      showUploadList={false}
      maxCount={1}
    >
      <Button type='default' block style={{ marginTop: 16 }} icon={<FolderOpenOutlined />}>Otwórz z JSON</Button>
    </Upload>
  );
};

export default JsonUploadButton;