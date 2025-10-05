import React, { useContext } from 'react'
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { firebaseAuth } from './provider/AuthProvider'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
const Styles = styled.div`
  h3{
    color: #ae852f;
  }
`;
export const Signup = (props) => {

    const { handleSignup, inputs, setInputs, errors } = useContext(firebaseAuth)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleSignup()
    }
    const handleChange = e => {
        const { name, value } = e.target
        setInputs(prev => ({ ...prev, [name]: value }))
    }

    return (
        <Styles>
            <Container>
                <h3 className="text-center font-weight-bold mb-4">التسجيل</h3>
                <Form onSubmit={handleSubmit} className="text-right">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>البريد الإلكتروني</Form.Label>
                        <Form.Control onChange={handleChange} type="email" name="email" value={inputs.email} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>كلمة المرور</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="password" value={inputs.password} />
                    </Form.Group>
                    <Button variant="primary" className="btn-block" type="submit">
                        تسجيل
                </Button>
                    {errors.length > 0 ? errors.map((error, i) => <p key={i} style={{ color: 'red' }}>{error}</p>) : null}
                </Form>
            </Container>
        </Styles>
    )
}

export default withRouter(Signup);
