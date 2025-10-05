import React, { useContext } from 'react'
import { Container, Nav, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { BookingsContext } from '../contexts/Bookings'

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  .navbar-brand img{
    width:250px;
  }
  .btn{
    background: #ae852f;
    border:0;
  }
  .bookingsCount{
    display:inline-block;
    border-radius:100%;
    color:white;
    font-size:12px;
    position:absolute;
    text-align:center;
    line-height:22px;
    width:22px;
    height:22px;
    top:-11px;
    left:-11px;
  }
  .bookingsCountMobile{
    display:inline-block;
    border-radius:100%;
    text-align:center;
    line-height:22px;
    color:white;
    font-size:12px;
    position:absolute;
    width:22px;
    height:22px;
    top:12px;
    left:-9px;
    z-index:9;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #ae852f;
    font-weight:bold;

    &:hover {
    }
  }
  .link {
    &:hover {
      text-decoration: underline;
    }
  }
`;


export const NavigationBar = (props) => {
  let path = window.location.pathname;
  const { bookings } = useContext(BookingsContext);

  return (
    <Container>
      <Styles>

        <Navbar collapseOnSelect expand="lg" className="bg-white px-0">
          <Navbar.Brand href="/" className="mr-0"><img src={logo} alt="" /></Navbar.Brand>
          {bookings.length > 0 && !path.includes("book") && (<span className="bookingsCountMobile bg-success d-inline-block d-lg-none">{bookings.length}</span>)}
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="position-relative" />
          <Navbar.Collapse className="order-1" id="basic-navbar-nav">

            <Nav className="mr-auto text-center">
              <Nav.Item>
                <Nav.Link className={`link ${path === "/" ? "active" : ""}`} href="/">
                  الرئيسية
              </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={`link ${path.includes("about") ? "active" : ""}`} href="/about">
                  من نحن
              </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={`link ${path.includes("promotions") ? "active" : ""}`} href="/promotions">
                  العروض
              </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={`link ${path.includes("services") ? "active" : ""}`} href="/services">
                  خدماتنا
              </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={`link ${path.includes("medical-staff") ? "active" : ""}`} href="/medical-staff">
                  الطاقم الطبي
              </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={`link ${path.includes("image-gallery") ? "active" : ""}`} href="/image-gallery">
                  معرض الصور
              </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={`link ${path.includes("contact") ? "active" : ""}`} href="/contact">
                  تواصل معنا
              </Nav.Link>
              </Nav.Item>
              <Nav.Item className="bookings rounded">
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id={`bookingsLink`} className="h4">
                      الحجوزات والدفع
                    </Tooltip>
                  }
                >
                  <Nav.Link className={`m-0 position-relative ${path.includes("book") ? "active" : ""}`} href="/bookings-preview">
                    <span className="d-inline-block position-relative">{bookings.length > 0 && !path.includes("book") && <span className="bookingsCount bg-success">{bookings.length}</span>} <FontAwesomeIcon className="h4 mb-0" icon={faCalendarCheck} /></span>
                  </Nav.Link>
                </OverlayTrigger>

              </Nav.Item>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles >
    </Container>

  )
}

