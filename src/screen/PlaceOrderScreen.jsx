import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { createOrder } from '../redux/actions/orderAction'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/shared/Message'
import CheckOutStep from '../components/shared/CheckoutStep';



const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart)
    // console.log('cart::', cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate
    // console.log("order-Create::", orderCreate);

    // Fun for decimal //
    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    cart.itemsPrice = addDecimal(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimal(cart.cartItems > 500 ? 0 : 50)
    cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    useEffect(() => {
        if (success) {
            navigate(`/orders/${order._id}`)
        }
            //eslint-disable-next-line
    }, [navigate, success])



    return (
        <>
            <CheckOutStep step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping Address:</h2>
                            <p>
                                Street.No: {cart.shippingAddress.address}<br />
                                City: {cart.shippingAddress.city}<br />
                                PostalCode: {cart.shippingAddress.postalcode}<br />
                                Country: {cart.shippingAddress.country}
                            </p>

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method:</h2>
                            <p><strong>{cart.paymentMethod}</strong></p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items:</h2>
                            {
                                cart.cartItems.length === 0
                                    ? (<Message>Your Cart is Empty</Message>)
                                    : (
                                        <ListGroup variant='flush'>
                                            {cart.cartItems.map((item, idx) => (
                                                <ListGroup.Item key={idx}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x ${item.price} = ${item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary:</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <Button type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}
                            >Place Order</Button>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen