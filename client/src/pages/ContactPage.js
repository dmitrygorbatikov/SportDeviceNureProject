import React from 'react'
import {Card, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

export const ContactPage = () => {

    return(
        <div className="content">
            <Card
                bg="info"
                text="white"
                className=" mt-5"

            >
                <Card.Header as="h5">Наши контакты</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Номер телефона: +380957023669 (Дмитрий)
                    </Card.Text>
                    <Card.Text>
                        Email: horbatikov.dmytro@nure.ua
                    </Card.Text>
                    <Card.Text>
                        Адресс: ул. Целиноградская, 36, кт. 513
                    </Card.Text>
                    <Card.Text>
                        Instargam: <a href={"https://www.instagram.com/isaac_newton__sw/"} style={{color: '#000'}}>@isaac_newton__sw</a>
                    </Card.Text>
                    <Card.Text>
                        Telegram: <a href="tg://resolve?domain=qweqweasdasdzxczxc123" style={{color: '#000'}}>@qweqweasdasdzxczxc123</a>
                    </Card.Text>
                    <Card.Text>
                        GitHub: <a href={"https://github.com/dmitrygorbatikov"} style={{color: '#000'}}>https://github.com/dmitrygorbatikov</a>
                    </Card.Text>

                </Card.Body>
            </Card>

        </div>
    )
}