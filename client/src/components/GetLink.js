import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export const GetLink = ({ data}) => {
const {userId} = useContext(AuthContext)

    return(
<div>{data.leader}</div>
    )
}