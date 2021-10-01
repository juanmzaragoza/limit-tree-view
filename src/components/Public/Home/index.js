import * as React from "react";
import {
  Container,
  Grid,
  Paper, Typography
} from "@mui/material";

import ProjectsTreeView from "./ProjectsTreeView";
import SelectOne from "./SelectOne";
import DetailedContent from "./DetailedContent/index";
import CostesTable from "./DetailedContent/CostesTable";
import MaterialTabs from "../../shared/MaterialTabs";
import ProjectSelector from "./ProjectSelector";

const Home = () =>{
  const [show, setShow] = React.useState(false);
  const [tabs,] = React.useState([
    { label: "Período 1" },
    { label: "Período 2" },
    { label: "Período 3" },
    { label: "Período 4" },
    { label: "Período 5" },
    { label: "Período 6" },
    { label: "Período 7" },
    { label: "Período 8" },
  ])
  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} lg={12}>
          <ProjectSelector onChange={(e) => console.log(e)} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Grid item xs={12} md={12} lg={12}>
            <MaterialTabs tabs={tabs} />
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4} lg={6}>
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
            <Grid item xs={12} md={4} lg={6}>
              <CostesTable />
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