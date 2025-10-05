import React, { useContext } from 'react'
import { Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom'
import '../../index.css';
import logo from '../../assets/logo.png';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserMd, faGlobe, faImages, faCalendarCheck, faUserCircle, faArchive, faAddressCard, faGavel, faCaretSquareRight, faEnvelope, faUserSecret, faPhotoVideo, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faAd, faCrown } from '@fortawesome/free-solid-svg-icons';
import { firebaseAuth } from '../../provider/AuthProvider'
import Button from 'react-bootstrap/Button'
import { firebaseData } from '../../provider/DataProvider'

const Styles = styled.div`
  .navbar-brand img{
    width:250px;
  }

  .link {
    &:hover {
      background-color: #eee;
    }
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color:#007bff;
    &:hover {
      background: #eee;
    }
  }
`;


const Header = props => {
  const { handleSignout } = useContext(firebaseAuth);
  const { admin, currentUser } = useContext(firebaseData);

  return (
    <Styles>
      <Navbar collapseOnSelect expand="xl" className="bg-white py-0 border-bottom d-md-none">
        <Navbar.Brand className="mr-0">
          <Link to="/dashboard" className="d-block p-2"><img src={logo} alt="" /></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse className="order-2" id="basic-navbar-nav">
          <Nav className="px-3"
            activeKey="home">
            <Nav.Item>
              <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/purchases"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faCalendarCheck} /> الحجوزات</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/reports"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faBookOpen} /> التقارير</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/archive"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faArchive} /> الأرشيف</Nav.Link>
            </Nav.Item>
            
            
            {/*<Nav.Item>
                    <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/members"><FontAwesomeIcon className="float-right" icon={faUsers} /> الأعضاء</Nav.Link>
                </Nav.Item>*/}
            <Nav.Item>
              <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/promotions"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faAd} /> العروض</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/medical-staff"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faUserMd} /> الطاقم الطبي</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/image-gallery"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faImages} /> معرض الصور</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/jumbotron-gallery"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faPhotoVideo} /> صور الرئيسية</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/about"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faAddressCard} /> من نحن</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/services"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faCaretSquareRight} /> خدماتنا</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/contact"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faEnvelope} /> تواصل معنا</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/terms-and-conditions"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faGavel} /> الشروط والأحكام</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/privacy-policy"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faUserSecret} /> سياسة الخصوصية</Nav.Link>
            </Nav.Item>
            {admin && (
              <Nav.Item>
                <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/admin"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faCrown} /> المدير</Nav.Link>
              </Nav.Item>
            )}
            <Nav.Item>
              <Nav.Link className="btn btn-block text-center btn-link text-secondary" href="/"><FontAwesomeIcon className="float-right mr-3 mt-1" icon={faGlobe} /> زيارة الموقع</Nav.Link>
            </Nav.Item>
            <Nav.Item className="mt-2">
              <Button onClick={handleSignout} variant="light" block><FontAwesomeIcon icon={faSignOutAlt} /> تسجيل الخروج</Button>
              <p className="text-center text-secondary mt-2 mb-0">{currentUser.email}</p>
              <p className="text-center text-secondary opacity-5 mt-0 small">{currentUser.admin ? "مدير" : "محرر"}</p>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles >
  )

}
export default Header;