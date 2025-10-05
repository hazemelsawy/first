import React, { useEffect, useContext, useState } from 'react';
import { Jumbotron as Jumbo, Container, Carousel } from 'react-bootstrap';
import styled from 'styled-components';
import jumbo1 from '../assets/jumbotron1.png';
import jumbo2 from '../assets/jumbotron2.png';
import jumbo3 from '../assets/jumbotron3.png';
import jumbo4 from '../assets/jumbotron4.png';
import FadeIn from 'react-fade-in'
import pattern from '../assets/pattern.png'
import { firebaseData } from '../provider/DataProvider'
import JumbotronSkeleton from '../skeletons/jumbotronSkeleton'

const Styles = styled.div`
  h1{
    font-size:65px;
  }
  h3, p{
    text-shadow: 1px 1px 0 rgba(0,0,0,0.4);
    background:rgb(174, 133, 47, 0.2);
  }
  .jumbo {
    color: #1e266d;
    position: relative;
    background-color: transparent;
    min-height:300px;
  }
  .jumbo::after {
    content: "";
    background: url("${pattern}");
    background-color: #c1a365;
    background-size: 150px;
    opacity: 0.2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;   
  }
  .jumbo-container {
    background-color: #f9fbff !important;
  }
  .jumbo-image{
    max-width:450px;
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
  .opacity-50{
    opacity: 0.5;
  }
  .main-text{
    color:#ae852f;
  }

  .payment{
    width:70px;
  }
  .carousel-indicators{
    padding-right:0;
    padding-left: 14px;
  }
  @media only screen and (max-width: 600px) {
    h1{
      font-size:40px;
    }
  }
`;

export const Jumbotron = () => {
  const { jumbotronLoading, jumbotronImages, getJumbotronImages } = useContext(firebaseData)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJumbotronImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Styles>
      <Jumbo fluid className="jumbo text-right pb-0">
        <Container>
          <FadeIn>
          {!jumbotronLoading && (
            <Carousel>

              {jumbotronImages.map((image) =>

                <Carousel.Item key={image.id}>
                  <JumbotronSkeleton loading={loading} />
                  <div className="text-center container d-flex h-100">
                    <FadeIn className="row mx-auto justify-content-center align-self-center">
                      <img src={image.imageURL} className="w-100 jumbo-image" alt="" onLoad={() => setLoading(false)} />
                    </FadeIn>
                  </div>
                </Carousel.Item>
              )}



            </Carousel>
          )}
          </FadeIn>
          {jumbotronLoading && (
                <JumbotronSkeleton loading={true} />
          )}
        </Container>
      </Jumbo>
    </Styles>
  )
}