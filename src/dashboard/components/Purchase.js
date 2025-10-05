import React, { useContext } from 'react'
import { Col, Button, Accordion, Card, OverlayTrigger, Tooltip, Row } from 'react-bootstrap';
import { faTrashAlt, faCheck, faRedo, faTimes, faArchive, faUndoAlt, faCalendarCheck, faPrint, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResponseCode from '../../payment/responsecode'
import Firebase from '../../firebase/Firebase';
import { BookingsContext } from '../../contexts/Bookings'

import style from '../../index.css'
import style2 from '../../App.css'

const Purchase = (props) => {
    const booking = props.booking;
    const needToContact = props.needToContact;
    const archiveNotPaid = props.archiveNotPaid;
    const functions = Firebase.functions();
    const { dispatch } = useContext(BookingsContext);

    //console.log(booking);

    let params = {id: "1979879879", amount: 888};


    const confPay = e=>{
        const doubleCheckPay = functions.httpsCallable('doubleCheckPay');
        //console.log(params);

        doubleCheckPay(
            {
                params: params
            })
            .then((response) => {

                const urldecodeapi = response.data.json;
                console.log(response);
                //console.log(urldecodeapi);
                //setResponse(urldecodeapi.result);
                //setPhoneNumber(urldecodeapi.udf3);

                
            }).catch((error) => {
                //console.log(error);
            });
    }

    const printDiv = e => {
        var divToPrint = e.target.closest(".collapse.show");

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
        setTimeout(function(){newWin.close();},150);

    }


    return (
        <Card key={booking.id} className={booking.paid !== "yes" ? "d-block" : "d-block"}>
            <Card.Header className="p-0">
                <Accordion.Toggle as={Button} variant="link" eventKey={booking.id} className={`d-block w-100 text-right ${booking.paid !== "yes" ?
                    "not-paid" :
                    booking.needToContact !== false ? "successful need-to-contact" : "contacted"}`}
                    role="button"
                    aria-expanded="false"
                    aria-controls={"member" + booking.id} >
                    <span className="ml-2">{booking.fullName} </span>

                    {booking.paid === "yes" && booking.needToContact !== "archived" && (
                        <span className="float-left small text-secondary">{booking.needToContact !== false ? "🔊   جاري" : "🎉 تم"}</span>)}
                    {booking.paid === "yes" && booking.needToContact === "archived" && (
                        <span className="float-left small text-secondary">💰 مدفوع</span>)}
                    {booking.paid !== "yes" && (
                        <span className="float-left small"><span role="img" aria-label="block">🚫</span> لم يتم الدفع</span>)}

                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={booking.id}>
                <div id={"member" + booking.id}>
                    <div className="text-right px-md-4 py-md-3 p-2 overflow-hidden rounded-lg">
                        <div className="my-2 text-center overflow-hidden">
                            <Row>
                                <Col xs={6} md={8}>

                                    {booking.lastUpdate && (
                                        <div className="float-right small text-secondary last-update" style={{ textAlign: "right" }} >
                                            آخر تحديث بواسطة {booking.lastUpdate} بتاريخ  {booking.lastUpdateTime ? booking.lastUpdateTime.toDate().toLocaleString() : ""}
                                        </div>
                                    )}
                                </Col>
                                <Col xs={6} md={4} style={{ textAlign: "left" }}>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                الطباعة
                                        </Tooltip>
                                        }
                                    >
                                        <button onClick={(e) => printDiv(e)}
                                            style={{ lineHeight: "100%" }} className={`btn mr-2 btn-outline-dark`}>
                                            <FontAwesomeIcon icon={faPrint} />
                                        </button>
                                    </OverlayTrigger>

                                    {booking.paid === "yes" && (
                                        <>

                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id={`tooltip-bottom`}>
                                                        تم الإتصال وتحديد موعد
                                                </Tooltip>
                                                }
                                            >
                                                <button onClick={() => needToContact(booking.id, false)} disabled={booking.needToContact !== false ? false : true}
                                                    style={{ lineHeight: "100%" }} className={`btn mr-2 btn-outline-success ${booking.needToContact === true ? "" : "d-none"}`}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id={`tooltip-bottom-archive`}>
                                                        نقل إلى الأرشيف
                                                </Tooltip>
                                                }
                                            >
                                                <button onClick={() => needToContact(booking.id, "archived")} disabled={booking.needToContact === true ? true : false}
                                                    style={{ lineHeight: "100%" }} className={`btn mr-2 btn-outline-secondary ${booking.needToContact !== false ? "d-none" : ""}`}>
                                                    <FontAwesomeIcon icon={faArchive} />
                                                </button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id={`tooltip-bottom-call-again`}>
                                                        مطلوب الإتصال مجدداً وتحديد موعد
                                                </Tooltip>
                                                }
                                            >
                                                <button onClick={() => needToContact(booking.id, true)} disabled={booking.needToContact === true ? true : false}
                                                    style={{ lineHeight: "100%" }} className={`btn mr-2 btn-outline-info ${booking.needToContact !== false ? "d-none" : ""}`}>
                                                    <FontAwesomeIcon icon={faRedo} />
                                                </button>
                                            </OverlayTrigger>


                                            {booking.needToContact === "archived" && (
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id={`tooltip-bottom-archive`}>
                                                            إرجاع للقائمة
                                                        </Tooltip>
                                                    }
                                                >
                                                    <button onClick={(e) => needToContact(booking.id, true, e)}
                                                        style={{ lineHeight: "100%" }} className={`btn float-left mr-2 btn-outline-success`}>
                                                        <FontAwesomeIcon icon={faUndoAlt} />
                                                    </button>
                                                </OverlayTrigger>
                                            )}
                                        </>
                                    )}

                                    {booking.paid === "no" && (
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id={`tooltip-bottom-archive`}>
                                                    نقل إلى الأرشيف
                                        </Tooltip>
                                            }
                                        >
                                            <button onClick={(e) => archiveNotPaid(booking.id, "archived",e)}
                                                style={{ lineHeight: "100%" }} className={`btn float-left mr-2 btn-outline-secondary`}>
                                                <FontAwesomeIcon icon={faArchive} />
                                            </button>
                                        </OverlayTrigger>


                                    )}
                                    {booking.paid === "archived" && (
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id={`tooltip-bottom-archive`}>
                                                    إرجاع للقائمة
                                        </Tooltip>
                                            }
                                        >
                                            <button onClick={(e) => archiveNotPaid(booking.id, "no",e)}
                                                style={{ lineHeight: "100%" }} className={`btn float-left mr-2 btn-outline-success`}>
                                                <FontAwesomeIcon icon={faUndoAlt} />
                                            </button>
                                        </OverlayTrigger>
                                    )}

                                </Col>
                            </Row>








                        </div>
                        <Accordion className="mb-3">
                            <Accordion.Toggle as={Button} variant="primary2" eventKey="0" className={`d-block text-center w-100 text-right`}>
                                <FontAwesomeIcon icon={faCalendarCheck} /> محتويات الطلب
                                </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body className="pb-0">
                                    <div className="bg-white rounded-lg overflow-hidden text-right">
                                        {booking.orderContents && (
                                            booking.orderContents.map((book) => {
                                                return (
                                                    <Row key={book.uid} className="bg-light mb-3 rounded-lg p-3">
                                                        <Col xs={8} lg={9}>
                                                            <p className="text-black font-weight-bold">{book.promo}</p>
                                                            <div className="small">الكمية : {book.quantity}</div>
                                                        </Col>
                                                        <Col xs={4} lg={3}>
                                                            <p className="text-center font-weight-bold text-dark mb-0">{booking.applyTax ?
                                                                ((parseFloat(book.price).toFixed(2) * book.quantity) * 1.15).toFixed(2) :
                                                                (parseFloat(book.price).toFixed(2) * book.quantity).toFixed(2)} ريال</p>
                                                            {booking.applyTax && (
                                                                <p className="text-secondary text-center small my-0">
                                                                    الضريبة مضافة
                                                                </p>
                                                            )}
                                                        </Col>
                                                    </Row>
                                                )
                                            }))}

                                        <Row>
                                            <Col xs={8} lg={9}>
                                                <p className="text-black">المجموع</p>
                                                <div></div>
                                            </Col>
                                            <Col xs={4} lg={3}>
                                                <p className="text-center font-weight-bold text-dark mb-0">{booking.applyTax ?
                                                    booking.orderContents ? (parseFloat((booking.orderContents ? (booking.orderContents.reduce((a, v) => a = a + (v.price * v.quantity), 0)) : false)) * 1.15).toFixed(2) : false :
                                                    booking.orderContents ? parseFloat((booking.orderContents ? (booking.orderContents.reduce((a, v) => a = a + (v.price * v.quantity), 0)) : false)).toFixed(2) : false} ريال</p>
                                                {booking.applyTax && (
                                                    <p className="text-secondary text-center small my-0">
                                                        الضريبة مضافة
                                                    </p>
                                                )}
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col xs={8} lg={9}>
                                                <p className="text-black">المبلغ المستلم</p>
                                                <div></div>
                                            </Col>
                                            <Col xs={4} lg={3}>
                                                <p className="text-center font-weight-bold text-dark">{booking.amount > 0 && booking.responseCode === "000" ? booking.amount : "0.00"} ريال</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={8} lg={9}>
                                                <p className="text-black"></p>
                                                <div></div>
                                            </Col>
                                            <Col xs={4} lg={3} className="text-center">
                                                {(booking.applyTax ?
                                                    booking.orderContents ? (parseFloat((booking.orderContents ? (booking.orderContents.reduce((a, v) => a = a + (v.price * v.quantity), 0)) : false)) * 1.15).toFixed(2) : false :
                                                    booking.orderContents ? parseFloat((booking.orderContents ? (booking.orderContents.reduce((a, v) => a = a + (v.price * v.quantity), 0)) : false)).toFixed(2) : false)
                                                    === (booking.amount > 0 && booking.responseCode === "000" ? booking.amount : "0.00") && (
                                                        <h5 className="text-center text-success font-weight-bold">
                                                            <FontAwesomeIcon icon={faCheck} />
                                                        </h5>
                                                    )}
                                                {!((booking.applyTax ?
                                                    booking.orderContents ? (parseFloat((booking.orderContents ? (booking.orderContents.reduce((a, v) => a = a + (v.price * v.quantity), 0)) : false)) * 1.15).toFixed(2) : false :
                                                    booking.orderContents ? parseFloat((booking.orderContents ? (booking.orderContents.reduce((a, v) => a = a + (v.price * v.quantity), 0)) : false)).toFixed(2) : false)
                                                    === (booking.amount > 0 && booking.responseCode === "000" ? booking.amount : "0.00")) && (
                                                        <h5 className="text-center text-danger font-weight-bold">
                                                            <FontAwesomeIcon icon={faTimes} />
                                                        </h5>
                                                    )}
                                                    <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id={`tooltip-bottom`}>
                                                            تأكيد الدفع
                                                    </Tooltip>
                                                    }
                                                >
                                                    <button onClick={(e) => confPay(e)}
                                                        style={{ lineHeight: "100%" }} className={`btn mr-2 btn-outline-warning`}>
                                                        <FontAwesomeIcon icon={faMoneyBillAlt} />
                                                    </button>
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>

                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Accordion>

                        <div className="text-center mb-4">
                            <h5 className="bg-light py-2 rounded-lg text-dark">بيانات الزائر</h5>
                        </div>
                        <div className="row my-2 mx-auto border-bottom pb-2">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>الإسم بالكامل : </strong></Col>
                            <Col xs="7" md="8" xl="9">{booking.fullName}</Col>
                        </div>
                        <div className="row my-2 mx-auto border-bottom pb-2">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>رقم الجوال : </strong></Col>
                            <Col xs="7" md="8" xl="9"><a href={`tel:${booking.phoneNumber}`}>{booking.phoneNumber}</a></Col>
                        </div>
                        <div className="row my-2 mx-auto border-bottom pb-2">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>رقم الهوية : </strong></Col>
                            <Col xs="7" md="8" xl="9">{booking.idNumber}</Col>
                        </div>
                        {/*<div className="row my-2 mx-auto">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>البريد الإلكتروني : </strong></Col>
                            <Col xs="7" md="8" xl="9"><a href={`mailto:${booking.emailAddress}`}>{booking.emailAddress}</a></Col>
                        </div> */}
                        <div className="text-center my-4">
                            <h5 className="bg-light py-2 rounded-lg text-dark">التاريخ المرضي</h5>
                        </div>
                        {booking.generalDeclare === "no" && (
                            <div className="row my-2 mx-auto pb-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل لديك ماتصرح عنه ؟ : </strong></Col>
                                <Col xs="7" md="8" xl="9">{booking.generalDeclare === "yes" ? "نعم" : "لا"}</Col>
                            </div>
                        )}
                        {booking.generalDeclare === "yes" && (
                            <>
                                <div className="row my-2 mx-auto border-bottom pb-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>الجنس : </strong></Col>
                                    <Col xs="7" md="8" xl="9">{booking.gender}</Col>
                                </div>
                                <div className="row my-2 mx-auto border-bottom pb-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل تستعمل أدوية حالياً؟ : </strong></Col>
                                    <Col xs="7" md="8" xl="9">{booking.medication}</Col>

                                </div>
                                {booking.medication === "yes" && (
                                    <div className="row my-2 mx-auto border-bottom pb-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>إسم الأدوية : </strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.medicineName}</Col>
                                    </div>
                                )}
                                <div className="row my-2 mx-auto border-bottom pb-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل سبق أن أجريت عملية جراحية أو علاج بالآشعة ؟ :</strong></Col>
                                    <Col xs="7" md="8" xl="9">{booking.surgeryRadio}</Col>
                                </div>
                                <div className="row my-2 mx-auto border-bottom pb-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل سبق أن أصبت بالأمراض التالية :</strong></Col>
                                    <Col xs="7" md="8" xl="9">
                                        <div className="row">
                                            {booking.heartDiseases === "yes" && (
                                                <Col xs="4">
                                                    أمراض القلب : {booking.heartDiseases}
                                                </Col>
                                            )}
                                            {booking.kidneyDiseases === "yes" && (
                                                <Col xs="4">
                                                    أمراض الكلى : {booking.kidneyDiseases}
                                                </Col>
                                            )}
                                            {booking.liverDiseases === "yes" && (
                                                <Col xs="4">
                                                    التهاب الكبد الوبائي Hepatitis : {booking.liverDiseases}
                                                </Col>
                                            )}
                                            {booking.asthmaDiseases === "yes" && (
                                                <Col xs="4">
                                                    الربو : {booking.asthmaDiseases}
                                                </Col>
                                            )}
                                            {booking.bloodPressureDiseases === "yes" && (
                                                <Col xs="4">
                                                    أمراض ضغط الدم : {booking.bloodPressureDiseases}
                                                </Col>
                                            )}
                                            {booking.diabetesDiseases === "yes" && (
                                                <Col xs="4">
                                                    أمراض السكري : {booking.diabetesDiseases}
                                                </Col>
                                            )}
                                            {booking.cancerDiseases === "yes" && (
                                                <Col xs="4">
                                                    السرطان : {booking.cancerDiseases}
                                                </Col>
                                            )}
                                            {booking.thyroidDiseases === "yes" && (
                                                <Col xs="4">
                                                    امراض الغدة الدرقية : {booking.thyroidDiseases}
                                                </Col>
                                            )}
                                            {booking.epilepsyDiseases === "yes" && (
                                                <Col xs="4">
                                                    أمراض الصرع : {booking.epilepsyDiseases}
                                                </Col>
                                            )}
                                            {booking.aidsDiseases === "yes" && (
                                                <Col xs="4">
                                                    مرض نقص المناعة\الإيدز : {booking.aidsDiseases}
                                                </Col>
                                            )}
                                            {booking.reproductionDiseases === "yes" && (
                                                <Col xs="4">
                                                    أمراض تناسلية : {booking.reproductionDiseases}
                                                </Col>
                                            )}
                                            {booking.otherDiseases === "yes" && (
                                                <>
                                                    <Col xs="4">
                                                        أخرى : {booking.otherDiseases}
                                                    </Col>
                                                    {booking.otherDiseases === "yes" && (
                                                        <Col xs="12">
                                                            الأمراض الأخرى : <br />
                                                            {booking.otherDiseasesClarify}
                                                        </Col>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </Col>
                                </div>
                                <div className="row my-2 mx-auto border-bottom pb-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل أصابك أو أي من أفراد عائلتك أحد الأمراض المتعلقة بالنزيف أو التجلط ؟ :</strong></Col>
                                    <Col xs="7" md="8" xl="9">{booking.ruralCoagulation}</Col>
                                </div>
                                <div className="row my-2 mx-auto border-bottom pb-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل لديك حساسية ضد البنسلين أو أي دواء آخر ؟ :</strong></Col>
                                    <Col xs="7" md="8" xl="9">{booking.penicillinOther}</Col>
                                </div>
                                {booking.penicillinOther === "yes" && (
                                    <div className="row my-2 mx-auto border-bottom pb-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>وضح :</strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.penicillinOtherClarify}</Col>
                                    </div>
                                )}

                                <div className="row my-2 mx-auto border-bottom pb-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل سبق وتعالجت بأي من أدوية الكورتيزون ؟ : </strong></Col>
                                    <Col xs="7" md="8" xl="9">{booking.cortisone}</Col>
                                </div>
                                <div className="row my-2 mx-auto border-bottom pb-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل تدخن ؟ :</strong></Col>
                                    <Col xs="7" md="8" xl="9">{booking.smoking}</Col>
                                </div>
                                <div className="row my-2 mx-auto border-bottom pb-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل عانيت من أي مشاكل نتيجة لعلاج أسنانك ؟ :</strong></Col>
                                    <Col xs="7" md="8" xl="9">{booking.teethProblems}</Col>
                                </div>
                                <div className="row my-2 mx-auto border-bottom pb-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل تعاني من أي أمراض أو مشاكل صحية ليست مذكورة أعلاه ؟ :</strong></Col>
                                    <Col xs="7" md="8" xl="9">{booking.otherProblems}</Col>
                                </div>
                                {booking.otherProblems === "yes" && (
                                    <div className="row my-2 mx-auto border-bottom pb-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>وضح :</strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.otherProblemsClarify}</Col>
                                    </div>
                                )}
                                <div className="row my-2 mx-auto">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل يوجد ماتود التصريح عنه ؟ :</strong></Col>
                                    <Col xs="7" md="8" xl="9">{booking.declare}</Col>
                                </div>
                                {booking.declare === "yes" && (
                                    <div className="row my-2 mx-auto">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>التصريح :</strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.declaration}</Col>
                                    </div>
                                )}

                                {booking.gender === "female" && (
                                    <>
                                        <div className="row my-2 mx-auto border-bottom pb-2">
                                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل أنت حامل ؟ :</strong></Col>
                                            <Col xs="7" md="8" xl="9">{booking.pregnant}</Col>
                                        </div>
                                        {booking.pregnant === "yes" && (
                                            <div className="row my-2 mx-auto border-bottom pb-2">
                                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>موعد الولادة :</strong></Col>
                                                <Col xs="7" md="8" xl="9">{booking.birthDueDate}</Col>
                                            </div>
                                        )}
                                        <div className="row my-2 mx-auto border-bottom pb-2">
                                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل تعانين من إضطرابات الدورة الشهرية ؟ :</strong></Col>
                                            <Col xs="7" md="8" xl="9">{booking.menstrualDisorder}</Col>
                                        </div>
                                        <div className="row my-2 mx-auto border-bottom pb-2">
                                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل تستعملين حبوب منع الحمل ؟ :</strong></Col>
                                            <Col xs="7" md="8" xl="9">{booking.birthControl}</Col>
                                        </div>
                                    </>
                                )}
                                <div className="text-center my-4">
                                    <h5 className="bg-light py-2 rounded-lg text-dark">العلاج بالليزر</h5>
                                </div>
                                <div className="row my-2 mx-auto border-bottom pb-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل سبق لك ان عملت الليزر؟ :</strong></Col>
                                    <Col xs="7" md="8" xl="9">{booking.workedLasers}</Col>
                                </div>
                                <div className="row my-2 mx-auto">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل لديك تحسس جلدي؟ :</strong></Col>
                                    <Col xs="7" md="8" xl="9">{booking.skinAllergy}</Col>
                                </div>
                            </>
                        )}

                        <div className="text-center my-4">
                            <h5 className="bg-light py-2 rounded-lg text-dark">الموافقة</h5>
                        </div>
                        <div className="row my-2 mx-auto">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>وافق على الإقرار والشروط ؟ : </strong></Col>
                            <Col xs="7" md="8" xl="9">{booking.agreeToTerms === "yes" ? "نعم" : "لا"}</Col>
                        </div>

                        <div className="text-center my-4">
                            <h5 className="bg-light py-2 rounded-lg text-dark">الدفع</h5>
                        </div>
                        <div className="row my-2 mx-auto border-bottom pb-2">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>حالة الدفع : </strong></Col>
                            <Col xs="7" md="8" xl="9">{booking.paid}</Col>
                        </div>
                        <div className="row my-2 mx-auto border-bottom pb-2">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>قيمة العملية : </strong></Col>
                            <Col xs="7" md="8" xl="9">{booking.amount} ريال</Col>
                        </div>
                        <div className="row my-2 mx-auto border-bottom pb-2">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>رمز العملية : </strong></Col>
                            <Col xs="7" md="8" xl="9">{booking.responseCode}</Col>
                        </div>
                        <div className="row my-2 mx-auto border-bottom pb-2">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>دلالة رمز العملية :</strong></Col>
                            <Col xs="7" md="8" xl="9">{ResponseCode[booking.responseCode]}</Col>
                        </div>
                        <div className="row my-2 mx-auto border-bottom pb-2">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>عنوان الحوالة :</strong></Col>
                            <Col xs="7" md="8" xl="9">{booking.tranid}</Col>
                        </div>
                        <div className="row my-2 mx-auto border-bottom pb-2">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>مرجعية الحوالة :</strong></Col>
                            <Col xs="7" md="8" xl="9">{booking.trackid}</Col>
                        </div>
                        <div className="row my-2 mx-auto border-bottom pb-2">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>بيانات البطاقة :</strong></Col>
                            <Col xs="7" md="8" xl="9">{booking.maskedPAN}</Col>
                        </div>
                        <div className="row my-2 mx-auto border-bottom pb-2">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>نوع البطاقة :</strong></Col>
                            <Col xs="7" md="8" xl="9">{booking.cardBrand}</Col>
                        </div>
                        <div className="row my-2 mx-auto border-bottom pb-2">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>تاريخ التسجيل :</strong></Col>
                            <Col xs="7" md="8" xl="9">{booking.timestamp.toDate().toLocaleString()}</Col>
                        </div>
                        <div className="row my-2 mx-auto">
                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>تاريخ تنفيذ عملية الدفع :</strong></Col>
                            <Col xs="7" md="8" xl="9">{booking.trandate}</Col>
                        </div>


                        {props.admin && (
                            <div className="row mt-2">
                                <Col>
                                    <button onClick={() => props.tempDeleteBooking(booking.id)} className="float-left btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </Col>
                            </div>
                        )}
                    </div>
                </div>
            </Accordion.Collapse>
        </Card >
    )

}
export default Purchase