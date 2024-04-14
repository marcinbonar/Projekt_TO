import { v4 as uuidv4 } from 'uuid';
import { NodeData, Node } from '../types/node';
export const createNewNode = (): Node<NodeData> => {
  const newNode = {
    id: uuidv4(),
    data: { label: 'Tabela', elements: [] },
    type: 'custom',
    position: { x: 0, y: 0 },
  };
  return newNode;
};
