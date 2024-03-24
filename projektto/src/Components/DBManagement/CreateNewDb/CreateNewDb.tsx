import { FC, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import CreateDbForm from '../CreateDbForm/CreateDBForm';

import { CreateNewDbProps } from './types';

import './CreateNewDb.css';

const CreateNewDb: FC<CreateNewDbProps> = ({ dbName, setDbName, setShowDbName, showDbName }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <button onClick={handleShow} className='CreateNewDbButton'>Create new database</button>
      <Modal show={show} onHide={handleClose} animation={false} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Create new database</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateDbForm show={show} setShow={setShow} dbName={dbName} setDbName={setDbName} showDbName={showDbName}
                        setShowDbName={setShowDbName} />
        </Modal.Body>

      </Modal>
    </>
  );
};

export default CreateNewDb;
