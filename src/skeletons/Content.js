import React from 'react'
import { Col } from 'react-bootstrap'

const ContentSkeleton = () => (
        <div className="skeleton">
            <div className="ph-item bg-transparent rounded-lg border-0 p-0">
                <div className="px-0">
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
                    </div>
                </div>

            </div>
        </div>
)

export default ContentSkeleton;