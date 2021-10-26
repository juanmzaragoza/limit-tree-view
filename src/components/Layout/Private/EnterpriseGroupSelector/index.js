import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import EnterpriseGroupSelect from "./EnterpriseGroupSelect";
import { getLoading, getTree } from "redux/enterpriseGroup/selectors";
import { searchTree } from "redux/enterpriseGroup";
import { resetAll } from "redux/app";
import { loadData, resetSelectedProject } from "redux/project-selector";
import { reset } from "redux/period";
import { reset as resetTree } from "redux/project-tree";

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    tree: getTree(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = {
    loadTree: bindActionCreators(searchTree, dispatch),
    resetAll: bindActionCreators(resetAll, dispatch),
    loadProjects: bindActionCreators(loadData, dispatch),
    resetSelectedProject: bindActionCreators(resetSelectedProject, dispatch),
    resetPeriod: bindActionCreators(reset, dispatch),
    resetTree: bindActionCreators(resetTree, dispatch),
  };
  return { actions };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(EnterpriseGroupSelect);
