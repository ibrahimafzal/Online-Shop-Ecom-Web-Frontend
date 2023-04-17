import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Form, Button, Card, Image, ListGroup, ListGroupItem } from "react-bootstrap"
import { addToCart, removeFromCart } from "../redux/actions/cartAction"
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import Message from '../components/shared/Message';


const CartScreen = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();

    const qty = location.search ? Number(location.search.split("=")[1]) : 1  //it will give us "qty" from url
    console.log("qty::", qty, id);

    useEffect(() => {
        if (id) {
            console.log('checking is dispatch event is firing');
            dispatch(addToCart(id, qty))
        }
    }, [id, qty])

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const removefromCartHandler = (id) => {
      dispatch(removeFromCart(id))
    }

    const checkout = () => {
        navigate("/login?redirect=/shipping");
      };

    return (
        <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty...! <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <ListGroupItem key={idx}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Select
                        aria-label='Default select example'
                        size='sm'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removefromCartHandler(item.product)}
                      >
                        <i
                          className="fa fa-trash text-danger"
                          aria-hidden="true"
                        ></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkout}
              >
                Proceed to checkOut
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>

    )
}

export default CartScreen;