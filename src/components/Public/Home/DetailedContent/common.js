import {formatCurrencyWithIntl} from "../../../../utils/formats";

export const isPeriodOpen = ({ period }) => {
  return !period.tancat;
}

export const getPartidaColumnsByPeriod = ({ period, intl }) => {
  const { number } = period;
  const numberIsZero = !number;
  const numberIsNotZero = !!number;
  return [
    { field: "codi", headerName: "Código", minWidth: 150 },
    {
      field: "descripcioReduc",
      headerName: "Descripció",
      minWidth: 200,
      editable: numberIsZero,
    },

    {
      field: "unitatsActual",
      headerName: "Medición Periodo",
      type: "number",
      minWidth: 170,
      editable: numberIsNotZero,
    },
    {
      field: "medicioOrigen",
      headerName: "Medición Origen",
      type: "number",
      minWidth: 170,
      editable: numberIsNotZero,
    },

    {
      field: "unitats",
      headerName: "Unidades Medición",
      type: "number",
      minWidth: 140,
      editable: numberIsZero,
    },
    {
      field: "unitatTipus",
      headerName: "Tipo Unidad",
      valueGetter: (params) => `${params.value?.description || ""}`,
      minWidth: 150,
    },
    {
      field: "unitatsAnterior",
      headerName: "Medición Anterior",
      type: "number",
      minWidth: 260,
    },
    {
      field: "obraPendent",
      headerName: "Obra pendiente",
      type: "number",
      minWidth: 220,
    },
    {
      field: "unitatsPress",
      headerName: "Un. Pres",
      type: "number",
      minWidth: 140,
      editable: numberIsZero,
    },
    {
      field: "preu",
      headerName: "Pvp Bruto",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.preu ?? 0, intl),
      minWidth: 140,
      editable: numberIsZero,
    },
    {
      field: "preuNet",
      headerName: "Pvp Neto",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.preuNet ?? 0, intl),
      minWidth: 140,
    },
    {
      field: "importTotal",
      headerName: "Importe",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.importTotal ?? 0, intl),
      minWidth: 140,
    },
    {
      field: "costUni",
      headerName: "Coste Unitario",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.costUni ?? 0, intl),
      minWidth: 150,
      editable: false,
    },
    {
      field: "costTotal",
      headerName: "Coste Total",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.costTotal ?? 0, intl),
      minWidth: 140,
    },
  ];
}

export const getResourceColumnsByPeriod = ({ period, intl }) => {
  const { number } = period;
  return [
    { field: "codi", headerName: "Código", type: "number" },
    {
      field: "descripcio",
      headerName: "Descripción",
      width: 140,
      editable: !number,
    },
    {
      field: "unitats",
      headerName: "Medición",
      type: "number",
      editable: !number,
    },
    {
      field: "unitatTipus",
      headerName: "Tipo Unidad",
      valueGetter: (params) => `${params.value?.description || ""}`,
    },
    {
      field: "costUnitat",
      headerName: "Coste Unitario",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costUnitat ?? 0, intl);
      },
      editable: !number,
    },
    {
      field: "costTotal",
      headerName: "Coste Total",
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costTotal ?? 0, intl);
      },
    },
  ];
}