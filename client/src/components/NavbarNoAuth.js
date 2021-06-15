import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'


export const NavbarNoAuth = () => {
    return(
        <Navbar className="bg-dark" expand="xl" variant="dark" id="no_auth_navbar">
            <Navbar.Brand>Sport Device</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="/">Главная</Nav.Link>
                    <Nav.Link href="/contact">Контакты</Nav.Link>
                    <NavDropdown title="Авторизоваться" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/signin">Вход</NavDropdown.Item>
                        <NavDropdown.Item href="/register">Регистрация</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}