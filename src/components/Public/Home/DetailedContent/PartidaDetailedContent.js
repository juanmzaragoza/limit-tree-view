import {Grid} from "@mui/material";
import DetailedHeader from "../../../shared/DetailedHeader";
import MaterialDataGrid from "../../../shared/MaterialDataGrid";
import * as React from "react";
import MaterialKpi from "../../../shared/MaterialKpi";
import MaterialCardPartidaIndicator from "components/shared/MaterialCardPartidaIndicator";
import  { Assignment, CallMissedOutgoing, Construction, Engineering, Euro, StackedBarChart, StackedLineChart, StraightenOutlined } from '@mui/icons-material/';

const createData = (codi, descripcio, medicio, tipoUnidad, unPres, pvpNeto, importe, costeUnit, costeTot, medicionAnt, medicionAct, pendient) => {
  return { codi, descripcio, medicio, tipoUnidad, unPres, pvpNeto, importe, costeUnit, costeTot, medicionAnt, medicionAct, pendient };
}

const ProjectDetailedContent = () => {

  const [headerProject,] = React.useState({
    title: 'Proyecto 1',
    subheader: 'Capítulo 1',
  });
  const [headerControlUnit,] = React.useState({
    title: 'Unidad de control #1',
  });
  const [headerPartida,] = React.useState({
    title: 'Partida 1.1',
    subheader: 'Capítulo 1',
  });
  const [fields,] = React.useState([
    { field: 'Importe Total', value: '10.000€'},
    { field: 'Coste Total', value: '10.000€'},

  ]);
  const [percentage,] = React.useState("5%");

  const [columns,] = React.useState([
    { field: 'codi', headerName: 'Código', width: 120, editable: true },
    { field: 'descripcio', headerName: 'Descripción', width: 140, editable: true },
    { field: 'medicio', headerName: 'Medición',  width: 120, editable: true },
    { field: 'tipoUnidad', headerName: 'Tipo Unidad', editable: true },
    // { field: 'unPres', headerName: 'Un. Pres', editable: true },
    // { field: 'pvpNeto', headerName: 'Pvp Neto', type: 'number', editable: true },
    // { field: 'importe', headerName: 'Importe', type: 'number', editable: true },
    { field: 'costeUnit', headerName: 'Coste Unitario', type: 'number', editable: true },
    { field: 'costeTot', headerName: 'Coste Total', type: 'number', editable: true },
    // { field: 'medicionAnt', headerName: 'Medición Anterior', type: 'number', editable: true },
    // { field: 'medicionAct', headerName: 'Medición Actual', type: 'number', editable: true },
    // { field: 'pendient', headerName: 'Pendiente', type: 'number', editable: true },
  ]);
  const [rows,] = React.useState([
    createData('0001', 'Partida 1', 10, 'M3', 10, 10, 100, 12, 120, 2, 6, 2),
    createData('0002', 'Partida 2', 12, 'M3', 10, 10, 100, 12, 120, 2, 6, 2),
    createData('0003', 'Partida 3', 14, 'M3', 10, 10, 100, 12, 120, 2, 6, 2),
    createData('0004', 'Partida 4', 16, 'M3', 10, 10, 100, 12, 120, 2, 6, 2),
    createData('0005', 'Partida 5', 18, 'M3', 10, 10, 100, 12, 120, 2, 6, 2)
  ]);
  const [kpis] = React.useState([
    { field: "Producción Anterior", value:"1000", icon: <Engineering/> },
    { field: "Producción Período", value:"1000" , icon: <Engineering/>},
    { field: "Producción año Natural", value:"1000" , icon: <Engineering/>},
    { field: "Producción a Origen", value:"1000" , icon: <Engineering/>},
    { field: "Producción Pendiente", value:"1000" , icon: <Engineering/>},
    { field: "Coste Teórico Anterior", value:"1000" , icon: <StackedLineChart/>},
    { field: "Coste Teórico Pendiente", value:"1000", icon: <StackedLineChart/> },
    { field: "Coste Teórico Año Natural", value:"1000", icon: <StackedLineChart/> },
    { field: "Coste Teórico Origen", value:"1000", icon: <StackedLineChart/> },
    { field: "Coste Teórico Pendiente", value:"1000", icon: <StackedLineChart/> },
    { field: "Coste Real Anterior", value:"1000", icon: <StackedBarChart/> },
    { field: "Coste Real Pendiente", value:"1000", icon: <StackedBarChart/> },
    { field: "Coste Real año Natural", value:"1000", icon: <StackedBarChart/> },
    { field: "Coste Real Origen", value:"1000", icon: <StackedBarChart/> },
    { field: "Beneficio Anterior", value:"1000", icon: <Euro/> },
    { field: "Beneficio Período", value:"1000", icon: <Euro/> },
    { field: "Beneficio año Natural", value:"1000", icon: <Euro/> },
    { field: "Beneficio Origen", value:"1000", icon: <Euro/> },
    { field: "Desviación Anterior", value:"1000", icon: <CallMissedOutgoing/> },
    { field: "Desviación Período", value:"1000", icon: <CallMissedOutgoing/> },
    { field: "Desviación año Natural", value:"1000", icon: <CallMissedOutgoing/> },
    { field: "Desviación Origen", value:"1000", icon: <CallMissedOutgoing/> },
    { field: "Facturación Anterior", value:"1000", icon: <Assignment/> },
    { field: "Facturación Período", value:"1000", icon: <Assignment/> },
    { field: "Facturación año Natural", value:"1000", icon: <Assignment/> },
    { field: "Facturación Origen", value:"1000", icon: <Assignment/> },
    { field: "Obra Pendiente Anterior", value:"1000", icon: <Construction/> },
    { field: "Obra Pendiente Período", value:"1000", icon: <Construction/> },
    { field: "Obra Pendiente año Natural", value:"1000", icon: <Construction/> },
    { field: "Obra Pendiente Origen", value:"1000", icon: <Construction/> },
    
  ])

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <DetailedHeader
        header={headerProject}
        body={fields}
        endInformation={percentage} />
    </Grid>
    <Grid item xs={6}>
      <DetailedHeader
        header={headerControlUnit}
        body={fields}
        endInformation={percentage} />
    </Grid>
    <Grid item xs={6}>
      <DetailedHeader
        header={headerPartida}
        body={fields}
        endInformation={percentage} />
    </Grid>
    <Grid item xs={12}>
      <MaterialDataGrid
        columns={columns}
        rows={rows} />
    </Grid>
    <Grid item xs={12}>
      <MaterialCardPartidaIndicator title="Indicadores" content={kpis} />
    </Grid>
  </Grid>
}

export default ProjectDetailedContent;