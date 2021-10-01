import {createStyles, makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => createStyles({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBarHome: {
    backdropFilter: "blur(20px)",
    position: "fixed",
    backgroundColor: "transparent",
  },
  appBar: {
    position: "fixed",
    // background: `url(${Header}) no-repeat right`,
    backgroundColor: "#111",
  },
  toolbar: {},
  toolbarTitle: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  link: {
    //margin: theme.spacing(1, 1),
    margin: "1px",
    fontWeight: "bolder",
    letterSpacing: 1,
    color: "white",
    /*[theme.breakpoints.down("xs")]: {
      display: "none",
    },*/
  },
  linkAccess: {
    //margin: theme.spacing(1, 1.5),
    margin: "1px",
    fontWeight: "bolder",
    letterSpacing: 1,
    color: "white",
    border: "1px solid white",
    boxShadow: "0px 0px 5px 0px #white",
  },
  footer: {
    /*marginTop: theme.spacing(0),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),*/
    marginTop: "0px",
    paddingTop: "3px",
    paddingBottom: "3px",
    backgroundColor: "#111111",
    /*[theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing(6),
    },*/
  },
  columns: {
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default useStyles;
