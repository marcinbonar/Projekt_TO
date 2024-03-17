import { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './MainGrid.css';
import LOGO from '../Assets/LOGO.png';
import DiagramManage from './DiagramManagement/DiagramManage';
import CreateNewDb from './DBManagement/CreateNewDb';
import ActualDb from './DBManagement/ActualDb';
import TablesList from './TablesList/TablesList';



function MainGridLeftSide(): JSX.Element {

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
                </Col>
            </Row>
        </>
    );
}

export default MainGridLeftSide;