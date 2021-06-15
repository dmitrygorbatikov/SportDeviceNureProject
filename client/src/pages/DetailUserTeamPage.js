import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useParams} from "react-router-dom";
import {Loader} from "../components/Loader";
import {DetailLeaderTeamCard} from "../components/DetailLeaderTeamCard";
import {DetailUserTeamCard} from "../components/DetailUserTeamCard";

export const DetailUserTeamPage = () => {
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
            {!loading && data && <DetailUserTeamCard data={data}/>}
        </div>
    )
}