import React, {useContext} from 'react'
import {firebaseData} from '../provider/DataProvider'
import styled from 'styled-components';
import PromotionsForm from './components/PromotionsForm';
import Card from 'react-bootstrap/Card';


const Styles = styled.div`
  h3{
    color: #ae852f;
  }
`;


export const Dashboard = () => {

  const {handleAddPromotion} = useContext(firebaseData)

  const handleSubmit = (values) =>{
    handleAddPromotion(values);
  }

  /* const addOrEdit = obj => {
    obj = {
      ...obj,
      timestamp:firebase.firestore.FieldValue.serverTimestamp() 
    }
    firebase.firestore().collection("promotions").add(obj)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  } */

  return (
    <Styles className="text-right p-3">
    <Card
      bg="light"
      text="dark"
    >
      <Card.Header>العروض</Card.Header>
      <Card.Body>
        <Card.Title>أضف عرض جديد</Card.Title>
        <div>
          <PromotionsForm handleSubmit={handleSubmit} />
        </div>
      </Card.Body>
    </Card>

    {/* <Card
      bg="light"
      text="dark"
    >
      <Card.Header>العروض</Card.Header>
      <Card.Body>
          <div id="cardBody"></div>
      </Card.Body>
    </Card> */}
  </Styles>
  )
}