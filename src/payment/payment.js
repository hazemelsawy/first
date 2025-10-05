import React from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import config from './config';

const Styles = styled.div`
  .jumbo {
    background-size: cover;
    color: #1e266d;
    position: relative;
    background-color: #f9fbff !important;
  }
  .jumbo-container {
    background-color: #f9fbff !important;
  }
  h3{
    color: #ae852f;
  }

  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

const Payment = () => {

  return (
    <Styles>
      Hi
    </Styles>
  )
}

export default Payment