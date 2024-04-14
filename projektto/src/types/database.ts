import { Node } from 'reactflow';

export enum DatabaseType {
  RELATIONAL = 'RELATIONAL'
}

export interface TDatabase {
  id: string;
  name: string;
  type: DatabaseType;
  tables: Node[];
}
