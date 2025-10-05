import React, { useState } from 'react';
import Firebase from '../firebase/Firebase'

export const firebaseData = React.createContext()

const DataProvider = (props) => {

    const [progress, setProgress] = useState(0);
    const [promoImgURL, setPromoImgURL] = useState(null);

    const [promotions, setPromotions] = useState([]);

    const [promotionsFetch, setPromotionFetch] = useState(false)
    //const [promotionsLoaded, setPromotionsLoaded] = useState(false);

    const [medicalStaff, setMedicalStaff] = useState([]);
    const [medicalStaffLoaded, setMedicalStaffLoaded] = useState([]);
    const [medicalStaffLoading, setMedicalStaffLoading] = useState(true);

    const [medicalStaffImgURL, setMedicalStaffImgURL] = useState(null);


    const [bookings, setBookings] = useState([]);
    const [bookingsLoaded

        //, setBookingsLoaded
    ] = useState([]);
    const [bookingsLoading, setBookingsLoading] = useState(true);

    //gallery
    const [imgURL, setImgURL] = useState(null);
    const [images, setImages] = useState([]);

    const [jumbotronImages, setJumbotronImages] = useState([]);
    const [jumbotronLoading, setJumbotronLoading] = useState(true);
    const [jumbotronImgURL, setJumbotronImgURL] = useState(null);


    const [imgURLSet, setImgURLSet] = useState(false);


    //dashboard
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [admin, setAdmin] = useState(false)
    const [employee, setEmployee] = useState(false)

    //check admin privilege 
    const handleCheckPrivilege = () => {
        Firebase.auth().onAuthStateChanged(user => {
            setPending(true);
            setEmployee(false);
            setAdmin(false);
            setCurrentUser(user)
            if (user !== null) {
                user.getIdTokenResult().then(idTokenResult => {
                    user.admin = idTokenResult.claims.admin;
                    user.employee = idTokenResult.claims.employee;
                    if (user.admin === true) {
                        setPending(false);
                        setAdmin(true);
                    } else if (user.employee === true) {
                        setPending(false);
                        setEmployee(true);
                        setAdmin(false);
                    }
                });
            } else {

            }
            setPending(false)
        });
    }



    const handleAddPromotion = (obj) => {
        //Firestore
        let db = Firebase.firestore();
        obj = {
            ...obj,
            imageURL: promoImgURL,
            timestamp: Firebase.firestore.FieldValue.serverTimestamp()
        }

        db.collection("promotions").add(obj)
            .then(function (docRef) {
                var batch = db.batch();
                obj.promotions.forEach(function (promotion) {
                    let ref = db.collection("promotions").doc(docRef.id).collection("promos").doc()
                    batch.set(ref, promotion)
                });
                batch.commit()

                setPromotionFetch(true);
                setImgURLSet(false);
                setProgress(0);
                document.getElementById("promotionFileInput").value = "";
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }



    const handleAddImage = (obj) => {
        //Firestore
        obj = {
            ...obj,
            imageURL: imgURL,
            timestamp: Firebase.firestore.FieldValue.serverTimestamp()
        }
        Firebase.firestore().collection("image-gallery").add(obj)
            .then(function (docRef) {
                setImgURLSet(false);
                setProgress(0);
                document.getElementById("imgFileInput").value = "";
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    const handleAddJumbotronImage = (obj) => {
        //Firestore
        obj = {
            ...obj,
            imageURL: jumbotronImgURL,
            timestamp: Firebase.firestore.FieldValue.serverTimestamp()
        }
        Firebase.firestore().collection("jumbotron-gallery").add(obj)
            .then(function (docRef) {
                setImgURLSet(false);
                setProgress(0);
                document.getElementById("jumbotronImgFileInput").value = "";
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }


    const handleDelete = (doc, docId) => {
        if (doc === "promotions") {
            Firebase.firestore().collection(doc).doc(docId).collection("promos").get().then(docs => {
                console.log(docs);
                docs.forEach(function (doc) {
                    doc.ref.delete();
                });
            })
        }
        if (doc === "bookings") {
            Firebase.firestore().collection(doc).doc(docId).collection("contents").get().then(docs => {
                docs.forEach(function (doc) {
                    doc.ref.delete();
                });
            })
        }
        Firebase.firestore().collection(doc).doc(docId).delete().then(function () {
        }).catch(function (error) {
            //console.error("Error removing document: ", error);
        });
    }

    /*
    **************
    data functions 
    **************
    */
    const handleUploadImage = (folder, file) => {

        var metadata = {
            contentType: 'image/jpeg'
        };

        var storageRef = Firebase.storage().ref()

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child(folder + '/' + file.name).put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                switch (snapshot.state) {
                    case Firebase.storage.TaskState.PAUSED: // or 'paused'
                        //console.log('Upload is paused');
                        break;
                    case Firebase.storage.TaskState.RUNNING: // or 'running'
                        //console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            }, function (error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        //console.log('storage/unauthorized');
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        //console.log('storage/canceled');
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        //console.log('storage/unknown');
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    default:
                        break;
                }
            }, function () {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    if (folder === "promotions") {
                        document.getElementById("promotionImage").src = downloadURL;
                        document.getElementById("imageURL").value = downloadURL;
                        setPromoImgURL(downloadURL)
                        setImgURLSet(true)
                    } else if (folder === "image-gallery") {
                        document.getElementById("galleryImage").src = downloadURL;
                        document.getElementById("imageURL").value = downloadURL;
                        setImgURL(downloadURL)
                        setImgURLSet(true)
                    } else if (folder === "medicalStaff") {
                        document.getElementById("medicalStaffImage").src = downloadURL;
                        document.getElementById("imageURL").value = downloadURL;
                        setMedicalStaffImgURL(downloadURL)
                        setImgURLSet(true)
                    } else if (folder === "jumbotron-gallery") {
                        document.getElementById("jumbotronImage").src = downloadURL;
                        document.getElementById("imageURL").value = downloadURL;
                        setJumbotronImgURL(downloadURL)
                        setImgURLSet(true)
                    }
                });
            });
    }

    // get promotions
    const getPromotions = () => {
        const unsub = Firebase.firestore().collection('promotions').orderBy("timestamp", 'desc').onSnapshot(snapshot => {
            const allPromotions = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPromotions(allPromotions);
        });
        return () => {
            unsub();
        };
    }

    // get gallery images
    const getImages = () => {
        const unsub = Firebase.firestore().collection('image-gallery').onSnapshot(snapshot => {
            const allImages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setImages(allImages);
        });
        return () => {
            unsub();
        };
    }

    const getJumbotronImages = () => {
        const unsub = Firebase.firestore().collection('jumbotron-gallery').onSnapshot(snapshot => {
            const allImages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setJumbotronImages(allImages);
            setJumbotronLoading(false);
        });
        return () => {
            unsub();
        };
    }

    // add medicalStaff
    const handleAddMedicalStaff = (obj) => {
        //Firestore
        obj = {
            ...obj,
            imageURL: medicalStaffImgURL,
            timestamp: Firebase.firestore.FieldValue.serverTimestamp()
        }
        Firebase.firestore().collection("medicalStaff").add(obj)
            .then(function (docRef) {
                setImgURLSet(false);
                setProgress(0);
                document.getElementById("medicalStaffImgFileInput").value = "";
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
    // get medicalStaff
    let allMedicalStaff;
    const getMedicalStaff = () => {
        Firebase.firestore().collection('medicalStaff').onSnapshot(snapshot => {
            allMedicalStaff = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMedicalStaff(allMedicalStaff);
            checkLoad(allMedicalStaff);

        });
    }

    const checkLoad = (allMedicalStaff) => {
        let i = 0;
        allMedicalStaff.forEach((arrayInstance) => {
            let img = new Image();
            let imageSrc = arrayInstance.imageURL;
            img.onload = () => {
                setMedicalStaffLoaded(...medicalStaffLoaded, arrayInstance.imageURL);
                i++;
                if (i === allMedicalStaff.length) {
                    setMedicalStaffLoading(false);
                }
            };
            img.src = imageSrc;
        })
    }

    // add bookings
    const handleAddBooking = (obj) => {
        //Firestore
        obj = {
            ...obj,
            timestamp: Firebase.firestore.FieldValue.serverTimestamp()
        }
        Firebase.firestore().collection("bookings").add(obj)
            .then(function (docRef) {
                //console.log(docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
    // get Bookings 
    let allBookings;
    const getBookings = () => {
        Firebase.firestore().collection('bookings').onSnapshot(snapshot => {
            allBookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBookings(allBookings);
            checkBookingsLoad(allBookings);

        });
    }

    const checkBookingsLoad = (allBookings) => {
        let i = 0;
        allBookings.forEach((arrayInstance) => {
            let img = new Image();
            let imageSrc = arrayInstance.imageURL;
            img.onload = () => {
                setMedicalStaffLoaded(...bookingsLoaded, arrayInstance.imageURL);
                i++;
                if (i === allBookings.length) {
                    setBookingsLoading(false);
                }
            };
            img.src = imageSrc;
        })
    }



    return (
        <firebaseData.Provider
            value={{
                //replaced test with handleSignup
                handleAddPromotion,
                handleDelete,
                handleUploadImage,
                getPromotions,
                promotions,
                promotionsFetch,
                setPromotionFetch,

                //medicalStaff
                medicalStaff,
                setMedicalStaff,
                getMedicalStaff,
                handleAddMedicalStaff,
                medicalStaffLoading,
                medicalStaffImgURL,
                setMedicalStaffImgURL,

                //upload image
                progress,
                setProgress,
                promoImgURL,

                //gallery
                handleAddImage,
                imgURL,
                getImages,
                images,

                //Book
                bookings,
                getBookings,
                setBookings,
                handleAddBooking,
                bookingsLoading,

                //imgURLSet
                imgURLSet,
                setImgURLSet,


                //dashboard
                pending,
                currentUser,
                admin,
                employee,
                handleCheckPrivilege,

                //jumbotron images
                handleAddJumbotronImage,
                jumbotronImages,
                setJumbotronImages,
                getJumbotronImages,
                setJumbotronImgURL,
                jumbotronImgURL,
                jumbotronLoading
                
            }}>
            {props.children}
        </firebaseData.Provider>
    );
};

export default DataProvider;