import React, { useState } from 'react'
import { Container, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import FadeIn from 'react-fade-in'
import pattern from '../assets/pattern.png'
import Firebase from '../firebase/Firebase'
import ContentSkeleton from '../skeletons/Content'

const Styles = styled.div`
  h3{
    color: #ae852f;
  }
  .contact-container::before {
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
.bg-white{
    background: rgba(255,255,255,0.5) !important;
  }
`;
 const TermsConditions = () => {
  const [content, setContent] = useState("");
  Firebase.firestore().collection('pages').doc("termsAndConditions").get().then(snapshot => {
    console.log(snapshot.data()["content"])
    setContent(snapshot.data()["content"]);
  });

  return (
    <Styles>
      <Container>
        <h3 className="text-center font-weight-bold mb-4">الشروط والأحكام</h3>


        <FadeIn>
          {content !== "" && (
            <div className="mt-3 contact-container position-relative p-3 rounded-lg overflow-hidden">
              <div className="text-right bg-white p-3 rounded-lg" dangerouslySetInnerHTML={{ __html: content }}>
              </div>
            </div>
          )}
          {content === "" && (
            <div className="mt-3 contact-container position-relative p-3 rounded-lg overflow-hidden">
            <div className="text-right bg-white p-3 rounded-lg">
              <ContentSkeleton />
            </div>

          </div>

          )}
        </FadeIn>
      </Container>
    </Styles>
  )
}
export default TermsConditions