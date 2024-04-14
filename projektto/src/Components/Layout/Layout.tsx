import { Button, Flex, Image, Layout, Menu, message, theme } from 'antd';

import {
  DeleteOutlined, FormOutlined,
  SaveOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { createElement, FC } from 'react';

import LOGO from '../../assets/LOGO.png';
import Playground from '../Playground';
import { useDispatch, useSelector } from 'react-redux';
import { deleteView, saveView, updateView } from '../../store/graphs/graphsSlice';
import { getCurrentGraph } from '../../store/graph/selectors';
import { getGraphs } from '../../store/graphs/selectors';
import { v4 as uuidv4 } from 'uuid';
import { initialState, setGraph } from '../../store/graph/graphSlice';
import JsonUploadButton from '../JsonUploadButton';
import JsonExportButton from '../JsonExportButton/JsonExportButton';
import SaveAsNewDataBase from './SaveAsNewDataBase';
import { useModalVisibility } from '../../utils/useModalVisibility';
import { useForm } from 'antd/lib/form/Form';

const { Header, Content, Sider } = Layout;


const PageLayout: FC = () => {
  const [form] = useForm();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const currentGraph = useSelector(getCurrentGraph);
  const graphs = useSelector(getGraphs);

  const dispatch = useDispatch();
  const {
    isModalVisible,
    openModal,
    closeModal,
  } = useModalVisibility();

  const saveAsNewView = () => {
    const database = { ...currentGraph, id: uuidv4(), name: form.getFieldValue('databaseName') }
    dispatch(saveView({ database }));
    !currentGraph.id && dispatch(database);
    closeModal();
    form.resetFields();
  };

  const deleteCurrentView = () => {
    const nextActiveGraph = graphs.filter(el => el.id !== currentGraph.id);
    dispatch(deleteView({ id: currentGraph.id }));
    dispatch(setGraph(nextActiveGraph[0] ?? initialState));
    message.success(`${currentGraph.name} usunięto pomyślnie`);
  };

  const onUpdateView = () => {
    dispatch(updateView({ id: currentGraph.id, database: currentGraph }));
    message.success('Zmiany zostały zapisane');
  };
  const setCurrentGraph = (id: any) => {
    const selectedGraph = graphs.find(el => el.id === id);
    if (!selectedGraph) return;
    dispatch(setGraph(selectedGraph));
  };

  const graphItems = graphs.map(el => ({
    key: el.id,
    icon: createElement(UserOutlined),
    label: `${el.name}`,
  }));

  return (
    <Layout>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        style={{ background: '#fff' }}
      >
        <div style={{ padding: 16 }}>
          <Image src={LOGO} preview={false}/>
          <Menu mode='inline' items={graphItems} style={{ marginTop: 16 }} onSelect={e => setCurrentGraph(e.key)}
                selectedKeys={[currentGraph.id]} />
          <JsonExportButton />
          <JsonUploadButton />
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 16, background: colorBgContainer }}>
          <Flex gap={8} justify='flex-end'>
            <Button type='default' icon={<DeleteOutlined />} danger onClick={deleteCurrentView}
                    disabled={!currentGraph.id}>Usuń widok</Button>
            <Button type='primary' icon={<FormOutlined />} onClick={onUpdateView} disabled={!currentGraph.id}>Zapisz
              zmiany </Button>
            <Button type='primary' icon={<SaveOutlined />} onClick={openModal}>Zapisz jako nowy</Button>
          </Flex>
        </Header>
        <Content style={{ background: '#FFF' }}>
          <Playground />
        </Content>
      </Layout>
      <SaveAsNewDataBase isModalVisible={isModalVisible} closeModal={closeModal} form={form}
                         onSubmitModal={saveAsNewView} />
    </Layout>
  );
};

export default PageLayout;