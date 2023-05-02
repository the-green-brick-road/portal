/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Configure test suite
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 may 2023
# Latest revision: 02 may 2023
# ---------------------------------------------------- */

/* Jest includes */
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {

    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);

});
