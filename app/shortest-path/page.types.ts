export interface Coordinate {
  row: number;
  column: number;
}

export interface Node {
  column: number;
  distance: number;
  isVisited: boolean;
  previousNode: null | Node;
  row: number;
  type: NodeType;
}

export type NodeType = 'default' | 'finish' | 'start' | 'wall';
