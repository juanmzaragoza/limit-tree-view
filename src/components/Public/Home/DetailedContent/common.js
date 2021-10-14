import { formatCurrencyWithIntl } from "utils/formats";
import {greenColor, redColor} from "../../../../utils/helper";

export const isPeriodOpen = ({ period }) => {
  return !period.tancat;
}

export const getKpisColorValue = ({ value }) => value >= 0 ? greenColor : redColor;

export const getPartidaColumnsByPeriod = ({ period, intl }) => {
  const { number } = period;
  const numberIsZero = !number;
  const numberIsNotZero = !!number;
  return [
    { field: "codi", headerName: "Cód.", minWidth: 90 },
    {
      field: "descripcioReduc",
      headerName: "Descripció",
      minWidth: 350,
      editable: numberIsZero,
    },

    {
      field: "unitatsActual",
      headerName: "Med. Periodo",
      type: "number",
      minWidth: 140,
      editable: numberIsNotZero,
    },
    {
      field: "medicioOrigen",
      headerName: "Med. Origen",
      type: "number",
      minWidth: 140,
      editable: numberIsNotZero,
    },

    {
      field: "unitats",
      headerName: "Med. Prevista",
      type: "number",
      minWidth: 140,
      editable: numberIsZero,
    },
    {
      field: "unitatTipus",
      headerName: "Tipo Unidad",
      valueGetter: (params) => `${params.value?.description || ""}`,
      minWidth: 100,
    },
    {
      field: "unitatsAnterior",
      headerName: "Med. Anterior",
      type: "number",
      minWidth: 140,
    },
    {
      field: "obraPendent",
      headerName: "Obra pendiente",
      type: "number",
      minWidth: 140,
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
      headerName: "Coste Unit.",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.costUni ?? 0, intl),
      minWidth: 140,
      editable: false,
    },
    {
      field: "costTotal",
      headerName: "Coste Prev.",
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