import uuid from 'react-uuid'

export const BookingsReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_BOOKING':
            return [...state, {
                id: action.booking.id,
                uid: uuid(),
                index: action.booking.index,
                promo: action.booking.promo,
                price: action.booking.price,
                quantity: action.booking.quantity,
                avlbl: action.booking.avlbl
            }
            ]
        case 'REMOVE_BOOKING':
            return state.filter(booking => (booking.id !== action.booking.id) || (booking.index !== action.booking.index));
        case 'REMOVE_ALL_BOOKINGS':
            return [];
        case 'UPDATE_ALL_BOOKINGS':
            return [...state, ...action.currentBookings];
        default:
            return state;
    }
} 