import React from 'react'
import { Jumbotron } from '../components/Jumbotron';
import { Promotions } from './Promotions';
import { Container } from 'react-bootstrap';
export const Home = (props) => {
  
  return (
    <div>
      <Jumbotron />
      <Container>
        <Promotions />
      </Container>
    </div>
  )
}

