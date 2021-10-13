import * as React from "react";
import Card from "@mui/material/Card";
import {
  Avatar,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { primaryColor } from "utils/helper";
import { formatCurrencyWithIntl } from "utils/formats";
import { useIntl } from "react-intl";
import MaterialCardAvatarContentSkeleton from "./MaterialSkeleton/MaterialCardAvatarContentSkeleton";

const cardUseStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  cardContent: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  cardHeader: {
    backgroundColor: "rgba(58, 145, 152, 0.20)",
  },
  avatar: {
    alignContent: "center",
  },
}));

export default function MaterialCardIndicator({
  title,
  content,
  icon,
  xs,
  loading,
  onUnmount = () => {},
}) {
  const theme = cardUseStyles();
  const intl = useIntl();

  React.useEffect(() => {
    return () => {
      onUnmount();
    };
  }, []);

  const renderLoader = () => <MaterialCardAvatarContentSkeleton />;
  return (
    <React.Fragment>
      {(loading || !content) && (
        <React.Fragment>
          {[...Array(3)].map((n, index) => (
            <Grid item xs={4} className={theme.cardContent} key={index}>
              {renderLoader()}
            </Grid>
          ))}
        </React.Fragment>
      )}
      {content?.map(({ title, indicators, lg, icon }, index) => {
        return (
          <Grid item xs={12} className={theme.cardContent} key={index}>
            <Card className={theme.card}>
              <CardHeader
                avatar={
                  icon ? (
                    <>
                      <Avatar
                        aria-label="recipe"
                        sx={{ bgcolor: primaryColor, color: "white" }}
                        className={theme.avatar}
                      >
                        {icon}
                      </Avatar>
                    </>
                  ) : (
                    ""
                  )
                }
                title={title}
                titleTypographyProps={{ fontSize: "20px" }}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{
                  minHeight: "60px",
                }}
                className={theme.cardHeader}
              />

              <CardContent>
                <Grid container spacing={2}>
                  {indicators?.map(({ field, value }, index) => {
                    return (
                      <Grid item xs={lg} key={index}>
                        {field}: <br />
                        <strong>
                          {value === undefined
                            ? "---"
                            : formatCurrencyWithIntl(value, intl)}
                        </strong>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </React.Fragment>
  );
}
