import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Container, Form, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { faPhoneAlt, faMapMarkerAlt, faEnvelope, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import pattern from '../assets/pattern.png'
import Axios from 'axios'
import ReCAPTCHA from "react-google-recaptcha";
import FadeIn from 'react-fade-in'
import Firebase from '../firebase/Firebase';
import ContentSkeleton from '../skeletons/Content'

const Styles = styled.div`
  h3, h4{
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
  .custom-control-label{
    padding-right:25px;
  }
  .custom-control-input{
    right:0 !important;
    left:auto;
  }
  .custom-control-label::after, .custom-control-label::before{
    right:0 !important;
  }
  .spinner{
    position: absolute;
    height: 100%;
    width: 100%;
    text-align: center;
    z-index: 2;
    background: rgba(255,255,255,0.6);
  }

`;
export const Contact = () => {

  const [content, setContent] = useState("");
  Firebase.firestore().collection('pages').doc("contact").get().then(snapshot => {
    console.log(snapshot.data()["content"])
    setContent(snapshot.data()["content"]);
  });

  //captcha 
  const recaptchaRef = React.useRef();

  const functions = Firebase.functions();

  const initialValues = {
    name: '',
    email: '',
    phoneNumber: '',
    content: '',
    ft: 'MSOAIK7FOZ'
  }

  var [values, setValues] = useState(initialValues);
  const [updatePending, setUpdatePending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentFailed, setSentFailed] = useState(false);
  const [reCaptchaError, setReCaptchaError] = useState(false);

  const handleInputChange = e => {
    if (e.target.type === "radio") {
      const label = document.querySelector(`[for='${e.target.id}']`);
      let id = e.target.name
      let value = label.innerHTML;
      setValues({
        ...values,
        [id]: value
      })
    } else {
      let { id, value } = e.target;
      setValues({
        ...values,
        [id]: value
      })
    }


  }


  const handleSubmit = event => {
    event.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();
    if (recaptchaValue) {
      setReCaptchaError(false);
      setUpdatePending(true)
      sendEmail()
    } else {
      setReCaptchaError(true);
    }
  }
  const sendEmail = () => {
    const sendEmail = functions.httpsCallable('sendEmail');
    setSentFailed(false)
    sendEmail(values).then(result => {
      if (result.data.isEmailSend) {
        clearForm()
        setUpdatePending(false)
        setSent(true)
      } else {
        setUpdatePending(false)
        setSentFailed(true)
      }
    }).catch(err => {
      setUpdatePending(false)
      setSentFailed(true)
    })
  }

  const clearForm = () => {
    setValues(initialValues)
    var ele = document.getElementsByName("noteType");
    for (var i = 0; i < ele.length; i++)
      ele[i].checked = false;
  }




  return (
    <Styles>
      <Container className="text-right">
        <h3 className="text-center font-weight-bold mb-4">الإتصال بنا</h3>

        <FadeIn>
          <div className="mt-3 contact-container position-relative p-3 rounded-lg overflow-hidden">
            <div className="bg-white p-3 rounded-lg">
              <Row>
                <Col xs={12} md={5}>
                  <div className="text-center text-md-right mb-5 mb-md-0">
                    {content !== "" && (
                      <div className="text-center text-md-right mb-5 mb-md-0" dangerouslySetInnerHTML={{ __html: content }}>
                      </div>
                    )}
                    {content === "" && (
                            <ContentSkeleton />
                    )}
                  </div>
                </Col>
                <Col xs={12} md={7}>
                  <div>
                    <h5 className="mb-3 text-center text-md-right"><a target="_blank" rel="noopener noreferrer" href="https://maps.google.com/maps?ll=24.72653,46.69076&z=16&t=m&hl=en&gl=GB&mapclient=embed&daddr=%D9%85%D8%B1%D9%83%D8%B2%20%D8%A7%D9%84%D8%A5%D8%AE%D8%AA%D8%B5%D8%A7%D8%B5%D9%8A%20%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%20%D8%A7%D9%84%D8%A3%D9%88%D9%84%20%D8%B7%D8%B1%D9%8A%D9%82%20%D8%A7%D9%84%D9%85%D9%84%D9%83%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B9%D8%B2%D9%8A%D8%B2%D8%8C%20Salahuddin%20%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%2012432%20Saudi%20Arabia@24.7265301,46.6907597" className="text-dark">موقعنا <FontAwesomeIcon icon={faMapMarkerAlt} /></a></h5>

                    <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0102001578043!2d46.68857101595139!3d24.72653008411724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f02e9f457e9ff%3A0xae724b6c2bf04d31!2z2YXYsdmD2LIg2KfZhNil2K7Yqti12KfYtdmKINin2YTYt9io2Yog2KfZhNij2YjZhA!5e0!3m2!1sen!2suk!4v1607991451267!5m2!1sen!2suk"
                      width="100%" height="350" frameBorder="0" style={{ border: '0' }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </FadeIn>

        <Form className="py-3 position-relative" onSubmit={handleSubmit} method="POST">


          <FadeIn>

            <div className="contact-container position-relative p-3 rounded-lg overflow-hidden">

              <h4 className="text-center mb-3">الإقتراحات والملاحظات</h4>
              {/**<Form.Group controlId="exampleForm.ControlSelect2">
                <div className="bg-white rounded-lg p-3">
                  <Form.Label>نوع الملاحظة أو الإقتراح:</Form.Label>
                  {['radio'].map((type) => (
                    <div key={`custom-${type}`}>
                      <Form.Check
                        custom
                        required
                        onChange={handleInputChange}
                        name="noteType"
                        type={type}
                        id={`radio1`}
                        label={`1`}
                      />

                      <Form.Check
                        custom
                        required
                        onChange={handleInputChange}
                        name="noteType"
                        type={type}
                        label={`3`}
                        id={`radio2`}
                      />

                      <Form.Check
                        custom
                        required
                        onChange={handleInputChange}
                        name="noteType"
                        type={type}
                        label={`3`}
                        id={`radio3`}
                      />

                      <Form.Check
                        custom
                        required
                        onChange={handleInputChange}
                        name="noteType"
                        type={type}
                        label={`4`}
                        id={`radio4`}
                      />
                      <Form.Check
                        custom
                        required
                        onChange={handleInputChange}
                        name="noteType"
                        type={type}
                        label={`5 ملاحظات اخرى`}
                        id={`radio5`}
                      />
                    </div>
                  ))}
                </div>
              </Form.Group> */}
              <Form.Group controlId="name">
                <Form.Label>الإسم (إجباري)</Form.Label>
                <Form.Control required onChange={handleInputChange} value={values.name || ""} type="text" placeholder="" />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>البريد الإلكتروني (إختياري)</Form.Label>
                <Form.Control onChange={handleInputChange} value={values.email || ""} type="email" placeholder="" />
              </Form.Group>
              <Form.Group controlId="phoneNumber">
                <Form.Label>رقم الجوال (إجباري)</Form.Label>
                <Form.Control required pattern="^((?:[+?0?0?966]+)(?:\s?\d{2})(?:\s?\d{7}))$" onChange={handleInputChange} value={values.phoneNumber || ""} type="tel" placeholder="" />
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>المحتوى (حد أقصى ١٥٠ حرف)</Form.Label>
                <Form.Control required onChange={handleInputChange} as="textarea" maxLength="150" value={values.content || ""} rows={3} />
              </Form.Group>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Ld63QsaAAAAADXxvGvu5ERkgXAkhxaxEzvlFT0Q"
              />
              {reCaptchaError && (
                <Alert variant="danger" className="mt-3">
                  من فضلك إثبت انك لست آلي
                </Alert>
              )}
              <Button type="submit" className="mt-3" block disabled={updatePending || sent}>
                {!updatePending && !sent && !sentFailed && (
                  <span>إرسال الطلب</span>
                )}
                {updatePending && (
                  <span><Spinner animation="border" variant="white" size="sm" className="ml-2" />
                    جاري الإرسال...</span>
                )}
                {sent && (
                  <span>
                    <span className="ml-2"><FontAwesomeIcon icon={faCheckCircle} /></span>
                  شكراً لكم, تم الإرسال!
                  </span>
                )}
                {sentFailed && (
                  <span>
                    <FontAwesomeIcon icon={faTimes} className="ml-2" />
                    خطأ في الإرسال, برجاء المحاولة مرة أخرى لاحقاً!
                  </span>
                )}
              </Button>


            </div>
          </FadeIn>

        </Form>



      </Container>
    </Styles>
  )

}
