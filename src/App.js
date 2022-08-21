import React from "react";
import Layout from "./component/Layout/Layout";
import Medicine from "./container/Medicines/Medicine";
import Patient from "./container/Paitentes/Patient";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Counter from "./container/Counter";

function App() {
    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Layout>
                        <Switch>
                            <Route
                                path="/medicine"
                                exact
                                component={Medicine}
                            />
                            <Route path="/patient" exact component={Patient} />
                            <Route path="/counter" exact component={Counter} />
                        </Switch>
                    </Layout>
                </PersistGate>
            </Provider>
        </>
    );
}

export default App;
