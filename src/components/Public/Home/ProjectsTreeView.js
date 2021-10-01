import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import Whatshot from '@mui/icons-material/Whatshot';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

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

const ProjectsTreeView = ({ onNodeSelect }) => {
  const [nodeIds, setNodeIds] = React.useState([]);
  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
        overflowY: 'auto',
        textAlign: 'left'
      }}
      onNodeSelect={(e, ids) => {
        const selected = ids[0] === nodeIds? []:ids;
        setNodeIds(selected);
        onNodeSelect(selected);
      }}
      selected={nodeIds}
    >
      <StyledTreeItem nodeId="1" labelText="Unidad Control #1" labelInfo="50.000€" labelIcon={Label} />
      <StyledTreeItem nodeId="2" labelText="Unidad Control #2" labelInfo="140.000€" labelIcon={Label} />
      <StyledTreeItem nodeId="3" labelText="Unidad Control #3" labelInfo="40.000€" labelIcon={Label}>
        <StyledTreeItem
          nodeId="5"
          labelText="Partida #1"
          labelIcon={SupervisorAccountIcon}
          labelInfo="10.000€"
          color="#1a73e8"
          bgColor="#e8f0fe"
        >
          <StyledTreeItem
            nodeId="9"
            labelText="Recurso #1"
            labelIcon={Whatshot}
            labelInfo="6.000€"
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
          <StyledTreeItem
            nodeId="10"
            labelText="Recurso #2"
            labelIcon={Whatshot}
            labelInfo="2.000€"
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
          <StyledTreeItem
            nodeId="11"
            labelText="Recurso #3"
            labelIcon={Whatshot}
            labelInfo="2.000€"
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
        </StyledTreeItem>
        <StyledTreeItem
          nodeId="6"
          labelText="Partida #2"
          labelIcon={SupervisorAccountIcon}
          labelInfo="10.000€"
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="7"
          labelText="Partida #3"
          labelIcon={SupervisorAccountIcon}
          labelInfo="10.000€"
          color="#a250f5"
          bgColor="#f3e8fd"
        />
        <StyledTreeItem
          nodeId="8"
          labelText="Partida #4"
          labelIcon={SupervisorAccountIcon}
          labelInfo="10.000€"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="4" labelText="Unidad Control #4" labelInfo="40.000€" labelIcon={Label} />
    </TreeView>
  );
}

export default ProjectsTreeView;