import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import { Form, InputGroup, Button, Modal } from 'react-bootstrap'
import {Loader} from "../components/Loader";
import {TeamsArray} from "../components/TeamsArray";
import {Link} from "react-router-dom";


export const TeamsPage = () => {
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    

    const [data, setData] = useState([])

    const getData = useCallback(async () => {
        try{
            const fetched = await request('/api/team/get-all-teams', 'GET', null, {
                Authorization: `Bearer ${token}`,
            })
            setData(fetched)

        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getData()
    }, [getData])

    const [createTeam, setCreateTeam] = useState({
        team_name: '',
        leader: '',
        description: '',
        img: '',
        users: ''
    })

    const [teamName, setTeamName] = useState('')
    const [description, setDescription] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = async () => {
        setShow(false)

    }

    const newTeam = async () => {
        try {

            let team_file = document.getElementById("team_file").files;
            if (team_file.length > 0) {
                let fileToLoad = team_file[0];

                let fileReader = new FileReader();

                fileReader.readAsDataURL(fileToLoad);

                fileReader.onload = async function (fileLoadedEvent) {
                    let srcData = fileLoadedEvent.target.result; // <--- data: base64

                    setShow(false)
                    let body = {
                        'team_name': teamName,
                        'description': description,
                        'img': srcData
                    }
                    const team = await request('/api/team/create-team', 'POST', body, {
                        Authorization: `Bearer ${token}`
                    })
                    document.location.reload()
                }
            }
            else{
                setShow(false)
                let body = {
                    'team_name': teamName,
                    'description': description,
                    'img': ""
                }
                const team = await request('/api/team/create-team', 'POST', body, {
                    Authorization: `Bearer ${token}`
                })
                document.location.reload()
            }



        }catch (e) {
        }
    }

    const handleShow = () => setShow(true);

    const [value, setValue] = useState('')

    const filteredTeams = data.filter(team => {
        return team.team_name.toLowerCase().includes(value.toLowerCase())
    })



    const auth = useContext(AuthContext)

    const userId = auth.userId



    if(loading){
        return <Loader/>
    }




    return (

    <div className="content">


        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Заполните данные</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            id="team_name"
                            size="xl"
                            type="text"
                            placeholder="..."
                            name="team_name"
                            onChange={e => setTeamName(e.target.value)}
                        />

                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            onChange={e => setDescription(e.target.value)}
                            name="description"
                            value={createTeam.value}
                        />
                        <Form.Text className="text-muted">
                            Придумайте описание своей команды
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Control id="team_file" type="file" multiple />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={newTeam}>
                    Создать
                </Button>
            </Modal.Footer>
        </Modal>

        {!loading &&
        <div className="row d-flex header-teams mt-4 mb-4">
            <div className="col-xl-2 mt-2" style={{textAlign: "center"}}>
                <span className="mt-2">Список команд</span>
            </div>
            <div className="col-xl-4 mt-2 d-flex justify-content-between">
                <Button style={{minHeight: '38px'}} variant="secondary" id="create_team" onClick={handleShow}>Создать команду</Button>
                <Link to={`/my-teams/${userId}`} style={{color: '#fff', textDecoration: 'none'}}><Button
                    variant="secondary" id="my-teams">Мои команды</Button></Link>
            </div>


            <div className="col-xl-6 mt-2">
                <Form.Group>
                    <Form.Control
                        id="team_name"
                        size="xl"
                        type="text"
                        placeholder="Введите название команды..."
                        onChange={(e) => setValue(e.target.value)}
                    />

                </Form.Group>


            </div>


        </div>
        }


        {!loading && <TeamsArray data={filteredTeams}/>}


    </div>

    )
}