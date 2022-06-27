import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  paper: {
    width: "40%",
    marginLeft: "30%",
    marginTop: "5%",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      marginLeft: "5%",
    },
  },

  paperloading: {
    width: "40%",
    height: "15%",
    marginTop: "5%",
    marginLeft: "30%",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      marginLeft: "5%",
    },
  },
  divLoading: {
    textAlign: "center",
    width: "100%",
    height: "100%",
  },

  card: {
    width: "100%",
  },
  modal: {
    overflow: "scroll",
  },
  purple: {
    top: "10px",
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  container: {
    paddingTop: "20px",
    paddingLeft: "10px",
    flexDirection: "row",
    display: "flex",
  },
  title: {
    padding: "10px 0px 10px 16px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },

  closeIcon: {
    margin: "20px 0px 0px 10px",
    borderRadius: "5px",
    width: "50px",
    height: "40px",
    alignItems: "center",
    justifyItems: "center",
    display: "flex",
    flexDirection: "row",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backgroundBlendMode: "darken",
    },
  },
  buttons: {
    width: "100%",
    textAlign: "center",
    padding: "0.5rem 0",
    borderTop: "2px solid rgba(255, 255, 255)",
    borderBottom: "2px solid rgba(255, 255, 255)",
  },
}));
