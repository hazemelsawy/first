import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { Button, Card, Accordion } from 'react-bootstrap';
import { firebaseData } from '../../provider/DataProvider'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Styles = styled.div`
  h3{
    color: #ae852f;
  }
  #promotionImage{
    width: 473px;
  }
  .progress{
      height:25px;
      font-size:16px;

  }
`;
const MedicalStaffForm = (props) => {

    const { handleAddMedicalStaff, handleUploadImage, progress, medicalStaffImgURL, imgURLSet, setImgURLSet } = useContext(firebaseData)

    //End

    const initialValues = {
        imageURL: '',
        name: '',
        speciality: '',
        rank: '',
        university: '',
        nationality: '',
        experience: '',
        educationTraining: '',
        professionalExperience: '',
        clinicProfile: '',
    }

    var [values, setValues] = useState(initialValues);

    const handleInputChange = e => {
        var { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        })
    }
    const handleFormSubmit = e => {
        e.preventDefault();
        handleAddMedicalStaff(values);
    }

    const fileSelectHandler = e => {
        if (e.target.files[0] !== undefined) {
            setImgURLSet(false);
            handleUploadImage('medicalStaff', e.target.files[0])
        }
    }

    return (
        <Styles className="text-right">
            <Accordion>
                <Card>
                    <Card.Header className="p-0">
                        <Accordion.Toggle as={Button} variant="light" size="lg" eventKey="0" block>
                            <FontAwesomeIcon icon={faPlus} /> إضافة عضو طاقم
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Control type="hidden" name="imageURL" id="imageURL" value="" onChange={handleInputChange} />
                                <Form.Group controlId="name">
                                    <Form.Label>الإسم *</Form.Label>
                                    <Form.Control required type="text" name="name" value={values.name} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="speciality">
                                    <Form.Label>التخصص *</Form.Label>
                                    <Form.Control required type="text" name="speciality" value={values.speciality} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="rank">
                                    <Form.Label>الدرجة *</Form.Label>
                                    <Form.Control required type="text" name="rank" value={values.rank} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="university">
                                    <Form.Label>الجامعة *</Form.Label>
                                    <Form.Control required type="text" name="university" value={values.university} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="nationality">
                                    <Form.Label>الجنسية *</Form.Label>
                                    <Form.Control required type="text" name="nationality" value={values.nationality} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="experience">
                                    <Form.Label>الخبرة</Form.Label>
                                    <Form.Control type="text" name="experience" value={values.experience} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="educationTraining">
                                    <Form.Label>نبذة عن التعليم والتدريب</Form.Label>
                                    <Form.Control as="textarea" rows="3" name="educationTraining" value={values.educationTraining} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="professionalExperience">
                                    <Form.Label>الخبرة المهنية</Form.Label>
                                    <Form.Control as="textarea" rows="3" name="professionalExperience" value={values.professionalExperience} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="clinicProfile">
                                    <Form.Label>بروفايل العيادة</Form.Label>
                                    <Form.Control as="textarea" rows="3" name="clinicProfile" value={values.clinicProfile} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label>صورة الطبيب</Form.Label><br />
                                    <input type="file" name="image" id="medicalStaffImgFileInput" onChange={fileSelectHandler} accept="image/*" />
                                    {progress > 0 &&
                                        <div className="row my-2">
                                            <div className="col col-md-6">
                                                <ProgressBar now={Math.trunc(progress)} label={`${Math.trunc(progress)}%`} variant={Math.trunc(progress) === 100 ? "success" : ""} />
                                            </div>
                                        </div>
                                    }
                                    {progress === 100 &&
                                        <img src={medicalStaffImgURL} id="medicalStaffImage" alt="medical staff" />
                                    }
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput4">
                                    <Button disabled={!imgURLSet} className="btn-lg" type="submit">إضافة</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>


        </Styles>
    )
}


export default MedicalStaffForm;