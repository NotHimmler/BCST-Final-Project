import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand m-0 p-0" to="/">
                        <div onMouseLeave={this.handleMouseLeave} onMouseEnter={this.handleMouseEnter} className="d-inline-flex align-items-center justify-content-center p-1 logo">
                            <strong>Physio Dashboard</strong>
                        </div>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                        <span className="nav-item nav-link active"><Link className="text-white-50" to="/">Home</Link> <span className="sr-only">(current)</span></span>
                        <span className="nav-item nav-link"><Link className="text-white-50" to="/login">Login</Link></span>
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