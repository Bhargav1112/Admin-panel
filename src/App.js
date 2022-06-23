import React from "react";
import Layout from "./component/Layout/Layout";
import Medicine from "./container/Medicines/Medicine";
import Patient from "./container/Paitentes/Patient";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/medicine" exact component={Medicine} />
          <Route path="/patient" exact component={Patient} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
