import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";

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

  const routes = [
    {
      path: "/",
      text: "Home",
      icon: () => <InboxIcon />
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
          >
            <ListItem button>
              {route.icon ? (
                <ListItemIcon>
                  <route.icon />
                </ListItemIcon>
              ) : null}
              <ListItemText primary={_.get(route, "text", "")} />
            </ListItem>
          </Link>
        );
      })}
      <Divider />
      <ListItem>
        <ListItemText primary={"Categories"} />
      </ListItem>
      {categories.map((category, index) => {
        return (
          <Link
            key={`Sidebar-categories-${index}`}
            to={`/category/${_.get(category, "id", "")}`}
            style={{ textDecoration: "none" }}
          >
            <ListItem
              button
              style={
                categoryId == _.get(category, "id", "")
                  ? { background: "#A85839" }
                  : {}
              }
              className={classes.subheader}
            >
              <ListItemText secondary={category.name} />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
}
