/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Portal node entry point
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 may 2023
# Latest revision: 02 may 2023
# ---------------------------------------------------- */

/* React includes */
import React from 'react';
import { createRoot } from 'react-dom/client';

/* Emotion includes */
import createCache from '@emotion/cache'; // eslint-disable-line import/no-extraneous-dependencies
import { CacheProvider } from '@emotion/react'; // eslint-disable-line import/no-extraneous-dependencies

/* Local includes */
import App from './App.js'

/* Content Security Policy configuration */
const nonce = Math.random().toString(16).substr(2, 21);
const nonceCache = createCache({
    key: 'the-green-brick-road',
    nonce: nonce,
    prepend: true,
});
window.__webpack_nonce__ = nonce;
/* global __webpack_nonce__ */ // eslint-disable-line no-unused-vars
__webpack_nonce__ = window.__webpack_nonce__;// eslint-disable-line no-native-reassign, no-global-assign

/* Rendering function with cache */
const rootNode = document.getElementById('root');
const root = createRoot(rootNode);
root.render(
    <React.StrictMode>
        <CacheProvider value={nonceCache}>
            <App/>
        </CacheProvider>
    </React.StrictMode>
);