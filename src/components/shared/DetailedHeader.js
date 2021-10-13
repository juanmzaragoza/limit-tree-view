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

const DetailedHeader = ({
  header,
  body,
  colorBack,
  icon,
  iconColor,
  breakPoint = 6,
}) => {
  const intl = useIntl();
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
          <>
            <Avatar
              aria-label="recipe"
              sx={{ bgcolor: iconColor, color: "white" }}
            >
              {icon}
            </Avatar>
          </>
        }
        title={header.title}
        subheader={header.subheader}
        titleTypographyProps={{ align: "center" }}
        subheaderTypographyProps={{
          align: "center",
        }}
        sx={{
          maxHeight: "60px",
          backgroundColor: colorBack,
        }}
        className="tituloDetailHeader"
      />
      <CardContent sx={{padding: 0, paddingBottom: "2px"}}>
        <Container>
          <Grid container spacing={1}>
            {body.map(({ field, value, colorValue = "inherit" }) => {
              const line = `${field}: ${value}`;
              const size = colorValue !== "inherit" ? "20px" : "";
              return (
                <Grid key={line} item xs={breakPoint}>
                  <Typography
                    component="h2"
                    variant="caption"
                    align="left"
                    className="bodyLabel"
                  >
                    <span style={{ fontSize: "14px" }}> <strong>{field}</strong></span>
                    <br />
                    <span style={{ color: colorValue, fontSize: size }}>
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
