import * as React from "react";
import {
  CallMissedOutgoing,
  Construction,
  Engineering,
  Euro,
  StackedBarChart,
  StackedLineChart,
  Assignment,
  LocalShipping,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";

import { formatCurrencyWithIntl } from "utils/formats";
import { entitiesStyles } from "utils/helper";
import { CONTROL_UNIT_TYPE } from "constants/business-types";
import { getKpisColorValue } from "../common";

export const getIndicators = (kpis, kpisFact, updateAlmacenManual, period) => [
  {
    title: "Existencias",
    icon: <LocalShipping />,
    lg: 6,
    indicators: [
      {
        field: "Existencias de Almacén",
        value: kpis.produccioAnterior,
      },
      {
        field: "Almacén Manual",
        value: period.magatzemManual ? period.magatzemManual : "",
        input: true,
        editFunction: updateAlmacenManual,
      },
    ],
  },
  {
    title: "Produccion",
    icon: <Engineering />,
    lg: 2,
    indicators: [
      {
        field: "Anterior",
        value: kpis.produccioAnterior,
        breakpoints: 3,
      },
      {
        field: "Período",
        value: kpis.produccioPeriode,
        breakpoints: 2,
      },
      {
        field: "Año Natural",
        value: kpis.produccioAny,
        breakpoints: 3,
      },
      {
        field: "Origen",
        value: kpis.produccioOrigen,
        breakpoints: 2,
      },
      {
        field: "Pendiente",
        value: kpis.produccioPendent,
        breakpoints: 2,
      },
    ],
  },
  {
    title: "Coste Teórico Producción Hecha",
    icon: <StackedLineChart />,
    lg: 2,
    indicators: [
      {
        field: " Anterior",
        value: kpis.costTeoricAnterior,
        breakpoints: 3,
      },
      {
        field: "Período",
        value: kpis.costTeoricPeriode,
        breakpoints: 2,
      },
      {
        field: "Año Natural",
        value: kpis.costTeoricAny,
        breakpoints: 3,
      },
      {
        field: "Origen",
        value: kpis.costTeoricOrigen,
        breakpoints: 2,
      },
      {
        field: "Pendiente",
        value: kpis.costTeoricPendent,
        breakpoints: 2,
      },
    ],
  },
  {
    title: "Coste Real Producción Hecha",
    icon: <StackedBarChart />,
    lg: 2,
    indicators: [
      {
        field: "Anterior",
        value: kpis.costRealAnterior,
      },
      {
        field: "Período",
        value: kpis.costRealPeriode,
      },
      {
        field: "Año Natural",
        value: kpis.costRealAny,
      },
      {
        field: "Origen",
        value: kpis.costRealOrigen,
      },
    ],
  },
  {
    title: "Beneficios Producción Hecha",
    icon: <Euro />,
    lg: 2,
    indicators: [
      {
        field: "Anterior",
        value: kpis.beneficiAnterior,
      },
      {
        field: "Período",
        value: kpis.beneficiPeriode,
      },
      {
        field: "Año Natural",
        value: kpis.beneficiAny,
      },
      {
        field: "Origen",
        value: kpis.beneficiOrigen,
      },
    ],
  },
  {
    title: "Desviación Teórico - Real Coste",
    icon: <CallMissedOutgoing />,
    lg: 2,
    indicators: [
      {
        field: "Anterior",
        value: kpis.desviacioAnterior,
      },
      {
        field: "Período",
        value: kpis.desviacioPeriode,
      },
      {
        field: "Año Natural",
        value: kpis.desviacioAny,
      },

      {
        field: "Origen",
        value: kpis.desviacioOrigen,
      },
    ],
  },
  {
    title: "Obra Pendiente Facturar",
    icon: <Construction />,
    lg: 2,
    indicators: [
      {
        field: "Anterior",
        value: kpis.obraPendentAnterior,
      },
      {
        field: "Período",
        value: kpis.obraPendentPeriode,
      },
      {
        field: "Año Natural",
        value: kpis.obraPendentAny,
      },
      {
        field: "Origen",
        value: kpis.obraPendentOrigen,
      },
    ],
  },
  {
    title: "Facturación",
    icon: <Assignment />,
    lg: 2,
    indicators: [
      {
        field: "Anterior",
        value: kpisFact.facturacioRealAnterior,
      },
      {
        field: "Periodo",
        value: kpisFact.facturacioRealPeriode,
      },
      {
        field: "Año Natural",
        value: kpisFact.facturacioRealAny,
      },
      {
        field: "Origen",
        value: kpisFact.facturacioRealOrigen,
      },
    ],
  },
];

export const columnsIndicatorsPartida = (intl) => [
  {
    id: "unitatControlCodi",
    id2: "unitatControlDescripcio",
    label: "Código - Descripción",
    minWidth: 400,
    className: "borderRight",
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
            bgcolor: entitiesStyles[CONTROL_UNIT_TYPE].iconColor,
            color: "white",
          }}
        >
          {entitiesStyles[CONTROL_UNIT_TYPE].icon}
        </Avatar>
      </>
    ),
    colSpan: 1,
    className: "borderRight",
  },
  { label: "Producción", colSpan: 5, className: "borderLeft" },
  {
    label: "Coste Teórico Producción Hecha",
    colSpan: 5,
    className: "borderLeft",
  },
  { label: "Coste Real Producción Hecha", colSpan: 4, className: "borderLeft" },
  { label: "Beneficios Producción Hecha", colSpan: 4, className: "borderLeft" },
  {
    label: "Desviación Teórico - Real Coste",
    colSpan: 4,
    className: "borderLeft",
  },
];

export const getProjectFields = (kpis) => [
  {
    field: "Resul. Bruto Origen",
    value: kpis.beneficiOrigen,
  },
  {
    field: "Resul. Bruto Año",
    value: kpis.beneficiAny,
    colorValue: getKpisColorValue({ value: kpis.beneficiAny }),
  },
  {
    field: "Prod. Origen",
    value: kpis.produccioOrigen,
  },
  {
    field: "Prod. Año",
    value: kpis.produccioAny,
    colorValue: getKpisColorValue({ value: kpis.produccioAny }),
  },
  {
    field: "Pen. Fact. Origen",
    value: kpis.obraPendentOrigen,
  },
  {
    field: "Pen. Fact. Año",
    value: kpis.obraPendentAny,
    colorValue: getKpisColorValue({ value: kpis.obraPendentAny }),
  },
];
