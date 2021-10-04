import * as React from "react";
import {
  Container,
  Grid,
  Paper, Typography
} from "@mui/material";

import ProjectsTreeView from "./ProjectsTreeView";
import SelectOne from "./SelectOne";
import DetailedContent from "./DetailedContent/index";
import ProjectSelector from "./ProjectSelector";
import PeriodsManagement from "./PeriodsManagement";

const Home = () =>{
  const [show, setShow] = React.useState(false);
  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} lg={12}>
          <ProjectSelector onChange={(e) => console.log(e)} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Grid item xs={12} md={12} lg={12}>
            <PeriodsManagement />
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 440,
                }}
              >
                <Typography align="left" variant="h5">Tree View - Proyecto 1</Typography>
                <ProjectsTreeView onNodeSelect={ids => setShow(!!ids.length)} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid ></Grid>
        <Grid item xs={12} md={8} lg={8}>
          {show && <DetailedContent />}
          {!show && <SelectOne />}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home;