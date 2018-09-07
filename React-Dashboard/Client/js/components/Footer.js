import React from "react";
import Link from "../../../node_modules/react-router-dom/Link";

class Footer extends React.Component {
    render() {
        return (
            <div className="row bg-dark text-white-50">
                <div className="row w-100 d-flex justify-content-around">
                <div>
                    <Link className="m-1 text-light" to="/">Home</Link>
                    <Link className="m-1 text-light"  to="/blog">Blog</Link>
                    <Link className="m-1 text-light"  to="/about">About</Link>
                    <Link className="m-1 text-light"  to="/contact">Contact</Link>
                </div>
                </div>
                <div className="row w-100 d-flex justify-content-around">
                Copyright University of Sydney {(new Date(Date.now())).getFullYear()}
                </div>
            </div>
        )
    }
}

export default Footer;