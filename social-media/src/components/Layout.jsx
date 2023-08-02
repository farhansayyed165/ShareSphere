import { Outlet, useLocation } from "react-router-dom";
import React from "react";

import Headers from "./Headers";
export default function Layout(){
    const path = useLocation().pathname.split("/")[1]
    const renderHeaders = (path== 'signup' || path=='login') ? false : true
    return(
        <>
            {renderHeaders && <Headers/>}
            <Outlet/>
        </>
    )
}