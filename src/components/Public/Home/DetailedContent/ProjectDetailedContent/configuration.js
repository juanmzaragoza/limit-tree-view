import * as React from "react";
import {
  CallMissedOutgoing,
  Construction,
  Engineering,
  Euro,
  StackedBarChart,
  StackedLineChart,
  Assignment
} from "@mui/icons-material";
import { formatCurrencyWithIntl } from "utils/formats";
export const getIndicators = (kpis) => [
  {
    title: "Facturación",
    icon: <Assignment />,
    lg: 3,
    indicators: [
      {
        field: "Facturación Anterior",
        value: kpis.facturacioRealAnterior,
      },
      {
        field: "Facturación Periodo",
        value: kpis.facturacioRealPeriode,
      },
      {
        field: "Facturación Año Natural",
        value: kpis.facturacioRealAny,
      },
      {
        field: "Facturación a Origen",
        value: kpis.facturacioRealOrigen,
      },
    ],
  },
  {
    title: "Produccion",
    icon: <Engineering />,
    lg: 2,
    indicators: [
      {
        field: "Producción Anterior",
        value: kpis.produccioAnterior,
        breakpoints: 3,
      },
      {
        field: "Producción Periodo",
        value: kpis.produccioPeriode,
        breakpoints: 2,
      },
      {
        field: "Producción Año Natural",
        value: kpis.produccioAny,
        breakpoints: 3,
      },
      {
        field: "Producción a Origen",
        value: kpis.produccioOrigen,
        breakpoints: 2,
      },
      {
        field: "Producción Pendiente",
        value: kpis.produccioPendent,
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
        field: "Coste Teórico Anterior",
        value: kpis.costTeoricAnterior,
        breakpoints: 3,
      },
      {
        field: "Coste Teórico Pendiente",
        value: kpis.costTeoricPeriode,
        breakpoints: 2,
      },
      {
        field: "Coste Teórico Año Natural",
        value: kpis.costTeoricAny,
        breakpoints: 3,
      },
      {
        field: "Coste Teórico a Origen",
        value: kpis.costTeoricOrigen,
        breakpoints: 2,
      },
      {
        field: "Coste Teórico Pendiente",
        value: kpis.costTeoricPendent,
        breakpoints: 2,
      },
    ],
  },
  {
    title: "Coste Real",
    icon: <StackedBarChart />,
    lg: 3,
    indicators: [
      {
        field: "Coste Real Anterior",
        value: kpis.costRealAnterior,
      },
      {
        field: "Coste Real Pendiente",
        value: kpis.costRealPeriode,
      },
      {
        field: "Coste Real año Natural",
        value: kpis.costRealAny,
      },
      {
        field: "Coste Real Origen",
        value: kpis.costRealOrigen,
      },
    ],
  },
  {
    title: "Beneficios",
    icon: <Euro />,
    lg: 3,
    indicators: [
      {
        field: "Beneficio Anterior",
        value: kpis.beneficiAnterior,
      },
      {
        field: "Beneficio Período",
        value: kpis.beneficiPeriode,
      },
      {
        field: "Beneficio año Natural",
        value: kpis.beneficiAny,
      },
      {
        field: "Beneficio Origen",
        value: kpis.beneficiOrigen,
      },
    ],
  },
  {
    title: "Desviación",
    icon: <CallMissedOutgoing />,
    lg: 3,
    indicators: [
      {
        field: "Desviación Anterior",
        value: kpis.desviacioCostAnterior,
      },
      {
        field: "Desviación Período",
        value: kpis.desviacioPeriode,
      },
      {
        field: "Desviación año Natural",
        value: kpis.desviacioAny,
      },

      {
        field: "Desviación Origen",
        value: kpis.desviacioOrigen,
      },
    ],
  },
  {
    title: "Obra Pendiente Periodo",
    icon: <Construction />,
    lg: 3,
    indicators: [
      {
        field: "Obra Pendiente Anterior",
        value: kpis.obraPendentFacturar,
      },
      {
        field: "Obra Pendiente Período",
        value: kpis.obraPendent,
      },
      {
        field: "Obra Pendiente año Natural",
        value: kpis.obraPendentAny,
      },
      {
        field: "Obra Pendiente Origen",
        value: kpis.obraPendentOrigen,
      },
    ],
  },
];


export const columnsIndicatorsPartida = (intl) => [
  { id: "unitatControlCodi", label: "Cód.", minWidth: 90 },
  {
    id: "unitatControlDescripcio",
    label: "Descripció",
    minWidth: 350,
  },

  {
    label: "P. Anterior",
    id: "produccioAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "P. Periodo",
    id: "produccioPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "P. Año Natural",
    id: "produccioAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "P. Origen",
    id: "produccioOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "P. Pendiente",
    id: "produccioPendent",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "CT. Anterior",
    id: "costTeoricAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "CT. Pendiente",
    id: "costTeoricPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "CT. Año Natural",
    id: "costTeoricAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "CT. Origen",
    id: "costTeoricOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "CT. Pendiente",
    id: "costTeoricPendent",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "CR. Anterior",
    id: "costRealAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "CR. Pendiente",
    id: "costRealPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "CR. Año Natural",
    id: "costRealAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "CR. Origen",
    id: "costRealOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Benef. Anterior",
    id: "beneficiAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Benef. Periodo",
    id: "beneficiPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Benef. Año Natural",
    id: "beneficiAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Benef. Origen",
    id: "beneficiOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Desv. Anterior",
    id: "desviacioCostAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Desv. Periodo",
    id: "desviacioPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Desv. Año Natural",
    id: "desviacioAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "Desv. Origen",
    id: "desviacioOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "OP. Anterior",
    id: "obraPendentFacturar",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "OP. Periodo",
    id: "obraPendent",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "OP. Año Natural",
    id: "obraPendentAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    label: "OP. Origen",
    id: "obraPendentOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
];


export const columnsSubTotal = (intl) => [
  {
    id: "produccioAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
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
  },
  {
    id: "costTeoricAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
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
  },
  {
    id: "costRealAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
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
  },
  {
    id: "beneficiPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "beneficiAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "beneficiOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "desviacioCostAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "desviacioPeriode",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "desviacioAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "desviacioOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "obraPendentFacturar",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "obraPendent",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "obraPendentAny",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
  },
  {
    id: "obraPendentOrigen",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
     numeric: true,
  },
];

export const groups = [
  { label: "Producción", colSpan: 5 },
  { label: "Coste Teórico", colSpan: 5 },
  { label: "Coste Real", colSpan: 4 },
  { label: "Beneficios", colSpan: 4 },
  { label: "Desviación", colSpan: 4 },
  { label: "Obra Pendiente", colSpan: 4 },
];
