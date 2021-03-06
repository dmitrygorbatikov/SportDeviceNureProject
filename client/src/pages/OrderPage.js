import React, {useCallback, useContext, useEffect, useState} from "react"
import {Col, Form, Row, Button, Modal} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useHistory, useParams} from "react-router-dom";
import {Loader} from "../components/Loader";

export const OrderPage = () => {
    const history = useHistory()
    const {token} = useContext(AuthContext)
    const {loading, request} = useHttp()
    const [product, setProduct] = useState([])
    const prodId = useParams().id

    const getProduct = useCallback(async () => {
        try{
            const fetched = await request(`/api/products/get-product?id=${prodId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setProduct(fetched)
        } catch (e) {
        }
    }, [token, request])

    const [user, setUser] = useState('')
    const {userId} = useContext(AuthContext)


    const getUser = useCallback(async () => {
        try{
            const fetched = await request('/api/auth/getData', 'GET', null, {
                Authorization: `Bearer ${token}`,
                userId: userId
            })
            setUser(fetched)

        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getUser()
        getProduct()
    }, [getProduct, getUser])
    const [phone,setPhone] = useState('')
    const [city,setCity] = useState('')
    const [address,setAddress] = useState('')
    const [message,setMessage] = useState('')


    const [order,setOrder] = useState('')


    const createOrder = async (e) => {
        e.preventDefault()
        let body = {
            user_name: user.user_name,
            user_surname: user.surname,
            phone: phone,
            city: city,
            address: address,
            productId: prodId,
            product_name: product.name,
            message: message,
            price: product.price
        }
        const fetched = await request('/api/products/create-order', 'POST', body, {
            Authorization: `Bearer ${token}`
        })
        setOrder(fetched)
        setShow(true)

    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        history.push('/products')
    }

    if(loading){
        return <Loader/>
    }



    return(
        <div className="content">
            <div className="row">
                <div className="col-xl-11">
                    <h1>?????????? ???????????? "{product.name}"</h1>
                </div>
                <div className="col-xl-1">
                    <Button className="mt-2" variant="warning" onClick={() => {
                        history.push(`/product/${prodId}`)
                    }}>??????????</Button>
                </div>
            </div>


            <Form>
                <Form.Row>
                    <Form.Group>
                        <Form.Label>
                            ?????????????? ????????????
                        </Form.Label>
                        <Form.Text style={{color: 'red'}}>
                            * - ??????????????????????
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>

                        <Form.Label>??????</Form.Label>
                        <Form.Control type="text" placeholder="?????????????? ??????.." disabled value={user.user_name}/>
                    </Form.Group>

                    <Form.Group as={Col}>

                        <Form.Label>??????????????</Form.Label>
                        <Form.Control type="text" placeholder="?????????????? ??????????????.." disabled value={user.surname}/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{color: 'red'}}>
                            *
                        </Form.Label>
                        <Form.Label>??????????????</Form.Label>
                        <Form.Control id="orderPhone" type="text" placeholder="?????????????? ?????????? ????????????????.." onChange={e => setPhone(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label style={{color: 'red'}}>
                            *
                        </Form.Label>
                        <Form.Label>??????????</Form.Label>
                        <Form.Control id="orderCity" placeholder="?????????????? ?????? ??????????.." onChange={e => setCity(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label style={{color: 'red'}}>
                            *
                        </Form.Label>
                        <Form.Label>????????????</Form.Label>
                        <Form.Control id="orderAddress" placeholder="?????????????? ?????? ????????????.." onChange={e => setAddress(e.target.value)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>??????????????????</Form.Label>
                        <Form.Control id="orderMessage" as="textarea" rows={9} type="text" placeholder="?????????????? ?????????????????? ?????????????????? ?????? ??????????????????.." onChange={e => setMessage(e.target.value)}/>
                    </Form.Group>
                </Form.Row>

                <Button
                    variant="success"
                    style={{marginBottom: '49px'}}
                    onClick={createOrder}
                >
                    ???????????????? ??????????
                </Button>
            </Form>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                    {!loading && order &&
                    <Modal.Body>?????? ?????????? <strong>???{order}</strong> ????????????????. ?? ???????????????????? ?????????? ???? ?????? ?????????????????????? ???????????????????? </Modal.Body>
                    }
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}