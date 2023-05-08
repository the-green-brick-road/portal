/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Jest configuration file
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 may 2023
# Latest revision: 02 may 2023
# ---------------------------------------------------- */

module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['src/jest.setup.js'],
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|my-project|react-native-button)/)',
    ],
};