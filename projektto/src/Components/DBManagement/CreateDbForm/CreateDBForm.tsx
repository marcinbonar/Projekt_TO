import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


interface CreateDbFormProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  dbName: string;
  setDbName: React.Dispatch<React.SetStateAction<string>>;
  showDbName: boolean;
  setShowDbName: React.Dispatch<React.SetStateAction<boolean>>;
}


function CreateDbForm({ show, setShow, dbName, setDbName, showDbName, setShowDbName }: CreateDbFormProps): JSX.Element {
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowDbName(true);
    setShow(false);
  };
  const createNewDb = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDbName(event.target.value);
  };


  return (
    <Form onSubmit={submitForm}>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Database name</Form.Label>
        <Form.Control onChange={createNewDb} value={dbName} type='text' placeholder='Enter database name...' />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Save
      </Button>
    </Form>
  );
}

export default CreateDbForm;