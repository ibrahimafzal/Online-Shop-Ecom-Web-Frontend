import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../redux/actions/productActions'
import { Row, Col, ListGroup, ListGroupItem, Button, Image, Form } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';

const ProductDetails = () => {
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [])


    const productDetails = useSelector((state) => state.productDetails)
    const { loading, product, error } = productDetails

    const addToCart = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }


    return (
        <div>
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <>
                        <Link to={"/"} className='btn btn-light'>
                            <i className='fas fa-arrow-left'></i>
                            &nbsp; Go Back
                        </Link>
                        <Row>
                            <Col md={6}>
                                <Image src={product?.image} alt={product?.name} fluid={true} className="mt-2" />
                            </Col>

                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <h3> {product?.name} </h3>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Rating value={product?.rating} text={`${product?.numReviews} reviews`} />
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        Price : ${product?.price}
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        {product?.description}
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>

                            <Col md={3}>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Row>
                                            <Col> Status: </Col>
                                            <Col> {product?.countInStock > 0 ? 'In stock' : 'Out of stock'} </Col>
                                        </Row>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Button className='btn-block' type='button' onClick={addToCart}>
                                            Add to cart
                                        </Button>
                                    </ListGroupItem>
                                    {
                                        product.countInStock > 0 && (
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>
                                                        qty
                                                    </Col>
                                                    <Form.Select aria-label='Default select example' size='sm' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                </Row>
                                            </ListGroupItem>
                                        )
                                    }
                                </ListGroup>
                            </Col>
                        </Row>
                    </>
                )
            }
        </div>
    )
}

export default ProductDetails;