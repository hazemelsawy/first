import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/placeholder-loading.min.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AuthProvider from './provider/AuthProvider'
import DataProvider from './provider/DataProvider'
import BookingsContextProvider from './contexts/Bookings'

ReactDOM.render(

    <AuthProvider>
        <DataProvider>
            <BookingsContextProvider>
                <App />
            </BookingsContextProvider>
        </DataProvider>
    </AuthProvider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

