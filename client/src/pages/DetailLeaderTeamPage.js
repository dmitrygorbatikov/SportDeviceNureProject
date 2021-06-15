import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useParams} from 'react-router-dom'
import {Loader} from "../components/Loader";
import {DetailLeaderTeamCard} from "../components/DetailLeaderTeamCard";

export const DetailLeaderTeamPage = () => {

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [data, setData] = useState('')
    const teamId = useParams().id


    const getData = useCallback(async () => {
        try{
            const fetched = await request(`/api/team/${teamId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setData(fetched)

        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getData()
    }, [getData])

    if(loading){
        return <Loader/>
    }

    return(
        <div className="content">
            {!loading && data && <DetailLeaderTeamCard data={data}/>}
        </div>
    )
}
