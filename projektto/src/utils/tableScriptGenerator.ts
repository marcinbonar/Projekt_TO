import { TElement } from '../types/node';
import { Node } from 'reactflow';
import { DatabaseType } from '../types/database';
import sortTablesByDependencies from './sortTablesByDependencies';
import sortTablesByInheritance from './sortTablesByInheritance';


export const displayConfigElement = (value: boolean, displayValue: 'NOT NULL' | 'UNIQUE' | 'DEFAULT' | 'PRIMARY KEY') => {
  return value ? displayValue : '';
};

export const generateRelationalPropertyElement = (column: TElement) => {
  const { name, notNull, type, unique, length, defaultValue, primaryKey } = column;
  const notNullValue = displayConfigElement(notNull, 'NOT NULL');
  const uniqueValue = unique && !primaryKey ? displayConfigElement(unique, 'UNIQUE') : '';
  const defaultDisplayValue = displayConfigElement(defaultValue, 'DEFAULT');
  const typeValue = type ? `${type}(${length})` : type;

  const primaryKeyValue = primaryKey ? displayConfigElement(primaryKey, 'PRIMARY KEY') : '';


  return [name, typeValue, notNullValue, uniqueValue, defaultDisplayValue, primaryKeyValue].filter(el => el).join(' ');
};



export const generateObjectPropertyElement = (column: TElement) => {
  const { name, notNull, type, unique, primaryKey, foreignKey, foreignTable } = column;
  const notNullValue = displayConfigElement(notNull, 'NOT NULL');
  const uniqueValue = displayConfigElement(unique, 'UNIQUE');
  const primaryKeyValue = primaryKey && !foreignKey ? displayConfigElement(primaryKey, 'PRIMARY KEY') : '';
  const foreignLine = foreignTable ? `REFERENCES ${foreignTable}(${foreignKey})` : '';

  return [name, type, notNullValue, uniqueValue, primaryKeyValue, foreignLine].filter(el => el).join(' ');
};


export const generateRelationalCode = (tables: Node[]): string => {
  const sortedTables = sortTablesByDependencies(tables);
  let sqlData = sortedTables.map(({ data: table }) => {
    let createTableSql = `CREATE TABLE ${table.label} (\n`;
    const columnDefinitions = table.elements.map((el: TElement) => generateRelationalPropertyElement(el)).join(',\n');
    createTableSql += `${columnDefinitions}\n);`;

    // Dodanie klauzuli ALTER TABLE dla kluczy obcych
    const foreignKeyStatements = table.elements.filter((el: any) => el.foreignKey).map((el: any) =>
      `ALTER TABLE ${table.label} ADD FOREIGN KEY (${el.name}) REFERENCES ${el.foreignTable}(${el.foreignKey});`
    ).join('\n');

    return `${createTableSql}\n${foreignKeyStatements}`;
  });

  return sqlData.join('\n\n');
};




export const generateObjectCode = (tables: Node[]) => {
  const sortedTables = sortTablesByInheritance(tables);

  const sqlData = sortedTables.map(({ data: table }) => {
    let createTableSql = `CREATE TABLE ${table.label} (\n`;
    const columnDefinitions = table.elements.map((el: TElement) => generateObjectPropertyElement(el)).join(',\n');
    const inheritsTables = table.elements.map((element: TElement) => element.foreignTable).filter(Boolean);
    const inheritsSuffix = inheritsTables.length ? `INHERITS (${inheritsTables.join(', ')})` : '';
    createTableSql += `${columnDefinitions}\n)${inheritsSuffix};`;
    return createTableSql;
  });

  return sqlData.join('\n\n');
};

export const tableScriptGenerator = (tables: Node[], databaseType: DatabaseType) => {
  const modifyFn = databaseType === DatabaseType.RELATIONAL ? generateRelationalCode : generateObjectCode;
  return modifyFn(tables);
};
