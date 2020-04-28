import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
  return {
    root: {
      height: "100vh",
      padding: "0 16px",
      background: "#f5eacf",
      overflowY: "auto"
    },
    card: {
      padding: 16
    },
    center: {
      textAlign: "center",
      fontSize: 14
    },
    description: {
      marginTop: 8
    }
  };
});
