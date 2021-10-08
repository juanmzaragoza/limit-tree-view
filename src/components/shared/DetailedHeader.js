import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography
} from "@mui/material";
import MaterialHeaderSkeleton from "./MaterialSkeleton/MaterialHeaderSkeleton";

const DetailedHeader = ({ header, body }) => {
  const renderSkeleton = () => <MaterialHeaderSkeleton />;
  const renderContent = () => (
    <Card style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width:"100%"}}>
    <CardHeader
      title={header.title}
      subheader={header.subheader}
      titleTypographyProps={{ align: "center" }}
      subheaderTypographyProps={{
        align: "center",
      }}
      sx={{
        minHeight:"60px",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[700],
      }}
      className="tituloDetailHeader"
    />
    <CardContent>
      <Container>
        <Grid container spacing={1}>
          {body.map(({ field, value }) => {
            const line = `${field}: ${value}`;
            return (
              <Grid key={line} item xs={6}>
                <Typography
                  component="h2"
                  variant="caption"
                  align="left"
                  className="bodyLabel"
                >
                  {line}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </CardContent>
  </Card>
    
  );

  return <React.Fragment>
    {!header.title && renderSkeleton()}
    {header.title && renderContent()}
  </React.Fragment>
}

export default DetailedHeader;