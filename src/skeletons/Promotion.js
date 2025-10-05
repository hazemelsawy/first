import React from 'react'
import { Col } from 'react-bootstrap'

const PromotionSkeleton = (props) => (
    <Col md="4" className={props.loading ? "mb-4" : "mb-4 d-none"}>
        <div className="skeleton">
            <div className="ph-item p-3 rounded-lg">
                <div className="ph-col-12 p-0">
                    <div className="ph-picture"></div>
                    <div className="ph-row mb-0">
                        <div className="ph-col-12 big mb-0 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    </Col>
)

export default PromotionSkeleton;