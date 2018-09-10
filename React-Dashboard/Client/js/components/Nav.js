import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(evt) {
        evt.preventDefault;
        this.props.sessionStore.setLoggedIn(false);
    }

    render() {
        return (
            <nav id="topnav" className="navbar navbar-expand navbar-light">
                <a id="logo" href="#">PHYSIODASHBOARD</a>
            </nav>
        )
    }
}

export default Nav;