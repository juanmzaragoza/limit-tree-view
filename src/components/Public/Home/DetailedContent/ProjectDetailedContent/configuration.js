import * as React from "react";
import {
  CallMissedOutgoing,
  Construction,
  Engineering,
  Euro,
  StackedBarChart,
  StackedLineChart
} from "@mui/icons-material";

export const getIndicators = (kpis) => [
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