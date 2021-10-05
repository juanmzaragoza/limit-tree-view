import * as React from "react";
import { Container } from "@mui/material";
import { CONTROL_UNIT_TYPE, PARTIDA_TYPE, PROJECT_TYPE } from "../index";
import ProjectDetailedContent from "./ProjectDetailedContent";
import ControlUnitDetailedContent from "./ControlUnitDetailedContent";
import PartidaDetailedContent from "./PartidaDetailedContent";

const DetailedContent = ({ data }) => {

  const layout = {
    [PROJECT_TYPE]: <ProjectDetailedContent />,
    [CONTROL_UNIT_TYPE]: <ControlUnitDetailedContent />,
    [PARTIDA_TYPE]: <PartidaDetailedContent />,
  }
  return (
    <Container maxWidth={false} className="containerData">
      {(data && layout[data.type]) || "Tipo inexistente"}
    </Container>
  )
}

export default DetailedContent;