import React, { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Booking from '../components/Booking'
import { BookingsContext } from '../contexts/Bookings'
import pattern from '../assets/pattern.png'
import FadeIn from 'react-fade-in'

const Styles = styled.div`
  h3{
    color: #ae852f;
  }
  .book{
    background: radial-gradient(circle, rgb(255 238 201 / 10%) 0%, rgb(179 144 72 / 20%) 100%);
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
export const BookingsPreview = () => {
  const { dispatch, bookings, total, totalFire } = useContext(BookingsContext);

  const checkBookingExists = (id, index) => {
    let i = 0;
    bookings.some(function (el) {
      if (el.id === id && el.index === index) {
        i++;
      }
    });
    return i;
  }


  return (
    <Styles>
      <Container>
        <h3 className="text-center font-weight-bold mb-4">مراجعة الخدمات</h3>

        <FadeIn>
          <Row>
            <Col lg={9} className="order-2 order-lg-1">
              <Container className="booking-preview patternbg-container position-relative rounded-lg overflow-hidden mt-3 mt-lg-0">
                <Container className="heading">
                  <Row className="px-2">
                    <Col xs={12} md={3} lg={2} className="text-center">
                    </Col>
                    <Col xs={12} md={9} lg={10} className="text-right my-lg-0 py-2 text-secondary">
                      <Row>
                        <Col xs={8} lg={9}>
                        </Col>
                        <Col xs={4} lg={3}>
                          <h6 className="text-center text-dark mb-0">السعر</h6>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {bookings.map((booking, index) =>
                  (
                    <Booking key={booking.uid}
                      booking={booking}
                      checkBookingExists={checkBookingExists}
                      dispatch={dispatch}
                      index={index}
                    />
                  )
                  )}
                </Container>


                <Container className="total">
                  <Row className="border-top p-2">
                    <Col xs={12} md={3} lg={2} className="text-center">
                    </Col>
                    <Col xs={12} md={9} lg={10} className="text-right my-3 my-lg-0 py-2 text-secondary">
                      <Row>
                        <Col xs={7} sm={6} md={8} lg={9}>
                          <h5 className="text-left text-dark">الإجمالي</h5>
                        </Col>
                        <Col xs={5} sm={6} md={4} lg={3}>
                          <h5 className="text-center font-weight-bold text-dark">{total.toFixed(2)} ريال</h5>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </Container>
            </Col>
            <Col lg={3} className="order-1 order-lg-2">
              <div className="book p-2 rounded-lg">
                <h6 className="text-center text-dark">الإجمالي</h6>
                <h5 className="text-center font-weight-bold text-dark py-3">{total.toFixed(2)} ريال</h5>
                {total > 0 && (
                  <Button block variant="success" size="lg" href="/book">شراء الآن</Button>
                )}
                {!total > 0 && (
                  <Button block variant="primary" size="lg" href="/promotions">تصفح العروض</Button>
                )}
              </div>
            </Col>
          </Row>
        </FadeIn>
      </Container>
    </Styles>
  )
}

