import { Outlet } from "react-router-dom";
import React from "react";

import Headers from "./Headers";
export default function Layout(){
    return(
        <>
            <Headers/>
            <Outlet/>
        </>
    )
}