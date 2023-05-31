/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Data provider context
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* React includes */
import { useContext, createContext } from 'react';

export const Context = createContext(null);

function useProvider() { return useContext(Context); }

export default useProvider;