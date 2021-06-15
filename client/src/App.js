import React, {useContext, useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form } from 'react-bootstrap';
import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom'
import 'materialize-css'
import {Loader} from "./components/Loader";
import {AuthContext} from "./context/AuthContext";
import {Navibar} from "./components/Navibar";
import {NavbarNoAuth} from "./components/NavbarNoAuth";
import {useAuth} from "./hooks/auth.hook";
import {Footer} from "./components/Footer";
import {useHttp} from "./hooks/http.hook";



function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const {loading} = useHttp()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  const [show, setShow] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if(!ready){
    return <Loader />
  }

  return (
      <AuthContext.Provider  value={{
        token, login, logout, userId, isAuthenticated
      }}>
        <Router>
          {
            (isAuthenticated  && <Navibar/>) ||
            (!isAuthenticated && <NavbarNoAuth/>)
          }
          <Container>
            {routes}
          </Container>
          {
            show &&
            <Footer/>
          }

        </Router>
      </AuthContext.Provider>
  );
}

export default App
