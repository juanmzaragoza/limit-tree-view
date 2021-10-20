import * as React from "react";
import {
  CallMissedOutgoing,
  Engineering,
  Euro,
  StackedBarChart,
  StackedLineChart,
} from "@mui/icons-material";
import {Avatar, IconButton} from "@mui/material";

import { formatCurrencyWithIntl } from "utils/formats";
import { entitiesStyles, getTreeId } from "utils/helper";
import { PARTIDA_TYPE, RESOURCE_TYPE } from "constants/business-types";
import {getKpisColorValue} from "../common";

export const getIndicators = (kpisUnitatControl) => [
  {
    title: "Producción",
    icon: <Engineering />,
    lg: 2,
    indicators: [
      {
        field: "Anterior",
        value: kpisUnitatControl.produccioAnterior,
        breakpoints: 3,
      },
      {
        field: "Período",
        value: kpisUnitatControl.produccioPeriode,
        breakpoints: 2,
      },
      {
        field: "Año Natural",
        value: kpisUnitatControl.produccioAny,
        breakpoints: 3,
      },
      {
        field: "Origen",
        value: kpisUnitatControl.produccioOrigen,
        breakpoints: 2,
      },
      {
        field: "Pendiente",
        value: kpisUnitatControl.produccioPendent,
        breakpoints: 2,
      },
    ],
  },
  {
    title: "Coste Teórico",
    icon: <StackedLineChart />,
    lg: 2,
    indicators: [
      {
        field: "Anterior",
        value: kpisUnitatControl.costTeoricAnterior,
        breakpoints: 3,
      },
      {
        field: "Período",
        value: kpisUnitatControl.costTeoricPeriode,
        breakpoints: 2,
      },
      {
        field: "Año Natural",
        value: kpisUnitatControl.costTeoricAny,
        breakpoints: 3,
      },
      {
        field: "Origen",
        value: kpisUnitatControl.costTeoricOrigen,
        breakpoints: 2,
      },
      {
        field: "Pendiente",
        value: kpisUnitatControl.costTeoricPendent,
        breakpoints: 2,
      },
    ],
  },
  {
    title: "Coste Real",
    icon: <StackedBarChart />,
    lg: 2,
    indicators: [
      {
        field: "Anterior",
        value: kpisUnitatControl.costRealAnterior,
        icon: <StackedBarChart />,
      },
      {
        field: "Período",
        value: kpisUnitatControl.costRealPeriode,
        icon: <StackedBarChart />,
      },
      {
        field: "Año Natural",
        value: kpisUnitatControl.costRealAny,
        icon: <StackedBarChart />,
      },
      {
        field: "Origen",
        value: kpisUnitatControl.costRealOrigen,
        icon: <StackedBarChart />,
      },
    ],
  },
  {
    title: "Beneficios",
    icon: <Euro />,
    lg: 2,
    indicators: [
      {
        field: "Anterior",
        value: kpisUnitatControl.beneficiAnterior,
      },
      {
        field: "Período",
        value: kpisUnitatControl.beneficiPeriode,
      },
      {
        field: "Año Natural",
        value: kpisUnitatControl.beneficiAny,
      },
      {
        field: "Origen",
        value: kpisUnitatControl.beneficiOrigen,
      },
    ],
  },
  {
    title: "Desviación",
    icon: <CallMissedOutgoing />,
    lg: 2,
    indicators: [
      {
        field: "Anterior",
        value: kpisUnitatControl.desviacioAnterior,
      },
      {
        field: "Período",
        value: kpisUnitatControl.desviacioPeriode,
      },
      {
        field: "Año Natural",
        value: kpisUnitatControl.desviacioAny,
      },

      {
        field: "Origen",
        value: kpisUnitatControl.desviacioOrigen,
      },
    ],
  },
 
];

