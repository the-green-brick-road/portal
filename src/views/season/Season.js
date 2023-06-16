/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Season page definition
# -------------------------------------------------------
# Nadège LEMPERIERE, @30 may 2023
# Latest revision: 30 may 2023
# ---------------------------------------------------- */

/* React includes */
import { Profiler }              from 'react';

/* Portal includes */
import { useDesign, useLogging } from '../../providers';

/* Local includes */
import SeasonDesktop             from './SeasonDesktop';
import SeasonMobile              from './SeasonMobile';

function Season(props) {

    /* --------- Gather inputs --------- */
    const { data }      = props
    const { screen }    = useDesign();
    const { onRender }  = useLogging();
    const componentName = 'Season';

    /* ----------- Define HTML --------- */
    return (
        <Profiler id={componentName} onRender={onRender}>
            {(screen === 'large') && (<SeasonDesktop data={data} />)}
            {(screen !== 'large') && (<SeasonMobile data={data} />)}
        </Profiler>
    );

}

export default Season;