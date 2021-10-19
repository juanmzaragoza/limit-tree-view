import * as React from "react";
import {
  CallMissedOutgoing,
  Construction,
  Engineering,
  Euro,
  StackedBarChart,
  StackedLineChart
} from "@mui/icons-material";

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
    title: "Coste Teórico",
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
    title: "Coste Real",
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
    title: "Beneficios",
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
    title: "Desviación",
    icon: <CallMissedOutgoing />,
    lg: 2,
    indicators: [
      {
        field: "Anterior",
        value: kpisPartida.desviacioCostAnterior,
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