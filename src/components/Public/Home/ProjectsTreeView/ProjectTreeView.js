import * as React from 'react';
import {
  isEmpty,
  isEqual,
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
  onNodeSelect = () => {},
  selectedNode,
  actions: {
    reset = () => {},
    selectNode = () => {}
  }
}) => {
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
      selectNode({ ids: tree.id });
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

  const handleOnNodeSelect = (e, ids) => {
    selectNode({ ids });
    onNodeSelect(ids);
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
      selected={selectedNode?.id ?? null}
    >
      {!loading && !isEmpty(tree) && renderNodes({ tree })}
      {!loading && isEmpty(tree) && renderEmptyTree()}
      {loading && <MaterialSkeleton />}
    </TreeView>
  );
}

export default ProjectsTreeView;