import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleQuestion, faCode } from '@fortawesome/free-solid-svg-icons';
import './ActualDb.css';

interface ActualDbProps {
    dbName: string;
    showDbName: boolean;
}



function ActualDb({ dbName, showDbName }: ActualDbProps): JSX.Element {



    return (
        <>
            {dbName && showDbName && (
                <>
                    <span className='DataBaseNameHeader'>
                        Database name: <span className='DBName'>{dbName}</span>
                    </span>
                    <div className='DBManageDiv'>
                        <button className='DBManageButton'><FontAwesomeIcon size='xl' icon={faTrash} /></button>
                        <button className='DBManageButton'><FontAwesomeIcon size='xl' icon={faCircleQuestion} /></button>
                        <button className='DBManageButton'><FontAwesomeIcon size='xl' icon={faPenToSquare} /></button>
                        <button className='DBManageButton'><FontAwesomeIcon size='xl' icon={faCode} /></button>
                    </div>
                </>
            )
            }

        </>

    );
}

export default ActualDb;