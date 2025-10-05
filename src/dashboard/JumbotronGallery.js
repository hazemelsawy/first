import React, { useContext, useEffect, useState } from 'react'
import { firebaseData } from '../provider/DataProvider'
import styled from 'styled-components';
import JumbotronGalleryForm from './components/JumbotronGalleryForm';
import Card from 'react-bootstrap/Card';
import { Button, Col, Accordion, Modal, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Styles = styled.div`
  h3{
    color: #ae852f;
  }
`;


const JumbotronGallery = () => {

  return (
    <Styles className="text-right p-3">
      <Accordion>
        <Card>
          <Card.Header className="p-0">
            <Accordion.Toggle as={Button} variant="light" size="lg" eventKey="0" block>
              <FontAwesomeIcon icon={faPlus} /> إضافة صورة
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <JumbotronGalleryForm />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <Image />

    </Styles>
  )
}


const Image = (props) => {
  const { handleDelete, jumbotronImages, getJumbotronImages } = useContext(firebaseData)
  const [imageId, setImageId] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);


  //handle modal 
  const handleClose = () => setModalShow(false);

  useEffect(() => {
    getJumbotronImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tempDeleteImage = id => {
    setImageId(id);
    setModalShow(true)
  }
  const deleteImage = () => {
    handleDelete("jumbotron-gallery", imageId);
    setModalShow(false)
  }
  return (
    <>
      <div className="h5 text-center my-3 text-secondary">( يوجد {jumbotronImages.length} صور )</div>

      <div className="row">
        {
          jumbotronImages.map((image) =>
            <Col key={image.id} md="4" xl="3" className="mb-4">
              <div className="p-4 rounded-lg bg-light">
                <div>
                  <img src={image.imageURL} className="w-100" alt="" />
                  <div className="text-left bg-white rounded-lg p-1 mt-2" >
                    <Button variant="outline-danger" size="sm" onClick={() => tempDeleteImage(image.id)} ><FontAwesomeIcon icon={faTrashAlt} /></Button>
                  </div>
                </div>
              </div>
            </Col>
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
              <Button variant="danger" onClick={deleteImage} block>نعم</Button>
            </Col>
          </Row>
        </Modal.Body>

      </Modal>
    </>

  )
}

export default JumbotronGallery;