import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import _ from "lodash";

import useStyles from "./styles";
import { CategoriesContext } from "../../contexts/categories";

export default function Home() {
  const classes = useStyles();
  const categories = useContext(CategoriesContext);

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
      {categories.map(category => {
        return (
          <ListItem button className={classes.subheader}>
            <ListItemText secondary={category.name} />
          </ListItem>
        );
      })}
    </List>
  );
}
