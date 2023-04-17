import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import { savePaymentMethods } from '../redux/actions/cartAction'
import CheckoutStep from '../components/shared/CheckoutStep'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


const PaymentScreen = () => {

    const [paymentMethod, setPaymentMethod] = useState('paypal')

    const dispatch = useDispatch()
    const navigate = useNavigate();


    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress) {
        navigate('/shipping')
    }


    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch
        dispatch(savePaymentMethods(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <div>
            <CheckoutStep step1 step2 step3 />
            <h1>Payment Methods:</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">
                        Select Payment Methods:
                    </Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            value='paypal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>


                </Form.Group>
                <Button type='submit' variant='primary' className='mt-4'>Continue</Button>
            </Form>
        </div>
    )
}

export default PaymentScreen;