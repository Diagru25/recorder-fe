
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouterLinks } from '../constants/router.constant';
import { Box, Flex } from '@chakra-ui/react';
import {
    HomeClient, Recorder
} from '../pages';
import { HeaderClient } from '../components';

const ClientRouter = () => {

    return (
        <Flex w='100%' h='100%' flexDir='column'>
            <HeaderClient />
            <Box fontSize='14px'>
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
        </Flex>
    )
}

export default ClientRouter;