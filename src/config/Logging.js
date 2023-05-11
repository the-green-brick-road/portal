/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Sentry configuration parser
# -------------------------------------------------------
# Nadège LEMPERIERE, @08 may 2023
# Latest revision: 08 may 2023
# ---------------------------------------------------- */

/* Local includes */
import SentryConfig from './data/sentry.json';
import LoggingConfig from './data/logging.json';

/* Container definition */
const Logging = {
    settings:   LoggingConfig,
    sentry:     SentryConfig,
};

/* Container export */
export default Logging;
