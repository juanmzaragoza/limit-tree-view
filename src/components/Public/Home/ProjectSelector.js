import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container } from "@mui/material";
import {
  FormControl,
  Grid,
  TextField,
} from "@material-ui/core";
import {isEmpty} from "lodash";

import OutlinedContainer from "components/shared/OutlinedContainer/OutlinedContainer";
import MaterialAsyncAutocomplete from "components/shared/MaterialAutocomplete/MaterialAsyncAutocomplete";
import { getIsLoading, getRows } from "redux/project-selector/selectors";
import { loadData, setProject } from "redux/project-selector";
import { resetAll } from "redux/app";

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
    setItems(rows.map((row) => ({ name: `${row.codi} - ${row.nom}`, value: row })));
  }, [rows]);

  React.useEffect(() => {
    setName(project?.nom ?? "");
    setClient(project.client?.description  ?? "");
    setStatus(project?.estat ?? "");
  },[project]);

  const handleChange = (e,v,d) => {
    const value = v?.value;
    if(value) {
      setProject(value);
      actions.setProject({ project: value });
      onChange(value);
    } else{
      setProject("");
      actions.resetAll();
    }
  };

  const handleSearch = (e,v,d) => {
    let query = [];
    if(!isEmpty(v)){
      query = [{
        columnName: 'codi',
        value: `*${v}*`,
        exact: true
      },
      {
        columnName: 'nom',
        value: `*${v}*`,
        exact: true
      }];
    }
    actions.loadData({ query });
  }

  return (
    <OutlinedContainer title={"Proyectos"}>
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3} lg={2}>
            <FormControl fullWidth>
              <MaterialAsyncAutocomplete
                label="Número de proyecto"
                loading={loading}
                items={items.map((item) => ({ label: item.name, value: item.value }))}
                onChange={handleChange}
                onSearch={handleSearch} />
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

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadData: bindActionCreators(loadData, dispatch),
    setProject: bindActionCreators(setProject, dispatch),
    resetAll: bindActionCreators(resetAll, dispatch),
  };
  return { actions };
};

const component = connect(mapStateToProps, mapDispatchToProps)(ProjectSelector);
export default component;
