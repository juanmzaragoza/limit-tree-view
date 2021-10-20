import { formatCurrencyWithIntl } from "utils/formats";
import {
  greenColor,
  redColor,
  inheritColor,
} from "utils/helper";

export const isPeriodOpen = ({ period }) => {
  return !period.tancat;
};

export const getKpisColorValue = ({ value }) => {
  if (value !== undefined) {
    if (value === 0) {
      return inheritColor;
    } else if (value >= 0) {
      return greenColor;
    } else {
      return redColor;
    }
  } else {
    return inheritColor;
  }
};

export const getResourceColumnsByPeriod = ({ period, intl }) => {
  const  number  = period.numero;
  return [
    { field: "codi", headerName: "Código", minWidth: 110 },
    {
      field: "descripcio",
      headerName: "Descripción",
      minWidth: 510,
      editable: !number,
    },
    {
      field: "unitats",
      headerName: "Medición",
      type: "number",
      minWidth: 140,
      editable: true,
    },
    {
      field: "unitatTipus",
      headerName: "Tipo Unidad",
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => `${params.value?.description || ""}`,
      
    },
    {
      field: "costUnitat",
      headerName: "Coste Unitario",
      type: "number",
      minWidth: 140,
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costUnitat ?? 0, intl);
      },
      editable: true,
    },
    {
      field: "costTotal",
      headerName: "Coste Total",
      minWidth: 140,
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costTotal ?? 0, intl);
      },
    },
  ];
};

export const getPartidaColumnsByIndicator = ({ intl }) => {
  return [
    { field: "codi", headerName: "Cód.", minWidth: 90 },
    {
      field: "descripcio",
      headerName: "Descripció",
      minWidth: 350,
    },

    {
      headerName: "Prod. Anterior",
      field: "produccioAnterior",
      minWidth: 140,
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.produccioAnterior ?? 0, intl),
    },
    {
      headerName: "Prod. Periodo",
      field: "produccioPeriode",
      minWidth: 140,
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.produccioPeriode ?? 0, intl),
    },
    {
      headerName: "Prod. Año Natural",
      field: "produccioAny",
      minWidth: 140,
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.produccioAny ?? 0, intl),
    },
    {
      headerName: "Prod. Origen",
      field: "produccioOrigen",
      minWidth: 140,
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.produccioOrigen ?? 0, intl),
    },
    {
      headerName: "Prod. Pendiente",
      field: "produccioPendent",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.produccioPendent ?? 0, intl),
    },
    {
      headerName: "Coste Teórico Anterior",
      value: "costTeoricAnterior",
    },
    {
      headerName: "Coste Teórico Pendiente",
      field: "costTeoricPeriode",
    },
    {
      headerName: "Coste Teórico Año Natural",
      field: "costTeoricAny",
    },
    {
      headerName: "Coste Teórico a Origen",
      field: "costTeoricOrigen",
    },
    {
      headerName: "Coste Teórico Pendiente",
      field: "costTeoricPendent",
    },
  ];
};
