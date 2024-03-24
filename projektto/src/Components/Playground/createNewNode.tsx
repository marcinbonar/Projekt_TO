import { CoordinateExtent, Position, XYPosition } from 'reactflow';
import { NodeData } from '../../services/types';

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

export const createNewNode = (nodes: Node<NodeData>[]): Node<NodeData>[] => {
  const newNodeId = (nodes.length + 1).toString();
  const newNode = {
    id: newNodeId,
    data: { label: `Node ${newNodeId}`, elements: [] },
    type: 'custom',
    position: { x: 0, y: 0 },
  };
  return [...nodes, newNode];
};
