import { forEach, isEmpty } from "lodash";

export const findNode = ({ nodes, nodeId }) => {
  if(nodes.id === nodeId) {
    return nodes;
  } else{
    let founded = {};
    forEach(nodes.nodes, node => {
      const n = findNode({ nodes: node, nodeId });
      if(!isEmpty(n)) {
        founded = n;
        return false;
      }
    })
    return founded;
  }
}

export const findAllParents = ({ nodes, nodeId }) => {
  if(nodes.id === nodeId) {
    return [];
  } else{
    let parent = [nodes.id];
    forEach(nodes.nodes, node => {
      const n = findNode({ nodes: node, nodeId });
      if(!isEmpty(n)) {
        const parents = findAllParents({ nodes: node, nodeId });
        parent = parent.concat(parents);
        return false;
      }
    })
    return parent;
  }
}