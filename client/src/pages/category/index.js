import React from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Tooltip,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import useStyles from "./styles";

import styles from "../../store/styles";
import srmColors from "../../store/srmColors";

export default function Category() {
  const classes = useStyles();
  const { categoryId } = useParams();

  console.log({ styles });

  return (
    <div className={classes.root}>
      <div>Category Name Here {categoryId}</div>
      <Grid container spacing={2}>
        {styles
          .filter(style => _.get(style, "categoryId", "") == categoryId)
          .map((style, index) => {
            return (
              <Grid key={`Category-${index}`} item xs={12}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}>
                      {_.get(style, "name", "")} {renderShortname(style)}
                    </Typography>
                    <Divider />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container justify="space-around">
                      <Grid item>
                        <div className={classes.center}>
                          ABV
                          <Tooltip title="Alcohol by Volume">
                            <HelpOutlineIcon className={classes.helpIcon} />
                          </Tooltip>
                        </div>
                        <div className={classes.center}>
                          {_.get(style, "abvMin", "")}-
                          {_.get(style, "abvMax", "")}
                        </div>
                      </Grid>
                      <Grid item>
                        <div className={classes.center}>
                          IBU
                          <Tooltip title="International Bitterness Units">
                            <HelpOutlineIcon className={classes.helpIcon} />
                          </Tooltip>
                        </div>
                        <div className={classes.center}>
                          {_.get(style, "ibuMin", "")}-
                          {_.get(style, "ibuMax", "")}
                        </div>
                      </Grid>
                      <Grid item>
                        <div className={classes.center}>
                          OG
                          <Tooltip title="Original Gravity">
                            <HelpOutlineIcon className={classes.helpIcon} />
                          </Tooltip>
                        </div>
                        <div className={classes.center}>
                          {_.get(style, "ogMin", "")}
                        </div>
                      </Grid>
                      <Grid item>
                        <div className={classes.center}>
                          FG
                          <Tooltip title="Fermented Gravity">
                            <HelpOutlineIcon className={classes.helpIcon} />
                          </Tooltip>
                        </div>
                        <div className={classes.center}>
                          {_.get(style, "fgMin", "")}-
                          {_.get(style, "fgMax", "")}
                        </div>
                      </Grid>
                      <Grid item>{renderSrm(style)}</Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          className={classes.description}
                        >
                          {_.get(style, "description", "")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );

  function renderShortname(style) {
    const name = _.get(style, "name", "");
    const shortName = _.get(style, "shortName", "");
    if (shortName && name !== shortName) return `(${shortName})`;
  }

  function renderSrm(style) {
    const srmMin = Math.round(_.get(style, "srmMin", ""));
    const srmMax = Math.round(_.get(style, "srmMax", ""));

    function renderSrmNum() {
      if (srmMin === srmMax) {
        return srmMin;
      } else {
        return `${srmMin}-${srmMax}`;
      }
    }

    return (
      <div className={classes.srmOuterCont}>
        <div className={classes.srmInnerCont}>
          <div className={classes.center}>
            SRM
            <Tooltip title="Standard Reference Method">
              <HelpOutlineIcon className={classes.helpIcon} />
            </Tooltip>
          </div>
          <div className={classes.center}>{renderSrmNum()}</div>
        </div>
        <div className={classes.colorBoxCont}>
          <div
            style={{
              backgroundColor: _.get(srmColors, `${srmMin}`, "")
            }}
            className={classes.colorBox}
          />
          {srmMin === srmMax ? null : (
            <div
              style={{
                backgroundColor: _.get(srmColors, `${srmMax}`, ""),
                borderTop: "none"
              }}
              className={classes.colorBox}
            />
          )}
        </div>
      </div>
    );
  }
}
