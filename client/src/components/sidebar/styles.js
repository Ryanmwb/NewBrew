import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
  return {
    root: {
      height: "100vh",
      background: "#ceb793",
      textDecoration: "none"
    },
    header: {
      height: 30
    },
    subheader: {
      height: 30,
      textAlign: "center"
    }
  };
});
