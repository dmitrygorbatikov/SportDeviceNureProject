import React, {useCallback, useContext, useEffect, useState} from "react"
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {ProductList} from "../components/ProductList";
import {useHttp} from "../hooks/http.hook";
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";

export const Products = () => {
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const [products, setProducts] = useState([])

    const getProducts = useCallback(async () => {
        try{
            const fetched = await request('/api/products/get-products', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setProducts(fetched)


        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getProducts()
    }, [getProducts])

    const [value, setValue] = useState('')

    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(value.toLowerCase())
    })

    if(loading){
        return <Loader/>
    }

    return(
        <div className="content">

            <Form.Group className="mt-3">
                <Form.Control
                    id="team_name"
                    size="xl"
                    type="text"
                    placeholder="Поиск.."
                    onChange={(e) => setValue(e.target.value)}
                />
                <Form.Text className="ml-1">Введите название товара</Form.Text>
            </Form.Group>
            <div className="row">
                    {!loading && products && <ProductList products={filteredProducts}/> }
            </div>
        </div>
    )
}