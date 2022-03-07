import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Redirect,
    useLocation,
    Switch,
    Route,
} from 'react-router-dom';
import { RouterLinks } from '../../constants/router.constant';

import { useActions } from '../../redux/useActions';

export const LoginRequireComponent = (props) => {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
    const location = useLocation();

    const dispatch = useDispatch();
    const actions = useActions();

    useEffect(() => {
        dispatch(actions.authActions.actions.checkSession());
    });
    //console.log(!isLoggedIn);

    if (!isLoggedIn) {
        if (props.redirect)
            // return <Redirect to={props.redirect} from={location.pathname} />;
            return (
                <Redirect
                    to={{
                        pathname: props.redirect,
                        state: {
                            from: RouterLinks.HOME_PAGE
                            //from: location.pathname, cai nay se su dung de lay link cu
                        },
                    }}
                />
            );
        else
            return (
                <Redirect
                    to={{
                        pathname: RouterLinks.LOGIN_PAGE,
                        state: {
                            //from: location.pathname, cai nay se su dung de lay link cu
                            from: RouterLinks.HOME_PAGE
                        },
                    }}
                />
            );
    }

    return (
        <Switch>
            <Route
                {...props}
                onEnter={() => {
                    //dispatch(actions.authActions.actions.checkSession());
                }}
            />
        </Switch>
    );
};
