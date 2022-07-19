import React from "react";
import Layout from "./component/Layout/Layout";
import Medicine from "./container/Medicines/Medicine";
import Patient from "./container/Paitentes/Patient";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Counter from "./container/Counter";

function App() {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route path="/medicine" exact component={Medicine} />
            <Route path="/patient" exact component={Patient} />
            <Route path="/counter" exact component={Counter} />
          </Switch>
        </Layout>
      </Provider>
    </>
  );
}

export default App;
