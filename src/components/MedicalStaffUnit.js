import React from 'react'
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { firebaseData } from '../provider/DataProvider'
import pattern from '../assets/pattern.png'

const Styles = styled.div`
  h3{
    color: #ae852f;
  }
  .staff-pic{
      border: 10px solid rgba(255,255,255,0.5);
  }
  .staff-container::before {
    content: "";
    background: url("${pattern}");
    background-color: #c1a365;
    background-size: 150px;
    opacity: 0.12;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;   
  }
  .border-secondary{
      border-color:#efefef !important;
      border-width:3px;
  }
  .medical-staff-content{
      background:rgba(255,255,255,0.5);
  }
`;

/*const colStyle = {
    backgroundColor: '#ffccd2',
};
const preWrap = {
    whiteSpace: "pre-wrap"
}*/
export const MedicalStaffUnit = (props) => {
    const { //handleDelete, 
        getMedicalStaff, medicalStaff } = useContext(firebaseData)

    useEffect(() => {
        getMedicalStaff();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /*const deleteMed = id => {
        handleDelete("medicalStaff", id);
    }*/
    return (
        <Styles className={props.loading ? "p-3" : "p-3"}>
            {
                medicalStaff.map((med) =>
                    <div key={med.id} className={`row staff-container position-relative overflow-hidden p-3 rounded-lg mb-4 ${props.loading ? "p-3 d-none" : "p-3"}`}>
                        <Col md="4" xl="3" className="mb-4 px-0 pl-md-3">
                            <img src={med.imageURL} className="w-100 staff-pic rounded-lg" alt="" />
                        </Col>
                        <Col md="8" xl="9" className="text-right rounded-lg medical-staff-content">
                            <div className="row border-bottom pb-2 border-secondary my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Doctor name: </strong></Col>
                                <Col xs="7" md="8" xl="9"><strong>{med.name}</strong></Col>
                            </div>
                            <div className="row border-bottom pb-2 border-secondary my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Speciality: </strong></Col>
                                <Col xs="7" md="8" xl="9">{med.speciality}</Col>
                            </div>
                            <div className="row border-bottom pb-2 border-secondary my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Rank: </strong></Col>
                                <Col xs="7" md="8" xl="9">{med.rank}</Col>
                            </div>
                            <div className="row border-bottom pb-2 border-secondary my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>University: </strong></Col>
                                <Col xs="7" md="8" xl="9">{med.university}</Col>
                            </div>
                            <div className="row border-bottom pb-2 border-secondary my-2">
                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Nationality: </strong></Col>
                                <Col xs="7" md="8" xl="9">{med.nationality}</Col>
                            </div>
                            {med.experience && (
                                <div className="row border-bottom pb-2 border-secondary my-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Experience: </strong></Col>
                                    <Col xs="7" md="8" xl="9">{med.experience}</Col>
                                </div>
                            )}
                            {med.educationTraining && (
                                <div className="row border-bottom pb-2 border-secondary my-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>SHORT NARRATION EDUCATION TRAINING: </strong></Col>
                                    <Col xs="7" md="8" xl="9" className="textareaOutput pre">{med.educationTraining}</Col>
                                </div>
                            )}
                            {med.professionalExperience && (
                                <div className="row border-bottom pb-2 border-secondary my-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Professional experience: </strong></Col>
                                    <Col xs="7" md="8" xl="9" className="textareaOutput pre">{med.professionalExperience}</Col>
                                </div>
                            )}
                            {med.clinicProfile && (
                                <div className="row my-2">
                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>Clinic profile: </strong></Col>
                                    <Col xs="7" md="8" xl="9" className="textareaOutput pre">{med.clinicProfile}</Col>
                                </div>
                            )}
                        </Col>
                    </div>
                )
            }


        </Styles>
    )
}