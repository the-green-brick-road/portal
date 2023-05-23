/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Image component
# -------------------------------------------------------
# Nadège LEMPERIERE, @22 may 2023
# Latest revision: 22 may 2023
# ---------------------------------------------------- */

/* React includes */
import { Fragment }  from 'react';

/* Portal includes */
import { useDesign } from '../../providers';

function Image(props) {

    /* --------- Gather inputs --------- */
    const { name, style={} }    = props;
    const { images }            = useDesign();

    /* ---- Select image if loaded ----- */
    let data = {}
    if (name in images) { data  = images[name] }

    /* ----------- Define HTML --------- */
    /* eslint-disable padded-blocks */
    return (
        <Fragment>
            {(data !== {}) && (<picture>
                { Object.entries(data).map((item) => {

                    let result;
                    const localType = `image/${item[0]}`;
                    const localSizes = Object.entries(item[1]);
                    let localSrcset = '';
                    for (let i = 0; i < localSizes.length; i += 1) {
                        localSrcset = `${localSrcset} ${localSizes[i][1].img} ${localSizes[i][1].width} ,`;
                    }
                    if (item[0] !== 'default') {
                        result = (<source key={item[0]} srcSet={localSrcset} type={localType} />);
                    }
                    return result;
                })}
                <img src={data.default} style={style} alt={name} />
            </picture>)}
        </Fragment>
    );
    /* eslint-enable padded-blocks */

}

export default Image;
