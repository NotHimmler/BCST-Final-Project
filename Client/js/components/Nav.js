import React from "react";
import { Link } from "react-router-dom";
import SessionStore from "../stores/SessionStore";

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(evt) {
        evt.preventDefault;
        SessionStore.loggedIn = false;
    }

    render() {
        return (
            <div className="row d-flex">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
                    <Link className="navbar-brand m-0 p-0" to="/">
                        <div className="d-inline-flex align-items-center justify-content-center p-1 logo">
                            <strong>Physio Dashboard</strong>
                        </div>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                        <span className="nav-item nav-link active"><Link className="text-white-50" to="/">Home</Link> <span className="sr-only">(current)</span></span>
                        { !SessionStore.loggedIn ? <span className="nav-item nav-link"><Link className="text-white-50" to="/login">Login</Link></span> : <Link to="/">Logout</Link>}
                        <span className="nav-item nav-link"><Link className="text-white-50" to="/about">About</Link></span>
                        <span className="nav-item nav-link"><Link className="text-white-50" to="/contact">Contact</Link></span>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;