import * as React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { Grid } from "@mui/material";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";
import { getIsLoading, getRows } from "redux/project/selectors";
import { getSelectedProject } from "redux/project-selector/selectors";
import { formatCurrencyWithIntl } from "utils/formats";

const ProjectDetailedContent = ({ rows, project }) => {
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

  React.useEffect(() => {
    console.log(project)
    setHeaderProject({ title: project.nom });
    setProjectFields([
      {
        field: "Importe Total",
        value: formatCurrencyWithIntl(project.importTotal ?? 0, intl),
      },
      {
        field: "Coste Total",
        value: formatCurrencyWithIntl(project.costTotal ?? 0, intl),
      },
    ]);
  }, [project, intl]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DetailedHeader
          header={headerProject}
          body={projectFields}
        />
      </Grid>
      <Grid item xs={12}>
        <MaterialDataGrid columns={columns} rows={rows} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, props) => {
  return {
    rows: getRows(state),
    loading: getIsLoading(state),
    project: getSelectedProject(state)
  };
};

const component = connect(mapStateToProps, null)(ProjectDetailedContent);
export default component;
