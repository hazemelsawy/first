import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { Col, Button, Accordion, Form, Modal, Row, Tabs, Tab } from 'react-bootstrap';
import { firebaseData } from '../provider/DataProvider'
import Firebase from '../firebase/Firebase'
import Purchase from './components/Purchase'

const Styles = styled.div`
  h3{
    color: #ae852f;
  }
  .contacted{
  }
  .contacted *{
      color:green
  }
  .not-paid{
    opacity:0.9;
  }
  .not-paid *{
    color:grey
  }
  .active.nav-link{
    color: #007bff !important;
    -webkit-border-bottom-left-radius: 0px !important;
    -webkit-border-bottom-right-radius: 0px !important;
    -moz-border-radius-bottomleft: 0px !important;
    -moz-border-radius-bottomright: 0px !important;
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }
  .nav.nav-tabs{
      margin-bottom: 10px;
  }
`;
export const Purchases = (props) => {

    const { handleDelete, //getBookings, bookings, 
        admin, currentUser
        //, handleAddBooking 
    } = useContext(firebaseData)


    //bookings
    const [ntcBookings, setNtcBookings] = useState([])
    const [nntcBookings, setNntcBookings] = useState([])
    const [notpaidBookings, setNotpaidBookings] = useState([])
    const [searchResults, setSearchResults] = useState(null);

    const initialValues = {
        searchValue: '',
        searchBy: 'trackid'

    }
    const [searchValue, setSearchValue] = useState(initialValues);

    //
    const [bookingId, setBookingId] = useState(null);
    const [modalShow, setModalShow] = React.useState(false);
    //handle modal 
    const handleClose = () => setModalShow(false);


    const [latestNtcBookings, setLatestNtcBookings] = useState(null);
    const [latestNntcBookings, setLatestNntcBookings] = useState(null);
    const [latestNotpaidBookings, setLatestNotpaidBookings] = useState(null);

    useEffect(() => {
        // get Bookings 
        Firebase.firestore().collection('bookings').where('needToContact', '==', true).onSnapshot(snapshot => {
            let allBookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLatestNtcBookings(snapshot.docs[snapshot.docs.length - 1])
            setNtcBookings(allBookings);
        });
        Firebase.firestore().collection('bookings').where('needToContact', '==', false).onSnapshot(snapshot => {
            let allBookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLatestNtcBookings(snapshot.docs[snapshot.docs.length - 1])
            setNntcBookings(allBookings);
        });
        Firebase.firestore().collection('bookings').where('paid', '==', 'no').onSnapshot(snapshot => {
            let allBookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLatestNtcBookings(snapshot.docs[snapshot.docs.length - 1])
            setNotpaidBookings(allBookings);
        });



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tempDeleteBooking = id => {
        setBookingId(id);
        setModalShow(true)
    }
    const deleteBooking = () => {
        handleDelete("bookings", bookingId);
        setModalShow(false)
    }

    // handle input change
    const handleInputChange = e => {
        var { id, value } = e.target

        setSearchValue({
            ...searchValue,
            [id]: value
        })

    }

    const needToContact = (id, value) => {
        Firebase.firestore().collection("bookings").doc(id).update({
            needToContact: value,
            lastUpdate: currentUser.email,
            lastUpdateTime: Firebase.firestore.FieldValue.serverTimestamp()
        }).catch(err => {
            //console.log(err)
        })
    }

    const archiveNotPaid = (id, value) => {
        Firebase.firestore().collection("bookings").doc(id).update({
            paid: value,
            lastUpdate: currentUser.email,
            lastUpdateTime: Firebase.firestore.FieldValue.serverTimestamp()
        }).catch(err => {
            //console.log(err)
        })
    }

    const search = e => {
        e.preventDefault();
        Firebase.firestore().collection('bookings').where(searchValue.searchBy, '==', searchValue.searchValue).onSnapshot(snapshot => {
            let allBookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setSearchResults(allBookings);
        });
    }

    return (
        <Styles>

            <div className="h5 text-center mb-2 mt-4 ml-3 text-secondary">عدد المسجلين :  {ntcBookings.length + nntcBookings.length + notpaidBookings.length}</div>

            <div className={props.loading ? "p-3 d-none" : "p-3"}>
                <Tabs defaultActiveKey="required" id="bookings-tabs">
                    <Tab eventKey="required" title={`🔊 جاري (${ntcBookings.length})`}>
                        <Accordion>
                            {
                                ntcBookings.map((ntcBookings) =>
                                    <Purchase
                                        key={ntcBookings.id}
                                        admin={admin}
                                        booking={ntcBookings}
                                        tempDeleteBooking={tempDeleteBooking}
                                        needToContact={needToContact}
                                    />
                                )
                            }
                        </Accordion>
                    </Tab>
                    <Tab eventKey="done" title={`"🎉 تم  (${nntcBookings.length})`}>
                        <Accordion>
                            {
                                nntcBookings.map((nntcBookings) =>
                                    <Purchase
                                        key={nntcBookings.id}
                                        admin={admin}
                                        booking={nntcBookings}
                                        tempDeleteBooking={tempDeleteBooking}
                                        needToContact={needToContact}
                                    />
                                )
                            }
                        </Accordion>
                    </Tab>
                    <Tab eventKey="notpaid" title={`🚫 لم يدفع  (${notpaidBookings.length})`}>
                        <Accordion>
                            {
                                notpaidBookings.map((notpaidBookings) =>
                                    <Purchase
                                        key={notpaidBookings.id}
                                        admin={admin}
                                        booking={notpaidBookings}
                                        tempDeleteBooking={tempDeleteBooking}
                                        needToContact={needToContact}
                                        archiveNotPaid={archiveNotPaid}
                                    />
                                )
                            }
                        </Accordion>
                    </Tab>
                    <Tab eventKey="search" title={`🔍 بحث (${searchResults ? searchResults.length : "0"})`}>
                        <Form onSubmit={search}>
                            <Row>
                                <Col xs={8} md={10} className="pl-0">
                                    <Form.Group controlId="searchValue">
                                        <Form.Control size="md" type="text" placeholder="البحث" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                                <Col xs={4} md={2}>
                                    <Form.Group controlId="searchBy">
                                        <Form.Control size="md" as="select" custom onChange={handleInputChange}>
                                            <option value="trackid">مرجعية الحجز</option>
                                            <option value="idNumber">رقم الهوية</option>
                                            <option value="phoneNumber">رقم الهاتف</option>
                                            {/*<option value="emailAddress">البريد الإلكتروني</option> */}
                                            <option value="fullName">الإسم بالكامل</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Button variant="info" size="md" type="submit" block>
                                        بحث
                                    </Button>
                                </Col>
                            </Row>



                        </Form>
                        <div className="mt-3">
                            {searchResults && (<h5 className="text-right">نتائج البحث</h5>)}
                            <Accordion className="bg-light">
                                {searchResults && (
                                    searchResults.map((searchResults) =>
                                        <Purchase
                                            key={searchResults.id}
                                            admin={admin}
                                            booking={searchResults}
                                            tempDeleteBooking={tempDeleteBooking}
                                            needToContact={needToContact}
                                            archiveNotPaid={archiveNotPaid}
                                        />
                                    )
                                )
                                }
                                {searchResults && (searchResults.length === 0 && (<h6 className="py-4 text-center">لايوجد نتائج, <span className="text-secondary">أعد التدقيق أو حاول بصيغة اخرى</span></h6>))}
                            </Accordion>
                        </div>
                    </Tab>
                </Tabs>

            </div >

            <Modal
                show={modalShow}
                onHide={handleClose}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className="p-4">
                    <h4 className="text-right mb-3">هل أنت متأكد من الحذف ؟</h4>
                    <Row>
                        <Col>
                            <Button variant="secondary" onClick={() => setModalShow(false)} block>لا</Button>
                        </Col>
                        <Col>
                            <Button variant="danger" onClick={deleteBooking} block>نعم</Button>
                        </Col>
                    </Row>
                </Modal.Body>

            </Modal>
        </Styles>
    )
}