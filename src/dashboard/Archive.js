import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { Col, Button, Accordion, Form, Modal, Row, Tabs, Tab, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { firebaseData } from '../provider/DataProvider'
import Firebase from '../firebase/Firebase'
import Purchase from './components/Purchase'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { faArchive, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  .DayPickerInput-Overlay{
    right:0;
    left: auto  
}

`;
export const Archive = (props) => {

    const { handleDelete, //getBookings, bookings, 
        admin, currentUser
        //, handleAddBooking 
    } = useContext(firebaseData)


    //bookings
    const [allBookingsCount, setAllBookingsCount] = useState([])
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


    const [ntcBookingsLast, setNtcBookingsLast] = useState(true)
    const [nntcBookingsLast, setNntcBookingsLast] = useState(true)
    const [notpaidBookingsLast, setNotpaidBookingsLast] = useState(true)

    let start = new Date('2020-12-01');
    let end = new Date();
    let count = 100;

    let paidQuery = Firebase.firestore().collection('bookings').where('needToContact', '==', "archived").where('timestamp', '>', start).where('timestamp', '<', end)
    let unpaidQuery = Firebase.firestore().collection('bookings').where('paid', '==', "archived").where('timestamp', '>', start).where('timestamp', '<', end)


    useEffect(() => {
        // get Bookings 
        getBookings();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getBookings = () => {
        Firebase.firestore().collection('bookings').get().then(snapshot => {
            let allBookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAllBookingsCount(allBookings);
        });
        paidQuery.orderBy("timestamp", 'desc').limit(count).onSnapshot(snapshot => {
            let allBookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLatestNtcBookings(snapshot.docs[snapshot.docs.length - 1])
            setNtcBookings(allBookings);

            if (snapshot.docs.length < count) {

                //setEndMessage(true)
                setNtcBookingsLast(false)

            }
        });
        unpaidQuery.orderBy("timestamp", 'desc').limit(count).onSnapshot(snapshot => {
            let allBookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLatestNotpaidBookings(snapshot.docs[snapshot.docs.length - 1])
            setNotpaidBookings(allBookings);

            if (snapshot.docs.length < count) {

                //setEndMessage(true)
                setNotpaidBookingsLast(false)

            }
        });
    }

    const getMoreUnpaid = () => {
        unpaidQuery.orderBy("timestamp", 'desc').startAfter(latestNotpaidBookings).limit(count).get().then(snapshot => {
            if (!snapshot.empty) {
                let allBookings = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setNotpaidBookings([...notpaidBookings, ...allBookings]);
                setLatestNotpaidBookings(snapshot.docs[snapshot.docs.length - 1])
            }
            if (snapshot.docs.length < count) {

                //setEndMessage(true)
                setNotpaidBookingsLast(false)

            }
        });
    }

    const getMorePaidNtc = () => {
        paidQuery.orderBy("timestamp", 'desc').startAfter(latestNtcBookings).limit(count).get().then(snapshot => {
            if (!snapshot.empty) {
                let allBookings = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setLatestNtcBookings(snapshot.docs[snapshot.docs.length - 1])
                setNtcBookings([...ntcBookings, ...allBookings]);
            }

            if (snapshot.docs.length < count) {
                //setEndMessage(true)
                setNtcBookingsLast(false)
            }
        });
    }
    const getMorePaidNntc = () => {
        Firebase.firestore().collection('bookings').where('needToContact', '==', false).orderBy("timestamp", 'desc').startAfter(latestNntcBookings).limit(count).get().then(snapshot => {
            if (!snapshot.empty) {
                let allBookings = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setLatestNntcBookings(snapshot.docs[snapshot.docs.length - 1])
                setNntcBookings([...nntcBookings, ...allBookings]);
            }

            if (snapshot.docs.length < count) {
                //setEndMessage(true)
                setNntcBookingsLast(false)
            }
        });
    }



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

    const needToContact = (id, value, e) => {
        let parent = e.target.closest(".d-block.card")
        Firebase.firestore().collection("bookings").doc(id).update({
            needToContact: value,
            lastUpdate: currentUser.email,
            lastUpdateTime: Firebase.firestore.FieldValue.serverTimestamp()
        }).then((e) => {
            parent.remove();
        }).catch(err => {
            //console.log(err)
        })
    }


    const archiveNotPaid = (id, value, e) => {
        //let parent = e.target.closest(".d-block.card")
        Firebase.firestore().collection("bookings").doc(id).update({
            paid: value,
            lastUpdate: currentUser.email,
            lastUpdateTime: Firebase.firestore.FieldValue.serverTimestamp()
        }).then((e) => {
            //parent.remove();
        }).catch(err => {
            //console.log(err)
        })
    }

    const handleDateChange = (day) => {
        let da = new Date(day.getTime() - 43200000);
        let tom = new Date(day.getTime() + 43200000)


        let paidQueryDate = Firebase.firestore().collection('bookings').where('needToContact', '==', "archived").where('timestamp', '>', da).where('timestamp', '<', tom)
        let unpaidQueryDate = Firebase.firestore().collection('bookings').where('paid', '==', "archived").where('timestamp', '>', da).where('timestamp', '<', tom)

        paidQueryDate.orderBy("timestamp", 'desc').limit(count).onSnapshot(snapshot => {
            let allBookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLatestNtcBookings(snapshot.docs[snapshot.docs.length - 1])
            setNtcBookings(allBookings);

            if (snapshot.docs.length < count) {

                //setEndMessage(true)
                setNtcBookingsLast(false)

            }
        });
        unpaidQueryDate.orderBy("timestamp", 'desc').limit(count).onSnapshot(snapshot => {
            let allBookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLatestNotpaidBookings(snapshot.docs[snapshot.docs.length - 1])
            setNotpaidBookings(allBookings);

            if (snapshot.docs.length < count) {

                //setEndMessage(true)
                setNotpaidBookingsLast(false)

            }
        });
    }

    const [selectedDate, setSelectedDate] = useState("");
    const resetDatePicker = () => {
        setSelectedDate(null);
        setNotpaidBookingsLast(true);
        setNtcBookingsLast(true);
        getBookings();
    }
    return (
        <Styles>

            <div className="h5 text-center mb-2 mt-4 ml-3 text-secondary">
                <h5 className="mb-3"><FontAwesomeIcon icon={faArchive} /> الأرشيف</h5>

                <DayPickerInput
                    inputProps={
                        { required: true }
                    }
                    value={selectedDate}
                    onDayChange={day => handleDateChange(day)}
                />

                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip id={`tooltip-bottom`}>
                            إظهار الكل
                                        </Tooltip>
                    }
                >
                    <Button variant="link" onClick={resetDatePicker}><FontAwesomeIcon icon={faRecycle} /></Button>
                </OverlayTrigger>


            </div>

            <div className={props.loading ? "p-3 d-none" : "p-3"}>
                <Tabs defaultActiveKey="required" id="bookings-tabs">
                    <Tab eventKey="required" title={`💰 مدفوع (${ntcBookings.length})`}>
                        <Accordion>
                            {
                                ntcBookings.map((ntcBookings) =>
                                    <Purchase
                                        key={ntcBookings.id}
                                        admin={admin}
                                        booking={ntcBookings}
                                        tempDeleteBooking={tempDeleteBooking}
                                        needToContact={needToContact}
                                        archiveNotPaid={archiveNotPaid}
                                    />
                                )
                            }

                            {ntcBookingsLast && (
                                <p className="text-center mt-2">
                                    <Button onClick={getMorePaidNtc} variant="link">تحميل المزيد</Button>
                                </p>
                            )}
                            {!ntcBookingsLast && (
                                <p className="text-center mt-2 text-success">
                                    تم عرض جميع الحجوزات
                                </p>
                            )}
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
                            {notpaidBookingsLast && (
                                <p className="text-center mt-2">
                                    <Button onClick={getMoreUnpaid} variant="light" className="btn-block rounded-lg">تحميل المزيد</Button>
                                </p>
                            )}
                            {!notpaidBookingsLast && (
                                <p className="text-center mt-2 text-success">
                                    تم عرض جميع الحجوزات
                                </p>
                            )}

                        </Accordion>
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