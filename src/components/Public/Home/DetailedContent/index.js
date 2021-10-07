import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {isEmpty} from "lodash";
import { Container } from "@mui/material";

import {
  CONTROL_UNIT_TYPE,
  PARTIDA_TYPE,
  PROJECT_TYPE
} from "constants/business-types";
import ProjectDetailedContent from "./ProjectDetailedContent";
import ControlUnitDetailedContent from "./ControlUnitDetailedContent";
import PartidaDetailedContent from "./PartidaDetailedContent";

import { loadData as loadUnitControlData } from "redux/project";
import { loadData as loadPartidaData } from "redux/unit-control";
import { loadData as loadResourceData } from "redux/partida";
import * as API from "redux/api";

const DetailedContent = ({ data, actions }) => {

  React.useEffect(() => {
    (!isEmpty(data) && !!loader[data.type] && loader[data.type]()) || console.log("Tipo inexistente");
  },[data]);

  const loader = {
    [PROJECT_TYPE]: () => actions.getUnitControlData({url: API.UNIT_CONTROL_URL, keyFilter: "estudiProjecte.id", id: data.id}),
    [CONTROL_UNIT_TYPE]: () => actions.getPartidaData({url: API.PARTIDA_URL, keyFilter: "unitatControlEstudi.id", id: data.id}),
    [PARTIDA_TYPE]: () => actions.getResources({url: API.RECURSOS_URL, keyFilter: "liniaEstudi.id", id: data.id}),
  }

  const layout = {
    [PROJECT_TYPE]: () => {
      return <ProjectDetailedContent />;
    },
    [CONTROL_UNIT_TYPE]: () => {
      return <ControlUnitDetailedContent id={data.id}/>;
    },
    [PARTIDA_TYPE]: () => {
      return <PartidaDetailedContent id={data.id}/>;
    },
  }

  return (
    <Container maxWidth={false} className="containerData">
      {(data && !!layout[data.type] && layout[data.type]()) || "Tipo inexistente"}
    </Container>
  )
}

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    getUnitControlData: bindActionCreators(loadUnitControlData, dispatch),
    getPartidaData: bindActionCreators(loadPartidaData, dispatch),
    getResources: bindActionCreators(loadResourceData, dispatch),
  };
  return { actions };
};

const component = connect(null,mapDispatchToProps)(DetailedContent);
export default component;