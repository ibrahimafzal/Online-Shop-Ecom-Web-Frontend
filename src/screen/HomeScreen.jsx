import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from 'react-bootstrap'
import ProductScreen from './ProductScreen'
import { listProducts } from "../redux/actions/productActions"
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';

const HomeScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, []);

    const productList = useSelector((state) => state.productList);

    const { loading, error, products } = productList;

    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>
                        {error}
                    </Message>
                ) : (
                    <Row>
                        {
                            products?.map((product) => (
                                <Col md={3} key={product._id}>
                                    <ProductScreen product={product} />
                                </Col>
                            ))
                        }
                    </Row>
                )
            }
        </>
    );
}

export default HomeScreen;