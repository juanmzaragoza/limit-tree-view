import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Container} from "@mui/material";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";

import OutlinedContainer from "components/shared/OutlinedContainer/OutlinedContainer";
import { getIsLoading, getRows } from "redux/project-selector/selectors";
import { loadData } from "redux/project-selector";

import "./styles.css"

const ProjectSelector = ({ onChange, rows, loading, actions }) => {
  const [items, setItems] = React.useState([]);
  const [project, setProject] = React.useState('');

  React.useEffect(() => {
    actions.loadData({});
  },[]);

  React.useEffect(() => {
    setItems(rows.map(row => ({ name: row.codi, value: row })));
  },[rows]);

  const handleChange = (e) => {
    setProject(e.target.value);
    onChange(e.target.value);
  }

  return <OutlinedContainer title={"Proyectos"} >
    <Container maxWidth={false} >
      <Grid container spacing={4}>
        <Grid item xs={12} md={3} lg={3}>
          <FormControl fullWidth >
            <InputLabel id="project-number-label">Número de proyecto</InputLabel>
            <Select
              labelId="project-number-label"
              id="project-number"
              name="project-number"
              value={project}
              label="Número de proyecto"
              onChange={handleChange}
            >
              {items.map((item,index) => <MenuItem key={index} value={item.value}>{item.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Proyecto" disabled value={project.nom} />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Cliente" disabled value={project.client?.description}/>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Estado" disabled value={project.estat} />
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  </OutlinedContainer>;
}

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    loadData: bindActionCreators(loadData, dispatch)
  };
  return { actions };
};

const component = connect(mapStateToProps,mapDispatchToProps)(ProjectSelector);
export default component;