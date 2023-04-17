import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom'
import { getOrderDetails } from '../redux/actions/orderAction'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/shared/Message';
import Loader from '../components/shared/Loader';



const OrderScreen = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    if (!loading) {
        //calculate price
        const addDecimal = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2);
        };

        order.itemsPrice = addDecimal(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        );
    }
    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [dispatch, id])

    return loading ? <Loader /> :
        error ? <Message variant='danger'>{error}</Message> :
            <>
                <h2>Order {order._id}</h2>
                <Row>
                    <Col md={8}>
                        <ListGroup.Item variant='flush'>
                            <h2>Shipping Address:</h2>
                            <p className='text-capitalize mb-0'><strong>Name :&nbsp;</strong>{order.user.name}</p>
                            <p className=''><strong>Email :&nbsp;</strong>{order.user.email}</p>
                            <p>
                                Street.No: {order.shippingAddress.address}<br />
                                City: {order.shippingAddress.city}<br />
                                PostalCode: {order.shippingAddress.postalcode}<br />
                                Country: {order.shippingAddress.country}
                            </p>
                            {
                                order.isDelivered ?
                                    <Message variant='success'>Paid On {order.isDelivered}</Message> :
                                    <Message variant='danger'>Not Delivered!</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method:</h2>
                            <p>
                                <strong>Method :</strong>
                                <strong>{order.paymentMethod}</strong>
                            </p>
                            {
                                order.isPaid ?
                                    <Message variant='success'>Paid On {order.paidAt}</Message> :
                                    <Message variant='danger'>Not Paid!</Message>
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items:</h2>
                            {
                                order.orderItems.length === 0
                                    ? (<Message>Your Cart is Empty</Message>)
                                    : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, idx) => (
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
                    </Col>
                </Row>
            </>
}

export default OrderScreen