import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Link, useParams} from "react-router-dom";
import {Loader} from "../components/Loader";
import {Button, Card, Table} from "react-bootstrap";

export const DetailProduct = () => {
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const productId = useParams().id

    const [product, setProduct] = useState('')

    const getProduct = useCallback(async () => {
        try{
            const fetched = await request(`/api/products/get-product?id=${productId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setProduct(fetched)


        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getProduct()
    }, [getProduct])
    if(loading){
        return <Loader/>
    }
    return(
        <div className="content">
            <Link style={{color: '#fff', textDecoration: 'none'}} to={`/products`}>
                <Button variant="warning" className="mt-2 mb-2">
                    Назад
                </Button>
            </Link>
            <div className="row mb-4">
                <div className="col-xl-4">
                    <Card>
                        <Card.Img src={product.img}/>
                    </Card>
                    <Link to={`/order/${productId}`}>
                        <Button
                            variant="success"
                            className="w-100 mt-1"
                            style={{fontSize: '25px', borderStyle: 'none'}}

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 className="bi bi-cart4 mr-2" viewBox="0 0 16 16">
                                <path
                                    d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                            </svg>
                            Купить
                        </Button>
                    </Link>
                </div>
                <div className="col-xl-8">
                    <Card>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Title style={{color: 'red'}}>{product.price} грн</Card.Title>
                            <Card.Title>Описание</Card.Title>
                            <Card.Text>
                                {product.description}
                            </Card.Text>
                            <Card.Title>Характеристики</Card.Title>
                            {
                                product && product.info.map(p => {
                                    return(
                                        <>
                                            <Table striped bordered hover>

                                                <tbody>

                                                <tr>
                                                    <td>Размеры</td>
                                                    <td>{p.dimensions}</td>
                                                </tr>
                                                <tr>
                                                    <td>Цвет</td>
                                                    <td>{p.color}</td>
                                                </tr>
                                                <tr>
                                                    <td>Материал</td>
                                                    <td>{p.material}</td>
                                                </tr>
                                                <tr>
                                                    <td>Наполнитель</td>
                                                    <td>{p.filler}</td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </>
                                    )
                                })
                            }
                        </Card.Body>
                    </Card>
                </div>
            </div>

        </div>
    )
}