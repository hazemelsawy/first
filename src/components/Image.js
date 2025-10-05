import React from 'react';
import { useState, useEffect } from 'react';
import Firebase from '../firebase/Firebase'
import ImageGallerySkeleton from '../skeletons/ImageGallery'
import FadeIn from 'react-fade-in'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from "simple-react-lightbox";
import { Row, Col, Card, CardColumns } from 'react-bootstrap'
import styled from 'styled-components';
import pattern from '../assets/pattern.png'

const Styles = styled.div`

  .gallery-container::before {
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
  .image{
    border: 10px solid rgba(255,255,255,0.5);
    cursor:pointer;
  }
  
`;
export const AllImages = (props) => {

    var [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState([]);

    let array2 = [];
    let array = [];

    useEffect(() => {
        Firebase.firestore().collection("image-gallery").get().then(function (querySnapshot) {
            querySnapshot.docs.map(function (doc) {
                var data = doc.data()
                array.push(data);
                array2.push({
                    ...data,
                    original: data.imageURL,
                    thumbnail: data.imageURL
                })
                return null;
            })
            setImages(array2)
            checkLoad();
        }).catch(function (error) {
            //console.log("Error getting documents: ", error);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkLoad = () => {
        let i = 0;
        array.forEach((arrayInstance) => {
            let img = new Image();
            let imageSrc = arrayInstance.imageURL;
            img.onload = () => {
                setImagesLoaded(...imagesLoaded, arrayInstance.imageURL);
                i++;
                if (i === array.length) {
                    setLoading(false);
                }
            };
            img.src = imageSrc;
        })
    }

    const options = {
        settings: {
            disablePanzoom: true
        },
        thumbnails: {
            showThumbnails: true,
            thumbnailsAlignment: 'center',
            thumbnailsContainerBackgroundColor: 'transparent',
            thumbnailsContainerPadding: '0',
            thumbnailsGap: '0 1px',
            thumbnailsIconColor: '#ffffff',
            thumbnailsOpacity: 0.4,
            thumbnailsPosition: 'bottom',
            thumbnailsSize: ['100px', '80px']
        },
        buttons: {
            backgroundColor: 'rgba(30,30,36,0.8)',
            iconColor: 'rgba(255, 255, 255, 0.8)',
            iconPadding: '10px',
            showAutoplayButton: false,
            showCloseButton: true,
            showDownloadButton: false,
            showFullscreenButton: true,
            showNextButton: true,
            showPrevButton: true,
            showThumbnailsButton: false,
            size: '40px'
        }
    }
    return (

        <Styles>
            <FadeIn>
                <ImageGallerySkeleton loading={loading} />
            </FadeIn>
            <div className={`gallery-container pt-3 px-3 pb-0 pt-md-4 px-md-4 pb-md-0 position-relative rounded-lg overflow-hidden ${loading ? "d-none" : ""}`}>
                <React.StrictMode>
                    <SimpleReactLightbox>
                        <SRLWrapper options={options}>

                            <CardColumns>
                                {images.map((obj, number) =>
                                    <Card key={number} className="bg-transparent border-0">
                                        <Card.Img variant="top" className="w-100 bg-transparent image rounded-lg" src={obj.imageURL} />
                                    </Card>
                                )}

                            </CardColumns>
                        </SRLWrapper>
                    </SimpleReactLightbox>
                </React.StrictMode>
            </div>
        </Styles>

    )
}
export default AllImages