import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { primaryColor } from "utils/helper";

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
  return (
    <>
      {title && (
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Typography variant={"h5"}>{title}</Typography>
        </Grid>
      )}
      <Grid container spacing={2}>
        {content.map(({ field, value, icon }, index) => {
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
                  subheader={value}
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