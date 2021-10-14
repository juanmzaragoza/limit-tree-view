import React from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { formatCurrencyWithIntl } from "utils/formats";
import { useIntl } from "react-intl";

const CardTotal = ({
  body,
  breakPoint = 6,
}) => {
  const intl = useIntl();
return(
    <Card
      className="importsTotals"
    >
      <CardContent  className="importsTotals"> 
        <Container  className="importsTotals">
          <Grid container spacing={1}>
            {body.map(({ field, value, colorValue = "inherit" }) => {
              const line = `${field}: ${value}`;
              return (
                <Grid key={line} item xs={breakPoint}>
                  <Typography
                    component="h2"
                    variant="caption"
                    align="center"
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


};

export default CardTotal;
