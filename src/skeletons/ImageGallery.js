import React from 'react'
import { Col, Row } from 'react-bootstrap'

const ImageGallerySkeleton = (props) => (
    <Row>
        <Col sm="4" className={props.loading ? "px-3 px-md-1" : "px-3 px-md-1 d-none"}>
            <div className="skeleton">
                <div className="ph-item border-0 p-0">
                    <div className="ph-col-12 p-2">
                        <div className="ph-picture rounded-lg mb-1" style={{ paddingTop: "60%" }}></div>
                    </div>
                    <div className="ph-col-12 p-2">
                        <div className="ph-picture rounded-lg mb-1" style={{ paddingTop: "60%" }}></div>
                    </div>
                    <div className="ph-col-12 p-2">
                        <div className="ph-picture rounded-lg mb-1" style={{ paddingTop: "60%" }}></div>
                    </div>
                </div>
            </div>
        </Col>
        <Col sm="4" className={props.loading ? "px-3 px-md-1" : "px-3 px-md-1 d-none"}>
            <div className="skeleton">
                <div className="ph-item border-0 p-0">
                    <div className="ph-col-12 p-2">
                        <div className="ph-picture rounded-lg mb-1" style={{ paddingTop: "60%" }}></div>
                    </div>
                    <div className="ph-col-12 p-2">
                        <div className="ph-picture rounded-lg mb-1" style={{ paddingTop: "60%" }}></div>
                    </div>
                    <div className="ph-col-12 p-2">
                        <div className="ph-picture rounded-lg mb-1" style={{ paddingTop: "60%" }}></div>
                    </div>
                </div>
            </div>
        </Col>
        <Col sm="4" className={props.loading ? "px-3 px-md-1" : "px-3 px-md-1 d-none"}>
            <div className="skeleton">
                <div className="ph-item border-0 p-0">
                    <div className="ph-col-12 p-2">
                        <div className="ph-picture rounded-lg mb-1" style={{ paddingTop: "60%" }}></div>
                    </div>
                    <div className="ph-col-12 p-2">
                        <div className="ph-picture rounded-lg mb-1" style={{ paddingTop: "60%" }}></div>
                    </div>
                    <div className="ph-col-12 p-2">
                        <div className="ph-picture rounded-lg mb-1" style={{ paddingTop: "60%" }}></div>
                    </div>
                </div>
            </div>
        </Col>
    </Row>
)

export default ImageGallerySkeleton;