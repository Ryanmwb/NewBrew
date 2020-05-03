import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
  return {
    root: {
      height: "100vh",
      padding: 16,
      overflow: "auto",
      background: "#edd8a5"
    },
    textField: {
      background: "white",
      borderRadius: 4
    },
    beerCont: {
      background: "#f5eacf",
      borderRadius: 3,
      padding: 16
    },
    beerHeader: {
      borderRadius: 3,
      marginBottom: 8,
      padding: 8
    },
    headerInnerCont: {
      display: "flex"
    },
    beerName: {
      lineHeight: 1.2
    },
    socialMediaCont: {
      marginLeft: "auto"
    },
    iconCont: {
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    icon: {
      height: 32,
      width: 32,
      cursor: "pointer"
    },
    fbIcon: {
      color: "#1673eb"
    },
    twitterIcon: {
      color: "#1ea1f3"
    },
    picture: {
      height: 80,
      width: 80
    },
    beerStatsCont: {
      marginTop: 4
    },
    labelCont: {
      marginBottom: -8
    },
    label: {
      fontSize: 10,
      color: "rgba(0,0,0,0.7)"
    },
    caption: {
      fontSize: 14
    },

    ingredientsCont: {
      marginTop: 16
    },
    description: {
      textIndent: 30
    },
    list: {
      margin: 0
    },
    panel: {
      marginTop: 16,
      background: "#f9f3e4"
    },
    panelDetails: {
      display: "block"
    },
    table: {
      marginBottom: 16
    }
  };
});
