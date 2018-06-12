import React, {Component} from 'react';
import Nav from 'components/nav';
import getRouter from 'router/router';
import logo from 'images/logo.svg';
import 'styles/app.scss';

export default class App extends Component {
    render() {
        return (
            <div>
                <img src={logo} className="App-logo" alt="logo" />
                <div className="App-bg-image"></div>
                <Nav/>
                {getRouter()}
            </div>
        )
    }
}