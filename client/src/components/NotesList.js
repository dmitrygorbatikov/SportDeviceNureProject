import React, {useContext} from "react"
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";
import {Button, Card} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";
import {LeaderNoteCard} from "./LeaderNoteCard";
import {UserNoteCard} from "./UserNoteCard";

export const  NotesList = ({notes}) => {
    const {loading, request} = useHttp()
    const {token, userId} = useContext(AuthContext)
    if(notes.length == 0){
        return(
            <p>У вас пока что нет уведомлений</p>
        )
    }

    if(loading){
        return <Loader/>
    }
    return(
        <>
            {
                !loading && notes && notes.map(note => {
                    if(note.leader == userId){
                        return (
                            <LeaderNoteCard note={note}/>
                        )
                    }
                    else{
                        return (
                            <UserNoteCard note={note}/>
                        )
                    }
                })
            }
        </>
    )
}