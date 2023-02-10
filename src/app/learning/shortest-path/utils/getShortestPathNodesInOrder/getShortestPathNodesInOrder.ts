import { Node } from "@/app/learning/shortest-path/page.types";

export const getShortestPathNodesInOrder = (finalNode: Node | null): Node[] => {
  const shortestPathNodesInOrder: Node[] = [];
  let currentNode = finalNode;

  while (currentNode !== null) {
    shortestPathNodesInOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return shortestPathNodesInOrder;
};
