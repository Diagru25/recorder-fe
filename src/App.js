import React from 'react';
import { store } from './redux/store';
import {
    Route,
    Switch,
    BrowserRouter as Router,
    Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { RouterLinks } from './constants/router.constant';
import AdminRouter from './main/admin';
import { LoginRequireComponent } from './components';
import {
    ChakraProvider,
    theme,
} from '@chakra-ui/react';
import './assets/style/style.css';
import ClientRouter from './client/client';
import { LoginPage } from './pages';


function App() {
    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route exact path={RouterLinks.LOGIN_PAGE} component={LoginPage} />
                        <Route exact path={RouterLinks.HOME_CLIENT} component={ClientRouter} />
                        <LoginRequireComponent path={RouterLinks.APP} component={AdminRouter} />

                        <Redirect to={RouterLinks.HOME_CLIENT} />
                    </Switch>
                </Router>
            </ChakraProvider>
        </Provider>
    );
}

export default App;
