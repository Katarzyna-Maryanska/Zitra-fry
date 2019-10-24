import React, {useState, useEffect} from 'react';
import Scanner from "../../scanner/components/Scanner.jsx"
import DeliveryRoute from "../../route/components/DeliveryRoute"
import Navigation from "./Navigation"
import NotFound from "./NotFound";
import history from "../service/history"
import {Router, Route, Switch} from 'react-router-dom';
import LoginPage from "../../auth/components/LoginPage";
import Authorized from "../../auth/service/Authorized";
import Header from "./Header";
import {getCurrentUser, getUserStore} from "../../user/userService";

const App = () => {
    const [user, setUser] = useState(null);
    const [store, setStore] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);


    useEffect(() => {
        onLogin();
    },[]);


    const onLogin = () => {
        setLoadingUser(true);

        getCurrentUser()
        .then((user) => {
            setUser(user);
            setLoadingUser(false);

            getUserStore()
                .then((store) => {
                    setStore(store);
                    history.push('/fry/trasa');
                })
        })
        .catch(() => {
            setLoadingUser(false);
        })
    };

    const onLogout = () => {
        setUser(null);
        history.push('/fry/login');
    };

    return (
        <Router history={history}>
            <Switch>
                {!loadingUser && !user &&
                    <Route
                        path='/fry/login'
                        component={() => <LoginPage onLogin={onLogin}/>}
                    />
                }
                <Authorized loggedIn={!!user}>
                    <Header onLogout={() => onLogout()}/>
                    <Route exact path='/' component={DeliveryRoute} />
                    <Route path='/fry/trasa' component={() => <DeliveryRoute store={store}/>} />
                    <Route path='/fry/skaner' component={Scanner} />
                    <Navigation/>
                </Authorized>
                <Route path='*' component={NotFound} />
            </Switch>
        </Router>

    //  <Router history={history}>
    //     <Switch>
    //         {!loadingUser && !user &&
        //     <Route
        //         path='/fry/login'
        //         component={() => <LoginPage onLogin={onLogin}/>}
        //     />
        // }
        //     <Authorized loggedIn={!!user}>
        //         <Header onLogout={() => onLogout()}/>
        //         <Route exact path='/' component={DeliveryRoute} />
        //         <Route path='/fry/trasa' component={() => <DeliveryRoute store={store}/>} />
        //         <Route path='/fry/skaner' component={Scanner} />
        //         <Navigation/>
        //     </Authorized>
        //     <Route path='*' component={NotFound} />
    //     </Switch>
    // </Router>
    );
};

export default App;