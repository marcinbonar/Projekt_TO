import { TElement } from '../types/node';
import { Node } from 'reactflow';


export const displayConfigElement = (value: boolean, displayValue: 'NOT NULL' | 'UNIQUE' | 'DEFAULT' | 'PRIMARY KEY') => {
  return value ? displayValue : '';
};

export const generateProperty = (column: TElement): string => {
  const { name, notNull, type, unique, length, defaultValue, primaryKey, foreignKey, foreignTable } = column;
  const notNullValue = displayConfigElement(notNull, 'NOT NULL');
  const uniqueValue = displayConfigElement(unique, 'UNIQUE');
  const defaultDisplayValue = displayConfigElement(defaultValue, 'DEFAULT');
  const typeValue = `${type}(${length})`;
  const primaryKeyValue = displayConfigElement(primaryKey, 'PRIMARY KEY');

  const propertyValue = [name, typeValue, notNullValue, uniqueValue, defaultDisplayValue, primaryKeyValue].filter(el => el).join(' ');
  const foreignLine = `FOREIGN KEY ${name} REFERENCES ${foreignTable}(${foreignKey})`;

  return foreignKey ? [propertyValue, foreignLine].join(',\n') : propertyValue;
};

export const tableScriptGenerator = (tables: Node[]) => {
  const sqlData = tables.map(({ data: table }) => {
    let createTableSql = `CREATE TABLE ${table.label} (\n`;
    const columnDefinitions = table?.elements?.map(generateProperty).join(',\n');
    createTableSql += columnDefinitions;
    createTableSql += '\n);';
    return createTableSql;
  });
  return sqlData.join('\n');
};
