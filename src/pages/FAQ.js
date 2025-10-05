import React from 'react'
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  h3{
    color: #ae852f;
  }
`;
const FAQ = () => (
  <Styles>
    <Container>
        <h3 className="text-center font-weight-bold mb-4">الأسئلة الشائعة</h3>
    </Container>
  </Styles>
)
export default FAQ