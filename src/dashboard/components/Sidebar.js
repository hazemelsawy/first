import React, { useContext } from 'react'
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import '../../index.css';
import logo from '../../assets/logo.png';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserMd, faGlobe, faImages, faCalendarCheck, faCrown, faUserCircle, faArchive, faAddressCard, faGavel, faCaretSquareRight, faEnvelope, faUserSecret, faPhotoVideo, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faAd } from '@fortawesome/free-solid-svg-icons';
import { firebaseAuth } from '../../provider/AuthProvider'
import Button from 'react-bootstrap/Button'
import { firebaseData } from '../../provider/DataProvider'

const Styles = styled.div`
  .sidebar{
      background: #f9fbff;
  }
  .logout{
      bottom: 20px;
  }
  a, .navbar-brand, .navbar-nav .nav-link {

    &:hover {
      background: #eee;
    }
  }
  .sidebar-wrapper{
      border-left:1px solid #dee2e6;
  }
  .activeLink, .nav-link:hover{
    background: white;
    border: 1px solid #dee2e6;
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-right: 11px;
    box-shadow:none;
  }
  .nav-item a:focus{
      box-shadow:none;
  }
`;

const Side = props => {
    const { handleSignout } = useContext(firebaseAuth);
    const { admin, currentUser } = useContext(firebaseData);
    let path = window.location.pathname;
    return (
        <Styles id="sidebar-wrapper" className="d-none d-md-block">
            <Nav className="d-none text-right col-md-12 d-md-block sidebar sidebar-wrapper"
                activeKey="home">
                <div className="sidebar-sticky">
                    <div className="border-bottom mb-3">
                        <Link to="/dashboard" className="d-block p-2"><img src={logo} className="w-100" alt="" /></Link>
                    </div>
                </div>

                <div className="logout position-absolute text-center w-100 pl-4">
                    <p className="text-center text-secondary opacity-5 mt-0 mb-0 small">{currentUser.admin ? "مدير" : "محرر"}</p>
                    <p className="text-center text-secondary mb-2 mb-0">{currentUser.email} <FontAwesomeIcon icon={faUserCircle} /></p>
                    <Button onClick={handleSignout} variant="light" block><FontAwesomeIcon className="float-right mt-1 mr-2" icon={faSignOutAlt} /> تسجيل الخروج</Button>
                </div>
                <Nav.Item>
                    <Nav.Link className={`btn btn-block text-center btn-link ${window.location.href.indexOf("/dashboard/") === -1 || path.includes("purchases") ? "activeLink" : ""}`} href="/dashboard/purchases"><FontAwesomeIcon className="float-right mt-1" icon={faCalendarCheck} /> الحجوزات</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={`btn btn-block text-center btn-link ${path.includes("reports") ? "activeLink" : ""}`} href="/dashboard/reports"><FontAwesomeIcon className="float-right mt-1" icon={faBookOpen} /> التقارير</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={`btn btn-block text-center btn-link ${path.includes("archive") ? "activeLink" : ""}`} href="/dashboard/archive"><FontAwesomeIcon className="float-right mt-1" icon={faArchive} /> الأرشيف</Nav.Link>
                </Nav.Item>
                
                {/*<Nav.Item>
                    <Nav.Link className="btn btn-block text-center btn-link" href="/dashboard/members"><FontAwesomeIcon className="float-right" icon={faUsers} /> الأعضاء</Nav.Link>
                </Nav.Item>*/}
                <Nav.Item>
                    <Nav.Link className={`btn btn-block text-center btn-link ${path.includes("promotions") ? "activeLink" : ""}`} href="/dashboard/promotions"><FontAwesomeIcon className="float-right mt-1" icon={faAd} /> العروض</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={`btn btn-block text-center btn-link ${path.includes("medical-staff") ? "activeLink" : ""}`} href="/dashboard/medical-staff"><FontAwesomeIcon className="float-right mt-1" icon={faUserMd} /> الطاقم الطبي</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={`btn btn-block text-center btn-link ${path.includes("image-gallery") ? "activeLink" : ""}`} href="/dashboard/image-gallery"><FontAwesomeIcon className="float-right mt-1" icon={faImages} /> معرض الصور</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={`btn btn-block text-center btn-link ${path.includes("jumbotron-gallery") ? "activeLink" : ""}`} href="/dashboard/jumbotron-gallery"><FontAwesomeIcon className="float-right mt-1" icon={faPhotoVideo} /> صور الرئيسية</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={`btn btn-block text-center btn-link ${path.includes("about") ? "activeLink" : ""}`} href="/dashboard/about"><FontAwesomeIcon className="float-right mt-1" icon={faAddressCard} /> من نحن</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={`btn btn-block text-center btn-link ${path.includes("services") ? "activeLink" : ""}`} href="/dashboard/services"><FontAwesomeIcon className="float-right mt-1" icon={faCaretSquareRight} /> خدماتنا</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={`btn btn-block text-center btn-link ${path.includes("contact") ? "activeLink" : ""}`} href="/dashboard/contact"><FontAwesomeIcon className="float-right mt-1" icon={faEnvelope} /> تواصل معنا</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={`btn btn-block text-center btn-link ${path.includes("terms-and-conditions") ? "activeLink" : ""}`} href="/dashboard/terms-and-conditions"><FontAwesomeIcon className="float-right mt-1" icon={faGavel} /> الشروط والأحكام</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={`btn btn-block text-center btn-link ${path.includes("privacy-policy") ? "activeLink" : ""}`} href="/dashboard/privacy-policy"><FontAwesomeIcon className="float-right mt-1" icon={faUserSecret} /> سياسة الخصوصية</Nav.Link>
                </Nav.Item>
                {admin && (
                    <Nav.Item>
                        <Nav.Link className={`btn btn-block text-center btn-link ${path.includes("admin") ? "activeLink" : ""}`} href="/dashboard/admin"><FontAwesomeIcon className="float-right mt-1" icon={faCrown} /> المدير</Nav.Link>
                    </Nav.Item>
                )}
                <Nav.Item>
                    <Nav.Link className="btn btn-block text-center btn-link text-secondary" href="/"><FontAwesomeIcon className="float-right mt-1" icon={faGlobe} /> زيارة الموقع</Nav.Link>
                </Nav.Item>


            </Nav>


        </Styles>
    );
};
const Sidebar = withRouter(Side);
export default Sidebar