import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer } from "react-hot-loader";

import "styles/index.scss";
import App from "./app";

const MOUNT_NODE = document.getElementById("root");

const renderApp = Component => {
  render(
    <AppContainer>
      {/* <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router> */}
      <Component />
    </AppContainer>,
    MOUNT_NODE
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept(() => renderApp(App));
}
