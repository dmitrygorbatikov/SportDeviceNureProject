import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Button, Card, Col, Row, Toast} from "react-bootstrap";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {LeaderData} from "./LeaderData";
import {Loader} from "./Loader";

export const TeamCard = ({ data }) => {

    let noteMessage = "Ваш запрос был успешно отправлен"

    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)
    const [show, setShow] = useState(false);
    const [note, setNote] = useState(noteMessage)


    const addRequestToTeam = async () => {
        try{
            const fetched = await request(`/api/team/create-request-to-team?id=${data._id}`, 'POST', null, {
                Authorization: `Bearer ${token}`
            })
            noteMessage = fetched.message
            setNote(fetched.message)
            setShow(true)
            setTimeout(() => {
                document.location.reload()
            }, 2000)

        }catch (e) {
        }
    }


    const [user, setUser] = useState('')

    const getUser = useCallback(async () => {
        try{
            if(data) {
                const fetched = await request(`/api/auth/getData`, 'GET', null, {
                    Authorization: `Bearer ${token}`
                })
                setUser(fetched)
            }

        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getUser()
    }, [getUser])

    if(loading){
        return <Loader/>
    }






    return(
        <div
            aria-live="polite"
            aria-atomic="true"
            style={{
                position: 'relative',
                minHeight: '200px',
            }}
        >

                    <Card border="success" className="mt-5">
                        <Card.Header as="h5">{data.team_name}</Card.Header>

                        <Card.Body>

                            <Card.Text>
                                {data.description}
                            </Card.Text>
                            <Card.Text>
                                <strong>Количество игроков в команде: {data.users.length}</strong>
                            </Card.Text>

                                {!loading && data && <LeaderData leaderId={data.leader}/>}
                            {!loading
                            && user && user.role == "user"
                            &&
                                <Button variant="success" onClick={addRequestToTeam}>Подать заявку</Button>
                            }


                        </Card.Body>
                    </Card>

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
            >
                    <Row>
                        <Col xl={12}>
                            <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
                                <Toast.Header>

                                    <strong className="mr-auto">Уведомление</strong>
                                    <small>now</small>
                                </Toast.Header>
                                {!loading &&
                                <Toast.Body>{note}</Toast.Body>

                                    }

                            </Toast>
                        </Col>
                    </Row>

            </div>

        </div>

    )
}