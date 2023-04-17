import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { getUserProfileDetails, updateUserProfile } from "../redux/actions/userAction"

const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('');
    const [message, setMessage] = useState('')

    const navigate = useNavigate();
    const location = useLocation();


    const dispatch = useDispatch()
    const userProfileDetails = useSelector(state => state.userProfileDetails)
    const { loading, error, user } = userProfileDetails

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin
    console.log("userLogin ::", userLogin);

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!userInfo.name) {
                dispatch(getUserProfileDetails('profile')) // yahan profile is liye likha ku k agr hm userAction ki file main ja kr dekhain to udr hm ny (id) dy rakha ha, yahan us id ki jaga hm ny 'profile' likha
            } else {
                setName(userInfo.name)
                setEmail(userInfo.email)
            }
        }
    }, [navigate, userInfo, user, dispatch])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserProfile({ id: user._id, name, email, password }))

    }

    return (
        <>
            <Row>
                <Col md={3}>

                    <h1 className='d-flex justify-content-center'>Update Information</h1>

                    {error && <Message variant='danger'>{error}</Message>}
                    {success && <Message variant='success'>Profile Updated!</Message>}
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

                        <Button type='submit' variant='primary' className='my-4'>Update</Button>
                    </Form>
                </Col>

                <Col md={9}>
                    <h1>My Orders:</h1>
                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen;