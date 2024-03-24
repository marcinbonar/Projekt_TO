import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleQuestion, faCode } from '@fortawesome/free-solid-svg-icons';

import { ActualDbProps } from './types';

import './ActualDb.css';

const ActualDb = ({ dbName, showDbName }: ActualDbProps) => {
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
      )}
    </>
  );
};

export default ActualDb;