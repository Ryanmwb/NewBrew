import React, { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import classNames from "classnames";

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
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

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
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <TextField
            className={classes.textField}
            variant="outlined"
            placeholder="Search Beers..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => search()}
                  />
                </InputAdornment>
              )
            }}
          />
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
                    {renderGridItem({
                      text: _.get(result, "abv", ""),
                      label: "ABV"
                    })}
                    {renderGridItem({
                      text: _.get(result, "glass.name", ""),
                      label: "Glass"
                    })}
                    {renderGridItem({
                      text: _.get(result, "servingTemperatureDisplay", ""),
                      label: "Serving Temp"
                    })}
                    {/* organic */}
                    {renderGridItem({
                      text:
                        _.get(result, "isOrganic", "") === "Y"
                          ? "Organic"
                          : null,
                      label: null,
                      Icon:
                        _.get(result, "isOrganic", "") === "Y"
                          ? () => <EcoIcon style={{ color: "green" }} />
                          : null
                    })}
                    {/* facebook */}
                    {renderGridItem({
                      text: null,
                      label: null,
                      Icon: () =>
                        returnSocialMediaIcon({
                          result,
                          searchWord: "facebook",
                          Icon: () => (
                            <FacebookIcon
                              className={classNames(
                                classes.icon,
                                classes.fbIcon
                              )}
                            />
                          )
                        })
                    })}
                    {renderGridItem({
                      text: null,
                      label: null,
                      Icon: () =>
                        returnSocialMediaIcon({
                          result,
                          searchWord: "twitter",
                          Icon: () => (
                            <TwitterIcon
                              className={classNames(
                                classes.icon,
                                classes.twitterIcon
                              )}
                            />
                          )
                        })
                    })}
                  </Grid>
                </div>
                {_.get(result, "isRetired", "") === "Y" ? (
                  <Typography variant="body1" align="left">
                    Has been retired
                  </Typography>
                ) : null}
                <Typography align="left" variant="body2">
                  {_.get(result, "description", "")}
                </Typography>
                <br />
                brewery
                <br />
                .socialAccounts(array) "link, socialMedia.name"
                {renderIngredients(result)}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );

  function renderIngredients(result) {
    const ingredientObjs = Object.values(_.get(result, "ingredients", {}));
    if (!ingredientObjs || ingredientObjs.length === 0) return;
    return (
      <div>
        <Typography variant="h6">Ingredients</Typography>
        <ul className={classes.list}>
          {ingredientObjs.map(ingredientArr =>
            ingredientArr.map(ingredient => (
              <li key={`HOME-${ingredient.id}`}>
                <Typography variant="body2">
                  {_.get(ingredient, "name", "")}
                </Typography>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }

  function returnSocialMediaIcon({ result, searchWord, Icon }) {
    const socialAccountsArr = _.get(
      result,
      "breweries[0].socialAccounts",
      []
    ).filter(account => _.get(account, "link").search(searchWord) !== -1);

    if (socialAccountsArr.length === 0) return null;

    return (
      <a
        target="_blank"
        href={_.get(socialAccountsArr, "[0].socialMedia.website", "")}
      >
        <Icon />
      </a>
    );
  }

  function renderGridItem({ text, label, Icon }) {
    if (!text && !Icon) return;
    function renderContent() {
      if (Icon)
        return (
          <div className={classes.iconCont}>
            <Icon />
          </div>
        );
      return (
        <Grid
          container
          direction="column"
          justify="flex-end"
          alignItems="center"
        >
          <Grid item className={classes.labelCont}>
            <Typography variant="overline" className={classes.label}>
              {label}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" className={classes.caption}>
              {text}
            </Typography>
          </Grid>
        </Grid>
      );
    }
    return <Grid item>{renderContent()}</Grid>;
  }
}
