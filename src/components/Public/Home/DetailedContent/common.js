import { Avatar, IconButton } from "@mui/material";
import { PARTIDA_TYPE } from "constants/business-types";
import { formatCurrencyWithIntl } from "utils/formats";
import {entitiesStyles, greenColor, redColor} from "../../../../utils/helper";

export const isPeriodOpen = ({ period }) => {
  return !period.tancat;
}

export const getKpisColorValue = ({ value }) => value >= 0 ? greenColor : redColor;

export const getPartidaColumnsByPeriod = ({ period, intl,actions, }) => {
  const  number  = period.numero;
  const numberIsZero = !number;
  const numberIsNotZero = !!number;

  return [
    {
      field: "id",
      headerName: (
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
      renderCell: (cellValues) => {
        
        return (
          <IconButton
            variant="outlined"
            onClick={() => {
              actions.selectTab({ value: 1 });
              actions.selectNode({ ids: cellValues.row.id });
            }}
            style={{ color: entitiesStyles[PARTIDA_TYPE].iconColor }}
          >
            {entitiesStyles[PARTIDA_TYPE].icon}
          </IconButton>
        );
      },
      minWidth: 30,
      editable: false,
    },
    { field: "codi", headerName: "Cód.", minWidth: 90 },
    {
      field: "descripcioReduc",
      headerName: "Descripción",
      minWidth: 350,
      editable: numberIsZero,
    },

    {
      field: "unitatsActual",
      headerName: "Med. hecha período",
      type: "number",
      minWidth: 140,
      editable: numberIsNotZero,
    },
    {
      field: "medicioOrigen",
      headerName: "Med. Origen",
      type: "number",
      minWidth: 140,
      editable: numberIsNotZero,
    },

    {
      field: "unitats",
      headerName: "Med. Prevista",
      type: "number",
      minWidth: 140,
      editable: numberIsZero,
    },
    {
      field: "unitatTipus",
      headerName: "Tipo Unidad",
      valueGetter: (params) => `${params.value?.description || ""}`,
      minWidth: 100,
    },
    {
      field: "unitatsAnterior",
      headerName: "Med. Orig. Anterior",
      type: "number",
      minWidth: 140,
    },
    {
      field: "obraPendent",
      headerName: "Med. pendiente",
      type: "number",
      minWidth: 140,
    },
    {
      field: "unitatsPress",
      headerName: "Med. Presupuestada",
      type: "number",
      minWidth: 140,
      editable: numberIsZero,
    },
    {
      field: "preu",
      headerName: "Pvp Bruto",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.preu ?? 0, intl),
      minWidth: 140,
      editable: numberIsZero,
    },
    {
      field: "preuNet",
      headerName: "Pvp Neto",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.preuNet ?? 0, intl),
      minWidth: 140,
    },
    {
      field: "importTotal",
      headerName: "Imp. Tot. Pres.",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.importTotal ?? 0, intl),
      minWidth: 140,
    },
    {
      field: "costUni",
      headerName: "Coste Unit. Total",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.costUni ?? 0, intl),
      minWidth: 140,
      editable: false,
    },
    {
      field: "costTotal",
      headerName: "Coste Total Prev.",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.costTotal ?? 0, intl),
      minWidth: 140,
    },
  ];
}

export const getResourceColumnsByPeriod = ({ period, intl, }) => {
  const { number } = period;
  return [

    { field: "codi", headerName: "Código",  minWidth: 110, },
    {
      field: "descripcio",
      headerName: "Descripción",
      minWidth: 639,
      editable: !number,
    },
    {
      field: "unitats",
      headerName: "Medición",
      type: "number",
      minWidth: 140,
      editable: !number,
    },
    {
      field: "unitatTipus",
      headerName: "Tipo Unidad",
      minWidth: 140,
      valueGetter: (params) => `${params.value?.description || ""}`,
    },
    {
      field: "costUnitat",
      headerName: "Coste Unitario",
      type: "number",
      minWidth: 140,
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costUnitat ?? 0, intl);
      },
      editable: !number,
    },
    {
      field: "costTotal",
      headerName: "Coste Total",
      minWidth: 140,
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costTotal ?? 0, intl);
      },
    },
  ];
}


export const getPartidaColumnsByIndicator = ({ intl }) => {

  return [
    { field: "codi", headerName: "Cód.", minWidth: 90 },
    {
      field: "descripcio",
      headerName: "Descripció",
      minWidth: 350,
   
    },

    {
      headerName: "Prod. Anterior",
      field: "produccioAnterior",
      minWidth: 140,
      valueFormatter: (params) =>
      formatCurrencyWithIntl(params.row.produccioAnterior ?? 0, intl),
    },
    {
      headerName: "Prod. Periodo",
      field: "produccioPeriode",
      minWidth: 140,
      valueFormatter: (params) =>
      formatCurrencyWithIntl(params.row.produccioPeriode ?? 0, intl),
    },
    {
      headerName: "Prod. Año Natural",
      field: "produccioAny",
      minWidth: 140,
      valueFormatter: (params) =>
      formatCurrencyWithIntl(params.row.produccioAny ?? 0, intl),
    },
    {
      headerName: "Prod. Origen",
      field: "produccioOrigen",
      minWidth: 140,
      valueFormatter: (params) =>
      formatCurrencyWithIntl(params.row.produccioOrigen ?? 0, intl),

    },
    {
      headerName: "Prod. Pendiente",
      field: "produccioPendent",
      valueFormatter: (params) =>
      formatCurrencyWithIntl(params.row.produccioPendent ?? 0, intl),
    },
    {
      headerName: "Coste Teórico Anterior",
      value: "costTeoricAnterior",

    },
    {
      headerName: "Coste Teórico Pendiente",
      field: "costTeoricPeriode",
       },
    {
      headerName: "Coste Teórico Año Natural",
      field: "costTeoricAny",
 
    },
    {
      headerName: "Coste Teórico a Origen",
      field: "costTeoricOrigen",
  
    },
    {
      headerName: "Coste Teórico Pendiente",
      field: "costTeoricPendent",
    
    },
 
  ];
}