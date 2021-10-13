import * as React from 'react';
import PropTypes from 'prop-types';
import {
  forEach,
  isEmpty,
  isEqual,
  remove
} from 'lodash';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LabelIcon from '@mui/icons-material/Label';

import MaterialSkeleton from "components/shared/MaterialSkeleton/MaterialSkeleton";

import {entitiesStyles, primaryColor} from 'utils/helper';
import {usePrevious} from "utils/helper-hooks";

import "./styles.css";

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
      backgroundColor: theme.palette.secondary.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color,  rgba(58, 145, 152, 0.08))`,
      color: primaryColor,
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
    bgColor = primaryColor,
    color = primaryColor,
    labelIcon: LabelIcon = <LabelIcon />,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={props => LabelIcon} color="inherit" sx={{ mr: 1 }} />
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

  const previousTree = usePrevious(tree);
  React.useEffect(() => {
    if(!isEmpty(tree) && !isEqual(previousTree?.id,tree?.id)) {
      setExpanded([tree.id]);
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
    const found = expanded.find(id => ids === id);
    if(found) {
      setExpanded(remove(expanded, (e) => e !== found));
    } else{
      setExpanded([...expanded, ids]);
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