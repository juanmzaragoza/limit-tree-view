import * as React from "react";
import {
  CallMissedOutgoing,
  Engineering,
  Euro,
  StackedBarChart,
  StackedLineChart,
} from "@mui/icons-material";
import { getKpisColorValue } from "../common";

export const getIndicators = (kpisPartida) => [
  {
    title: "Producción",
    icon: <Engineering />,
    lg: 2,
    indicators: [
      {
        field: "Anterior",
        value: kpisPartida.produccioAnterior,
        breakpoints: 3,
      },
      {
        field: "Período",
        value: kpisPartida.produccioPeriode,
        breakpoints: 2,
      },
      {
        field: "Año Natural",
        value: kpisPartida.produccioAny,
        breakpoints: 3,
      },
      {
        field: "Origen",
        value: kpisPartida.produccioOrigen,
        breakpoints: 2,
      },
      {
        field: "Pendiente",
        value: kpisPartida.produccioPendent,
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
        value: kpisPartida.costTeoricAnterior,
        breakpoints: 3,
      },
      {
        field: "Período",
        value: kpisPartida.costTeoricPeriode,
        breakpoints: 2,
      },
      {
        field: "Año Natural",
        value: kpisPartida.costTeoricAny,
        breakpoints: 3,
      },
      {
        field: "Origen",
        value: kpisPartida.costTeoricOrigen,
        breakpoints: 2,
      },
      {
        field: "Pendiente",
        value: kpisPartida.costTeoricPendent,
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
        value: kpisPartida.costRealAnterior,
        icon: <StackedBarChart />,
      },
      {
        field: "Período",
        value: kpisPartida.costRealPeriode,
        icon: <StackedBarChart />,
      },
      {
        field: "Año Natural",
        value: kpisPartida.costRealAny,
        icon: <StackedBarChart />,
      },
      {
        field: "Origen",
        value: kpisPartida.costRealOrigen,
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
        value: kpisPartida.beneficiAnterior,
      },
      {
        field: "Período",
        value: kpisPartida.beneficiPeriode,
      },
      {
        field: "Año Natural",
        value: kpisPartida.beneficiAny,
      },
      {
        field: "Origen",
        value: kpisPartida.beneficiOrigen,
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
        value: kpisPartida.desviacioAnterior,
      },
      {
        field: "Período",
        value: kpisPartida.desviacioPeriode,
      },
      {
        field: "Año Natural",
        value: kpisPartida.desviacioAny,
      },

      {
        field: "Origen",
        value: kpisPartida.desviacioOrigen,
      },
    ],
  },
];

export const getHeaderControlUnitFields = (kpisUnitatControl) => [
  {
    field: "Res. Bru. Ori.",
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
    field: "Res. Bru. Año",
    value: kpisUnitatControl.beneficiAny,
    colorValue: getKpisColorValue({
      value: kpisUnitatControl.beneficiAny,
    }),
  },
  {
    field: "Prod. Año",
    value: kpisUnitatControl.produccioAny,
    colorValue: getKpisColorValue({
      value: kpisUnitatControl.produccioAny,
    }),
  },
  {
    field: "Desv. Año",
    value: kpisUnitatControl.desviacioAny,
    colorValue: getKpisColorValue({
      value: kpisUnitatControl.desviacioAny,
    }),
  },
];

export const getHeaderPartidaFields = (kpisPartida) => [
  {
    field: "Res. Bru. Ori.",
    value: kpisPartida.beneficiOrigen,
  },
  {
    field: "Prod. Origen",
    value: kpisPartida.produccioOrigen,
  },
  {
    field: "Desv. Origen",
    value: kpisPartida.desviacioOrigen,
  },
  {
    field: "Res. Bru. Año",
    value: kpisPartida.beneficiAny,
    colorValue: getKpisColorValue({ value: kpisPartida.beneficiAny }),
  },
  {
    field: "Prod. Año",
    value: kpisPartida.produccioAny,
    colorValue: getKpisColorValue({ value: kpisPartida.produccioAny }),
  },
  {
    field: "Desv. Año",
    value: kpisPartida.desviacioAny,
    colorValue: getKpisColorValue({ value: kpisPartida.desviacioAny }),
  },
];

export const getHeaderProjectFields = (kpisProjecte) => [
  {
    field: "Res. Bru. Ori.",
    value: kpisProjecte.beneficiOrigen,
  },
  {
    field: "Prod. Origen",
    value: kpisProjecte.produccioOrigen,
  },
  {
    field: "Pen. Fac. Ori.",
    value: kpisProjecte.obraPendentOrigen,
  },
  {
    field: "Res. Bru. Año",
    value: kpisProjecte.beneficiAny,
    colorValue: getKpisColorValue({ value: kpisProjecte.beneficiAny }),
  },
  {
    field: "Prod. Año",
    value: kpisProjecte.produccioAny,
    colorValue: getKpisColorValue({ value: kpisProjecte.produccioAny }),
  },
  {
    field: "Pen. Fac. Año",
    value: kpisProjecte.obraPendentAny,
    colorValue: getKpisColorValue({ value: kpisProjecte.obraPendentAny }),
  },
];
