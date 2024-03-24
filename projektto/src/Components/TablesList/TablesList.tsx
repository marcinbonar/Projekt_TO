import { Table, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import './TablesList.css';

const TablesList = () => {

  return (
    <>
      <span className='TablesHeader'>Tables</span>
      <Container fluid className='TablesListContainer'>
        <Table striped bordered hover className='TablesList'>
          <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>

          <tr>
            <td>1</td>
            <td>2</td>
            <td>
              <button className='ActionButton'><FontAwesomeIcon size='lg' icon={faCircleQuestion} /></button>
              <button className='ActionButton'><FontAwesomeIcon size='lg' icon={faPenToSquare} /></button>
              <button className='ActionButton'><FontAwesomeIcon size='lg' icon={faTrash} /></button>
            </td>
          </tr>

          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TablesList;