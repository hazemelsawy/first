import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { Button, Form, Accordion, Toast, Row, Col, Modal, Spinner, Alert } from "react-bootstrap";
import Firebase from '../firebase/Firebase';
import { firebaseData } from '../provider/DataProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Styles = styled.div`
    h4{
    color: #ae852f;
    word-wrap: break-word
  }
  .spinner{
    position: absolute;
    height: 94%;
    width: 100%;
    text-align: center;
    z-index: 2;
    background: rgba(255,255,255,0.9);
  }

`;

export const Admin = () => {
    const functions = Firebase.functions();

    //confirm modal
    const [controlledUser, setControlledUser] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [changePasswordModalShow, setChangePasswordModalShow] = useState(false);

    //handle modal 
    const handleClose = () => setModalShow(false);
    const handleCloseChangePassword = () => setChangePasswordModalShow(false);

    const [updatePending, setUpdatePending] = useState(false);

    //users
    const [users, setUsers] = useState([])

    const initState = { email: '', password: '', repeatPassword: '', role: 'employee' }
    const [inputs, setInputs] = useState(initState)
    const { admin, currentUser } = useContext(firebaseData);

    const [toastShow, setToastShow] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [toastHeading, setToastHeading] = useState(null);
    const [toastBackgroundClass, setToastBackgroundClass] = useState("");

    const handleSubmit = e => {
        e.preventDefault()
        if (inputs.password !== inputs.repeatPassword) {
            setToastHeading("خطأ")
            setToastMessage("الباسورد غير مطابق!")
            setToastBackgroundClass("bg-danger")
            setToastShow(true)
            return false;
        }
        setUpdatePending(true)
        const createUser = functions.httpsCallable('createUser');
        createUser({
            email: inputs.email,
            password: inputs.password,
        }).then(result => {
            if (result.data.error !== undefined) {
                setUpdatePending(false)
                setToastHeading("Error")
                setToastMessage(result.data.error.toString())
                setToastBackgroundClass("bg-danger")
                setToastShow(true)
                return false
            }
            let user = {
                email: inputs.email,
                userId: result.data.message.uid,
                role: inputs.role,
                timestamp: Firebase.firestore.FieldValue.serverTimestamp()
            }
            if (result.data.message !== undefined) {
                if (inputs.role === "admin") {
                    const addAdminRole = functions.httpsCallable('addAdminRole');
                    addAdminRole({ email: inputs.email }).then(result => {
                        if (result.data.message !== undefined) {
                            Firebase.firestore().collection("users").add(user)
                                .then(function (docRef) {
                                    setUpdatePending(false)
                                    setToastHeading("اشعار")
                                    setToastMessage("تم الإضافة بنجاح!")
                                    setToastBackgroundClass("bg-success")
                                    setToastShow(true)
                                })
                                .catch(function (error) {
                                    setUpdatePending(false)
                                    console.error("Error adding document: ", error);
                                    setToastHeading("Error")
                                    setToastMessage(error.toString())
                                    setToastBackgroundClass("bg-danger")
                                    setToastShow(true)
                                });
                        } else {
                            setUpdatePending(false)
                            console.error(result.data.error);
                            setToastHeading("Error")
                            setToastMessage(result.data.error.toString())
                            setToastBackgroundClass("bg-danger")
                            setToastShow(true)
                        }
                    }).catch(err => {
                        setUpdatePending(false)
                        console.error(err);
                        setToastHeading("Error")
                        setToastMessage(err.toString())
                        setToastBackgroundClass("bg-danger")
                        setToastShow(true)
                    })
                } else {
                    const removeAdminRole = functions.httpsCallable('removeAdminRole');
                    removeAdminRole({ uid: result.data.message.uid }).then(result => {
                        if (result.data.message !== undefined) {
                            Firebase.firestore().collection("users").add(user)
                                .then(function (docRef) {
                                    setUpdatePending(false)
                                    setToastHeading("اشعار")
                                    setToastMessage("تم الإضافة بنجاح!")
                                    setToastBackgroundClass("bg-success")
                                    setToastShow(true)
                                })
                                .catch(function (error) {
                                    setUpdatePending(false)
                                    console.error("Error adding document: ", error);
                                    setToastHeading("Error")
                                    setToastMessage(error.toString())
                                    setToastBackgroundClass("bg-danger")
                                    setToastShow(true)
                                });
                        } else {
                            setUpdatePending(false)
                            console.error(result.data.error);
                            setToastHeading("Error")
                            setToastMessage(result.data.error.toString())
                            setToastBackgroundClass("bg-danger")
                            setToastShow(true)
                        }
                    }).catch(err => {
                        setUpdatePending(false)
                        console.error(err);
                        setToastHeading("Error")
                        setToastMessage(err.toString())
                        setToastBackgroundClass("bg-danger")
                        setToastShow(true)
                    })
                }
            } else {
                setUpdatePending(false)
                setToastMessage(result.data.error.toString())
                setToastBackgroundClass("bg-danger")
                setToastShow(true)
            }
        }).catch(err => {
            setUpdatePending(false)
            console.error(err);
            setToastHeading("Error")
            setToastMessage(err.toString())
            setToastBackgroundClass("bg-danger")
            setToastShow(true)
        })
    }

    const handleInputChange = e => {
        var { id, value } = e.target

        setInputs({
            ...inputs,
            [id]: value
        })
    }
    useEffect(() => {
        const unsub = Firebase.firestore().collection('users').onSnapshot(snapshot => {
            const allUsers = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(allUsers);
        });
        return () => {
            unsub();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const delUser = (docId, uid) => {
        setModalShow(false)
        setUpdatePending(true)
        const delUser = functions.httpsCallable('deleteUser');
        delUser({ uid: uid }).then(result => {
            if (result.data.message !== undefined) {
                Firebase.firestore().collection("users").doc(docId).delete().then(function () {
                    setUpdatePending(false)
                }).catch(function (error) {
                    setUpdatePending(false)
                    console.error("Error removing document: ", error);
                });
            } else {
                setUpdatePending(false)
                console.error(result.data.error);
            }

        }).catch(err => {
            setUpdatePending(false)
            console.error(err);
        })
    }

    const removeAdminRole = (docId, uid) => {
        setUpdatePending(true)
        const removeAdminRole = functions.httpsCallable('removeAdminRole');
        removeAdminRole({ uid: uid }).then(result => {
            if (result.data.message !== undefined) {
                Firebase.firestore().collection("users").doc(docId).update({ role: "employee" })
                    .then(() => {
                        setUpdatePending(false)
                    })
                    .catch(function (error) {
                        setUpdatePending(false)
                        console.error("Error adding document: ", error);
                    });
            } else {
                setUpdatePending(false)
                console.error(result.data.error);
            }
        }).catch(err => {
            setUpdatePending(false)
            console.error(err);
        })
    }

    const addAdminRole = (docId, email) => {
        setUpdatePending(true)
        const addAdminRole = functions.httpsCallable('addAdminRole');
        addAdminRole({ email: email }).then(result => {
            if (result.data.message !== undefined) {
                Firebase.firestore().collection("users").doc(docId).update({ role: "admin" })
                    .then(() => {
                        setUpdatePending(false)
                    })
                    .catch(function (error) {
                        setUpdatePending(false)
                        console.error("Error adding document: ", error);
                    });
            } else {
                setUpdatePending(false)
                console.error(result.data.error);
            }
        }).catch(err => {
            setUpdatePending(false)
            console.error(err);
        })
    }
    const tempDelUser = (docId, uid) => {
        setControlledUser({
            docId: docId,
            uid: uid
        });
        setModalShow(true)
    }

    const [changePasswordUID, setChangePasswordUID] = useState("");
    const [changePasswordError, setChangePasswordError] = useState(false);


    const changePassword = (docId, uid) => {
        setControlledUser({
            docId: docId,
            uid: uid
        });
        setChangePasswordModalShow(true)
        setChangePasswordUID(uid);
        setChangePasswordError(false);
    }

    const changePasswordFinal = (e) => {
        e.preventDefault();
        if (inputs["changePassword"]) {
            if (inputs["changePassword"] === inputs["repeatChangePassword"] && inputs["changePassword"].length >= 6) {
                setChangePasswordError(false);
                const updatePassword = functions.httpsCallable('updatePassword');
                updatePassword({
                    password: inputs["changePassword"]
                }).then(result => {
                    setChangePasswordModalShow(false);
                    setToastHeading("اشعار")
                    setToastMessage("تم التغيير بنجاح")
                    setToastBackgroundClass("bg-success")
                    setToastShow(true)
                    return false;
                }).catch(error =>{
                    setChangePasswordError(true);
                })
            }
        } else {
            setChangePasswordError(true);
        }

    }


    return (
        <Styles className="text-right p-3 position-relative">
            {updatePending && (
                <div className="spinner py-5">
                    <Spinner animation="border" className="mt-5" variant="secondary" /> <br /><br />
                    <h5>جاري التنفيذ...</h5>
                </div>
            )}
            {admin && (

                <Accordion>
                    <Card>
                        <Card.Header className="p-0">
                            <Accordion.Toggle as={Button} variant="light" size="lg" eventKey="0" block>
                                <FontAwesomeIcon icon={faPlus} /> إضافة محرر
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">

                            <Form className="p-3" onSubmit={handleSubmit}>
                                <Form.Group controlId="email">
                                    <Form.Label>البريد الإلكتروني</Form.Label>
                                    <Form.Control onChange={handleInputChange} type="email" placeholder="e.g. john@example.com" />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>الرقم السري</Form.Label>
                                    <Form.Control onChange={handleInputChange} type="password" />
                                </Form.Group>
                                <Form.Group controlId="repeatPassword">
                                    <Form.Label>كرر الرقم السري</Form.Label>
                                    <Form.Control onChange={handleInputChange} type="password" />
                                </Form.Group>

                                <Form.Group controlId="role">
                                    <Form.Label>الصلاحيات</Form.Label>
                                    <Form.Control as="select" custom onChange={handleInputChange}>
                                        <option value="employee">محرر</option>
                                        <option value="admin">مدير</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    تنفيذ
                                        </Button>
                            </Form>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

            )}
            <Row className="mt-3">
                {users.map((user) =>
                    <Col xs={12} md={6} lg={4} key={user.id} className="mb-3">
                        <div className="bg-light rounded-lg p-3">
                            <div className="bg-white p-2">
                                <h4 className="h5 text-center">{user.email}</h4>
                                <h6 className="text-center mb-0">{user.role === "admin" ? "مدير" : "محرر"}</h6>
                                <div className="text-left mt-3">
                                    <Button onClick={() => changePassword(user.id, user.email)} className="mx-1" variant="light" size="sm">تغيير كلمة السر</Button>

                                    {(user.role === "admin" && admin) && (currentUser.email !== user.email) && (
                                        <Button onClick={() => removeAdminRole(user.id, user.userId)} className="mx-1" variant="light" size="sm">إجعله محرر</Button>
                                    )}
                                    {(user.role === "employee" && admin) && (currentUser.email !== user.email) && (
                                        <Button onClick={() => addAdminRole(user.id, user.email)} className="mx-1" variant="light" size="sm">إجعله مدير</Button>
                                    )}
                                    {admin && (currentUser.email !== user.email) && (
                                        <Button onClick={() => tempDelUser(user.id, user.userId)} className="mx-1" variant="outline-danger" size="sm"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                    )}
                                    {!(currentUser.email !== user.email) && (
                                        <span className="text-secondary h6">المستخدم الحالي</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Col>
                )}
            </Row>
            <Toast className={`toast ${toastBackgroundClass}`} onClose={() => setToastShow(false)} show={toastShow} delay={4000} autohide>
                <Toast.Header>
                    <strong className="mr-auto message">{toastHeading}</strong>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2 float-right"
                        alt=""
                    />
                </Toast.Header>
                <Toast.Body className="text-white">{toastMessage}</Toast.Body>
            </Toast>
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
                            <Button variant="danger" onClick={() => delUser(controlledUser.docId, controlledUser.uid)} block>نعم</Button>
                        </Col>
                    </Row>
                </Modal.Body>

            </Modal>

            <Modal
                show={changePasswordModalShow}
                onHide={handleCloseChangePassword}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className="p-4">
                    <h4 className="text-right mb-3">تغيير كلمة السر</h4>
                    <Form className="text-right">
                        <Form.Group controlId="changePassword">
                            <Form.Label>كلمة السر</Form.Label>
                            <Form.Control type="password" onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="repeatChangePassword">
                            <Form.Label>كرر كلمة السر</Form.Label>
                            <Form.Control type="password" onChange={handleInputChange} />
                        </Form.Group>
                        <Button variant="primary" onClick={changePasswordFinal} block>
                            تطبيق
                        </Button>
                        <Button variant="light" className="mb-2" onClick={() => setChangePasswordModalShow(false)} block>غلق</Button>
                        {changePasswordError && (
                            <Alert variant="danger">
                                خطأ, برجاء إعادة المحاولة
                            </Alert>
                        )}
                    </Form>
                </Modal.Body>

            </Modal>
        </Styles>
    );
};
