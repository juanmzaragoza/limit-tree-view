import React from "react";
import { Route } from "react-router";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useAuth } from "contexts/AuthContext";
import useStyles from "./style";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const classes = useStyles();
  const { loading, isAuthenticated, logout } = useAuth();

  React.useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
  }, [loading, isAuthenticated]);

  const footers = [
    {
      title: `Compañía`,
      description: [
        { name: `Nosotros`, link: "#" },
        { name: `Servicios`, link: "#" },
        {
          name: `Contacto`,
          isAnchorTag: true,
          link: "mailto:juanmanuelzar@gmail.com",
        },
      ],
    },
    {
      title: `Legal`,
      description: [
        { name: `Política de privacidad`, link: "#" },
        { name: `Términos de uso`, link: "#" },
        { name: `Política de cookies`, link: "#" },
      ],
    },
  ];

  return (
    isAuthenticated && (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Limit - Estudio de Proyectos
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          component={"main"}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            minHeight: "85vh",
            overflow: "auto",
          }}
        >
          <div>
            <Route
              path={path}
              render={(props) => <Component {...props} />}
              {...rest}
            />
          </div>
        </Box>
        <div className={classes.footer}>
          <Grid container justify="space-evenly" className={classes.container}>
            {footers.map((footer) => (
              <Grid
                item
                xs={12}
                sm={6}
                key={footer.title}
                className={classes.columns}
              >
                <ul className={classes.columns}>
                  <li>
                    <Typography
                      variant="h6"
                      style={{ color: "white" }}
                      gutterBottom
                    >
                      {footer.title}
                    </Typography>
                  </li>
                  {footer.description.map((item) => (
                    <li key={item.name}>
                      {item.isAnchorTag ? (
                        <Link
                          variant="subtitle2"
                          style={{ color: "white" }}
                          href={`${item.link}?Subject=Ayuda`}
                          target="_top"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <Link
                          variant="subtitle2"
                          style={{ color: "white" }}
                          rel="noopener noreferrer"
                          {...{ component: NavLink, to: item.link }}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
        </div>
      </React.Fragment>
    )
  );
};

export default PrivateRoute;
