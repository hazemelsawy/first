import React, { createContext, useReducer, useEffect, useState } from 'react';
import { BookingsReducer } from '../reducers/BookingsReducer';
import Firebase from '../firebase/Firebase'
import uuid from 'react-uuid'

export const BookingsContext = createContext();

const BookContextProvider = (props) => {
    const [bookings, dispatch] = useReducer(BookingsReducer, [], () => {
        const localData = localStorage.getItem('bookings');
        return localData ? JSON.parse(localData) : [];
    });
    const [total, setTotal] = useState(0);
    const [totalFire, setTotalFire] = useState(0);
    const [totalObjFire, setTotalObjFire] = useState([]);
    const [applyTax, setApplyTax] = useState(false);
    useEffect(() => {
        localStorage.setItem('bookings', JSON.stringify(bookings));
        getTotal()
        getTotalFire()
    }, [bookings, applyTax]);

    const getTotal = () => {
        let sum = 0;
        bookings.some(function (el) {
            sum = sum + (parseFloat(el.price) * parseFloat(el.quantity))
        })
        setTotal(sum)
    }
    const getTotalFire = () => {
        let sum = 0;
        let arr = [];
        bookings.map(booking => {
            Firebase.firestore().collection('promotions').doc(booking.id).get().then(function (doc) {
                let quantity = 0;
                bookings.some(function (el) {
                    if (el.id === booking.id && el.index === booking.index) {
                        quantity = parseFloat(el.quantity);
                        if (doc.data().promotions[booking.index].avlbl) {
                            let price = parseFloat(doc.data().promotions[booking.index].price) * parseFloat(el.quantity)
                            sum = sum + price
                        }
                    }
                })
                arr = [...arr, {
                    id: doc.id,
                    uid: uuid(),
                    quantity: quantity,
                    department: doc.data().department,
                    ...doc.data().promotions[booking.index]
                }]

                setTotalObjFire(arr);
                setTotalFire(applyTax ? (sum * 1.15).toFixed(2) : sum.toFixed(2))
            }).catch(function (error) {
                //console.log("Error getting documents: ", error);
                console.log(error)
            });
        })

    }

    return (
        <BookingsContext.Provider value={{ bookings, dispatch, total, totalFire, totalObjFire, setApplyTax, applyTax }}>
            {props.children}
        </BookingsContext.Provider>
    );
}

export default BookContextProvider;
