import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Firebase from '../firebase/Firebase'
import ImageGallery from 'react-image-gallery';
import ImageGallerySkeleton from '../skeletons/ImageGallery'
import FadeIn from 'react-fade-in'

import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

/*const colStyle = {
    backgroundColor: '#ffccd2',
};*/
export const AllImages = (props) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

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

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const photos = [
        {
            src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
            width: 1,
            height: 1
        },
        {
            src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/PpOHJezOalU/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
            width: 4,
            height: 3
        }
    ];
    return (

        <>
            <FadeIn>
                <ImageGallerySkeleton loading={loading} />
            </FadeIn>
            <div className={loading ? "d-none" : ""}>
                <Gallery photos={photos} onClick={openLightbox} />
                <ModalGateway>
                    {viewerIsOpen ? (
                        <Modal onClose={closeLightbox}>
                            <Carousel
                                currentIndex={currentImage}
                                views={photos.map(x => ({
                                    ...x,
                                    src: x.srcSet,
                                    caption: "something",
                                    width: 1,
                                    height: 1

                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>
            </div>
        </>

    )
}
export default AllImages