import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  divComment: {
    marginTop: "15px",
    marginLeft: "15px",
    display: "flex",
    flexDirection: "column",
  },
  purple: {
    top: "10px",
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  textComment: {
    marginLeft: "10px",
    borderRadius: "5px",
  },
}));
