import React, { FC } from 'react';
import { tableScriptGenerator } from '../functions/tableScriptGenerator';
import { mockDatabaseSchema } from '../mock';
import { exportSqlFile } from '../functions/saveSqlFile';


const SqlSaveButton: FC = () => {

  return (
    <button className='btn btn-success'
      // @ts-ignore
            onClick={() => exportSqlFile(tableScriptGenerator(mockDatabaseSchema.tables[0].data[0]))}>
      Zapisz jako .sql
    </button>
  );
};

export default SqlSaveButton;
