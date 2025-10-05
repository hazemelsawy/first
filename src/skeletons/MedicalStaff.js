import React from 'react'
import { Col } from 'react-bootstrap'

const MedicalStaffSkeleton = (props) => (
    <Col md="12" className={props.loading ? "mb-4" : "mb-4 d-none"}>
        <div className="skeleton">
            <div className="ph-item rounded-lg">
                <div className="ph-col-4 ph-col-xs-12 float-right order-md-1">
                    <div className="ph-picture"></div>
                </div>
                <div>
                    <div className="ph-row">
                        <div className="ph-col-6 offset-6"></div>
                        <div className="ph-col-12"></div>
                        <div className="ph-col-12"></div>
                        <div className="ph-col-12 empty"></div>
                        <div className="ph-col-6 offset-6"></div>
                        <div className="ph-col-12"></div>
                        <div className="ph-col-12"></div>
                        <div className="ph-col-12 empty"></div>
                        <div className="ph-col-6 offset-6"></div>
                        <div className="ph-col-12"></div>
                        <div className="ph-col-12"></div>
                        <div className="ph-col-12 empty"></div>
                        <div className="ph-col-6 offset-6"></div>
                        <div className="ph-col-12"></div>
                        <div className="ph-col-12"></div>
                        <div className="ph-col-12 empty"></div>
                        <div className="ph-col-6 offset-6"></div>
                        <div className="ph-col-12"></div>
                        <div className="ph-col-12"></div>
                        <div className="ph-col-12 empty"></div>
                    </div>
                </div>

            </div>
        </div>
    </Col>
)

export default MedicalStaffSkeleton;