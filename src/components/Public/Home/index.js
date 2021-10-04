import * as React from "react";
import {
  Container,
  Grid,
  Paper,
} from "@mui/material";

import ProjectsTreeView from "./ProjectsTreeView";
import SelectOne from "./SelectOne";
import DetailedContent from "./DetailedContent/index";
import ProjectSelector from "./ProjectSelector";
import PeriodsManagement from "./PeriodsManagement";

export const PROJECT_TYPE = 'PROJECT';
export const CONTROL_UNIT_TYPE = 'CONTROL_UNIT';
export const PARTIDA_TYPE = 'PARTIDA';

const Home = () =>{
  const [show, setShow] = React.useState(false);
  const [node, setNode] = React.useState(null);
  const [tree,] = React.useState({
    id: 'project1',
    labelText: 'Proyecto 1',
    labelInfo: '20.000€',
    type: PROJECT_TYPE,
    nodes: [
      { id: 'uni1', labelText: 'Unidad de control #1', labelInfo: '10.000€', type: CONTROL_UNIT_TYPE },
      { id: 'uni2', labelText: 'Unidad de control #2', labelInfo: '10.000€', type: CONTROL_UNIT_TYPE,
        nodes: [
          { id: 'part1', labelText: 'Partida #1', labelInfo: '5.000€', type: PARTIDA_TYPE },
          { id: 'part2', labelText: 'Partida #2', labelInfo: '5.000€', type: PARTIDA_TYPE,
            nodes:  [
              { id: 'recu1', labelText: 'Recurso #1', labelInfo: '2.500€' },
              { id: 'recu2', labelText: 'Recurso #2', labelInfo: '2.500€' },
            ]
          }
        ]
      }
    ]
  });
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
                  minHeight: '200px',
                  height: 'auto',
                }}
              >
                <ProjectsTreeView tree={tree} onNodeSelect={selectedNode => {
                  setShow(!!selectedNode);
                  setNode(selectedNode);
                }} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid ></Grid>
        <Grid item xs={12} md={8} lg={8}>
          {show && <DetailedContent data={node} />}
          {!show && <SelectOne />}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home;