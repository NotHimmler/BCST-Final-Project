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
                { !this.props.sessionStore.loggedIn ? <span className="nav-item nav-link"><Link className="text-white" to="/login">Login</Link></span> : <span className="nav-item nav-link"><Link className="text-white" onClick={this.handleLogout} to="/">Logout</Link></span>}
            </nav>
        )
    }
}

export default Nav;