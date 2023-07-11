import { Link } from "react-router-dom";
import React from "react";

export default function Headers(){
    return(
        <header>
            <Link className="site-logo" to={"/"}>Socu</Link>
            <nav>
                <Link to={"/login"}>Login</Link>
                <Link to={"/signup"}>Signup</Link>
            </nav>
        </header>
    )
}