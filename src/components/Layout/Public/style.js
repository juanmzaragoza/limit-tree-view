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
  
    backgroundColor: "transparent",
  },
  appBar: {

    background:` linear-gradient(
      90deg,
      rgba(91, 153, 154, 1) 6%,
      rgba(63, 126, 128, 1) 62%,
      rgba(68, 104, 160, 1) 100%
    )`
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
    paddingTop: "8px",
    paddingBottom: "3px",
    background:` linear-gradient(
      90deg,
      rgba(91, 153, 154, 1) 6%,
      rgba(63, 126, 128, 1) 62%,
      rgba(68, 104, 160, 1) 100%
    )`
    /*[theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing(6),
    },*/
  },

  columns: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default useStyles;
