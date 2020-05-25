import React, { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import classNames from "classnames";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import EcoIcon from "@material-ui/icons/Eco";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useData from "./data";
import useStyles from "./styles";

export default function Home() {
  const classes = useStyles();
  const data = useData();

  const [searchText, setSearchText] = useState("busch");
  const [results, setResults] = useState([]);
  const [didSetState, setDidSetState] = useState(false);

  // client.writeData({ data: { visibilityFilter: "value here" } });
  console.log({ data });

  useEffect(() => {
    search();
    // data.client.writeData({ data: { visibilityFilter: "value here" } });
    setDidSetState(true);
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

  // onClick={() => client.writeData({ data: { visibilityFilter: filter } })}
  // active={data.visibilityFilter === filter}

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
                      <Typography variant="h6" className={classes.beerName}>
                        {" "}
                        {_.get(result, "name", "")}
                      </Typography>
                      <Typography variant="subtitle2">
                        {" "}
                        {_.get(result, "style.name", "")}
                      </Typography>
                    </div>
                    {/* social media here */}
                    <div className={classes.socialMediaCont}>
                      <Grid container spacing={2} justify="flex-end">
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

                        {/* twitter */}
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
                  </div>
                  <Grid
                    container
                    justify="flex-start"
                    spacing={4}
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
                    {renderGridItem({
                      text: _.get(result, "available.name", ""),
                      label: "Availability"
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
                  </Grid>
                </div>
                {_.get(result, "isRetired", "") === "Y" ? (
                  <Typography variant="body1" align="left">
                    Has been retired
                  </Typography>
                ) : null}
                <Typography
                  align="left"
                  variant="body2"
                  className={classes.description}
                >
                  {_.get(result, "description", "")}
                </Typography>
                {renderIngredients(result)}
                {renderBreweryInfo(result)}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );

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

  function renderIngredients(result) {
    const ingredientObjs = Object.values(_.get(result, "ingredients", {}));
    if (!ingredientObjs || ingredientObjs.length === 0) return;
    return (
      <div className={classes.ingredientsCont}>
        <Typography variant="overline">Ingredients</Typography>
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

  function renderBreweryInfo(result) {
    const brewery = _.get(result, "breweries[0]", "");
    if (!brewery) return;

    const rows = [
      {
        label: "Status:",
        content:
          _.get(brewery, "isInBusiness", "") === "Y" ? "Operational" : "Defunct"
      },
      {
        label: "Ownership:",
        content:
          _.get(brewery, "isMassOwned", "") === "Y"
            ? "Publicly Owned"
            : "Privately Owned"
      },
      {
        label: "Guilds:",
        content: _.get(brewery, "guilds", []).map(guild => (
          <li>{_.get(guild, "name", "")}</li>
        ))
      }
    ];

    const locations = _.get(brewery, "locations", []);

    return (
      <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Brewery</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>
          <Typography variant="caption" display="block" gutterBottom>
            {_.get(brewery, "description", "")}
          </Typography>
          <Typography variant="h6">Details</Typography>

          <Table size="small" className={classes.table}>
            <TableBody>
              {rows.map(row => (
                <TableRow>
                  <TableCell>{row.label}</TableCell>
                  <TableCell>{row.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography variant="h6">Locations</Typography>
          <Table size="small" className={classes.table}>
            <TableBody>
              {rows.map(row => (
                <TableRow>
                  <TableCell>{row.label}</TableCell>
                  <TableCell>{row.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
