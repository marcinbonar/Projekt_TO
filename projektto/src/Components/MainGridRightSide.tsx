import { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './MainGrid.css';
import Playground from '../Components/Playground/Playground';


function MainGridRightSide(): JSX.Element {


    
    return (
        <>

            <Row>
                <Col className='PlaygroundCol' xl={12}>
                    <Playground />
                </Col>
            </Row>

        </>
    );
}

export default MainGridRightSide;