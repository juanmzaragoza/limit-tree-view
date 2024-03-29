import * as React from "react";
import { Container, Grid, Paper } from "@mui/material";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ProjectsTreeView from "./ProjectsTreeView/index";
import SelectOne from "./SelectOne";
import DetailedContent from "./DetailedContent/index";
import ProjectSelector from "./ProjectSelector";
import PeriodsManagement from "./PeriodsManagement/index";

import { loadData } from "redux/project-tree";
import { getSelectedPeriod } from "redux/period/selectors";
import { getSelectedNode } from "redux/project-tree/selectors";

const Home = ({ selectedPeriod, selectedNode, actions }) => {
  const [show, setShow] = React.useState(false);
  const [node, setNode] = React.useState(null);

  React.useEffect(() => {
    if (selectedPeriod?.id) {
      actions.getData({ periodId: selectedPeriod.id });
    }
    setShow(selectedNode && !!selectedNode.id);
    setNode(selectedNode);
  }, [actions, selectedPeriod]);

  React.useEffect(() => {
    setShow(selectedNode && !!selectedNode.id);
    setNode(selectedNode);
  }, [selectedNode]);

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <ProjectSelector />
        </Grid>
        <Grid item xs={12} md={4} lg={4} sx={{ mt: 2, mb: 3 }}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: "200px",
              height: "auto",
            }}
            elevation={2}
          >
            <Grid item xs={12} md={12} lg={12} sx={{ mb: 3 }}>
              <PeriodsManagement />
            </Grid>
            <Grid container spacing={1} className="containerProjectTree">
              <Grid item xs={12} md={12} lg={12} sx={{ mt: 1 }}>
                <ProjectsTreeView />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={8} sx={{ mt: 2, mb: 3 }}>
          {show && <DetailedContent data={node} />}
          {!show && <SelectOne />}
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedPeriod: getSelectedPeriod(state),
    selectedNode: getSelectedNode(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = {
    getData: bindActionCreators(loadData, dispatch),
  };
  return { actions };
};

const component = connect(mapStateToProps, mapDispatchToProps)(Home);
export default component;
