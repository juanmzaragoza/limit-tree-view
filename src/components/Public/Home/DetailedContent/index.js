import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isEmpty } from "lodash";
import { Container } from "@mui/material";

import {
  CONTROL_UNIT_TYPE,
  PARTIDA_TYPE,
  PROJECT_TYPE,
} from "constants/business-types";
import ProjectDetailedContent from "./ProjectDetailedContent";
import ControlUnitDetailedContent from "./ControlUnitDetailedContent";
import PartidaDetailedContent from "./PartidaDetailedContent";

import { loadData as loadUnitControlData, loadKpis } from "redux/project";
import {
  loadData as loadPartidaData,
  loadKpis as loadKpisUC,
} from "redux/unit-control";
import { loadData as loadResourceData } from "redux/partida";
import { getTreeId } from "utils/helper";
import { getSelectedPeriod } from "redux/period/selectors";
import {
  getSelectedNode,
  getData,
  getFormattedData,
} from "redux/project-tree/selectors";
import { getUnitControl } from "redux/unit-control/selectors";
import { getPartida } from "redux/partida/selectors";
import { selectNode } from "redux/project-tree";

const DetailedContent = ({
  data,
  actions,
  unitControl,
  selectedNode,
  selectedPeriod,
  loadingTree,
  partida,
  dataTree,
}) => {
  React.useEffect(() => {
    (!isEmpty(data) && !!loader[data.type] && loader[data.type]()) ||
      console.log("Tipo inexistente");
  }, [data]);

  const [controlId, setControlId] = React.useState({});

  React.useEffect(() => {
    if (selectedNode !== null) {
      if (selectedNode.type === "PROJECT") {
        loader[PROJECT_TYPE]();
      }

      if (selectedNode.type === "PARTIDA") {
        const codi = getTreeId(partida);
        actions.getSelectedNode({ ids: codi });
        setControlId(partida.unitatControlEstudi.id);
      }
      if (selectedNode.type === "CONTROL_UNIT") {
        const codi = getTreeId(unitControl);
        actions.getSelectedNode({ ids: codi });
      }
    }
  }, [loadingTree]);

  const loader = {
    [PROJECT_TYPE]: () => {
      actions.getUnitControlData({ id: dataTree.id });
    },
    [CONTROL_UNIT_TYPE]: () => {
      if (selectedNode === null) {
        actions.getPartidaData({ id: data.id });
      } else {
        actions.getPartidaData({ id: selectedNode.id });
        actions.loadKpisUC({ id: selectedNode.id });
        actions.loadKpis({id: dataTree.id})
      }
    },

    [PARTIDA_TYPE]: () => {
      if (selectedNode === null) {
        actions.getResources({ id: data.id });
      } else {
        actions.getResources({ id: selectedNode.id });
        actions.loadKpis({ id: dataTree.id });
      }
    },
  };

  const layout = {
    [PROJECT_TYPE]: () => {
      return <ProjectDetailedContent />;
    },
    [CONTROL_UNIT_TYPE]: () => {
      return <ControlUnitDetailedContent id={data.id} />;
    },
    [PARTIDA_TYPE]: () => {
      return <PartidaDetailedContent id={data.id} />;
    },
  };

  return (
    <Container maxWidth={false} className="containerData">
      {(data && !!layout[data.type] && layout[data.type]()) ||
        "Tipo inexistente"}
    </Container>
  );
};

const mapStateToProps = (state, props) => {
  return {
    selectedPeriod: getSelectedPeriod(state),
    selectedNode: getSelectedNode(state),
    unitControl: getUnitControl(state),
    loadingTree: getData(state),
    partida: getPartida(state),
    dataTree: getFormattedData(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    getUnitControlData: bindActionCreators(loadUnitControlData, dispatch),
    getPartidaData: bindActionCreators(loadPartidaData, dispatch),
    getResources: bindActionCreators(loadResourceData, dispatch),
    getSelectedNode: bindActionCreators(selectNode, dispatch),
    loadKpis: bindActionCreators(loadKpis, dispatch),
    loadKpisUC: bindActionCreators(loadKpisUC, dispatch),
  };
  return { actions };
};

const component = connect(mapStateToProps, mapDispatchToProps)(DetailedContent);
export default component;
