import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { Button, Row, Col } from 'react-bootstrap';
import { firebaseData } from '../../provider/DataProvider'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import FadeIn from 'react-fade-in'
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
const PromotionsForm = (props) => {

    const { handleAddPromotion, handleUploadImage,
        progress, promoImgURL, imgURLSet, setImgURLSet } = useContext(firebaseData)

    //End

    const initialValues = {
        department: '',
        imageURL: '',
        promotions: [{}],
    }

    var [values, setValues] = useState(initialValues);


    const [promotions, setPromotions] = useState([0])

    const handleInputChange = e => {
        let elementName = e.target.getAttribute("name");
        if (elementName.includes("promotion")) {
            var thenum = elementName.replace(/^\D+/g, '');
            if (elementName.includes("promotionPrice")) {
                //add price
                let { value } = e.target

                let arr = [...values.promotions];

                arr[thenum] = {
                    ...values.promotions[thenum],
                    price: value,
                    avlbl: true
                }

                setValues({
                    ...values,
                    promotions: arr
                })
            } else {
                //add promo name
                let { value } = e.target

                let arr = [...values.promotions];

                arr[thenum] = {
                    ...values.promotions[thenum],
                    promo: value
                }

                setValues({
                    ...values,
                    promotions: arr
                })
            }

        } else {
            var { name, value } = e.target

            setValues({
                ...values,
                [name]: value
            })
        }

    }
    const handleFormSubmit = e => {
        e.preventDefault();
        handleAddPromotion(values);
        setValues(initialValues)
        setPromotions([0])
    }

    const fileSelectHandler = e => {
        if (e.target.files[0] !== undefined) {
            setImgURLSet(false);
            handleUploadImage('promotions', e.target.files[0])
        }
    }
    const newLine = () => {
        let arr = [...values.promotions];
        arr.push({});
        setValues({
            ...values,
            promotions: arr
        })
        let current = Math.max(...promotions) + 1;
        setPromotions([...promotions, current]);
    }
    const removeLine = () => {
        if (!(promotions.length <= 1)) {
            let array = [...promotions];
            let current = Math.max(...promotions);
            let index = array.indexOf(current);
            array.splice(index, 1);
            let newPromotions = array;
            setPromotions(newPromotions);

            let arr = [...values.promotions];
            arr.splice(index, 1);

            ///var newArray = arr.filter(value => JSON.stringify(value) !== '{}');

            setValues({
                ...values,
                promotions: arr
            })



        }
    }

    return (
        <Styles className="text-right">
            <Form onSubmit={handleFormSubmit}>
                <Form.Control type="hidden" name="imageURL" id="imageURL" value="" onChange={handleInputChange} />
                {/**<Form.Group controlId="department">
                    <Form.Label>قسم *</Form.Label>
                    <Form.Control required type="text" name="department" value={values.department || ""} onChange={handleInputChange} />
                </Form.Group> */}
                <Form.Group>
                    {
                        promotions.map((promotion) =>
                            <FadeIn key={promotion}>
                                <Row className={`theRow${promotion}`}>
                                    <Col xs={6} className="pl-1">
                                        <Form.Group controlId={`promotion${promotion}`}>
                                            <Form.Label>العرض {promotion + 1} *</Form.Label>
                                            <Form.Control required type="text" name={`promotion${promotion}`} value={values.promotions[promotion].promo || ""} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4} className="px-1">
                                        <Form.Group controlId={`promotionPrice${promotion}`}>
                                            <Form.Label>السعر {promotion + 1} *</Form.Label>
                                            <Form.Control required type="tel" pattern="[0-9]+([,\.][0-9]+)?" name={`promotionPrice${promotion}`} value={values.promotions[promotion].price || ""} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={1} className="px-0">
                                        <br />
                                        <Button variant="link" block className="mt-2 px-0" onClick={newLine}><FontAwesomeIcon icon={faPlus} /></Button>
                                    </Col>
                                    <Col xs={1} className="px-0">
                                        <br />
                                        <Button variant="link" block className="mt-2 px-0 text-danger" onClick={removeLine}><FontAwesomeIcon icon={faMinus} /></Button>
                                    </Col>
                                </Row>
                            </FadeIn>
                        )}
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>صورة العرض</Form.Label><br />
                    <input type="file" name="image" onChange={fileSelectHandler} id="promotionFileInput" accept="image/*" />
                    {progress > 0 &&
                        <div className="row my-2">
                            <div className="col col-md-6">
                                <ProgressBar now={Math.trunc(progress)} label={`${Math.trunc(progress)}%`} variant={Math.trunc(progress) === 100 ? "success" : ""} />
                            </div>
                        </div>
                    }
                    {(progress === 100) &&
                        <img src={promoImgURL} id="promotionImage" className={imgURLSet ? "" : "d-none"} alt="promotion" />
                    }
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput4">
                    <Button disabled={!imgURLSet} type="submit" className="btn-lg">إضافة العرض</Button>
                </Form.Group>
            </Form>
        </Styles>
    )
}


export default PromotionsForm;