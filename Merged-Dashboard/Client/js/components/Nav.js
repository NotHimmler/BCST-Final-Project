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
                <Link id="logo" to="/"><span id="logo">PHYSIODASHBOARD</span></Link>
                { !this.props.sessionStore.loggedIn ? <span className="log-button nav-item nav-link"><a className="text-white" href="/login">Login</a></span> : <span className="log-button nav-item nav-link"><a className="text-white" onClick={this.handleLogout} href="/">Logout</a></span>}
            </nav>
        )
    }
}

export default Nav;