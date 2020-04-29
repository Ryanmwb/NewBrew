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
    helpIcon: {
      height: 14,
      width: 14,
      marginBottom: "auto",
      marginLeft: 4
    },
    description: {
      marginTop: 8
    },
    colorBoxCont: {
      marginLeft: 8
    },
    colorBox: {
      height: 24,
      width: 24,
      border: "1px solid black"
    },
    srmOuterCont: {
      display: "flex",
      alignItems: "center"
    }
  };
});
