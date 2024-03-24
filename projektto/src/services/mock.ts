import { DatabaseType, NodeType, TDatabase } from './types';

export const mockDatabaseSchema = {
  name: 'SampleDatabase',
  type: DatabaseType.RELATIONAL,
  tables: [
    {
      id: '1',
      data: [{
        label: 'USER',
        elements: [
          {
            name: 'userId',
            type: 'INT',
            length: 8,
            notNull: true,
            unique: true,
            primaryKey: true,
            defaultValue: false,
          },
          {
            name: 'name',
            type: 'VARCHAR',
            length: 20,
            notNull: false,
            unique: true,
            primaryKey: false,
            defaultValue: false,
          },
          {
            name: 'surname',
            type: 'VARCHAR',
            length: 20,
            notNull: false,
            unique: true,
            primaryKey: false,
            defaultValue: false,
          },
          {
            name: 'studentId',
            type: 'VARCHAR',
            length: 20,
            notNull: false,
            unique: true,
            primaryKey: false,
            defaultValue: false,
            foreignKey: 'studentId',
            foreignTable: 'STUDENT',
          },
          {
            name: 'employee_pk',
            type: 'VARCHAR',
            length: 20,
            notNull: false,
            unique: true,
            primaryKey: false,
            defaultValue: false,
            foreignKey: 'employeID',
            foreignTable: 'EMPLOYEE',
          },
        ],
      }],
      type: NodeType.CUSTOM,
      position: { x: 0, y: 0 },
    },
  ],
} as unknown as TDatabase;
