/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Config exports
# -------------------------------------------------------
# Nadège LEMPERIERE, @03 may 2023
# Latest revision: 10 june 2023
# ---------------------------------------------------- */

/* Local includes */
import Firebase  from './Firebase';
import Logging   from './Logging';
import Design    from './Design';
import Menu      from './Menu';
import Routes    from './Routes';
import Calendars from './Calendars';

const Config = {

    firebase:  Firebase,
    logging:   Logging,
    design:    Design,
    menu:      Menu,
    routes:    Routes,
    calendars: Calendars,

};

export default Config;
