
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouterLinks } from '../constants/router.constant';
import { Box } from '@chakra-ui/react';
import {
    HomeClient, Recorder, Transcription, CompareRecord
} from '../pages';

const ClientRouter = () => {
    return (
        <Box w='100%' h='100%' >
            <Route>
                <Switch>
                    <Route
                        path={RouterLinks.COMPARE_RECORD}
                        component={CompareRecord}
                    />

                    <Route
                        path={RouterLinks.RECORDER}
                        component={Recorder}
                    />
                    <Route
                        path={RouterLinks.TRANSCRIPTION}
                        component={Transcription}
                    />
                    <Route
                        path={RouterLinks.HOME_CLIENT}
                        component={HomeClient}
                    />  
                </Switch>
            </Route>
        </Box>
    )
}

export default ClientRouter;