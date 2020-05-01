import React, { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";

import {
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import EcoIcon from "@material-ui/icons/Eco";

import useStyles from "./styles";

export default function Home() {
  const classes = useStyles();

  const [searchText, setSearchText] = useState("bud");
  const [results, setResults] = useState([]);

  useEffect(() => {
    search();
  }, []);

  function search() {
    const axiosResponse = axios
      .post(`http://localhost:5000/apis/brew/api`, {
        route: "/search",
        query: searchText
      })
      .then(res => {
        const newResults = Array.isArray(_.get(res, "data", ""))
          ? _.get(res, "data", [])
          : [];
        setResults(newResults);
      })
      .catch(e => console.log({ e }));
  }

  console.log({ results });

  return (
    <div className={classes.root}>
      <Typography variant="h3" align="center">
        Home
      </Typography>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <FormControl>
            <InputLabel>Search Beers</InputLabel>
            <Input
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => search()}
                  />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        {results.map(result => {
          return (
            <Grid key={`HOME-${_.get(result, "id", "")}`} item xs={12}>
              <Paper className={classes.beerCont}>
                <div className={classes.beerHeader}>
                  <div className={classes.headerInnerCont}>
                    <div>
                      <Typography variant="h6">
                        {" "}
                        {_.get(result, "name", "")}
                      </Typography>
                      <Typography variant="subtitle2">
                        {" "}
                        {_.get(result, "style.name", "")}
                      </Typography>
                    </div>
                    {_.get(result, "labels.large", "") ? (
                      <div
                        className={classes.picture}
                        style={{
                          backgroundImage: `url(${_.get(
                            result,
                            "labels.large",
                            ""
                          )})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                      />
                    ) : null}
                  </div>
                  <Grid
                    container
                    justify="space-around"
                    className={classes.beerStatsCont}
                  >
                    {renderGridItem(_.get(result, "abv", ""), "ABV")}
                    {renderGridItem(
                      _.get(result, "isOrganic", "") === "Y" ? "Organic" : null,
                      null,
                      _.get(result, "isOrganic", "") === "Y"
                        ? () => <EcoIcon style={{ color: "green" }} />
                        : null
                    )}
                  </Grid>
                </div>
                <div>isOrganic: {_.get(result, "isOrganic", "")}</div>
                <div>isRetired: {_.get(result, "isRetired", "")}</div>
                <div>description: {_.get(result, "description", "")}</div>
                <div>createDate: {_.get(result, "createDate", "")}</div>
                <div>glass: {_.get(result, "glass.name", "")}</div>
                <div>description: {_.get(result, "description", "")}</div>
                <div>
                  servingTemperatureDisplay:{" "}
                  {_.get(result, "servingTemperatureDisplay", "")}
                </div>
                <br />
                brew
                <br />
                .labels.large
                <br />
                .socialAccounts(array) "link, socialMedia.name"
                <br />
                .ingredients(array) "categoryDisplay"
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );

  function renderGridItem(text, label, Icon) {
    if (!text && !Icon) return;
    function renderContent() {
      if (Icon) return <Icon />;
      return `${label}: ${text}`;
    }
    return <Grid item>{renderContent()}</Grid>;
  }
}
