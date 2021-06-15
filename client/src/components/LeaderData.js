import React, {useCallback, useContext, useEffect, useState} from "react"
import {Button, Card} from "react-bootstrap";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "./Loader";


export const LeaderData = ({leaderId}) => {

    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)

    const [leader, setLeader] = useState('')

    const getLeader = useCallback(async () => {
        try{
                const fetched = await request(`/api/auth/get-leader?id=${leaderId}`, 'GET', null, {
                    Authorization: `Bearer ${token}`
                })
                setLeader(fetched)
        } catch (e) {
        }
    }, [token, request])


    useEffect(() => {
        getLeader()
    }, [getLeader])

    if(loading){
        return <Loader/>
    }

    return(
        <>
            <Card.Text>
                Капитан команды: {leader.user_name} {leader.surname}
            </Card.Text>
            <Card.Text>
                Email для связи: {leader.email}
            </Card.Text>
        </>
    )
}