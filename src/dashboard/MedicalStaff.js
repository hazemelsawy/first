import React from 'react'
import styled from 'styled-components';
import { Col, Button, Modal, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { firebaseData } from '../provider/DataProvider'
import MedicalStaffForm from './components/MedicalStafffForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
const Styles = styled.div`
  h3{
    color: #ae852f;
  }
`;
export const MedicalStaffDashboard = () => {
    const { handleAddMedicalStaff } = useContext(firebaseData)

    const handleSubmit = (values) => {
        handleAddMedicalStaff(values);
    }
    return (
        <Styles className="text-right p-3">
            <MedicalStaffForm handleSubmit={handleSubmit} />
            <MedicalStaffUnit />
        </Styles>
    )
}



/*const colStyle = {
    backgroundColor: '#ffccd2',
};
const preWrap = {
    whiteSpace: "pre-wrap"
}*/
export const MedicalStaffUnit = (props) => {
    const { handleDelete, getMedicalStaff, medicalStaff } = useContext(firebaseData)
    const [medId, setMedId] = useState(null);
    const [modalShow, setModalShow] = React.useState(false);

    //handle modal 
    const handleClose = () => setModalShow(false);

    useEffect(() => {
        getMedicalStaff();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const tempDeleteMed = id => {
        setMedId(id);
        setModalShow(true)
    }
    const deleteMed = () => {
        handleDelete("medicalStaff", medId);
        setModalShow(false)
    }
    return (
        <div className={props.loading ? "px-3 d-none" : "px-3"}>
            <div className="h5 text-center my-3 text-secondary">( يوجد {medicalStaff.length} اعضاء )</div>

            {
                medicalStaff.map((med) =>
                    <div key={med.id} className="row bg-light p-3 rounded-lg mb-4">
                        <Col md="4" xl="3" className="mb-4">
                            <img src={med.imageURL} className="w-100" alt="" />
                        </Col>
                        <Col md="8" xl="9" className="text-right bg-white rounded-lg">
                            <div className="row my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Doctor name: </strong></Col>
                                <Col xs="7" md="8" xl="9">{med.name}</Col>
                            </div>
                            <div className="row my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Speciality: </strong></Col>
                                <Col xs="7" md="8" xl="9">{med.speciality}</Col>
                            </div>
                            <div className="row my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Rank: </strong></Col>
                                <Col xs="7" md="8" xl="9">{med.rank}</Col>
                            </div>
                            <div className="row my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>University: </strong></Col>
                                <Col xs="7" md="8" xl="9">{med.university}</Col>
                            </div>
                            <div className="row my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Nationality: </strong></Col>
                                <Col xs="7" md="8" xl="9">{med.nationality}</Col>
                            </div>
                            <div className="row my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Experience: </strong></Col>
                                <Col xs="7" md="8" xl="9">{med.experience}</Col>
                            </div>
                            <div className="row my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>SHORT NARRATION EDUCATION TRAINING: </strong></Col>
                                <Col xs="7" md="8" xl="9" className="textareaOutput pre">{med.educationTraining}</Col>
                            </div>
                            <div className="row my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Professional experience: </strong></Col>
                                <Col xs="7" md="8" xl="9" className="textareaOutput pre">{med.professionalExperience}</Col>
                            </div>
                            <div className="row my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Clinic profile: </strong></Col>
                                <Col xs="7" md="8" xl="9" className="textareaOutput pre">{med.clinicProfile}</Col>
                            </div>
                            <div className="my-2 text-left">
                                <Button className="mt-3" variant="outline-danger" size="sm" onClick={() => tempDeleteMed(med.id)} ><FontAwesomeIcon icon={faTrashAlt} /></Button>
                            </div>
                        </Col>
                    </div>
                )
            }

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
                            <Button variant="danger" onClick={deleteMed} block>نعم</Button>
                        </Col>
                    </Row>
                </Modal.Body>

            </Modal>


        </div>
    )
}
//<Button className="ml-3 px-4 rounded-pill" variant="danger" onClick={() => deleteMed(med.id)} ><FontAwesomeIcon icon={faTrash} /></Button>

