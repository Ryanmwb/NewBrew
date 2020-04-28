import React from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useStyles from "./styles";

import styles from "../../store/styles";

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
                        <div className={classes.center}>ABV</div>
                        <div className={classes.center}>
                          {_.get(style, "abvMin")}-{_.get(style, "abvMax")}
                        </div>
                      </Grid>
                      <Grid item>
                        <div className={classes.center}>IBU</div>
                        <div className={classes.center}>
                          {_.get(style, "ibuMin")}-{_.get(style, "ibuMax")}
                        </div>
                      </Grid>
                      <Grid item>
                        <div className={classes.center}>SRM</div>
                        <div className={classes.center}>
                          {_.get(style, "srmMin")}-{_.get(style, "srmMax")}
                        </div>
                      </Grid>
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
}
