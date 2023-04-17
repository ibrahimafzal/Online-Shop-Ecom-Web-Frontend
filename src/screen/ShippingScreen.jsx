import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/shared/FormContainer';
import { saveShippingAddress } from '../redux/actions/cartAction'
import { useNavigate } from 'react-router-dom';
import CheckoutStep from '../components/shared/CheckoutStep';


const ShippingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    console.log("shippingAddress:", shippingAddress);

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch
        dispatch(saveShippingAddress({ address: address, city: city, postalcode: postalcode, country: country }))
        navigate('/payment')
    }
    return (
        <FormContainer>
            <CheckoutStep step1 step2/>
            <Form onSubmit={submitHandler} className='mt-4'>
                <Form.Group id='address'>
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    ></Form.Control>

                </Form.Group>

                <Form.Group id='city' className='my-4'>
                    <Form.Label>City:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    ></Form.Control>

                </Form.Group>

                <Form.Group id='postalcode'>
                    <Form.Label>PostalCode:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter PostalCode'
                        value={postalcode}
                        onChange={(e) => setPostalcode(e.target.value)}
                        required
                    ></Form.Control>

                </Form.Group>

                <Form.Group id='country' className='my-4'>
                    <Form.Label>Country:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    ></Form.Control>

                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen;