export interface Position {
  x: number;
  y: number;
}

export interface TElement {
  name: string,
  type: string,
  length: number;
  notNull: boolean,
  unique: boolean,
  primaryKey: boolean,
  defaultValue: false,
  foreignKey: string;
  foreignTable: string;
}

export interface NodeData {
  label: string,
  elements: TElement[]
}

export interface Table {
  id: string;
  data: NodeData;
  type: NodeType;
  position: Position;
}

export enum NodeType {
  CUSTOM = 'CUSTOM'
}

export enum DatabaseType {
  RELATIONAL = 'RELATIONAL'
}

export interface TDatabase {
  name: string;
  type: DatabaseType;
  tables: Table[];
}
