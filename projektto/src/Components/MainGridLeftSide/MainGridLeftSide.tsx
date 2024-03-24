import { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

import LOGO from './LOGO.png';
import DiagramManage from '../DiagramManagement/DiagramManage';
import CreateNewDb from '../DBManagement/CreateNewDb/CreateNewDb';
import ActualDb from '../DBManagement/ActualDb/ActualDb';
import TablesList from '../TablesList/TablesList';


import '../MainGrid/MainGrid.css';
import SqlSaveButton from '../../services/SqlSaveButton/SqlSaveButton';


const MainGridLeftSide = () => {

  const [dbName, setDbName] = useState<string>('');
  const [showDbName, setShowDbName] = useState<boolean>(false);

  return (
    <>
      <Row>
        <Col className='LogoCol' xl={12}>
          <Image className='LogoImage' src={LOGO} />
        </Col>
      </Row>
      <Row>
        <Col className='ManageDBCol' xl={12}>
          <DiagramManage />
          <CreateNewDb dbName={dbName} setDbName={setDbName} setShowDbName={setShowDbName} showDbName={showDbName} />
          <ActualDb dbName={dbName} showDbName={showDbName} />
          <TablesList />
          <SqlSaveButton />
        </Col>
      </Row>
    </>
  );
};

export default MainGridLeftSide;