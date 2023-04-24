import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Prediction from "./Pages/Prediction";
import { makeStyles } from "@material-ui/core";

const userStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = userStyles();

  return (
    <div className={classes.App}>
      <Header />
      <Switch>
        <Route exact path="/" component={Prediction} />
        {/* <Route exact path="/register" component={Register} /> */}
      </Switch>
    </div>
  );
}

export default App;
