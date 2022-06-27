import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    position: "fixed",
    width: "21.5%",
    top: "350px",
    [theme.breakpoints.down("xs")]: {
      position: "static",
      top: "0px",
      width: "inherit",
    },
    [theme.breakpoints.down("md")]: {
      width: "28%",
    },
    [theme.breakpoints.down("sm")]: {
      position: "static",
      top: "0px",
      width: "inherit",
    },
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
