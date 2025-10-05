import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import FadeIn from 'react-fade-in'
import { BookingsContext } from '../contexts/Bookings'

const Styles = styled.div`
  input[type="radio"]{
      width:30px;
      height:30px;
  }
  #agreeToTerms{
      width:30px;
      height:30px;
  }
  .form-group {
    background: rgb(174,133,47);
    background: radial-gradient(circle, rgb(255 238 201 / 10%) 0%, rgb(179 144 72 / 20%) 100%);
    padding: 20px;
    border-radius: 10px;
  }
  .form-group .form-group{
      background:none !important;
      border:none !important;
  }
  .alert-warning{
    background:#fff3cd
  }
  .form-group span{
      overflow:hidden;
      display:inline-block;
      padding-top:15px;
  }
  span label{
      float:right;
      margin-top:5px;
  }
  span input[type="radio"]{
    float:right;
    margin-left: 20px;
  }
  li input[type="checkbox"]{
      width:20px;
      height:20px;
  }
   
`;
export default function Step1(props) {

    const { setApplyTax } = useContext(BookingsContext);

    if (props.currentStep !== 1) { // Prop: The current step
        return null
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        var tax = Number(String(props.values.idNumber).charAt(0)) === 1 ? false : true;
        setApplyTax(tax);
        props.next();
    }

    // The markup for the Step 1 UI
    return (

        <Styles>
            <Form onSubmit={handleFormSubmit}>
                <FadeIn>
                    <h5 className="text-center mb-3 font-weight-bold">بيانات الإتصال</h5>

                    <Form.Group controlId="email" className="text-right">
                        <Form.Label>رقم الهوية *</Form.Label>
                        <Form.Control required type="tel" pattern="^(?=\d{10}$)(1|2)\d+" maxLength="10" name="idNumber" value={props.values.idNumber || ''} onChange={props.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="phoneNumber" className="text-right">
                        <Form.Label> رقم الجوّال  *</Form.Label>
                        <Form.Control required type="tel" pattern="^((?:[+?0?0?966]+)(?:\s?\d{2})(?:\s?\d{7}))$" name="phoneNumber" value={props.values.phoneNumber || ''} onChange={props.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="fullName" className="text-right">
                        <Form.Label>الإسم بالكامل *</Form.Label>
                        <Form.Control required type="text" name="fullName" value={props.values.fullName || ''} onChange={props.handleInputChange} />
                    </Form.Group>


                    <button
                        className="btn btn-primary btn-block btn-lg"
                    >
                        التالي
                    </button>
                </FadeIn>
            </Form>

        </Styles>


    )
}