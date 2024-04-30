import { Node } from 'reactflow';

export enum DatabaseType {
  RELATIONAL = 'RELATIONAL',
  OBJECT = 'OBJECT'
}

export type TEdge = any

export interface TDatabase {
  id: string;
  name: string;
  type: DatabaseType;
  tables: Node[];
  edges: TEdge[]
}