export const columnsIndicatorsPartida = (intl) => [
  {
    id: "codi",
    id2: "descripcio",
    label: "Código - Descripción",
    minWidth: 400,
    className: "borderRight",
    button : true,
    buttonMedicion: true,
  },

  {
    label: "Anterior",
    id: "produccioAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    className: "borderLeft",
  },
  {
    label: "Período",
    id: "produccioPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Año",
    id: "produccioAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Origen",
    id: "produccioOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Pendiente",
    id: "produccioPendent",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    label: "Anterior",
    id: "costTeoricAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    className: "borderLeft",
  },
  {
    label: "Período",
    id: "costTeoricPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Año",
    id: "costTeoricAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Origen",
    id: "costTeoricOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Pendiente",
    id: "costTeoricPendent",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    label: "Anterior",
    id: "costRealAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    className: "borderLeft",
  },
  {
    label: "Período",
    id: "costRealPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Año",
    id: "costRealAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Origen",
    id: "costRealOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Anterior",
    id: "beneficiAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    className: "borderLeft",
    colorValue: true,
  },
  {
    label: "Período",
    id: "beneficiPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    label: "Año",
    id: "beneficiAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    label: "Origen",
    id: "beneficiOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    label: "Anterior",
    id: "desviacioAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    className: "borderLeft",
    colorValue: true,
  },
  {
    label: "Período",
    id: "desviacioPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    label: "Año",
    id: "desviacioAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    label: "Origen",
    id: "desviacioOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
 
];

export const columnsSubTotal = (intl) => [
  {
    id: "produccioAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    className: "borderLeft",
   
  },
  {
    id: "produccioPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "produccioAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "produccioOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "produccioPendent",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    id: "costTeoricAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    className: "borderLeft",
  },
  {
    id: "costTeoricPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "costTeoricAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "costTeoricOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "costTeoricPendent",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    id: "costRealAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    className: "borderLeft",
  },
  {
    id: "costRealPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "costRealAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "costRealOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "beneficiAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    className: "borderLeft",
    colorValue: true,
  },
  {
    id: "beneficiPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    id: "beneficiAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    id: "beneficiOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    id: "desviacioAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    className: "borderLeft",
    colorValue: true,
  },
  {
    id: "desviacioPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    id: "desviacioAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
  {
    id: "desviacioOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    colorValue: true,
  },
 
];

export const groups = [
  {
    label: (
      <>
        {" "}
        <Avatar
          aria-label="recipe"
          sx={{
            bgcolor: entitiesStyles[PARTIDA_TYPE].iconColor,
            color: "white",
          }}
        >
          {entitiesStyles[PARTIDA_TYPE].icon}
        </Avatar>
      </>
    ),
    colSpan: 1,
    className: "borderRight",
  },
  { label: "Producción", colSpan: 5, className: "borderLeft" },
  { label: "Coste Teórico", colSpan: 5, className: "borderLeft" },
  { label: "Coste Real", colSpan: 4, className: "borderLeft" },
  { label: "Beneficios", colSpan: 4, className: "borderLeft" },
  { label: "Desviación", colSpan: 4, className: "borderLeft" },
];

export const getPartidaColumnsByPeriod = ({ period, intl, actions }) => {
  const number = period.numero;
  const numberIsZero = !number;
  const numberIsNotZero = !!number;
  return [
    {
      field: "id",
      headerName: (
        <Avatar
          aria-label="recipe"
          sx={{
            bgcolor: entitiesStyles[PARTIDA_TYPE].iconColor,
            color: "white",
          }}
        >
          {entitiesStyles[PARTIDA_TYPE].icon}
        </Avatar>
      ),
      renderCell: (cellValues) => {
        return (
          <IconButton
            variant="outlined"
            onClick={() => {
              actions.selectTab({ value: 1 });
              actions.selectNode({ ids: getTreeId(cellValues.row) });
            }}
            style={{ color: entitiesStyles[RESOURCE_TYPE].iconColor }}
          >
            {entitiesStyles[RESOURCE_TYPE].icon}
          </IconButton>
        );
      },
      minWidth: 30,
      editable: false,
    },
    { field: "codi", headerName: "Cód.", minWidth: 90 },
    {
      field: "descripcioReduc",
      headerName: "Descripción",
      minWidth: 350,
      editable: numberIsZero,
    },

    {
      field: "unitatsActual",
      headerName: "Med. hecha período",
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
      align: 'center',
      headerAlign: 'center',
      minWidth: 100,
      valueGetter: (params) => `${params.value?.description || ""}`,

    },
    {
      field: "unitatsAnterior",
      headerName: "Med. Orig. Anterior",
      type: "number",
      minWidth: 140,
    },
    {
      field: "obraPendent",
      headerName: "Med. pendiente",
      type: "number",
      minWidth: 140,
    },
    {
      field: "unitatsPress",
      headerName: "Med. Presupuestada",
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
      headerName: "Imp. Tot. Pres.",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.importTotal ?? 0, intl),
      minWidth: 140,
    },
    {
      field: "costUni",
      headerName: "Coste Unit. Total",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.costUni ?? 0, intl),
      minWidth: 140,
      editable: false,
    },
    {
      field: "costTotal",
      headerName: "Coste Total Prev.",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.costTotal ?? 0, intl),
      minWidth: 140,
    },
  ];
};

export const getHeaderControlUnitFields = (kpisUnitatControl) => ([
  {
    field: "Benef. Origen",
    value: kpisUnitatControl.beneficiOrigen,
  },

  {
    field: "Prod. Origen",
    value: kpisUnitatControl.produccioOrigen,
  },
  {
    field: "Desv. Origen",
    value: kpisUnitatControl.desviacioOrigen,
  },
  {
    field: "Benef. Año",
    value: kpisUnitatControl.beneficiAny,
    colorValue: getKpisColorValue({
      value: kpisUnitatControl.beneficiAny,
    }),
  },
  {
    field: "Prod. Año",
    value: kpisUnitatControl.produccioAny,
    colorValue: getKpisColorValue({
      value: kpisUnitatControl.produccioAny ,
    }),
  },
  {
    field: "Desv. Año",
    value: kpisUnitatControl.desviacioAny,
    colorValue: getKpisColorValue({
      value: kpisUnitatControl.desviacioAny ,
    }),
  },
]);

export const getHeaderProjectFields = (kpis) => ([
  {
    field: "Benef. Origen",
    value: kpis.beneficiOrigen,
  },
  {
    field: "Prod. Origen",
    value: kpis.produccioOrigen,
  },
  {
    field: "Pen. Origen",
    value: kpis.obraPendentOrigen,
  },
  {
    field: "Benef. Año",
    value: kpis.beneficiAny,
    colorValue: getKpisColorValue({ value: kpis.beneficiAny  }),
  },
  {
    field: "Prod. Año",
    value: kpis.produccioAny,
    colorValue: getKpisColorValue({ value: kpis.produccioAny }),
  },
  {
    field: "Pen. Año",
    value: kpis.obraPendentAny,
    colorValue: getKpisColorValue({ value: kpis.obraPendentAny  }),
  },
]);