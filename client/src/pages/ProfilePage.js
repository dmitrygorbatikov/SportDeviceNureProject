import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import { Navbar, Nav, Card, Button, Form} from 'react-bootstrap'
import {Loader} from "../components/Loader";
import {useAuth} from "../hooks/auth.hook";
import {Profile} from "../components/Profile"

export const ProfilePage = () => {

    const {ready} = useAuth()

    const {loading, request} = useHttp()
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {token} = useContext(AuthContext)
    const [data, setData] = useState('')
    const {userId} = useContext(AuthContext)


    const getData = useCallback(async () => {
        try{
            const fetched = await request('/api/auth/getData', 'GET', null, {
                Authorization: `Bearer ${token}`,
                userId: userId
            })
            setData(fetched)

        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getData()
    }, [getData])



    const editHandler = () => {
        let change_user_name = document.getElementById('change_user_name')
        let change_user_surname = document.getElementById('change_user_surname')
        change_user_name.style.display = 'block'
        change_user_surname.style.display = 'block'
        let edit_button_user_data = document.getElementById('edit_button_user_data')
        edit_button_user_data.style.display = 'none'
        let cancel_edit_user_data = document.getElementById('cancel_edit_user_data')
        let delete_user_img = document.getElementById('delete_user_img')
        cancel_edit_user_data.style.display = "block"
        let exampleFormControlFile1 = document.getElementById('exampleFormControlFile1')

        if(data.user_img == " "){
            exampleFormControlFile1.style.display = "block"
            delete_user_img.style.display = "none"
        }
        else{
            exampleFormControlFile1.style.display = "none"
            delete_user_img.style.display = "block"

        }



    }
    const cancelHandler = () => {
        let change_user_name = document.getElementById('change_user_name')
        let change_user_surname = document.getElementById('change_user_surname')
        change_user_name.style.display = 'none'
        change_user_surname.style.display = 'none'
        let edit_button_user_data = document.getElementById('edit_button_user_data')
        edit_button_user_data.style.display = 'block'
        let exampleFormControlFile1 = document.getElementById('exampleFormControlFile1')
        let cancel_edit_user_data = document.getElementById('cancel_edit_user_data')
        exampleFormControlFile1.style.display = "none"
        cancel_edit_user_data.style.display = "none"
        let input_user_name = document.getElementById('input_user_name')
        let save_user_name = document.getElementById('save_user_name')
        let input_user_surname = document.getElementById('input_user_surname')
        let save_user_surname = document.getElementById('save_user_surname')
        let delete_user_img = document.getElementById('delete_user_img')

        input_user_name.style.display = "none"
        save_user_name.style.display = "none"
        input_user_surname.style.display = "none"
        save_user_surname.style.display = "none"
        delete_user_img.style.display = "none"



    }

    

    


    return(
<Card className="mt-5 content">
  <Card.Body>
    <Card.Title>Ваши личные данные</Card.Title>
    <Card.Text>
      <>
        {<Profile data={data}/>}
      </>
    </Card.Text>
      <Button variant="primary" id="edit_button_user_data" className="mt-5" onClick={editHandler}>Редактировать профиль</Button>
      <Button variant="primary" id="cancel_edit_user_data" className="mt-5" onClick={cancelHandler}>Отменить</Button>
    <Form>
  
</Form>
  </Card.Body>
</Card>

    )
}