import { Outlet } from "react-router-dom";
import { useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { fetchUserDetails } from "../store/slice/getUserSlice"
import React from "react";

const Parent = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const userId= localStorage.getItem("userId");
        if(userId){
            dispatch(fetchUserDetails(userId));
        } 
    }, []);

    return (
        <Outlet />
    );
}

export default Parent;
