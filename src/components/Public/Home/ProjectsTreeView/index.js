import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  getExpanded,
  getFormattedData,
  getIsLoading,
  getSelectedNode,
} from "redux/project-tree/selectors";
import {
  reset,
  selectNode,
  expandNode,
  selectAndExpandNode,
} from "redux/project-tree";

import "./styles.css";
import ProjectsTreeView from "./ProjectTreeView";

const mapStateToProps = (state) => {
  return {
    data: getFormattedData(state),
    loading: getIsLoading(state),
    expanded: getExpanded(state),
    selectedNode: getSelectedNode(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = {
    reset: bindActionCreators(reset, dispatch),
    selectNode: bindActionCreators(selectNode, dispatch),
    expandNode: bindActionCreators(expandNode, dispatch),
    selectAndExpandNode: bindActionCreators(selectAndExpandNode, dispatch),
  };
  return { actions };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsTreeView);
export default component;
