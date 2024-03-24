import React from 'react';
import MainGrid from './Components/MainGrid/MainGrid';
import { mockDatabaseSchema } from './services/mock';
import { tableScriptGenerator } from './services/functions/tableScriptGenerator';

const App = () => {

  return (
    <MainGrid />
  );
};

export default App;
