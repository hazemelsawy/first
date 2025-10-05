import React from 'react';
import { NavigationBar } from '../components/NavigationBar';
import { Footer } from '../components/Footer';


export default ({ children }) => {

    return (
        <>
            <NavigationBar pageWrapId={"page-wrap"} outerContainerId={"app"} />
            {children}
            <Footer />
        </>
    );
}