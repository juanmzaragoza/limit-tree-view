import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { primaryColor } from "utils/helper";
import { formatCurrencyWithIntl } from "utils/formats";
import { useIntl } from "react-intl";

const cardUseStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    padding: "5px",
    verticalAlign: "center",
  },
  cardContent: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
}));

export default function MaterialCardPartidaIndicator({ title, content }) {
  const theme = cardUseStyles();
  const intl = useIntl();
  return (
    <>
  
      <Grid container spacing={2}>
        {content?.map(({ field, value, icon }, index) => {
          return (
            <Grid item xs={4} className={theme.cardContent} key={index}>
              <Card className={theme.card}>
                <CardHeader
                  avatar={
                    icon ? (
                      <Avatar
                        aria-label="recipe"
                        sx={{ bgcolor: primaryColor, color: "white" }}
                      >
                        {icon}
                      </Avatar>
                    ) : (
                      ""
                    )
                  }
                  title={field}
                  subheader={value === undefined ? "---" :  formatCurrencyWithIntl(value, intl) }
                  titleTypographyProps={{ fontSize: "18px" }}
                  subheaderTypographyProps={{
                    fontSize: "18px",
                    marginTop: "2px",
                  }}
                />
              </Card>

            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
