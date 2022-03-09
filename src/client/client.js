
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouterLinks } from '../constants/router.constant';
import { Box } from '@chakra-ui/react';
import {
    HomeClient, Recorder
} from '../pages';

const ClientRouter = () => {

    return (
        <Box w='100%' h='100%' >
                <Switch>
                    <Route
                        exact
                        path={RouterLinks.HOME_CLIENT}
                        component={HomeClient}
                    />
                    <Route
                        exact
                        path={RouterLinks.RECORDER}
                        component={Recorder}
                    />
                </Switch>
        </Box>
    )
}

export default ClientRouter;