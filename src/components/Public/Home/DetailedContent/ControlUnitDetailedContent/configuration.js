import * as React from "react";
import {
  CallMissedOutgoing,
  Construction,
  Engineering,
  Euro,
  StackedBarChart,
  StackedLineChart,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";

import { formatCurrencyWithIntl } from "utils/formats";
import { entitiesStyles } from "utils/helper";
import { PARTIDA_TYPE } from "constants/business-types";

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
    title: "Coste Teórico Producción Hecha",
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
    title: "Coste Real Producción Hecha",
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
    title: "Beneficios Producción Hecha",
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
    title: "Desviación Teórico - Real Coste",
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
  { label: "Coste Teórico Producción Hecha", colSpan: 5, className: "borderLeft" },
  { label: "Coste Real Producción Hecha", colSpan: 4, className: "borderLeft" },
  { label: "Beneficios Producción Hecha", colSpan: 4, className: "borderLeft" },
  { label: "Desviación Teórico - Real Coste", colSpan: 4, className: "borderLeft" },

];
