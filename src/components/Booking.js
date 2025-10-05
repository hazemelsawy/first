import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState, useEffect } from 'react';
import { Col, Button, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { BookingsContext } from '../contexts/Bookings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Firebase from '../firebase/Firebase'
const Styles = styled.div`
  h3{
    color: #ae852f;
  }
  .quantity{
      max-width:65px;
  }
  .bg-white{
    background: rgba(255,255,255,0.5) !important;
  }
`;
const Booking = (props) => {
    const functions = Firebase.functions();
    const { dispatch, bookings } = useContext(BookingsContext);
    var [values, setValues] = useState({});
    const [available, setAvailable] = useState(true);

    useEffect(() => {
        Firebase.firestore().collection("promotions").doc(props.booking.id).get().then(snapshot => {
            let promo = snapshot.data() ? snapshot.data().promotions[props.booking.index] : false
            setAvailable(promo.avlbl)
            if (promo.avlbl) {
            } else {
                dispatch({
                    type: 'REMOVE_BOOKING',
                    booking: {
                        id: snapshot.id,
                        index: props.booking.index
                    }
                });
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const removeitem = (el, index, id) => {
        if (typeof (Storage) !== "undefined") {
            dispatch({
                type: 'REMOVE_BOOKING',
                booking: {
                    id: id,
                    index: index
                }
            });
        } else {
            // Sorry! No Web Storage support..
            const localstorageErrors = functions.httpsCallable('localstorageErrors');
            localstorageErrors().then(result => { alert("Local storage error, please use another browser") })
        }
    }

    const handleInputChange = (e, index, id, promo, price) => {
        var { value } = e.target
        let currentBookings = bookings;
        currentBookings[index].quantity = value;

        setValues({
            ...values,
            id: id,
            index: index,
            promo: promo,
            price: price,
            quantity: value
        })
        if (typeof (Storage) !== "undefined") {
            dispatch({
                type: 'REMOVE_ALL_BOOKINGS'
            });
            dispatch({
                type: 'UPDATE_ALL_BOOKINGS',
                currentBookings
            });
        } else {
            // Sorry! No Web Storage support..
            const localstorageErrors = functions.httpsCallable('localstorageErrors');
            localstorageErrors().then(result => { alert("Local storage error, please use another browser") })
        }
    }

    const checkBookingQuantity = (id, index) => {
        let i = 0;
        bookings.some(function (el) {
            if (el.id === id && el.index === index) {
                i = el.quantity
            }
        });
        return i;
    }


    return (
        <Styles>
            <Row className="bg-white py-3 rounded-lg overflow-hidden text-right mb-3 py-2">
                <Col xs={8} lg={9}>
                    <p className={`h5 ${available ? "text-black" : "text-secondary italic"}`}> {props.booking.promo}</p>
                    <p className={`small ${available ? "text-success" : "text-danger italic"}`}>{available ? "العرض متاح" : "العرض غير متاح"} </p>
                    <Form className="float-right ml-2">
                        <Form.Group className="quantity" controlId="exampleForm.SelectCustom">
                            <Form.Control as="select" name={props.booking.id} custom value={values.quantity || checkBookingQuantity(props.booking.id, props.booking.index)} onChange={(e) => { handleInputChange(e, props.index, props.booking.id, props.booking.promo, props.booking.price) }}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Button className={`mb-2 float-right`} variant="outline-danger" onClick={(e) => { removeitem(e, props.booking.index, props.booking.id) }}><FontAwesomeIcon icon={faTrash} /></Button>
                </Col>
                <Col xs={4} lg={3}>
                    <h5 className={`text-center font-weight-bold  ${available ? "text-black" : "text-secondary italic"}`}>{available ? (parseFloat(props.booking.price) * props.booking.quantity).toFixed(2) : "0.00"} ريال</h5>
                </Col>

            </Row>
        </Styles>
    )
}
export default Booking;