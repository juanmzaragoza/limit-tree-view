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

import {loadData} from "redux/unit-control";

const DetailedContent = ({ data, actions }) => {

  React.useEffect(() => {
    (!isEmpty(data) && !!loader[data.type] && loader[data.type]()) || console.log("Tipo inexistente");
  },[data]);

  const loader = {
    [CONTROL_UNIT_TYPE]: () => actions.getUnitControlData({})
  }

  const layout = {
    [PROJECT_TYPE]: () => {
      return <ProjectDetailedContent />;
    },
    [CONTROL_UNIT_TYPE]: () => {
      return <ControlUnitDetailedContent />;
    },
    [PARTIDA_TYPE]: () => {
      return <PartidaDetailedContent />;
    },
  }

  return (
    <Container maxWidth={false}>
      {(data && !!layout[data.type] && layout[data.type]()) || "Tipo inexistente"}
    </Container>
  )
}

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    getUnitControlData: bindActionCreators(loadData, dispatch)
  };
  return { actions };
};

const component = connect(null,mapDispatchToProps)(DetailedContent);
export default component;