interface Node {
    id: string;
    data: { label: string };
    position: { x: number; y: number };
}

export const createNewNode = (nodes: Node[]): Node[] => {
    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
        id: newNodeId,
        data: { label: `Node ${newNodeId}` },
        position: { x: 0, y: 0 },
    };
    return [...nodes, newNode];
};
