/* ------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Theme configuration parser
# -------------------------------------------------------
# Nadège LEMPERIERE, @12 may 2023
# Latest revision: 12 may 2023
# ---------------------------------------------------- */

/* Local includes */
import ThemeConfig from './data/theme.json';
import ImageConfig from './data/images.json';
import SizesConfig from './data/sizes.json';

/* Container definition */
const Design = {
    theme:      ThemeConfig,
    sizes:      SizesConfig,
    images:     {},
}

/* Image loading */
for (const image of ImageConfig)
{

    const rawext = image["raw"].split('.').pop();
    const webext = image["web"].split('.').pop();

    Design.images[image.name] = {}
    Design.images[image.name][rawext] = {}
    Design.images[image.name][webext] = {}

    Design.images[image.name][rawext]['small']           = {}
    Design.images[image.name][rawext]['small']['img']    = require(`../assets/small/${image.raw}`)
    Design.images[image.name][rawext]['small']['width']  = `${SizesConfig['small-width']}w`
    Design.images[image.name][rawext]['medium']          = {}
    Design.images[image.name][rawext]['medium']['img']   = require(`../assets/medium/${image.raw}`)
    Design.images[image.name][rawext]['medium']['width'] = `${SizesConfig['medium-width']}w`
    Design.images[image.name][rawext]['large']           = {}
    Design.images[image.name][rawext]['large']['img']    = require(`../assets/${image.raw}`)
    Design.images[image.name][rawext]['large']['width']  = `${SizesConfig['large-width']}w`

    Design.images[image.name][webext]['small']           = {}
    Design.images[image.name][webext]['small']['img']    = require(`../assets/small/${image.web}`)
    Design.images[image.name][webext]['small']['width']  = `${SizesConfig['small-width']}w`
    Design.images[image.name][webext]['medium']          = {}
    Design.images[image.name][webext]['medium']['img']   = require(`../assets/medium/${image.web}`)
    Design.images[image.name][webext]['medium']['width'] = `${SizesConfig['medium-width']}w`
    Design.images[image.name][webext]['large']           = {}
    Design.images[image.name][webext]['large']['img']    = require(`../assets/${image.web}`)
    Design.images[image.name][webext]['large']['width']  = `${SizesConfig['large-width']}w`

    Design.images[image.name]['default']= require(`../assets/${image.raw}`)

}

Design.theme['typography']['h1']['&::before']['content']='"  "'
Design.theme['typography']['h1']['&::after']['content']='"  "'
Design.theme['typography']['h2']['&::before']['content']='"  "'
Design.theme['typography']['h2']['&::after']['content']='"  "'
Design.theme['typography']['h3']['&::after']['content']='"  "'

/* Container export */
export default Design;
