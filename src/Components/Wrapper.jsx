import React, {useEffect, useState } from "react";
import supabase from "../supabase-client";
import { Navigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

function Wrapper({children}){
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const {
                data:{session}
            } = await supabase.auth.getSession();

            setAuthenticated(!!session);
            setLoading(false);
        };
        getSession();
    }, [])

    if(loading){
        return <CircularProgress color="success"/>
    } else{
        if(authenticated){
            return <>{children}</>
        }
        return <Navigate to="/login" />
    }
}

export default Wrapper;