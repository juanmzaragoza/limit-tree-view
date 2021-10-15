import * as React from "react";
import {
  CallMissedOutgoing,
  Construction,
  Engineering,
  Euro,
  StackedBarChart,
  StackedLineChart,
} from "@mui/icons-material";
import { formatCurrencyWithIntl } from "utils/formats";
import { entitiesStyles } from "utils/helper";
import { PARTIDA_TYPE } from "constants/business-types";
import { Avatar } from "@mui/material";

export const getIndicators = (kpisUnitatControl) => [
  {
    title: "Produccion",
    icon: <Engineering />,
    lg: 2,
    indicators: [
      {
        field: "Producción Anterior",
        value: kpisUnitatControl.produccioAnterior,
        breakpoints: 3,
      },
      {
        field: "Producción Periodo",
        value: kpisUnitatControl.produccioPeriode,
        breakpoints: 2,
      },
      {
        field: "Producción Año Natural",
        value: kpisUnitatControl.produccioAny,
        breakpoints: 3,
      },
      {
        field: "Producción a Origen",
        value: kpisUnitatControl.produccioOrigen,
        breakpoints: 2,
      },
      {
        field: "Producción Pendiente",
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
        field: "Coste Teórico Anterior",
        value: kpisUnitatControl.costTeoricAnterior,
        breakpoints: 3,
      },
      {
        field: "Coste Teórico Pendiente",
        value: kpisUnitatControl.costTeoricPeriode,
        breakpoints: 2,
      },
      {
        field: "Coste Teórico Año Natural",
        value: kpisUnitatControl.costTeoricAny,
        breakpoints: 3,
      },
      {
        field: "Coste Teórico a Origen",
        value: kpisUnitatControl.costTeoricOrigen,
        breakpoints: 2,
      },
      {
        field: "Coste Teórico Pendiente",
        value: kpisUnitatControl.costTeoricPendent,
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
        value: kpisUnitatControl.costRealAnterior,
        icon: <StackedBarChart />,
      },
      {
        field: "Coste Real Pendiente",
        value: kpisUnitatControl.costRealPeriode,
        icon: <StackedBarChart />,
      },
      {
        field: "Coste Real año Natural",
        value: kpisUnitatControl.costRealAny,
        icon: <StackedBarChart />,
      },
      {
        field: "Coste Real Origen",
        value: kpisUnitatControl.costRealOrigen,
        icon: <StackedBarChart />,
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
        value: kpisUnitatControl.beneficiAnterior,
      },
      {
        field: "Beneficio Período",
        value: kpisUnitatControl.beneficiPeriode,
      },
      {
        field: "Beneficio año Natural",
        value: kpisUnitatControl.beneficiAny,
      },
      {
        field: "Beneficio Origen",
        value: kpisUnitatControl.beneficiOrigen,
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
        value: kpisUnitatControl.desviacioCostAnterior,
      },
      {
        field: "Desviación Período",
        value: kpisUnitatControl.desviacioPeriode,
      },
      {
        field: "Desviación año Natural",
        value: kpisUnitatControl.desviacioAny,
      },

      {
        field: "Desviación Origen",
        value: kpisUnitatControl.desviacioOrigen,
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
        value: kpisUnitatControl.obraPendentFacturar,
      },
      {
        field: "Obra Pendiente Período",
        value: kpisUnitatControl.obraPendent,
      },
      {
        field: "Obra Pendiente año Natural",
        value: kpisUnitatControl.obraPendentAny,
      },
      {
        field: "Obra Pendiente Origen",
        value: kpisUnitatControl.obraPendentOrigen,
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
  },

  {
    label: "P. Anterior",
    id: "produccioAnterior",
    minWidth: 140,
    format: (value) => formatCurrencyWithIntl(value ?? 0, intl),
    numeric: true,
    className: "borderLeft",
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
    className: "borderLeft",
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
    className: "borderLeft",
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
    className: "borderLeft",
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
    className: "borderLeft",
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
    className: "borderLeft",
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
    className: "borderLeft",
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
    className: "borderLeft",
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
  { label: "Obra Pendiente", colSpan: 4, className: "borderLeft" },
];
