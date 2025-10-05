import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Button, Modal, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Promotion } from '../components/Promotion';
import SimpleReactLightbox from 'simple-react-lightbox'
import FadeIn from 'react-fade-in'
import Firebase from '../firebase/Firebase'
import PromotionSkeleton from '../skeletons/Promotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck, faCalendarCheck, faTrashAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import pattern from '../assets/pattern.png'
import { BookingsContext } from '../contexts/Bookings'

const Styles = styled.div`
  .jumbo {
    background-size: cover;
    color: #1e266d;
    position: relative;
    background-color: #f9fbff !important;
  }
  .jumbo-container {
    background-color: #f9fbff !important;
  }
  h3{
    color: #ae852f;
  }
  .promotionUnit{
    background: rgb(174,133,47);
    background: radial-gradient(circle, rgb(255 238 201 / 10%) 0%, rgb(179 144 72 / 20%) 100%);
  }
  
  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
  
  .purchaseItem:last-child{
      border-bottom: none !important;
      margin-bottom:0 !important;
  }
  .promoIsAvailable:last-child{
        margin-bottom:0 !important;
    }
  .bg-white{
    background: rgba(255,255,255,0.5) !important;
  }
  .purchase-container::before {
    content: "";
    background: url("${pattern}");
    background-color: #c1a365;
    background-size: 150px;
    opacity: 0.12;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 0;   
  }
  .closeModalIcon{
      top:0;
      right:0;
      z-index:3;
      color:#ae852f !important;
      padding:.265rem .64rem;
  }
  .closeModalIcon:hover{
    color:#b3985f !important;
  }
  .closeModalIcon:active, .closeModalIcon:focus{
    box-shadow: none !important;
  }
  
`;

