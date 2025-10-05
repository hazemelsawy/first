import React, { useState } from 'react'
import styled from 'styled-components';
import { Row, Col, Button, Accordion, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { firebaseData } from '../provider/DataProvider'
import PromotionsForm from './components/PromotionsForm';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt, faCheck, faTimes, faCircle } from '@fortawesome/free-solid-svg-icons';
import Firebase from '../firebase/Firebase'
const Styles = styled.div`
  h3{
    color: #ae852f;
  }
  .main-delete-button{
    bottom:0;
    left:0;
  }
  .avlbl:focus{
    box-shadow:none;
  }
`;
export const DashboardPromotions = () => {

  const { handleAddPromotion } = useContext(firebaseData)

  const handleSubmit = (values) => {
    handleAddPromotion(values);
  }

  return (
    <Styles className="text-right p-3">

      <Accordion>
        <Card>
          <Card.Header className="p-0">
            <Accordion.Toggle as={Button} variant="light" size="lg" eventKey="0" block>
              <FontAwesomeIcon icon={faPlus} /> إضافة عرض
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <PromotionsForm handleSubmit={handleSubmit} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Promotion />
    </Styles>
  )
}


export const Promotion = (props) => {
  const { handleDelete, promotions, getPromotions } = useContext(firebaseData)
  const [promotionId, setPromotionId] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  const handleClose = () => setModalShow(false);

  useEffect(() => {
    getPromotions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tempDeletePromotion = id => {
    setPromotionId(id);
    setModalShow(true)
  }
  const deletePromotion = () => {
    handleDelete("promotions", promotionId);
    setModalShow(false)
  }
  const updateStatus = (id, index, avlbl, promotion) => {

    let promotions = promotion.promotions;


    promotions[index].avlbl = avlbl;




    let uid = `${id}/promos/${index}`
    var promoRef = Firebase.firestore().collection('promotions').doc(id);
    var setWithMerge = promoRef.update({
      promotions: promotions
    }
    );

  }
  return (
    <>
      <div className="h5 text-center my-3 text-secondary">( يوجد {promotions.length} {promotions.length > 1 && promotions.length < 10 ? "عروض" : "عرض"} )</div>

      <div>
        {
          promotions.map((promotion) =>
            <div key={promotion.timestamp} className="row bg-light mx-0 p-3 rounded-lg mb-4 position-relative">
              <Col md="4" xl="3" className="mb-3">
                <img src={promotion.imageURL} className="w-100" alt="" />
              </Col>
              <Col md="8" xl="9" className="text-right px-3 pt-3 pb-5 bg-white rounded-lg">
                {promotion.promotions.map((promo, number) =>
                  <div key={number} className="row mb-3 mx-0 p-3 w-100 bg-light rounded-lg">
                    <Col xs={7} lg={8} xl={9}><strong>{promo.promo}</strong></Col>
                    <Col xs={3} lg={3} xl={2}>
                      {parseFloat(promo.price).toFixed(2)} ريال
                    </Col>
                    <Col xs={2} lg={1} className="text-left">
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id={`bookingsLink`} className="h4">
                            {promotion.promotions[number].avlbl ? "العرض متاح" : "العرض غير متاح"}
                          </Tooltip>
                        }
                      >
                        <Button variant="link" onClick={() => updateStatus(promotion.id, number, promotion.promotions[number].avlbl ? false : true, promotion)} className={`ml-2 avlbl p-0 ${promotion.promotions[number].avlbl ? "text-success" : "text-danger"}`}><FontAwesomeIcon icon={faCircle} /></Button>
                      </OverlayTrigger>
                    </Col>
                  </div>
                )}
                <div className="mb-3 text-left position-absolute main-delete-button pl-3">
                  <Button variant="outline-danger" size="sm" onClick={() => tempDeletePromotion(promotion.id)} ><FontAwesomeIcon icon={faTrashAlt} /></Button>
                </div>
              </Col>
            </div>
          )
        }

      </div>

      <Modal
        show={modalShow}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="p-4">
          <h4 className="text-right mb-3">هل أنت متأكد من الحذف ؟</h4>
          <Row>
            <Col>
              <Button variant="secondary" onClick={() => setModalShow(false)} block>لا</Button>
            </Col>
            <Col>
              <Button variant="danger" onClick={deletePromotion} block>نعم</Button>
            </Col>
          </Row>
        </Modal.Body>

      </Modal>

    </>
  )
}

