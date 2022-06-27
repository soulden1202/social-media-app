import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
    position: "fixed",
    width: "23%",
    [theme.breakpoints.down("xs")]: {
      position: "static",
      width: "inherit",
    },
    [theme.breakpoints.down("md")]: {
      width: "30%",
    },
    [theme.breakpoints.down("sm")]: {
      position: "static",
      width: "inherit",
    },
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      position: "static",
    },
  },
  sidebar: {
    [theme.breakpoints.down("xs")]: {
      position: "static",
    },
  },
}));
