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
        field: "Producción Anterior",
        value: kpisPartida.produccioAnterior,
        breakpoints: 3,
      },
      {
        field: "Producción Período",
        value: kpisPartida.produccioPeriode,
        breakpoints: 2,
      },
      {
        field: "Producción Año Natural",
        value: kpisPartida.produccioAny,
        breakpoints: 3,
      },
      {
        field: "Producción a Origen",
        value: kpisPartida.produccioOrigen,
        breakpoints: 2,
      },
      {
        field: "Producción Pendiente",
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
        field: "Coste Teórico Anterior",
        value: kpisPartida.costTeoricAnterior,
        breakpoints: 3,
      },
      {
        field: "Coste Teórico Período",
        value: kpisPartida.costTeoricPeriode,
        breakpoints: 2,
      },
      {
        field: "Coste Teórico Año Natural",
        value: kpisPartida.costTeoricAny,
        breakpoints: 3,
      },
      {
        field: "Coste Teórico a Origen",
        value: kpisPartida.costTeoricOrigen,
        breakpoints: 2,
      },
      {
        field: "Coste Teórico Pendiente",
        value: kpisPartida.costTeoricPendent,
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
        value: kpisPartida.costRealAnterior,
        icon: <StackedBarChart />,
      },
      {
        field: "Coste Real Período",
        value: kpisPartida.costRealPeriode,
        icon: <StackedBarChart />,
      },
      {
        field: "Coste Real año Natural",
        value: kpisPartida.costRealAny,
        icon: <StackedBarChart />,
      },
      {
        field: "Coste Real Origen",
        value: kpisPartida.costRealOrigen,
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
        value: kpisPartida.beneficiAnterior,
      },
      {
        field: "Beneficio Período",
        value: kpisPartida.beneficiPeriode,
      },
      {
        field: "Beneficio año Natural",
        value: kpisPartida.beneficiAny,
      },
      {
        field: "Beneficio Origen",
        value: kpisPartida.beneficiOrigen,
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
        value: kpisPartida.desviacioCostAnterior,
      },
      {
        field: "Desviación Período",
        value: kpisPartida.desviacioPeriode,
      },
      {
        field: "Desviación año Natural",
        value: kpisPartida.desviacioAny,
      },

      {
        field: "Desviación Origen",
        value: kpisPartida.desviacioOrigen,
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
        value: kpisPartida.obraPendentFacturar,
      },
      {
        field: "Obra Pendiente Período",
        value: kpisPartida.obraPendent,
      },
      {
        field: "Obra Pendiente año Natural",
        value: kpisPartida.obraPendentAny,
      },
      {
        field: "Obra Pendiente Origen",
        value: kpisPartida.obraPendentOrigen,
      },
    ],
  },
];