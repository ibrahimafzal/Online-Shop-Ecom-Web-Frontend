import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { register } from "../redux/actions/userAction"
import FormContainer from '../components/shared/FormContainer';

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('');
    const [message, setMessage] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : "/";
    console.log("redirect", redirect, "L.S", location.search);

    const dispatch = useDispatch()
    const registerUser = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = registerUser

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== cPassword) {
            setMessage('Password do not match!')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <>
            <FormContainer>
                <h1 className='d-flex justify-content-center'>REGISTER</h1>

                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                {message && <Message variant='danger'>{message}</Message>}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-4'>
                        <Form.Label> Name: </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter name'
                            value={name}
                            autoComplete='off'
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

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

                    <Form.Group controlId='cPassword' className='my-4'>
                        <Form.Label> Confirm Password: </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Re-enter password'
                            value={cPassword}
                            autoComplete='off'
                            onChange={(e) => setCPassword(e.target.value)}
                        >
                        </Form.Control>

                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-4'>REGISTER</Button>
                </Form>
                <Row>
                    <Col>
                        Have an account? &nbsp;
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default RegisterScreen;