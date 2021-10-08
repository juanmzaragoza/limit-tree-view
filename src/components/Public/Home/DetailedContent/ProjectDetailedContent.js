import * as React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { Grid } from "@mui/material";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";
import { getIsLoading, getRows } from "redux/project/selectors";
import { getSelectedProject } from "redux/project-selector/selectors";
import { formatCurrencyWithIntl } from "utils/formats";
import { getData } from "redux/project-tree/selectors";
import MaterialCardPartidaIndicator from "components/shared/MaterialCardPartidaIndicator";
import { Assignment } from "@mui/icons-material";

const ProjectDetailedContent = ({ rows, project, tree }) => {
  const intl = useIntl();
  const [headerProject, setHeaderProject] = React.useState({});
  const [projectFields, setProjectFields] = React.useState([]);

  const [columns] = React.useState([
    { field: "codi", headerName: "Código", editable: false },
    {
      field: "descripcio",
      headerName: "Descripción",

      editable: true,
    },
    {
      field: "importTotal",
      headerName: "Importe Total",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.importTotal ?? 0, intl);
      },
      editable: false,
    },
    {
      field: "costTotal",
      headerName: "Costel Total",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costTotal ?? 0, intl);
      },
      editable: false,
    },
  ]);

  const [indicadores, setIndicadores] = React.useState();

  React.useEffect(() => {
    setHeaderProject({ title: project.nom });
    setProjectFields([
      {
        field: "Importe Total",
        value: formatCurrencyWithIntl(tree.importTotal ?? 0, intl),
      },
      {
        field: "Coste Total",
        value: formatCurrencyWithIntl(tree.costTotal ?? 0, intl),
      },
    ]);

    setIndicadores([
      {
        field: "Facturación Anterior",
        value: project.facturacioRealAnterior,
        icon: <Assignment />,
      },
      {
        field: "Facturación Período",
        value: project.facturacioRealPeriode,
        icon: <Assignment />,
      },
      {
        field: "Facturación año Natural",
        value: project.facturacioRealAny,
        icon: <Assignment />,
      },
      {
        field: "Facturación a Origen",
        value: project.facturacioRealOrigen,
        icon: <Assignment />,
      },
    ]);
  }, [project, intl]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DetailedHeader header={headerProject} body={projectFields} />
      </Grid>
      <Grid item xs={12}>
        <MaterialDataGrid columns={columns} rows={rows} />
      </Grid>
      <Grid item xs={12}>
        <MaterialCardPartidaIndicator
          title={"Indicadores"}
          content={indicadores}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state),
    project: getSelectedProject(state),
    tree: getData(state),
  };
};

const component = connect(mapStateToProps, null)(ProjectDetailedContent);
export default component;
