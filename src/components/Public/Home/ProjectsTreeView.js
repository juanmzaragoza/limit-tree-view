import * as React from 'react';
import PropTypes from 'prop-types';
import { forEach, isEmpty, remove } from 'lodash';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import MaterialSkeleton from "../../shared/MaterialSkeleton";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 10,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

const StyledTreeItem = (props) => {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.any,
  labelText: PropTypes.string,
};

const ProjectsTreeView = ({ tree, loading, onNodeSelect }) => {
  const [nodeIds, setNodeIds] = React.useState(null);
  const [expanded, setExpanded] = React.useState([]);

  React.useEffect(() => {
    if(!isEmpty(tree)) setExpanded([tree.id]);
  },[tree]);

  const renderNodes = ({ tree }) => {
    if(tree.nodes) {
      return <StyledTreeItem
        key={tree.id}
        nodeId={tree.id}
        labelText={tree.labelText}
        labelInfo={tree.labelInfo}
        labelIcon={Label} >
        {tree.nodes.map(node => renderNodes({ tree: node}))}
      </StyledTreeItem>
    } else{
      return <StyledTreeItem
        key={tree.id}
        nodeId={tree.id}
        labelText={tree.labelText}
        labelIcon={SupervisorAccountIcon}
        labelInfo={tree.labelInfo}
        color="#1a73e8"
        bgColor="#e8f0fe"
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

  const handleOnNodeSelect = (e, ids) => {
    const selected = ids === nodeIds? null:ids;
    // fire action
    setNodeIds(selected);
    const selectedNode = findNode({ nodes: tree, nodeId: selected });
    if(!selectedNode.disabled)
      onNodeSelect(findNode({ nodes: tree, nodeId: selected }));
    // update expanded
    const found = expanded.find(id => ids === id);
    if(found) {
      setExpanded(remove(expanded, (e) => e !== found));
    } else{
      setExpanded([...expanded, ids]);
    }
  }

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
      {loading && <MaterialSkeleton />}
    </TreeView>
  );
}

export default ProjectsTreeView;