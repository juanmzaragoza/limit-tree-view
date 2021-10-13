import * as React from 'react';
import {
  forEach,
  isEmpty,
  isEqual,
  remove
} from 'lodash';
import TreeView from '@mui/lab/TreeView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import MaterialSkeleton from "components/shared/MaterialSkeleton/MaterialSkeleton";

import { entitiesStyles } from 'utils/helper';
import { usePrevious } from "utils/helper-hooks";

import StyledTreeItem from "./StyledTreeItem";
import "./styles.css";

const ProjectsTreeView = ({
  data,
  loading,
  expanded,
  onNodeSelect,
  actions: { reset = () => {}, setExpanded = () => {} }
}) => {
  const [nodeIds, setNodeIds] = React.useState(null);
  //const [expanded, setExpanded] = React.useState([]);
  const [tree, setTree] = React.useState({});

  React.useEffect(() => {
    return () => reset();
  },[]);

  React.useEffect(() => {
    setTree(data);
  },[data]);

  const previousTree = usePrevious(tree);
  React.useEffect(() => {
    if(!isEmpty(tree) && !isEqual(previousTree?.id,tree?.id)) {
      setExpanded({ expanded: [tree.id]});
      handleOnNodeSelect({},tree.id);
    }
  },[tree]);

  const renderNodes = ({ tree }) => {
    const { type } = tree;
    if(tree.nodes) {
      return <StyledTreeItem
        key={tree.id}
        nodeId={tree.id}
        labelText={tree.labelText}
        labelInfo={tree.labelInfo}
        color={entitiesStyles[type]?.iconColor}
        bgColor={entitiesStyles[type]?.colorBackground}
        labelIcon={entitiesStyles[type]?.icon}
      >
        {tree.nodes.map(node => renderNodes({ tree: node }))}
      </StyledTreeItem>
    } else{
      return <StyledTreeItem
        key={tree.id}
        nodeId={tree.id}
        labelText={tree.labelText}
        labelInfo={tree.labelInfo}
        color={entitiesStyles[type]?.iconColor}
        bgColor={entitiesStyles[type]?.colorBackground}
        labelIcon={entitiesStyles[type]?.icon}
        disabled={tree.disabled}
      />
    }
  };

  const findNode = ({ nodes, nodeId }) => {
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

  const processOnNodeSelected = (selectedId) => {
    const selected = selectedId;
    // fire action
    setNodeIds(selected);
    const selectedNode = findNode({nodes: tree, nodeId: selected});
    if (!selectedNode.disabled)
      onNodeSelect(selectedNode);
  }
  const handleOnNodeSelect = (e, ids) => {
    processOnNodeSelected(ids);
    // update expanded
    // TODO(): this logic must be implemented in the reducer
    const found = expanded.find(id => ids === id);
    if(found) {
      setExpanded({ expanded: remove(expanded, (e) => e !== found)});
    } else{
      setExpanded({ expanded: [...expanded, ids] });
    }
  }

  const renderEmptyTree = () => <div className="empty-tree-root">No existen elementos en el árbol</div>

  return (
    <TreeView
      aria-label="tree"
      expanded={expanded}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{
        height: 'auto',
        flexGrow: 1,
        overflowY: 'auto',
        textAlign: 'left'
      }}
      onNodeSelect={handleOnNodeSelect}
      selected={nodeIds}
    >
      {!loading && !isEmpty(tree) && renderNodes({ tree })}
      {!loading && isEmpty(tree) && renderEmptyTree()}
      {loading && <MaterialSkeleton />}
    </TreeView>
  );
}

export default ProjectsTreeView;