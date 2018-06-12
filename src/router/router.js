import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Bundle from './bundle';
import Loading from 'components/loading';

import Home from 'bundle-loader?lazy&name=home!containers/home';
import Page from 'bundle-loader?lazy&name=page!containers/page';

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

export default () => (
    <div>
        <Switch>
            <Route exact path="/" component={createComponent(Home)}/>
            <Route path="/page" component={createComponent(Page)}/>
        </Switch>
    </div>
);
