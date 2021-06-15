import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {Button, Card} from "react-bootstrap";
import {UserTeamsPage} from "./UserTeamsPage";
import {LeaderTeamsPage} from "./LeaderTeamsPage";

export const MyTeamsPage = () => {
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const [user, setUser] = useState('')

    const getUser = useCallback(async () => {
        try{
            const fetched = await request('/api/auth/getData', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(fetched)

        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getUser()
    }, [getUser])

    const [leaderTeams, setLeaderTeams] = useState([])

    const getLeaderTeams = useCallback(async () => {
        try {
            const fetched = await request('/api/team/get-leader-teams', 'GET', null, {
                Authorization: `Bearer ${token}`,
            })
            setLeaderTeams(fetched)

        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getLeaderTeams()
    }, [getLeaderTeams])


    const [userTeams, setUserTeams] = useState([])
    const getUserTeams = useCallback(async () => {
        try {
            const fetched = await request('/api/team/get-user-teams', 'GET', null, {
                Authorization: `Bearer ${token}`,
            })
            setUserTeams(fetched)

        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getUserTeams()
    }, [getUserTeams])

    let data = user.role && user.role == "user" ? userTeams: leaderTeams

    if(loading){
        return <Loader/>
    }


    return(
        <div className="content">
            {
                (!loading && data == userTeams && <UserTeamsPage data={data}/>)
                ||
                (!loading && data == leaderTeams && <LeaderTeamsPage data={data}/>)
            }
        </div>
    )
}