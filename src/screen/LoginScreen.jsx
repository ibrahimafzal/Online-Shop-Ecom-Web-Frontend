import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { login } from "../redux/actions/userAction"
import FormContainer from '../components/shared/FormContainer';

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : "/";
    
    console.log("redirect",redirect, "L.S",location.search);

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <>
            <FormContainer>
                <h1 className='d-flex justify-content-center'>SIGN IN</h1>
                
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email' className='my-4'>
                        <Form.Label> Email Adress: </Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            autoComplete='off'
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>

                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label> Password: </Form.Label>

                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            autoComplete='off'
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-4'> SIGN IN</Button>
                </Form>
                <Row>
                    <Col>
                        New Customer ? &nbsp;
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default LoginScreen