export const Promotions = () => {
  const [latestDoc, setLatestDoc] = useState(null);
  const [docReady, setDocReady] = useState(false)
  const [promotion, setPromotion] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [endMessage, setEndMessage] = useState();

  useEffect(() => {
    Firebase.firestore().collection('promotions').orderBy("timestamp", 'desc').limit(6).get().then(function (snapshot) {
      snapshot.docs.map(doc => {
        setPromotions(promotions => [...promotions, {
          id: doc.id,
          ...doc.data()
        }])
        return null;
      });
      setLatestDoc(snapshot.docs[snapshot.docs.length - 1])
      setDocReady(true)

      if (snapshot.docs.length < 6) {
      } else {
        setEndMessage(false)
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  const bookPromotion = number => {
    setModalShow(true)
    setPromotion(number)
  }

  // modal stuff
  const [modalShow, setModalShow] = React.useState(false);


  const getMore = () => {
    Firebase.firestore().collection('promotions').orderBy("timestamp", 'desc').startAfter(latestDoc).limit(6).get().then(function (snapshot) {
      if (!snapshot.empty) {
        snapshot.docs.map(doc => {
          setPromotions(promotions => [...promotions, {
            id: doc.id,
            ...doc.data()
          }])
          return null;
        }
        );
        setLatestDoc(snapshot.docs[snapshot.docs.length - 1])
      } else {
        setEndMessage(true)
      }

      if (snapshot.docs.length < 6) {
        setEndMessage(true)
      }
    })
  }


  return (
    <Styles>
      <Container>
        <h3 className="text-center font-weight-bold mb-4">آخر العروض</h3>
        <FadeIn>

          <Row>
            <PromotionSkeleton loading={!docReady} />
            <PromotionSkeleton loading={!docReady} />
            <PromotionSkeleton loading={!docReady} />
            <PromotionSkeleton loading={!docReady} />
            <PromotionSkeleton loading={!docReady} />
            <PromotionSkeleton loading={!docReady} />
            {
              promotions.map((object, number) =>
                <React.StrictMode key={number}>
                  <SimpleReactLightbox>
                    <Promotion
                      object={object}
                      number={number}
                      bookPromotion={bookPromotion}
                      docReady={docReady}
                    />
                  </SimpleReactLightbox>
                </React.StrictMode>
              )

            }

          </Row>
        </FadeIn>
        {endMessage === false && (
          <div className="text-center">
            <Button variant="light" className="btn-block rounded-lg" size="lg" onClick={getMore}>المزيد ...</Button>
          </div>
        )}
        {endMessage === true && (
          <div className="text-center text-success">
            تم عرض جميع العروض <FontAwesomeIcon icon={faCheck} />
          </div>
        )}


        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          promotions={promotions}
          promotion={promotion}
        />
      </Container>
    </Styles>
  )
}








function MyVerticallyCenteredModal(props) {
  const { dispatch, bookings } = useContext(BookingsContext);
  const functions = Firebase.functions();
  const checkBookingExists = (id, index) => {
    let i = 0;
    bookings.some(function (el) {
      if (el.id === id && el.index === index) {
        i++;
      }
    });
    return i;
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

  const additem = (el, index, id, promo, price, avlbl) => {
    if (typeof (Storage) !== "undefined") {
      let i = 0;
      bookings.some(function (el) {
        if (el.id === id && el.index === index) {
          i = parseInt(el.quantity)
        }
      });
      //console.log(i);
      if (i > -1) {
        dispatch({
          type: 'REMOVE_BOOKING',
          booking: {
            id: id,
            index: index
          }
        });
        dispatch({
          type: 'ADD_BOOKING',
          booking: {
            id,
            index,
            promo,
            price,
            quantity: i + 1,
            avlbl
          }
        });
      } else {
        dispatch({
          type: 'ADD_BOOKING',
          booking: {
            id,
            index,
            promo,
            price,
            quantity: 1,
            avlbl
          }
        });
      }

    } else {
      // Sorry! No Web Storage support..
      const localstorageErrors = functions.httpsCallable('localstorageErrors');
      localstorageErrors().then(result => { console.log(result.data) })

    }
  }

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


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    ><Styles>

        <Modal.Body className="text-right purchase-container position-relative p-lg-4">
          <Button variant="link" className="closeModalIcon position-absolute" onClick={props.onHide}><FontAwesomeIcon icon={faTimes} /></Button>
          {
            props.promotions.map((object, number) =>
            (
              number === props.promotion && (

                <div key={number} xs={12} md={8} className="p-md-4 p-3 bg-white rounded-lg position-relative">
                  {object.promotions.map((obj, index) =>
                    <Row key={index} className="mb-3 border-bottom purchaseItem p-2 pb-md-0">
                      <Col xs={12} lg={7}>
                        <h5 className={`mb-1 ${obj.avlbl ? "" : "text-secondary italic"}`}>{obj.promo}</h5>
                        <p className={`small promoIsAvailable ${obj.avlbl ? "text-success" : "text-danger"}`}>{obj.avlbl ? "العرض متاح" : "العرض غير متاح"}</p>
                      </Col>
                      <Col xs={12} lg={5}>
                        <p className={`font-weight-bold text-center ${obj.avlbl ? "text-success" : "text-secondary"}`}>{obj.avlbl ? "الحجز الآن!" : "غير متاح"}</p>
                        <Row>
                          <Col className={`${checkBookingExists(object.id, index) > 0 ? "pl-1 col-8" : ""}`}>
                            <Button className={`mb-2`} disabled={!obj.avlbl} variant={`${checkBookingExists(object.id, index) > 0 ? "primary" : "primary"}`} block onClick={checkBookingQuantity(object.id, index) <= 4 ? (e) => { additem(e, index, object.id, obj.promo, obj.price, obj.avlbl) } : () => { }}>
                              {checkBookingExists(object.id, index) > 0 && (<FontAwesomeIcon className="ml-2" icon={faPlus} />)}
                              {parseFloat(obj.price).toFixed(2)} ريال
                            </Button>
                          </Col>
                          {checkBookingExists(object.id, index) > 0 && (
                            <Col xs={4} className={`${checkBookingExists(object.id, index) > 0 ? "pr-1" : ""}`}>
                              <Button className={`mb-2`} href="/bookings-preview" variant="success" block>شراء <FontAwesomeIcon icon={faCalendarCheck} /></Button>
                            </Col>
                          )}

                        </Row>
                        {checkBookingExists(object.id, index) > 0 && (
                          <p className="text-center text-secondary my-0">
                            تم إضافة عدد ({checkBookingQuantity(object.id, index)}) -
                            <Button className={`mr-1 text-secondary p-0`} variant="link" onClick={(e) => { removeitem(e, index, object.id) }}><FontAwesomeIcon icon={faTrash} /></Button>
                          </p>
                        )}

                      </Col>
                    </Row>

                  )}

                  {/*<Button variant="primary" size="lg" block>الحجوزات والدفع</Button>*/}
                </div>

              )
            )

            )
          }
        </Modal.Body>
      </Styles>
    </Modal >
  );
}
