import { Avatar, IconButton } from "@mui/material";
import { PARTIDA_TYPE, RESOURCE_TYPE } from "constants/business-types";
import { formatCurrencyWithIntl } from "utils/formats";
import {
  entitiesStyles,
  greenColor,
  redColor,
  inheritColor,
  getTreeId,
} from "utils/helper";

export const isPeriodOpen = ({ period }) => {
  return !period.tancat;
};

export const getKpisColorValue = ({ value }) => {
  if (value !== undefined) {
    if (value === 0) {
      return inheritColor;
    } else if (value >= 0) {
      return greenColor;
    } else {
      return redColor;
    }
  } else {
    return inheritColor;
  }
};

export const getPartidaColumnsByPeriod = ({ period, intl, actions }) => {
  const number = period.numero;
  const numberIsZero = !number;
  const numberIsNotZero = !!number;

  return [
    {
      field: "id",
      headerName: (
        <Avatar
          aria-label="recipe"
          sx={{
            bgcolor: entitiesStyles[PARTIDA_TYPE].iconColor,
            color: "white",
          }}
        >
          {entitiesStyles[PARTIDA_TYPE].icon}
        </Avatar>
      ),
      renderCell: (cellValues) => {
        return (
          <IconButton
            variant="outlined"
            onClick={() => {
              actions.selectTab({ value: 1 });
              actions.selectNode({ ids: getTreeId(cellValues.row) });
            }}
            style={{ color: entitiesStyles[RESOURCE_TYPE].iconColor }}
          >
            {entitiesStyles[RESOURCE_TYPE].icon}
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
      field: "unitatTipus",
      headerName: "Tipo Unidad",
      align: 'center',
      headerAlign: 'center',
      minWidth: 100,
      valueGetter: (params) => `${params.value?.description || ""}`,
    
    },
    {
      field: "unitatsAnterior",
      headerName: "Med. Anterior Orig.",
      type: "number",
      minWidth: 140,
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
      headerName: "Med. Planificada",
      type: "number",
      minWidth: 140,
      editable: numberIsZero,
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
      headerName: "Imp. Final Planif.",
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
      headerName: "Coste Final Planif.",
      type: "number",
      valueFormatter: (params) =>
        formatCurrencyWithIntl(params.row.costTotal ?? 0, intl),
      minWidth: 140,
    },
  ];
};

export const getResourceColumnsByPeriod = ({ period, intl }) => {
  const  number  = period.numero;
  return [
    { field: "codi", headerName: "Código", minWidth: 110 },
    {
      field: "descripcio",
      headerName: "Descripción",
      minWidth: 510,
      editable: !number,
    },
    {
      field: "unitatTipus",
      headerName: "Tipo Unidad",
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => `${params.value?.description || ""}`,
      
    },
    {
      field: "unitats",
      headerName: "Medición",
      type: "number",
      minWidth: 140,
      editable: true,
    },

    {
      field: "costUnitat",
      headerName: "Coste Unitario",
      type: "number",
      minWidth: 140,
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costUnitat ?? 0, intl);
      },
      editable: true,
    },
    {
      field: "costTotal",
      headerName: "Coste Final Planif.",
      minWidth: 140,
      type: "number",
      valueFormatter: (params) => {
        return formatCurrencyWithIntl(params.row.costTotal ?? 0, intl);
      },
    },
  ];
};

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
};
