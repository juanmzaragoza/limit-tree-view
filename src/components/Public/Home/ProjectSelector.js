import OutlinedContainer from "../../shared/OutlinedContainer/OutlinedContainer";
import {Container} from "@mui/material";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";

const ProjectSelector = ({ onChange }) => {
  return <OutlinedContainer title={"Proyectos"} >
    <Container maxWidth={false} >
      <Grid container spacing={4}>
        <Grid item xs={12} md={3} lg={3}>
          <FormControl fullWidth>
            <InputLabel id="project-number-label">Número de proyecto</InputLabel>
            <Select
              labelId="project-number-label"
              id="project-number"
              name="project-number"
              value={"p1"}
              label="Número de proyecto"
              onChange={onChange}
            >
              <MenuItem value={"p1"}>0001</MenuItem>
              <MenuItem value={"p2"}>0002</MenuItem>
              <MenuItem value={"p3"}>0003</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Proyecto" disabled value={"Proyecto 1"} />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Cliente" disabled value={"Client X"}/>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Estado" disabled value={"Activo"} />
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  </OutlinedContainer>;
}

export default ProjectSelector;