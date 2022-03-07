
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { useActions } from '../redux/useActions';

import { LoginRequireComponent } from '../components';
import { RouterLinks } from '../constants/router.constant';

import { Box, Flex } from '@chakra-ui/react';

import {
    HomePage
} from '../pages';
import { SideBar, Header } from '../components';

const AdminRouter = () => {

    const dispatch = useDispatch();
    const { authActions } = useActions();

    useEffect(() => {
        dispatch(authActions.actions.getUserInfo());
    }, [dispatch, authActions.actions])

    return (
        <Flex w='100%'>
            <SideBar />
            <Flex w='100%' h='100%' flexDir='column'>
                <Header />
                <Box p={5} fontSize='14px'>
                    <Switch>
                        <LoginRequireComponent
                            path={RouterLinks.HOME_PAGE}
                            component={HomePage}
                        />
                    </Switch>
                </Box>
            </Flex>
        </Flex>

    )
}

export default AdminRouter;