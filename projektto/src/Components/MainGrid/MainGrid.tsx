import { Container, Row, Col } from 'react-bootstrap';

import MainGridLeftSide from '../MainGridLeftSide/MainGridLeftSide';
import MainGridRightSide from '../MainGridRightSide/MainGridRightSide';

import './MainGrid.css';

const MainGrid = () => {
  return (
    <Container fluid className='MainGridContainer'>
      <Row>
        <Col className='MainGridLeftSideCol' xl={2}>
          <MainGridLeftSide />
        </Col>
        <Col className='MainGridRightSideCol' xl={10}>
          <MainGridRightSide />
        </Col>
      </Row>
    </Container>
  );
};

export default MainGrid;