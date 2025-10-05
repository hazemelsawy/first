import React from 'react'
import { Col } from 'react-bootstrap'

const JumbotronSkeleton = (props) => (
    <div className={props.loading ? "mb-4" : "mb-4 d-none"} style={{maxWidth: "300px", margin: "0 auto"}}>
        <div className="skeleton">
            <div className="ph-item bg-transparent p-3 rounded-lg border-0">
                <div className="ph-col-12 p-0">
                    <div className="ph-picture" style={{borderRadius: "20px", backgroundColor: "#dad7ce"}}></div>
                </div>
            </div>
        </div>
    </div>
)

export default JumbotronSkeleton;