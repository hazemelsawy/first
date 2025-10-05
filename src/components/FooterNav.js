import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  .navbar-brand img{
    width:250px;
  }
  footer-content a, footer-content .navbar-brand, footer-content .navbar-nav .nav-link {
    color: rgb(103, 103, 103);

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const FooterNav = () => {
  let path = window.location.pathname;

  return (
    <Styles>
      <Navbar expand="lg" className="bg-transparent py-lg-0 pr-lg-0">
        <Nav className="text-center text-lg-right mx-lg-0 mx-auto">
          <Nav.Item>
            <Nav.Link href="/terms-and-conditions" className={`${path.includes("terms") ? "active" : ""}`}>
              الشروط والأحكام
                </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/privacy-policy" className={`${path.includes("privacy") ? "active" : ""}`}>
              سياسة الخصوصية
                </Nav.Link>
          </Nav.Item>
          {/**<Nav.Item>
            <Nav.Link href="/FAQ" className={`${path.includes("FAQ") ? "active" : ""}`}>
              الأسئلة الشائعة
                </Nav.Link>
          </Nav.Item> */}
        </Nav>
      </Navbar>
    </Styles >

  )

}
