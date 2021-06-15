import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Navbar, Nav, Modal} from 'react-bootstrap'
import {Email} from "./Email";
import {Loader} from '../components/Loader';
import {NotesList} from "./NotesList";

export const Navibar = () => {

    const {loading, request} = useHttp()
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {token} = useContext(AuthContext)
    const [data, setData] = useState('')

    const getData = useCallback(async () => {
        try{
            const fetched = await request('/api/auth/getData', 'GET', null, {
                Authorization: `Bearer ${token}`,
            })
            setData(fetched)

        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getData()
    }, [getData])

    const [notes, setNotes] = useState('')

    const getNotes = useCallback(async () => {
        try{
            const fetched = await request('/api/sensors/get-user-notes', 'GET', null, {
                Authorization: `Bearer ${token}`,
            })
            setNotes(fetched)

        } catch (e) {
        }
    }, [token, request])


    useEffect(() => {
        getNotes()
    }, [getNotes])

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const [lgShow, setLgShow] = useState(false);


    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    if(loading){
        return <Loader />
    }
    return(
        <>


            <Navbar className="bg-dark" expand="xl" variant="dark">
                <Navbar.Brand href="#home">Sport Device</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link><>{!loading && data && <Email data={data}/>}</></Nav.Link>
                        <Nav.Link onClick={handleShow}>
                                <svg style={{display: `${!loading && notes && notes.length > 0 ? 'none':'block'}`}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     className="bi bi-bell" viewBox="0 0 16 16">
                                    <path
                                        d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                </svg>
                                <svg style={{color: 'red', display: `${!loading && notes && notes.length > 0 ? 'block':'none'}`}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-bell-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                                </svg>
                        </Nav.Link>
                        <Nav.Link href="/">Главная</Nav.Link>
                        <Nav.Link href="/contact">Контакты</Nav.Link>
                        <Nav.Link href="/products">Товары</Nav.Link>
                        <Nav.Link href="/profile">Профиль</Nav.Link>
                        <Nav.Link href="/teams">Команды</Nav.Link>
                        <Nav.Link href="/" onClick={logoutHandler}>Выход</Nav.Link>



                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title  id="example-modal-sizes-title-lg">
                        Уведомления
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        !loading && <NotesList notes={notes} />
                    }
                </Modal.Body>
            </Modal>
            </>

    )
}