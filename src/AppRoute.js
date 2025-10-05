import React from 'react';
import { Route } from 'react-router-dom';

const AppRoute = ({ Component: ComponentToRender, layout: Layout, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            React.createElement( Layout, props, React.createElement(ComponentToRender, props))

        }
    ></Route>
);

export default AppRoute;