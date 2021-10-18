import { forEach, isEmpty } from "lodash";
import { getTreeId } from "utils/helper";

export const findNode = ({ nodes, nodeId }) => {
  if(getTreeId(nodes) === nodeId) {
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
  if(getTreeId(nodes) === nodeId) {
    return [];
  } else{
    let parent = [getTreeId(nodes)];
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