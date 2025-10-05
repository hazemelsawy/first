import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { Col, Button, Accordion, Form, Modal, Row, Tabs, Tab, OverlayTrigger, Tooltip, Table } from 'react-bootstrap';
import { firebaseData } from '../provider/DataProvider'
import Firebase from '../firebase/Firebase'
import Report from './components/Report'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { faArchive, faRecycle, faPrint } from '@fortawesome/free-solid-svg-icons';
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
export const Reports = (props) => {
    const ref = React.createRef();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const { handleDelete, //getBookings, bookings, 
        admin, currentUser
        //, handleAddBooking 
    } = useContext(firebaseData)

    //bookings
    const [allBookingsCount, setAllBookingsCount] = useState([])
    const [bookings, setBookings] = useState([])
    const [searchResults, setSearchResults] = useState(null);

    const initialValues = {
        searchValue: '',
        searchBy: 'all',
        startDay: null,
        endDay: null

    }
    const [searchValue, setSearchValue] = useState(initialValues);

    //
    const [bookingId, setBookingId] = useState(null);
    const [modalShow, setModalShow] = React.useState(false);
    //handle modal 
    const handleClose = () => setModalShow(false);


    const [latestBookings, setLatestBookings] = useState(null);
    const [bookingsLast, setBookingsLast] = useState(true);

    let start = new Date('2020-12-01');
    let end = new Date();

    let count = 100;

    let generalQuery = Firebase.firestore().collection('bookings').where('paid', 'in', ['yes', 'no', 'archived']).where('timestamp', '>', start).where('timestamp', '<', end)
    let pending = Firebase.firestore().collection('bookings').where('needToContact', '==', true).where('timestamp', '>', start).where('timestamp', '<', end)
    let done = Firebase.firestore().collection('bookings').where('needToContact', 'in', [false, 'archived']).where('timestamp', '>', start).where('timestamp', '<', end)
    let notPaid = Firebase.firestore().collection('bookings').where('paid', 'in', ['archived', 'no']).where('timestamp', '>', start).where('timestamp', '<', end)

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
        generalQuery.orderBy("timestamp", 'desc').limit(count).onSnapshot(snapshot => {
            let allBookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLatestBookings(snapshot.docs[snapshot.docs.length - 1])
            setBookings(allBookings);

            if (snapshot.docs.length < count) {

                //setEndMessage(true)
                setBookingsLast(false)

            }
        });

    }

    const getMore = () => {

        if (searchValue.startDay !== null) {
            let da = new Date(searchValue.startDay);
            let tom = new Date(searchValue.endDay);

            let query = Firebase.firestore().collection('bookings').where('paid', 'in', ['yes', 'no', 'archived']).where('timestamp', '>', da).where('timestamp', '<', tom)
            let pending = Firebase.firestore().collection('bookings').where('needToContact', '==', true).where('timestamp', '>', da).where('timestamp', '<', tom)
            let done = Firebase.firestore().collection('bookings').where('needToContact', 'in', [false, 'archived']).where('timestamp', '>', da).where('timestamp', '<', tom)
            let notPaid = Firebase.firestore().collection('bookings').where('paid', 'in', ['archived', 'no']).where('timestamp', '>', da).where('timestamp', '<', tom)

            switch (searchValue.searchBy) {
                case "pending":
                    pending.orderBy("timestamp", 'desc').startAfter(latestBookings).limit(count).get().then(snapshot => {
                        if (!snapshot.empty) {
                            let allBookings = snapshot.docs.map(doc => ({
                                id: doc.id,
                                ...doc.data()
                            }));
                            setBookings([...bookings, ...allBookings]);
                            setLatestBookings(snapshot.docs[snapshot.docs.length - 1])
                        }
                        setBookingsLast(true)
                        if (snapshot.docs.length < count) {

                            //setEndMessage(true)
                            setBookingsLast(false)

                        }
                    });
                    break;
                case "done":
                    console.log("done");
                    done.orderBy("timestamp", 'desc').startAfter(latestBookings).limit(count).get().then(snapshot => {
                        if (!snapshot.empty) {
                            let allBookings = snapshot.docs.map(doc => ({
                                id: doc.id,
                                ...doc.data()
                            }));
                            setBookings([...bookings, ...allBookings]);
                            setLatestBookings(snapshot.docs[snapshot.docs.length - 1])
                        }
                        setBookingsLast(true)
                        if (snapshot.docs.length < count) {

                            //setEndMessage(true)
                            setBookingsLast(false)

                        }
                    });
                    break;
                case "notPaid":
                    notPaid.orderBy("timestamp", 'desc').startAfter(latestBookings).limit(count).get().then(snapshot => {
                        if (!snapshot.empty) {
                            let allBookings = snapshot.docs.map(doc => ({
                                id: doc.id,
                                ...doc.data()
                            }));
                            setBookings([...bookings, ...allBookings]);
                            setLatestBookings(snapshot.docs[snapshot.docs.length - 1])
                        }
                        setBookingsLast(true)
                        if (snapshot.docs.length < count) {

                            //setEndMessage(true)
                            setBookingsLast(false)

                        }
                    });
                    break;
                default:
                    query.orderBy("timestamp", 'desc').startAfter(latestBookings).limit(count).get().then(snapshot => {
                        if (!snapshot.empty) {
                            let allBookings = snapshot.docs.map(doc => ({
                                id: doc.id,
                                ...doc.data()
                            }));
                            setBookings([...bookings, ...allBookings]);
                            setLatestBookings(snapshot.docs[snapshot.docs.length - 1])
                        }
                        setBookingsLast(true)
                        if (snapshot.docs.length < count) {

                            //setEndMessage(true)
                            setBookingsLast(false)

                        }
                    });
            }

        } else {
            generalQuery.orderBy("timestamp", 'desc').startAfter(latestBookings).limit(count).get().then(snapshot => {
                if (!snapshot.empty) {
                    let allBookings = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setBookings([...bookings, ...allBookings]);
                    setLatestBookings(snapshot.docs[snapshot.docs.length - 1])
                }
                setBookingsLast(true)
                if (snapshot.docs.length < count) {
    
                    //setEndMessage(true)
                    setBookingsLast(false)
    
                }
            });
        }

        





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



    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const resetDatePicker = () => {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setBookingsLast(true);
        setSearchValue({
            ...searchValue,
            startDay: null,
            endDay: null
        })
        getBookings();
    }

    const printDiv = e => {
        var divToPrint = document.getElementById("report");

        var newWin = window.open('', 'Print-Window');

        newWin.document.open();

        newWin.document.write(`
            <html lang="ar" dir="rtl">
            <head>
            
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />
           <style>

           /* bootstrap overwrite */
            .btn-primary2{color:#fff;background-color:#007bff;border-color:#007bff}.btn-primary2:hover{color:#fff;background-color:#0069d9;border-color:#0062cc}.btn-primary2.focus,.btn-primary2:focus{color:#fff;background-color:#0069d9;border-color:#0062cc;box-shadow:0 0 0 .2rem rgba(38,143,255,.5)}.btn-primary2.disabled,.btn-primary2:disabled{color:#fff;background-color:#007bff;border-color:#007bff}.btn-primary2:not(:disabled):not(.disabled).active,.btn-primary2:not(:disabled):not(.disabled):active,.show>.btn-primary2.dropdown-toggle{color:#fff;background-color:#0062cc;border-color:#005cbf}.btn-primary2:not(:disabled):not(.disabled).active:focus,.btn-primary2:not(:disabled):not(.disabled):active:focus,.show>.btn-primary2.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(38,143,255,.5)}
            .btn-primary{color:#fff;background-color:#ae852f;border-color:#ae852f}.btn-primary:hover{color:#fff;background-color:#906e27;border-color:#866624}.btn-primary:focus,.btn-primary.focus{color:#fff;background-color:#906e27;border-color:#866624;box-shadow:0 0 0 .2rem rgba(186,151,78,0.5)}.btn-primary.disabled,.btn-primary:disabled{color:#fff;background-color:#ae852f;border-color:#ae852f}.btn-primary:not(:disabled):not(.disabled):active,.btn-primary:not(:disabled):not(.disabled).active,.show>.btn-primary.dropdown-toggle{color:#fff;background-color:#866624;border-color:#7c5f21}.btn-primary:not(:disabled):not(.disabled):active:focus,.btn-primary:not(:disabled):not(.disabled).active:focus,.show>.btn-primary.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(186,151,78,0.5)}
            .bg-main{
            background: rgb(174,133,47);
            background: radial-gradient(circle,rgba(174,133,47,0.0984768907563025) 0%,rgba(174,133,47,0.196516106442577) 100%);
            }

            .modal-open{
            padding-right:0 !important;
            }
            .italic{
            font-style: italic;
            }
            [data-icon="calendar-check"], [data-icon="check"], [data-icon="times"]{
                width: 15px;
                margin-top: -5px;
                margin-left: 3px;
            }
            .my-2.text-center.overflow-hidden, .float-left.btn.btn-outline-danger{
                display: none;
            }
            h5.bg-light.py-2.rounded-lg.text-dark{
                border-top: 2px solid black;

                border-bottom: 1px solid black;
            }
            </style>

            </head>
            <body onload="window.print()"> 
             ${divToPrint.innerHTML} 
             <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
             <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
             <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
            </body></html>
        `);

        newWin.document.close();
        setTimeout(function () { newWin.close(); }, 150);

    }



    const search = (e) => {
        e.preventDefault();

        let da = new Date(searchValue.startDay);
        let tom = new Date(searchValue.endDay);

        let query = Firebase.firestore().collection('bookings').where('paid', 'in', ['yes', 'no', 'archived']).where('timestamp', '>', da).where('timestamp', '<', tom)
        let pending = Firebase.firestore().collection('bookings').where('needToContact', '==', true).where('timestamp', '>', da).where('timestamp', '<', tom)
        let done = Firebase.firestore().collection('bookings').where('needToContact', 'in', [false, 'archived']).where('timestamp', '>', da).where('timestamp', '<', tom)
        let notPaid = Firebase.firestore().collection('bookings').where('paid', 'in', ['archived', 'no']).where('timestamp', '>', da).where('timestamp', '<', tom)

        switch (searchValue.searchBy) {
            case "pending":
                pending.orderBy("timestamp", 'desc').limit(count).onSnapshot(snapshot => {
                    let allBookings = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setLatestBookings(snapshot.docs[snapshot.docs.length - 1])
                    setBookings(allBookings);
                    
                    setBookingsLast(true)

                    if (snapshot.docs.length < count) {
                        

                        //setEndMessage(true)
                        setBookingsLast(false)

                    }
                });
                break;
            case "done":
                done.orderBy("timestamp", 'desc').limit(count).onSnapshot(snapshot => {
                    let allBookings = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setLatestBookings(snapshot.docs[snapshot.docs.length - 1])
                    setBookings(allBookings);
                    
                    setBookingsLast(true)

                    if (snapshot.docs.length < count) {
                        

                        //setEndMessage(true)
                        setBookingsLast(false)

                    }
                });
                break;
            case "notPaid":
                notPaid.orderBy("timestamp", 'desc').limit(count).onSnapshot(snapshot => {
                    let allBookings = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setLatestBookings(snapshot.docs[snapshot.docs.length - 1])
                    setBookings(allBookings);
                    
                    setBookingsLast(true)

                    if (snapshot.docs.length < count) {
                        

                        //setEndMessage(true)
                        setBookingsLast(false)

                    }
                });
                break;
            default:
                query.orderBy("timestamp", 'desc').limit(count).onSnapshot(snapshot => {
                    let allBookings = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setLatestBookings(snapshot.docs[snapshot.docs.length - 1])
                    setBookings(allBookings);
                    
                    setBookingsLast(true)

                    if (snapshot.docs.length < count) {
                        
                        //setEndMessage(true)
                        setBookingsLast(false)

                    }
                });
        }


    }

    const handleStartDateChange = (day) => {
        setSelectedStartDate(day);
        setSearchValue({
            ...searchValue,
            startDay: day.getTime() - 43200000
        })
    }
    const handleEndDateChange = (day) => {
        setSelectedEndDate(day);

        setSearchValue({
            ...searchValue,
            endDay: day.getTime() + 43200000
        })
    }
    return (
        <Styles>

            <div className="h5 text-center mb-2 mt-4 ml-3 text-secondary">
                <h5 className="mb-3">({bookings.length}) التقارير</h5>

                <Form onSubmit={search}>
                    <label htmlFor="" className="ml-2">من</label>
                    <DayPickerInput
                        inputProps={
                            { required: true }
                        }
                        value={selectedStartDate}
                        onDayChange={day => handleStartDateChange(day)}
                    /> <br />
                    <label htmlFor="" className="ml-2">إلى</label>
                    <DayPickerInput
                        inputProps={
                            { required: true }
                        }
                        value={selectedEndDate}
                        onDayChange={day => handleEndDateChange(day)}
                    /> <br />
                    <Form.Group controlId="searchBy" className="d-inline-block mb-1">
                        <Form.Control size="md" as="select" custom onChange={handleInputChange}>
                            <option value="all">الكل</option>
                            <option value="pending">جاري</option>
                            <option value="done">تم</option>
                            <option value="notPaid">لم يدفع</option>
                        </Form.Control>
                    </Form.Group> <br />
                    <Button variant="info" size="md" type="submit">
                        انشاء تقرير
                                    </Button>

                </Form>


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
                <span className="text-secondary ml-2"> العدد ({bookings.length})</span>
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip id={`tooltip-bottom`}>
                            الطباعة
                                        </Tooltip>
                    }
                >
                    <button onClick={(e) => printDiv(e)} className={`btn mb-2 btn-outline-dark`}>
                        <FontAwesomeIcon icon={faPrint} />
                    </button>
                </OverlayTrigger>
                
                <div id="report">
                    <Table ref={ref} striped responsive bordered hover dir="rtl" className="text-right">
                        <thead>
                            <tr>
                                <th>الإسم</th>
                                <th>رقم الجوال</th>
                                <th>رقم الهوية</th>
                                <th>الخدمة المطلوبة</th>
                                <th>المبلغ المدفوع</th>
                                <th>التاريخ</th>
                                <th>ملاحظات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.map((booking) =>
                                    <Report
                                        key={booking.id}
                                        booking={booking}
                                    />
                                )
                            }
                        </tbody>
                    </Table>
                </div>

                {bookingsLast && (
                    <p className="text-center">
                        <Button onClick={getMore} variant="light" block>تحميل المزيد</Button>
                    </p>
                )}
                {!bookingsLast && (
                    <p className="text-center mt-2 text-success">
                        تم عرض جميع المدخلات
                    </p>
                )}

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


const Prints = () => {

    const [bookings, setBookings] = useState([])


    return (
        <Table bordered hover dir="rtl" className="text-right">
            <thead>
                <tr>
                    <th>الإسم</th>
                    <th>رقم الجوال</th>
                    <th>رقم الهوية</th>
                    <th>الخدمة المطلوبة</th>
                    <th>المبلغ المدفوع</th>
                    <th>التاريخ</th>
                    <th>ملاحظات</th>
                </tr>
            </thead>
            <tbody>
                {
                    bookings.map((booking) =>
                        <Report
                            key={bookings.id}
                            booking={booking}
                        />
                    )
                }
            </tbody>
        </Table>
    )
}
