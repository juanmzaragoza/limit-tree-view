import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container } from "@mui/material";
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import OutlinedContainer from "components/shared/OutlinedContainer/OutlinedContainer";
import { getIsLoading, getRows } from "redux/project-selector/selectors";
import { loadData, setProject } from "redux/project-selector";

import "./styles.css";

const ProjectSelector = ({ onChange, rows, loading, actions }) => {
  const [items, setItems] = React.useState([]);
  const [project, setProject] = React.useState("");

  React.useEffect(() => {
    actions.loadData({});
  }, []);

  React.useEffect(() => {
    setItems(rows.map((row) => ({ name: row.codi, value: row })));
  }, [rows]);

  const handleChange = (e) => {
    setProject(e.target.value);
    actions.setProject({ project: e.target.value });
  };

  return (
    <OutlinedContainer title={"Proyectos"}>
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3} lg={2}>
            <FormControl fullWidth>
              <InputLabel id="project-number-label">
                Número de proyecto
              </InputLabel>
              <Select
                labelId="project-number-label"
                id="project-number"
                name="project-number"
                value={project}
                label="Número de proyecto"
                onChange={handleChange}
              >
                {!loading && items.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
                {loading && <MenuItem style={{display: "flex", justifyContent: "center"}}>
                  <CircularProgress size={30} />
                </MenuItem>}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <TextField
                disabled
                id="outlined-basic"
                label="Proyecto"
                InputLabelProps={{
                  shrink: true,
                }}
                value={project.nom}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Cliente"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                value={project.client ? project.client?.description  : "" }
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Estado"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                value={project.estat ? project.estat : ""}
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
  };
  return { actions };
};

const component = connect(mapStateToProps, mapDispatchToProps)(ProjectSelector);
export default component;
