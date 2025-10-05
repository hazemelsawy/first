import React from 'react'
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import AllImages from '../components/Image'

const Styles = styled.div`
  h3{
    color: #ae852f;
  }

`;
export const ImageGallery = () => {
  //let initialValues = [{}]

  //var storageRef = firebase.storage().ref("promotions")

  return (
    <Styles>
      <Container>
        <h3 className="text-center font-weight-bold mb-4">معرض الصور</h3>
        <AllImages />
      </Container>
    </Styles>
  )
}