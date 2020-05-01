import { makeStyles } from "@material-ui/core/styles";
import { fontSize } from "@material-ui/system";

export default makeStyles(theme => {
  return {
    root: {
      height: "100vh",
      background: "#e4c57a",
      textDecoration: "none"
    },
    header: {
      height: 30
    },
    subheader: {
      height: 30,
      padding: "8px 0",
      textAlign: "center"
    },
    selectedListItem: {
      background: "#8f6e1d"
    },
    selectedText: {
      color: "white"
      // color: "#f5eacf"
    },
    link: {
      color: "black"
    }
  };
});
