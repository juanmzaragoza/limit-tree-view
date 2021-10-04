import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { find } from 'lodash';

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
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const ProjectsTreeView = ({ tree, onNodeSelect }) => {
  const [nodeIds, setNodeIds] = React.useState(null);

  const renderNodes = ({ tree }) => {
    if(tree.nodes) {
      return <StyledTreeItem key={tree.id} nodeId={tree.id} labelText={tree.labelText} labelInfo={tree.labelInfo} labelIcon={Label} >
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
      />
    }
  };

  const findNode = ({ nodes, nodeId }) => {
    if(nodes.id === nodeId) {
      return nodes;
    } else{
      return find(nodes.nodes,node => {
        return findNode({ nodes: node, nodeId });
      });
    }
  }

  return (
    <TreeView
      aria-label="tree"
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{
        height: 'auto',
        flexGrow: 1,
        overflowY: 'auto',
        textAlign: 'left'
      }}
      onNodeSelect={(e, ids) => {
        const selected = ids === nodeIds? null:ids;
        setNodeIds(selected);
        onNodeSelect(findNode({ nodes: tree, nodeId: selected}));
      }}
      selected={nodeIds}
    >
      {renderNodes({ tree })}
    </TreeView>
  );
}

export default ProjectsTreeView;