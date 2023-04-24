import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#BB86FC",
    fontFamily: "Source Sans Pro",
    fontWeight: "bold",
    cursor: "pointer",
  },
  button: {
    color: "white",
    fontFamily: "Source Sans Pro",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.6s ease-in-out",
    marginLeft: 25,
    "&:hover": {
      backgroundColor: "#BB86FC",
      color: "black",
      transform: "scale(0.95)",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <AppBar color="transparent" position="static">
      <Toolbar>
        <Typography
          onClick={() => history.push("/")}
          className={classes.title}
          variant="h6"
        >
          House Price
        </Typography>

        <div className={classes.nav}>
          <Button onClick={() => history.push("/")} className={classes.button}>
            Home
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
