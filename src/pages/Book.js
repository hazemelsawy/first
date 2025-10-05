import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Alert, Spinner, Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';
import Step1 from '../components/Step1'
import Step2 from '../components/Step2'
import Step3 from '../components/Step3'
import FadeIn from 'react-fade-in'
import axios from 'axios';
import Firebase from '../firebase/Firebase'
import { BookingsContext } from '../contexts/Bookings'
import pattern from '../assets/pattern.png'
import Axios from 'axios'

const Styles = styled.div`
  h3{
    color: #ae852f;
  }
  .arrowProgress{
    padding-left:35px;
  }
  .col-6 div{
    height:40px;
    line-height:40px;
    padding-right:20px;
  }
  .col-6 div.bg-success:before{
    content: '';
    border-right: 20px solid #28a745;
    border-bottom: 20px solid transparent;
    border-top: 20px solid transparent;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    margin-left:-20px;
  }
  .col-6 div.current{
    background-color: #1a732f !important;
  }
  .col-6 div.current:before{
    border-right: 20px solid #1a732f;
  }
  .col-6 div:before{
    content: '';
    border-right: 20px solid #f8f9fa; 
    border-bottom: 20px solid transparent;
    border-top: 20px solid transparent;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    margin-left:-20px;
  }
  .first-step{
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .button{
    cursor: pointer;
  }
  .button:hover {
    background: #21913b !important;
  }
  .button:active {
    background: #17662a !important;
  }
  .button:hover:after{
    content: '';
    border-right: 20px solid #21913b;
    border-bottom: 20px solid transparent;
    border-top: 20px solid transparent;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    margin-left:-20px;
  }
  .button:active:after{
    content: '';
    border-right: 20px solid #17662a;
    border-bottom: 20px solid transparent;
    border-top: 20px solid transparent;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    margin-left:-20px;
  }
  .patternbg-container::before {
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

export const Book = () => {
  const functions = Firebase.functions();
  /*if (!document.referrer.includes("bookings-preview")) {
    window.location.href = "/bookings-preview";
  }*/
  //const { handleDelete, getBookings, bookings } = useContext(firebaseData)
  const { totalFire, totalObjFire, applyTax } = useContext(BookingsContext);

  const [redirectionError, setRedirectionError] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const initialValues = {
    paid: "no",
    paymentMethod: "mada"
  }
  var [values, setValues] = useState(initialValues);
  const [currentStep, setCurrentStep] = useState(1);
  const [goToPayment, setGoToPayment] = useState(false);


  const handleInputChange = e => {
    if (e instanceof Date) {
      setValues({
        ...values,
        birthDueDate: e.toLocaleString()
      })
      return null
    }
    if (e.target.type === "checkbox") {
      let val = null;
      if (e.target.checked) {
        val = "yes"
      } else {
        val = "no"
      }
      let { name } = e.target

      setValues({
        ...values,
        [name]: val
      })
      return null;
    }
    let { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    })
  }
  /*function previousButton() {
    let current = currentStep;
    if (current !== 1) {
      return (
        <div className="overflow-hidden mb-3">
          <button
            className="btn btn-sm btn-light previous float-right text-secondary"
            type="button" onClick={_prev}>
            <FontAwesomeIcon className="ml-2" icon={faAngleRight} />
          السابق
        </button>
        </div>
      )
    }
    return null;
  }*/

  /*function nextButton() {
    let current = currentStep;
    if (current < 2) {
      return (
        <Button
          variant="primary"
          size="lg" block
          type="button" onClick={_next}>
          التالي
        </Button>
      )
    }
    return null;
  }*/

  const _next = (e) => {
    let current = currentStep
    current = currentStep >= 2 ? 3 : currentStep + 1
    setCurrentStep(current)
    window.scrollTo(0, 0)
    //console.log(currentStep)
  }

  const _prev = () => {
    let current = currentStep
    current = currentStep <= 1 ? 1 : currentStep - 1
    setCurrentStep(current)
    window.scrollTo(0, 0)
  }

  // handle submit
  const handleSubmit = (e) => {
    //document.getElementById("nextButton").disabled = true;
    e.preventDefault();
    //console.log(e.target.checkValidity());
    handleAddBooking(values);
  }

  const handleAddBooking = (e) => {
    setGoToPayment(true);
    //Firestore
    values = {
      ...values,
      orderContents: totalObjFire,
      applyTax: applyTax,
    }
    //console.log(values);


    const reqPay = functions.httpsCallable('reqPay');
    let valuesObj = {
      values: values,
      amount: totalFire || 0,
    }
    reqPay(valuesObj).then(response => {
      if (response.data.json.targetUrl === null || response.data.json.payid === null) {

        setGoToPayment(false);
        setRedirectionError(true);
        const getIp = functions.httpsCallable('getIp');
        getIp().then(result => {
          const sendEmailNotification = functions.httpsCallable('sendEmailNotification');
          sendEmailNotification(
            {
              title: "Redirection error",
              content: `
              ip address: ${result.data} <br>
              total: ${totalFire || 0} <br>
              url: ${response.data.json.targetUrl} <br>
              payid: ${response.data.json.payid} <br>
              phoneNumber: ${values.phoneNumber || ""} <br>
              `,
              ft: "MSOAIK7FOZ"
            }
          )
            .then(res => {
              const redirectionErrors = functions.httpsCallable('redirectionErrors');
              redirectionErrors({
                ip: result.data,
                total: totalFire || 0,
                url: response.data.json.targetUrl,
                payid: response.data.json.payid,
                phoneNumber: values.phoneNumber || "",
                timestamp: Firebase.firestore.FieldValue.serverTimestamp()
              }).then(result => { })
            })
            .catch(error => {
              const redirectionErrors = functions.httpsCallable('redirectionErrors');
              redirectionErrors({
                ip: result.data,
                total: totalFire || 0,
                url: response.data.json.targetUrl,
                payid: response.data.json.payid,
                phoneNumber: values.phoneNumber || "",
                timestamp: Firebase.firestore.FieldValue.serverTimestamp()
              }).then(result => { })
            })
        })
      } else {
        window.location.replace(response.data.json.targetUrl + '?paymentid=' + response.data.json.payid)
      }
    }).catch((error) => {
      console.log(error)
      setRedirectionError(true);
    });
  }

  return (
    <Styles>
      {!redirectionError && (
        <>
          {goToPayment && (
            <FadeIn>
              <Container className="text-right py-5 text-center">
                <Alert variant="light">
                  <div className=""><Spinner animation="border" variant="success" /></div>
                  <Alert.Heading className="py-3">جاري التحويل لصفحة الدفع</Alert.Heading>
                  <p className="text-secondary small">( برجاء عدم غلق الصفحة )</p>
                </Alert>
              </Container>
            </FadeIn>
          )}

          {!(goToPayment || redirectionError) && (
            <Container>
              <h3 className="text-center font-weight-bold mb-4">الحجز</h3>

              <Container className="arrowProgress mb-3">
                <Row className="text-center">
                  <Col xs="6" className="px-0">
                    <div className={currentStep === 1 ? "first-step text-white current" : "first-step bg-success text-white button"} onClick={currentStep !== 1 ? _prev : null}><span>البيانات</span></div>
                  </Col>
                  <Col xs="6" className="px-0">
                    <div className={currentStep >= 2 ? currentStep === 2 ? "text-white current" : "bg-success text-white" : "bg-light text-secondary"}>التاريخ المرضي</div>
                  </Col>
                </Row>
              </Container>

              <Step1 currentStep={currentStep} next={_next} handleInputChange={handleInputChange} handleSubmit={handleSubmit} values={values} />
              <Step2 currentStep={currentStep} handleInputChange={handleInputChange} handleAddBooking={handleAddBooking} values={values} setModalShow={setModalShow} />
              <Step3 currentStep={currentStep} handleInputChange={handleInputChange} values={values} />




              <p className="text-right mt-3">* حقل مطلوب</p>
            </Container>
          )}
        </>
      )}

      {redirectionError && (
        <FadeIn>
          <Container className="text-right py-5 text-center">
            <Alert variant="danger">
              <Alert.Heading className="py-3">خطأ في التحويل, برجاء إعادة المحاولة</Alert.Heading>
              <p className="text-secondary small">إذا استمرت المشكلة فضلاً استخدم متصفح آخر</p>              
                          </Alert>
          </Container>
        </FadeIn>
      )}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Styles >
  )
}


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-right"
    >
      <Modal.Body>
        <h4 className="mb-3">بعض العروض لم تعد متاحة</h4>
        <p>
          نأسف لكم بعض العروض المضافة لم تعد متاحة, جاري تحويلكم لصفحة العروض والحجوزات لتحديث العروض <br /> <br />
          إذا لم يتم تحويلكم برجاء الضغط هنا <a href="/bookings-preview">العروض والحجوزات</a>
        </p>
      </Modal.Body>

    </Modal>
  );
}
