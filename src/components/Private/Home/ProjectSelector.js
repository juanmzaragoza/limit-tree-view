import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container } from "@mui/material";
import { FormControl, Grid, TextField } from "@material-ui/core";
import { isEmpty } from "lodash";

import OutlinedContainer from "components/shared/OutlinedContainer/OutlinedContainer";
import MaterialAsyncAutocomplete from "components/shared/MaterialAutocomplete/MaterialAsyncAutocomplete";
import { getIsLoading, getRows } from "redux/project-selector/selectors";
import {
  loadData,
  setProject,
  resetSelectedProject,
} from "redux/project-selector";
import { resetAll } from "redux/app";
import { reset as resetTree } from "redux/project-tree";

import "./styles.css";

const ProjectSelector = ({ onChange = () => {}, rows, loading, actions }) => {
  const [items, setItems] = React.useState([]);
  const [project, setProject] = React.useState("");
  const [name, setName] = React.useState("");
  const [client, setClient] = React.useState("");
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    actions.loadData({});
  }, []);

  React.useEffect(() => {
    setItems(
      rows.map((row) => ({ name: `${row.codi} - ${row.nom}`, value: row }))
    );
    actions.resetTree();
    actions.setProject("");
    actions.resetSelectedProject();
  }, [rows]);

  React.useEffect(() => {
    setName(project?.nom ?? "");
    setClient(project.client?.description ?? "");
    setStatus(project?.estat ?? "");
  }, [project]);

  const handleChange = (e, v) => {
    const value = v?.value;
    if (value) {
      actions.loadData({});
      setProject(value);
      actions.setProject({ project: value });
      onChange(value);
    } else {
      setProject("");
    }
  };

  const handleSearch = (e, v) => {
    let query = [];
    if (!isEmpty(v)) {
      query = [
        {
          columnName: "codi",
          value: `*${v}*`,
          exact: false,
        },
        {
          columnName: "nom",
          value: `*${v}*`,
          exact: false,
        },
      ];
    }
    actions.loadData({ query });
  };

  return (
    <OutlinedContainer title={"Proyectos"}>
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3} lg={2}>
            <FormControl fullWidth>
              <MaterialAsyncAutocomplete
                id="project-number-selector"
                label="Proyecto"
                loading={loading}
                items={items.map((item) => ({
                  label: item.name,
                  value: item.value,
                }))}
                onChange={handleChange}
                onSearch={handleSearch}
                defaultValue={""}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <TextField
                id="name"
                label="Proyecto"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                value={name}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                id="client"
                label="Cliente"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                value={client}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <TextField
                id="status"
                label="Estado"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                value={status}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </OutlinedContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = {
    loadData: bindActionCreators(loadData, dispatch),
    setProject: bindActionCreators(setProject, dispatch),
    resetAll: bindActionCreators(resetAll, dispatch),
    resetSelectedProject: bindActionCreators(resetSelectedProject, dispatch),
    resetTree: bindActionCreators(resetTree, dispatch),
  };
  return { actions };
};

const component = connect(mapStateToProps, mapDispatchToProps)(ProjectSelector);
export default component;
