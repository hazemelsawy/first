import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { firebaseAuth } from './provider/AuthProvider'
import { withRouter } from 'react-router-dom'
import Firebase from './firebase/Firebase'
import { Form, Button, Modal } from 'react-bootstrap'
import logo from './assets/logo.png'

const Styles = styled.div`
  h4{
    color: #ae852f;
  }
  .logo img{
    max-width:280px;
  }
  .login-form{
      max-width:450px;
  }
`;
export const SigninDash = (props) => {

    const [modalShow, setModalShow] = React.useState(false);

    const { //handleSignin, 
        inputs, setInputs } = useContext(firebaseAuth)
    const [errors, setErrors] = useState(null)

    /*const handleSubmit = async (e) => {
        e.preventDefault()
        await handleSignin()
        props.history.push('/dashboard')
    }*/

    const login = (e) => {
        e.preventDefault();
        Firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password).then((u) => {
        }).catch((error) => {
            setErrors(error.message)
        });
    }
    const handleChange = e => {
        const { name, value } = e.target
        setInputs(prev => ({ ...prev, [name]: value }))
    }

    return (
        <Styles>
            <Container className="mt-3">
                <div className="logo mb-5 pt-3 text-center">
                    <a href="/"><img src={logo} alt="" /></a>
                </div>
                <h4 className="text-center font-weight-bold mb-3">تسجيل الدخول</h4>
                <Form onSubmit={login} className="text-right login-form mx-auto">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>البريد الإلكتروني</Form.Label>
                        <Form.Control onChange={handleChange} type="email" name="email" value={inputs.email} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>كلمة المرور</Form.Label>
                        <Form.Control onChange={handleChange} type="password" name="password" value={inputs.password} />
                    </Form.Group>
                    <Form.Group controlId="formBasicSubmit">
                        <Button variant="primary" className="" type="submit" block>
                            تسجيل الدخول
                        </Button>
                    </Form.Group>
                    <Form.Group controlId="formBasicError">
                        {errors && (<p className="alert alert-danger mt-3" style={{ color: 'red', wordWrap: 'break-word' }}>{errors}</p>)}
                    </Form.Group>
                    <Button variant="link" className="p-0" onClick={() => setModalShow(true)}>
                        نسيت كلمة السر ؟
                    </Button>

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />

                </Form>


            </Container>
        </Styles>
    )
}
export default withRouter(SigninDash);



function MyVerticallyCenteredModal(props) {
    const { //handleSignin, 
        inputs, setInputs } = useContext(firebaseAuth)
    const handleChange = e => {
        const { name, value } = e.target
        setInputs(prev => ({ ...prev, [name]: value }))
    }

    const resetEmail = () => {
        var auth = Firebase.auth();

        auth.sendPasswordResetEmail(inputs.resetEmail).then(function () {
            // Email sent.
            console.log("email sent")
            props.onHide();
        }).catch(function (error) {
            // An error happened.
            console.log(error)
        });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    ادخل عنوان البريد الإلكتروني
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="resetEmail">
                    <Form.Control type="email" onChange={handleChange} name="resetEmail" value={inputs.resetEmail} placeholder="e.g john@example.com" />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={resetEmail} type="submit">
                    ارسال إيميل بالتعليمات
                    </Button>
                <Button onClick={props.onHide} variant="secondary">غلق</Button>
            </Modal.Footer>
        </Modal>
    );
}