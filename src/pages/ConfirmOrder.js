import React, { useEffect, useState, useContext } from 'react'
import { Container, Alert, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import Firebase from '../firebase/Firebase';
import axios from 'axios'
import FadeIn from 'react-fade-in'
import { BookingsContext } from '../contexts/Bookings'
import pattern from '../assets/pattern.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Styles = styled.div`
  h3{
    color: #ae852f;
  }

  .contact-container::before {
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
    z-index: -1;   
  }
  .bg-white{
    background: rgba(255,255,255,0.5) !important;
  }
`;
export const ConfirmOrder = () => {
    const [response, setResponse] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const { dispatch } = useContext(BookingsContext);
    const functions = Firebase.functions();
    function getSearchParameters() {
        var prmstr = window.location.search.substr(1);
        return prmstr !== null && prmstr !== "" ? transformToAssocArray(prmstr) : {};
    }
    function transformToAssocArray(prmstr) {
        var params = {};
        var prmarr = prmstr.split("&");
        for (var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            params[tmparr[0]] = tmparr[1];
        }
        return params;
    }

    var params = getSearchParameters();

    useEffect(() => {
        checkOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkOrder = () => {
        
        const confPay = functions.httpsCallable('confPay');
        console.log(params);

        confPay(
            {
                params: params
            })
            .then((response) => {

                const urldecodeapi = response.data.json;
                if (urldecodeapi.result === "Successful") {

                    if (typeof (Storage) !== "undefined") {
                        dispatch({
                            type: 'REMOVE_ALL_BOOKINGS'
                        });
                    } else {
                        // Sorry! No Web Storage support..
                        const localstorageErrors = functions.httpsCallable('localstorageErrors');
                        localstorageErrors().then(result => { alert("Local storage error, please use another browser") })
                    }
                }
                //console.log(urldecodeapi);
                setResponse(urldecodeapi.result);
                setPhoneNumber(urldecodeapi.udf3);

                
            }).catch((error) => {
                //console.log(error);
            });
    }
    return (

        <Styles>
            {!response && (
                <FadeIn>
                    <Container className="text-right py-5 text-center">
                        <Alert variant="light">
                            <div className="text-center"><Spinner animation="border" variant="success" /></div>
                            <Alert.Heading className="py-3">جاري المعالجة</Alert.Heading>
                            <p className="text-secondary small">( برجاء عدم غلق الصفحة )</p>
                        </Alert>
                    </Container>
                </FadeIn>
            )}
            {response === "Successful" && (
                <FadeIn>
                    <Container>
                        <FadeIn>
                            <div className="mt-3 contact-container position-relative p-3 rounded-lg overflow-hidden">
                                <div className="text-right bg-white p-3 rounded-lg">
                                    <h2 className="text-center text-success"><FontAwesomeIcon icon={faCheckCircle} /></h2>
                                    <h2 className="pb-3 text-center text-success">تم الحجز بنجاح</h2>
                                    <p className="pb-3 text-center">
                                        شكراً لكم, تم حجز العرض بنجاح  <br /><br />
                                        مرجعية الحجز : <br />
                                        <span className="bg-white d-inline-block rounded-pill p-3 h4 mt-1 text-brown shadow-sm">{params.TrackId}</span>
                                    </p>
                                    <hr />
                                    <p className="mb-0 text-center h5">
                                        سيتم الإتصال بكم على رقم {phoneNumber} لتحديد الموعد المناسب
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    </Container>
                </FadeIn>
            )}
            {response === "Failure" && (
                <FadeIn>
                    <Container>
                        <FadeIn>
                            <div className="mt-3 contact-container position-relative p-3 rounded-lg overflow-hidden">
                                <div className="text-right bg-white p-3 rounded-lg">
                                    <h2 className="text-center text-danger"><FontAwesomeIcon icon={faTimesCircle} /></h2>
                                    <h2 className="pb-3 text-center text-danger">عملية دفع غير ناجحة</h2>
                                    <p className="text-center">
                                        <a href="/bookings-preview">برجاء المحاولة مرة اخرى</a>  <br />
                                        <br />
                                        اذا كنت بحاجة للمساعدة برجاء <a href="/contact">الإتصال بنا</a>  <br /><br />
                                        مرجعية المحاولة  <br />
                                        <span className="bg-white d-inline-block rounded-pill p-3 h4 mt-1 mb-0 text-brown shadow-sm">{params.TrackId}</span>
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    </Container>
                </FadeIn>
            )}
        </Styles>
    )
}