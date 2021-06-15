import React from "react"
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";
import {Button, Card} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";

export const ProductList = ({products}) => {
    const {loading} = useHttp()
    const history = useHistory()

    if(products.length == 0){
        return(
            <div style={{textAlign: 'center'}}>
                <Card body>По вашему запросу ничего не найдено</Card>
            </div>
        )
    }
    if(loading){
        return <Loader/>
    }
    return(
        <>
            {products && !loading &&
                products.map(product => {
                    return(
                        <div className="col-xl-3 mb-4">

                            <Card
                                // style={{ width: '18rem' }}
                                className="mb-1">
                                <Card.Img className="productList_img" src={product.img} />
                                <Card.Body>
                                    <Card.Text>{product.name}</Card.Text>
                                    <Card.Title style={{color: 'red'}}>{product.price} грн</Card.Title>

                                    <Button variant="success" className="w-100" onClick={() => {
                                        history.push(`/product/${product._id}`)
                                    }}>Купить</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })

            }


        </>
    )
}