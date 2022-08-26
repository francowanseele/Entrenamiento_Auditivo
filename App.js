import React, { useEffect } from 'react';
import { refreshAccessTokenApi, willExpireToken } from './app/api/auth';

import Start from './app/screens/Login/Start';
import { getToeknAndRefreshToken } from './utils/asyncStorageManagement';

function AppWrapper({ children }) {
    let refreshRequest = null;
    let accessRequest = null;
    let refreshRequestAssigned = false;
    let accessRequestAssigned = false;

    const isRefreshToken = (url) => {
        const urlSplited = url.split('/');
        return urlSplited[urlSplited.length - 1] == 'refresh-access-token';
    };

    useEffect(() => {
        const { fetch: originalFetch } = window;

        window.fetch = async (...args) => {
            let [resource, config] = args;

            // REQUEST INTERCEPTOR

            // Only intercept endpoints which are not refresh token
            if (!isRefreshToken(resource)) {
                if (!accessRequestAssigned) {
                    accessRequestAssigned = true;
                    accessRequest = getToeknAndRefreshToken();
                }

                const accessData = await accessRequest;
                accessRequestAssigned = false;

                const { refreshToken, token } = accessData;
                let tokenHeader = token;

                if (refreshToken) {
                    if (token && willExpireToken(token)) {
                        if (!refreshRequestAssigned) {
                            refreshRequestAssigned = true;
                            refreshRequest =
                                refreshAccessTokenApi(refreshToken);
                        }

                        const refreshAccessData = await refreshRequest;
                        refreshRequestAssigned = false;

                        tokenHeader = refreshAccessData.token;
                    }

                    args[1].headers.Authorization = tokenHeader;
                }
            }

            // SEND REQUEST
            const response = await originalFetch(resource, config);

            // RESPONSE INTERCEPTOR

            return response;
        };
    }, []);

    return <>{children}</>;
}

const App = () => {
    return (
        <AppWrapper>
            <Start />
        </AppWrapper>
    );
};

export default App;
