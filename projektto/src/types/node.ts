import { CoordinateExtent, Position, XYPosition } from 'reactflow';

export enum NodeType {
  CUSTOM = 'CUSTOM'
}

export type Node<T> = {
  id: string;
  position: XYPosition;
  data: T;
  sourcePosition?: Position;
  targetPosition?: Position;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  resizing?: boolean;
  deletable?: boolean;
  dragHandle?: string;
  width?: number | null;
  height?: number | null;
  parentNode?: string;
  zIndex?: number;
  extent?: 'parent' | CoordinateExtent;
  expandParent?: boolean;
  positionAbsolute?: XYPosition;
  ariaLabel?: string;
  focusable?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

export interface TElement {
  id: string;
  name: string,
  type: string,
  length: number;
  notNull: boolean,
  unique: boolean,
  primaryKey: boolean,
  defaultValue: boolean,
  foreignKey: string;
  foreignTable: string;
  color: string;
}

export interface NodeData {
  label: string,
  elements: TElement[]
}
