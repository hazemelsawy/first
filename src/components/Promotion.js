import React, { useState, useContext } from 'react'
import { Col, Button } from 'react-bootstrap'
import { SRLWrapper } from "simple-react-lightbox";
import PromotionSkeleton from '../skeletons/Promotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { BookingsContext } from '../contexts/Bookings'
export const Promotion = (props) => {
    const [loading, setLoading] = useState(true);
    const { bookings } = useContext(BookingsContext);

    const options = {
        settings: {
            disablePanzoom: true
        },
        thumbnails: {
            showThumbnails: false,
        },
        buttons: {
            backgroundColor: 'rgba(30,30,36,0.8)',
            iconColor: 'rgba(255, 255, 255, 0.8)',
            iconPadding: '10px',
            showAutoplayButton: false,
            showCloseButton: true,
            showDownloadButton: false,
            showFullscreenButton: true,
            showNextButton: false,
            showPrevButton: false,
            showThumbnailsButton: false,
            size: '40px'
        }
    }

    const checkBookingExists = (id) => {
        let i = 0;
        bookings.some(function (el) {
            if (el.id === id) {
                i++;
            }
        });
        return i;
    }
    return (
        <>
            <PromotionSkeleton loading={loading} />
            <Col md="4" className={loading ? "mb-4 d-none" : "mb-4"}>
                <div className="p-3 rounded-lg position-relative promotionUnit">
                    <SRLWrapper options={options}>
                        <div className="promotionImageContainer">
                            <img src={props.object.imageURL} className="w-100 promotionImage rounded-lg" alt="" onLoad={() => setLoading(false)} />

                        </div>
                    </SRLWrapper>
                    <div className="mt-3 text-center">
                        <Button className="ml-3 px-4 btn-block" size="lg" onClick={() => { props.bookPromotion(props.number) }}>الحجز</Button>
                        {checkBookingExists(props.object.id) > 0 && (
                            <h6 className="text-center position-absolute text-white w-100"
                                style={{ top: "0", left: "0", padding: "10px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px", backgroundColor: "rgb(40, 167, 69, 0.7)" }}>
                                <FontAwesomeIcon icon={faCheck} /> {checkBookingExists(props.object.id)} {checkBookingExists(props.object.id) > 1 ? "عروض مضافة" : "عرض مضاف"} -
                                <a href="/bookings-preview" className="text-light"> الدفع والحجز <FontAwesomeIcon icon={faCalendarCheck} /> </a>
                            </h6>
                        )}
                    </div>
                    {/* <div className="bg-white text-secondary rounded-lg text-right px-3 py-2 mt-3">
                                        <small>قسم : {object.department}</small><br />
                                        <small>كلمات مفتاحية : {object.keywords}</small>
                                    </div> */}
                </div>
            </Col>

        </>

    )
}


