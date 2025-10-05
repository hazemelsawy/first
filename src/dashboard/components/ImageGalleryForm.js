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
const ImageGalleryForm = (props) => {

    const { handleAddImage, handleUploadImage, progress, imgURL, imgURLSet, setImgURLSet } = useContext(firebaseData)

    //End

    const initialValues = {
        imageURL: '',
    }

    var [values, setValues] = useState(initialValues);

    const handleInputChange = e => {
        var { name, value } = e.target
        console.log(value)
        setValues({
            ...values,
            [name]: value
        })
    }
    const handleFormSubmit = e => {
        e.preventDefault();
        handleAddImage(values);
    }

    const fileSelectHandler = e => {
        if (e.target.files[0] !== undefined) {
            setImgURLSet(false);
            handleUploadImage('image-gallery', e.target.files[0])
        }
    }

    return (
        <Styles className="text-right">
            <Form onSubmit={handleFormSubmit}>
                <Form.Control type="hidden" name="imageURL" id="imageURL" value="" onChange={handleInputChange} />
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>إختر صورة</Form.Label><br />
                    <input type="file" name="image" id="imgFileInput" onChange={fileSelectHandler} accept="image/*" />
                    {progress > 0 &&
                        <div className="row my-2">
                            <div className="col col-md-6">
                                <ProgressBar now={Math.trunc(progress)} label={`${Math.trunc(progress)}%`} variant={Math.trunc(progress) === 100 ? "success" : ""} />
                            </div>
                        </div>
                    }

                    {(progress === 100) &&
                        <img src={imgURL} id="galleryImage" className={imgURLSet ? "" : "d-none"} alt="gallery" />
                    }
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput4">
                    <Button disabled={!imgURLSet} type="submit" className="btn-lg">إضافة صورة</Button>
                </Form.Group>
            </Form>
        </Styles>
    )
}



export default ImageGalleryForm;