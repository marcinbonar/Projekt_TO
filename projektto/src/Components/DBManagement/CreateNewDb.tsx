import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './CreateNewDb.css';
import CreateDbForm from './CreateDBForm';

interface CreateNewDbProps {
    dbName: string;
    setDbName: React.Dispatch<React.SetStateAction<string>>;
    showDbName: boolean;
    setShowDbName: React.Dispatch<React.SetStateAction<boolean>>;
}


function CreateNewDb({ dbName, setDbName, setShowDbName, showDbName }: CreateNewDbProps): JSX.Element {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <button onClick={handleShow} className='CreateNewDbButton'>Create new database</button>
            <Modal show={show} onHide={handleClose} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Create new database</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateDbForm show={show} setShow={setShow} dbName={dbName} setDbName={setDbName} showDbName={showDbName} setShowDbName={setShowDbName} />
                </Modal.Body>

            </Modal>
        </>
    );
}

export default CreateNewDb;
