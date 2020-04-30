import React, { useContext } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import classNames from "classnames";

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import _ from "lodash";
import InboxIcon from "@material-ui/icons/Inbox";

import useStyles from "./styles";
import { CategoriesContext } from "../../contexts/categories";

export default function Sidebar() {
  const classes = useStyles();
  const { categories } = useContext(CategoriesContext);
  const { categoryId } = useParams();
  const match = useRouteMatch("/");

  const routes = [
    {
      path: "/",
      text: "Home",
      icon: props => {
        return <InboxIcon className={_.get(props, "className", "")} />;
      }
    }
  ];

  return (
    <List className={classes.root}>
      {routes.map((route, index) => {
        return (
          <Link
            key={`Sidebar-${index}`}
            to={_.get(route, "path", "")}
            style={{ textDecoration: "none" }}
            className={classes.link}
          >
            <ListItem
              button
              className={classNames({
                [classes.selectedListItem]: _.get(match, "isExact", "")
              })}
            >
              {route.icon ? (
                <ListItemIcon>
                  <route.icon
                    className={classNames({
                      [classes.selectedText]: _.get(match, "isExact", "")
                    })}
                  />
                </ListItemIcon>
              ) : null}
              <ListItemText
                primary={_.get(route, "text", "")}
                className={classNames({
                  [classes.selectedText]: _.get(match, "isExact", "")
                })}
              />
            </ListItem>
          </Link>
        );
      })}
      <Divider />
      <ListItem>
        <ListItemText primary={"Categories"} />
      </ListItem>
      {categories.map((category, index) => {
        console.log("test", categoryId == _.get(category, "id", ""));
        return (
          <Link
            key={`Sidebar-categories-${index}`}
            to={`/category/${_.get(category, "id", "")}`}
            style={{ textDecoration: "none" }}
          >
            <ListItem
              button
              className={classNames(classes.subheader, {
                [classes.selectedListItem]:
                  categoryId == _.get(category, "id", "")
              })}
            >
              <ListItemText
                secondary={
                  <span
                    className={classNames(classes.subheader, {
                      [classes.selectedText]:
                        categoryId == _.get(category, "id", "")
                    })}
                  >
                    {category.name}
                  </span>
                }
              />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
}
