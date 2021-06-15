import React, {useContext} from "react"
import {Button, Card} from "react-bootstrap";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const LeaderNoteCard = ({note}) => {

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const cancelRequest = async () => {
        const fetched = await request('/api/sensors/delete-leader-note', 'DELETE', null, {
            Authorization: `Bearer ${token}`,
            'noteId': note._id,
            'team': note.team
        })
        document.location.reload()
    }
    const confirmRequest = async () => {
        const fetched = await request('/api/sensors/confirm-leader-note', 'POST', null, {
            Authorization: `Bearer ${token}`,
            'team': note.team,
            'userId': note.from,
            'noteId': note._id
        })
        document.location.reload()
    }
    return(
        <>
            <div className="row" style={{marginTop: '3px'}}>
                <div className="col-xl-10">
                    <Card>
                        <Card.Body className="d-flex">
                            <p>{note.note}</p>




                        </Card.Body>
                        <Card.Text style={{textAlign: 'center'}}>
                            <small className="mb-2">{note.regDateTime}</small>
                        </Card.Text>
                    </Card>
                </div>
                <div className="col-xl-2" style={{textAlign: 'center'}}>
                    <div>
                    <Button
                        id="successLeaderBtn"
                        style={{width: '80%', marginBottom: '25px', marginTop: '2px'}}
                        variant="danger"
                        onClick={cancelRequest}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path
                                d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                        </svg>
                    </Button>
                    </div>
                    <div>
                    <Button
                        id="dangerLeaderBtn"
                        style={{width: '80%'}}
                        variant="success"
                        onClick={confirmRequest}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path
                                d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                        </svg>
                    </Button>
                    </div>
                </div>

            </div>
        </>
    )
}