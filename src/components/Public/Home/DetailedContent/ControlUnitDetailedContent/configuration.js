import * as React from "react";
import {
  CallMissedOutgoing,
  Construction,
  Engineering,
  Euro,
  StackedBarChart,
  StackedLineChart
} from "@mui/icons-material";

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
]