import { Node } from 'reactflow';
import { TElement } from '../types/node';

const sortTablesByInheritance = (tables: Node[]): Node[] => {
  let nodesMap = new Map<string, Node>();
  let dependencies = new Map<string, Set<string>>();
  let reverseDependencies = new Map<string, Set<string>>();

  tables.forEach(node => {
    const tableName = node.data.label;
    nodesMap.set(tableName, node);
    node.data.elements.forEach((column: TElement) => {
      if (column.foreignTable && column.foreignTable !== tableName) {
        if (!dependencies.has(column.foreignTable)) {
          dependencies.set(column.foreignTable, new Set());
        }
        dependencies.get(column.foreignTable)!.add(tableName);

        if (!reverseDependencies.has(tableName)) {
          reverseDependencies.set(tableName, new Set());
        }
        reverseDependencies.get(tableName)!.add(column.foreignTable);
      }
    });
  });

  let sorted: Node[] = [], visited: Set<string> = new Set();
  let tempMarked: Set<string> = new Set();

  function visit(node: string) {
    if (tempMarked.has(node)) {
      throw new Error(`Cykliczna zależność wykryta: ${node}`);
    }
    if (!visited.has(node)) {
      tempMarked.add(node);
      reverseDependencies.get(node)?.forEach(visit);
      tempMarked.delete(node);
      visited.add(node);
      sorted.push(nodesMap.get(node)!);
    }
  }

  try {
    tables.forEach(({ data: { label } }) => {
      if (!visited.has(label)) {
        visit(label);
      }
    });
  } catch (error) {
    console.error('Błąd w sortowaniu tabel:', error);
    return [];
  }

  return sorted;
};

export default sortTablesByInheritance