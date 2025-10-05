import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FooterNav } from './FooterNav';

let backgroundColor = {
    backgroundColor: "rgb(255 255 255)",
}
new Date().getFullYear()
export const Footer = () => (
    <div className="footer-content text-white mb-3 mt-5" id="sticky-footer" style={backgroundColor}>
        <Container>
            <Row>
                <Col xs={12} lg={6}>
                    <FooterNav />
                </Col>
                <Col xs={12} lg={6} className="text-center my-3 my-lg-0 py-2 text-lg-left text-secondary">
                    المركز الإختصاصي الطبي الأول {(new Date().getFullYear())} &copy;
                </Col>
            </Row>
        </Container>
    </div>
)
