import * as React from "react";
import { connect } from "react-redux";
import { Grid } from "@mui/material";

import DetailedHeader from "components/shared/DetailedHeader";
import MaterialDataGrid from "components/shared/MaterialDataGrid";
import { getIsLoading, getRows } from "redux/project/selectors";
import { useIntl } from "react-intl";
import { formatCurrencyWithIntl } from "utils/formats";

const ProjectDetailedContent = ({ rows }) => {
  const intl = useIntl();
  const [header] = React.useState({
    title: "Proyecto 1",
    subheader: "Capítulo 1",
  });
  const [summary] = React.useState({
    primary: "50.000€",
    secondary: "/totales",
  });
  const [fields] = React.useState([
    { field: "Importe Total", value: "10.000€" },
    { field: "Coste Total", value: "10.000€" },
  ]);
  const [percentage] = React.useState("5%");

  const [columns] = React.useState([
    { field: "codi", headerName: "Código", width: 120, editable: true },
    {
      field: "descripcio",
      headerName: "Descripción",
      width: 140,
      editable: true,
    },
    {
      field: "importTotal",
      headerName: "Importe Total",
      width: 120,
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.importTotal ?? 0, intl);
      },
      editable: true,
    },
    {
      field: "costTotal",
      headerName: "Costel Total",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costTotal ?? 0, intl);
      },
      editable: true,
    },
  ]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DetailedHeader
          header={header}
          summary={summary}
          body={fields}
          endInformation={percentage}
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
  };
};

const component = connect(mapStateToProps, null)(ProjectDetailedContent);
export default component;
