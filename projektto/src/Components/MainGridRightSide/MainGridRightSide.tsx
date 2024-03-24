import { Row, Col } from 'react-bootstrap';

import Playground from '../Playground/Playground';

import '../MainGrid/MainGrid.css';

const MainGridRightSide = () => {
  return (
    <Row>
      <Col className='PlaygroundCol' xl={12}>
        <Playground />
      </Col>
    </Row>
  );
};

export default MainGridRightSide;