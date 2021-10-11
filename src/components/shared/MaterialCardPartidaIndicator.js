import * as React from "react";
import Card from "@mui/material/Card";
import { Avatar, CardHeader, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { useIntl } from "react-intl";

import { primaryColor } from "utils/helper";
import { formatCurrencyWithIntl } from "utils/formats";
import MaterialCardAvatarContentSkeleton from "components/shared/MaterialSkeleton/MaterialCardAvatarContentSkeleton";

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

export default function MaterialCardPartidaIndicator({ title, content, loading, onUnmount = () => {} }) {
  const theme = cardUseStyles();
  const intl = useIntl();

  React.useEffect(() => {
    return () => {
      onUnmount();
    }
  },[]);

  const renderLoader = () => <MaterialCardAvatarContentSkeleton />;
  return (
    <React.Fragment>
      {title && (
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Typography variant={"h5"}>{title}</Typography>
        </Grid>
      )}
      <Grid container spacing={2}>
        {(loading || !content) && (
          <React.Fragment>
            {[...Array(3)].map((n,index) => (
              <Grid item xs={4} className={theme.cardContent} key={index}>
                { renderLoader() }
              </Grid>
            ))}
          </React.Fragment>
        )}
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
    </React.Fragment>
  );
}
