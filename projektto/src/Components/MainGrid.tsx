import { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './MainGrid.css';

import MainGridLeftSide from './MainGridLeftSide';
import MainGridRightSide from './MainGridRightSide';


function MainGrid(): JSX.Element {

    return (
        <>
            <Container fluid className='MainGridContainer' >
                <Row>
                    <Col className='MainGridLeftSideCol' xl={2}>
                        <MainGridLeftSide />
                    </Col>
                    <Col className='MainGridRightSideCol' xl={10}>
                        <MainGridRightSide  />
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default MainGrid;