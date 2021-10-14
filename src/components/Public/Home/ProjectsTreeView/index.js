import * as React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  getExpanded,
  getFormattedData,
  getIsLoading,
  getSelectedNode,
} from "redux/project-tree/selectors";
import { reset, selectNode } from "redux/project-tree";

import "./styles.css";
import ProjectsTreeView from "./ProjectTreeView";

const mapStateToProps = (state, props) => {
  return {
    data: getFormattedData(state),
    loading: getIsLoading(state),
    expanded: getExpanded(state),
    selectedNode: getSelectedNode(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    //setExpanded: bindActionCreators(setExpanded, dispatch),
    reset: bindActionCreators(reset, dispatch),
    selectNode: bindActionCreators(selectNode, dispatch),
  };
  return { actions };
};

const component = connect(mapStateToProps,mapDispatchToProps)(ProjectsTreeView);
export default component;