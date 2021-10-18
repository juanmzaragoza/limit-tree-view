import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import MaterialHeaderSkeleton from "./MaterialSkeleton/MaterialHeaderSkeleton";
import { formatCurrencyWithIntl } from "utils/formats";
import { useIntl } from "react-intl";
import {IconButton} from "@material-ui/core";


const DetailedHeader = ({
  id,
  header,
  body,
  colorBackground,
  icon,
  iconColor,
  breakpoints = { xs: 6 },
  onClick = (row) => {},
}) => {
  const intl = useIntl();
  const cutTitle = () => {
    if(header.title.length > 50){
      return `${header.title.substring(0,50)}...`;
    }else{
      return header.title;
    }
  }
  const renderSkeleton = () => <MaterialHeaderSkeleton />;
  const renderContent = () => (
    <Card
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <CardHeader
        avatar={
          <IconButton>
            <Avatar
              aria-label="recipe"
              sx={{ bgcolor: iconColor, color: "white" }}
            >
              {icon}
            </Avatar>
          </IconButton>
        }
        title={cutTitle()}
        subheader={header.subheader}
        titleTypographyProps={{ align: "center" }}
        subheaderTypographyProps={{
          align: "center",
        }}
        sx={{
          maxHeight: "60px",
          backgroundColor: colorBackground,
        }}
        className="tituloDetailHeader"
        onClick={() => onClick(id)}
      />
      
      <CardContent sx={{padding: 0, paddingBottom: "2px"}}>
        <Container>
          <Grid container spacing={1}>
            {body.map(({ field, value, colorValue = "inherit" }, index) => {
              return (
                <Grid key={index} item xs={breakpoints.xs} >
                  <Typography
                    component="h2"
                    variant="caption"
                    align="left"
                    className="bodyLabel"
                  >
                    <span style={{ fontSize: "14px" }}> <strong>{field}</strong></span>
                    <br />
                    <span style={{ color: colorValue, fontSize: "14px" }}>
                      {value === undefined
                        ? "---"
                        : formatCurrencyWithIntl(value ?? 0, intl)}
                    </span>
                  </Typography>
                </Grid>

              );
            })}
          </Grid>
        </Container>
      </CardContent>
    </Card>
  );

  return (
    <React.Fragment>
      {!header.title && renderSkeleton()}
      {header.title && renderContent()}
    </React.Fragment>
  );
};

export default DetailedHeader;
