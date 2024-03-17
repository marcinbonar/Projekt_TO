import { Table, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleQuestion, faCode } from '@fortawesome/free-solid-svg-icons';


function DiagramManage(): JSX.Element {
    return (
        <>
        <button className='CreateNewDbButton'>Open existing model</button>
        <button className='CreateNewDbButton'>Delete actual model</button>
        </>
    );
}

export default DiagramManage;

