import React, {useContext} from "react"
import {Button, Card} from "react-bootstrap";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "./Loader";

export const UserNoteCard = ({note}) => {

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const deleteNote = async () => {
        const fetched = await request('/api/sensors/delete-user-note', 'DELETE', null, {
            Authorization: `Bearer ${token}`,
            'team': note.team,
            'noteId': note._id
        })
        document.location.reload()
    }
    if(loading){
        return <Loader/>
    }
    return(
        <>
            <div className="row mb-2">
                <div className="col-xl-10">
                    <Card>
                        <Card.Body className="d-flex">
                            <Card.Text>{note.note}</Card.Text>


                        </Card.Body>
                        <Card.Text style={{textAlign: 'center'}}>
                            <small className="mb-2">{note.regDateTime}</small>
                        </Card.Text>
                    </Card>
                </div>
                <div className="col-xl-2" style={{textAlign: 'center'}}>
                    <Button
                        id="deleteUserNote"
                        style={{width: '80%', height: '80%'}}
                        variant="danger"
                        onClick={deleteNote}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path
                                d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                        </svg>
                    </Button>

                </div>

            </div>

        </>
    )
}