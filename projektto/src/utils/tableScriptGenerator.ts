import { Node } from 'reactflow';
import { TElement } from '../types/node';
import { DatabaseType } from '../types/database';

// Pomocnicza funkcja do wyświetlania konfiguracji kolumny
export const displayConfigElement = (value: boolean, displayValue: 'NOT NULL' | 'UNIQUE' | 'DEFAULT' | 'PRIMARY KEY') => {
  return value ? displayValue : '';
};

// Generuje definicję pojedynczej kolumny dla tabeli relacyjnej
export const generateRelationalPropertyElement = (column: TElement) => {
  const { name, notNull, type, unique, length, defaultValue, primaryKey } = column;
  const notNullValue = displayConfigElement(notNull, 'NOT NULL');
  const uniqueValue = unique && !primaryKey ? displayConfigElement(unique, 'UNIQUE') : '';
  const defaultDisplayValue = displayConfigElement(defaultValue, 'DEFAULT');
  const typeValue = type ? `${type}(${length})` : type;
  const primaryKeyValue = primaryKey ? displayConfigElement(primaryKey, 'PRIMARY KEY') : '';

  return [name, typeValue, notNullValue, uniqueValue, defaultDisplayValue, primaryKeyValue].filter(el => el).join(' ');
};

// Generuje definicję pojedynczej kolumny dla tabeli obiektowej
export const generateObjectPropertyElement = (column: TElement) => {
  const { name, notNull, type, unique, primaryKey, foreignKey, foreignTable } = column;
  const notNullValue = displayConfigElement(notNull, 'NOT NULL');
  const uniqueValue = displayConfigElement(unique, 'UNIQUE');
  const primaryKeyValue = primaryKey && !foreignKey ? displayConfigElement(primaryKey, 'PRIMARY KEY') : '';
  const foreignLine = foreignTable ? `REFERENCES ${foreignTable}(${foreignKey})` : '';

  return [name, type, notNullValue, uniqueValue, primaryKeyValue, foreignLine].filter(el => el).join(' ');
};

// Generuje kod SQL dla tabel relacyjnych
export const generateRelationalCode = (tables: Node[]): string => {
  const sortedTables = tables;
  let sqlData = [] as any;
  let foreignKeyStatements = [] as any;

  sortedTables.forEach(({ data: table }) => {
    let createTableSql = `CREATE TABLE ${table.label} (\n`;
    const columnDefinitions = table.elements.map((el: TElement) => generateRelationalPropertyElement(el)).join(',\n');
    createTableSql += `${columnDefinitions}\n);`;
    sqlData.push(createTableSql);

    // Dodanie instrukcji ALTER TABLE dla kluczy obcych na końcu
    table.elements.filter((el: TElement) => el.foreignKey).forEach((el:any) => {
      foreignKeyStatements.push(`ALTER TABLE ${table.label} ADD FOREIGN KEY (${el.name}) REFERENCES ${el.foreignTable}(${el.foreignKey});`);
    });
  });

  return `${sqlData.join('\n\n')}\n${foreignKeyStatements.join('\n')}`;
};

// Generuje kod SQL dla tabel obiektowych
export const generateObjectCode = (tables: Node[]) => {
  const sortedTables = tables;
  let sqlData = [] as any;

  sortedTables.forEach(({ data: table }) => {
    let createTableSql = `CREATE TABLE ${table.label} (\n`;
    const columnDefinitions = table.elements.map((el: TElement) => generateObjectPropertyElement(el)).join(',\n');
    const inheritsTables = table.elements.map((el: TElement) => el.foreignTable).filter(Boolean);
    const inheritsSuffix = inheritsTables.length ? ` INHERITS (${inheritsTables.join(', ')})` : '';
    createTableSql += `${columnDefinitions}\n)${inheritsSuffix};`;
    sqlData.push(createTableSql);
  });

  return sqlData.join('\n\n');
};

// Funkcja główna do generowania skryptów dla określonego typu bazy danych
export const tableScriptGenerator = (tables: Node[], databaseType: DatabaseType) => {
  const modifyFn = databaseType === DatabaseType.RELATIONAL ? generateRelationalCode : generateObjectCode;
  return modifyFn(tables);
};
