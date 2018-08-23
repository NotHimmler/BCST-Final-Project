import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Portfolio from "./components/Portfolio";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import About from "./components/About";
import FourOhFour from "./components/FourOhFour";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <div className="row content">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route component={FourOhFour} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));