import * as React from "react";
import {
  CallMissedOutgoing,
  Engineering,
  Euro,
  StackedBarChart,
  StackedLineChart
} from "@mui/icons-material";
import {getKpisColorValue} from "../common";

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
]);

export const getHeaderPartidaFields = (kpisPartida) => ([
  {
    field: "Benef. Origen",
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
    field: "Benef. Año",
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
]);

export const getHeaderProjectFields = (kpisProjecte) => ([
  {
    field: "Benef. Origen",
    value: kpisProjecte.beneficiOrigen,
  },
  {
    field: "Prod. Origen",
    value: kpisProjecte.produccioOrigen,
  },
  {
    field: "Pen. Origen",
    value: kpisProjecte.obraPendentOrigen,
  },
  {
    field: "Benef. Año",
    value: kpisProjecte.beneficiAny,
    colorValue: getKpisColorValue({ value: kpisProjecte.beneficiAny }),
  },
  {
    field: "Prod. Año",
    value: kpisProjecte.produccioAny,
    colorValue: getKpisColorValue({ value: kpisProjecte.produccioAny }),
  },
  {
    field: "Pen. Año",
    value: kpisProjecte.obraPendentAny,
    colorValue: getKpisColorValue({ value: kpisProjecte.obraPendentAny }),
  },
]);