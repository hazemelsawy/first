import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { firebaseData } from '../../provider/DataProvider'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Styles = styled.div`
  h3{
    color: #ae852f;
  }
  #galleryImage{
      max-height:300px;
      max-width:100%;
  }
  .progress{
      height:25px;
      font-size:16px;

  }
`;
const JumbotronGalleryForm = (props) => {

    const { handleAddJumbotronImage, handleUploadImage, progress, jumbotronImgURL, imgURLSet, setImgURLSet } = useContext(firebaseData)

    //End

    const initialValues = {
        imageURL: '',
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
        handleAddJumbotronImage(values);
    }

    const fileSelectHandler = e => {
        if (e.target.files[0] !== undefined) {
            setImgURLSet(false);
            handleUploadImage('jumbotron-gallery', e.target.files[0])
        }
    }

    return (
        <Styles className="text-right">
            <Form onSubmit={handleFormSubmit}>
                <Form.Control type="hidden" name="imageURL" id="imageURL" onChange={handleInputChange} />
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>إختر صورة</Form.Label><br />
                    <input type="file" name="image" id="jumbotronImgFileInput" onChange={fileSelectHandler} accept="image/*" />
                    {progress > 0 &&
                        <div className="row my-2">
                            <div className="col col-md-6">
                                <ProgressBar now={Math.trunc(progress)} label={`${Math.trunc(progress)}%`} variant={Math.trunc(progress) === 100 ? "success" : ""} />
                            </div>
                        </div>
                    }

                    {(progress === 100) &&
                        <img src={jumbotronImgURL} id="jumbotronImage" className={imgURLSet ? "" : "d-none"} alt="gallery" />
                    }
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput4">
                    <Button disabled={!imgURLSet} type="submit" className="btn-lg">إضافة صورة</Button>
                    <span className="small text-secondary d-block mt-2"> ليكون المظهر متناسق ينصح ان تكون أبعاد الصورة ( 450 * 474 بكسل )</span>
                </Form.Group>
            </Form>
        </Styles>
    )
}



export default JumbotronGalleryForm;